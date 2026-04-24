import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { usePageTransition } from '@components/animations/PageTransitionController'
import ParticleBackground from '@components/ParticleBackground'
import { assessments, getSubcategoriesByCategory } from '@data/assessments'
import { cn } from '@utils/cn'

interface SubCategory {
  name: string
  gradient: string
  icon: React.ReactNode
  description: string
  color: string
  count: number
}

interface CategoryGroup {
  id: string
  name: string
  gradient: string
  icon: string
  description: string
  color: string
  subCategories: SubCategory[]
}

const categoryGroups: CategoryGroup[] = [
  {
    id: 'self-cognition',
    name: '自我认知',
    gradient: 'from-violet-500 to-purple-600',
    icon: '🧠',
    description: '探索你的性格特质、情绪能力与认知水平',
    color: '#8b5cf6',
    subCategories: [
      {
        name: '特质论人格',
        gradient: 'from-violet-500 to-purple-600',
        icon: <div className="w-5 h-5 flex items-center justify-center">🌊</div>,
        description: '大五人格等经典特质理论测评',
        color: '#8b5cf6',
        count: 1,
      },
      {
        name: '黑暗三角',
        gradient: 'from-slate-600 to-slate-800',
        icon: <div className="w-5 h-5 flex items-center justify-center">🌑</div>,
        description: '马基雅维利主义、自恋、精神病态',
        color: '#475569',
        count: 1,
      },
      {
        name: '互联网人格',
        gradient: 'from-fuchsia-500 to-pink-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">😂</div>,
        description: '当代互联网特色人格测试',
        color: '#d946ef',
        count: 1,
      },
      {
        name: '心智成熟度',
        gradient: 'from-amber-500 to-orange-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🧘</div>,
        description: '测试你的心理年龄与成熟程度',
        color: '#f59e0b',
        count: 1,
      },
      {
        name: '情绪能力',
        gradient: 'from-pink-500 to-rose-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">❤️</div>,
        description: '戈尔曼情绪智力五维测评',
        color: '#ec4899',
        count: 1,
      },
      {
        name: '焦虑水平',
        gradient: 'from-red-500 to-orange-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">⚡</div>,
        description: 'SAS标准化焦虑水平测评',
        color: '#ef4444',
        count: 1,
      },
      {
        name: '流体智力',
        gradient: 'from-blue-500 to-cyan-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🧮</div>,
        description: '瑞文标准智力测验',
        color: '#3b82f6',
        count: 1,
      },
    ],
  },
  {
    id: 'ideology',
    name: '意识形态',
    gradient: 'from-indigo-500 to-violet-600',
    icon: '🏛️',
    description: '哲学、政治、文化认同与精神世界',
    color: '#6366f1',
    subCategories: [
      {
        name: '政治坐标',
        gradient: 'from-indigo-500 to-violet-600',
        icon: <div className="w-5 h-5 flex items-center justify-center">🎯</div>,
        description: '意识形态九方阵专业测试',
        color: '#6366f1',
        count: 1,
      },
      {
        name: '国家认同',
        gradient: 'from-red-600 to-rose-600',
        icon: <div className="w-5 h-5 flex items-center justify-center">🇨🇳</div>,
        description: '爱国纯度灵魂拷问',
        color: '#dc2626',
        count: 1,
      },
      {
        name: '哲学立场',
        gradient: 'from-purple-600 to-violet-700',
        icon: <div className="w-5 h-5 flex items-center justify-center">🏛️</div>,
        description: '当代哲学光谱精准定位',
        color: '#7c3aed',
        count: 1,
      },
      {
        name: '精神分析',
        gradient: 'from-slate-700 to-zinc-800',
        icon: <div className="w-5 h-5 flex items-center justify-center">🔮</div>,
        description: '拉康精神分析临床诊断',
        color: '#334155',
        count: 1,
      },
      {
        name: '存在主义',
        gradient: 'from-stone-600 to-neutral-700',
        icon: <div className="w-5 h-5 flex items-center justify-center">🌌</div>,
        description: '人生意义深度拷问',
        color: '#57534e',
        count: 1,
      },
      {
        name: '潜意识',
        gradient: 'from-teal-500 to-cyan-600',
        icon: <div className="w-5 h-5 flex items-center justify-center">🎨</div>,
        description: '色彩投射潜意识测试',
        color: '#14b8a6',
        count: 1,
      },
    ],
  },
  {
    id: 'career',
    name: '职业发展',
    gradient: 'from-emerald-500 to-teal-500',
    icon: '💼',
    description: '职业兴趣、职场生态与企业文化',
    color: '#10b981',
    subCategories: [
      {
        name: '职业兴趣',
        gradient: 'from-emerald-500 to-teal-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🔍</div>,
        description: '霍兰德SDS职业兴趣测评',
        color: '#10b981',
        count: 1,
      },
      {
        name: '职业耗竭',
        gradient: 'from-orange-500 to-amber-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🔥</div>,
        description: 'MBI职业倦怠标准化测评',
        color: '#f59e0b',
        count: 1,
      },
      {
        name: '企业文化',
        gradient: 'from-rose-500 to-pink-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🙏</div>,
        description: '福报指数与职场PUA耐受度',
        color: '#f43f5e',
        count: 1,
      },
      {
        name: '职场行为',
        gradient: 'from-cyan-500 to-blue-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🐟</div>,
        description: '打工人摸鱼纯度测试',
        color: '#06b6d4',
        count: 1,
      },
      {
        name: '权力适应',
        gradient: 'from-stone-600 to-amber-700',
        icon: <div className="w-5 h-5 flex items-center justify-center">👔</div>,
        description: 'D.R.E.A.M官场人格测评',
        color: '#78716c',
        count: 1,
      },
    ],
  },
  {
    id: 'social',
    name: '社交关系',
    gradient: 'from-amber-500 to-orange-500',
    icon: '👥',
    description: '社会智力、依恋风格与人情世故',
    color: '#f59e0b',
    subCategories: [
      {
        name: '社会智力',
        gradient: 'from-amber-500 to-yellow-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🎭</div>,
        description: 'G.M.A人情世故成熟度',
        color: '#eab308',
        count: 1,
      },
      {
        name: '依恋风格',
        gradient: 'from-rose-500 to-pink-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">💕</div>,
        description: 'ECR成人依恋风格标准化量表',
        color: '#f43f5e',
        count: 1,
      },
      {
        name: '恋爱模式',
        gradient: 'from-pink-400 to-fuchsia-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🐱</div>,
        description: 'ABM恋爱动物人格测试',
        color: '#f472b6',
        count: 1,
      },
      {
        name: '亲子关系',
        gradient: 'from-amber-500 to-orange-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">👨‍👩‍👧</div>,
        description: 'C.A.S.T中国式家长教养方式',
        color: '#f59e0b',
        count: 1,
      },
      {
        name: '反操纵能力',
        gradient: 'from-slate-600 to-zinc-700',
        icon: <div className="w-5 h-5 flex items-center justify-center">🛡️</div>,
        description: 'PUA耐受度S.H.I.E.L.D测评',
        color: '#4f46e5',
        count: 1,
      },
    ],
  },
  {
    id: 'mental-health',
    name: '心理健康',
    gradient: 'from-red-500 to-pink-600',
    icon: '💚',
    description: '焦虑、抑郁、压力与心理状态评估',
    color: '#ef4444',
    subCategories: [],
  },
  {
    id: 'entertainment',
    name: '娱乐趣味',
    gradient: 'from-fuchsia-500 to-pink-500',
    icon: '🎮',
    description: 'ACG、饮食、数字生活与休闲娱乐',
    color: '#d946ef',
    subCategories: [
      {
        name: '动漫同人',
        gradient: 'from-blue-500 to-cyan-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🏴‍☠️</div>,
        description: '海贼王赏金专业测评',
        color: '#3b82f6',
        count: 1,
      },
      {
        name: '饮食文化',
        gradient: 'from-orange-500 to-amber-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🍚</div>,
        description: '干饭人等级认证测试',
        color: '#f59e0b',
        count: 1,
      },
      {
        name: '数字生活',
        gradient: 'from-violet-500 to-purple-600',
        icon: <div className="w-5 h-5 flex items-center justify-center">🌐</div>,
        description: '网瘾程度深度测评',
        color: '#8b5cf6',
        count: 1,
      },
      {
        name: '亲密探索',
        gradient: 'from-pink-500 to-rose-500',
        icon: <div className="w-5 h-5 flex items-center justify-center">🔥</div>,
        description: '性经验指数老司机认证',
        color: '#ec4899',
        count: 1,
      },
    ],
  },
]

export default function CategorySelect() {
  const { navigateWithTransition } = usePageTransition()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const [expandedGroup, setExpandedGroup] = useState<string | null>('self-cognition')

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
      loadingText: '返回首页...',
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground variant="stars" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回首页</span>
        </motion.button>

        <motion.div
          ref={containerRef}
          initial="initial"
          animate={isInView ? 'enter' : 'initial'}
          variants={{
            initial: { opacity: 0 },
            enter: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="space-y-4"
        >
          <motion.div
            variants={{
              initial: { opacity: 0, y: 20 },
              enter: { opacity: 1, y: 0 },
            }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              选择测评分类
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              5大领域 × 27个精细化分类，全面探索你的每一个维度
            </p>
          </motion.div>

          {categoryGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              variants={{
                initial: { opacity: 0, y: 20 },
                enter: { opacity: 1, y: 0 },
              }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <motion.button
                onClick={() => toggleGroup(group.id)}
                className={cn(
                  'w-full flex items-center justify-between p-6 rounded-2xl glass border transition-all duration-300',
                  expandedGroup === group.id
                    ? `bg-gradient-to-r ${group.gradient} border-transparent shadow-lg`
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                )}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{group.icon}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">
                      {group.name}
                    </h3>
                    <p className={cn(
                      'text-sm',
                      expandedGroup === group.id ? 'text-white/80' : 'text-white/50'
                    )}>
                      {group.description} · {group.subCategories.length} 个子类
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-1">
                    {group.subCategories.slice(0, 4).map((sub, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                        title={sub.name}
                      >
                        {sub.icon}
                      </div>
                    ))}
                    {group.subCategories.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60">
                        +{group.subCategories.length - 4}
                      </div>
                    )}
                  </div>
                  {expandedGroup === group.id ? (
                    <ChevronUp className="w-5 h-5 text-white/70" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  )}
                </div>
              </motion.button>

              {expandedGroup === group.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ml-8">
                    {group.subCategories.map((sub, subIndex) => (
                      <motion.button
                        key={sub.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: subIndex * 0.05 }}
                        onClick={() => handleCategorySelect(sub.name)}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={cn(
                          'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center',
                          sub.gradient
                        )}>
                          {sub.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                            {sub.name}
                          </h4>
                          <p className="text-xs text-white/50">
                            {sub.description}
                          </p>
                        </div>
                        <Sparkles className="w-4 h-4 text-white/20 group-hover:text-amber-400 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
