export interface BaseEvent<T = unknown> {
  readonly detail: T;
  readonly type: string;
  readonly timeStamp: number;
}
