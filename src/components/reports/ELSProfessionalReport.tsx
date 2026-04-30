import { motion } from 'framer-motion'
import { GraduationCap, Brain, BookOpen, Award, Target, TrendingUp, Lightbulb, Users, Clock } from 'lucide-react'
import { AdvancedBarChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface ELSReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const ELS_STRATEGIES = [
  { id: 'metacognitive', name: '元认知策略', icon: Brain, desc: '计划、监控、调节学习过程' },
  { id: 'elaboration', name: '精加工策略', icon: Lightbulb, desc: '建立联系，深入理解' },
  { id: 'rehearsal', name: '复述策略', icon: GraduationCap, desc: '重复记忆，巩固新知' },
  { id: 'organization', name: '组织策略', icon: BookOpen, desc: '梳理结构，系统化知识' },
  { id: 'time', name: '时间管理', icon: Clock, desc: '高效规划，合理分配' },
  { id: 'help', name: '求助策略', icon: Users, desc: '主动寻求帮助和资源' },
]

export default function ELSProfessionalReport({ result, mode = 'normal' }: ELSReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['metacognitive', 'elaboration', 'rehearsal', 'organization', 'time', 'help'])
  const dominant = [...dimensions].sort((a, b) => b.score - a.score)[0]
  const strategyInfo = ELS_STRATEGIES.find(s => s.id === dominant?.name) || ELS_STRATEGIES[0]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-white/80" />
            <span className="text-white/80 font-medium">ELS 学习策略量表 · 专业报告</span>
          </div>
          {mode === 'professional' && (
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">专业版</span>
            </div>
          )}
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-3">
            {(() => { const Icon = strategyInfo.icon; return <Icon className="w-12 h-12 text-white" />; })()}
            <h1 className="text-4xl font-black text-white">{strategyInfo.name}主导者</h1>
          </div>
          <p className="text-white/80 text-lg">{strategyInfo.desc}</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-cyan-400" />
          学习策略六维雷达
        </h3>
        <AdvancedRadarChart dimensions={dimensions.map(d => {
          const info = ELS_STRATEGIES.find(s => s.id === d.name);
          return { name: info?.name || d.name, score: d.score, maxScore: 100 };
        })} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          学习策略详细得分
        </h3>
        <AdvancedBarChart dimensions={dimensions.map(d => {
          const info = ELS_STRATEGIES.find(s => s.id === d.name);
          return { name: info?.name || d.name, score: d.score, maxScore: 100 };
        })} colorScheme="gradient" animated />
      </motion.div>
    </div>
  )
}
