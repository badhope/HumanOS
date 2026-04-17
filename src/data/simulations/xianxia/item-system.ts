import type { CultivationState, PillQuality, ArtifactQuality, AlchemyRecipe, RefiningRecipe } from './types'
import { compareRealm } from './realm-system'
import { applyBuff } from './buff-system'

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : (min + max) / 2))
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function chance(probability: number): boolean {
  return Math.random() < probability
}

export const PILL_RECIPES: AlchemyRecipe[] = [
  {
    id: 'qi_pill',
    name: '聚气丹',
    rank: 1,
    difficulty: 5,
    materials: { ling_grass: 3, spring_water: 1 },
    output: '聚气丹',
    outputQuantity: 3,
    baseSuccessRate: 0.8,
    min_realm: 'qi_refining_1',
    experience: 10
  },
  {
    id: 'foundation_pill',
    name: '筑基丹',
    rank: 3,
    difficulty: 30,
    materials: { xian_zhi: 5, blood_ginseng: 2, mercury_flower: 1 },
    output: '筑基丹',
    outputQuantity: 1,
    baseSuccessRate: 0.5,
    min_realm: 'qi_refining_7',
    experience: 100,
    specialConditions: ['可大幅提升筑基成功率']
  },
  {
    id: 'golden_core_pill',
    name: '结金丹',
    rank: 5,
    difficulty: 60,
    materials: { dragon_grass: 5, phoenix_flower: 3, nine_leaf_lian: 2, inner_core: 1 },
    output: '结金丹',
    outputQuantity: 1,
    baseSuccessRate: 0.3,
    min_realm: 'foundation_perfect',
    experience: 500,
    specialConditions: ['金丹大道的敲门砖']
  },
  {
    id: 'nascent_soul_pill',
    name: '元婴丹',
    rank: 7,
    difficulty: 85,
    materials: { heaven_reaching_tree: 3, dao_fruit: 2, dragon_tears: 2, world_water: 1 },
    output: '元婴丹',
    outputQuantity: 1,
    baseSuccessRate: 0.15,
    min_realm: 'golden_core_perfect',
    experience: 2000,
    specialConditions: ['破丹婴生的神药']
  },
  {
    id: 'life_extension_pill',
    name: '延寿丹',
    rank: 4,
    difficulty: 45,
    materials: { longevity_flower: 5, tortoise_shell: 3, crane_feather: 2 },
    output: '延寿丹',
    outputQuantity: 2,
    baseSuccessRate: 0.6,
    min_realm: 'foundation_early',
    experience: 250,
    specialConditions: ['每粒延寿50年']
  },
  {
    id: 'heaven_reaching_pill',
    name: '通天丹',
    rank: 9,
    difficulty: 95,
    materials: { dao_flower: 1, world_essence: 5, chaos_qi: 3, immortal_heart: 1 },
    output: '通天丹',
    outputQuantity: 1,
    baseSuccessRate: 0.05,
    min_realm: 'dao_integration_early',
    experience: 10000,
    specialConditions: ['飞升仙丹']
  },
  {
    id: 'purification_pill',
    name: '洗髓丹',
    rank: 2,
    difficulty: 20,
    materials: { cleansing_water: 3, moon_grass: 5, jade_powder: 2 },
    output: '洗髓丹',
    outputQuantity: 1,
    baseSuccessRate: 0.7,
    min_realm: 'qi_refining_3',
    experience: 50,
    specialConditions: ['改善根骨资质']
  },
  {
    id: 'soul_cultivating_pill',
    name: '养魂丹',
    rank: 6,
    difficulty: 70,
    materials: { soul_flower: 5, ghost_grass: 3, nether_water: 2 },
    output: '养魂丹',
    outputQuantity: 3,
    baseSuccessRate: 0.4,
    min_realm: 'golden_core_early',
    experience: 1000
  },
  {
    id: 'body_tempering_pill',
    name: '炼体丹',
    rank: 4,
    difficulty: 40,
    materials: { tiger_bone: 3, bear_bile: 2, iron_grass: 5 },
    output: '炼体丹',
    outputQuantity: 5,
    baseSuccessRate: 0.65,
    min_realm: 'foundation_early',
    experience: 200
  },
  {
    id: 'breakthrough_pill',
    name: '破障丹',
    rank: 5,
    difficulty: 55,
    materials: { enlightenment_tea: 3, dao_grass: 5, insight_stone: 1 },
    output: '破障丹',
    outputQuantity: 2,
    baseSuccessRate: 0.45,
    min_realm: 'foundation_late',
    experience: 400,
    specialConditions: ['突破瓶颈必备神丹']
  }
]

export const REFINING_RECIPES: RefiningRecipe[] = [
  {
    id: 'spirit_sword',
    name: '精钢法剑',
    rank: 1,
    difficulty: 10,
    materials: { iron_ore: 5, spirit_wood: 2 },
    output: '精钢法剑',
    baseSuccessRate: 0.9,
    min_realm: 'qi_refining_2',
    experience: 15,
    enhancementSlots: 1
  },
  {
    id: 'flying_sword',
    name: '本命飞剑',
    rank: 3,
    difficulty: 35,
    materials: { ten_thousand_steel: 10, flying_feather: 5, wind_essence: 3 },
    output: '本命飞剑',
    baseSuccessRate: 0.6,
    min_realm: 'foundation_early',
    experience: 150,
    enhancementSlots: 3
  },
  {
    id: 'protective_robe',
    name: '护身法袍',
    rank: 2,
    difficulty: 25,
    materials: { silk: 10, moon_thread: 5, defensive_rune: 3 },
    output: '护身法袍',
    baseSuccessRate: 0.7,
    min_realm: 'qi_refining_5',
    experience: 80,
    enhancementSlots: 2
  },
  {
    id: 'storage_ring',
    name: '储物戒',
    rank: 3,
    difficulty: 45,
    materials: { space_stone: 1, gold: 5, spirit_engraving: 3 },
    output: '储物戒',
    baseSuccessRate: 0.5,
    min_realm: 'foundation_early',
    experience: 200,
    enhancementSlots: 1
  },
  {
    id: 'dragon_tiger_sword',
    name: '龙虎宝刀',
    rank: 5,
    difficulty: 65,
    materials: { dragon_scale: 5, tiger_soul: 3, heavenly_thunder: 2 },
    output: '龙虎宝刀',
    baseSuccessRate: 0.35,
    min_realm: 'golden_core_early',
    experience: 750,
    enhancementSlots: 5
  },
  {
    id: 'nascent_sword',
    name: '元婴剑',
    rank: 7,
    difficulty: 88,
    materials: { nascent_stone: 5, soul_steel: 10, void_metal: 3, dao_pattern: 1 },
    output: '元婴剑',
    baseSuccessRate: 0.2,
    min_realm: 'nascent_soul_early',
    experience: 3000,
    enhancementSlots: 7
  },
  {
    id: 'cauldron_heaven',
    name: '炼天鼎',
    rank: 9,
    difficulty: 98,
    materials: { chaos_essence: 5, world_fragment: 3, dao_heart: 1, immortal_fire: 1 },
    output: '炼天鼎',
    baseSuccessRate: 0.05,
    min_realm: 'dao_integration_early',
    experience: 15000,
    enhancementSlots: 12
  }
]

export const MATERIALS: Record<string, {
  name: string
  rank: number
  type: string
  description: string
  rarity: number
  value: number
}> = {
  ling_grass: { name: '灵草', rank: 1, type: 'spirit_plant', description: '最基础的灵草', rarity: 1, value: 1 },
  spring_water: { name: '灵泉之水', rank: 1, type: 'mineral', description: '蕴含灵气的泉水', rarity: 1, value: 1 },
  xian_zhi: { name: '灵芝', rank: 3, type: 'spirit_plant', description: '百年灵芝', rarity: 3, value: 10 },
  blood_ginseng: { name: '血参', rank: 3, type: 'spirit_plant', description: '千年血参', rarity: 4, value: 25 },
  mercury_flower: { name: '朱果', rank: 3, type: 'spirit_plant', description: '吸收日月精华的朱果', rarity: 4, value: 30 },
  cleansing_water: { name: '涤尘水', rank: 2, type: 'mineral', description: '洗去凡尘的净水', rarity: 2, value: 5 },
  moon_grass: { name: '月华草', rank: 2, type: 'spirit_plant', description: '只在月圆之夜生长', rarity: 2, value: 5 },
  jade_powder: { name: '灵玉粉', rank: 2, type: 'mineral', description: '研磨成粉的灵玉', rarity: 2, value: 8 },
  dragon_grass: { name: '龙须草', rank: 5, type: 'spirit_plant', description: '传说龙居住之地才有', rarity: 6, value: 100 },
  phoenix_flower: { name: '凤凰花', rank: 5, type: 'spirit_plant', description: '浴火重生之花', rarity: 6, value: 100 },
  nine_leaf_lian: { name: '九叶莲', rank: 5, type: 'spirit_plant', description: '九叶连开，莲中圣品', rarity: 7, value: 150 },
  inner_core: { name: '妖丹', rank: 5, type: 'monster_material', description: '大妖内丹', rarity: 6, value: 200 },
  longevity_flower: { name: '长寿花', rank: 4, type: 'spirit_plant', description: '增加寿元的奇花', rarity: 5, value: 75 },
  tortoise_shell: { name: '玄武龟甲', rank: 4, type: 'monster_material', description: '千年玄龟之甲', rarity: 5, value: 60 },
  crane_feather: { name: '仙鹤羽', rank: 4, type: 'monster_material', description: '仙鹤尾羽', rarity: 4, value: 40 },
  soul_flower: { name: '养魂花', rank: 6, type: 'spirit_plant', description: '滋养神魂的幽冥之花', rarity: 7, value: 300 },
  ghost_grass: { name: '幽鬼草', rank: 6, type: 'spirit_plant', description: '生于阴冥之地', rarity: 7, value: 250 },
  nether_water: { name: '黄泉之水', rank: 6, type: 'mineral', description: '黄泉源头的一滴水', rarity: 8, value: 500 },
  tiger_bone: { name: '猛虎骨', rank: 4, type: 'monster_material', description: '修炼成精的猛虎骨骼', rarity: 4, value: 35 },
  bear_bile: { name: '熊胆', rank: 4, type: 'monster_material', description: '黑熊精的胆', rarity: 4, value: 30 },
  iron_grass: { name: '铁线草', rank: 4, type: 'spirit_plant', description: '坚如钢铁的草', rarity: 3, value: 20 },
  enlightenment_tea: { name: '悟道茶', rank: 5, type: 'spirit_plant', description: '一叶一世界，一茶一悟道', rarity: 8, value: 500 },
  dao_grass: { name: '道草', rank: 5, type: 'spirit_plant', description: '天生蕴含有道韵', rarity: 7, value: 200 },
  insight_stone: { name: '智慧石', rank: 5, type: 'mineral', description: '开启灵智的奇石', rarity: 7, value: 250 },
  iron_ore: { name: '精铁矿石', rank: 1, type: 'mineral', description: '凡铁中的精品', rarity: 1, value: 2 },
  spirit_wood: { name: '灵木', rank: 1, type: 'spirit_plant', description: '吸收灵气的木材', rarity: 1, value: 2 },
  ten_thousand_steel: { name: '万炼钢', rank: 3, type: 'mineral', description: '万次锤炼的神钢', rarity: 4, value: 50 },
  flying_feather: { name: '飞羽', rank: 3, type: 'monster_material', description: '大鹏之羽', rarity: 4, value: 40 },
  wind_essence: { name: '风之精华', rank: 3, type: 'elemental', description: '凝聚的风元素', rarity: 4, value: 45 },
  silk: { name: '天蚕丝', rank: 2, type: 'monster_material', description: '冰蚕吐的丝', rarity: 3, value: 15 },
  moon_thread: { name: '月丝', rank: 2, type: 'elemental', description: '月华凝聚成的丝线', rarity: 3, value: 20 },
  defensive_rune: { name: '防御符文', rank: 2, type: 'rune', description: '刻有防御阵法', rarity: 3, value: 25 },
  space_stone: { name: '空间石', rank: 3, type: 'mineral', description: '蕴含空间法则', rarity: 5, value: 150 },
  gold: { name: '黄金', rank: 1, type: 'mineral', description: '世俗的黄金', rarity: 1, value: 1 },
  spirit_engraving: { name: '灵纹', rank: 3, type: 'rune', description: '精神刻下的道纹', rarity: 4, value: 80 },
  dragon_scale: { name: '龙鳞', rank: 5, type: 'monster_material', description: '真龙身上的鳞片', rarity: 8, value: 500 },
  tiger_soul: { name: '白虎之魂', rank: 5, type: 'soul_fragment', description: '守护西方的神兽残魂', rarity: 8, value: 500 },
  heavenly_thunder: { name: '天雷之核', rank: 5, type: 'elemental', description: '天劫中捕获的雷电', rarity: 8, value: 600 },
  nascent_stone: { name: '元婴石', rank: 7, type: 'mineral', description: '元婴老祖坐化所化', rarity: 9, value: 3000 },
  soul_steel: { name: '魂钢', rank: 7, type: 'mineral', description: '融入万千生魂的钢', rarity: 9, value: 2500 },
  void_metal: { name: '虚空之精', rank: 7, type: 'mineral', description: '虚空中的金属精华', rarity: 9, value: 3500 },
  dao_pattern: { name: '道纹金纸', rank: 7, type: 'rune', description: '天地生成的道纹', rarity: 10, value: 5000 }
}

export function attemptAlchemy(
  state: CultivationState,
  recipeId: string,
  useBonus: boolean = false
): {
  success: boolean
  newState: CultivationState
  quality: PillQuality
  quantity: number
  message: string
} {
  const recipe = PILL_RECIPES.find(r => r.id === recipeId)
  if (!recipe) {
    return { success: false, newState: state, quality: 'common', quantity: 0, message: '配方不存在' }
  }

  if (compareRealm(state.cultivation.realm, recipe.min_realm) < 0) {
    return {
      success: false,
      newState: state,
      quality: 'common',
      quantity: 0,
      message: `修为不足，需要${recipe.min_realm}才可炼制此丹`
    }
  }

  for (const [material, amount] of Object.entries(recipe.materials)) {
    const owned = state.inventory.filter(i => i.id === material).reduce((sum, i) => sum + i.quantity, 0)
    if (owned < amount) {
      return {
        success: false,
        newState: state,
        quality: 'common',
        quantity: 0,
        message: `材料不足：需要 ${MATERIALS[material]?.name || material} x${amount}`
      }
    }
  }

  let newState = { ...state }

  for (const [material, amount] of Object.entries(recipe.materials)) {
    let remaining = amount
    for (const item of newState.inventory.filter(i => i.id === material)) {
      const take = Math.min(remaining, item.quantity)
      item.quantity -= take
      remaining -= take
      if (remaining <= 0) break
    }
    newState.inventory = newState.inventory.filter(i => i.quantity > 0)
  }

  let successRate = recipe.baseSuccessRate

  const skillBonus = state.alchemySkill / 100
  successRate *= 1 + skillBonus

  const realmBonus = compareRealm(state.cultivation.realm, recipe.min_realm) / 20
  successRate *= 1 + realmBonus

  if (useBonus) {
    if (newState.spiritStones.low >= 100) {
      newState.spiritStones.low -= 100
      successRate *= 1.5
    }
  }

  const difficultyPenalty = recipe.difficulty / 100
  successRate *= (1 - difficultyPenalty * 0.5)

  successRate = clamp(successRate, 0.01, 0.99)

  const success = chance(successRate)

  if (success) {
    const qualities: PillQuality[] = ['inferior', 'common', 'superior', 'exquisite', 'spirit', 'immortal']
    const qualityRoll = Math.random() + state.alchemySkill / 200
    const qualityIndex = clamp(Math.floor(qualityRoll * 3.5), 0, qualities.length - 1)
    const quality = qualities[qualityIndex]

    let quantity = recipe.outputQuantity
    if (quality === 'spirit' || quality === 'immortal' || quality === 'exquisite') {
      quantity += 1
    }

    const expGain = recipe.experience * (1 + qualityIndex * 0.5)
    newState.alchemyExperience += expGain

    checkAlchemyLevelUp(newState)
    newState.stats.pillsCreated += quantity

    const pillBuffMap: Record<string, string> = {
      qi_pill: 'pill_qi',
      foundation_pill: 'pill_foundation',
      breakthrough_pill: 'pill_enlightenment',
      soul_cultivating_pill: 'pill_soul_cultivate',
      life_extension_pill: 'pill_life_extension',
      body_tempering_pill: 'pill_body_temper'
    }

    if (pillBuffMap[recipeId]) {
      newState = applyBuff(newState, pillBuffMap[recipeId])
    }

    const bonusText = quality !== 'common' && quality !== 'inferior' ? `【${quality === 'spirit' ? '灵级' : quality === 'immortal' ? '仙级' : quality === 'exquisite' ? '极品' : '上品'}】` : ''

    return {
      success: true,
      newState,
      quality,
      quantity,
      message: `炼丹成功！炼出${recipe.output} x${quantity} ${bonusText}`
    }
  } else {
    const expGain = recipe.experience * 0.1
    newState.alchemyExperience += expGain
    checkAlchemyLevelUp(newState)

    return {
      success: false,
      newState,
      quality: 'inferior',
      quantity: 0,
      message: '炼丹失败...材料已消耗'
    }
  }
}

function checkAlchemyLevelUp(state: CultivationState) {
  const expNeeded = state.alchemyLevel * 100
  if (state.alchemyExperience >= expNeeded) {
    state.alchemyExperience -= expNeeded
    state.alchemyLevel += 1
    state.alchemySkill += 5
  }
}

export function attemptRefining(
  state: CultivationState,
  recipeId: string
): {
  success: boolean
  newState: CultivationState
  quality: ArtifactQuality
  message: string
  enhancements: string[]
} {
  const recipe = REFINING_RECIPES.find(r => r.id === recipeId)
  if (!recipe) {
    return { success: false, newState: state, quality: 'mortal', message: '配方不存在', enhancements: [] }
  }

  if (compareRealm(state.cultivation.realm, recipe.min_realm) < 0) {
    return {
      success: false,
      newState: state,
      quality: 'mortal',
      message: `修为不足，需要${recipe.min_realm}才可炼制此器`,
      enhancements: []
    }
  }

  for (const [material, amount] of Object.entries(recipe.materials)) {
    const owned = state.inventory.filter(i => i.id === material).reduce((sum, i) => sum + i.quantity, 0)
    if (owned < amount) {
      return {
        success: false,
        newState: state,
        quality: 'mortal',
        message: `材料不足：需要 ${MATERIALS[material]?.name || material} x${amount}`,
        enhancements: []
      }
    }
  }

  let newState = { ...state }

  for (const [material, amount] of Object.entries(recipe.materials)) {
    let remaining = amount
    for (const item of newState.inventory.filter(i => i.id === material)) {
      const take = Math.min(remaining, item.quantity)
      item.quantity -= take
      remaining -= take
      if (remaining <= 0) break
    }
    newState.inventory = newState.inventory.filter(i => i.quantity > 0)
  }

  let successRate = recipe.baseSuccessRate

  const skillBonus = state.refiningSkill / 100
  successRate *= 1 + skillBonus

  const realmBonus = compareRealm(state.cultivation.realm, recipe.min_realm) / 20
  successRate *= 1 + realmBonus

  const difficultyPenalty = recipe.difficulty / 100
  successRate *= (1 - difficultyPenalty * 0.5)

  successRate = clamp(successRate, 0.01, 0.99)

  const success = chance(successRate)

  if (success) {
    const qualities: ArtifactQuality[] = ['mortal', 'spirit', 'earth', 'heaven', 'immortal', 'dao']
    const qualityRoll = Math.random() + state.refiningSkill / 200
    const qualityIndex = clamp(Math.floor(qualityRoll * 2.5), 0, qualities.length - 1)
    const quality = qualities[qualityIndex]

    const enhancements: string[] = []
    const enhancementCount = recipe.enhancementSlots + Math.floor(qualityIndex / 2)

    const possibleEnhancements = [
      '攻击+10%', '防御+10%', '灵气回复+15%', '修炼速度+10%',
      '自带剑灵', '可成长', '滴血认主', '空间折叠',
      '自动护主', '器灵已生', '不朽神材', '道蕴天成'
    ]

    for (let i = 0; i < Math.min(enhancementCount, possibleEnhancements.length); i++) {
      enhancements.push(possibleEnhancements[(i + qualityIndex) % possibleEnhancements.length])
    }

    const expGain = recipe.experience * (1 + qualityIndex * 0.5)
    newState.refiningExperience += expGain

    checkRefiningLevelUp(newState)
    newState.stats.artifactsRefined += 1

    return {
      success: true,
      newState,
      quality,
      message: `炼器成功！炼出${recipe.output}`,
      enhancements
    }
  } else {
    const expGain = recipe.experience * 0.1
    newState.refiningExperience += expGain
    checkRefiningLevelUp(newState)

    return {
      success: false,
      newState,
      quality: 'mortal',
      message: '炼器失败...材料化为飞灰',
      enhancements: []
    }
  }
}

function checkRefiningLevelUp(state: CultivationState) {
  const expNeeded = state.refiningLevel * 100
  if (state.refiningExperience >= expNeeded) {
    state.refiningExperience -= expNeeded
    state.refiningLevel += 1
    state.refiningSkill += 5
  }
}
