import { motion } from 'framer-motion'
import { ChevronRight, ChevronDown, LucideIcon } from 'lucide-react'
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
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  return (
    <motion.div
      layout
      className={`rounded-xl border ${borderColor} overflow-hidden`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.div
        layout
        onClick={toggleExpand}
        className={`p-3 sm:p-4 bg-gradient-to-r ${bgGradient} cursor-pointer flex items-center justify-between`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0`}>
            <Icon size={16} className={`sm:${color}`} style={{ color: 'currentcolor' }} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-semibold text-white truncate">{name}</h3>
            <p className="text-[10px] sm:text-xs text-white/40">{subcategories.length} 个子分类</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown size={18} className="text-white/50" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-1.5 sm:p-2 space-y-1.5 sm:space-y-2">
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
  const [isExpanded, setIsExpanded] = useState(false)
  const SubIcon = subcategory.icon

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  return (
    <motion.div
      className="bg-white/5 rounded-lg overflow-hidden"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <motion.div
        onClick={toggleExpand}
        className="p-2.5 sm:p-3 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <SubIcon size={14} className="text-white/60 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-white/90 truncate">{subcategory.name}</span>
          <span className="text-[10px] sm:text-xs text-white/30 flex-shrink-0">{subcategory.items.length} 项</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-1"
        >
          <ChevronRight size={14} className="text-white/40" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="overflow-hidden"
      >
        <div className="px-1.5 pb-1.5 sm:px-2 sm:pb-2 grid grid-cols-1 xs:grid-cols-2 gap-1.5 sm:gap-2">
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
      className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/0 
        border border-white/5 hover:border-violet-500/30 
        hover:bg-violet-500/10 cursor-pointer transition-all group`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-start gap-2">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
          <ItemIcon size={14} className="text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm font-medium text-white truncate">{item.title}</span>
            {item.badge && (
              <span className={`px-1 py-0.5 rounded text-[9px] sm:text-[10px] font-medium shrink-0
                ${item.badge === '热门' ? 'bg-red-500/20 text-red-400' : ''}
                ${item.badge === '推荐' ? 'bg-violet-500/20 text-violet-400' : ''}
                ${item.badge === '专业' ? 'bg-blue-500/20 text-blue-400' : ''}
                ${item.badge === '趣味' ? 'bg-amber-500/20 text-amber-400' : ''}
              `}>
                {item.badge}
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-[10px] sm:text-xs text-white/40 truncate mt-0.5">{item.description}</p>
          )}
        </div>
        <motion.div
          className="text-white/30 group-hover:text-violet-400 transition-colors shrink-0"
          animate={{ x: item.path ? [0, 2, 0] : 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronRight size={12} />
        </motion.div>
      </div>
    </motion.div>
  )
})

export { CategoryCard, SubcategoryCard, ItemCard }
export default CategoryCard
