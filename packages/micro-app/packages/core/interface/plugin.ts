import { Destructor } from '@/utils';

export type PluginHooks<T = any> = {
  name: string;
  onInstall?: (instance: T) => void;
};

export type PluginInstance<T extends unknown, H extends PluginHooks, O = void> =
  | { install: (instance: T) => H }
  | { install: (instance: T, options: O) => H }
  | ((instance: T) => H)
  | ((instance: T, options: O) => H);

export type DefinePlugin<T extends unknown, H extends PluginHooks, O = void> =
  | PluginInstance<T, H, O>
  | [PluginInstance<T, H, O>, O];

export interface Plugin<H extends PluginHooks> {
  name: H['name'];
}

export interface PluginClass {}

export interface ExtensionCenter<T, H extends PluginHooks, O = void> {
  plugins: Plugin<H>[];
  use(plugin: DefinePlugin<T, H>): Destructor;
  use(plugin: DefinePlugin<T, H, O>, options: O): Destructor;
}
