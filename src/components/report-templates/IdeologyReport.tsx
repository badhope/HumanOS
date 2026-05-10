import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'

interface IdeologyResult {
  [key: string]: any
}

export function IdeologyReport({ result }: { result: IdeologyResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">意识形态九宫格测评报告</h2>
            <p className="text-white/60">您的立场：{result.typeName || '未知类型'}</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.description || ''}</p>
      </motion.div>
    </div>
  )
}
