import webpack from 'webpack';
import WebpackChain from 'webpack-chain';
import webpackMerge from 'webpack-merge';
import 'webpack-dev-server';
import 'webpack-cli';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { getHashDigest, interpolateName } from 'loader-utils';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import 'css-loader';
import 'style-loader';
import 'postcss';
import 'postcss-loader';
import 'postcss-load-config';
import 'sass';
import 'sass-loader';
import '@svgr/webpack';
import '@swc/core';
import 'swc-loader';
import 'postcss-flexbugs-fixes';
import 'postcss-preset-env';
import 'postcss-normalize';
import '@babel/core';

export {
  webpack,
  WebpackChain,
  webpackMerge,
  getHashDigest,
  interpolateName,
  CopyWebpackPlugin,
  ESLintWebpackPlugin,
  ForkTsCheckerWebpackPlugin,
  HtmlWebpackPlugin,
  MiniCssExtractPlugin,
  CssMinimizerPlugin,
  TerserWebpackPlugin,
};
