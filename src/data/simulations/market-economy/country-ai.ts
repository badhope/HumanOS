/**
 * ==============================================
 * 🧠 国家AI决策引擎 - 市场经济模拟大脑
 * ==============================================
 * 【模块定位】
 * 每个国家的人工智能大脑，基于Victoria 3 AI行为模型
 * 模拟11个主要国家的真实地缘政治和经济决策逻辑
 * 整个模拟器最核心的"智能"来源
 * 
 * 【核心机制】
 * - 4种人格模型：激进/保守/平衡/重商
 * - 多维度效用函数计算每个决策的收益
 * - 基于国家特性的固有偏见（美国好战，中国重商，德国严谨）
 * - 动态风险评估系统
 * 
 * 【⚠️  超级重要警告】
 * 每个国家的personality硬编码在第65行countryPersonality中！
 * 新增国家必须在这里配置，否则AI不会行动！
 * 人格系数直接影响整个世界线走向！
 */
import type { CountryAI, WorldEvent } from './vic3-types'
import type { EconomyState } from './types'
import { applyEventOption } from './economy-engine'
import { WORLD_EVENTS } from './world-events'

export interface AIAction {
  id: string
  name: string
  actionType: 'policy' | 'economic' | 'diplomatic' | 'military' | 'event_response'
  priority: number
  effects: { type: string; value: number }[]
  targetCountry?: string
}

const AI_PERSONALITIES = {
  aggressive: {
    military_bias: 1.5,
    economic_bias: 0.8,
    risk_tolerance: 1.4,
    diplomacy_bias: 0.6,
  },
  passive: {
    military_bias: 0.6,
    economic_bias: 1.2,
    risk_tolerance: 0.7,
    diplomacy_bias: 1.5,
  },
  balanced: {
    military_bias: 1.0,
    economic_bias: 1.0,
    risk_tolerance: 1.0,
    diplomacy_bias: 1.0,
  },
  mercantilist: {
    military_bias: 0.8,
    economic_bias: 1.6,
    risk_tolerance: 0.9,
    diplomacy_bias: 0.8,
  },
}

export function createAIForCountry(countryId: string): CountryAI {
  const personalityRoll = Math.random()
  let personality: CountryAI['personality']
  
  const countryPersonality: { [key: string]: CountryAI['personality'] } = {
    usa: 'aggressive',
    china: 'mercantilist',
    russia: 'aggressive',
    eu: 'balanced',
    japan: 'mercantilist',
    germany: 'balanced',
    uk: 'balanced',
    india: 'passive',
    brazil: 'passive',
    france: 'balanced',
  }
  
  personality = countryPersonality[countryId] || 'balanced'
  
  return {
    countryId,
    personality,
    priorities: {
      economic_growth: 0.5 + Math.random() * 0.5,
      military_power: 0.3 + Math.random() * 0.4,
      social_welfare: 0.3 + Math.random() * 0.5,
      autarky: 0.2 + Math.random() * 0.4,
    },
    relations: {},
    lastActions: [],
  }
}

export function evaluateAIAction(
  ai: CountryAI,
  state: EconomyState,
  action: AIAction
): number {
  let score = action.priority
  const traits = AI_PERSONALITIES[ai.personality]
  
  if (action.actionType === 'military') {
    score *= traits.military_bias
  }
  if (action.actionType === 'economic') {
    score *= traits.economic_bias
  }
  
  if (state.stats.inflation > 15) {
    const antiInflationActions = ['lower_taxes', 'cut_spending', 'interest_rate_hike']
    if (antiInflationActions.includes(action.id)) {
      score *= 1.5
    }
  }
  
  if (state.stats.unemployment > 15) {
    const jobsActions = ['infrastructure', 'industrial_subsidy', 'job_guarantee']
    if (jobsActions.includes(action.id)) {
      score *= 1.8
    }
  }
  
  if (state.treasury.gold < 5000) {
    score *= state.treasury.gold < 0 ? 0.1 : 0.5
  }
  
  if (state.stats.stability < 30) {
    score *= 0.4
  }
  
  return score * traits.risk_tolerance
}

export function selectAIAction(
  ai: CountryAI,
  state: EconomyState,
  availableActions: AIAction[]
): AIAction | null {
  if (availableActions.length === 0) return null
  
  const scoredActions = availableActions.map(action => ({
    action,
    score: evaluateAIAction(ai, state, action),
  }))
  
  scoredActions.sort((a, b) => b.score - a.score)
  
  const totalScore = scoredActions.reduce((sum, a) => sum + a.score, 0)
  let random = Math.random() * totalScore
  
  for (const scored of scoredActions) {
    random -= scored.score
    if (random <= 0) {
      return scored.action
    }
  }
  
  return scoredActions[0].action
}

export function selectEventOptionForAI(
  ai: CountryAI,
  state: EconomyState,
  event: WorldEvent
): number {
  const scoredOptions = event.options.map((option, index) => {
    let score = option.aiSelectionWeight
    
    const traits = AI_PERSONALITIES[ai.personality]
    
    option.effects.forEach(effect => {
      const value = effect.value
      
      if (effect.type === 'stability' || effect.type === 'pop_approval') {
        score += value * 5
      }
      
      if (effect.type === 'treasury') {
        score += value / 1000
        if (state.treasury.gold < 10000 && value < 0) {
          score += value * 2
        }
      }
      
      if (effect.type === 'inflation') {
        if (state.stats.inflation > 10 && value > 0) {
          score -= value * 10
        }
      }
      
      if (effect.type === 'unemployment') {
        if (state.stats.unemployment > 10 && value > 0) {
          score -= value * 8
        }
      }
    })
    
    return { index, score }
  })
  
  scoredOptions.sort((a, b) => b.score - a.score)
  
  const totalScore = scoredOptions.reduce((sum, o) => sum + Math.max(1, o.score), 0)
  let random = Math.random() * totalScore
  
  for (const scored of scoredOptions) {
    random -= Math.max(1, scored.score)
    if (random <= 0) {
      return scored.index
    }
  }
  
  return scoredOptions[0].index
}

export function executeAIDecision(
  ai: CountryAI,
  state: EconomyState,
  action: AIAction
): { newState: EconomyState; actionLog: string } {
  let newState = { ...state }
  let actionLog = `${ai.countryId}执行了${action.name}`
  
  action.effects.forEach(effect => {
    switch (effect.type) {
      case 'inflation':
        newState.stats.inflation = Math.max(-10, Math.min(50, newState.stats.inflation + effect.value))
        break
      case 'unemployment':
        newState.stats.unemployment = Math.max(0, Math.min(70, newState.stats.unemployment + effect.value))
        break
      case 'stability':
        newState.stats.stability = Math.max(0, Math.min(100, newState.stats.stability + effect.value))
        break
      case 'treasury':
        newState.treasury.gold = Math.max(0, newState.treasury.gold + effect.value)
        break
      case 'gdp':
        newState.stats.gdp *= (1 + effect.value / 100)
        break
      case 'interest_rate':
        newState.treasury.interestRate = Math.max(0, Math.min(0.3, newState.treasury.interestRate + effect.value / 100))
        break
    }
  })
  
  return { newState, actionLog }
}

export function runAITurn(
  ai: CountryAI,
  state: EconomyState
): { newState: EconomyState; ai: CountryAI; actionTaken: string | null } {
  let newState = state
  let actionTaken: string | null = null
  
  if (state.day % 7 === 0 && Math.random() < 0.15) {
    const availableActions: AIAction[] = getAvailableAIActions(state)
    
    const action = selectAIAction(ai, state, availableActions)
    
    if (action) {
      const result = executeAIDecision(ai, newState, action)
      newState = result.newState
      actionTaken = result.actionLog
      
      ai.lastActions.push({
        day: state.day,
        action: action.id,
      })
      
      if (ai.lastActions.length > 20) {
        ai.lastActions = ai.lastActions.slice(-20)
      }
    }
  }
  
  return { newState, ai, actionTaken }
}

function getAvailableAIActions(state: EconomyState): AIAction[] {
  const actions: AIAction[] = []
  
  actions.push({
    id: 'interest_rate_hike',
    name: '加息抑制通胀',
    actionType: 'economic',
    priority: state.stats.inflation > 8 ? 80 : 20,
    effects: [
      { type: 'inflation', value: -2 },
      { type: 'unemployment', value: 1.5 },
      { type: 'treasury', value: 500 },
    ],
  })
  
  actions.push({
    id: 'interest_rate_cut',
    name: '降息刺激经济',
    actionType: 'economic',
    priority: state.stats.unemployment > 10 ? 70 : 25,
    effects: [
      { type: 'inflation', value: 1.5 },
      { type: 'unemployment', value: -2 },
      { type: 'gdp', value: 1 },
    ],
  })
  
  if (state.treasury.gold > 20000) {
    actions.push({
      id: 'infrastructure',
      name: '大规模基建计划',
      actionType: 'economic',
      priority: 60,
      effects: [
        { type: 'unemployment', value: -3 },
        { type: 'treasury', value: -15000 },
        { type: 'gdp', value: 2 },
        { type: 'stability', value: 3 },
      ],
    })
  }
  
  if (state.stats.stability < 50) {
    actions.push({
      id: 'social_welfare',
      name: '扩大社会保障支出',
      actionType: 'economic',
      priority: 75,
      effects: [
        { type: 'stability', value: 8 },
        { type: 'pop_approval', value: 10 },
        { type: 'treasury', value: -8000 },
        { type: 'unemployment', value: -1 },
      ],
    })
  }
  
  actions.push({
    id: 'industrial_subsidy',
    name: '产业补贴政策',
    actionType: 'economic',
    priority: 55,
    effects: [
      { type: 'unemployment', value: -2 },
      { type: 'treasury', value: -5000 },
      { type: 'gdp', value: 1.5 },
    ],
  })
  
  if (state.treasury.gold < 15000) {
    actions.push({
      id: 'austerity',
      name: '财政紧缩计划',
      actionType: 'economic',
      priority: 70,
      effects: [
        { type: 'treasury', value: 10000 },
        { type: 'unemployment', value: 3 },
        { type: 'stability', value: -5 },
      ],
    })
  }
  
  return actions
}

export const WORLD_COUNTRIES_AI: { [countryId: string]: CountryAI } = {}

export function initializeWorldAI() {
  const countries = ['usa', 'china', 'russia', 'eu', 'japan', 'germany', 'uk', 'india', 'brazil', 'france']
  
  countries.forEach(countryId => {
    WORLD_COUNTRIES_AI[countryId] = createAIForCountry(countryId)
  })
  
  return WORLD_COUNTRIES_AI
}
