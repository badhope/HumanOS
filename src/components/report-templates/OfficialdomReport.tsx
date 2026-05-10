import { motion } from 'framer-motion'
import { Award, Target, Lightbulb, Users, BarChart3 } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { OFFICIALDOM_COLORS, OFFICIALDOM_DIMENSION_NAMES } from './ReportColors'

interface OfficialdomResult {
  [key: string]: any
}

export function OfficialdomReport({ result }: { result: OfficialdomResult }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: OFFICIALDOM_DIMENSION_NAMES[key] || key,
    score: Math.round((value as number) * 100 / 5)
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900 p-8 border border-amber-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
            <Award className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-semibold">
                {result.archetype || '官场达人'}
              </span>
              <span className="text-white/40 text-sm">{result.archetypeTitle || ''}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.typeName || 'D.R.E.A.M 官场人格测评报告'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description || ''}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {result.totalScore || '-'}
            </div>
            <div className="text-white/40 text-sm mt-1">官场生存指数</div>
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
            五维人格雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="officialdomGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="得分" 
                  dataKey="score" 
                  stroke="#f59e0b" 
                  fill="url(#officialdomGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
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
            <Users className="w-6 h-6 text-violet-400" />
            官场原型分析
          </h3>
          <div className="bg-white/5 rounded-xl p-6 border border-amber-500/20 mb-4">
            <h4 className="text-xl font-bold text-amber-400 mb-3">{result.archetype || '未知类型'}</h4>
            <p className="text-white/80 leading-relaxed">{result.archetypeDescription || ''}</p>
          </div>
          <div>
            <h5 className="text-white/60 text-sm mb-3">历史著名同僚：</h5>
            <div className="flex flex-wrap gap-2">
              {(result.famousPeers || []).map((name: string, i: number) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-sm">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          各维度深度解析
        </h3>
        <div className="grid md:grid-cols-5 gap-4">
          {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="bg-white/5 rounded-xl p-4 border border-white/5"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: OFFICIALDOM_COLORS[key] + '30' }}>
                <span className="text-xl font-bold" style={{ color: OFFICIALDOM_COLORS[key] }}>{Math.round((result.dimensions[key] as number) * 20)}</span>
              </div>
              <h5 className="text-white font-semibold mb-2">{OFFICIALDOM_DIMENSION_NAMES[key]}</h5>
              <p className="text-white/60 text-sm leading-relaxed">{desc as string}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 p-8 border border-emerald-500/20"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-emerald-400" />
          官场生存指南
        </h3>
        <p className="text-emerald-100/90 leading-relaxed text-lg">{result.survivalGuide || ''}</p>
      </motion.div>
    </div>
  )
}
