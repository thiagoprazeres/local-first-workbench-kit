# Changelog

## 0.0.1

**Initial release — Fase -2.1**

- Monorepo scaffold (pnpm workspace, TypeScript base config, EditorConfig)
- `@thiagoprazeres/prompt-executor` — Protocol executor with sessions, steps, contracts, evaluation
- `@thiagoprazeres/contracts` — Zod schemas for validation
- Hugo docs scaffold
- GitHub public repository
- npm published packages
- Full TypeScript support, zero runtime dependencies (prompt-executor)

### Highlights

- Provider-agnostic architecture — bring your own LLM adapter
- Step contracts with pluggable validators
- Reproducible sessions with JSON serialization
- File and memory-based prompt sources
- Minimal API surface

### Known limitations

- Hugo docs are scaffold only — no content
- No persistence layer
- No MCP integration yet
- No VS Code extension yet
