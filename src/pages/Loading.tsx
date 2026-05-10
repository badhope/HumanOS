import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'
import { PageWrapper } from '@components/layout'
import { useAppStore } from '../store'

const loadingSteps = [
  { text: '分析答题数据', delay: 0 },
  { text: '计算维度得分', delay: 0.4 },
  { text: '生成个性画像', delay: 0.8 },
  { text: '撰写专业报告', delay: 1.2 },
]

export default function Loading() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addCompletedAssessment = useAppStore((state) => state.addCompletedAssessment)

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/legacy/results/${id}`)
    }, 2500)

    return () => clearTimeout(timer)
  }, [id, navigate])

  return (
    <PageWrapper type="standard" background="gradient" centered>
      <div className="text-center">
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-violet-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-pink-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-violet-500/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Brain className="w-12 h-12 text-violet-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          正在生成您的测评报告
        </motion.h1>

        <div className="space-y-3 max-w-md mx-auto">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={step.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay + 0.5 }}
              className="flex items-center gap-3 glass rounded-xl px-4 py-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: index * 0.2 }}
              >
                <Brain className="w-5 h-5 text-violet-400" />
              </motion.div>
              <span className="text-white/80 text-sm">{step.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-violet-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  )
}
