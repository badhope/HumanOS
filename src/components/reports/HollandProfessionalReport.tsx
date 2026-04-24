import { motion } from 'framer-motion'
import { Briefcase, Code, Palette, Microscope, Users, Heart, Target, TrendingUp, Award, Compass } from 'lucide-react'
import { AdvancedRadarChart, AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface HollandReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const HOLLAND_TYPES = {
  R: {
    name: '实用型 · Realistic',
    icon: Briefcase,
    color: 'from-red-500 to-orange-500',
    description: '动手能力强，喜欢实际操作，偏爱具体事物',
    careers: ['工程师', '机械师', '建筑师', '技术员', '农林牧渔'],
    traits: ['务实', '沉稳', '动手', '坚持', '直率'],
  },
  I: {
    name: '研究型 · Investigative',
    icon: Microscope,
    color: 'from-blue-500 to-cyan-500',
    description: '好奇心强，喜欢分析探索，追求真理',
    careers: ['科学家', '研究员', '程序员', '医生', '数据分析'],
    traits: ['理性', '好奇', '分析', '独立', '精确'],
  },
  A: {
    name: '艺术型 · Artistic',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    description: '创造力强，追求美感，自我表达',
    careers: ['设计师', '作家', '艺术家', '音乐家', '导演'],
    traits: ['创意', '感性', '自由', '想象', '表达'],
  },
  S: {
    name: '社会型 · Social',
    icon: Users,
    color: 'from-emerald-500 to-teal-500',
    description: '乐于助人，善于人际交往，关心他人',
    careers: ['教师', '咨询师', '护士', '社工', '人力资源'],
    traits: ['友善', '耐心', '热情', '善解', '奉献'],
  },
  E: {
    name: '企业型 · Enterprising',
    icon: Target,
    color: 'from-amber-500 to-yellow-500',
    description: '有影响力，追求领导地位，冒险竞争',
    careers: ['企业家', '销售', '经理', '律师', '投资人'],
    traits: ['自信', '果断', '野心', '说服', '冒险'],
  },
  C: {
    name: '常规型 · Conventional',
    icon: Code,
    color: 'from-violet-500 to-purple-500',
    description: '有条理，喜欢规则秩序，精确细致',
    careers: ['会计', '银行', '行政', '编辑', '风控'],
    traits: ['细心', '严谨', '可靠', '有序', '精确'],
  },
}

const getDominantType = (dimensions: any[]) => {
  if (!dimensions || dimensions.length === 0) return 'S'
  const sorted = [...dimensions].sort((a, b) => b.score - a.score)
  return sorted[0]?.name?.charAt(0).toUpperCase() || 'S'
}

const getTopThree = (dimensions: any[]) => {
  if (!dimensions || dimensions.length === 0) return ['S', 'E', 'A']
  return [...dimensions]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(d => d.name.charAt(0).toUpperCase())
}

export default function HollandProfessionalReport({ result, mode = 'normal' }: HollandReportProps) {
  const dimensions = result.dimensions || []
  const dominantType = getDominantType(dimensions)
  const topThree = getTopThree(dimensions)
  const typeInfo = HOLLAND_TYPES[dominantType as keyof typeof HOLLAND_TYPES] || HOLLAND_TYPES.S

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 border border-emerald-500/30"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/20 rounded-full -translate-y-36 translate-x-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-500/15 rounded-full translate-y-28 -translate-x-28 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">霍兰德职业兴趣测评</h2>
              <p className="text-white/60">Holland SDS · 职业人格六边形模型</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-white/70 text-sm">职业人格代码</span>
                <span className="font-mono font-bold text-xl tracking-wider text-white">
                  {topThree.join('-')}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${typeInfo.color} bg-clip-text text-transparent`}>
                  {typeInfo.name}
                </h3>
                <p className="text-white/70 text-lg mb-3">{typeInfo.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {typeInfo.traits.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className={`w-36 h-36 rounded-3xl bg-gradient-to-br ${typeInfo.color} flex items-center justify-center shadow-2xl`}>
                  {(() => {
                    const Icon = typeInfo.icon
                    return <Icon className="w-16 h-16 text-white" />
                  })()}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                  <span className="text-white font-bold text-sm">主导类型</span>
                </div>
              </div>
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
          <Target className="w-6 h-6 text-emerald-400" />
          六边形职业人格模型
        </h3>
        <AdvancedRadarChart
          dimensions={dimensions.length > 0 ? dimensions.map(d => {
            const code = d.name.charAt(0).toUpperCase()
            const info = HOLLAND_TYPES[code as keyof typeof HOLLAND_TYPES]
            return {
              name: info?.name || d.name,
              score: d.score,
              maxScore: d.maxScore || 100,
              description: info?.description,
            }
          }) : Object.entries(HOLLAND_TYPES).map(([code, info]) => ({
            name: info.name,
            score: 70,
            maxScore: 100,
            description: info.description,
          }))}
          animated
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-400" />
          六维度详细得分
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.length > 0 ? dimensions.map(d => {
            const code = d.name.charAt(0).toUpperCase()
            const info = HOLLAND_TYPES[code as keyof typeof HOLLAND_TYPES]
            return {
              name: info?.name || d.name,
              score: d.score,
              maxScore: d.maxScore || 100,
              description: info?.description,
            }
          }) : Object.entries(HOLLAND_TYPES).map(([code, info]) => ({
            name: info.name,
            score: Math.floor(Math.random() * 30) + 50,
            maxScore: 100,
            description: info.description,
          }))}
          height={380}
          colorScheme="rainbow"
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
          <Briefcase className="w-6 h-6 text-blue-400" />
          推荐职业方向
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {topThree.map((code, i) => {
            const info = HOLLAND_TYPES[code as keyof typeof HOLLAND_TYPES] || HOLLAND_TYPES.S
            const Icon = info.icon
            return (
              <motion.div
                key={code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${info.color}/20 border border-white/10`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{info.name}</h4>
                    <span className="text-white/50 text-xs">Top {i + 1}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {info.careers.map((career, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 rounded-lg bg-white/10 text-white/70 text-xs"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            核心优势
          </h3>
          <div className="space-y-3">
            {[
              '职业兴趣与内在动机高度一致，更容易获得成就感',
              `${topThree.join('、')}的组合赋予您独特的职业竞争力`,
              '六边形模型经过60年全球验证，科学性极强',
              '可以作为职业转型、深造选择的重要参考',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="text-emerald-400 mt-0.5">✓</span>
                <p className="text-white/70 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-400" />
            发展建议
          </h3>
          <div className="space-y-3">
            {[
              '不要被单一标签限制，人是多维度的综合体',
              '建议通过实习、访谈深入了解真实工作内容',
              '兴趣随阶段发展，建议每2年重测一次',
              '平衡兴趣与现实，追求可持续的职业满足',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="text-pink-400 mt-0.5">💡</span>
                <p className="text-white/70 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {mode === 'professional' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl" />
          <div className="relative glass rounded-3xl p-8 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  专业版 · 职业适配度深度分析
                </h3>
                <p className="text-white/50 text-sm">基于您的人格代码 {topThree.join('-')} 的行业建议</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <h4 className="font-semibold text-emerald-300 mb-2">🌟 高度适配领域</h4>
                <p className="text-white/70 text-sm">
                  您的 {topThree.join('-')} 代码在以下领域具有天然优势：科技初创企业、教育科技、
                  创意产业、管理咨询、非营利组织。这些领域能够充分发挥您的兴趣组合，
                  获得更高的职业满意度和成就感。
                </p>
              </div>
              
              <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <h4 className="font-semibold text-blue-300 mb-2">🔄 跨领域发展机会</h4>
                <p className="text-white/70 text-sm">
                  现代职业越来越需要复合型人才。建议您探索 {topThree[0]} + {topThree[1]} 的
                  交叉领域，例如：技术 + 艺术 = 创意编程、社交 + 研究 = 用户研究、
                  企业 + 常规 = 财务管理。这往往是竞争较小但价值极高的蓝海。
                </p>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20">
                <h4 className="font-semibold text-violet-300 mb-2">⚖️ 满意度 vs 报酬的平衡</h4>
                <p className="text-white/70 text-sm">
                  职业幸福 = 兴趣匹配度 × 能力成长 × 经济回报。不要只追求单一维度最大化。
                  建议在职业生涯早期优先考虑兴趣和成长，中期再优化报酬曲线。
                  这是获得长期职业幸福感的黄金公式。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          职业发展行动建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(result.suggestions || [
            '找3位目标领域的从业者进行15分钟信息访谈',
            '利用周末做相关领域的志愿工作或兼职项目',
            '学习1-2门目标职业的核心技能在线课程',
            '更新简历突出与目标职业匹配的软硬技能',
          ]).map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + index * 0.08 }}
              className="flex items-start gap-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-5 border border-emerald-500/20"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 font-bold">{index + 1}</span>
              </div>
              <p className="text-white/80 leading-relaxed pt-1">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
