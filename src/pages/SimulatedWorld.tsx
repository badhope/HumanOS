import { motion } from 'framer-motion'
import { ArrowLeft, Globe, Sparkles, Construction, Clock, Play } from 'lucide-react'
import { usePageTransition } from '@components/animations/PageTransitionController'
import { useState } from 'react'
import EconomyDashboard from '@components/economy/EconomyDashboard'

export default function SimulatedWorld() {
  const { navigateWithTransition } = usePageTransition()
  const [activeWorld, setActiveWorld] = useState<string | null>(null)

  const handleBack = () => {
    if (activeWorld) {
      setActiveWorld(null)
      return
    }
    navigateWithTransition('/', {
      loadingText: '正在返回...',
      duration: 1500,
    })
  }

  if (activeWorld === 'economy') {
    return <EconomyDashboard />
  }

  const features = [
    { icon: '📈', name: '国家治理模拟器', status: '已开放', color: 'from-emerald-500 to-green-600', worldId: 'economy' },
    { icon: '🌍', name: '海贼王世界', status: '即将上线', color: 'from-orange-500 to-amber-500' },
    { icon: '⚡', name: '火影忍者', status: '规划中', color: 'from-orange-500 to-red-500' },
    { icon: '🗡️', name: '进击的巨人', status: '规划中', color: 'from-gray-500 to-slate-600' },
    { icon: '🧙', name: '哈利波特', status: '规划中', color: 'from-amber-600 to-yellow-500' },
    { icon: '🌟', name: '漫威宇宙', status: '规划中', color: 'from-red-600 to-blue-600' },
    { icon: '⚔️', name: '权游世界', status: '规划中', color: 'from-slate-600 to-gray-700' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/3 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-8 border-amber-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Construction className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-medium">正在紧张开发中</span>
            <Clock className="w-4 h-4 text-amber-400/60" />
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Globe className="w-20 h-20 mx-auto text-gradient-to-r from-orange-400 via-pink-500 to-purple-500 mb-4" />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-white">模拟</span>
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">世界</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            穿越次元壁，进入你熟知的每一个经典世界
            <br />
            体验沉浸式角色测评与人生模拟
          </motion.p>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300/80">首批开放 · 海贼王世界 即将上线</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className={`group relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm ${
                feature.worldId ? 'cursor-pointer' : ''
              }`}
              onClick={() => feature.worldId && setActiveWorld(feature.worldId)}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1 + index * 0.1,
                duration: 0.6,
                type: 'spring',
                stiffness: 80,
              }}
              whileHover={feature.worldId ? {
                scale: 1.02,
                y: -5,
                borderColor: 'rgba(34, 211, 238, 0.5)',
              } : {
                scale: 1.02,
                y: -5,
                borderColor: 'rgba(251, 146, 60, 0.4)',
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: feature.worldId
                    ? 'radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)'
                    : 'radial-gradient(circle at 50% 0%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)',
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="text-5xl mb-4 relative"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.2,
                    repeat: Infinity,
                  }}
                >
                  {feature.icon}
                  {feature.worldId && (
                    <motion.div
                      className="absolute -top-1 -right-1 p-1.5 rounded-full bg-cyan-500 text-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </motion.div>
                  )}
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2">{feature.name}</h3>

                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${feature.color} text-white/90`}>
                  {feature.worldId ? <Play className="w-3 h-3 fill-current" /> : <Clock className="w-3 h-3" />}
                  {feature.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center glass rounded-2xl p-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <p className="text-white/60 mb-4">
            💡 想抢先体验海贼王角色测评？
          </p>
          <p className="text-white/40 text-sm">
            海贼王相关测评内容已入驻「开始测评 → 娱乐趣味」分类
            <br />
            点击首页「开始测评」按钮即可体验！
          </p>
        </motion.div>
      </div>
    </div>
  )
}
