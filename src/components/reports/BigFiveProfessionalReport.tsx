import { memo } from 'react'
import { motion } from 'framer-motion'
import { Brain, Users, Shield, Zap, Award, AlertTriangle, TrendingUp, Compass, Heart, Target } from 'lucide-react'
import { ComprehensiveChartSystem } from '../charts'
import type { AssessmentResult } from '../../types'

interface BigFiveReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const BIG_FIVE_DIMENSIONS = {
  O: { name: '开放性', icon: Brain, color: 'from-violet-500 to-purple-500', description: '对新体验、想象力和创意的接受程度' },
  C: { name: '尽责性', icon: Shield, color: 'from-blue-500 to-cyan-500', description: '组织性、自律性和可靠性程度' },
  E: { name: '外向性', icon: Users, color: 'from-amber-500 to-orange-500', description: '社交活跃度和能量来源方向' },
  A: { name: '宜人性', icon: Heart, color: 'from-pink-500 to-rose-500', description: '合作性和人际和谐倾向' },
  N: { name: '神经质', icon: Zap, color: 'from-red-500 to-orange-500', description: '情绪稳定性和焦虑倾向' },
}

const BIG_FIVE_FACETS = {
  O: ['想象力', '审美敏感度', '情感丰富度', '行动多样性', '求知欲', '价值观包容性'],
  C: ['胜任感', '条理性', '责任心', '追求成就', '自律性', '审慎思考'],
  E: ['乐群性', '社交自信', '活力', '寻求刺激', '积极情绪', '热情'],
  A: ['信任', '坦诚', '利他', '顺从', '谦虚', '同理心'],
  N: ['焦虑', '愤怒敌意', '抑郁', '自我意识', '冲动性', '脆弱敏感'],
}

const getBigFiveInterpretation = (dimension: string, score: number) => {
  if (score >= 85) return { level: '非常高', description: '在人群中处于前15%，此特质表现极为突出' }
  if (score >= 70) return { level: '较高', description: '显著高于平均水平，此特质表现明显' }
  if (score >= 55) return { level: '中等偏上', description: '略高于人群平均水平' }
  if (score >= 45) return { level: '中等', description: '处于人群平均水平，平衡发展' }
  if (score >= 30) return { level: '中等偏下', description: '略低于人群平均水平' }
  if (score >= 15) return { level: '较低', description: '显著低于平均水平' }
  return { level: '非常低', description: '在人群中处于后15%，表现出相反特质' }
}

const BigFiveProfessionalReport = memo(function BigFiveProfessionalReport({ result, mode = 'normal' }: BigFiveReportProps) {
  const dimensions = result.dimensions || []

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <Compass className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-2"
              >
                <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  {mode === 'professional' ? '专业版·120题' : mode === 'advanced' ? '高级版·60题' : '标准版·30题'}
                </span>
                <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  心理学黄金标准
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-white mb-2"
              >
                大五人格 · 科学画像
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-lg"
              >
                OCEAN 五因素模型 · 心理学界最具效度的人格测评工具
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3 mt-4"
              >
                {Object.entries(BIG_FIVE_DIMENSIONS).map(([key, val]) => (
                  <span key={key} className="px-3 py-1 bg-white/15 rounded-full text-white/90 text-sm font-medium">
                    {key} - {val.name}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ComprehensiveChartSystem
          dimensions={dimensions.map(d => ({
            name: BIG_FIVE_DIMENSIONS[d.name as keyof typeof BIG_FIVE_DIMENSIONS]?.name || d.name,
            score: d.score,
            maxScore: 100,
            description: BIG_FIVE_DIMENSIONS[d.name as keyof typeof BIG_FIVE_DIMENSIONS]?.description || d.description,
          }))}
          overallScore={result.score || 0}
          assessmentType="bigfive"
          title="OCEAN 五维度全景画像"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-violet-400" />
          五维度深度解析
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dimensions.map((dim, index) => {
            const dimInfo = BIG_FIVE_DIMENSIONS[dim.name as keyof typeof BIG_FIVE_DIMENSIONS]
            const interpretation = getBigFiveInterpretation(dim.name, dim.score)
            const Icon = dimInfo?.icon || Brain
            return (
              <motion.div
                key={dim.name}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.35 + index * 0.1 }}
                className={`bg-gradient-to-br ${dimInfo?.color || 'from-slate-500 to-gray-500'}/15 rounded-xl p-6 border border-white/10`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{dimInfo?.name || dim.name}</div>
                    <div className="text-white/60 text-sm">{dim.name} 维度</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/70 text-sm">得分</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{dim.score}</span>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      dim.score >= 70 ? 'bg-green-500/20 text-green-300' :
                      dim.score >= 50 ? 'bg-blue-500/20 text-blue-300' :
                      'bg-amber-500/20 text-amber-300'
                    }`}>
                      {interpretation.level}
                    </span>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-3">{dimInfo?.description}</p>
                <p className="text-white/80 text-sm leading-relaxed">{interpretation.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {mode === 'professional' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8 border border-amber-500/30"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-amber-400" />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              专业版专属 · 30子层面精细解析
            </span>
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(BIG_FIVE_FACETS).map(([dimKey, facets], dimIndex) => {
              const dimInfo = BIG_FIVE_DIMENSIONS[dimKey as keyof typeof BIG_FIVE_DIMENSIONS]
              return (
                <div key={dimKey} className="space-y-2">
                  <div className="text-white font-semibold text-center mb-3">
                    {dimInfo?.name} 子层面
                  </div>
                  {facets.map((facet, fIndex) => (
                    <motion.div
                      key={facet}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + dimIndex * 0.05 + fIndex * 0.03 }}
                      className="text-center py-2 px-3 rounded-lg bg-white/5 text-white/70 text-sm"
                    >
                      {facet}
                    </motion.div>
                  ))}
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-green-400" />
            性格特质优势
          </h3>
          <ul className="space-y-4">
            {result.strengths?.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 mt-2 flex-shrink-0" />
                <span className="text-white/80 leading-relaxed">{strength}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            发展注意事项
          </h3>
          <ul className="space-y-4">
            {result.weaknesses?.map((weakness, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 mt-2 flex-shrink-0" />
                <span className="text-white/80 leading-relaxed">{weakness}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          工作与职业启示
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {result.careers?.map((career, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + index * 0.1 }}
              className="bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-xl p-5 border border-blue-500/20"
            >
              <p className="text-white/80 leading-relaxed">{career}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          个性化成长路径
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {result.suggestions?.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75 + index * 0.08 }}
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
})

export default BigFiveProfessionalReport
