export interface Constructor<T = object> extends Function {
  new (...args: any[]): T;
}

export type RecordKeyType = number | string | symbol;

export type AnyFunction = (...params: any[]) => any;

export type PromiseFunction = (...params: any[]) => Promise<any> | void;

export type VoidFunction = (...params: any[]) => void;

export type Ref<T> = { current: T };

export type MaybePromise<T> = T | Promise<T>;

export type MaybeArray<T> = T | Array<T>;

export type ArrayType<T> = T extends (infer R)[] ? R : never;
