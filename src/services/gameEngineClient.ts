// =============================================================================
//  国家模拟引擎 - 前后端智能客户端
//  自动选择计算源：后端优先，自动降级前端，无缝用户体验
// =============================================================================
import { useState, useCallback, useRef, useEffect } from 'react'
import type { EconomyState } from '@data/simulations/market-economy/types'
import { executeEconomyTick } from '@data/simulations/market-economy/economy-engine'

const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const ENABLE_BACKEND = true
const PING_TIMEOUT = 2000
const MAX_RETRIES = 3
const FALLBACK_AFTER_FAILURES = 5

type ComputeSource = 'backend' | 'frontend' | 'auto'
type EngineStatus = 'idle' | 'computing' | 'error' | 'switching'

interface EngineMetrics {
  backendLatency: number[]
  frontendLatency: number[]
  failures: number
  successCount: number
}

interface SessionInfo {
  sessionId: string
  stateHash: string
  created: number
}

// =============================================================================
//  核心引擎客户端类
// =============================================================================
class GameEngineClient {
  private computeSource: ComputeSource
  private status: EngineStatus
  private session: SessionInfo | null
  private metrics: EngineMetrics
  private retryCount: number
  private backendAvailable: boolean
  private listeners: Set<() => void>

  constructor() {
    this.computeSource = 'auto'
    this.status = 'idle'
    this.session = null
    this.metrics = {
      backendLatency: [],
      frontendLatency: [],
      failures: 0,
      successCount: 0,
    }
    this.retryCount = 0
    this.backendAvailable = true
    this.listeners = new Set()
  }

  // ---------------------------------------------------------------------------
  //  后端健康检查
  // ---------------------------------------------------------------------------
  async checkBackendHealth(): Promise<boolean> {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), PING_TIMEOUT)

      const res = await fetch(`${BACKEND_BASE}/health`, {
        signal: controller.signal,
      })

      clearTimeout(timeout)
      this.backendAvailable = res.ok
      return res.ok
    } catch {
      this.backendAvailable = false
      return false
    }
  }

  // ---------------------------------------------------------------------------
  //  创建会话
  // ---------------------------------------------------------------------------
  async createSession(initialState: EconomyState): Promise<boolean> {
    if (!ENABLE_BACKEND || !this.backendAvailable) {
      return false
    }

    try {
      const res = await fetch(
        `${BACKEND_BASE}/api/v1/game/session/create?country_id=${initialState.countryId}&difficulty=${initialState.difficulty}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(initialState),
        }
      )

      if (res.ok) {
        const data = await res.json()
        this.session = {
          sessionId: data.session_id,
          stateHash: data.state_hash,
          created: Date.now(),
        }
        return true
      }
    } catch (e) {
      console.log('[Engine] 后端会话创建失败，降级到前端计算:', e)
    }

    this.backendAvailable = false
    return false
  }

  // ---------------------------------------------------------------------------
  //  执行 Tick - 智能路由
  // ---------------------------------------------------------------------------
  async executeTick(
    state: EconomyState,
    steps: number = 1
  ): Promise<{ state: EconomyState; source: ComputeSource; latency: number }> {
    const start = performance.now()

    // 后端优先策略
    if (this.shouldUseBackend()) {
      try {
        const result = await this.executeBackendTick(state, steps)
        this.recordMetrics('backend', performance.now() - start)
        return { ...result, source: 'backend' }
      } catch (e) {
        console.warn('[Engine] 后端计算失败，降级到前端:', e)
        this.metrics.failures++
      }
    }

    // 降级到前端计算
    const result = this.executeFrontendTick(state, steps)
    this.recordMetrics('frontend', performance.now() - start)
    return { ...result, source: 'frontend' }
  }

  // ---------------------------------------------------------------------------
  //  后端 Tick 执行
  // ---------------------------------------------------------------------------
  private async executeBackendTick(
    state: EconomyState,
    steps: number
  ): Promise<{ state: EconomyState; source: ComputeSource; latency: number }> {
    if (!this.session) {
      const ok = await this.createSession(state)
      if (!ok) throw new Error('无法创建后端会话')
    }

    const start = performance.now()

    const res = await fetch(
      `${BACKEND_BASE}/api/v1/game/tick/${this.session!.sessionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          steps,
          state_hash: this.session!.stateHash,
          state,
        }),
      }
    )

    if (res.status === 409) {
      console.warn('[Engine] 状态不一致，重新同步会话')
      this.session = null
      throw new Error('状态不一致')
    }

    if (!res.ok) {
      throw new Error(`后端错误: ${res.status}`)
    }

    const result = await res.json()
    this.session!.stateHash = result.new_state_hash

    const latency = performance.now() - start

    return {
      state: result.state,
      source: 'backend' as ComputeSource,
      latency,
    }
  }

  // ---------------------------------------------------------------------------
  //  前端 Tick 执行（原有逻辑保留，作为降级方案）
  // ---------------------------------------------------------------------------
  private executeFrontendTick(
    state: EconomyState,
    steps: number
  ): Promise<{ state: EconomyState; source: ComputeSource; latency: number }> {
    const start = performance.now()
    let newState = state

    for (let i = 0; i < steps; i++) {
      newState = executeEconomyTick(newState)
    }

    return Promise.resolve({
      state: newState,
      source: 'frontend' as ComputeSource,
      latency: performance.now() - start,
    })
  }

  // ---------------------------------------------------------------------------
  //  增量 Diff 应用
  // ---------------------------------------------------------------------------
  private applyStateDiff(state: EconomyState, diff: any): EconomyState {
    const newState: any = { ...state }

    for (const key of Object.keys(diff)) {
      if (typeof diff[key] === 'object' && diff[key] !== null) {
        newState[key] = {
          ...(newState[key] || {}),
          ...diff[key],
        }
      } else {
        newState[key] = diff[key]
      }
    }

    return newState as EconomyState
  }

  // ---------------------------------------------------------------------------
  //  决策逻辑
  // ---------------------------------------------------------------------------
  private shouldUseBackend(): boolean {
    if (!ENABLE_BACKEND || !this.backendAvailable) return false
    if (this.metrics.failures >= FALLBACK_AFTER_FAILURES) return false
    return true
  }

  private recordMetrics(source: 'backend' | 'frontend', latency: number) {
    const arr = source === 'backend' ? this.metrics.backendLatency : this.metrics.frontendLatency
    arr.push(latency)
    if (arr.length > 50) arr.shift()
    this.metrics.successCount++
    this.notifyListeners()
  }

  getStats() {
    const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0
    return {
      computeSource: this.computeSource,
      backendAvailable: this.backendAvailable,
      hasSession: !!this.session,
      avgBackendLatency: avg(this.metrics.backendLatency),
      avgFrontendLatency: avg(this.metrics.frontendLatency),
      ...this.metrics,
    }
  }

  forceFallback() {
    this.backendAvailable = false
    this.notifyListeners()
  }

  resetFallback() {
    this.backendAvailable = true
    this.metrics.failures = 0
    this.notifyListeners()
  }

  subscribe(callback: () => void) {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  private notifyListeners() {
    this.listeners.forEach((cb) => cb())
  }
}

// 单例实例
export const gameEngine = new GameEngineClient()

// =============================================================================
//  React Hook
// =============================================================================
export function useGameEngine() {
  const [, forceUpdate] = useState({})
  const statusRef = useRef<'idle' | 'computing'>('idle')

  useEffect(() => {
    const unsubscribe = gameEngine.subscribe(() => forceUpdate({}))
    return () => { unsubscribe() }
  }, [])

  const executeTick = useCallback(
    async (state: EconomyState, steps: number = 1) => {
      statusRef.current = 'computing'
      forceUpdate({})

      const result = await gameEngine.executeTick(state, steps)

      statusRef.current = 'idle'
      forceUpdate({})
      return result
    },
    []
  )

  return {
    executeTick,
    status: statusRef.current,
    stats: gameEngine.getStats(),
    forceFallback: () => gameEngine.forceFallback(),
    resetFallback: () => gameEngine.resetFallback(),
    checkHealth: () => gameEngine.checkBackendHealth(),
  }
}

// =============================================================================
//  计算状态指示器组件（可选，在UI中导入）
// =============================================================================
export function getComputeStatusInfo() {
  const stats = gameEngine.getStats()
  
  if (!ENABLE_BACKEND) return { color: 'text-gray-500', label: '本地计算' }
  if (!stats.backendAvailable) return { color: 'text-amber-500', label: '离线模式' }
  if (stats.hasSession) return { 
    color: 'text-emerald-500', 
    label: `云端加速 (${stats.avgBackendLatency.toFixed(0)}ms)` 
  }
  return { color: 'text-blue-500', label: '连接中...' }
}
