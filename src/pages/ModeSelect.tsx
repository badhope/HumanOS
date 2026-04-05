import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Target, Award, Sparkles, Zap, Crown, Home } from 'lucide-react'
import { getAssessmentById } from '@data/assessments'
import { cn } from '@utils/cn'
import {
  mbtiProfessionalQuestions,
  bigFiveProfessionalQuestions,
  sasProfessionalQuestions,
  eqProfessionalQuestions,
  hollandProfessionalQuestions,
  ecrProfessionalQuestions,
  mlqProfessionalQuestions,
  kolbProfessionalQuestions,
  pssProfessionalQuestions,
  watsonGlaserQuestions,
  iqProfessionalQuestions,
  politicalIdeologyQuestions,
  sdsProfessionalQuestions,
} from '@data/professional'

const professionalQuestionCounts: Record<string, number> = {
  'mbti-standard': mbtiProfessionalQuestions.professional.length,
  'mbti': mbtiProfessionalQuestions.professional.length,
  'big-five': bigFiveProfessionalQuestions.professional.length,
  'bigfive': bigFiveProfessionalQuestions.professional.length,
  'anxiety-scale': sasProfessionalQuestions.professional.length,
  'anxiety': sasProfessionalQuestions.professional.length,
  'emotional-intelligence': eqProfessionalQuestions.professional.length,
  'eq-test': eqProfessionalQuestions.professional.length,
  'holland-career': hollandProfessionalQuestions.professional.length,
  'holland': hollandProfessionalQuestions.professional.length,
  'attachment-style': ecrProfessionalQuestions.professional.length,
  'attachment': ecrProfessionalQuestions.professional.length,
  'leadership-style': mlqProfessionalQuestions.professional.length,
  'leadership': mlqProfessionalQuestions.professional.length,
  'learning-style': kolbProfessionalQuestions.professional.length,
  'critical-thinking': watsonGlaserQuestions.professional.length,
  'stress-management': pssProfessionalQuestions.professional.length,
  'iq-test': iqProfessionalQuestions.professional.length,
  'iq': iqProfessionalQuestions.professional.length,
  'political-ideology': politicalIdeologyQuestions.professional.length,
  'political': politicalIdeologyQuestions.professional.length,
  'sds-depression': sdsProfessionalQuestions.professional.length,
  'sds': sdsProfessionalQuestions.professional.length,
}

const modes = [
  {
    id: 'normal',
    name: '普通模式',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    description: '快速了解基本情况',
    features: [
      '基础题量（约50%）',
      '核心维度分析',
      '基础准确度',
      '快速完成',
    ],
    timeMultiplier: 0.5,
    questionMultiplier: 0.5,
  },
  {
    id: 'advanced',
    name: '高级模式',
    icon: Award,
    color: 'from-violet-500 to-pink-500',
    bgColor: 'from-violet-500/20 to-pink-500/20',
    description: '深入了解个人特质',
    features: [
      '标准题量（约75%）',
      '多维度分析',
      '较高准确度',
      '详细报告',
    ],
    timeMultiplier: 0.75,
    questionMultiplier: 0.75,
    recommended: true,
  },
  {
    id: 'professional',
    name: '专业模式',
    icon: Crown,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-500/20 to-orange-500/20',
    description: '全面专业评估',
    features: [
      '完整题量（100%）',
      '全维度深度分析',
      '最高准确度',
      '专业报告+建议',
    ],
    timeMultiplier: 1,
    questionMultiplier: 1,
  },
]

export default function ModeSelect() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const assessment = id ? getAssessmentById(id) : undefined

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">测评不存在</h2>
          <button
            onClick={() => navigate('/assessments')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white"
            type="button"
          >
            返回测评列表
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            type="button"
          >
            <Home className="w-5 h-5" />
            返回主页
          </motion.button>
          <span className="text-white/30">|</span>
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
            返回上一页
          </motion.button>
        </motion.div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-block px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            {assessment.category}
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {assessment.title}
          </motion.h1>

          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {assessment.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial="initial"
          animate="enter"
          variants={{
            enter: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {modes.map((mode) => {
            const Icon = mode.icon
            const estimatedTime = Math.round(assessment.duration * mode.timeMultiplier)
            let questionCount: number
            if (mode.id === 'professional') {
              questionCount = professionalQuestionCounts[assessment.id] || assessment.questions.length
            } else {
              questionCount = Math.round(assessment.questions.length * mode.questionMultiplier)
            }

            return (
              <motion.div
                key={mode.id}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  enter: { opacity: 1, y: 0 },
                }}
                className={cn(
                  'relative rounded-3xl overflow-hidden cursor-pointer group',
                  mode.recommended && 'ring-2 ring-violet-500'
                )}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/confirm/${id}?mode=${mode.id}`)}
              >
                {mode.recommended && (
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div
                      className="px-3 py-1 rounded-full bg-violet-500 text-white text-xs font-semibold flex items-center gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                    >
                      <Sparkles className="w-3 h-3" />
                      推荐
                    </motion.div>
                  </div>
                )}

                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-90',
                  mode.color
                )} />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                <div className="relative p-6 flex flex-col h-full min-h-[24rem]">
                  <div className="mb-6">
                    <motion.div
                      className={cn(
                        'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4',
                        mode.bgColor
                      )}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {mode.name}
                    </h3>

                    <p className="text-white/70 text-sm">
                      {mode.description}
                    </p>
                  </div>

                  <div className="flex-grow space-y-3 mb-6">
                    {mode.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2 text-white/80 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>约 {estimatedTime} 分钟</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Target className="w-4 h-4" />
                      <span>{questionCount} 道题目</span>
                    </div>
                  </div>

                  <div className="px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white text-center font-semibold group-hover:bg-white/30 transition-colors">
                    开始测评 →
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="text-center text-white/40 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          选择适合你的模式，开始探索自我
        </motion.div>
      </div>
    </div>
  )
}
