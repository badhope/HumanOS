/**
 * ==============================================
 * 💾 状态管理器 - 纯函数状态修改器
 * ==============================================
 * 【模块定位】
 * Redux式纯函数状态管理
 * 所有游戏状态修改的唯一入口
 * 保证可回溯/可重现的时间机器
 * 
 * 【受管理的状态域】
 * - stats: 玩家可见的6维属性
 * - hidden: 8个隐藏维度（作弊器才能看）
 * - flags: 剧情标记位集合
 * - relationships: NPC好感度Map
 * - cooldowns: 事件冷却计时器
 * 
 * 【⚠️  可重现性关键】
 * 所有修改必须是immutable的！
 * 直接修改state会导致读档崩溃！
 * hidden字段是存档兼容的关键！删字段会坏档！
 */
import type { GameState, GameEvent, EventEffects } from './types'
import { INITIAL_STATS } from '../types'
import { ITEM_POOL, type InventoryItem } from '../probability-system'

export function createInitialState(): GameState {
  return {
    stats: { ...INITIAL_STATS },
    inventory: [],
    hidden: {
      day: 1,
      time_of_day: 'morning',
      mo_haofu_trust: 0,
      hanli_suspicion: 0,
      qixuan_reputation: 0,
      demonic_tendency: 0,
      immortal_fate: 50,
      poison_resistance: 0,
      medicine_residue: 0,
    },
    flags: new Set(),
    relationships: new Map([
      ['mo_haofu', 0],
      ['doctor_zhang', 0],
      ['elder_wang', 0],
    ]),
    eventHistory: new Map(),
    cooldowns: new Map(),
    currentEventId: null,
    turn: 0,
  }
}

export function applyEffects(state: GameState, effects: EventEffects): GameState {
  const newState = deepCloneState(state)

  if (effects.stats) {
    Object.entries(effects.stats).forEach(([key, value]) => {
      const current = newState.stats[key as keyof typeof newState.stats] ?? 0
      newState.stats[key as keyof typeof newState.stats] = Math.max(0, Math.min(100, current + (value as number)))
    })
  }

  if (effects.hidden) {
    Object.entries(effects.hidden).forEach(([key, value]) => {
      const current = newState.hidden[key as keyof typeof newState.hidden]
      if (typeof current === 'number' && typeof value === 'number') {
        (newState.hidden as Record<string, any>)[key] = current + value
      } else {
        (newState.hidden as Record<string, any>)[key] = value
      }
    })
  }

  if (effects.flags) {
    effects.flags.forEach(f => newState.flags.add(f))
  }

  if (effects.removeFlags) {
    effects.removeFlags.forEach(f => newState.flags.delete(f))
  }

  if (effects.inventory) {
    effects.inventory.forEach(itemId => {
      const item = ITEM_POOL[itemId]
      if (item && !newState.inventory.some(i => i.id === itemId)) {
        newState.inventory.push(item)
        if (item.effects) {
          Object.entries(item.effects).forEach(([key, value]) => {
            const current = newState.stats[key as keyof typeof newState.stats] ?? 0
            newState.stats[key as keyof typeof newState.stats] = Math.max(0, Math.min(100, current + value))
          })
        }
      }
    })
  }

  if (effects.removeItems) {
    newState.inventory = newState.inventory.filter(i => !effects.removeItems!.includes(i.id))
  }

  if (effects.relationships) {
    Object.entries(effects.relationships).forEach(([npc, value]) => {
      const current = newState.relationships.get(npc) ?? 0
      newState.relationships.set(npc, Math.max(-100, Math.min(100, current + value)))
    })
  }

  return newState
}

export function advanceTime(state: GameState): GameState {
  const newState = deepCloneState(state)
  newState.turn += 1

  const timeOrder = ['morning', 'afternoon', 'evening', 'night'] as const
  const currentIndex = timeOrder.indexOf(newState.hidden.time_of_day)
  
  if (currentIndex === timeOrder.length - 1) {
    newState.hidden.time_of_day = 'morning'
    newState.hidden.day += 1
  } else {
    newState.hidden.time_of_day = timeOrder[currentIndex + 1]
  }

  newState.cooldowns.forEach((cd, key) => {
    if (cd > 0) {
      newState.cooldowns.set(key, cd - 1)
    }
  })

  if (newState.hidden.medicine_residue > 0) {
    newState.hidden.medicine_residue = Math.max(0, newState.hidden.medicine_residue - 2)
  }

  return newState
}

export function recordEventOccurrence(state: GameState, eventId: string, cooldown: number): GameState {
  const newState = deepCloneState(state)
  
  const count = newState.eventHistory.get(eventId) ?? 0
  newState.eventHistory.set(eventId, count + 1)
  
  if (cooldown > 0) {
    newState.cooldowns.set(eventId, cooldown)
  }

  newState.currentEventId = eventId
  
  return newState
}

export function useItem(state: GameState, item: InventoryItem): { newState: GameState; message: string; triggerEvent?: string } {
  const newState = deepCloneState(state)
  let message = `使用了 ${item.name}`
  let triggerEvent: string | undefined

  if (item.onUse) {
    message = item.onUse.message
    triggerEvent = item.onUse.triggerEvent

    if (item.onUse.effects) {
      Object.entries(item.onUse.effects).forEach(([key, value]) => {
        const current = newState.stats[key as keyof typeof newState.stats] ?? 0
        newState.stats[key as keyof typeof newState.stats] = Math.max(0, Math.min(100, current + (value as number)))
      })
    }

    if (item.onUse.hiddenEffects) {
      Object.entries(item.onUse.hiddenEffects).forEach(([key, value]) => {
        const current = newState.hidden[key as keyof typeof newState.hidden]
        if (typeof current === 'number' && typeof value === 'number') {
          (newState.hidden as Record<string, any>)[key] = current + value
        }
      })
    }

    if (item.consumable) {
      newState.inventory = newState.inventory.filter(i => i.id !== item.id)
    }
  }

  return { newState, message, triggerEvent }
}

function deepCloneState(state: GameState): GameState {
  return {
    stats: { ...state.stats },
    inventory: [...state.inventory],
    hidden: { ...state.hidden },
    flags: new Set(state.flags),
    relationships: new Map(state.relationships),
    eventHistory: new Map(state.eventHistory),
    cooldowns: new Map(state.cooldowns),
    currentEventId: state.currentEventId,
    turn: state.turn,
  }
}
