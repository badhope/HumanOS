import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface TypingEffectProps {
  text: string
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
  className?: string
  cursorClassName?: string
  showCursor?: boolean
  onComplete?: () => void
}

export default function TypingEffect({
  text,
  speed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  className = '',
  cursorClassName = 'inline-block w-0.5 h-5 bg-violet-500 ml-1',
  showCursor = true,
  onComplete,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const handleTyping = useCallback(() => {
    if (isPaused) {
      setIsPaused(false)
      setIsDeleting(true)
      return
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1))
      } else {
        setIsDeleting(false)
        setTimeout(() => setIsPaused(true), pauseDuration)
      }
    } else {
      if (displayedText.length < text.length) {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      } else {
        onComplete?.()
      }
    }
  }, [displayedText, isDeleting, isPaused, text, pauseDuration, onComplete])

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isPaused ? pauseDuration : isDeleting ? deleteSpeed : speed
    )
    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, isPaused, handleTyping, speed, deleteSpeed, pauseDuration])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          className={cursorClassName}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  )
}

interface ShimmerTextProps {
  text: string
  className?: string
  shimmerColor?: string
  duration?: number
}

export function ShimmerText({
  text,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.5)',
  duration = 2000,
}: ShimmerTextProps) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 z-20"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
    </span>
  )
}

interface GlowTextProps {
  text: string
  className?: string
  glowColor?: string
  intensity?: 'low' | 'medium' | 'high'
}

export function GlowText({
  text,
  className = '',
  glowColor = '#8b5cf6',
  intensity = 'medium',
}: GlowTextProps) {
  const intensityMap = {
    low: '0 0 10px',
    medium: '0 0 20px',
    high: '0 0 40px',
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        textShadow: `${intensityMap[intensity]} ${glowColor}`,
      }}
    >
      {text}
    </span>
  )
}
