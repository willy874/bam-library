import fs from 'fs';
import path from 'path';
import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import { NODEJS_EXTERNALS } from './src/constants';
import { DtsWebpackPlugin } from './src/libs/dts';
import type { PackageJson } from 'type-fest';

const rootPath = process.cwd();

const pkg: PackageJson = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf-8'));

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
    /babel-preset-react-app\/(.)+/,
    'react/jsx-runtime',
    ...Object.keys(pkg?.peerDependencies || {}),
    ...Object.keys(pkg?.dependencies || {}),
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
