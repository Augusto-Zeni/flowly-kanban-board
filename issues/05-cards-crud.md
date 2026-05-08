# Cards — criar, editar, deletar e painel de detalhe

## What to build

Implementar a exibição de cards dentro das colunas, as ações básicas (criar, editar, deletar) e o componente `<TaskDetailPanel />` — drawer fixo à direita que abre ao clicar no card.

**`<TaskCard />`** — anatomia visual do card na coluna:
```
┌────────────────────────────────┐
│ [Tag projeto] [● Prioridade]   │  ← linha de badges (TagBadge + PriorityBadge)
│                                │
│  Título da tarefa em até       │  ← 2 linhas max, truncar com ellipsis
│  duas linhas...                │
│                                │
│  📅 31 May 2025                │  ← ícone calendário (Lucide) + data, se dueDate presente
│                                │
│ [Avatar(s)]    [💬 2]  [📎 4]  │  ← rodapé: avatares sobrepostos + contagem de comentários e anexos
└────────────────────────────────┘
```
- Background: `--bg-card`, border: `1px solid var(--border)`, border-radius: `8px`, padding: `12px`
- Hover: `box-shadow: 0 0 0 1px #3a3a3a`
- Gap entre cards: `10px`
- Título: `font-size: 13px`, `font-weight: 500`
- Avatares no rodapé: 24px, sobrepostos com `margin-left: -6px` quando múltiplos
- Ícones de rodapé (💬 e 📎): Lucide Icons, contagem em `--text-secondary`, `font-size: 11px`

**`<TaskDetailPanel />`** — drawer fixo à direita (~380px), fundo `--bg-panel`, separado por `border-left: 1px solid var(--border)`. Abre ao clicar no card; o board permanece visível à esquerda. Em telas < 768px vira bottom sheet.

Estrutura do drawer:
- **Header:** ações à direita — expandir (↗), menu (•••), editar (✏️), fechar (✕)
- **Título:** `font-size: 18px`, `font-weight: 600`, cor `--text-primary`, até 3 linhas, editável inline para EDITOR/OWNER
- **Metadados** (grid 2 colunas: label | valor, separados por `1px solid var(--border)`):
  - Assignee: avatar + nome (ou "Sem responsável")
  - Status: ícone colorido + nome da coluna atual
  - Due Date: ícone calendário + data (ou "Sem prazo")
  - Priority: bullet colorido + label
  - Tags: lista de `<TagBadge />`
  - Labels em `--text-secondary`, `font-size: 12px`. Valores em `--text-primary`, `font-size: 13px`
- **Tabs:** Description (ativo) | Comments | Attachments | Activities
- **Corpo (tab Description):** texto da descrição, `font-size: 13px`, `line-height: 1.7`, editável para EDITOR/OWNER

Criar card: botão `+` na coluna abre input inline (título obrigatório). Deletar: disponível no drawer via menu (•••) para EDITOR/OWNER, com confirmação. Todas as mutações chamam `touchBoard`.

## Acceptance criteria

- [ ] Cards renderizados em ordem por `position` dentro de cada coluna
- [ ] `<TaskCard />` exibe linha de badges (tag + prioridade), título truncado em 2 linhas, due date com ícone, rodapé com avatares sobrepostos e contagem de comentários/anexos
- [ ] Hover no card aplica `box-shadow: 0 0 0 1px #3a3a3a`
- [ ] Clicar no card abre `<TaskDetailPanel />` à direita sem ocultar o board
- [ ] Drawer exibe header com ações, título editável inline, grid de metadados e tabs
- [ ] Tab Description exibe e permite editar a descrição (EDITOR/OWNER)
- [ ] Drawer fecha ao clicar em ✕ ou pressionar Escape
- [ ] Em telas < 768px o drawer vira bottom sheet
- [ ] Criar card: título obrigatório, adicionado ao final da coluna via input inline no `+`
- [ ] Ao criar card, registro `CardHistory` do tipo CREATED é inserido na mesma transaction
- [ ] Deletar card via menu no drawer, com confirmação, disponível para EDITOR e OWNER
- [ ] `touchBoard` chamado em criar, editar e deletar
- [ ] Viewer vê os cards e o drawer mas não tem controles de edição
- [ ] Server Actions validam sessão e role antes de qualquer operação

## Blocked by

- #4 (Rota `/board/[id]` — estrutura de colunas)
