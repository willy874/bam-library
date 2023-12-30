import type { EventEmitter } from './event';
import type { AnyFunction, RecordKeyType } from './utils';

export type ToHandler<
  K extends RecordKeyType = RecordKeyType,
  T extends BaseHandler | AnyFunction | unknown = BaseHandler,
> = T extends BaseHandler ? T : T extends AnyFunction ? BaseHandler<K, T> : BaseHandler<K, () => T>;

export type GetHandlerFunction<T> = T extends BaseHandler<RecordKeyType, infer F> ? F : never;

export type ToProvider<T extends BaseHandler | AnyFunction | any> = T extends BaseHandler
  ? GetHandlerFunction<T>
  : T extends AnyFunction
  ? T
  : () => T;

export type ToBindingValue<T extends BaseHandler | AnyFunction | any> = T extends BaseHandler
  ? ReturnType<GetHandlerFunction<T>>
  : T extends AnyFunction
  ? ReturnType<T>
  : T;

export type AutoBindToHandler<T extends Record<RecordKeyType, any>> = {
  [K in keyof T]: ToHandler<K, T[K]>;
};

export type AutoBindToValue<T extends Record<RecordKeyType, any>> = {
  [K in keyof T]: ToBindingValue<T[K]>;
};

export type AutoBindToProvider<T extends Record<RecordKeyType, any>> = {
  [K in keyof T]: ToProvider<T[K]>;
};

export type ToBindOptional<
  T extends BaseHandler | AnyFunction | any,
  K extends RecordKeyType = RecordKeyType,
> = T extends BaseHandler
  ? T | GetHandlerFunction<T> | ReturnType<GetHandlerFunction<T>>
  : T extends AnyFunction
  ? BaseHandler<K, T> | T | ReturnType<T>
  : BaseHandler<K, () => T> | (() => T) | T;

export type ToOptionalMap<T extends Record<RecordKeyType, any>> = {
  [K in keyof T]: ToBindOptional<T[K], K>;
};

export type BaseHandlerOptions<N extends RecordKeyType, F extends AnyFunction = AnyFunction> = {
  name?: N;
  execute?: F;
};

export interface BaseHandler<N extends RecordKeyType = RecordKeyType, F extends AnyFunction = AnyFunction>
  extends EventEmitter {
  name: N;
  execute(...input: Parameters<F>): ReturnType<F>;
}

export interface BaseHandlerConstructor {
  new <N extends RecordKeyType = RecordKeyType, F extends AnyFunction = AnyFunction>(): BaseHandler<N, F>;
  new <N extends RecordKeyType = RecordKeyType, F extends AnyFunction = AnyFunction>(
    handler: BaseHandler<N, F>,
  ): BaseHandler<N, F>;
  new <N extends RecordKeyType = RecordKeyType, F extends AnyFunction = AnyFunction>(
    options: BaseHandlerOptions<N, F>,
  ): BaseHandler<N, F>;
  new <N extends RecordKeyType = RecordKeyType, F extends AnyFunction = AnyFunction>(
    name: N,
    handler: F,
  ): BaseHandler<N, F>;
  new <N extends RecordKeyType = RecordKeyType, F extends AnyFunction = AnyFunction>(
    name: N,
    handler: F,
    options: BaseHandlerOptions<N, F>,
  ): BaseHandler<N, F>;

  readonly prototype: BaseHandler;
}

export interface Binder<N extends RecordKeyType = RecordKeyType, F extends BaseHandler = BaseHandler> {
  name: N;
  toHandler(value: ToHandler<N, F>): void;
  toHandler(value: ToProvider<F>): void;
  toHandler(value: ToBindingValue<F>): void;
  toHandler(value: unknown): void;
  execute(...input: Parameters<GetHandlerFunction<F>>): ReturnType<GetHandlerFunction<F>>;
}

export interface BinderConstructor {
  new (): Binder;
  new <T extends RecordKeyType>(name: T): Binder<T>;
  new <T extends RecordKeyType, F>(name: T, handler: F): Binder<T, ToHandler<T, F>>;
  readonly prototype: Binder;
}

export interface Registry<
  B extends Record<RecordKeyType, unknown> = Record<RecordKeyType, unknown>,
  M extends Record<RecordKeyType, BaseHandler> = AutoBindToHandler<B>,
> extends EventEmitter {
  binding<T extends keyof M>(name: T): Binder<T, M[T]>;
  binding(name: RecordKeyType): Binder;
  unbind<T extends keyof M>(target: T): boolean;
  unbind(target: RecordKeyType): boolean;
  unbind(target: Binder): boolean;
  hasBinding<T extends keyof M>(target: T): boolean;
  hasBinding(target: RecordKeyType): boolean;
  lookup<T extends keyof M>(name: T): Binder<T, M[T]>;
  lookup(name: RecordKeyType): Binder;
  clear(): void;
}

export interface RegistryConstructor {
  new (): Registry;
  new <T extends Record<RecordKeyType, AnyFunction>>(map: T): Registry<T>;
  readonly prototype: Registry;
}
