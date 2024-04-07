import { AnyFunction, RecordKeyType } from '@/utils/types';
import { DefineEventBus } from './eventBus';
import { ClassType, EMPTY, EMPTY_FUNCTION } from '../constants';
import { BaseEvent } from './event';
import { Abstract } from '../interface';
import { HandlerNotDefinedError } from './error';

export class BeforeExecuteEvent<D extends Abstract.ExecuteInfo>
  extends BaseEvent<D>
  implements Abstract.BeforeExecuteEvent
{
  constructor(parameters: any[]) {
    const info = {
      parameters,
      result: undefined,
      error: null,
    } as D;
    super('beforeExecute', info);
  }
}

export class ExecutedEvent<D extends Abstract.ExecuteInfo> extends BaseEvent<D> implements Abstract.ExecutedEvent {
  constructor(parameters: any[], result: any) {
    const info = {
      parameters,
      result,
      error: null,
    } as D;
    super('executed', info);
  }
}

export class ExecuteErrorEvent<D extends Abstract.ExecuteInfo>
  extends BaseEvent<D>
  implements Abstract.ExecuteErrorEvent
{
  constructor(parameters: any[], error: unknown) {
    const info = {
      parameters,
      result: undefined,
      error,
    } as D;
    super('error', info);
  }
}

export class BaseHandler<Name extends RecordKeyType = RecordKeyType, Execute extends AnyFunction = AnyFunction>
  extends DefineEventBus<Abstract.BaseHandlerEventMap>
  implements Abstract.UnknownBaseHandler<Name, Execute>
{
  name: Name;
  handler: AnyFunction = EMPTY_FUNCTION;
  type: Abstract.BaseHandler['type'] = EMPTY as any;
  override: boolean = false;
  cache: boolean = false;
  once: boolean = false;
  block: boolean = false;

  constructor();
  constructor(name: Name, options?: Abstract.HandlerOptions<Execute>);
  constructor(name: Name = EMPTY as any, options?: Abstract.HandlerOptions<Execute>) {
    super();
    this.name = name;
    if (options) {
      this.handler = options.handler;
      this.type = options.type;
      if (options.type === 'service') {
        this.override = options.override || false;
      }
      if (options.type === 'event') {
        this.once = options.once || false;
      }
      if (options.type === 'query') {
        this.cache = options.cache || false;
      }
      if (options.type === 'command') {
        this.block = options.block || false;
      }
    }
  }

  toString(): string {
    return ClassType.EVENT_BUS;
  }

  execute(...args: Parameters<Execute>): ReturnType<Execute> {
    if (this.handler === EMPTY_FUNCTION) {
      throw new HandlerNotDefinedError();
    }
    this.emit('beforeExecute', new BeforeExecuteEvent(args));
    try {
      const result = this.handler(...args);
      if (result instanceof Promise) {
        const promise = Promise.resolve(result)
          .then((result: ReturnType<Execute>) => {
            this.emit('executed', new ExecutedEvent(args, result));
            return Promise.resolve(result);
          })
          .catch((error: unknown) => {
            this.emit('error', new ExecuteErrorEvent(args, error));
            return Promise.reject(error);
          });
        return promise as ReturnType<Execute>;
      }
      this.emit('executed', new ExecutedEvent(args, result));
      return result;
    } catch (error) {
      this.emit('error', new ExecuteErrorEvent(args, error));
      throw error;
    }
  }

  toHandler(): Execute {
    return this.execute.bind(this) as Execute;
  }
}

export function isBaseHandler(value: unknown): value is Abstract.BaseHandler {
  return String(value) === ClassType.BASE_HANDLER;
}
