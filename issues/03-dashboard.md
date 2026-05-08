# Dashboard — listar, criar e deletar boards

## What to build

Implementar a rota `/dashboard` com sidebar de navegação, lista de boards do usuário autenticado e as ações de criar e deletar board.

Esta issue também cobre a configuração do design system (CSS tokens globais) e os componentes primitivos reutilizáveis, pois o dashboard é a primeira tela que os utiliza.

**Design system (`globals.css`):** definir todas as CSS custom properties do DESIGN.md:
- `--bg-base: #0f0f0f`, `--bg-sidebar: #141414`, `--bg-card: #1c1c1c`, `--bg-panel: #181818`, `--bg-column: #161616`
- `--border: #2a2a2a`, `--text-primary: #e8e8e8`, `--text-secondary: #6b6b6b`, `--text-muted: #444444`
- `--accent-yellow: #c9f542`
- Tags: `--tag-design: #3b4fd8`, `--tag-art: #e07b39`, `--tag-web: #3dba6e`
- Prioridades: `--priority-high: #e05252`, `--priority-medium: #e09a3b`, `--priority-low: #3dba6e`
- Status de coluna: `--status-todo: #555555`, `--status-progress: #e09a3b`, `--status-review: #3b9de0`

**Componentes primitivos a criar junto:**
- `<TagBadge label color />` — pílula com fundo semi-transparente (`rgba(cor, 0.25)` + texto claro), `font-size: 10px`, `padding: 2px 8px`, `border-radius: 4px`
- `<PriorityBadge priority />` — mesma pílula mas com bullet colorido + texto (High / Medium / Low)
- `<Avatar src name size />` — círculo com fallback de iniciais, tamanho padrão 24px

**`<Sidebar />`** — navegação lateral fixa com fundo `--bg-sidebar`, ~220px de largura:
- Header: logo "Flowly" com ícone colorido em `--accent-yellow`
- Barra de busca: ícone lupa + placeholder "Search" + atalho ⌘K
- Seção GENERAL: My Time, My Work, Boards, Notification (badge vermelho `--priority-high` com contagem)
- Seção PROJECTS: lista dos boards do usuário com o board ativo em destaque (`background: #222222`, texto branco)
- Seção OTHER: Settings, Help Center
- Rodapé fixo: avatar + nome + email do usuário logado
- Item ativo: `background: #222222`, texto `--text-primary`. Hover: `background: #1e1e1e`
- Labels de seção: `--text-secondary`, `font-size: 10px`, `letter-spacing: 0.08em`, `text-transform: uppercase`
- Recolhível em telas < 1200px (exibe apenas ícones)

**Dashboard:** layout `display: flex`, altura `100vh`. A área de conteúdo à direita da sidebar lista os boards. Cada card de board exibe: nome, descrição, número de membros ativos e data da última atividade (`updatedAt`). Botão para criar novo board (nome obrigatório, descrição opcional). Owner pode deletar o board com confirmação. Ao criar um board, o criador recebe automaticamente um `BoardMembership` com role OWNER e status ACTIVE na mesma transaction.

## Acceptance criteria

- [ ] CSS tokens do DESIGN.md definidos em `globals.css` (substituem os tokens anteriores)
- [ ] `<TagBadge />` renderiza pílula com fundo `rgba(cor, 0.25)` e texto correspondente
- [ ] `<PriorityBadge />` renderiza bullet colorido + label (High / Medium / Low) com cores de prioridade
- [ ] `<Avatar />` renderiza círculo 24px com imagem ou fallback de iniciais
- [ ] `<Sidebar />` renderiza todas as seções (GENERAL, PROJECTS, OTHER) e rodapé de usuário
- [ ] Sidebar recolhe para ícones em telas < 1200px
- [ ] Rota `/dashboard` protegida — redireciona para `/` se não autenticado
- [ ] Lista todos os boards com membership ACTIVE do usuário
- [ ] Card de board exibe nome, descrição, contagem de membros e `updatedAt`
- [ ] Criar board: Server Action valida sessão + Zod, retorna `{ success, data }` ou `{ success, error }`
- [ ] Ao criar board, criador recebe BoardMembership OWNER/ACTIVE na mesma transaction
- [ ] Deletar board: disponível apenas para OWNER, com confirmação
- [ ] Deletar board cascateia corretamente (colunas, cards, memberships)
- [ ] UI em português do Brasil, tema escuro com tokens do DESIGN.md

## Blocked by

- #1 (Schema completo do Prisma)
