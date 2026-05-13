import { auth } from '@flowly/auth'
import { getBoards } from '@flowly/actions/board'
import { redirect } from 'next/navigation'
import { BoardList } from './BoardList'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/')
  }

  const { data: boards = [] } = await getBoards()

  return <BoardList initialBoards={boards} />
}
