interface TagBadgeProps {
  label: string
  color: string
  className?: string
}

export function TagBadge({ label, color, className = '' }: TagBadgeProps) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{
        background: `${color}40`,
        color,
        fontSize: '10px',
        padding: '2px 8px',
        borderRadius: '4px',
        fontWeight: 500,
        lineHeight: 1.6,
      }}
    >
      {label}
    </span>
  )
}
