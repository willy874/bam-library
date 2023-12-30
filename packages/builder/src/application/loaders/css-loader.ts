import { getLocalIdent } from '../utils';

import type { DefaultSettings, WebpackCssLoaderOptions } from '../types';
import { MiniCssExtractPlugin } from '@/libs/webpack';

const getPostcssLoader = (options: WebpackCssLoaderOptions['postcss'], settings: DefaultSettings) => {
  const { isDev } = settings;
  return {
    loader: require.resolve('postcss-loader'),
    options: {
      implementation: require.resolve('postcss'),
      postcssOptions: {
        config: false,
        plugins: [
          [require('postcss-rem')],
          [require('postcss-flexbugs-fixes')],
          [
            require('postcss-preset-env'),
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
          [require('postcss-normalize')],
        ],
      },
      ...options,
      sourceMap: isDev,
    },
  };
};

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
        getPostcssLoader(options.postcss, settings),
        {
          loader: require.resolve('sass-loader'),
          options: {
            implementation: require('sass'),
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
        getPostcssLoader(options.postcss, settings),
        {
          loader: require.resolve('sass-loader'),
          options: {
            implementation: require('sass'),
            ...options.sass,
          },
        },
      ],
    },
  ];
};
