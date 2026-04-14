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

function detectIsMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

function detectPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const optimizedAnimationConfig = {
  isMobile: detectIsMobile(),
  prefersReducedMotion: detectPrefersReducedMotion(),
  animationQuality: 'high' as 'low' | 'medium' | 'high',
  enableHardwareAcceleration: true,
  staggerDelay: 0.1,
  reducedMotionDuration: 0.1,
  baseDuration: 0.6,
  getTransition: (options?: { delay?: number; duration?: number }) => ({
    duration: options?.duration ?? 0.6,
    delay: options?.delay ?? 0,
    type: 'spring',
    stiffness: 300,
    damping: 25,
  }),
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

// ==================== 性能优化动画配置 ====================

export const optimizedTransition: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1],
}

export const gpuAcceleratedTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
  type: 'tween',
}

export const smoothSpringTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.8,
}

export const bouncySpringTransition: Transition = {
  type: 'spring',
  stiffness: 600,
  damping: 15,
  mass: 0.5,
}

export const gentleSpringTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 40,
  mass: 1,
}

// 60fps优化的动画变体
export const smoothFadeIn: Variants = {
  initial: {
    opacity: 0,
    transform: 'translate3d(0, 20px, 0)',
  },
  enter: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    transform: 'translate3d(0, -10px, 0)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const smoothScaleIn: Variants = {
  initial: {
    opacity: 0,
    transform: 'scale3d(0.9, 0.9, 0.9)',
  },
  enter: {
    opacity: 1,
    transform: 'scale3d(1, 1, 1)',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    transform: 'scale3d(0.95, 0.95, 0.95)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const smoothSlideIn: Variants = {
  initial: {
    opacity: 0,
    transform: 'translate3d(30px, 0, 0)',
  },
  enter: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    transform: 'translate3d(-30px, 0, 0)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// 交互增强动画
export const interactiveHover: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
}

export const interactiveLift: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
  },
  hover: {
    y: -4,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    y: -2,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
}

export const interactiveGlow: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(139, 92, 246, 0)',
  },
  hover: {
    boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)',
    transition: {
      duration: 0.1,
    },
  },
}

// 高级动画效果
export const morphingCard: Variants = {
  initial: {
    borderRadius: '16px',
    scale: 1,
  },
  hover: {
    borderRadius: '24px',
    scale: 1.02,
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    borderRadius: '12px',
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
}

export const elasticBounce: Variants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: [0, 1.25, 0.9, 1.05, 1],
    transition: {
      duration: 0.8,
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
}

export const smoothRotate: Variants = {
  initial: {
    rotate: 0,
  },
  hover: {
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
    },
  },
}

export const attentionGrabber: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
}

// 页面过渡动画优化
export const pageSlideOptimized: Variants = {
  initial: {
    opacity: 0,
    transform: 'translate3d(100%, 0, 0)',
  },
  enter: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transform: 'translate3d(-100%, 0, 0)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const pageZoomOptimized: Variants = {
  initial: {
    opacity: 0,
    transform: 'scale3d(0.95, 0.95, 0.95)',
  },
  enter: {
    opacity: 1,
    transform: 'scale3d(1, 1, 1)',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transform: 'scale3d(1.05, 1.05, 1.05)',
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// 列表项动画
export const listItemStagger: Variants = {
  initial: {
    opacity: 0,
    transform: 'translate3d(20px, 0, 0)',
  },
  enter: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const listItemScale: Variants = {
  initial: {
    opacity: 0,
    transform: 'scale3d(0.9, 0.9, 0.9)',
  },
  enter: {
    opacity: 1,
    transform: 'scale3d(1, 1, 1)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
}

// 特殊效果动画
export const glitchEffect: Variants = {
  initial: {
    x: 0,
    filter: 'blur(0px)',
  },
  animate: {
    x: [0, -2, 2, -1, 1, 0],
    filter: ['blur(0px)', 'blur(1px)', 'blur(0px)'],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
}

export const neonPulse: Variants = {
  initial: {
    textShadow: '0 0 0 rgba(139, 92, 246, 0)',
  },
  animate: {
    textShadow: [
      '0 0 10px rgba(139, 92, 246, 0.5)',
      '0 0 20px rgba(139, 92, 246, 0.8)',
      '0 0 10px rgba(139, 92, 246, 0.5)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
}

export const waveEffect: Variants = {
  initial: {
    y: 0,
  },
  animate: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      delay: i * 0.1,
      duration: 1,
      repeat: Infinity,
    },
  }),
}

// 响应式动画配置
export const getResponsiveTransition = (isMobile: boolean): Transition => {
  return isMobile
    ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
}

export const getReducedMotionTransition = (prefersReducedMotion: boolean): Transition => {
  return prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
}

// 性能优化的动画预设
export const performanceOptimizedPresets = {
  fast: {
    duration: 0.2,
    ease: [0.16, 1, 0.3, 1],
  },
  normal: {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1],
  },
  slow: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  },
  spring: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  },
  bouncy: {
    type: 'spring',
    stiffness: 600,
    damping: 20,
  },
  gentle: {
    type: 'spring',
    stiffness: 200,
    damping: 40,
  },
}
