import { motion } from 'framer-motion'
import { Award, TrendingUp, Lightbulb, Target, Heart, Brain, Briefcase, Compass, Zap, Activity, AlertTriangle, CheckCircle, BarChart3, Users, User, Shield } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { OFFICIALDOM_COLORS, OFFICIALDOM_DIMENSION_NAMES, GMA_DIMENSION_NAMES, CAST_DIMENSION_NAMES } from './ReportColors'

interface GenericReportResult {
  [key: string]: any
}

export function OfficialdomReport({ result }: { result: GenericReportResult }) {
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

export function GMAReport({ result }: { result: GenericReportResult }) {
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

export function CASTReport({ result }: { result: GenericReportResult }) {
  const radarData = result.radarData || Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: CAST_DIMENSION_NAMES[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-900/20 to-slate-900 p-8 border border-rose-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-rose-500/30">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.classificationText || result.classification || '典型家长'}
              </span>
              <span className="text-white/40 text-sm">CAST 指数 {result.castIndex || '-'}</span>
              <span className="text-white/40 text-sm">超过 {result.percentile || 0}% 家长</span>
              {result.parentingStyleArchetype && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold">
                  {result.parentingStyleArchetype.emoji} {result.parentingStyleArchetype.name}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">中国式家长教养方式测评报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.typeDescription || ''}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              {result.castIndex || '-'}
            </div>
            <div className="text-white/40 text-sm mt-1">CAST 指数</div>
          </div>
        </div>
      </motion.div>

      {result.interpretiveNotes && result.interpretiveNotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-500/10 p-6 border border-amber-500/20"
        >
          <div className="flex flex-wrap gap-3">
            {result.interpretiveNotes.map((note: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-100 text-sm font-medium"
              >
                {note}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {result.parentingMatrix && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            教养矩阵三维分析
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20">
              <div className="text-rose-400 text-sm font-semibold mb-2">控制水平</div>
              <div className="text-white text-2xl font-bold">{result.parentingMatrix.controlLevel}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="text-amber-400 text-sm font-semibold mb-2">焦虑水平</div>
              <div className="text-white text-2xl font-bold">{result.parentingMatrix.anxietyLevel}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div className="text-green-400 text-sm font-semibold mb-2">温暖水平</div>
              <div className="text-white text-2xl font-bold">{result.parentingMatrix.warmthLevel}</div>
            </div>
          </div>
          {result.parentingStyleArchetype && (
            <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{result.parentingStyleArchetype.emoji}</span>
                <span className="text-white text-xl font-bold">{result.parentingStyleArchetype.name}教养风格</span>
              </div>
              <p className="text-violet-100 leading-relaxed">{result.parentingStyleArchetype.description}</p>
            </div>
          )}
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-rose-400" />
            四维教养雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="castGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="得分" 
                  dataKey="score" 
                  stroke="#ec4899" 
                  fill="url(#castGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(236, 72, 153, 0.3)',
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
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            孩子未来预测
          </h3>
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20">
            <p className="text-cyan-100 leading-relaxed text-lg">{result.childFutureProjection || ''}</p>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm italic">* 以上预测基于本测评纯学术计算，不构成任何实质性教育建议</p>
          </div>
        </motion.div>
      </div>

      {result.subDimensions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            十六项子维度深度解析
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(result.subDimensions || {}).map(([dimKey, subDims], dimIndex) => (
              <motion.div
                key={dimKey}
                initial={{ opacity: 0, x: dimIndex % 2 === 0 ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + dimIndex * 0.05 }}
                className="p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="text-white font-semibold mb-3">{CAST_DIMENSION_NAMES[dimKey] || dimKey}</div>
                <div className="space-y-2">
                  {(subDims as any[]).map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{sub.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            style={{ width: `${sub.score}%` }}
                          />
                        </div>
                        <span className="text-white/40 text-xs w-8 text-right">{sub.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {result.classicQuotes && result.classicQuotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 p-8 border border-amber-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-400" />
              中国式家长金句
            </h3>
            <div className="space-y-3">
              {result.classicQuotes.map((quote: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                >
                  <p className="text-amber-100 italic">"{quote}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {result.redemptionGuide && result.redemptionGuide.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 p-8 border border-green-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-green-400" />
              自救指南
            </h3>
            <div className="space-y-3">
              {result.redemptionGuide.map((guide: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                  <span className="text-green-100 leading-relaxed">{guide}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {result.famousParents && result.famousParents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-fuchsia-400" />
            同款知名家长
          </h3>
          <div className="flex flex-wrap gap-3">
            {result.famousParents.map((name: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + index * 0.05 }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-500/30 text-white/80 font-medium"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export function IdeologyReport({ result }: { result: GenericReportResult }) {
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

export function IQReport({ result }: { result: GenericReportResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">瑞文标准推理测评报告</h2>
            <p className="text-white/60">IQ: {result.iqScore || '-'} | 超过 {result.percentile || 0}% 常模人群</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.interpretation || ''}</p>
      </motion.div>
    </div>
  )
}

export function EQReport({ result }: { result: GenericReportResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-pink-900/20 to-slate-900 p-8 border border-pink-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center shadow-2xl shadow-pink-500/30">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold">
                {result.classificationEmoji} EQ {result.classification || '待评估'}
              </span>
              <span className="text-white/40 text-sm">总情商 {result.totalEQ || '-'}</span>
              <span className="text-white/40 text-sm">超过 {result.percentile || 0}% 人群</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">戈尔曼情绪智力专业测评报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.typeDescription || ''}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
              {result.totalEQ || '-'}
            </div>
            <div className="text-white/40 text-sm mt-1">总情商指数</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function DarkTriadReport({ result }: { result: GenericReportResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">暗黑人格 DARK 量表测评报告</h2>
            <p className="text-white/60">黑暗指数: {result.darkScore || '-'}</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.description || ''}</p>
      </motion.div>
    </div>
  )
}

export function OceanReport({ result }: { result: GenericReportResult }) {
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
