import { motion } from 'framer-motion'
import { Heart, Star, Award, Target, TrendingUp, Sparkles, Shield, Users, Zap } from 'lucide-react'
import { AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface VIACharacterStrengthsReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const VIA_STRENGTHS = [
  { id: 'creativity', name: '创造力', icon: Sparkles, desc: '想出新颖有用的方法' },
  { id: 'curiosity', name: '好奇心', icon: Target, desc: '对经验和知识充满兴趣' },
  { id: 'judgment', name: '判断力', icon: Shield, desc: '多角度思考，不急于下结论' },
  { id: 'love', name: '爱', icon: Heart, desc: '珍惜亲密关系，互相关心' },
  { id: 'kindness', name: '仁慈', icon: Users, desc: '乐于助人，与人为善' },
  { id: 'perseverance', name: '毅力', icon: Zap, desc: '有始有终，迎难而上' },
  { id: 'honesty', name: '诚实', icon: Shield, desc: '真实坦荡，表里如一' },
  { id: 'hope', name: '希望', icon: Star, desc: '对未来充满期待，相信美好' },
]

export default function VIACharacterStrengthsProfessionalReport({ result, mode = 'normal' }: VIACharacterStrengthsReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['creativity', 'curiosity', 'judgment', 'love', 'kindness', 'perseverance', 'honesty', 'hope'])
  const topThree = [...dimensions].sort((a, b) => b.score - a.score).slice(0, 3)
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-amber-700 via-yellow-600 to-orange-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-white/80" />
            <span className="text-white/80 font-medium">VIA 性格优势测评 · 专业报告</span>
          </div>
          {mode === 'professional' && (
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">专业版</span>
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-4xl font-black text-white mb-4">✨ 你的核心性格优势</h1>
          <div className="flex flex-wrap gap-3">
            {topThree.map((dim, i) => {
              const info = VIA_STRENGTHS.find(v => v.id === dim.name);
              const Icon = info?.icon || Star;
              return (
                <motion.span
                  key={dim.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="px-5 py-2.5 rounded-full bg-white/15 flex items-center gap-2 backdrop-blur-sm"
                >
                  <Icon className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">{info?.name || dim.name}</span>
                  <span className="text-white/60 text-sm">TOP{i + 1}</span>
                </motion.span>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-amber-400" />
          8项性格优势全景
        </h3>
        <AdvancedBarChart height={300} dimensions={dimensions.map(d => {
          const info = VIA_STRENGTHS.find(v => v.id === d.name);
          return { name: info?.name || d.name, score: d.score, maxScore: 100, description: info?.desc };
        })} colorScheme="gradient" animated />
      </motion.div>
    </div>
  )
}
