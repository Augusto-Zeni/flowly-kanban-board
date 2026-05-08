# Sistema de convites — gerar link e aceitar

## What to build

Implementar a geração de links de convite pelo owner e o fluxo de aceitação pelo convidado.

O owner gera um link com token único (`crypto.randomUUID()`), configurando opcionalmente `expiresAt` e `maxUses`. O link gerado aponta para `/invite/[token]`. Ao acessar o link, o usuário autenticado é registrado como `BoardMembership` com status PENDING e `usedCount` é incrementado. Usuário não autenticado é redirecionado para login e volta ao link após autenticação. Link inválido (expirado, esgotado, revogado) exibe mensagem clara.

## Acceptance criteria

- [ ] Owner pode gerar link de convite com `expiresAt` e `maxUses` opcionais
- [ ] Link gerado é copiável para a área de transferência
- [ ] Owner pode revogar um link ativo (`revokedAt` setado)
- [ ] Rota `/invite/[token]` acessível publicamente
- [ ] Usuário não autenticado é redirecionado para login e retorna ao link após autenticação
- [ ] Ao acessar link válido: cria `BoardMembership` PENDING e incrementa `usedCount`
- [ ] Usuário já membro (ACTIVE ou PENDING) vê mensagem adequada sem criar registro duplicado
- [ ] Link expirado por data exibe mensagem "Este link expirou"
- [ ] Link esgotado por usos exibe mensagem "Este link atingiu o limite de usos"
- [ ] Link revogado exibe mensagem "Este link foi desativado"
- [ ] `lib/invite.ts` com função pura `isInviteValid(invite)` usada na validação

## Blocked by

- #1 (Schema completo do Prisma)
