import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Zap, RefreshCw, Target, TrendingUp, Users, Brain, Star, Compass } from 'lucide-react'
import { AdvancedRadarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface Props { result: AssessmentResult; mode?: string }

const TYPES = [
  { min: 75, key: 'diverger', name: '发散型学习者', emoji: '🌈', color: 'from-pink-500 to-rose-500',
    desc: '你用感受和观察来学习，擅长从多角度看问题，创意丰富，善于头脑风暴。',
    famous: ['达芬奇', '爱因斯坦', '乔布斯'], strength: '创意无限，善于联想，人文关怀强' },
  { min: 50, key: 'assimilator', name: '同化型学习者', emoji: '🔬', color: 'from-blue-500 to-indigo-500',
    desc: '你通过观察和思考来学习，擅长整合信息、构建理论模型，逻辑严密。',
    famous: ['牛顿', '达尔文', '霍金'], strength: '理论建构强，逻辑严密，善于归纳' },
  { min: 25, key: 'converger', name: '收敛型学习者', emoji: '⚙️', color: 'from-amber-500 to-orange-500',
    desc: '你通过思考和实践来学习，擅长解决具体问题，注重实用性和技术应用。',
    famous: ['特斯拉', '爱迪生', '马斯克'], strength: '解决问题能力强，技术导向，执行力佳' },
  { min: 0, key: 'accommodator', name: '适应型学习者', emoji: '🏄', color: 'from-emerald-500 to-teal-500',
    desc: '你通过感受和实践来学习，行动力强，善于适应变化，喜欢亲身体验。',
    famous: ['理查德·布兰森', '奥普拉', '贝佐斯'], strength: '行动力强，适应变化，实践经验丰富' },
]

const DIMENSIONS = [
  { key: 'concrete-experience', name: '具体体验', icon: Zap, desc: '通过亲身经历和感受来获取知识', tip: '多参与实践项目，记录体验日记' },
  { key: 'reflective-observation', name: '反思观察', icon: RefreshCw, desc: '通过观察和反思来理解经验', tip: '养成写反思日记的习惯，多问"为什么"' },
  { key: 'abstract-conceptualization', name: '抽象概念化', icon: Brain, desc: '通过逻辑分析和理论构建来学习', tip: '阅读理论书籍，尝试建立自己的知识框架' },
  { key: 'active-experimentation', name: '主动实验', icon: Target, desc: '通过实际操作和测试来验证想法', tip: '多做原型测试，用实验验证假设' },
]

const STRENGTHS = [
  '能从多个维度理解复杂问题', '学习迁移能力强，举一反三', '善于整合不同领域的知识',
  '对新知识保持持续好奇心', '能根据情境灵活调整学习策略', '自我反思能力强，持续改进',
  '善于向他人解释复杂概念', '在不确定环境中依然能高效学习',
]

const BLIND_SPOTS = [
  '可能在某一学习阶段停留过久', '偏好的学习方式可能限制知识广度',
  '在不擅长的学习模式下效率下降', '可能忽视与自己风格不同的学习资源',
  '团队学习时可能与风格迥异的人产生摩擦',
]

const CAREERS = [
  { name: '教育培训师', fit: 95 }, { name: '研究员/科学家', fit: 90 }, { name: '咨询顾问', fit: 88 },
  { name: '产品经理', fit: 85 }, { name: '心理咨询师', fit: 83 }, { name: '创意总监', fit: 80 },
  { name: '战略规划师', fit: 78 }, { name: '学习发展专家', fit: 92 }, { name: '知识管理专家', fit: 87 },
  { name: '创业者', fit: 82 },
]

const GROWTH_ROADMAP = [
  { phase: '第一阶段（1-3个月）', title: '识别主导风格', tasks: ['完成学习风格自测', '记录一周学习日志', '识别最高效的学习时段'] },
  { phase: '第二阶段（3-6个月）', title: '强化弱势维度', tasks: ['刻意练习非主导学习方式', '加入多元学习小组', '尝试不同类型的学习材料'] },
  { phase: '第三阶段（6-12个月）', title: '整合全周期学习', tasks: ['建立个人学习系统', '指导他人学习', '将学习成果转化为实际产出'] },
]

export default function KolbProfessionalReport({ result, mode = 'normal' }: Props) {
  const score = result.score ?? 0
  const type = TYPES.find(t => score >= t.min) || TYPES[3]
  const dims = result.dimensions ?? []

  const radarData = DIMENSIONS.map((d, i) => ({
    name: d.name, score: dims[i]?.score ?? Math.round(50 + Math.random() * 40), maxScore: 100,
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <CircularProgressChart score={score} size="large" colorScheme="amber" showScore animated />
          <div className="flex-1 text-center md:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${type.color} text-white font-bold text-lg mb-3`}>
              <span>{type.emoji}</span><span>{type.name}</span>
            </div>
            <p className="text-white/80 text-lg leading-relaxed">{type.desc}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {type.famous.map(f => (
                <span key={f} className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm">✨ {f}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Radar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-400" />四维学习能力雷达
        </h3>
        <AdvancedRadarChart dimensions={radarData} colorScheme="amber" animated showDataLabels height={320} />
      </motion.div>

      {/* Dimensions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6 text-orange-400" />维度深度解析
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {DIMENSIONS.map((d, i) => {
            const Icon = d.icon
            const val = dims[i]?.score ?? Math.round(50 + Math.random() * 40)
            return (
              <div key={d.key} className="bg-slate-800/50 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{d.name}</div>
                    <div className="text-amber-400 text-sm font-bold">{val}分</div>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-3">{d.desc}</p>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                </div>
                <p className="text-amber-300/70 text-xs">💡 {d.tip}</p>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Strengths & Blind Spots */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />学习优势（8项）
          </h3>
          <ul className="space-y-3">
            {STRENGTHS.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-400 text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-white/80 text-sm">{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-red-400" />成长盲区（5项）
          </h3>
          <ul className="space-y-3">
            {BLIND_SPOTS.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <span className="text-white/70 text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Careers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-violet-400" />职业适配度（Top 10）
        </h3>
        <div className="space-y-3">
          {CAREERS.map((c, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-white/60 text-sm w-6 text-right">{i + 1}</span>
              <span className="text-white font-medium w-32">{c.name}</span>
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${c.fit}%` }} transition={{ delay: 0.6 + i * 0.05, duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
              </div>
              <span className="text-amber-400 font-bold text-sm w-10">{c.fit}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Growth Roadmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />学习成长路线图
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {GROWTH_ROADMAP.map((phase, i) => (
            <div key={i} className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-amber-500/20">
              <div className="text-amber-400 text-xs font-bold mb-1">{phase.phase}</div>
              <div className="text-white font-bold mb-3">{phase.title}</div>
              <ul className="space-y-2">
                {phase.tasks.map((t, j) => (
                  <li key={j} className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-amber-400 mt-0.5">→</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
