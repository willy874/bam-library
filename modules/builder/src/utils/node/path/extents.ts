import { CWD } from '@/constants';

import path from 'node:path';

export function resolveRoot(...args: string[]) {
  return path.resolve(CWD, ...args);
}
