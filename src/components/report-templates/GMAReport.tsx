import { motion } from 'framer-motion'
import { Brain, Target, Activity, Lightbulb } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { GMA_DIMENSION_NAMES } from './ReportColors'

interface GMAResult {
  [key: string]: any
}

export function GMAReport({ result }: { result: GMAResult }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: GMA_DIMENSION_NAMES[key] || key,
    score: Math.round((value as number) * 100 / 5)
  }))

  const levelConfig = {
    legend: { color: 'from-yellow-500 to-amber-500', text: '传说级' },
    master: { color: 'from-violet-500 to-purple-500', text: '大师级' },
    adept: { color: 'from-blue-500 to-cyan-500', text: '能手级' },
    normal: { color: 'from-green-500 to-emerald-500', text: '普通级' },
    novice: { color: 'from-orange-500 to-red-500', text: '新手级' },
    danger: { color: 'from-red-500 to-rose-600', text: '危险人类' },
  }

  const config = levelConfig[result.classification as keyof typeof levelConfig] || levelConfig.normal

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900 p-8 border border-violet-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-2xl`}>
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${config.color} text-white text-sm font-semibold`}>
                {config.text}
              </span>
              <span className="text-white/40 text-sm">GMA 指数 {result.gmaScore || '-'}</span>
              <span className="text-white/40 text-sm">超过 {result.percentile || 0}% 人群</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">人情世故成熟能力测评报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.interpretation || ''}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {result.gmaScore || '-'}
            </div>
            <div className="text-white/40 text-sm mt-1">GMA 指数</div>
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
            <Target className="w-6 h-6 text-violet-400" />
            五维能力雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="gmaGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="得分" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  fill="url(#gmaGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(139, 92, 246, 0.3)',
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
            <Activity className="w-6 h-6 text-cyan-400" />
            GMA 段位对照表
          </h3>
          <div className="space-y-3">
            {[
              { score: 145, title: '传说级', desc: '地表最强人情世故天花板' },
              { score: 130, title: '大师级', desc: '行走的社会生存百科全书' },
              { score: 115, title: '能手级', desc: '成熟稳重的社会人' },
              { score: 85, title: '普通级', desc: '基本合格的成年人' },
              { score: 70, title: '新手级', desc: '还需要历练的年轻人' },
              { score: 0, title: '危险人类', desc: '建议远离大型人类聚集区' },
            ].map((level, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${result.gmaScore >= level.score ? 'bg-violet-500/20 border border-violet-500/30' : 'bg-white/5'}`}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: result.gmaScore >= level.score ? '#8b5cf6' : '#334155' }}>
                  {result.gmaScore >= level.score ? '✓' : i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{level.title}</div>
                  <div className="text-white/50 text-sm">{level.desc}</div>
                </div>
                <div className="text-white/40 text-sm">≥{level.score}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          人生建议
        </h3>
        <div className="space-y-3">
          {(result.advice || []).map((item: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 mt-2 flex-shrink-0" />
              <p className="text-white/80 leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
