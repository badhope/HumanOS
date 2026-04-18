import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Command, FileText, Sparkles, ArrowRight, Clock, TrendingUp } from 'lucide-react'
import { assessments } from '@data/assessments'
import { useNavigate } from 'react-router-dom'

interface SearchResult {
  id: string
  type: 'assessment' | 'page' | 'action'
  title: string
  description: string
  icon: React.ReactNode
  path: string
  category?: string
  keywords: string[]
}

const STATIC_PAGES: SearchResult[] = [
  { id: 'home', type: 'page', title: '首页', description: '返回主页面', icon: <FileText className="w-4 h-4" />, path: '/', keywords: ['home', 'main', 'index', '主页', '首页'] },
  { id: 'dashboard', type: 'page', title: '个人面板', description: '查看历史记录与统计', icon: <TrendingUp className="w-4 h-4" />, path: '/dashboard', keywords: ['dashboard', 'history', 'stats', '个人', '历史', '统计'] },
  { id: 'category-pro', type: 'page', title: '专业测评', description: '专业心理测评集合', icon: <Sparkles className="w-4 h-4" />, path: '/category/professional', keywords: ['专业', '心理', 'professional', 'bigfive', 'personality'] },
  { id: 'category-fun', type: 'page', title: '娱乐测评', description: '趣味娱乐测评集合', icon: <Sparkles className="w-4 h-4" />, path: '/category/entertainment', keywords: ['娱乐', '趣味', 'fun', 'entertainment', 'anime', 'game'] },
  { id: 'world-sim', type: 'page', title: '国家模拟器', description: '宏观经济政策模拟', icon: <Sparkles className="w-4 h-4" />, path: '/world', keywords: ['经济', '模拟', 'simulator', 'economy', '国家', 'policy'] },
]

import { useShortcutContext } from '@components/ShortcutProvider'

export default function QuickSearchModal() {
  const { searchOpen: isOpen, setSearchOpen: setIsOpen } = useShortcutContext()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const buildSearchIndex = useCallback((): SearchResult[] => {
    const assessmentItems: SearchResult[] = assessments.map(ass => ({
      id: ass.id,
      type: 'assessment' as const,
      title: ass.title,
      description: `${ass.questionCount || 20}题 · 约 ${ass.duration} 分钟`,
      icon: <FileText className="w-4 h-4" />,
      path: `/assessment/${ass.id}`,
      category: ass.category,
      keywords: [ass.title, ass.id, ass.category],
    }))

    return [...STATIC_PAGES, ...assessmentItems]
  }, [])

  const searchResults = useCallback((): SearchResult[] => {
    if (!query.trim()) {
      return buildSearchIndex().slice(0, 12)
    }

    const q = query.toLowerCase()
    return buildSearchIndex()
      .filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some(k => k.toLowerCase().includes(q))
      )
      .slice(0, 10)
  }, [query, buildSearchIndex])

  const results = searchResults()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleSelect = (item: SearchResult) => {
    setIsOpen(false)
    navigate(item.path)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        }
        break
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition-all"
      >
        <Search className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors hidden sm:inline">
          快速搜索
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-lg bg-slate-700/50 text-slate-400 border border-slate-600/50">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50">
                  <Search className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="搜索测评、页面、功能..."
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-sm"
                    autoComplete="off"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-700/50 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto p-2">
                  {results.length === 0 ? (
                    <div className="py-12 text-center">
                      <Search className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                      <p className="text-slate-500">没有找到匹配的结果</p>
                      <p className="text-xs text-slate-600 mt-1">试试其他关键词</p>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      {results.map((item, idx) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                            selectedIndex === idx
                              ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30'
                              : 'hover:bg-slate-700/30'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            selectedIndex === idx
                              ? 'bg-gradient-to-br from-blue-500 to-violet-600 text-white'
                              : 'bg-slate-700/50 text-slate-400'
                          }`}>
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {item.description}
                            </div>
                          </div>
                          {selectedIndex === idx && (
                            <div className="flex items-center gap-1 text-xs text-blue-400">
                              <span>选择</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className={`px-1.5 py-0.5 rounded-md ${
                              item.type === 'assessment'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : item.type === 'action'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {item.type === 'assessment' ? '测评' : item.type === 'action' ? '操作' : '页面'}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-4 py-2.5 border-t border-slate-700/50 bg-slate-900/50">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-4">
                      <span>↑↓ 导航</span>
                      <span>↵ 选择</span>
                      <span>esc 关闭</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{results.length} 个结果</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
