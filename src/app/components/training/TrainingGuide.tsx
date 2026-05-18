import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Users, 
  Compass,
  Sparkles,
  ChevronRight,
  Check,
  Clock,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  CloudRain,
  Briefcase as CareerIcon,
  Gauge
} from 'lucide-react'
import { cn } from '@utils/cn'
import { useNavigate } from 'react-router-dom'

interface ProblemGuide {
  id: string
  title: string
  icon: typeof Brain
  color: string
  bgGradient: string
  borderColor: string
  description: string
  tip: string
  recommendedTrainings: {
    id: string
    title: string
    duration: string
    level: string
  }[]
}

const PROBLEM_GUIDES: ProblemGuide[] = [
  {
    id: 'anxiety',
    title: '焦虑与压力',
    icon: Zap,
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    description: '经常感到紧张、担心或不安',
    tip: '💡 建议选择「情绪锚定」训练，每天5分钟学习478呼吸法，快速平复焦虑',
    recommendedTrainings: [
      { id: 'emotion-anchoring', title: '情绪锚定训练', duration: '5分钟', level: '入门' },
      { id: 'cognitive-restructuring', title: '认知重构训练', duration: '12分钟', level: '进阶' },
    ]
  },
  {
    id: 'depression',
    title: '抑郁与低落',
    icon: CloudRain,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
    borderColor: 'border-blue-500/30',
    description: '持续感到悲伤、绝望或失去兴趣',
    tip: '💡 建议从「感恩三件事」开始，每天3分钟记录积极事物，慢慢改善情绪',
    recommendedTrainings: [
      { id: 'gratitude', title: '感恩三件事', duration: '3分钟', level: '入门' },
      { id: 'self-compassion', title: '自我同情练习', duration: '8分钟', level: '入门' },
    ]
  },
  {
    id: 'relationships',
    title: '人际关系',
    icon: Users,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/10 to-rose-500/10',
    borderColor: 'border-pink-500/30',
    description: '与他人相处困难或关系问题',
    tip: '💡 建议先学习「边界建立」，学会温和地拒绝，建立健康的人际边界',
    recommendedTrainings: [
      { id: 'boundary-setting', title: '边界建立训练', duration: '10分钟', level: '进阶' },
      { id: 'emotion-anchoring', title: '情绪锚定训练', duration: '5分钟', level: '入门' },
    ]
  },
  {
    id: 'self-esteem',
    title: '自我认知',
    icon: Compass,
    color: 'text-violet-400',
    bgGradient: 'from-violet-500/10 to-purple-500/10',
    borderColor: 'border-violet-500/30',
    description: '对自己缺乏信心或自我认知混乱',
    tip: '💡 建议从「自我同情练习」开始，学会像对待好朋友一样对待自己',
    recommendedTrainings: [
      { id: 'self-compassion', title: '自我同情练习', duration: '8分钟', level: '入门' },
      { id: 'values-clarification', title: '价值观澄清', duration: '12分钟', level: '入门' },
    ]
  },
  {
    id: 'career',
    title: '职业发展',
    icon: CareerIcon,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
    borderColor: 'border-emerald-500/30',
    description: '工作相关的问题或职业困惑',
    tip: '💡 建议先做「职业愿景探索」，明确自己的职业方向和目标',
    recommendedTrainings: [
      { id: 'career-vision', title: '职业愿景探索', duration: '10分钟', level: '入门' },
      { id: 'skill-gap-analysis', title: '技能差距分析', duration: '8分钟', level: '进阶' },
    ]
  },
  {
    id: 'emotional-regulation',
    title: '情绪调节',
    icon: Gauge,
    color: 'text-red-400',
    bgGradient: 'from-red-500/10 to-rose-500/10',
    borderColor: 'border-red-500/30',
    description: '难以控制或调节情绪',
    tip: '💡 建议先掌握「情绪锚定」技巧，这是情绪管理的基础技能',
    recommendedTrainings: [
      { id: 'emotion-anchoring', title: '情绪锚定训练', duration: '5分钟', level: '入门' },
      { id: 'self-compassion', title: '自我同情练习', duration: '8分钟', level: '入门' },
    ]
  },
  {
    id: 'trauma',
    title: '创伤与疗愈',
    icon: Shield,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    description: '经历过创伤需要疗愈',
    tip: '💡 建议在专业指导下进行，先从「情绪锚定」开始建立安全感',
    recommendedTrainings: [
      { id: 'emotion-anchoring', title: '情绪锚定训练', duration: '5分钟', level: '入门' },
      { id: 'self-compassion', title: '自我同情练习', duration: '8分钟', level: '入门' },
    ]
  },
  {
    id: 'growth',
    title: '个人成长',
    icon: TrendingUp,
    color: 'text-green-400',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/30',
    description: '想要突破自我，实现成长',
    tip: '💡 建议从「微习惯启动」开始，用最小的行动建立成长飞轮',
    recommendedTrainings: [
      { id: 'micro-habit', title: '微习惯启动', duration: '3分钟', level: '入门' },
      { id: 'values-alignment', title: '价值观对齐', duration: '10分钟', level: '进阶' },
    ]
  }
]

export default function TrainingGuide() {
  const navigate = useNavigate()
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)

  const handleStartTraining = (trainingId: string) => {
    navigate(`/app/training/${trainingId}`)
  }

  const handleStartFromGuide = (guide: ProblemGuide) => {
    if (guide.recommendedTrainings.length > 0) {
      handleStartTraining(guide.recommendedTrainings[0].id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-white mb-2">你想解决什么问题？</h2>
        <p className="text-sm text-white/50">选择一个最符合你当前状态的问题，我们为你推荐合适的训练</p>
      </div>

      <div className="space-y-4">
        {PROBLEM_GUIDES.map((guide, index) => {
          const Icon = guide.icon
          const isSelected = selectedGuide === guide.id
          
          return (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'rounded-2xl border-2 transition-all',
                isSelected 
                  ? `${guide.borderColor} ${guide.bgGradient}`
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              )}
            >
              <button
                onClick={() => setSelectedGuide(isSelected ? null : guide.id)}
                className="w-full p-5 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0',
                    guide.bgGradient
                  )}>
                    <Icon size={28} className={guide.color} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-white">{guide.title}</h3>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={cn('w-6 h-6 rounded-full flex items-center justify-center', guide.bgGradient)}
                        >
                          <Check size={14} className={guide.color} />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm text-white/50">{guide.description}</p>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-4">
                      <div className={cn(
                        'p-4 rounded-xl bg-white/5 border border-white/10',
                      )}>
                        <p className="text-sm text-white/80 leading-relaxed">
                          {guide.tip}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-white/70">推荐训练</h4>
                        {guide.recommendedTrainings.map((training, idx) => (
                          <motion.button
                            key={training.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => handleStartTraining(training.id)}
                            className={cn(
                              'w-full p-4 rounded-xl border-2 border-white/10 transition-all text-left',
                              'bg-white/5 hover:bg-white/10 hover:border-violet-500/50',
                              'flex items-center justify-between group'
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                                <Sparkles size={20} className="text-violet-400" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-white text-sm">{training.title}</h5>
                                <p className="text-xs text-white/50 flex items-center gap-2">
                                  <Clock size={12} />
                                  {training.duration}
                                  <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 text-[10px]">
                                    {training.level}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <ArrowRight size={20} className="text-white/30 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                          </motion.button>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => handleStartFromGuide(guide)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          'w-full py-3 rounded-xl font-semibold text-white',
                          'bg-gradient-to-r from-violet-500 to-purple-600',
                          'flex items-center justify-center gap-2',
                          'shadow-lg shadow-violet-500/30'
                        )}
                      >
                        <span>开始训练</span>
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
