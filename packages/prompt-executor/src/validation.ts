import type { ValidationResult, Validator } from './types.js';

export async function runValidator<T>(
  validator: Validator<T>,
  value: unknown,
): Promise<ValidationResult<T>> {
  return validator(value);
}

export function asValidator<T>(
  predicate: (value: unknown) => value is T,
  message = 'validation failed',
): Validator<T> {
  return (value) =>
    predicate(value)
      ? { ok: true, value }
      : { ok: false, issues: [{ path: [], message }] };
}

export function validOk<T>(value: T): ValidationResult<T> {
  return { ok: true, value };
}

export function validFail(
  message: string,
  path: readonly (string | number)[] = [],
): ValidationResult {
  return { ok: false, issues: [{ path, message }] };
}
