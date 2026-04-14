import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Skull, Trophy, Backpack, Dices, PanelLeftClose, PanelLeft, RotateCcw, ChevronDown, ChevronUp, Clock, Sparkles, Zap, Save, FolderOpen } from 'lucide-react'
import type { XianxiaStats, DiceRollState } from '@data/simulations/xianxia/types'
import { STAT_NAMES, STAT_COLORS } from '@data/simulations/xianxia/types'
import { performCheck, calculateSuccessProbability, ROLL_TEXT, ITEM_POOL, type InventoryItem, formatCheckDescription } from '@data/simulations/xianxia/probability-system'
import type { CheckResult } from '@data/simulations/xianxia/probability-system'
import type { GameState, GameEvent } from '@data/simulations/xianxia/event-system/types'
import { eventDispatcher } from '@data/simulations/xianxia/event-system/event-dispatcher'
import { createInitialState, useItem } from '@data/simulations/xianxia/event-system/state-manager'
import { evaluateConditionGroup } from '@data/simulations/xianxia/event-system/condition-engine'
import { saveXianxiaGame, autoSaveXianxia, loadXianxiaGame } from '@data/simulations/xianxia/xianxia-save'
import XianxiaSaveMenu from './XianxiaSaveMenu'

export default function VisualNovelEngine() {
  const [gameState, setGameState] = useState<GameState>(createInitialState())
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null)
  const [pendingCheck, setPendingCheck] = useState<any>(null)
  const [itemToast, setItemToast] = useState<{ id: number; message: string; itemName: string } | null>(null)
  const [showSaveMenu, setShowSaveMenu] = useState(false)

  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showChoices, setShowChoices] = useState(false)
  const [sceneTransition, setSceneTransition] = useState(false)
  const [statPopups, setStatPopups] = useState<{ key: string; value: number; id: number }[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [statsExpanded, setStatsExpanded] = useState(true)
  const [inventoryExpanded, setInventoryExpanded] = useState(true)
  const [diceState, setDiceState] = useState<DiceRollState>({
    isRolling: false,
    result: null,
    checkName: '',
    probability: 0,
    showResult: false,
  })

  const timeoutIdsRef = useRef<number[]>([])

  const safeTimeout = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay)
    timeoutIdsRef.current.push(id)
    return id
  }, [])

  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach(id => clearTimeout(id))
    timeoutIdsRef.current = []
  }, [])

  useEffect(() => {
    return () => clearAllTimeouts()
  }, [clearAllTimeouts])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return
      
      switch(e.code) {
        case 'Escape':
          e.preventDefault()
          if (showSaveMenu) {
            setShowSaveMenu(false)
          } else if (diceState.isRolling) {
            return
          }
          break
        case 'KeyS':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            saveXianxiaGame(gameState, 1)
            setItemToast({ id: Date.now(), message: '存档成功', itemName: '💾' })
          }
          break
        case 'KeyL':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            const saved = loadXianxiaGame(1)
            if (saved) {
              setGameState(saved)
              setCurrentEvent(null)
              setItemToast({ id: Date.now(), message: '读档成功', itemName: '📂' })
            }
          }
          break
        case 'KeyM':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            setShowSaveMenu(prev => !prev)
          }
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, showSaveMenu, diceState.isRolling, setGameState])

  useEffect(() => {
    const autosaveTimer = setInterval(() => {
      if (gameState.currentEventId) {
        autoSaveXianxia(gameState)
      }
    }, 120000)

    return () => clearInterval(autosaveTimer)
  }, [gameState])

  useEffect(() => {
    if (!currentEvent) {
      const nextEvent = eventDispatcher.getNextEvent(gameState)
      if (nextEvent) {
        setGameState(prev => eventDispatcher.startEvent(prev, nextEvent))
        setCurrentEvent(nextEvent)
      }
    }
  }, [gameState, currentEvent])

  useEffect(() => {
    if (!currentEvent) return

    setDisplayedText('')
    setIsTyping(true)
    setShowChoices(false)
    setSceneTransition(true)
    setDiceState({ isRolling: false, result: null, checkName: '', probability: 0, showResult: false })

    const timer = safeTimeout(() => {
      setSceneTransition(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentEvent?.id])

  useEffect(() => {
    if (!currentEvent || sceneTransition || diceState.isRolling) return

    const fullText = currentEvent.narrator
    let index = 0

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(interval)
        safeTimeout(() => setShowChoices(true), 300)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [currentEvent, sceneTransition, diceState.isRolling])

  const processStatChanges = useCallback((effects: any) => {
    if (!effects) return

    const allChanges: [string, number][] = []
    if (effects.stats) {
      allChanges.push(...Object.entries(effects.stats) as [string, number][])
    }
    if (effects.hidden) {
      allChanges.push(...Object.entries(effects.hidden).filter(([, v]) => typeof v === 'number') as [string, number][])
    }

    allChanges.forEach(([key, value], i) => {
      safeTimeout(() => {
        const popupId = Date.now() + i
        setStatPopups(prev => [...prev, { key, value: value as number, id: popupId }])
        safeTimeout(() => {
          setStatPopups(prev => prev.filter(p => p.id !== popupId))
        }, 1500)
      }, i * 200)
    })
  }, [])

  const handleUseItem = useCallback((item: InventoryItem) => {
    const result = useItem(gameState, item)
    setGameState(result.newState)
    
    const toastId = Date.now()
    setItemToast({ id: toastId, message: result.message, itemName: item.name })
    safeTimeout(() => setItemToast(null), 3000)

    processStatChanges({
      stats: item.onUse?.effects,
      hidden: item.onUse?.hiddenEffects,
    })

    if (result.triggerEvent) {
      safeTimeout(() => {
        const specialEvent = eventDispatcher.getSpecificEvent(result.triggerEvent!)
        if (specialEvent) {
          setCurrentEvent(null)
          setSceneTransition(true)
          safeTimeout(() => {
            setCurrentEvent(specialEvent)
          }, 500)
        }
      }, 1000)
    }
  }, [gameState, processStatChanges])

  const handleChoice = useCallback((choice: any) => {
    const { newState, shouldRoll, check } = eventDispatcher.processChoice(gameState, choice)

    if (shouldRoll && check) {
      setPendingCheck(check)
      setDiceState({
        isRolling: true,
        result: null,
        checkName: formatCheckDescription(check),
        probability: check.probability,
        showResult: false,
      })

      safeTimeout(() => {
        const result = performCheck(check, gameState.stats)
        setDiceState(prev => ({
          ...prev,
          result,
          showResult: true,
        }))

        safeTimeout(() => {
          const stateAfterCheck = eventDispatcher.processCheckResult(newState, check, result)
          processStatChanges(check.onCheckResult?.[result])
          setGameState(stateAfterCheck)
          setDiceState({ isRolling: false, result: null, checkName: '', probability: 0, showResult: false })
          setPendingCheck(null)
          setCurrentEvent(null)
        }, 2000)
      }, 1500)

      return
    }

    processStatChanges(choice.effects)
    setGameState(newState)
    setCurrentEvent(null)
  }, [gameState, processStatChanges])

  const skipTyping = () => {
    if (isTyping && !diceState.isRolling && currentEvent) {
      setDisplayedText(currentEvent.narrator)
      setIsTyping(false)
      safeTimeout(() => setShowChoices(true), 100)
    }
  }

  const restart = () => {
    setGameState(createInitialState())
    setCurrentEvent(null)
    setPendingCheck(null)
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-amber-950/30 to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="relative"
        >
          <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full" />
          <Dices className="w-12 h-12 text-amber-400/70 relative z-10" />
        </motion.div>
      </div>
    )
  }

  const isEnding = currentEvent.isEnding

  return (
    <div className={`min-h-screen bg-gradient-to-br from-black via-amber-950/20 to-black transition-all duration-1000 relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {isEnding && currentEvent.endingType === 'BAD_END' && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.3] }}
          transition={{ duration: 3 }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(127, 29, 29, 0.6) 0%, transparent 70%)',
          }}
        />
      )}

      <AnimatePresence>
        {diceState.isRolling && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
            >
              <motion.div
                animate={diceState.showResult ? { rotate: 0, scale: [1, 1.1, 1] } : { rotate: [0, 15, -15, 10, -10, 0] }}
                transition={{ duration: 0.15, repeat: diceState.showResult ? 0 : Infinity }}
                className="mb-6 relative"
              >
                <div className="absolute inset-0 bg-amber-500/30 blur-2xl rounded-full scale-150" />
                <Dices className={`w-24 h-24 mx-auto relative z-10 ${
                  diceState.result === 'critical_success' ? 'text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.8)]' :
                  diceState.result === 'success' ? 'text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]' :
                  diceState.result === 'critical_failure' ? 'text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]' :
                  diceState.result === 'failure' ? 'text-red-400' :
                  'text-amber-400/70'
                }`} />
              </motion.div>

              <div className="text-white/60 text-sm mb-2 font-medium">{diceState.checkName}</div>
              <div className="flex items-center justify-center gap-1.5 mb-6">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400/80 text-xs font-bold">成功率 {diceState.probability}%</span>
              </div>

              {diceState.showResult && diceState.result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-2xl font-black tracking-wide ${
                    diceState.result === 'critical_success' ? 'text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]' :
                    diceState.result === 'success' ? 'text-emerald-400' :
                    diceState.result === 'critical_failure' ? 'text-red-500' :
                    'text-red-400'
                  }`}
                >
                  {ROLL_TEXT[diceState.result]}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {itemToast && (
          <motion.div
            key={itemToast.id}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
          >
            <div className="px-5 py-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-2xl border border-amber-500/40 shadow-2xl shadow-amber-500/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-200 text-sm font-semibold">{itemToast.message}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-30 p-3 rounded-xl bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-2xl border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all duration-300 text-amber-400/70 hover:text-amber-400 shadow-lg"
        type="button"
      >
        {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
      </button>

      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        <div className="px-4 py-2 rounded-xl bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-2xl border border-amber-500/20 flex items-center gap-2 shadow-lg">
          <Clock className="w-3.5 h-3.5 text-amber-400/70" />
          <span className="text-amber-400/80 text-xs font-bold">第{gameState.hidden.day}天</span>
        </div>
        <div className="px-4 py-2 rounded-xl bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-2xl border border-amber-500/20 shadow-lg">
          <span className="text-amber-400 text-xs font-black">{currentEvent.chapter}</span>
          <span className="text-white/40 mx-1.5">·</span>
          <span className="text-white font-bold text-xs">{currentEvent.title}</span>
        </div>
        <button
          onClick={restart}
          className="p-3 rounded-xl bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-2xl border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all duration-300 text-amber-400/70 hover:text-amber-400 shadow-lg"
          type="button"
          title="重新开始"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowSaveMenu(true)}
          className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-600/20 backdrop-blur-2xl border border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/30 transition-all duration-300 text-amber-400 shadow-lg group"
          type="button"
          title="仙途存档 Ctrl+M"
        >
          <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="absolute top-4 left-16 z-20 w-60"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-black/85 to-black/75 backdrop-blur-2xl border border-amber-500/20 overflow-hidden shadow-2xl shadow-amber-500/10">
              <button
                onClick={() => setStatsExpanded(!statsExpanded)}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-amber-500/10 transition-all duration-300"
                type="button"
              >
                <span className="text-amber-400/80 text-sm font-bold">📊 灵根属性</span>
                {statsExpanded ? <ChevronUp className="w-4 h-4 text-amber-400/50" /> : <ChevronDown className="w-4 h-4 text-amber-400/50" />}
              </button>

              <AnimatePresence>
                {statsExpanded && (
                  <motion.div
                    className="border-t border-amber-500/15"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="p-4 space-y-3.5">
                      {Object.entries(gameState.stats).map(([key, value]) => (
                        <div key={key} className="relative group">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-white/50 text-xs group-hover:text-white/70 transition-colors">{STAT_NAMES[key as keyof XianxiaStats]}</span>
                            <span className={`font-black text-sm bg-gradient-to-r ${STAT_COLORS[key as keyof XianxiaStats]} bg-clip-text text-transparent`}>
                              {value}
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${STAT_COLORS[key as keyof XianxiaStats]}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 0.6, type: 'spring' }}
                            />
                          </div>

                          <AnimatePresence>
                            {statPopups.filter(p => p.key === key).map(popup => (
                              <motion.div
                                key={popup.id}
                                className={`absolute -top-1 right-0 text-xs font-black px-2 py-0.5 rounded-lg ${
                                  popup.value > 0
                                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border border-red-500/30'
                                }`}
                                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                                animate={{ opacity: 1, y: -18, scale: 1 }}
                                exit={{ opacity: 0, y: -28 }}
                                transition={{ duration: 1.5 }}
                              >
                                {popup.value > 0 ? '+' : ''}{popup.value}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-t border-amber-500/15" />

              <button
                onClick={() => setInventoryExpanded(!inventoryExpanded)}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-amber-500/10 transition-all duration-300"
                type="button"
              >
                <div className="flex items-center gap-2">
                  <Backpack className="w-4 h-4 text-amber-400/70" />
                  <span className="text-amber-400/80 text-sm font-bold">储物袋</span>
                  <span className="px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-400/70 text-[10px] font-bold border border-amber-500/20">{gameState.inventory.length}</span>
                </div>
                {inventoryExpanded ? <ChevronUp className="w-4 h-4 text-amber-400/50" /> : <ChevronDown className="w-4 h-4 text-amber-400/50" />}
              </button>

              <AnimatePresence>
                {inventoryExpanded && (
                  <motion.div
                    className="border-t border-amber-500/15"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="p-4">
                      {gameState.inventory.length === 0 ? (
                        <div className="text-white/30 text-xs text-center py-3">
                          储物袋空空如也
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {gameState.inventory.map(item => (
                            <button
                              key={item.id}
                              onClick={() => handleUseItem(item)}
                              disabled={!item.usable}
                              className={`w-full flex items-start gap-2.5 p-3 rounded-xl transition-all duration-300 text-left ${
                                item.usable 
                                  ? 'bg-gradient-to-br from-amber-500/10 to-transparent hover:from-amber-500/20 border border-amber-500/20 hover:border-amber-500/40 cursor-pointer group'
                                  : 'bg-white/5 cursor-not-allowed opacity-60 border border-transparent'
                              }`}
                              type="button"
                            >
                              <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-white/80 text-xs font-bold truncate group-hover:text-amber-400 transition-colors">{item.name}</span>
                                  {item.usable && (
                                    <span className="px-1.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/30">使用</span>
                                  )}
                                </div>
                                <div className="text-white/40 text-[10px] truncate mt-0.5">{item.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 px-4 pb-8 pt-40 pointer-events-none">
        <div
          className={`pointer-events-auto max-w-4xl mx-auto transition-all duration-700 ${
            sceneTransition ? 'opacity-0 translate-y-8 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {currentEvent.character && currentEvent.character.name && (
            <div className="flex items-center gap-2 mb-3 ml-6">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                {currentEvent.character.avatar}
              </motion.span>
              <span className={`px-4 py-1.5 rounded-xl text-sm font-black backdrop-blur-2xl border ${
                currentEvent.character.mood === 'sneer' ? 'bg-gradient-to-br from-violet-900/80 to-purple-900/80 text-violet-200 border-violet-500/30' :
                currentEvent.character.mood === 'cold' ? 'bg-gradient-to-br from-slate-800/80 to-zinc-900/80 text-slate-200 border-slate-500/30' :
                currentEvent.character.mood === 'warm' ? 'bg-gradient-to-br from-amber-900/80 to-orange-900/80 text-amber-200 border-amber-500/30' :
                currentEvent.character.mood === 'shocked' ? 'bg-gradient-to-br from-red-900/80 to-rose-900/80 text-red-200 border-red-500/30' :
                'bg-gradient-to-br from-black/80 to-black/60 text-white border-amber-500/20'
              }`}>
                {currentEvent.character.name}
              </span>
            </div>
          )}

          <div
            onClick={skipTyping}
            className="rounded-2xl bg-gradient-to-br from-black/90 to-black/75 backdrop-blur-2xl border border-amber-500/25 p-5 sm:p-7 shadow-2xl shadow-amber-500/10 cursor-pointer group hover:border-amber-500/40 transition-all duration-300"
          >
            <div className="text-white/90 text-sm sm:text-base leading-relaxed whitespace-pre-line max-h-[100px] sm:max-h-[120px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-transparent font-medium">
              {displayedText}
              {isTyping && !diceState.isRolling && (
                <motion.span
                  className="inline-block w-0.5 h-5 bg-amber-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </div>
            {isTyping && (
              <div className="mt-3 text-right text-amber-400/50 text-[10px] group-hover:text-amber-400/70 transition-colors">
                点击跳过...
              </div>
            )}
          </div>

          <AnimatePresence>
            {showChoices && !diceState.isRolling && (
              <motion.div
                className="mt-4 space-y-2.5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ type: 'spring', damping: 25 }}
              >
                {currentEvent.choices.map((choice, idx) => {
                  const canChoose = !choice.conditions || evaluateConditionGroup(choice.conditions, gameState)

                  if (!canChoose) return null

                  return (
                    <motion.button
                      key={choice.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, type: 'spring', damping: 25 }}
                      onClick={() => handleChoice(choice)}
                      className="w-full group text-left px-5 py-3.5 sm:py-4 rounded-xl bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-2xl border border-amber-500/20 hover:from-amber-500/15 hover:to-orange-500/10 hover:border-amber-500/50 transition-all duration-300 flex items-center justify-between gap-4 shadow-lg hover:shadow-amber-500/10"
                      type="button"
                    >
                      <span className="text-white/80 group-hover:text-amber-400 text-sm sm:text-base transition-colors flex-1 font-medium">
                        {choice.text}
                      </span>
                      <div className="flex items-center gap-2">
                        {choice.hiddenCheck && (
                          <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-gradient-to-br from-amber-900/50 to-orange-900/50 text-amber-300/90 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                            <Dices className="w-3 h-3" /> 天道判定
                          </span>
                        )}
                        {choice.conditions && (
                          <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-gradient-to-br from-sky-900/50 to-blue-900/50 text-sky-300/90 text-[10px] font-bold border border-sky-500/30">
                            🔒 机缘
                          </span>
                        )}
                        <ChevronRight className="w-4.5 h-4.5 text-amber-400/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                      </div>
                    </motion.button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isEnding && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, duration: 1.2, type: 'spring' }}
              className="mb-6 relative"
            >
              <div className={`absolute inset-0 rounded-full scale-150 blur-2xl ${
                currentEvent.endingType === 'BAD_END' ? 'bg-red-500/30' :
                currentEvent.endingType === 'GOOD_END' ? 'bg-amber-500/40' :
                'bg-purple-500/30'
              }`} />
              {currentEvent.endingType === 'BAD_END' ? (
                <Skull className="w-24 h-24 mx-auto text-red-500/70 relative z-10 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]" />
              ) : currentEvent.endingType === 'GOOD_END' ? (
                <Trophy className="w-24 h-24 mx-auto text-amber-400/80 relative z-10 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]" />
              ) : (
                <Trophy className="w-24 h-24 mx-auto text-purple-400/70 relative z-10" />
              )}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8, type: 'spring' }}
              className={`text-5xl font-black tracking-wider ${
                currentEvent.endingType === 'BAD_END' ? 'text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]' :
                currentEvent.endingType === 'GOOD_END' ? 'text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]' :
                'text-purple-400'
              }`}
            >
              {currentEvent.endingType}
            </motion.h2>
          </div>
        </div>
      )}

      <XianxiaSaveMenu
        isOpen={showSaveMenu}
        onClose={() => setShowSaveMenu(false)}
        currentState={gameState}
        onLoad={(savedState) => {
          setGameState(savedState)
          setCurrentEvent(null)
          setItemToast({ id: Date.now(), message: '仙途重续成功！', itemName: '📂' })
        }}
        onSave={() => {
          setItemToast({ id: Date.now(), message: '道心已记录！', itemName: '💾' })
        }}
      />
    </div>
  )
}
