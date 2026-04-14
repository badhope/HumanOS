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
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Download, Copy, Check, QrCode, FileText, Image, Home } from 'lucide-react'
import confetti from 'canvas-confetti'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useAppStore } from '../store'
import { getAssessmentById } from '@data/assessments'
import ReportTemplate from '@components/ReportTemplate'

export default function Results() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const completedAssessments = useAppStore((state) => state.completedAssessments)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const shareRef = useRef<HTMLDivElement>(null)
  const reportRef = useRef<HTMLDivElement>(null)

  const latestResult = completedAssessments.find(
    (a) => a.assessmentId === id
  )

  const assessment = id ? getAssessmentById(id) : undefined

  useEffect(() => {
    if (!latestResult) {
      navigate('/')
      return
    }

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
  }, [latestResult, navigate])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShowShareMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportPDF = async () => {
    if (!reportRef.current || !assessment) return
    
    setExporting(true)
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0f172a'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      pdf.save(`${assessment.title}-测评报告.pdf`)
    } catch (error) {
      console.error('PDF导出失败:', error)
    } finally {
      setExporting(false)
    }
  }

  const handleExportImage = async () => {
    if (!reportRef.current || !assessment) return
    
    setExporting(true)
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0f172a'
      })
      
      const link = document.createElement('a')
      link.download = `${assessment.title}-测评报告.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('图片导出失败:', error)
    } finally {
      setExporting(false)
    }
  }

  if (!latestResult || !assessment || !latestResult.result) {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <motion.p
            className="text-white/60 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {assessment.title} · 测评准确度 {latestResult.result.accuracy}%
          </motion.p>
        </motion.div>

        <div ref={reportRef}>
          <ReportTemplate result={latestResult.result} assessmentType={assessment.id} mode={(latestResult.mode as 'normal' | 'advanced' | 'professional') || 'normal'} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="relative" ref={shareRef}>
            <motion.button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <Share2 className="w-5 h-5" />
              分享报告
            </motion.button>

            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 glass rounded-xl p-4 z-50"
              >
                <div className="space-y-2">
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                    type="button"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-white/60" />
                    )}
                    <span className="text-white">{copied ? '已复制链接' : '复制链接'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowQRCode(true)
                      setShowShareMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                    type="button"
                  >
                    <QrCode className="w-5 h-5 text-white/60" />
                    <span className="text-white">生成二维码</span>
                  </button>
                  <button
                    onClick={handleExportPDF}
                    disabled={exporting}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left disabled:opacity-50"
                    type="button"
                  >
                    <FileText className="w-5 h-5 text-white/60" />
                    <span className="text-white">{exporting ? '导出中...' : '导出PDF'}</span>
                  </button>
                  <button
                    onClick={handleExportImage}
                    disabled={exporting}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left disabled:opacity-50"
                    type="button"
                  >
                    <Image className="w-5 h-5 text-white/60" />
                    <span className="text-white">{exporting ? '导出中...' : '导出图片'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <motion.button
            onClick={handleExportPDF}
            disabled={exporting}
            className="flex items-center gap-2 px-8 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 border border-white/20 transition-all disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            <Download className="w-5 h-5" />
            {exporting ? '导出中...' : '导出PDF'}
          </motion.button>

          <motion.button
            onClick={() => navigate('/assessments')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 border border-white/20 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            继续测评
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
