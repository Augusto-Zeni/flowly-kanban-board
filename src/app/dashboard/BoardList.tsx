'use client'

import { createBoard, deleteBoard } from '@flowly/actions/board'
import { LayoutDashboard, Plus, Trash2, Users, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

interface Board {
  id: string
  name: string
  description: string | null
  updatedAt: Date
  role: string
  memberCount: number
}

interface BoardListProps {
  initialBoards: Board[]
}

export function BoardList({ initialBoards }: BoardListProps) {
  const router = useRouter()
  const [boards, setBoards] = useState<Board[]>(initialBoards)
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleCreate() {
    if (!name.trim()) {
      setError('Nome é obrigatório')
      return
    }
    setError('')

    startTransition(async () => {
      const result = await createBoard({ name: name.trim(), description: description.trim() || undefined })
      if (result.success && result.data) {
        setBoards(prev => [
          {
            id: result.data!.id,
            name: result.data!.name,
            description: result.data!.description,
            updatedAt: result.data!.updatedAt,
            role: 'OWNER',
            memberCount: 1,
          },
          ...prev,
        ])
        setName('')
        setDescription('')
        setShowCreate(false)
        router.refresh()
      }
      else {
        setError(result.error ?? 'Erro ao criar board')
      }
    })
  }

  function handleDeleteConfirm(boardId: string) {
    setDeletingId(boardId)
    startTransition(async () => {
      const result = await deleteBoard(boardId)
      setDeletingId(null)
      setConfirmDeleteId(null)
      if (result.success) {
        setBoards(prev => prev.filter(b => b.id !== boardId))
        router.refresh()
      }
    })
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))
  }

  return (
    <div style={{ padding: '32px 40px', maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <LayoutDashboard size={20} style={{ color: 'var(--accent-yellow)' }} />
            <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Meus Boards
            </h1>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {boards.length === 0 ? 'Nenhum board ainda' : `${boards.length} board${boards.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreate(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--accent-yellow)',
            color: 'var(--bg-base)',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.85')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
        >
          <Plus size={16} />
          Novo Board
        </button>
      </div>

      {/* Create Board Modal */}
      {showCreate && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCreate(false)
          }}
        >
          <div
            style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: 10,
              padding: 28,
              width: '100%',
              maxWidth: 440,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 20 }}>
              Criar novo board
            </h2>

            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Nome *
              </span>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                placeholder="Ex: Projeto Alpha"
                autoFocus
                style={{
                  width: '100%',
                  background: 'var(--bg-column)',
                  border: `1px solid ${error ? 'var(--priority-high)' : 'var(--border-color)'}`,
                  borderRadius: 6,
                  padding: '8px 12px',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {error && (
                <span style={{ fontSize: 11, color: 'var(--priority-high)', marginTop: 4, display: 'block' }}>
                  {error}
                </span>
              )}
            </label>

            <label style={{ display: 'block', marginBottom: 24 }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Descrição (opcional)
              </span>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Descreva brevemente o projeto..."
                rows={3}
                style={{
                  width: '100%',
                  background: 'var(--bg-column)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  padding: '8px 12px',
                  fontSize: 13,
                  color: 'var(--text-primary)',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </label>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => { setShowCreate(false); setError(''); setName(''); setDescription('') }}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  padding: '7px 16px',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={isPending}
                style={{
                  background: 'var(--accent-yellow)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '7px 20px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--bg-base)',
                  cursor: 'pointer',
                  opacity: isPending ? 0.7 : 1,
                }}
              >
                {isPending ? 'Criando...' : 'Criar Board'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDeleteId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: 10,
              padding: 28,
              width: '100%',
              maxWidth: 400,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
              Deletar board?
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
              Essa ação é permanente. Todas as colunas, cards e membros serão removidos.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  padding: '7px 16px',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDeleteConfirm(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                style={{
                  background: 'var(--priority-high)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '7px 20px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#fff',
                  cursor: 'pointer',
                  opacity: deletingId === confirmDeleteId ? 0.7 : 1,
                }}
              >
                {deletingId === confirmDeleteId ? 'Deletando...' : 'Deletar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Board Cards Grid */}
      {boards.length === 0
        ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 20px',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: 'var(--bg-column)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LayoutDashboard size={24} style={{ color: 'var(--text-muted)' }} />
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center' }}>
                Nenhum board ainda.
                <br />
                Crie seu primeiro board para começar.
              </p>
              <button
                type="button"
                onClick={() => setShowCreate(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--accent-yellow)',
                  color: 'var(--bg-base)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 18px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus size={15} />
                Criar Board
              </button>
            </div>
          )
        : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}
            >
              {boards.map(board => (
                <BoardCard
                  key={board.id}
                  board={board}
                  onDelete={() => setConfirmDeleteId(board.id)}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
    </div>
  )
}

interface BoardCardProps {
  board: Board
  onDelete: () => void
  formatDate: (date: Date) => string
}

function BoardCard({ board, onDelete, formatDate }: BoardCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border-color)'}`,
        borderRadius: 10,
        padding: 20,
        position: 'relative',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: hovered ? '0 0 0 1px rgba(156,255,1,0.16)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Board accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--accent-yellow)',
          borderRadius: '10px 10px 0 0',
          opacity: 0.6,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <Link
          href={`/board/${board.id}`}
          style={{ textDecoration: 'none', flex: 1 }}
        >
          <h3
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              marginBottom: 4,
              lineHeight: 1.4,
            }}
          >
            {board.name}
          </h3>
        </Link>

        {board.role === 'OWNER' && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onDelete() }}
            title="Deletar board"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '2px 4px',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
              flexShrink: 0,
              marginLeft: 8,
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--priority-high)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {board.description && (
        <p
          style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: 16,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {board.description}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: board.description ? 0 : 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)', fontSize: 11 }}>
          <Users size={12} />
          <span>
            {board.memberCount}
            {' '}
            membro
            {board.memberCount !== 1 ? 's' : ''}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-muted)', fontSize: 11 }}>
          <Calendar size={12} />
          <span>{formatDate(board.updatedAt)}</span>
        </div>
      </div>

      {board.role === 'OWNER' && (
        <span
          style={{
            position: 'absolute',
            bottom: 14,
            right: 16,
            fontSize: 9,
            background: 'rgba(156,255,1,0.12)',
            color: 'var(--accent-yellow)',
            padding: '2px 6px',
            borderRadius: 3,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Owner
        </span>
      )}
    </div>
  )
}
