import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  targetOpacity: number
  color: string
}

interface Meteor {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  angle: number
}

interface Connection {
  particle1: Particle
  particle2: Particle
  opacity: number
}

export default function ParticleBackground({
  variant = 'stars',
  particleCount = 100,
  showConnections = true
}: {
  variant?: 'stars' | 'meteors' | 'mixed'
  particleCount?: number
  showConnections?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const meteorsRef = useRef<Meteor[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const colors = [
      'rgba(251, 191, 36, ',
      'rgba(139, 92, 246, ',
      'rgba(236, 72, 153, ',
      'rgba(59, 130, 246, ',
      'rgba(255, 255, 255, ',
      'rgba(167, 139, 250, ',
      'rgba(34, 211, 238, ',
    ]

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const baseOpacity = Math.random() * 0.5 + 0.2
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: baseOpacity,
          targetOpacity: baseOpacity,
          color,
        }
      })
    }

    const createMeteor = () => {
      if (Math.random() > 0.99 && meteorsRef.current.length < 2) {
        meteorsRef.current.push({
          x: Math.random() * canvas.width * 1.5,
          y: -50,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 5,
          opacity: 0.8,
          angle: Math.PI / 4,
        })
      }
    }

    const drawConnections = () => {
      if (!showConnections) return
      
      const maxDistance = 150
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15 * Math.min(p1.opacity, p2.opacity)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    initParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (Math.random() > 0.95) {
          particle.targetOpacity = Math.random() * 0.4 + 0.2
        }
        particle.opacity += (particle.targetOpacity - particle.opacity) * 0.02

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + particle.opacity + ')'
        ctx.fill()

        if (Math.random() > 0.98) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
          ctx.fillStyle = particle.color + particle.opacity * 0.2 + ')'
          ctx.fill()
        }

        if (Math.random() > 0.999) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.5})`
          ctx.fill()
        }
      })

      if (showConnections) {
        drawConnections()
      }

      if (variant === 'meteors' || variant === 'mixed') {
        createMeteor()

        meteorsRef.current = meteorsRef.current.filter(meteor => {
          meteor.x += Math.cos(meteor.angle) * meteor.speed
          meteor.y += Math.sin(meteor.angle) * meteor.speed

          const gradient = ctx.createLinearGradient(
            meteor.x, meteor.y,
            meteor.x - Math.cos(meteor.angle) * meteor.length,
            meteor.y - Math.sin(meteor.angle) * meteor.length
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`)
          gradient.addColorStop(0.5, `rgba(251, 191, 36, ${meteor.opacity * 0.5})`)
          gradient.addColorStop(1, 'rgba(251, 191, 36, 0)')

          ctx.beginPath()
          ctx.moveTo(meteor.x, meteor.y)
          ctx.lineTo(
            meteor.x - Math.cos(meteor.angle) * meteor.length,
            meteor.y - Math.sin(meteor.angle) * meteor.length
          )
          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.stroke()

          ctx.beginPath()
          ctx.arc(meteor.x, meteor.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`
          ctx.fill()

          return meteor.y < canvas.height + 100 && meteor.opacity > 0
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [variant, particleCount, showConnections])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}