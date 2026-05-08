# Painel de card — assignee e data de vencimento

## What to build

Adicionar campos de responsável (assignee) e data de vencimento (dueDate) no `<TaskDetailPanel />`. Quando preenchidos, esses dados aparecem tanto no grid de metadados do drawer quanto no `<TaskCard />` na coluna.

**Assignee no drawer:** linha "Assignee" do grid de metadados exibe `<Avatar />` (24px) + nome do membro. Editar via dropdown com membros ACTIVE do board. Remover assignee (setar null) disponível. Ao salvar, o avatar do assignee aparece no rodapé do `<TaskCard />` na coluna — 24px, com `margin-left: -6px` se houver múltiplos avatares sobrepostos.

**Due date no drawer:** linha "Due Date" exibe ícone calendário (Lucide) + data formatada. Editar via date picker. Remover dueDate disponível. No `<TaskCard />`, a data aparece com ícone de calendário na linha acima do rodapé. Indicador visual de urgência na cor da data:
- Atrasado: cor `--priority-high` (`#e05252`)
- Hoje: cor `--priority-medium` (`#e09a3b`)
- Futuro: cor `--text-secondary` (`#6b6b6b`)

## Acceptance criteria

- [ ] Linha "Assignee" no drawer exibe avatar + nome, ou "Sem responsável" se vazio
- [ ] Dropdown de seleção lista membros ACTIVE do board com avatar e nome
- [ ] Remover assignee (setar null) disponível
- [ ] Avatar do assignee aparece no rodapé do `<TaskCard />` na coluna
- [ ] Múltiplos avatares sobrepostos com `margin-left: -6px` (preparação para assignee múltiplo futuro — por ora só um)
- [ ] Linha "Due Date" no drawer exibe ícone calendário + data formatada, ou "Sem prazo" se vazio
- [ ] Date picker para edição da due date
- [ ] Remover dueDate (setar null) disponível
- [ ] `<TaskCard />` exibe due date com ícone de calendário na cor de urgência correta (atrasado/hoje/futuro)
- [ ] EDITOR e OWNER podem editar assignee e dueDate
- [ ] Server Actions validam sessão e role
- [ ] `touchBoard` chamado nas mutações

## Blocked by

- #5 (Cards — criar, editar, deletar e painel de detalhe)
