import { motion } from 'framer-motion'
import { User } from 'lucide-react'

interface OceanResult {
  [key: string]: any
}

export function OceanReport({ result }: { result: OceanResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">大五人格 OCEAN 测评报告</h2>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.description || ''}</p>
      </motion.div>
    </div>
  )
}
