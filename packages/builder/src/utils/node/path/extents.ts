import { CWD } from '@/constants';

import path from 'node:path';

export function resolveRoot(...args: string[]) {
  return path.resolve(CWD, ...args);
}

export const requireResolve = (id: string) => {
  return require.resolve(id);
};

export const isPackageInclude = (id: string) => {
  const pkgPath = requireResolve(id);
  return path.isAbsolute(pkgPath) && pkgPath !== id;
};
