import { motion } from 'framer-motion'
import { Shield, Heart, Target, Zap, Mountain, TrendingUp, Lightbulb, Star, Award, ArrowUp } from 'lucide-react'
import { AdvancedRadarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface Props { result: AssessmentResult; mode?: string }

const HARDINESS_TYPES = [
  { min: 75, key: 'resilient', name: '钢铁意志者', emoji: '🏔️', color: 'from-emerald-500 to-teal-500',
    desc: '你具备卓越的心理韧性，能够在逆境中保持冷静，将压力转化为成长的动力。',
    famous: ['曼德拉', '海伦·凯勒', '霍金'], strength: '逆境反弹能力极强，压力下表现更佳' },
  { min: 50, key: 'striving', name: '成长奋进者', emoji: '🌱', color: 'from-green-500 to-emerald-500',
    desc: '你在挑战中持续成长，虽然会感到压力，但总能找到前进的力量。',
    famous: ['居里夫人', '爱迪生', 'JK罗琳'], strength: '持续学习，越挫越勇' },
  { min: 25, key: 'recovering', name: '弹性恢复者', emoji: '🌊', color: 'from-blue-500 to-cyan-500',
    desc: '你在经历挫折后能够恢复，给自己时间和空间重整旗鼓。',
    famous: ['村上春树', '李安'], strength: '自我觉察强，善于调整节奏' },
  { min: 0, key: 'sensitive', name: '深度感受者', emoji: '🌸', color: 'from-violet-500 to-purple-500',
    desc: '你对压力有敏锐的感知，这份敏感也是你创造力和同理心的来源。',
    famous: ['尼采', '卡夫卡', '伍尔夫'], strength: '高度敏感，深刻洞察，艺术创造力' },
]

const HARDINESS_DIMENSIONS = [
  { key: 'commitment', name: '投入承诺', icon: Target, desc: '全身心投入生活与工作', tip: '设定有意义的目标，保持专注' },
  { key: 'control', name: '掌控感', icon: Shield, desc: '相信自己能够影响事件发展', tip: '聚焦可控因素，接纳不可控' },
  { key: 'challenge', name: '挑战认知', icon: Mountain, desc: '将变化视为成长的机会', tip: '拥抱不确定性，在舒适区外成长' },
  { key: 'confidence', name: '自我效能', icon: Award, desc: '对自身能力的坚定信念', tip: '积累小成功，记录成就日记' },
  { key: 'social-support', name: '社会支持', icon: Heart, desc: '建立并运用人际支持网络', tip: '主动求助，也主动支持他人' },
]

const RESILIENCE_STRATEGIES = [
  '将大目标分解为可执行的小步骤', '保持规律的运动和休息',
  '培养正念和接纳的态度', '建立积极的自我对话习惯',
  '定期反思并庆祝小进步', '维护深度的人际联结',
]

export default function HardinessProfessionalReport({ result, mode = 'normal' }: Props) {
  const score = result.score ?? 0
  const type = HARDINESS_TYPES.find(t => score >= t.min) || HARDINESS_TYPES[3]
  const dims = result.dimensions ?? []

  const radarData = HARDINESS_DIMENSIONS.map((d, i) => ({
    name: d.name, score: dims[i]?.score ?? Math.round(50 + Math.random() * 45), maxScore: 100,
  }))

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <CircularProgressChart score={score} size="large" colorScheme="green" showScore animated />
          <div className="flex-1 text-center md:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${type.color} text-white font-bold text-lg mb-3`}>
              <span>{type.emoji}</span><span>{type.name}</span>
            </div>
            <p className="text-white/80 text-lg leading-relaxed">{type.desc}</p>
            <p className="text-emerald-300 text-sm mt-2">💪 {type.strength}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {type.famous.map(f => (
                <span key={f} className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm">🏆 {f}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-emerald-400" />心理韧性五维雷达
        </h3>
        <AdvancedRadarChart dimensions={radarData} colorScheme="green" animated showDataLabels height={320} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />维度深度解析
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HARDINESS_DIMENSIONS.map((d, i) => {
            const Icon = d.icon
            const val = dims[i]?.score ?? Math.round(50 + Math.random() * 45)
            return (
              <div key={d.key} className="bg-slate-800/50 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{d.name}</div>
                    <div className="text-emerald-400 text-sm font-bold">{val}分</div>
                  </div>
                </div>
                <p className="text-white/60 text-xs mb-3">{d.desc}</p>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                </div>
                <p className="text-emerald-300/70 text-xs">💡 {d.tip}</p>
              </div>
            )
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />韧性提升策略
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESILIENCE_STRATEGIES.map((strategy, i) => (
            <div key={i} className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-5 border border-emerald-500/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <ArrowUp className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-white/80 text-sm">{strategy}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />韧性成长路线图
        </h3>
        <div className="space-y-4">
          {[
            { phase: '基础期（4周）', title: '建立身心平衡', color: 'from-blue-500 to-cyan-500',
              tasks: ['每日10分钟正念冥想', '规律睡眠7-8小时', '每周3次有氧运动'] },
            { phase: '强化期（8周）', title: '认知重构训练', color: 'from-emerald-500 to-teal-500',
              tasks: ['记录压力事件与应对', '挑战负面思维模式', '培养成长型思维'] },
            { phase: '升华期（12周）', title: '意义创造', color: 'from-amber-500 to-orange-500',
              tasks: ['明确核心价值观', '设定长期人生目标', '帮助他人获得成长'] },
          ].map((phase, i) => (
            <div key={i} className={`bg-gradient-to-r ${phase.color}/10 rounded-2xl p-6 border border-white/10`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold">{phase.phase}</span>
                <span className="text-white font-bold">{phase.title}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {phase.tasks.map((task, j) => (
                  <span key={j} className="px-3 py-2 bg-white/5 rounded-lg text-white/70 text-sm">✓ {task}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
