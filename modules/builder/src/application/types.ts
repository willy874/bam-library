import type { SassLoaderOptions } from '@/types/sass-loader';
import type {
  EslintWebpackPluginOptions,
  ForkTsCheckerWebpackPluginOptions,
  ModuleFederationWebpackPluginOptions,
  HtmlWebpackPluginOptions,
  MiniCssExtractWebpackPluginOptions,
  MiniCssExtractLoaderOptions,
  CopyWebpackPluginOptions,
  CssLoaderOptions,
  PostcssLoaderOptions,
  StyleLoaderOptions,
  WebpackConfig,
  DefinePluginOptions,
  ProvidePluginOptions,
  ProgressWebpackPluginOptions,
  RuleSetRule,
  SwcLoaderOptions,
} from '@/types/webpack';

import type WebpackChain from 'webpack-chain';

export type WebpackCssLoaderOptions = {
  style?: StyleLoaderOptions;
  extract?: MiniCssExtractLoaderOptions;
  css?: CssLoaderOptions;
  postcss?: PostcssLoaderOptions;
  sass?: SassLoaderOptions;
};

export type JsLoaders =
  | (RuleSetRule & { type: 'swc'; options: SwcLoaderOptions })
  | (RuleSetRule & { type: 'babel'; options: any })
  | RuleSetRule
  | RuleSetRule[];

export interface Config {
  webpackConfiguration?: WebpackConfig;
  webpackChain?: (chain: WebpackChain, config: WebpackConfig) => Promise<void> | void;
  // Loaders
  icss?: WebpackCssLoaderOptions;
  localCss?: WebpackCssLoaderOptions;
  svgr?: object;
  js?: JsLoaders;
  // Plugins
  define?: DefinePluginOptions;
  eslint?: EslintWebpackPluginOptions;
  tsCheck?: ForkTsCheckerWebpackPluginOptions;
  moduleFederation?: ModuleFederationWebpackPluginOptions;
  provide?: ProvidePluginOptions;
  htmlTemplate?: HtmlWebpackPluginOptions;
  copy?: CopyWebpackPluginOptions;
  cssExtract?: MiniCssExtractWebpackPluginOptions;
  progress?: ProgressWebpackPluginOptions;
  logs?: Record<string, (cof: WebpackConfig) => any>;
}

export interface DefaultSettings {
  mode: 'development' | 'production';
  host: string;
  port: number;
  isDev: boolean;
  isProd: boolean;
  env: Partial<Record<string, string>>;
  appName: string;
  argv: Record<string, string | number | boolean>;
}
