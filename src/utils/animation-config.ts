import type { Variants, Transition } from 'framer-motion'

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
}

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

export const slowTransition: Transition = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1],
}

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20,
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -20,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const slideVariants: Record<string, Variants> = {
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { ...defaultTransition } },
    exit: { x: '-100%', opacity: 0, transition: { ...defaultTransition } },
  },
  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { ...defaultTransition } },
    exit: { x: '100%', opacity: 0, transition: { ...defaultTransition } },
  },
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { ...defaultTransition } },
    exit: { y: '-100%', opacity: 0, transition: { ...defaultTransition } },
  },
  slideDown: {
    initial: { y: '-100%', opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { ...defaultTransition } },
    exit: { y: '100%', opacity: 0, transition: { ...defaultTransition } },
  },
}

export const flipVariants: Variants = {
  initial: {
    rotateY: 90,
    opacity: 0,
    scale: 0.8,
  },
  enter: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const zoomVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
}

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const fadeInScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const pulseVariants: Variants = {
  initial: {
    scale: 1,
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
}

export const glowVariants: Variants = {
  initial: {
    boxShadow: '0 0 0px rgba(139, 92, 246, 0)',
  },
  glow: {
    boxShadow: [
      '0 0 20px rgba(139, 92, 246, 0.3)',
      '0 0 40px rgba(139, 92, 246, 0.5)',
      '0 0 20px rgba(139, 92, 246, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
}

export const shimmerVariants: Variants = {
  initial: {
    backgroundPosition: '-200% 0',
  },
  shimmer: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const loadingDots: Variants = {
  initial: {
    opacity: 0.3,
    scale: 0.8,
  },
  animate: (i: number) => ({
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 1,
      repeat: Infinity,
      delay: i * 0.15,
    },
  }),
}

export const progressVariants: Variants = {
  initial: {
    width: 0,
  },
  animate: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export const counterVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
}

export const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
}

export const overlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export const introTextVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: 'blur(10px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: 'blur(10px)',
    transition: {
      duration: 0.5,
    },
  },
}

export const logoVariants: Variants = {
  initial: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  enter: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: 1.2,
    },
  },
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.5,
    },
  },
}

export const bootSequenceVariants: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  enter: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
    },
  },
}

export const resultRevealVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      delay: 0.3,
    },
  },
}

export const chartBarVariants: Variants = {
  initial: {
    scaleY: 0,
    opacity: 0,
  },
  enter: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export const achievementUnlockVariants: Variants = {
  initial: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  enter: {
    scale: [0, 1.3, 1],
    rotate: [0, 10, -10, 0],
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      duration: 1,
    },
  },
  celebrate: {
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.5,
      repeat: 2,
    },
  },
}

export const typingVariants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
    },
  }),
}

export const rippleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0.5,
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const floatVariants: Variants = {
  initial: {
    y: 0,
  },
  float: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const rotateVariants: Variants = {
  initial: {
    rotate: 0,
  },
  rotate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const entranceSequence = {
  delay: 0.2,
  staggerDelay: 0.1,
  totalDuration: 2,
}

export const bootScreenTiming = {
  logoDelay: 0.5,
  logoDuration: 1.5,
  textDelay: 2,
  textDuration: 1,
  progressDelay: 3,
  progressDuration: 3,
  totalDuration: 7,
}

export const resultPageTiming = {
  initialDelay: 0.3,
  titleDuration: 0.8,
  chartDelay: 0.5,
  chartDuration: 1.5,
  descriptionDelay: 1,
  totalDuration: 3,
}
