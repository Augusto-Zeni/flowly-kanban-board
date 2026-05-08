# Schema completo do Prisma

## What to build

Implementar o schema Prisma completo com todas as entidades do domínio Flowly, rodar a migration inicial e gerar o cliente Prisma atualizado.

Entidades a adicionar: `Board`, `BoardMembership` (roles: OWNER | EDITOR | VIEWER; status: PENDING | ACTIVE), `InviteLink` (com `expiresAt nullable`, `maxUses nullable`, `usedCount`, `revokedAt nullable`), `Column` (position: Float), `Card` (position: Float, sem boardId — board acessado via `column.boardId`), `CardTag`, `CardChecklist`, `ChecklistItem`, `CardComment`, `CardAttachment`, `CardHistory` (type: CREATED | MOVED, payload JSON).

## Acceptance criteria

- [ ] Todas as entidades acima existem no schema com os campos corretos
- [ ] Migration gerada e aplicada com sucesso no banco local
- [ ] Cliente Prisma gerado sem erros (`prisma generate`)
- [ ] Enum `Role` (OWNER | EDITOR | VIEWER), `MemberStatus` (PENDING | ACTIVE), `HistoryType` (CREATED | MOVED) definidos no schema
- [ ] Relações e cascades corretos (ex: deletar Board cascateia Column, Card, etc.)
- [ ] `CardAttachment` presente no schema (sem implementação de upload)

## Blocked by

None — can start immediately.
