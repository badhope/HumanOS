import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'

interface IQResult {
  [key: string]: any
}

export function IQReport({ result }: { result: IQResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">瑞文标准推理测评报告</h2>
            <p className="text-white/60">IQ: {result.iqScore || '-'} | 超过 {result.percentile || 0}% 常模人群</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.interpretation || ''}</p>
      </motion.div>
    </div>
  )
}
