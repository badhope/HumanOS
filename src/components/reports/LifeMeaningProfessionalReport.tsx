import { motion } from 'framer-motion'
import { Infinity, Heart, Brain, Users, Sparkles, Award, Compass, Target, Zap, Sun } from 'lucide-react'
import { AdvancedRadarChart, AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand, selectByScore } from './utils'

interface LifeMeaningReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const MEANING_SOURCES = [
  { id: 'selfrealization', name: '自我实现', icon: Brain, desc: '成为你想成为的那个人', color: 'from-violet-500 to-purple-600' },
  { id: 'connection', name: '深度连接', icon: Heart, desc: '人与人之间的真实羁绊', color: 'from-pink-500 to-rose-600' },
  { id: 'contribution', name: '奉献创造', icon: Users, desc: '留下一些什么，改变世界', color: 'from-emerald-500 to-teal-600' },
  { id: 'transcendence', name: '超越体验', icon: Infinity, desc: '与更宏大的存在合一', color: 'from-blue-500 to-cyan-600' },
  { id: 'experience', name: '体验当下', icon: Sun, desc: '每一个瞬间本身就是意义', color: 'from-amber-500 to-orange-600' },
  { id: 'power', name: '力量意志', icon: Zap, desc: '变得更强，看得更远', color: 'from-red-500 to-orange-600' },
]

const NIHILISM_LEVELS = [
  { min: 80, title: '酒神式 nihilist', desc: '看透荒谬后依然起舞', vibe: '🕺 虚无并狂欢着' },
  { min: 60, title: '西西弗斯式', desc: '向山顶推动石头本身就是意义', vibe: '🪨 清醒且坚韧' },
  { min: 40, title: '寻觅者', desc: '在怀疑中寻找，在迷茫中前行', vibe: '🔍 在路上' },
  { min: 20, title: '信念者', desc: '相信某些东西，并为之奋斗', vibe: '✨ 眼里有光' },
  { min: 0, title: '天真者', desc: '意义问题本身就不是问题', vibe: '😄 活在当下' },
]

const MEANING_DIMENSIONS = [
  { name: '个体超越' },
  { name: '人际连接' },
  { name: '创造奉献' },
  { name: '精神成长' },
  { name: '快乐体验' },
]

export default function LifeMeaningProfessionalReport({ result, mode = 'normal' }: LifeMeaningReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['selfrealization', 'connection', 'contribution', 'transcendence', 'experience'])
  const nihilismScore = dimensions.reduce((s, d) => 100 - d.score, 0) / dimensions.length
  const primarySource = selectByScore(dimensions, MEANING_SOURCES)
  const nihilismLevel = NIHILISM_LEVELS.find(l => nihilismScore >= l.min) || NIHILISM_LEVELS[NIHILISM_LEVELS.length - 1]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${primarySource.color} opacity-90`} />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Infinity className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">人生意义测评 · 专业报告</span>
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
              <primarySource.icon className="w-12 h-12 text-white" />
              <h1 className="text-5xl font-black text-white">
                {primarySource.name}
              </h1>
            </div>
            <p className="text-white/70 text-xl mb-2">{nihilismLevel.vibe}</p>
            <p className="text-white/80 text-lg max-w-xl mb-2">{primarySource.desc}</p>
            <p className="text-white/70 italic">{nihilismLevel.title} · {nihilismLevel.desc}</p>
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
          <Compass className="w-6 h-6 text-violet-400" />
          意义来源五维雷达
        </h3>
        <AdvancedRadarChart
          dimensions={dimensions.map((d, i) => ({
            name: MEANING_SOURCES[i]?.name || d.name,
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
          <Sparkles className="w-6 h-6 text-amber-400" />
          六重意义深度解析
        </h3>
        <AdvancedBarChart
          dimensions={MEANING_SOURCES.map((source, i) => ({
            name: source.name,
            score: dimensions[i % dimensions.length]?.score || 50,
            maxScore: 100,
          }))}
          colorScheme="gradient"
          animated
        />
      </motion.div>
    </div>
  )
}
