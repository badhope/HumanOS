import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Target,
  ChevronRight,
  ChevronLeft,
  Home,
  CheckCircle,
  Heart,
  Shield,
  Lightbulb,
  Users,
  Trophy
} from 'lucide-react'
import { cn } from '@utils/cn'

interface OnboardingScreenProps {
  onComplete: () => void
}

interface OnboardingPage {
  id: string
  title: string
  subtitle: string
  description: string
  icon: typeof Brain
  color: string
  gradient: string
  features?: string[]
}

const PAGES: OnboardingPage[] = [
  {
    id: 'welcome',
    title: '欢迎来到心镜',
    subtitle: 'MindMirror',
    description: '心镜是一款专业的心理健康测评与成长平台，帮助你更好地了解自己，成为更好的自己。',
    icon: Heart,
    color: 'text-rose-400',
    gradient: 'from-rose-500/20 to-pink-500/20',
    features: [
      '40+ 专业心理测评',
      '科学验证的心理学理论',
      '个性化成长训练',
    ]
  },
  {
    id: 'assessment',
    title: '专业心理测评',
    subtitle: '科学 · 精准 · 深度',
    description: '从性格特质到情绪状态，从人际关系到职业发展，全方位了解你的内心世界。',
    icon: Brain,
    color: 'text-violet-400',
    gradient: 'from-violet-500/20 to-purple-500/20',
    features: [
      'MBTI 性格类型分析',
      '大五人格深度测评',
      '情商、焦虑、抑郁量表',
      '职业兴趣与发展测评',
    ]
  },
  {
    id: 'training',
    title: '个性化成长训练',
    subtitle: '从认知到行动',
    description: '基于你的测评结果，智能推荐最适合你的心理训练，循序渐进地提升心理韧性。',
    icon: Target,
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-orange-500/20',
    features: [
      '情绪调节训练',
      '认知重构技巧',
      '习惯养成指导',
    ]
  },
  {
    id: 'progress',
    title: '追踪你的成长',
    subtitle: '持续 · 可视化 · 激励',
    description: '记录每一次测评和训练，追踪你的心理成长轨迹，发现更好的自己。',
    icon: TrendingUp,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    features: [
      '成长数据可视化',
      '成就徽章系统',
      '社区互动分享',
    ]
  },
]

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const isLastPage = currentPage === PAGES.length - 1
  const isFirstPage = currentPage === 0

  const handleNext = () => {
    if (isLastPage) {
      onComplete()
    } else {
      setDirection(1)
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirstPage) {
      setDirection(-1)
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  const currentData = PAGES[currentPage]
  const IconComponent = currentData.icon

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* 装饰背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${currentData.color.replace('text-', 'rgba(').replace('-400', ', 0.15)')} 0%, transparent 70%)`,
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* 跳过按钮 */}
      <div className="relative z-10 p-6">
        {!isLastPage && (
          <motion.button
            onClick={handleSkip}
            className="ml-auto px-4 py-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            跳过
          </motion.button>
        )}
      </div>

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full max-w-lg text-center"
          >
            {/* 图标 */}
            <motion.div
              className={cn(
                'w-32 h-32 mx-auto mb-8 rounded-3xl flex items-center justify-center',
                `bg-gradient-to-br ${currentData.gradient} border border-white/10`,
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <IconComponent size={64} className={currentData.color} />
            </motion.div>

            {/* 标题 */}
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentData.title}
            </motion.h2>

            {/* 副标题 */}
            <motion.p
              className={cn('text-lg font-medium mb-4', currentData.color)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentData.subtitle}
            </motion.p>

            {/* 描述 */}
            <motion.p
              className="text-white/60 text-base leading-relaxed mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentData.description}
            </motion.p>

            {/* 特性列表 */}
            {currentData.features && (
              <motion.div
                className="space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {currentData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <CheckCircle size={20} className={currentData.color} />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部导航 */}
      <div className="relative z-10 p-6 space-y-6">
        {/* 分页指示器 */}
        <div className="flex justify-center gap-2">
          {PAGES.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                index === currentPage
                  ? 'w-8 bg-gradient-to-r from-violet-500 to-purple-500'
                  : 'w-1.5 bg-white/20'
              )}
            />
          ))}
        </div>

        {/* 导航按钮 */}
        <div className="flex items-center justify-between gap-4">
          {/* 上一步 */}
          <motion.button
            onClick={handlePrev}
            disabled={isFirstPage}
            className={cn(
              'w-14 h-14 rounded-2xl flex items-center justify-center transition-all',
              isFirstPage
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            )}
            whileHover={!isFirstPage ? { scale: 1.05 } : {}}
            whileTap={!isFirstPage ? { scale: 0.95 } : {}}
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* 开始/下一步 */}
          <motion.button
            onClick={handleNext}
            className={cn(
              'flex-1 h-14 rounded-2xl flex items-center justify-center gap-2 font-semibold text-white',
              'bg-gradient-to-r from-violet-500 to-purple-600',
              'shadow-lg shadow-violet-500/30',
              'max-w-xs'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>{isLastPage ? '开始探索' : '下一步'}</span>
            {isLastPage ? (
              <Sparkles size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </motion.button>

          {/* 占位，保持按钮组平衡 */}
          <div className="w-14" />
        </div>

        {/* 页码 */}
        <div className="text-center">
          <span className="text-white/40 text-sm">
            {currentPage + 1} / {PAGES.length}
          </span>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <p className="text-white/20 text-xs">
          © 2024 心镜 MindMirror · 照见自己，成为更好的自己
        </p>
      </div>
    </motion.div>
  )
}
