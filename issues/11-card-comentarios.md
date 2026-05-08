# Painel de card — tab de comentários

## What to build

Implementar a tab "Comments" do `<TaskDetailPanel />`. Qualquer membro ACTIVE pode comentar. Comentários são exibidos em ordem cronológica com avatar, nome e timestamp relativo. A contagem de comentários aparece no rodapé do `<TaskCard />` na coluna.

A tab exibe badge com a contagem total de comentários no header (ex: "Comments 3"). O input de novo comentário fica no rodapé do drawer com submit por botão (não por Enter).

## Acceptance criteria

- [ ] Tab "Comments" acessível no `<TaskDetailPanel />`
- [ ] Badge com contagem de comentários no título da tab (ex: "Comments 3")
- [ ] Comentários exibidos em ordem cronológica com `<Avatar />`, nome do autor e timestamp relativo ("há 2 horas")
- [ ] Qualquer membro ACTIVE pode adicionar comentário via input no rodapé do drawer
- [ ] Submit por botão (não por Enter)
- [ ] Autor do comentário pode deletá-lo
- [ ] OWNER pode deletar qualquer comentário
- [ ] Contagem de comentários atualizada no rodapé do `<TaskCard />` (ícone 💬 + número)
- [ ] Server Actions validam sessão e membership ACTIVE

## Blocked by

- #5 (Cards — criar, editar, deletar e painel de detalhe)
