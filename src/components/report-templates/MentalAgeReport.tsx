import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'
import type { GenericReportResult, ColorDimension } from './types'

interface MentalAgeReportProps {
  result: GenericReportResult
}

export function MentalAgeReport({ result }: MentalAgeReportProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/40 via-orange-900/20 to-yellow-900/30 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
            <span className="text-5xl">{result.emoji || '🏛️'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold">
                精神年龄诊断
              </span>
              <span className="text-white/40 text-lg font-bold">{result.mentalAge || 99} 岁</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.overall || '精神年龄'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg">
              你的身体在上班，灵魂已经退休了吗？
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-amber-400" />
          心智五维分析
        </h3>
        <div className="grid md:grid-cols-5 gap-3">
          {(result.dimensions || []).map((dim: ColorDimension, index: number) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 border border-white/10 text-center"
            >
              <div className="text-3xl font-bold mb-2" style={{ color: dim.color }}>{dim.score}</div>
              <div className="text-white/60 text-sm">{dim.name}</div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${dim.score}%`, backgroundColor: dim.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default MentalAgeReport
