import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  hoverScale?: number
  enableTilt?: boolean
  enableGlow?: boolean
  onClick?: () => void
}

export default function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.5)',
  hoverScale = 1.02,
  enableTilt = true,
  enableGlow = true,
  onClick,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10])

  const springConfig = { stiffness: 300, damping: 30 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || !enableTilt) return

      const rect = ref.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const mouseXPos = e.clientX - rect.left
      const mouseYPos = e.clientY - rect.top
      const xPct = mouseXPos / width - 0.5
      const yPct = mouseYPos / height - 0.5

      x.set(xPct)
      y.set(yPct)
      mouseX.set(mouseXPos)
      mouseY.set(mouseYPos)
    },
    [enableTilt, x, y, mouseX, mouseY]
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }, [x, y])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: enableTilt ? rotateXSpring : 0,
        rotateY: enableTilt ? rotateYSpring : 0,
      }}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {enableGlow && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mouseX.get()}px ${mouseY.get()}px, ${glowColor}, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      <motion.div
        className="relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(20px)',
        }}
      >
        {children}
      </motion.div>

      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            boxShadow: `
              0 0 30px ${glowColor},
              0 0 60px ${glowColor.replace('0.5', '0.3')},
              0 0 90px ${glowColor.replace('0.5', '0.1')}
            `,
          }}
        />
      )}
    </motion.div>
  )
}
