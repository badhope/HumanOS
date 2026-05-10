import type { Variants, Transition } from 'framer-motion'

// ==============================================
// 统一动画规范 - MindMirror Design System
// ==============================================

// 核心缓动函数 - 所有动画统一使用
const EASE = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
  gentle: [0.4, 0, 0.2, 1] as const,
}

// 统一时间规范
const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  page: 0.4,
}

// 统一Spring规范
const SPRING = {
  gentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
  normal: { type: 'spring' as const, stiffness: 300, damping: 25 },
  snappy: { type: 'spring' as const, stiffness: 400, damping: 30 },
  bouncy: { type: 'spring' as const, stiffness: 500, damping: 20 },
}

// 统一Stagger间隔
const STAGGER = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
}

// 导出统一配置供全局使用
export const animationConfig = {
  ease: EASE,
  duration: DURATION,
  spring: SPRING,
  stagger: STAGGER,
}

// ==============================================
// 基础过渡配置
// ==============================================

export const defaultTransition: Transition = {
  duration: DURATION.normal,
  ease: EASE.smooth,
}

export const springTransition: Transition = SPRING.normal

export const slowTransition: Transition = {
  duration: DURATION.slow,
  ease: EASE.smooth,
}

// ==============================================
// 页面过渡动画 - 统一规范
// ==============================================

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
      duration: DURATION.page,
      ease: EASE.smooth,
      when: 'beforeChildren',
      staggerChildren: STAGGER.normal,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -20,
    transition: {
      duration: DURATION.fast,
      ease: EASE.smooth,
    },
  },
}

// 滑动手势动画 - 统一slide系列
export const slideVariants: Record<string, Variants> = {
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    enter: { x: 0, opacity: 1, transition: defaultTransition },
    exit: { x: '-100%', opacity: 0, transition: { duration: DURATION.fast, ease: EASE.smooth } },
  },
  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    enter: { x: 0, opacity: 1, transition: defaultTransition },
    exit: { x: '100%', opacity: 0, transition: { duration: DURATION.fast, ease: EASE.smooth } },
  },
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    enter: { y: 0, opacity: 1, transition: defaultTransition },
    exit: { y: '-100%', opacity: 0, transition: { duration: DURATION.fast, ease: EASE.smooth } },
  },
  slideDown: {
    initial: { y: '-100%', opacity: 0 },
    enter: { y: 0, opacity: 1, transition: defaultTransition },
    exit: { y: '100%', opacity: 0, transition: { duration: DURATION.fast, ease: EASE.smooth } },
  },
}

// 缩放动画 - 统一scale系列
export const scaleVariants: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: SPRING.snappy,
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE.smooth },
  },
}

// 3D翻转动画
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
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: DURATION.fast,
      ease: EASE.smooth,
    },
  },
}

// 缩放入场动画
export const zoomVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: SPRING.normal,
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: DURATION.fast },
  },
}

// ==============================================
// 卡片动画 - 统一规范
// ==============================================

export const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING.normal,
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: SPRING.snappy,
  },
  tap: {
    scale: 0.98,
    transition: SPRING.snappy,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: DURATION.fast },
  },
}

// 悬浮卡片动画 - 悬停时上浮
export const hoverLiftVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -4,
    transition: SPRING.snappy,
  },
}

// 悬浮缩放动画
export const hoverScaleVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: SPRING.snappy,
  },
  tap: {
    scale: 0.95,
    transition: SPRING.normal,
  },
}

// ==============================================
// 淡入动画 - 统一fade系列
// ==============================================

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: DURATION.normal } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
}

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: DURATION.fast },
  },
}

export const fadeInScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: SPRING.normal,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: DURATION.fast },
  },
}

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
}

export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
}

// ==============================================
// 交错入场动画 - stagger系列
// ==============================================

export const staggerContainer: Variants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: SPRING.normal,
  },
}

export const staggerItemFade: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
}

export const staggerItemScale: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  enter: {
    opacity: 1,
    scale: 1,
    transition: SPRING.normal,
  },
}

// ==============================================
// 循环动画 - 统一循环效果
// ==============================================

export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const breatheVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const floatVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const rotateVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const spinSlowVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const loadingDots: Variants = {
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

// ==============================================
// 模态框和覆盖层动画
// ==============================================

export const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING.normal,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: DURATION.fast },
  },
}

export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: DURATION.fast } },
  exit: { opacity: 0, transition: { duration: DURATION.instant } },
}

export const drawerVariants: Variants = {
  initial: { x: '100%' },
  enter: { x: 0, transition: SPRING.snappy },
  exit: { x: '100%', transition: { duration: DURATION.fast } },
}

// ==============================================
// 专用动画
// ==============================================

// Logo动画
export const logoVariants: Variants = {
  initial: {
    scale: 0,
    rotate: -15,
    opacity: 0,
  },
  enter: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      duration: 0.6,
    },
  },
}

// 开场文字动画
export const introTextVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: DURATION.fast,
    },
  },
}

// 启动序列动画
export const bootSequenceVariants: Variants = {
  initial: {
    opacity: 0,
    x: -10,
  },
  enter: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: EASE.smooth,
    },
  }),
  exit: {
    opacity: 0,
    x: 10,
    transition: {
      duration: 0.2,
    },
  },
}

// 结果揭示动画
export const resultRevealVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 30,
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING.normal,
  },
}

// 图表柱状动画
export const chartBarVariants: Variants = {
  initial: {
    scaleY: 0,
    opacity: 0,
  },
  enter: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: EASE.smooth,
    },
  }),
}

// 成就解锁动画
export const achievementUnlockVariants: Variants = {
  initial: {
    scale: 0,
    rotate: -10,
    opacity: 0,
  },
  enter: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: SPRING.bouncy,
  },
  celebrate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.5,
      repeat: 2,
    },
  },
}

// ==============================================
// 交互反馈动画
// ==============================================

export const interactiveHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: SPRING.snappy,
  },
  tap: {
    scale: 0.98,
    transition: SPRING.snappy,
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
    transition: SPRING.snappy,
  },
  tap: {
    y: -2,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
    transition: SPRING.normal,
  },
}

export const interactiveGlow: Variants = {
  initial: {
    boxShadow: '0 0 0 rgba(139, 92, 246, 0)',
  },
  hover: {
    boxShadow: '0 0 25px rgba(139, 92, 246, 0.3)',
    transition: { duration: DURATION.fast },
  },
  tap: {
    boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)',
    transition: { duration: DURATION.instant },
  },
}

// ==============================================
// 进度和加载动画
// ==============================================

export const progressVariants: Variants = {
  initial: { width: 0 },
  animate: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 0.5,
      ease: EASE.smooth,
    },
  }),
}

export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
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
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// ==============================================
// 辅助函数
// ==============================================

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
  staggerDelay: STAGGER.normal,
  reducedMotionDuration: DURATION.instant,
  baseDuration: DURATION.normal,
  getTransition: (options?: { delay?: number; duration?: number }) => ({
    duration: options?.duration ?? DURATION.normal,
    delay: options?.delay ?? 0,
    ease: EASE.smooth,
  }),
}

// 响应式动画配置
export const getResponsiveTransition = (isMobile: boolean): Transition => {
  return isMobile
    ? { duration: DURATION.fast, ease: EASE.snappy }
    : { duration: DURATION.normal, ease: EASE.smooth }
}

export const getReducedMotionTransition = (prefersReducedMotion: boolean): Transition => {
  return prefersReducedMotion
    ? { duration: DURATION.instant }
    : { duration: DURATION.normal, ease: EASE.smooth }
}

// 性能优化的动画预设
export const performanceOptimizedPresets = {
  fast: {
    duration: DURATION.fast,
    ease: EASE.snappy,
  },
  normal: {
    duration: DURATION.normal,
    ease: EASE.smooth,
  },
  slow: {
    duration: DURATION.slow,
    ease: EASE.smooth,
  },
  spring: SPRING.normal,
  bouncy: SPRING.bouncy,
  gentle: SPRING.gentle,
}

// 启动时序配置
export const bootScreenTiming = {
  logoDelay: 0.3,
  logoDuration: 1.2,
  textDelay: 1.5,
  textDuration: 0.8,
  progressDelay: 2,
  progressDuration: 2.5,
  totalDuration: 5,
}

// 结果页时序配置
export const resultPageTiming = {
  initialDelay: 0.2,
  titleDuration: 0.5,
  chartDelay: 0.3,
  chartDuration: 0.8,
  descriptionDelay: 0.5,
  totalDuration: 2,
}
