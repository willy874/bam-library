import { Configuration } from 'webpack';

const rootPath = process.cwd();
const path = require('path');

/**
 * JS Doc
 * @type {import('webpack').Configuration}
 */
export default {
  mode: 'development',
  entry: path.join(rootPath, 'src', 'main.ts'),
  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'index.esm.js',
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
    rules: [],
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  externals: {
    webpack: 'webpack',
  },
  optimization: {
    usedExports: true,
  },
} satisfies Configuration;
