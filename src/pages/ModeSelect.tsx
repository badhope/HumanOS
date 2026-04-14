import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Crown, Loader2 } from 'lucide-react'
import { getAssessmentById } from '@data/assessments'

export default function ModeSelect() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const assessment = id ? getAssessmentById(id) : undefined

  useEffect(() => {
    if (assessment) {
      const timer = setTimeout(() => {
        navigate(`/confirm/${id}?mode=professional`)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [assessment, id, navigate])

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30"
        >
          <Crown className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-3"
        >
          专业测评模式
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-lg mb-2"
        >
          {assessment.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-amber-400 mt-8"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">正在准备标准化测评...</span>
        </motion.div>
      </div>
    </div>
  )
}
