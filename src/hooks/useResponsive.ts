import { useState, useEffect, useMemo } from 'react'

interface Breakpoints {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  isTouchDevice: boolean
  isPortrait: boolean
  isLandscape: boolean
  deviceType: 'mobile' | 'tablet' | 'desktop'
  safeAreaInsets: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export function useResponsive(): Breakpoints {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  const [orientation, setOrientation] = useState({
    angle: typeof window !== 'undefined' ? window.orientation : 0,
    type: typeof window !== 'undefined' ? window.screen.orientation?.type : 'landscape-primary',
  })

  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 100)
    }

    const handleOrientationChange = () => {
      setOrientation({
        angle: window.orientation,
        type: window.screen.orientation?.type,
      })
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
      clearTimeout(resizeTimeout)
    }
  }, [])

  const breakpoints = useMemo<Breakpoints>(() => {
    const isMobile = windowSize.width < 768
    const isTablet = windowSize.width >= 768 && windowSize.width < 1024
    const isDesktop = windowSize.width >= 1024 && windowSize.width < 1536
    const isLargeDesktop = windowSize.width >= 1536

    const isTouchDevice = 
      typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const isPortrait = windowSize.height > windowSize.width
    const isLandscape = windowSize.width > windowSize.height

    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
    if (isMobile) deviceType = 'mobile'
    else if (isTablet) deviceType = 'tablet'

    const getSafeAreaInsets = () => {
      if (typeof window === 'undefined') {
        return { top: 0, bottom: 0, left: 0, right: 0 }
      }

      const getComputedStyleValue = (property: string): number => {
        const value = getComputedStyle(document.documentElement).getPropertyValue(property)
        return parseInt(value, 10) || 0
      }

      return {
        top: getComputedStyleValue('--sat'),
        bottom: getComputedStyleValue('--sab'),
        left: getComputedStyleValue('--sal'),
        right: getComputedStyleValue('--sar'),
      }
    }

    return {
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      isTouchDevice,
      isPortrait,
      isLandscape,
      deviceType,
      safeAreaInsets: getSafeAreaInsets(),
    }
  }, [windowSize])

  return breakpoints
}

export function useBreakpoint(breakpoint: number): boolean {
  const [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches)
    }

    setIsMatch(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [breakpoint])

  return isMatch
}

export function useContainerWidth(ref: React.RefObject<HTMLElement>): number {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })

    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect()
  }, [ref])

  return width
}
