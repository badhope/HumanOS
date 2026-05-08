import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Target,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  CheckCircle,
  BookOpen,
  Zap
} from 'lucide-react'
import { cn } from '@utils/cn'

interface UsageGuideProps {
  onComplete?: () => void
}

interface TutorialStep {
  id: string
  step: number
  title: string
  description: string
  icon: typeof Brain
  color: string
  tips: string[]
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    step: 1,
    title: '欢迎使用心镜',
    description: '心镜是一款专业的心理健康测评与成长平台。只需几分钟，就能帮助你更好地了解自己的内心世界。',
    icon: Sparkles,
    color: 'text-rose-400',
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
    icon: Brain,
    color: 'text-violet-400',
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
    icon: Target,
    color: 'text-amber-400',
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
    icon: TrendingUp,
    color: 'text-emerald-400',
    tips: [
      '定期复测，观察各项指标的变化趋势',
      '完成训练获得成就徽章，激励持续成长',
      '查看历史报告，回顾自己的成长历程'
    ]
  },
]

export default function UsageGuide({ onComplete }: UsageGuideProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (isLastStep) {
      setIsExpanded(false)
      onComplete?.()
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

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  const currentData = TUTORIAL_STEPS[currentStep]
  const IconComponent = currentData.icon

  if (!isExpanded) {
    return (
      <motion.button
        onClick={() => setIsExpanded(true)}
        className="w-full p-4 rounded-2xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center gap-3 hover:from-violet-500/30 hover:to-purple-500/30 transition-all"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BookOpen size={20} className="text-violet-400" />
        <span className="text-sm text-white/80">查看使用方法</span>
        <ChevronRight size={16} className="text-white/40 ml-auto" />
      </motion.button>
    )
  }

  return (
    <motion.div
      className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-violet-500/20 overflow-hidden shadow-xl shadow-violet-500/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-violet-400" />
            <h3 className="text-lg font-bold text-white">使用方法</h3>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-white/40 hover:text-white/60 text-sm"
          >
            收起
          </button>
        </div>

        <div className="min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  `bg-gradient-to-br ${currentData.color.replace('text-', 'from-').replace('-400', '-500/20')} to-transparent`
                )}>
                  <IconComponent size={24} className={currentData.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">第 {currentData.step} 步</span>
                    <span className={cn('text-sm font-medium', currentData.color)}>
                      {currentData.title}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-white/60 text-sm leading-relaxed">
                {currentData.description}
              </p>

              <div className="space-y-2">
                <p className="text-xs text-white/40 uppercase tracking-wider">使用提示</p>
                {currentData.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 px-3 py-2 rounded-lg bg-white/5"
                  >
                    <Lightbulb size={14} className={cn('mt-0.5 shrink-0', currentData.color)} />
                    <span className="text-white/70 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex justify-center gap-1.5">
            {TUTORIAL_STEPS.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  index === currentStep
                    ? 'w-6 bg-gradient-to-r from-violet-500 to-purple-500'
                    : 'w-1.5 bg-white/20'
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={isFirstStep}
              aria-disabled={isFirstStep}
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                isFirstStep
                  ? 'bg-white/5 text-white/20 cursor-not-allowed opacity-40'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 active:bg-white/30'
              )}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              className="flex-1 h-10 rounded-xl flex items-center justify-center gap-2 font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30"
            >
              <span className="text-sm">{isLastStep ? '知道了' : '下一步'}</span>
              {isLastStep ? (
                <CheckCircle size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
