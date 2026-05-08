# Painel de card — tags coloridas

## What to build

Adicionar suporte a tags coloridas no `<TaskDetailPanel />`. O usuário pode criar tags com um label e uma cor, associá-las ao card e removê-las. As tags aparecem no grid de metadados do drawer e na linha de badges do `<TaskCard />` na coluna.

**Paleta pré-definida de cores de tag (do DESIGN.md):**
- Design System: `#3b4fd8` (fundo `rgba(59, 79, 216, 0.25)`, texto `#6e84f5`)
- Daily Art: `#e07b39` (fundo `rgba(224, 123, 57, 0.25)`, texto `#f0a060`)
- Weszlo.com: `#3dba6e` (fundo `rgba(61, 186, 110, 0.25)`, texto `#5dd48a`)

O usuário pode escolher uma das cores da paleta ou uma cor customizada. A tag renderiza como pílula com fundo semi-transparente via `<TagBadge />` (já implementado em #3).

## Acceptance criteria

- [ ] Tags do card exibidas na linha de metadados "Tags" do drawer (`<TagBadge />` para cada tag)
- [ ] Tags do card exibidas na linha de badges do `<TaskCard />` na coluna
- [ ] EDITOR e OWNER podem adicionar nova tag: label + cor da paleta (ou cor customizada)
- [ ] EDITOR e OWNER podem remover uma tag do card
- [ ] `<TagBadge />` usa fundo `rgba(cor, 0.25)` e texto derivado da cor base
- [ ] Server Actions validam sessão e role
- [ ] `touchBoard` chamado em adicionar e remover tag

## Blocked by

- #5 (Cards — criar, editar, deletar e painel de detalhe)
