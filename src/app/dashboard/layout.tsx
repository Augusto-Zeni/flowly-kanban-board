import { auth } from '@flowly/auth'
import { getBoards } from '@flowly/actions/board'
import { Sidebar } from '@flowly/components/Sidebar/Sidebar'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) {
    redirect('/')
  }

  const { data: boards = [] } = await getBoards()

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-base)', overflow: 'hidden' }}>
      <Sidebar
        user={{
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        }}
        boards={boards.map(b => ({ id: b.id, name: b.name }))}
      />
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-base)' }}>
        {children}
      </main>
    </div>
  )
}
