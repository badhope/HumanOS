import { motion } from 'framer-motion'
import { Heart, Target, BarChart3, Award, TrendingUp, Users, User } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import type { ECRResult } from '../../utils/calculators'
import { ECR_DIMENSION_NAMES } from './ReportColors'

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
