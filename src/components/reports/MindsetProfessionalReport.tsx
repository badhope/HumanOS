import { motion } from 'framer-motion'
import { Brain, TrendingUp, Target, Zap, Lightbulb, Star, Award, Rocket, ArrowUp, Heart } from 'lucide-react'
import { AdvancedRadarChart, CircularProgressChart, AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface Props { result: AssessmentResult; mode?: string }

const MINDSET_TYPES = [
  { min: 75, key: 'growth', name: '纯粹成长型思维', emoji: '🚀', color: 'from-green-500 to-emerald-500',
    desc: '你坚信能力是可以发展的，热爱挑战，视失败为成长的机会。',
    famous: ['爱因斯坦', '爱迪生', '乔丹'], strength: '持续突破自我极限，永不满足' },
  { min: 50, key: 'developing', name: '成长精进者', emoji: '🌱', color: 'from-blue-500 to-cyan-500',
    desc: '你正在从固定型向成长型转变，有意识地拓展自己的舒适区。',
    famous: ['马斯克', '村上春树'], strength: '有觉知地成长，方法论驱动' },
  { min: 25, key: 'balanced', name: '务实平衡者', emoji: '⚖️', color: 'from-amber-500 to-orange-500',
    desc: '你在某些领域展现成长型，在某些领域保持稳定，懂得顺势而为。',
    famous: ['查理·芒格', '巴菲特'], strength: '审时度势，把握成长与精进的节奏' },
  { min: 0, key: 'aware', name: '觉醒领悟者', emoji: '💡', color: 'from-violet-500 to-purple-500',
    desc: '你正在觉察自己的思维模式，这是改变的最重要起点。',
    famous: ['苏格拉底', '王阳明'], strength: '自我觉察是所有改变的开端' },
]

const MINDSET_DIMENSIONS = [
  { key: 'challenge-seeking', name: '挑战寻求', icon: Rocket, desc: '主动走出舒适区', tip: '每周尝试一件新事物' },
  { key: 'effort-belief', name: '努力信念', icon: Zap, desc: '相信努力的价值', tip: '记录努力带来的每一点进步' },
  { key: 'failure-resilience', name: '挫折韧性', icon: TrendingUp, desc: '从失败中学习', tip: '写失败反思日记，提取价值' },
  { key: 'feedback-openness', name: '反馈开放', icon: Brain, desc: '接纳建设性批评', tip: '主动寻求反馈，真诚感谢' },
  { key: 'success-inspiration', name: '成功启发', icon: Star, desc: '从他人成功获得灵感', tip: '为他人的成功真诚庆祝' },
  { key: 'learning-orientation', name: '学习导向', icon: Lightbulb, desc: '重过程胜过结果', tip: '关注学到了什么，而非仅仅证明什么' },
]

const GROWTH_EXERCISES = [
  { name: '脑神经可塑性', evidence: 95 }, { name: '刻意练习理论', evidence: 90 },
  { name: '情境化学习', evidence: 88 }, { name: '社会学习理论', evidence: 85 },
  { name: '正念认知疗法', evidence: 92 }, { name: '自我决定理论', evidence: 87 },
]

const GROWTH_STRATEGIES = [
  { strategy: '用"尚未"代替"不能"', impact: '重塑语言模式，打开可能性空间' },
  { strategy: '将批评视为信息', impact: '分离自我与行为，客观看待反馈' },
  { strategy: '庆祝过程而非天赋', impact: '强化努力的价值，建立健康自尊' },
  { strategy: '设定学习型目标', impact: '从证明自己转向提升自己' },
  { strategy: '与过去的自己比较', impact: '建立内在评价标准，减少焦虑' },
]

export default function MindsetProfessionalReport({ result, mode = 'normal' }: Props) {
  const score = result.score ?? 0
  const type = MINDSET_TYPES.find(t => score >= t.min) || MINDSET_TYPES[3]
  const dims = result.dimensions ?? []

  const radarData = MINDSET_DIMENSIONS.map((d, i) => ({
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
            <p className="text-white/80 text-lg leading-relaxed mb-2">{type.desc}</p>
            <p className="text-emerald-300 text-sm">✨ {type.strength}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {type.famous.map(f => (
                <span key={f} className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm">🌟 {f}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-emerald-400" />六维思维模式雷达
        </h3>
        <AdvancedRadarChart dimensions={radarData} colorScheme="green" animated showDataLabels height={360} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-emerald-400" />思维维度深度解析
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MINDSET_DIMENSIONS.map((d, i) => {
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
                  <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
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
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-400" />成长型思维科学循证
        </h3>
        <AdvancedBarChart dimensions={GROWTH_EXERCISES.map(e => ({ name: e.name, score: e.evidence }))} colorScheme="gradient" animated height={280} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <ArrowUp className="w-6 h-6 text-amber-400" />思维转化策略
        </h3>
        <div className="space-y-3">
          {GROWTH_STRATEGIES.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-xl border border-emerald-500/20">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400 font-bold">{i + 1}</span>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold mb-1">{item.strategy}</h4>
                <p className="text-white/70 text-sm">{item.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-400" />德韦克教授寄语
        </h3>
        <div className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-2xl p-6 border border-rose-500/20 italic">
          <p className="text-white/80 text-lg leading-relaxed mb-4">
            "为什么不要说'你很聪明'，而要说'你很努力'？因为赞美天赋会培养固定型思维——
            孩子会想'如果我做的事情不简单，就说明我不聪明'。而赞美过程，
            则培养了成长型思维——孩子知道能力是通过努力建构出来的。"
          </p>
          <p className="text-rose-300 text-right font-semibold">—— 卡罗尔·德韦克 《终身成长》</p>
        </div>
      </motion.div>
    </div>
  )
}
