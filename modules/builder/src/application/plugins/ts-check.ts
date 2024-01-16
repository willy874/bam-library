import { CWD } from '@/constants';
import { deepmerge } from '@/libs/utils';
import type { ForkTsCheckerWebpackPluginOptions } from '@/types/webpack';
import { path } from '@/utils';

import type { DefaultSettings } from '../types';
import { ForkTsCheckerWebpackPlugin } from '@/libs/webpack';

export function getForkTsCheckerWebpackPlugin(config: ForkTsCheckerWebpackPluginOptions, settings: DefaultSettings) {
  const { isDev } = settings;
  return new ForkTsCheckerWebpackPlugin(
    deepmerge<ForkTsCheckerWebpackPluginOptions>(
      {
        async: isDev,
        typescript: {
          typescriptPath: require.resolve('typescript'),
          configOverwrite: {
            compilerOptions: {
              sourceMap: isDev,
              skipLibCheck: true,
              inlineSourceMap: false,
              declarationMap: false,
              noEmit: true,
              incremental: true,
              tsBuildInfoFile: path.resolveRoot('node_modules', '.cache', 'tsconfig.tsbuildinfo'),
            },
          },
          context: CWD,
          diagnosticOptions: {
            syntactic: true,
          },
          mode: 'write-references',
          memoryLimit: 4096,
        },
        issue: {
          include: [{ file: '**/src/**/*.{ts,tsx}' }],
          exclude: [
            { file: '**/src/**/__tests__/**' },
            { file: '**/src/**/__mocks__/**' },
            { file: '**/src/**/?(*.){spec|test}.*' },
          ],
        },
        logger: 'webpack-infrastructure',
      },
      config,
    ),
  );
}
