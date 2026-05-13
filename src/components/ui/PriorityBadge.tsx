type Priority = 'high' | 'medium' | 'low'

interface PriorityBadgeProps {
  priority: Priority
  className?: string
}

const priorityConfig: Record<Priority, { label: string; color: string }> = {
  high: { label: 'Alta', color: 'var(--priority-high)' },
  medium: { label: 'Média', color: 'var(--priority-medium)' },
  low: { label: 'Baixa', color: 'var(--priority-low)' },
}

export function PriorityBadge({ priority, className = '' }: PriorityBadgeProps) {
  const { label, color } = priorityConfig[priority]

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      style={{
        background: `${color}26`,
        color,
        fontSize: '10px',
        padding: '2px 8px',
        borderRadius: '4px',
        fontWeight: 500,
        lineHeight: 1.6,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: color,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  )
}
