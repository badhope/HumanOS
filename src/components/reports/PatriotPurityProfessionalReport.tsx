import { motion } from 'framer-motion'
import { Heart, Flag, Award, TrendingUp, Target, Zap, Shield, Star, Users } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface PatriotReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const PATRIOT_LEVELS = [
  { min: 95, title: '战狼', level: 'SSS', color: 'from-red-600 to-rose-500', desc: '此生无悔入华夏，来世还做中国人' },
  { min: 80, title: '爱国者', level: 'S级', color: 'from-rose-500 to-pink-500', desc: '国家荣誉高于一切' },
  { min: 65, title: '理性爱国', level: 'A级', color: 'from-amber-500 to-orange-500', desc: '位卑未敢忘忧国' },
  { min: 50, title: '普通人', level: 'B级', color: 'from-blue-500 to-cyan-500', desc: '过好自己的小日子' },
  { min: 30, title: '国际主义者', level: 'C级', color: 'from-violet-500 to-purple-500', desc: '胸怀世界，放眼全球' },
  { min: 0, title: '理中客', level: 'D级', color: 'from-teal-500 to-emerald-500', desc: '独立思考，拒绝站队' },
]

const PATRIOT_DIMENSIONS = [
  { name: '民族自豪', key: 'pride' },
  { name: '文化认同', key: 'culture' },
  { name: '制度自信', key: 'system' },
  { name: '历史认知', key: 'history' },
  { name: '未来信心', key: 'future' },
]

export default function PatriotPurityProfessionalReport({ result, mode = 'normal' }: PatriotReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['pride', 'culture', 'system', 'history', 'future'])
  const patriotScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = PATRIOT_LEVELS.find(l => patriotScore >= l.min) || PATRIOT_LEVELS[PATRIOT_LEVELS.length - 1]
  
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
              <Flag className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">爱国纯度测评 · 专业报告</span>
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
                <Heart className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">
                  {levelInfo.title}
                </h1>
              </div>
              <p className="text-white/70 text-xl mb-2">爱国等级: {levelInfo.level}</p>
              <p className="text-white/80 text-lg">{levelInfo.desc}</p>
            </div>
            <div className="text-center">
              <CircularProgressChart
                score={patriotScore}
                title="爱国纯度"
                size="large"
                colorScheme={patriotScore > 70 ? 'red' : patriotScore > 50 ? 'amber' : 'blue'}
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
          <Target className="w-6 h-6 text-red-400" />
          爱国五维柱状图
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.map((d, i) => ({
            name: PATRIOT_DIMENSIONS[i]?.name || d.name,
            score: d.score,
            maxScore: 100,
          }))}
          colorScheme="gradient"
          animated
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-400" />
            爱国语录
          </h3>
          <div className="space-y-3">
            {[
              '苟利国家生死以，岂因祸福避趋之',
              '此生无悔入华夏，来世还生种花家',
              '为什么我的眼里常含泪水？因为我对这土地爱得深沉',
              '我们的征途是星辰大海',
            ].map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                className="p-3 rounded-lg bg-red-500/10 italic text-white/70 text-center"
              >
                "{quote}"
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            爱国行为
          </h3>
          <div className="space-y-3">
            {[
              '支持国产品牌，理性消费',
              '传播正能量，抵制谣言',
              '认真工作，建设祖国',
              '理性发声，维护国家形象',
              '好好学习，天天向上',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10"
              >
                <Star className="w-4 h-4 text-blue-400" />
                <span className="text-white/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
