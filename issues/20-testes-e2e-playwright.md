# Testes e2e Playwright

## What to build

Implementar testes end-to-end com Playwright cobrindo os fluxos críticos do Flowly. O OAuth do Google é mockado via um provider fake configurado apenas no ambiente de teste.

Um bom teste e2e aqui: navega como um usuário real, verifica o que aparece na tela, não inspeciona estado interno do banco.

## Acceptance criteria

- [ ] Playwright configurado no projeto (`playwright.config.ts`)
- [ ] Google OAuth mockado no ambiente de teste (sem chamadas reais ao Google)
- [ ] Fluxo 1 — Login: usuário acessa `/`, clica em "Entrar com Google", é redirecionado para `/dashboard`
- [ ] Fluxo 2 — Criar board: usuário no dashboard cria um board, board aparece na lista
- [ ] Fluxo 3 — Board básico: usuário cria coluna, cria card, move card para outra coluna via drag-and-drop, card aparece na coluna destino
- [ ] Fluxo 4 — Convite: owner gera link, segundo usuário acessa link, fica PENDING, owner aprova, segundo usuário acessa o board
- [ ] Testes isolados: cada teste começa com estado limpo (usuário e board criados via setup, removidos no teardown)
- [ ] `npx playwright test` executa e passa no ambiente de CI (headless)

## Blocked by

- #19 (Testes de integração das Server Actions)
