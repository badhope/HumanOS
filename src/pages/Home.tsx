import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Shield, Zap, Brain, Search, ChevronDown } from 'lucide-react'
import AssessmentCard3D from '@components/AssessmentCard3D'
import TypingEffect, { ShimmerText } from '@components/TypingEffect'
import { GlowCard, RippleButton, FadeInSection, AnimatedNumber } from '@components/animations'
import {
  staggerContainer,
  staggerItem,
} from '@utils/animation-config'
import { assessments, getAllCategories } from '@data/assessments'
import { cn } from '@utils/cn'

export default function Home() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [searchQuery, setSearchQuery] = useState('')
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
    <div className="relative">
      <motion.section
        ref={heroRef}
        style={{ y: springY, opacity: springOpacity, scale: springScale }}
        className="pt-32 pb-20 min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-violet-500/5 to-pink-500/5 blur-3xl"
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
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5 text-violet-400" />
              </motion.div>
              <ShimmerText
                text="v2.3.0 · 前端展示模板库"
                shimmerColor="rgba(139, 92, 246, 0.8)"
                className="text-white/90 font-medium"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <motion.span
              className="inline-block text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              专业
            </motion.span>
            <motion.span
              className="inline-block text-gradient mx-3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              style={{
                textShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
              }}
            >
              前端框架
            </motion.span>
            <motion.span
              className="inline-block text-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              展示平台
            </motion.span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            <TypingEffect
              text="展示现代Web开发的最佳实践，包含完整的UI组件库、设计系统、动画效果和性能优化方案。为企业客户提供生产级的前端架构参考。"
              speed={25}
              pauseDuration={500}
            />
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <RippleButton
              variant="primary"
              size="lg"
              onClick={() => navigate('/assessment/mbti-standard')}
              className="min-w-[160px]"
            >
              <span className="flex items-center gap-2">
                开始测评
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </RippleButton>

            <RippleButton
              variant="secondary"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="min-w-[160px]"
            >
              查看结果
            </RippleButton>
          </motion.div>

          <motion.div
            className="mt-16 flex justify-center gap-8"
            variants={staggerItem}
          >
            {[
              { value: 50, suffix: '+', label: 'UI组件' },
              { value: 15, suffix: '+', label: '页面模板' },
              { value: 100, suffix: '%', label: 'TypeScript' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-3xl font-bold text-gradient">
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

      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: '现代化架构',
              description: 'React 18 + TypeScript + Vite，构建高性能企业级应用',
              gradient: 'from-emerald-500 to-teal-500',
              bgGradient: 'from-emerald-500/20 to-teal-500/20',
            },
            {
              icon: Zap,
              title: '设计系统',
              description: '完整的UI组件库，支持主题定制和响应式布局',
              gradient: 'from-orange-500 to-amber-500',
              bgGradient: 'from-orange-500/20 to-amber-500/20',
            },
            {
              icon: Brain,
              title: '开发体验',
              description: '热重载、类型检查、代码格式化，提升开发效率',
              gradient: 'from-violet-500 to-pink-500',
              bgGradient: 'from-violet-500/20 to-pink-500/20',
            },
          ].map((feature) => (
            <GlowCard
              key={feature.title}
              className="glass rounded-2xl p-6 border border-white/10"
              glowColor={`rgba(${feature.gradient.includes('emerald') ? '16, 185, 129' : feature.gradient.includes('orange') ? '249, 115, 22' : '139, 92, 246'}, 0.4)`}
              enableTilt={true}
            >
              <motion.div
                className={cn(
                  'w-14 h-14 rounded-xl bg-gradient-to-r flex items-center justify-center mb-4',
                  feature.bgGradient
                )}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60">{feature.description}</p>
            </GlowCard>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20" delay={0.2}>
        <div className="text-center mb-10">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ShimmerText text="可用测评" shimmerColor="rgba(139, 92, 246, 0.5)" />
          </motion.h2>
          <motion.p
            className="text-white/60 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            共 <AnimatedNumber value={assessments.length} duration={1} delay={0.2} /> 个专业测评，选择适合你的开始探索
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
              className="w-full pl-12 pr-4 py-3 rounded-xl glass bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              whileFocus={{ scale: 1.02 }}
              aria-label="搜索测评"
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-2"
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                )}
                aria-label={`筛选${category}类别`}
                aria-pressed={selectedCategory === category}
                type="button"
              >
                {category}
                {category !== '全部' && (
                  <span className="ml-2 text-white/50">
                    ({assessments.filter(a => a.category === category).length})
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            enter: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {filteredAssessments.map((assessment, index) => (
            <motion.div
              key={assessment.id}
              variants={{
                initial: { opacity: 0, y: 30 },
                enter: { opacity: 1, y: 0 },
              }}
            >
              <AssessmentCard3D
                assessment={assessment}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredAssessments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/60">没有找到匹配的测评</p>
          </motion.div>
        )}
      </FadeInSection>
    </div>
  )
}
