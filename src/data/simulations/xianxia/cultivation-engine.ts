import type { CultivationState, Realm, Tribulation } from './types'
import { REALM_CONFIGS, getNextRealm, compareRealm } from './realm-system'
import { getBuffMultiplier, getBuffBonus, processBuffTick } from './buff-system'

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : (min + max) / 2))
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function chance(probability: number): boolean {
  return Math.random() < probability
}

export function calculateCultivationSpeed(state: CultivationState): number {
  const realm = REALM_CONFIGS[state.cultivation.realm]
  const technique = state.techniques.find(t => t.id === state.activeTechniqueId)

  let baseSpeed = 1

  baseSpeed *= technique?.base_cultivation_speed || 1

  const spiritRootBonus = state.attributes.spirit_root / 50
  baseSpeed *= 1 + spiritRootBonus

  const comprehensionBonus = state.attributes.comprehension / 100
  baseSpeed *= 1 + comprehensionBonus

  const mindstateBonus = state.attributes.mindstate / 80
  baseSpeed *= 1 + mindstateBonus

  const luckBonus = state.attributes.luck / 200
  baseSpeed *= 1 + luckBonus

  baseSpeed *= realm.effects.spirit_regen_multiplier || 1

  baseSpeed *= 1 + state.vitals.enlightenment_bonus / 100

  if (state.vitals.mood === 'enlightened') {
    baseSpeed *= 2
  } else if (state.vitals.mood === 'calm') {
    baseSpeed *= 1.2
  } else if (state.vitals.mood === 'agitated' || state.vitals.mood === 'furious') {
    baseSpeed *= 0.7
  }

  if (state.cultivation.bottleneck) {
    baseSpeed *= 0.1
  }

  if (state.inSecretRealm) {
    baseSpeed *= 1.5
  }

  if (state.caveId) {
    baseSpeed *= 1.3
  }

  baseSpeed *= getBuffMultiplier(state, 'cultivation_speed_multiplier')
  baseSpeed *= getBuffMultiplier(state, 'spirit_regen_multiplier')

  return baseSpeed
}

export function executeCultivationTick(state: CultivationState): CultivationState {
  let newState = { ...state }

  newState.day += 1
  newState.tick += 1
  newState.vitals.age += 1 / 365
  newState.stats.daysCultivated += 1

  newState = processBuffTick(newState)

  const speed = calculateCultivationSpeed(newState)

  const spiritRegen = newState.attributes.spirit_regen * speed
  newState.attributes.current_spirit = clamp(
    newState.attributes.current_spirit + spiritRegen,
    0,
    newState.attributes.max_spirit
  )

  if (!newState.cultivation.bottleneck) {
    newState.cultivation.progress += speed * 0.1
  } else {
    if (chance(0.001 * (1 + newState.attributes.comprehension / 100))) {
      newState.cultivation.bottleneck = false
      addHistory(newState, 'breakthrough', `突破瓶颈！修炼速度恢复正常`, 'major')
    }
  }

  const realmConfig = REALM_CONFIGS[newState.cultivation.realm]
  const req = realmConfig.breakthroughRequirements

  if (newState.cultivation.progress >= req.minProgress) {
    const shouldBottleneck = chance(req.bottleneckProbability * (1 - newState.attributes.comprehension / 500))
    if (shouldBottleneck && !newState.cultivation.bottleneck) {
      newState.cultivation.bottleneck = true
      addHistory(newState, 'bottleneck', `遇到修炼瓶颈，修炼速度大幅下降`, 'normal')
    }
  }

  newState = applySpiritConsumption(newState)
  newState = updateLifespan(newState)
  newState = updateKarma(newState)
  newState = processDaoInsights(newState)

  for (const technique of newState.techniques) {
    if (technique.mastery < technique.max_mastery) {
      technique.mastery = clamp(
        technique.mastery + speed * 0.001 * (1 + newState.attributes.comprehension / 100),
        0,
        technique.max_mastery
      )
    }
  }

  return newState
}

export function attemptBreakthrough(state: CultivationState): {
  success: boolean
  newState: CultivationState
  message: string
  tribulation?: Tribulation
} {
  const nextRealm = getNextRealm(state.cultivation.realm)
  if (!nextRealm) {
    return { success: false, newState: state, message: '已达到当前修炼体系的巅峰' }
  }

  const currentConfig = REALM_CONFIGS[state.cultivation.realm]
  const nextConfig = REALM_CONFIGS[nextRealm]
  const req = currentConfig.breakthroughRequirements

  if (state.cultivation.progress < req.minProgress) {
    return { success: false, newState: state, message: '修炼进度不足' }
  }

  if (state.attributes.current_spirit < req.spiritRequired) {
    return { success: false, newState: state, message: '灵力不足以支撑突破' }
  }

  if (state.attributes.comprehension < req.comprehensionThreshold) {
    return { success: false, newState: state, message: '悟性不足，无法领悟突破的关键' }
  }

  let newState = { ...state }
  newState.attributes.current_spirit -= req.spiritRequired
  newState.cultivation.breakthrough_attempts += 1

  let successRate = req.breakthroughBaseRate

  successRate *= Math.pow(0.85, Math.min(10, newState.cultivation.breakthrough_attempts - 1))

  successRate *= 1 + (state.attributes.comprehension - 50) / 200
  successRate *= 1 + (state.attributes.luck - 50) / 300

  if (state.cultivation.bottleneck) {
    successRate *= 0.5
  }

  successRate *= 1 + getBuffBonus(state, 'breakthrough_chance_bonus')

  successRate = clamp(successRate, 0.01, 0.95)

  if (chance(req.tribulationChance)) {
    const tribulation = generateTribulation(nextRealm)
    addHistory(newState, 'tribulation', `天道感应，降下${tribulation.name}！`, 'legendary')
    return {
      success: false,
      newState,
      message: `突破引发天劫！${tribulation.name}即将降临`,
      tribulation
    }
  }

  if (chance(successRate)) {
    newState = applyBreakthroughSuccess(newState, nextRealm, nextConfig)
    return {
      success: true,
      newState,
      message: `突破成功！晋升至${nextConfig.name}！`
    }
  } else {
    newState = applyBreakthroughFailure(newState)
    return {
      success: false,
      newState,
      message: '突破失败，灵力反噬...'
    }
  }
}

function applyBreakthroughSuccess(state: CultivationState, realm: Realm, config: any): CultivationState {
  let newState = { ...state }

  newState.cultivation.realm = realm
  newState.cultivation.progress = 0
  newState.cultivation.bottleneck = false
  newState.cultivation.breakthrough_attempts = 0
  newState.stats.breakthroughs += 1

  for (const [stat, value] of Object.entries(config.baseStats)) {
    if (stat in newState.attributes && typeof (newState.attributes as any)[stat] === 'number') {
      (newState.attributes as any)[stat] = (value as number)
    }
  }

  newState.vitals.lifespan += config.lifespanBonus

  addHistory(newState, 'breakthrough', `成功突破至${config.name}！寿元增加${config.lifespanBonus}年`, 'legendary')

  for (const feature of config.unlockedFeatures) {
    addHistory(newState, 'unlock', `解锁新能力：${feature}`, 'major')
  }

  return newState
}

function applyBreakthroughFailure(state: CultivationState): CultivationState {
  let newState = { ...state }

  newState.cultivation.progress *= 0.5
  newState.attributes.current_spirit = 1
  newState.vitals.health = clamp(newState.vitals.health - random(10, 30), 1, 100)

  const penalty = chance(0.3)
  if (penalty) {
    newState.vitals.lifespan = Math.max(1, newState.vitals.lifespan - random(5, 20))
    addHistory(newState, 'failure', '突破失败，损失寿元！', 'major')
  } else {
    addHistory(newState, 'failure', '突破失败，修为倒退', 'normal')
  }

  return newState
}

function generateTribulation(realm: Realm): Tribulation {
  const tier = compareRealm(realm, 'mortal')

  const types = ['thunder', 'fire', 'water', 'wind', 'heart', 'demon', 'heavenly']
  const type = types[Math.min(Math.floor(tier / 5), types.length - 1)] as any

  const stages = Math.min(3 + Math.floor(tier / 8), 9)

  return {
    id: `trib_${realm}_${Date.now()}`,
    name: getTribulationName(type, tier),
    realm,
    type,
    description: getTribulationDescription(type),
    difficulty: clamp(tier * 5, 5, 100),
    stages: Array.from({ length: stages }, (_, i) => ({
      id: `stage_${i}`,
      name: `第${i + 1}重劫`,
      description: '',
      damage: (i + 1) * tier * 2,
      duration: 3,
      survivalThreshold: 50 - i * 3,
      bonusThreshold: 80 - i * 5
    })),
    currentStage: 0,
    completed: false,
    failed: false,
    rewards: {
      spirit_multiplier: 1 + tier * 0.1,
      comprehension_bonus: tier * 2,
      luck_bonus: tier
    },
    penalties: {
      health_penalty: 50,
      lifespan_penalty: tier * 10
    }
  }
}

function getTribulationName(type: string, tier: number): string {
  const names: Record<string, string[]> = {
    thunder: ['三九雷劫', '六九雷劫', '九九雷劫', '灭世神雷'],
    fire: ['阴火劫', '六阳火劫', '南明离火劫', '焚天仙火'],
    water: ['弱水劫', '玄冥水劫', '万载玄冰劫', '一元重水劫'],
    wind: ['罡风劫', '巽风劫', '九天罡风劫', '混沌风劫'],
    heart: ['心魔劫', '红尘劫', '万世轮回劫'],
    demon: ['外魔劫', '天魔劫', '无相天魔劫'],
    heavenly: ['天道洗礼', '天人五衰', '大道考验']
  }
  const list = names[type] || names.thunder
  return list[Math.min(Math.floor(tier / 10), list.length - 1)]
}

function getTribulationDescription(type: string): string {
  const descriptions: Record<string, string> = {
    thunder: '天降雷霆，炼体锻魂，渡之则肉身强横',
    fire: '神火焚身，烧尽杂质，浴火重生',
    water: '弱水三千，磨砺道心，水滴石穿',
    wind: '罡风洗髓，脱胎换骨，身轻如燕',
    heart: '心魔滋生，幻境重重，明心见性',
    demon: '天魔入侵，外魔扰神，坚守道心',
    heavenly: '天道考验，大道感应，永生之门'
  }
  return descriptions[type] || '未知天劫'
}

export function executeTribulationTick(state: CultivationState, tribulation: Tribulation): {
  newState: CultivationState
  tribulation: Tribulation
  completed: boolean
  survived: boolean
  message: string
} {
  let newState = { ...state }
  let newTrib = { ...tribulation }

  const stage = newTrib.stages[newTrib.currentStage]

  const resistance = state.attributes.body_toughness + state.attributes.soul_power
  const reducedDamage = stage.damage * Math.max(0.1, 1 - resistance / 200)
  newState.vitals.health = clamp(newState.vitals.health - reducedDamage * 0.1, 0, 100)

  if (newState.vitals.health < stage.survivalThreshold / 100 * newState.vitals.max_health) {
    newTrib.failed = true
    newTrib.completed = true
    return {
      newState: applyTribulationFailure(newState, newTrib),
      tribulation: newTrib,
      completed: true,
      survived: false,
      message: `渡劫失败！未能承受${stage.name}的威力`
    }
  }

  newTrib.currentStage++

  if (newTrib.currentStage >= newTrib.stages.length) {
    newTrib.completed = true
    return {
      newState: applyTribulationSuccess(newState, newTrib),
      tribulation: newTrib,
      completed: true,
      survived: true,
      message: '渡劫成功！天道认可，法力大增！'
    }
  }

  return {
    newState,
    tribulation: newTrib,
    completed: false,
    survived: true,
    message: `${stage.name}完成，准备迎接下一重劫...`
  }
}

function applyTribulationSuccess(state: CultivationState, tribulation: Tribulation): CultivationState {
  let newState = { ...state }

  newState.stats.tribulationsPassed += 1
  newState.tribulationHistory.push(tribulation.id)

  newState.attributes.comprehension += tribulation.rewards.comprehension_bonus
  newState.attributes.luck = clamp(newState.attributes.luck + tribulation.rewards.luck_bonus, 0, 100)
  newState.attributes.body_toughness *= tribulation.rewards.spirit_multiplier

  addHistory(newState, 'tribulation', `成功渡过${tribulation.name}！`, 'legendary')

  return newState
}

function applyTribulationFailure(state: CultivationState, tribulation: Tribulation): CultivationState {
  let newState = { ...state }

  newState.vitals.health = Math.max(1, newState.vitals.health - tribulation.penalties.health_penalty)
  newState.vitals.lifespan = Math.max(1, newState.vitals.lifespan - tribulation.penalties.lifespan_penalty)
  newState.cultivation.progress *= 0.3

  addHistory(newState, 'tribulation', `渡劫失败，身受重伤，修为大损`, 'major')

  return newState
}

function applySpiritConsumption(state: CultivationState): CultivationState {
  let newState = { ...state }

  const baseConsumption = newState.attributes.max_spirit * 0.001

  if (newState.activeQuestId) {
    newState.attributes.current_spirit -= baseConsumption * 2
  }

  if (newState.inSecretRealm) {
    newState.attributes.current_spirit -= baseConsumption * 3
  }

  newState.attributes.current_spirit = clamp(
    newState.attributes.current_spirit,
    0,
    newState.attributes.max_spirit
  )

  return newState
}

function updateLifespan(state: CultivationState): CultivationState {
  let newState = { ...state }

  newState.vitals.remaining_lifespan = newState.vitals.lifespan - newState.vitals.age

  if (newState.vitals.remaining_lifespan < 50 && newState.vitals.remaining_lifespan > 0) {
    if (newState.day % 365 === 0) {
      addHistory(newState, 'warning', `寿元将近，仅剩${Math.floor(newState.vitals.remaining_lifespan)}年！`, 'major')
    }
  }

  if (newState.vitals.remaining_lifespan <= 0) {
    addHistory(newState, 'death', '寿元耗尽，坐化而亡', 'legendary')
    newState.paused = true
  }

  return newState
}

function updateKarma(state: CultivationState): CultivationState {
  let newState = { ...state }

  const dailyChange = (newState.vitals.merit_value - newState.vitals.sin_value) * 0.001
  newState.vitals.karmic_value = clamp(
    newState.vitals.karmic_value + dailyChange,
    -1000,
    1000
  )

  if (newState.day % 100 === 0) {
    if (newState.vitals.karmic_value > 500) {
      newState.attributes.luck = clamp(newState.attributes.luck + 0.5, 0, 100)
    } else if (newState.vitals.karmic_value < -500) {
      newState.attributes.luck = clamp(newState.attributes.luck - 0.5, 0, 100)
    }
  }

  return newState
}

function processDaoInsights(state: CultivationState): CultivationState {
  let newState = { ...state }

  const insightChance = 0.001 * (1 + state.attributes.comprehension / 100)

  if (chance(insightChance) && newState.daos.length > 0) {
    const dao = newState.daos[Math.floor(Math.random() * newState.daos.length)]
    dao.depth = clamp(dao.depth + random(0.01, 0.1), 0, dao.max_depth)
    newState.stats.daoInsightsGained += 1

    if (chance(0.1)) {
      addHistory(newState, 'insight', `对${dao.name}大有感悟！`, 'major')
      newState.vitals.mood = 'enlightened'
      newState.vitals.enlightenment_bonus = 50
    }
  }

  if (newState.vitals.enlightenment_bonus > 0) {
    newState.vitals.enlightenment_bonus = Math.max(0, newState.vitals.enlightenment_bonus - 0.1)
  }

  return newState
}

function addHistory(
  state: CultivationState,
  type: string,
  message: string,
  importance: 'minor' | 'normal' | 'major' | 'legendary'
) {
  state.history.push({
    day: state.day,
    type,
    message,
    importance
  })

  if (state.history.length > 1000) {
    state.history = state.history.slice(-500)
  }
}
