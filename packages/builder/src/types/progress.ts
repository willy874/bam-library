/**
 * Options object for the ProgressPlugin.
 */
export declare interface ProgressPluginOptions {
  /**
   * Show active modules count and one active module in progress message.
   */
  activeModules?: boolean;

  /**
   * Show dependencies count in progress message.
   */
  dependencies?: boolean;

  /**
   * Minimum dependencies count to start with. For better progress calculation. Default: 10000.
   */
  dependenciesCount?: number;

  /**
   * Show entries count in progress message.
   */
  entries?: boolean;

  /**
   * Function that executes for every progress step.
   */
  handler?: (percentage: number, msg: string, ...args: string[]) => void;

  /**
   * Show modules count in progress message.
   */
  modules?: boolean;

  /**
   * Minimum modules count to start with. For better progress calculation. Default: 5000.
   */
  modulesCount?: number;

  /**
   * Collect percent algorithm. By default it calculates by a median from modules, entries and dependencies percent.
   */
  percentBy?: null | 'entries' | 'modules' | 'dependencies';

  /**
   * Collect profile data for progress steps. Default: false.
   */
  profile?: null | boolean;
}
export type ProgressPluginArgument =
  | ProgressPluginOptions
  | ((percentage: number, msg: string, ...args: string[]) => void);
