import { deepmerge } from '@/libs/utils';
import type { RuleSetRule, SwcLoaderOptions } from '@/types/webpack';

import type { DefaultSettings, JsLoaders } from '../types';

function getBabelLoader(_options: any, settings: DefaultSettings) {
  const { isDev, isProd } = settings;
  try {
    require('babel-loader');
  } catch (error) {
    throw new Error('react, babel-loader is not found');
  }
  try {
    return [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve('babel-preset-react-app/webpack-overrides'),
          presets: [
            [
              require.resolve('babel-preset-react-app'),
              {
                runtime: require.resolve('react/jsx-runtime') ? 'automatic' : 'classic',
              },
            ],
          ],
          cacheDirectory: true,
          cacheCompression: false,
          compact: isProd,
        },
      },
      {
        test: /\.(js|mjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          compact: false,
          presets: [[require.resolve('babel-preset-react-app'), { helpers: true }]],
          cacheDirectory: true,
          cacheCompression: false,
          sourceMaps: isDev,
          inputSourceMap: isDev,
        },
      },
    ];
  } catch (error) {
    throw new Error('react and babel-preset-react-app is not found');
  }
}

function isSwc(options: RuleSetRule): options is { type: 'swc'; options?: SwcLoaderOptions } {
  return options.type === 'swc';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function getSwcLoader(options: RuleSetRule, settings: DefaultSettings) {
  if (!isSwc(options)) {
    throw new Error('swc is not found');
  }
  try {
    require('swc-loader');
  } catch (error) {
    throw new Error('swc-loader is not found');
  }
  return [
    {
      test: /\.(([cm]js)|([tj]sx?))$/,
      exclude: /(node_modules)/,
      use: [
        {
          loader: require.resolve('swc-loader'),
          options: deepmerge(
            {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  jsx: true,
                  tsx: true,
                  decorators: false,
                  dynamicImport: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    refresh: true,
                  },
                },
                keepClassNames: true,
                target: 'es2021',
              },
            },
            options.options || {},
          ),
        },
      ],
    },
  ];
}

export function getJsLoaders(options: JsLoaders | undefined, settings: DefaultSettings) {
  if (options === undefined) {
    return getSwcLoader({ type: 'swc' }, settings);
  }
  if (Array.isArray(options)) {
    return options;
  }
  if (options.type === 'swc') {
    return getSwcLoader(options, settings);
  }
  if (options.type === 'babel') {
    return getBabelLoader(options, settings);
  }
  return [options];
}
