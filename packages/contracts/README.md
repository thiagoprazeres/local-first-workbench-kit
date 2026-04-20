# @thiagoprazeres/contracts

Zod schemas for `prompt-executor` and workbench-kit contracts. Provides runtime validation and TypeScript types for sessions, steps, prompts, and evaluations.

## Install

```bash
pnpm add @thiagoprazeres/contracts
```

## Usage

```typescript
import { SessionSchema, StepResultSchema } from '@thiagoprazeres/contracts';

// Validate at runtime
const result = StepResultSchema.parse(someData);

// Use types in your code
import type { Session, Step, Evaluation } from '@thiagoprazeres/contracts';
```

## Schemas

- `PromptSchema` — prompt object with template and metadata
- `StepSchema` — step definition with input and metadata
- `StepResultSchema` — result of step execution with output and timing
- `SessionSchema` — session containing ordered step results
- `EvaluationSchema` — evaluation metrics and pass/fail status
- `SerializedSessionSchema` — serialized session with schemaVersion

All types are exported both as Zod schemas and TypeScript types.

## License

MIT.
