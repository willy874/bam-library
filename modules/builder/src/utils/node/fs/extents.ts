import fs from 'node:fs';
import Path from 'node:path';

import { CWD, ConsoleColors } from '@/constants';
import { dotenv, yaml } from '@/libs/utils';
import type { PackageJson, Tsconfig } from '@/types/config';

import { resolveRoot } from '@/utils/node/path/extents';

export function isFile(src: string) {
  return fs.existsSync(src) && fs.statSync(src).isFile();
}

export function isDirectory(src: string) {
  return fs.existsSync(src) && !fs.statSync(src).isFile();
}

export function deepDirectory(
  uri: string,
  callback?: (path: string) => Promise<boolean | void> | boolean | void,
): Promise<string[]> {
  if (!isDirectory(uri)) throw new Error(`The path ${uri} is not a directory!`);
  const walk = async (dir: string): Promise<string[]> => {
    const files = await fs.promises.readdir(dir);
    const promises = files.map(async (file) => {
      const fullPath = Path.join(dir, file);
      if ((await callback?.(fullPath)) === false) return [];
      if (isDirectory(fullPath)) return await walk(fullPath);
      return fullPath;
    });
    const paths = await Promise.all(promises);
    return paths.flat();
  };
  return walk(uri);
}

export async function readFile(src: string) {
  try {
    if (!isFile(src)) {
      throw new Error(
        `${ConsoleColors.FgRed}The path ${ConsoleColors.FgBlue}${src}${ConsoleColors.FgRed} is not define!${ConsoleColors.Reset}`,
      );
    }
    if (/\.[cm]?js$/.test(src)) {
      return await import(`${src}`);
    }
    if (/^\.env/.test(src)) {
      const env = await fs.promises.readFile(src);
      return dotenv.parse(env);
    }
    if (/^\.(\w)+rc$/.test(src) || /\.json$/.test(src)) {
      const str = await fs.promises.readFile(src, { encoding: 'utf8' });
      return JSON.parse(str);
    }
    if (/\.ya(m)?l/.test(src)) {
      const str = await fs.promises.readFile(src, { encoding: 'utf8' });
      return yaml.parse(str);
    }
    return (await fs.promises.readFile(src)).toString();
  } catch (error) {
    return null;
  }
}

export async function getPackageJson(p = `${CWD}`): Promise<null | PackageJson> {
  const path = /\.json$/.test(p) ? p : `${p}/package.json`;
  if (isFile(path)) {
    try {
      const file = await fs.promises.readFile(path, 'utf-8');
      return JSON.parse(file);
    } catch (error) {
      return null;
    }
  }
  return null;
}

export async function getTsConfig(p = CWD): Promise<null | Tsconfig> {
  const path = /\.json$/.test(p) ? p : `${p}/tsconfig.json`;
  if (isFile(path)) {
    try {
      const file = await fs.promises.readFile(path, 'utf-8');
      return JSON.parse(file);
    } catch (error) {
      return null;
    }
  }
  return null;
}

export async function getConfiguration(keyword: string) {
  try {
    const fileList = await fs.promises.readdir(CWD);
    const fileRegexp = [
      new RegExp(`^${keyword}rc(\\.(m|c)?js(x|on)?)?$`),
      new RegExp(`^${keyword}rc(\\.js(x|on)?)?$`),
      new RegExp(`^${keyword}\\.config\\.(m|c)?js(x|on)?$`),
      new RegExp(`^${keyword}\\.config\\.js(x|on)?$`),
    ];
    const configs = fileList.filter((p) => fileRegexp.some((r) => r.test(p)));
    const src = resolveRoot(configs.find((p) => p) || '');
    return await readFile(src);
  } catch (error) {
    return null;
  }
}
