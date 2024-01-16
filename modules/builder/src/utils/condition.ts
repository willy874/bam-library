export const isArray = Array.isArray;

export const isNotNull = <T>(v?: T | null): v is T => v !== null && v !== undefined;
