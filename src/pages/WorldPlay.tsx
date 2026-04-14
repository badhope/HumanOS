import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  RotateCcw,
  Home,
  ChevronRight,
  BarChart3,
  Eye,
  EyeOff,
  User,
} from 'lucide-react'
import { WorldEngine, getScenarioById } from '@data/simulation-world'
import type { ScenarioNode, DecisionOption, ScenarioResult } from '@data/simulation-world'
import { GlowCard } from '@components/animations'

export default function WorldPlay() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const { navigate } = useTransitionNavigate()

  const [engine, setEngine] = useState<WorldEngine | null>(null)
  const [currentNode, setCurrentNode] = useState<ScenarioNode | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<ScenarioResult | null>(null)
  const [showValuePreview, setShowValuePreview] = useState(false)

  const engineRef = useRef<WorldEngine | null>(null)

  useEffect(() => {
    if (scenarioId) {
      const worldEngine = new WorldEngine(scenarioId)
      engineRef.current = worldEngine
      setEngine(worldEngine)
      setCurrentNode(worldEngine.getCurrentNode())
    }
    return () => {
      engineRef.current = null
    }
  }, [scenarioId])

  const handleNarrativeContinue = useCallback(() => {
    if (!engineRef.current || isTransitioning) return
    setIsTransitioning(true)

    setTimeout(() => {
      const nextNode = engineRef.current!.advanceNarrative()
      if (nextNode) {
        setCurrentNode(nextNode)
      }
      setIsTransitioning(false)
    }, 400)
  }, [isTransitioning])

  const handleDecision = useCallback((option: DecisionOption) => {
    if (!engineRef.current || isTransitioning) return

    setSelectedOption(option.id)
    setIsTransitioning(true)

    setTimeout(() => {
      const nextNode = engineRef.current!.makeDecision(option.id)

      if (engineRef.current!.hasEnded()) {
        const scenarioResult = engineRef.current!.generateResult()
        setResult(scenarioResult)
        setShowResult(true)
      } else if (nextNode) {
        setCurrentNode(nextNode)
      }

      setSelectedOption(null)
      setIsTransitioning(false)
    }, 600)
  }, [isTransitioning])

  const handleRestart = useCallback(() => {
    if (scenarioId) {
      const worldEngine = new WorldEngine(scenarioId)
      engineRef.current = worldEngine
      setEngine(worldEngine)
      setCurrentNode(worldEngine.getCurrentNode())
      setShowResult(false)
      setResult(null)
    }
  }, [scenarioId])

  if (!engine || !currentNode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">正在加载世界...</div>
      </div>
    )
  }

  const scenario = engine.getScenario()
  const playState = engine.getState()
  const dominantValues = engine.getDominantValues(4)

  const rarityColors: Record<string, string> = {
    common: 'from-slate-500 to-slate-600',
    uncommon: 'from-green-500 to-emerald-500',
    rare: 'from-blue-500 to-indigo-500',
    legendary: 'from-amber-500 to-orange-500',
  }

  const rarityNames: Record<string, string> = {
    common: '普通',
    uncommon: '稀有',
    rare: '珍贵',
    legendary: '传说',
  }

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${rarityColors[result.ending.rarity]} text-white text-sm font-bold mb-6`}>
              🌟 {rarityNames[result.ending.rarity]}结局
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {result.ending.title}
            </h1>
            <p className="text-violet-400 text-lg max-w-2xl mx-auto">
              {result.ending.summary}
            </p>
          </motion.div>

          <GlowCard className="mb-8 p-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                {result.ending.content}
              </p>
            </div>
            {result.ending.characterFate && (
              <div className="mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                <p className="text-violet-300 italic text-center text-lg">
                  「 {result.ending.characterFate} 」
                </p>
              </div>
            )}
          </GlowCard>

          {result.archetypeMatch.historicalFigure && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlowCard className="mb-8 p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-300 mb-1">
                      历史人物匹配
                    </h3>
                    <p className="text-white font-medium text-xl mb-2">
                      {result.archetypeMatch.historicalFigure}
                    </p>
                    <p className="text-slate-400">
                      {result.archetypeMatch.description}
                    </p>
                    <p className="text-amber-400 text-sm mt-2">
                      相似度: {result.archetypeMatch.similarity}%
                    </p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          )}

          <GlowCard className="mb-8 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-violet-400" />
              你的价值画像
            </h3>

            <div className="mb-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
              <h4 className="text-violet-300 font-bold mb-1">
                {result.valueProfile.archetype}
              </h4>
              <p className="text-slate-400 text-sm">
                {result.valueProfile.archetypeDescription}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {result.valueProfile.dominant.map(({ dimension, score }) => (
                <div
                  key={dimension}
                  className="p-4 bg-slate-800/50 rounded-xl"
                >
                  <div className="text-white font-medium mb-2 capitalize">
                    {dimension}
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 rounded-full ${
                        score > 0
                          ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                          : 'bg-gradient-to-r from-red-500 to-rose-400'
                      }`}
                      style={{ width: `${Math.min(Math.abs(score) * 25, 100)}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-slate-400 mt-1">
                    {score > 0 ? '+' : ''}{score.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="mb-8 p-6">
            <h3 className="text-xl font-bold text-white mb-6">关键决策回顾</h3>
            <div className="space-y-3">
              {result.keyDecisions.map((moment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{moment.choice}</div>
                    <div className="text-slate-400 text-sm mt-1">{moment.impact}</div>
                    {moment.values.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {moment.values.map((v) => (
                          <span
                            key={v}
                            className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 text-xs"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlowCard>

          <div className="flex justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              重新开始
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/world/hall')}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              返回世界大厅
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  const progress =
    (playState.visitedNodes.length / Object.keys(scenario.nodes).length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate('/world/hall')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回大厅
            </button>
            <h2 className="text-white font-bold hidden sm:block">
              {scenario.title}
            </h2>
            <button
              onClick={() => setShowValuePreview(!showValuePreview)}
              className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors"
            >
              {showValuePreview ? (
                <>
                  <EyeOff className="w-5 h-5" />
                  <span className="hidden sm:inline">隐藏</span>
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  <span className="hidden sm:inline">价值倾向</span>
                </>
              )}
            </button>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showValuePreview && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-20 z-40 max-w-4xl mx-auto px-6 mb-4"
          >
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl p-4 border border-slate-700">
              <div className="flex flex-wrap gap-3">
                {dominantValues.map(({ dimension, score }) => (
                  <span
                    key={dimension}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      score > 0
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {dimension}: {score > 0 ? '+' : ''}
                    {score.toFixed(1)}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-6">
              {currentNode.year && (
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentNode.year}</span>
                  {currentNode.location && (
                    <span>· {currentNode.location}</span>
                  )}
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {currentNode.title}
              </h1>
              {currentNode.context && (
                <p className="text-amber-400/80 text-sm">
                  📜 {currentNode.context}
                </p>
              )}
            </div>

            <GlowCard className="mb-8 p-6 sm:p-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                  {currentNode.content}
                </p>
              </div>
            </GlowCard>

            {currentNode.type === 'narrative' && (
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNarrativeContinue}
                  disabled={isTransitioning}
                  className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  继续
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}

            {currentNode.type === 'decision' && currentNode.options && (
              <div className="space-y-4">
                <p className="text-center text-slate-400 mb-2">做出你的选择：</p>
                {currentNode.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDecision(option)}
                    disabled={isTransitioning}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                      selectedOption === option.id
                        ? 'border-violet-500 bg-violet-500/20'
                        : 'border-slate-700 bg-slate-800/50 hover:border-violet-500/50 hover:bg-slate-800'
                    } disabled:opacity-50`}
                  >
                    <div className="font-bold text-white text-lg mb-2">
                      {option.text}
                    </div>
                    {option.description && (
                      <p className="text-slate-400 text-sm mb-3">
                        {option.description}
                      </p>
                    )}
                    {option.consequences && (
                      <p className="text-violet-400 text-sm">
                        ⚡ {option.consequences}
                      </p>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>已做出 {playState.decisionPath.length} 个决策</p>
        </div>
      </div>
    </div>
  )
}
