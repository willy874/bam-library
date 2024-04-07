import { Abstract } from '../interface';

interface DefineContextOptions {
  plugins?: Abstract.BaseContextPluginHooks['plugins'];
  onInit?: Abstract.BaseContextOptions['onInit'];
  onFinish?: Abstract.BaseContextOptions['onFinish'];
}

type Finish = () => void;

interface BaseContextDefine {
  init: (context: Abstract.BaseContext) => Finish;
}

export function defineContext(options: DefineContextOptions): BaseContextDefine {
  return options as any;
}
