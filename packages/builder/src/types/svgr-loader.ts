import type { LoaderContext } from './webpack';
import type svgrLoader from '@svgr/webpack';

type GetLoaderOptions<T> = T extends LoaderContext<infer R> ? R : never;

type GetThisType<T> = T extends (this: infer R, ...args: any[]) => any ? R : never;

type SvgrLoaderContext = GetThisType<typeof svgrLoader>;

export type SvgrLoaderOptions = GetLoaderOptions<SvgrLoaderContext>;
