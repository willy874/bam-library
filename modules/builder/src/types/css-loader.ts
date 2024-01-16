import type { interpolateName } from 'loader-utils';
import type { LoaderContext } from 'webpack';

export interface CssLoaderModulesOptions {
  auto?: boolean | RegExp | ((resourcePath: string) => boolean);
  mode?: 'local' | 'global' | 'pure' | 'icss' | ((resourcePath: string) => 'local' | 'global' | 'pure' | 'icss');
  localIdentName?: string;
  localIdentContext?: string;
  localIdentHashSalt?: string;
  localIdentHashFunction?: string;
  localIdentHashDigest?: string;
  localIdentRegExp?: string | RegExp;
  getLocalIdent?: (context: LoaderContext<any>, localIdentName: string, localName: string) => string;
  namedExport?: boolean;
  exportGlobals?: boolean;
  exportLocalsConvention?:
    | 'asIs'
    | 'camelCase'
    | 'camelCaseOnly'
    | 'dashes'
    | 'dashesOnly'
    | ((name: string) => string);
  exportOnlyLocals?: boolean;
}

export interface CssLoaderOptions {
  url?: boolean | ((url: string, resourcePath: string) => boolean);
  import?: boolean | ((url: string, resourcePath: string) => boolean);
  modules?: boolean | 'local' | 'global' | 'pure' | 'icss' | CssLoaderModulesOptions;
  sourceMap?: boolean;
  importLoaders?: number;
  esModule?: boolean;
  exportType?: 'named' | 'default' | 'namespace' | 'none';
}

export interface LoaderExtendOptions {
  customInterpolateName?: typeof interpolateName;
}

export type CssLoaderContext = LoaderContext<CssLoaderOptions> & LoaderExtendOptions;
