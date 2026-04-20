# @thiagoprazeres/prompt-executor

Runtime for executing prompt protocols. Optimized for Opus 4.7 workflows.

`prompt-executor` organizes sessions, steps, contracts, evaluation, metadata, and sequence execution. It does not ship prompts, does not call LLMs, and does not lock you to a provider.

## What it is

- A small, provider-agnostic runtime for prompt protocols.
- A model for sessions, steps, step results, and evaluations.
- A contract layer that validates step input and output.
- A sequence runner that executes an ordered protocol against an adapter.
- A JSON serializer for reproducible sessions.

## What it is not

- A prompt library. You bring the prompts.
- An LLM client. You bring the adapter.
- A framework. It has no globals and no magic.

## Install

```bash
pnpm add @thiagoprazeres/prompt-executor
```

Requires Node.js >= 20.6. ESM only.

## Quick start

```typescript
import {
  createExecutor,
  createMemorySource,
  createSession,
} from '@thiagoprazeres/prompt-executor';

const source = createMemorySource([
  { id: 'greet', template: 'Say hi to {{name}}.' },
]);

const executor = createExecutor({
  source,
  adapter: async ({ prompt, input }) => {
    return { output: `hi ${String(input['name'])}` };
  },
});

const session = createSession({ id: 'session-1' });
const result = await executor.run(
  { id: 'step-1', promptId: 'greet', input: { name: 'Roberto' } },
  session,
);
```

## API surface

```typescript
createSession(options?)
appendStepResult(session, result)
finalizeSession(session, now?)
createExecutor({ source, adapter, evaluator? })
runSequence(steps, { source, adapter, ... })
createMemorySource(prompts)
createFileSource({ directory, extension?, parser? })
createCompositeSource(sources)
serializeSession(session) / deserializeSession(raw)
```

## License

MIT.
