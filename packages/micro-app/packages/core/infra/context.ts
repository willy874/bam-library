import { AnyFunction, Destructor, RecordKeyType } from '@/utils';
import { Abstract } from '../interface';
import { DefineEventBus, EventBus } from './eventBus';
import { Registry } from './registry';
import { DuplicateChildContextError } from './error';
import { ClassType, EMPTY } from '../constants';
import { BaseHandler, isBaseHandler } from './handler';

function useContextDefinePlugin(
  context: Abstract.BaseContext,
  plugin: Abstract.DefinePlugin<Abstract.BaseContext, Abstract.BaseContextPluginHooks, any>,
  options?: any,
): Abstract.BaseContextPluginHooks {
  if (Array.isArray(plugin)) {
    const instance = plugin[0];
    const options = plugin[1];
    if (typeof instance === 'function') {
      return instance(context, options);
    }
    return instance.install(context, options);
  }
  if (typeof plugin === 'function') {
    return plugin(context, options!);
  }
  return plugin.install(context, options!);
}

export function isBaseContext(value: unknown): value is Abstract.BaseContext {
  return String(value) === ClassType.BASE_CONTEXT;
}

export class BaseContext extends DefineEventBus<Abstract.BaseContextEventMap> implements Abstract.BaseContext {
  name: string | symbol = EMPTY;

  toString(): string {
    return ClassType.BASE_CONTEXT;
  }

  plugins: Abstract.Plugin<Abstract.BaseContextPluginHooks>[] = [];

  #useContext(context: Abstract.BaseContext): Destructor {
    const finish = context.init(this);
    context.use(() => ({
      name: `${String(this.name)}-context-plugin`,
      onUninstall: () => finish(),
    }));
    return finish;
  }

  #usePlugin(
    plugin: Abstract.DefinePlugin<Abstract.BaseContext, Abstract.BaseContextPluginHooks, any>,
    options: any,
  ): Destructor {
    const hook = useContextDefinePlugin(this, plugin);
    const destructors = hook.plugins?.map((plugin) => this.use(plugin, options)) || [];
    return () => {
      destructors.forEach((fn) => fn());
    };
  }

  use(
    initInstance:
      | Abstract.BaseContext
      | Abstract.DefinePlugin<Abstract.BaseContext, Abstract.BaseContextPluginHooks, any>,
    options?: any,
  ): Destructor {
    if (isBaseContext(initInstance)) {
      return this.#useContext(initInstance);
    }
    return this.#usePlugin(initInstance, options);
  }

  eventBus: Abstract.EventBus = new EventBus();

  publish(event: RecordKeyType, ...args: any[]): void {
    this.eventBus.emit(event, args);
  }

  subscribe(event: RecordKeyType, listener: (...args: any[]) => void): Destructor {
    return this.eventBus.on(event, listener);
  }

  services: Abstract.Registry = new Registry();

  execute(name: RecordKeyType, ...args: any[]): any {
    return this.services.lookup(name)(...args);
  }

  register(name: RecordKeyType, handler: Abstract.DefineHandler<RecordKeyType, AnyFunction>): Destructor {
    if (isBaseHandler(handler)) {
      return this.services.binding(name, handler);
    }
    return this.services.binding(name, new BaseHandler(name, handler));
  }

  childrenContexts: Map<string | symbol, Abstract.BaseContext> = new Map();
  parentContext?: Abstract.BaseContext;

  init(context: Abstract.BaseContext): Destructor {
    try {
      this.emit('beforeInit', this);
      if (context.childrenContexts.has(this.name)) {
        throw new DuplicateChildContextError(String(this.name));
      }
      context.childrenContexts.set(this.name, this);
      this.parentContext = context;
      this.services = context.services;
      this.eventBus = context.eventBus;
      this.emit('init', this);
      return () => this.finish();
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  finish(): void {
    this.emit('beforeFinish', this);
    this.childrenContexts.forEach((context) => {
      context.finish();
    });
    if (this.parentContext && this.parentContext.childrenContexts.has(this.name)) {
      this.parentContext.childrenContexts.delete(this.name);
    }
    delete this.parentContext;
    this.services = new Registry();
    this.eventBus = new EventBus();
    this.emit('finished', this);
  }
}
