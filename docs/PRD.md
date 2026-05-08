# PRD — Flowly MVP: Schema, Dashboard e Board Kanban

## Problem Statement

O usuário autenticado no Flowly não consegue criar ou gerenciar boards Kanban. A aplicação possui autenticação funcional via Google OAuth, mas não existe nenhuma estrutura de dados além do User/Account/Session, nem interfaces para criar boards, adicionar colunas, criar e mover cards, ou convidar colaboradores. O usuário não tem onde trabalhar após fazer login.

---

## Solution

Implementar a fundação completa do Flowly: schema de banco de dados, dashboard de boards e a visualização do board Kanban com drag-and-drop — tudo sincronizado em tempo real via Ably. O usuário poderá criar boards, convidar colaboradores via link, organizar cards em colunas customizáveis e acompanhar quem está online no board.

---

## User Stories

### Autenticação e Acesso
1. Como usuário autenticado, quero ser redirecionado para o dashboard após fazer login, para que eu possa acessar meus boards imediatamente.
2. Como usuário não autenticado, quero ser redirecionado para a landing page ao tentar acessar `/dashboard`, para que rotas protegidas sejam seguras.
3. Como usuário não autenticado, quero ser redirecionado para login ao acessar um link de convite, e após login retornar ao link, para que o fluxo de convite funcione sem fricção.

### Dashboard
4. Como usuário autenticado, quero ver uma lista de todos os boards dos quais sou membro (owner ou editor ou viewer), para que eu possa acessar meu trabalho rapidamente.
5. Como usuário autenticado, quero ver no card de cada board: nome, descrição, número de membros e data da última atividade, para que eu possa distinguir os boards sem abri-los.
6. Como usuário autenticado, quero criar um novo board informando nome e descrição opcional, para que eu possa iniciar um novo projeto.
7. Como owner de um board, quero deletar o board, para que eu possa remover projetos encerrados.
8. Como owner de um board, quero que ao criar um board eu seja automaticamente registrado como membro com role OWNER, para que eu tenha controle total desde o início.

### Board — Estrutura
9. Como membro de um board, quero visualizar todas as colunas do board em ordem, para que eu possa ver o estado do projeto.
10. Como editor de um board, quero criar uma nova coluna informando um título, para que eu possa adicionar uma nova etapa ao fluxo.
11. Como editor de um board, quero renomear uma coluna existente, para que eu possa corrigir ou atualizar o nome da etapa.
12. Como editor de um board, quero reordenar colunas via drag-and-drop, para que eu possa reorganizar o fluxo de trabalho.
13. Como editor de um board, quero deletar uma coluna vazia, para que eu possa remover etapas desnecessárias.

### Board — Cards
14. Como editor de um board, quero criar um card em uma coluna específica informando um título, para que eu possa adicionar uma nova tarefa.
15. Como editor de um board, quero editar o título e a descrição de um card, para que eu possa detalhar a tarefa.
16. Como editor de um board, quero mover um card entre colunas via drag-and-drop, para que eu possa atualizar o status da tarefa.
17. Como editor de um board, quero reordenar cards dentro de uma coluna via drag-and-drop, para que eu possa priorizar tarefas.
18. Como editor de um board, quero adicionar tags coloridas a um card, para que eu possa categorizar tarefas visualmente.
19. Como editor de um board, quero atribuir um responsável (assignee) a um card, para que fique claro quem é o dono da tarefa.
20. Como editor de um board, quero definir uma data de vencimento em um card, para que eu possa acompanhar prazos.
21. Como editor de um board, quero criar checklists em um card com itens marcáveis, para que eu possa detalhar sub-tarefas.
22. Como membro de um board, quero comentar em um card, para que eu possa discutir a tarefa com o time.
23. Como editor de um board, quero deletar um card, para que eu possa remover tarefas canceladas.
24. Como membro de um board, quero ver o histórico de movimentações de um card (de qual coluna veio, quando), para que eu possa rastrear o progresso.

### Board — Filtros
25. Como membro de um board, quero filtrar cards por tag, para que eu possa focar em um tipo de tarefa.
26. Como membro de um board, quero filtrar cards por assignee, para que eu possa ver somente as tarefas de uma pessoa.
27. Como membro de um board, quero filtrar cards por status de vencimento (atrasado, hoje, futuro), para que eu possa priorizar urgências.

### Realtime
28. Como membro de um board, quero ver cards adicionados por outros membros aparecerem instantaneamente sem reload, para que a colaboração seja fluida.
29. Como membro de um board, quero ver movimentações de cards feitas por outros membros em tempo real, para que o board esteja sempre sincronizado.
30. Como membro de um board, quero ver avatares dos membros que estão com o board aberto no momento, para que eu saiba quem está online.

### Convites
31. Como owner de um board, quero gerar um link de convite com expiração opcional (por data e/ou número de usos), para que eu possa convidar colaboradores de forma controlada.
32. Como owner de um board, quero ver uma fila de membros com status PENDING aguardando aprovação, para que eu possa controlar quem entra no board.
33. Como owner de um board, quero aprovar ou rejeitar um membro pendente, para que eu mantenha o controle de acesso.
34. Como usuário autenticado, quero acessar um link de convite válido e entrar em estado PENDING imediatamente, para que o owner saiba que quero participar.
35. Como usuário autenticado, quero ver uma mensagem clara ao acessar um link de convite expirado ou esgotado, para que eu entenda por que não posso entrar.
36. Como owner de um board, quero revogar um link de convite ativo, para que eu possa impedir novas entradas por aquele link.

---

## Implementation Decisions

### Schema (Prisma)

**Board**
- Campos: `id`, `name`, `description nullable`, `createdAt`, `updatedAt`
- `updatedAt` atualizado manualmente via helper `touchBoard(boardId, tx)` em toda Server Action que muta cards ou colunas — não depender do `@updatedAt` automático do Prisma para refletir atividade indireta.

**BoardMembership**
- Campos: `id`, `userId`, `boardId`, `role` (enum: OWNER | EDITOR | VIEWER), `status` (enum: PENDING | ACTIVE), `createdAt`
- Ao criar um board, o criador recebe automaticamente um registro com role OWNER e status ACTIVE na mesma transaction.

**InviteLink**
- Campos: `id`, `token` (único, gerado com `crypto.randomUUID()`), `boardId`, `createdBy`, `createdAt`, `expiresAt nullable`, `maxUses nullable`, `usedCount` (default 0), `revokedAt nullable`
- Validação: link é válido se `revokedAt` é null AND (`expiresAt` é null OR `expiresAt > now()`) AND (`maxUses` é null OR `usedCount < maxUses`).

**Column**
- Campos: `id`, `boardId`, `title`, `position` (Float), `createdAt`
- Reordenação via algoritmo de média: `newPosition = (positionBefore + positionAfter) / 2`. Renumeração completa (0, 1, 2…) quando a diferença entre posições adjacentes cair abaixo de `1e-9`.

**Card**
- Campos: `id`, `columnId`, `title`, `description nullable`, `position` (Float), `dueDate nullable`, `assigneeId nullable` (FK para User), `createdAt`, `updatedAt`
- Board acessado via `column.boardId` — sem `boardId` direto no Card (normalizado).
- Mesma lógica de posição Float da Column.

**CardTag**
- Campos: `id`, `cardId`, `label`, `color` (string hex)

**CardChecklist / ChecklistItem**
- `CardChecklist`: `id`, `cardId`, `title`
- `ChecklistItem`: `id`, `checklistId`, `text`, `completed` (Boolean, default false)

**CardComment**
- Campos: `id`, `cardId`, `userId`, `content`, `createdAt`

**CardAttachment**
- Campos: `id`, `cardId`, `userId`, `url`, `name`, `size`, `mimeType`, `createdAt`
- Schema criado agora; implementação de upload fora do escopo do MVP.

**CardHistory**
- Campos: `id`, `cardId`, `userId`, `type` (enum: CREATED | MOVED), `payload` (JSON — para MOVED: `{ fromColumnId, toColumnId }`), `createdAt`
- Registrado apenas para eventos CREATED e MOVED neste MVP.

### Módulos

**`lib/prisma.ts`** — singleton já existente; sem mudanças.

**`lib/board-position.ts`** — funções puras `computeInsertPosition(before, after)` e `shouldRenumber(positions[])`. Interface estável e facilmente testável em isolamento.

**`lib/touchBoard.ts`** — helper `touchBoard(boardId, tx)` que faz `board.update({ updatedAt: new Date() })` dentro de uma transaction Prisma existente.

**`lib/ably.ts`** — cliente Ably singleton para o servidor; função `publishBoardEvent(boardId, event)` com tipos discriminados para cada evento (card criado, movido, coluna criada, etc.).

**`lib/invite.ts`** — função pura `isInviteValid(invite)` que encapsula a lógica de validação do link (sem I/O).

**`actions/board.ts`** — Server Actions: `createBoard`, `deleteBoard`, `getBoards` (para o dashboard).

**`actions/column.ts`** — Server Actions: `createColumn`, `renameColumn`, `reorderColumn`, `deleteColumn`.

**`actions/card.ts`** — Server Actions: `createCard`, `updateCard`, `moveCard`, `deleteCard`. Cada mutação chama `touchBoard` e `publishBoardEvent`.

**`actions/invite.ts`** — Server Actions: `generateInviteLink`, `acceptInvite`, `approveInvite`, `rejectInvite`, `revokeInviteLink`.

**`actions/comment.ts`** — Server Action: `addComment`.

### Realtime (Ably)

- Cada board tem um canal Ably com nome `board:{boardId}`.
- Eventos publicados pelo servidor após cada mutação bem-sucedida; clientes escutam e atualizam o estado local via `useReducer`.
- Presença via Ably Presence API — ao montar o board, o cliente entra no canal de presença; ao desmontar, sai.
- Variável de ambiente `ABLY_API_KEY` no servidor; chave restrita (publish + presence) entregue ao cliente via Server Action ou API route.

### Autenticação e Autorização

- Toda Server Action valida a sessão no início com `auth()` do NextAuth — nunca confiar no cliente.
- Verificação de role: OWNER para deletar board/aprovar convites; EDITOR para criar/mover/deletar cards e colunas; qualquer ACTIVE member para comentar e visualizar.

---

## Testing Decisions

**O que faz um bom teste:** testa comportamento externo observável (o que a função retorna ou o que persiste no banco), não detalhes de implementação (quais funções internas foram chamadas).

**Módulos a testar (Vitest):**

- `lib/board-position.ts` — testes unitários puros para `computeInsertPosition` e `shouldRenumber`. Casos: inserir no início, no fim, no meio, múltiplas inserções consecutivas, detecção de necessidade de renumeração.
- `lib/invite.ts` — testes unitários puros para `isInviteValid`. Casos: link válido, expirado por data, esgotado por usos, revogado, todos os campos null (sem restrição).
- `actions/board.ts`, `actions/card.ts`, `actions/column.ts`, `actions/invite.ts` — testes de integração com banco de dados real (PostgreSQL de teste, não mocks). Casos: autenticação ausente retorna erro, role insuficiente retorna erro, mutação bem-sucedida persiste corretamente, `touchBoard` atualiza `updatedAt` do board.

**Módulos sem testes no MVP:**
- Componentes de UI — testar via Playwright nos fluxos e2e.
- `lib/ably.ts` — dependência externa; mockar o SDK Ably nos testes de integração das actions.

**Testes e2e (Playwright):**
- Fluxo de login com Google (mock OAuth).
- Criar board → ver no dashboard.
- Criar coluna → criar card → mover card entre colunas.
- Gerar link de convite → aceitar convite → owner aprovar.

---

## Out of Scope

- Upload de attachments (schema criado, mas UI e storage — Cloudflare R2 / S3 / Uploadthing — ficam para depois).
- Analytics (Burndown, Velocity, Cycle Time, Lead Time, CFD).
- Eventos de `CardHistory` além de CREATED e MOVED (UPDATED, COMMENTED ficam para depois).
- Notificações por e-mail (ex: convite aprovado, card atribuído).
- Tema claro / modo de acessibilidade.
- Internacionalização.
- Hospedagem / deploy (projeto de portfólio local por enquanto).

---

## Further Notes

- A biblioteca de drag-and-drop escolhida é `@dnd-kit/core` — compatível com React 19 e Next.js 15. `react-beautiful-dnd` foi descartada por estar em modo de manutenção com bugs conhecidos no React 18+.
- O algoritmo de posição Float (média entre vizinhos) é o mesmo usado pelo Linear. A renumeração só é necessária após muitas inserções no mesmo intervalo — raro na prática para boards com dezenas de cards.
- Sem toggle de tema claro/escuro. Design system: fundo `#171719`, texto `#FEFEFE`, accent `#9CFF01`.
- Fonte Manrope já configurada. Animações de UI com GSAP já instalado.
- Aplicação inteiramente em português do Brasil.
