import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'rect' | 'circle' | 'text'
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className = '',
  variant = 'rect',
  width,
  height,
}: SkeletonProps) {
  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
  }

  return (
    <motion.div
      className={`bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] animate-shimmer ${variants[variant]} ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  )
}

interface PageSkeletonProps {
  type?: 'home' | 'assessment' | 'dashboard' | 'results'
}

export function PageSkeleton({ type = 'home' }: PageSkeletonProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (type === 'home') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Skeleton variant="rect" className="w-48 h-8 mx-auto mb-6" />
            <Skeleton variant="text" className="w-96 h-6 mx-auto mb-4" />
            <Skeleton variant="text" className="w-80 h-6 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass rounded-2xl p-6"
              >
                <Skeleton variant="rect" className="w-12 h-12 mb-4" />
                <Skeleton variant="text" className="w-32 h-6 mb-2" />
                <Skeleton variant="text" className="w-full h-4 mb-1" />
                <Skeleton variant="text" className="w-3/4 h-4" />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass rounded-2xl p-6"
              >
                <Skeleton variant="rect" className="w-full h-40 mb-4" />
                <Skeleton variant="text" className="w-32 h-6 mb-2" />
                <Skeleton variant="text" className="w-full h-4 mb-1" />
                <Skeleton variant="text" className="w-2/3 h-4" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (type === 'assessment') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-12"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton variant="rect" className="w-32 h-4 mb-8" />
          <Skeleton variant="rect" className="w-full h-8 mb-4" />
          <Skeleton variant="rect" className="w-3/4 h-6 mb-8" />

          <div className="space-y-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass rounded-xl p-4"
              >
                <Skeleton variant="rect" className="w-full h-12" />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between">
            <Skeleton variant="rect" className="w-24 h-10" />
            <Skeleton variant="rect" className="w-24 h-10" />
          </div>
        </div>
      </motion.div>
    )
  }

  if (type === 'dashboard') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-12"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 mb-10">
            <div className="flex items-center gap-6">
              <Skeleton variant="circle" className="w-20 h-20" />
              <div className="flex-1">
                <Skeleton variant="text" className="w-48 h-8 mb-2" />
                <Skeleton variant="text" className="w-32 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass rounded-2xl p-6"
              >
                <Skeleton variant="text" className="w-16 h-10 mb-2" />
                <Skeleton variant="text" className="w-24 h-4" />
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton variant="rect" className="w-12 h-12 rounded-xl" />
                    <div>
                      <Skeleton variant="text" className="w-32 h-5 mb-1" />
                      <Skeleton variant="text" className="w-24 h-4" />
                    </div>
                  </div>
                  <Skeleton variant="rect" className="w-20 h-8 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-24 pb-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton variant="rect" className="w-full h-64 mb-8" />
        <Skeleton variant="rect" className="w-full h-96" />
      </div>
    </motion.div>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <motion.div
      className={`${sizes[size]} border-2 border-white/20 border-t-violet-500 rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

interface PulsingDotProps {
  className?: string
}

export function PulsingDot({ className = '' }: PulsingDotProps) {
  return (
    <motion.span
      className={`inline-block w-2 h-2 rounded-full bg-violet-500 ${className}`}
      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  )
}