import { useState, useCallback, useMemo } from 'react'
import type { EconomyState, MarketOrder, GameEvent } from '../types/economy-types'

const INITIAL_STATE: EconomyState = {
  turn: 1,
  money: 10000,
  population: 1000,
  happiness: 75,
  stability: 80,
  treasury: 50000,
  taxRate: 15,
  industries: [],
  prices: [],
  orders: [],
  events: [],
  unlockedBuildings: [],
}

export function useEconomyState(initialState?: Partial<EconomyState>) {
  const [state, setState] = useState<EconomyState>({
    ...INITIAL_STATE,
    ...initialState,
  })

  const nextTurn = useCallback(() => {
    setState(prev => ({
      ...prev,
      turn: prev.turn + 1,
    }))
  }, [])

  const addMoney = useCallback((amount: number) => {
    setState(prev => ({
      ...prev,
      money: Math.max(0, prev.money + amount),
    }))
  }, [])

  const addOrder = useCallback((order: Omit<MarketOrder, 'id' | 'createdAt' | 'filled' | 'status'>) => {
    const newOrder: MarketOrder = {
      ...order,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      filled: 0,
      status: 'pending',
    }
    setState(prev => ({
      ...prev,
      orders: [...prev.orders, newOrder],
    }))
  }, [])

  const cancelOrder = useCallback((orderId: string) => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(o =>
        o.id === orderId ? { ...o, status: 'cancelled' as const } : o
      ),
    }))
  }, [])

  const addEvent = useCallback((event: Omit<GameEvent, 'id' | 'remainingTurns'>) => {
    const newEvent: GameEvent = {
      ...event,
      id: `event-${Date.now()}`,
      remainingTurns: event.duration,
    }
    setState(prev => ({
      ...prev,
      events: [newEvent, ...prev.events].slice(0, 10),
    }))
  }, [])

  const metrics = useMemo(() => {
    const gdp = state.industries.reduce((sum, ind) => sum + ind.productionRate, 0)
    const gdpPerCapita = state.population > 0 ? gdp / state.population : 0
    const activeOrders = state.orders.filter(o => o.status === 'pending').length
    const activeEvents = state.events.filter(e => e.remainingTurns > 0).length

    return {
      gdp,
      gdpPerCapita,
      activeOrders,
      activeEvents,
      orderBookValue: state.orders.reduce((sum, o) => sum + o.price * o.quantity, 0),
    }
  }, [state])

  return {
    state,
    setState,
    nextTurn,
    addMoney,
    addOrder,
    cancelOrder,
    addEvent,
    metrics,
  }
}
