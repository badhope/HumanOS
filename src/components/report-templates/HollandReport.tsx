import { motion } from 'framer-motion'
import { Briefcase, Compass, BarChart3, Brain, Zap, Award, Target, Lightbulb } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts'
import type { HollandResult } from '../../utils/calculators'
import { HOLLAND_COLORS, HOLLAND_NAMES } from './ReportColors'

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
