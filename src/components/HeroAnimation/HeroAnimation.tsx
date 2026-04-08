'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  opacitySpeed: number
}

interface GeometricShape {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  rotationSpeed: number
  type: 'triangle' | 'square' | 'hexagon' | 'circle'
  opacity: number
  opacitySpeed: number
  strokeOnly: boolean
}

interface GlowOrb {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
}

const PRIMARY = '#9CFF01'
const BACKGROUND = '#171719'
const WHITE = '#FEFEFE'

function hexToRgb(hex: string) {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    const px = x + size * Math.cos(angle)
    const py = y + size * Math.sin(angle)
    if (i === 0)
      ctx.moveTo(px, py)
    else
      ctx.lineTo(px, py)
  }
  ctx.closePath()
}

function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath()
  ctx.moveTo(x, y - size)
  ctx.lineTo(x + size * 0.866, y + size * 0.5)
  ctx.lineTo(x - size * 0.866, y + size * 0.5)
  ctx.closePath()
}

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const shapesRef = useRef<GeometricShape[]>([])
  const orbsRef = useRef<GlowOrb[]>([])
  const timeRef = useRef(0)
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
      init()
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    function init() {
      const w = canvas!.width
      const h = canvas!.height

      // Particles (small dots forming a field)
      particlesRef.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        opacitySpeed: (Math.random() - 0.5) * 0.005,
      }))

      // Geometric shapes
      const types: GeometricShape['type'][] = ['triangle', 'square', 'hexagon', 'circle']
      shapesRef.current = Array.from({ length: 18 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 40 + 10,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.18 + 0.04,
        opacitySpeed: (Math.random() - 0.5) * 0.003,
        strokeOnly: Math.random() > 0.4,
      }))

      // Glow orbs
      orbsRef.current = [
        { x: w * 0.15, y: h * 0.3, vx: 0.15, vy: 0.08, radius: 280, opacity: 0.07, color: PRIMARY },
        { x: w * 0.85, y: h * 0.6, vx: -0.12, vy: -0.07, radius: 320, opacity: 0.06, color: PRIMARY },
        { x: w * 0.5, y: h * 0.1, vx: 0.08, vy: 0.1, radius: 200, opacity: 0.04, color: WHITE },
        { x: w * 0.75, y: h * 0.85, vx: -0.1, vy: -0.05, radius: 180, opacity: 0.05, color: PRIMARY },
      ]
    }

    function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
      const gridSize = 80
      const cols = Math.ceil(w / gridSize) + 1
      const rows = Math.ceil(h / gridSize) + 1
      const offsetX = (t * 8) % gridSize
      const offsetY = (t * 5) % gridSize

      ctx.strokeStyle = `rgba(156, 255, 1, 0.03)`
      ctx.lineWidth = 1

      for (let i = 0; i < cols; i++) {
        const x = i * gridSize - offsetX
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let j = 0; j < rows; j++) {
        const y = j * gridSize - offsetY
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }

    function drawConnections(ctx: CanvasRenderingContext2D, particles: Particle[]) {
      const maxDist = 120
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08
            ctx.beginPath()
            ctx.strokeStyle = `rgba(156, 255, 1, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      const w = canvas!.width
      const h = canvas!.height
      timeRef.current += 0.003

      ctx!.clearRect(0, 0, w, h)

      // Background
      ctx!.fillStyle = BACKGROUND
      ctx!.fillRect(0, 0, w, h)

      // Moving grid
      drawGrid(ctx!, w, h, timeRef.current)

      // Glow orbs
      orbsRef.current.forEach((orb) => {
        orb.x += orb.vx
        orb.y += orb.vy
        if (orb.x < -orb.radius)
          orb.x = w + orb.radius
        if (orb.x > w + orb.radius)
          orb.x = -orb.radius
        if (orb.y < -orb.radius)
          orb.y = h + orb.radius
        if (orb.y > h + orb.radius)
          orb.y = -orb.radius

        const rgb = hexToRgb(orb.color)
        const grad = ctx!.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${orb.opacity})`)
        grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`)
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx!.fill()
      })

      // Parallax mouse influence on orbs
      orbsRef.current[0].x += (mouseRef.current.x * w * 0.02 - orbsRef.current[0].x * 0.001) * 0.01
      orbsRef.current[1].x += ((1 - mouseRef.current.x) * w * 0.02 - orbsRef.current[1].x * 0.001) * 0.01

      // Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.opacity += p.opacitySpeed
        if (p.opacity < 0.05 || p.opacity > 0.6)
          p.opacitySpeed *= -1
        if (p.x < 0)
          p.x = w
        if (p.x > w)
          p.x = 0
        if (p.y < 0)
          p.y = h
        if (p.y > h)
          p.y = 0

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(156, 255, 1, ${p.opacity})`
        ctx!.fill()
      })

      // Connections between particles
      drawConnections(ctx!, particlesRef.current)

      // Geometric shapes
      shapesRef.current.forEach((shape) => {
        shape.x += shape.vx
        shape.y += shape.vy
        shape.rotation += shape.rotationSpeed
        shape.opacity += shape.opacitySpeed
        if (shape.opacity < 0.02 || shape.opacity > 0.22)
          shape.opacitySpeed *= -1
        if (shape.x < -shape.size * 2)
          shape.x = w + shape.size * 2
        if (shape.x > w + shape.size * 2)
          shape.x = -shape.size * 2
        if (shape.y < -shape.size * 2)
          shape.y = h + shape.size * 2
        if (shape.y > h + shape.size * 2)
          shape.y = -shape.size * 2

        ctx!.save()
        ctx!.translate(shape.x, shape.y)
        ctx!.rotate(shape.rotation)
        ctx!.globalAlpha = shape.opacity

        const useGreen = Math.random() > 0.7 ? WHITE : PRIMARY
        if (shape.strokeOnly) {
          ctx!.strokeStyle = useGreen
          ctx!.lineWidth = 1
        }
        else {
          ctx!.fillStyle = useGreen
        }

        switch (shape.type) {
          case 'triangle':
            drawTriangle(ctx!, 0, 0, shape.size)
            break
          case 'square':
            ctx!.beginPath()
            ctx!.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
            ctx!.closePath()
            break
          case 'hexagon':
            drawHexagon(ctx!, 0, 0, shape.size)
            break
          case 'circle':
            ctx!.beginPath()
            ctx!.arc(0, 0, shape.size * 0.6, 0, Math.PI * 2)
            break
        }

        if (shape.strokeOnly)
          ctx!.stroke()
        else
          ctx!.fill()

        ctx!.restore()
        ctx!.globalAlpha = 1
      })

      // Pulsing accent ring at center
      const cx = w / 2 + (mouseRef.current.x - 0.5) * 60
      const cy = h / 2 + (mouseRef.current.y - 0.5) * 40
      const pulseRadius = 80 + Math.sin(timeRef.current * 2) * 20
      const pulseOpacity = 0.04 + Math.sin(timeRef.current * 2) * 0.02
      ctx!.beginPath()
      ctx!.arc(cx, cy, pulseRadius, 0, Math.PI * 2)
      ctx!.strokeStyle = `rgba(156, 255, 1, ${pulseOpacity})`
      ctx!.lineWidth = 1
      ctx!.stroke()

      const pulseRadius2 = 140 + Math.sin(timeRef.current * 1.5 + 1) * 30
      const pulseOpacity2 = 0.02 + Math.sin(timeRef.current * 1.5) * 0.01
      ctx!.beginPath()
      ctx!.arc(cx, cy, pulseRadius2, 0, Math.PI * 2)
      ctx!.strokeStyle = `rgba(156, 255, 1, ${pulseOpacity2})`
      ctx!.lineWidth = 1
      ctx!.stroke()

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
