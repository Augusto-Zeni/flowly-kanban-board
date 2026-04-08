'use client'

import { useEffect, useRef } from 'react'

interface Blob {
  baseX: number
  baseY: number
  currentX: number
  currentY: number
  radius: number
  speedX: number
  speedY: number
}

const MOUSE_INFLUENCE = 0.055
const LERP_SPEED = 0.028

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef(0)
  const blobsRef = useRef<Blob[]>([])
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas)
      return
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initBlobs()
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    function initBlobs() {
      const w = canvas!.width
      const h = canvas!.height

      blobsRef.current = [
        {
          baseX: w * 0.15,
          baseY: h * 0.35,
          currentX: w * 0.15,
          currentY: h * 0.35,
          radius: w * 0.38,
          speedX: 0.00018,
          speedY: 0.00012,
        },
        {
          baseX: w * 0.82,
          baseY: h * 0.65,
          currentX: w * 0.82,
          currentY: h * 0.65,
          radius: w * 0.42,
          speedX: -0.00014,
          speedY: -0.0001,
        },
        {
          baseX: w * 0.5,
          baseY: h * 0.1,
          currentX: w * 0.5,
          currentY: h * 0.1,
          radius: w * 0.28,
          speedX: 0.0001,
          speedY: 0.00016,
        },
      ]
    }

    function animate() {
      const w = canvas!.width
      const h = canvas!.height
      timeRef.current += 1

      const mx = mouseRef.current.x * w
      const my = mouseRef.current.y * h

      ctx!.clearRect(0, 0, w, h)

      blobsRef.current.forEach((blob) => {
        blob.baseX += Math.sin(timeRef.current * blob.speedX * Math.PI) * 0.4
        blob.baseY += Math.cos(timeRef.current * blob.speedY * Math.PI) * 0.3

        const dx = mx - blob.baseX
        const dy = my - blob.baseY
        const targetX = blob.baseX + dx * MOUSE_INFLUENCE
        const targetY = blob.baseY + dy * MOUSE_INFLUENCE

        blob.currentX += (targetX - blob.currentX) * LERP_SPEED
        blob.currentY += (targetY - blob.currentY) * LERP_SPEED

        const grad = ctx!.createRadialGradient(
          blob.currentX,
          blob.currentY,
          0,
          blob.currentX,
          blob.currentY,
          blob.radius,
        )
        grad.addColorStop(0, 'rgba(156, 255, 1, 0.13)')
        grad.addColorStop(0.45, 'rgba(156, 255, 1, 0.045)')
        grad.addColorStop(1, 'rgba(156, 255, 1, 0)')

        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(blob.currentX, blob.currentY, blob.radius, 0, Math.PI * 2)
        ctx!.fill()
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    animate()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
