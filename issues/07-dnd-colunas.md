# Drag-and-drop de colunas

## What to build

Implementar drag-and-drop de colunas usando `@dnd-kit/core`.

Ao soltar uma coluna, a posição é calculada via `computeInsertPosition`. A Server Action `reorderColumn` persiste a nova `position` e chama `touchBoard`. Atualização otimista no cliente.

## Acceptance criteria

- [ ] Colunas podem ser reordenadas via drag-and-drop
- [ ] Posição calculada corretamente via `computeInsertPosition`
- [ ] Renumeração automática se `shouldRenumber` retornar true
- [ ] `touchBoard` chamado na Server Action
- [ ] Atualização otimista no cliente com reversão em caso de erro
- [ ] Apenas EDITOR e OWNER podem reordenar colunas

## Blocked by

- #4 (Rota `/board/[id]` — estrutura de colunas)
- #2 (Helpers de posição Float + touchBoard)
