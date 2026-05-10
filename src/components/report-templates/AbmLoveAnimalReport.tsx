import { motion } from 'framer-motion'
import { Heart, Users } from 'lucide-react'
import type { GenericReportResult, AnimalInfo, ColorDimension } from './types'

interface AbmLoveAnimalReportProps {
  result: GenericReportResult
}

export function AbmLoveAnimalReport({ result }: AbmLoveAnimalReportProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-900/40 via-purple-900/30 to-amber-900/30 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-rose-500/30">
            <span className="text-5xl">{result.emoji || '🐱'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold">
                恋爱动物人格
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.name || '你的恋爱动物'}</h2>
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
          <Heart className="w-6 h-6 text-rose-400" />
          恋爱五维分析
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
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-rose-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-rose-400" />
          十二种恋爱动物全图鉴
        </h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
          {(result.allAnimals || []).map((animal: AnimalInfo, index: number) => (
            <motion.div
              key={animal.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.03 }}
              className={`p-4 rounded-xl border ${result.type === animal.type ? 'ring-2 ring-rose-500/50 border-rose-400/50 bg-rose-500/10' : 'border-white/10 bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{animal.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{animal.name}</div>
                  <div className="text-white/40 text-xs truncate">{animal.desc?.slice(0, 15)}...</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default AbmLoveAnimalReport
