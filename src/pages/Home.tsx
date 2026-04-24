/**
 * ==============================================
 * 🏠 首页主页面组件
 * ==============================================
 * 【页面功能】
 * - 24个测评卡片3D展示
 * - 分类筛选+搜索
 * - 滚动视差动画
 * - 打字机特效Hero区
 * 
 * 【核心交互】
 * - 卡片悬浮3D效果
 * - 分类标签切换动画
 * - 滚动触发渐入动画
 * - 点击卡片跳转到测评确认页
 */

import { useState, useRef, useEffect } from 'react'
import { preloader } from '@utils/preloader'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Search, ChevronDown, Globe, Crown, ChevronRight, Trophy } from 'lucide-react'
import { usePageTransition } from '@components/animations/PageTransitionController'
import AssessmentCard3D from '@components/AssessmentCard3D'
import TypingEffect, { ShimmerText } from '@components/TypingEffect'
import { FadeInSection, AnimatedNumber, GlowCard } from '@components/animations'
import ParticleBackground from '@components/ParticleBackground'
import {
  staggerContainer,
  staggerItem,
} from '@utils/animation-config'
import { assessments, getAllCategories } from '@data/assessments'
import { cn } from '@utils/cn'

export default function Home() {
  const { navigateWithTransition } = usePageTransition()
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    preloader.start()
  }, [])

  const handleNavigate = (path: string) => {
    navigateWithTransition(path, {
      preset: 'page',
      loadingText: path === '/categories' ? '测评系统启动中...' : '正在加载...',
    })
  }
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: true })

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  const categories = ['全部', ...getAllCategories()]

  const filteredAssessments = assessments.filter(a => {
    const matchesCategory = selectedCategory === '全部' || a.category === selectedCategory
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground variant="stars" />
      <motion.section
        ref={heroRef}
        style={{ y: springY, opacity: springOpacity, scale: springScale }}
        className="pt-32 pb-20 min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/5 to-orange-500/5 blur-3xl"
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? 'enter' : 'initial'}
          className="relative z-10 text-center max-w-5xl mx-auto px-4"
        >
          <motion.div
            variants={staggerItem}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-br from-white/8 to-transparent border border-amber-500/20 backdrop-blur-xl"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
              </motion.div>
              <ShimmerText
                text="v2.3.0 · 专业测评平台"
                shimmerColor="rgba(251, 191, 36, 0.8)"
                className="text-white/90 font-medium"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight"
          >
            <motion.span
              className="inline-block text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Human
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent mx-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              style={{
                textShadow: '0 0 40px rgba(251, 191, 36, 0.5)',
              }}
            >
              OS
            </motion.span>
            <motion.span
              className="inline-block text-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              操作系统
            </motion.span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            <TypingEffect
              text="深度人格剖析 · 意识形态光谱 · 国家模拟器 · 修仙系统，一款产品，四维人生体验。"
              speed={25}
              pauseDuration={500}
            />
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button
                onClick={() => handleNavigate('/categories')}
                className="group flex items-center gap-2 px-10 py-5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                <Brain className="w-6 h-6" />
                开始测评
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => handleNavigate('/world')}
                className="group flex items-center gap-2 px-8 py-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-white font-semibold hover:bg-amber-500/20 transition-all text-lg backdrop-blur-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                <Globe className="w-6 h-6 text-amber-400" />
                模拟世界
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="mt-16 flex justify-center gap-12"
            variants={staggerItem}
          >
            {[
              { value: assessments.length, suffix: '+', label: '专业测评' },
              { value: 10000, suffix: '+', label: '用户信赖' },
              { value: 98, suffix: '%', label: '准确率' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-br from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  <AnimatedNumber
                    value={stat.value}
                    duration={2}
                    delay={1.2 + index * 0.1}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/40"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </motion.section>

      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 mb-6">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-semibold">理论基石 · 学术支撑</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">测评不是玄学，是社会科学的结晶</h2>
            <p className="text-white/60 max-w-2xl mx-auto">每道题目、每个维度、每项算法，都建立在严谨的学术理论之上</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'eq-goleman',
                icon: '🧠',
                title: '戈尔曼情商模型',
                theory: 'Daniel Goleman 1995',
                field: '心理学',
                description: '5维情商框架，自我觉察/管理/激励/共情/社交技能，被全球500强企业采用',
                color: 'from-pink-500 to-rose-500',
              },
              {
                id: 'cast-parenting',
                icon: '👨‍👩‍👧‍👦',
                title: '中国式家长研究',
                theory: '文化心理学',
                field: '社会学',
                description: '基于斯坦福教育人类学研究，东亚家庭焦虑/控制/温暖三维教养矩阵模型',
                color: 'from-violet-500 to-purple-500',
              },
              {
                id: 'behavioral-economics',
                icon: '⚖️',
                title: '行为经济学',
                theory: 'Kahneman 前景理论',
                field: '经济学',
                description: '风险决策偏差、损失厌恶、锚定效应、心理账户，诺贝尔奖级研究成果',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                id: 'political-spectrum',
                icon: '🏛️',
                title: '政治光谱分析',
                theory: '多维意识形态模型',
                field: '政治学',
                description: '经济-文化二维矩阵，权威-自由、集体-个人，超越左右的精准定位',
                color: 'from-amber-500 to-orange-500',
              },
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6 hover:border-white/20 transition-all cursor-pointer"
                onClick={() => handleNavigate(`/theory/${item.id}`)}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} opacity-60`} />
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-white/60">{item.theory}</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/40">{item.field}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{item.description}</p>
                <div className="flex items-center gap-1.5 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>了解更多</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 rounded-2xl px-8 py-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 backdrop-blur-xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-semibold">VIP 尊享功能</span>
              </div>
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <p className="text-white/60 text-sm text-center">
                治国模拟器 · 修仙系统 · 海贼世界 · 无限流副本，更多精彩持续解锁...
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <FadeInSection id="assessments-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20" delay={0.2}>
        <div className="text-center mb-10">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ShimmerText text="专业测评矩阵" shimmerColor="rgba(251, 191, 36, 0.5)" />
          </motion.h2>
          <motion.p
            className="text-white/60 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            共 <AnimatedNumber value={assessments.length} duration={1} delay={0.2} /> 个专业维度，选择你的认知跃迁之路
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative max-w-md mx-auto mb-6"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <motion.input
              type="text"
              placeholder="搜索测评..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 backdrop-blur-xl"
              whileFocus={{ scale: 1.02 }}
              aria-label="搜索测评"
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5 w-fit mx-auto"
            initial="initial"
            whileInView="enter"
            viewport={{ once: true }}
            variants={{
              enter: {
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  enter: { opacity: 1, scale: 1 },
                }}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300',
                  selectedCategory === category
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                )}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true }}
        >
          {filteredAssessments.map((assessment, index) => (
            <AssessmentCard3D
              key={assessment.id}
              assessment={assessment}
              index={index}
              onSelect={() => handleNavigate(`/mode-select/${assessment.id}`)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">🎮 探索你的世界</h2>
          <p className="text-white/50">发现更多有趣的玩法</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          <motion.div variants={staggerItem}>
            <GlowCard
              className="rounded-3xl overflow-hidden cursor-pointer group aspect-square"
              glowColor="rgba(251, 191, 36, 0.3)"
              onClick={() => handleNavigate('/leaderboard')}
            >
              <div className="w-full h-full bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/20 rounded-3xl flex flex-col items-center justify-center p-6">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30 mb-4"
                >
                  <Trophy className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gradient transition-all">
                  全球排行榜
                </h3>
                <p className="text-white/60 text-sm text-center">
                  谁是最黑暗的灵魂？
                </p>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlowCard
              className="rounded-3xl overflow-hidden cursor-pointer group aspect-square"
              glowColor="rgba(139, 92, 246, 0.4)"
              onClick={() => handleNavigate('/soul-match')}
            >
              <div className="w-full h-full bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 border border-violet-500/20 rounded-3xl flex flex-col items-center justify-center p-6">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-violet-500/30 mb-4"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gradient transition-all">
                  灵魂匹配
                </h3>
                <p className="text-white/60 text-sm text-center">
                  三公里内，谁和你同频？
                </p>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlowCard
              className="rounded-3xl overflow-hidden cursor-pointer group aspect-square"
              glowColor="rgba(52, 211, 153, 0.4)"
              onClick={() => handleNavigate('/xianxia')}
            >
              <div className="w-full h-full bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl flex flex-col items-center justify-center p-6">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30 mb-4"
                >
                  ⚔️
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gradient transition-all">
                  修仙系统
                </h3>
                <p className="text-white/60 text-sm text-center">
                  今天炼气几层了？
                </p>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlowCard
              className="rounded-3xl overflow-hidden cursor-pointer group aspect-square"
              glowColor="rgba(59, 130, 246, 0.4)"
              onClick={() => handleNavigate('/world')}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-violet-500/10 border border-blue-500/20 rounded-3xl flex flex-col items-center justify-center p-6">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-4"
                >
                  🌍
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gradient transition-all">
                  国家模拟器
                </h3>
                <p className="text-white/60 text-sm text-center">
                  你会怎么治理国家？
                </p>
              </div>
            </GlowCard>
          </motion.div>
        </motion.div>

        {filteredAssessments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-white/40">未找到匹配的测评，请尝试其他搜索词或分类</div>
          </motion.div>
        )}
      </FadeInSection>
    </div>
  )
}
