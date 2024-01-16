import { deepmerge } from '@/libs/utils';

import type { DefaultSettings } from '../types';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export function getSvgrLoader(options: any, settings: DefaultSettings) {
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
