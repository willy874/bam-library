import { deepmerge } from '@/libs/utils';
import { CopyWebpackPlugin } from '@/libs/webpack';
import type { CopyWebpackPluginOptions } from '@/types/webpack';
import { path } from '@/utils';

export function getCopyPlugin(options: CopyWebpackPluginOptions) {
  const pattern = deepmerge(
    {
      from: path.resolveRoot('public'),
      to: path.resolveRoot('dist'),
      toType: 'dir',
      noErrorOnMissing: true,
      globOptions: {
        ignore: ['**/.DS_Store', path.resolveRoot('public', 'index.html')],
      },
      info: {
        minimized: true,
      },
    },
    options.pattern || {},
  );
  return new CopyWebpackPlugin({
    patterns: [pattern, ...(options.patterns || [])],
    options: options.options || {},
  });
}
