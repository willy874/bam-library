import WebpackChain from 'webpack-chain';
import webpackMerge from 'webpack-merge';

import type { WebpackConfig } from '@/types/webpack';
import { getArgv, getEnvironment, path } from '@/utils';

import { getAssetLoaders } from './loaders/assets-loader';
import { getIcssLoader, getLocalCssLoader } from './loaders/css-loader';
import { getJsLoaders } from './loaders/js-loader';
import { getSvgrLoader } from './loaders/svgr-loader';
import { getPlugins } from './plugins';
import { getDevServe } from './server';

import type { Config, DefaultSettings } from './types';
import { CssMinimizerPlugin } from '@/libs/webpack';

function getDefaultSettings(
  env: Partial<Record<string, string>>,
  argv: Record<string, string | number | boolean>,
): DefaultSettings {
  const mode = env.NODE_ENV === 'production' ? 'production' : 'development';
  const isDev = mode === 'development';
  const isProd = mode === 'production';
  return {
    env,
    mode,
    isDev,
    isProd,
    host: env.HOST || '0.0.0.0',
    port: parseInt(env.PORT || '3000'),
    appName: env.APP_ENV_APP_NAME || '',
    argv,
  };
}
export function defineConfig(
  params?:
    | Config
    | ((
        env: Partial<Record<string, string>>,
        argv: Record<string, string | number | boolean>,
      ) => Config | Promise<Config>),
): () => Promise<WebpackConfig> {
  return async () => {
    const env = await getEnvironment();
    const argv = getArgv();
    const config = typeof params === 'function' ? await params(env, argv) : params || {};
    const { webpackConfiguration = {}, webpackChain = () => {}, logs } = config;
    const settings = getDefaultSettings(env, argv);
    const { mode, isDev } = settings;
    const baseWebpackConfiguration: WebpackConfig = {
      entry: {
        app: path.resolveRoot('src', 'main.ts'),
      },
      mode,
      devtool: isDev ? 'eval-cheap-module-source-map' : false,
      output: {
        clean: false,
        publicPath: 'auto',
        hashFunction: 'xxhash64',
        path: path.resolveRoot('dist'),
        filename: 'js/entry.[name].[chunkhash:8].js',
        chunkFilename: 'js/chunk.[name].[contenthash:8].js',
        assetModuleFilename(pathData) {
          const info = pathData.filename!.split('.');
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'media';
          } else if (/woff|woff2/.test(extType)) {
            extType = 'css';
          }
          return `static/${extType}/[name]-[hash][ext]`;
        },
      },
      devServer: isDev ? getDevServe(settings) : undefined,
      module: {
        rules: [
          ...getJsLoaders(undefined, settings),
          {
            oneOf: [
              ...getIcssLoader(config.icss || {}, settings),
              ...getLocalCssLoader(config.localCss || {}, settings),
              ...getSvgrLoader(config.svgr || {}, settings),
              ...getAssetLoaders([], settings),
            ],
          },
        ],
      },
      plugins: getPlugins(config, settings),
      resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'],
        alias: {
          '@': path.resolveRoot('src'),
        },
      },
      target: 'web',
      performance: {
        hints: false,
      },
      optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
        splitChunks: {
          minSize: 40000,
          maxSize: 240000,
        },
      },
    };
    const configurationChain = new WebpackChain();
    await webpackChain(configurationChain, baseWebpackConfiguration);
    const finalConfig = webpackMerge(baseWebpackConfiguration, webpackConfiguration, configurationChain.toConfig());
    for (const key in logs) {
      const result = logs[key](finalConfig);
      // eslint-disable-next-line no-console
      console.info(`${key}:\n`, result);
    }
    return finalConfig;
  };
}
