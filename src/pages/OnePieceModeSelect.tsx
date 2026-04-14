import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Target, Users, Sparkles, Home, Crown, Swords, Skull, Anchor } from 'lucide-react'
import { cn } from '@utils/cn'

const modes = [
  {
    id: 'onepiece-character-match',
    name: '角色匹配测试',
    icon: Crown,
    color: 'from-rose-500 to-orange-500',
    bgColor: 'from-rose-500/20 to-orange-500/20',
    description: '测一测你是海贼王里的谁？',
    features: [
      '90道灵魂拷问题目',
      '27个经典角色全覆盖',
      '路飞、索隆、艾斯、老沙...',
      '行为风格深度匹配',
    ],
    timeMinutes: 15,
    questionCount: 90,
    featured: true,
  },
  {
    id: 'onepiece-bounty-professional',
    name: '悬赏金专业鉴定',
    icon: Skull,
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'from-amber-500/20 to-yellow-500/20',
    description: '传说海米专属认证',
    features: [
      '60道专业鉴定题目',
      '覆盖SBS/扉页/资料集/访谈',
      '动画组谎言揭露',
      '终局谜题终极探索',
    ],
    timeMinutes: 15,
    questionCount: 60,
    recommended: true,
  },
  {
    id: 'onepiece-devil-fruit',
    name: '恶魔果实鉴定',
    icon: Swords,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'from-violet-500/20 to-purple-500/20',
    description: '适合你的恶魔果实是什么？',
    features: [
      '50道深度鉴定题目',
      '42种果实全覆盖',
      '尼卡/不死鸟/手术果实',
      '含幻兽种等稀有分支',
    ],
    timeMinutes: 8,
    questionCount: 50,
  },
  {
    id: 'onepiece-crew-position',
    name: '草帽团船员定位',
    icon: Anchor,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    description: '加入草帽团你会担任什么职位？',
    features: [
      '40道岗位匹配题目',
      '25个船上职位全覆盖',
      '战斗/功能/精神/情报组',
      '每个人都有自己的位置',
    ],
    timeMinutes: 7,
    questionCount: 40,
  },
]

export default function OnePieceModeSelect() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            type="button"
          >
            <Home className="w-5 h-5" />
            返回主页
          </motion.button>
          <span className="text-white/30">|</span>
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
            返回上一页
          </motion.button>
        </motion.div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500/20 via-orange-500/20 to-amber-500/20 text-amber-300 text-sm font-medium mb-6 border border-amber-500/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <span className="mr-2">🏴‍☠️</span>
            伟大航路专属
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            海贼王测评专区
          </motion.h1>

          <motion.p
            className="text-white/60 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            伟大航路的勇者，你准备好了吗？
            <br />
            <span className="text-amber-400">总计240道题目，全网体量最大的海贼王测评</span>
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial="initial"
          animate="enter"
          variants={{
            enter: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {modes.map((mode) => {
            const Icon = mode.icon

            return (
              <motion.div
                key={mode.id}
                variants={{
                  initial: { opacity: 0, y: 40 },
                  enter: { opacity: 1, y: 0 },
                }}
                className={cn(
                  'relative rounded-3xl overflow-hidden cursor-pointer group',
                  mode.recommended && 'ring-2 ring-amber-500'
                )}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/confirm/${mode.id}`)}
              >
                {mode.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <motion.div
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                    >
                      <Users className="w-3 h-3" />
                      人气最高
                    </motion.div>
                  </div>
                )}

                {mode.recommended && (
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div
                      className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: 'spring' }}
                    >
                      <Sparkles className="w-3 h-3" />
                      推荐
                    </motion.div>
                  </div>
                )}

                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-95',
                  mode.color
                )} />

                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />

                <div className="relative p-6 flex flex-col h-full min-h-[22rem]">
                  <div className="mb-6">
                    <motion.div
                      className={cn(
                        'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4',
                        mode.bgColor
                      )}
                      whileHover={{ rotate: [0, -12, 12, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {mode.name}
                    </h3>

                    <p className="text-white/70 text-sm">
                      {mode.description}
                    </p>
                  </div>

                  <div className="flex-grow space-y-2.5 mb-6">
                    {mode.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2.5 text-white/85 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>约 {mode.timeMinutes} 分钟</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Target className="w-4 h-4" />
                      <span>{mode.questionCount} 道题目</span>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 rounded-xl bg-white/20 backdrop-blur-sm text-white text-center font-semibold group-hover:bg-white/30 transition-all group-hover:shadow-lg">
                    开始冒险 →
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="text-center text-white/40 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          我是要成为海贼王的男人！
        </motion.div>
      </div>
    </div>
  )
}
