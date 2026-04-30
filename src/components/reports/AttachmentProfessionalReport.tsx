import { motion } from 'framer-motion'
import { Heart, Users, Shield, Lock, AlertTriangle, Award, TrendingUp, Compass } from 'lucide-react'
import { ComprehensiveChartSystem, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface AttachmentReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const ATTACHMENT_STYLES = {
  secure: {
    name: '安全型依恋',
    color: 'from-emerald-500 to-teal-500',
    description: '信任自己也信任他人，能够健康地依赖和独立',
    traits: ['自信', '信任', '温暖', '一致', '开放', '平衡'],
    icon: Heart,
  },
  anxious: {
    name: '焦虑型依恋',
    color: 'from-rose-500 to-pink-500',
    description: '害怕被抛弃，需要持续确认对方的爱意和关注',
    traits: ['敏感', '黏人', '渴望亲密', '害怕孤独', '情绪化', '忠诚'],
    icon: Users,
  },
  avoidant: {
    name: '回避型依恋',
    color: 'from-blue-500 to-cyan-500',
    description: '害怕依赖，重视独立，习惯与他人保持情感距离',
    traits: ['独立', '理性', '自我依靠', '克制', '疏离', '坚韧'],
    icon: Shield,
  },
  fearful: {
    name: '恐惧型依恋',
    color: 'from-violet-500 to-purple-500',
    description: '既渴望亲密又害怕受伤，在靠近和疏远间摇摆',
    traits: ['矛盾', '敏感', '渴望爱', '怕受伤', '摇摆', '深情'],
    icon: Lock,
  },
}

export default function AttachmentProfessionalReport({ result, mode = 'normal' }: AttachmentReportProps) {
  const dimensions = result.dimensions || []
  const style = result.style || 'secure'
  const styleInfo = ATTACHMENT_STYLES[style as keyof typeof ATTACHMENT_STYLES] || ATTACHMENT_STYLES.secure

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${styleInfo.color}`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              {(() => {
                const Icon = styleInfo.icon
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
                  {mode === 'professional' ? '成人依恋专业版' : mode === 'advanced' ? '深度关系分析' : '亲密关系测评'}
                </span>
                <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  AAI 依恋理论
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-white mb-2"
              >
                {styleInfo.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-lg mb-4"
              >
                {styleInfo.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2"
              >
                {styleInfo.traits.map((trait, i) => (
                  <span key={i} className="px-3 py-1 bg-white/15 rounded-full text-white text-sm">
                    {trait}
                  </span>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <CircularProgressChart
                score={result.score || 75}
                size="large"
                colorScheme={style === 'secure' ? 'green' : style === 'anxious' ? 'red' : style === 'avoidant' ? 'blue' : 'violet'}
                showPercentage
                animated
              />
            </motion.div>
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
            name: d.name,
            score: d.score,
            maxScore: 100,
            description: d.description,
          }))}
          overallScore={result.score || 75}
          assessmentType="attachment"
          title="依恋类型四维度分析"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6 text-violet-400" />
          四种依恋类型全景
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(ATTACHMENT_STYLES).map(([key, info], index) => {
            const Icon = info.icon
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.1 }}
                className={`bg-gradient-to-br ${info.color}/15 rounded-xl p-5 border border-white/10 ${style === key ? 'ring-2 ring-white/30' : ''}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-bold text-sm">{info.name}</span>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">{info.description}</p>
              </motion.div>
            )
          })}
        </div>
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
            您在关系中的优势
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
            关系中的潜在挑战
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

      {mode === 'professional' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-3xl p-8 border border-pink-500/30 bg-gradient-to-br from-pink-500/5 to-rose-500/5"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-400" />
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              专业版专属 · 亲密关系深度指南
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-5">
              <div className="text-white font-semibold mb-3">💝 最佳匹配依恋类型</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {['安全型', '安全型', style === 'anxious' ? '回避型' : '焦虑型'].map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-pink-500/20 rounded-lg text-pink-300 text-sm">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-white/70 text-sm">
                没有绝对完美的匹配，两个成熟的人可以经营好任何关系。理解差异、接纳彼此是关键。
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <div className="text-white font-semibold mb-3">🌱 关系成长练习</div>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• 每天 10 分钟无手机深度对话</li>
                <li>• 学习非暴力沟通，表达感受而非评判</li>
                <li>• 建立安全暗号，冲突时主动暂停</li>
                <li>• 定期爱情地图更新，了解彼此变化</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          依恋安全化成长路径
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
