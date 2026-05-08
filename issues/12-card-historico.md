# Painel de card — tab de histórico (Activities)

## What to build

Implementar a tab "Activities" do `<TaskDetailPanel />` com o histórico de movimentações do card (eventos CREATED e MOVED do `CardHistory`). Cada entrada mostra avatar, quem fez a ação, o que aconteceu e quando.

## Acceptance criteria

- [ ] Tab "Activities" acessível no `<TaskDetailPanel />`
- [ ] Histórico exibido em ordem cronológica (mais recente por último)
- [ ] Evento CREATED exibe: `<Avatar />` + "Criado por [nome] em [data]"
- [ ] Evento MOVED exibe: `<Avatar />` + "[nome] moveu de [coluna origem] para [coluna destino] em [data]"
- [ ] Nomes das colunas resolvidos no momento da exibição (não apenas IDs)
- [ ] Histórico visível para todos os membros ACTIVE (incluindo VIEWER)
- [ ] Timestamp relativo (ex: "há 3 dias") com tooltip de data absoluta ao hover

## Blocked by

- #6 (Drag-and-drop de cards)
