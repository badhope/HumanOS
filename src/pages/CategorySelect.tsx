import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { usePageTransition } from '@components/animations/PageTransitionController'
import { assessments } from '@data/assessments'
import { cn } from '@utils/cn'

interface SubCategory {
  name: string
  gradient: string
  icon: React.ReactNode
  description: string
  color: string
}

interface CategoryGroup {
  id: string
  name: string
  gradient: string
  icon: React.ReactNode
  description: string
  color: string
  subCategories: SubCategory[]
}

const categoryGroups: CategoryGroup[] = [
  {
    id: 'self-awareness',
    name: '自我认知',
    gradient: 'from-violet-500 to-purple-600',
    icon: '🧠',
    description: '探索你的性格特质、认知模式与价值观',
    color: '#8b5cf6',
    subCategories: [
      {
        name: '人格心理',
        gradient: 'from-violet-500 to-purple-600',
        icon: <div className="w-5 h-5 flex items-center justify-center">🎭</div>,
        description: '探索你的性格特质与内心世界',
        color: '#8b5cf6',
      },
      {
        name: '认知能力',
        gradient: 'from-blue-500 to-cyan-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">📊</div>,
        description: '评估你的思维方式与智力潜能',
        color: '#0ea5e9',
      },
      {
        name: '价值观',
        gradient: 'from-indigo-500 to-violet-600',
        icon: <div className="w-5 h-5 flex items-center justify-center">🎨</div>,
        description: '绘制你的价值观与意识形态图谱',
        color: '#6366f1',
      },
    ],
  },
  {
    id: 'mental-health',
    name: '心理健康',
    gradient: 'from-pink-500 to-rose-500',
    icon: '💖',
    description: '关注你的心理状态与情绪健康',
    color: '#ec4899',
    subCategories: [
      {
        name: '情绪管理',
        gradient: 'from-pink-500 to-rose-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">❤️</div>,
        description: '了解你的情商水平与情绪调节能力',
        color: '#ec4899',
      },
      {
        name: '心理健康',
        gradient: 'from-red-500 to-pink-600',
        icon: <div className="w-5 h-5 flex items-center justify-center">🛡️</div>,
        description: '关注你的心理状态，守护心灵健康',
        color: '#ef4444',
      },
    ],
  },
  {
    id: 'career-social',
    name: '职业与社交',
    gradient: 'from-emerald-500 to-teal-500',
    icon: '💼',
    description: '规划职业生涯，提升社交能力',
    color: '#10b981',
    subCategories: [
      {
        name: '职业发展',
        gradient: 'from-emerald-500 to-teal-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">💼</div>,
        description: '发现你的职场优势与发展方向',
        color: '#10b981',
      },
      {
        name: '能力评估',
        gradient: 'from-cyan-500 to-blue-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">⚡</div>,
        description: '评估你的专业能力与综合素养',
        color: '#06b6d4',
      },
      {
        name: '人际关系',
        gradient: 'from-orange-500 to-amber-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">👥</div>,
        description: '分析你的社交风格与人际互动模式',
        color: '#f59e0b',
      },
    ],
  },
  {
    id: 'entertainment',
    name: '娱乐趣味',
    gradient: 'from-fuchsia-500 to-pink-500',
    icon: '🎮',
    description: '趣味测试，发现你的隐藏属性',
    color: '#d946ef',
    subCategories: [
      {
        name: '娱乐趣味',
        gradient: 'from-fuchsia-500 to-pink-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🎮</div>,
        description: '趣味测试，发现你的隐藏属性与专属标签',
        color: '#d946ef',
      },
    ],
  },
]

export default function CategorySelect() {
  const { navigateWithTransition } = usePageTransition()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const [expandedGroup, setExpandedGroup] = useState<string | null>('self-awareness')

  const toggleGroup = (groupId: string) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId)
  }

  const handleCategorySelect = (categoryName: string) => {
    navigateWithTransition(`/assessments?category=${encodeURIComponent(categoryName)}`, {
      loadingText: `正在进入 ${categoryName}...`,
    })
  }

  const handleBack = () => {
    navigateWithTransition('/', {
      loadingText: '正在返回...',
      duration: 1500,
    })
  }

  const getCategoryCount = (categoryName: string) => {
    return assessments.filter(a => a.category === categoryName).length
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          type="button"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          返回首页
        </motion.button>

        <motion.div
          ref={containerRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-white/70">AI 工具库</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-white">探索 </span>
            <span className="text-gradient">你的世界</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            选择分类，开启你的自我发现之旅
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {categoryGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6 + groupIndex * 0.1,
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
              }}
              className="rounded-2xl overflow-hidden"
            >
              <motion.button
                onClick={() => toggleGroup(group.id)}
                className={cn(
                  'w-full p-6 flex items-center justify-between text-left transition-all duration-300',
                  'bg-gradient-to-r border',
                  expandedGroup === group.id
                    ? `from-${group.color}30 to-${group.color}15 border-${group.color}50`
                    : 'from-white/5 to-white/2 border-white/10 hover:from-white/10 hover:to-white/5'
                )}
                style={{
                  background: expandedGroup === group.id
                    ? `linear-gradient(135deg, ${group.color}30 0%, ${group.color}15 100%)`
                    : undefined,
                  borderColor: expandedGroup === group.id ? `${group.color}50` : undefined,
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${group.color}40, ${group.color}20)`,
                    }}
                    animate={expandedGroup === group.id ? {
                      scale: [1, 1.05, 1],
                      rotate: [0, 3, -3, 0],
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {group.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {group.name}
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium glass text-white/60">
                        {group.subCategories.reduce((sum, sub) => sum + getCategoryCount(sub.name), 0)} 项测评
                      </span>
                    </h3>
                    <p className="text-sm text-white/50 mt-1">{group.description}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedGroup === group.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/40"
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedGroup === group.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-black/20">
                      {group.subCategories.map((subCategory, subIndex) => {
                        const count = getCategoryCount(subCategory.name)
                        if (count === 0) return null

                        return (
                          <motion.div
                            key={subCategory.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                            onClick={() => handleCategorySelect(subCategory.name)}
                            className="group p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 bg-white/5 border border-white/5 hover:border-white/15"
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{
                                  background: `linear-gradient(135deg, ${subCategory.color}40, ${subCategory.color}20)`,
                                }}
                              >
                                {subCategory.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold text-white group-hover:text-gradient transition-all">
                                  {subCategory.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs text-white/40">
                                    {count} 项测评
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-white/40 mt-2 ml-13">
                              {subCategory.description}
                            </p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="text-white/40 text-sm">
            共 {assessments.length} 项专业测评 · 持续更新中
          </p>
        </motion.div>
      </div>
    </div>
  )
}
