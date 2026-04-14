import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, Atom, Network, Zap } from 'lucide-react'

interface ThemeTransitionOverlayProps {
  text?: string
  variant?: 'neural' | 'cosmic' | 'quantum' | 'aurora'
  duration?: number
}

const particleCount = 30

const colorSchemes = {
  neural: {
    primary: '#8b5cf6',
    secondary: '#ec4899',
    accent: '#06b6d4',
    bg: 'from-violet-950 via-gray-950 to-pink-950',
  },
  cosmic: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#a855f7',
    bg: 'from-indigo-950 via-slate-950 to-purple-950',
  },
  quantum: {
    primary: '#06b6d4',
    secondary: '#8b5cf6',
    accent: '#10b981',
    bg: 'from-cyan-950 via-gray-950 to-emerald-950',
  },
  aurora: {
    primary: '#ec4899',
    secondary: '#f59e0b',
    accent: '#8b5cf6',
    bg: 'from-pink-950 via-gray-950 to-amber-950',
  },
}

export function ThemeTransitionOverlay({
  text = '正在加载...',
  variant = 'neural',
}: ThemeTransitionOverlayProps) {
  const validVariant = ['neural', 'cosmic', 'quantum', 'aurora'].includes(variant)
    ? variant as keyof typeof colorSchemes
    : 'neural'
  const colors = colorSchemes[validVariant]
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % 4)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  }))

  const neuralNodes = [
    { x: 50, y: 40, size: 1 },
    { x: 35, y: 55, size: 0.8 },
    { x: 65, y: 55, size: 0.8 },
    { x: 30, y: 35, size: 0.6 },
    { x: 70, y: 35, size: 0.6 },
    { x: 45, y: 65, size: 0.7 },
    { x: 55, y: 65, size: 0.7 },
    { x: 50, y: 28, size: 0.5 },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: 'blur(20px)',
      }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(circle at 30% 30%, ${colors.primary}20 0%, transparent 50%)`,
            `radial-gradient(circle at 70% 70%, ${colors.secondary}20 0%, transparent 50%)`,
            `radial-gradient(circle at 50% 50%, ${colors.accent}15 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {neuralNodes.map((node, i) =>
          neuralNodes.slice(i + 1).map((node2, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${node2.x}%`}
              y2={`${node2.y}%`}
              stroke={colors.primary}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                delay: (i + j) * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              filter="url(#glow)"
            />
          ))
        )}
      </svg>

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: [colors.primary, colors.secondary, colors.accent][particle.id % 3],
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="relative mb-8"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="absolute -inset-8 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.primary}30 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="relative"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Brain
              className="w-20 h-20 relative z-10"
              style={{ color: colors.primary }}
            />
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Network
                className="w-20 h-20"
                style={{ color: colors.secondary, opacity: 0.5 }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Atom className="w-8 h-8" style={{ color: colors.accent }} />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 -left-3"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
          </motion.div>
        </motion.div>

        <div className="flex items-center gap-3 mb-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: i === phase ? colors.primary : colors.primary + '40',
                boxShadow: i === phase ? `0 0 20px ${colors.primary}` : 'none',
              }}
              animate={{
                scale: i === phase ? [1, 1.3, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.p
            className="text-xl font-semibold text-white/90"
            animate={{
              textShadow: [
                `0 0 10px ${colors.primary}00`,
                `0 0 20px ${colors.primary}80`,
                `0 0 10px ${colors.primary}00`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="inline w-5 h-5 mr-2" style={{ color: colors.secondary }} />
            {text}
          </motion.p>

          <div className="mt-4 w-64 mx-auto h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
              }}
              animate={{
                x: ['-100%', '0%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-sm text-white/40"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          HumanOS · 专业测评引擎启动中
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.primary}, ${colors.secondary}, ${colors.accent}, transparent)`,
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  )
}

export default ThemeTransitionOverlay
