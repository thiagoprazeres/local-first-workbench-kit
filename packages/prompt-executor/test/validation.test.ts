import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert/strict';
import {
  asValidator,
  runValidator,
  validFail,
  validOk,
} from '../src/index.ts';

describe('validation', () => {
  it('validOk wraps a value', () => {
    const r = validOk(42);
    strictEqual(r.ok, true);
    strictEqual(r.value, 42);
  });

  it('validFail reports an issue', () => {
    const r = validFail('nope', ['x']);
    strictEqual(r.ok, false);
    strictEqual(r.issues?.[0]?.message, 'nope');
    strictEqual(r.issues?.[0]?.path[0], 'x');
  });

  it('asValidator builds a predicate validator', async () => {
    const isString = asValidator((v): v is string => typeof v === 'string');
    strictEqual((await runValidator(isString, 'hi')).ok, true);
    strictEqual((await runValidator(isString, 42)).ok, false);
  });
});
