import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
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

export default function ParticleBackground({
  variant = 'stars'
}: {
  variant?: 'stars' | 'meteors' | 'mixed'
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
    ]

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    const createMeteor = () => {
      if (Math.random() > 0.995 && meteorsRef.current.length < 3) {
        meteorsRef.current.push({
          x: Math.random() * canvas.width * 1.5,
          y: -50,
          length: Math.random() * 60 + 30,
          speed: Math.random() * 6 + 4,
          opacity: 0.8,
          angle: Math.PI / 4,
        })
      }
    }

    initParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.opacity += (Math.random() - 0.5) * 0.05
        particle.opacity = Math.max(0.1, Math.min(1, particle.opacity))

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + particle.opacity + ')'
        ctx.fill()

        if (Math.random() > 0.97) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = particle.color + particle.opacity * 0.3 + ')'
          ctx.fill()
        }
      })

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
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
