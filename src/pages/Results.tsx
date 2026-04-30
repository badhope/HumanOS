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
import { ArrowLeft, QrCode, Home, Trophy, Clock, Link2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { QRCodeSVG } from 'qrcode.react'
import { useAppStore } from '../store'
import { getAssessmentById } from '@data/assessments'
import ReportRouter from '@components/reports/lazy'
import ResultExportButton from '@components/ResultExportButton'
import { KnowledgeInjector } from '@components/reports/KnowledgePanel'
import { apiClient } from '@services/apiClient'

export default function Results() {
  const { id, hash } = useParams<{ id: string; hash: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const stateResult = location.state as any
  const completedAssessments = useAppStore((state) => state.completedAssessments)
  const addCompletedAssessment = useAppStore((state) => state.addCompletedAssessment)
  const [showQRCode, setShowQRCode] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [restoreError, setRestoreError] = useState<string | null>(null)
  const [, forceUpdate] = useState({})
  const reportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hash) return

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    setRestoring(true)

    apiClient.getArchivedResult(hash)
      .then((archived) => {
        const answersArray = Object.entries(archived.answers).map(([questionId, value]) => ({
          questionId,
          value: value as number,
          selectedOptions: [],
        }))

        const recordId = crypto.randomUUID()
        addCompletedAssessment({
          id: recordId,
          assessmentId: archived.assessment_id,
          answers: answersArray,
          result: archived.result,
          completedAt: new Date(),
        })

        navigate(`/legacy/results/${recordId}`, { replace: true })
      })
      .catch((e) => {
        const message = controller.signal.aborted 
          ? '连接超时，请检查网络后重试'
          : '此链接无效或已过期，请重新完成测评'
        setRestoreError(message)
      })
      .finally(() => {
        clearTimeout(timeoutId)
        setRestoring(false)
      })

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [hash, addCompletedAssessment, navigate])

  const resultRecord = completedAssessments.find((a) => a.id === id)

  const assessment = resultRecord ? getAssessmentById(resultRecord.assessmentId) : undefined
  const [recordFound, setRecordFound] = useState(!!resultRecord || !!stateResult)

  useEffect(() => {
    if (!id && !hash) {
      navigate('/assessments')
      return
    }

    if (hash || restoring) return

    if (stateResult && !resultRecord) {
      addCompletedAssessment({
        id: id!,
        assessmentId: stateResult.assessment_id || stateResult.assessmentId || id!,
        answers: [],
        result: stateResult,
        completedAt: new Date(),
      })
      console.log('✅ 结果已自动持久化到Store')
    }

    if (resultRecord || stateResult) {
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
        navigate('/assessments')
      }
    }, 100)
    
    return () => clearInterval(retryInterval)
  }, [id, hash, restoring, resultRecord, stateResult, navigate, addCompletedAssessment])

  if (!recordFound && !resultRecord && !stateResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">正在加载测评结果...</h2>
          <p className="text-white/60 mb-6">请稍候，正在同步数据</p>
          <button
            onClick={() => navigate('/assessments')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors"
            type="button"
          >
            返回测评列表
          </button>
        </div>
      </div>
    )
  }

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



  if (restoring) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">正在恢复测评结果...</h2>
          <p className="text-white/60">永久链接加载中</p>
        </div>
      </div>
    )
  }

  if (restoreError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <Link2 className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">链接无效</h2>
          <p className="text-white/60 mb-6">{restoreError}</p>
          <button
            onClick={() => navigate('/assessments')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white"
            type="button"
          >
            开始测评
          </button>
        </div>
      </div>
    )
  }

  if (!resultRecord || !assessment || !resultRecord.result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">未找到测评结果</h2>
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
      <div id="result-export-container" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            onClick={() => navigate('/assessments')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
            返回测评列表
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            您的测评报告
          </motion.h1>
          <motion.div
            className="flex items-center justify-center gap-3 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white/60 text-lg">{assessment.title}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              resultRecord.mode === 'professional'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
            }`}>
              {resultRecord.mode === 'professional' ? '专业版' : '标准版'}
            </span>
            <span className="text-white/60 text-lg">· 测评准确度 {resultRecord.result.accuracy}%</span>
          </motion.div>
        </motion.div>

        <div ref={reportRef}>
          <ReportRouter
            result={resultRecord.result}
            assessmentType={assessment.id}
            mode={(resultRecord.mode as 'normal' | 'advanced' | 'professional') || 'normal'}
          />
        </div>

        <KnowledgeInjector
          assessmentId={assessment.id}
          result={resultRecord.result as Record<string, any>}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ResultExportButton
            resultId={id || 'result'}
            title={assessment?.title || '测评报告'}
            resultData={resultRecord}
            resultHash={resultRecord?.result?.result_hash}
            onShowQRCode={() => setShowQRCode(true)}
          />

          <motion.button
            onClick={() => navigate('/assessments')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 border border-white/20 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            继续测评
          </motion.button>

          <motion.button
            onClick={() => navigate('/leaderboard')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            <Trophy className="w-5 h-5" />
            查看排行榜
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
            className="bg-slate-900 rounded-3xl p-8 max-w-sm w-full"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-6">扫码分享</h3>
            <div className="bg-white rounded-2xl p-6 flex items-center justify-center">
              <QRCodeSVG
                value={window.location.href}
                size={200}
                level="H"
                includeMargin
              />
            </div>
            <p className="text-white/60 text-center mt-4 text-sm">
              扫描二维码查看测评报告
            </p>
            <button
              onClick={() => setShowQRCode(false)}
              className="w-full mt-6 px-6 py-3 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors"
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
