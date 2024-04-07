export class HandlerNotDefinedError extends Error {
  constructor() {
    super('Handler is not defined.');
  }
}

export class HandlerNotFoundError extends Error {
  constructor(name: string) {
    super(`Handler ${name} not found.`);
  }
}

export class DuplicateChildContextError extends Error {
  constructor(name: string) {
    super(`[${name} Context] Duplicate child init error.`);
  }
}

export const ErrorType = {
  HandlerNotDefinedError,
  HandlerNotFoundError,
  DuplicateChildContextError,
};
