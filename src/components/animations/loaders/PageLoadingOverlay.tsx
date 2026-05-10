import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { prefersReducedMotion } from '@utils/page-transition-styles'
import { 
  PhoneLoadingSkeleton, 
  PhoneLoadingProgress, 
  PhoneLoadingScan, 
  PhoneLoadingGlow, 
  PhoneLoadingWaves,
  PhoneLoadingStyle,
} from './ProgressLoaders'
import { LogoLoading } from './ThemeLoaders'

export type LoadingType = 'spinner' | 'pulse' | 'dots' | 'bars' | 'ripple' | 'orbit' | 'gradient' | 'morph' | 'stars' | 'random' | 'auto'

export function PhonePageOverlay({
  style = 'skeleton',
  text = '加载中...',
}: {
  style?: PhoneLoadingStyle
  text?: string
}) {
  const PhoneComponent = {
    skeleton: PhoneLoadingSkeleton,
    progress: PhoneLoadingProgress,
    scan: PhoneLoadingScan,
    glow: PhoneLoadingGlow,
    waves: PhoneLoadingWaves,
  }[style] || PhoneLoadingSkeleton

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-lg"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.15, type: 'spring', stiffness: 300 }}
          className="flex flex-col items-center gap-8"
        >
          <PhoneComponent size="lg" />
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
            className="text-white/70 text-lg font-medium"
          >
            {text}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function PageLoadingOverlay({
  type = 'auto',
  text = '加载中...',
  showText = true,
}: {
  type?: LoadingType
  text?: string
  showText?: boolean
}) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const progressStages = [
      { target: 15, delay: 100 },
      { target: 35, delay: 250 },
      { target: 55, delay: 350 },
      { target: 75, delay: 400 },
      { target: 90, delay: 500 },
      { target: 98, delay: 600 },
    ]
    
    progressStages.forEach((stage) => {
      setTimeout(() => {
        setProgress(stage.target)
      }, stage.delay)
    })
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/92 backdrop-blur-3xl"
      >
        <motion.div
          initial={{ scale: 0.65, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -30 }}
          transition={{ 
            delay: prefersReducedMotion ? 0 : 0.2, 
            type: 'spring', 
            stiffness: 150,
            damping: 30,
            duration: 1,
          }}
          className="flex flex-col items-center gap-12"
        >
          <LogoLoading size={260} />
          
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.45, duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-white/95 text-3xl font-bold tracking-[0.2em]">
                MindMirror
              </p>
              <p className="text-white/65 text-xl">
                {text}
              </p>
            </motion.div>
          )}

          <motion.div
            className="w-96 flex flex-col items-center gap-3"
            initial={{ opacity: 0, scaleX: 0.7 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.65, duration: 0.7, ease: 'easeOut' }}
          >
            <div className="w-full h-5 rounded-full bg-white/10 overflow-hidden shadow-inner border border-white/5">
              <motion.div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #a855f7, #ec4899, #f59e0b, #06b6d4, #10b981, #8b5cf6)',
                  backgroundSize: '400% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '200% 50%', '400% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>
            
            <motion.div 
              className="text-white/70 text-base font-medium tracking-wide"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {progress}%
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export const Overlay = PageLoadingOverlay

export { PhoneLoadingSkeleton, PhoneLoadingProgress, PhoneLoadingScan, PhoneLoadingGlow, PhoneLoadingWaves } from './ProgressLoaders'
export { LogoLoading, SmallLogo } from './ThemeLoaders'
