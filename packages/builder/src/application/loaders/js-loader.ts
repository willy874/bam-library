import { deepmerge } from '@/libs/utils';
import type { RuleSetRule, SwcLoaderOptions } from '@/types/webpack';

import type { DefaultSettings, JsLoaders } from '../types';
import { isPackageInclude, requireResolve } from '@/utils/node/path';

function getBabelLoader(_options: any, settings: DefaultSettings) {
  const { isDev, isProd } = settings;
  try {
    return [
      {
        test: /\.(js|mjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: requireResolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          compact: false,
          presets: [[requireResolve('@bam/react-babel'), { helpers: true }]],
          cacheDirectory: true,
          cacheCompression: false,
          sourceMaps: isDev,
          inputSourceMap: isDev,
        },
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: requireResolve('babel-loader'),
        options: {
          customize: requireResolve('@bam/react-babel/webpack-overrides'),
          presets: [
            [
              requireResolve('@bam/react-babel'),
              {
                runtime: isPackageInclude('react/jsx-runtime') ? 'automatic' : 'classic',
              },
            ],
          ],
          cacheDirectory: true,
          cacheCompression: false,
          compact: isProd,
        },
      },
    ];
  } catch (error) {
    throw new Error('react and react-babel is not found');
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
  // if (options === undefined) {
  //   return getSwcLoader({ type: 'swc' }, settings);
  // }
  if (options === undefined) {
    return getBabelLoader(options, settings);
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
