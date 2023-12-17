import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { DefinePlugin, ProgressPlugin, ProvidePlugin } from 'webpack';

import { deepmerge } from '@/libs/utils';

import { getCopyPlugin } from './copy';
import { getEslintPlugin } from './eslint';
import { getModuleFederationPlugin } from './module-federation';
import { getForkTsCheckerWebpackPlugin } from './ts-check';

import type { Config, DefaultSettings } from '../types';

export function getPlugins(config: Config, settings: DefaultSettings) {
  const {
    provide = {},
    htmlTemplate = {},
    cssExtract = {},
    define = {},
    copy = {},
    eslint = {},
    tsCheck = {},
    moduleFederation = {},
    progress = {},
  } = config;
  const { mode, env } = settings;
  const exposeEnv: Record<string, string> = {
    NODE_ENV: mode,
  };
  Object.keys(env).forEach((key) => {
    if (/^APP_ENV_/.test(key)) {
      Reflect.set(exposeEnv, key, env[key]);
    }
  });

  return [
    new ProvidePlugin({
      React: 'react',
      ...provide,
    }),
    new HtmlWebpackPlugin(
      deepmerge(
        {
          template: './public/index.html',
          publicPath: '/',
        },
        htmlTemplate,
      ),
    ),
    new MiniCssExtractPlugin(
      deepmerge(
        {
          filename: 'css/entry.[name].[hash].css',
          chunkFilename: 'css/chunk.[name].[hash].css',
          ignoreOrder: true,
        },
        cssExtract,
      ),
    ),
    new DefinePlugin({
      // 'process.env': JSON.stringify(exposeEnv),
      process: JSON.stringify({ env: exposeEnv }),
      ...define,
    }),
    new ProgressPlugin(
      deepmerge(
        {
          activeModules: true,
          entries: true,
          modules: false,
          modulesCount: 5000,
          profile: false,
          dependencies: false,
          dependenciesCount: 10000,
        },
        {
          ...progress,
        },
      ),
    ),
    getCopyPlugin(copy),
    getForkTsCheckerWebpackPlugin(tsCheck, settings),
    getEslintPlugin(eslint, settings),
    getModuleFederationPlugin(moduleFederation, settings),
  ];
}