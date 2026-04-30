import { motion } from 'framer-motion'
import { Users, Target, Shield, Heart, Award, AlertTriangle, TrendingUp, Compass, Briefcase } from 'lucide-react'
import { ComprehensiveChartSystem, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface DISCReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const DISC_TYPES = {
  D: { 
    name: '支配型 · Dominance', 
    color: 'from-red-500 to-orange-500',
    icon: Target,
    description: '结果导向、果断行动、挑战权威、掌控全局',
    motto: '我要站在最前面',
    traits: ['果断', '竞争', '直接', '高效', '创新', '抗压']
  },
  I: { 
    name: '影响型 · Influence', 
    color: 'from-yellow-500 to-amber-500',
    icon: Users,
    description: '热情乐观、善于说服、社交达人、鼓舞人心',
    motto: '我要影响更多人',
    traits: ['热情', '乐观', '口才', '社交', '魅力', '创意']
  },
  S: { 
    name: '稳健型 · Steadiness', 
    color: 'from-green-500 to-emerald-500',
    icon: Shield,
    description: '耐心可靠、冷静沉着、团队合作、持久稳定',
    motto: '我要和谐与稳定',
    traits: ['耐心', '可靠', '谦逊', '忠诚', '友善', '专注']
  },
  C: { 
    name: '谨慎型 · Conscientiousness', 
    color: 'from-blue-500 to-cyan-500',
    icon: Compass,
    description: '注重品质、严谨细致、遵循规则、追求完美',
    motto: '我要做到最好',
    traits: ['严谨', '细致', '准确', '分析', '秩序', '专业']
  },
}

const DISC_WORK_STYLES = {
  D: '快速决策、独立工作、喜欢挑战、讨厌繁文缛节',
  I: '团队协作、头脑风暴、公开认可、自由发挥',
  S: '稳定环境、有序推进、支持他人、避免冲突',
  C: '精准流程、充足时间、质量优先、数据说话',
}

export default function DISCProfessionalReport({ result, mode = 'normal' }: DISCReportProps) {
  const dimensions = result.dimensions || []
  const primaryType = result.primaryType || 'D'
  const typeInfo = DISC_TYPES[primaryType as keyof typeof DISC_TYPES] || DISC_TYPES.D

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${typeInfo.color}`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              {(() => {
                const Icon = typeInfo.icon
                return <Icon className="w-12 h-12 text-white" />
              })()}
            </div>
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-2"
              >
                <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  {mode === 'professional' ? '专业行为测评' : mode === 'advanced' ? '深度分析' : '标准版'}
                </span>
                <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  DISC 行为模型
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-white mb-2"
              >
                {typeInfo.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-lg italic mb-3"
              >
                「{typeInfo.motto}」
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/80"
              >
                {typeInfo.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 mt-4"
              >
                {typeInfo.traits.map((trait, i) => (
                  <span key={i} className="px-3 py-1 bg-white/15 rounded-full text-white text-sm">
                    {trait}
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
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6 text-violet-400" />
          DISC 四维行为画像
        </h3>
        <ComprehensiveChartSystem
          dimensions={dimensions.map(d => ({
            name: DISC_TYPES[d.name as keyof typeof DISC_TYPES]?.name.split(' · ')[0] || d.name,
            score: d.score,
            maxScore: 100,
            description: d.description,
          }))}
          overallScore={result.score || 75}
          assessmentType="disc"
          title="DISC 行为风格画像"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {Object.entries(DISC_TYPES).map(([key, info], index) => {
          const Icon = info.icon
          const dimScore = dimensions.find(d => d.name === key)?.score || 0
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.1 }}
              className={`bg-gradient-to-br ${info.color}/15 rounded-xl p-6 border border-white/10`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CircularProgressChart
                  score={dimScore}
                  size="small"
                  colorScheme={key === 'D' ? 'red' : key === 'I' ? 'amber' : key === 'S' ? 'green' : 'blue'}
                  showPercentage
                />
              </div>
              <div className="text-white font-bold mb-2">{info.name.split(' · ')[0]}</div>
              <p className="text-white/60 text-sm">{DISC_WORK_STYLES[key as keyof typeof DISC_WORK_STYLES]}</p>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-green-400" />
            行为优势
          </h3>
          <ul className="space-y-4">
            {result.strengths?.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.1 }}
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
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            过度使用风险
          </h3>
          <ul className="space-y-4">
            {result.weaknesses?.map((weakness, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.1 }}
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
        transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-400" />
          职场协作指南
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-5 border border-blue-500/20">
            <div className="text-white font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              如何与您高效协作
            </div>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>• 直接沟通，开门见山，不要绕弯子</li>
              <li>• 关注结果和解决方案，而非问题本身</li>
              <li>• 给予足够的自主权和发挥空间</li>
              <li>• 公开认可成就，用挑战激励成长</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl p-5 border border-violet-500/20">
            <div className="text-white font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-violet-400" />
              您需要注意的沟通雷区
            </div>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>• 过度控制，不给他人发挥空间</li>
              <li>• 缺乏耐心，忽视他人情绪感受</li>
              <li>• 过于强势，听不进反对意见</li>
              <li>• 急于求成，忽略必要的流程</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          行为风格优化建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {result.suggestions?.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 + index * 0.08 }}
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
