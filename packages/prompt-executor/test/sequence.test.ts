import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert/strict';
import { createMemorySource, runSequence } from '../src/index.ts';

describe('runSequence', () => {
  it('runs every step in order and finalizes the session', async () => {
    const source = createMemorySource([
      { id: 'a', template: 'A' },
      { id: 'b', template: 'B' },
    ]);
    const session = await runSequence(
      [
        { id: '1', promptId: 'a' },
        { id: '2', promptId: 'b' },
      ],
      {
        source,
        adapter: ({ prompt }) => ({ output: prompt.template }),
      },
    );
    strictEqual(session.steps.length, 2);
    strictEqual(session.steps[0]?.output, 'A');
    strictEqual(session.steps[1]?.output, 'B');
    strictEqual(typeof session.finishedAt, 'string');
  });

  it('calls onStep for each step', async () => {
    const source = createMemorySource([{ id: 'p', template: 'x' }]);
    const seen: string[] = [];
    await runSequence(
      [
        { id: '1', promptId: 'p' },
        { id: '2', promptId: 'p' },
      ],
      {
        source,
        adapter: () => ({ output: 'ok' }),
        onStep: (r) => {
          seen.push(r.stepId);
        },
      },
    );
    strictEqual(seen.join(','), '1,2');
  });
});
