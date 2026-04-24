
import { useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShortcutContext } from './useShortcutContext'

/**
 * 键盘快捷键配置接口
 * 
 * 描述单个快捷键的完整配置信息，支持各种修饰键组合
 */
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

/**
 * 全局键盘快捷键管理 Hook
 * 
 * 🔧 核心功能:
 * 1. 全局快捷键监听 - 在 Window 层面捕获键盘事件
 * 2. 系统级快捷键支持 - Ctrl/Cmd + H/K/F 等标准操作
 * 3. 智能过滤 - 输入框内自动屏蔽冲突快捷键
 * 4. 自定义扩展 - 支持组件级自定义快捷键
 * 5. 快捷键列表导出 - 可在帮助界面展示所有支持的快捷键
 * 
 * 🚀 性能优化:
 * - 防抖处理: useCallback 缓存事件处理器
 * - 自动清理: 自动移除事件监听器
 * - 精确匹配: 智能检测修饰键(Ctrl/Shift/Alt/Meta)组合
 * - 去重优化: useMemo 消除重复的快捷键定义
 * 
 * 💡 默认全局快捷键一览:
 * - Ctrl/Cmd + H → 返回首页
 * - Ctrl/Cmd + K → 打开快速搜索
 * - Ctrl/Cmd + F → 打开快速搜索
 * - ? → 显示/隐藏快捷键帮助面板
 * - Escape → 关闭弹窗(通用)
 * 
 * 👥 面向人群说明:
 * 非技术人员: 这就像是应用的"键盘指挥中心"。就像电脑上 Ctrl+C 复制、
 * Ctrl+V 粘贴一样，这个功能让用户可以通过键盘快捷键快速操作，
 * 不用在界面上到处找按钮点。
 * 
 * @param customShortcuts - 组件级自定义快捷键数组
 * @param deps - 回调依赖数组，用于触发快捷键系统重新初始化
 * @returns 包含所有已注册快捷键的完整列表(可用于展示帮助信息)
 */
export function useKeyboardShortcuts(
  customShortcuts: KeyboardShortcut[] = [],
  deps: any[] = []
) {
  const navigate = useNavigate()
  const { setSearchOpen, setHelpOpen } = useShortcutContext()

  /**
   * 🔥 性能优化: 全局快捷键定义只创建一次
   * 消除了原代码中快捷键定义重复的问题
   * 之前在 handleKeyDown 和返回值中各定义了一次
   */
  const GLOBAL_SYSTEM_SHORTCUTS = useMemo((): KeyboardShortcut[] => [
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
  ], [navigate, setSearchOpen, setHelpOpen])

  /**
   * 完整的快捷键列表(全局 + 自定义)
   */
  const allShortcuts = useMemo(() => {
    return [...GLOBAL_SYSTEM_SHORTCUTS, ...customShortcuts]
  }, [GLOBAL_SYSTEM_SHORTCUTS, customShortcuts])

  /**
   * 精确匹配键盘快捷键
   * 
   * 🎯 匹配逻辑:
   * 1. 按键字符精确匹配(忽略大小写)
   * 2. Ctrl/Cmd 智能匹配(Mac 和 Windows 统一体验)
   * 3. Shift/Alt 精确匹配
   * 4. 未指定修饰键时，确保该修饰键未被按下
   * 
   * @param e - 原生键盘事件对象
   * @param shortcut - 快捷键配置
   * @returns 是否匹配成功
   */
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

  /**
   * 键盘按下事件主处理器
   * 
   * 🎯 处理流程:
   * 1. 检测当前焦点是否在输入框内
   * 2. 遍历所有注册的快捷键
   * 3. 过滤掉输入框内应屏蔽的快捷键
   * 4. 逐一匹配快捷键，执行对应回调
   * 5. 匹配成功立即终止遍历(防止冲突)
   * 
   * ⚠️ 输入框智能判断:
   * INPUT / TEXTAREA 内自动屏蔽 ? 快捷键
   * 防止用户正常输入时触发意外操作
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const activeElement = document.activeElement
      const isInput =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA'

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
    [matchShortcut, allShortcuts, ...deps]
  )

  /**
   * 🎯 副作用: 注册和清理事件监听器
   * 
   * 组件挂载时注册 window 事件监听
   * 组件卸载时自动清理，防止内存泄漏
   */
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return {
    allShortcuts,
  }
}

/**
 * 测评结果导出工具 Hook
 * 
 * 🔧 核心功能:
 * 1. 图片导出 - 将测评结果转换为 PNG 图片
 * 2. JSON 导出 - 原始数据下载供进一步分析
 * 3. 系统分享 - 调用系统原生分享功能(Web Share API)
 * 
 * 👥 面向人群说明:
 * 非技术人员: 这个功能可以把你的测评结果变成漂亮的图片、
 * 数据文件，或者直接通过系统分享功能发给朋友。就像是
 * 应用内置的"另存为"和"分享"按钮。
 */
export function useResultExport() {
  /**
   * 将指定 DOM 元素导出为 PNG 图片
   * 
   * 📸 技术细节:
   * - 使用 html2canvas 库进行 DOM 渲染
   * - 2 倍分辨率保证导出清晰度
   * - 深色背景主题匹配
   * - 自动生成带时间戳的唯一文件名
   * - 动态 import 实现代码分割(首屏不加载)
   * 
   * @param elementId - 要导出的 DOM 元素 ID
   * @param filename - 文件名前缀
   * @returns 是否导出成功
   */
  const exportAsImage = useCallback(
    async (elementId: string, filename: string = 'result'): Promise<boolean> => {
      const element = document.getElementById(elementId)
      if (!element) return false

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
      } catch (error) {
        console.error('导出图片失败:', error)
        return false
      }
    },
    []
  )

  /**
   * 将数据导出为 JSON 文件
   * 
   * 💾 功能说明:
   * - 原始 JSON 格式，可用于后续分析
   * - UTF-8 编码，兼容所有平台
   * - Blob URL 高性能实现
   * 
   * @param data - 任意 JSON 数据
   * @param filename - 文件名前缀
   */
  const exportAsJSON = useCallback(
    (data: any, filename: string = 'result'): void => {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      })
      
      const link = document.createElement('a')
      link.download = `humanos-${filename}-${Date.now()}.json`
      link.href = URL.createObjectURL(blob)
      link.click()
      
      setTimeout(() => URL.revokeObjectURL(link.href), 100)
    },
    []
  )

  /**
   * 调用系统原生分享功能
   * 
   * 📤 兼容性说明:
   * - 使用 Web Share API (移动端和现代桌面浏览器支持)
   * - 降级方案: 自动复制链接到剪贴板
   * 
   * @param title - 分享标题
   * @param text - 分享描述文字
   * @param url - 分享链接
   * @returns 是否分享成功
   */
  const shareResult = useCallback(
    async (title: string, text: string, url: string): Promise<boolean> => {
      try {
        if (navigator.share) {
          await navigator.share({ title, text, url })
          return true
        } else {
          await navigator.clipboard.writeText(url)
          return true
        }
      } catch (error) {
        console.error('分享失败:', error)
        return false
      }
    },
    []
  )

  return {
    exportAsImage,
    exportAsJSON,
    shareResult,
  }
}
