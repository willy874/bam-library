import type { RecordKeyType } from './utils';

export interface EventEmitter {
  on(event: RecordKeyType, listener: (...args: any[]) => void): this;
  addListener(event: RecordKeyType, listener: (...args: any[]) => void): this;
  prependListener(event: RecordKeyType, listener: (...args: any[]) => void): this;
  once(event: RecordKeyType, listener: (...args: any[]) => void): this;
  prependOnceListener(event: RecordKeyType, listener: (...args: any[]) => void): this;
  off(event: RecordKeyType, listener: (...args: any[]) => void): this;
  removeListener(event: RecordKeyType, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: RecordKeyType): this;
  emit(event: RecordKeyType, ...args: any[]): boolean;
  listeners(event: RecordKeyType): Function[];
  rawListeners(event: RecordKeyType): Function[];
  eventNames(): Array<RecordKeyType>;
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
  listenerCount(type: RecordKeyType): number;
  listenerAll(callback: (name: RecordKeyType, ...args: any[]) => void): () => void;
}
