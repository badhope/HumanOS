import type { XianxiaStats } from './types'

export interface HiddenCheck {
  stat: keyof XianxiaStats
  threshold: number
  successRate: number
  criticalBonus?: number
}

export interface InventoryItem {
  id: string
  name: string
  description: string
  icon: string
  type: 'weapon' | 'pill' | 'manual' | 'poison' | 'misc'
  effects?: Partial<XianxiaStats>
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  usable?: boolean
  consumable?: boolean
  onUse?: {
    message: string
    effects?: Partial<XianxiaStats>
    hiddenEffects?: Record<string, any>
    triggerEvent?: string
  }
}

export type CheckResult = 'critical_success' | 'success' | 'failure' | 'critical_failure'

export const ROLL_TEXT: Record<CheckResult, string> = {
  critical_success: '🎯 大成功！',
  success: '✅ 判定通过',
  failure: '❌ 判定失败',
  critical_failure: '💀 大失败！',
}

export function calculateSuccessProbability(
  statValue: number,
  baseThreshold: number,
  criticalBonus: number = 5
): { probability: number; criticalChance: number } {
  const baseChance = Math.max(5, Math.min(95, 30 + (statValue - baseThreshold) * 2))
  const criticalChance = statValue >= baseThreshold + criticalBonus ? Math.min(15, (statValue - baseThreshold - criticalBonus) * 1.5) : 0
  return { probability: baseChance, criticalChance }
}

export function performCheck(check: HiddenCheck, stats: XianxiaStats): CheckResult {
  const statValue = stats[check.stat]
  const { probability, criticalChance } = calculateSuccessProbability(
    statValue,
    check.threshold,
    check.criticalBonus
  )

  const roll = Math.random() * 100

  if (roll < criticalChance) return 'critical_success'
  if (roll < probability) return 'success'
  if (roll > 95) return 'critical_failure'
  return 'failure'
}

export function formatCheckDescription(check: HiddenCheck): string {
  const statName = {
    spiritualRoot: '灵根资质',
    mindset: '道心心性',
    karma: '因果机缘',
    cruelty: '杀伐果断',
    luck: '气运造化',
    cunning: '心智城府',
  }[check.stat]

  return `${statName} ≥ ${check.threshold} 可触发`
}

export const STARTING_ITEMS: InventoryItem[] = [
  {
    id: 'item-herb-001',
    name: '草药',
    description: '普通的山间草药，可治轻伤',
    icon: '🌿',
    type: 'misc',
    rarity: 'common',
  },
]

export const ITEM_POOL: Record<string, InventoryItem> = {
  'item_energy_pill': {
    id: 'item_energy_pill',
    name: '聚气散',
    description: '提升修为的丹药，有微量毒性',
    icon: '💊',
    type: 'pill',
    rarity: 'rare',
    usable: true,
    consumable: true,
    onUse: {
      message: '你服下了聚气散，一股热流涌向四肢百骸...',
      effects: { spiritualRoot: +5, luck: -2 },
      hiddenEffects: { medicine_residue: 20 },
    },
  },
  'item_changgong': {
    id: 'item_changgong',
    name: '长春功秘籍',
    description: '修仙入门功法，可驻颜益寿',
    icon: '📖',
    type: 'manual',
    rarity: 'rare',
    usable: true,
    consumable: false,
    onUse: {
      message: '你翻开长春功秘籍，开始修炼...',
      effects: { spiritualRoot: +15, cruelty: +5 },
    },
  },
  'item-poison-centipede': {
    id: 'item-poison-centipede',
    name: '尸蜈蚣毒',
    description: '墨大夫饲养的奇毒，触之即死',
    icon: '🐛',
    type: 'poison',
    rarity: 'epic',
    usable: true,
    consumable: true,
    onUse: {
      message: '你取出了那瓶剧毒...',
      effects: { cruelty: +20 },
      hiddenEffects: { demonic_tendency: 50 },
      triggerEvent: 'used_centipede_poison',
    },
  },
  'item-dagger': {
    id: 'item-dagger',
    name: '精钢短刀',
    description: '淬过毒的贴身武器',
    icon: '🗡️',
    type: 'weapon',
    rarity: 'rare',
    effects: { cruelty: +5 },
  },
  'item_healing_pill': {
    id: 'item_healing_pill',
    name: '养颜丹',
    description: '清热解毒，驱除体内杂质',
    icon: '🍬',
    type: 'pill',
    rarity: 'rare',
    usable: true,
    consumable: true,
    onUse: {
      message: '清凉的丹药化开，你感觉神清气爽...',
      effects: { spiritualRoot: +3, luck: +2 },
      hiddenEffects: { medicine_residue: -30, poison_resistance: 5 },
    },
  },
  'item-rope': {
    id: 'item-rope',
    name: '细麻绳',
    description: '有些韧性，可做陷阱',
    icon: '🪢',
    type: 'misc',
    rarity: 'common',
    usable: true,
    consumable: true,
    onUse: {
      message: '你拿出麻绳，沉思着可以用来做什么...',
      effects: { mindset: +2 },
    },
  },
  'item-silver': {
    id: 'item-silver',
    name: '十两银子',
    description: '白花花的银两，可通鬼神',
    icon: '💰',
    type: 'misc',
    rarity: 'common',
    usable: true,
    consumable: true,
    onUse: {
      message: '有钱能使鬼推磨...',
      hiddenEffects: { qixuan_reputation: 10 },
    },
  },
  'item-map-yellowmap': {
    id: 'item-map-yellowmap',
    name: '黄枫谷地图',
    description: '通往修仙界的入场券',
    icon: '🗺️',
    type: 'misc',
    rarity: 'epic',
    effects: { karma: +10, luck: +10 },
  },
}
