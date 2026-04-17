import type { CultivationState } from './types'

export interface Buff {
  id: string
  name: string
  type: 'positive' | 'negative' | 'neutral'
  icon: string
  description: string
  effects: BuffEffects
  duration: number
  remaining: number
  stackable: boolean
  maxStacks: number
  stacks: number
  source: string
  hidden?: boolean
}

export interface BuffEffects {
  spirit_regen_multiplier?: number
  cultivation_speed_multiplier?: number
  breakthrough_chance_bonus?: number
  combat_power_bonus?: number
  comprehension_bonus?: number
  luck_bonus?: number
  alchemy_bonus?: number
  refining_bonus?: number
  damage_reduction?: number
  poison_resistance?: number
  lifespan_bonus?: number
  tribulation_damage_reduction?: number
  spirit_root_bonus?: number
  mindstate_bonus?: number
  soul_power_bonus?: number
  divine_sense_bonus?: number
  body_toughness_bonus?: number
}

export const BUFF_TEMPLATES: Record<string, Omit<Buff, 'remaining' | 'stacks'>> = {
  pill_qi: {
    id: 'pill_qi',
    name: '聚气丹效',
    type: 'positive',
    icon: '💊',
    description: '灵气运转速度提升30%',
    effects: { spirit_regen_multiplier: 1.3, cultivation_speed_multiplier: 1.2 },
    duration: 100,
    stackable: true,
    maxStacks: 3,
    source: '聚气丹'
  },
  pill_foundation: {
    id: 'pill_foundation',
    name: '筑基丹效',
    type: 'positive',
    icon: '✨',
    description: '突破筑基成功率提升50%',
    effects: { breakthrough_chance_bonus: 0.5 },
    duration: 30,
    stackable: false,
    maxStacks: 1,
    source: '筑基丹'
  },
  pill_enlightenment: {
    id: 'pill_enlightenment',
    name: '悟道状态',
    type: 'positive',
    icon: '💡',
    description: '悟性提升20点，修炼速度提升50%',
    effects: { comprehension_bonus: 20, cultivation_speed_multiplier: 1.5 },
    duration: 50,
    stackable: false,
    maxStacks: 1,
    source: '悟道茶'
  },
  pill_body_temper: {
    id: 'pill_body_temper',
    name: '炼体强化',
    type: 'positive',
    icon: '💪',
    description: '体魄强化30%',
    effects: { body_toughness_bonus: 30, damage_reduction: 0.2 },
    duration: 200,
    stackable: true,
    maxStacks: 5,
    source: '炼体丹'
  },
  pill_soul_cultivate: {
    id: 'pill_soul_cultivate',
    name: '养魂状态',
    type: 'positive',
    icon: '👻',
    description: '神魂力量提升50%',
    effects: { soul_power_bonus: 50, divine_sense_bonus: 30 },
    duration: 150,
    stackable: false,
    maxStacks: 1,
    source: '养魂丹'
  },
  pill_life_extension: {
    id: 'pill_life_extension',
    name: '延年益寿',
    type: 'positive',
    icon: '🦋',
    description: '生机盎然',
    effects: { lifespan_bonus: 50, poison_resistance: 50 },
    duration: 365,
    stackable: true,
    maxStacks: 10,
    source: '延寿丹'
  },
  tribulation_protection: {
    id: 'tribulation_protection',
    name: '护法状态',
    type: 'positive',
    icon: '🛡️',
    description: '天劫伤害减免40%',
    effects: { tribulation_damage_reduction: 0.4 },
    duration: 30,
    stackable: false,
    maxStacks: 1,
    source: '护山大阵'
  },
  enlightened: {
    id: 'enlightened',
    name: '顿悟状态',
    type: 'positive',
    icon: '🌟',
    description: '道心通明，修炼速度翻倍！',
    effects: { cultivation_speed_multiplier: 2.0, comprehension_bonus: 30, breakthrough_chance_bonus: 0.3 },
    duration: 100,
    stackable: false,
    maxStacks: 1,
    source: '顿悟机缘'
  },
  sect_blessing: {
    id: 'sect_blessing',
    name: '宗门庇护',
    type: 'positive',
    icon: '🏛️',
    description: '宗门灵气加持，全属性提升10%',
    effects: {
      spirit_regen_multiplier: 1.1,
      combat_power_bonus: 50,
      alchemy_bonus: 10,
      refining_bonus: 10
    },
    duration: 365,
    stackable: false,
    maxStacks: 1,
    source: '宗门'
  },
  cave_blessing: {
    id: 'cave_blessing',
    name: '洞天福地',
    type: 'positive',
    icon: '🏔️',
    description: '灵气浓度翻倍！',
    effects: { spirit_regen_multiplier: 2.0, cultivation_speed_multiplier: 1.5 },
    duration: 9999,
    stackable: true,
    maxStacks: 3,
    source: '洞府'
  },
  poison_common: {
    id: 'poison_common',
    name: '中毒',
    type: 'negative',
    icon: '☠️',
    description: '身中奇毒，修炼速度下降30%',
    effects: { cultivation_speed_multiplier: 0.7, combat_power_bonus: -30 },
    duration: 50,
    stackable: true,
    maxStacks: 5,
    source: '毒物'
  },
  curse: {
    id: 'curse',
    name: '诅咒缠身',
    type: 'negative',
    icon: '💀',
    description: '厄运缠身，气运大幅下降',
    effects: { luck_bonus: -50, breakthrough_chance_bonus: -0.3 },
    duration: 100,
    stackable: true,
    maxStacks: 3,
    source: '上古诅咒'
  },
  heart_demon: {
    id: 'heart_demon',
    name: '心魔滋生',
    type: 'negative',
    icon: '👿',
    description: '心魔入侵，走火入魔风险大增',
    effects: {
      mindstate_bonus: -30,
      breakthrough_chance_bonus: -0.5,
      cultivation_speed_multiplier: 0.5
    },
    duration: 80,
    stackable: false,
    maxStacks: 1,
    source: '修炼岔子'
  },
  injured: {
    id: 'injured',
    name: '重伤',
    type: 'negative',
    icon: '🩹',
    description: '伤势严重，需要静养',
    effects: {
      cultivation_speed_multiplier: 0.3,
      combat_power_bonus: -100,
      spirit_regen_multiplier: 0.5
    },
    duration: 100,
    stackable: false,
    maxStacks: 1,
    source: '战斗/渡劫'
  },
  retreat: {
    id: 'retreat',
    name: '闭关修炼',
    type: 'neutral',
    icon: '🔒',
    description: '专心闭关，外事不扰',
    effects: { cultivation_speed_multiplier: 1.5 },
    duration: 100,
    stackable: false,
    maxStacks: 1,
    source: '手动闭关'
  },
  dao_insight: {
    id: 'dao_insight',
    name: '道韵加身',
    type: 'positive',
    icon: '☯️',
    description: '感悟大道，突破瓶颈概率翻倍',
    effects: { breakthrough_chance_bonus: 1.0, comprehension_bonus: 50 },
    duration: 30,
    stackable: false,
    maxStacks: 1,
    source: '大道感悟'
  },
  dragon_energy: {
    id: 'dragon_energy',
    name: '龙气护体',
    type: 'positive',
    icon: '🐉',
    description: '真龙之气护体，全属性大幅提升',
    effects: {
      combat_power_bonus: 200,
      body_toughness_bonus: 100,
      damage_reduction: 0.3,
      spirit_regen_multiplier: 1.5
    },
    duration: 500,
    stackable: false,
    maxStacks: 1,
    source: '跃龙门'
  },
  immortal_blessing: {
    id: 'immortal_blessing',
    name: '仙人点化',
    type: 'positive',
    icon: '👼',
    description: '得仙人指点，脱胎换骨',
    effects: {
      spirit_root_bonus: 10,
      comprehension_bonus: 30,
      cultivation_speed_multiplier: 3.0
    },
    duration: 1000,
    stackable: true,
    maxStacks: 3,
    source: '仙人赐福'
  }
}

export function applyBuff(state: CultivationState, buffId: string): CultivationState {
  let newState = { ...state } as any

  if (!newState.buffs) {
    newState.buffs = []
  }

  const template = BUFF_TEMPLATES[buffId]
  if (!template) return newState

  const existingBuff = newState.buffs.find((b: Buff) => b.id === buffId)

  if (existingBuff) {
    if (existingBuff.stackable && existingBuff.stacks < existingBuff.maxStacks) {
      existingBuff.stacks++
      existingBuff.remaining = template.duration
    } else if (!existingBuff.stackable) {
      existingBuff.remaining = template.duration
    }
  } else {
    newState.buffs.push({
      ...template,
      remaining: template.duration,
      stacks: 1
    })
  }

  return newState
}

export function removeBuff(state: CultivationState, buffId: string): CultivationState {
  let newState = { ...state } as any
  if (newState.buffs) {
    newState.buffs = newState.buffs.filter((b: Buff) => b.id !== buffId)
  }
  return newState
}

export function processBuffTick(state: CultivationState): CultivationState {
  let newState = { ...state } as any

  if (!newState.buffs) {
    newState.buffs = []
    return newState
  }

  for (const buff of newState.buffs) {
    buff.remaining--
  }

  newState.buffs = newState.buffs.filter((b: Buff) => b.remaining > 0)

  return newState
}

export function getBuffMultiplier(state: CultivationState, effectKey: keyof BuffEffects): number {
  const stateAny = state as any
  if (!stateAny.buffs) return 1

  let multiplier = 1
  for (const buff of stateAny.buffs) {
    const effectValue = buff.effects[effectKey]
    if (typeof effectValue === 'number' && effectValue > 1) {
      multiplier *= Math.pow(effectValue, buff.stacks)
    } else if (typeof effectValue === 'number' && effectValue > 0 && effectValue <= 1) {
      multiplier *= effectValue
    }
  }
  return multiplier
}

export function getBuffBonus(state: CultivationState, effectKey: keyof BuffEffects): number {
  const stateAny = state as any
  if (!stateAny.buffs) return 0

  let bonus = 0
  for (const buff of stateAny.buffs) {
    const effectValue = buff.effects[effectKey]
    if (typeof effectValue === 'number') {
      bonus += effectValue * buff.stacks
    }
  }
  return bonus
}

export function getAllActiveBuffs(state: CultivationState): Buff[] {
  return (state as any).buffs || []
}
