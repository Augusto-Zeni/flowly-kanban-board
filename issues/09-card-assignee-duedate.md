# Modal de card — assignee e data de vencimento

## What to build

Adicionar campos de responsável (assignee) e data de vencimento (dueDate) no modal de card.

O assignee é selecionado a partir dos membros ACTIVE do board. A dueDate usa um date picker. Cards com dueDate são exibidos com indicador visual na coluna (atrasado em vermelho, hoje em amarelo, futuro neutro).

## Acceptance criteria

- [ ] Modal exibe o assignee atual e permite alterar via dropdown com membros do board
- [ ] Modal exibe a dueDate atual e permite alterar via date picker
- [ ] Indicador visual de vencimento aparece no card na coluna (atrasado, hoje, futuro)
- [ ] EDITOR e OWNER podem editar assignee e dueDate
- [ ] Remover assignee (setar null) é possível
- [ ] Remover dueDate (setar null) é possível
- [ ] Server Actions validam sessão e role
- [ ] `touchBoard` chamado nas mutações

## Blocked by

- #5 (Cards — criar, editar título/descrição, deletar)
