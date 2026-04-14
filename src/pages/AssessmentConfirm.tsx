import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Target, Sparkles, Play, AlertCircle, ChevronDown, ChevronUp, Home } from 'lucide-react'
import { getAssessmentById } from '@data/assessments'
import ProfessionalCredibility from '@components/ProfessionalCredibility'
import { useState } from 'react'

export default function AssessmentConfirm() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const assessment = id ? getAssessmentById(id) : undefined
  const mode = searchParams.get('mode') || 'normal'
  const [showCredibility, setShowCredibility] = useState(false)

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

  const handleStart = () => {
    navigate(`/assessment/${id}?mode=${mode}`)
  }

  const realQuestionCount = assessment.questions?.length || 0
  const questionCount = realQuestionCount || assessment.questionCount || 40
  const durationMinutes = Math.max(3, Math.ceil(questionCount * 8 / 60))
  const qualityLabel = {
    lite: '科学',
    standard: '专业',
    expert: '学术',
  }[assessment.difficulty] || '专业'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 text-center mb-8"
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Play className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            准备开始测评
          </motion.h1>

          <motion.div
            className="inline-block px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {assessment.title}
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="glass rounded-xl p-4">
              <Clock className="w-6 h-6 text-violet-400 mx-auto mb-2" />
              <p className="text-white font-semibold">{durationMinutes} 分钟</p>
              <p className="text-white/50 text-sm">预计时长</p>
            </div>
            <div className="glass rounded-xl p-4">
              <Target className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-white font-semibold">{questionCount} 题</p>
              <p className="text-white/50 text-sm">题目数量</p>
            </div>
            <div className="glass rounded-xl p-4">
              <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-white font-semibold">{qualityLabel}</p>
              <p className="text-white/50 text-sm">测评质量</p>
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-xl p-4 mb-8 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-white/70 text-sm space-y-2">
                <p>• 每题限时 <span className="text-white font-semibold">30秒</span>，超时将自动跳过</p>
                <p>• 请在安静环境下完成测评，确保答案准确</p>
                <p>• 测评过程中请保持专注，中途退出将不计入结果</p>
                <p>• 完成所有题目后即可查看专业分析报告</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={() => navigate(-1)}
              className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 border border-white/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              再想想
            </motion.button>

            <motion.button
              onClick={handleStart}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <Play className="w-5 h-5" />
              开始测评
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowCredibility(!showCredibility)}
            className="w-full flex items-center justify-center gap-2 py-4 text-white/60 hover:text-white transition-colors glass rounded-xl"
            type="button"
          >
            <span className="font-medium">查看专业可信度详情</span>
            {showCredibility ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </motion.div>

        {showCredibility && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-3xl p-8"
          >
            <ProfessionalCredibility />
          </motion.div>
        )}
      </div>
    </div>
  )
}
