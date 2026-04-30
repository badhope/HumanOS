import { motion } from 'framer-motion'
import { Monitor, Coffee, Award, Target, Zap, Shield, Users, Moon, Brain } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface InternetAddictionProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const ADDICTION_LEVELS = [
  { min: 95, title: '赛博仙人', level: 'SSS', color: 'from-violet-600 to-purple-500', desc: '肉身已死，意识上网' },
  { min: 80, title: '重度网瘾', level: 'S级', color: 'from-blue-500 to-violet-500', desc: '人在网在，网断人亡' },
  { min: 65, title: '中度网瘾', level: 'A级', color: 'from-cyan-500 to-blue-500', desc: '三天不网，如隔三秋' },
  { min: 50, title: '普通网民', level: 'B级', color: 'from-teal-500 to-cyan-500', desc: '理性上网，快乐冲浪' },
  { min: 30, title: '轻度用户', level: 'C级', color: 'from-emerald-500 to-teal-500', desc: '工具而已，可有可无' },
  { min: 0, title: '原始人', level: 'D级', color: 'from-amber-500 to-orange-500', desc: '什么是互联网？' },
]

const ADDICTION_DIMENSIONS = [
  { name: '上网时长', key: 'duration' },
  { name: '重度依赖', key: 'dependency' },
  { name: '戒断反应', key: 'withdrawal' },
  { name: '社交替代', key: 'social' },
  { name: '现实疏离', key: 'reality' },
]

export default function InternetAddictionProfessionalReport({ result, mode = 'normal' }: InternetAddictionProps) {
  const dimensions = safeDimensions(result?.dimensions, ['duration', 'dependency', 'withdrawal', 'social', 'reality'])
  const addictionScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = ADDICTION_LEVELS.find(l => addictionScore >= l.min) || ADDICTION_LEVELS[ADDICTION_LEVELS.length - 1]
  
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
              <Monitor className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">网瘾鉴定 · 专业报告</span>
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
              <p className="text-white/70 text-xl mb-2">网瘾等级: {levelInfo.level}</p>
              <p className="text-white/80 text-lg">{levelInfo.desc}</p>
            </div>
            <div className="text-center">
              <CircularProgressChart
                score={addictionScore}
                title="网瘾指数"
                size="large"
                colorScheme={addictionScore > 70 ? 'violet' : addictionScore > 50 ? 'blue' : 'green'}
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
          网瘾五维雷达
        </h3>
        <AdvancedRadarChart
          dimensions={dimensions.map((d, i) => ({
            name: ADDICTION_DIMENSIONS[i]?.name || d.name,
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
          <Brain className="w-6 h-6 text-blue-400" />
          网瘾诊断标准
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { symptom: 'WiFi断了比分手还难受', severity: '重度' },
            { symptom: '吃饭必须看视频，不然吃不下', severity: '中度' },
            { symptom: '睡前刷手机，越刷越精神', severity: '中度' },
            { symptom: '五分钟不看手机就心慌', severity: '重度' },
            { symptom: '朋友聚会，各玩各的手机', severity: '轻度' },
            { symptom: '上个厕所都要带手机', severity: '轻度' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className={`p-4 rounded-xl ${
                item.severity === '重度' 
                  ? 'bg-red-500/15 border border-red-500/30'
                  : item.severity === '中度'
                  ? 'bg-amber-500/15 border border-amber-500/30'
                  : 'bg-blue-500/15 border border-blue-500/30'
              }`}
            >
              <p className="text-white">{item.symptom}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                item.severity === '重度' 
                  ? 'bg-red-500/20 text-red-300'
                  : item.severity === '中度'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-blue-500/20 text-blue-300'
              }`}>{item.severity}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
