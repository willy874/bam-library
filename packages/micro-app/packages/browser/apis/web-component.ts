import { Abstract } from '@/core/interface';
import { Constructor } from '@/utils';

type AbstractWebComponent<E extends HTMLElement = HTMLElement> = {
  onConnected: (element: E) => void;
  onDisconnected: (element: E) => void;
  attributeChanged: {
    [key: string]: (element: E, oldValue: string, newValue: string) => void;
  };
};

interface WebComponentPluginHooks<E extends HTMLElement = HTMLElement> extends Abstract.PluginHooks {
  onConnected?: AbstractWebComponent<E>['onConnected'];
  onDisconnected?: AbstractWebComponent<E>['onDisconnected'];
  attributeChanged?: AbstractWebComponent<E>['attributeChanged'];
}

interface WebComponentOptions<C extends Abstract.BaseContext, E extends HTMLElement = HTMLElement> {
  element?: E;
  context?: C;
  plugins?: Abstract.DefinePlugin<E, WebComponentPluginHooks>[];
  onConnected?: AbstractWebComponent<E>['onConnected'];
  onDisconnected?: AbstractWebComponent<E>['onDisconnected'];
  attributeChanged?: AbstractWebComponent<E>['attributeChanged'];
}

interface WebComponentDefine<C extends Abstract.BaseContext, E extends HTMLElement = HTMLElement> {
  class: Constructor<E>;
  options: WebComponentOptions<C, E>;
}

export function defineWebComponent<C extends Abstract.BaseContext, E extends HTMLElement = HTMLElement>(
  options: WebComponentOptions<C, E>,
): WebComponentDefine<C, E> {
  return options as any;
}
