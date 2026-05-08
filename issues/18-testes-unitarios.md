# Testes unitários (posição Float, validação de invite)

## What to build

Implementar testes unitários puros com Vitest para os dois módulos de lógica pura do projeto: `lib/board-position.ts` e `lib/invite.ts`.

Um bom teste neste contexto: testa comportamento externo observável (o que a função retorna dado um input), não detalhes de implementação. Sem mocks de banco de dados — esses módulos são funções puras.

## Acceptance criteria

- [ ] Vitest configurado no projeto (`vitest.config.ts`)
- [ ] `computeInsertPosition`: testes para inserir no início (before null), no fim (after null), no meio, e múltiplas inserções consecutivas no mesmo intervalo
- [ ] `shouldRenumber`: testes para lista sem necessidade de renumeração, lista com diferença abaixo de `1e-9`, lista com um único item
- [ ] `isInviteValid`: testes para link válido (sem restrições), expirado por data, esgotado por usos, revogado, combinação de restrições
- [ ] `npm run test` (ou `npx vitest`) executa todos os testes e passa
- [ ] Testes colocados em `__tests__/` próximo ao código testado

## Blocked by

- #2 (Helpers de posição Float + touchBoard)
- #16 (Sistema de convites — gerar link e aceitar)
