import type { CssLoaderOptions } from './css-loader';
import type { ModuleFederationWebpackPluginOptions } from './module-federation';
import type { PostcssLoaderOptions } from './postcss-loader';
import type { ProgressPluginArgument as ProgressWebpackPluginOptions } from './progress';
import type { StyleLoaderOptions } from './style-loader';
import type { print } from '@swc/core';
import type { Pattern, AdditionalOptions, ObjectPattern } from 'copy-webpack-plugin';
import type { Options as EslintWebpackPluginOptions } from 'eslint-webpack-plugin';
import type { ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/plugin-options';
import type { Options as HtmlWebpackPluginOptions } from 'html-webpack-plugin';
import type {
  LoaderOptions as MiniCssExtractLoaderOptions,
  PluginOptions as MiniCssExtractWebpackPluginOptions,
} from 'mini-css-extract-plugin';
import type { Configuration, LoaderContext, DefinePlugin, ProvidePlugin, RuleSetRule } from 'webpack';

type SwcLoaderOptions = NonNullable<Parameters<typeof print>[1]>;

interface CopyWebpackPluginOptions {
  pattern?: Partial<ObjectPattern>;
  patterns?: Pattern[];
  options?: AdditionalOptions;
}
export type DefinePluginOptions = DefinePlugin['definitions'];
export type ProvidePluginOptions = ProvidePlugin['definitions'];
export type WebpackConfig = Configuration;
export type {
  RuleSetRule,
  LoaderContext,
  MiniCssExtractLoaderOptions,
  SwcLoaderOptions,
  MiniCssExtractWebpackPluginOptions,
  CopyWebpackPluginOptions,
  EslintWebpackPluginOptions,
  ForkTsCheckerWebpackPluginOptions,
  HtmlWebpackPluginOptions,
  ModuleFederationWebpackPluginOptions,
  CssLoaderOptions,
  StyleLoaderOptions,
  PostcssLoaderOptions,
  ProgressWebpackPluginOptions,
};
