import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Trophy, Loader2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { QRCodeSVG } from 'qrcode.react'
import { useAppStore } from '../../store'
import { getAssessmentById } from '../../data/assessments'
import { apiService, type Result as ApiResult } from '../../services/api'
import ReportRenderer from '../../components/reports/ReportRenderer'
import ResultExportButton from '../../components/ResultExportButton'

export default function AssessmentResult() {
  const { assessmentId, resultId } = useParams<{ assessmentId: string; resultId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as any
  const completedAssessments = useAppStore((state) => state.completedAssessments)
  const addCompletedAssessment = useAppStore((state) => state.addCompletedAssessment)
  const [showQRCode, setShowQRCode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [backendResult, setBackendResult] = useState<ApiResult | null>(null)
  const reportRef = useRef<HTMLDivElement>(null)

  const resultRecord = completedAssessments.find((a) => a.id === resultId)
  const assessment = resultRecord ? getAssessmentById(resultRecord.assessmentId) : 
                      assessmentId ? getAssessmentById(assessmentId) : undefined
  
  const stateResult = locationState?.calculationResult || locationState?.result || locationState

  const [recordFound, setRecordFound] = useState(!!resultRecord || !!stateResult)

  // 从后端获取结果
  useEffect(() => {
    const fetchBackendResult = async () => {
      if (!resultId || loading || backendResult) return
      
      setLoading(true)
      try {
        const result = await apiService.getResult(resultId)
        setBackendResult(result)
      } catch (err) {
        console.error('从后端获取结果失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBackendResult()
  }, [resultId])

  useEffect(() => {
    if (!resultId || !assessmentId) {
      navigate('/app/assessments')
      return
    }

    if (stateResult && !resultRecord) {
      addCompletedAssessment({
        id: resultId,
        assessmentId,
        answers: [],
        result: stateResult,
        completedAt: new Date(),
        mode: (stateResult.mode as 'normal' | 'advanced' | 'professional') || 'normal',
      })
      setRecordFound(true)
      return
    }

    if (resultRecord) {
      setRecordFound(true)
      return
    }

    let attempts = 0
    const maxAttempts = 50
    const retryInterval = setInterval(() => {
      attempts++
      const latestRecord = useAppStore.getState().completedAssessments.find((a) => a.id === resultId)
      
      if (latestRecord) {
        clearInterval(retryInterval)
        setRecordFound(true)
        return
      }
      
      if (attempts >= maxAttempts) {
        clearInterval(retryInterval)
        setRecordFound(false)
      }
    }, 100)
    
    return () => clearInterval(retryInterval)
  }, [resultId, assessmentId, resultRecord, stateResult, navigate, addCompletedAssessment])

  useEffect(() => {
    if (!resultRecord && !stateResult) return

    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [resultRecord])

  if (!recordFound && !resultRecord && !stateResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">正在加载测评结果...</h2>
          <p className="text-white/60 mb-6">请稍候，正在同步数据</p>
          <button
            onClick={() => navigate('/app/assessments')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors"
          >
            返回测评列表
          </button>
        </div>
      </div>
    )
  }

  const effectiveResult = resultRecord?.result || stateResult
  const effectiveAssessment = assessment || (effectiveResult?.type ? getAssessmentById(effectiveResult.type) : undefined)

  if (!effectiveResult || !effectiveAssessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">未找到测评结果</h2>
          <p className="text-white/60 mb-6">可能是页面刷新导致数据丢失，请重新完成测评</p>
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

  // 提取意识形态相关数据
  const extractIdeologyData = () => {
    // 检查是否有 modules 数据 (来自专业计算器)
    if (effectiveResult.modules) {
      const modules = effectiveResult.modules as Record<string, any>
      const ideologyScores = new Map<string, number>()
      
      // 映射模块到意识形态维度
      const moduleMapping: Record<string, string> = {
        'economic': 'economic',
        'social': 'social', 
        'diplomatic': 'global',
        'governance': 'state',
        'civil_liberty': 'state',
        'cultural': 'social',
        'technological': 'tech'
      }
      
      // 提取每个维度的百分比
      Object.entries(modules).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && 'percentage' in value) {
          const mappedKey = moduleMapping[key] || key
          ideologyScores.set(mappedKey, value.percentage)
        } else if (typeof value === 'number') {
          const mappedKey = moduleMapping[key] || key
          ideologyScores.set(mappedKey, value)
        }
      })
      
      // 提取主要意识形态
      let primaryIdeology = 'centrist'
      if (effectiveResult.primaryMatch?.id) {
        primaryIdeology = effectiveResult.primaryMatch.id
      } else if (effectiveResult.composite) {
        const composite = effectiveResult.composite as any
        const lr = composite.leftRight || 50
        const al = composite.authoritarianLibertarian || 50
        if (lr < 40) {
          primaryIdeology = al < 40 ? 'libertarian-left' : al > 60 ? 'authoritarian-left' : 'progressive'
        } else if (lr > 60) {
          primaryIdeology = al < 40 ? 'libertarian-right' : al > 60 ? 'authoritarian-right' : 'conservative'
        }
      }
      
      return { ideologyScores, primaryIdeology }
    }
    
    // 如果没有模块数据，尝试从 dimensions 中提取
    if (effectiveResult.dimensions) {
      const dimensions = Array.isArray(effectiveResult.dimensions) 
        ? effectiveResult.dimensions 
        : Object.values(effectiveResult.dimensions)
      
      const ideologyScores = new Map<string, number>()
      dimensions.forEach((dim: any) => {
        if (dim.name && dim.score !== undefined) {
          ideologyScores.set(dim.name.toLowerCase(), dim.score)
        }
      })
      
      return { ideologyScores, primaryIdeology: 'centrist' }
    }
    
    return { ideologyScores: new Map(), primaryIdeology: 'centrist' }
  }

  const isEnhancedIdeology = assessmentId === 'ideology-enhanced'
  const { ideologyScores, primaryIdeology } = extractIdeologyData()

  const displayMode = resultRecord?.mode || effectiveResult.mode || 'normal'
  const displayAccuracy = effectiveResult.accuracy || 85

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
      <div id="result-export-container" className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.button
            onClick={() => {
              if (isEnhancedIdeology) {
                navigate('/app/assessment/ideology-enhanced/mode-select')
              } else {
                navigate(`/app/assessment/${assessmentId}`)
              }
            }}
            className="flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">返回测评介绍</span>
          </motion.button>
          <span className="text-white/30 hidden sm:inline">|</span>
          <motion.button
            onClick={() => navigate('/app/assessments')}
            className="flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">测评列表</span>
          </motion.button>
          <span className="text-white/30 hidden sm:inline">|</span>
          <motion.button
            onClick={() => navigate('/app/training')}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs sm:text-sm font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">开启训练</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            您的测评报告
          </motion.h1>
          <motion.div
            className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white/60 text-sm sm:text-base">{effectiveAssessment.title}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
              displayMode === 'professional'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
            }`}>
              {displayMode === 'professional' ? '专业版' : '标准版'}
            </span>
            <span className="text-white/60 text-xs sm:text-sm">· 准确度 {displayAccuracy}%</span>
          </motion.div>
        </motion.div>

        <div ref={reportRef}>
          <ReportRenderer
            result={effectiveResult}
            assessmentType={effectiveAssessment.id}
            mode={(displayMode as 'normal' | 'advanced' | 'professional') || 'normal'}
            calculationMetadata={effectiveResult?._calculationMetadata}
            ideologyScores={ideologyScores}
            primaryIdeology={primaryIdeology}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <ResultExportButton
            resultId={resultId || 'result'}
            title={effectiveAssessment?.title || '测评报告'}
            resultData={resultRecord}
            resultHash={effectiveResult?.result_hash}
            onShowQRCode={() => setShowQRCode(true)}
          />

          <motion.button
            onClick={() => {
              if (isEnhancedIdeology) {
                navigate('/app/assessment/ideology-enhanced/mode-select')
              } else {
                navigate(`/app/assessment/${assessmentId}`)
              }
            }}
            className="flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-4 rounded-xl glass text-white text-sm sm:text-base font-semibold hover:bg-white/10 border border-white/20 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            重新测评
          </motion.button>

          <motion.button
            onClick={() => navigate('/app/training')}
            className="flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">开启训练</span>
          </motion.button>
        </motion.div>
      </div>

      {showQRCode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowQRCode(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-sm w-full"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center mb-4 sm:mb-6">扫码分享</h3>
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 flex items-center justify-center">
              <QRCodeSVG
                value={window.location.href}
                size={140}
                level="H"
                includeMargin
              />
            </div>
            <p className="text-white/60 text-center mt-4 text-sm">
              扫描二维码查看测评报告
            </p>
            <button
              onClick={() => setShowQRCode(false)}
              className="w-full mt-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-violet-500 text-white font-medium sm:font-semibold hover:bg-violet-600 transition-colors text-sm sm:text-base"
            >
              关闭
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
