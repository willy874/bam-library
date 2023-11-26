import { isNull, isObject } from '../libs';
import { ClassConstructor } from './types';

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isIterator<T extends object>(value: unknown): value is IterableIterator<T> {
  return Boolean(typeof value === 'object' && value && typeof (value as any)[Symbol.iterator] === 'function');
}

export function isEmptyString(value: unknown): value is string {
  return typeof value === 'string' && /^\s*$/.test(value);
}

export function isEmptyNumber(value: unknown): value is number {
  return typeof value === 'number' && isNaN(value);
}

export function isEmptyObject<T>(value: T): value is T & Record<any, undefined> {
  if (typeof value === 'object' && value) {
    /** Array */
    if ('length' in value && value['length'] === 0) {
      return true;
    }
    /** ArrayBuffer */
    if ('byteLength' in value && value['byteLength'] === 0) {
      return true;
    }
    /** Map, Set, Blob */
    if ('size' in value && value['size'] === 0) {
      return true;
    }
    if (value instanceof RegExp) {
      return value.toString() === '/(?:)/';
    }
    if (isObject(value)) {
      return JSON.stringify(value) === '{}';
    }
    return !Object.prototype.valueOf.call(value);
  }
  return false;
}

export function isNotEmpty(value: unknown): boolean {
  if (typeof value === 'object') {
    return value === null ? false : !isEmptyObject(value);
  }
  return value === '' || isFiniteNumber(value) || Boolean(value);
}

export function isSome(value1: unknown, value2: unknown): boolean {
  return Object.is(value1, value2);
}

export function isNotNull<T>(value?: T | null | undefined): value is T {
  return !isNull(value) && typeof value !== 'undefined';
}

export function is<T extends ClassConstructor>(val: unknown, type: T): val is T {
  return Object.prototype.toString.call(val) === `[object ${type.name}]`;
}

export function isClass(value: unknown): value is ClassConstructor {
  return (
    Object.prototype.toString.call(value) === '[object Function]' &&
    typeof value === 'function' &&
    'constructor' in value.prototype
  );
}
