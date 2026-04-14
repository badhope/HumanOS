import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Theater, Award } from 'lucide-react'
import { getScenarioById, getScenariosByType, ALL_INTERACTIVE_SCENARIOS } from '@data/political-ideology'
import { cn } from '@utils/cn'

const difficultyColors = {
  beginner: 'from-green-500 to-emerald-500',
  intermediate: 'from-amber-500 to-orange-500',
  advanced: 'from-red-500 to-rose-500',
}

const difficultyLabels = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '专家',
}

const typeIcons = {
  'historical-event': BookOpen,
  'life-simulation': Theater,
}

const typeLabels = {
  'historical-event': '历史事件',
  'life-simulation': '人生模拟',
}

export default function ScenarioSelect() {
  const { type } = useParams<{ type?: string }>()
  const { navigate } = useTransitionNavigate()

  const scenarios = useMemo(() => {
    if (type === 'historical') {
      return getScenariosByType('historical-event')
    }
    if (type === 'life') {
      return getScenariosByType('life-simulation')
    }
    return ALL_INTERACTIVE_SCENARIOS
  }, [type])

  const pageTitle = type === 'historical' ? '⚔️ 历史决策模式' 
    : type === 'life' ? '🎭 人生模拟模式' 
    : '✨ 互动模式'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/mode/political-ideology')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          返回模式选择
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {pageTitle}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            不再是被动答题，而是身临其境做出选择。你的每一个决策，都将揭示你内心深处的意识形态倾向。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => {
            const TypeIcon = typeIcons[scenario.type]
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => navigate(`/scenario/play/${scenario.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center text-3xl">
                        {scenario.icon}
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${difficultyColors[scenario.difficulty]}`}>
                          {difficultyLabels[scenario.difficulty]}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300 flex items-center gap-1">
                          <TypeIcon className="w-3 h-3" />
                          {typeLabels[scenario.type]}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                      {scenario.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {scenario.subtitle}
                    </p>

                    <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                      {scenario.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          约 {scenario.estimatedTime} 分钟
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {Object.keys(scenario.endings).length} 种结局
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {scenario.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-lg text-xs bg-slate-800 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
