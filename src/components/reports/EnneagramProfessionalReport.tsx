import { motion } from 'framer-motion'
import { Target, Award, Compass, Heart, Users, Brain, Shield, Star, Zap, Eye, Sun, Moon } from 'lucide-react'
import { ComprehensiveChartSystem, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface EnneagramReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const ENNEAGRAM_TYPES = [
  { id: 'type1', name: '完美型', icon: Shield, desc: '原则至上，追求公正，理想主义者', motivation: '渴望正确，避免错误' },
  { id: 'type2', name: '助人型', icon: Heart, desc: '热心付出，先人后己，关系导向', motivation: '被爱、被需要' },
  { id: 'type3', name: '成就型', icon: Star, desc: '追求成功，形象管理，目标导向', motivation: '被认可、有价值' },
  { id: 'type4', name: '自我型', icon: Eye, desc: '独特敏感，追求深度，唯美主义', motivation: '与众不同、被理解' },
  { id: 'type5', name: '理智型', icon: Brain, desc: '求知若渴，抽离观察，极简生活', motivation: '拥有足够知识和资源' },
  { id: 'type6', name: '疑惑型', icon: Shield, desc: '忠诚谨慎，预设风险，团队导向', motivation: '安全、可预测' },
  { id: 'type7', name: '活跃型', icon: Sun, desc: '乐观冒险，追求快乐，多种选择', motivation: '快乐、不被束缚' },
  { id: 'type8', name: '领袖型', icon: Zap, desc: '强大直接，保护弱小，掌控局面', motivation: '独立自主、不被控制' },
  { id: 'type9', name: '和平型', icon: Moon, desc: '随和包容，避免冲突，追求和谐', motivation: '内心平静、避免冲突' },
]

export default function EnneagramProfessionalReport({ result, mode = 'normal' }: EnneagramReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['type1', 'type2', 'type3', 'type4', 'type5', 'type6', 'type7', 'type8', 'type9'])
  const dominant = [...dimensions].sort((a, b) => b.score - a.score)[0]
  const typeInfo = ENNEAGRAM_TYPES.find(t => t.id === dominant?.name) || ENNEAGRAM_TYPES[4]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-fuchsia-900 via-violet-800 to-purple-900"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Compass className="w-8 h-8 text-white/80" />
            <span className="text-white/80 font-medium">九型人格测评 · 专业报告</span>
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
            {(() => { const Icon = typeInfo.icon; return <Icon className="w-12 h-12 text-white" />; })()}
            <h1 className="text-4xl font-black text-white">
              {typeInfo.name} · {dominant?.name?.toUpperCase()}
            </h1>
          </div>
          <p className="text-white/80 text-lg mb-1">{typeInfo.desc}</p>
          <p className="text-violet-300">核心动机: {typeInfo.motivation}</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-violet-400" />
          九型人格分布图
        </h3>
        <ComprehensiveChartSystem
          dimensions={dimensions.map(d => {
            const info = ENNEAGRAM_TYPES.find(t => t.id === d.name);
            return { name: info?.name || d.name, score: d.score, maxScore: 100 };
          })}
          overallScore={result.score || 75}
          assessmentType="enneagram"
          title="九型人格全景分布"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-emerald-400" />
          九型人格智慧中心
        </h3>
        <AdvancedRadarChart dimensions={[
          { name: '腹中心(891)', score: ((dimensions[7]?.score || 0) + (dimensions[8]?.score || 0) + (dimensions[0]?.score || 0)) / 3, maxScore: 100 },
          { name: '心中心(234)', score: ((dimensions[1]?.score || 0) + (dimensions[2]?.score || 0) + (dimensions[3]?.score || 0)) / 3, maxScore: 100 },
          { name: '脑中心(567)', score: ((dimensions[4]?.score || 0) + (dimensions[5]?.score || 0) + (dimensions[6]?.score || 0)) / 3, maxScore: 100 },
        ]} animated />
      </motion.div>
    </div>
  )
}
