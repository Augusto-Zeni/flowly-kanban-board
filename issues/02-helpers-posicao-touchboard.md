# Helpers de posição Float + touchBoard

## What to build

Implementar dois módulos utilitários puros usados por todas as Server Actions de reordenação:

1. `lib/board-position.ts` — funções `computeInsertPosition(before, after)` (retorna a média entre dois valores Float; se `before` é null, retorna `after - 1`; se `after` é null, retorna `before + 1`) e `shouldRenumber(positions[])` (retorna true se alguma diferença entre posições adjacentes ordenadas for menor que `1e-9`).

2. `lib/touchBoard.ts` — helper `touchBoard(boardId, tx)` que executa `board.update({ data: { updatedAt: new Date() }, where: { id: boardId } })` dentro de uma transaction Prisma recebida como parâmetro.

## Acceptance criteria

- [x] `computeInsertPosition(null, 1000)` retorna `999`
- [x] `computeInsertPosition(1000, null)` retorna `1001`
- [x] `computeInsertPosition(1000, 2000)` retorna `1500`
- [x] `shouldRenumber` retorna `true` quando diferença entre adjacentes < `1e-9`
- [x] `touchBoard` atualiza `updatedAt` do board dentro da transaction recebida
- [x] Testes unitários para `computeInsertPosition` e `shouldRenumber` passando

## Blocked by

- #1 (Schema completo do Prisma)
