import { CWD } from '@/constants';
import { deepmerge } from '@/libs/utils';
import type { EslintWebpackPluginOptions } from '@/types/webpack';
import { fs, path } from '@/utils';

import type { DefaultSettings } from '../types';
import { ESLintWebpackPlugin } from '@/libs/webpack';

const getEslintPath = () => {
  const configNames = [
    path.resolveRoot('.eslintrc.js'),
    path.resolveRoot('.eslintrc.cjs'),
    path.resolveRoot('.eslintrc.mjs'),
    path.resolveRoot('.eslintrc.yaml'),
    path.resolveRoot('.eslintrc.yml'),
    path.resolveRoot('.eslintrc.json'),
    path.resolveRoot('eslint.config.js'),
    path.resolveRoot('eslint.config.cjs'),
    path.resolveRoot('eslint.config.mjs'),
    path.resolveRoot('eslint.config.yaml'),
    path.resolveRoot('eslint.config.yml'),
    path.resolveRoot('eslint.config.json'),
  ];
  let eslintPath = '';
  for (let index = 0; index < configNames.length; index++) {
    const filePath = configNames[index];
    if (fs.isFile(filePath)) {
      eslintPath = filePath;
      break;
    }
  }
  return eslintPath;
};

export function getEslintPlugin(config: EslintWebpackPluginOptions, settings: DefaultSettings) {
  const { isDev, isProd } = settings;
  const eslintConfigPath = getEslintPath();
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
          extends: [eslintConfigPath],
        },
        emitWarning: isProd,
        emitError: isProd,
      },
      config,
    ),
  );
}
