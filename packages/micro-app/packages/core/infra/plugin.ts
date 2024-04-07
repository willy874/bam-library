import { Abstract } from '../interface';

export function definePlugin<T = unknown, H extends Abstract.PluginHooks<T> = Abstract.PluginHooks<T>, O = unknown>(
  plugin: Abstract.DefinePlugin<T, H, O>,
): Abstract.DefinePlugin<T, H, O> {
  return plugin;
}
