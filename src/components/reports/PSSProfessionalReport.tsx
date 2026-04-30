import { motion } from 'framer-motion'
import { Brain, Heart, Shield, AlertTriangle, Award, TrendingUp, Wind, Droplets, Waves } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface PSSReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const PSS_DIMENSIONS = [
  { name: '不可控感', key: 'control' },
  { name: '生活冲突', key: 'conflict' },
  { name: '压力过载', key: 'overload' },
  { name: '应对能力', key: 'coping' },
  { name: '焦虑水平', key: 'anxiety' },
]

const PSS_LEVELS = [
  { min: 75, title: '压力山大', level: '高危', color: 'from-red-600 to-rose-500', desc: '长期高压状态，需要立即减压', action: '建议立即休息，寻求专业帮助' },
  { min: 55, title: '中度压力', level: '警惕', color: 'from-orange-500 to-amber-500', desc: '压力正在累积，需要调整', action: '注意劳逸结合，增加运动' },
  { min: 35, title: '正常范围', level: '良好', color: 'from-blue-500 to-cyan-500', desc: '压力适中，能有效应对', action: '保持当前状态即可' },
  { min: 0, title: '轻松自在', level: '优秀', color: 'from-emerald-500 to-teal-500', desc: '心态平和，生活从容', action: '继续保持健康生活方式' },
]

export default function PSSProfessionalReport({ result, mode = 'normal' }: PSSReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['control', 'conflict', 'overload', 'coping', 'anxiety'])
  const pssScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = PSS_LEVELS.find(l => pssScore >= l.min) || PSS_LEVELS[PSS_LEVELS.length - 1]
  
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
              <Wind className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">知觉压力量表 PSS · 专业报告</span>
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
                <Waves className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">{levelInfo.title}</h1>
              </div>
              <p className="text-white/70 text-xl mb-2">压力等级: {levelInfo.level}</p>
              <p className="text-white/80 text-lg mb-2">{levelInfo.desc}</p>
              <p className="text-white font-semibold">💡 {levelInfo.action}</p>
            </div>
            <CircularProgressChart score={pssScore} title="压力指数" size="large" colorScheme={pssScore > 55 ? 'red' : pssScore > 35 ? 'amber' : 'green'} showScore animated />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-400" />
          压力五维剖析
        </h3>
        <AdvancedRadarChart dimensions={dimensions.map((d, i) => ({ name: PSS_DIMENSIONS[i]?.name || d.name, score: d.score, maxScore: 100 }))} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Droplets className="w-6 h-6 text-blue-400" />
          减压小贴士
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {['深呼吸冥想', '有氧运动30分钟', '保证7小时睡眠', '与人倾诉交流', '断舍离简化生活', '培养兴趣爱好'].map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.1 }} className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
              <Heart className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <span className="text-white/80 text-sm">{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
