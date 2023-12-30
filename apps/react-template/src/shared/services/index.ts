import { Operator } from '../utils/Operator';

enum ServiceType {
  GET_DATA = 'getData',
}

type ServiceMap = {
  [ServiceType.GET_DATA]: (p: string) => Promise<string>;
};

class GlobalServiceOperator extends Operator<ServiceMap> {
  getData(p: string) {
    return this.registry.lookup(ServiceType.GET_DATA).execute(p);
  }
}

export const globalServices = new GlobalServiceOperator();
