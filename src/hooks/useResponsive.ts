import { useState, useEffect } from 'react'

interface Breakpoints {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useResponsive(): Breakpoints {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    isMobile: true,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    const checkBreakpoints = () => {
      const width = window.innerWidth
      setBreakpoints({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    checkBreakpoints()
    window.addEventListener('resize', checkBreakpoints)
    return () => window.removeEventListener('resize', checkBreakpoints)
  }, [])

  return breakpoints
}
