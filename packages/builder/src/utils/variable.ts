import FS from 'node:fs';

import { ARGS, CWD } from '@/constants';
import { dotenv } from '@/libs/utils';

import { resolveRoot } from './path/extents';

export function getArgv() {
  const ARGUMENT_SEPARATION_REGEX = /([^=\s]+)=?\s*(.*)/;
  const argv = ARGS;
  const parsedArgs: Record<string, string | number | boolean> = {};
  let argName, argValue;
  argv.forEach((p: string) => {
    const arg: RegExpMatchArray | null = p.match(ARGUMENT_SEPARATION_REGEX);
    if (!arg) return;
    arg.splice(0, 1);
    argName = arg[0];
    if (argName.indexOf('-') === 0) {
      argName = argName.slice(argName.slice(0, 2).lastIndexOf('-') + 1);
    }
    argValue = arg[1] !== '' ? (parseFloat(arg[1]).toString() === arg[1] ? +arg[1] : arg[1]) : true;
    parsedArgs[argName] = argValue;
  });
  return parsedArgs;
}

export async function getEnvironment(match = '') {
  const fileList = await FS.promises.readdir(CWD);
  const envs = fileList.filter((p) => new RegExp(`^\\.env(\\.)?${match}$`).test(p));
  const src = resolveRoot(envs.find((p) => p) || '');
  if (src) {
    return Object.assign(
      process.env,
      dotenv.config({
        path: src,
      }).parsed,
    );
  }
  return process.env;
}

export function useOptions<T extends Record<string, any>>(init: T) {
  const _options = init;
  function setOption(options: Partial<T>) {
    Object.assign(_options, options);
  }
  function getOption() {
    return _options;
  }
  return { setOption, getOption };
}
