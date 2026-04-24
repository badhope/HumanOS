import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { Home, Play, BookOpen, Scroll, Sparkles, ChevronRight, Sword, Zap, Heart, Clock, Trophy } from 'lucide-react'
import { GlowCard } from '@components/animations'

const realmsOverview = [
  { name: '炼气', realms: 12, icon: '🌬️' },
  { name: '筑基', realms: 9, icon: '🏔️' },
  { name: '金丹', realms: 6, icon: '💎' },
  { name: '元婴', realms: 6, icon: '👶' },
  { name: '化神', realms: 6, icon: '⚡' },
  { name: '炼虚', realms: 6, icon: '🌫️' },
  { name: '合体', realms: 6, icon: '🧘' },
  { name: '大乘', realms: 6, icon: '🌟' },
  { name: '渡劫/飞升', realms: 6, icon: '⚔️' },
]

const features = [
  {
    id: 'realm',
    title: '63个完整境界',
    description: '炼气期到渡劫飞升，每一个境界都有独特的修炼体验',
    icon: Sparkles,
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'tribulation',
    title: '天劫系统',
    description: '四九天劫、六九天劫、九九天劫，渡不过便身死道消',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'alchemy',
    title: '炼丹炼器',
    description: '上百种丹药、法器配方，亲手炼制仙器级宝物',
    icon: Scroll,
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 'combat',
    title: '功法战斗',
    description: '正邪功法自由选择，搭配出独特的战斗风格',
    icon: Sword,
    color: 'from-rose-500 to-red-500',
  },
]

const startingOrigins = [
  {
    id: 'mortal',
    title: '凡尘布衣',
    description: '出生于普通人家，没有任何背景。只有一颗向道之心。',
    bonus: '+10% 悟性',
    difficulty: '入门',
    difficultyColor: 'text-green-400',
  },
  {
    id: 'clan',
    title: '修真世家',
    description: '出生于修仙家族，自幼接受熏陶，资源充足但束缚也多。',
    bonus: '+50 初始灵石',
    difficulty: '进阶',
    difficultyColor: 'text-yellow-400',
  },
  {
    id: 'sect',
    title: '门派弟子',
    description: '名门正派的内门弟子，有完整的功法传承和师长指点。',
    bonus: '+1 稀有功法',
    difficulty: '困难',
    difficultyColor: 'text-orange-400',
  },
  {
    id: 'demon',
    title: '魔门散修',
    description: '亦正亦邪，功法霸道但遭正道追杀，危机与机缘并存。',
    bonus: '+20% 修炼速度',
    difficulty: '专家',
    difficultyColor: 'text-red-400',
  },
]

export default function XianxiaDashboard() {
  const { navigate } = useTransitionNavigate()
  const [selectedOrigin, setSelectedOrigin] = useState('mortal')
  const [spiritualRoot, setSpiritualRoot] = useState<string | null>(null)

  useEffect(() => {
    const roots = ['金灵根', '木灵根', '水灵根', '火灵根', '土灵根', '变异灵根']
    const weights = [18, 18, 18, 18, 18, 10]
    const total = weights.reduce((a, b) => a + b, 0)
    let random = Math.random() * total
    for (let i = 0; i < roots.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        setSpiritualRoot(roots[i])
        break
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.15),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <button
            onClick={() => navigate('/world')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            返回世界选择
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 mb-8"
          >
            <span className="text-3xl">☯️</span>
            <span className="text-purple-300 font-bold">修仙大世界</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            凡人逆天证道
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            这是一条漫漫不归路。
            <br />
            有人一朝悟道，飞升成仙。
            <br />
            有人身死道消，化为黄土一抔。
          </p>

          {spiritualRoot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300">天生灵根：</span>
              <span className="text-white font-bold">{spiritualRoot}</span>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <GlowCard className="p-5 text-center h-full">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </GlowCard>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            选择出身
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {startingOrigins.map((origin, index) => (
            <motion.div
              key={origin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedOrigin(origin.id)}
              className={`cursor-pointer transition-all ${
                selectedOrigin === origin.id ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-900 rounded-2xl' : ''
              }`}
            >
              <GlowCard className={`p-5 h-full ${selectedOrigin === origin.id ? 'bg-purple-500/10' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-sm font-medium ${origin.difficultyColor}`}>
                    {origin.difficulty}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{origin.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{origin.description}</p>
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <Heart className="w-4 h-4" />
                  <span>{origin.bonus}</span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            完整境界体系
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {realmsOverview.map((realm, index) => (
              <motion.div
                key={realm.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                <span className="text-xl">{realm.icon}</span>
                <span className="text-white font-medium">{realm.name}</span>
                <span className="text-slate-500 text-sm">×{realm.realms}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/simulation/xianxia/game')}
            className="px-12 py-5 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white text-xl font-bold rounded-2xl shadow-2xl shadow-purple-500/25 flex items-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6" />
            开始修仙
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <p className="mt-6 text-slate-500 text-sm">
            💡 提示：修仙无岁月，一局可能需要现实时间 30 分钟以上
          </p>
        </motion.div>
      </div>
    </div>
  )
}
