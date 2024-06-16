import WebpackChain from 'webpack-chain';
import webpackMerge from 'webpack-merge';

import type { WebpackConfig } from '@/types/webpack';
import { ArgvType, EnvType, MaybePromise, fs, getArgv, getEnvironment, path } from '@/utils';

import { getAssetLoaders } from './loaders/assets-loader';
import { getIcssLoader, getLocalCssLoader } from './loaders/css-loader';
import { getJsLoaders } from './loaders/js-loader';
import { getSvgrLoader } from './loaders/svgr-loader';
import { getPlugins } from './plugins';
import { getDevServe, getNextPort } from './server';

import type { Config, DefaultSettings } from './types';
import { CssMinimizerPlugin, TerserWebpackPlugin } from '@/libs/webpack';
import { getCatch } from './cache';

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
export function applicationBuilder(
  params?: Config | ((env: EnvType, argv: ArgvType) => MaybePromise<Config>),
): () => Promise<WebpackConfig> {
  return async () => {
    const env = await getEnvironment();
    const argv = getArgv();
    const config = typeof params === 'function' ? await params(env, argv) : params || {};
    const { webpackConfiguration = {}, webpackChain = () => {}, logs } = config;
    const settings = getDefaultSettings(env, argv);
    settings.port = await getNextPort(settings.port);
    const { mode, isDev, isProd } = settings;
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
        assetModuleFilename({ filename = '' }) {
          let extType = filename.replace(/(.)*\./, '');
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'media';
          } else if (/woff2?/.test(extType)) {
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
      plugins: getPlugins(config, settings).filter(Boolean),
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
      cache: getCatch(settings, env),
      optimization: {
        minimize: isProd,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserWebpackPlugin({
            terserOptions: {
              compress: {
                ecma: 5,
                comparisons: false,
                inline: 2,
              },
              mangle: {
                safari10: true,
              },
              keep_classnames: isProd,
              keep_fnames: isProd,
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
          }),
        ],
        splitChunks: {
          minSize: 40000,
          maxSize: 240000,
        },
      },
    };
    const configurationChain = new WebpackChain();
    await webpackChain(configurationChain, baseWebpackConfiguration);
    const finalConfig = webpackMerge(baseWebpackConfiguration, webpackConfiguration, configurationChain.toConfig());
    // fs.promises.writeFile(
    //   path.resolveRoot('node_modules', '.cache', 'config.json'),
    //   JSON.stringify(finalConfig, null, 2),
    // );
    for (const key in logs) {
      const result = logs[key](finalConfig);
      // eslint-disable-next-line no-console
      console.info(`${key}:\n`, result);
    }
    return finalConfig;
  };
}
