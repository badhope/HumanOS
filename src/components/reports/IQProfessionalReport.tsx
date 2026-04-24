import { motion } from 'framer-motion'
import { Brain, Award, Zap, Target, TrendingUp, AlertTriangle, GraduationCap, Briefcase, Users, Lightbulb } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface IQReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const IQ_LEVELS = [
  { min: 145, level: '天才', percentile: '99.9th', description: '极其罕见的智力水平，具备卓越的抽象推理与模式识别能力', color: 'from-amber-400 to-yellow-500' },
  { min: 130, level: '超常', percentile: '98th', description: '优秀的智力水平，在复杂问题解决方面表现出色', color: 'from-violet-400 to-purple-500' },
  { min: 115, level: '中上', percentile: '84th', description: '高于平均水平，具备良好的学习和推理能力', color: 'from-blue-400 to-cyan-500' },
  { min: 85, level: '中等', percentile: '50th', description: '正常智力范围，适应大部分学习和工作场景', color: 'from-emerald-400 to-teal-500' },
  { min: 70, level: '临界', percentile: '16th', description: '需要额外支持和结构化的学习环境', color: 'from-orange-400 to-amber-500' },
  { min: 0, level: '需关注', percentile: '2nd', description: '建议寻求专业评估和指导', color: 'from-red-400 to-rose-500' },
]

const IQ_SUBSCORES = {
  matrix: { name: '矩阵推理', icon: Target, description: '视觉空间推理和模式识别能力' },
  series: { name: '数字序列', icon: Lightbulb, description: '逻辑思维和数字规律识别' },
  verbal: { name: '言语类比', icon: Brain, description: '语言理解和概念关系推理' },
  spatial: { name: '空间旋转', icon: GraduationCap, description: '心理旋转和空间可视化能力' },
}

function getIQLevel(score: number) {
  return IQ_LEVELS.find(l => score >= l.min) || IQ_LEVELS[5]
}

export default function IQProfessionalReport({ result, mode = 'normal' }: IQReportProps) {
  const iqScore = result.score || 100
  const levelInfo = getIQLevel(iqScore)
  const dimensions = result.dimensions || []

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-violet-900 via-indigo-800 to-blue-900 border border-violet-500/30"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/20 rounded-full -translate-y-36 translate-x-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/15 rounded-full translate-y-28 -translate-x-28 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">瑞文标准推理测验</h2>
              <p className="text-white/60">IQ Intelligence Report · 流体智力评估</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-white/70 text-sm">智力水平评级</span>
                <span className={`text-sm font-bold bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`}>
                  {levelInfo.level}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-6xl font-black text-white">{iqScore}</span>
                  <span className="text-white/50 text-xl">IQ</span>
                </div>
                <p className="text-white/70 text-lg mb-1">常模百分位: <span className="text-white font-semibold">{levelInfo.percentile}</span></p>
                <p className="text-white/60">{levelInfo.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['逻辑推理', '模式识别', '抽象思维', '空间能力'].map((tag, i) => (
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
              <CircularProgressChart
                score={iqScore}
                maxScore={150}
                title="智商指数"
                size="large"
                colorScheme="violet"
                showScore
                animated
              />
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
          智力子维度得分
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.length > 0 ? dimensions.map(d => ({
            name: IQ_SUBSCORES[d.name as keyof typeof IQ_SUBSCORES]?.name || d.name,
            score: d.score,
            maxScore: d.maxScore || 100,
            description: IQ_SUBSCORES[d.name as keyof typeof IQ_SUBSCORES]?.description,
          })) : [
            { name: '矩阵推理', score: 78, maxScore: 100, description: '视觉空间推理和模式识别能力' },
            { name: '数字序列', score: 72, maxScore: 100, description: '逻辑思维和数字规律识别' },
            { name: '言语类比', score: 85, maxScore: 100, description: '语言理解和概念关系推理' },
            { name: '空间旋转', score: 68, maxScore: 100, description: '心理旋转和空间可视化能力' },
          ]}
          height={320}
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
          <Zap className="w-6 h-6 text-amber-400" />
          您的认知优势
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: '模式识别能力', desc: '能够快速发现隐藏在复杂信息中的规律和结构', icon: Lightbulb },
            { title: '抽象思维能力', desc: '脱离具体具象进行纯粹逻辑推演的能力', icon: Brain },
            { title: '问题解决效率', desc: '面对新异问题时的策略选择和执行速度', icon: Zap },
            { title: '工作记忆容量', desc: '同时处理多条信息并进行关联的能力', icon: Target },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 bg-gradient-to-br from-violet-500/10 to-blue-500/10 rounded-xl p-5 border border-violet-500/20"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.desc}</p>
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
            <Award className="w-6 h-6 text-emerald-400" />
            适合的职业领域
          </h3>
          <div className="space-y-3">
            {[
              { field: '科学研究', icon: '🔬' },
              { field: '软件工程', icon: '💻' },
              { field: '数据分析', icon: '📊' },
              { field: '战略咨询', icon: '💡' },
              { field: '法律行业', icon: '⚖️' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-white/80">{item.field}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            认知发展提示
          </h3>
          <div className="space-y-3">
            {[
              '保持持续学习，智力是可以通过训练提升的',
              '多样性的思维训练比单一重复更有效',
              '睡眠和运动对认知表现有关键影响',
              '情商与智商同样重要，平衡发展',
              '智力不是成功的唯一决定因素',
            ].map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="text-amber-400 mt-0.5">•</span>
                <p className="text-white/70 text-sm">{tip}</p>
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
                  专业版 · 智力深度解析
                </h3>
                <p className="text-white/50 text-sm">流体智力(Gf)与晶体智力(Gc)的区别</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-white text-lg">📈 流体智力 (Gf)</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  您本次测量的主要是流体智力——这是一种解决新问题、进行逻辑推理和识别模式的能力。
                  流体智力通常在青年时期达到顶峰，然后缓慢下降。通过刻意练习可以延缓衰退。
                </p>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-blue-300 text-sm">
                    <strong>您的表现：</strong>在矩阵推理任务中表现优异，说明具备良好的流体智力基础。
                    在25-30岁达到峰值后，可通过持续的思维训练保持。
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-white text-lg">📚 晶体智力 (Gc)</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  晶体智力是通过学习和经验积累的知识和技能。与流体智力不同，晶体智力通常会
                  随着年龄增长而持续提升，是智慧的主要来源。
                </p>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-emerald-300 text-sm">
                    <strong>提升建议：</strong>广泛阅读、深度学习专业领域、保持终身学习习惯。
                    晶体智力的积累将成为您长期竞争力的核心来源。
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
          认知能力提升建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(result.suggestions || [
            '每天进行30分钟的专注思考或冥想练习',
            '定期解决新类型的谜题和智力游戏',
            '学习一门新语言或乐器，强化神经可塑性',
            '保持充足睡眠，巩固记忆和认知功能',
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
