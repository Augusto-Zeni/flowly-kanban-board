'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useRef } from 'react'

interface MenuItemProps {
  id: string
  children: React.ReactNode
  href?: string
  isSelected?: boolean
}

export default function MenuItem({ id, children, href, isSelected = false }: MenuItemProps) {
  const menuText = typeof children === 'string' ? children : ''
  const defaultHref = href || `#${menuText.toLowerCase()}`

  const linkRef = useRef<HTMLAnchorElement>(null)
  const originalRef = useRef<HTMLSpanElement>(null)
  const duplicateRef = useRef<HTMLSpanElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const splitInstanceRef = useRef<SplitText | null>(null)
  const duplicateSplitInstanceRef = useRef<SplitText | null>(null)

  useGSAP(() => {
    if (!linkRef.current || !originalRef.current || !duplicateRef.current || !underlineRef.current)
      return

    const link = linkRef.current
    const original = originalRef.current
    const duplicate = duplicateRef.current
    const underline = underlineRef.current

    gsap.registerPlugin(SplitText)

    splitInstanceRef.current = new SplitText(original, {
      type: 'chars',
    })

    duplicateSplitInstanceRef.current = new SplitText(duplicate, {
      type: 'chars',
    })

    gsap.set(duplicateSplitInstanceRef.current.chars, {
      y: 15,
      opacity: 0,
    })

    gsap.set(underline, {
      scaleX: isSelected ? 1 : 0,
      transformOrigin: 'left',
    })

    const handleMouseEnter = () => {
      if (!splitInstanceRef.current || !duplicateSplitInstanceRef.current)
        return

      const tl = gsap.timeline()

      const originalChars = splitInstanceRef.current.chars
      const duplicateChars = duplicateSplitInstanceRef.current.chars

      if (!isSelected) {
        tl.to(underline, {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.5,
          ease: 'power2.out',
        }, 0)
      }

      // Anima os caracteres apenas se não estiver selecionado
      if (!isSelected) {
        originalChars.forEach((char, index) => {
          tl.to(char, {
            y: -15,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          }, index * 0.008)

          tl.fromTo(
            duplicateChars[index],
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
            },
            `<`,
          )
        })
      }
    }

    const handleMouseLeave = () => {
      if (!splitInstanceRef.current || !duplicateSplitInstanceRef.current)
        return

      const tl = gsap.timeline()

      const originalChars = splitInstanceRef.current.chars
      const duplicateChars = duplicateSplitInstanceRef.current.chars

      if (!isSelected) {
        tl.to(underline, {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.5,
          ease: 'power2.out',
        }, 0)
      }

      if (!isSelected) {
        originalChars.forEach((char, index) => {
          const duplicateChar = duplicateChars[index]

          tl.to(char, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          }, index * 0.008)

          tl.to(
            duplicateChar,
            {
              y: 15,
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            `<`,
          )
        })
      }
    }

    link.addEventListener('mouseenter', handleMouseEnter)
    link.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter)
      link.removeEventListener('mouseleave', handleMouseLeave)
      splitInstanceRef.current?.revert()
      duplicateSplitInstanceRef.current?.revert()
    }
  }, [isSelected])

  return (
    <li id={id} className="relative">
      <a
        key={id}
        ref={linkRef}
        href={defaultHref}
        className="inline-block relative overflow-hidden pb-1"
      >
        <span
          ref={originalRef}
          className="inline-block relative font-light"
        >
          {children}
        </span>
        <span
          ref={duplicateRef}
          aria-hidden="true"
          className="absolute top-0 left-0 pointer-events-none font-light"
        >
          {children}
        </span>
        <span
          ref={underlineRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full h-[1px] bg-primary pointer-events-none"
        />
      </a>
    </li>
  )
}
