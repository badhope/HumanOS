import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { CategoryCard } from '../../components/DiscoverCard'
import { TabSlider } from '../../components/TabSlider'
import { discoverCategories } from '../../data/discoverData'

export default function Discover() {
  const [activeCategory, setActiveCategory] = useState<string>(discoverCategories[0].id)

  const tabs = discoverCategories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    color: cat.color
  }))

  const activeCategoryData = discoverCategories.find(cat => cat.id === activeCategory)

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-1">🔮 探索</h1>
        <p className="text-xs sm:text-sm text-white/60">发现适合你的心理测评</p>
      </motion.div>

      <TabSlider 
        tabs={tabs}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      <AnimatePresence mode="wait">
        {activeCategoryData && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <CategoryCard
              name={activeCategoryData.name}
              icon={activeCategoryData.icon}
              color={activeCategoryData.color}
              bgGradient={activeCategoryData.bgGradient}
              borderColor={activeCategoryData.borderColor}
              subcategories={activeCategoryData.subcategories}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm sm:text-base">🎯</span>
          </div>
          <div className="min-w-0">
            <div className="text-sm sm:text-base font-medium truncate">探索更多</div>
            <div className="text-[10px] sm:text-xs text-white/40">持续更新中</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <span className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-white/5">📊 专业测评</span>
          <span className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-white/5">📚 精选文章</span>
          <span className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-white/5">👥 社区互动</span>
          <span className="px-2 py-1 text-[10px] sm:text-xs rounded-full bg-white/5">🌱 个人成长</span>
        </div>
      </motion.div>
    </div>
  )
}
