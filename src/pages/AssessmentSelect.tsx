import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, Target, Brain, Heart, Users, Briefcase, BarChart3, Shield, Palette, Gamepad2, Sparkles } from 'lucide-react'
import { usePageTransition } from '@components/animations/PageTransitionController'
import { assessments } from '@data/assessments'
import { cn } from '@utils/cn'

const categoryConfig: Record<string, {
  gradient: string
  icon: React.ReactNode
  bgGradient: string
  borderColor: string
  shadowColor: string
}> = {
  '人格心理': {
    gradient: 'from-violet-500 to-purple-600',
    icon: <Brain className="w-5 h-5" />,
    bgGradient: 'bg-gradient-to-br from-violet-950/40 to-purple-900/30',
    borderColor: 'border-violet-500/30',
    shadowColor: 'shadow-violet-500/20',
  },
  '认知能力': {
    gradient: 'from-blue-500 to-cyan-500',
    icon: <BarChart3 className="w-5 h-5" />,
    bgGradient: 'bg-gradient-to-br from-blue-950/40 to-cyan-900/30',
    borderColor: 'border-blue-500/30',
    shadowColor: 'shadow-blue-500/20',
  },
  '职业发展': {
    gradient: 'from-emerald-500 to-teal-500',
    icon: <Briefcase className="w-5 h-5" />,
    bgGradient: 'bg-gradient-to-br from-emerald-950/40 to-teal-900/30',
    borderColor: 'border-emerald-500/30',
    shadowColor: 'shadow-emerald-500/20',
  },
  '情绪管理': {
    gradient: 'from-pink-500 to-rose-500',
    icon: <Heart className="w-5 h-5" />,
    bgGradient: 'bg-gradient-to-br from-pink-950/40 to-rose-900/30',
    borderColor: 'border-pink-500/30',
    shadowColor: 'shadow-pink-500/20',
  },
  '人际关系': {
    gradient: 'from-orange-500 to-amber-500',
    icon: <Users className="w-5 h-5" />,
    bgGradient: 'bg-gradient-to-br from-orange-950/40 to-amber-900/30',
    borderColor: 'border-orange-500/30',
    shadowColor: 'shadow-orange-500/20',
  },
  '心理健康': {
    gradient: 'from-red-500 to-pink-600',
    icon: <Shield className="w-5 h-5" />,
    bgGradient: 'bg-gradient-to-br from-red-950/40 to-pink-900/30',
    borderColor: 'border-red-500/30',
    shadowColor: 'shadow-red-500/20',
  },
  '意识形态': {
    gradient: 'from-indigo-500 to-violet-600',
    icon: <Palette className="w-5 h-5" />,
    bgGradient: 'bg-gradient-to-br from-indigo-950/40 to-violet-900/30',
    borderColor: 'border-indigo-500/30',
    shadowColor: 'shadow-indigo-500/20',
  },
  '娱乐趣味': {
    gradient: 'from-fuchsia-500 to-pink-500',
    icon: <Gamepad2 className="w-5 h-5" />,
    bgGradient: 'bg-gradient-to-br from-fuchsia-950/40 to-pink-900/30',
    borderColor: 'border-fuchsia-500/30',
    shadowColor: 'shadow-fuchsia-500/20',
  },
}

export default function AssessmentSelect() {
  const { navigateWithTransition } = usePageTransition()
  const [searchParams] = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setSelectedCategory(decodeURIComponent(categoryFromUrl))
    }
  }, [searchParams])

  const { scrollXProgress } = useScroll({ container: containerRef })

  const filteredAssessments = selectedCategory
    ? assessments.filter(a => a.category === selectedCategory)
    : assessments

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    navigateWithTransition('/categories', {
      loadingText: '正在返回...',
      duration: 1500,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 pt-24 pb-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-violet-500"
          style={{ scaleX: scrollXProgress }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.button
            onClick={handleBack}
            className={cn(
              'px-6 py-3 rounded-xl glass text-white font-medium mb-8',
              'hover:bg-white/20 transition-all flex items-center gap-2'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
            返回分类
          </motion.button>

          <div className="text-center">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {selectedCategory || '全部测评'}
            </motion.h1>
            <motion.p
              className="text-white/60 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              左右滑动探索测评，点击卡片开始体验
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.p
            className="text-white/50 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            共 {filteredAssessments.length} 项测评
          </motion.p>
        </motion.div>

        <div className="relative">
          <motion.button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-label="向左滑动"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-label="向右滑动"
          >
            <ArrowRight className="w-6 h-6" />
          </motion.button>

          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide py-8 px-16"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <div className="flex gap-6" style={{ width: 'max-content' }}>
              {filteredAssessments.map((assessment, index) => {
                const config = categoryConfig[assessment.category] || categoryConfig['人格心理']
                return (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <motion.div
                    onClick={() => navigateWithTransition(`/mode-select/${assessment.id}`, {
                      preset: 'page',
                      loadingText: `正在加载 ${assessment.title}...`,
                    })}
                    className={cn(
                      'relative h-[28rem] rounded-3xl overflow-hidden cursor-pointer group border',
                      config.borderColor,
                      `shadow-xl ${config.shadowColor}`
                    )}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-90',
                      config.gradient
                    )} />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div>
                        <motion.div
                          className={cn(
                            'w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 text-white'
                          )}
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                        >
                          {config.icon && <span className="text-3xl">{config.icon}</span>}
                        </motion.div>

                        <motion.div
                          className={cn(
                            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-3'
                          )}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {config.icon}
                          {assessment.category}
                        </motion.div>

                        <motion.h3
                          className="text-2xl font-bold text-white mb-3 leading-tight"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                        >
                          {assessment.title}
                        </motion.h3>

                        <motion.p
                          className="text-white/80 text-sm leading-relaxed line-clamp-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          {assessment.description}
                        </motion.p>
                      </div>

                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <motion.div
                            className={cn(
                              'px-3 py-2 rounded-lg bg-white/15 backdrop-blur-sm text-white/80 text-xs flex items-center gap-1.5'
                            )}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.6 }}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{assessment.duration}分</span>
                          </motion.div>

                          <motion.div
                            className={cn(
                              'px-3 py-2 rounded-lg bg-white/15 backdrop-blur-sm text-white/80 text-xs flex items-center gap-1.5'
                            )}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.7 }}
                          >
                            <Target className="w-3.5 h-3.5" />
                            <span>{assessment.questions.length}题</span>
                          </motion.div>

                          <motion.div
                            className={cn(
                              'px-3 py-2 rounded-lg bg-white/15 backdrop-blur-sm text-white/80 text-xs flex items-center gap-1.5'
                            )}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.8 }}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{assessment.difficulty === 'lite' ? '简单' : assessment.difficulty === 'standard' ? '标准' : '专业'}</span>
                          </motion.div>
                        </div>

                        <motion.div
                          className={cn(
                            'mt-3 px-6 py-3 rounded-xl bg-white/25 backdrop-blur-sm text-white text-center font-semibold group-hover:bg-white/35 transition-all'
                          )}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.9 }}
                        >
                          开始测评 →
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
            </div>
          </div>
        </div>

        <motion.div
          className="text-center mt-8 text-white/40 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          提示：使用左右箭头或滑动来浏览更多测评
        </motion.div>
      </div>
    </div>
  )
}
