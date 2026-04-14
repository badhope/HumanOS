/**
 * ==============================================
 * 👆 微交互动画Hook
 * ==============================================
 * 【功能定位】
 * 所有按钮/卡片的按压反馈动画
 * 提供原生APP级别的触觉反馈体验
 * 
 * 【支持的交互】
 * - 鼠标按下缩放
 * - 触摸按压反馈
 * - 悬停状态检测
 * - 长按触发检测
 * 
 * 【设计原则】
 * 所有可点击元素必须有视觉反馈
 * 动画时间控制在150ms以内，不影响操作流畅度
 */

import { useState, useCallback, useEffect } from 'react'

interface UsePressAnimationOptions {
  duration?: number
  scale?: number
}

interface UsePressAnimationResult {
  isPressed: boolean
  pressHandlers: {
    onMouseDown: () => void
    onMouseUp: () => void
    onMouseLeave: () => void
    onTouchStart: () => void
    onTouchEnd: () => void
  }
  pressStyle: React.CSSProperties
}

export function usePressAnimation({
  duration = 150,
  scale = 0.97,
}: UsePressAnimationOptions = {}): UsePressAnimationResult {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressStart = useCallback(() => {
    setIsPressed(true)
  }, [])

  const handlePressEnd = useCallback(() => {
    setIsPressed(false)
  }, [])

  const pressHandlers = {
    onMouseDown: handlePressStart,
    onMouseUp: handlePressEnd,
    onMouseLeave: handlePressEnd,
    onTouchStart: handlePressStart,
    onTouchEnd: handlePressEnd,
  }

  const pressStyle: React.CSSProperties = {
    transform: isPressed ? `scale(${scale})` : 'scale(1)',
    transition: `transform ${duration}ms ease-out`,
  }

  return {
    isPressed,
    pressHandlers,
    pressStyle,
  }
}

interface UseHoverAnimationOptions {
  duration?: number
  yOffset?: number
}

interface UseHoverAnimationResult {
  isHovered: boolean
  hoverHandlers: {
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
  hoverStyle: React.CSSProperties
}

export function useHoverAnimation({
  duration = 200,
  yOffset = -4,
}: UseHoverAnimationOptions = {}): UseHoverAnimationResult {
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice(
      typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    )
  }, [])

  const handleHoverStart = useCallback(() => {
    if (!isTouchDevice) {
      setIsHovered(true)
    }
  }, [isTouchDevice])

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false)
  }, [])

  const hoverHandlers = {
    onMouseEnter: handleHoverStart,
    onMouseLeave: handleHoverEnd,
  }

  const actualYOffset = isTouchDevice ? 0 : yOffset

  const hoverStyle: React.CSSProperties = {
    transform: isHovered ? `translateY(${actualYOffset}px)` : 'translateY(0)',
    transition: `transform ${duration}ms ease-out, box-shadow ${duration}ms ease-out`,
  }

  return {
    isHovered,
    hoverHandlers,
    hoverStyle,
  }
}

export function useVibrate(pattern: number | number[] = 10) {
  const vibrate = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern)
      } catch (e) {
        console.warn('震动API不支持:', e)
      }
    }
  }, [pattern])

  return vibrate
}

interface UseBounceOptions {
  intensity?: number
  speed?: number
}

export function useBounce({ intensity = 1.05, speed = 150 }: UseBounceOptions = {}) {
  const [isBouncing, setIsBouncing] = useState(false)

  const triggerBounce = useCallback(() => {
    setIsBouncing(true)
    setTimeout(() => setIsBouncing(false), speed)
  }, [speed])

  const bounceStyle: React.CSSProperties = {
    transform: isBouncing ? `scale(${intensity})` : 'scale(1)',
    transition: `transform ${speed}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
  }

  return {
    isBouncing,
    triggerBounce,
    bounceStyle,
  }
}

export function useShake(duration = 500) {
  const [isShaking, setIsShaking] = useState(false)

  const triggerShake = useCallback(() => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), duration)
  }, [duration])

  const shakeStyle: React.CSSProperties = isShaking
    ? {
        animation: `shake ${duration}ms ease-in-out`,
      }
    : {}

  return {
    isShaking,
    triggerShake,
    shakeStyle,
  }
}

interface UseSuccessAnimationOptions {
  duration?: number
}

export function useSuccessAnimation({ duration = 600 }: UseSuccessAnimationOptions = {}) {
  const [showSuccess, setShowSuccess] = useState(false)

  const triggerSuccess = useCallback(() => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), duration)
  }, [duration])

  const successStyle: React.CSSProperties = showSuccess
    ? {
        animation: `successPulse ${duration}ms ease-out`,
      }
    : {}

  return {
    showSuccess,
    triggerSuccess,
    successStyle,
  }
}

export function useFocusAnimation() {
  const [isFocused, setIsFocused] = useState(false)

  const focusHandlers = {
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  }

  const focusStyle: React.CSSProperties = {
    outline: isFocused ? '2px solid #8b5cf6' : 'none',
    outlineOffset: isFocused ? '2px' : '0',
    transition: 'outline-offset 150ms ease-out',
  }

  return {
    isFocused,
    focusHandlers,
    focusStyle,
  }
}

export function useRipple() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const createRipple = useCallback((clientX: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
  }, [])

  return {
    ripples,
    createRipple,
  }
}

export function useSound() {
  const playClick = useCallback(() => {
    if (typeof window === 'undefined') return
    
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      gainNode.gain.value = 0.1
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (e) {
      console.warn('音频API不支持:', e)
    }
  }, [])

  return {
    playClick,
  }
}
