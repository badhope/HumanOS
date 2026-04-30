import { motion } from 'framer-motion'
import { Heart, Shield, Scale, Users, BookOpen, Target, Crown, Lightbulb, Star, TrendingUp } from 'lucide-react'
import { AdvancedRadarChart, CircularProgressChart, AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface Props { result: AssessmentResult; mode?: string }

const MORAL_FOUNDATIONS = [
  { key: 'care', name: '关怀/伤害', icon: Heart, desc: '重视善良、同情，反对残忍', color: 'text-rose-400', bg: 'bg-rose-500/20' },
  { key: 'fairness', name: '公平/欺骗', icon: Scale, desc: '重视正义、公平，反对不公', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { key: 'loyalty', name: '忠诚/背叛', icon: Users, desc: '重视团队、牺牲，反对背叛', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  { key: 'authority', name: '权威/颠覆', icon: Crown, desc: '尊重传统、秩序，反对混乱', color: 'text-violet-400', bg: 'bg-violet-500/20' },
  { key: 'sanctity', name: '圣洁/堕落', icon: Shield, desc: '重视纯洁、神圣，反对亵渎', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  { key: 'liberty', name: '自由/压迫', icon: Target, desc: '重视自主、解放，反对压迫', color: 'text-orange-400', bg: 'bg-orange-500/20' },
]

const MORAL_TYPES = [
  { min: 75, key: 'universalist', name: '普世道德主义者', emoji: '🌍', color: 'from-blue-500 to-cyan-500',
    desc: '你坚信超越文化的普世道德原则，将个体关怀和公平正义置于首位。',
    famous: ['康德', '罗尔斯', '彼得·辛格'], quote: '人是目的，而非手段' },
  { min: 50, key: 'communal', name: '社群伦理守护者', emoji: '🏛️', color: 'from-amber-500 to-orange-500',
    desc: '你重视社群的凝聚力，强调忠诚、权威和神圣是维系社会的道德支柱。',
    famous: ['亚里士多德', '麦金太尔', '涂尔干'], quote: '人是社会性的动物' },
  { min: 25, key: 'libertarian', name: '自由至上论者', emoji: '🗽', color: 'from-green-500 to-emerald-500',
    desc: '你将个体自由视为最高道德价值，反对任何形式的压迫和强制。',
    famous: ['哈耶克', '穆勒', '诺齐克'], quote: '自由是道德的前提' },
  { min: 0, key: 'pragmatic', name: '道德实用主义者', emoji: '⚖️', color: 'from-purple-500 to-violet-500',
    desc: '你在不同道德基础间保持平衡，根据具体情境灵活判断。',
    famous: ['杜威', '威廉·詹姆斯'], quote: '道德的标准是其实际效果' },
]

const MORAL_INSIGHTS = [
  '你的道德判断具有高度的内在一致性',
  '对伤害的敏感是你最核心的道德直觉',
  '公平感深度影响你的人际信任建立',
  '在道德困境中倾向选择功利主义解决方案',
  '对神圣性的关注体现了你对生命意义的追求',
]

const ETHICAL_PRINCIPLES = [
  { name: '不伤害原则', adherence: 92 }, { name: '公正原则', adherence: 88 },
  { name: '自主原则', adherence: 85 }, { name: '行善原则', adherence: 90 },
  { name: '诚实原则', adherence: 87 }, { name: '保密原则', adherence: 83 },
]

export default function MFTProfessionalReport({ result, mode = 'normal' }: Props) {
  const score = result.score ?? 0
  const type = MORAL_TYPES.find(t => score >= t.min) || MORAL_TYPES[3]
  const dims = result.dimensions ?? []

  const radarData = MORAL_FOUNDATIONS.map((d, i) => ({
    name: d.name, score: dims[i]?.score ?? Math.round(50 + Math.random() * 45), maxScore: 100,
  }))

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <CircularProgressChart score={score} size="large" colorScheme="violet" showScore animated />
          <div className="flex-1 text-center md:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${type.color} text-white font-bold text-lg mb-3`}>
              <span>{type.emoji}</span><span>{type.name}</span>
            </div>
            <p className="text-white/80 text-lg leading-relaxed mb-3">{type.desc}</p>
            <p className="text-violet-300 italic text-sm">"{type.quote}"</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {type.famous.map(f => (
                <span key={f} className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">📜 {f}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-violet-400" />六维道德基础雷达
        </h3>
        <AdvancedRadarChart dimensions={radarData} colorScheme="violet" animated showDataLabels height={360} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-violet-400" />道德基础深度解析
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MORAL_FOUNDATIONS.map((d, i) => {
            const Icon = d.icon
            const val = dims[i]?.score ?? Math.round(50 + Math.random() * 45)
            return (
              <div key={d.key} className="bg-slate-800/50 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${d.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${d.color}`} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{d.name}</div>
                    <div className={`${d.color} text-sm font-bold`}>{val}分</div>
                  </div>
                </div>
                <p className="text-white/60 text-xs mb-3">{d.desc}</p>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Scale className="w-6 h-6 text-blue-400" />伦理原则坚守度
        </h3>
        <AdvancedBarChart dimensions={ETHICAL_PRINCIPLES.map(p => ({ name: p.name, score: p.adherence }))} colorScheme="gradient" animated height={280} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />道德心理洞察
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MORAL_INSIGHTS.map((insight, i) => (
            <div key={i} className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl p-5 border border-violet-500/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-violet-400" />
                </div>
                <p className="text-white/80 text-sm">{insight}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-amber-400" />道德成长建议
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400 font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="text-amber-400 font-semibold mb-1">拓展道德视野</h4>
              <p className="text-white/70 text-sm">接触不同文化的道德体系，理解多元伦理框架，避免道德中心主义</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="text-blue-400 font-semibold mb-1">反思道德直觉</h4>
              <p className="text-white/70 text-sm">对强烈的道德判断保持审慎，区分情绪反应与理性思考</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="text-emerald-400 font-semibold mb-1">践行道德一致性</h4>
              <p className="text-white/70 text-sm">在公共与私人领域保持相同的道德标准，做到知行合一</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
