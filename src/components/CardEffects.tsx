import { useRef, useState, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { ReactNode } from 'react'

interface Card3DProps {
  children: ReactNode
  className?: string
  rotateFactor?: number
  scaleFactor?: number
  enabled?: boolean
}

export function Card3D({
  children,
  className = '',
  rotateFactor = 12,
  scaleFactor = 1.05,
  enabled = true,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 300, damping: 20 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || !ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateXVal = ((y - centerY) / centerY) * -rotateFactor
      const rotateYVal = ((x - centerX) / centerX) * rotateFactor

      rotateX.set(rotateXVal)
      rotateY.set(rotateYVal)
    },
    [enabled, rotateFactor, rotateX, rotateY]
  )

  const handleMouseEnter = useCallback(() => {
    if (!enabled) return
    scale.set(scaleFactor)
  }, [enabled, scaleFactor, scale])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }, [rotateX, rotateY, scale])

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className={className}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      x.set((e.clientX - centerX) * strength)
      y.set((e.clientY - centerY) * strength)
    },
    [strength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FloatEffectProps {
  children: ReactNode
  className?: string
  amplitude?: number
  speed?: number
}

export function FloatEffect({
  children,
  className = '',
  amplitude = 10,
  speed = 2,
}: FloatEffectProps) {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface BounceInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function BounceIn({ children, className = '', delay = 0 }: BounceInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.6,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface RippleEffectProps {
  className?: string
  color?: string
}

export function RippleEffect({ className = '', color = 'rgba(255, 255, 255, 0.3)' }: RippleEffectProps) {
  return (
    <motion.span
      className={`absolute inset-0 rounded-full ${className}`}
      initial={{ scale: 0, opacity: 1 }}
      whileTap={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ backgroundColor: color }}
    />
  )
}

interface GlowOnHoverProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlowOnHover({
  children,
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.4)',
}: GlowOnHoverProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered
          ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`
          : '0 0 0px transparent',
      }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}