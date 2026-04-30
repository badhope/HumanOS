import { motion } from 'framer-motion'
import { Eye, Shield, Heart, Brain, Award, TrendingUp, AlertTriangle, Target, Users, Zap } from 'lucide-react'
import { AdvancedBarChart, AdvancedRadarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface PUAReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const PUA_LEVELS = [
  { min: 90, title: '鉴茶大师', level: 'S级', color: 'from-emerald-500 to-teal-600', desc: '火眼金睛，任何套路都无所遁形' },
  { min: 70, title: '清醒玩家', level: 'A级', color: 'from-blue-500 to-cyan-600', desc: '能识别大部分套路，保持独立思考' },
  { min: 50, title: '普通路人', level: 'B级', color: 'from-amber-500 to-orange-600', desc: '偶尔会被套路，但总体清醒' },
  { min: 30, title: '纯情小白', level: 'C级', color: 'from-pink-500 to-rose-600', desc: '容易被甜言蜜语打动，相信爱情' },
  { min: 0, title: '恋爱脑本脑', level: 'D级', color: 'from-fuchsia-500 to-pink-600', desc: '被卖了还帮着数钱的小可爱' },
]

const PUA_DIMENSIONS = [
  { name: '情绪觉察', key: 'awareness' },
  { name: '边界意识', key: 'boundaries' },
  { name: '现实检验', key: 'reality' },
  { name: '独立思考', key: 'critical' },
  { name: '自尊水平', key: 'selfesteem' },
]

const PUA_TACTICS = [
  { name: '煤气灯操纵', desc: '扭曲现实，让你怀疑自己的判断力', level: '高危' },
  { name: '冷热暴力', desc: '忽冷忽热制造情感依赖', level: '常见' },
  { name: '价值打压', desc: '贬低你建立优越感', level: '高危' },
  { name: '未来承诺', desc: '画大饼从不兑现', level: '常见' },
  { name: '孤立社交', desc: '切断你与朋友的联系', level: '危险' },
]

export default function PUAResistanceProfessionalReport({ result, mode = 'normal' }: PUAReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['awareness', 'boundaries', 'reality', 'critical', 'selfesteem'])
  const puaScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = PUA_LEVELS.find(l => puaScore >= l.min) || PUA_LEVELS[PUA_LEVELS.length - 1]
  
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
              <Eye className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">反 PUA 抵抗力测评 · 专业报告</span>
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
                <Shield className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">
                  {levelInfo.title}
                </h1>
              </div>
              <p className="text-white/70 text-xl mb-2">抵抗力等级: {levelInfo.level}</p>
              <p className="text-white/80 text-lg">{levelInfo.desc}</p>
            </div>
            <div className="text-center">
              <CircularProgressChart
                score={puaScore}
                title="反PUA指数"
                size="large"
                colorScheme={puaScore > 70 ? 'green' : puaScore > 50 ? 'blue' : 'amber'}
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
          <Target className="w-6 h-6 text-violet-400" />
          反PUA五维能力雷达
        </h3>
        <AdvancedRadarChart
          dimensions={dimensions.map((d, i) => ({
            name: PUA_DIMENSIONS[i]?.name || d.name,
            score: d.score,
            maxScore: 100,
          }))}
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
          <AlertTriangle className="w-6 h-6 text-red-400" />
          PUA 常见套路预警
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PUA_TACTICS.map((tactic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className={`p-5 rounded-xl ${
                tactic.level === '高危' || tactic.level === '危险'
                  ? 'bg-red-500/15 border border-red-500/30'
                  : 'bg-amber-500/15 border border-amber-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{tactic.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  tactic.level === '高危' || tactic.level === '危险'
                    ? 'bg-red-500/30 text-red-300'
                    : 'bg-amber-500/30 text-amber-300'
                }`}>
                  {tactic.level}
                </span>
              </div>
              <p className="text-white/60 text-sm">{tactic.desc}</p>
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
          <Shield className="w-6 h-6 text-emerald-400" />
          自我保护指南
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-xl p-5 border border-emerald-500/20">
            <h4 className="font-bold text-white mb-3">✅ 红区止损原则</h4>
            <ul className="text-white/60 text-sm space-y-2">
              <li>• 感觉不对时，立刻停止投入</li>
              <li>• 找第三方朋友倾诉获取视角</li>
              <li>• 相信自己的直觉和感受</li>
              <li>• 不因为愧疚感而妥协</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-xl p-5 border border-blue-500/20">
            <h4 className="font-bold text-white mb-3">✅ 日常防护习惯</h4>
            <ul className="text-white/60 text-sm space-y-2">
              <li>• 保持独立的社交圈</li>
              <li>• 经济和精神双重独立</li>
              <li>• 不急于确立关系</li>
              <li>• 观察行动而非语言</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
