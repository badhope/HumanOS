import { motion } from 'framer-motion'
import { Heart, Users, Shield, Target, Award, TrendingUp, Compass, Zap, Brain } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface PCQReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const PCQ_DIMENSIONS = [
  { name: '目标承诺', key: 'goal' },
  { name: '毅力坚持', key: 'perseverance' },
  { name: '主动付出', key: 'initiative' },
  { name: '逆境反弹', key: 'adversity' },
  { name: '机会把握', key: 'opportunity' },
]

const PCQ_LEVELS = [
  { min: 80, title: '超级抱负者', level: 'S级', color: 'from-amber-500 to-orange-500', desc: '内心燃烧着熊熊火焰，不达目的誓不罢休' },
  { min: 60, title: '积极进取者', level: 'A级', color: 'from-blue-500 to-cyan-500', desc: '有明确目标并为之付出努力' },
  { min: 40, title: '稳健发展者', level: 'B级', color: 'from-teal-500 to-emerald-500', desc: '脚踏实地，稳扎稳打' },
  { min: 20, title: '随遇而安', level: 'C级', color: 'from-violet-500 to-purple-500', desc: '佛系生活，顺其自然' },
  { min: 0, title: '躺平大师', level: 'D级', color: 'from-pink-500 to-rose-500', desc: '人间不值得' },
]

export default function PCQProfessionalReport({ result, mode = 'normal' }: PCQReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['goal', 'perseverance', 'initiative', 'adversity', 'opportunity'])
  const pcqScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = PCQ_LEVELS.find(l => pcqScore >= l.min) || PCQ_LEVELS[PCQ_LEVELS.length - 1]
  
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
              <Target className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">抱负量表测评 PCQ · 专业报告</span>
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
                <Zap className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">{levelInfo.title}</h1>
              </div>
              <p className="text-white/70 text-xl mb-2">抱负等级: {levelInfo.level}</p>
              <p className="text-white/80 text-lg">{levelInfo.desc}</p>
            </div>
            <CircularProgressChart score={pcqScore} title="抱负指数" size="large" colorScheme="amber" showScore animated />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6 text-amber-400" />
          抱负五维雷达
        </h3>
        <AdvancedRadarChart dimensions={dimensions.map((d, i) => ({ name: PCQ_DIMENSIONS[i]?.name || d.name, score: d.score, maxScore: 100 }))} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-400" />
          维度详细解析
        </h3>
        <AdvancedBarChart dimensions={dimensions.map((d, i) => ({ name: PCQ_DIMENSIONS[i]?.name || d.name, score: d.score, maxScore: 100 }))} colorScheme="gradient" animated />
      </motion.div>
    </div>
  )
}
