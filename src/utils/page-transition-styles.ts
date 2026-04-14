import type { Variants, Transition } from 'framer-motion'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const isTouchDevice = typeof window !== 'undefined' && 
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)
const prefersReducedMotion = typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const baseDuration = prefersReducedMotion ? 0.01 : isMobile ? 0.55 : 0.8
const staggerDelay = prefersReducedMotion ? 0 : isMobile ? 0.08 : 0.15

const getDuration = (mobile: number, desktop: number) => 
  prefersReducedMotion ? 0.01 : isMobile ? mobile : desktop

const standardEase = [0.25, 0.1, 0.25, 1] as [number, number, number, number]
const smoothEase = [0.4, 0, 0.2, 1] as [number, number, number, number]
const bounceEase = [0.34, 1.56, 0.64, 1] as [number, number, number, number]
const ultraSmoothEase = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

export type PageTransitionType = 
  | 'fadeScale'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | 'slideDown'
  | 'flip'
  | 'rotateIn'
  | 'zoomIn'
  | 'zoomOut'
  | 'glide'
  | 'reveal'
  | 'cube'
  | 'push'
  | 'pull'
  | 'fold'
  | 'unfold'

export interface TransitionPreset {
  name: string
  description: string
  variants: Variants
  recommendedFor: 'forward' | 'backward' | 'both'
}

export const forwardTransitions: Record<string, TransitionPreset> = {
  fadeScale: {
    name: '淡入缩放',
    description: '经典的淡入同时轻微放大效果',
    recommendedFor: 'forward',
    variants: {
      initial: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.97,
        filter: 'blur(2px)',
      },
      enter: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration: getDuration(0.65, 0.9),
          ease: ultraSmoothEase,
          when: 'beforeChildren',
          staggerChildren: staggerDelay,
        },
      },
      exit: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 1.02,
        filter: 'blur(4px)',
        x: prefersReducedMotion ? 0 : -40,
        transition: {
          duration: getDuration(0.5, 0.7),
          ease: ultraSmoothEase,
        },
      },
    },
  },

  slideLeft: {
    name: '左滑进入',
    description: '新页面从右侧滑入，覆盖旧页面',
    recommendedFor: 'forward',
    variants: {
      initial: {
        x: prefersReducedMotion ? 0 : '100%',
        opacity: 0,
        boxShadow: '0 0 50px rgba(0,0,0,0.5)',
      },
      enter: {
        x: 0,
        opacity: 1,
        boxShadow: '0 0 0px rgba(0,0,0,0)',
        transition: {
          duration: getDuration(0.45, 0.6),
          ease: smoothEase,
          staggerChildren: staggerDelay * 1.5,
        },
      },
      exit: {
        x: prefersReducedMotion ? 0 : '-30%',
        opacity: 0.5,
        scale: 0.95,
        filter: 'blur(4px)',
        transition: {
          duration: getDuration(0.4, 0.55),
          ease: smoothEase,
        },
      },
    },
  },

  zoomIn: {
    name: '放大进入',
    description: '新页面从中心放大涌现',
    recommendedFor: 'forward',
    variants: {
      initial: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.8,
        borderRadius: '50%',
        clipPath: 'circle(0% at 50% 50%)',
      },
      enter: {
        opacity: 1,
        scale: 1,
        borderRadius: '0%',
        clipPath: 'circle(150% at 50% 50%)',
        transition: {
          duration: getDuration(0.6, 0.8),
          ease: smoothEase,
          staggerChildren: staggerDelay,
        },
      },
      exit: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.9,
        transition: {
          duration: getDuration(0.3, 0.4),
          ease: standardEase,
        },
      },
    },
  },

  glide: {
    name: '滑翔进入',
    description: '带抛物线轨迹的优雅滑入',
    recommendedFor: 'forward',
    variants: {
      initial: {
        opacity: 0,
        x: prefersReducedMotion ? 0 : 100,
        y: prefersReducedMotion ? 0 : 50,
        rotate: 2,
      },
      enter: {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        transition: {
          duration: getDuration(0.55, 0.75),
          ease: smoothEase,
          staggerChildren: staggerDelay,
        },
      },
      exit: {
        opacity: 0,
        x: prefersReducedMotion ? 0 : -50,
        y: prefersReducedMotion ? 0 : -30,
        transition: {
          duration: getDuration(0.35, 0.5),
          ease: standardEase,
        },
      },
    },
  },

  reveal: {
    name: '揭幕效果',
    description: '像揭开帷幕一样显示新页面',
    recommendedFor: 'forward',
    variants: {
      initial: {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0.5,
      },
      enter: {
        clipPath: 'inset(0 0 0% 0)',
        opacity: 1,
        transition: {
          duration: getDuration(0.6, 0.85),
          ease: smoothEase,
          staggerChildren: staggerDelay * 2,
        },
      },
      exit: {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
        transition: {
          duration: getDuration(0.4, 0.55),
          ease: standardEase,
        },
      },
    },
  },

  unfold: {
    name: '展开效果',
    description: '像纸张一样从中心展开',
    recommendedFor: 'forward',
    variants: {
      initial: {
        opacity: 0,
        scaleX: 0,
        scaleY: 0.8,
        transformOrigin: 'center center',
      },
      enter: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        transition: {
          scaleX: { duration: getDuration(0.4, 0.55), ease: smoothEase },
          scaleY: { duration: getDuration(0.35, 0.5), ease: smoothEase, delay: 0.1 },
          opacity: { duration: getDuration(0.3, 0.4) },
          staggerChildren: staggerDelay,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
          duration: getDuration(0.25, 0.35),
        },
      },
    },
  },
}

export const backwardTransitions: Record<string, TransitionPreset> = {
  fadeScale: {
    name: '淡出缩小',
    description: '返回时缩小淡出，与前进形成呼应',
    recommendedFor: 'backward',
    variants: {
      initial: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 1.02,
        x: prefersReducedMotion ? 0 : -15,
        filter: 'blur(2px)',
      },
      enter: {
        opacity: 1,
        scale: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
          duration: getDuration(0.65, 0.85),
          ease: ultraSmoothEase,
          staggerChildren: staggerDelay,
        },
      },
      exit: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.98,
        x: prefersReducedMotion ? 0 : 25,
        filter: 'blur(3px)',
        transition: {
          duration: getDuration(0.55, 0.75),
          ease: ultraSmoothEase,
        },
      },
    },
  },

  slideRight: {
    name: '右滑退出',
    description: '当前页面向右滑出，与前进动画相反',
    recommendedFor: 'backward',
    variants: {
      initial: {
        x: prefersReducedMotion ? 0 : '-50%',
        opacity: 0.6,
        scale: 0.95,
      },
      enter: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: getDuration(0.45, 0.6),
          ease: smoothEase,
          staggerChildren: staggerDelay * 1.5,
        },
      },
      exit: {
        x: prefersReducedMotion ? 0 : '100%',
        opacity: 0,
        boxShadow: '0 0 50px rgba(0,0,0,0.3)',
        transition: {
          duration: getDuration(0.4, 0.55),
          ease: smoothEase,
        },
      },
    },
  },

  zoomOut: {
    name: '缩小退出',
    description: '返回时页面缩小淡出',
    recommendedFor: 'backward',
    variants: {
      initial: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 1.1,
      },
      enter: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: getDuration(0.5, 0.7),
          ease: smoothEase,
          staggerChildren: staggerDelay,
        },
      },
      exit: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.85,
        clipPath: 'circle(0% at 50% 50%)',
        transition: {
          duration: getDuration(0.4, 0.55),
          ease: standardEase,
        },
      },
    },
  },

  pull: {
    name: '拉回效果',
    description: '像被拉回来一样的返回动画',
    recommendedFor: 'backward',
    variants: {
      initial: {
        opacity: 0,
        x: prefersReducedMotion ? 0 : -80,
        y: prefersReducedMotion ? 0 : -20,
        rotate: -1,
      },
      enter: {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        transition: {
          duration: getDuration(0.5, 0.7),
          ease: ultraSmoothEase,
          staggerChildren: staggerDelay,
        },
      },
      exit: {
        opacity: 0,
        x: prefersReducedMotion ? 0 : 60,
        transition: {
          duration: getDuration(0.35, 0.5),
          ease: standardEase,
        },
      },
    },
  },

  fold: {
    name: '折叠收起',
    description: '返回时像纸张一样折叠起来',
    recommendedFor: 'backward',
    variants: {
      initial: {
        opacity: 0,
        scaleX: 0.8,
        scaleY: 0.9,
      },
      enter: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        transition: {
          duration: getDuration(0.45, 0.6),
          ease: smoothEase,
          staggerChildren: staggerDelay,
        },
      },
      exit: {
        opacity: 0,
        scaleX: 0,
        scaleY: 0.8,
        transformOrigin: 'center center',
        transition: {
          duration: getDuration(0.4, 0.55),
          ease: standardEase,
        },
      },
    },
  },
}

export const pageTypeTransitions: Record<string, string> = {
  '/': 'fadeScale',
  '/dashboard': 'fadeScale',
  '/discover': 'glide',
  '/assessment': 'zoomIn',
  '/assessment/mbti': 'reveal',
  '/assessment/bigfive': 'reveal',
  '/assessment/holland': 'reveal',
  '/result': 'unfold',
  '/about': 'slideLeft',
  '/history': 'slideLeft',
  '/story': 'glide',
  '/psychology': 'reveal',
  '/philosophy': 'unfold',
  '/ideology': 'zoomIn',
}

export const loadingAnimations = {
  spinner: {
    name: '经典旋转',
    variants: {
      animate: {
        rotate: 360,
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        },
      },
    },
  },

  pulse: {
    name: '呼吸脉动',
    variants: {
      animate: {
        scale: [1, 1.1, 1],
        opacity: [0.6, 1, 0.6],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: smoothEase,
        },
      },
    },
  },

  dots: {
    name: '跳动圆点',
    variants: {
      animate: (i: number) => ({
        y: [0, -12, 0],
        transition: {
          duration: 0.8,
          delay: i * 0.15,
          repeat: Infinity,
          ease: smoothEase,
        },
      }),
    },
  },

  bars: {
    name: '音频柱状',
    variants: {
      animate: (i: number) => ({
        scaleY: [0.5, 1, 0.5],
        transition: {
          duration: 0.6,
          delay: i * 0.1,
          repeat: Infinity,
          ease: smoothEase,
        },
      }),
    },
  },

  ripple: {
    name: '波纹扩散',
    variants: {
      animate: {
        scale: [1, 2.5],
        opacity: [0.6, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: smoothEase,
        },
      },
    },
  },

  orbit: {
    name: '星球轨道',
    variants: {
      animate: (i: number) => ({
        rotate: [0, 360],
        transition: {
          duration: 2 + i * 0.5,
          repeat: Infinity,
          ease: 'linear',
        },
      }),
    },
  },

  gradient: {
    name: '渐变流动',
    variants: {
      animate: {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        },
      },
    },
  },

  morph: {
    name: '形状变形',
    variants: {
      animate: {
        borderRadius: ['50%', '10%', '50%', '40%', '50%'],
        scale: [1, 0.9, 1, 1.05, 1],
        rotate: [0, 90, 180, 270, 360],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: smoothEase,
        },
      },
    },
  },
}

export function getTransitionForNavigation(direction: 'forward' | 'backward', path?: string): Variants {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      enter: { opacity: 1, transition: { duration: 0.01 } },
      exit: { opacity: 0, transition: { duration: 0.01 } },
    }
  }

  const transitions = direction === 'forward' ? forwardTransitions : backwardTransitions
  
  if (path && pageTypeTransitions[path] && transitions[pageTypeTransitions[path]]) {
    return transitions[pageTypeTransitions[path]].variants
  }

  const transitionKeys = Object.keys(transitions)
  const safeIndex1 = Math.min(Math.floor(Math.random() * transitionKeys.length), transitionKeys.length - 1)
  const randomKey = transitionKeys[safeIndex1]
  return transitions[randomKey].variants
}

export function getRandomLoadingAnimation() {
  const keys = Object.keys(loadingAnimations)
  const safeIndex2 = Math.min(Math.floor(Math.random() * keys.length), keys.length - 1)
  const randomKey = keys[safeIndex2] as keyof typeof loadingAnimations
  return loadingAnimations[randomKey]
}

export {
  baseDuration,
  staggerDelay,
  standardEase,
  smoothEase,
  bounceEase,
  isMobile,
  isTouchDevice,
  prefersReducedMotion,
}
