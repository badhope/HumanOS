import { motion } from 'framer-motion'
import { Award, TrendingUp, Target, BarChart3 } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { PATRIOTISM_DIMENSION_NAMES } from './ReportColors'
import type { GenericReportResult } from './types'

interface PatriotismReportProps {
  result: GenericReportResult
}

export function PatriotismReport({ result }: PatriotismReportProps) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: PATRIOTISM_DIMENSION_NAMES[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-red-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 via-yellow-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 flex items-center justify-center shadow-2xl shadow-red-500/30 text-4xl">
            🇨🇳
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">{result.patriotRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              {result.patriotismIndex}%
            </div>
            <div className="text-white/40 text-sm mt-1">爱国指数</div>
            {result.rednessLevel && (
              <div className="mt-2 text-xs text-red-300/80 max-w-32">{result.rednessLevel}</div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-red-400" />
            红色五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="patriotGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f97316" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#eab308" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="纯度指数" 
                  dataKey="score" 
                  stroke="#dc2626" 
                  fill="url(#patriotGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-400" />
            维度深度解读
          </h3>
          <div className="space-y-3">
            {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-semibold text-white mb-1">{PATRIOTISM_DIMENSION_NAMES[key] || key}</div>
                <p className="text-white/60 text-sm">{desc as string}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-red-400" />
          红色金句
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.patrioticQuotes || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-200 font-medium"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-yellow-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-yellow-400" />
          爱国进阶建议
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(result.lifeSuggestions || []).map((suggestion: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-100"
            >
              {suggestion}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default PatriotismReport
