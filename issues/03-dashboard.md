# Dashboard — listar, criar e deletar boards

## What to build

Implementar a rota `/dashboard` com a lista de boards do usuário autenticado e as ações de criar e deletar board.

A página lista todos os boards onde o usuário tem membership com status ACTIVE. Cada card de board exibe: nome, descrição, número de membros ativos e data da última atividade (`updatedAt`). Há um botão para criar novo board (modal com nome obrigatório e descrição opcional). Owner pode deletar o board (com confirmação). Ao criar um board, o criador recebe automaticamente um `BoardMembership` com role OWNER e status ACTIVE na mesma transaction. Usuário não autenticado é redirecionado para `/`.

## Acceptance criteria

- [ ] Rota `/dashboard` protegida — redireciona para `/` se não autenticado
- [ ] Lista todos os boards com membership ACTIVE do usuário
- [ ] Card de board exibe nome, descrição, contagem de membros e `updatedAt`
- [ ] Criar board: Server Action valida sessão + Zod, retorna `{ success, data }` ou `{ success, error }`
- [ ] Ao criar board, criador recebe BoardMembership OWNER/ACTIVE na mesma transaction
- [ ] Deletar board: disponível apenas para OWNER, com modal de confirmação
- [ ] Deletar board cascateia corretamente (colunas, cards, memberships)
- [ ] UI em português do Brasil, tema escuro (#171719 / #FEFEFE / #9CFF01)

## Blocked by

- #1 (Schema completo do Prisma)
