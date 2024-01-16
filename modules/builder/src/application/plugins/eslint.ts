import { CWD } from '@/constants';
import { deepmerge } from '@/libs/utils';
import type { EslintWebpackPluginOptions } from '@/types/webpack';
import { path } from '@/utils';

import type { DefaultSettings } from '../types';
import { ESLintWebpackPlugin } from '@/libs/webpack';

export function getEslintPlugin(config: EslintWebpackPluginOptions, settings: DefaultSettings) {
  const { isDev, isProd } = settings;
  return new ESLintWebpackPlugin(
    deepmerge<EslintWebpackPluginOptions>(
      {
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        eslintPath: require.resolve('eslint'),
        failOnError: isDev,
        context: path.resolveRoot('src'),
        cache: true,
        cacheLocation: path.resolveRoot('node_modules', '.cache', '.eslintcache'),
        cwd: CWD,
        resolvePluginsRelativeTo: CWD,
        baseConfig: {
          extends: [path.resolveRoot('.eslintrc.js')],
        },
        emitWarning: isProd,
        emitError: isProd,
      },
      config,
    ),
  );
}
