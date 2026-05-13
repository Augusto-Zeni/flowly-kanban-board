'use server'

import { auth } from '@flowly/auth'
import { prisma } from '@flowly/lib/prisma'
import { z } from 'zod'

const createBoardSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100),
  description: z.string().max(500).optional(),
})

export async function createBoard(input: { name: string; description?: string }) {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: 'Não autenticado' }
  }

  const parsed = createBoardSchema.safeParse(input)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return { success: false, error: firstError?.message ?? 'Dados inválidos' }
  }

  const { name, description } = parsed.data

  try {
    const board = await prisma.$transaction(async (tx) => {
      const newBoard = await tx.board.create({
        data: { name, description },
      })

      await tx.boardMembership.create({
        data: {
          userId: session.user!.id!,
          boardId: newBoard.id,
          role: 'OWNER',
          status: 'ACTIVE',
        },
      })

      return newBoard
    })

    return { success: true, data: board }
  }
  catch {
    return { success: false, error: 'Erro ao criar board' }
  }
}

export async function deleteBoard(boardId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: 'Não autenticado' }
  }

  const membership = await prisma.boardMembership.findUnique({
    where: { userId_boardId: { userId: session.user.id, boardId } },
  })

  if (!membership || membership.role !== 'OWNER') {
    return { success: false, error: 'Sem permissão para deletar este board' }
  }

  try {
    await prisma.board.delete({ where: { id: boardId } })
    return { success: true }
  }
  catch {
    return { success: false, error: 'Erro ao deletar board' }
  }
}

export async function getBoards() {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: 'Não autenticado', data: [] }
  }

  try {
    const memberships = await prisma.boardMembership.findMany({
      where: {
        userId: session.user.id,
        status: 'ACTIVE',
      },
      include: {
        board: {
          include: {
            _count: {
              select: { memberships: { where: { status: 'ACTIVE' } } },
            },
          },
        },
      },
      orderBy: { board: { updatedAt: 'desc' } },
    })

    const boards = memberships.map(m => ({
      ...m.board,
      role: m.role,
      memberCount: m.board._count.memberships,
    }))

    return { success: true, data: boards }
  }
  catch {
    return { success: false, error: 'Erro ao buscar boards', data: [] }
  }
}
