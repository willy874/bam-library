import { deepmerge } from '@/libs/utils';
import type { ModuleFederationWebpackPluginOptions } from '@/types/webpack';
import { path, fs } from '@/utils';

import type { DefaultSettings } from '../types';
import { webpack } from '@/libs/webpack';

export function getModuleFederationPlugin(options: ModuleFederationWebpackPluginOptions, settings: DefaultSettings) {
  const { appName } = settings;
  const defaultPath = path.resolveRoot('src', 'web-components.ts');
  const defaultExposes: ModuleFederationWebpackPluginOptions['exposes'] = fs.isFile(defaultPath)
    ? {
        './web-components': defaultPath,
      }
    : {};
  const exposesAppName = appName || options.name;
  if (!exposesAppName) {
    return undefined;
  }
  return new webpack.container.ModuleFederationPlugin(
    deepmerge<ModuleFederationWebpackPluginOptions>(
      {
        name: exposesAppName,
        filename: 'remoteEntry.js',
        library: {
          type: 'var',
          name: exposesAppName,
        },
        exposes: defaultExposes,
      },
      options,
    ),
  );
}
