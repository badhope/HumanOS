import { motion } from 'framer-motion'
import { Utensils, Coffee, Award, TrendingUp, Target, Zap, Heart, Star, Sparkles } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface FoodieReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const FOODIE_LEVELS = [
  { min: 90, title: '食神', level: 'SSS', color: 'from-amber-500 to-orange-500', desc: '为了吃可以穿越整个城市' },
  { min: 75, title: '美食家', level: 'S级', color: 'from-red-500 to-rose-500', desc: '大众点评LV8，收藏500+店' },
  { min: 60, title: '吃货', level: 'A级', color: 'from-pink-500 to-rose-500', desc: '人生就是吃吃吃' },
  { min: 40, title: '干饭人', level: 'B级', color: 'from-violet-500 to-purple-500', desc: '到点就饿，干饭不积极思想有问题' },
  { min: 20, title: '普通人', level: 'C级', color: 'from-blue-500 to-cyan-500', desc: '吃饭只是为了生存' },
  { min: 0, title: '神仙', level: 'D级', color: 'from-teal-500 to-emerald-500', desc: '你们人类为什么要一天吃三顿' },
]

const FOODIE_DIMENSIONS = [
  { name: '吃的广度', key: 'breadth' },
  { name: '吃的深度', key: 'depth' },
  { name: '氪金程度', key: 'money' },
  { name: '探索精神', key: 'adventure' },
  { name: '执念程度', key: 'obsession' },
]

const CUISINE_MASTERY = [
  { name: '川菜', icon: '🌶️', mastery: '精通' },
  { name: '日料', icon: '🍣', mastery: '专家' },
  { name: '火锅', icon: '🍲', mastery: '宗师' },
  { name: '烧烤', icon: '🍖', mastery: '达人' },
  { name: '甜品', icon: '🍰', mastery: '入门' },
  { name: '西餐', icon: '🍝', mastery: '爱好者' },
]

export default function FoodieLevelProfessionalReport({ result, mode = 'normal' }: FoodieReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['breadth', 'depth', 'money', 'adventure', 'obsession'])
  const foodieScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = FOODIE_LEVELS.find(l => foodieScore >= l.min) || FOODIE_LEVELS[FOODIE_LEVELS.length - 1]
  
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
              <Utensils className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">吃货等级测评 · 专业报告</span>
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
              <p className="text-white/70 text-xl mb-2">吃货等级: {levelInfo.level}</p>
              <p className="text-white/80 text-lg">{levelInfo.desc}</p>
            </div>
            <div className="text-center">
              <CircularProgressChart
                score={foodieScore}
                title="吃货指数"
                size="large"
                colorScheme={foodieScore > 70 ? 'amber' : foodieScore > 50 ? 'violet' : 'blue'}
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
          吃货五维雷达
        </h3>
        <AdvancedRadarChart
          dimensions={dimensions.map((d, i) => ({
            name: FOODIE_DIMENSIONS[i]?.name || d.name,
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
          <Sparkles className="w-6 h-6 text-amber-400" />
          菜系精通度
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {CUISINE_MASTERY.map((cuisine, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="bg-gradient-to-br from-amber-500/15 to-orange-500/15 rounded-xl p-5 border border-amber-500/20 text-center"
            >
              <div className="text-4xl mb-2">{cuisine.icon}</div>
              <h4 className="font-bold text-white">{cuisine.name}</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">{cuisine.mastery}</span>
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
          <Star className="w-6 h-6 text-yellow-400" />
          吃货日常
        </h3>
        <div className="space-y-3">
          {[
            '✅ 看到美食评测眼睛会放光',
            '✅ 收藏的餐厅比收藏的文章还多',
            '✅ 旅游=换个地方吃东西',
            '✅ 心情不好？吃一顿就好',
            '✅ 心情好？那更要吃一顿庆祝',
            '✅ 为了吃，可以跨越半个城市',
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10"
            >
              <Utensils className="w-4 h-4 text-amber-400" />
              <span className="text-white/80">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
