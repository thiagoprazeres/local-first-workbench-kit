import { describe, it } from 'node:test';
import { rejects, strictEqual } from 'node:assert/strict';
import {
  createCompositeSource,
  createMemorySource,
  PromptNotFoundError,
} from '../src/index.ts';

describe('sources', () => {
  it('memory source loads by id', async () => {
    const source = createMemorySource([{ id: 'a', template: 'A' }]);
    const p = await source.load('a');
    strictEqual(p.template, 'A');
  });

  it('memory source throws when missing', async () => {
    const source = createMemorySource([]);
    await rejects(() => source.load('x'), PromptNotFoundError);
  });

  it('memory source lists all prompts', async () => {
    const source = createMemorySource([
      { id: '1', template: 'A' },
      { id: '2', template: 'B' },
    ]);
    const all = await source.list?.();
    strictEqual(all?.length, 2);
  });

  it('composite source falls through in order', async () => {
    const a = createMemorySource([{ id: '1', template: 'A' }]);
    const b = createMemorySource([{ id: '2', template: 'B' }]);
    const source = createCompositeSource([a, b]);
    strictEqual((await source.load('1')).template, 'A');
    strictEqual((await source.load('2')).template, 'B');
    await rejects(() => source.load('missing'), PromptNotFoundError);
  });
});
