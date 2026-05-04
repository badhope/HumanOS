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
    <div className="pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">🔮 探索</h1>
        <p className="text-white/60">发现适合你的心理测评与工具</p>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <span className="text-violet-400 text-lg">🎯</span>
          </div>
          <div>
            <div className="font-medium">探索更多</div>
            <div className="text-xs text-white/40">持续更新中，发现更多精彩内容</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/40">
          <span className="px-2 py-1 rounded-full bg-white/5">📊 专业测评</span>
          <span className="px-2 py-1 rounded-full bg-white/5">📚 精选文章</span>
          <span className="px-2 py-1 rounded-full bg-white/5">👥 社区互动</span>
          <span className="px-2 py-1 rounded-full bg-white/5">🌱 个人成长</span>
        </div>
      </motion.div>
    </div>
  )
}
