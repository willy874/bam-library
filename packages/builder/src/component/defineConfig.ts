import { NODEJS_EXTERNALS } from '@/constants';
import { deepmerge } from '@/libs/utils';
import { MaybePromise, getArgv, getEnvironment, ArgvType, EnvType } from '@/utils/variable';
import { path, fs } from '@/utils/node';
import { RollupOptions, OutputOptions } from 'rollup';
import alias from '@rollup/plugin-alias';
import type { RollupAliasOptions } from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import type { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import type { RollupJsonOptions } from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import type { Options as EsbuildOptions } from 'rollup-plugin-esbuild';

type Config = {
  rollupConfiguration?: RollupOptions | RollupOptions[];
  esmOutput?: OutputOptions;
  cjsOutput?: OutputOptions;
  logs?: Record<string, (config: RollupOptions[]) => string>;
  esbuild?: EsbuildOptions;
  json?: RollupJsonOptions;
  commonjs?: RollupCommonJSOptions;
  resolve?: RollupNodeResolveOptions;
  alias?: RollupAliasOptions;
};

export function componentBuilder(params?: Config | ((env: EnvType, argv: ArgvType) => MaybePromise<Config>)) {
  return async () => {
    const env = await getEnvironment();
    const argv = getArgv();
    const config = typeof params === 'function' ? await params(env, argv) : params || {};
    const { rollupConfiguration = {}, esmOutput = {}, cjsOutput = {}, logs } = config;
    const [rollupOption, ...rollupRestOptions] = Array.isArray(rollupConfiguration)
      ? rollupConfiguration
      : [rollupConfiguration];
    const pkg = await fs.getPackageJson();
    const baseConfig: RollupOptions = deepmerge<RollupOptions>(
      {
        input: './src/main.ts',
        output: [
          deepmerge<OutputOptions>(
            {
              dir: 'dist/es',
              format: 'es',
              exports: 'named',
              sourcemap: true,
            },
            esmOutput,
          ),
          deepmerge<OutputOptions>(
            {
              dir: 'dist/lib',
              format: 'cjs',
              interop: 'auto',
              exports: 'named',
              footer: 'module.exports = Object.assign(exports.default || {}, exports);',
              sourcemap: true,
            },
            cjsOutput,
          ),
        ],
        plugins: [
          alias(
            deepmerge<RollupAliasOptions>(
              {
                entries: [
                  {
                    find: '@',
                    replacement: path.resolveRoot('src'),
                  },
                ],
              },
              config.alias || {},
            ),
          ),
          resolve(
            deepmerge<RollupNodeResolveOptions>(
              {
                preferBuiltins: false,
              },
              config.resolve || {},
            ),
          ),
          commonjs(config.commonjs),
          esbuild(
            deepmerge<EsbuildOptions>(
              {
                jsx: 'automatic',
              },
              config.esbuild || {},
            ),
          ),
          json(config.json),
        ],
        external: [...NODEJS_EXTERNALS, /^node:/, ...Object.keys(pkg?.dependencies || {})],
      },
      rollupOption,
    );
    const allRollupOptions = [baseConfig, ...rollupRestOptions];
    for (const key in logs) {
      const result = logs[key](allRollupOptions);
      // eslint-disable-next-line no-console
      console.info(`${key}:\n`, result);
    }
    return allRollupOptions;
  };
}
