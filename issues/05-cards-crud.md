# Cards — criar, editar título/descrição, deletar

## What to build

Implementar a exibição de cards dentro das colunas e as ações básicas: criar card, editar título e descrição, e deletar card.

Cards são exibidos em ordem pelo campo `position` dentro da coluna. Criar card adiciona ao final da coluna com um `CardHistory` do tipo CREATED. Editar abre um modal mínimo (título + descrição). Deletar remove o card com confirmação. Todas as mutações chamam `touchBoard`.

## Acceptance criteria

- [ ] Cards renderizados em ordem por `position` dentro de cada coluna
- [ ] Criar card: título obrigatório, adicionado ao final da coluna
- [ ] Ao criar card, registro `CardHistory` do tipo CREATED é inserido na mesma transaction
- [ ] Editar título e descrição via modal, disponível para EDITOR e OWNER
- [ ] Deletar card com confirmação, disponível para EDITOR e OWNER
- [ ] `touchBoard` chamado em criar, editar e deletar
- [ ] Viewer vê os cards mas não tem controles de edição
- [ ] Server Actions validam sessão e role antes de qualquer operação

## Blocked by

- #4 (Rota `/board/[id]` — estrutura de colunas)
