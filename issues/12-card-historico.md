# Modal de card — histórico de movimentações

## What to build

Exibir o histórico de movimentações do card no modal (eventos CREATED e MOVED do `CardHistory`). Cada entrada mostra quem fez a ação, de qual coluna veio, para qual foi, e quando.

## Acceptance criteria

- [ ] Modal exibe o histórico de eventos CREATED e MOVED em ordem cronológica
- [ ] Evento CREATED exibe: "Criado por [nome] em [data]"
- [ ] Evento MOVED exibe: "[nome] moveu de [coluna origem] para [coluna destino] em [data]"
- [ ] Avatar do usuário exibido em cada entrada
- [ ] Histórico visível para todos os membros ACTIVE (incluindo VIEWER)
- [ ] Nomes das colunas são resolvidos no momento da exibição (não apenas IDs)

## Blocked by

- #6 (Drag-and-drop de cards)
