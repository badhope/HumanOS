import { useEffect, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Sparkles, BarChart3, FileText, Cloud, CloudOff, Server } from 'lucide-react'
import type { CalculationResponse as UnifiedCalculationResult } from '@services/apiClient'
import { PageWrapper } from '@components/layout'
import { useAppStore } from '../store'

const loadingSteps = [
  { icon: Brain, text: '分析答题数据...', delay: 0 },
  { icon: BarChart3, text: '计算维度得分...', delay: 0.4 },
  { icon: Sparkles, text: '生成个性画像...', delay: 0.8 },
  { icon: FileText, text: '撰写专业报告...', delay: 1.2 },
]

interface LoadingState {
  calculationSource?: 'frontend' | 'backend'
  calculationResult?: UnifiedCalculationResult
}

export default function Loading() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LoadingState
  const addCompletedAssessment = useAppStore((state) => state.addCompletedAssessment)

  const calculationInfo = useMemo(() => {
    if (state?.calculationSource === 'backend') {
      return {
        icon: Cloud,
        label: '云端引擎',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
        description: 'GPU集群加速计算中',
      }
    }
    if (state?.calculationSource === 'frontend') {
      return {
        icon: CloudOff,
        label: '本地引擎',
        color: 'text-amber-400',
        bg: 'bg-amber-500/20',
        description: '浏览器本地加密计算',
      }
    }
    return {
      icon: Server,
      label: '自动选择',
      color: 'text-violet-400',
      bg: 'bg-violet-500/20',
      description: '最优计算节点分配中',
    }
  }, [state])

  const loadTime = state?.calculationResult?.latency
    ? Math.max(1500, 2500 - state.calculationResult.latency)
    : 2500

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state?.calculationResult) {
        addCompletedAssessment({
          id: id!,
          assessmentId: state.calculationResult.assessment_id || id!,
          answers: [],
          result: state.calculationResult,
          completedAt: new Date(),
        })
      }
      
      navigate(`/legacy/results/${id}`, { state: state?.calculationResult })
    }, loadTime)

    return () => clearTimeout(timer)
  }, [id, navigate, loadTime, state, addCompletedAssessment])

  const InfoIcon = calculationInfo.icon

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

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${calculationInfo.bg}`}>
            <InfoIcon className={`w-4 h-4 ${calculationInfo.color}`} />
            <span className={`text-sm ${calculationInfo.color} font-medium`}>
              {calculationInfo.label}
            </span>
            <span className="text-white/40 text-xs">·</span>
            <span className="text-white/60 text-sm">
              {calculationInfo.description}
            </span>
            {state?.calculationResult?.latency && (
              <>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/60 text-sm">
                  {state.calculationResult.latency}ms
                </span>
              </>
            )}
          </div>
        </motion.div>

        <div className="space-y-3 max-w-md mx-auto">
          {loadingSteps.map((step, index) => {
            const Icon = step.icon
            return (
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
                  <Icon className="w-5 h-5 text-violet-400" />
                </motion.div>
                <span className="text-white/80 text-sm">{step.text}</span>
              </motion.div>
            )
          })}
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
