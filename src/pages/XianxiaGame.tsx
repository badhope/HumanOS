import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import {
  Home,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Zap,
  Heart,
  Shield,
  Brain,
  Sparkles,
  ChevronUp,
  Scroll,
  Sword,
  X,
  Clock,
  BookOpen,
  HelpCircle,
} from 'lucide-react'
import { GlowCard } from '@components/animations'
import type { CultivationState } from '@data/simulations/xianxia'
import {
  createInitialState,
  executeCultivationTick,
  attemptBreakthrough,
  calculateCultivationSpeed,
  REALM_CONFIGS,
} from '@data/simulations/xianxia'
import XianxiaHelpCenter from '@components/xianxia/XianxiaHelpCenter'

const AUTO_SAVE_KEY = 'xianxia-autosave'

export default function XianxiaGame() {
  const { navigate } = useTransitionNavigate()
  const [gameState, setGameState] = useState<CultivationState | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameSpeed, setGameSpeed] = useState(1)
  const [showBreakthroughModal, setShowBreakthroughModal] = useState(false)
  const [showLogs, setShowLogs] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'warning' | 'danger' | 'info'
  } | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault()
        setShowHelp(prev => !prev)
      }
      if (e.key === ' ' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        setIsPlaying(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const loopRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(0)

  useEffect(() => {
    const saved = localStorage.getItem(AUTO_SAVE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.day) {
          setGameState(parsed)
          showNotification('检测到存档，已自动恢复', 'info')
          return
        }
      } catch (e) {}
    }
    setGameState(createInitialState('修真者'))
  }, [])

  useEffect(() => {
    if (gameState && gameState.day % 100 === 0) {
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(gameState))
    }
  }, [gameState?.day])

  useEffect(() => {
    if (!isPlaying || !gameState) {
      if (loopRef.current) {
        cancelAnimationFrame(loopRef.current)
        loopRef.current = null
      }
      return
    }

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastTickRef.current >= 100 / gameSpeed) {
        setGameState((prev) => {
          if (!prev) return prev
          return executeCultivationTick(prev)
        })
        lastTickRef.current = timestamp
      }
      loopRef.current = requestAnimationFrame(gameLoop)
    }

    loopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (loopRef.current) {
        cancelAnimationFrame(loopRef.current)
      }
    }
  }, [isPlaying, gameSpeed, gameState])

  const showNotification = useCallback((message: string, type: 'success' | 'warning' | 'danger' | 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }, [])

  const handleBreakthrough = useCallback(() => {
    if (!gameState) return

    const result = attemptBreakthrough(gameState)
    if (result.success) {
      setGameState(result.newState)
      showNotification(`🎉 成功突破至 ${REALM_CONFIGS[result.newState.cultivation.realm].name}！`, 'success')
    } else {
      showNotification(result.message, 'warning')
    }
    setShowBreakthroughModal(false)
  }, [gameState, showNotification])

  const handleRestart = useCallback(() => {
    if (confirm('确定要重新开始吗？当前进度将会丢失。')) {
      localStorage.removeItem(AUTO_SAVE_KEY)
      setGameState(createInitialState('修真者'))
      showNotification('已重新开始修仙之旅', 'info')
    }
  }, [showNotification])

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-3">
          <Sparkles className="w-6 h-6 animate-pulse text-purple-400" />
          正在初始化修仙世界...
        </div>
      </div>
    )
  }

  const realmConfig = REALM_CONFIGS[gameState.cultivation.realm]
  const cultivationSpeed = calculateCultivationSpeed(gameState)
  const realmIcons: Record<string, string> = {
    mortal: '👤',
    qi_refining_1: '🌬️', qi_refining_2: '🌬️', qi_refining_3: '🌬️',
    qi_refining_4: '🌬️', qi_refining_5: '🌬️', qi_refining_6: '🌬️',
    qi_refining_7: '🌬️', qi_refining_8: '🌬️', qi_refining_9: '🌬️',
    foundation_early: '🏔️', foundation_mid: '🏔️', foundation_late: '🏔️', foundation_perfect: '🏔️',
    golden_core_early: '💎', golden_core_mid: '💎', golden_core_late: '💎', golden_core_perfect: '💎',
    nascent_soul_early: '👶', nascent_soul_mid: '👶', nascent_soul_late: '👶', nascent_soul_perfect: '👶',
    soul_fusion_early: '🔮', soul_fusion_mid: '🔮', soul_fusion_late: '🔮', soul_fusion_perfect: '🔮',
    body_tribulation_early: '⚡', body_tribulation_mid: '⚡', body_tribulation_late: '⚡', body_tribulation_perfect: '⚡',
    void_refining_early: '🌫️', void_refining_mid: '🌫️', void_refining_late: '🌫️', void_refining_perfect: '🌫️',
    dao_integration_early: '🧘', dao_integration_mid: '🧘', dao_integration_late: '🧘', dao_integration_perfect: '🧘',
    true_immortal: '🌟', mystic_immortal: '🌟', celestial_immortal: '🌟', dao_immortal: '🌟',
    world_ancestor: '🐉'
  }
  const itemIcons: Record<string, string> = {
    spirit_stone: '💎',
    pill: '💊',
    weapon: '⚔️',
    armor: '🛡️',
    artifact: '🏺',
    technique: '📜',
  }
  const notificationColors = {
    success: 'bg-emerald-500/90',
    warning: 'bg-amber-500/90',
    danger: 'bg-red-500/90',
    info: 'bg-blue-500/90',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <XianxiaHelpCenter isOpen={showHelp} onClose={() => setShowHelp(false)} />
      
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl ${notificationColors[notification.type]} text-white font-medium shadow-2xl`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => navigate('/simulation/xianxia')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            返回修真界
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-300">
              <Clock className="w-5 h-5" />
              <span className="font-mono">第 {gameState.day} 天</span>
            </div>
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              F1 帮助
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 mb-4">
            <span className="text-2xl">{realmIcons[gameState.cultivation.realm] || '☯️'}</span>
            <span className="text-purple-300 font-bold text-lg">{realmConfig.name}</span>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>修炼进度</span>
              <span>{Math.round(gameState.cultivation.progress * 100)}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, gameState.cultivation.progress * 100)}%` }}
              />
            </div>
            {gameState.cultivation.bottleneck && (
              <div className="mt-2 text-amber-400 text-sm flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                陷入瓶颈中...等待顿悟
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Zap, label: '灵力', value: gameState.attributes.current_spirit, max: gameState.attributes.max_spirit, color: 'text-blue-400' },
            { icon: Heart, label: '寿元', value: Math.round(gameState.vitals.lifespan - gameState.vitals.age), max: gameState.vitals.lifespan, color: 'text-red-400' },
            { icon: Brain, label: '悟性', value: gameState.attributes.comprehension, max: 200, color: 'text-purple-400' },
            { icon: Shield, label: '战力', value: gameState.attributes.combat_power, max: 10000, color: 'text-amber-400' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <GlowCard className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-slate-400 text-sm">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                    <span className="text-slate-500 text-sm font-normal">/{stat.max}</span>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="GlowCard rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 ${
                isPlaying
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600'
              }`}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              {isPlaying ? '暂停修炼' : '开始修炼'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setGameState(executeCultivationTick(gameState))
              }}
              disabled={isPlaying}
              className="px-6 py-4 rounded-xl bg-slate-700 text-white font-bold flex items-center gap-2 hover:bg-slate-600 disabled:opacity-50"
            >
              <SkipForward className="w-5 h-5" />
              下一步
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBreakthroughModal(true)}
              disabled={isPlaying}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold flex items-center gap-2 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50"
            >
              <ChevronUp className="w-5 h-5" />
              尝试突破
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="px-6 py-4 rounded-xl bg-slate-700 text-white font-bold flex items-center gap-2 hover:bg-slate-600"
            >
              <RotateCcw className="w-5 h-5" />
              重新开始
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="text-slate-400 text-sm">修炼速度：</span>
            {[1, 2, 5, 10].map((speed) => (
              <button
                key={speed}
                onClick={() => setGameSpeed(speed)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  gameSpeed === speed
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                ×{speed}
              </button>
            ))}
            <span className="text-purple-400 text-sm ml-4">
              当前效率：×{cultivationSpeed.toFixed(2)}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          <GlowCard className="p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              修炼功法
            </h3>
            <div className="space-y-3">
              {gameState.techniques.map((tech) => (
                <div
                  key={tech.id}
                  className={`p-3 rounded-xl border ${
                    tech.id === gameState.activeTechniqueId
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-700 bg-slate-800/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{tech.name}</span>
                    <span className="text-slate-400 text-sm">
                      精通 {Math.round(tech.mastery)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard className="p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Scroll className="w-5 h-5 text-emerald-400" />
              持有物品
            </h3>
            <div className="space-y-2">
              {gameState.inventory.length === 0 ? (
                <p className="text-slate-500 text-sm">背包空空如也</p>
              ) : (
                gameState.inventory.slice(0, 8).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50"
                  >
                    <span>{itemIcons[item.type] || '📦'}</span>
                    <span className="text-white text-sm">{item.name}</span>
                    <span className="text-slate-500 text-xs ml-auto">×{item.quantity}</span>
                  </div>
                ))
              )}
            </div>
          </GlowCard>

          <GlowCard className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Sword className="w-5 h-5 text-amber-400" />
                修炼日志
              </h3>
              <button
                onClick={() => setShowLogs(!showLogs)}
                className="text-slate-400 hover:text-white text-sm"
              >
                {showLogs ? '收起' : '展开'}
              </button>
            </div>
            <div className={`space-y-2 overflow-hidden transition-all ${showLogs ? 'max-h-96' : 'max-h-48'} overflow-y-auto`}>
              {gameState.history.slice(-20).reverse().map((log, i) => (
                <div key={i} className="text-sm border-l-2 border-slate-700 pl-3 py-1">
                  <div className="text-slate-500 text-xs">第 {log.day} 天</div>
                  <div className="text-slate-300">
                    {log.message}
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </motion.div>
      </div>

      <AnimatePresence>
        {showBreakthroughModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBreakthroughModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-2xl border border-purple-500/30 p-8 max-w-md w-full text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center mx-auto mb-6">
                <ChevronUp className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">突破境界</h2>
              <p className="text-slate-400 mb-6">
                准备好冲击下一境界了吗？
                <br />
                突破失败可能会损伤道基！
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowBreakthroughModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl bg-slate-700 text-white font-bold hover:bg-slate-600"
                >
                  再等等
                </button>
                <button
                  onClick={handleBreakthrough}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold hover:from-purple-600 hover:to-violet-600"
                >
                  破！
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
