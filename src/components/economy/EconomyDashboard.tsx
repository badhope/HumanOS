import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, ChevronDown, TrendingUp, TrendingDown, Coins, Users, Building2, BarChart3, Settings, ShoppingCart, Activity, AlertTriangle, Trophy, Skull, Home, Printer, Globe, Info, Save, HelpCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend, BarChart, Bar, CartesianGrid } from 'recharts'
import type { EconomyState, TradeOrder, Country, CountryId } from '@data/simulations/market-economy/types'
import type { WorldEvent, SectorBreakdown } from '@data/simulations/market-economy/vic3-types'
import { createInitialEconomyState } from '@data/simulations/market-economy/initial-data'
import { calculateSectorBreakdown, formatSectorName } from '@data/simulations/market-economy/sector-breakdown'
import { getAllCountries, getCountry } from '@data/simulations/market-economy/countries'
import {
  executeEconomyTick,
  executeTradeOrder,
  adjustTaxRate,
  adjustSubsidy,
  issueDebt,
  repayDebt,
  printMoney,
  toggleBuilding,
  hireWorkers,
  fireWorkers,
  demolishBuilding,
  resetGame,
  togglePolicy,
  checkAndTriggerEvents,
  applyEventOption,
  preRunHistory,
} from '@data/simulations/market-economy/economy-engine'
import { investInIndustry, adjustIndustryRegulation } from '@data/simulations/market-economy/industry-system'
import {
  saveGame,
  autoSave,
  loadGame,
  getLatestSave,
  getAllSaveSlots,
  hasAutosave,
  type GameSave,
} from '@data/simulations/market-economy/game-save'
import {
  TUTORIAL_CHOICES,
  FULL_TUTORIAL_STEPS,
  QUICK_TUTORIAL_STEPS,
  type TutorialStep,
} from '@data/simulations/market-economy/tutorial-system'
import {
  CORE_QUESTS,
  checkQuestProgress,
  getCurrentHint,
  type Quest,
} from '@data/simulations/market-economy/quest-system'
import { formatLargeNumber, formatPercent, formatMoney as formatMoneyStandard, formatGDP, formatPopulation } from '@data/simulations/market-economy/data-formatting'
import { useGameEngine, getComputeStatusInfo, gameEngine } from '@services/gameEngineClient'
import SaveMenu from '@components/ui/SaveMenu'
import StatTooltip from '@components/ui/StatTooltip'
import AreaHelpTooltip from '@components/ui/AreaHelpTooltip'
import GameHelpCenter from '@components/economy/GameHelpCenter'
import { ECONOMY_METRICS } from '@data/economy-metrics'
import AchievementPanel, { AchievementNotificationPopup } from '@components/economy/AchievementPanel'
import {
  initAchievementState,
  checkAchievements,
  applyAchievementReward,
  type AchievementState,
  type Achievement,
} from '@data/simulations/market-economy/achievement-system'
import {
  getDifficultyList,
  type DifficultyLevel,
  type DifficultyConfig,
} from '@data/simulations/market-economy/difficulty-system'

const SPEEDS = [1, 2, 5, 10]
const POP_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function EconomyDashboard() {
  // =============================================================================
  //  Phase 3: 默认启用后端计算引擎
  //  启动时自动检查后端健康状态
  // =============================================================================
  const { executeTick, stats } = useGameEngine()
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    (async () => {
      await gameEngine.checkBackendHealth()
      setEngineReady(true)
    })()
  }, [])

  const [state, setState] = useState<EconomyState>(() => preRunHistory(createInitialEconomyState('china'), 365))
  const [isPaused, setIsPaused] = useState(true)
  const [speedIndex, setSpeedIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview'>('overview')
  const [openPanel, setOpenPanel] = useState<'treasury' | 'policies' | 'industry' | 'population' | 'interestGroups' | 'market' | 'diplomacy' | 'news' | 'events' | null>(null)
  const [tradeOrders, setTradeOrders] = useState<TradeOrder[]>([])
  const [newOrder, setNewOrder] = useState<{ commodityId: string; type: 'buy' | 'sell'; amount: number } | null>(null)
  const [screen, setScreen] = useState<'start' | 'countrySelect' | 'tutorialChoice' | 'game'>('start')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('normal')
  const difficultyList = getDifficultyList()
  const [activeEvent, setActiveEvent] = useState<WorldEvent | null>(null)
  const [eventLog, setEventLog] = useState<{ event: WorldEvent; day: number; optionSelected: number }[]>([])
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string
    message: string
    onConfirm: () => void
    danger?: boolean
  } | null>(null)
  const [showSaveMenu, setShowSaveMenu] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'warning' | 'error' | 'info'
  } | null>(null)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autosaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'warning' | 'error' | 'info', duration = 2500) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    setToast({ message, type })
    toastTimeoutRef.current = setTimeout(() => setToast(null), duration)
  }, [])

  const [tutorialChoice, setTutorialChoice] = useState<'full' | 'quick' | 'skip' | null>(null)
  const [tutorialStep, setTutorialStep] = useState<number>(0)
  const [showTutorialModal, setShowTutorialModal] = useState(false)
  const [currentTutorialStep, setCurrentTutorialStep] = useState<TutorialStep | null>(null)

  const [achievementState, setAchievementState] = useState<AchievementState>(initAchievementState)
  const [showAchievementPanel, setShowAchievementPanel] = useState(false)
  const [popupAchievement, setPopupAchievement] = useState<Achievement | null>(null)
  const prevStateRef = useRef<EconomyState>(state)

  const [completedQuests, setCompletedQuests] = useState<Set<string>>(new Set())
  const [showQuestPanel, setShowQuestPanel] = useState(false)
  const [newQuestCompleted, setNewQuestCompleted] = useState<Quest | null>(null)
  const [showHelpCenter, setShowHelpCenter] = useState(false)

  const questProgress = useMemo(() => {
    if (!state || screen !== 'game') return null
    return checkQuestProgress(state, completedQuests)
  }, [state, completedQuests, screen])

  const currentHint = useMemo(() => {
    if (!state || screen !== 'game') return ''
    return getCurrentHint(state)
  }, [state, screen])

  useEffect(() => {
    if (!questProgress?.completed.length) return

    questProgress.completed.forEach(quest => {
      setCompletedQuests(prev => new Set([...prev, quest.id]))
      setNewQuestCompleted(quest)
      showToast(`✅ 任务完成：${quest.title}`, 'success', 4000)
    })

    setTimeout(() => setNewQuestCompleted(null), 4000)
  }, [questProgress?.completed, showToast])

  const handleDismissAchievementNotification = useCallback((id: string) => {
    setAchievementState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n !== id)
    }))
  }, [])

  const handleTutorialChoice = useCallback((choice: 'full' | 'quick' | 'skip') => {
    setTutorialChoice(choice)
    if (choice === 'skip') {
      setScreen('game')
      setIsPaused(true)
      showToast('🚀 教程已跳过，祝您政运昌隆！', 'info', 2000)
    } else {
      setScreen('game')
      setIsPaused(true)
      setTutorialStep(0)
      setShowTutorialModal(true)
      const steps = choice === 'full' ? FULL_TUTORIAL_STEPS : QUICK_TUTORIAL_STEPS
      setCurrentTutorialStep(steps[0])
    }
  }, [showToast])

  const handleNextTutorialStep = useCallback(() => {
    const steps = tutorialChoice === 'full' ? FULL_TUTORIAL_STEPS : QUICK_TUTORIAL_STEPS
    if (tutorialStep < steps.length - 1) {
      const nextStep = tutorialStep + 1
      setTutorialStep(nextStep)
      setCurrentTutorialStep(steps[nextStep])
    } else {
      setShowTutorialModal(false)
      setCurrentTutorialStep(null)
      showToast('🎉 教程完成！开始您的治国之路吧！', 'success', 3000)
    }
  }, [tutorialChoice, tutorialStep, showToast])

  const handleSkipTutorial = useCallback(() => {
    setShowTutorialModal(false)
    setCurrentTutorialStep(null)
    showToast('📚 教程已跳过', 'info', 1500)
  }, [showToast])

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  // =============================================================================
  //  主游戏循环 - Phase 3: 默认使用后端计算
  //  自动降级：后端失败时无缝切回前端计算
  // =============================================================================
  useEffect(() => {
    if (isPaused || state.gameStatus !== 'running') return
    if (activeEvent) return

    const interval = setInterval(async () => {
      try {
        const result = await executeTick(state, SPEEDS[speedIndex])
        
        setState(prev => {
          let newState = result.state
          
          const { newState: stateAfterCheck, triggeredEvent } = checkAndTriggerEvents(newState)
          newState = stateAfterCheck
          
          if (triggeredEvent) {
            setActiveEvent(triggeredEvent)
            setIsPaused(true)
          }
          
          const { newState: newAchievementState, unlockedAchievements } = checkAchievements(
            newState,
            prevStateRef.current,
            achievementState
          )
          
          if (unlockedAchievements.length > 0) {
            setAchievementState(newAchievementState)
            unlockedAchievements.forEach(achievement => {
              newState = applyAchievementReward(newState, achievement)
              setPopupAchievement(achievement)
            })
          }
          
          prevStateRef.current = newState
          return newState
        })
        
      } catch (e) {
        console.warn('[引擎] 后端计算失败，降级到前端:', e)
        setState(prev => {
          let newState = prev
          for (let i = 0; i < SPEEDS[speedIndex]; i++) {
            newState = executeEconomyTick(newState)
            
            const { newState: stateAfterCheck, triggeredEvent } = checkAndTriggerEvents(newState)
            newState = stateAfterCheck
            
            if (triggeredEvent) {
              setActiveEvent(triggeredEvent)
              setIsPaused(true)
            }
          }
          return newState
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, state, state.gameStatus, speedIndex, activeEvent, executeTick, achievementState])

  const handleTick = useCallback(async () => {
    try {
      const result = await executeTick(state, 1)
      setState(result.state)
    } catch {
      setState(prev => executeEconomyTick(prev))
    }
  }, [executeTick, state])

  const handleReset = useCallback(() => {
    setState(resetGame(state, () => preRunHistory(createInitialEconomyState('china'), 365)))
    setTradeOrders([])
    setScreen('start')
    setSelectedCountry(null)
    setIsPaused(true)
  }, [state])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen !== 'game') return
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'SELECT') return
      
      switch(e.code) {
        case 'Escape':
          e.preventDefault()
          if (showSaveMenu) {
            setShowSaveMenu(false)
          } else if (openPanel) {
            setOpenPanel(null)
            showToast('📤 已关闭面板', 'info', 1000)
          } else if (activeEvent) {
            setActiveEvent(null)
          } else {
            setIsPaused(prevPaused => {
              showToast(!prevPaused ? '⏸️ 游戏暂停' : '▶️ 游戏继续', 'info', 1500)
              return !prevPaused
            })
          }
          break
        case 'Space':
          e.preventDefault()
          setIsPaused(prevPaused => {
            const newPaused = !prevPaused
            showToast(newPaused ? '⏸️ 游戏暂停' : '▶️ 游戏继续', 'info', 1500)
            return newPaused
          })
          break
        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4': {
          e.preventDefault()
          const speed = Number(e.code.replace('Digit', ''))
          if (speed <= SPEEDS.length) {
            setSpeedIndex(speed - 1)
            showToast(`⚡ 速度: ${SPEEDS[speed - 1]}倍速`, 'info', 1500)
          }
          break
        }
        case 'KeyS':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            saveGame(state, 1)
            showToast('💾 游戏已保存到存档1', 'success', 1500)
          }
          break
        case 'KeyL':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            const saved = loadGame(1)
            if (saved) {
              setState(saved)
              showToast('📂 从存档1读取成功', 'success', 1500)
            } else {
              showToast('❌ 没有找到存档', 'warning', 1500)
            }
          }
          break
        case 'KeyM':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            setShowSaveMenu(prev => !prev)
          }
          break
        case 'F1':
          e.preventDefault()
          setShowHelpCenter(prev => !prev)
          showToast('📚 帮助中心已打开', 'info', 1500)
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [screen, showToast, state, showSaveMenu, activeEvent, setState, openPanel])

  useEffect(() => {
    if (screen !== 'game') return

    autosaveTimerRef.current = setInterval(() => {
      if (!isPaused && state.gameStatus === 'running') {
        autoSave(state)
      }
    }, 60000)

    return () => {
      if (autosaveTimerRef.current) {
        clearInterval(autosaveTimerRef.current)
      }
    }
  }, [screen, isPaused, state])

  const handleSelectCountry = useCallback((country: Country) => {
    setSelectedCountry(country)
  }, [])

  const handleStartGame = useCallback(() => {
    if (!selectedCountry) return
    const initialState = preRunHistory(createInitialEconomyState(selectedCountry.id as CountryId, selectedDifficulty), 365)
    setState(initialState)
    setScreen('tutorialChoice')
    setIsPaused(true)
  }, [selectedCountry, selectedDifficulty])

  const handleCreateOrder = useCallback(() => {
    if (!newOrder) return
    
    const order: TradeOrder = {
      id: `order_${Date.now()}`,
      commodityId: newOrder.commodityId,
      type: newOrder.type,
      amount: newOrder.amount,
      price: state.market[newOrder.commodityId].price,
      filled: 0,
      status: 'pending',
      dayCreated: state.day,
    }
    
    setTradeOrders(prev => [...prev, order])
    const { newState } = executeTradeOrder(state, order)
    setState(newState)
    setNewOrder(null)
  }, [newOrder, state])

  const historyChartData = useMemo(() => {
    if (!state.history || state.history.length === 0) return []
    return state.history.slice(-180).map((h, i) => ({
      day: h.day,
      gdp: Math.round(h.gdp),
      inflation: Math.round(h.inflation * 10) / 10,
      unemployment: Math.round(h.unemployment * 10) / 10,
      treasury: Math.round(h.treasury),
      stability: Math.round(h.stability),
      population: Math.round(h.population / 1000),
    }))
  }, [state.history])

  const popPieData = useMemo(() => {
    return state.pops.map((p, i) => ({
      name: p.name,
      value: Math.round(p.size),
      color: POP_COLORS[i % POP_COLORS.length],
    }))
  }, [state.pops])

  const sectorBreakdown = useMemo(() => {
    return calculateSectorBreakdown(state)
  }, [state])

  const sectorChartData = useMemo(() => {
    return [
      { name: '第一产业', value: Math.round(sectorBreakdown.primary.totalOutput / 1000), color: '#22c55e' },
      { name: '第二产业', value: Math.round(sectorBreakdown.secondary.totalOutput / 1000), color: '#3b82f6' },
      { name: '第三产业', value: Math.round(sectorBreakdown.tertiary.totalOutput / 1000), color: '#a855f7' },
    ]
  }, [sectorBreakdown])

  const priceChartData = useMemo(() => {
    const data: any[] = []
    const maxPoints = 30
    
    for (let i = 0; i < maxPoints; i++) {
      const point: any = { day: i + 1 }
      Object.keys(state.commodities).slice(0, 4).forEach(id => {
        const history = state.market[id]?.priceHistory
        point[id] = history?.[i] || state.commodities[id].basePrice
      })
      data.push(point)
    }
    return data
  }, [state.market, state.commodities])

  const earlyWarnings = useMemo(() => {
    const warnings: string[] = []
    if (state.treasury.debt / Math.max(1, state.stats.gdp) > 2) warnings.push('债务/GDP比率过高')
    if (state.stats.inflation > 20) warnings.push('通胀失控')
    if (state.stats.unemployment > 25) warnings.push('大规模失业')
    if (state.stats.stability < 25) warnings.push('稳定性危机')
    if ((state.market['grain']?.stock || 0) < 500) warnings.push('粮食储备不足')
    if (state.treasury.gold < 100) warnings.push('国库即将枯竭')
    return warnings
  }, [state])

  const tabIcon = {
    overview: <BarChart3 className="w-4 h-4" />,
    market: <Activity className="w-4 h-4" />,
    population: <Users className="w-4 h-4" />,
    industry: <Building2 className="w-4 h-4" />,
    treasury: <Coins className="w-4 h-4" />,
    policies: <Settings className="w-4 h-4" />,
    diplomacy: <Globe className="w-4 h-4" />,
    news: <Info className="w-4 h-4" />,
    events: <AlertTriangle className="w-4 h-4" />,
  }

  const formatNumber = (n: number) => n.toLocaleString('zh-CN', { maximumFractionDigits: n < 100 ? 2 : 0 })
  const formatMoney = (n: number) => `¥${formatNumber(n)}`
  const currentCountry = state.countryId ? getCountry(state.countryId) : null

  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 max-w-2xl w-full mx-4 border border-slate-700/50"
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏛️</div>
            <h1 className="text-3xl font-bold mb-2">国家经济治理</h1>
            <p className="text-slate-400">宏观经济策略模拟器</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-700/30 rounded-xl p-4">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">现实经济学模型</h3>
              <p className="text-xs text-slate-400">GDP支出法、CPI篮子、菲利普斯曲线、奥肯定律</p>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4">
              <div className="text-2xl mb-2">⚔️</div>
              <h3 className="font-semibold mb-1">5种失败结局</h3>
              <p className="text-xs text-slate-400">主权违约、恶性通胀、大饥荒、政权崩溃</p>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold mb-1">3种胜利条件</h3>
              <p className="text-xs text-slate-400">经济霸权、财政大师、稳定乐土</p>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4">
              <div className="text-2xl mb-2">🌍</div>
              <h3 className="font-semibold mb-1">10个可玩国家</h3>
              <p className="text-xs text-slate-400">每个国家拥有独特的民族精神和开局条件</p>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-400 mb-1">游戏提示</div>
                <p className="text-sm text-slate-300">
                  保持低通胀和低失业是稳定的关键。滥发货币会引发恶性通胀，
                  而过高税率会导致民众支持度下降。记住：经济学就是权衡的艺术。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {hasAutosave() && (
              <button
                onClick={() => {
                  const saved = loadGame(0, true)
                  if (saved) {
                    setState(saved)
                    setScreen('game')
                    showToast('📂 读取自动存档成功', 'success', 2000)
                  }
                }}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02]"
              >
                📂 继续游戏
              </button>
            )}
            <button
              onClick={() => setScreen('countrySelect')}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02]"
            >
              🌍 选择国家 (新游戏)
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (screen === 'tutorialChoice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="max-w-2xl w-full mx-4"
        >
          <div className="text-center mb-10">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-3xl font-bold mb-2">选择教程模式</h1>
            <p className="text-slate-400">治国不易，先了解游戏玩法</p>
          </div>

          <div className="grid gap-4 mb-8">
            {TUTORIAL_CHOICES.map((choice, index) => (
              <motion.button
                key={choice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.02, x: 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTutorialChoice(choice.id as 'full' | 'quick' | 'skip')}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  choice.recommended
                    ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border-emerald-500/50 ring-2 ring-emerald-500/30 hover:ring-emerald-500/50'
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{choice.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">{choice.title}</span>
                      {choice.recommended && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                          推荐
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{choice.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="text-center text-slate-500 text-sm">
            💡 选择教程后随时可以在游戏中按 F1 重新打开帮助
          </div>
        </motion.div>
      </div>
    )
  }

  if (screen === 'countrySelect') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white flex flex-col items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-7xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Globe className="w-8 h-8 text-emerald-400" />
              选择国家
            </h1>
            <p className="text-slate-400">每个国家都拥有独特的民族特质和开局条件</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {getAllCountries().map(country => (
              <motion.div
                key={country.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSelectCountry(country)}
                className={`bg-slate-800/50 rounded-xl p-4 border transition-all cursor-pointer ${
                  selectedCountry?.id === country.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/50'
                    : 'border-slate-700/50 hover:border-emerald-500/50'
                }`}
              >
                <div className="text-4xl mb-2">{country.flag}</div>
                <h3 className="font-semibold mb-1 text-sm">{country.name}</h3>
                <div className="text-xs text-emerald-400/80 mb-1 font-medium">{country.politicalSystem}</div>
                <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < country.difficulty ? "text-amber-400" : "text-slate-600"}>★</span>
                  ))}
                  <span className="ml-1">{['简单', '普通', '困难', '专家', '传奇'][country.difficulty - 1]}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{country.description}</p>
                {country.spirits.filter(s => s.isDebuff).length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {country.spirits.filter(s => s.isDebuff).slice(0, 2).map(spirit => (
                      <span key={spirit.id} className="text-xs px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">
                        {spirit.icon} {spirit.name}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedCountry && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50 mb-8 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl">{selectedCountry.flag}</span>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedCountry.name}</h2>
                        <p className="text-slate-400 text-sm">{selectedCountry.startingSituation}</p>
                      </div>
                    </div>

                    <div className="bg-slate-700/30 rounded-xl p-4 mb-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4" /> 初始数据
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">人口</span>
                          <span className="font-mono">{(selectedCountry.initialStats.population / 100000000).toFixed(2)} 亿</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">GDP</span>
                          <span className="font-mono">${(selectedCountry.initialStats.gdp / 1000).toFixed(0)}B</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">通胀</span>
                          <span className="font-mono">{selectedCountry.initialStats.inflation}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">失业</span>
                          <span className="font-mono">{selectedCountry.initialStats.unemployment}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <h3 className="font-semibold mb-2">独特机制</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCountry.uniqueMechanics.map((m, i) => (
                          <span key={i} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">🌟 民族精神</h3>
                    <div className="space-y-3">
                      {selectedCountry.spirits.map(spirit => (
                        <div key={spirit.id} className={`rounded-xl p-4 border ${
                          spirit.isDebuff 
                            ? 'bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-500/30' 
                            : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{spirit.icon}</span>
                            <span className={`font-semibold ${spirit.isDebuff ? 'text-red-400' : 'text-amber-400'}`}>
                              {spirit.isDebuff && '⚠️ '}{spirit.name}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mb-2">{spirit.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {spirit.effects.map((e, i) => (
                              <span key={i} className={`px-2 py-0.5 text-xs rounded ${
                                e.value > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                              }`}>
                                {e.description}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center">🎮 选择游戏难度</h3>
            <div className="grid grid-cols-5 gap-3">
              {difficultyList.map((difficulty) => (
                <motion.button
                  key={difficulty.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`p-4 rounded-xl border transition-all text-center ${
                    selectedDifficulty === difficulty.id
                      ? 'border-emerald-500 bg-emerald-500/20 ring-2 ring-emerald-500/30'
                      : 'border-slate-600/50 bg-slate-700/30 hover:border-emerald-500/50'
                  } ${difficulty.recommended ? 'ring-2 ring-amber-500/50' : ''}`}
                >
                  <div className="text-2xl mb-2">{difficulty.icon}</div>
                  <div className="font-semibold text-sm mb-1">{difficulty.name}</div>
                  {difficulty.recommended && (
                    <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">
                      推荐
                    </span>
                  )}
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{difficulty.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setScreen('start')
                setSelectedCountry(null)
              }}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors"
            >
              返回
            </button>
            <button
              onClick={handleStartGame}
              disabled={!selectedCountry}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                selectedCountry
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 transform hover:scale-[1.02]'
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
              }`}
            >
              开始游戏
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (screen !== 'game') return null

  if (state.gameStatus !== 'running') {
    const isVictory = state.gameStatus === 'victory'
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-slate-800/50 backdrop-blur rounded-2xl p-8 max-w-lg w-full mx-4 border ${
            isVictory ? 'border-emerald-500/50' : 'border-red-500/50'
          }`}
        >
          <div className="text-center mb-6">
            <div className="text-7xl mb-4">
              {isVictory ? <Trophy className="w-20 h-20 mx-auto text-amber-400" /> : <Skull className="w-20 h-20 mx-auto text-red-500" />}
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${isVictory ? 'text-emerald-400' : 'text-red-400'}`}>
              {isVictory ? '胜利！' : '游戏结束'}
            </h1>
            <div className="text-2xl font-semibold mb-2">{state.endCondition?.name}</div>
            <p className="text-slate-400">{state.endCondition?.description}</p>
          </div>

          <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
            <h3 className="font-semibold mb-3 text-center">📊 最终统计</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">执政天数</span>
                <span className="font-mono">{state.day} 天</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">最终GDP</span>
                <span className="font-mono text-emerald-400">{formatMoney(state.stats.gdp)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">最终人口</span>
                <span className="font-mono">{formatNumber(state.stats.population)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">国库黄金</span>
                <span className="font-mono text-amber-400">{formatMoney(state.treasury.gold)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              重新开始
            </button>
            <button
              onClick={() => setScreen('start')}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              返回主页
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-950 to-zinc-900 text-white">
      {earlyWarnings.length > 0 && (
        <div className="bg-red-500/20 border-b border-red-500/30 py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm font-semibold">经济警报：</span>
            {earlyWarnings.map((w, i) => (
              <span key={i} className="text-sm bg-red-500/20 px-2 py-0.5 rounded">
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <AreaHelpTooltip areaId="top-bar" position="bottom">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30 shadow-lg">
                  <span className="text-xl">{currentCountry?.flag || '🏛️'}</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight">{currentCountry?.name || '国家经济治理'}</h1>
                  <div className="text-xs text-slate-500 font-medium">
                    {state.date.year}年{state.date.month}月{state.date.day}日 · 第 {state.day} 天
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
              {(() => {
                const unreadNews = state.news.filter(n => !n.isRead).length
                return (
                  <button
                    onClick={() => setOpenPanel('news')}
                    className="relative px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-all flex items-center gap-2 border border-white/5 hover:border-white/10"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Info className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    新闻中心
                    {unreadNews > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-rose-500 rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                        {unreadNews > 9 ? '!' : unreadNews}
                      </span>
                    )}
                  </button>
                )
              })()}
              
              <button
                onClick={() => setShowAchievementPanel(true)}
                className="relative px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl text-sm transition-all border border-amber-500/20 hover:border-amber-500/40 flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                成就
                {achievementState.notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                    {achievementState.notifications.length}
                  </span>
                )}
              </button>
              
              <div className="h-8 w-px bg-white/10" />
              
              <div className="px-3 py-2 bg-white/5 rounded-xl text-sm border border-white/5">
                {(() => {
                  const info = getComputeStatusInfo()
                  return (
                    <div className={`flex items-center gap-1.5 ${info.color} font-mono text-xs`}>
                      <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      {info.label}
                    </div>
                  )
                })()}
              </div>
              
              <div className="h-8 w-px bg-white/10" />
              
              <button
                onClick={async () => {
                  if (stats.backendAvailable) {
                    gameEngine.forceFallback()
                    showToast('⚡ 已切换到本地计算模式', 'info', 2000)
                  } else {
                    await gameEngine.resetFallback()
                    showToast('☁️  已切换到云端加速模式', 'success', 2000)
                  }
                }}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs transition-all border border-white/5 hover:border-white/10 flex items-center gap-2"
                title={stats.backendAvailable ? '点击切换到本地计算' : '点击切换到云端加速'}
              >
                {stats.backendAvailable ? (
                  <>
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-400">云端</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-slate-400">本地</span>
                  </>
                )}
              </button>
              
              <div className="h-8 w-px bg-white/10" />
              
              <button
                onClick={() => setSpeedIndex(i => (i + 1) % SPEEDS.length)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-all border border-white/5 hover:border-white/10 font-mono font-bold"
              >
                {SPEEDS[speedIndex]}×
              </button>
              
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`w-10 h-10 rounded-xl transition-all shadow-lg flex items-center justify-center ${
                  isPaused 
                    ? 'bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500' 
                    : 'bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500'
                }`}
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setShowSaveMenu(true)}
                className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-yellow-600/20 hover:from-amber-500/30 hover:to-yellow-600/30 rounded-xl transition-all border border-amber-500/30 flex items-center justify-center group"
              >
                <Save className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={handleTick}
                disabled={!isPaused}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded-xl transition-all border border-white/5 flex items-center justify-center"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleReset}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <div className="h-8 w-px bg-white/10" />
              
              <button
                onClick={() => setShowHelpCenter(true)}
                className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-sky-600/20 hover:from-blue-500/30 hover:to-sky-600/30 rounded-xl transition-all border border-blue-500/30 flex items-center justify-center group"
                title="按 F1 打开帮助中心"
              >
                <HelpCircle className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            </div>
          </AreaHelpTooltip>

          <AreaHelpTooltip areaId="metrics-bar" position="bottom">
            <div className="grid grid-cols-5 gap-4 mt-4">
            <StatusMetric label="国库" value={formatMoney(state.treasury.gold)} warn={state.treasury.gold < 10000} critical={state.treasury.gold < 3000} metricId="treasury" />
            <StatusMetric label="GDP" value={formatMoney(state.stats.gdp)} metricId="gdp" />
            <StatusMetric 
              label="通胀率" 
              value={`${state.stats.inflation.toFixed(1)}%`} 
              warn={state.stats.inflation > 5} 
              critical={state.stats.inflation > 10} 
              inverse={true}
              metricId="inflation"
            />
            <StatusMetric 
              label="稳定度" 
              value={`${state.stats.stability.toFixed(0)}%`} 
              warn={state.stats.stability < 50} 
              critical={state.stats.stability < 30}
              metricId="stability"
            />
            <StatusMetric 
              label="政治点数" 
              value={state.politicalCapital.toFixed(0)}
              highlight={true}
              metricId="politicalCapital"
            >
              <span className="text-emerald-400 text-[10px] ml-1">+{state.dailyPoliticalGain}/天</span>
            </StatusMetric>
            </div>
          </AreaHelpTooltip>

          {currentHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300 text-sm">{currentHint}</span>
                </div>
                <button
                  onClick={() => setShowQuestPanel(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-emerald-400 text-sm font-medium transition-colors"
                >
                  <Trophy className="w-4 h-4" />
                  任务 {completedQuests.size}/{CORE_QUESTS.length}
                </button>
              </div>
            </motion.div>
          )}

          {questProgress?.nextMilestone && !newQuestCompleted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3"
            >
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-amber-400 text-sm font-medium">当前目标</div>
                      <div className="text-white">{questProgress.nextMilestone.title}</div>
                    </div>
                  </div>
                  {questProgress.nextMilestone.hint && (
                    <div className="text-amber-300/70 text-sm max-w-sm text-right">
                      💡 {questProgress.nextMilestone.hint}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
          {[
            { id: 'treasury', name: '财政', icon: '💰', color: 'from-amber-500/20 to-yellow-500/20', accent: 'text-amber-400', border: 'border-amber-500/30' },
            { id: 'policies', name: '政策', icon: '📜', color: 'from-emerald-500/20 to-teal-500/20', accent: 'text-emerald-400', border: 'border-emerald-500/30' },
            { id: 'industry', name: '工业', icon: '🏭', color: 'from-sky-500/20 to-blue-500/20', accent: 'text-sky-400', border: 'border-sky-500/30' },
            { id: 'population', name: '人口', icon: '👥', color: 'from-purple-500/20 to-violet-500/20', accent: 'text-purple-400', border: 'border-purple-500/30' },
            { id: 'market', name: '市场', icon: '📊', color: 'from-pink-500/20 to-rose-500/20', accent: 'text-pink-400', border: 'border-pink-500/30' },
            { id: 'diplomacy', name: '外交', icon: '🌍', color: 'from-cyan-500/20 to-teal-500/20', accent: 'text-cyan-400', border: 'border-cyan-500/30' },
            { id: 'news', name: '报纸', icon: '📰', color: 'from-orange-500/20 to-amber-500/20', accent: 'text-orange-400', border: 'border-orange-500/30' },
            { id: 'events', name: '日志', icon: '📋', color: 'from-stone-500/20 to-zinc-500/20', accent: 'text-stone-400', border: 'border-stone-500/30' },
          ].map((panel) => {
            const unreadNews = panel.id === 'news' ? state.news.filter(n => !n.isRead).length : 0
            const hasEvent = panel.id === 'events' && activeEvent
            
            return (
              <AreaHelpTooltip key={panel.id} areaId={`panel-${panel.id}`} position="top" showIcon={false}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setOpenPanel(panel.id as any)}
                  className={`relative p-4 rounded-xl bg-gradient-to-br ${panel.color} border ${panel.border} hover:shadow-lg transition-all text-center group w-full`}
                >
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{panel.icon}</div>
                  <div className={`text-xs font-bold ${panel.accent}`}>{panel.name}</div>
                  
                  {unreadNews > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-rose-500 rounded-full text-[10px] flex items-center justify-center font-bold shadow-lg text-white">
                      {unreadNews > 9 ? '!' : unreadNews}
                    </span>
                  )}
                  
                  {hasEvent && (
                    <span className="absolute -top-1 -right-1 w-5 h-5">
                      <span className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-75" />
                      <span className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full" />
                    </span>
                  )}
                </motion.button>
              </AreaHelpTooltip>
            )
          })}
        </div>

        <OverviewTab 
          state={state} 
          priceChartData={priceChartData} 
          historyChartData={historyChartData} 
          popPieData={popPieData}
          sectorBreakdown={sectorBreakdown}
          sectorChartData={sectorChartData}
          setOpenPanel={setOpenPanel}
        />
      </div>

      <AnimatePresence>
        {openPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/85 backdrop-blur-xl"
            onClick={() => setOpenPanel(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openPanel && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-20 z-50 rounded-t-3xl overflow-hidden bg-gradient-to-b from-zinc-900 to-black border-t-2 border-amber-500/30 shadow-[0_-32px_64px_rgba(0,0,0,0.8)]"
          >
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30">
                    {openPanel === 'treasury' && '💰'}
                    {openPanel === 'policies' && '📜'}
                    {openPanel === 'industry' && '🏭'}
                    {openPanel === 'population' && '👥'}
                    {openPanel === 'market' && '📊'}
                    {openPanel === 'interestGroups' && '⚖️'}
                    {openPanel === 'diplomacy' && '🌍'}
                    {openPanel === 'news' && '📰'}
                    {openPanel === 'events' && '📋'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {openPanel === 'treasury' && '财政部'}
                      {openPanel === 'policies' && '国务院政策研究室'}
                      {openPanel === 'industry' && '工业与信息化部'}
                      {openPanel === 'population' && '人口与计划生育委员会'}
                      {openPanel === 'market' && '市场监督管理总局'}
                      {openPanel === 'interestGroups' && '统一战线工作部'}
                      {openPanel === 'diplomacy' && '外交部'}
                      {openPanel === 'news' && '人民日报'}
                      {openPanel === 'events' && '机要档案'}
                    </h2>
                    <p className="text-xs text-amber-400/60 mt-0.5">按 ESC 返回总览</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenPanel(null)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-6xl mx-auto">
                  {openPanel === 'market' && <MarketTab state={state} />}
                  {openPanel === 'population' && <PopulationTab state={state} popPieData={popPieData} />}
                  {openPanel === 'industry' && (
                    <IndustryTab
                      state={state}
                      onInvest={(id, amount) => {
                        const { state: newState, success, message } = investInIndustry(state, id, amount)
                        setState(newState)
                        showToast(message, success ? 'success' : 'warning')
                      }}
                      onRegulate={(id, level) => {
                        setState(s => adjustIndustryRegulation(s, id, level))
                        showToast('监管政策已调整', 'info')
                      }}
                    />
                  )}
                  {openPanel === 'treasury' && <TreasuryTab 
                    state={state} 
                    historyChartData={historyChartData} 
                    onAdjustTax={(t, r) => setState(s => adjustTaxRate(s, t, r))} 
                    onAdjustSubsidy={(t, a) => setState(s => adjustSubsidy(s, t, a))} 
                    onIssueDebt={a => setState(s => issueDebt(s, a))} 
                    onRepayDebt={a => setState(s => repayDebt(s, a))} 
                    onPrintMoney={a => setState(s => printMoney(s, a))}
                    setConfirmDialog={setConfirmDialog}
                    showToast={showToast}
                  />}
                  {openPanel === 'policies' && <PoliciesTab 
                    state={state} 
                    onTogglePolicy={id => {
                      const result = togglePolicy(state, id)
                      setState(result.state)
                      return result
                    }}
                    setConfirmDialog={setConfirmDialog}
                    showToast={showToast}
                  />}
                  {openPanel === 'diplomacy' && <DiplomacyTab state={state} />}
                  {openPanel === 'news' && <NewsTab state={state} news={state.news} onMarkRead={id => setState(s => ({ ...s, news: s.news.map(n => n.id === id ? { ...n, isRead: true } : n) }))} />}
                  {openPanel === 'events' && (
                    <EventsTab
                      state={state}
                      eventLog={eventLog}
                      activeEvent={activeEvent}
                      setActiveEvent={setActiveEvent}
                      setState={setState}
                    />
                  )}
                  {openPanel === 'interestGroups' && (
                    <div>
                      <h3 className="text-lg font-bold mb-6 text-amber-400">五大利益集团势力平衡</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {state.interestGroups.map(group => (
                          <div key={group.id} className={`rounded-xl p-5 border-2 transition-all ${
                            group.approval > 60 
                              ? 'bg-gradient-to-br from-emerald-800/30 to-teal-900/30 border-emerald-500/40'
                              : group.approval < 30
                                ? 'bg-gradient-to-br from-rose-800/30 to-red-900/30 border-rose-500/40'
                                : 'bg-slate-800/40 border-slate-600/30'
                          }`}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-slate-700/50">
                                {group.icon}
                              </div>
                              <div>
                                <div className="font-bold text-white">{group.name}</div>
                                <div className="text-[10px] text-slate-400">
                                  {group.ideology === 'liberal' && '自由派'}
                                  {group.ideology === 'conservative' && '保守派'}
                                  {group.ideology === 'socialist' && '社会主义'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-slate-400">势力权重</span>
                                  <span className="text-amber-400 font-bold">{group.power}%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${group.power}%` }} />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-slate-400">满意度</span>
                                  <span className={`font-bold ${group.approval > 60 ? 'text-emerald-400' : group.approval < 30 ? 'text-rose-400' : 'text-slate-300'}`}>
                                    {Math.round(group.approval)}%
                                  </span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                  <div className={`h-full ${group.approval > 60 ? 'bg-emerald-500' : group.approval < 30 ? 'bg-rose-500' : 'bg-slate-500'}`} style={{ width: `${group.approval}%` }} />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-[11px] mb-1">
                                  <span className="text-slate-400">激进程度</span>
                                  <span className={`font-bold ${group.radicalism > 60 ? 'text-rose-400' : 'text-slate-300'}`}>
                                    {Math.round(group.radicalism)}%
                                  </span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                  <div className={`h-full ${group.radicalism > 60 ? 'bg-rose-500' : 'bg-slate-500'}`} style={{ width: `${group.radicalism}%` }} />
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-3 border-t border-white/10">
                              <div className="text-[10px] text-slate-500 mb-2">代表阶层：{group.members.join('、')}</div>
                              <div className="flex flex-wrap gap-1">
                                {group.supportedPolicies.slice(0, 2).map(p => (
                                  <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                                    ✓ 支持
                                  </span>
                                ))}
                                {group.opposedPolicies.slice(0, 2).map(p => (
                                  <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400">
                                    ✗ 反对
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeEvent && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && null}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, rotateX: '5deg' }}
              animate={{ scale: 1, y: 0, rotateX: '0deg' }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-zinc-900/95 to-neutral-900/95 backdrop-blur-2xl rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]"
            >
              <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-4xl border border-white/10 shadow-xl">
                    {activeEvent.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold tracking-tight">{activeEvent.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        activeEvent.severity === 'catastrophic' ? 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border border-red-500/30 animate-pulse' :
                        activeEvent.severity === 'major' ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30' : 
                        activeEvent.severity === 'positive' ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {activeEvent.severity === 'catastrophic' ? '🔥 灾难性事件' :
                         activeEvent.severity === 'major' ? '⚡ 重大事件' : 
                         activeEvent.severity === 'positive' ? '🎉 惊喜事件' : '📢 普通事件'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="bg-gradient-to-br from-white/5 to-white/2 rounded-2xl p-5 mb-6 border border-white/5">
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {getEventDescription(activeEvent)}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-bold mb-3 text-amber-400 uppercase tracking-wider">⚠️ 立即影响</div>
                  <div className="flex flex-wrap gap-2">
                    {activeEvent.effects.map((effect, i) => (
                      <div key={i} className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                        effect.value < 0 
                          ? 'bg-gradient-to-r from-red-500/15 to-rose-500/15 text-red-400 border border-red-500/20' 
                          : 'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {effect.type === 'price_shock' && `${effect.value > 0 ? '+' : ''}${(effect.value * 100).toFixed(0)}% 商品价格`}
                        {effect.type === 'supply_shock' && `${effect.value > 0 ? '+' : ''}${(effect.value * 100).toFixed(0)}% 商品供应`}
                        {effect.type === 'demand_shock' && `${effect.value > 0 ? '+' : ''}${(effect.value * 100).toFixed(0)}% 消费需求`}
                        {effect.type === 'instability' && `${effect.value > 0 ? '+' : ''}${effect.value} 稳定度`}
                        {effect.type === 'pop_approval' && `${effect.value > 0 ? '+' : ''}${effect.value} 民众支持`}
                        {effect.type === 'treasury' && `${effect.value > 0 ? '+' : ''}¥${effect.value} 国库`}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-sm font-bold mb-4 uppercase tracking-wider text-slate-400">🤔 请做出选择</div>
                <div className="space-y-3">
                  {activeEvent.options.map((option, index) => {
                    const styles = [
                      { 
                        gradient: 'from-blue-500/15 to-indigo-500/10', 
                        border: 'border-blue-500/25', 
                        hoverBorder: 'hover:border-blue-500/50', 
                        text: 'text-blue-400',
                        glow: 'hover:shadow-blue-500/10'
                      },
                      { 
                        gradient: 'from-red-500/15 to-rose-500/10', 
                        border: 'border-red-500/25', 
                        hoverBorder: 'hover:border-red-500/50', 
                        text: 'text-red-400',
                        glow: 'hover:shadow-red-500/10'
                      },
                      { 
                        gradient: 'from-amber-500/15 to-orange-500/10', 
                        border: 'border-amber-500/25', 
                        hoverBorder: 'hover:border-amber-500/50', 
                        text: 'text-amber-400',
                        glow: 'hover:shadow-amber-500/10'
                      },
                    ]
                    const style = styles[index % 3]
                    
                    return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.015, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full text-left bg-gradient-to-br ${style.gradient} border ${style.border} ${style.hoverBorder} 
                        rounded-2xl p-5 cursor-pointer transition-all hover:shadow-xl ${style.glow}`}
                      onClick={() => {
                        const newState = applyEventOption(state, activeEvent, index)
                        setState(newState)
                        setEventLog(prev => [...prev, { 
                          event: activeEvent, 
                          day: state.day, 
                          optionSelected: index 
                        }])
                        setActiveEvent(null)
                        setIsPaused(false)
                        
                        const netEffect = option.effects.reduce((sum, e) => sum + e.value, 0)
                        showToast(
                          `已选择「${option.text}」${netEffect > 0 ? '，国家运势上升！' : netEffect < 0 ? '，需要密切关注...' : ''}`,
                          netEffect > 0 ? 'success' : netEffect < 0 ? 'warning' : 'info',
                          3000
                        )
                      }}
                    >
                      <div className="font-semibold mb-3 text-white text-base">
                        <span className={`${style.text} mr-3 font-black text-lg`}>▸</span>
                        {option.text}
                      </div>
                      <div className="flex flex-wrap gap-2 ml-7">
                        {option.effects.map((effect, i) => (
                          <div key={i} className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                            effect.value > 0 
                              ? 'text-emerald-400 bg-emerald-500/15' 
                              : 'text-red-400 bg-red-500/15'
                          }`}>
                            {effect.value > 0 ? '+' : ''}{effect.value} 
                            {effect.type === 'inflation' && ' 通胀'}
                            {effect.type === 'unemployment' && ' 失业'}
                            {effect.type === 'stability' && ' 稳定'}
                            {effect.type === 'treasury' && ' 国库'}
                            {effect.type === 'debt' && ' 债务'}
                            {effect.type === 'pop_approval' && ' 支持度'}
                            {effect.type === 'bureaucracy' && ' 官僚'}
                            {effect.type === 'all_industry_productivity' && ' 生产效率'}
                          </div>
                        ))}
                      </div>
                    </motion.button>
                  )})}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showTutorialModal && currentTutorialStep && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-gradient-to-br from-zinc-900/95 to-neutral-900/95 backdrop-blur-2xl rounded-3xl max-w-lg w-full border border-emerald-500/30 shadow-[0_32px_64px_-12px_rgba(16,185,129,0.2)] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-emerald-500/15 to-teal-500/10 p-6 border-b border-emerald-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">📚</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                    {tutorialStep + 1} / {tutorialChoice === 'full' ? FULL_TUTORIAL_STEPS.length : QUICK_TUTORIAL_STEPS.length}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-emerald-400">{currentTutorialStep.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-300 mb-6 leading-relaxed whitespace-pre-line">
                  {currentTutorialStep.content}
                </p>
                
                {currentTutorialStep.highlight && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💡</span>
                      <p className="text-amber-300 text-sm leading-relaxed">
                        {currentTutorialStep.highlight}
                      </p>
                    </div>
                  </div>
                )}

                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-6">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${((tutorialStep + 1) / (tutorialChoice === 'full' ? FULL_TUTORIAL_STEPS.length : QUICK_TUTORIAL_STEPS.length)) * 100}%` }}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSkipTutorial}
                    className="px-5 py-3 bg-white/5 hover:bg-white/10 rounded-2xl font-semibold transition-all border border-white/10 hover:border-white/20 text-slate-400 hover:text-white"
                  >
                    跳过教程
                  </button>
                  <button
                    onClick={handleNextTutorialStep}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    {tutorialStep < (tutorialChoice === 'full' ? FULL_TUTORIAL_STEPS.length : QUICK_TUTORIAL_STEPS.length) - 1 ? (
                      <>下一步 →</>
                    ) : (
                      <>🎉 完成教程</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {confirmDialog && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setConfirmDialog(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
              className={`bg-gradient-to-br from-zinc-900/95 to-neutral-900/95 backdrop-blur-2xl rounded-3xl max-w-md w-full border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.7)] overflow-hidden ${
                confirmDialog.danger ? 'border-red-500/30' : 'border-white/10'
              }`}
            >
              <div className={`p-6 ${
                confirmDialog.danger 
                  ? 'bg-gradient-to-r from-red-500/15 to-rose-500/10' 
                  : 'bg-gradient-to-r from-white/5 to-white/0'
              }`}>
                <h3 className="text-xl font-bold tracking-tight">
                  {confirmDialog.danger && '⚠️ '}{confirmDialog.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-slate-300 mb-6 leading-relaxed">{confirmDialog.message}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDialog(null)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-2xl font-semibold transition-all border border-white/10 hover:border-white/20"
                  >
                    取消
                  </button>
                  <button
                    onClick={confirmDialog.onConfirm}
                    className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
                      confirmDialog.danger
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-500/20'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20'
                    }`}
                  >
                    确认执行
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 px-7 py-3.5 rounded-2xl font-semibold shadow-[0_20px_40px_-12px] backdrop-blur-xl border ${
              toast.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/30 border-emerald-400/30' :
              toast.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-500/30 border-amber-400/30' :
              toast.type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-600 shadow-red-500/30 border-red-400/30' :
              'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-blue-500/30 border-blue-400/30'
            }`}
          >
            <span className="mr-2">
              {toast.type === 'success' && '✅'}
              {toast.type === 'warning' && '⚠️'}
              {toast.type === 'error' && '❌'}
              {toast.type === 'info' && 'ℹ️'}
            </span>
            {toast.message}
          </motion.div>
        )}

        {popupAchievement && (
          <AchievementNotificationPopup
            achievement={popupAchievement}
            onClose={() => setPopupAchievement(null)}
          />
        )}

        {showAchievementPanel && (
          <AchievementPanel
            achievementState={achievementState}
            onClose={() => setShowAchievementPanel(false)}
            onDismissNotification={handleDismissAchievementNotification}
          />
        )}

        <GameHelpCenter
          isOpen={showHelpCenter}
          onClose={() => setShowHelpCenter(false)}
        />
      </AnimatePresence>

      <SaveMenu
        isOpen={showSaveMenu}
        onClose={() => setShowSaveMenu(false)}
        currentState={state}
        onLoad={(savedState) => {
          setState(savedState)
          showToast('📂 存档读取成功', 'success', 2000)
        }}
        onSave={() => showToast('💾 游戏已保存', 'success', 2000)}
      />
    </div>
  )
}

function getEventDescription(event: WorldEvent): string {
  const descriptions: { [key: string]: string } = {
    'fed_rate_hike': '美联储宣布激进加息，资本开始回流美国。新兴市场面临汇率贬值和资本外流的双重压力。你的经济政策正面临严峻考验。',
    'oil_price_shock': '中东局势紧张导致国际油价暴涨30%！能源成本飙升将推高通胀，同时恶化贸易条件。能源进口国将遭受重大损失。',
    'banking_crisis': '大型商业银行出现流动性危机！金融恐慌正在蔓延。储户开始排队取款，银行间拆借市场冻结。不及时干预可能引发系统性崩溃。',
    'supply_chain_crisis': '全球供应链严重中断！港口拥堵、集装箱短缺、芯片供应不足正在重创制造业。关键商品库存持续下降。',
    'energy_crisis': '天然气和电力价格暴涨十倍！能源危机席卷欧洲。高能耗产业被迫停产，民众抗议能源账单飙升。',
    'grain_export_ban': '主要粮食出口国宣布禁止粮食出口！全球粮食价格开始飙升。依赖进口的国家面临饥荒风险。',
    'tech_sanctions': '主要大国实施严厉技术制裁！半导体、人工智能、精密制造等高端技术被封锁，科技产业发展受阻。',
    'debt_crisis': '主权债务评级被下调！融资成本飙升，债务违约风险大幅上升。国际投资者开始恐慌性撤资。',
    'housing_bubble': '房地产泡沫破裂！房价暴跌30%，断供潮涌现，银行坏账率飙升，地方政府财政陷入困境。',
    'pandemic_outbreak': '未知病毒开始全球大流行！各国封锁边境、停工停产。全球经济陷入大萧条，医疗资源严重挤兑。',
  }
  return descriptions[event.id] || '一个重要的世界事件正在发生，需要你的及时应对。每一个选择都将影响国家的命运。'
}

function StatCard({ label, value, trend }: { label: string; value: string; trend?: 'up' | 'down' }) {
  return (
    <div className="bg-slate-800/50 rounded-lg px-3 py-2">
      <div className="text-xs text-slate-400 mb-0.5">{label}</div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm font-semibold">{value}</span>
        {trend && (
          trend === 'up' ?
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> :
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
        )}
      </div>
    </div>
  )
}

function StatusMetric({ label, value, warn, critical, inverse, highlight, metricId, children }: { 
  label: string
  value: string
  warn?: boolean
  critical?: boolean
  inverse?: boolean
  highlight?: boolean
  metricId?: keyof typeof ECONOMY_METRICS
  children?: React.ReactNode
}) {
  let gradient = 'from-emerald-500/5 to-teal-500/5'
  let textColor = 'text-emerald-400'
  let border = 'border-emerald-500/10'
  let glow = 'shadow-emerald-500/5'

  if (highlight) {
    gradient = 'from-blue-500/10 to-indigo-500/10'
    textColor = 'text-blue-400'
    border = 'border-blue-500/30'
    glow = 'shadow-blue-500/20'
  }
  
  if (inverse) {
    if (critical) {
      gradient = 'from-red-500/15 to-rose-500/10'
      textColor = 'text-red-400'
      border = 'border-red-500/30'
      glow = 'shadow-red-500/20'
    } else if (warn) {
      gradient = 'from-amber-500/10 to-orange-500/5'
      textColor = 'text-amber-400'
      border = 'border-amber-500/20'
      glow = 'shadow-amber-500/10'
    }
  } else {
    if (critical) {
      gradient = 'from-red-500/15 to-rose-500/10'
      textColor = 'text-red-400'
      border = 'border-red-500/30'
      glow = 'shadow-red-500/20'
    } else if (warn) {
      gradient = 'from-amber-500/10 to-orange-500/5'
      textColor = 'text-amber-400'
      border = 'border-amber-500/20'
      glow = 'shadow-amber-500/10'
    }
  }
  
  const metricData = metricId && ECONOMY_METRICS[metricId]
  const labelContent = metricData ? (
    <StatTooltip {...metricData}>
      <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{label}</span>
    </StatTooltip>
  ) : (
    <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{label}</div>
  )
  
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl px-6 py-4 border ${border} shadow-lg ${glow} ${critical ? 'animate-pulse' : ''} backdrop-blur-sm`}>
      {labelContent}
      <div className={`font-mono text-xl font-bold ${textColor} tracking-tight flex items-center`}>
        {value}
        {children}
      </div>
    </div>
  )
}

function OverviewTab({ state, priceChartData, historyChartData, popPieData, sectorBreakdown, sectorChartData, setOpenPanel }: { 
  state: EconomyState
  priceChartData: any[]
  historyChartData: any[]
  popPieData: any[]
  sectorBreakdown: SectorBreakdown
  sectorChartData: any[]
  setOpenPanel: (panel: any) => void
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-5 border border-blue-500/20 shadow-lg backdrop-blur-sm">
          <div className="text-[11px] text-slate-500 mb-2 font-medium uppercase tracking-wider">失业率</div>
          <div className={`font-mono text-2xl font-bold tracking-tight ${
            state.stats.unemployment > 15 ? 'text-red-400 animate-pulse' :
            state.stats.unemployment > 8 ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {state.stats.unemployment.toFixed(1)}%
          </div>
        </div>
        <div className="bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-2xl p-5 border border-rose-500/20 shadow-lg backdrop-blur-sm">
          <div className="text-[11px] text-slate-500 mb-2 font-medium uppercase tracking-wider">负债率</div>
          <div className={`font-mono text-2xl font-bold tracking-tight ${
            state.treasury.debt > state.stats.gdp ? 'text-red-400 animate-pulse' :
            state.treasury.debt > state.stats.gdp * 0.6 ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {((state.treasury.debt / Math.max(1, state.stats.gdp)) * 100).toFixed(0)}%
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-amber-500/20 shadow-lg backdrop-blur-sm">
          <div className="text-[11px] text-slate-500 mb-2 font-medium uppercase tracking-wider">基准利率</div>
          <div className={`font-mono text-2xl font-bold tracking-tight ${
            state.treasury.interestRate > 0.15 ? 'text-red-400 animate-pulse' :
            state.treasury.interestRate > 0.08 ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {(state.treasury.interestRate * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {state.nationalSpirits.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-amber-400">
            🌟 民族精神
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {state.nationalSpirits.map(spirit => (
              <div key={spirit.id} className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{spirit.icon}</span>
                  <span className="font-semibold text-sm">{spirit.name}</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{spirit.description}</p>
                <div className="flex flex-wrap gap-1">
                  {spirit.effects.map((e, i) => (
                    <span key={i} className={`px-1.5 py-0.5 text-xs rounded ${
                      e.value > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {e.description}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 shadow-lg backdrop-blur-sm">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            GDP趋势
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyChartData}>
                <defs>
                  <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="rgba(255,255,255,0.2)" />
                <YAxis tick={{ fontSize: 11 }} stroke="rgba(255,255,255,0.2)" />
                <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="gdp" stroke="#10b981" strokeWidth={2} fill="url(#colorGdp)" name="GDP" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 shadow-lg backdrop-blur-sm">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            通胀与失业
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#475569" />
                <YAxis tick={{ fontSize: 10 }} stroke="#475569" />
                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="inflation" stroke="#ef4444" name="通胀率%" dot={false} />
                <Line type="monotone" dataKey="unemployment" stroke="#f59e0b" name="失业率%" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div 
          onClick={() => setOpenPanel('population')}
          className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-5 border border-blue-500/20 cursor-pointer hover:border-blue-500/40 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-blue-400">
              <Users className="w-4 h-4" />
              人口结构
            </h3>
            <span className="text-[10px] text-slate-500 group-hover:text-blue-400 transition-colors">点击查看 →</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {popPieData.slice(0, 4).map((p: any, i: number) => (
              <div key={i} className="text-center">
                <div className="font-mono font-bold text-sm">{((p.value / popPieData.reduce((a: number, b: any) => a + b.value, 0)) * 100).toFixed(0)}%</div>
                <div className="text-[10px] text-slate-500">{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div 
          onClick={() => setOpenPanel('industry')}
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-5 border border-emerald-500/20 cursor-pointer hover:border-emerald-500/40 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-400">
              <Building2 className="w-4 h-4" />
              三大产业
            </h3>
            <span className="text-[10px] text-slate-500 group-hover:text-emerald-400 transition-colors">点击查看 →</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {sectorChartData.map((s: any, i: number) => (
              <div key={i} className="text-center">
                <div className="font-mono font-bold text-sm">{((s.value / sectorChartData.reduce((a: number, b: any) => a + b.value, 0)) * 100).toFixed(0)}%</div>
                <div className="text-[10px] text-slate-500">{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div 
          onClick={() => setOpenPanel('interestGroups')}
          className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl p-5 border border-violet-500/20 cursor-pointer hover:border-violet-500/40 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-violet-400">
              ⚖️
              利益集团
            </h3>
            <span className="text-[10px] text-slate-500 group-hover:text-violet-400 transition-colors">点击查看 →</span>
          </div>
          <div className="space-y-1.5">
            {state.interestGroups.slice(0, 4).map((g, i) => (
              <div key={i} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{g.icon} {g.name}</span>
                <span className={`font-mono font-bold ${g.approval > 60 ? 'text-emerald-400' : g.approval < 30 ? 'text-rose-400' : 'text-slate-300'}`}>
                  {Math.round(g.approval)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div 
          onClick={() => setOpenPanel('market')}
          className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-5 border border-pink-500/20 cursor-pointer hover:border-pink-500/40 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-pink-400">
              <TrendingUp className="w-4 h-4" />
              市场行情
            </h3>
            <span className="text-[10px] text-slate-500 group-hover:text-pink-400 transition-colors">点击查看 →</span>
          </div>
          <div className="space-y-1.5">
            {Object.entries(state.market).slice(0, 4).map(([id, data]: [string, any], i) => (
              <div key={i} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{state.commodities[id]?.name || id}</span>
                <span className={`font-mono font-bold ${data.priceTrend === 'rising' ? 'text-rose-400' : data.priceTrend === 'falling' ? 'text-emerald-400' : 'text-slate-300'}`}>
                  ¥{data.price.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div 
          onClick={() => setOpenPanel('treasury')}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-5 border border-amber-500/20 cursor-pointer hover:border-amber-500/40 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-amber-400">
              <Coins className="w-4 h-4" />
              财政收支
            </h3>
            <span className="text-[10px] text-slate-500 group-hover:text-amber-400 transition-colors">点击查看 →</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">日收入</span>
              <span className="font-mono font-bold text-emerald-400">+¥{formatMoney(state.treasury.income)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">日支出</span>
              <span className="font-mono font-bold text-rose-400">-¥{formatMoney(state.treasury.expenses)}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-white/5">
              <span className="text-[11px] text-slate-400">净收支</span>
              <span className={`font-mono font-bold ${state.treasury.balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {state.treasury.balance >= 0 ? '+' : ''}¥{formatMoney(state.treasury.balance)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 产业细分产出柱形图 */}
      <div className="bg-slate-800/30 rounded-xl p-5">
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-400" />
          产业细分产出
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: '农业', value: sectorBreakdown.primary.agriculture / 1000, fill: '#22c55e' },
                { name: '采矿', value: sectorBreakdown.primary.mining / 1000, fill: '#84cc16' },
                { name: '能源', value: sectorBreakdown.primary.energy / 1000, fill: '#eab308' },
                { name: '重工', value: sectorBreakdown.secondary.heavyIndustry / 1000, fill: '#3b82f6' },
                { name: '轻工', value: sectorBreakdown.secondary.lightIndustry / 1000, fill: '#0ea5e9' },
                { name: '制造', value: sectorBreakdown.secondary.manufacturing / 1000, fill: '#06b6d4' },
                { name: '金融', value: sectorBreakdown.tertiary.finance / 1000, fill: '#a855f7' },
                { name: '零售', value: sectorBreakdown.tertiary.retail / 1000, fill: '#ec4899' },
                { name: '服务', value: sectorBreakdown.tertiary.services / 1000, fill: '#f43f5e' },
              ]}
              layout="vertical"
              margin={{ left: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="#475569" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="#475569" width={45} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} formatter={(value: number) => [`¥${formatNumber(value * 1000000000)}`, '产出']} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {[
                { name: '农业', value: sectorBreakdown.primary.agriculture, color: '#22c55e' },
                { name: '采矿', value: sectorBreakdown.primary.mining, color: '#84cc16' },
                { name: '能源', value: sectorBreakdown.primary.energy, color: '#eab308' },
                ].map((color, i) => (
                  <Cell key={i} fill={[
                    '#22c55e', '#84cc16', '#eab308',
                    '#3b82f6', '#0ea5e9', '#06b6d4',
                    '#a855f7', '#ec4899', '#f43f5e'
                  ][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          稳定度与国库历史
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#475569" />
              <YAxis tick={{ fontSize: 10 }} stroke="#475569" />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="stability" stroke="#3b82f6" name="稳定度" dot={false} />
              <Line type="monotone" dataKey="treasury" stroke="#f59e0b" name="财政余额" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function MarketTab({ state }: { state: EconomyState }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(state.commodities).map(([id, comm]) => {
        const m = state.market[id]
        const ratio = m.demand / m.supply
        return (
          <div key={id} className="bg-slate-800/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{comm.icon}</span>
                <div>
                  <div className="font-semibold">{comm.name}</div>
                  <div className="text-xs text-slate-400">
                    {comm.category === 'raw' ? '原材料' : comm.category === 'industrial' ? '工业品' : comm.category === 'consumer' ? '消费品' : '奢侈品'}
                  </div>
                </div>
              </div>
              <span className="text-2xl font-mono font-bold text-emerald-400">¥{m.price.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                <div className="text-xs text-slate-400">供给</div>
                <div className="font-mono font-bold text-blue-400">{m.supply.toFixed(1)}</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                <div className="text-xs text-slate-400">需求</div>
                <div className="font-mono font-bold text-amber-400">{m.demand.toFixed(1)}</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-2 text-center">
                <div className="text-xs text-slate-400">供需比</div>
                <div className={`font-mono font-bold ${ratio > 1.2 ? 'text-red-400' : ratio < 0.8 ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {ratio.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">库存</span>
                <span className="font-mono">{m.stock.toFixed(0)} 单位</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all" 
                  style={{ width: `${Math.min(100, m.stock / 10)}%` }} 
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded ${
                m.priceTrend === 'rising' ? 'bg-red-500/20 text-red-400' :
                m.priceTrend === 'falling' ? 'bg-emerald-500/20 text-emerald-400' :
                'bg-slate-500/20 text-slate-400'
              }`}>
                {m.priceTrend === 'rising' ? '📈 价格上涨' : m.priceTrend === 'falling' ? '📉 价格下跌' : '➡️ 价格稳定'}
              </span>
              <span className="text-slate-400">弹性: {comm.elasticity}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function PopulationTab({ state, popPieData }: { state: EconomyState; popPieData: any[] }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/10 rounded-xl p-5 border border-blue-500/25">
          <div className="text-xs text-slate-400 mb-2 font-medium">👥 总人口</div>
          <div className="font-mono text-2xl font-bold text-white">{formatNumber(state.stats.population)}</div>
          <div className="text-xs text-slate-500 mt-1">约 {(state.stats.population / 100000000).toFixed(2)} 亿人</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/15 to-teal-500/10 rounded-xl p-5 border border-emerald-500/25">
          <div className="text-xs text-slate-400 mb-2 font-medium">📚 平均识字率</div>
          <div className="font-mono text-2xl font-bold text-emerald-400">{state.stats.education.toFixed(1)}%</div>
          <div className="text-xs text-slate-500 mt-1">国民教育水平</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/10 rounded-xl p-5 border border-amber-500/25">
          <div className="text-xs text-slate-400 mb-2 font-medium">❤️ 健康指数</div>
          <div className="font-mono text-2xl font-bold text-amber-400">{state.stats.health.toFixed(1)}</div>
          <div className="text-xs text-slate-500 mt-1">公共医疗覆盖</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/15 to-pink-500/10 rounded-xl p-5 border border-purple-500/25">
          <div className="text-xs text-slate-400 mb-2 font-medium">💼 劳动参与率</div>
          <div className="font-mono text-2xl font-bold text-purple-400">65.2%</div>
          <div className="text-xs text-slate-500 mt-1">适龄就业人口</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-slate-800/30 rounded-xl p-5 col-span-2">
          <h3 className="text-base font-bold mb-5 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            社会阶层详情
          </h3>
          <div className="space-y-4">
            {state.pops.map((pop, i) => (
              <div key={pop.id} className="bg-slate-700/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: popPieData[i]?.color + '30' }}>
                      {pop.id === 'peasants' ? '🌾' : pop.id === 'workers' ? '🏭' : pop.id === 'merchants' ? '💼' : pop.id === 'nobles' ? '👑' : '🎓'}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{pop.name}</div>
                      <div className="text-sm text-slate-400">收入水平: ¥{formatMoney(pop.income)}/年</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl font-bold text-emerald-400">¥{formatMoney(pop.income * 365)}</div>
                    <div className="text-xs text-slate-400">年均收入 / 人</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">人口规模</div>
                    <div className="font-mono text-lg font-bold text-white">{formatNumber(pop.size)}</div>
                    <div className="text-xs text-blue-400 font-mono">占总人口 {(pop.size / state.stats.population * 100).toFixed(1)}%</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">累计财富</div>
                    <div className="font-mono text-lg font-bold text-amber-400">{formatMoney(pop.wealth * pop.size)}</div>
                    <div className="text-xs text-slate-500">人均 ¥{pop.wealth.toFixed(0)}</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">阶层支持度</div>
                    <div className={`font-mono text-lg font-bold ${pop.approval > 60 ? 'text-emerald-400' : pop.approval > 40 ? 'text-amber-400' : 'text-red-400'}`}>
                      {pop.approval.toFixed(0)}%
                    </div>
                    <div className="text-xs text-slate-500">
                      {pop.approval > 60 ? '✓ 稳定支持' : pop.approval > 40 ? '⚠️ 态度摇摆' : '🚨 强烈不满'}
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">消费能力</div>
                    <div className="font-mono text-lg font-bold text-purple-400">{pop.standardOfLiving.toFixed(0)}</div>
                    <div className="text-xs text-slate-500">生活质量指数</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">生活水平</span>
                      <span className="font-mono">{pop.standardOfLiving.toFixed(0)}</span>
                    </div>
                    <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all" style={{ width: `${pop.standardOfLiving}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">识字率</span>
                      <span className="font-mono">{pop.literacy.toFixed(0)}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" style={{ width: `${pop.literacy}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">民众支持率</span>
                      <span className="font-mono">{pop.approval.toFixed(0)}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${pop.approval > 60 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : pop.approval > 40 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`} style={{ width: `${pop.approval}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/30 rounded-xl p-5">
            <h3 className="text-base font-bold mb-4">📊 人口分布</h3>
            <div className="h-56 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={popPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {popPieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {popPieData.map((p: any, i: number) => (
                <div key={i} className="flex items-center justify-between bg-slate-700/30 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold">{formatNumber(p.value * 1000000)}</div>
                    <div className="text-xs text-slate-400">{((p.value / popPieData.reduce((a: number, b: any) => a + b.value, 0)) * 100).toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-xl p-5">
            <h3 className="text-base font-bold mb-4">📈 人口趋势</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={popPieData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="#475569" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} stroke="#475569" width={60} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} formatter={(value: number) => [formatNumber(value * 1000000), '人口']} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {popPieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BuildingsTab({ state, onToggle, onHire, onFire, onDemolish }: {
  state: EconomyState
  onToggle: (id: string) => void
  onHire: (id: string) => void
  onFire: (id: string) => void
  onDemolish: (id: string) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {state.buildings.map(building => (
        <div key={building.id} className={`bg-slate-800/30 rounded-xl p-4 border-2 transition-colors ${
          building.isActive ? 'border-transparent' : 'border-red-500/30'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                building.isActive ? 'bg-emerald-500/20' : 'bg-red-500/20'
              }`}>
                {building.type === 'production' ? '🏭' : building.type === 'infrastructure' ? '🏗️' : building.type === 'service' ? '🏪' : '⚔️'}
              </div>
              <div>
                <div className="font-semibold flex items-center gap-2">
                  {building.name}
                  {!building.isActive && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">已暂停</span>}
                </div>
                <div className="text-xs text-slate-400">
                  Lv.{building.level} · {
                    building.type === 'production' ? '生产' :
                    building.type === 'infrastructure' ? '基建' :
                    building.type === 'service' ? '服务' : '军事'
                  }
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-mono font-bold ${building.profitability >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {building.profitability >= 0 ? '+' : ''}¥{building.profitability.toFixed(1)}
              </div>
              <div className="text-xs text-slate-400">日利润</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="bg-slate-700/30 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-400">效率</div>
              <div className="font-mono text-sm text-blue-400">{(building.efficiency * 100).toFixed(0)}%</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-400">工人</div>
              <div className="font-mono text-sm text-amber-400">{building.workers}/{building.maxWorkers}</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-400">产出</div>
              <div className="font-mono text-sm text-emerald-400">
                {Object.keys(building.outputs).length}种
              </div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-400">运营成本</div>
              <div className="font-mono text-sm text-red-400">¥{(building.operatingCosts * building.level).toFixed(0)}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onToggle(building.id)}
              className={`flex-1 px-3 py-1.5 rounded text-sm transition-colors ${
                building.isActive 
                  ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' 
                  : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
              }`}
            >
              {building.isActive ? '暂停生产' : '恢复生产'}
            </button>
            <button
              onClick={() => onHire(building.id)}
              disabled={building.workers >= building.maxWorkers}
              className="px-3 py-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 disabled:opacity-40 rounded text-sm transition-colors"
            >
              +雇佣
            </button>
            <button
              onClick={() => onFire(building.id)}
              disabled={building.workers <= 0}
              className="px-3 py-1.5 bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 disabled:opacity-40 rounded text-sm transition-colors"
            >
              -解雇
            </button>
            <button
              onClick={() => onDemolish(building.id)}
              className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded text-sm transition-colors"
            >
              拆除
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function TreasuryTab({ state, historyChartData, onAdjustTax, onAdjustSubsidy, onIssueDebt, onRepayDebt, onPrintMoney, setConfirmDialog, showToast }: {
  state: EconomyState
  historyChartData: any[]
  onAdjustTax: (taxType: keyof EconomyState['treasury']['taxes'], rate: number) => void
  onAdjustSubsidy: (subsidyType: keyof EconomyState['treasury']['subsidies'], amount: number) => void
  onIssueDebt: (amount: number) => void
  onRepayDebt: (amount: number) => void
  onPrintMoney: (amount: number) => void
  setConfirmDialog: (dialog: any) => void
  showToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info', duration?: number) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="bg-slate-800/30 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold mb-3">💰 国库与债务历史</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyChartData}>
                <defs>
                  <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#475569" />
                <YAxis tick={{ fontSize: 10 }} stroke="#475569" />
                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="treasury" stroke="#f59e0b" fill="transparent" name="财政余额" />
                <Area type="monotone" dataKey="debt" stroke="#ef4444" fill="url(#colorDebt)" name="国债" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/30 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-4">💰 税收政策</h3>
            <div className="space-y-3">
              {Object.entries(state.treasury.taxes).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">
                      {key === 'income' ? '所得税' :
                       key === 'trade' ? '商业税' :
                       key === 'luxury' ? '奢侈品税' : '土地税'}
                    </span>
                    <span className="w-12 text-right font-mono text-sm font-bold text-amber-400">{value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={value}
                    onChange={e => onAdjustTax(key as any, Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-slate-500 bg-amber-500/10 rounded-lg p-2">
              ⚠️ 税率过高会降低民众支持度
            </div>
          </div>

          <div className="bg-slate-800/30 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-4">📦 财政补贴</h3>
            <div className="space-y-3">
              {Object.entries(state.treasury.subsidies).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">
                      {key === 'agriculture' ? '农业补贴' :
                       key === 'industry' ? '工业补贴' : '贫民救济'}
                    </span>
                    <span className="w-16 text-right font-mono text-sm font-bold text-emerald-400">¥{value}/日</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={e => onAdjustSubsidy(key as any, Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-800/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-3">📊 财政概览</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">国库余额</span>
              <span className="font-mono font-bold text-amber-400">{formatMoney(state.treasury.gold)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">日收入</span>
              <span className="font-mono text-emerald-400">+{formatMoney(state.treasury.income)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">日支出</span>
              <span className="font-mono text-red-400">-{formatMoney(state.treasury.expenses)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-700">
              <span className="text-slate-400">日盈余</span>
              <span className={`font-mono font-bold ${state.treasury.balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {state.treasury.balance >= 0 ? '+' : ''}{formatMoney(state.treasury.balance)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-3">💳 国债管理</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-slate-400">当前债务</span>
              <span className="font-mono text-red-400">{formatMoney(state.treasury.debt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">年利率</span>
              <span className="font-mono text-amber-400">{(state.treasury.interestRate * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">日利息支出</span>
              <span className="font-mono text-red-400">-¥{(state.treasury.debt * state.treasury.interestRate / 365).toFixed(1)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setConfirmDialog({
                  title: '发行债券确认',
                  message: '确定发行 ¥500 亿国债吗？将增加债务并提高利率，国库将立即到账。',
                  onConfirm: () => {
                    onIssueDebt(500)
                    showToast('✅ 成功发行 ¥500 亿国债', 'success')
                    setConfirmDialog(null)
                  }
                })
              }}
              className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-xs rounded-xl font-semibold transition-all border border-blue-500/20 flex items-center justify-center gap-1"
            >
              💳 发行 ¥500
            </button>
            <button
              onClick={() => {
                setConfirmDialog({
                  title: '偿还债务确认',
                  message: '确定偿还 ¥500 亿债务吗？将减少利息支出，国库将立即扣除。',
                  onConfirm: () => {
                    onRepayDebt(500)
                    showToast('✅ 成功偿还 ¥500 亿债务', 'success')
                    setConfirmDialog(null)
                  }
                })
              }}
              disabled={state.treasury.debt <= 0 || state.treasury.gold < 500}
              className="flex-1 px-3 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-40 text-xs rounded-xl font-semibold transition-all border border-emerald-500/20 flex items-center justify-center gap-1"
            >
              💰 偿债 ¥500
            </button>
          </div>
        </div>

        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
          <div className="text-sm text-red-400 mb-2 flex items-center gap-1">
            <Printer className="w-4 h-4" /> 核按钮：印钞机
          </div>
          <div className="text-xs text-slate-400 mb-3">
            直接印钞会增加国库收入，但会引发通胀并降低支持度
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setConfirmDialog({
                  title: '⚠️ 启动印钞机',
                  message: '确定印钞 ¥100 亿吗？将增加通胀率并降低民众支持度。',
                  danger: true,
                  onConfirm: () => {
                    onPrintMoney(100)
                    showToast('💸 印钞 ¥100 亿已注入国库', 'warning')
                    setConfirmDialog(null)
                  }
                })
              }}
              className="px-3 py-2.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs rounded-xl font-semibold transition-all border border-red-500/20"
            >
              💸 印钞 ¥100
            </button>
            <button
              onClick={() => setConfirmDialog({
                title: '⚠️ 超级印钞',
                message: '确定要印钞 ¥10,000 亿吗？这将导致通胀率立即飙升 +5%！玩火必自焚！',
                danger: true,
                onConfirm: () => {
                  onPrintMoney(10000)
                  showToast('🔥 超级印钞完成！恶性通胀来袭！', 'error', 3000)
                  setConfirmDialog(null)
                }
              })}
              className="px-3 py-2.5 bg-red-600/30 text-red-400 hover:bg-red-600/50 text-xs rounded-xl font-semibold transition-all border border-red-500/30 animate-pulse"
            >
              🔥 印钞 ¥10000
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PoliciesTab({ state, onTogglePolicy, setConfirmDialog, showToast }: { 
  state: EconomyState
  onTogglePolicy: (policyId: string) => { success: boolean; message: string; state: EconomyState }
  setConfirmDialog: (dialog: any) => void
  showToast: (msg: string, type: 'success' | 'warning' | 'error' | 'info', duration?: number) => void
}) {
  const policyCategories = [
    {
      name: '经济政策',
      category: 'economy',
    },
    {
      name: '社会政策',
      category: 'social',
    },
    {
      name: '劳工政策',
      category: 'labor',
    },
  ]

  const getPoliciesByCategory = (category: string) => {
    return state.policies.filter(p => p.category === category)
  }

  const flattenEffects = (effectsObj: any) => {
    if (!effectsObj || Array.isArray(effectsObj)) return []
    
    const effectNames: Record<string, string> = {
      income: '收入',
      approval: '民众支持',
      consumption: '消费',
      stability: '稳定度',
      efficiency: '生产效率',
      expenses: '财政支出',
      bureaucracy: '官僚能力',
      legitimacy: '合法性',
    }

    const results: { name: string; value: number }[] = []
    
    Object.values(effectsObj).forEach((group: any) => {
      if (group && typeof group === 'object') {
        Object.entries(group).forEach(([key, value]) => {
          if (typeof value === 'number' && value !== 0) {
            results.push({
              name: effectNames[key] || key,
              value,
            })
          }
        })
      }
    })
    
    return results
  }

  const checkRequirements = (policy: any) => {
    const issues: string[] = []
    if (policy.mutuallyExclusive && policy.mutuallyExclusive.length > 0) {
      const activeMutual = state.policies.find(p => 
        policy.mutuallyExclusive.includes(p.id) && (p.isActive || p.implementationProgress > 0)
      )
      if (activeMutual) {
        issues.push(`⚠️ 与「${activeMutual.name}」互斥！`)
      }
    }
    if (state.politicalCapital < policy.politicalCost) {
      issues.push(`政治点数不足：需要 ${policy.politicalCost}`)
    }
    if (policy.implementationProgress > 0 && policy.implementationProgress < policy.implementationDays) {
      issues.push(`⏳ 议会辩论中...`)
    }
    if (policy.requirements) {
      if (policy.requirements.stability && state.stats.stability < policy.requirements.stability) {
        issues.push(`稳定度需要 ${policy.requirements.stability}%`)
      }
      if (policy.requirements.bureaucracy && state.stats.bureaucracy < policy.requirements.bureaucracy) {
        issues.push(`官僚能力需要 ${policy.requirements.bureaucracy}%`)
      }
      if (policy.requirements.legitimacy && state.stats.legitimacy < policy.requirements.legitimacy) {
        issues.push(`合法性需要 ${policy.requirements.legitimacy}%`)
      }
    }
    if (state.treasury.gold < policy.implementationCost) {
      issues.push(`资金不足：需要 ¥${policy.implementationCost}`)
    }
    return issues
  }

  const isMutuallyExclusive = (policy: any) => {
    if (!policy.mutuallyExclusive) return false
    return policy.mutuallyExclusive.some((id: string) => {
      const p = state.policies.find(x => x.id === id)
      return p && (p.isActive || p.implementationProgress > 0)
    })
  }

  const activePolicies = state.policies.filter(p => p.isActive)
  const totalDailyUpkeep = activePolicies.reduce((sum, p) => sum + (p.upkeep || 0), 0)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 mb-2">
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border border-emerald-500/20">
          <div className="text-xs text-slate-500 mb-1">已激活政策</div>
          <div className="text-2xl font-bold text-emerald-400">{activePolicies.length}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20">
          <div className="text-xs text-slate-500 mb-1">每日维护费</div>
          <div className="text-2xl font-bold text-amber-400">¥{totalDailyUpkeep} 亿</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-blue-500/20">
          <div className="text-xs text-slate-500 mb-1">政策总数</div>
          <div className="text-2xl font-bold text-blue-400">{state.policies.length}</div>
        </div>
      </div>
      
      {policyCategories.map(cat => {
        const policies = getPoliciesByCategory(cat.category)
        if (policies.length === 0) return null
        
        return (
          <div key={cat.name} className="bg-slate-800/30 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3">{cat.name}</h3>
            <div className="grid grid-cols-3 gap-3">
              {policies.map(policy => {
                const issues = checkRequirements(policy)
                const canActivate = !policy.isActive && issues.length === 0 && policy.implementationProgress === 0
                const isImplementing = policy.implementationProgress > 0 && policy.implementationProgress < policy.implementationDays
                const mutualExclusive = isMutuallyExclusive(policy)
                
                return (
                  <div
                    key={policy.id}
                    className={`rounded-xl p-4 border-2 transition-all ${
                      policy.isActive 
                        ? 'bg-gradient-to-br from-emerald-800/40 to-teal-900/40 border-emerald-500/60 shadow-lg shadow-emerald-500/10' 
                        : isImplementing
                          ? 'bg-gradient-to-br from-amber-800/30 to-orange-900/30 border-amber-500/50 shadow-lg shadow-amber-500/10'
                          : mutualExclusive
                            ? 'bg-slate-800/40 border-rose-500/40 opacity-50 cursor-not-allowed'
                            : canActivate
                              ? 'bg-slate-800/50 border-slate-600/40 hover:border-emerald-500/50 hover:shadow-lg'
                              : 'bg-slate-800/30 border-slate-600/20 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-sm">{policy.name}</div>
                      <div className="flex items-center gap-2">
                        {policy.isActive && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-lg font-bold">
                            ✓ 已生效
                          </span>
                        )}
                        {isImplementing && (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] rounded-lg font-bold animate-pulse">
                            ⏳ 议会投票中
                          </span>
                        )}
                        {mutualExclusive && !policy.isActive && (
                          <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 text-[10px] rounded-lg font-bold">
                            🚫 互斥
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {isImplementing && (
                      <div className="mb-3">
                        <div className="flex justify-between text-[10px] text-amber-400 mb-1">
                          <span>实施进度</span>
                          <span>{policy.implementationProgress} / {policy.implementationDays} 天</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                            style={{ width: `${(policy.implementationProgress / policy.implementationDays) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 mb-3 text-[11px]">
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="text-amber-400">💰</span>
                        ¥{policy.implementationCost}
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="text-emerald-400">⚡</span>
                        {policy.politicalCost} 点数
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="text-blue-400">📅</span>
                        {policy.implementationDays}天
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="text-rose-400">💸</span>
                        ¥{policy.upkeep}/天
                      </div>
                    </div>
                    
                    {issues.length > 0 && !policy.isActive && !isImplementing && (
                      <div className="text-[11px] text-rose-400 mb-3 bg-rose-500/10 rounded-lg p-2">
                        {issues.map((issue, i) => <div key={i} className="mb-0.5">{issue}</div>)}
                      </div>
                    )}
                    
                    {!policy.isActive && !isImplementing && canActivate && (
                      <div className="text-[11px] mb-3 bg-sky-500/10 rounded-lg p-2">
                        <div className="text-sky-400 mb-1.5 font-bold">📊 立法预测</div>
                        <div className="flex flex-wrap gap-1">
                          {state.interestGroups.map(group => {
                            const supports = group.supportedPolicies.includes(policy.id)
                            const opposes = group.opposedPolicies.includes(policy.id)
                            if (!supports && !opposes) return null
                            return (
                              <span key={group.id} className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                supports 
                                  ? 'bg-emerald-500/20 text-emerald-400' 
                                  : 'bg-rose-500/20 text-rose-400'
                              }`}>
                                {group.icon} {supports ? '+' : '-'}{Math.round(group.power * (supports ? 0.25 : 0.30))}%
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {flattenEffects(policy.effects).map((effect, i) => (
                        <span key={i} className={`text-[10px] px-2 py-0.5 rounded-lg font-bold ${
                          effect.value > 0 
                            ? 'text-emerald-400 bg-emerald-500/15' 
                            : 'text-rose-400 bg-rose-500/15'
                        }`}>
                          {effect.value > 0 ? '+' : ''}{effect.value}% {effect.name}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        setConfirmDialog({
                          title: policy.isActive ? '取消政策确认' : '实施政策确认',
                          message: policy.isActive 
                            ? `确定要取消「${policy.name}」吗？将停止每日¥${policy.upkeep}的维护费用。`
                            : `确定要实施「${policy.name}」吗？将一次性花费¥${policy.implementationCost}，之后每日维护¥${policy.upkeep}。`,
                          danger: policy.isActive,
                          onConfirm: () => {
                            const result = onTogglePolicy(policy.id)
                            showToast(
                              result.message,
                              result.success 
                                ? (policy.isActive ? 'info' : 'success') 
                                : 'error',
                              3000
                            )
                            setConfirmDialog(null)
                          }
                        })
                      }}
                      disabled={!policy.isActive && !canActivate}
                      className={`w-full py-2 text-xs rounded-xl font-semibold transition-all ${
                        policy.isActive
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20 hover:border-red-500/30'
                          : canActivate
                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/20 hover:border-emerald-500/30'
                            : 'bg-slate-600/20 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {policy.isActive ? '⛔ 取消政策' : '✅ 实施政策'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TradeTab({ state, tradeOrders, newOrder, setNewOrder, handleCreateOrder }: {
  state: EconomyState
  tradeOrders: TradeOrder[]
  newOrder: { commodityId: string; type: 'buy' | 'sell'; amount: number } | null
  setNewOrder: (order: { commodityId: string; type: 'buy' | 'sell'; amount: number } | null) => void
  handleCreateOrder: () => void
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate-800/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-4">📦 创建交易订单</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">选择商品</label>
            <select
              value={newOrder?.commodityId || ''}
              onChange={e => setNewOrder({ ...newOrder!, commodityId: e.target.value, type: newOrder?.type || 'buy', amount: newOrder?.amount || 100 })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">请选择商品...</option>
              {Object.entries(state.commodities).map(([id, comm]) => (
                <option key={id} value={id}>{comm.icon} {comm.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setNewOrder({ ...newOrder!, type: 'buy' })}
              className={`py-2 rounded-lg text-sm transition-colors ${
                newOrder?.type === 'buy' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              🛒 买入
            </button>
            <button
              onClick={() => setNewOrder({ ...newOrder!, type: 'sell' })}
              className={`py-2 rounded-lg text-sm transition-colors ${
                newOrder?.type === 'sell' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              💰 卖出
            </button>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">数量</label>
            <input
              type="number"
              value={newOrder?.amount || 0}
              onChange={e => setNewOrder({ ...newOrder!, amount: Number(e.target.value) })}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm font-mono"
            />
          </div>

          {newOrder && newOrder.commodityId && (
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-2">订单预览</div>
              <div className="flex justify-between text-sm">
                <span>{newOrder.type === 'buy' ? '买入' : '卖出'} {state.commodities[newOrder.commodityId].name}</span>
                <span>{newOrder.amount} 单位</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>市价</span>
                <span className="font-mono">¥{state.market[newOrder.commodityId].price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold mt-2 pt-2 border-t border-slate-600">
                <span>总计</span>
                <span className="font-mono text-amber-400">
                  ¥{(newOrder.amount * state.market[newOrder.commodityId].price).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleCreateOrder}
            disabled={!newOrder || !newOrder.commodityId || newOrder.amount <= 0}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:opacity-50 rounded-lg font-semibold text-sm transition-all"
          >
            创建订单
          </button>
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-4">📋 当前订单</h3>
        
        {tradeOrders.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            暂无交易订单
          </div>
        ) : (
          <div className="space-y-2">
            {tradeOrders.slice(-10).map(order => {
              const comm = state.commodities[order.commodityId]
              return (
                <div key={order.id} className="bg-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{comm?.icon}</span>
                      <span className="text-sm">
                        {order.type === 'buy' ? '买入' : '卖出'} {comm?.name}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      order.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      order.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {order.status === 'completed' ? '已成交' : order.status === 'pending' ? '待处理' : order.status === 'partial' ? '部分成交' : '已取消'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 grid grid-cols-3 gap-2">
                    <div>数量: {order.amount}</div>
                    <div>价格: ¥{order.price.toFixed(2)}</div>
                    <div>成交: {order.filled}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function EventsTab({ 
  state, 
  eventLog, 
  activeEvent, 
  setActiveEvent,
  setState
}: { 
  state: EconomyState
  eventLog: { event: WorldEvent; day: number; optionSelected: number }[]
  activeEvent: WorldEvent | null
  setActiveEvent: (event: WorldEvent | null) => void
  setState: (state: EconomyState) => void
}) {
  const handleEventOption = (event: WorldEvent, optionIndex: number) => {
    const newState = applyEventOption(state, event, optionIndex)
    setState(newState)
    setActiveEvent(null)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate-800/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-4">📜 事件日志</h3>
        
        {eventLog.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            暂无事件记录
          </div>
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {[...eventLog].reverse().map((log, i) => {
              const option = log.event.options[log.optionSelected]
              return (
                <div key={i} className="bg-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{log.event.icon}</span>
                    <span className="font-medium text-sm">{log.event.name}</span>
                    <span className="text-xs text-slate-500 ml-auto">第 {log.day} 天</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    选择: {option.text}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="bg-slate-800/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-4">⚡ 即将到来的风险</h3>
        
        <div className="space-y-3">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">系统性风险评估</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">金融风险</span>
                <span className={state.treasury.debt / Math.max(1, state.stats.gdp) > 1.5 ? 'text-red-400' : 'text-emerald-400'}>
                  {state.treasury.debt / Math.max(1, state.stats.gdp) > 1.5 ? '高风险' : '稳定'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">通胀风险</span>
                <span className={state.stats.inflation > 15 ? 'text-red-400' : 'text-emerald-400'}>
                  {state.stats.inflation > 15 ? '高风险' : '稳定'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">社会稳定</span>
                <span className={state.stats.stability < 40 ? 'text-red-400' : 'text-emerald-400'}>
                  {state.stats.stability < 40 ? '高风险' : '稳定'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <div className="text-sm font-medium text-amber-400 mb-2">💡 提示</div>
            <div className="text-xs text-slate-400 space-y-1">
              <p>• 世界事件会在特定条件下随机触发</p>
              <p>• 每次选择都会对国家产生深远影响</p>
              <p>• 保持经济稳定可以降低危机发生概率</p>
              <p>• 黑天鹅事件可能随时降临</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IndustryTab({ state, onInvest, onRegulate }: { 
  state: EconomyState
  onInvest: (id: string, amount: number) => void
  onRegulate: (id: string, level: number) => void
}) {
  const industries = Object.entries(state.industries || {})
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)

  const categoryColors: Record<string, string> = {
    primary: 'text-emerald-400',
    secondary: 'text-blue-400',
    tertiary: 'text-purple-400',
    quaternary: 'text-amber-400',
  }

  const categoryBgColors: Record<string, string> = {
    primary: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
    secondary: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    tertiary: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    quaternary: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
  }

  const filteredIndustries = filterCategory 
    ? industries.filter(([_, i]) => i.category === filterCategory)
    : industries

  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-2xl p-6 border border-white/5 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold">🏭 国民经济行业体系</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterCategory(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                filterCategory === null 
                  ? 'bg-white/20 text-white border-white/30' 
                  : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
              }`}
            >
              全部
            </button>
            {(['primary', 'secondary', 'tertiary', 'quaternary'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  filterCategory === cat
                    ? categoryBgColors[cat] + ' border'
                    : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                }`}
              >
                {cat === 'primary' ? '第一产业' : cat === 'secondary' ? '第二产业' : cat === 'tertiary' ? '第三产业' : '第四产业'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {(['primary', 'secondary', 'tertiary', 'quaternary'] as const).map(cat => {
            const catIndustries = industries.filter(([_, i]) => i.category === cat)
            const totalOutput = catIndustries.reduce((sum, [_, i]) => sum + i.level * i.capacity * i.utilization, 0)
            const totalEmployees = catIndustries.reduce((sum, [_, i]) => sum + i.employees, 0)
            const totalProfit = catIndustries.reduce((sum, [_, i]) => sum + i.level * i.capacity * i.utilization * i.profitMargin, 0)
            return (
              <div key={cat} className="bg-slate-700/30 rounded-xl p-4">
                <div className={`text-sm font-bold mb-3 ${categoryColors[cat]}`}>
                  {cat === 'primary' ? '🌾 第一产业' : cat === 'secondary' ? '🏭 第二产业' : cat === 'tertiary' ? '💼 第三产业' : '🔬 第四产业'}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">总产值</span>
                    <span className="font-mono text-sm font-bold">¥{formatMoney(totalOutput * 1000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">总利润</span>
                    <span className="font-mono text-sm font-bold text-emerald-400">¥{formatMoney(totalProfit * 1000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">就业人口</span>
                    <span className="font-mono text-sm font-bold text-blue-400">{formatNumber(totalEmployees)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">行业数量</span>
                    <span className="font-mono text-sm font-bold text-amber-400">{catIndustries.length} 个</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 scrollbar-hide">
          {filteredIndustries.map(([id, industry]) => (
            <div key={id} className="bg-slate-700/20 rounded-xl p-5 hover:bg-slate-700/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-slate-700/50">
                    {industry.subCategory === '农业' ? '🌾' : industry.subCategory === '采矿' ? '⛏️' : industry.subCategory === '能源' ? '⚡' : industry.subCategory === '制造' ? '🏭' : industry.subCategory === '金融' ? '💰' : industry.subCategory === '服务' ? '💼' : '🏢'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">{industry.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[industry.category]} bg-slate-700/50`}>
                        {industry.subCategory}
                      </span>
                      <span className="text-xs text-slate-500 font-mono bg-slate-700/50 px-2 py-0.5 rounded">Lv.{industry.level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className={`font-mono text-lg font-bold ${
                      industry.profitMargin > 0.15 ? 'text-emerald-400' : 
                      industry.profitMargin > 0.08 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {(industry.profitMargin * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-slate-400">利润率</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-lg font-bold text-blue-400">
                      {(industry.utilization * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-slate-400">开工率</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-lg font-bold text-purple-400">
                      ¥{formatMoney(industry.level * industry.capacity * industry.utilization * industry.profitMargin * 1000)}
                    </div>
                    <div className="text-xs text-slate-400">年利润</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 mb-4">
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">📦 年产值</div>
                  <div className="font-mono font-bold text-white">{formatNumber(industry.capacity * industry.level)}</div>
                  <div className="text-xs text-slate-500">单位/年</div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">👥 就业人口</div>
                  <div className="font-mono font-bold text-blue-400">{formatNumber(industry.employees)}</div>
                  <div className="text-xs text-slate-500">人</div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">💰 资本存量</div>
                  <div className="font-mono font-bold text-amber-400">{formatMoney(industry.capitalStock)}</div>
                  <div className="text-xs text-slate-500">累计投资</div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">💵 平均工资</div>
                  <div className="font-mono font-bold text-rose-400">¥{formatMoney(industry.averageWage)}</div>
                  <div className="text-xs text-slate-500">年薪 / 人</div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">⚖️ 监管强度</div>
                  <div className="font-mono font-bold text-orange-400">{(industry.regulation * 100).toFixed(0)}%</div>
                  <div className="text-xs text-slate-500">政策干预度</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">生产效率</span>
                    <span className="font-mono">{industry.productivity.toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all" style={{ width: `${Math.min(100, industry.productivity * 50)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">税负率</span>
                    <span className="font-mono">{(industry.taxRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full transition-all" style={{ width: `${industry.taxRate * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">补贴率</span>
                    <span className="font-mono">{(industry.subsidies * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all" style={{ width: `${Math.min(100, industry.subsidies * 100)}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onInvest(id, 1000)}
                  disabled={state.treasury.gold < 1000}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    state.treasury.gold >= 1000
                      ? 'bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 hover:scale-102 active:scale-98'
                      : 'bg-slate-700/30 text-slate-500 cursor-not-allowed border border-slate-600/30'
                  }`}
                >
                  💰 投资10亿
                </button>
                <button
                  onClick={() => onInvest(id, 5000)}
                  disabled={state.treasury.gold < 5000}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    state.treasury.gold >= 5000
                      ? 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-400 border border-emerald-500/40 hover:scale-102 active:scale-98'
                      : 'bg-slate-700/30 text-slate-500 cursor-not-allowed border border-slate-600/30'
                  }`}
                >
                  💎 投资50亿
                </button>
                <button
                  onClick={() => onRegulate(id, Math.max(0, industry.regulation - 0.1))}
                  disabled={industry.regulation <= 0}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    industry.regulation > 0
                      ? 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 hover:scale-102 active:scale-98'
                      : 'bg-slate-700/30 text-slate-500 cursor-not-allowed border border-slate-600/30'
                  }`}
                >
                  📉 放松监管
                </button>
                <button
                  onClick={() => onRegulate(id, Math.min(1, industry.regulation + 0.1))}
                  disabled={industry.regulation >= 1}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    industry.regulation < 1
                      ? 'bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 border border-amber-500/30 hover:scale-102 active:scale-98'
                      : 'bg-slate-700/30 text-slate-500 cursor-not-allowed border border-slate-600/30'
                  }`}
                >
                  📈 加强监管
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DiplomacyTab({ state }: { state: EconomyState }) {
  const geo = state.geopolitical
  const playerCountry = state.countryId || 'china'

  const countryNames: Record<string, string> = {
    usa: '美国', china: '中国', russia: '俄罗斯', eu: '欧盟',
    japan: '日本', germany: '德国', uk: '英国', india: '印度',
    brazil: '巴西', france: '法国',
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-4">🌍 全球大国实力对比</h3>
          <div className="space-y-2">
            {geo && Object.values(geo.countries).map(country => (
              <div key={country.id} className="bg-slate-700/20 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{countryNames[country.id] || country.id}</span>
                  <div className="flex gap-3 text-xs">
                    <span className="text-blue-400">💲 {(country.gdp / 1000).toFixed(0)}T</span>
                    <span className="text-red-400">⚔️ {country.military}</span>
                    <span className="text-purple-400">🌟 {country.softPower}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-4">🤝 双边关系</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {geo && geo.relations
              .filter(r => r.from === playerCountry || r.to === playerCountry)
              .filter(r => r.from !== r.to)
              .map((r, i) => {
                const other = r.from === playerCountry ? r.to : r.from
                return (
                  <div key={i} className="bg-slate-700/20 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{countryNames[other] || other}</span>
                      <span className={`text-sm font-bold ${
                        r.value > 50 ? 'text-emerald-400' : r.value > 0 ? 'text-slate-300' : 'text-red-400'
                      }`}>
                        {r.value > 0 ? '+' : ''}{r.value}
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      {r.militaryAlliance && <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">军事同盟</span>}
                      {r.tradeAgreement && <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">自贸协定</span>}
                      {r.sanctions && <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">制裁中</span>}
                      <span className="px-1.5 py-0.5 bg-slate-600/30 text-slate-400 rounded">关税 {(r.tariff * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-4">⛓️ 全球供应链</h3>
        <div className="grid grid-cols-5 gap-3">
          {geo && Object.entries(geo.globalSupplyChain).map(([commodity, link]) => (
            <div key={commodity} className="bg-slate-700/20 rounded-lg p-3">
              <div className="font-medium text-sm mb-2 capitalize">{commodity}</div>
              <div className="text-xs text-slate-400 mb-1">
                价格: <span className="text-emerald-400">${link.globalPrice}</span>
              </div>
              <div className="text-xs text-slate-400 mb-1">
                出口: {link.exporters.slice(0, 2).map(c => countryNames[c] || c).join(', ')}
              </div>
              <div className="text-xs text-slate-400">
                进口: {link.importers.slice(0, 2).map(c => countryNames[c] || c).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NewsTab({ state, news, onMarkRead }: { 
  state: EconomyState
  news: import('@data/simulations/market-economy/vic3-types').NewsItem[]
  onMarkRead: (id: string) => void 
}) {
  const categoryColors: Record<string, string> = {
    economic: 'bg-blue-500/20 text-blue-400',
    diplomatic: 'bg-purple-500/20 text-purple-400',
    military: 'bg-red-500/20 text-red-400',
    social: 'bg-amber-500/20 text-amber-400',
    tech: 'bg-cyan-500/20 text-cyan-400',
  }

  const categoryNames: Record<string, string> = {
    economic: '经济',
    diplomatic: '外交',
    military: '军事',
    social: '社会',
    tech: '科技',
  }

  const sortedNews = [...news].sort((a, b) => b.day - a.day)

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">📰 全球新闻动态</h3>
          <span className="text-xs text-slate-400">共 {sortedNews.length} 条</span>
        </div>

        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
          {sortedNews.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              暂无新闻，继续游戏以接收全球动态...
            </div>
          ) : (
            sortedNews.map(item => (
              <div 
                key={item.id} 
                onClick={() => onMarkRead(item.id)}
                className={`bg-slate-700/20 rounded-lg p-3 cursor-pointer transition-colors hover:bg-slate-700/40 ${
                  !item.isRead ? 'border-l-2 border-emerald-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[item.category]}`}>
                    {categoryNames[item.category]}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${!item.isRead ? 'text-white' : 'text-slate-400'}`}>
                        {item.headline}
                      </span>
                      <span className="text-xs text-slate-500">第 {item.day} 天</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{item.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const formatNumber = (n: number) => n.toLocaleString('zh-CN', { maximumFractionDigits: n < 100 ? 2 : 0 })
const formatMoney = (n: number) => `¥${formatNumber(n)}`
