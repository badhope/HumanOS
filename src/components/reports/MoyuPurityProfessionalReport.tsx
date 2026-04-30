import { motion } from 'framer-motion'
import { Coffee, Clock, Brain, Monitor, Award, TrendingUp, Target, Zap, Moon, Sun } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface MoyuReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const MOYU_LEVELS = [
  { min: 90, title: '摸鱼之神', level: 'SSS', color: 'from-cyan-500 to-blue-500', desc: '带薪拉屎创始人，摸鱼界的天花板' },
  { min: 75, title: '摸鱼宗师', level: 'S级', color: 'from-teal-500 to-emerald-500', desc: '老板眼皮底下从容划水' },
  { min: 60, title: '摸鱼达人', level: 'A级', color: 'from-violet-500 to-purple-500', desc: '工作两小时，划水一整天' },
  { min: 40, title: '摸鱼新人', level: 'B级', color: 'from-pink-500 to-rose-500', desc: '偶尔划水，心怀愧疚' },
  { min: 20, title: '老实人', level: 'C级', color: 'from-amber-500 to-orange-500', desc: '勤勤恳恳，兢兢业业' },
  { min: 0, title: '奋斗B', level: 'D级', color: 'from-red-500 to-rose-500', desc: '卷王本王，摸鱼是什么' },
]

const MOYU_TACTICS = [
  { name: '带薪拉屎', mastery: '宗师级', effectiveness: 95, time: '15-30分钟' },
  { name: '茶水间社交', mastery: '大师级', effectiveness: 85, time: '10-20分钟' },
  { name: '刷掘金知乎', mastery: '专家级', effectiveness: 90, time: '不限时' },
  { name: '接水续杯', mastery: '入门级', effectiveness: 60, time: '2-5分钟' },
  { name: '调试代码发呆', mastery: '专业级', effectiveness: 95, time: '不限时' },
]

export default function MoyuPurityProfessionalReport({ result, mode = 'normal' }: MoyuReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['skill', 'boldness', 'time', 'disguise', 'experience'])
  const moyuScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = MOYU_LEVELS.find(l => moyuScore >= l.min) || MOYU_LEVELS[MOYU_LEVELS.length - 1]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${levelInfo.color} opacity-90`} />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Coffee className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">摸鱼纯度测评 · 专业报告</span>
            </div>
            {mode === 'professional' && (
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-2">
                <Award className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">专业版</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Moon className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">
                  {levelInfo.title}
                </h1>
              </div>
              <p className="text-white/70 text-xl mb-2">摸鱼等级: {levelInfo.level}</p>
              <p className="text-white/80 text-lg">{levelInfo.desc}</p>
            </div>
            <div className="text-center">
              <CircularProgressChart
                score={moyuScore}
                title="摸鱼纯度"
                size="large"
                colorScheme={moyuScore > 70 ? 'violet' : moyuScore > 50 ? 'blue' : 'amber'}
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
          <Target className="w-6 h-6 text-cyan-400" />
          摸鱼五维能力
        </h3>
        <AdvancedBarChart
          dimensions={[
            { name: '技巧熟练度', score: dimensions[0]?.score || 50, maxScore: 100 },
            { name: '胆子大小', score: dimensions[1]?.score || 50, maxScore: 100 },
            { name: '时间管理', score: dimensions[2]?.score || 50, maxScore: 100 },
            { name: '伪装能力', score: dimensions[3]?.score || 50, maxScore: 100 },
            { name: '摸鱼经验', score: dimensions[4]?.score || 50, maxScore: 100 },
          ]}
          colorScheme="gradient"
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
          <Zap className="w-6 h-6 text-amber-400" />
          摸鱼招式精通度
        </h3>
        <div className="space-y-4">
          {MOYU_TACTICS.map((tactic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-white">{tactic.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">{tactic.mastery}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">{tactic.time}</span>
                </div>
              </div>
              <div className="w-32">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tactic.effectiveness}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  />
                </div>
                <div className="text-right text-white/50 text-xs mt-1">{tactic.effectiveness}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Sun className="w-6 h-6 text-amber-400" />
          标准摸鱼一天时间线
        </h3>
        <div className="space-y-3">
          {[
            '09:30 到岗，接水，开机，洗手间一条龙',
            '10:00 早会结束，开始刷掘金/知乎',
            '11:30 讨论中午吃什么',
            '14:00 午休结束，再来一杯咖啡',
            '15:30 茶水间和同事进行友好交流',
            '17:30 开始收拾东西等待下班',
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-cyan-500/10"
            >
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-white/80">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
