import { useState, useEffect, useCallback } from 'react'
import {
  MathematicalEconomyEngine,
  DIFFICULTY_PRESETS,
  GameAction,
} from '../../engine/MathematicalEconomyEngine'
import Hoi4GameLayout from '../layout/Hoi4GameLayout'
import CenterViewPanel from '../game/CenterViewPanel'
import GameMenuPanels from '../game/GameMenuPanels'
import EventModal from '../game/EventModal'
import RandomEventPopup from '../game/RandomEventPopup'
import GameOverScreen from '../game/GameOverScreen'
import { GameEvent } from '../../data/game/usa-events'
import { RandomEvent } from '../../data/game/usa-random-events'
import { ToastProvider, useToast } from '../ui/ToastSystem'

type Difficulty = 'easy' | 'hard' | 'hell'
const SPEEDS = [1, 2, 3, 5]

function GameContent() {
  const { showToast } = useToast()
  const [difficulty, setDifficulty] = useState<Difficulty>('hard')
  const [gameState, setGameState] = useState(() =>
    MathematicalEconomyEngine.getUSA2019InitialState()
  )
  const [isPaused, setIsPaused] = useState(true)
  const [speedIndex, setSpeedIndex] = useState(1)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [centerViewMode, setCenterViewMode] = useState('world_map')
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null)
  const [currentRandomEvent, setCurrentRandomEvent] = useState<RandomEvent | null>(null)
  const [gameOver, setGameOver] = useState<{ reason: string; scenario?: string } | null>(null)

  const day = gameState.day

  useEffect(() => {
    if (gameState.events.pending.length > 0 && !currentEvent) {
      setCurrentEvent(gameState.events.pending[0])
    }
  }, [gameState.events.pending, currentEvent])

  useEffect(() => {
    if (gameState.randomEvents.pending.length > 0 && !currentRandomEvent) {
      setCurrentRandomEvent(gameState.randomEvents.pending[0])
      setIsPaused(true)
    }
  }, [gameState.randomEvents.pending, currentRandomEvent])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setGameState(prev => {
        const newState = MathematicalEconomyEngine.computeGameTick(
          prev,
          DIFFICULTY_PRESETS[difficulty]
        )
        
        const result = MathematicalEconomyEngine.checkGameOver(newState)
        if (result.gameOver && result.reason) {
          setGameOver({ reason: result.reason, scenario: result.scenario })
          setIsPaused(true)
        }
        
        return newState
      })
    }, 500 / SPEEDS[speedIndex])
    return () => clearInterval(timer)
  }, [isPaused, speedIndex, difficulty, gameOver])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      
      switch (e.key) {
        case ' ':
          e.preventDefault()
          setIsPaused(p => !p)
          break
        case '1':
          setSpeedIndex(0)
          break
        case '2':
          setSpeedIndex(1)
          break
        case '3':
          setSpeedIndex(2)
          break
        case '4':
          setSpeedIndex(3)
          break
        case '5':
          setSpeedIndex(4)
          break
        case 'Escape':
          e.preventDefault()
          setCurrentEvent(null)
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleStartFocus = useCallback((focusId: string) => {
    setGameState(prev =>
      MathematicalEconomyEngine.dispatchAction(prev, {
        type: 'START_FOCUS',
        payload: { focusId },
      })
    )
    if (focusId === '__cancel__') {
      showToast('已取消当前国策', 'warning')
    } else {
      showToast('🚀 国策已启动！', 'success')
    }
  }, [showToast])

  const handleStartResearch = useCallback((techId: string) => {
    setGameState(prev =>
      MathematicalEconomyEngine.dispatchAction(prev, {
        type: 'START_RESEARCH',
        payload: { techId },
      })
    )
    showToast('🔬 开始研究科技！', 'success')
  }, [showToast])

  const handleResolveEvent = useCallback((eventId: string, optionIndex: number) => {
    setGameState(prev =>
      MathematicalEconomyEngine.dispatchAction(prev, {
        type: 'RESOLVE_EVENT',
        payload: { eventId, optionIndex },
      })
    )
    setCurrentEvent(null)
    showToast('✅ 事件已处理', 'success')
  }, [showToast])

  const handleUseDecree = useCallback((decreeId: string) => {
    const result = MathematicalEconomyEngine.dispatchAction(gameState, {
      type: 'USE_DECREE',
      payload: { decreeId },
    })
    if (result === gameState) {
      const decree = result.decrees.cooldowns[decreeId] > 0 ? '法令冷却中' : '政治点不足'
      showToast(`❌ ${decree}`, 'error')
      return
    }
    setGameState(result)
    showToast('📜 总统法令已生效！', 'success')
  }, [gameState, showToast])

  const handleResolveRandomEvent = useCallback((optionIndex: number) => {
    if (!currentRandomEvent) return
    setGameState(prev =>
      MathematicalEconomyEngine.dispatchAction(prev, {
        type: 'RESOLVE_RANDOM_EVENT',
        payload: { eventId: currentRandomEvent.id, optionIndex },
      })
    )
    setCurrentRandomEvent(null)
    setIsPaused(false)
    showToast('✅ 事件已解决', 'success')
  }, [currentRandomEvent, showToast])

  const handleRestart = useCallback(() => {
    setGameState(MathematicalEconomyEngine.getUSA2019InitialState())
    setGameOver(null)
    setIsPaused(true)
    showToast('🔄 游戏已重置', 'info')
  }, [showToast])

  return (
    <>
      <EventModal
        event={currentEvent}
        onResolve={handleResolveEvent}
      />

      <Hoi4GameLayout
        date={{ year: 2019 + Math.floor(day / 365), month: 1 + Math.floor((day % 365) / 30), day: 1 + (day % 30) }}
        day={day}
        gameState={gameState}
        resources={{
          treasury: 21.7 - gameState.economy.budgetDeficit * day / 365,
          politicalCapital: gameState.political.politicalCapital,
          stability: gameState.political.stability,
          approval: gameState.political.approval,
        }}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
        speed={SPEEDS[speedIndex]}
        onChangeSpeed={() => setSpeedIndex(i => (i + 1) % SPEEDS.length)}
        menuContent={
          <GameMenuPanels
            activeCategory={activeCategory}
            onSelectTab={(tabId: string, centerMode: string) => setCenterViewMode(centerMode)}
            state={gameState}
          />
        }
        onCategoryChange={setActiveCategory}
      >
        <CenterViewPanel
          mode={centerViewMode}
          state={gameState}
          onModeChange={setCenterViewMode}
          onStartFocus={handleStartFocus}
          onStartResearch={handleStartResearch}
          onUseDecree={handleUseDecree}
        />

        <EventModal
          event={currentEvent}
          onResolve={handleResolveEvent}
        />

        <RandomEventPopup
          event={currentRandomEvent}
          onSelect={handleResolveRandomEvent}
        />

        {gameOver && (
          <GameOverScreen
            reason={gameOver.reason as any}
            scenarioId={gameOver.scenario}
            day={day}
            onRestart={handleRestart}
          />
        )}
      </Hoi4GameLayout>
    </>
  )
}

export default function EconomyDashboardHoi4() {
  return (
    <ToastProvider>
      <GameContent />
    </ToastProvider>
  )
}
