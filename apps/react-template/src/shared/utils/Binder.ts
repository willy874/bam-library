import * as Core from '../core';
import { BaseHandler } from './BaseHandler';

export class Binder<
  N extends Core.RecordKeyType = Core.RecordKeyType,
  F extends Core.BaseHandler = Core.BaseHandler<Core.RecordKeyType, Core.AnyFunction>,
> implements Core.Binder<N, F>
{
  #handler!: F;

  constructor(
    public readonly name: N,
    handler?: Core.ToHandler<N, F> | Core.ToProvider<F> | unknown,
  ) {
    if (handler) {
      this.#handler = this.#toHandler(handler) as F;
    }
  }

  #toHandler(value: unknown): Core.BaseHandler {
    if (value instanceof BaseHandler) {
      return value;
    } else if (typeof value === 'function') {
      return new BaseHandler(this.name, value as Core.AnyFunction);
    } else {
      return new BaseHandler(this.name, () => value);
    }
  }

  toHandler(value: Core.ToHandler<N, F>): void;
  toHandler(value: Core.ToProvider<F>): void;
  toHandler(value: Core.ToBindingValue<F>): void;
  toHandler(value: unknown): void {
    this.#handler = this.#toHandler(value) as F;
  }

  execute(...input: Parameters<Core.GetHandlerFunction<F>>): ReturnType<Core.GetHandlerFunction<F>> {
    return this.#handler.execute(...input);
  }
}
