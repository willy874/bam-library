import type sass from 'sass';
import type { Options as SassOptions } from 'sass';
import type { LoaderContext } from 'webpack';

type Sass = typeof sass;

export interface SassLoaderOptions {
  implementation?: Sass;
  sassOptions?:
    | SassOptions<'async'>
    | ((content: string | Buffer, loaderContext: LoaderContext<SassLoaderOptions>, meta: any) => SassOptions<'async'>);
  sourceMap?: boolean;
  additionalData?: string | ((content: string | Buffer, loaderContext: LoaderContext<SassLoaderOptions>) => string);
  webpackImporter?: boolean;
  warnRuleAsWarning?: boolean;
}

export type SassLoaderContext = LoaderContext<SassLoaderOptions>;
