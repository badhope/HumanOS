import { useEffect, useState } from 'react'

export type ContainerWidth = 'narrow' | 'standard' | 'wide' | 'fluid'

export interface ResponsiveConfig {
  containerWidth: ContainerWidth
  maxWidthClass: string
  guttersClass: string
  isWechatMini: boolean
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  gridCols: number
}

function detectWechatMiniProgram(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger') && ua.includes('miniprogram')
}

function getViewportWidth(): number {
  if (typeof window === 'undefined') return 375
  return window.innerWidth
}

export function useResponsive(pageType: ContainerWidth = 'standard'): ResponsiveConfig {
  const [viewportWidth, setViewportWidth] = useState(375)
  const [isWechatMini, setIsWechatMini] = useState(false)

  useEffect(() => {
    setViewportWidth(getViewportWidth())
    setIsWechatMini(detectWechatMiniProgram())

    const handleResize = () => setViewportWidth(getViewportWidth())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = viewportWidth < 640
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024
  const isDesktop = viewportWidth >= 1024

  let containerWidth = pageType
  let gridCols = 2

  if (isWechatMini) {
    containerWidth = 'fluid'
    gridCols = isMobile ? 1 : 2
  } else {
    if (pageType === 'standard') {
      if (viewportWidth >= 1280) {
        gridCols = 3
      }
    } else if (pageType === 'wide') {
      if (viewportWidth >= 1024) gridCols = 3
      if (viewportWidth >= 1280) gridCols = 4
    }
  }

  const maxWidthMap: Record<ContainerWidth, string> = {
    narrow: 'max-w-md',
    standard: isDesktop ? 'max-w-5xl' : 'max-w-3xl',
    wide: 'max-w-7xl',
    fluid: 'max-w-full',
  }

  const guttersClass = (isWechatMini || isMobile)
    ? 'px-4'
    : 'px-4 sm:px-6 lg:px-8'

  return {
    containerWidth,
    maxWidthClass: isWechatMini ? 'max-w-full' : maxWidthMap[containerWidth],
    guttersClass,
    isWechatMini,
    isMobile,
    isTablet,
    isDesktop,
    gridCols,
  }
}

export function useGridCols(pageType: ContainerWidth = 'standard') {
  const { gridCols, isMobile, isWechatMini } = useResponsive(pageType)
  
  if (isMobile || isWechatMini) return 1
  return gridCols
}
