import { AnyFunction, RecordKeyType } from '@/utils/types';
import { DefineEventBus } from './eventBus';
import { EMPTY, EMPTY_FUNCTION } from '../constants';
import { BaseEvent } from './event';

export interface ExecuteInfo<P extends unknown[] = any[], R = any> {
  readonly parameters: P;
  readonly result: Awaited<R>;
  readonly error: unknown;
}

export interface ExecutedEvent extends BaseEvent<ExecuteInfo<unknown[], unknown>> {}
export interface BeforeExecuteEvent extends BaseEvent<ExecuteInfo<unknown[], void>> {}
export interface ExecuteErrorEvent extends BaseEvent<ExecuteInfo<unknown[], void>> {}

export type BaseHandlerEventMap = {
  beforeExecute: (event: BeforeExecuteEvent) => void;
  executed: (event: ExecutedEvent) => void;
  error: (error: ExecuteErrorEvent) => void;
};

interface BaseHandlerInterface<N extends RecordKeyType, F extends AnyFunction>
  extends DefineEventBus<BaseHandlerEventMap> {
  name: N;
  type: string;
  handler: AnyFunction;
  execute: (...args: Parameters<F>) => ReturnType<F>;
  toHandler: () => F;
}

type ServiceOptions<F extends AnyFunction> = {
  type: 'service';
  handler: F;
  override?: boolean;
};

type EventOptions<F extends AnyFunction> = {
  type: 'event';
  handler: F;
  once?: boolean;
};

type QueryOptions<F extends AnyFunction> = {
  type: 'query';
  handler: F;
  cache?: boolean;
};

type CommandOptions<F extends AnyFunction> = {
  type: 'command';
  handler: F;
  block?: boolean;
};

export type HandlerOptions<F extends AnyFunction> =
  | ServiceOptions<F>
  | EventOptions<F>
  | QueryOptions<F>
  | CommandOptions<F>;

type EmptyHandler = BaseHandlerInterface<typeof EMPTY, typeof EMPTY_FUNCTION> & { type: typeof EMPTY };
type ServiceHandler<N extends RecordKeyType, F extends AnyFunction> = BaseHandlerInterface<N, F> & ServiceOptions<F>;
type EventHandler<N extends RecordKeyType, F extends AnyFunction> = BaseHandlerInterface<N, F> & EventOptions<F>;
type QueryHandler<N extends RecordKeyType, F extends AnyFunction> = BaseHandlerInterface<N, F> & QueryOptions<F>;
type CommandHandler<N extends RecordKeyType, F extends AnyFunction> = BaseHandlerInterface<N, F> & CommandOptions<F>;

export interface UnknownBaseHandler<N extends RecordKeyType = RecordKeyType, F extends AnyFunction = AnyFunction>
  extends BaseHandlerInterface<N, F> {
  type: string;
  override?: ServiceOptions<F>['override'];
  cache?: QueryOptions<F>['cache'];
  once?: EventOptions<F>['once'];
  block?: CommandOptions<F>['block'];
}

export type BaseHandler<N extends RecordKeyType = RecordKeyType, F extends AnyFunction = AnyFunction> =
  | EmptyHandler
  | ServiceHandler<N, F>
  | EventHandler<N, F>
  | QueryHandler<N, F>
  | CommandHandler<N, F>
  | UnknownBaseHandler<N, F>;

export type AnyHandler = BaseHandler<RecordKeyType, AnyFunction>;

export type DefineHandler<N extends RecordKeyType = RecordKeyType, F extends AnyFunction = AnyFunction> =
  | HandlerOptions<F>
  | BaseHandler<N, F>;

export type GetHandlerName<T extends DefineHandler> = T extends { name: infer R } ? R : never;
export type GetHandlerFunction<T extends DefineHandler> = T extends { handler: infer R } ? R : never;
export type GetHandlerType<T extends DefineHandler> = T extends { type: infer R } ? R : never;
