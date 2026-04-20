import { describe, it } from 'node:test';
import { deepStrictEqual, throws } from 'node:assert/strict';
import {
  createSession,
  deserializeSession,
  serializeSession,
} from '../src/index.ts';

describe('serialization', () => {
  it('round-trips a session', () => {
    const s = createSession({ id: 'abc', metadata: { kind: 'test' } });
    const json = serializeSession(s);
    deepStrictEqual(deserializeSession(json), s);
  });

  it('rejects invalid payload', () => {
    throws(() => deserializeSession('{}'));
  });

  it('rejects unsupported schemaVersion', () => {
    const bad = JSON.stringify({
      schemaVersion: 99,
      session: createSession({ id: 'x' }),
    });
    throws(() => deserializeSession(bad));
  });
});
