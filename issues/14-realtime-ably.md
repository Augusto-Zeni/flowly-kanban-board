# Integração Ably — realtime de cards e colunas

## What to build

Implementar sincronização em tempo real do board via Ably. Após qualquer mutação bem-sucedida de card ou coluna, o servidor publica um evento no canal `board:{boardId}`. Clientes conectados recebem o evento e atualizam o estado local via `useReducer` sem reload.

Eventos a publicar: `card.created`, `card.updated`, `card.moved`, `card.deleted`, `column.created`, `column.renamed`, `column.reordered`, `column.deleted`.

A chave Ably restrita (subscribe + presence) é entregue ao cliente via Server Action ou API route. A chave de publicação fica apenas no servidor.

## Acceptance criteria

- [ ] Variável de ambiente `ABLY_API_KEY` configurada no servidor
- [ ] `lib/ably.ts` exporta `publishBoardEvent(boardId, event)` com tipos discriminados por evento
- [ ] Todos os eventos listados são publicados após mutação bem-sucedida
- [ ] Cliente se conecta ao canal `board:{boardId}` ao montar a página do board
- [ ] Cliente se desconecta ao desmontar a página
- [ ] Estado local atualizado via `useReducer` ao receber cada tipo de evento
- [ ] Usuário que faz a mutação NÃO vê o evento duplicado (atualização otimista já aplicada)
- [ ] Dois usuários com o board aberto simultaneamente veem as mudanças um do outro em tempo real

## Blocked by

- #6 (Drag-and-drop de cards)
- #7 (Drag-and-drop de colunas)
