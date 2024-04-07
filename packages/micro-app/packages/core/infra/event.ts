import { ClassType } from '../constants';
import { Abstract } from '../interface';

export class BaseEvent<T = unknown> implements Abstract.BaseEvent<T> {
  timeStamp: number = Date.now();
  type: string;
  detail: T;
  constructor(type: string, detail: T) {
    this.type = type;
    this.detail = detail;
  }

  toString(): string {
    return ClassType.BASE_EVENT;
  }
}

export const isBaseEvent = (value: unknown): value is Abstract.BaseEvent => {
  return String(value) === ClassType.BASE_EVENT;
};
