import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal, X } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface TabItem {
  id: string
  name: string
  icon: LucideIcon
  color: string
}

interface TabSliderProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function TabSlider({ tabs, activeTab, onTabChange }: TabSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [moreMenuPosition, setMoreMenuPosition] = useState({ x: 0, y: 0 })

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [tabs])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const visibleTabs = tabs.slice(0, 5)
  const hiddenTabs = tabs.slice(5)

  const handleMoreClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMoreMenuPosition({ x: rect.left, y: rect.bottom + 8 })
    setShowMoreMenu(!showMoreMenu)
  }

  const handleTabSelect = (tabId: string) => {
    onTabChange(tabId)
    setShowMoreMenu(false)
  }

  return (
    <div className="relative mb-6">
      {showLeftArrow && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-900/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-slate-800/90 transition-all shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={18} />
        </motion.button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {visibleTabs.map((tab, index) => {
          const isActive = activeTab === tab.id
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap min-w-max ${
                isActive
                  ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.08, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              layoutId={`tab-${tab.id}`}
            >
              <tab.icon size={20} className={isActive ? 'drop-shadow-md' : ''} />
              <span className="text-sm font-medium">{tab.name}</span>
            </motion.button>
          )
        })}

        {hiddenTabs.length > 0 && (
          <motion.button
            key="more"
            onClick={handleMoreClick}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5 min-w-max"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: visibleTabs.length * 0.08, type: 'spring', stiffness: 300 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <MoreHorizontal size={20} />
            <span className="text-sm font-medium">更多</span>
          </motion.button>
        )}
      </div>

      {showRightArrow && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-slate-900/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-slate-800/90 transition-all shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={18} />
        </motion.button>
      )}

      <AnimatePresence>
        {showMoreMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoreMenu(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="fixed z-50 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 min-w-[200px]"
              style={{ 
                left: moreMenuPosition.x, 
                top: moreMenuPosition.y,
                maxHeight: '40vh',
                overflowY: 'auto'
              }}
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
                <span className="text-sm font-medium text-white/90">更多选项</span>
                <button 
                  onClick={() => setShowMoreMenu(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              {hiddenTabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => handleTabSelect(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-violet-500/20 text-violet-400'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    <tab.icon size={18} />
                    <span className="text-sm font-medium">{tab.name}</span>
                    {isActive && (
                      <motion.div 
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
