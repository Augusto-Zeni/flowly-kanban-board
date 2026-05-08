# Sistema de convites — aprovar e rejeitar membros pendentes

## What to build

Implementar a interface do owner para gerenciar membros com status PENDING. O owner vê a fila de aprovação no board (ou em um painel de configurações do board) e pode aprovar ou rejeitar cada membro.

Aprovar muda o status para ACTIVE. Rejeitar deleta o registro de `BoardMembership`. O membro aprovado passa a ter acesso ao board com role EDITOR por padrão.

## Acceptance criteria

- [ ] Owner vê lista de membros PENDING com nome e avatar
- [ ] Owner pode aprovar um membro pendente (status muda para ACTIVE, role padrão EDITOR)
- [ ] Owner pode rejeitar um membro pendente (registro deletado)
- [ ] Membros PENDING não têm acesso ao board (rota `/board/[id]` redireciona com mensagem)
- [ ] Após aprovação, membro aprovado pode acessar o board sem nova ação
- [ ] Server Actions validam que apenas OWNER pode aprovar/rejeitar
- [ ] Interface de aprovação acessível no board sem reload de página

## Blocked by

- #16 (Sistema de convites — gerar link e aceitar)
