import { useState, useEffect } from 'react'

interface PlatformInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isIOS: boolean
  isAndroid: boolean
  isWechat: boolean
  isWeb: boolean
  isTouchDevice: boolean
  safeAreaInsets: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

function getPlatformInfo(): PlatformInfo {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isIOS: false,
      isAndroid: false,
      isWechat: false,
      isWeb: true,
      isTouchDevice: false,
      safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 }
    }
  }

  const ua = navigator.userAgent.toLowerCase()
  const width = window.innerWidth

  const isIOS = /iphone|ipad|ipod/.test(ua)
  const isAndroid = /android/.test(ua)
  const isWechat = /micromessenger/.test(ua)
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  const safeAreaInsets = {
    top: isIOS ? 44 : 0,
    bottom: isIOS ? 34 : 0,
    left: 0,
    right: 0
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    isIOS,
    isAndroid,
    isWechat,
    isWeb: true,
    isTouchDevice,
    safeAreaInsets
  }
}

function usePlatform(): PlatformInfo {
  const [platform, setPlatform] = useState<PlatformInfo>(getPlatformInfo())

  useEffect(() => {
    const handleResize = () => {
      setPlatform(getPlatformInfo())
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return platform
}

function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

interface MotionProps {
  initial?: boolean | object
  animate?: boolean | object
  exit?: boolean | object
  transition?: Transition
  whileHover?: boolean | object | Variants
  whileTap?: boolean | object | Variants
}

export function useOptimizedMotion(): {
  shouldAnimate: boolean
  defaultTransition: { duration: number; ease: string }
  reducedMotionProps: MotionProps
} {
  const { isMobile } = usePlatform()
  const prefersReducedMotion = useReducedMotion()

  const shouldAnimate = !prefersReducedMotion && !isMobile

  const defaultTransition = {
    duration: shouldAnimate ? 0.3 : 0,
    ease: 'easeOut'
  }

  const reducedMotionProps: MotionProps = {
    initial: false,
    animate: false,
    exit: false,
    whileHover: false,
    whileTap: false,
    transition: { duration: 0 }
  }

  return {
    shouldAnimate,
    defaultTransition,
    reducedMotionProps
  }
}

export function getResponsiveGridColumns(): number {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200
  if (width < 480) return 1
  if (width < 768) return 2
  if (width < 1024) return 3
  return 4
}

export function getResponsiveTextSize(): {
  h1: string
  h2: string
  h3: string
  body: string
  small: string
} {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200
  if (width < 480) {
    return {
      h1: 'text-2xl',
      h2: 'text-xl',
      h3: 'text-lg',
      body: 'text-sm',
      small: 'text-xs'
    }
  }
  if (width < 768) {
    return {
      h1: 'text-3xl',
      h2: 'text-2xl',
      h3: 'text-xl',
      body: 'text-sm',
      small: 'text-xs'
    }
  }
  return {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    body: 'text-base',
    small: 'text-sm'
  }
}

export function useTouchOptimizedPadding(): {
  padding: string
  paddingX: string
  paddingY: string
  gap: string
} {
  const platform = usePlatform()
  const isTouch = platform.isTouchDevice || platform.isMobile

  return {
    padding: isTouch ? 'p-4' : 'p-3',
    paddingX: isTouch ? 'px-4' : 'px-3',
    paddingY: isTouch ? 'py-4' : 'py-3',
    gap: isTouch ? 'gap-4' : 'gap-3'
  }
}

export function useSafeAreaStyle(): {
  paddingTop?: string
  paddingBottom?: string
  paddingLeft?: string
  paddingRight?: string
} {
  const platform = usePlatform()

  if (!platform.isIOS) return {}

  return {
    paddingTop: `pt-${platform.safeAreaInsets.top}`,
    paddingBottom: `pb-${platform.safeAreaInsets.bottom}`
  }
}
