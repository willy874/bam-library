export type Constructor<T> = new (...args: any[]) => T;

export type AnyFunction = (...args: any[]) => any;

export type VoidFunction = () => void;

export type EventFunction = (...args: any[]) => void;

export type RecordKeyType = number | string | symbol;

export type Destructor = () => void;
