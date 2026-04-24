import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Image, FileJson, Copy, Check, Cloud, CloudOff, FileText, Link2, Share2, QrCode } from 'lucide-react'
import { useResultExport } from '@hooks/useKeyboardShortcuts'
import { useToast } from '@hooks/useToast'
import { apiClient } from '@services/apiClient'

interface ResultExportButtonProps {
  resultId: string
  title: string
  resultData?: any
  resultHash?: string
  onShowQRCode?: () => void
}

export default function ResultExportButton({ resultId, title, resultData, resultHash, onShowQRCode }: ResultExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [cloudExportAvailable, setCloudExportAvailable] = useState(false)
  const [cloudExportChecked, setCloudExportChecked] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { exportAsImage, exportAsJSON, shareResult } = useResultExport()
  const toast = useToast()

  useEffect(() => {
    const controller = new AbortController()
    apiClient.checkCloudExportStatus()
      .then((status) => {
        if (!controller.signal.aborted) {
          setCloudExportAvailable(status.enabled)
          setCloudExportChecked(true)
        }
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const effectiveHash = resultHash || resultData?.result_hash || resultId

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCloudPDF = async () => {
    setExporting(true)
    setIsOpen(false)

    try {
      toast.info('☁️  云端正在生成高质量 PDF...', 4000)
      const pdfBlob = await apiClient.exportToPDF(resultId, effectiveHash)
      triggerDownload(pdfBlob, `HumanOS-${title}-${effectiveHash.slice(0, 8)}.pdf`)
      toast.success('✅ 云端 PDF 生成成功！', 2500)
    } catch (e) {
      toast.error('❌ 云端导出失败，请使用本地导出', 2500)
    } finally {
      setExporting(false)
    }
  }

  const handleCloudImage = async () => {
    setExporting(true)
    setIsOpen(false)

    try {
      toast.info('☁️  云端正在生成高清图片...', 4000)
      const imageBlob = await apiClient.exportToImage(resultId, effectiveHash)
      triggerDownload(imageBlob, `HumanOS-${title}-${effectiveHash.slice(0, 8)}.png`)
      toast.success('✅ 云端高清图片生成成功！', 2500)
    } catch (e) {
      toast.error('❌ 云端导出失败，请使用本地导出', 2500)
    } finally {
      setExporting(false)
    }
  }

  const handleLocalImage = async () => {
    setExporting(true)
    const success = await exportAsImage('result-export-container', title)
    setExporting(false)
    setIsOpen(false)
    if (success) {
      toast.success('✅ 图片导出成功', 2500)
    } else {
      toast.error('❌ 图片导出失败，请重试', 2500)
    }
  }

  const handleExportJSON = () => {
    exportAsJSON(resultData || { title, resultId, exportedAt: new Date().toISOString() }, title)
    setIsOpen(false)
    toast.success('📄 JSON数据导出成功', 2500)
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success('🔗 链接已复制到剪贴板', 2500)
  }

  const handleShare = async () => {
    const success = await shareResult(
      `我的 ${title} 测评结果`,
      `我在 HumanOS 完成了 ${title}，快来看看你的结果吧！`,
      window.location.href
    )
    setIsOpen(false)
    if (success) {
      toast.success('📤 分享成功', 2500)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={exporting}
        className="flex items-center gap-2 px-8 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 border border-white/20 transition-all disabled:opacity-50 relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
      >
        <Download className="w-5 h-5" />
        {exporting ? '导出中...' : '导出结果'}
        {cloudExportChecked && cloudExportAvailable && (
          <Cloud className="w-4 h-4 text-emerald-300" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-full mt-2 z-50 w-64 bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
            >
              <div className="p-2 space-y-1">

                {cloudExportAvailable ? (
                  <>
                    <div className="px-3 py-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <Cloud className="w-3.5 h-3.5" />
                        云端导出已就绪 · 快 10 倍
                      </div>
                    </div>

                    <button
                      onClick={handleCloudPDF}
                      disabled={exporting}
                      className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-slate-700/50 transition-colors text-left group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileText className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          {exporting ? '云端生成中...' : '云端 PDF 导出'}
                        </div>
                        <div className="text-xs text-slate-400">高清矢量 · 可打印</div>
                      </div>
                    </button>

                    <button
                      onClick={handleCloudImage}
                      disabled={exporting}
                      className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-slate-700/50 transition-colors text-left group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Image className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">云端高清图片</div>
                        <div className="text-xs text-slate-400">2x 分辨率 · 分享专用</div>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400">
                        <CloudOff className="w-3.5 h-3.5" />
                        本地导出模式
                      </div>
                    </div>

                    <button
                      onClick={handleLocalImage}
                      disabled={exporting}
                      className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-slate-700/50 transition-colors text-left group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Image className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          {exporting ? '导出中...' : '导出为图片'}
                        </div>
                        <div className="text-xs text-slate-400">保存高清结果图</div>
                      </div>
                    </button>
                  </>
                )}

                <button
                  onClick={handleExportJSON}
                  className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-slate-700/50 transition-colors text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileJson className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">导出原始数据</div>
                    <div className="text-xs text-slate-400">JSON格式数据</div>
                  </div>
                </button>

                <div className="h-px bg-slate-700/50 my-2" />

                <button
                  onClick={handleCopyLink}
                  className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-slate-700/50 transition-colors text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {copied ? (
                      <Check className="w-4.5 h-4.5 text-white" />
                    ) : (
                      <Link2 className="w-4.5 h-4.5 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {copied ? '已复制!' : '复制链接'}
                    </div>
                    <div className="text-xs text-slate-400">复制分享链接</div>
                  </div>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-slate-700/50 transition-colors text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Share2 className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">系统分享</div>
                    <div className="text-xs text-slate-400">使用原生分享</div>
                  </div>
                </button>

                {onShowQRCode && (
                  <button
                    onClick={() => {
                      onShowQRCode()
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-slate-700/50 transition-colors text-left group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <QrCode className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">生成二维码</div>
                      <div className="text-xs text-slate-400">扫码查看结果</div>
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
