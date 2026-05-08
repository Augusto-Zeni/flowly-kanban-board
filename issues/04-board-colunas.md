# Rota `/board/[id]` — estrutura de colunas

## What to build

Implementar a rota `/board/[id]` com a visualização das colunas do board e as ações de criar, renomear, deletar e reordenar colunas (sem cards ainda).

A página verifica que o usuário autenticado tem membership ACTIVE no board. Colunas são exibidas em ordem pelo campo `position` (Float). Criar coluna adiciona ao final. Reordenar usa o algoritmo de média do helper `computeInsertPosition`. Se `shouldRenumber` retornar true após uma inserção, renumera todas as posições (0, 1, 2…). Deletar coluna só é permitida se estiver vazia. Todas as mutações chamam `touchBoard`.

## Acceptance criteria

- [ ] Rota `/board/[id]` protegida — redireciona se não autenticado ou sem membership ACTIVE
- [ ] Colunas renderizadas em ordem por `position`
- [ ] Criar coluna: adicionada ao final, `touchBoard` chamado
- [ ] Renomear coluna: disponível para EDITOR e OWNER
- [ ] Deletar coluna: disponível para EDITOR e OWNER, bloqueada se coluna tiver cards
- [ ] Reordenar colunas: posição calculada via `computeInsertPosition`, renumeração automática se necessário
- [ ] Viewer não vê controles de edição (criar, renomear, deletar, reordenar)
- [ ] UI em português do Brasil, tema escuro

## Blocked by

- #1 (Schema completo do Prisma)
- #2 (Helpers de posição Float + touchBoard)
