import * as Core from '../core';
import { EventEmitter } from './EventEmitter';

export class BaseHandler<
    N extends Core.RecordKeyType = Core.RecordKeyType,
    F extends Core.AnyFunction = Core.AnyFunction,
  >
  extends EventEmitter
  implements Core.BaseHandler<N, F>
{
  name: N;
  execute: F;

  constructor();
  constructor(handler: BaseHandler<N, F>);
  constructor(options: Core.BaseHandlerOptions<N, F>);
  constructor(name: N, handler: F);
  constructor(name: N, handler: F, options: Core.BaseHandlerOptions<N, F>);
  constructor(...args: any[]) {
    super();
    const [name, handler, options] = args;
    if (name instanceof BaseHandler) {
      this.name = name.name;
      this.execute = name.execute;
    } else if (typeof name === 'object') {
      this.name = name.name;
      this.execute = name.execute;
    } else if (typeof name === 'string') {
      this.name = name as N;
      this.execute = handler;
    } else {
      this.name = handler.name as N;
      this.execute = handler;
    }
    if (options) {
      this.setMaxListeners(options.maxListeners);
    }
  }
}
