import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import {
  ArrowLeft,
  Clock,
  Award,
  Filter,
  Sword,
  Theater,
  Building2,
  FlaskConical,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { getAllScenarios, getScenariosByCategory, getPlayerStats, loadPlayerProfile } from '@data/simulation-world'
import type { WorldScenario, DifficultyLevel, WorldCategory } from '@data/simulation-world'
import { GlowCard } from '@components/animations'
import '@data/simulation-world'

const categoryIcons: Record<WorldCategory, React.ReactNode> = {
  historical: <Sword className="w-4 h-4" />,
  life: <Theater className="w-4 h-4" />,
  civilization: <Building2 className="w-4 h-4" />,
  'social-experiment': <FlaskConical className="w-4 h-4" />,
}

const categoryNames: Record<WorldCategory, string> = {
  historical: '历史决策',
  life: '人生模拟',
  civilization: '文明缔造',
  'social-experiment': '社会实验',
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: 'from-green-500 to-emerald-500',
  intermediate: 'from-yellow-500 to-amber-500',
  advanced: 'from-orange-500 to-red-500',
  expert: 'from-red-500 to-rose-500',
}

const difficultyNames: Record<DifficultyLevel, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '困难',
  expert: '专家',
}

const rarityColors = {
  common: 'text-slate-400',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  legendary: 'text-amber-400',
}

export default function WorldHall() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { navigate } = useTransitionNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const stats = getPlayerStats()

  const playerStats = [
    { label: '已通关世界', value: stats.completedScenarios, icon: '🏆' },
    { label: '解锁结局', value: stats.unlockedEndings, icon: '🎭' },
    { label: '成就', value: stats.achievements, icon: '⭐' },
    { label: '总游戏时长', value: `${stats.totalPlayTime}分钟`, icon: '⏱️' },
  ]

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const scenarios = useMemo(() => {
    if (selectedCategory === 'all') {
      return getAllScenarios()
    }
    return getScenariosByCategory(selectedCategory)
  }, [selectedCategory])

  const categories = [
    { id: 'all', name: '全部世界', icon: '🌍' },
    { id: 'historical', name: '历史决策剧场', icon: '⚔️' },
    { id: 'life', name: '人生模拟器', icon: '🎭' },
    { id: 'civilization', name: '文明缔造者', icon: '🏛️' },
    { id: 'social-experiment', name: '社会实验场', icon: '🧬' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/world')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            返回模拟世界入口
          </button>

          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">世界大厅</h1>
              <p className="text-slate-400">选择一个平行宇宙，开始你的旅程</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {playerStats.map((stat, index) => (
            <GlowCard key={index} className="p-4 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </GlowCard>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mb-8 overflow-x-auto pb-2"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(category.id)
                setSearchParams({ category: category.id })
              }}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid md:grid-cols-2 gap-6"
          >
            {scenarios.map((scenario, index) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                index={index}
                onClick={() => navigate(`/world/play/${scenario.id}`)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {scenarios.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔮</div>
            <h3 className="text-xl font-bold text-white mb-2">这个世界还在建造中</h3>
            <p className="text-slate-500">更多精彩场景正在开发中，敬请期待</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ScenarioCard({
  scenario,
  index,
  onClick,
}: {
  scenario: WorldScenario
  index: number
  onClick: () => void
}) {
  const profile = loadPlayerProfile()
  const unlockedEndings = profile.unlockedEndings[scenario.id]?.length || 0
  const progress = scenario.endingCount > 0 
    ? Math.round((unlockedEndings / scenario.endingCount) * 100) 
    : 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <GlowCard className="p-6 h-full relative overflow-hidden">
        {(scenario.featured || unlockedEndings > 0) && (
          <div className="absolute top-4 right-4 flex gap-2">
            {unlockedEndings > 0 && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-bold">
                {unlockedEndings}/{scenario.endingCount} 结局
              </span>
            )}
            {scenario.featured && unlockedEndings === 0 && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold">
                精选
              </span>
            )}
            {scenario.new && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold">
                NEW
              </span>
            )}
          </div>
        )}

        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-3xl flex-shrink-0">
            {scenario.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {categoryIcons[scenario.category]}
              <span className="text-xs text-slate-500 uppercase tracking-wider">
                {categoryNames[scenario.category]}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors mb-1">
              {scenario.title}
            </h3>
            <p className="text-violet-400 text-sm">{scenario.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-2">
          {scenario.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium text-white bg-gradient-to-r ${difficultyColors[scenario.difficulty]}`}>
            {difficultyNames[scenario.difficulty]}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs">
            <Clock className="w-3 h-3" />
            {scenario.estimatedDuration} 分钟
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs">
            <Award className="w-3 h-3" />
            {scenario.endingCount} 种结局
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {scenario.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md bg-slate-800/50 text-slate-400 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <span className="text-sm text-slate-500">
            📍 {scenario.setting.era} · {scenario.setting.location}
          </span>
          <div className="flex items-center gap-1 text-violet-400 font-medium text-sm group-hover:gap-2 transition-all">
            进入世界
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}
