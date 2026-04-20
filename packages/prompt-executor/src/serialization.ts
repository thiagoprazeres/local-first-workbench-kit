import type { Session } from './types.js';

const SCHEMA_VERSION = 1 as const;

export interface SerializedSession {
  readonly schemaVersion: typeof SCHEMA_VERSION;
  readonly session: Session;
}

export function serializeSession(session: Session): string {
  const payload: SerializedSession = {
    schemaVersion: SCHEMA_VERSION,
    session,
  };
  return JSON.stringify(payload);
}

export function deserializeSession(raw: string): Session {
  const parsed = JSON.parse(raw) as unknown;
  if (!isSerializedSession(parsed)) {
    throw new TypeError('prompt-executor: invalid serialized session payload');
  }
  if (parsed.schemaVersion !== SCHEMA_VERSION) {
    throw new TypeError(
      `prompt-executor: unsupported schemaVersion ${String(parsed.schemaVersion)}`,
    );
  }
  return parsed.session;
}

function isSerializedSession(value: unknown): value is SerializedSession {
  return (
    typeof value === 'object' &&
    value !== null &&
    'schemaVersion' in value &&
    'session' in value &&
    typeof (value as { session: unknown }).session === 'object' &&
    (value as { session: unknown }).session !== null
  );
}
