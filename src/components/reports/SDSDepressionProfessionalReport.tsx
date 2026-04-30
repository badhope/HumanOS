import { motion } from 'framer-motion'
import { Heart, Sun, Cloud, CloudRain, Award, Target, TrendingUp, AlertTriangle, Sparkles } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface SDSReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const SDS_LEVELS = [
  { min: 70, title: '重度抑郁倾向', level: '重点关注', color: 'from-blue-800 to-slate-700', action: '建议寻求专业心理咨询', desc: '情绪低落持续存在，影响社会功能' },
  { min: 50, title: '中度抑郁倾向', level: '需要调整', color: 'from-blue-600 to-slate-600', action: '建议增加社交和运动', desc: '情绪经常低落，兴趣减退' },
  { min: 30, title: '轻度情绪困扰', level: '正常波动', color: 'from-blue-500 to-cyan-500', action: '注意情绪调节即可', desc: '偶尔情绪低落，能自我恢复' },
  { min: 0, title: '情绪健康', level: '优秀', color: 'from-sun-cyan to-emerald-500', action: '继续保持', desc: '情绪稳定，积极乐观' },
]

const SDS_DIMENSIONS = [
  { name: '情绪低落', key: 'mood' },
  { name: '兴趣减退', key: 'interest' },
  { name: '睡眠障碍', key: 'sleep' },
  { name: '疲劳感', key: 'fatigue' },
  { name: '自我评价', key: 'esteem' },
]

export default function SDSDepressionProfessionalReport({ result, mode = 'normal' }: SDSReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['mood', 'interest', 'sleep', 'fatigue', 'esteem'])
  const sdsScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = SDS_LEVELS.find(l => sdsScore >= l.min) || SDS_LEVELS[SDS_LEVELS.length - 1]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${levelInfo.color} opacity-90`} />
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">SDS 抑郁自评量表 · 专业报告</span>
            </div>
            {mode === 'professional' && (
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-2">
                <Award className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">专业版</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {sdsScore > 50 ? <CloudRain className="w-12 h-12 text-white" /> : sdsScore > 30 ? <Cloud className="w-12 h-12 text-white" /> : <Sun className="w-12 h-12 text-white" />}
                <h1 className="text-4xl font-black text-white">{levelInfo.title}</h1>
              </div>
              <p className="text-white/70 text-lg mb-1">{levelInfo.desc}</p>
              <p className="text-white font-semibold">💡 {levelInfo.action}</p>
            </div>
            <CircularProgressChart score={100 - sdsScore} title="心理健康指数" size="large" colorScheme={sdsScore > 50 ? 'blue' : sdsScore > 30 ? 'violet' : 'green'} showScore animated />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-blue-400" />
          抑郁症状五维度
        </h3>
        <AdvancedBarChart dimensions={dimensions.map((d, i) => ({ name: SDS_DIMENSIONS[i]?.name || d.name, score: d.score, maxScore: 100 }))} colorScheme="gradient" animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          心情变好小魔法
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {['晒15分钟太阳', '30分钟有氧运动', '给朋友打个电话', '整理房间断舍离', '做一件一直想做的事', '吃一顿好吃的'].map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.1 }} className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 border border-emerald-500/20 text-center">
              <Sun className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <span className="text-white/80">{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
