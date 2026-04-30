import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, Zap, Sparkles } from 'lucide-react'
import { getAssessmentById } from '@data/assessments'
import LegacyHeader from '../app/components/LegacyHeader'
import { PageWrapper } from '@components/layout'

export default function ModeSelect() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
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

  const realQuestionCount = assessment.questions?.length || 0
  const normalQuestionCount = Math.min(28, Math.ceil(realQuestionCount * 0.5) || 28)
  const normalDuration = Math.max(5, Math.ceil(normalQuestionCount * 10 / 60))
  const proDuration = Math.max(10, Math.ceil(realQuestionCount * 10 / 60))

  const modes = [
    {
      id: 'normal',
      icon: Zap,
      label: '⚡ 标准版',
      tag: '推荐选择',
      questionCount: `约 ${normalQuestionCount} 题`,
      duration: `约 ${normalDuration} 分钟`,
      accuracy: '高准确率',
      color: 'from-violet-500 to-pink-500',
      borderColor: 'border-violet-500/30',
      bgHover: 'hover:bg-violet-500/10',
      description: '科学抽样，去重优化，适合大多数用户快速获得准确结果'
    },
    {
      id: 'professional',
      icon: Crown,
      label: '👑 专业版',
      tag: '深度分析',
      questionCount: `全量 ${realQuestionCount || 60} 题`,
      duration: `约 ${proDuration} 分钟`,
      accuracy: '学术级精度',
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-500/30',
      bgHover: 'hover:bg-amber-500/10',
      description: '完整量表，信效度最高，适合心理学爱好者和专业人士'
    },
  ]

  const handleSelect = (mode: string) => {
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
              className={`relative overflow-hidden rounded-2xl border-2 ${mode.borderColor} ${mode.bgHover} cursor-pointer transition-all p-6 group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
                    <div className="flex items-center gap-1.5 text-white/50">
                      <span className="text-violet-400">📝</span>
                      <span>{mode.questionCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <span className="text-violet-400">⏱️</span>
                      <span>{mode.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <span className="text-violet-400">🎯</span>
                      <span>{mode.accuracy}</span>
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
