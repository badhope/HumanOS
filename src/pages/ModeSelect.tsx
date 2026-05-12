import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, Zap, Sparkles } from 'lucide-react'
import { getAssessmentById } from '@data/assessments'
import LegacyHeader from '../app/components/LegacyHeader'
import { PageWrapper } from '@components/layout'

const MAX_NORMAL_QUESTIONS = 28

export default function ModeSelect() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const assessment = id ? getAssessmentById(id) : undefined

  if (!assessment) {
    return (
      <PageWrapper type="standard" background="gradient">
        <LegacyHeader title="测评不存在" />
        <div className="pt-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">测评不存在</h2>
            <button
              onClick={() => navigate('/app/discover')}
              className="px-6 py-3 rounded-xl bg-violet-500 text-white"
              type="button"
            >
              返回探索
            </button>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const totalQuestionCount = assessment.questions?.length || 0
  const hasProfessionalQuestions = !!(assessment as any).professionalQuestions
  const normalQuestionCount = hasProfessionalQuestions
    ? (assessment as any).professionalQuestions.normal?.length || totalQuestionCount
    : Math.min(MAX_NORMAL_QUESTIONS, totalQuestionCount)
  const proQuestionCount = totalQuestionCount
  const normalDuration = Math.max(3, Math.ceil(normalQuestionCount * 10 / 60))
  const proDuration = Math.max(10, Math.ceil(proQuestionCount * 10 / 60))

  const modes = [
    {
      id: 'normal',
      icon: Zap,
      label: '⚡ 标准版',
      tag: '推荐选择',
      questionCount: `${normalQuestionCount} 题`,
      duration: `约 ${normalDuration} 分钟`,
      accuracy: '高准确率',
      color: 'from-violet-400 to-pink-400',
      borderColor: 'border-violet-400/50 bg-white/5',
      bgHover: 'hover:bg-violet-500/10',
      description: normalQuestionCount < totalQuestionCount
        ? `从${totalQuestionCount}题中科学抽样${normalQuestionCount}题，去重优化，快速获得准确结果`
        : `${normalQuestionCount}道精选题目，适合快速获得准确结果`
    },
    {
      id: 'professional',
      icon: Crown,
      label: '👑 专业版',
      tag: '暂不开放',
      questionCount: `全量 ${proQuestionCount} 题`,
      duration: `约 ${proDuration} 分钟`,
      accuracy: '学术级精度',
      color: 'from-gray-500 to-gray-600',
      borderColor: 'border-gray-500/30',
      bgHover: '',
      description: '完整量表正在升级维护中，敬请期待',
      disabled: true,
    },
  ]

  const handleSelect = (mode: string) => {
    if (mode === 'professional') {
      return
    }
    navigate(`/legacy/confirm/${id}?mode=${mode}`)
  }

  return (
    <PageWrapper type="standard" background="gradient">
      <LegacyHeader title={assessment.title || '选择版本'} />
      
      <div className="pt-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">选择测评版本</h1>
          <p className="text-white/60">{assessment.title}</p>
        </motion.div>

        <div className="space-y-4">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={() => handleSelect(mode.id)}
              className={`relative overflow-hidden rounded-2xl border-2 ${mode.borderColor} ${mode.bgHover} ${mode.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} transition-all p-6 group`}
              whileHover={mode.disabled ? {} : { scale: 1.02 }}
              whileTap={mode.disabled ? {} : { scale: 0.98 }}
            >
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${mode.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center shrink-0 shadow-lg`}>
                  <mode.icon className="w-7 h-7 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-white text-lg">{mode.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${mode.color} text-white font-medium`}>
                      {mode.tag}
                    </span>
                  </div>
                  
                  <p className="text-white/60 text-sm mb-3">{mode.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-white/70">
                      <span className="text-violet-400">📝</span>
                      <span className="text-white/90">{mode.questionCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70">
                      <span className="text-violet-400">⏱️</span>
                      <span className="text-white/90">{mode.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70">
                      <span className="text-violet-400">🎯</span>
                      <span className="text-white/90">{mode.accuracy}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white/40 text-sm">
            💡 不确定选哪个？选择「标准版」就好，大多数人都用这个
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
