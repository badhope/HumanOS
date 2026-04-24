import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, X, ChevronRight } from 'lucide-react'
import { Button } from '@components/ui/Button'
import { useShortcutContext } from '@hooks/useShortcutContext'

interface ShortcutGroup {
  title: string
  shortcuts: {
    keys: string[]
    description: string
  }[]
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: '全局导航',
    shortcuts: [
      { keys: ['Ctrl', 'H'], description: '返回首页' },
      { keys: ['Ctrl', 'K'], description: '快速搜索' },
      { keys: ['Ctrl', 'F'], description: '快速搜索' },
      { keys: ['?'], description: '显示快捷键帮助' },
      { keys: ['Escape'], description: '关闭弹窗/返回' },
    ],
  },
  {
    title: '答题操作',
    shortcuts: [
      { keys: ['←'], description: '上一题' },
      { keys: ['→'], description: '下一题' },
      { keys: ['1-5'], description: '选择对应选项' },
    ],
  },
  {
    title: '结果页面',
    shortcuts: [
      { keys: ['点击导出'], description: '导出结果图片/JSON' },
    ],
  },
]

export default function KeyboardShortcutsHelp() {
  const { helpOpen: isOpen, setHelpOpen: setIsOpen } = useShortcutContext()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement
        const isInput = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA'
        if (!isInput) {
          e.preventDefault()
          setIsOpen(prev => !prev)
        }
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  const renderKey = (key: string) => (
    <kbd
      key={key}
      className="px-2 py-1 text-xs font-mono font-semibold rounded-md bg-slate-700/80 border border-slate-600 text-slate-200 shadow-sm"
    >
      {key}
    </kbd>
  )

  return (
    <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-x-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[85vh] overflow-auto"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-700/50 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-indigo-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Keyboard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">键盘快捷键</h2>
                        <p className="text-sm text-slate-400">提升你的使用效率</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-700/50 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {SHORTCUT_GROUPS.map((group, groupIndex) => (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: groupIndex * 0.08 }}
                    >
                      <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        {group.title}
                      </h3>
                      <div className="space-y-2">
                        {group.shortcuts.map((shortcut, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-700/30 transition-colors"
                          >
                            <span className="text-sm text-slate-300">{shortcut.description}</span>
                            <div className="flex items-center gap-1">
                              {shortcut.keys.map((key, keyIdx) => (
                                <>
                                  {keyIdx > 0 && <span className="text-slate-500 mx-0.5">+</span>}
                                  {renderKey(key)}
                                </>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-900/50">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      💡 提示：按 <kbd className="px-1.5 py-0.5 mx-1 rounded bg-slate-700 text-slate-300">?</kbd> 随时打开此面板
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      知道了
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
  )
}
