import type { Prisma } from '@flowly/generated/prisma/client'

export async function touchBoard(boardId: string, tx: Prisma.TransactionClient): Promise<void> {
  await tx.board.update({
    where: { id: boardId },
    data: { updatedAt: new Date() },
  })
}
