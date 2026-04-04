import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface AnimatedProgressProps {
  value: number
  max?: number
  duration?: number
  delay?: number
  showLabel?: boolean
  label?: string
  color?: 'violet' | 'pink' | 'emerald' | 'orange' | 'blue'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const colorMap = {
  violet: 'from-violet-500 to-purple-500',
  pink: 'from-pink-500 to-rose-500',
  emerald: 'from-emerald-500 to-teal-500',
  orange: 'from-orange-500 to-amber-500',
  blue: 'from-blue-500 to-cyan-500',
}

const sizeMap = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export default function AnimatedProgress({
  value,
  max = 100,
  duration = 1.5,
  delay = 0,
  showLabel = true,
  label,
  color = 'violet',
  size = 'md',
  className = '',
}: AnimatedProgressProps) {
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
      controls.start({
        width: `${percentage}%`,
        transition: {
          duration,
          ease: [0.25, 0.1, 0.25, 1],
        },
      })
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [percentage, duration, delay, controls])

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-white/60">{label}</span>
          <motion.span
            className="text-sm font-medium text-white"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: delay + duration * 0.5 }}
          >
            {value}/{max}
          </motion.span>
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${sizeMap[size]}`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorMap[color]} relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={controls}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={isVisible ? { x: '200%' } : {}}
            transition={{
              duration: 1.5,
              delay: delay + duration,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
