import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react'

interface IntroPageProps {
  onEnter: () => void
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const [showContent, setShowContent] = useState(false)
  const [currentText, setCurrentText] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; alpha: number }>>([])

  const titles = [
    '探索真实的自我',
    '发现你的无限可能',
    '开启自我认知之旅',
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showContent) return

    const text = titles[currentText]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayedText === text) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false)
      setCurrentText((prev) => (prev + 1) % titles.length)
    } else {
      timeout = setTimeout(() => {
        if (isDeleting) {
          setDisplayedText(text.slice(0, displayedText.length - 1))
        } else {
          setDisplayedText(text.slice(0, displayedText.length + 1))
        }
      }, isDeleting ? 50 : 100)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, showContent, currentText])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#f97316']
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [showContent])

  const scrollToMain = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 bg-[#0f172a] flex flex-col items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-center px-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: 'spring' }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-violet-500 via-pink-500 to-orange-500 p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-3xl bg-[#0f172a] flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-gradient" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 min-h-[80px]"
            >
              <span className="text-white">{displayedText}</span>
              <span className="inline-block w-1 h-10 bg-violet-500 ml-2 animate-pulse" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/60 text-lg mb-12 max-w-md mx-auto"
            >
              通过科学的心理测评，深入了解你的人格特质、认知风格和价值观
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="group relative px-10 py-4 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-pink-500 to-violet-500 bg-[length:200%_100%] animate-shimmer" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-3 text-white font-semibold text-lg">
                进入系统
                <Sparkles className="w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={scrollToMain}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors flex flex-col items-center gap-1"
          >
            <span className="text-xs">向下滚动</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(15, 23, 42, 0.3) 100%)',
        }}
      />
    </motion.div>
  )
}
