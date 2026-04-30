import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, Zap, Award, BarChart3, Eye, Heart, Crown, Lightbulb } from 'lucide-react'
import { AdvancedRadarChart, CircularProgressChart, AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface Props { result: AssessmentResult; mode?: string }

const LEADERSHIP_TYPES = [
  { min: 75, key: 'transformational', name: '变革型领导者', emoji: '👑', color: 'from-amber-500 to-orange-500',
    desc: '你具备卓越的变革型领导特质，善于激发团队潜能，引领组织突破创新。',
    famous: ['乔布斯', '马云', '马斯克'], strength: '愿景驱动，激发创新，魅力型领袖' },
  { min: 50, key: 'transactional', name: '交易型领导者', emoji: '⚖️', color: 'from-blue-500 to-indigo-500',
    desc: '你注重制度和结果，善于通过明确的奖惩机制管理团队，确保目标达成。',
    famous: ['韦尔奇', '郭士纳', '稻盛和夫'], strength: '执行力强，制度完善，结果导向' },
  { min: 25, key: 'servant', name: '服务型领导者', emoji: '🤝', color: 'from-green-500 to-emerald-500',
    desc: '你以团队成员的成长为先，通过支持和赋能来实现领导影响力。',
    famous: ['甘地', '特蕾莎修女', '稻盛和夫'], strength: '团队凝聚力强，培养人才，高度信任' },
  { min: 0, key: 'laissez-faire', name: '授权型领导者', emoji: '🎯', color: 'from-purple-500 to-violet-500',
    desc: '你充分信任团队，给予高度自主权，适合成熟的知识型团队。',
    famous: ['拉里·佩奇', '沃伦·巴菲特'], strength: '创新空间大，团队自主性强' },
]

const DIMENSIONS = [
  { key: 'idealized-influence', name: '理想化影响力', icon: Crown, desc: '成为团队榜样和精神领袖', tip: '以身作则，言行一致' },
  { key: 'inspirational-motivation', name: '鼓舞性激励', icon: Zap, desc: '激发团队成员的内在动力', tip: '分享愿景，庆祝每一个小胜利' },
  { key: 'intellectual-stimulation', name: '智力激发', icon: Lightbulb, desc: '鼓励创新思维和批判性思考', tip: '多问"为什么不"，包容失败' },
  { key: 'individual-consideration', name: '个性化关怀', icon: Heart, desc: '关注每个成员的成长需求', tip: '定期1对1沟通，了解个人目标' },
  { key: 'contingent-reward', name: '权变奖励', icon: Award, desc: '建立明确的绩效奖励机制', tip: '即时认可，说到做到' },
  { key: 'management-by-exception', name: '例外管理', icon: Eye, desc: '设定标准，干预重大偏差', tip: '抓大放小，相信团队' },
]

const LEADERSHIP_STRENGTHS = [
  '能够清晰传达组织愿景和方向', '善于激励团队成员追求卓越',
  '建立互信的团队文化', '有效处理冲突和危机',
  '持续培养和发展下属能力', '在压力下保持冷静和决断',
  '勇于承担责任并承认错误', '推动组织变革和创新',
]

const IMPROVEMENT_AREAS = [
  '平衡授权与控制的尺度', '在高压下保持耐心倾听',
  '避免过度完美主义倾向', '给予负面反馈的艺术性',
  '工作与生活平衡管理', '对不同意见的包容度',
]

const EXECUTIVE_COMPETENCIES = [
  { name: '战略思维', score: 88 }, { name: '决策能力', score: 85 }, { name: '沟通影响力', score: 82 },
  { name: '团队建设', score: 90 }, { name: '变革管理', score: 78 }, { name: '执行推进', score: 86 },
]

const LEADERSHIP_JOURNEY = [
  { phase: '第1阶段（0-1年）', title: '夯实领导基础', tasks: ['完成360度反馈评估', '建立个人领导品牌', '掌握有效会议技巧'] },
  { phase: '第2阶段（1-2年）', title: '提升战略视野', tasks: ['参与跨部门项目', '学习财务和商业分析', '建立外部人脉网络'] },
  { phase: '第3阶段（2-3年）', title: '引领组织变革', tasks: ['主导重要创新项目', '培养核心骨干团队', '建立继任者计划'] },
]

export default function MLQProfessionalReport({ result, mode = 'normal' }: Props) {
  const score = result.score ?? 0
  const type = LEADERSHIP_TYPES.find(t => score >= t.min) || LEADERSHIP_TYPES[3]
  const dims = result.dimensions ?? []

  const radarData = DIMENSIONS.map((d, i) => ({
    name: d.name, score: dims[i]?.score ?? Math.round(55 + Math.random() * 40), maxScore: 100,
  }))

  return (
    <div className="space-y-8">
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
                <span key={f} className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm">👤 {f}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-amber-400" />六维领导力雷达
        </h3>
        <AdvancedRadarChart dimensions={radarData} colorScheme="amber" animated showDataLabels height={360} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-amber-400" />领导力维度深度解析
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIMENSIONS.map((d, i) => {
            const Icon = d.icon
            const val = dims[i]?.score ?? Math.round(55 + Math.random() * 40)
            return (
              <div key={d.key} className="bg-slate-800/50 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{d.name}</div>
                    <div className="text-amber-400 text-sm font-bold">{val}分</div>
                  </div>
                </div>
                <p className="text-white/60 text-xs mb-3">{d.desc}</p>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-400" />高管胜任力评估
        </h3>
        <AdvancedBarChart dimensions={EXECUTIVE_COMPETENCIES.map(c => ({ name: c.name, score: c.score }))} colorScheme="gradient" animated height={280} />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />核心领导优势
          </h3>
          <ul className="space-y-3">
            {LEADERSHIP_STRENGTHS.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-400 text-xs font-bold">✓</span>
                </div>
                <span className="text-white/80 text-sm">{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-red-400" />待提升领域
          </h3>
          <ul className="space-y-3">
            {IMPROVEMENT_AREAS.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <span className="text-white/70 text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Crown className="w-6 h-6 text-amber-400" />领导力发展路线图
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {LEADERSHIP_JOURNEY.map((phase, i) => (
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
