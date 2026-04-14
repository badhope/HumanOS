import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { optimizedAnimationConfig } from '@utils/animation-config'

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  id?: string
  disableOnMobile?: boolean
  margin?: string
}

export default function FadeInSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  id,
  disableOnMobile = true,
  margin = '-50px',
}: FadeInSectionProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    if (optimizedAnimationConfig.prefersReducedMotion) {
      setShouldAnimate(false)
      return
    }

    if (disableOnMobile && optimizedAnimationConfig.isMobile) {
      setShouldAnimate(false)
      return
    }

    setShouldAnimate(true)
  }, [disableOnMobile])

  const baseOffset = optimizedAnimationConfig.isMobile ? 15 : 30

  const directionOffset = {
    up: { y: baseOffset },
    down: { y: -baseOffset },
    left: { x: baseOffset },
    right: { x: -baseOffset },
  }

  if (!shouldAnimate) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      id={id}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin }}
      transition={{
        duration: optimizedAnimationConfig.baseDuration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
