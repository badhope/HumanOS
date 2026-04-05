import { useCallback, useEffect, useRef, useState } from 'react'

export function usePerformance() {
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const animationFrameId = useRef<number>()

  const measureFPS = useCallback(() => {
    const now = performance.now()
    frameCount.current++

    if (now - lastTime.current >= 1000) {
      setFps(frameCount.current)
      frameCount.current = 0
      lastTime.current = now
    }

    animationFrameId.current = requestAnimationFrame(measureFPS)
  }, [])

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(measureFPS)
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [measureFPS])

  return { fps }
}

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [node, setNode] = useState<Element | null>(null)

  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    const currentOptions = {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    }

    observer.current = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      currentOptions
    )

    const currentNode = node
    if (currentNode) {
      observer.current.observe(currentNode)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [node, options])

  return { setRef: setNode, entry, isIntersecting: entry?.isIntersecting }
}

export function useLazyLoad<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    observer.observe(currentRef)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, isLoaded }
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef(0)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastCall.current >= delay) {
        lastCall.current = now
        return callbackRef.current(...args)
      }
    }) as T,
    [delay]
  )
}

export function useRafCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const rafId = useRef<number>()
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  return useCallback(
    ((...args: Parameters<T>) => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }

      rafId.current = requestAnimationFrame(() => {
        callbackRef.current(...args)
      })
    }) as T,
    []
  )
}

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  return reducedMotion
}

export function useHardwareConcurrency(): number {
  const [cores, setCores] = useState(4)

  useEffect(() => {
    if ('hardwareConcurrency' in navigator) {
      setCores(navigator.hardwareConcurrency || 4)
    }
  }, [])

  return cores
}

export function useMemoryInfo() {
  const [memory, setMemory] = useState({
    usedJSHeapSize: 0,
    totalJSHeapSize: 0,
    jsHeapSizeLimit: 0,
  })

  useEffect(() => {
    const updateMemory = () => {
      if ('memory' in performance && (performance as any).memory) {
        const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = 
          (performance as any).memory
        setMemory({ usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit })
      }
    }

    updateMemory()
    const interval = setInterval(updateMemory, 5000)

    return () => clearInterval(interval)
  }, [])

  return memory
}

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [effectiveType, setEffectiveType] = useState('4g')

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    if ('connection' in navigator && (navigator as any).connection) {
      const connection = (navigator as any).connection
      setEffectiveType(connection.effectiveType || '4g')

      const handleChange = () => {
        setEffectiveType(connection.effectiveType || '4g')
      }

      connection.addEventListener('change', handleChange)
      return () => {
        connection.removeEventListener('change', handleChange)
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOnline, effectiveType }
}

export function useViewportSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollPosition
}

export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect
        setSize({ width, height })
      }
    })

    observer.observe(currentRef)
    return () => observer.disconnect()
  }, [])

  return { ref, ...size }
}

export function useOptimizedAnimation(
  callback: () => void,
  deps: any[] = []
) {
  const rafId = useRef<number>()
  const reducedMotion = useReducedMotion()
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (reducedMotion) return

    rafId.current = requestAnimationFrame(() => callbackRef.current())

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, ...deps])
}
