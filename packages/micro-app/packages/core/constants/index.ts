const BASE_EVENT_TYPE = '[object BaseEvent]';
const EVENT_BUS_TYPE = '[object EventBus]';
const BASE_HANDLER_TYPE = '[object BaseHandler]';
const REGISTRY_TYPE = '[object Registry]';
const BASE_CONTEXT_TYPE = '[object BaseContext]';

export const ClassType = {
  BASE_EVENT: BASE_EVENT_TYPE,
  EVENT_BUS: EVENT_BUS_TYPE,
  BASE_HANDLER: BASE_HANDLER_TYPE,
  REGISTRY: REGISTRY_TYPE,
  BASE_CONTEXT: BASE_CONTEXT_TYPE,
} as const;

export const EMPTY = Symbol('Empty');
export const EMPTY_FUNCTION = (): void => {};
