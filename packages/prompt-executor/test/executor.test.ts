import { describe, it } from 'node:test';
import { ok, rejects, strictEqual } from 'node:assert/strict';
import {
  ContractViolationError,
  createExecutor,
  createMemorySource,
  createSession,
} from '../src/index.ts';

describe('executor', () => {
  it('runs a step and returns a result', async () => {
    const source = createMemorySource([
      { id: 'greet', template: 'Hello {{name}}' },
    ]);
    const executor = createExecutor({
      source,
      adapter: ({ prompt, input }) => ({
        output: prompt.template.replace('{{name}}', String(input['name'])),
      }),
    });

    const session = createSession({ id: 's1' });
    const result = await executor.run(
      { id: 'step1', promptId: 'greet', input: { name: 'Roberto' } },
      session,
    );

    strictEqual(result.stepId, 'step1');
    strictEqual(result.promptId, 'greet');
    strictEqual(result.output, 'Hello Roberto');
    ok(result.durationMs >= 0);
    strictEqual(typeof result.startedAt, 'string');
    strictEqual(typeof result.finishedAt, 'string');
  });

  it('rejects when input contract fails', async () => {
    const source = createMemorySource([{ id: 'p1', template: 'x' }]);
    const executor = createExecutor({
      source,
      adapter: () => ({ output: 'ok' }),
    });

    await rejects(
      executor.run(
        {
          id: 's',
          promptId: 'p1',
          input: {},
          contract: {
            input: (value) =>
              typeof (value as { topic?: unknown }).topic === 'string'
                ? { ok: true, value }
                : {
                    ok: false,
                    issues: [{ path: ['topic'], message: 'required' }],
                  },
          },
        },
        createSession(),
      ),
      ContractViolationError,
    );
  });

  it('applies evaluator to the result', async () => {
    const source = createMemorySource([{ id: 'p', template: 'x' }]);
    const executor = createExecutor({
      source,
      adapter: () => ({ output: 42 }),
      evaluator: () => ({ passed: true, score: 1 }),
    });

    const result = await executor.run(
      { id: 's', promptId: 'p' },
      createSession(),
    );
    strictEqual(result.evaluation?.passed, true);
    strictEqual(result.evaluation?.score, 1);
  });
});
