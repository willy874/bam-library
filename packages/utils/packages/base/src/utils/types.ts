export type AnyFunction = (...args: any[]) => any;

export type UnknownFunction = (...args: unknown[]) => unknown;

export interface ClassConstructor extends Function {
  new (...args: any[]): any;
}

export type ArrayItemType<T> = T extends (infer U)[] ? U : never;

export type ObjectItemType<T> = T extends { [K in string]: infer U } ? U : never;

export type QueryOptions = string[][] | Record<string, string> | string | URLSearchParams;

export type JsonValue = null | boolean | string | number | JsonObject | JsonValue[];

export type JsonObject = {
  [key: string]: JsonValue;
};

export type FormDataObject = {
  [key: string]: string | Blob;
};
