export interface StyleLoaderOptions {
  injectType?:
    | 'styleTag'
    | 'singletonStyleTag'
    | 'autoStyleTag'
    | 'lazyStyleTag'
    | 'lazySingletonStyleTag'
    | 'lazyAutoStyleTag'
    | 'linkTag';
  attributes: Record<string, any>;
  insert?: string | ((htmlElement: HTMLElement, options: Record<string, any>) => void);
  styleTagTransform?: string | ((css: string, styleElement: HTMLStyleElement, options: Record<string, any>) => void);
  base?: number;
  esModule?: boolean;
}
