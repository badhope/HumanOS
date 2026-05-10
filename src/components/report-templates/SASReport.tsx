import { motion } from 'framer-motion'
import { Target, BarChart3, AlertTriangle, CheckCircle, Activity, Lightbulb } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import type { SASResult } from '../../utils/calculators'
import { SAS_COLORS, SAS_DIMENSION_NAMES } from './ReportColors'

export function SASReport({ result }: { result: SASResult }) {
  const radarData = result.radarData.map(d => ({
    ...d,
    dimension: SAS_DIMENSION_NAMES[d.dimension] || d.dimension
  }))

  const levelConfig = {
    normal: { color: 'from-green-500 to-emerald-500', text: '正常范围', icon: CheckCircle },
    mild: { color: 'from-yellow-500 to-amber-500', text: '轻度焦虑', icon: Activity },
    moderate: { color: 'from-orange-500 to-red-500', text: '中度焦虑', icon: AlertTriangle },
    severe: { color: 'from-red-500 to-rose-600', text: '重度焦虑', icon: AlertTriangle }
  }

  const config = levelConfig[result.level]
  const Icon = config.icon

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-2xl`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${config.color} text-white text-sm font-semibold`}>
                {config.text}
              </span>
              <span className="text-white/40 text-sm">标准分 {result.standardScore}</span>
              <span className="text-white/40 text-sm">超过 {result.percentile}% 常模人群</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">SAS焦虑测评专业报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.interpretation}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {result.standardScore}
            </div>
            <div className="text-white/40 text-sm mt-1">焦虑指数</div>
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
            <Target className="w-6 h-6 text-amber-400" />
            焦虑维度雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="sasGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#ef4444" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="焦虑程度" 
                  dataKey="score" 
                  stroke="#f59e0b" 
                  fill="url(#sasGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
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
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            各维度详细分析
          </h3>
          <div className="space-y-4">
            {Object.entries(result.dimensions as Record<string, { percentage: number; level: string }>).map(([key, dim], index) => {
              const color = SAS_COLORS[key as keyof typeof SAS_COLORS]
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{SAS_DIMENSION_NAMES[key]}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold" style={{ color }}>{dim.percentage}%</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        dim.level === '低' ? 'bg-green-500/20 text-green-400' :
                        dim.level === '中' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {dim.level}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${dim.percentage}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 p-8 border border-amber-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">重要提示</h3>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-amber-500/10">
          <p className="text-amber-200/90 leading-relaxed text-lg">{result.warning}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 p-8 border border-green-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">专业调节建议</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {result.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.1 }}
              className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-white/80 leading-relaxed">{rec}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
