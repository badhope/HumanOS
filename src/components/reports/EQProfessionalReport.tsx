import { motion } from 'framer-motion'
import { Heart, Brain, Users, MessageCircle, Shield, Award, TrendingUp, AlertTriangle, Sparkles, Target } from 'lucide-react'
import { ComprehensiveChartSystem, AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface EQReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const EQ_DIMENSIONS = {
  'perception': { name: '情绪感知', icon: Heart, color: 'from-pink-500 to-rose-500', description: '识别和理解自己与他人情绪的能力' },
  'regulation': { name: '情绪管理', icon: Shield, color: 'from-blue-500 to-cyan-500', description: '调节和管理情绪反应的能力' },
  'utilization': { name: '情绪运用', icon: Brain, color: 'from-violet-500 to-purple-500', description: '运用情绪促进思维和行动的能力' },
  'social': { name: '社交技能', icon: Users, color: 'from-amber-500 to-orange-500', description: '处理人际关系和社交互动的能力' },
  'empathy': { name: '同理心', icon: MessageCircle, color: 'from-emerald-500 to-teal-500', description: '共情和理解他人感受的能力' },
}

const EQ_LEVELS = [
  { min: 130, level: '极高', title: '情商大师', description: '卓越的情绪智力，能够敏锐感知并娴熟运用情绪力量' },
  { min: 115, level: '优秀', title: '情绪达人', description: '出色的情绪管理能力，在人际关系中游刃有余' },
  { min: 100, level: '良好', title: '情绪成熟者', description: '具备扎实的情绪基础，能够有效处理大部分情境' },
  { min: 85, level: '中等', title: '情绪成长者', description: '情绪能力均衡，在特定领域还有提升空间' },
  { min: 70, level: '待提升', title: '情绪学习者', description: '正在发展情绪能力，需要更多练习和觉察' },
  { min: 0, level: '入门', title: '情绪探索者', description: '情绪意识正在觉醒，这是成长的绝佳起点' },
]

const getEQLevel = (score: number) => EQ_LEVELS.find(l => score >= l.min) || EQ_LEVELS[5]

export default function EQProfessionalReport({ result, mode = 'normal' }: EQReportProps) {
  const dimensions = result.dimensions || []
  const totalScore = result.score || 0
  const eqLevel = getEQLevel(totalScore)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-pink-600 via-rose-500 to-orange-500"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-2"
              >
                <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  {mode === 'professional' ? '专业版·情绪全景' : mode === 'advanced' ? '高级版·深度分析' : '标准版·核心测评'}
                </span>
                <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  {eqLevel.title}
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-white mb-2"
              >
                情商 (EQ) 专业报告
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 mb-3"
              >
                <span className="text-4xl font-black text-white">{totalScore}</span>
                <span className="px-3 py-1 bg-white/30 rounded-full text-white font-bold">
                  {eqLevel.level} 情商水平
                </span>
                <span className="text-white/80">超越人群 {Math.round((1 - totalScore / 150) * 100)}%</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/90 text-lg"
              >
                {eqLevel.description}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CircularProgressChart
                score={totalScore / 1.5}
                size="large"
                colorScheme="violet"
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
            name: EQ_DIMENSIONS[d.name as keyof typeof EQ_DIMENSIONS]?.name || d.name,
            score: d.score,
            maxScore: 100,
            description: EQ_DIMENSIONS[d.name as keyof typeof EQ_DIMENSIONS]?.description || d.description,
          }))}
          overallScore={totalScore / 1.5}
          assessmentType="eq"
          title="五维情绪智力模型"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-pink-400" />
          情绪智力五维深度解析
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dimensions.map((dim, index) => {
            const dimInfo = EQ_DIMENSIONS[dim.name as keyof typeof EQ_DIMENSIONS]
            const Icon = dimInfo?.icon || Heart
            const level = dim.score >= 80 ? '出色' : dim.score >= 60 ? '良好' : dim.score >= 40 ? '一般' : '待提升'
            return (
              <motion.div
                key={dim.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.1 }}
                className={`bg-gradient-to-br ${dimInfo?.color || 'from-slate-500 to-gray-500'}/15 rounded-xl p-6 border border-white/10`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{dimInfo?.name || dim.name}</div>
                    <div className={`text-sm px-2 py-0.5 inline-block rounded-full mt-1 ${
                      dim.score >= 70 ? 'bg-green-500/20 text-green-300' :
                      dim.score >= 50 ? 'bg-blue-500/20 text-blue-300' :
                      'bg-amber-500/20 text-amber-300'
                    }`}>
                      {level}
                    </div>
                  </div>
                </div>
                <div className="text-right mb-3">
                  <span className="text-3xl font-black text-white">{dim.score}</span>
                  <span className="text-white/50 text-sm ml-1">/100</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{dimInfo?.description}</p>
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
            您的情绪优势
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
            情绪成长空间
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
          className="glass rounded-3xl p-8 border border-rose-500/30 bg-gradient-to-br from-rose-500/5 to-pink-500/5"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-400" />
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              专业版专属 · 职场与生活应用指南
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">职场沟通策略</span>
              </div>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  利用高感知能力，准确捕捉团队情绪氛围
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  情绪激动时暂停 6 秒再回应，避免冲动决策
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  在压力下保持情绪稳定，成为团队的定海神针
                </li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-white font-semibold">亲密关系经营</span>
              </div>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">•</span>
                  先共情后讲理，情绪连接优先于问题解决
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">•</span>
                  主动表达感受，而非指责对方行为
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">•</span>
                  每天 5 分钟积极倾听，不打断不评判
                </li>
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
          情商提升行动计划
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
