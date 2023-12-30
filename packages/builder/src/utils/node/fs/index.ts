import fs from 'node:fs';
import * as fsPromises from './promises';

export const statSync = fs.statSync;
export const existsSync = fs.existsSync;
export const promises = fsPromises;
export * from './extents';
