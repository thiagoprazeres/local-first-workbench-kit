---
title: "Local-First Workbench Kit"
---

# Local-First Workbench Kit

Monorepo for Fase -2.1: A modular, provider-agnostic toolkit for prompt protocols and local-first workflows.

## What's inside

- **@thiagoprazeres/prompt-executor** — Runtime for executing prompt protocols. Zero-dependency, works with any LLM provider.
- **@thiagoprazeres/contracts** — Zod schemas for runtime validation of sessions, steps, and evaluations.

## Get started

### Install

```bash
pnpm install
pnpm build
pnpm test
```

### Packages

- [prompt-executor](./packages/prompt-executor/) — Protocol execution runtime
- [contracts](./packages/contracts/) — Schemas and validation

## Versioning

0.0.1 — Initial release. API is pre-stable.

## License

MIT.
