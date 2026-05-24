import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  Clock, List, ArrowLeft, 
  Sparkles, Brain, Heart, Shield, Zap,
  CheckCircle2, Star, Users, Target, Loader2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { apiService, type Assessment } from '../../../services/api'
import { useAppStore } from '../../../store'

const CATEGORY_ICONS: Record<string, typeof Brain> = {
  '人格': Brain,
  '关系': Heart,
  '心理': Shield,
  '职业': Users,
  '价值观': Star,
  '趣味': Sparkles,
  '意识形态': Target,
}

const CATEGORY_COLORS: Record<string, string> = {
  '人格': 'from-violet-500 to-purple-500',
  '关系': 'from-pink-500 to-rose-500',
  '心理': 'from-blue-500 to-cyan-500',
  '职业': 'from-emerald-500 to-teal-500',
  '价值观': 'from-amber-500 to-orange-500',
  '趣味': 'from-fuchsia-500 to-pink-500',
  '意识形态': 'from-violet-500 to-fuchsia-500',
}

export default function AssessmentIntro() {
  const { assessmentId } = useParams<{ assessmentId: string }>()
  const navigate = useNavigate()
  
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const currentAssessmentMode = useAppStore((state) => state.currentAssessmentMode)
  const setCurrentAssessment = useAppStore((state) => state.setCurrentAssessment)

  // 如果路由没有参数，默认是ideology-enhanced
  const actualAssessmentId = assessmentId || 'ideology-enhanced'
  const isEnhancedIdeology = actualAssessmentId === 'ideology-enhanced'

  // 如果是增强版意识形态评估但没有选择模式，重定向到模式选择页面
  useEffect(() => {
    if (isEnhancedIdeology && !currentAssessmentMode) {
      navigate('/app/assessment/ideology-enhanced/mode-select')
    }
  }, [isEnhancedIdeology, currentAssessmentMode, navigate])

  // 获取测评信息
  useEffect(() => {
    const fetchAssessment = async () => {
      if (!actualAssessmentId) return
      
      setLoading(true)
      setError(null)
      
      try {
        const data = await apiService.getAssessment(actualAssessmentId)
        setAssessment(data)
      } catch (err) {
        console.error('获取测评失败:', err)
        setError('无法加载测评信息，请稍后重试')
      } finally {
        setLoading(false)
      }
    }

    fetchAssessment()
  }, [actualAssessmentId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">加载中...</p>
        </div>
      </div>
    )
  }

  if (error || !assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            {error || '测评未找到'}
          </h2>
          <button
            onClick={() => navigate('/app/assessments')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white"
          >
            返回测评列表
          </button>
        </div>
      </div>
    )
  }

  const CategoryIcon = CATEGORY_ICONS[assessment.category] || Brain
  const gradientColor = CATEGORY_COLORS[assessment.category] || 'from-violet-500 to-purple-500'

  const handleStartAssessment = () => {
    navigate(`/app/assessment/${actualAssessmentId}/start`)
  }

  const modeLabel = currentAssessmentMode === 'professional' ? '专业版' : '普通版'
  const questionCount = isEnhancedIdeology && currentAssessmentMode === 'professional' 
    ? assessment.professional_question_count 
    : assessment.normal_question_count
  const estimatedTime = isEnhancedIdeology 
    ? (currentAssessmentMode === 'professional' ? '~12分钟' : '~6分钟')
    : `~${assessment.duration}分钟`

  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${gradientColor} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br ${gradientColor} opacity-10 rounded-full blur-3xl`} />
      </div>

      <div className="relative z-10 p-4">
        <button
          onClick={() => navigate('/app/assessments')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回测评列表</span>
        </button>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${gradientColor}/20 rounded-3xl p-6 border border-white/10`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
              <CategoryIcon size={32} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white mb-2 break-words">{assessment.title}</h1>
              {isEnhancedIdeology && (
                <div className="mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentAssessmentMode === 'professional' 
                      ? 'bg-purple-500/30 text-purple-300' 
                      : 'bg-blue-500/30 text-blue-300'
                  }`}>
                    {modeLabel}
                  </span>
                </div>
              )}
              <p className="text-white/60 break-words">{assessment.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <List size={20} className="mx-auto mb-1 text-violet-400" />
              <p className="text-lg font-bold text-white">{questionCount}题</p>
              <p className="text-xs text-white/50">题目数量</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <Clock size={20} className="mx-auto mb-1 text-emerald-400" />
              <p className="text-lg font-bold text-white">{estimatedTime}</p>
              <p className="text-xs text-white/50">预计时长</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <CheckCircle2 size={20} className="mx-auto mb-1 text-amber-400" />
              <p className="text-lg font-bold text-white">{assessment.quality}</p>
              <p className="text-xs text-white/50">测评类型</p>
            </div>
          </div>

          {assessment.badge && (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm">
              <Sparkles size={14} />
              {assessment.badge}
            </div>
          )}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <h2 className="text-lg font-semibold text-white mb-3">测评说明</h2>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
              <span className="break-words">请根据您的真实情况作答，无对错之分</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
              <span className="break-words">答题过程中可随时退出，进度会自动保存</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
              <span className="break-words">完成后将生成专属分析报告</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 mt-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleStartAssessment}
          className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${gradientColor}`}
        >
          开始测评
        </motion.button>
      </div>
    </div>
  )
}
