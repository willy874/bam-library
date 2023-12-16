import { deepmerge } from '@/libs/utils';
import type { SvgrLoaderOptions } from '@/types/svgr-loader';

import type { DefaultSettings } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export function getSvgrLoader(options: SvgrLoaderOptions, settings: DefaultSettings) {
  const svgrOption = deepmerge(
    {
      ref: true,
      icon: true,
      babel: false,
      svgo: false,
      prettier: false,
      titleProp: true,
      svgoConfig: {
        plugins: [{ removeViewBox: false }],
      },
    },
    options,
  );
  return [
    {
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/, // *.svg?url
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      resourceQuery: /react/, // *.svg?react
      use: [
        {
          loader: 'swc-loader',
        },
        {
          loader: require.resolve('@svgr/webpack'),
          options: svgrOption,
        },
      ],
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    },
  ];
}
