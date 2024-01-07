import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import { NODEJS_EXTERNALS } from './src/constants';
import { DtsWebpackPlugin } from './src/libs/dts';

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
    ...NODEJS_EXTERNALS,
    /^node:/,
    'dotenv',
    'yaml',
    'deepmerge',
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
    'terser-webpack-plugin',
    'css-loader',
    'style-loader',
    'postcss',
    'postcss-loader',
    'sass',
    'sass-loader',
    '@svgr/webpack',
    '@swc/core',
    'swc-loader',
    'postcss-load-config',
    'postcss-rem',
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
    '@rollup/plugin-commonjs',
    '@rollup/plugin-json',
    '@rollup/plugin-node-resolve',
    'rollup-plugin-esbuild',
    'rollup-plugin-postcss',
    'rollup-plugin-terser',
    'rollup-plugin-visualizer',
    'rollup-plugin-serve',
    'rollup-plugin-livereload',
    'rollup-plugin-styles',
    'rollup-plugin-copy',
    'rollup-plugin-external-globals',
    'rollup-plugin-peer-deps-external',
    'rollup-plugin-swc',
    'rollup-plugin-scss',
  ],
  optimization: {
    usedExports: true,
  },
};
export default [
  webpackMerge(base, {
    output: {
      path: path.join(rootPath, 'dist', 'lib'),
      filename: 'main.common.js',
      globalObject: 'this',
      libraryTarget: 'commonjs',
      library: {
        type: 'commonjs',
      },
      clean: true,
    },
    externalsType: 'commonjs-module',
  }),
];
