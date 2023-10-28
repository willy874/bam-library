import { camelCase, kebabCase, snakeCase, upperFirst } from '../libs';

export function toCamelCase(name: string): string {
  return camelCase(name);
}

export function toSnakeCase(name: string): string {
  return snakeCase(name);
}

export function toKebabCase(name: string): string {
  return kebabCase(name);
}

export function toUpperFirst(name: string): string {
  return upperFirst(name);
}

export function toScreamingSnakeCase(name: string): string {
  return toSnakeCase(name).toUpperCase();
}

export function toPascalCase(name: string): string {
  const camel = toCamelCase(name);
  return toUpperFirst(camel);
}
