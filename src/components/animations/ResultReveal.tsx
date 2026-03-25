import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  resultRevealVariants,
  chartBarVariants,
  achievementUnlockVariants,
  staggerContainer,
  staggerItem,
  resultPageTiming,
} from '@utils/animation-config'

interface ResultRevealProps {
  title: string
  subtitle?: string
  type: string
  description: string
  scores?: { label: string; value: number; color: string }[]
  traits?: string[]
  onComplete?: () => void
}

export default function ResultReveal({
  title,
  subtitle,
  type,
  description,
  scores = [],
  traits = [],
  onComplete,
}: ResultRevealProps) {
  const [phase, setPhase] = useState<'intro' | 'type' | 'scores' | 'traits' | 'complete'>('intro')

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('type'), resultPageTiming.initialDelay * 1000 + resultPageTiming.titleDuration * 1000),
      setTimeout(() => setPhase('scores'), resultPageTiming.initialDelay * 1000 + resultPageTiming.chartDelay * 1000 + resultPageTiming.chartDuration * 1000),
      setTimeout(() => setPhase('traits'), 2500),
      setTimeout(() => {
        setPhase('complete')
        onComplete?.()
      }, 3500),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={staggerContainer}
      initial="initial"
      animate="enter"
    >
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <motion.div
              className="text-lg text-white/60 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              分析完成
            </motion.div>
            <motion.div
              className="flex justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-violet-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {phase !== 'intro' && (
          <motion.div
            key="content"
            variants={resultRevealVariants}
            initial="initial"
            animate="enter"
            className="space-y-8"
          >
            <motion.div
              className="text-center"
              variants={staggerItem}
            >
              {subtitle && (
                <motion.p
                  className="text-white/60 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {subtitle}
                </motion.p>
              )}
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gradient"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.3,
                }}
              >
                {title}
              </motion.h1>
              <motion.div
                className="mt-4 inline-block px-6 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-lg font-medium text-violet-300">{type}</span>
              </motion.div>
            </motion.div>

            {phase !== 'type' && scores.length > 0 && (
              <motion.div
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-6">维度分析</h3>
                <div className="space-y-4">
                  {scores.map((score, index) => (
                    <motion.div
                      key={score.label}
                      custom={index}
                      variants={chartBarVariants}
                      initial="initial"
                      animate="enter"
                      className="relative"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white/80">{score.label}</span>
                        <span className="text-sm font-medium text-white">{score.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: score.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${score.value}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.5 + index * 0.1,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'traits' && traits.length > 0 && (
              <motion.div
                className="flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {traits.map((trait, index) => (
                  <motion.span
                    key={trait}
                    custom={index}
                    variants={achievementUnlockVariants}
                    initial="initial"
                    animate="enter"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-white/10 text-white/80 text-sm"
                  >
                    {trait}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {phase === 'complete' && (
              <motion.div
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-white/80 leading-relaxed">{description}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface AchievementUnlockProps {
  icon: string
  title: string
  description: string
  onClose?: () => void
}

export function AchievementUnlock({ icon, title, description, onClose }: AchievementUnlockProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.()
    }, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass rounded-2xl p-8 text-center max-w-sm mx-4 pointer-events-auto"
        variants={achievementUnlockVariants}
        initial="initial"
        animate="enter"
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {icon}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">成就解锁!</h3>
          <p className="text-violet-300 font-medium mb-2">{title}</p>
          <p className="text-sm text-white/60">{description}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
