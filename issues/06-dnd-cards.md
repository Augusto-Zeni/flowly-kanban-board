# Drag-and-drop de cards

## What to build

Implementar drag-and-drop de cards entre colunas e dentro da mesma coluna usando `@dnd-kit/core`.

Ao soltar um card, a posição é calculada via `computeInsertPosition` (média entre o card anterior e o próximo no destino). A Server Action `moveCard` persiste a nova `columnId` e `position`, insere um `CardHistory` do tipo MOVED com payload `{ fromColumnId, toColumnId }` e chama `touchBoard`. O estado visual é atualizado otimisticamente no cliente antes da confirmação do servidor.

## Acceptance criteria

- [ ] Cards podem ser arrastados entre colunas diferentes
- [ ] Cards podem ser reordenados dentro da mesma coluna
- [ ] Posição calculada corretamente via `computeInsertPosition`
- [ ] `CardHistory` do tipo MOVED inserido com `fromColumnId` e `toColumnId` corretos
- [ ] `touchBoard` chamado na Server Action `moveCard`
- [ ] Atualização otimista no cliente (card se move visualmente antes da resposta do servidor)
- [ ] Em caso de erro na Server Action, estado visual reverte para a posição original
- [ ] Apenas EDITOR e OWNER podem mover cards (Viewer não aciona drag)

## Blocked by

- #5 (Cards — criar, editar título/descrição, deletar)
