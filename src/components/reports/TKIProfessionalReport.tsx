import { motion } from 'framer-motion'
import { Users, Swords, Shield, Heart, Award, Target, Scale, TrendingUp } from 'lucide-react'
import { AdvancedBarChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface TKIReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const TKI_MODES = [
  { id: 'competing', name: '竞争型', icon: Swords, color: 'from-red-500 to-rose-500', desc: '坚持己见，果断有力', best: '紧急决策，需要快速行动时' },
  { id: 'collaborating', name: '协作型', icon: Users, color: 'from-blue-500 to-cyan-500', desc: '双赢思维，整合观点', best: '双方需求都很重要时' },
  { id: 'compromising', name: '妥协型', icon: Scale, color: 'from-amber-500 to-orange-500', desc: '各让一步，寻求中间', best: '目标中等重要，时间有限时' },
  { id: 'avoiding', name: '回避型', icon: Shield, color: 'from-violet-500 to-purple-500', desc: '冷静后撤，避免冲突', best: '问题不重要，或者需要冷静时' },
  { id: 'accommodating', name: '迁就型', icon: Heart, color: 'from-pink-500 to-rose-500', desc: '以和为贵，满足对方', best: '维持关系比赢更重要时' },
]

export default function TKIProfessionalReport({ result, mode = 'normal' }: TKIReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['competing', 'collaborating', 'compromising', 'avoiding', 'accommodating'])
  const dominant = [...dimensions].sort((a, b) => b.score - a.score)[0]
  const modeInfo = TKI_MODES.find(m => m.id === dominant?.name) || TKI_MODES[1]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${modeInfo.color} opacity-90`} />
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Swords className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">TKI 冲突模式量表 · 专业报告</span>
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
              {(() => { const Icon = modeInfo.icon; return <Icon className="w-12 h-12 text-white" />; })()}
              <h1 className="text-5xl font-black text-white">{modeInfo.name}冲突处理者</h1>
            </div>
            <p className="text-white/80 text-lg">{modeInfo.desc}</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-400" />
          冲突模式五维雷达
        </h3>
        <AdvancedRadarChart dimensions={dimensions.map(d => {
          const info = TKI_MODES.find(m => m.id === d.name);
          return { name: info?.name || d.name, score: d.score, maxScore: 100 };
        })} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          五种模式最佳使用场景
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TKI_MODES.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <motion.div key={mode.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.1 }} className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-1">{mode.name}</h4>
                <p className="text-white/50 text-sm">{mode.best}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  )
}
