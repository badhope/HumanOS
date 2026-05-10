import { motion } from 'framer-motion'
import { Award, TrendingUp, Lightbulb, Target, Heart, Brain, Briefcase, Compass, Zap, Activity, AlertTriangle, CheckCircle, BarChart3, Users, User } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid, ScatterChart, Scatter } from 'recharts'
import type { SASResult, ECRResult, HollandResult } from '../../utils/calculators'
import { HOLLAND_COLORS, HOLLAND_NAMES, SAS_COLORS, SAS_DIMENSION_NAMES, ECR_DIMENSION_NAMES } from './ReportColors'

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

export function ECRReport({ result }: { result: ECRResult }) {
  const radarData = result.radarData.map(d => ({
    ...d,
    dimension: ECR_DIMENSION_NAMES[d.dimension] || d.dimension
  }))

  const quadrantData = [{ x: result.quadrantPosition.x, y: result.quadrantPosition.y }]
  
  const quadrantLabels = [
    { x: 30, y: 30, type: '安全型', color: '#10b981' },
    { x: 70, y: 30, type: '恐惧型', color: '#ef4444' },
    { x: 30, y: 70, type: '专注型', color: '#f59e0b' },
    { x: 70, y: 70, type: '冷漠型', color: '#3b82f6' }
  ]

  const typeColors: Record<string, string> = {
    secure: 'from-green-500 to-emerald-500',
    preoccupied: 'from-amber-500 to-orange-500',
    dismissive: 'from-blue-500 to-cyan-500',
    fearful: 'from-red-500 to-rose-500'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-900/20 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${typeColors[result.attachmentType]} flex items-center justify-center shadow-2xl`}>
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${typeColors[result.attachmentType]} text-white text-sm font-semibold flex items-center gap-2`}>
                {result.attachmentTypeEmoji} {result.attachmentTypeName}
              </span>
              <span className="text-white/40 text-sm">焦虑 {result.anxietyPercentage}%</span>
              <span className="text-white/40 text-sm">回避 {result.avoidancePercentage}%</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">成人依恋风格专业报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.typeDescription}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl">{result.attachmentTypeEmoji}</div>
            <div className="text-white/40 text-sm mt-1">依恋类型</div>
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
            <Target className="w-6 h-6 text-pink-400" />
            依恋四象限定位图
          </h3>
          <div className="relative h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                <defs>
                  <radialGradient id="ecrGlow">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                  </radialGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="焦虑维度" 
                  domain={[0, 100]} 
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  label={{ value: '焦虑 →', position: 'insideBottomRight', fill: 'rgba(255,255,255,0.6)' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="回避维度" 
                  domain={[0, 100]} 
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  label={{ value: '← 回避', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.6)' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(236, 72, 153, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
                />
                <Scatter name="你的位置" data={quadrantData} fill="#ec4899" />
              </ScatterChart>
            </ResponsiveContainer>
            {quadrantLabels.map((q, i) => (
              <div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold opacity-30"
                style={{
                  left: `${10 + q.x * 0.8}%`,
                  top: `${90 - q.y * 0.8}%`,
                  color: q.color
                }}
              >
                {q.type}
              </div>
            ))}
          </div>
          <div className="flex justify-around mt-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{result.anxietyPercentage}%</div>
              <div className="text-white/50 text-sm">焦虑维度</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{result.avoidancePercentage}%</div>
              <div className="text-white/50 text-sm">回避维度</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-violet-400" />
            子维度雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="ecrGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="得分" 
                  dataKey="score" 
                  stroke="#ec4899" 
                  fill="url(#ecrGradient)" 
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 p-8 border border-green-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-green-400" />
            关系优势
          </h3>
          <div className="space-y-3">
            {result.strengthAnalysis.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 mt-2" />
                <span className="text-white/80 leading-relaxed">{strength}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 p-8 border border-amber-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-400" />
            成长空间
          </h3>
          <div className="space-y-3">
            {result.growthAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 mt-2" />
                <span className="text-white/80 leading-relaxed">{area}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-violet-500/10 p-8 border border-pink-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">亲密关系经营建议</h3>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-pink-500/10">
          <p className="text-pink-100/90 leading-relaxed text-lg">{result.relationshipAdvice}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <User className="w-6 h-6 text-violet-400" />
          名人案例
        </h3>
        <div className="flex flex-wrap gap-3">
          {result.famousExamples.map((name, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + index * 0.05 }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 text-white/80 font-medium"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function HollandReport({ result }: { result: HollandResult }) {
  const hexagonData = result.hexagonData.map(d => ({
    ...d,
    type: HOLLAND_NAMES[d.type] || d.type
  }))

  const HOLLAND_CODES: Record<string, string> = {
    R: '#ef4444',
    I: '#3b82f6',
    A: '#8b5cf6',
    S: '#10b981',
    E: '#f59e0b',
    C: '#06b6d4'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-500 flex items-center justify-center shadow-2xl">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold">
                霍兰德代码: {result.code}
              </span>
              {result.topThree.map((code, i) => (
                <span 
                  key={code}
                  className="px-3 py-1 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: HOLLAND_CODES[code] + '40', color: HOLLAND_CODES[code] }}
                >
                  {i + 1}. {HOLLAND_NAMES[code]}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">职业兴趣专业报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.personalityProfile}</p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {result.code}
            </div>
            <div className="text-white/40 text-sm mt-1">RIASEC代码</div>
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
            <Compass className="w-6 h-6 text-cyan-400" />
            霍兰德六边形模型
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={hexagonData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis 
                  dataKey="type" 
                  tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 'bold' }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="hollandGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                    <stop offset="33%" stopColor="#3b82f6" stopOpacity={0.7} />
                    <stop offset="66%" stopColor="#8b5cf6" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="兴趣强度" 
                  dataKey="score" 
                  stroke="#06b6d4" 
                  fill="url(#hollandGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(6, 182, 212, 0.3)',
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
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            维度强度分布
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.hexagonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <YAxis 
                  dataKey="type" 
                  type="category" 
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  width={60}
                  tickFormatter={(value) => HOLLAND_NAMES[value]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value}%`, '兴趣强度']}
                  labelFormatter={(value) => HOLLAND_NAMES[value] || value}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={24}>
                  {result.hexagonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={HOLLAND_COLORS[entry.type]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
          <Brain className="w-6 h-6 text-violet-400" />
          类型深度解读
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {result.typeDescriptions.map((type, index) => (
            <motion.div
              key={type.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.1 }}
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: `${HOLLAND_COLORS[type.type]}15`,
                borderColor: `${HOLLAND_COLORS[type.type]}40`
              }}
            >
              <div 
                className="inline-flex px-3 py-1 rounded-lg text-white text-sm font-bold mb-3"
                style={{ backgroundColor: HOLLAND_COLORS[type.type] }}
              >
                {type.type} - {type.name}
              </div>
              <p className="text-white/70 leading-relaxed">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">核心特质</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {result.coreTraits.map((trait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + index * 0.03 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-200 font-medium"
            >
              {trait}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 p-8 border border-emerald-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" />
            核心推荐职业
          </h3>
          <div className="space-y-2">
            {result.careerRecommendations.primary.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white/80">{career}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-sky-500/10 p-8 border border-blue-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" />
            次级匹配职业
          </h3>
          <div className="space-y-2">
            {result.careerRecommendations.secondary.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-white/80">{career}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-pink-500/10 p-8 border border-violet-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-violet-400" />
            可探索方向
          </h3>
          <div className="space-y-2">
            {result.careerRecommendations.exploring.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20"
              >
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-white/80">{career}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 p-8 border border-cyan-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">理想工作环境</h3>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-cyan-500/10">
          <p className="text-cyan-100/90 leading-relaxed text-lg">{result.workEnvironmentTips}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          职业发展建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {result.developmentAdvice.map((advice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-white/80 leading-relaxed">{advice}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
