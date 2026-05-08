# Filtros do board

## What to build

Implementar filtros no board para ajudar os membros a focarem em subconjuntos de cards. Os filtros são aplicados no cliente (sem round-trip ao servidor) e podem ser combinados.

Filtros disponíveis: por tag (uma ou mais), por assignee (um ou mais membros), por status de vencimento (atrasado / hoje / futuro).

## Acceptance criteria

- [ ] Barra de filtros acessível no topo do board
- [ ] Filtro por tag: selecionar uma ou mais tags oculta cards sem aquelas tags
- [ ] Filtro por assignee: selecionar um ou mais membros oculta cards de outros
- [ ] Filtro por vencimento: opções "Atrasado", "Hoje", "Futuro" — exibe apenas cards com dueDate naquela categoria
- [ ] Filtros são combinados (AND): card precisa satisfazer todos os filtros ativos para ser exibido
- [ ] Botão "Limpar filtros" reseta todos os filtros
- [ ] Colunas vazias após filtro continuam visíveis (não são ocultadas)
- [ ] Filtros aplicados no cliente, sem chamadas ao servidor

## Blocked by

- #8 (Modal de card — tags coloridas)
- #9 (Modal de card — assignee e data de vencimento)
