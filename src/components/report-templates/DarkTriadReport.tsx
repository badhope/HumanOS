import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

interface DarkTriadResult {
  [key: string]: any
}

export function DarkTriadReport({ result }: { result: DarkTriadResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">暗黑人格 DARK 量表测评报告</h2>
            <p className="text-white/60">黑暗指数: {result.darkScore || '-'}</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.description || ''}</p>
      </motion.div>
    </div>
  )
}
