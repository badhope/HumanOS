export interface Technique {
  id: string
  name: string
  tier: 'mortal' | 'earth' | 'heaven' | 'immortal'
  type: 'qi' | 'body' | 'soul' | 'neutral'
  grade: number
  description: string
  effect: {
    cultivationSpeed: number
    spiritualPower: number
    breakthroughBonus: number
    combatBonus: number
  }
  requiredRealm: string
  elements: string[]
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface Pill {
  id: string
  name: string
  tier: 'low' | 'mid' | 'high' | 'spirit' | 'immortal'
  description: string
  effect: string
  successRate: number
  difficulty: number
  materials: { item: string; amount: number }[]
  effects: {
    spiritualQi?: number
    breakthroughBonus?: number
    lifespan?: number
    heal?: number
    cultivationBoost?: number
  }
  sideEffect?: string
  flavorText: string
}

export interface DivineAbility {
  id: string
  name: string
  description: string
  requiredRealm: string
  cooldown: number
  power: number
  type: 'attack' | 'defense' | 'support' | 'movement' | 'mystic'
  cost: number
  effect: string
}

export interface DaoCompanion {
  id: string
  name: string
  appearance: string
  personality: string
  background: string
  realm: string
  talent: number
  favor: number
  specialty: 'alchemy' | 'artifact' | 'cultivation' | 'battle' | 'support'
  bonus: { type: string; value: number }
  events: string[]
}

export interface Sect {
  id: string
  name: string
  type: 'righteous' | 'demonic' | 'neutral'
  rank: number
  influence: number
  resources: {
    spiritStones: number
    pills: number
    artifacts: number
  }
  disciples: {
    outer: number
    inner: number
    core: number
    elders: number
  }
  reputation: number
  specialties: string[]
  hostileSects: string[]
  alliedSects: string[]
}

export const CULTIVATION_TECHNIQUES: Technique[] = [
  {
    id: 'basic_qi',
    name: '基础吐纳法',
    tier: 'mortal',
    type: 'qi',
    grade: 1,
    description: '凡人界流传最广的基础功法，平平无奇但胜在稳妥。',
    effect: { cultivationSpeed: 1.0, spiritualPower: 1.0, breakthroughBonus: 0, combatBonus: 0 },
    requiredRealm: 'mortal',
    elements: ['neutral'],
    rarity: 'common',
  },
  {
    id: 'purple_cloud',
    name: '紫气东来诀',
    tier: 'earth',
    type: 'qi',
    grade: 3,
    description: '道门正统功法，吸收东来紫气，中正平和，根基深厚。',
    effect: { cultivationSpeed: 1.3, spiritualPower: 1.2, breakthroughBonus: 0.05, combatBonus: 0.1 },
    requiredRealm: 'qi_refining_3',
    elements: ['wood', 'fire'],
    rarity: 'rare',
  },
  {
    id: 'nine_suns',
    name: '九阳神功',
    tier: 'heaven',
    type: 'qi',
    grade: 7,
    description: '至阳至刚的绝世功法，练成后百邪不侵，真气生生不息。',
    effect: { cultivationSpeed: 1.8, spiritualPower: 2.0, breakthroughBonus: 0.15, combatBonus: 0.5 },
    requiredRealm: 'foundation_early',
    elements: ['fire'],
    rarity: 'legendary',
  },
  {
    id: 'nine_yin',
    name: '九阴真经',
    tier: 'heaven',
    type: 'soul',
    grade: 7,
    description: '至阴至柔的无上典籍，包含万千神通妙法。',
    effect: { cultivationSpeed: 1.7, spiritualPower: 1.8, breakthroughBonus: 0.12, combatBonus: 0.4 },
    requiredRealm: 'foundation_early',
    elements: ['water', 'yin'],
    rarity: 'legendary',
  },
  {
    id: 'jade_clear',
    name: '玉清仙诀',
    tier: 'immortal',
    type: 'neutral',
    grade: 12,
    description: '三清传承，仙家正法。直指大道的无上仙法。',
    effect: { cultivationSpeed: 3.0, spiritualPower: 3.5, breakthroughBonus: 0.3, combatBonus: 1.0 },
    requiredRealm: 'golden_core_early',
    elements: ['all'],
    rarity: 'legendary',
  },
  {
    id: 'demon_seal',
    name: '化魔大法',
    tier: 'heaven',
    type: 'soul',
    grade: 6,
    description: '魔道至尊功法，以他人功力滋补自身，进境神速但心魔重重。',
    effect: { cultivationSpeed: 2.5, spiritualPower: 1.5, breakthroughBonus: -0.1, combatBonus: 0.8 },
    requiredRealm: 'foundation_early',
    elements: ['yin', 'demonic'],
    rarity: 'epic',
  },
  {
    id: 'vajra_body',
    name: '金刚不坏神功',
    tier: 'heaven',
    type: 'body',
    grade: 8,
    description: '佛门护法神功，练成后肉身成圣，万法不侵。',
    effect: { cultivationSpeed: 0.8, spiritualPower: 1.0, breakthroughBonus: 0.2, combatBonus: 1.2 },
    requiredRealm: 'foundation_mid',
    elements: ['earth', 'metal'],
    rarity: 'legendary',
  },
  {
    id: 'void_breathing',
    name: '虚空呼吸法',
    tier: 'immortal',
    type: 'soul',
    grade: 10,
    description: '吞吐天地虚空，修炼此功者，一呼一吸便是山川崩塌。',
    effect: { cultivationSpeed: 2.8, spiritualPower: 4.0, breakthroughBonus: 0.25, combatBonus: 0.9 },
    requiredRealm: 'nascent_soul_early',
    elements: ['void'],
    rarity: 'legendary',
  },
]

export const ALCHEMY_PILLS: Pill[] = [
  {
    id: 'qi_gathering',
    name: '聚气丹',
    tier: 'low',
    description: '炼气期最常用的丹药，快速恢复灵力。',
    effect: '恢复50点灵力',
    successRate: 0.8,
    difficulty: 1,
    materials: [{ item: '凝气草', amount: 3 }, { item: '泉心水', amount: 1 }],
    effects: { spiritualQi: 50 },
    flavorText: '入门炼丹师的第一课，虽然低级但需求量极大。',
  },
  {
    id: 'foundation_pill',
    name: '筑基丹',
    tier: 'mid',
    description: '筑基必备神药，多少修士为求一颗筑基丹打得头破血流。',
    effect: '筑基成功率+40%',
    successRate: 0.4,
    difficulty: 3,
    materials: [{ item: '筑基花', amount: 1 }, { item: '百年莲子', amount: 2 }, { item: '龙血藤', amount: 1 }],
    effects: { breakthroughBonus: 0.4 },
    flavorText: '"一颗筑基丹，十条修士命"',
  },
  {
    id: 'golden_core_pill',
    name: '金丹大道丹',
    tier: 'high',
    description: '辅助结丹的圣品丹药，丹成之时天降祥瑞。',
    effect: '结丹成功率+30%',
    successRate: 0.2,
    difficulty: 6,
    materials: [{ item: '道果', amount: 1 }, { item: '五百年人参', amount: 3 }, { item: '雷劫液', amount: 1 }],
    effects: { breakthroughBonus: 0.3 },
    flavorText: '丹成九转，大道可期。',
  },
  {
    id: 'yuan_boosting',
    name: '培元丹',
    tier: 'mid',
    description: '固本培元，稳固根基的良药。',
    effect: '修炼速度+50%持续100天',
    successRate: 0.6,
    difficulty: 2,
    materials: [{ item: '茯苓', amount: 5 }, { item: '黄精', amount: 3 }],
    effects: { cultivationBoost: 0.5 },
    sideEffect: '药效温和，无副作用',
    flavorText: '居家旅行，修炼打坐必备。',
  },
  {
    id: 'longevity_pill',
    name: '延寿丹',
    tier: 'high',
    description: '增加寿元的稀世丹药。',
    effect: '寿元+50年',
    successRate: 0.3,
    difficulty: 7,
    materials: [{ item: '蟠桃', amount: 1 }, { item: '不死草', amount: 3 }, { item: '万年钟乳', amount: 1 }],
    effects: { lifespan: 50 },
    flavorText: '时间，才是修士最珍贵的资源。',
  },
  {
    id: 'purifying_pill',
    name: '洗髓丹',
    tier: 'spirit',
    description: '伐毛洗髓，脱胎换骨！可以提升灵根品质。',
    effect: '有概率提升灵根品级',
    successRate: 0.15,
    difficulty: 9,
    materials: [{ item: '造化泉', amount: 1 }, { item: '通天藤', amount: 2 }, { item: '血莲', amount: 3 }],
    effects: {},
    flavorText: '洗髓丹，逆天改命，凡人也能变天才！',
  },
  {
    id: 'nascent_soul_pill',
    name: '元婴丹',
    tier: 'spirit',
    description: '破丹成婴的关键丹药。',
    effect: '元婴成功率+25%',
    successRate: 0.1,
    difficulty: 10,
    materials: [{ item: '婴果树', amount: 1 }, { item: '九叶灵芝', amount: 1 }, { item: '麒麟血', amount: 1 }],
    effects: { breakthroughBonus: 0.25 },
    flavorText: '元婴一出，天下震动。',
  },
  {
    id: 'heavenly_tribulation_pill',
    name: '渡劫仙丹',
    tier: 'immortal',
    description: '渡天劫时的至宝，可以削弱天雷威力。',
    effect: '天劫威力-30%',
    successRate: 0.05,
    difficulty: 15,
    materials: [{ item: '仙晶', amount: 3 }, { item: '凤凰羽毛', amount: 2 }, { item: '世界树精华', amount: 1 }],
    effects: {},
    flavorText: '此丹只应天上有，人间难得几回闻。',
  },
  {
    id: 'resurrection_pill',
    name: '九转还魂丹',
    tier: 'immortal',
    description: '传说中的仙丹，可以生死人肉白骨。',
    effect: '肉身不腐的情况下可以复活一次',
    successRate: 0.01,
    difficulty: 20,
    materials: [{ item: '太阴真火', amount: 1 }, { item: '太阳真水', amount: 1 }, { item: '造化玉碟碎片', amount: 1 }],
    effects: {},
    flavorText: '阎王要你三更死，丹药留你到五更！',
  },
]

export const DIVINE_ABILITIES: DivineAbility[] = [
  {
    id: 'fireball',
    name: '火球术',
    description: '最基础的火系法术，但用好了威力也不容小觑。',
    requiredRealm: 'qi_refining_1',
    cooldown: 3,
    power: 10,
    type: 'attack',
    cost: 10,
    effect: '造成灵力x1的火焰伤害',
  },
  {
    id: 'water_shield',
    name: '水镜术',
    description: '以水为镜，格挡攻击。',
    requiredRealm: 'qi_refining_2',
    cooldown: 5,
    power: 15,
    type: 'defense',
    cost: 15,
    effect: '抵挡相当于灵力x1.5的伤害',
  },
  {
    id: 'sword_qi',
    name: '剑气纵横',
    description: '以气御剑，千里之外取人首级。',
    requiredRealm: 'foundation_early',
    cooldown: 8,
    power: 50,
    type: 'attack',
    cost: 40,
    effect: '无视部分防御的穿透伤害',
  },
  {
    id: 'earth_prison',
    name: '大地囚笼',
    description: '从地底召唤岩石牢笼困住敌人。',
    requiredRealm: 'foundation_mid',
    cooldown: 15,
    power: 30,
    type: 'mystic',
    cost: 50,
    effect: '困住敌人3回合，境界差距过大可能挣脱',
  },
  {
    id: 'golden_core_flame',
    name: '金丹真火',
    description: '金丹修士的本命真火，焚山煮海。',
    requiredRealm: 'golden_core_early',
    cooldown: 20,
    power: 200,
    type: 'attack',
    cost: 100,
    effect: '金丹修士最强杀招，灼烧灵魂',
  },
  {
    id: 'nascent_soul_out',
    name: '元婴出窍',
    description: '元婴离体，神游太虚。',
    requiredRealm: 'nascent_soul_early',
    cooldown: 100,
    power: 0,
    type: 'mystic',
    cost: 200,
    effect: '元婴可以离体行动，被击破则重伤',
  },
  {
    id: 'transform_light',
    name: '化虹之术',
    description: '神行之法，日行十万里。',
    requiredRealm: 'golden_core_late',
    cooldown: 30,
    power: 0,
    type: 'movement',
    cost: 80,
    effect: '逃跑成功率+80%',
  },
  {
    id: 'sky_thunder',
    name: '九霄神雷',
    description: '引动九天雷霆，惩戒世人。',
    requiredRealm: 'soul_fusion_early',
    cooldown: 50,
    power: 500,
    type: 'attack',
    cost: 300,
    effect: '渡劫修士的雷神之力，对魔道有加成',
  },
  {
    id: 'create_world',
    name: '袖里乾坤',
    description: '大能手段，空间神通。',
    requiredRealm: 'dao_integration_early',
    cooldown: 200,
    power: 1000,
    type: 'mystic',
    cost: 500,
    effect: '创造小世界，可将敌人收入其中炼化',
  },
]

export const SECT_LIST: Sect[] = [
  {
    id: 'qing_yun',
    name: '青云门',
    type: 'righteous',
    rank: 1,
    influence: 10000,
    resources: { spiritStones: 500000, pills: 10000, artifacts: 5000 },
    disciples: { outer: 10000, inner: 1000, core: 100, elders: 10 },
    reputation: 95,
    specialties: ['剑道', '护山大阵'],
    hostileSects: ['鬼王宗'],
    alliedSects: ['天音寺', '焚香谷'],
  },
  {
    id: 'tian_yin',
    name: '天音寺',
    type: 'righteous',
    rank: 1,
    influence: 9000,
    resources: { spiritStones: 400000, pills: 15000, artifacts: 3000 },
    disciples: { outer: 8000, inner: 800, core: 80, elders: 12 },
    reputation: 98,
    specialties: ['佛功', '渡化', '医术'],
    hostileSects: ['合欢派'],
    alliedSects: ['青云门'],
  },
  {
    id: 'ghost_king',
    name: '鬼王宗',
    type: 'demonic',
    rank: 1,
    influence: 8500,
    resources: { spiritStones: 600000, pills: 8000, artifacts: 8000 },
    disciples: { outer: 15000, inner: 1200, core: 150, elders: 8 },
    reputation: 20,
    specialties: ['血炼', '召唤', '魔功'],
    hostileSects: ['青云门', '天音寺'],
    alliedSects: ['合欢派', '万毒门'],
  },
  {
    id: 'he_huan',
    name: '合欢派',
    type: 'demonic',
    rank: 2,
    influence: 6000,
    resources: { spiritStones: 450000, pills: 20000, artifacts: 4000 },
    disciples: { outer: 5000, inner: 500, core: 50, elders: 6 },
    reputation: 30,
    specialties: ['魅惑', '采补', '幻术'],
    hostileSects: ['天音寺'],
    alliedSects: ['鬼王宗'],
  },
  {
    id: 'wan_du',
    name: '万毒门',
    type: 'demonic',
    rank: 2,
    influence: 5500,
    resources: { spiritStones: 350000, pills: 25000, artifacts: 2000 },
    disciples: { outer: 6000, inner: 400, core: 40, elders: 7 },
    reputation: 10,
    specialties: ['用毒', '蛊术', '丹道'],
    hostileSects: [],
    alliedSects: ['鬼王宗'],
  },
  {
    id: 'free_swords',
    name: '逍遥剑派',
    type: 'neutral',
    rank: 3,
    influence: 4000,
    resources: { spiritStones: 200000, pills: 5000, artifacts: 6000 },
    disciples: { outer: 3000, inner: 300, core: 30, elders: 5 },
    reputation: 70,
    specialties: ['逍遥剑道', '自由'],
    hostileSects: [],
    alliedSects: [],
  },
]

export function getTechniqueById(id: string): Technique | undefined {
  return CULTIVATION_TECHNIQUES.find(t => t.id === id)
}

export function getPillById(id: string): Pill | undefined {
  return ALCHEMY_PILLS.find(p => p.id === id)
}

export function getSectById(id: string): Sect | undefined {
  return SECT_LIST.find(s => s.id === id)
}

export function getAvailableTechniques(realm: string): Technique[] {
  const realmOrder = [
    'mortal', 'qi_refining_1', 'qi_refining_3', 'foundation_early', 'foundation_mid',
    'golden_core_early', 'nascent_soul_early'
  ]
  const currentIndex = realmOrder.indexOf(realm)
  return CULTIVATION_TECHNIQUES.filter(t => 
    realmOrder.indexOf(t.requiredRealm) <= currentIndex
  )
}

export function getPillsForRealm(realm: string): Pill[] {
  const realmTier: Record<string, number> = {
    mortal: 1, qi_refining_1: 1, qi_refining_9: 2,
    foundation_early: 3, foundation_perfect: 4,
    golden_core_early: 5, nascent_soul_early: 6,
  }
  const tier = realmTier[realm] || 1
  return ALCHEMY_PILLS.filter(p => p.difficulty <= tier + 2)
}
