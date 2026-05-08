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
  Trophy,
  FileText,
  Play,
  BarChart3,
  Compass,
  Zap,
  BookOpen,
  Star
} from 'lucide-react'
import { cn } from '@utils/cn'

interface OnboardingScreenProps {
  onComplete: () => void
}

interface TutorialStep {
  id: string
  step: number
  title: string
  description: string
  icon: typeof Brain
  color: string
  gradient: string
  tips: string[]
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    step: 1,
    title: '欢迎使用心镜',
    description: '心镜是一款专业的心理健康测评与成长平台。只需几分钟，就能帮助你更好地了解自己的内心世界。',
    icon: Heart,
    color: 'text-rose-400',
    gradient: 'from-rose-500/20 to-pink-500/20',
    tips: [
      '点击下方"开始测评"按钮，开启你的心理探索之旅',
      '首次使用建议从基础测评开始，逐步深入'
    ]
  },
  {
    id: 'assessment',
    step: 2,
    title: '选择合适的测评',
    description: '我们提供40+专业心理测评，涵盖性格、情绪、职场、人际关系等多个维度。',
    icon: FileText,
    color: 'text-violet-400',
    gradient: 'from-violet-500/20 to-purple-500/20',
    tips: [
      '在测评列表中浏览各类测评，按类别筛选更方便',
      '每个测评都有简介说明，帮助你选择最适合的',
      '认真阅读题目，根据第一反应作答最准确'
    ]
  },
  {
    id: 'training',
    step: 3,
    title: '获取训练推荐',
    description: '完成测评后，系统会根据你的结果智能推荐最适合的心理训练课程。',
    icon: Compass,
    color: 'text-amber-400',
    gradient: 'from-amber-500/20 to-orange-500/20',
    tips: [
      '测评完成后点击"开启训练"，查看个性化推荐',
      '使用训练引导功能，根据你的困扰找到适合的训练',
      '循序渐进，坚持练习效果更佳'
    ]
  },
  {
    id: 'progress',
    step: 4,
    title: '追踪成长轨迹',
    description: '记录每一次测评和训练数据，可视化你的心理成长历程。',
    icon: BarChart3,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    tips: [
      '定期复测，观察各项指标的变化趋势',
      '完成训练获得成就徽章，激励持续成长',
      '查看历史报告，回顾自己的成长历程'
    ]
  },
]

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setDirection(1)
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirstStep) {
      setDirection(-1)
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const stepVariants = {
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

  const currentData = TUTORIAL_STEPS[currentStep]
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
        {!isLastStep && (
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
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full max-w-lg text-center"
          >
            {/* 步骤编号 */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-white/40 text-sm">第</span>
              <span className={cn('text-lg font-bold', currentData.color)}>
                {currentData.step}
              </span>
              <span className="text-white/40 text-sm">步</span>
            </motion.div>

            {/* 图标 */}
            <motion.div
              className={cn(
                'w-28 h-28 mx-auto mb-6 rounded-2xl flex items-center justify-center',
                `bg-gradient-to-br ${currentData.gradient} border border-white/10`,
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <IconComponent size={56} className={currentData.color} />
            </motion.div>

            {/* 标题 */}
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentData.title}
            </motion.h2>

            {/* 描述 */}
            <motion.p
              className="text-white/60 text-base leading-relaxed mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentData.description}
            </motion.p>

            {/* 使用提示 */}
            {currentData.tips && (
              <motion.div
                className="space-y-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                  使用提示
                </p>
                {currentData.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-left"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className={cn('mt-0.5', currentData.color)}>
                      <Lightbulb size={16} />
                    </div>
                    <span className="text-white/70 text-sm">{tip}</span>
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
          {TUTORIAL_STEPS.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                index === currentStep
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
            disabled={isFirstStep}
            className={cn(
              'w-14 h-14 rounded-2xl flex items-center justify-center transition-all',
              isFirstStep
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            )}
            whileHover={!isFirstStep ? { scale: 1.05 } : {}}
            whileTap={!isFirstStep ? { scale: 0.95 } : {}}
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
            <span>{isLastStep ? '开始探索' : '下一步'}</span>
            {isLastStep ? (
              <Sparkles size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </motion.button>

          {/* 占位，保持按钮组平衡 */}
          <div className="w-14" />
        </div>

        {/* 步骤进度 */}
        <div className="text-center">
          <span className="text-white/40 text-sm">
            第 {currentStep + 1} 步，共 {TUTORIAL_STEPS.length} 步
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
