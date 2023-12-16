import type postcss from 'postcss';
import type { Config as PostCSSConfig } from 'postcss-load-config';

export interface PostcssLoaderOptions {
  execute?: boolean;
  postcssOptions?: PostCSSConfig;
  sourceMap?: boolean;
  implementation?: typeof postcss;
}
