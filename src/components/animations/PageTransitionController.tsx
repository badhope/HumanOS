/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Variants } from 'framer-motion'
import { getTransitionForNavigation, prefersReducedMotion } from '@utils/page-transition-styles'
import { PageLoadingOverlay } from './LoadingAnimations'
import ThemeTransitionOverlay from './ThemeTransitionOverlay'

export type NavigationDirection = 'forward' | 'backward'
export type ThemeTransitionVariant = 'neural' | 'cosmic' | 'quantum' | 'aurora'
export type LoadingPreset = 'page' | 'submit' | 'analysis' | 'report' | 'resource'
export type PhoneLoadingStyle = 'ios' | 'android' | 'material'

export const LOADING_PRESETS: Record<LoadingPreset, {
  variant: ThemeTransitionVariant
  loadingText: string
  duration: number
}> = {
  page: { variant: 'neural', loadingText: '测评系统启动中...', duration: 2000 },
  submit: { variant: 'quantum', loadingText: '正在提交答案...', duration: 2200 },
  analysis: { variant: 'cosmic', loadingText: '神经网络分析中...', duration: 2600 },
  report: { variant: 'aurora', loadingText: 'AI 生成报告中...', duration: 3000 },
  resource: { variant: 'neural', loadingText: '正在加载资源...', duration: 2000 },
}

interface PageTransitionControllerProps {
  children: React.ReactNode
  useThemeTransition?: boolean
  defaultPreset?: LoadingPreset
}

interface PageTransitionContextType {
  navigateWithTransition: (
    path: string,
    options?: {
      direction?: NavigationDirection
      loadingText?: string
      loadingType?: 'random' | 'spinner' | 'pulse' | 'dots' | 'ripple' | 'orbit' | 'stars' | 'bars'
      phoneStyle?: PhoneLoadingStyle
      variant?: ThemeTransitionVariant
      preset?: LoadingPreset
      duration?: number
    }
  ) => void
  isTransitioning: boolean
  currentDirection: NavigationDirection
  currentVariants: Variants
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null)

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionController')
  }
  return context
}

export default function PageTransitionController({
  children,
  useThemeTransition = true,
  defaultPreset = 'page',
}: PageTransitionControllerProps) {
  const navigate = useNavigate()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentDirection, setCurrentDirection] = useState<NavigationDirection>('forward')
  const [loadingText, setLoadingText] = useState(LOADING_PRESETS[defaultPreset].loadingText)
  const [loadingType, setLoadingType] = useState<any>('auto')
  const [variant, setVariant] = useState<ThemeTransitionVariant>(LOADING_PRESETS[defaultPreset].variant)
  const historyStack = useRef<string[]>([window.location.pathname])

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const currentPath = window.location.pathname
      const previousPath = historyStack.current[historyStack.current.length - 2]
      
      if (previousPath) {
        setCurrentDirection('backward')
        const preset = LOADING_PRESETS.page
        setVariant(preset.variant)
        setLoadingText('正在返回...')
        historyStack.current.pop()
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateWithTransition = useCallback(
    (
      path: string,
      options?: {
        direction?: NavigationDirection
        loadingText?: string
        loadingType?: 'random' | 'spinner' | 'pulse' | 'dots' | 'ripple' | 'orbit' | 'stars' | 'bars'
        variant?: ThemeTransitionVariant
        preset?: LoadingPreset
        duration?: number
      }
    ) => {
      const direction = options?.direction || 'forward'
      const preset = options?.preset ? LOADING_PRESETS[options.preset] : null
      
      setCurrentDirection(direction)
      
      const finalLoadingText = options?.loadingText || preset?.loadingText || (direction === 'backward' ? '正在返回...' : LOADING_PRESETS.page.loadingText)
      const finalVariant = options?.variant || preset?.variant || LOADING_PRESETS.page.variant
      const finalDuration = options?.duration || preset?.duration || (prefersReducedMotion ? 300 : 2000)
      
      setLoadingText(finalLoadingText)
      setLoadingType(options?.loadingType || 'auto')
      setVariant(finalVariant)
      setIsTransitioning(true)

      if (direction === 'forward') {
        historyStack.current.push(path)
      } else {
        historyStack.current.pop()
      }

      setTimeout(() => {
        navigate(path)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 300)
      }, finalDuration - 300)
    },
    [navigate]
  )

  const currentVariants = getTransitionForNavigation(currentDirection)

  return (
    <PageTransitionContext.Provider
      value={{ navigateWithTransition, isTransitioning, currentDirection, currentVariants }}
    >
      {children}

      {isTransitioning && useThemeTransition ? (
        <ThemeTransitionOverlay 
          variant={variant} 
          text={loadingText}
        />
      ) : isTransitioning && (
        <PageLoadingOverlay 
          type={loadingType} 
          text={loadingText}
          showText={true}
        />
      )}
    </PageTransitionContext.Provider>
  )
}
