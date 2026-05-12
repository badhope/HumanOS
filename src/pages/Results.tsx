/**
 * ==============================================
 * 📊 测评结果报告页面组件
 * ==============================================
 * 【页面功能】
 * - 24种测评报告自动渲染
 * - 结果导出：图片/PDF/文字
 * - 分享功能：二维码/链接
 * - 撒花庆祝动画
 * 
 * 【核心机制】
 * - 根据测评ID自动匹配对应Report组件
 * - html2canvas + jsPDF 导出完整PDF
 * - QRCode实时生成分享链接
 * - 结果存在全局Store做跨页分析
 */

import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, QrCode, Home, Trophy, Clock, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { QRCodeSVG } from 'qrcode.react'
import { useAppStore } from '../store'
import { getAssessmentById } from '@data/assessments'
import ReportRouter from '@components/reports/lazy'
import ResultExportButton from '@components/ResultExportButton'
import { KnowledgeInjector } from '@components/reports/KnowledgePanel'

export default function Results() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = location.state as any
  const completedAssessments = useAppStore((state) => state.completedAssessments)
  const addCompletedAssessment = useAppStore((state) => state.addCompletedAssessment)
  const [showQRCode, setShowQRCode] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const resultRecord = completedAssessments.find((a) => a.id === id)

  const assessment = resultRecord ? getAssessmentById(resultRecord.assessmentId) : undefined
  
  const stateResult = locationState?.calculationResult || locationState?.result || locationState

  const [recordFound, setRecordFound] = useState(!!resultRecord || !!stateResult)

  useEffect(() => {
    if (!id) {
      navigate('/assessments')
      return
    }

    if (stateResult && !resultRecord) {
      const assessmentId = stateResult.assessment_id || stateResult.assessmentId || stateResult.type || id!
      addCompletedAssessment({
        id: id!,
        assessmentId,
        answers: [],
        result: stateResult,
        completedAt: new Date(),
        mode: (stateResult.mode as 'normal' | 'advanced' | 'professional') || 'normal',
      })
      console.log('✅ 结果已自动持久化到Store')
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
      const latestRecord = useAppStore.getState().completedAssessments.find((a) => a.id === id)
      
      if (latestRecord) {
        clearInterval(retryInterval)
        console.log(`✅ 测评记录找到，用时 ${attempts * 100}ms`)
        setRecordFound(true)
        return
      }
      
      if (attempts >= maxAttempts) {
        clearInterval(retryInterval)
        console.log(`❌ 未找到测评记录，重试了 ${attempts} 次`)
        setRecordFound(false)
      }
    }, 100)
    
    return () => clearInterval(retryInterval)
  }, [id, resultRecord, stateResult, navigate, addCompletedAssessment])

  useEffect(() => {
    if (!resultRecord && !stateResult) return

    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

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
  }, [resultRecord, navigate])

  if (!recordFound && !resultRecord && !stateResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">正在加载测评结果...</h2>
          <p className="text-white/60 mb-6">请稍候，正在同步数据</p>
          <button
            onClick={() => navigate('/app/discover')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors"
            type="button"
          >
            返回探索
          </button>
        </div>
      </div>
    )
  }

  const effectiveResult = resultRecord?.result || stateResult
  const effectiveAssessment = assessment || (effectiveResult?.type ? getAssessmentById(effectiveResult.type) : undefined)

  if (!effectiveResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">未找到测评结果</h2>
          <p className="text-white/60 mb-6">可能是页面刷新导致数据丢失，请重新完成测评</p>
          <button
            onClick={() => navigate('/app/discover')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white"
            type="button"
          >
            返回探索
          </button>
        </div>
      </div>
    )
  }

  if (!effectiveAssessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">测评数据异常</h2>
          <p className="text-white/60 mb-6">无法识别测评类型，请重新完成测评</p>
          <button
            onClick={() => navigate('/app/discover')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white"
            type="button"
          >
            返回探索
          </button>
        </div>
      </div>
    )
  }

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
            onClick={() => navigate('/app/home')}
            className="flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
            type="button"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">返回主页</span>
          </motion.button>
          <span className="text-white/30 hidden sm:inline">|</span>
          <motion.button
            onClick={() => navigate('/app/discover')}
            className="flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white transition-colors text-xs sm:text-sm"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">返回探索</span>
          </motion.button>
          <span className="text-white/30 hidden sm:inline">|</span>
          <motion.button
            onClick={() => navigate('/app/training')}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs sm:text-sm font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
            type="button"
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
          <ReportRouter
            result={effectiveResult}
            assessmentType={effectiveAssessment.id}
            mode={(displayMode as 'normal' | 'advanced' | 'professional') || 'normal'}
          />
        </div>

        <KnowledgeInjector
          assessmentId={effectiveAssessment.id}
          result={effectiveResult as Record<string, any>}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <ResultExportButton
            resultId={id || 'result'}
            title={effectiveAssessment?.title || '测评报告'}
            resultData={resultRecord}
            resultHash={effectiveResult?.result_hash}
            onShowQRCode={() => setShowQRCode(true)}
          />

          <motion.button
            onClick={() => navigate('/app/discover')}
            className="flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-4 rounded-xl glass text-white text-sm sm:text-base font-semibold hover:bg-white/10 border border-white/20 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            继续测评
          </motion.button>

          <motion.button
            onClick={() => navigate('/app/training')}
            className="flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
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
                value={(() => {
                  try {
                    return window.location.href
                  } catch {
                    return ''
                  }
                })()}
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
              type="button"
            >
              关闭
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
