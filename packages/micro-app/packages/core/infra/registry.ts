import { RecordKeyType } from '@/utils';
import { Abstract } from '../interface';
import { DefineEventBus } from './eventBus';
import { HandlerNotFoundError } from './error';
import { BaseEvent } from './event';
import { ClassType } from '../constants';

export class BindingEvent extends BaseEvent<Abstract.BindingInfo> implements Abstract.BindingEvent {
  constructor(name: RecordKeyType, handler: Abstract.AnyHandler) {
    super('binding', { name, handler });
  }
}

export class UnbindingEvent extends BaseEvent<Abstract.BindingInfo> implements Abstract.UnbindingEvent {
  constructor(name: RecordKeyType, handler: Abstract.AnyHandler) {
    super('unbinding', { name, handler });
  }
}

export class Registry extends DefineEventBus<Abstract.RegistryEventMap> implements Abstract.Registry {
  #bindings: Record<RecordKeyType, Abstract.AnyHandler> = {};

  toString(): string {
    return ClassType.REGISTRY;
  }

  binding(name: RecordKeyType, handler: Abstract.AnyHandler): () => void {
    this.#bindings[name] = handler;
    this.emit('binding', new BindingEvent(name, handler));
    return () => {
      this.unbinding(name);
    };
  }

  unbinding(name: RecordKeyType): void {
    const handler = this.#bindings[name];
    delete this.#bindings[name];
    this.emit('unbinding', new UnbindingEvent(name, handler));
  }

  #onHandlerEvent = (handler: Abstract.AnyHandler): (() => void) => {
    const offCallback = [
      handler.on('executed', (...args) => {
        this.emit('executed', ...args);
      }),
      handler.on('beforeExecute', (...args) => {
        this.emit('beforeExecute', ...args);
      }),
      handler.on('error', (...args) => {
        this.emit('executeError', ...args);
      }),
    ];
    return () => offCallback.forEach((off) => off());
  };

  lookup(name: RecordKeyType): Abstract.AnyHandler['handler'] {
    const handler = this.#bindings[name];
    if (!handler) {
      throw new HandlerNotFoundError(String(name));
    }
    const off = this.#onHandlerEvent(handler);
    const execute = handler.toHandler();
    let isExecuted = false;
    let result: ReturnType<typeof execute>;
    let errorInfo: unknown = undefined;
    const getReturn = (): typeof result => {
      if (typeof errorInfo !== 'undefined') {
        throw errorInfo;
      }
      return result;
    };
    return (...args) => {
      if (isExecuted) {
        return getReturn();
      }
      try {
        result = execute(...args);
      } catch (error: unknown) {
        errorInfo = error;
      } finally {
        isExecuted = true;
        off();
      }
      return getReturn();
    };
  }

  hasBind(name: RecordKeyType): boolean {
    return this.#bindings[name] !== undefined;
  }
}

export function isRegistry(value: unknown): value is Abstract.Registry {
  return String(value) === ClassType.REGISTRY;
}
