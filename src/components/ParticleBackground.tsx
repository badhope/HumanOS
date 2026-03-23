import { useEffect, useRef } from 'react'

interface ParticleConfig {
  count: number
  size: { min: number; max: number }
  speed: { min: number; max: number }
  colors: string[]
  opacity: { min: number; max: number }
}

const defaultConfig: ParticleConfig = {
  count: 60,
  size: { min: 1, max: 4 },
  speed: { min: 0.2, max: 0.8 },
  colors: ['#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#10b981'],
  opacity: { min: 0.2, max: 0.6 },
}

interface ParticleBackgroundProps {
  config?: Partial<ParticleConfig>
}

export default function ParticleBackground({ config = {} }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    alpha: number
    targetAlpha: number
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mergedConfig = { ...defaultConfig, ...config }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const initParticles = () => {
      particlesRef.current = Array.from({ length: mergedConfig.count }, () => {
        const speed = mergedConfig.speed.min + Math.random() * (mergedConfig.speed.max - mergedConfig.speed.min)
        const angle = Math.random() * Math.PI * 2
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: mergedConfig.size.min + Math.random() * (mergedConfig.size.max - mergedConfig.size.min),
          color: mergedConfig.colors[Math.floor(Math.random() * mergedConfig.colors.length)],
          alpha: mergedConfig.opacity.min + Math.random() * (mergedConfig.opacity.max - mergedConfig.opacity.min),
          targetAlpha: mergedConfig.opacity.min + Math.random() * (mergedConfig.opacity.max - mergedConfig.opacity.min),
        }
      })
    }
    initParticles()

    let frameCount = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      frameCount++
      if (frameCount % 120 === 0) {
        particlesRef.current.forEach(p => {
          p.targetAlpha = mergedConfig.opacity.min + Math.random() * (mergedConfig.opacity.max - mergedConfig.opacity.min)
        })
      }

      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        p.alpha += (p.targetAlpha - p.alpha) * 0.02

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1

        particlesRef.current.forEach((p2) => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = (1 - dist / 150) * 0.1
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [config])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
