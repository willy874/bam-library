export type AnyFunction = (...args: any[]) => any;

export type UnknownFunction = (...args: unknown[]) => unknown;

export interface ClassConstructor extends Function {
  new (...args: any[]): any;
}

export type ArrayItemType<T> = T extends (infer U)[] ? U : never;

export type RecordItemType<T> = T extends { [K in string]: infer U } ? U : never;
