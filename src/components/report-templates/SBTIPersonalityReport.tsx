import { motion } from 'framer-motion'
import { Award, Target } from 'lucide-react'
import type { GenericReportResult, ColorDimension } from './types'

interface SBTIPersonalityReportProps {
  result: GenericReportResult
}

export function SBTIPersonalityReport({ result }: SBTIPersonalityReportProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/40 via-blue-900/20 to-cyan-900/30 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/30">
            <span className="text-5xl">{result.emoji || '🦥'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-semibold">
                SBTI 人格类型
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.overall || result.type || 'SBTI人格类型'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg">
              2026全网爆火！比MBTI更懂你的摆烂人生 ✨
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
          <Target className="w-6 h-6 text-violet-400" />
          SBTI 四维度分析
        </h3>
        <div className="grid md:grid-cols-4 gap-3">
          {(result.dimensions || []).map((dim: ColorDimension, index: number) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
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
        transition={{ delay: 0.2 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-violet-400" />
          SBTI 四大天王
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { type: '职业吗喽', emoji: '🙈', desc: '只要给够加班费，当牛做马无所谓' },
            { type: '摆烂之王', emoji: '🦥', desc: '工作的意义就是为了下班' },
            { type: '顶级杠精', emoji: '🦝', desc: '你说的都对，但我就是要杠' },
            { type: '无限社恐', emoji: '🦔', desc: '只要我足够透明，就没人能发现我' },
          ].map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + index * 0.08 }}
              className={`p-5 rounded-xl border ${result.type === item.type ? 'ring-2 ring-violet-500/50 border-violet-400/50 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}
            >
              <div className="text-center">
                <span className="text-4xl block mb-3">{item.emoji}</span>
                <div className="font-bold text-white mb-1">{item.type}</div>
                <div className="text-white/50 text-xs">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SBTIPersonalityReport
