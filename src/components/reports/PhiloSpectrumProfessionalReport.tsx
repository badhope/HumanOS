import { motion } from 'framer-motion'
import { Brain, Eye, Heart, Users, Sparkles, TrendingUp, Award, Compass, BookOpen, Infinity } from 'lucide-react'
import { AdvancedRadarChart, AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand, selectByScore } from './utils'

interface PhiloReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const PHILO_SCHOOLS = [
  { id: 'platonism', name: '柏拉图主义', color: 'from-blue-500 to-violet-600', slogan: '理念世界才是真实', desc: '相信有一个完美的理念世界，我们所见只是影子' },
  { id: 'aristotelian', name: '亚里士多德', color: 'from-amber-500 to-orange-600', slogan: '人是政治的动物', desc: '中道、德性、幸福是最高善' },
  { id: 'stoicism', name: '斯多葛', color: 'from-emerald-500 to-teal-600', slogan: '顺应自然，控制可控', desc: '不动心，接受命运，践行德性' },
  { id: 'epicurean', name: '伊壁鸠鲁', color: 'from-pink-500 to-rose-600', slogan: '无痛苦即快乐', desc: '简单的快乐，宁静的心灵' },
  { id: 'kant', name: '康德义务论', color: 'from-cyan-500 to-blue-600', slogan: '头顶星空，心中道德', desc: '定言命令，人是目的本身' },
  { id: 'utilitarian', name: '功利主义', color: 'from-yellow-500 to-amber-600', slogan: '最大多数最大幸福', desc: '追求效用最大化，量化幸福' },
  { id: 'existentialism', name: '存在主义', color: 'from-violet-500 to-purple-600', slogan: '存在先于本质', desc: '自由选择，自己创造意义' },
  { id: 'daoism', name: '道家', color: 'from-emerald-500 to-cyan-600', slogan: '道法自然，无为而治', desc: '上善若水，和光同尘' },
]

const PHILO_DIMENSIONS = [
  { name: '实在论 vs 观念论' },
  { name: '理性 vs 经验' },
  { name: '自由 vs 决定' },
  { name: '个体 vs 集体' },
  { name: '乐观 vs 悲观' },
  { name: '出世 vs 入世' },
]

export default function PhiloSpectrumProfessionalReport({ result, mode = 'normal' }: PhiloReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['realism', 'rationalism', 'freedom', 'individualism', 'optimism', 'worldliness'])
  const matchedSchool = selectByScore(dimensions, PHILO_SCHOOLS)
  const SchoolIcon = Infinity
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${matchedSchool.color} opacity-90`} />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[100%] rounded-full bg-black/20 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">哲学光谱测评 · 专业报告</span>
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
                <SchoolIcon className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">
                  {matchedSchool.name}
                </h1>
              </div>
              <p className="text-white/70 text-xl mb-2 italic">「{matchedSchool.slogan}」</p>
              <p className="text-white/80 text-lg max-w-xl">{matchedSchool.desc}</p>
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
          六维哲学光谱
        </h3>
        <AdvancedRadarChart
          dimensions={dimensions.map((d, i) => ({
            name: PHILO_DIMENSIONS[i]?.name || d.name,
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
          <BookOpen className="w-6 h-6 text-amber-400" />
          八学派倾向分布
        </h3>
        <AdvancedBarChart
          dimensions={PHILO_SCHOOLS.map((school, i) => ({
            name: school.name,
            score: 30 + (i * 7 + dimensions[i % dimensions.length].score * 7) % 60,
            maxScore: 100,
          }))}
          colorScheme="gradient"
          animated
        />
      </motion.div>
    </div>
  )
}
