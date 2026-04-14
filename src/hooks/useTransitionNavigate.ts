/**
 * ==============================================
 * ✨ 页面转场导航Hook
 * ==============================================
 * 【功能定位】
 * 全站统一的页面跳转动画系统，模拟APP级别的切换体验
 * 
 * 【支持的动画预设】
 * - spinner: 经典加载圈
 * - pulse: 心跳脉冲
 * - dots: 跳动点
 * - ripple: 水波纹扩散
 * - orbit: 星球轨道
 * - stars: 星空旋转
 * 
 * 【核心机制】
 * 1. 先触发转场动画
 * 2. 动画过程中静默加载下一页
 * 3. 加载完成后执行跳转
 * 4. 入场动画渲染
 */

import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTransition } from '../components/animations/PageTransitionController'
import type { NavigationDirection, PhoneLoadingStyle, LoadingPreset } from '../components/animations/PageTransitionController'

export function useTransitionNavigate() {
  const { navigateWithTransition, isTransitioning, currentDirection } = usePageTransition()
  const originalNavigate = useNavigate()

  const navigate = useCallback(
    (
      path: string | number,
      options?: {
        direction?: NavigationDirection
        loadingText?: string
        loadingType?: 'random' | 'spinner' | 'pulse' | 'dots' | 'ripple' | 'orbit' | 'stars' | 'bars'
        phoneStyle?: PhoneLoadingStyle
        preset?: LoadingPreset
        duration?: number
      }
    ) => {
      if (typeof path === 'number') {
        if (path < 0) {
          navigateWithTransition(window.location.pathname, {
            direction: 'backward',
            loadingText: '正在返回...',
            ...options,
          })
          setTimeout(() => {
            originalNavigate(path)
          }, 100)
        } else {
          originalNavigate(path)
        }
      } else {
        navigateWithTransition(path, options)
      }
    },
    [navigateWithTransition, originalNavigate]
  )

  return {
    navigate,
    isTransitioning,
    currentDirection,
  }
}
