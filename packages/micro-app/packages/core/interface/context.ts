import { AnyFunction, Destructor, RecordKeyType } from '@/utils';
import { EventBus, DefineEventBus } from './eventBus';
import { DefinePlugin, ExtensionCenter, PluginHooks, Plugin, PluginInstance } from './plugin';
import { Registry } from './registry';
import { DefineHandler } from './handler';

interface EventCenter {
  eventBus: EventBus;
  publish: (event: RecordKeyType, ...args: any[]) => void;
  subscribe: (event: RecordKeyType, listener: (...args: any[]) => void) => Destructor;
}

interface ServiceCenter {
  services: Registry;
  execute(name: RecordKeyType, ...args: any[]): any;
  register: (name: RecordKeyType, handler: DefineHandler<RecordKeyType, AnyFunction>) => Destructor;
}

export interface ContextCollection
  extends EventCenter,
    ServiceCenter,
    ExtensionCenter<ContextCollection, BaseContextPluginHooks> {
  name: string | symbol;
}

export interface BaseContextOptions {
  onInit: () => void;
  onFinish: () => void;
}

export interface BaseContextPluginHooks extends PluginHooks {
  plugins?: DefinePlugin<ContextCollection, BaseContextPluginHooks, any>[];
  onInit?: BaseContextOptions['onInit'];
  onFinish?: BaseContextOptions['onFinish'];
}

export type BaseContextEventMap = {
  beforeUse: (payload: PluginInstance<ContextCollection, BaseContextPluginHooks>) => void;
  used: (payload: Plugin<BaseContextPluginHooks>) => void;
  beforeInit: (payload: ContextCollection) => void;
  init: (payload: ContextCollection) => void;
  beforeFinish: (payload: ContextCollection) => void;
  finished: (payload: ContextCollection) => void;
  error: (payload: unknown) => void;
};

export interface BaseContext extends DefineEventBus<BaseContextEventMap>, ContextCollection {
  childrenContexts: Map<string | symbol, BaseContext>;
  parentContext?: BaseContext;
  use(context: BaseContext, options: any): Destructor;
  use(context: Parameters<ContextCollection['use']>[0] | BaseContext): Destructor;
  init(context: BaseContext): Destructor;
  finish(): void;
}

export interface BaseContextOperator {
  use: BaseContext['use'];
  publish: BaseContext['publish'];
  subscribe: BaseContext['publish'];
  execute: BaseContext['execute'];
  register: BaseContext['register'];
}
