# Rota `/board/[id]` — estrutura de colunas

## What to build

Implementar a rota `/board/[id]` com o layout completo do board (sidebar + header com tabs + área kanban) e as ações de criar, renomear, deletar e reordenar colunas (sem cards ainda).

**Layout da página:** `display: flex`, altura `100vh`, sem scroll vertical no wrapper. Três regiões:
- Sidebar esquerda ~220px (componente `<Sidebar />` do #3)
- Área central `flex-grow: 1` com header + colunas
- Painel de detalhe à direita ~380px (inicialmente fechado — implementado em #5)

**`<BoardHeader />`** — header da área central com:
- Nome do projeto
- Tabs: Overview | Tasks (ativo) | Timeline | Notes | Files | Members
- Tab ativa: underline em `--text-primary`, sem background. Demais tabs em `--text-secondary`

**`<KanbanBoard />`** — container com scroll horizontal das colunas. Colunas de largura fixa ~280–300px, gap 16px entre elas.

**`<KanbanColumn />`** — cada coluna com:
- Header: ícone de status colorido + nome em uppercase + contagem de cards + botão `+`
  - "To Do": ícone cinza `--status-todo`
  - "In Progress": ícone laranja `--status-progress`
  - "In Review": ícone azul `--status-review`
  - Colunas criadas pelo usuário: ícone neutro até ser configurado
- Scroll vertical independente dentro da coluna
- Fundo `--bg-column`, borda `1px solid var(--border)`
- Botão `+` no header abre input inline para criar nova coluna (nesta issue) ou card (em #5)

**Lógica de colunas:** verificação de membership ACTIVE. Colunas em ordem por `position` (Float). Criar adiciona ao final. Reordenar via `computeInsertPosition`, com renumeração automática se `shouldRenumber` retornar true. Deletar bloqueado se coluna tiver cards. Todas as mutações chamam `touchBoard`.

## Acceptance criteria

- [ ] Layout três colunas (sidebar | board | painel) com `display: flex` e `100vh`
- [ ] `<BoardHeader />` renderiza nome do projeto e tabs com underline no item ativo
- [ ] `<KanbanBoard />` tem scroll horizontal e colunas de largura fixa ~280–300px com gap 16px
- [ ] `<KanbanColumn />` tem scroll vertical independente e fundo `--bg-column`
- [ ] Header de coluna exibe ícone de status colorido (cinza/laranja/azul conforme nome), nome uppercase e contagem
- [ ] Rota `/board/[id]` protegida — redireciona se não autenticado ou sem membership ACTIVE
- [ ] Colunas renderizadas em ordem por `position`
- [ ] Criar coluna: adicionada ao final, `touchBoard` chamado
- [ ] Renomear coluna: disponível para EDITOR e OWNER
- [ ] Deletar coluna: disponível para EDITOR e OWNER, bloqueada se coluna tiver cards
- [ ] Reordenar colunas: posição calculada via `computeInsertPosition`, renumeração automática se necessário
- [ ] Viewer não vê controles de edição (criar, renomear, deletar, reordenar)
- [ ] UI em português do Brasil com tokens do DESIGN.md

## Blocked by

- #1 (Schema completo do Prisma)
- #2 (Helpers de posição Float + touchBoard)
- #3 (Dashboard — listar, criar e deletar boards)
