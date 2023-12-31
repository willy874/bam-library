import FS from 'node:fs';
import Path from 'node:path';

import { getHashDigest, interpolateName } from 'loader-utils';

import type { CssLoaderContext } from '@/types/css-loader';

export function getLocalIdent(
  context: CssLoaderContext,
  _localIdentName: string,
  localName: string,
  options?: object,
): string {
  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  const fileNameOrFolder = context.resourcePath.match(/index\.module\.(css|scss|sass)$/) ? '[folder]' : '[name]';
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const buffer = FS.readFileSync(Path.posix.relative(context.rootContext, context.resourcePath) + localName);
  const hash = getHashDigest(buffer, 'md5', 'base64', 5);
  // Use loaderUtils to find the file or folder name
  const className = interpolateName(context as any, fileNameOrFolder + '_' + localName + '__' + hash, options);
  // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
  return className.replace('.module_', '_').replace(/\./g, '_');
}
