import { RecordKeyType, AnyFunction, VoidFunction, Constructor } from '../core/utils';

const GLOBAL_EVENT = Symbol('globalEvent');

// eslint-disable-next-line no-undef
export class EventEmitter implements NodeJS.EventEmitter {
  #events: Map<RecordKeyType, Map<AnyFunction, VoidFunction>> = new Map();
  #maxListeners: number;

  captureRejections: boolean;

  constructor(options: { captureRejections?: boolean | undefined } = {}) {
    const proto = Object.getPrototypeOf(this) as Constructor<EventEmitter>;
    const descriptor = Object.getOwnPropertyDescriptor(proto.constructor, 'defaultMaxListeners');
    this.#maxListeners = descriptor ? descriptor.value : 10;

    const { captureRejections = false } = options;
    this.captureRejections = captureRejections;
  }

  toString() {
    return '[object EventEmitter]';
  }

  #clear(name?: RecordKeyType) {
    if (name) {
      this.#events.delete(name);
    } else {
      this.#events.clear();
    }
  }

  #on(name: RecordKeyType, callback: AnyFunction, options: { once?: boolean } = {}) {
    const { once = false } = options;
    const off = () => this.#off(name, callback);
    const handler = function (this: any, ...args: any[]) {
      callback.apply(this, args);
      if (once) off();
    };
    const map = this.#events.get(name);
    if (map) {
      map.set(callback, handler);
    } else {
      this.#events.set(name, new Map([[callback, handler]]));
    }
  }

  #off(name: RecordKeyType, callback: AnyFunction) {
    const map = this.#events.get(name);
    if (map) {
      const handler = map.get(callback);
      if (handler) {
        map.delete(callback);
        return true;
      }
    }
    return false;
  }

  #emit(name: RecordKeyType, ...args: any[]): boolean {
    const map = this.#events.get(name);
    if (map) {
      map.forEach((handler) => handler.apply(this, args));
      if (name !== GLOBAL_EVENT) {
        const params = [name, ...args] as any[];
        this.#emit(GLOBAL_EVENT, ...params);
      }
    }
    return Boolean(map);
  }

  listenerAll(callback: (name: RecordKeyType, ...args: any[]) => void) {
    this.#on(GLOBAL_EVENT, callback);
    return () => this.#off(GLOBAL_EVENT, callback);
  }

  setMaxListeners(n: number): this {
    this.#maxListeners = n;
    return this;
  }

  getMaxListeners(): number {
    return this.#maxListeners;
  }

  on(name: RecordKeyType, listener: AnyFunction): this {
    this.#on(name, listener);
    return this;
  }

  addListener(eventName: RecordKeyType, listener: AnyFunction): this {
    this.#on(eventName, listener);
    return this;
  }

  prependListener(eventName: RecordKeyType, listener: AnyFunction): this {
    this.#on(eventName, listener);
    return this;
  }

  once(name: RecordKeyType, listener: AnyFunction): this {
    this.#on(name, listener, { once: true });
    return this;
  }

  prependOnceListener(eventName: RecordKeyType, listener: AnyFunction): this {
    this.#on(eventName, listener, { once: true });
    return this;
  }

  off(eventName: RecordKeyType, listener: AnyFunction): this {
    this.#off(eventName, listener);
    return this;
  }

  removeListener(eventName: RecordKeyType, listener: AnyFunction): this {
    this.#off(eventName, listener);
    return this;
  }

  removeAllListeners(eventName?: RecordKeyType): this {
    this.#clear(eventName);
    return this;
  }

  emit(eventName: RecordKeyType, ...args: any[]): boolean {
    this.#emit(eventName, ...args);
    return true;
  }

  listenerCount(name: RecordKeyType) {
    const map = this.#events.get(name);
    return map ? map.size : 0;
  }

  listeners(name: string | symbol): Function[] {
    const map = this.#events.get(name as RecordKeyType);
    return map ? [...map.keys()] : [];
  }

  rawListeners(name: RecordKeyType): AnyFunction[] {
    const map = this.#events.get(name);
    return map ? [...map.keys()] : [];
  }

  eventNames(): string[] {
    return [...this.#events.keys()].map((k) => k.toString());
  }

  eventKeys(): RecordKeyType[] {
    return [...this.#events.keys()];
  }

  static listenerCount(emitter: EventEmitter, name: string) {
    return emitter.listenerCount(name);
  }

  static on(emitter: EventEmitter, name: string, callback: AnyFunction) {
    return emitter.on(name, callback);
  }

  static once(emitter: EventEmitter, name: string, callback: AnyFunction) {
    return emitter.once(name, callback);
  }

  static getEventListeners(emitter: EventEmitter, name: string) {
    return emitter.listeners(name);
  }

  static setMaxListeners(emitter: EventEmitter, n: number) {
    return emitter.setMaxListeners(n);
  }

  static readonly errorMonitor = Symbol.for('events.errorMonitor');
  static readonly captureRejectionSymbol = Symbol('nodejs.rejection');
  static captureRejections = false;
  static defaultMaxListeners = 10;
}
