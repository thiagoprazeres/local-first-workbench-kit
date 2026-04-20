import { randomUUID } from 'node:crypto';
import type { Session, StepResult } from './types.js';

export interface CreateSessionOptions {
  readonly id?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly now?: () => Date;
}

export function createSession(options: CreateSessionOptions = {}): Session {
  const now = options.now ? options.now() : new Date();
  return {
    id: options.id ?? randomUUID(),
    startedAt: now.toISOString(),
    steps: [],
    metadata: options.metadata ?? {},
  };
}

export function appendStepResult(
  session: Session,
  result: StepResult,
): Session {
  return {
    ...session,
    steps: [...session.steps, result],
  };
}

export function finalizeSession(
  session: Session,
  now: Date = new Date(),
): Session {
  return {
    ...session,
    finishedAt: now.toISOString(),
  };
}
