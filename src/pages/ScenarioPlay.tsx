import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, RotateCcw, Home, ChevronRight, BookOpen, AlertTriangle } from 'lucide-react'
import { ScenarioEngine, getScenarioById } from '@data/political-ideology'
import type { ScenarioNode, DecisionOption, ScenarioResult } from '@data/political-ideology'
import { GlowCard } from '@components/animations'

export default function ScenarioPlay() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const { navigate } = useTransitionNavigate()
  
  const [engine, setEngine] = useState<ScenarioEngine | null>(null)
  const [currentNode, setCurrentNode] = useState<ScenarioNode | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<ScenarioResult | null>(null)
  const [showIdeologyPreview, setShowIdeologyPreview] = useState(false)
  
  const engineRef = useRef<ScenarioEngine | null>(null)

  useEffect(() => {
    if (scenarioId) {
      const scenarioEngine = new ScenarioEngine(scenarioId)
      engineRef.current = scenarioEngine
      setEngine(scenarioEngine)
      setCurrentNode(scenarioEngine.getCurrentNode())
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
      const scenarioEngine = new ScenarioEngine(scenarioId)
      engineRef.current = scenarioEngine
      setEngine(scenarioEngine)
      setCurrentNode(scenarioEngine.getCurrentNode())
      setShowResult(false)
      setResult(null)
    }
  }, [scenarioId])

  if (!engine || !currentNode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">加载中...</div>
      </div>
    )
  }

  const scenario = engine.getScenario()
  const playerState = engine.getPlayerState()
  const dominantIdeologies = engine.getDominantIdeologies(3)

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {result.ending.title}
            </h1>
            <p className="text-violet-400 text-lg">
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
                <p className="text-violet-300 italic text-center">
                  「 {result.ending.characterFate} 」
                </p>
              </div>
            )}
          </GlowCard>

          <GlowCard className="mb-8 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              意识形态分析
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {Object.entries(result.ideologyScores)
                .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                .slice(0, 6)
                .map(([ideology, score]) => (
                  <div
                    key={ideology}
                    className="p-4 bg-slate-800/50 rounded-xl"
                  >
                    <div className="text-white font-medium mb-2 capitalize">
                      {ideology.replace(/-/g, ' ')}
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 rounded-full ${
                          score > 0
                            ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                            : 'bg-gradient-to-r from-red-500 to-rose-400'
                        }`}
                        style={{ width: `${Math.min(Math.abs(score) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-slate-400 mt-1">
                      {score > 0 ? '+' : ''}{(score * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
            </div>
          </GlowCard>

          <GlowCard className="mb-8 p-6">
            <h3 className="text-xl font-bold text-white mb-6">关键决策回顾</h3>
            <div className="space-y-3">
              {result.keyMoments.map((moment, index) => (
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
                  <div>
                    <div className="text-white font-medium">{moment.choice}</div>
                    <div className="text-slate-400 text-sm">{moment.impact}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlowCard>

          <div className="flex justify-center gap-4">
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
              onClick={() => navigate('/scenario')}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              返回场景列表
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  const progress = (playerState.currentPath.length / Object.keys(scenario.nodes).length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate('/scenario')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回
            </button>
            <h2 className="text-white font-bold">{scenario.title}</h2>
            <button
              onClick={() => setShowIdeologyPreview(!showIdeologyPreview)}
              className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="hidden sm:inline">意识形态倾向</span>
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
        {showIdeologyPreview && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-20 z-40 max-w-4xl mx-auto px-6 mb-4"
          >
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl p-4 border border-slate-700">
              <div className="flex flex-wrap gap-3">
                {dominantIdeologies.map(({ id, score }) => (
                  <span
                    key={id}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      score > 0
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {id.replace(/-/g, ' ')}: {score > 0 ? '+' : ''}{score.toFixed(1)}
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
                  {currentNode.location && <span>· {currentNode.location}</span>}
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
          <p>已做出 {playerState.decisionHistory.length} 个决策</p>
        </div>
      </div>
    </div>
  )
}
