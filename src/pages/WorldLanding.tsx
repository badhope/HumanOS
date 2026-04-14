import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { Globe, Clock, Award, Users, ArrowRight, Home } from 'lucide-react'
import { GlowCard } from '@components/animations'

const categoryData = [
  {
    id: 'historical',
    title: '历史决策剧场',
    subtitle: '改写人类的关键节点',
    description: '置身于历史的十字路口，做出你的选择。法国大革命、辛亥革命、冷战...每一个决策都将改变历史的走向。',
    icon: '⚔️',
    color: 'from-emerald-500 to-teal-500',
    scenarios: 1,
    comingSoon: 3,
  },
  {
    id: 'life',
    title: '人生模拟器',
    subtitle: '重活一次的可能性',
    description: '从呱呱坠地到垂垂老矣，体验完全不同的人生。高考志愿、职业选择、婚姻家庭...每一步都通向不同的命运。',
    icon: '🎭',
    color: 'from-rose-500 to-pink-500',
    scenarios: 1,
    comingSoon: 2,
  },
  {
    id: 'civilization',
    title: '文明缔造者',
    subtitle: '从部落到星际帝国',
    description: '设计制度、制定法律、引领科技。你的文明将长存于世，还是化为尘土？',
    icon: '🏛️',
    color: 'from-amber-500 to-orange-500',
    scenarios: 0,
    comingSoon: 1,
  },
  {
    id: 'social-experiment',
    title: '社会实验场',
    subtitle: '思想的实验室',
    description: '设计一套社会规则，观察模拟社会如何演化。平等还是自由？计划还是市场？',
    icon: '🧬',
    color: 'from-blue-500 to-cyan-500',
    scenarios: 0,
    comingSoon: 1,
  },
]

const stats = [
  { icon: Globe, label: '平行宇宙', value: '4+' },
  { icon: Clock, label: '平均时长', value: '15分钟' },
  { icon: Award, label: '结局数量', value: '13+' },
  { icon: Users, label: '历史人物', value: '20+' },
]

export default function WorldLanding() {
  const { navigate } = useTransitionNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
              返回首页
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 mb-8"
            >
              <span className="text-3xl">🌍</span>
              <span className="text-violet-300 font-bold">平行宇宙系列</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              模拟世界
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              这不是测评。
              <br />
              这是一次穿越时空的旅程。
              <br />
              <span className="text-violet-400">你的每一个选择，都定义着真实的你。</span>
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/world/hall')}
              className="px-10 py-5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white text-xl font-bold rounded-2xl shadow-2xl shadow-violet-500/25 flex items-center gap-3 mx-auto"
            >
              进入世界大厅
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {categoryData.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => {
                  if (category.scenarios > 0) {
                    navigate(`/world/hall?category=${category.id}`)
                  }
                }}
                className={`group relative cursor-pointer ${
                  category.scenarios === 0 ? 'opacity-60' : ''
                }`}
              >
                <GlowCard className="p-6 h-full">
                  <div
                    className={`absolute top-4 right-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                  />

                  <div className="relative">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {category.title}
                    </h3>
                    <p className={`text-sm font-medium mb-3 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.subtitle}
                    </p>
                    <p className="text-slate-400 text-sm mb-4">
                      {category.description}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-lg bg-violet-500/20 text-violet-300 text-sm">
                        {category.scenarios} 个可用
                      </span>
                      {category.comingSoon > 0 && (
                        <span className="px-3 py-1 rounded-lg bg-slate-700 text-slate-400 text-sm">
                          {category.comingSoon} 个即将上线
                        </span>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 text-center"
          >
            <p className="text-slate-500 text-sm">
              💡 提示：全程没有"正确答案"，只有你的选择。
              <br />
              就像真实的人生一样。
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
