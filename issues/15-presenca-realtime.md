# Presença em tempo real (avatares online)

## What to build

Exibir avatares dos membros que estão com o board aberto no momento usando a Ably Presence API. Ao montar o board, o cliente entra no canal de presença com seus dados (nome, avatar). Ao desmontar, sai. Os avatares aparecem no header do board.

## Acceptance criteria

- [ ] Header do board exibe avatares dos membros atualmente online
- [ ] Avatar do usuário atual é incluído na lista
- [ ] Ao abrir o board em outra aba/dispositivo, o novo avatar aparece para todos
- [ ] Ao fechar a aba, o avatar desaparece para os outros em até 30 segundos
- [ ] Máximo de N avatares exibidos (ex: 5), com indicador "+X" para excedentes
- [ ] Tooltip com nome do membro ao passar o mouse sobre o avatar

## Blocked by

- #14 (Integração Ably — realtime de cards e colunas)
