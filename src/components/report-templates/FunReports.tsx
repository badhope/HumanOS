import { motion } from 'framer-motion'
import { Award, TrendingUp, Lightbulb, Target, Heart, Brain, Briefcase, Compass, Zap, Activity, AlertTriangle, BarChart3, Users, User } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { 
  LIFE_MEANING_DIMENSION_NAMES, 
  PATRIOTISM_DIMENSION_NAMES, 
  SLACKING_DIMENSION_NAMES, 
  FOODIE_DIMENSION_NAMES, 
  INTERNET_ADDICTION_DIMENSION_NAMES, 
  SEXUAL_EXPERIENCE_DIMENSION_NAMES 
} from './ReportColors'

interface GenericReportResult {
  [key: string]: any
}

export function LifeMeaningReport({ result }: { result: GenericReportResult }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: LIFE_MEANING_DIMENSION_NAMES[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">{result.meaningRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
              {result.meaningIndex}
            </div>
            <div className="text-white/40 text-sm mt-1">人生意义指数</div>
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
            <Target className="w-6 h-6 text-indigo-400" />
            五维意义雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="meaningGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="意义指数" 
                  dataKey="score" 
                  stroke="#6366f1" 
                  fill="url(#meaningGradient)" 
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
            <BarChart3 className="w-6 h-6 text-violet-400" />
            维度解读
          </h3>
          <div className="space-y-4">
            {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-semibold text-white mb-1">{LIFE_MEANING_DIMENSION_NAMES[key] || key}</div>
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
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          哲学金句
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(result.philosophyQuotes || []).map((quote: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 italic text-amber-100"
            >
              "{quote}"
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-emerald-400" />
          人生建议
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(result.lifeSuggestions || []).map((suggestion: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + index * 0.08 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-100"
            >
              {suggestion}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function PatriotismReport({ result }: { result: GenericReportResult }) {
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

export function SlackingReport({ result }: { result: GenericReportResult }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: SLACKING_DIMENSION_NAMES[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-teal-500/30 text-4xl">
            🦥
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">👑 {result.slackingRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {result.slackingIndex}%
            </div>
            <div className="text-white/40 text-sm mt-1">摸鱼纯度</div>
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
            <Target className="w-6 h-6 text-teal-400" />
            摸鱼五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="slackGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="摸鱼指数" 
                  dataKey="score" 
                  stroke="#14b8a6" 
                  fill="url(#slackGradient)" 
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
            <User className="w-6 h-6 text-cyan-400" />
            摸鱼段位解读
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
                <div className="font-semibold text-white mb-1">{SLACKING_DIMENSION_NAMES[key] || key}</div>
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
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-emerald-400" />
          摸鱼金句
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.slackingQuotes || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-200 font-medium"
            >
              🏆 {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-blue-400" />
          摸鱼大师进阶秘籍
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(result.slackingTips || []).map((tip: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-100"
            >
              💡 {tip}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function FoodieReport({ result }: { result: GenericReportResult }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: FOODIE_DIMENSION_NAMES[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-orange-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center shadow-2xl shadow-orange-500/30 text-4xl">
            🍜
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">🍚 {result.foodieRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              {result.foodieIndex}%
            </div>
            <div className="text-white/40 text-sm mt-1">干饭纯度</div>
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
            <Target className="w-6 h-6 text-orange-400" />
            干饭五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="foodieGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#eab308" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="干饭指数" 
                  dataKey="score" 
                  stroke="#f97316" 
                  fill="url(#foodieGradient)" 
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
            <Activity className="w-6 h-6 text-amber-400" />
            干饭段位解读
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
                <div className="font-semibold text-white mb-1">{FOODIE_DIMENSION_NAMES[key] || key}</div>
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
          干饭金句
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.foodieQuotes || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-200 font-medium"
            >
              🏅 {badge}
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
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          干饭人的人生建议
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(result.foodRecommendations || []).map((advice: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-100"
            >
              💫 {advice}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function InternetAddictionReport({ result }: { result: GenericReportResult }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: INTERNET_ADDICTION_DIMENSION_NAMES[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30 text-4xl">
            📱
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">{result.addictionRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {result.addictionIndex}%
            </div>
            <div className="text-white/40 text-sm mt-1">网瘾指数</div>
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
            <Target className="w-6 h-6 text-cyan-400" />
            网瘾五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="netGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="网瘾指数" 
                  dataKey="score" 
                  stroke="#06b6d4" 
                  fill="url(#netGradient)" 
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
            <AlertTriangle className="w-6 h-6 text-blue-400" />
            网瘾段位解读
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
                <div className="font-semibold text-white mb-1">{INTERNET_ADDICTION_DIMENSION_NAMES[key] || key}</div>
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
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-violet-400" />
          赛博金句
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.internetQuotes || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-violet-200 font-medium"
            >
              🎖️ {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-rose-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-rose-400" />
          戒网瘾指南
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(result.detoxSuggestions || []).map((tip: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-100"
            >
              🌱 {tip}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function SexualExperienceReport({ result }: { result: GenericReportResult }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: SEXUAL_EXPERIENCE_DIMENSION_NAMES[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-pink-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 via-rose-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center shadow-2xl shadow-pink-500/30 text-4xl">
            🔥
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">{result.experienceRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
              {result.experienceIndex}
            </div>
            <div className="text-white/40 text-sm mt-1">老司机指数</div>
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
            老司机五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="sexGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f43f5e" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="经验指数" 
                  dataKey="score" 
                  stroke="#ec4899" 
                  fill="url(#sexGradient)" 
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
            <Users className="w-6 h-6 text-rose-400" />
            段位深度解读
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
                <div className="font-semibold text-white mb-1">{SEXUAL_EXPERIENCE_DIMENSION_NAMES[key] || key}</div>
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
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-pink-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-pink-400" />
          冷知识
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.funFacts || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 text-pink-200 font-medium"
            >
              🏅 {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-400" />
          老司机人生箴言
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(result.lifeAdvice || []).map((quote: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-100 italic"
            >
              💖 "{quote}"
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function ColorSubconsciousReport({ result }: { result: GenericReportResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-8 border border-white/10"
        style={{ background: `linear-gradient(135deg, ${result.hex || '#8B5CF6'}30, #1e1b4b, ${result.hex || '#8B5CF6'}15)` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: result.hex, opacity: 0.3 }} />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl" style={{ backgroundColor: result.hex }}>
            <span className="text-5xl">{result.emoji || '🌈'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-white text-sm font-semibold" style={{ backgroundColor: result.hex }}>
                灵魂色彩诊断
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.name || '你的灵魂色彩'}</h2>
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
          <BarChart3 className="w-6 h-6 text-violet-400" />
          五维色彩人格分析
        </h3>
        <div className="grid md:grid-cols-5 gap-3">
          {(result.dimensions || []).map((dim: any, index: number) => (
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
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-rose-400" />
          九色灵魂图鉴
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {(result.allColors || []).slice(0, 9).map((color: any, index: number) => (
            <motion.div
              key={color.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`p-4 rounded-xl border ${result.type === color.type ? 'ring-2 ring-white/50 border-white/30' : 'border-white/10'} bg-white/5`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{color.emoji}</span>
                <div>
                  <div className="font-semibold text-white">{color.name}</div>
                  <div className="text-white/40 text-xs">{color.type}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function AbmLoveAnimalReport({ result }: { result: GenericReportResult }) {
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
          {(result.dimensions || []).map((dim: any, index: number) => (
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
          {(result.allAnimals || []).map((animal: any, index: number) => (
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

export function MentalAgeReport({ result }: { result: GenericReportResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/40 via-orange-900/20 to-yellow-900/30 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
            <span className="text-5xl">{result.emoji || '🏛️'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold">
                精神年龄诊断
              </span>
              <span className="text-white/40 text-lg font-bold">{result.mentalAge || 99} 岁</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.overall || '精神年龄'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg">
              你的身体在上班，灵魂已经退休了吗？
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
          <Brain className="w-6 h-6 text-amber-400" />
          心智五维分析
        </h3>
        <div className="grid md:grid-cols-5 gap-3">
          {(result.dimensions || []).map((dim: any, index: number) => (
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
    </div>
  )
}

export function SBTIPersonalityReport({ result }: { result: GenericReportResult }) {
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
          {(result.dimensions || []).map((dim: any, index: number) => (
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
