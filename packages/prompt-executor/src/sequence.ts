import { createExecutor } from './executor.js';
import { appendStepResult, createSession, finalizeSession } from './session.js';
import type {
  Evaluator,
  ExecutorAdapter,
  Protocol,
  PromptSource,
  Session,
  StepResult,
} from './types.js';

export interface RunSequenceOptions {
  readonly source: PromptSource;
  readonly adapter: ExecutorAdapter;
  readonly evaluator?: Evaluator;
  readonly session?: Session;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly onStep?: (
    result: StepResult,
    session: Session,
  ) => void | Promise<void>;
}

export async function runSequence(
  steps: Protocol,
  options: RunSequenceOptions,
): Promise<Session> {
  const executor = createExecutor({
    source: options.source,
    adapter: options.adapter,
    evaluator: options.evaluator,
  });

  let session =
    options.session ?? createSession({ metadata: options.metadata });

  for (const step of steps) {
    const result = await executor.run(step, session);
    session = appendStepResult(session, result);
    if (options.onStep) await options.onStep(result, session);
  }

  return finalizeSession(session);
}
