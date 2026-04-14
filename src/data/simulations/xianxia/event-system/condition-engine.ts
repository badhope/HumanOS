/**
 * ==============================================
 * 🔍 事件条件引擎 - 规则系统核心
 * ==============================================
 * 【模块定位】
 * CK3式事件触发的核心规则匹配器
 * 所有事件能否触发的裁决者
 * 基于多维度加权的事件筛选器
 * 
 * 【支持的条件类型】
 * - stat: 属性数值比较（根骨/悟性/气运等）
 * - item: 物品持有检查
 * - flag: 标记位检查
 * - hidden: 隐藏数值（玩家不可见）
 * - relationship: NPC好感度
 * - random: 纯概率骰检定
 * - cooldown: 冷却时间检查
 * 
 * 【⚠️  最容易踩坑的地方】
 * AND/OR组是递归嵌套的！
 * 写错括号会导致事件永远/永不触发！
 * 所有条件key必须与state-manager中的字段完全一致！
 */
import type { GameState, Condition, ConditionGroup, GameEvent } from './types'

export function evaluateSingleCondition(condition: Condition, state: GameState): boolean {
  const { type, key, operator, value } = condition

  switch (type) {
    case 'stat': {
      const statValue = state.stats[key as keyof typeof state.stats] ?? 0
      return compareValues(statValue, operator, value)
    }

    case 'item': {
      const hasItem = state.inventory.some(i => i.id === key)
      return operator === 'has' ? hasItem : !hasItem
    }

    case 'flag': {
      const hasFlag = state.flags.has(key)
      return operator === 'has' ? hasFlag : !hasFlag
    }

    case 'hidden': {
      const hiddenValue = state.hidden[key as keyof typeof state.hidden]
      if (typeof hiddenValue === 'number') {
        return compareValues(hiddenValue, operator, value)
      }
      return hiddenValue === value
    }

    case 'relationship': {
      const relValue = state.relationships.get(key) ?? 0
      return compareValues(relValue, operator, value)
    }

    case 'random': {
      const roll = Math.random() * 100
      return compareValues(roll, operator, value)
    }

    case 'cooldown': {
      const cd = state.cooldowns.get(key) ?? 0
      return cd <= 0
    }

    default:
      return true
  }
}

function compareValues(a: number, operator: string, b: number): boolean {
  switch (operator) {
    case '>': return a > b
    case '<': return a < b
    case '>=': return a >= b
    case '<=': return a <= b
    case '==': return a === b
    case '!=': return a !== b
    default: return false
  }
}

export function evaluateConditionGroup(group: ConditionGroup, state: GameState): boolean {
  if (group.AND && group.AND.length > 0) {
    const allPass = group.AND.every(c => evaluateSingleCondition(c, state))
    if (!allPass) return false
  }

  if (group.OR && group.OR.length > 0) {
    const anyPass = group.OR.some(c => evaluateSingleCondition(c, state))
    if (!anyPass) return false
  }

  if (group.NOT && group.NOT.length > 0) {
    const nonePass = group.NOT.every(c => !evaluateSingleCondition(c, state))
    if (!nonePass) return false
  }

  return true
}

export function getAvailableEvents(events: GameEvent[], state: GameState): GameEvent[] {
  return events.filter(event => {
    if (event.onceOnly && state.eventHistory.has(event.id)) {
      return false
    }

    const occurrences = state.eventHistory.get(event.id) ?? 0
    if (occurrences >= event.maxOccurrences) {
      return false
    }

    const cooldown = state.cooldowns.get(event.id) ?? 0
    if (cooldown > 0) {
      return false
    }

    if (event.is_mainline && event.fallback_trigger_day) {
      if (state.hidden.day >= event.fallback_trigger_day) {
        return true
      }
    }

    return evaluateConditionGroup(event.conditions, state)
  })
}

export function applyMainlinePriorityBoost(events: GameEvent[], state: GameState): GameEvent[] {
  return events.map(event => {
    if (!event.is_mainline || !event.deadline_day) return event
    
    const daysRemaining = event.deadline_day - state.hidden.day
    const urgencyMultiplier = daysRemaining <= 0 ? 1000 : 
                              daysRemaining <= 3 ? 5 : 
                              daysRemaining <= 7 ? 2 : 1
    
    return {
      ...event,
      weight: event.weight * urgencyMultiplier
    }
  })
}

export function calculateScaledThreshold(event: GameEvent, state: GameState): number {
  if (!event.difficulty_scaling) return 50
  
  const { stat, base_threshold, per_point_reduction, min_threshold } = event.difficulty_scaling
  const statValue = state.stats[stat] ?? 0
  const reduction = statValue * per_point_reduction
  
  return Math.max(min_threshold, base_threshold - reduction)
}

export function weightedRandomSelect(events: GameEvent[]): GameEvent | null {
  if (events.length === 0) return null

  events.sort((a, b) => b.priority - a.priority)

  const totalWeight = events.reduce((sum, e) => sum + e.weight, 0)
  let roll = Math.random() * totalWeight

  for (const event of events) {
    roll -= event.weight
    if (roll <= 0) {
      return event
    }
  }

  return events[events.length - 1]
}
