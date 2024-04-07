import { RecordKeyType } from '@/utils';
import { DefineEventBus } from './eventBus';
import { AnyHandler, BaseHandlerEventMap } from './handler';
import { BaseEvent } from './event';

export interface BindingInfo {
  name: RecordKeyType;
  handler: AnyHandler;
}

export interface BindingEvent extends BaseEvent<BindingInfo> {}
export interface UnbindingEvent extends BaseEvent<BindingInfo> {}

export type RegistryEventMap = {
  binding: (event: BindingEvent) => void;
  unbinding: (event: UnbindingEvent) => void;
  executed: BaseHandlerEventMap['executed'];
  beforeExecute: BaseHandlerEventMap['beforeExecute'];
  executeError: BaseHandlerEventMap['error'];
};

type Unbind = () => void;

export interface Registry extends DefineEventBus<RegistryEventMap> {
  binding(name: RecordKeyType, handler: AnyHandler): Unbind;
  unbinding(name: RecordKeyType): void;
  lookup(name: RecordKeyType): AnyHandler['handler'];
  hasBind(name: RecordKeyType): boolean;
}
