import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  logoVariants,
  introTextVariants,
  staggerContainer,
  staggerItem,
  fadeVariants,
} from '@utils/animation-config'

interface SplashScreenProps {
  onComplete: () => void
  minDuration?: number
}

const bootMessages = [
  { text: '正在启动系统...', delay: 0 },
  { text: '初始化核心模块...', delay: 0.6 },
  { text: '加载测评引擎...', delay: 1.2 },
  { text: '准备心理分析模块...', delay: 1.8 },
  { text: '连接数据服务...', delay: 2.4 },
  { text: '校准分析算法...', delay: 3.0 },
  { text: '加载用户配置...', delay: 3.6 },
  { text: '准备就绪', delay: 4.2 },
]

export default function SplashScreen({ onComplete, minDuration = 5000 }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'boot' | 'ready'>('logo')
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showProgressBar, setShowProgressBar] = useState(false)

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setPhase('boot')
      setShowProgressBar(true)
    }, 2000)

    return () => clearTimeout(logoTimer)
  }, [])

  useEffect(() => {
    if (phase !== 'boot') return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1
        return prev
      })
    }, 45)

    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < bootMessages.length - 1) return prev + 1
        return prev
      })
    }, 600)

    const readyTimer = setTimeout(() => {
      setPhase('ready')
      setProgress(100)
      setTimeout(onComplete, 800)
    }, minDuration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(interval)
      clearTimeout(readyTimer)
    }
  }, [phase, minDuration, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
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
            className="relative z-10 flex items-center justify-center text-center px-4"
            variants={staggerContainer}
            initial="initial"
            animate="enter"
          >
            <motion.div
              variants={logoVariants}
              className="relative flex items-center gap-2 xs:gap-3 sm:gap-4"
            >
              <motion.div
                className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                <svg viewBox="0 0 100 100" className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8">
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
                variants={staggerItem}
                className="flex flex-col text-left"
              >
                <motion.h1
                  className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight whitespace-nowrap"
                  variants={introTextVariants}
                >
                  心镜 MindMirror
                </motion.h1>
                <motion.p
                  className="mt-0.5 text-white/50 text-[10px] xs:text-xs sm:text-sm"
                  variants={introTextVariants}
                >
                  轻松探索，遇见真实的自己
                </motion.p>
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
            <motion.div
              className="mb-5 sm:mb-6 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9">
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
              <motion.h2
                className="mt-3 text-sm sm:text-base font-semibold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                心镜 MindMirror
              </motion.h2>
            </motion.div>

            <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
              <AnimatePresence mode="wait">
                {bootMessages.slice(0, currentMessage + 1).map((msg, index) => (
                  <motion.div
                    key={msg.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.3 
                    }}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.05 }}
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

            <AnimatePresence>
              {showProgressBar && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-xs text-white/60 font-mono">
                    <span>系统加载</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'linear' }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === 'ready' && (
          <motion.div
            key="ready"
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-emerald-400"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
              <span className="text-sm sm:text-base font-medium text-white">
                正在进入...
              </span>
            </motion.div>
            <motion.p
              className="mt-4 text-xs text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              照见自己，成为更好的自己
            </motion.p>
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
