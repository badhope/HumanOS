import { motion } from 'framer-motion'
import { Brain, Sparkles, Atom, Star, Circle } from 'lucide-react'
import { loadingAnimations } from '@utils/page-transition-styles'

interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  text?: string
  showText?: boolean
  className?: string
}

const sizeMap = {
  sm: 24,
  md: 40,
  lg: 64,
  xl: 96,
}

export function LoadingSpinner({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: actualSize, height: actualSize }}
      variants={loadingAnimations.spinner.variants}
      animate="animate"
    >
      <Circle className="w-full h-full" style={{ color, strokeWidth: 2.5, opacity: 0.2 }} />
      <Circle 
        className="absolute w-full h-full" 
        style={{ color, strokeWidth: 2.5 }}
        strokeDasharray="70 100"
        strokeDashoffset="20"
      />
    </motion.div>
  )
}

export function LoadingPulse({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: actualSize, height: actualSize }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{ 
          width: actualSize * 0.6, 
          height: actualSize * 0.6,
          backgroundColor: color,
          opacity: 0.3,
        }}
        variants={loadingAnimations.pulse.variants}
        animate="animate"
      />
      <Brain 
        className="relative z-10"
        style={{ width: actualSize * 0.5, height: actualSize * 0.5, color }}
      />
    </motion.div>
  )
}

export function LoadingDots({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  const dotSize = actualSize / 4
  
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} style={{ height: actualSize }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ 
            width: dotSize, 
            height: dotSize,
            backgroundColor: color,
          }}
          custom={i}
          variants={loadingAnimations.dots.variants}
          animate="animate"
        />
      ))}
    </div>
  )
}

export function LoadingBars({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  const barWidth = actualSize / 6
  
  return (
    <div className={`flex items-end justify-center gap-1 ${className}`} style={{ height: actualSize }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="rounded-full origin-bottom"
          style={{ 
            width: barWidth, 
            height: actualSize * 0.8,
            backgroundColor: color,
          }}
          custom={i}
          variants={loadingAnimations.bars.variants}
          animate="animate"
        />
      ))}
    </div>
  )
}

export function LoadingRipple({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: actualSize, height: actualSize }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{ 
            width: actualSize * 0.6, 
            height: actualSize * 0.6,
            borderColor: color,
          }}
          variants={loadingAnimations.ripple.variants}
          animate="animate"
          transition={{ delay: i * 0.5 }}
        />
      ))}
      <Atom 
        className="relative z-10"
        style={{ width: actualSize * 0.4, height: actualSize * 0.4, color }}
      />
    </div>
  )
}

export function LoadingOrbit({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: actualSize, height: actualSize }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ 
            width: actualSize * (0.5 + i * 0.2), 
            height: actualSize * (0.5 + i * 0.2),
            borderColor: color,
            opacity: 0.3 + i * 0.2,
          }}
          custom={i}
          variants={loadingAnimations.orbit.variants}
          animate="animate"
        />
      ))}
      <Sparkles 
        className="relative z-10"
        style={{ width: actualSize * 0.25, height: actualSize * 0.25, color }}
      />
    </div>
  )
}

export function LoadingGradient({ size = 'md', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <motion.div
      className={`rounded-full ${className}`}
      style={{ 
        width: actualSize, 
        height: actualSize,
        background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)',
        backgroundSize: '300% 300%',
      }}
      variants={loadingAnimations.gradient.variants}
      animate="animate"
    />
  )
}

export function LoadingMorph({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <motion.div
      className={`${className}`}
      style={{ 
        width: actualSize * 0.7, 
        height: actualSize * 0.7,
        backgroundColor: color,
      }}
      variants={loadingAnimations.morph.variants}
      animate="animate"
    />
  )
}

export function LoadingStars({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <div className={`relative ${className}`} style={{ width: actualSize, height: actualSize }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2
        const radius = actualSize * 0.35
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: actualSize / 2 + Math.cos(angle) * radius,
              top: actualSize / 2 + Math.sin(angle) * radius,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Star className="fill-current" style={{ width: actualSize * 0.2, height: actualSize * 0.2, color }} />
          </motion.div>
        )
      })}
    </div>
  )
}

export const Spinner = LoadingSpinner
export const Pulse = LoadingPulse
export const Dots = LoadingDots
export const Bars = LoadingBars
export const Ripple = LoadingRipple
export const Orbit = LoadingOrbit
export const Gradient = LoadingGradient
export const Morph = LoadingMorph
export const Stars = LoadingStars

export default {
  Spinner: LoadingSpinner,
  Pulse: LoadingPulse,
  Dots: LoadingDots,
  Bars: LoadingBars,
  Ripple: LoadingRipple,
  Orbit: LoadingOrbit,
  Gradient: LoadingGradient,
  Morph: LoadingMorph,
  Stars: LoadingStars,
}
