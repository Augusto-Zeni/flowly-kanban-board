import Image from 'next/image'

interface AvatarProps {
  src?: string | null
  name?: string | null
  size?: number
  className?: string
}

export function Avatar({ src, name, size = 24, className = '' }: AvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : '?'

  const style = {
    width: size,
    height: size,
    minWidth: size,
    fontSize: size * 0.4,
  }

  if (src) {
    return (
      <div
        className={`rounded-full overflow-hidden flex-shrink-0 ${className}`}
        style={style}
      >
        <Image
          src={src}
          alt={name ?? 'Avatar'}
          width={size}
          height={size}
          className="object-cover w-full h-full"
        />
      </div>
    )
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-medium flex-shrink-0 ${className}`}
      style={{
        ...style,
        background: 'var(--accent-yellow)',
        color: '#0f0f0f',
      }}
    >
      {initials}
    </div>
  )
}
