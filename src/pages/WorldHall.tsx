import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import {
  ArrowLeft,
  Clock,
  Award,
  Globe,
  Users,
  Play,
} from 'lucide-react'
import { GlowCard } from '@components/animations'

const allWorlds = [
  {
    id: 'country-sim',
    title: '国家治理模拟器',
    subtitle: '掌舵一个国家的命运',
    description: '从7个真实国家中选择，掌舵国家的命运。GDP、通胀、失业、债务...每一项政策都牵一发而动全身。完整的经济模拟系统、随机事件库、国策树系统。',
    icon: '🏛️',
    color: 'from-blue-500 to-indigo-500',
    route: '/simulation/country',
    status: '🔥 已开放',
    difficulty: '困难',
    duration: '60分钟+',
    features: ['7个真实国家', '随机事件', '政策树', '完整经济系统'],
    featured: true,
  },
  {
    id: 'xianxia',
    title: '修仙大世界',
    subtitle: '凡人逆天证道之路',
    description: '从炼气期开始，一步步踏上修仙之路。炼丹炼器、突破境界、渡劫飞升、建立门派。63个完整境界，完整的buff系统，随机机缘奇遇。',
    icon: '☯️',
    color: 'from-purple-500 to-violet-500',
    route: '/simulation/xianxia',
    status: '✨ 已开放',
    difficulty: '专家',
    duration: '45分钟+',
    features: ['63个境界', '炼丹炼器', '渡劫系统', '宗门系统'],
    featured: true,
  },
  {
    id: 'french-revolution',
    title: '法国大革命：1789',
    subtitle: '自由与死亡的十字路口',
    description: '1789年的巴黎，空气中弥漫着革命的气息。作为第三等级代表，你将如何在历史的漩涡中做出选择？',
    icon: '⚔️',
    color: 'from-emerald-500 to-teal-500',
    route: '/world/play/french-revolution-1789',
    status: '✅ 已开放',
    difficulty: '进阶',
    duration: '15分钟',
    features: ['8个决策点', '5种结局', '历史剧情'],
    featured: false,
  },
  {
    id: 'modern-china-life',
    title: '当代青年人生模拟',
    subtitle: '一个普通人的四十年',
    description: '出生在改革开放后的中国，你将经历高考、大学、就业、婚姻、育儿。每一个选择都通向不同的人生。',
    icon: '🎭',
    color: 'from-rose-500 to-pink-500',
    route: '/world/play/modern-china-life',
    status: '✅ 已开放',
    difficulty: '入门',
    duration: '10分钟',
    features: ['人生选择', '多结局'],
    featured: false,
  },
]

const stats = [
  { icon: Globe, label: '可用世界', value: '4' },
  { icon: Clock, label: '平均时长', value: '15-60分钟' },
  { icon: Award, label: '结局数量', value: '26+' },
  { icon: Users, label: '决策点', value: '2000+' },
]

const difficultyColors: Record<string, string> = {
  '入门': 'text-green-400',
  '进阶': 'text-yellow-400',
  '困难': 'text-orange-400',
  '专家': 'text-red-400',
}

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

export default function WorldHall() {
  const { navigate } = useTransitionNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              返回首页
            </button>

            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 mb-6"
              >
                <span className="text-3xl">🌍</span>
                <span className="text-violet-300 font-bold">平行宇宙系列</span>
              </motion.div>

              <h1 className="text-4xl font-bold text-white mb-4">
                模拟世界大厅
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                选择一个世界，开始你的旅程。
                <br />
                <span className="text-violet-400">你的每一个选择，都定义着真实的你。</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-4"
                >
                  <GlowCard className="p-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-slate-500 text-sm">{stat.label}</div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🌟 选择你的世界
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {allWorlds.map((world, index) => (
              <motion.div
                key={world.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => navigate(world.route)}
                className="group relative cursor-pointer"
              >
                <GlowCard className={`p-6 h-full ${world.featured ? 'bg-gradient-to-br from-violet-500/5 to-transparent' : ''}`}>
                  <div
                    className={`absolute top-4 right-4 w-20 h-20 rounded-2xl bg-gradient-to-br ${world.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl">{world.icon}</span>
                      <div className="flex flex-col gap-2 items-end">
                        <span className={`px-3 py-1 rounded-lg bg-gradient-to-r ${world.color} text-white text-sm font-medium`}>
                          {world.status}
                        </span>
                        <span className={`text-sm font-medium ${difficultyColors[world.difficulty] || 'text-slate-400'}`}>
                          {world.difficulty} · {world.duration}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1">
                      {world.title}
                    </h3>
                    <p className={`text-sm font-medium mb-3 bg-gradient-to-r ${world.color} bg-clip-text text-transparent`}>
                      {world.subtitle}
                    </p>
                    <p className="text-slate-400 text-sm mb-4">
                      {world.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {world.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-slate-700 text-slate-300 text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-violet-400 group-hover:text-violet-300 transition-colors">
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-medium">立即开始</span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
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
