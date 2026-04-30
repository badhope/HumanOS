import { motion } from 'framer-motion'
import { Heart, Star, Award, Target, Zap, Shield, Users, Eye, Sparkles } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface SexualExperienceProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const SEXUAL_LEVELS = [
  { min: 95, title: '人形打桩机', level: 'SSS', color: 'from-rose-600 to-pink-500', desc: '万花丛中过，片叶不沾身' },
  { min: 80, title: '老司机', level: 'S级', color: 'from-pink-500 to-fuchsia-500', desc: '秋名山车神，随时可以发车' },
  { min: 65, title: '实践者', level: 'A级', color: 'from-violet-500 to-purple-500', desc: '理论结合实际，经验丰富' },
  { min: 50, title: '入门级', level: 'B级', color: 'from-blue-500 to-cyan-500', desc: '初入江湖，未来可期' },
  { min: 30, title: '理论王者', level: 'C级', color: 'from-teal-500 to-emerald-500', desc: '嘴上老司机，身体很诚实' },
  { min: 0, title: '纯洁小白', level: 'D级', color: 'from-amber-500 to-orange-500', desc: '母胎solo，纯爱战神' },
]

const SEXUAL_DIMENSIONS = [
  { name: '实战经验', key: 'experience' },
  { name: '理论知识', key: 'theory' },
  { name: '开放程度', key: 'openness' },
  { name: '技巧水平', key: 'skill' },
  { name: '伴侣数量', key: 'partners' },
]

export default function SexualExperienceProfessionalReport({ result, mode = 'normal' }: SexualExperienceProps) {
  const dimensions = safeDimensions(result?.dimensions, ['experience', 'theory', 'openness', 'skill', 'partners'])
  const sexualScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = SEXUAL_LEVELS.find(l => sexualScore >= l.min) || SEXUAL_LEVELS[SEXUAL_LEVELS.length - 1]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${levelInfo.color} opacity-90`} />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">性阅历测评 · 专业报告</span>
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
                <Sparkles className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">
                  {levelInfo.title}
                </h1>
              </div>
              <p className="text-white/70 text-xl mb-2">段位等级: {levelInfo.level}</p>
              <p className="text-white/80 text-lg">{levelInfo.desc}</p>
            </div>
            <div className="text-center">
              <CircularProgressChart
                score={sexualScore}
                title="阅历指数"
                size="large"
                colorScheme={sexualScore > 70 ? 'violet' : sexualScore > 50 ? 'violet' : 'blue'}
                showScore
                animated
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-pink-400" />
          五维能力雷达
        </h3>
        <AdvancedRadarChart
          dimensions={dimensions.map((d, i) => ({
            name: SEXUAL_DIMENSIONS[i]?.name || d.name,
            score: d.score,
            maxScore: 100,
          }))}
          animated
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-400" />
          老司机修行之路
        </h3>
        <div className="space-y-4">
          {['纯洁小白', '入门见习', '理论王者', '实践出真知', '秋名山车神', '人形打桩机'].map((level, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl ${
                sexualScore >= i * 20 ? 'bg-pink-500/15 border border-pink-500/30' : 'bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {sexualScore >= i * 20 ? (
                  <Star className="w-5 h-5 text-pink-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                )}
                <span className={sexualScore >= i * 20 ? 'text-white font-medium' : 'text-white/50'}>
                  {level}
                </span>
              </div>
              <span className="text-white/30 text-sm">Lv.{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
