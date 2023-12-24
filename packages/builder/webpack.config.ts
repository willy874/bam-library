import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import { DtsWebpackPlugin } from './src/application/plugins/dts';

const rootPath = process.cwd();
const path = require('path');

const base: Configuration = {
  mode: 'development',
  entry: path.join(rootPath, 'src', 'main.ts'),
  output: {
    path: path.join(rootPath, 'dist', 'lib'),
    filename: 'index.js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.join(rootPath, 'src'),
    },
  },
  plugins: [new DtsWebpackPlugin()],
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
    'rollup',
    'rollup-plugin-dts',
    '@rollup/plugin-alias',
  ],
  optimization: {
    usedExports: true,
  },
};
export default [
  webpackMerge(base, {
    output: {
      path: path.join(rootPath, 'dist', 'es'),
      filename: 'main.esm.js',
      clean: true,
    },
    externalsType: 'module',
  }),
  webpackMerge(base, {
    output: {
      filename: 'main.common.js',
    },
    externalsType: 'commonjs',
  }),
];
