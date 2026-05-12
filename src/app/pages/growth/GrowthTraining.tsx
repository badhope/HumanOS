import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Brain, Zap, Clock, ChevronRight, Heart, Users, Gamepad2, Briefcase } from 'lucide-react'
import {
  EMOTION_TRAININGS_FULL,
  COGNITION_TRAININGS_FULL,
  ATTACHMENT_TRAININGS_FULL,
  SOCIAL_TRAININGS_FULL,
  FUN_TRAININGS_FULL,
  CAREER_TRAININGS,
  MINDFULNESS_TRAININGS,
} from '../../data/training-library'
import type { TrainingProgram } from '../../components/training/TrainingEngine'

const trainingCategories = [
  {
    id: 'emotion',
    title: '情绪管理',
    description: '系统提升情绪调节能力',
    icon: Brain,
    badge: '推荐',
    color: 'violet',
    colorGradient: 'from-violet-500/30 to-purple-500/30',
    colorBorder: 'border-violet-500/20',
    colorText: 'text-violet-400',
    trainings: EMOTION_TRAININGS_FULL,
  },
  {
    id: 'cognition',
    title: '思维认知',
    description: '提升思维能力，优化认知模式',
    icon: Brain,
    badge: '热门',
    color: 'blue',
    colorGradient: 'from-blue-500/30 to-cyan-500/30',
    colorBorder: 'border-blue-500/20',
    colorText: 'text-blue-400',
    trainings: COGNITION_TRAININGS_FULL,
  },
  {
    id: 'attachment',
    title: '亲密关系',
    description: '理解依恋模式，建立健康关系',
    icon: Heart,
    badge: '推荐',
    color: 'pink',
    colorGradient: 'from-pink-500/30 to-rose-500/30',
    colorBorder: 'border-pink-500/20',
    colorText: 'text-pink-400',
    trainings: ATTACHMENT_TRAININGS_FULL,
  },
  {
    id: 'social',
    title: '人际社交',
    description: '提升人际交往能力',
    icon: Users,
    badge: '',
    color: 'emerald',
    colorGradient: 'from-emerald-500/30 to-teal-500/30',
    colorBorder: 'border-emerald-500/20',
    colorText: 'text-emerald-400',
    trainings: SOCIAL_TRAININGS_FULL,
  },
  {
    id: 'mindfulness',
    title: '正念冥想',
    description: '培养当下觉察能力',
    icon: Zap,
    badge: '',
    color: 'amber',
    colorGradient: 'from-amber-500/30 to-orange-500/30',
    colorBorder: 'border-amber-500/20',
    colorText: 'text-amber-400',
    trainings: MINDFULNESS_TRAININGS,
  },
  {
    id: 'career',
    title: '职业发展',
    description: '规划职业路径，实现目标',
    icon: Briefcase,
    badge: '',
    color: 'violet',
    colorGradient: 'from-violet-500/30 to-indigo-500/30',
    colorBorder: 'border-violet-500/20',
    colorText: 'text-violet-400',
    trainings: CAREER_TRAININGS,
  },
  {
    id: 'fun',
    title: '趣味娱乐',
    description: 'ACG主题趣味训练',
    icon: Gamepad2,
    badge: '趣味',
    color: 'orange',
    colorGradient: 'from-orange-500/30 to-amber-500/30',
    colorBorder: 'border-orange-500/20',
    colorText: 'text-orange-400',
    trainings: FUN_TRAININGS_FULL,
  },
]

function TrainingCard({ training, colorConfig }: { training: TrainingProgram; colorConfig: any }) {
  const navigate = useNavigate()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => navigate(`/app/training/${training.id}`)}
      className={`p-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.01] ${
        training.category === 'fun'
          ? 'bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-rose-500/10 border-orange-500/10 hover:border-orange-500/30'
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{training.icon}</span>
          <div>
            <h4 className="font-medium text-white text-sm">{training.title}</h4>
            <p className="text-xs text-white/50">{training.subtitle}</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] ${
          training.category === 'fun'
            ? 'bg-orange-500/20 text-orange-300'
            : training.level === 1
            ? 'bg-emerald-500/20 text-emerald-300'
            : training.level === 2
            ? 'bg-blue-500/20 text-blue-300'
            : 'bg-purple-500/20 text-purple-300'
        }`}>
          L{training.level} {training.levelLabel}
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {training.duration}
        </span>
        <span>{training.exercises.length} 个练习</span>
      </div>
      
      <div className="flex gap-1 flex-wrap">
        {training.benefits.slice(0, 2).map((benefit, i) => (
          <span key={i} className="inline-block px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/40">
            {benefit.length > 15 ? benefit.slice(0, 15) + '...' : benefit}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function CategorySection({ category }: { category: typeof trainingCategories[0] }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = category.icon
  const displayedTrainings = expanded ? category.trainings : category.trainings.slice(0, 3)
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center ${category.colorText}`}>
            <Icon size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{category.title}</h3>
            <p className="text-[10px] text-white/40">{category.description}</p>
          </div>
        </div>
        {category.badge && (
          <span className={`px-2 py-0.5 rounded text-[10px] ${category.colorGradient} ${category.colorText}`}>
            {category.badge}
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        {displayedTrainings.map((training) => (
          <TrainingCard key={training.id} training={training} colorConfig={category} />
        ))}
      </div>
      
      {category.trainings.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-3 py-2 text-xs text-white/50 hover:text-white/70 transition-colors flex items-center justify-center gap-1"
        >
          {expanded ? '收起' : `查看全部 ${category.trainings.length} 个训练`}
          <ChevronRight size={14} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
      )}
    </div>
  )
}

export default function GrowthTraining() {
  const navigate = useNavigate()

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => navigate('/app/discover')}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          返回探索
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">🏋️ 训练计划</h1>
        <p className="text-xs sm:text-sm text-white/60">系统训练，遇见更好的自己</p>
      </motion.div>

      <div className="space-y-2">
        {trainingCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
