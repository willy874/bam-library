import type { DefaultSettings } from './types';
import type { Configuration } from 'webpack-dev-server';

export function getDevServe(settings: DefaultSettings): Configuration {
  return {
    port: settings.port,
    host: settings.host,
    historyApiFallback: {
      disableDotRule: true,
    },
    compress: true,
    hot: true,
    allowedHosts: 'all',
    client: {
      webSocketURL: {
        hostname: '0.0.0.0',
      },
    },
  };
}
