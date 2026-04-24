import { motion } from 'framer-motion'
import { Heart, Users, Shield, Eye, TrendingUp, Award, Sparkles, Compass, Zap, BarChart3 as BarChart, Target } from 'lucide-react'
import { AdvancedRadarChart, AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions } from './utils'

interface CASTReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const CAST_TYPES: Record<string, any> = {
  authoritative: {
    name: '权威型',
    title: '智慧引导者',
    color: 'from-emerald-500 to-teal-600',
    desc: '高要求+高回应的黄金教养模式，规则清晰又充满温暖',
    traits: ['民主平等', '尊重独立', '理性沟通', '爱与原则并行'],
    strengths: '培养出自律、自信、社交能力强的孩子',
    icon: Shield,
  },
  authoritarian: {
    name: '专制型',
    title: '严格规则制定者',
    color: 'from-amber-500 to-orange-600',
    desc: '高要求+低回应，相信严师出高徒',
    traits: ['规则至上', '说一不二', '重视服从', '相信棍棒底下出孝子'],
    strengths: '培养出纪律性强、目标明确的孩子',
    icon: Eye,
  },
  permissive: {
    name: '纵容型',
    title: '无条件宠爱者',
    color: 'from-pink-500 to-rose-600',
    desc: '低要求+高回应，把爱和自由给得满满的',
    traits: ['朋友式相处', '很少惩罚', '孩子开心最重要', '快乐教育信徒'],
    strengths: '培养出创造力强、幸福感高的孩子',
    icon: Heart,
  },
  uninvolved: {
    name: '忽视型',
    title: '散养无为者',
    color: 'from-violet-500 to-purple-600',
    desc: '低要求+低回应，相信儿孙自有儿孙福',
    traits: ['顺其自然', '尊重命运', '减少干预', '相信每个人有自己的人生'],
    strengths: '培养出独立性极强、生存能力出色的孩子',
    icon: Users,
  },
}

const CAST_DIMENSIONS = {
  demanding: '要求程度',
  responsive: '回应程度',
  control: '控制倾向',
  warmth: '温暖表达',
  autonomy: '自主支持',
}

export default function CASTParentingProfessionalReport({ result, mode = 'normal' }: CASTReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['demanding', 'responsive', 'control', 'warmth', 'autonomy'])
  
  const typeScores = {
    authoritative: (dimensions.find(d => d.name === 'demanding')?.score || 50) + (dimensions.find(d => d.name === 'responsive')?.score || 50),
    authoritarian: (dimensions.find(d => d.name === 'control')?.score || 50) + 100 - (dimensions.find(d => d.name === 'autonomy')?.score || 50),
    permissive: 100 - (dimensions.find(d => d.name === 'demanding')?.score || 50) + (dimensions.find(d => d.name === 'warmth')?.score || 50),
    uninvolved: 100 - (dimensions.find(d => d.name === 'demanding')?.score || 50) + 100 - (dimensions.find(d => d.name === 'responsive')?.score || 50),
  }
  
  const primaryType = Object.entries(typeScores).sort((a, b) => b[1] - a[1])[0][0]
  const typeInfo = CAST_TYPES[primaryType]
  const TypeIcon = typeInfo.icon
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${typeInfo.color} opacity-90`} />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[100%] rounded-full bg-black/20 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">CAST 教养风格测评 · 专业报告</span>
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
                <TypeIcon className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">
                  {typeInfo.title}
                </h1>
              </div>
              <p className="text-white/70 text-xl mb-2">CAST: {typeInfo.name} 教养</p>
              <p className="text-white/80 text-lg max-w-xl">{typeInfo.desc}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {typeInfo.traits.map((t: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-sm"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
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
          <Compass className="w-6 h-6 text-violet-400" />
          教养四象限雷达
        </h3>
        <AdvancedRadarChart
          dimensions={dimensions.map(d => ({
            name: CAST_DIMENSIONS[d.name as keyof typeof CAST_DIMENSIONS] || d.name,
            score: d.score,
            maxScore: 100,
          }))}
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
          <BarChart className="w-6 h-6 text-blue-400" />
          四类型倾向得分
        </h3>
        <AdvancedBarChart
          dimensions={Object.entries(CAST_TYPES).map(([code, info]) => ({
            name: info.name,
            score: typeScores[code as keyof typeof typeScores] / 2,
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
        <div className="bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-2xl p-6 border border-emerald-500/20">
          <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            你的教养优势
          </h4>
          <p className="text-white/70 leading-relaxed">{typeInfo.strengths}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-2xl p-6 border border-blue-500/20">
          <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            平衡发展建议
          </h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>• 没有完美的教养方式，只有适合的教养方式</li>
            <li>• 观察孩子的反应，调整你的策略</li>
            <li>• 最重要的，是让孩子感受到无条件的爱</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
