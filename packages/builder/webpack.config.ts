import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';

const rootPath = process.cwd();
const path = require('path');

const base: Configuration = {
  mode: 'development',
  entry: path.join(rootPath, 'src', 'main.ts'),
  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'index.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.join(rootPath, 'src'),
    },
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'swc-loader',
          },
        ],
      },
    ],
  },
  experiments: {
    outputModule: true,
  },
  externals: [
    /^node:/,
    'dotenv',
    'yaml',
    'deepmerge',
    'tsconfig-type',
    'eslint',
    'typescript',
    'webpack',
    'webpack-chain',
    'webpack-merge',
    'webpack-dev-server',
    'webpack-cli',
    'copy-webpack-plugin',
    'eslint-webpack-plugin',
    'fork-ts-checker-webpack-plugin',
    'html-webpack-plugin',
    'mini-css-extract-plugin',
    'css-minimizer-webpack-plugin',
    'css-loader',
    'style-loader',
    'postcss',
    'postcss-loader',
    'postcss-load-config',
    'sass',
    'sass-loader',
    '@svgr/webpack',
    '@swc/core',
    'swc-loader',
    'postcss-flexbugs-fixes',
    'postcss-preset-env',
    'postcss-normalize',
    '@babel/core',
    'babel-loader',
    'babel-preset-react-app',
    /babel-preset-react-app\/(.)+/,
    'react/jsx-runtime',
    'loader-utils',
  ],
  optimization: {
    usedExports: true,
  },
};
export default [
  base,
  webpackMerge(base, {
    output: {
      filename: 'index.esm.js',
    },
    externalsType: 'module',
  }),
  webpackMerge(base, {
    output: {
      filename: 'index.common.js',
    },
    externalsType: 'commonjs',
  }),
];
