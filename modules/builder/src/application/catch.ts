import { DefaultSettings } from './types';
import { path, fs, crypto } from '@/utils';
import type { WebpackConfig } from '@/types/webpack';
import { CWD } from '@/constants';

export function getCatch(_settings: DefaultSettings, env: Partial<Record<string, string>>): WebpackConfig['cache'] {
  const hash = crypto.createHash('md5');
  hash.update(JSON.stringify(env));

  return {
    type: 'filesystem',
    version: hash.digest('hex'),
    cacheDirectory: path.resolveRoot('node_modules', '.cache'),
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [CWD],
      tsconfig: [path.resolveRoot('tsconfig.json')].filter(fs.isFile),
    },
  };
}
