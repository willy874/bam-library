import { EventEmitter } from '../libs';
import { isFiniteNumber } from './is';

export type RecordKeyType = number | string | symbol;

export enum CollectionEventType {
  GETTER = 'getter',
  SETTER = 'setter',
  DELETE = 'delete',
}

export function isRecordKeyType(value: unknown): value is RecordKeyType {
  return isFiniteNumber(value) || typeof value === 'string' || typeof value === 'symbol';
}

export class Collection<T extends object> extends EventEmitter {
  current: Record<RecordKeyType, T> = {};
  private readonly primaryKey: RecordKeyType;

  constructor(param?: Record<RecordKeyType, T> | Collection<T> | T[], primaryKey: RecordKeyType = 'id') {
    super();
    this.primaryKey = primaryKey;
    if (param instanceof Collection) {
      param.toArray().forEach((v) => {
        // eslint-disable-next-line prettier/prettier
        const id =  this.primaryKey in v && isRecordKeyType(this.primaryKey) ? (v as Record<RecordKeyType, unknown>)[this.primaryKey] : Symbol('');
        if (isRecordKeyType(id)) {
          this.set(id, v);
        }
      });
      return;
    }
    if (Array.isArray(param)) {
      param.forEach((v) => (this.current[(v as any)[this.primaryKey]] = v));
      return;
    }
    if (param && typeof param === 'object') {
      Object.keys(param).forEach((key) => {
        this.current[key] = param[key];
      });
      return;
    }
  }

  toArray(): T[] {
    const result = Object.values(this.current);
    this.emit(CollectionEventType.GETTER, { ...this.current });
    return result;
  }

  get get() {
    return (key: RecordKeyType): T => {
      const result = this.current[key];
      this.emit(CollectionEventType.GETTER, { [key]: result });
      return result;
    };
  }

  set(key: RecordKeyType, value: T) {
    this.current = {
      ...this.current,
      [key]: value,
    };
    this.emit(CollectionEventType.SETTER, { [key]: value });
  }

  delete(key: RecordKeyType): boolean {
    const current = {
      ...this.current,
    };
    const value = current[key];
    delete current[key];
    this.current = current;
    this.emit(CollectionEventType.DELETE, { [key]: value });
    return Boolean(value);
  }

  clear() {
    const current = this.current;
    this.current = {};
    this.emit(CollectionEventType.DELETE, current);
  }
}
