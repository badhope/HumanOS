import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  logoVariants,
  introTextVariants,
  bootSequenceVariants,
  bootScreenTiming,
  staggerContainer,
  staggerItem,
} from '@utils/animation-config'

interface SplashScreenProps {
  onComplete: () => void
  minDuration?: number
}

const bootMessages = [
  { text: '初始化系统...', delay: 0 },
  { text: '加载测评引擎...', delay: 0.5 },
  { text: '准备心理分析模块...', delay: 1 },
  { text: '连接数据库...', delay: 1.5 },
  { text: '系统就绪', delay: 2 },
]

export default function SplashScreen({ onComplete, minDuration = 3000 }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'boot' | 'ready'>('logo')
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setPhase('boot')
    }, bootScreenTiming.logoDelay * 1000 + bootScreenTiming.logoDuration * 1000)

    return () => clearTimeout(logoTimer)
  }, [])

  useEffect(() => {
    if (phase !== 'boot') return

    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < bootMessages.length - 1) return prev + 1
        return prev
      })
    }, 500)

    const readyTimer = setTimeout(() => {
      setPhase('ready')
      setTimeout(onComplete, 500)
    }, minDuration)

    return () => {
      clearInterval(interval)
      clearTimeout(readyTimer)
    }
  }, [phase, minDuration, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
            bottom: '20%',
            right: '10%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {phase === 'logo' && (
          <motion.div
            key="logo"
            className="relative z-10 flex flex-col items-center text-center"
            variants={staggerContainer}
            initial="initial"
            animate="enter"
          >
            <motion.div
              variants={logoVariants}
              className="relative"
            >
              <motion.div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16">
                  <path
                    d="M25 80 Q25 30 50 30 L55 20 L60 30 Q75 30 75 80 L60 80 Q60 50 55 50 L50 55 L45 50 Q40 50 40 80 Z"
                    fill="none"
                    stroke="url(#goldGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4af37" />
                      <stop offset="50%" stopColor="#f5e6c8" />
                      <stop offset="100%" stopColor="#d4af37" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
              <motion.div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-xl"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-6 sm:mt-8 text-center px-4"
            >
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                variants={introTextVariants}
              >
                心镜 MindMirror
              </motion.h1>
              <motion.p
                className="mt-2 text-white/50 text-xs sm:text-sm"
                variants={introTextVariants}
              >
                轻松探索，遇见真实的自己
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {phase === 'boot' && (
          <motion.div
            key="boot"
            className="relative z-10 w-full max-w-xs sm:max-w-md px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6 sm:mb-8 text-center">
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8">
                  <path
                    d="M25 80 Q25 30 50 30 L55 20 L60 30 Q75 30 75 80 L60 80 Q60 50 55 50 L50 55 L45 50 Q40 50 40 80 Z"
                    fill="none"
                    stroke="url(#goldGradient2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4af37" />
                      <stop offset="50%" stopColor="#f5e6c8" />
                      <stop offset="100%" stopColor="#d4af37" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <AnimatePresence mode="wait">
                {bootMessages.slice(0, currentMessage + 1).map((msg, index) => (
                  <motion.div
                    key={msg.text}
                    custom={index}
                    variants={bootSequenceVariants}
                    initial="initial"
                    animate="enter"
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                    <span className="text-xs sm:text-sm text-white/80 font-mono truncate">{msg.text}</span>
                    {index === currentMessage && (
                      <motion.span
                        className="text-white/60 flex-shrink-0"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        _
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {phase === 'ready' && (
          <motion.div
            key="ready"
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-base sm:text-lg md:text-xl font-bold text-white"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              正在进入...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-[10px] sm:text-xs text-white/30">© 2024 心镜 MindMirror. 照见自己，成为更好的自己。</p>
      </motion.div>
    </motion.div>
  )
}
