import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  Users, 
  Briefcase, 
  Compass,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Star,
  Clock,
  TrendingUp,
  AlertCircle,
  Smile,
  Meh,
  Frown,
  CloudRain,
  Zap,
  Shield,
  Target,
  Lightbulb,
  Award
} from 'lucide-react'
import { cn } from '@utils/cn'
import { useNavigate } from 'react-router-dom'

interface SymptomCategory {
  id: string
  title: string
  icon: typeof Brain
  color: string
  bgGradient: string
  symptoms: string[]
  description: string
}

interface TrainingRecommendation {
  id: string
  title: string
  subtitle: string
  icon: string
  duration: string
  matchReason: string
  level: number
}

const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    id: 'anxiety',
    title: '焦虑与压力',
    icon: Zap,
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    description: '经常感到紧张、担心或不安',
    symptoms: ['过度担心未来', '容易紧张发抖', '睡眠困难', '心慌心悸', '惊恐发作']
  },
  {
    id: 'depression',
    title: '抑郁与低落',
    icon: CloudRain,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-indigo-500/20',
    description: '持续感到悲伤、绝望或失去兴趣',
    symptoms: ['情绪持续低落', '对事物失去兴趣', '睡眠问题', '食欲改变', '自我否定']
  },
  {
    id: 'relationships',
    title: '人际关系',
    icon: Users,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    description: '与他人相处困难或关系问题',
    symptoms: ['沟通困难', '社交恐惧', '边界不清', '亲密关系问题', '家庭矛盾']
  },
  {
    id: 'self-esteem',
    title: '自我认知',
    icon: Compass,
    color: 'text-violet-400',
    bgGradient: 'from-violet-500/20 to-purple-500/20',
    description: '对自己缺乏信心或自我认知混乱',
    symptoms: ['自我否定', '不配得感', '过度在意他人看法', '身份认同困惑', '价值感低']
  },
  {
    id: 'career',
    title: '职业发展',
    icon: Briefcase,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
    description: '工作相关的问题或职业困惑',
    symptoms: ['职业迷茫', '工作倦怠', '工作与生活平衡', '职场人际', '晋升瓶颈']
  },
  {
    id: 'emotional-regulation',
    title: '情绪调节',
    icon: Heart,
    color: 'text-red-400',
    bgGradient: 'from-red-500/20 to-rose-500/20',
    description: '难以控制或调节情绪',
    symptoms: ['情绪波动大', '易怒暴躁', '情绪失控', '压抑情绪', '情绪表达困难']
  },
  {
    id: 'trauma',
    title: '创伤与疗愈',
    icon: Shield,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/20 to-blue-500/20',
    description: '经历过创伤需要疗愈',
    symptoms: ['创伤经历', '创伤后应激', '噩梦闪回', '情感麻木', '信任问题']
  },
  {
    id: 'growth',
    title: '个人成长',
    icon: TrendingUp,
    color: 'text-green-400',
    bgGradient: 'from-green-500/20 to-emerald-500/20',
    description: '想要突破自我，实现成长',
    symptoms: ['自我提升', '培养好习惯', '目标设定', '时间管理', '决策能力']
  }
]

const TRAINING_RECOMMENDATIONS: Record<string, TrainingRecommendation[]> = {
  anxiety: [
    { id: 'emotion-anchoring', title: '情绪锚定训练', subtitle: '建立你的情绪稳定开关', icon: '🧘', duration: '5分钟', matchReason: '专为焦虑缓解设计', level: 1 },
    { id: 'cognitive-restructuring', title: '认知重构训练', subtitle: '打破负面思维的死循环', icon: '🔄', duration: '12分钟', matchReason: '缓解焦虑性思维', level: 2 },
    { id: 'mindful-breathing', title: '正念呼吸', subtitle: '活在当下的艺术', icon: '🌬️', duration: '10分钟', matchReason: '科学证明的减压方法', level: 1 },
  ],
  depression: [
    { id: 'gratitude', title: '感恩三件事', subtitle: '培养感恩心态，提升幸福感', icon: '🙏', duration: '3分钟', matchReason: '改善情绪的快速方法', level: 1 },
    { id: 'self-compassion', title: '自我同情练习', subtitle: '停止自我攻击，与自己和解', icon: '💗', duration: '8分钟', matchReason: '对抗抑郁性自我批判', level: 1 },
    { id: 'micro-habit', title: '微习惯启动', subtitle: '用最小行动打破拖延', icon: '🌱', duration: '3分钟', matchReason: '战胜无力感的第一步', level: 1 },
  ],
  relationships: [
    { id: 'boundary-setting', title: '边界建立训练', subtitle: '学会说不，不做老好人', icon: '🛡️', duration: '10分钟', matchReason: '健康人际关系的基础', level: 2 },
    { id: 'emotion-anchoring', title: '情绪锚定训练', subtitle: '建立你的情绪稳定开关', icon: '🧘', duration: '5分钟', matchReason: '提升情绪稳定性', level: 1 },
  ],
  'self-esteem': [
    { id: 'self-compassion', title: '自我同情练习', subtitle: '停止自我攻击，与自己和解', icon: '💗', duration: '8分钟', matchReason: '提升自我接纳', level: 1 },
    { id: 'values-clarification', title: '价值观澄清', subtitle: '找到人生的指南针', icon: '🧭', duration: '12分钟', matchReason: '明确自我定位', level: 1 },
  ],
  career: [
    { id: 'career-vision', title: '职业愿景探索', subtitle: '找到你真正热爱的事业', icon: '🎯', duration: '10分钟', matchReason: '明确职业方向', level: 1 },
    { id: 'skill-gap-analysis', title: '技能差距分析', subtitle: '清晰定位成长方向', icon: '📈', duration: '8分钟', matchReason: '制定成长计划', level: 2 },
  ],
  'emotional-regulation': [
    { id: 'emotion-anchoring', title: '情绪锚定训练', subtitle: '建立你的情绪稳定开关', icon: '🧘', duration: '5分钟', matchReason: '快速情绪调节工具', level: 1 },
    { id: 'self-compassion', title: '自我同情练习', subtitle: '停止自我攻击，与自己和解', icon: '💗', duration: '8分钟', matchReason: '学会温柔对待自己', level: 1 },
  ],
  trauma: [
    { id: 'emotion-anchoring', title: '情绪锚定训练', subtitle: '建立你的情绪稳定开关', icon: '🧘', duration: '5分钟', matchReason: '创伤后情绪稳定', level: 1 },
    { id: 'self-compassion', title: '自我同情练习', subtitle: '停止自我攻击，与自己和解', icon: '💗', duration: '8分钟', matchReason: '疗愈内心创伤', level: 1 },
  ],
  growth: [
    { id: 'micro-habit', title: '微习惯启动', subtitle: '用最小行动打破拖延', icon: '🌱', duration: '3分钟', matchReason: '持续成长的起点', level: 1 },
    { id: 'values-alignment', title: '价值观对齐', subtitle: '让生活与价值观一致', icon: '🎯', duration: '10分钟', matchReason: '活出真实自我', level: 2 },
  ],
}

export default function TrainingGuide() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const selectedCategoryData = SYMPTOM_CATEGORIES.filter(c => selectedCategories.includes(c.id))
  const recommendedTrainings = selectedCategories.flatMap(cat => TRAINING_RECOMMENDATIONS[cat] || [])

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      }
      if (prev.length < 3) {
        return [...prev, categoryId]
      }
      return prev
    })
  }

  const handleStartTraining = (trainingId: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      navigate(`/app/training/${trainingId}`)
    }, 500)
  }

  const handleQuickStart = () => {
    setCurrentStep(0)
    setSelectedCategories([])
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="sticky top-0 z-10 backdrop-blur-xl border-b border-white/10">
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">训练引导</h1>
              <p className="text-sm text-white/50">找到最适合你的训练</p>
            </div>
            <motion.button
              onClick={handleQuickStart}
              className="px-4 py-2 rounded-xl bg-white/5 text-white/70 text-sm hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              快速开始
            </motion.button>
          </div>

          <div className="flex gap-2">
            {[0, 1, 2].map((step) => (
              <div key={step} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                  initial={{ width: '0%' }}
                  animate={{ width: currentStep >= step ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">你目前面临什么挑战？</h2>
                <p className="text-white/50 text-sm">选择1-3个最符合你当前状态的问题</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {SYMPTOM_CATEGORIES.map((category, index) => {
                  const Icon = category.icon
                  const isSelected = selectedCategories.includes(category.id)
                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={cn(
                        'relative p-4 rounded-2xl border-2 transition-all text-left',
                        isSelected
                          ? 'border-violet-500 bg-gradient-to-br ' + category.bgGradient
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="categoryIndicator"
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check size={14} className="text-white" />
                        </motion.div>
                      )}
                      <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3', category.bgGradient)}>
                        <Icon size={20} className={category.color} />
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-1">{category.title}</h3>
                      <p className="text-xs text-white/40 line-clamp-2">{category.description}</p>
                    </motion.button>
                  )
                })}
              </div>

              {selectedCategories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sticky bottom-20 pt-4"
                >
                  <motion.button
                    onClick={() => setCurrentStep(1)}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>查看推荐训练</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-sm">
                      {selectedCategories.length} 项
                    </span>
                    <ChevronRight size={20} />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-2">为你推荐以下训练</h2>
                <p className="text-white/50 text-sm">基于你选择的问题类型智能匹配</p>
              </div>

              <div className="space-y-3">
                {recommendedTrainings.map((training, index) => (
                  <motion.div
                    key={training.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center text-2xl shrink-0">
                        {training.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">{training.title}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs">
                            L{training.level}
                          </span>
                        </div>
                        <p className="text-sm text-white/50 mb-2">{training.subtitle}</p>
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {training.duration}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Sparkles size={12} />
                            {training.matchReason}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => handleStartTraining(training.id)}
                        disabled={isTransitioning}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-medium shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        开始
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => setCurrentStep(0)}
                className="w-full py-3 rounded-xl bg-white/5 text-white/70 text-sm flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft size={16} />
                重新选择问题
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 border-4 border-white/20 border-t-violet-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className="text-white/70">正在加载训练...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
