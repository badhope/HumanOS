import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Share2, Image, FileJson, Copy, Check, Twitter, Facebook, Link2 } from 'lucide-react'
import { useResultExport } from '@hooks/useKeyboardShortcuts'
import { Button } from '@components/ui/Button'
import Tooltip from '@components/ui/Tooltip'
import { useToast } from '@components/ui/Toast'

interface ResultExportButtonProps {
  resultId: string
  title: string
  resultData?: any
}

export default function ResultExportButton({ resultId, title, resultData }: ResultExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const { exportAsImage, exportAsJSON, shareResult } = useResultExport()
  const toast = useToast()

  const handleExportImage = async () => {
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
    <div className="relative">
      <Tooltip content="导出与分享">
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
        >
          <Share2 className="w-4 h-4 mr-2" />
          导出结果
        </Button>
      </Tooltip>

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
              className="absolute right-0 top-full mt-2 z-50 w-56 bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
            >
              <div className="p-2 space-y-1">
                <button
                  onClick={handleExportImage}
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
              </div>

              <div className="px-4 py-3 bg-slate-900/30 border-t border-slate-700/30">
                <div className="flex gap-2 justify-center">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`我的 ${title} 测评结果`)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Twitter className="w-4.5 h-4.5 text-[#1DA1F2]" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[#4267B2]/20 hover:bg-[#4267B2]/30 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Facebook className="w-4.5 h-4.5 text-[#4267B2]" />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-500/20 hover:bg-slate-500/30 transition-colors"
                  >
                    <Copy className="w-4.5 h-4.5 text-slate-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
