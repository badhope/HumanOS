import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import {
  pageVariants,
  slideVariants,
  flipVariants,
  zoomVariants,
} from '@utils/animation-config'

type TransitionType = 'fade' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'flip' | 'zoom'

interface PageTransitionProps {
  children: React.ReactNode
  type?: TransitionType
  className?: string
}

const getVariants = (type: TransitionType) => {
  switch (type) {
    case 'slideLeft':
      return slideVariants.slideLeft
    case 'slideRight':
      return slideVariants.slideRight
    case 'slideUp':
      return slideVariants.slideUp
    case 'slideDown':
      return slideVariants.slideDown
    case 'flip':
      return flipVariants
    case 'zoom':
      return zoomVariants
    default:
      return pageVariants
  }
}

export default function PageTransition({
  children,
  type = 'fade',
  className = '',
}: PageTransitionProps) {
  const location = useLocation()
  const variants = getVariants(type)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        className={className}
        style={{ perspective: type === 'flip' ? 1000 : undefined }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

interface AnimatedPageProps {
  children: React.ReactNode
  className?: string
  staggerChildren?: boolean
}

export function AnimatedPage({ children, className = '', staggerChildren = true }: AnimatedPageProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {staggerChildren ? (
        <motion.div
          initial="initial"
          animate="enter"
          variants={{
            initial: {},
            enter: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  id?: string
}

export function FadeInSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  id,
}: FadeInSectionProps) {
  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
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
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
