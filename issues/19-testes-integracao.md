# Testes de integração das Server Actions

## What to build

Implementar testes de integração com Vitest para as Server Actions principais, usando um banco de dados PostgreSQL real (não mocks). O banco de teste é criado/destruído por suite via Docker ou variável de ambiente `DATABASE_URL_TEST`.

Um bom teste aqui: chama a Server Action diretamente, verifica o que foi persistido no banco e o valor retornado. Não testa implementação interna.

## Acceptance criteria

- [ ] Banco de dados de teste configurado (separado do banco de desenvolvimento)
- [ ] `createBoard`: retorna erro se não autenticado; cria board + membership OWNER/ACTIVE se autenticado
- [ ] `deleteBoard`: retorna erro se não autenticado; retorna erro se não OWNER; deleta board e cascata se OWNER
- [ ] `createCard`: retorna erro se não autenticado; retorna erro se VIEWER; cria card + CardHistory CREATED se EDITOR/OWNER
- [ ] `moveCard`: retorna erro se não EDITOR/OWNER; persiste nova columnId + position + CardHistory MOVED
- [ ] `moveCard`: `touchBoard` é verificado (updatedAt do board foi atualizado)
- [ ] `generateInviteLink`: retorna erro se não OWNER; cria link com token único
- [ ] `acceptInvite`: cria membership PENDING para link válido; retorna erro para link expirado/esgotado/revogado; não duplica membership existente
- [ ] `approveInvite`: retorna erro se não OWNER; muda status para ACTIVE
- [ ] Cada suite limpa os dados criados no teardown

## Blocked by

- #3 (Dashboard — listar, criar e deletar boards)
- #5 (Cards — criar, editar título/descrição, deletar)
- #6 (Drag-and-drop de cards)
- #16 (Sistema de convites — gerar link e aceitar)
- #17 (Sistema de convites — aprovar e rejeitar membros pendentes)
