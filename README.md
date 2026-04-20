# Local-First Workbench Kit — Fase -2.1

A modular, provider-agnostic toolkit for prompt protocols, local-first workflows, and reproducible prompt execution.

**Status:** 0.0.1 (pre-stable, Fase -2.1)

## Packages

- **[@thiagoprazeres/prompt-executor](./packages/prompt-executor/)** — Runtime for executing prompt protocols. Zero dependencies, works with any LLM provider. Optimized for Opus 4.7 workflows.
- **[@thiagoprazeres/contracts](./packages/contracts/)** — Zod schemas for runtime validation of sessions, steps, prompts, and evaluations.

## Get started

### Install dependencies

```bash
pnpm install
```

### Build all packages

```bash
pnpm build
```

### Run tests

```bash
pnpm test
```

### Run typecheck

```bash
pnpm typecheck
```

### Start documentation

```bash
pnpm docs:dev
```

Then open http://localhost:1313.

## What's included in 0.0.1

- Monorepo scaffold (pnpm workspace)
- `prompt-executor` — Core protocol executor with sessions, steps, contracts, evaluation, and serialization.
- `contracts` — Zod schemas for cross-package validation.
- Hugo docs (minimal scaffold)
- GitHub public repo
- npm published packages

## What's out of scope for 0.0.1

- MCP server
- VS Code extension
- Open WebUI recipes
- Penpot MCP integration
- Final workbench application
- Catálogo de prompts
- Database layer
- Complex persistence

## Architecture

Monorepo layout:

```
local-first-workbench-kit/
├── packages/
│   ├── contracts/          # @thiagoprazeres/contracts
│   └── prompt-executor/    # @thiagoprazeres/prompt-executor
├── docs/                   # Hugo docs (minimal)
├── tsconfig.base.json      # Shared TypeScript config
├── pnpm-workspace.yaml
└── README.md
```

Each package is independent, publishable, and has zero cross-package dependencies (except optional runtime).

## Docs

Docs are in `docs/` and built with Hugo. Source files in `docs/content/`.

## Publishing

Publish to npm:

```bash
cd packages/prompt-executor && npm publish
cd packages/contracts && npm publish
```

Both packages are public and scoped under `@thiagoprazeres`.

## Repository

- GitHub: https://github.com/thiagoprazeres/local-first-workbench-kit
- npm: https://www.npmjs.com/org/thiagoprazeres

## License

MIT. Copyright 2026 Thiago Prazeres.

## Next phases

- Fase -2.0: MCP server for Claude Code integration
- Fase -1: VS Code extension
- Fase 0: Open WebUI recipes
- Fase 1: Penpot MCP integration
- Fase 2: Final workbench application
