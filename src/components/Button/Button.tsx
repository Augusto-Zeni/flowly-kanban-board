import type { ReactNode } from 'react'
import gsap from 'gsap'
import { useCallback, useEffect, useRef } from 'react'

const ANIMATION_CONFIG = {
  SCALE_DIVISOR: 5,
  ENTER_DURATION: 0.7,
  LEAVE_MOVE_DURATION: 0.4,
  LEAVE_FADE_DURATION: 0.4,
  INITIAL_SCALE: 1,
  EXIT_SCALE: 0.5,
  CENTER_OFFSET: -50,
} as const

interface ButtonProps {
  id: string
  children: ReactNode
  variant?: 'primary'
  className?: string
  onClick?: () => void
}

export default function Button({
  id,
  children,
  variant = 'primary',
  className,
  onClick,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const flairRef = useRef<HTMLDivElement>(null)

  const getRelativeMousePosition = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current)
        return null

      const rect = buttonRef.current.getBoundingClientRect()
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    },
    [],
  )

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const position = getRelativeMousePosition(event)
      if (!flairRef.current || !buttonRef.current || !position)
        return

      const { x, y } = position

      gsap.killTweensOf(flairRef.current)

      gsap.set(flairRef.current, {
        opacity: 1,
        scale: ANIMATION_CONFIG.INITIAL_SCALE,
        left: x,
        top: y,
        xPercent: ANIMATION_CONFIG.CENTER_OFFSET,
        yPercent: ANIMATION_CONFIG.CENTER_OFFSET,
      })

      gsap.to(flairRef.current, {
        scale: buttonRef.current.clientWidth / ANIMATION_CONFIG.SCALE_DIVISOR,
        duration: ANIMATION_CONFIG.ENTER_DURATION,
        ease: 'power2.out',
      })
    },
    [getRelativeMousePosition],
  )

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const position = getRelativeMousePosition(event)

      if (!flairRef.current || !position)
        return

      const { x, y } = position

      gsap.killTweensOf(flairRef.current)

      const timeline = gsap.timeline()

      timeline.to(flairRef.current, {
        left: x,
        top: y,
        scale: ANIMATION_CONFIG.INITIAL_SCALE,
        duration: ANIMATION_CONFIG.LEAVE_MOVE_DURATION,
        ease: 'power2.inOut',
      })

      timeline.to(flairRef.current, {
        opacity: 0,
        scale: ANIMATION_CONFIG.EXIT_SCALE,
        duration: ANIMATION_CONFIG.LEAVE_FADE_DURATION,
        ease: 'power2.out',
      })
    },
    [getRelativeMousePosition],
  )

  // Cleanup GSAP animations on unmount
  useEffect(() => {
    const flairElement = flairRef.current

    return () => {
      if (flairElement) {
        gsap.killTweensOf(flairElement)
      }
    }
  }, [])

  const buttonClassName
    = variant === 'primary'
      ? `px-7 py-2 border-1 rounded-full border-primary font-medium cursor-pointer`
      : ''

  const flairClassName
    = variant === 'primary'
      ? 'absolute w-4 h-4 bg-primary opacity-0 rounded-full pointer-events-none'
      : ''

  return (
    <button
      id={id}
      ref={buttonRef}
      key={id}
      className={`group relative overflow-hidden ${className ?? ''} ${buttonClassName}`}
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={flairRef} className={`${flairClassName} z-0`} />
      <span className="relative z-10 text-primary group-hover:text-black-primary transition-colors">{children}</span>
    </button>
  )
}
