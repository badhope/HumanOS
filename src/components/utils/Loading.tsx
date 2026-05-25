import { motion } from 'framer-motion'
import { Loader2, Sparkles, Star } from 'lucide-react'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'spinner' | 'pulse' | 'dots'
  text?: string
}

export function Loading({ size = 'medium', variant = 'spinner', text }: LoadingProps) {
  const sizeMap = {
    small: { container: 'h-4 w-4', icon: 16 },
    medium: { container: 'h-8 w-8', icon: 24 },
    large: { container: 'h-12 w-12', icon: 32 }
  }

  const { container, icon } = sizeMap[size]

  const renderSpinner = () => (
    <motion.div
      className={container}
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 className="w-full h-full text-violet-400" />
    </motion.div>
  )

  const renderPulse = () => (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${container} bg-violet-400 rounded-full`}
          style={{ height: icon / 2, width: icon / 2 }}
          animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )

  const renderDots = () => (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-violet-400 rounded-full"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {variant === 'spinner' && renderSpinner()}
      {variant === 'pulse' && renderPulse()}
      {variant === 'dots' && renderDots()}
      {text && <p className="text-white/60 text-sm">{text}</p>}
    </div>
  )
}

interface PageLoadingProps {
  title?: string
  description?: string
}

export function PageLoading({ title = '加载中...', description }: PageLoadingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mb-6"
        >
          <div className="relative">
            <Sparkles className="w-16 h-16 text-violet-400" />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Star className="w-6 h-6 text-amber-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h2
          className="text-xl font-semibold text-white mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p
            className="text-white/50 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>
        )}

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Loading variant="dots" size="large" />
        </motion.div>
      </div>
    </div>
  )
}

export const PageSkeleton = PageLoading

export default Loading
