import { motion } from 'framer-motion'
import { Brain, Eye, Target, Award, TrendingUp, Compass, Sparkles, Lightbulb } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface MetacognitionReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const METACOGNITION_DIMENSIONS = [
  { name: '计划能力', key: 'planning', desc: '设定目标、制定策略' },
  { name: '监控能力', key: 'monitoring', desc: '实时觉察认知过程' },
  { name: '调节能力', key: 'regulation', desc: '调整策略、纠正错误' },
  { name: '自我评估', key: 'evaluation', desc: '客观评价认知成果' },
  { name: '知识信念', key: 'beliefs', desc: '对认知本身的理解' },
]

const METACOGNITION_LEVELS = [
  { min: 80, title: '思维大师', desc: '完全掌控自己的思维过程' },
  { min: 60, title: '反思者', desc: '经常反省和调整思考方式' },
  { min: 40, title: '有意识学习者', desc: '偶尔进行自我监控' },
  { min: 0, title: '直觉思考者', desc: '依赖本能和习惯思维' },
]

export default function MetacognitionProfessionalReport({ result, mode = 'normal' }: MetacognitionReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['planning', 'monitoring', 'regulation', 'evaluation', 'beliefs'])
  const metaScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = METACOGNITION_LEVELS.find(l => metaScore >= l.min) || METACOGNITION_LEVELS[METACOGNITION_LEVELS.length - 1]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-800"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-white/80" />
            <span className="text-white/80 font-medium">元认知能力测评 · 专业报告</span>
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
              <Eye className="w-12 h-12 text-white" />
              <h1 className="text-4xl font-black text-white">{levelInfo.title}</h1>
            </div>
            <p className="text-white/80 text-lg">{levelInfo.desc}</p>
          </div>
          <CircularProgressChart score={metaScore} title="元认知指数" size="large" colorScheme="violet" showScore animated />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6 text-violet-400" />
          元认知五维雷达
        </h3>
        <AdvancedRadarChart dimensions={dimensions.map((d, i) => ({ name: METACOGNITION_DIMENSIONS[i]?.name || d.name, score: d.score, maxScore: 100 }))} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          元认知提升建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {['写思维日志，记录决策过程', '每步自问：我在想什么？', '做错后复盘：哪里想错了？', '学习新方法后立即总结', '用第三人称视角看自己', '预演可能的思考路径'].map((tip, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.1 }} className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Sparkles className="w-5 h-5 text-violet-400 mb-2" />
              <span className="text-white/80">{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
