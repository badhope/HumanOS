import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShortcutContext } from '@components/ShortcutProvider'

export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
  callback?: (e: KeyboardEvent) => void
  description?: string
  preventDefault?: boolean
  preventInInput?: boolean
}

export function useKeyboardShortcuts(
  customShortcuts: KeyboardShortcut[] = [],
  deps: any[] = []
) {
  const navigate = useNavigate()
  const { setSearchOpen, setHelpOpen } = useShortcutContext()

  const GLOBAL_SHORTCUTS: KeyboardShortcut[] = [
    {
      key: 'h',
      ctrl: true,
      description: '返回首页',
      callback: () => navigate('/'),
    },
    {
      key: 'k',
      ctrl: true,
      description: '快速搜索',
      callback: () => setSearchOpen(true),
    },
    {
      key: 'f',
      ctrl: true,
      description: '快速搜索',
      callback: () => setSearchOpen(true),
    },
    {
      key: '?',
      description: '显示快捷键帮助',
      callback: () => setHelpOpen(prev => !prev),
      preventInInput: true,
    },
    {
      key: 'Escape',
      description: '关闭弹窗',
    },
  ]

  const matchShortcut = useCallback(
    (e: KeyboardEvent, shortcut: KeyboardShortcut): boolean => {
      const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase()
      const ctrlMatch = shortcut.ctrl
        ? e.ctrlKey || e.metaKey
        : !e.ctrlKey && !e.metaKey
      const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey
      const altMatch = shortcut.alt ? e.altKey : !e.altKey

      return keyMatch && ctrlMatch && shiftMatch && altMatch
    },
    []
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const activeElement = document.activeElement
      const isInput =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA'

      const allShortcuts = [...GLOBAL_SHORTCUTS, ...customShortcuts]

      for (const shortcut of allShortcuts) {
        if (isInput && shortcut.preventInInput) continue
        if (matchShortcut(e, shortcut)) {
          if (shortcut.preventDefault !== false) {
            e.preventDefault()
          }
          shortcut.callback?.(e)
          break
        }
      }
    },
    [matchShortcut, ...deps]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return {
    allShortcuts: [...GLOBAL_SHORTCUTS, ...customShortcuts],
  }
}

export function useResultExport() {
  const exportAsImage = useCallback(
    async (elementId: string, filename: string = 'result') => {
      const element = document.getElementById(elementId)
      if (!element) return

      try {
        const html2canvas = (await import('html2canvas')).default
        const canvas = await html2canvas(element, {
          backgroundColor: '#0f172a',
          scale: 2,
          logging: false,
          useCORS: true,
        })

        const link = document.createElement('a')
        link.download = `humanos-${filename}-${Date.now()}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()

        return true
      } catch (e) {
        console.error('导出失败:', e)
        return false
      }
    },
    []
  )

  const exportAsJSON = useCallback(
    (data: any, filename: string = 'result') => {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      })
      const link = document.createElement('a')
      link.download = `humanos-${filename}-${Date.now()}.json`
      link.href = URL.createObjectURL(blob)
      link.click()
      URL.revokeObjectURL(link.href)
    },
    []
  )

  const shareResult = useCallback(
    async (title: string, text: string, url: string) => {
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url })
          return true
        } catch {
          return false
        }
      }
      return false
    },
    []
  )

  return {
    exportAsImage,
    exportAsJSON,
    shareResult,
  }
}
