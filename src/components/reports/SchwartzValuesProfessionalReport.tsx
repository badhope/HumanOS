import { motion } from 'framer-motion'
import { Heart, Users, Award, Target, TrendingUp, Compass, Star, Globe, Zap, Shield } from 'lucide-react'
import { AdvancedBarChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface SchwartzReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const SCHWARTZ_VALUES = [
  { id: 'power', name: '权力', icon: Zap, desc: '社会地位与声望，控制他人与资源' },
  { id: 'achievement', name: '成就', icon: Star, desc: '个人能力与成功的社会证明' },
  { id: 'hedonism', name: '享乐', icon: Heart, desc: '追求感官快乐与自我满足' },
  { id: 'stimulation', name: '刺激', icon: Compass, desc: '寻求兴奋、新奇与挑战' },
  { id: 'selfdirection', name: '自主', icon: Target, desc: '独立思考与行为选择' },
  { id: 'universalism', name: '普世', icon: Globe, desc: '理解、欣赏与包容所有生命' },
  { id: 'benevolence', name: '仁爱', icon: Users, desc: '关心亲近之人的福祉' },
  { id: 'tradition', name: '传统', icon: Shield, desc: '尊重文化与宗教的承诺' },
  { id: 'conformity', name: '遵从', icon: Users, desc: '克制行为，避免他人反感' },
  { id: 'security', name: '安全', icon: Shield, desc: '安全、和谐与稳定' },
]

export default function SchwartzValuesProfessionalReport({ result, mode = 'normal' }: SchwartzReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['power', 'achievement', 'hedonism', 'stimulation', 'selfdirection', 'universalism', 'benevolence', 'tradition', 'conformity', 'security'])
  const topThree = [...dimensions].sort((a, b) => b.score - a.score).slice(0, 3)
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-indigo-900 via-violet-800 to-purple-800"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-white/80" />
            <span className="text-white/80 font-medium">施瓦茨价值观测评 · 专业报告</span>
          </div>
          {mode === 'professional' && (
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">专业版</span>
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-4xl font-black text-white mb-4">你的核心价值观</h1>
          <div className="flex flex-wrap gap-3">
            {topThree.map((dim, i) => {
              const info = SCHWARTZ_VALUES.find(v => v.id === dim.name);
              const Icon = info?.icon || Heart;
              return (
                <motion.span
                  key={dim.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="px-4 py-2 rounded-full bg-white/15 flex items-center gap-2"
                >
                  <Icon className="w-4 h-4 text-white" />
                  <span className="text-white font-medium">{info?.name || dim.name}</span>
                  <span className="text-white/60 text-sm">#{i + 1}</span>
                </motion.span>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-violet-400" />
          十项价值观全景
        </h3>
        <AdvancedBarChart height={320} dimensions={dimensions.map(d => {
          const info = SCHWARTZ_VALUES.find(v => v.id === d.name);
          return { name: info?.name || d.name, score: d.score, maxScore: 100, description: info?.desc };
        })} colorScheme="gradient" animated />
      </motion.div>
    </div>
  )
}
