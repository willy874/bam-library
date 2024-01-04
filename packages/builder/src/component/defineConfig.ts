import { MaybePromise, getArgv, getEnvironment, ArgvType, EnvType } from '@/utils';
import { RollupOptions } from 'rollup';

type Config = {
  rollupConfiguration?: RollupOptions;
  logs?: Record<string, (config: RollupOptions) => string>;
};

export function componentBuilder(params?: Config | ((env: EnvType, argv: ArgvType) => MaybePromise<Config>)) {
  return async () => {
    const env = await getEnvironment();
    const argv = getArgv();
    const config = typeof params === 'function' ? await params(env, argv) : params || {};
    const { rollupConfiguration = {}, logs } = config;
    const baseConfig: RollupOptions = { ...rollupConfiguration };
    for (const key in logs) {
      const result = logs[key](baseConfig);
      // eslint-disable-next-line no-console
      console.info(`${key}:\n`, result);
    }
    return config;
  };
}
