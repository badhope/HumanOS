import { motion } from 'framer-motion'
import { Heart, Users, Award, Target, TrendingUp, Shield, Scale, Star } from 'lucide-react'
import { AdvancedBarChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface MoralFoundationsReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const MORAL_FOUNDATIONS = [
  { id: 'care', name: '关怀/伤害', icon: Heart, desc: '同情善良，避免痛苦' },
  { id: 'fairness', name: '公平/欺骗', icon: Scale, desc: '正义互惠，惩恶扬善' },
  { id: 'loyalty', name: '忠诚/背叛', icon: Users, desc: '内群团结，荣辱与共' },
  { id: 'authority', name: '权威/颠覆', icon: Shield, desc: '尊重传统，维护秩序' },
  { id: 'sanctity', name: '圣洁/堕落', icon: Star, desc: '崇尚崇高，抵制亵渎' },
  { id: 'liberty', name: '自由/压迫', icon: Target, desc: '反抗压迫，捍卫自主' },
]

export default function MoralFoundationsProfessionalReport({ result, mode = 'normal' }: MoralFoundationsReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['care', 'fairness', 'loyalty', 'authority', 'sanctity', 'liberty'])
  const dominant = [...dimensions].sort((a, b) => b.score - a.score)[0]
  const foundationInfo = MORAL_FOUNDATIONS.find(f => f.id === dominant?.name) || MORAL_FOUNDATIONS[0]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-rose-800 via-pink-700 to-fuchsia-800"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-white/80" />
            <span className="text-white/80 font-medium">道德基础理论 MFT · 专业报告</span>
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
            {(() => { const Icon = foundationInfo.icon; return <Icon className="w-12 h-12 text-white" />; })()}
            <h1 className="text-4xl font-black text-white">你的核心道德基础: {foundationInfo.name}</h1>
          </div>
          <p className="text-white/80 text-lg">{foundationInfo.desc}</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-pink-400" />
          六项道德基础雷达图
        </h3>
        <AdvancedRadarChart dimensions={dimensions.map(d => {
          const info = MORAL_FOUNDATIONS.find(f => f.id === d.name);
          return { name: info?.name || d.name, score: d.score, maxScore: 100 };
        })} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          道德基础详细得分
        </h3>
        <AdvancedBarChart dimensions={dimensions.map(d => {
          const info = MORAL_FOUNDATIONS.find(f => f.id === d.name);
          return { name: info?.name || d.name, score: d.score, maxScore: 100, description: info?.desc };
        })} colorScheme="gradient" animated />
      </motion.div>
    </div>
  )
}
