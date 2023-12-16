import { getLocalIdent } from '../utils';

import type { DefaultSettings, WebpackCssLoaderOptions } from '../types';
import { MiniCssExtractPlugin } from '@/libs/webpack';

export const getIcssLoader = (options: WebpackCssLoaderOptions, settings: DefaultSettings) => {
  const { isDev } = settings;
  return [
    {
      test: /\.(scss|sass|css)$/,
      exclude: /\.module\.(scss|sass|css)$/,
      use: [
        {
          loader: require.resolve('style-loader'),
          options: {
            ...options.style,
          },
        },
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            ...options.extract,
          },
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            ...options.css,
            sourceMap: isDev,
            modules: {
              mode: 'icss',
            },
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            implementation: require.resolve('postcss'),
            postcssOptions: {
              config: false,
              plugins: [
                require.resolve('postcss-flexbugs-fixes'),
                [
                  require.resolve('postcss-preset-env'),
                  {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  },
                ],
                require.resolve('postcss-normalize'),
              ],
            },
            ...options.postcss,
            sourceMap: isDev,
          },
        },
        {
          loader: require.resolve('sass-loader'),
          options: {
            implementation: require.resolve('sass'),
            ...options.sass,
          },
        },
      ],
      sideEffects: true,
    },
  ];
};

export const getLocalCssLoader = (options: WebpackCssLoaderOptions, settings: DefaultSettings) => {
  const { isDev } = settings;
  return [
    {
      test: /\.module\.(scss|sass|css)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          ...options.extract,
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            sourceMap: isDev,
            modules: {
              getLocalIdent,
              ...options.css,
              mode: 'local',
            },
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            implementation: require.resolve('postcss'),
            postcssOptions: {
              config: false,
              plugins: [
                require.resolve('postcss-flexbugs-fixes'),
                [
                  require.resolve('postcss-preset-env'),
                  {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  },
                ],
                require.resolve('postcss-normalize'),
              ],
            },
            ...options.postcss,
            sourceMap: isDev,
          },
        },
        {
          loader: require.resolve('sass-loader'),
          options: {
            implementation: require.resolve('sass'),
            ...options.sass,
          },
        },
      ],
    },
  ];
};
