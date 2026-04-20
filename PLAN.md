# PLAN — Local-First Workbench Kit

Roadmap real. Fases curtas, escopo fechado, release por fase.

## Estado atual

**Fase -2.1 — DONE (v0.0.1)**

Publicado em 2026-04-20.

- ✓ Monorepo (pnpm workspace, tsconfig base, strict TS)
- ✓ `@thiagoprazeres/contracts@0.0.1` — Zod schemas
- ✓ `@thiagoprazeres/prompt-executor@0.0.1` — runtime de protocolo, zero deps
- ✓ Hugo docs scaffold (book theme)
- ✓ README, CHANGELOG, llms.txt, llms-full.txt
- ✓ GitHub + npm publicados
- ✓ Tag `v0.0.1`

---

## Próximas fases

Ordem fixa. Cada fase entrega um release real.

### Fase -2.0 — MCP server

Objetivo: expor `prompt-executor` como MCP server consumível por Claude Code e outros clientes.

Escopo:
- `packages/mcp-server` novo pacote
- Tools MCP para: `run-step`, `run-sequence`, `load-prompt`, `serialize-session`
- Suporte a `stdio` transport
- README + Bruno/Inspector examples

Fora de escopo:
- SSE transport
- Autenticação
- Persistência de sessão

Critério de done:
- Rodável via `npx @thiagoprazeres/mcp-server`
- Claude Code consegue executar um protocolo de prompts fim-a-fim

---

### Fase -1 — VS Code extension

Objetivo: editor de protocolo dentro do VS Code.

Escopo:
- `packages/vscode-extension`
- Command palette: "Run protocol", "Inspect session", "New prompt"
- View de sessão ativa (tree view)
- Integração com o MCP server da fase -2.0

Fora de escopo:
- Debug adapter
- Extensão para outros editors
- Sync com cloud

Critério de done:
- Instalável via VSIX
- Publicada no VS Code Marketplace

---

### Fase 0 — Open WebUI recipes

Objetivo: receitas para consumir `prompt-executor` dentro do Open WebUI.

Escopo:
- `packages/openwebui-recipes`
- Recipes para workflows comuns (draft → review → finalize)
- Documentação de instalação

Fora de escopo:
- Fork do Open WebUI
- UI própria

Critério de done:
- Receitas instaláveis
- Walkthrough funcional

---

### Fase 1 — Penpot MCP integration

Objetivo: integrar prompt-executor com Penpot via MCP.

Escopo:
- `packages/penpot-mcp`
- Tools para: gerar design specs a partir de sessões, exportar resultados para Penpot

Critério de done:
- Demo fim-a-fim: prompt → spec → Penpot

---

### Fase 2 — Workbench app

Objetivo: app final que orquestra tudo.

Escopo:
- `apps/workbench`
- UI web (local-first)
- Integra MCP server, recipes, Penpot
- Sessões persistidas localmente

Critério de done:
- Instalável localmente
- Demo público

---

## Fora do roadmap (por enquanto)

- Catálogo de prompts embutido
- LLM client próprio
- Cloud sync
- Billing/teams
- Providers remotos custom

---

## Princípios

1. **Release real em cada fase.** Nada de "quase pronto".
2. **Escopo fechado.** Features novas viram fase nova.
3. **Package boundaries rígidos.** Nenhum import cross-package que não seja via `exports`.
4. **Zero deps onde der.** `prompt-executor` continua zero-dep.
5. **TypeScript strict sempre.** Sem `any` casual.
6. **Docs com a release.** Sem docs, sem release.
7. **Versionamento honesto.** 0.x é instável; 1.0 quando a API não quebrar mais.

---

## Como contribuir com uma fase

1. Abrir issue "Fase X" no GitHub
2. Rascunhar escopo + critério de done
3. Criar branch `fase-X/...`
4. PR com CHANGELOG atualizado
5. Tag `vX.Y.Z` após merge

---

## Changelog de fases

| Fase | Release | Data | Status |
|------|---------|------|--------|
| -2.1 | v0.0.1 | 2026-04-20 | ✓ Done |
| -2.0 | —      | —          | Next |
| -1   | —      | —          | Planned |
| 0    | —      | —          | Planned |
| 1    | —      | —          | Planned |
| 2    | —      | —          | Planned |
