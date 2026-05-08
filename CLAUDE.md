# Flowly — CLAUDE.md

## Visão Geral do Projeto

Flowly é um quadro Kanban colaborativo em tempo real com analytics avançado. Usuários criam boards, convidam colaboradores via link (com aprovação do dono), movem cards entre colunas customizáveis e acompanham métricas de produtividade — tudo sincronizado instantaneamente entre os participantes sem reload de página.

Projeto pessoal/portfólio. Sem planos de hospedagem por enquanto.

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript 5 |
| Banco de dados | PostgreSQL 17 (via Docker) |
| ORM | Prisma 7 |
| Autenticação | NextAuth v5 (Google OAuth) |
| Realtime | **A definir** — preferência por solução de alta performance para muitos usuários simultâneos (candidatos: Ably, Pusher Channels, Supabase Realtime, ou WebSockets nativos com Redis Pub/Sub) |
| Estilização | Tailwind CSS v4 |
| Componentes UI | Radix UI + shadcn/ui |
| Animações | GSAP |
| Mutações | Next.js Server Actions |
| Testes | **A definir** — Vitest (unit/integration) + Playwright (e2e) |

### Decisões técnicas pendentes
- Solução de realtime (avaliar custo/performance: Ably vs Pusher vs WebSockets nativos com Redis)
- Biblioteca de drag-and-drop para os cards (candidatos: `@dnd-kit/core`, `react-beautiful-dnd`)
- Estratégia de upload para attachments dos cards (candidatos: Cloudflare R2, AWS S3, Uploadthing)

---

## Arquitetura

### Estrutura de pastas (`src/`)

```
src/
├── app/
│   ├── (auth)/              # Rotas protegidas por sessão
│   │   ├── dashboard/       # Lista de boards do usuário
│   │   └── board/[id]/      # Visualização do board (kanban + filtros)
│   ├── (public)/            # Landing page (já existe)
│   ├── api/
│   │   └── auth/[...nextauth]/
│   └── globals.css
├── components/
│   ├── ui/                  # Componentes base (shadcn/ui)
│   ├── Board/               # BoardColumn, CardItem, CardModal, etc.
│   ├── Analytics/           # Charts e widgets de métricas
│   ├── Header/
│   ├── Dialog/
│   └── Button/
├── lib/
│   ├── prisma.ts            # Singleton do cliente Prisma
│   ├── utils.ts             # cn() e helpers gerais
│   └── realtime/            # Abstração da camada de realtime
├── actions/                 # Server Actions (uma pasta por domínio)
│   ├── board.ts
│   ├── card.ts
│   ├── column.ts
│   └── invite.ts
├── auth.ts                  # Configuração do NextAuth
└── generated/prisma/        # Cliente Prisma gerado (não editar)
```

### Regra de roteamento
- `/` → landing page (pública)
- `/dashboard` → lista de boards do usuário autenticado
- `/board/[id]` → board específico (requer sessão + membership)
- `/invite/[token]` → página de aceitação de convite

---

## Modelo de Dados (Prisma)

### Entidades principais (ainda a implementar no schema)

```
User               — já existe (NextAuth)
Board              — nome, descrição, dono (userId), createdAt
BoardMembership    — userId, boardId, role (OWNER | EDITOR | VIEWER), status (PENDING | ACTIVE)
InviteLink         — token único, boardId, createdBy, expiresAt, used
Column             — boardId, título, posição (ordem)
Card               — columnId, boardId, título, descrição, posição, dueDate, assigneeId, createdAt
CardTag            — cardId, label, cor
CardChecklist      — cardId, título
ChecklistItem      — checklistId, texto, completado
CardComment        — cardId, userId, conteúdo, createdAt
CardAttachment     — cardId, userId, url, nome, tamanho, mimeType, createdAt
CardHistory        — cardId, userId, tipo (MOVED | UPDATED | COMMENTED), payload JSON, createdAt
```

### Roles do board
- `OWNER` — controle total, aprova convites, pode deletar o board
- `EDITOR` — pode criar/editar/mover cards e colunas
- `VIEWER` — somente leitura

---

## Funcionalidades

### Board
- Colunas customizáveis (criar, renomear, reordenar, deletar)
- Cards com: título, descrição, tags coloridas, responsável (assignee), data de vencimento, checklists, comentários, attachments
- Drag-and-drop de cards entre colunas e dentro da mesma coluna
- Filtros: por tag, por assignee, por status de vencimento (atrasado, hoje, futuro)
- Atualização em tempo real para todos os membros com o board aberto

### Convites
- Dono gera um link de convite com token único
- Pessoa acessa o link → entra em estado `PENDING`
- Dono aprova ou rejeita na interface do board
- Link pode ter expiração configurável

### Analytics (por board)
- Cards por status (coluna)
- Cards por membro
- Burndown Chart
- Velocity (cards concluídos por período)
- Cycle Time (tempo médio card entra → sai da última coluna)
- Lead Time (tempo criação → conclusão)
- Cumulative Flow Diagram

---

## Padrões de Código

### Server Actions
- Todas as mutações usam Server Actions (`'use server'`) em `src/actions/`
- Cada action valida a sessão no início (nunca confiar no cliente)
- Validação de input com Zod antes de qualquer operação no banco
- Retornam `{ success: true, data }` ou `{ success: false, error: string }`

### Componentes
- Componentes de servidor por padrão — `'use client'` apenas quando necessário (interatividade, hooks, realtime)
- Pastas com `index.ts` apenas quando o componente tiver sub-componentes internos
- Props tipadas com `interface`, nunca `type` para props de componente

### Estilização
- Tailwind classes com `cn()` (de `src/lib/utils.ts`) para condicional
- Variáveis CSS customizadas definidas em `globals.css` — não hardcodar cores hex no JSX
- Design system: fundo `#171719`, texto `#FEFEFE`, accent `#9CFF01` (primary)
- Não usar inline styles quando existir equivalente em Tailwind

### Testes
- Vitest para unit e integration tests
- Playwright para testes e2e dos fluxos críticos (login, criar board, mover card, convite)
- Colocar testes em `__tests__/` próximo ao código que testam
- Server Actions devem ter testes de integração cobrindo casos de erro e autenticação

### TypeScript
- `strict: true` — sem `any` explícito
- Tipos de domínio em `src/types/` quando compartilhados entre server e client
- Usar `satisfies` ao invés de cast quando possível

---

## Design & UX

- Tema escuro, sem toggle claro/escuro
- Sem internacionalização — aplicação inteiramente em português do Brasil
- Fonte: Manrope (já configurada)
- Animações suaves com GSAP (já instalado) para transições de UI
- Realtime deve ser transparente ao usuário: updates aparecem sem indicadores intrusivos (exceto avatares de presença)

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Banco de dados (Docker)
docker compose up -d

# Prisma
npx prisma migrate dev --name <nome>
npx prisma studio
npx prisma generate

# Linting
npm run lint
npm run lint:fix

# Testes (a configurar)
npx vitest
npx playwright test
```

---

## Variáveis de Ambiente

```env
# Banco
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/flowly

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## Estado Atual do Projeto

- [x] Landing page completa com animações
- [x] Login com Google (NextAuth v5 + Prisma adapter)
- [x] Schema base (User, Account, Session)
- [ ] Schema completo (Board, Column, Card, etc.)
- [ ] Dashboard do usuário (lista de boards)
- [ ] Visualização do board (kanban)
- [ ] Drag-and-drop de cards
- [ ] Realtime (a definir tecnologia)
- [ ] Sistema de convites
- [ ] Analytics
- [ ] Testes
