import { Transition } from 'framer-motion'

export interface AnimationPreset {
  initial: any
  animate: any
  exit?: any
  transition: Transition
}

export const motionPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  } as AnimationPreset,

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  } as AnimationPreset,

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  } as AnimationPreset,

  slideLeft: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  } as AnimationPreset,

  slideRight: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  } as AnimationPreset,

  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  } as AnimationPreset,

  bounce: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }
    },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  } as AnimationPreset,

  elastic: {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 12,
      }
    },
    transition: { type: 'spring', stiffness: 300, damping: 12 },
  } as AnimationPreset,

  pulse: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: [1, 1.05, 1],
      transition: {
        scale: {
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'reverse' as const,
        },
        opacity: { duration: 0.3 },
      }
    },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  } as AnimationPreset,

  zoomIn: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  } as AnimationPreset,

  slideInFromLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  } as AnimationPreset,

  slideInFromRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  } as AnimationPreset,

  fadeInUpStagger: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'tween', ease: 'easeOut', duration: 0.3 },
  } as AnimationPreset,
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export const buttonPress = {
  whileTap: { scale: 0.97 },
  whileHover: { scale: 1.02 },
  transition: { type: 'spring', stiffness: 400, damping: 15 },
}

export const cardHover = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 300, damping: 20 },
}
