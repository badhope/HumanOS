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

export default function SplashScreen({ onComplete, minDuration = 4000 }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'boot' | 'ready'>('logo')
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)

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

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    const readyTimer = setTimeout(() => {
      setPhase('ready')
      setTimeout(onComplete, 500)
    }, minDuration)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
      clearTimeout(readyTimer)
    }
  }, [phase, minDuration, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
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
            className="relative z-10 flex flex-col items-center"
            variants={staggerContainer}
            initial="initial"
            animate="enter"
          >
            <motion.div
              variants={logoVariants}
              className="relative"
            >
              <motion.div
                className="w-32 h-32 rounded-3xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-5xl font-bold text-white">H</span>
              </motion.div>
              <motion.div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 blur-xl"
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
              className="mt-8 text-center"
            >
              <motion.h1
                className="text-4xl font-bold text-white"
                variants={introTextVariants}
              >
                心镜 MindMirror
              </motion.h1>
              <motion.p
                className="mt-2 text-violet-400/80"
                variants={introTextVariants}
              >
                心镜 MindMirror
              </motion.p>
              <motion.p
                className="mt-1 text-white/50 text-sm"
                variants={introTextVariants}
              >
                观照内心，自成一界
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {phase === 'boot' && (
          <motion.div
            key="boot"
            className="relative z-10 w-full max-w-md px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8 text-center">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <span className="text-2xl font-bold text-white">H</span>
              </motion.div>
            </div>

            <div className="space-y-3 mb-8">
              <AnimatePresence mode="wait">
                {bootMessages.slice(0, currentMessage + 1).map((msg, index) => (
                  <motion.div
                    key={msg.text}
                    custom={index}
                    variants={bootSequenceVariants}
                    initial="initial"
                    animate="enter"
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                    <span className="text-sm text-white/80 font-mono">{msg.text}</span>
                    {index === currentMessage && (
                      <motion.span
                        className="text-white/60"
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

            <div className="relative">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <motion.div
                className="mt-2 text-right text-sm text-white/40 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {progress}%
              </motion.div>
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
              className="text-2xl font-bold text-white"
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
        className="absolute bottom-8 text-center text-white/30 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>© 2024 心镜 MindMirror. 照见自己，成为更好的自己。</p>
      </motion.div>
    </motion.div>
  )
}
