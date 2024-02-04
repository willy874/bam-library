import type { DefaultSettings } from './types';
import type { Configuration } from 'webpack-dev-server';

const net = require('net');

function isPortInUse(port: number) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', (err: { code: string }) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    server.once('listening', () => {
      server.close();
      resolve(false);
    });

    server.listen(port);
  });
}

export const getNextPort = async (port: number) => {
  let nextPort = port;
  while (await isPortInUse(nextPort)) {
    nextPort += 1;
    if (nextPort - port > 100) {
      throw new Error('No available port');
    }
  }
  return nextPort;
};

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
