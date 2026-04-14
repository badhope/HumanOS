/**
 * ==============================================
 * 🎲 事件分发器 - 叙事大脑
 * ==============================================
 * 【模块定位】
 * 整个仙侠事件系统的总指挥
 * 实现Paradox式加权随机事件抽取算法
 * 主线/支线自动优先级调度
 * 
 * 【核心算法】
 * - 第一步：条件引擎筛选所有可触发事件
 * - 第二步：主线事件优先级加权
 * - 第三步：带权重的随机抽取
 * - 第四步：隐藏检定自动骰
 * 
 * ==============================================
 * 🤖 AI编码契约 - 大模型修改此文件必须遵守！
 * ==============================================
 * 🔴 绝对禁止的操作：
 * 1. 不准修改加权算法的核心公式
 * 2. 不准修改applyMainlinePriorityBoost的调用位置
 * 3. 不准删除hiddenCheck的自动执行逻辑
 * 4. 不准修改processChoice的返回值结构
 * 
 * 🟡 修改前必须完成的校验：
 * 1. 调整权重后必须跑1000次模拟验证分布
 * 2. 主线权重系数永远>支线权重×3
 * 3. 任何概率改动必须保证主线事件占比>60%
 * 
 * 🟢 允许的操作：
 * - 新增事件后的注册逻辑
 * - 调整权重系数数值
 * - 新增特殊事件触发钩子
 * 
 * 【⚠️  血泪教训！】
 * 支线事件weight=15，主线weight=10 = 玩家永远走不到主线！
 */
import type { GameState, GameEvent, EventChoice } from './types'
import type { CheckResult } from '../probability-system'
import { getAvailableEvents, weightedRandomSelect, evaluateConditionGroup, applyMainlinePriorityBoost, calculateScaledThreshold } from './condition-engine'
import { applyEffects, advanceTime, recordEventOccurrence } from './state-manager'
import { performCheck, calculateSuccessProbability } from '../probability-system'
import { ALL_EVENTS } from './event-pool/chapter1-events'

export class EventDispatcher {
  private events: GameEvent[] = ALL_EVENTS

  getNextEvent(state: GameState): GameEvent | null {
    let available = getAvailableEvents(this.events, state)
    available = applyMainlinePriorityBoost(available, state)
    return weightedRandomSelect(available)
  }

  getScaledThreshold(event: GameEvent, state: GameState): number {
    return calculateScaledThreshold(event, state)
  }

  getSpecificEvent(eventId: string): GameEvent | null {
    return this.events.find(e => e.id === eventId) || null
  }

  processChoice(
    state: GameState,
    choice: EventChoice,
    currentEvent?: GameEvent
  ): { newState: GameState; shouldRoll: boolean; check: any | null } {
    let newState = state

    if (choice.conditions) {
      const canChoose = evaluateConditionGroup(choice.conditions, state)
      if (!canChoose) {
        return { newState: state, shouldRoll: false, check: null }
      }
    }

    if (choice.hiddenCheck) {
      const check = choice.hiddenCheck
      let threshold = check.threshold
      
      if (currentEvent?.difficulty_scaling && currentEvent.difficulty_scaling.stat === check.stat) {
        threshold = calculateScaledThreshold(currentEvent, state)
      }

      const { probability } = calculateSuccessProbability(
        state.stats[check.stat],
        threshold
      )

      return {
        newState: state,
        shouldRoll: true,
        check: {
          ...check,
          threshold,
          probability,
          scaled: currentEvent?.difficulty_scaling ? true : false,
        },
      }
    }

    if (choice.effects) {
      newState = applyEffects(state, choice.effects)
    }

    newState = advanceTime(newState)

    return { newState, shouldRoll: false, check: null }
  }

  processCheckResult(
    state: GameState,
    check: any,
    result: CheckResult
  ): GameState {
    let newState = state

    const resultEffects = check.onCheckResult?.[result]
    if (resultEffects) {
      newState = applyEffects(newState, resultEffects)
    }

    newState = advanceTime(newState)

    return newState
  }

  startEvent(state: GameState, event: GameEvent): GameState {
    let newState = recordEventOccurrence(state, event.id, event.cooldown)

    if (event.effects) {
      newState = applyEffects(newState, event.effects)
    }

    return newState
  }

  forceEvent(state: GameState, eventId: string): GameEvent | null {
    return this.events.find(e => e.id === eventId) || null
  }
}

export const eventDispatcher = new EventDispatcher()
