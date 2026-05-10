import { motion } from 'framer-motion'
import { Award, BarChart3 } from 'lucide-react'
import type { GenericReportResult, ColorDimension } from './types'

interface ColorSubconsciousReportProps {
  result: GenericReportResult
}

export function ColorSubconsciousReport({ result }: ColorSubconsciousReportProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-8 border border-white/10"
        style={{ background: `linear-gradient(135deg, ${result.hex || '#8B5CF6'}30, #1e1b4b, ${result.hex || '#8B5CF6'}15)` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: result.hex, opacity: 0.3 }} />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl" style={{ backgroundColor: result.hex }}>
            <span className="text-5xl">{result.emoji || '🌈'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-white text-sm font-semibold" style={{ backgroundColor: result.hex }}>
                灵魂色彩诊断
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.name || '你的灵魂色彩'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg">{result.desc}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-violet-400" />
          五维色彩人格分析
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-rose-400" />
          九色灵魂图鉴
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {(result.allColors || []).slice(0, 9).map((color: any, index: number) => (
            <motion.div
              key={color.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`p-4 rounded-xl border ${result.type === color.type ? 'ring-2 ring-white/50 border-white/30' : 'border-white/10'} bg-white/5`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{color.emoji}</span>
                <div>
                  <div className="font-semibold text-white">{color.name}</div>
                  <div className="text-white/40 text-xs">{color.type}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ColorSubconsciousReport
