import { motion } from 'framer-motion'
import { Brain, Target, Award, TrendingUp, Users, Compass, Zap, Shield, Sun, CloudRain } from 'lucide-react'
import { AdvancedBarChart, AdvancedRadarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface ASIReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const ASI_DIMENSIONS = [
  { id: 'stability', name: '稳定性归因', icon: Target, desc: '认为挫折是暂时vs永久' },
  { id: 'globality', name: '整体性归因', icon: Compass, desc: '认为挫折是局部vs普遍' },
  { id: 'internality', name: '内外性归因', icon: Brain, desc: '归因为自己vs外部因素' },
  { id: 'personalization', name: '个人化程度', icon: Users, desc: '承担责任vs归咎他人' },
  { id: 'permanence', name: '影响持久性', icon: Zap, desc: '影响的持续时间' },
]

const ASI_LEVELS = [
  { min: 85, title: '超级乐观者', color: 'from-amber-500 to-yellow-500', desc: '塞利格曼认证：永不放弃的人', advice: '你的解释风格是抵御抑郁的最强铠甲' },
  { min: 70, title: '乐观归因者', color: 'from-emerald-500 to-teal-500', desc: '坏事是暂时的，好事是永久的', advice: '继续保持，你的逆商超越了80%的人' },
  { min: 55, title: '平衡现实主义者', color: 'from-blue-500 to-cyan-500', desc: '理性看待成败，不偏不倚', advice: '可以更积极地解释暂时的挫折' },
  { min: 40, title: '谨慎悲观者', color: 'from-violet-500 to-purple-500', desc: '偶尔会陷入负面归因循环', advice: '学习"具体化"——坏事只是特定情境的' },
  { min: 0, title: '习得性无助倾向', color: 'from-slate-500 to-slate-600', desc: '需要觉察解释风格对人生的影响', advice: 'ABCDE认知重构技术可以帮助你' },
]

const EXPLANATION_STYLES = [
  { type: 'PVS', name: '永久性VS暂时性', whenBad: '这永远都不会改变', whenGood: '这只是运气好', opposite: '困难是暂时的，我的能力是永久的' },
  { type: 'GVS', name: '普遍性VS特定性', whenBad: '我做什么都不行', whenGood: '这只是这个领域的成功', opposite: '这只是这个领域，我在其他方面很棒' },
  { type: 'IVS', name: '内化VS外化', whenBad: '都是我的错', whenGood: '还是环境帮了忙', opposite: '我为自己的成功负责，挫折有情境因素' },
]

export default function ASIProfessionalReport({ result, mode = 'normal' }: ASIReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['stability', 'globality', 'internality', 'personalization', 'permanence'])
  const asiScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = ASI_LEVELS.find(l => asiScore >= l.min) || ASI_LEVELS[ASI_LEVELS.length - 1]
  const optimismScore = Math.round(asiScore)
  const learnedHelplessnessRisk = 100 - optimismScore

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${levelInfo.color} opacity-90`} />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">ASI 归因风格量表 · 专业报告</span>
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
                <Sun className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">{levelInfo.title}</h1>
              </div>
              <p className="text-white/80 text-lg mb-2">{levelInfo.desc}</p>
              <p className="text-white/70">💡 {levelInfo.advice}</p>
            </div>
            <div className="text-center">
              <CircularProgressChart
                score={optimismScore}
                title="逆商AQ"
                size="large"
                colorScheme={optimismScore > 70 ? 'green' : optimismScore > 50 ? 'blue' : 'violet'}
                showScore
                animated
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-400" />
          归因风格五维分析
        </h3>
        <AdvancedRadarChart dimensions={dimensions} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-400" />
            乐观得分
          </h3>
          <div className="text-center">
            <div className="text-6xl font-black text-amber-400 mb-2">{optimismScore}</div>
            <p className="text-slate-400">超越了 {Math.round(optimismScore * 0.8)}% 的人群</p>
          </div>
        </div>
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CloudRain className="w-6 h-6 text-slate-400" />
            习得性无助风险
          </h3>
          <div className="text-center">
            <div className={`text-6xl font-black mb-2 ${learnedHelplessnessRisk > 50 ? 'text-red-400' : learnedHelplessnessRisk > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {learnedHelplessnessRisk}%
            </div>
            <p className="text-slate-400">
              {learnedHelplessnessRisk > 50 ? '建议关注认知模式' : learnedHelplessnessRisk > 30 ? '轻度风险' : '健康水平'}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-violet-400" />
          塞利格曼 ABCDE 认知重构法
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            { letter: 'A', term: 'Adversity', cn: '逆境', desc: '发生了什么事' },
            { letter: 'B', term: 'Belief', cn: '信念', desc: '我对这件事的想法' },
            { letter: 'C', term: 'Consequence', cn: '结果', desc: '这个想法带来的影响' },
            { letter: 'D', term: 'Disputation', cn: '反驳', desc: '找出证据反驳负面想法' },
            { letter: 'E', term: 'Energization', cn: '激发', desc: '新想法带来的能量' },
          ].map((step, i) => (
            <motion.div
              key={step.letter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
              className="text-center p-4 rounded-2xl bg-slate-700/30"
            >
              <div className="text-3xl font-black text-violet-400 mb-1">{step.letter}</div>
              <div className="font-bold text-white text-sm">{step.cn}</div>
              <div className="text-slate-400 text-xs mt-1">{step.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-emerald-400" />
          解释风格对照表
        </h3>
        <div className="space-y-4">
          {EXPLANATION_STYLES.map((style, i) => (
            <motion.div
              key={style.type}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.1 }}
              className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-700/30"
            >
              <div>
                <div className="font-bold text-white">{style.name}</div>
                <div className="text-slate-400 text-xs">{style.type}</div>
              </div>
              <div className="text-red-300 text-sm">❌ 悲观: {style.whenBad}</div>
              <div className="text-emerald-300 text-sm">✅ 乐观: {style.opposite}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
