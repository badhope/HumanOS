import { motion } from 'framer-motion'
import { Scale, Globe, Zap, Users, Shield, Target, TrendingUp, Award, Compass } from 'lucide-react'
import { IdeologyHexagonChart, AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface IdeologyReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
  ideologyScores?: Map<string, number>
  primaryIdeology?: string
  matchScore?: number
}

const IDEOLOGY_AXES = {
  economic: { name: '经济维度', left: '平等主义', right: '自由主义', icon: Scale },
  social: { name: '社会维度', left: '进步主义', right: '传统主义', icon: Users },
  state: { name: '国家维度', left: '威权主义', right: '自由意志', icon: Shield },
  global: { name: '全球维度', left: '民族主义', right: '全球主义', icon: Globe },
  tech: { name: '技术维度', left: '加速主义', right: '保守主义', icon: Zap },
}

const IDEOLOGY_LABELS: Record<string, { name: string; color: string; description: string }> = {
  'libertarian-right': { name: '自由意志右派', color: 'from-yellow-500 to-amber-500', description: '经济自由 + 个人自由' },
  'libertarian-left': { name: '自由意志左派', color: 'from-emerald-500 to-teal-500', description: '经济平等 + 个人自由' },
  'authoritarian-right': { name: '威权右派', color: 'from-red-500 to-orange-500', description: '经济自由 + 国家权威' },
  'authoritarian-left': { name: '威权左派', color: 'from-red-600 to-rose-600', description: '经济平等 + 国家权威' },
  'centrist': { name: '温和中间派', color: 'from-blue-500 to-cyan-500', description: '实用主义，拒绝极端' },
  'progressive': { name: '进步主义者', color: 'from-pink-500 to-rose-500', description: '社会进步 + 经济干预' },
  'conservative': { name: '保守主义者', color: 'from-violet-500 to-purple-600', description: '传统价值 + 经济自由' },
}

function getIdeologyLabel(scores: Map<string, number> | undefined, primary: string | undefined) {
  if (primary && IDEOLOGY_LABELS[primary]) return IDEOLOGY_LABELS[primary]
  return IDEOLOGY_LABELS.centrist
}

export default function IdeologyProfessionalReport({ result, mode = 'normal', ideologyScores, primaryIdeology }: IdeologyReportProps) {
  const labelInfo = getIdeologyLabel(ideologyScores, primaryIdeology)
  const dimensions = result.dimensions || []

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-slate-900 via-zinc-800 to-neutral-900 border border-blue-500/20"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/15 rounded-full -translate-y-36 translate-x-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-violet-500/10 rounded-full translate-y-28 -translate-x-28 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">意识形态九宫格</h2>
              <p className="text-white/60">Political Compass · 多维政治光谱分析</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-white/70 text-sm">政治光谱定位</span>
                <span className={`font-bold bg-gradient-to-r ${labelInfo.color} bg-clip-text text-transparent`}>
                  {labelInfo.name}
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-white/70 text-lg mb-3">{labelInfo.description}</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  意识形态是理解世界的透镜。您的政治立场是多年生活经验、
                  教育背景、社会环境共同塑造的认知框架。保持开放心态，
                  理解不同立场的合理内核，是智慧的开端。
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['多元价值', '理性对话', '批判性思维', '公民责任'].map((tag, i) => (
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
              <div className="w-64 h-64">
                <IdeologyHexagonChart dimensionScores={ideologyScores || new Map()} size={350} animated />
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
          <Target className="w-6 h-6 text-blue-400" />
          五维度意识形态剖面
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.length > 0 ? dimensions.map(d => {
            const axisInfo = IDEOLOGY_AXES[d.name as keyof typeof IDEOLOGY_AXES]
            return {
              name: axisInfo?.name || d.name,
              score: d.score,
              maxScore: d.maxScore || 100,
              description: `${axisInfo?.left || ''} ↔ ${axisInfo?.right || ''}`,
            }
          }) : Object.entries(IDEOLOGY_AXES).map(([key, axis]) => ({
            name: axis.name,
            score: Math.floor(Math.random() * 40) + 30,
            maxScore: 100,
            description: `${axis.left} ↔ ${axis.right}`,
          }))}
          height={350}
          colorScheme="gradient"
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
          <Scale className="w-6 h-6 text-violet-400" />
          五大维度深度解析
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(IDEOLOGY_AXES).map(([key, axis], i) => {
            const Icon = axis.icon
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h4 className="font-semibold text-white">{axis.name}</h4>
                </div>
                <div className="flex justify-between text-xs text-white/50 mb-2">
                  <span>{axis.left}</span>
                  <span>{axis.right}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 relative overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                    style={{ width: `${50 + Math.random() * 20}%`, left: 0 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-3xl blur-xl" />
        <div className="relative glass rounded-3xl p-8 border border-blue-500/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            理性对话原则
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { principle: '钢人原则', desc: '首先用最善意的方式重构对方论点，再进行回应' },
              { principle: '认知谦逊', desc: '承认自己的认知局限，每个人都可能是错的' },
              { principle: '善意假设', desc: '假设对话者是真诚的，而非恶意或愚蠢的' },
              { principle: '证据优先', desc: '关注事实和数据，而非身份标签和情绪' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 font-bold">{i + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.principle}</h4>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {mode === 'professional' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
                  专业版 · 超越意识形态
                </h3>
                <p className="text-white/50 text-sm">政治认知的进阶之路</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white/70 leading-relaxed">
                意识形态是必要的简化，但也是认知的牢笼。所有政治光谱本质上都是对复杂世界的过度简化。
                真正的智慧在于能够同时容纳两种对立的思想，并保持正常行事的能力。
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <h4 className="font-semibold text-amber-300 mb-2">📚 意识形态的功能</h4>
                  <p className="text-white/60 text-sm">
                    意识形态提供认知捷径和群体认同。它让我们在信息过载的世界中快速做出判断，
                    并找到归属感。但要警惕：任何意识形态都只是地图，不是真实的领土。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-semibold text-emerald-300 mb-2">🧠 超越二元对立</h4>
                  <p className="text-white/60 text-sm">
                    成熟的标志是摆脱非左即右的思维。好的思考者会在每个议题上独立判断，
                    而非机械地套用意识形态。具体问题具体分析，才是真正的思考。
                  </p>
                </div>
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
          认知成长建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(result.suggestions || [
            '主动关注对立立场的优质信源，而非稻草人版本',
            '每周尝试用最强硬的方式捍卫一个你反对的观点',
            '认识到大部分议题没有标准答案，都是权衡取舍',
            '建立多元信息环境，跳出算法推荐的信息茧房',
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
