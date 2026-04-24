import { motion } from 'framer-motion'
import { Skull, Shield, Zap, Eye, Crown, Award, AlertTriangle, TrendingUp, Users, Heart } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface DarkTriadReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const DARK_TRIAD_DIMENSIONS = {
  machiavellianism: { name: '马基雅维利主义', icon: Crown, color: 'from-amber-500 to-orange-500', description: '操纵与权谋倾向，为达目的不择手段' },
  narcissism: { name: '自恋', icon: Eye, color: 'from-pink-500 to-rose-500', description: '自我中心，渴望赞美与特殊对待' },
  psychopathy: { name: '精神病态', icon: Skull, color: 'from-red-500 to-rose-600', description: '缺乏共情与愧疚，追求刺激与冒险' },
}

const DARK_LEVELS = [
  { min: 80, level: '极高黑暗特质', description: '黑暗人格特征非常显著，在群体中属于前10%', warning: '注意权力滥用风险' },
  { min: 65, level: '较高黑暗特质', description: '明显的黑暗人格倾向，具有较强的自我保护意识', warning: '注意同理心培养' },
  { min: 50, level: '中等黑暗特质', description: '黑暗特质处于人群平均水平，自我保护与人际合作平衡', warning: '正常水平' },
  { min: 35, level: '较低黑暗特质', description: '偏阳光型人格，真诚友善是主要特质', warning: '注意防人之心不可无' },
  { min: 0, level: '极低黑暗特质', description: '纯粹的好人，完全不具备黑暗人格特征', warning: '谨防被他人利用' },
]

const getDarkLevel = (score: number) => DARK_LEVELS.find(l => score >= l.min) || DARK_LEVELS[4]

export default function DarkTriadProfessionalReport({ result, mode = 'normal' }: DarkTriadReportProps) {
  const dimensions = result.dimensions || []
  const totalScore = result.score || 50
  const levelInfo = getDarkLevel(totalScore)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 border border-red-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full translate-y-24 -translate-x-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500/20 to-amber-500/20 backdrop-blur-sm flex items-center justify-center shadow-xl border border-red-500/30">
              <Skull className="w-12 h-12 text-red-400" />
            </div>
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-2"
              >
                <span className="px-4 py-1 bg-red-500/20 rounded-full text-red-300 text-sm font-medium border border-red-500/30">
                  {mode === 'professional' ? '专业黑暗人格' : mode === 'advanced' ? '深度分析' : '暗黑三角测量'}
                </span>
                <span className="px-4 py-1 bg-amber-500/20 rounded-full text-amber-300 text-sm font-medium border border-amber-500/30">
                  {levelInfo.level}
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-white mb-2"
              >
                黑暗人格 · 专业报告
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 mb-3"
              >
                <span className="text-4xl font-black bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
                  {totalScore}
                </span>
                <span className="text-white/60">黑暗指数</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/80 mb-2"
              >
                {levelInfo.description}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-amber-400 font-medium"
              >
                ⚠️ {levelInfo.warning}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <CircularProgressChart
                score={totalScore}
                size="large"
                colorScheme="red"
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
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-400" />
          暗黑三角三维度解析
        </h3>
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {dimensions.map((dim, index) => {
            const dimInfo = DARK_TRIAD_DIMENSIONS[dim.name as keyof typeof DARK_TRIAD_DIMENSIONS]
            const Icon = dimInfo?.icon || Shield
            const level = dim.score >= 70 ? '高' : dim.score >= 40 ? '中' : '低'
            return (
              <motion.div
                key={dim.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.1 }}
                className={`bg-gradient-to-br ${dimInfo?.color || 'from-slate-500 to-gray-500'}/15 rounded-xl p-6 border border-white/10`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{dimInfo?.name || dim.name}</div>
                    <div className={`text-sm px-2 py-0.5 inline-block rounded-full mt-1 ${
                      dim.score >= 60 ? 'bg-red-500/20 text-red-300' :
                      dim.score >= 40 ? 'bg-amber-500/20 text-amber-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {level} 倾向
                    </div>
                  </div>
                </div>
                <div className="text-right mb-3">
                  <span className="text-3xl font-black text-white">{dim.score}</span>
                  <span className="text-white/50 text-sm ml-1">/100</span>
                </div>
                <p className="text-white/60 text-sm">{dimInfo?.description}</p>
              </motion.div>
            )
          })}
        </div>
        <AdvancedBarChart
          dimensions={dimensions.map(d => ({
            name: DARK_TRIAD_DIMENSIONS[d.name as keyof typeof DARK_TRIAD_DIMENSIONS]?.name || d.name,
            score: d.score,
            maxScore: 100,
            description: d.description,
          }))}
          height={300}
          colorScheme="gradient"
          animated
        />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-400" />
            黑暗特质的适应性优势
          </h3>
          <ul className="space-y-4">
            {result.strengths?.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.1 }}
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
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8 border border-red-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            潜在脱轨风险
          </h3>
          <ul className="space-y-4">
            {result.weaknesses?.map((weakness, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 mt-2 flex-shrink-0" />
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
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-red-500/5"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
              专业版专属 · 职场权力指南
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-white font-semibold">权力晋升策略</span>
              </div>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  适度展现自信与支配力，建立权威形象
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  在关键时刻保持冷静，做出理性决策
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  战略性地建立联盟，而非孤军奋战
                </li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-white font-semibold">人际关系边界</span>
              </div>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  利用权谋但避免伤害核心圈子的人
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  保持共情能力，不要完全关闭情感开关
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  选择能够理解并接纳你黑暗特质的伴侣
                </li>
              </ul>
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
          黑暗人格平衡发展建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {result.suggestions?.map((suggestion, index) => (
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
