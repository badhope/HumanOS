import { motion } from 'framer-motion'
import { Coffee, Zap, Brain, Clock, Award, TrendingUp, AlertTriangle, Target, DollarSign, Heart } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface FuBaoReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const FUBAO_LEVELS = [
  { min: 90, title: '福报仙人', level: 'SSS', color: 'from-amber-400 to-yellow-500', desc: '以厂为家，福报的化身' },
  { min: 75, title: '奋斗者', level: 'S级', color: 'from-orange-500 to-amber-500', desc: '自愿加班，追求卓越' },
  { min: 60, title: '打工人', level: 'A级', color: 'from-blue-500 to-cyan-500', desc: '尽职尽责，问心无愧' },
  { min: 40, title: '摸鱼大师', level: 'B级', color: 'from-teal-500 to-emerald-500', desc: '工作生活平衡大师' },
  { min: 20, title: '反卷先锋', level: 'C级', color: 'from-violet-500 to-purple-500', desc: '整顿职场的先行者' },
  { min: 0, title: '躺平学宗师', level: 'D级', color: 'from-pink-500 to-rose-500', desc: '大隐隐于公司' },
]

const FUBAO_DIMENSIONS = [
  { name: '加班意愿', key: 'overtime' },
  { name: '狼性文化', key: 'wolf' },
  { name: '感恩之心', key: 'gratitude' },
  { name: '奉献精神', key: 'dedication' },
  { name: '主人翁意识', key: 'ownership' },
]

const CORPORATE_TALKS = [
  { id: 'family', quote: '公司是我家，发展靠大家', context: '号召加班时' },
  { id: 'future', quote: '年轻人不要只看钱', context: '谈薪谈待遇时' },
  { id: 'growth', quote: '这对你是个锻炼机会', context: '加活不加钱时' },
  { id: 'platform', quote: '平台给你这么大', context: '业绩好是公司的' },
  { id: 'urgent', quote: '这个项目比较急', context: '接下来的半年都很急' },
]

export default function FuBaoIndexProfessionalReport({ result, mode = 'normal' }: FuBaoReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['overtime', 'wolf', 'gratitude', 'dedication', 'ownership'])
  const fubaoScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = FUBAO_LEVELS.find(l => fubaoScore >= l.min) || FUBAO_LEVELS[FUBAO_LEVELS.length - 1]
  
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
              <DollarSign className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">福报指数测评 · 专业报告</span>
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
                <Coffee className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">
                  {levelInfo.title}
                </h1>
              </div>
              <p className="text-white/70 text-xl mb-2">福报等级: {levelInfo.level}</p>
              <p className="text-white/80 text-lg">{levelInfo.desc}</p>
            </div>
            <div className="text-center">
              <CircularProgressChart
                score={fubaoScore}
                title="福报指数"
                size="large"
                colorScheme={fubaoScore > 70 ? 'amber' : fubaoScore > 50 ? 'blue' : 'violet'}
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
          <Target className="w-6 h-6 text-amber-400" />
          福报五维柱状图
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.map((d, i) => ({
            name: FUBAO_DIMENSIONS[i]?.name || d.name,
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
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-violet-400" />
          职场黑话大全
        </h3>
        <div className="space-y-3">
          {CORPORATE_TALKS.map((talk, i) => (
            <motion.div
              key={talk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="bg-white/5 rounded-xl p-5 border-l-4 border-violet-500"
            >
              <p className="text-white text-lg font-medium mb-1">「{talk.quote}」</p>
              <p className="text-white/50 text-sm">⏰ 使用场景: {talk.context}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-400" />
            996 福报时间表
          </h3>
          <div className="space-y-3">
            {['09:00 到岗打卡', '12:00 午餐加开会', '18:00 正式开工', '21:00 晚餐团建', '23:00 打车报销'].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-white/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-emerald-400" />
            心灵鸡汤
          </h3>
          <div className="space-y-3">
            {[
              '今天加班是为了明天更好的加班',
              '累吗？累就对了，舒服是留给有钱人的',
              '奋斗的青春最美丽',
              '别人能做的你为什么不能',
            ].map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 + i * 0.1 }}
                className="p-3 rounded-lg bg-emerald-500/10 italic text-white/70 text-center"
              >
                "{quote}"
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
