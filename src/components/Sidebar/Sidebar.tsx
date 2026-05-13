'use client'

import { Avatar } from '@flowly/components/ui/Avatar'
import {
  Bell,
  ChevronLeft,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Timer,
  Briefcase,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import logo from '../../../public/logo.svg'

interface Board {
  id: string
  name: string
}

interface SidebarProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  boards: Board[]
  currentBoardId?: string
  notificationCount?: number
}

const generalItems = [
  { icon: Timer, label: 'Meu Tempo', href: '/dashboard/time' },
  { icon: Briefcase, label: 'Meu Trabalho', href: '/dashboard/work' },
  { icon: LayoutDashboard, label: 'Boards', href: '/dashboard' },
]

export function Sidebar({ user, boards, currentBoardId, notificationCount = 0 }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setCollapsed(true)
      }
      else {
        setCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <aside
      style={{
        width: collapsed ? 56 : 220,
        minWidth: collapsed ? 56 : 220,
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        transition: 'width 0.2s ease, min-width 0.2s ease',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '20px 0' : '20px 16px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 8,
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Image src={logo} alt="Flowly Logo" width={28} height={28} />
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--accent-yellow)',
                letterSpacing: '-0.02em',
              }}
            >
              Flowly
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            borderRadius: 4,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
          title={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          <ChevronLeft
            size={16}
            style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          />
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: collapsed ? '12px 0' : '12px 12px', borderBottom: '1px solid var(--border-color)' }}>
        {collapsed
          ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  padding: '6px 0',
                }}
              >
                <Search size={16} />
              </div>
            )
          : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--bg-column)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  padding: '6px 10px',
                }}
              >
                <Search size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-muted)', fontSize: 12, flex: 1 }}>Buscar</span>
                <span
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 10,
                    background: 'rgba(254,254,254,0.06)',
                    padding: '1px 5px',
                    borderRadius: 3,
                  }}
                >
                  ⌘K
                </span>
              </div>
            )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: collapsed ? '8px 0' : '8px 8px' }}>
        {/* GENERAL section */}
        {!collapsed && (
          <SectionLabel>Geral</SectionLabel>
        )}
        {generalItems.map(item => {
          const isActive = pathname === item.href
          return (
            <NavItem
              key={item.href}
              href={item.href}
              icon={<item.icon size={16} />}
              label={item.label}
              isActive={isActive}
              collapsed={collapsed}
            />
          )
        })}
        <NavItem
          href="/dashboard/notifications"
          icon={<Bell size={16} />}
          label="Notificações"
          isActive={pathname === '/dashboard/notifications'}
          collapsed={collapsed}
          badge={notificationCount > 0 ? notificationCount : undefined}
        />

        {/* PROJECTS section */}
        {!collapsed && boards.length > 0 && (
          <SectionLabel className="mt-4">Projetos</SectionLabel>
        )}
        {boards.map(board => {
          const isActive = currentBoardId === board.id || pathname === `/board/${board.id}`
          return (
            <NavItem
              key={board.id}
              href={`/board/${board.id}`}
              icon={(
                <span
                  style={{
                    width: 16,
                    height: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3,
                    background: isActive ? 'var(--accent-yellow)' : 'var(--text-muted)',
                    fontSize: 9,
                    fontWeight: 700,
                    color: 'var(--bg-base)',
                    flexShrink: 0,
                  }}
                >
                  {board.name[0].toUpperCase()}
                </span>
              )}
              label={board.name}
              isActive={isActive}
              collapsed={collapsed}
            />
          )
        })}

        {/* OTHER section */}
        {!collapsed && (
          <SectionLabel className="mt-4">Outro</SectionLabel>
        )}
        <NavItem
          href="/dashboard/settings"
          icon={<Settings size={16} />}
          label="Configurações"
          isActive={pathname === '/dashboard/settings'}
          collapsed={collapsed}
        />
        <NavItem
          href="/dashboard/help"
          icon={<HelpCircle size={16} />}
          label="Central de Ajuda"
          isActive={pathname === '/dashboard/help'}
          collapsed={collapsed}
        />
      </nav>

      {/* User footer */}
      <UserFooter user={user} collapsed={collapsed} />
    </aside>
  )
}

interface UserFooterProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  collapsed: boolean
}

function UserFooter({ user, collapsed }: UserFooterProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: collapsed ? '12px 0' : '12px 12px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        justifyContent: collapsed ? 'center' : 'flex-start',
        position: 'relative',
        cursor: 'default',
      }}
    >
      <Avatar src={user.image} name={user.name} size={28} />
      {!collapsed && (
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user.name}
          </p>
          <p
            style={{
              fontSize: 11,
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user.email}
          </p>
        </div>
      )}
      {hovered && (
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          title="Sair"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? 0 : 6,
            background: 'rgba(255,80,80,0.08)',
            border: '1px solid rgba(255,80,80,0.18)',
            borderRadius: 6,
            color: '#ff5050',
            fontSize: 11,
            fontWeight: 500,
            padding: collapsed ? '5px 6px' : '5px 10px',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,80,80,0.16)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,80,80,0.08)')}
        >
          <LogOut size={13} />
          {!collapsed && <span>Sair</span>}
        </button>
      )}
    </div>
  )
}

function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={className}
      style={{
        fontSize: 10,
        color: 'var(--text-secondary)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '4px 8px',
        marginBottom: 2,
      }}
    >
      {children}
    </p>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  collapsed: boolean
  badge?: number
}

function NavItem({ href, icon, label, isActive, collapsed, badge }: NavItemProps) {
  const [hovered, setHovered] = useState(false)

  const bgColor = isActive ? 'rgba(156,255,1,0.06)' : hovered ? 'rgba(156,255,1,0.03)' : 'transparent'
  const textColor = isActive ? 'var(--accent-yellow)' : hovered ? 'var(--text-primary)' : 'var(--text-secondary)'

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: collapsed ? '8px 0' : '7px 8px',
        borderRadius: 6,
        background: bgColor,
        color: textColor,
        fontSize: 13,
        fontWeight: isActive ? 500 : 400,
        transition: 'background 0.15s, color 0.15s',
        textDecoration: 'none',
        justifyContent: collapsed ? 'center' : 'flex-start',
        position: 'relative',
        marginBottom: 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{icon}</span>
      {!collapsed && (
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      )}
      {!collapsed && badge !== undefined && (
        <span
          style={{
            background: 'var(--priority-high)',
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            borderRadius: '50%',
            width: 16,
            height: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </Link>
  )
}
