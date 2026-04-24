import { motion } from 'framer-motion'
import { Brain, Heart, Clock, Users, Sparkles, TrendingUp, Award, Target, Zap, Coffee } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand, getDimensionInterpretation } from './utils'

interface MentalAgeReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const MENTAL_AGE_LEVELS = [
  { min: 95, title: '千年智者', subtitle: '灵魂老者', desc: '你的灵魂已经历无数轮回，拥有超越凡俗的智慧', color: 'from-amber-500 to-yellow-600', icon: Sparkles },
  { min: 75, title: '成熟长者', subtitle: '人生导师', desc: '心智高度成熟，能从容应对人生百态', color: 'from-emerald-500 to-teal-600', icon: Brain },
  { min: 55, title: '壮年智者', subtitle: '正当年华', desc: '精力与智慧达到完美平衡', color: 'from-blue-500 to-cyan-600', icon: Zap },
  { min: 35, title: '青年探索', subtitle: '成长进行时', desc: '正在经历关键的心智成长期', color: 'from-violet-500 to-purple-600', icon: TrendingUp },
  { min: 18, title: '纯真少年', subtitle: '赤子之心', desc: '对世界充满好奇，一切皆有可能', color: 'from-pink-500 to-rose-600', icon: Heart },
  { min: 0, title: '永恒童心', subtitle: '不老顽童', desc: '永远年轻，永远热泪盈眶', color: 'from-fuchsia-500 to-pink-600', icon: Coffee },
]

const MENTAL_DIMENSIONS = {
  cognition: {
    name: '认知成熟',
    high: '思维深度远超同龄人，能洞察事物本质',
    mid: '具备良好的判断力，正在形成稳定的世界观',
    low: '保持开放的学习心态，认知方式灵活多变',
  },
  emotion: {
    name: '情绪稳定',
    high: '情绪调控能力卓越，处变不惊',
    mid: '能较好地管理情绪，偶有波动',
    low: '情绪表达直接，感染力强',
  },
  social: {
    name: '处世智慧',
    high: '人情练达，世事洞明',
    mid: '掌握基本的社交规则，不断学习',
    low: '社交方式真诚，不拘泥于形式',
  },
  responsibility: {
    name: '责任担当',
    high: '言出必行，值得信赖',
    mid: '能承担应有的责任，不断成长',
    low: '率性而为，享受自由',
  },
  resilience: {
    name: '抗逆复原',
    high: '历经风雨，韧性非凡',
    mid: '能从挫折中恢复，持续变强',
    low: '恢复力强，伤痕不留',
  },
}

export default function MentalAgeProfessionalReport({ result, mode = 'normal' }: MentalAgeReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['cognition', 'emotion', 'social', 'responsibility', 'resilience'])
  const mentalAgeScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const actualAge = Math.round(18 + mentalAgeScore * 0.8)
  
  const levelInfo = MENTAL_AGE_LEVELS.find(l => mentalAgeScore >= l.min) || MENTAL_AGE_LEVELS[MENTAL_AGE_LEVELS.length - 1]
  const LevelIcon = levelInfo.icon
  
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
        <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[100%] rounded-full bg-black/20 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">心理年龄测评 · 专业报告</span>
            </div>
            {mode === 'professional' && (
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-2">
                <Award className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">专业版</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <LevelIcon className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">
                  {levelInfo.title}
                </h1>
              </div>
              <p className="text-white/70 text-xl mb-2">{levelInfo.subtitle}</p>
              <p className="text-white/80 text-lg max-w-xl">{levelInfo.desc}</p>
            </div>
            
            <div className="text-center">
              <div className="text-7xl font-black text-white mb-2">{actualAge}</div>
              <div className="text-white/70">心理年龄 · 岁</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-amber-400" />
            心智五维成熟度
          </h3>
          <AdvancedBarChart
            dimensions={dimensions.map(d => ({
              name: MENTAL_DIMENSIONS[d.name as keyof typeof MENTAL_DIMENSIONS]?.name || d.name,
              score: d.score,
              maxScore: 100,
            }))}
            colorScheme="gradient"
            animated
          />
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-400" />
            心理老化指数
          </h3>
          <CircularProgressChart
            score={mentalAgeScore}
            title="成熟度综合"
            size="large"
            colorScheme="violet"
            showScore
            animated
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-emerald-400" />
          深度维度解读
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dimensions.map((dim, index) => {
            const dimInfo = MENTAL_DIMENSIONS[dim.name as keyof typeof MENTAL_DIMENSIONS]
            const band = getScoreBand(dim.score)
            const interpretation = getDimensionInterpretation(dim.name, dim.score, MENTAL_DIMENSIONS)
            return (
              <motion.div
                key={dim.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.08 }}
                className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-5 border border-emerald-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold">{dimInfo?.name || dim.name}</span>
                  <span className={`${band.colorClass} font-bold`}>{band.band} · {dim.score}分</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {interpretation}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-400" />
          年龄优势与建议
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-2xl p-6 border border-emerald-500/20">
            <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              当前心智的独特优势
            </h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                {mentalAgeScore >= 60 ? '看问题更通透，能抓住本质' : '学习能力强，接受新事物快'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                {mentalAgeScore >= 60 ? '情绪稳定，遇事不慌' : '精力充沛，富有激情'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✓</span>
                {mentalAgeScore >= 60 ? '能给同龄人提供人生建议' : '创造力旺盛，打破常规'}
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-2xl p-6 border border-blue-500/20">
            <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              平衡发展建议
            </h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">→</span>
                {mentalAgeScore >= 70 ? '保持童心，偶尔让自己"幼稚"一下' : '多听长者建议，避免冲动决策'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">→</span>
                {mentalAgeScore >= 70 ? '尝试新事物，避免思维固化' : '学习延迟满足，培养耐心'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">→</span>
                与不同年龄层的人交朋友，互相学习
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {mode === 'professional' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="relative glass rounded-3xl p-8 border border-amber-500/30"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-bl-[100px]" />
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              专业版深度洞察 · 真实年龄与心理年龄的匹配度
            </span>
          </h3>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            心理年龄与生理年龄{Math.abs(actualAge - 30) <= 10 ? '基本同步，这是健康的心理状态' : 
            actualAge > 30 ? '存在正向差异，说明你比同龄人更成熟' : '存在反向差异，说明你比同龄人更年轻有活力'}。
            这种{actualAge > 30 ? '早熟' : '晚熟'}特质{Math.abs(actualAge - 30) > 20 ? '非常明显' : '在正常范围内'}，
            是你独特的人生经历塑造的宝贵财富。
          </p>
          <p className="text-white/70 leading-relaxed">
            最好的状态不是"永远年轻"也不是"一夜成熟"，而是在每个年龄段都能活出那个年纪的精彩。
            年少时尽情探索，年长时从容智慧。年龄只是一个数字，真正重要的是你如何使用你的心智。
          </p>
        </motion.div>
      )}
    </div>
  )
}
