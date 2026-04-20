import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { PromptNotFoundError } from './errors.js';
import type { Prompt, PromptSource } from './types.js';

export function createMemorySource(
  prompts: readonly Prompt[],
): PromptSource {
  const map = new Map<string, Prompt>(prompts.map((p) => [p.id, p]));
  return {
    async load(id) {
      const prompt = map.get(id);
      if (!prompt) throw new PromptNotFoundError(id);
      return prompt;
    },
    async list() {
      return [...map.values()];
    },
  };
}

export interface FileSourceOptions {
  readonly directory: string;
  readonly extension?: string;
  readonly parser?: (
    content: string,
    id: string,
  ) =>
    | { template: string; metadata?: Record<string, unknown> }
    | Promise<{ template: string; metadata?: Record<string, unknown> }>;
}

export function createFileSource(options: FileSourceOptions): PromptSource {
  const ext = options.extension ?? '.md';
  const dir = resolve(options.directory);

  async function load(id: string): Promise<Prompt> {
    const path = join(dir, `${id}${ext}`);
    let content: string;
    try {
      content = await readFile(path, 'utf8');
    } catch {
      throw new PromptNotFoundError(id);
    }
    if (options.parser) {
      const parsed = await options.parser(content, id);
      return { id, template: parsed.template, metadata: parsed.metadata };
    }
    return { id, template: content };
  }

  return {
    load,
    async list() {
      const entries = await readdir(dir);
      const ids = entries
        .filter((f: string) => f.endsWith(ext))
        .map((f: string) => f.slice(0, -ext.length));
      return Promise.all(ids.map(load));
    },
  };
}

export function createCompositeSource(
  sources: readonly PromptSource[],
): PromptSource {
  return {
    async load(id) {
      for (const s of sources) {
        try {
          return await s.load(id);
        } catch (error) {
          if (error instanceof PromptNotFoundError) continue;
          throw error;
        }
      }
      throw new PromptNotFoundError(id);
    },
    async list() {
      const seen = new Set<string>();
      const all: Prompt[] = [];
      for (const s of sources) {
        if (!s.list) continue;
        const items = await s.list();
        for (const p of items) {
          if (seen.has(p.id)) continue;
          seen.add(p.id);
          all.push(p);
        }
      }
      return all;
    },
  };
}
