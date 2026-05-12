import { motion } from 'framer-motion'
import { ChevronRight, ChevronDown, LucideIcon, Sparkles, Clock, Target } from 'lucide-react'
import { useState, useCallback, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiscoverItem, DiscoverSubcategory } from '../data/discoverData'

interface CategoryCardProps {
  name: string
  icon: LucideIcon
  color: string
  bgGradient: string
  borderColor: string
  subcategories: DiscoverSubcategory[]
}

const CategoryCard = memo(function CategoryCard({ name, icon: Icon, color, bgGradient, borderColor, subcategories }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  return (
    <motion.div
      layout
      className={`rounded-2xl border-2 ${borderColor} overflow-hidden shadow-xl shadow-black/20`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <motion.div
        layout
        onClick={toggleExpand}
        className={`p-4 sm:p-5 bg-gradient-to-r ${bgGradient} cursor-pointer flex items-center justify-between relative overflow-hidden`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="flex items-center gap-3 sm:gap-4 relative z-10 min-w-0">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/20`}>
            <Icon size={24} className="text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white truncate flex items-center gap-2">
              {name}
              <Sparkles size={16} className="text-amber-300" />
            </h3>
            <p className="text-xs sm:text-sm text-white/60">
              {name.includes('测评') ? `${subcategories.length} 个子分类 · 探索更多测评` :
               name.includes('图书馆') ? `${subcategories.length} 个子分类 · 丰富知识储备` :
               name.includes('社区') ? `${subcategories.length} 个子分类 · 与他人互动` :
               name.includes('成长') ? `${subcategories.length} 个子分类 · 见证自我蜕变` :
               `${subcategories.length} 个子分类`}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-3 relative z-10"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ChevronDown size={20} className="text-white/80" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-3 sm:p-4 space-y-3">
          {subcategories.map((subcat, index) => (
            <SubcategoryCard
              key={subcat.id}
              subcategory={subcat}
              delay={index * 0.05}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
})

interface SubcategoryCardProps {
  subcategory: DiscoverSubcategory
  delay: number
}

const SubcategoryCard = memo(function SubcategoryCard({ subcategory, delay }: SubcategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const SubIcon = subcategory.icon
  const navigate = useNavigate()

  const handleHeaderClick = useCallback(() => {
    if (subcategory.path) {
      navigate(subcategory.path)
    } else {
      setIsExpanded(prev => !prev)
    }
  }, [navigate, subcategory.path])

  return (
    <motion.div
      className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl border border-white/10 overflow-hidden"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <motion.div
        onClick={handleHeaderClick}
        className="p-3 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
            <SubIcon size={20} className="text-violet-400" />
          </div>
          <div className="min-w-0">
            <span className="text-base font-semibold text-white truncate">{subcategory.name}</span>
            <p className="text-xs text-white/40 mt-0.5">
              {subcategory.items[0]?.questionCount ? `${subcategory.items.length} 个测评` : `${subcategory.items.length} 个项目`}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <ChevronRight size={16} className="text-white/60" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="px-2 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {subcategory.items.map((item, index) => (
            <ItemCard
              key={item.id}
              item={item}
              delay={index * 0.03}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
})

interface ItemCardProps {
  item: DiscoverItem
  delay: number
}

const ItemCard = memo(function ItemCard({ item, delay }: ItemCardProps) {
  const navigate = useNavigate()
  const ItemIcon = item.icon

  const handleClick = useCallback(() => {
    if (item.path) {
      navigate(item.path)
    }
  }, [navigate, item.path])

  return (
    <motion.div
      onClick={handleClick}
      className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/8 to-white/2 
        border border-white/10 hover:border-violet-500/40 
        hover:bg-gradient-to-br hover:from-violet-500/20 hover:to-pink-500/10 
        cursor-pointer transition-all duration-300 group`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/30 to-pink-500/30 flex items-center justify-center shrink-0 border border-violet-500/20 group-hover:scale-110 transition-transform">
          <ItemIcon size={20} className="text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
            {item.badge && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0
                ${item.badge === '热门' ? 'bg-red-500/30 text-red-400' : ''}
                ${item.badge === '推荐' ? 'bg-violet-500/30 text-violet-400' : ''}
                ${item.badge === '专业' ? 'bg-blue-500/30 text-blue-400' : ''}
                ${item.badge === '趣味' ? 'bg-amber-500/30 text-amber-400' : ''}
              `}>
                {item.badge}
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">{item.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2">
            {item.questionCount && (
              <span className="flex items-center gap-1 text-[10px] text-white/40">
                <Target size={10} />
                {item.questionCount}题
              </span>
            )}
            {item.duration && (
              <span className="flex items-center gap-1 text-[10px] text-white/40">
                <Clock size={10} />
                {item.duration}分钟
              </span>
            )}
          </div>
        </div>
        <motion.div
          className="text-white/30 group-hover:text-violet-400 transition-colors shrink-0 mt-1"
          animate={{ x: item.path ? [0, 3, 0] : 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronRight size={18} />
        </motion.div>
      </div>
    </motion.div>
  )
})

export { CategoryCard, SubcategoryCard, ItemCard }
export default CategoryCard