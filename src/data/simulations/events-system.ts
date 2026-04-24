export interface GameEventChoice {
  text: string
  effects: Record<string, number | string | boolean>
  requirements?: Record<string, number | string>
}

export interface GameEvent {
  id: string
  title: string
  description: string
  category: 'story' | 'random' | 'historic' | 'crisis' | 'opportunity'
  icon: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic'
  weight: number
  cooldownDays: number
  requirements: Record<string, number | string | boolean>
  choices: GameEventChoice[]
  flavorText?: string
  source?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  difficulty: 'easy' | 'medium' | 'hard' | 'impossible'
  requirements: Record<string, number | string | boolean>
  rewards: Record<string, number | string | boolean>
  hidden: boolean
  onceOnly: boolean
}

export const XIANXIA_EVENTS: GameEvent[] = [
  {
    id: 'mysterious_old_man',
    title: '神秘老者',
    description: '你在山中修炼时，遇到一个衣衫褴褛的老者。他看似平凡，但双目偶尔闪过精光...',
    category: 'opportunity',
    icon: '👴',
    rarity: 'rare',
    weight: 10,
    cooldownDays: 365,
    requirements: { realm: '>=qi_refining_3' },
    choices: [
      { text: '恭敬地向他请教', effects: { comprehension: 10, technique_rarity: 'earth' } },
      { text: '警惕地绕道而行', effects: { caution: 5, nothing: 1 } },
      { text: '试探性地攻击他', effects: { danger: 100, possible: 'ancient_relic' } },
    ],
    flavorText: '"少年，我看你骨骼惊奇..."',
  },
  {
    id: 'herb_discovery',
    title: '天材地宝',
    description: '你在一处人迹罕至的山谷中，发现了一株散发着异香的灵药！',
    category: 'opportunity',
    icon: '🌿',
    rarity: 'uncommon',
    weight: 25,
    cooldownDays: 100,
    requirements: {},
    choices: [
      { text: '立刻服用，药力冲脉', effects: { spiritualQi: 100, purity: 0.7 } },
      { text: '妥善保存，日后炼丹', effects: { pillMaterial: 'rare' } },
      { text: '设下法阵，在此守护', effects: { dayPass: 30, pill: 'high_quality' } },
    ],
  },
  {
    id: 'dao_companion_meet',
    title: '惊鸿一瞥',
    description: '你在宗门大比上，见到一位惊才绝艳的同道。二人目光交汇，似有灵犀...',
    category: 'story',
    icon: '💕',
    rarity: 'rare',
    weight: 15,
    cooldownDays: 500,
    requirements: { realm: '>=foundation_early' },
    choices: [
      { text: '主动上前结交', effects: { companionFavor: 30, reputation: 10 } },
      { text: '默默关注，伺机而动', effects: { companionFavor: 15, subtlety: 10 } },
      { text: '一心向道，儿女情长不过浮云', effects: { daoHeart: 10, loneliness: 5 } },
    ],
  },
  {
    id: 'demonic_tribulation',
    title: '心魔劫',
    description: '修炼出了岔子！心魔趁虚而入，眼前浮现出你最放不下的执念...',
    category: 'crisis',
    icon: '👹',
    rarity: 'uncommon',
    weight: 20,
    cooldownDays: 200,
    requirements: { innerDemon: '>=20' },
    choices: [
      { text: '直面本心，坦然面对', effects: { innerDemon: -30, daoHeart: 20 } },
      { text: '强力镇压，以力证道', effects: { innerDemon: -15, cultivation: 50, trauma: 10 } },
      { text: '逃避现实，暂封记忆', effects: { innerDemon: -5, hiddenTrauma: 50 } },
    ],
    flavorText: '心劫，才是最大的劫难。',
  },
  {
    id: 'sect_conspiracy',
    title: '宗门阴谋',
    description: '你无意中撞破了几位长老的密谈，似乎涉及到一桩陈年旧案和资源挪用...',
    category: 'story',
    icon: '🗡️',
    rarity: 'epic',
    weight: 8,
    cooldownDays: 1000,
    requirements: { realm: '>=foundation_mid', position: '>=inner_disciple' },
    choices: [
      { text: '假装没看见，立刻退走', effects: { safety: 1, sectTrust: -5, guilt: 20 } },
      { text: '匿名举报，上交证据', effects: { justice: 20, enemys: 1, anonymous: true } },
      { text: '以此要挟，换取利益', effects: { resources: 500, daoHeart: -30 } },
      { text: '公开揭发，大义灭亲', effects: { reputation: 50, enemys: 3, position: +1 } },
    ],
  },
  {
    id: 'ancient_ruins',
    title: '上古遗迹',
    description: '空间扭曲！你被卷入了一处上古修士的洞府遗迹。',
    category: 'opportunity',
    icon: '🏛️',
    rarity: 'epic',
    weight: 5,
    cooldownDays: 730,
    requirements: { realm: '>=foundation_late' },
    choices: [
      { text: '谨慎探索，步步为营', effects: { safety: 0.8, treasure: 'uncommon' } },
      { text: '直奔核心，富贵险中求', effects: { safety: 0.3, treasure: 'legendary' } },
      { text: '立刻退出，不作死就不会死', effects: { safety: 1, regret: 10 } },
    ],
    flavorText: '"上古的荣光，只等待有缘人。"',
  },
  {
    id: 'friendly_duel',
    title: '同门较艺',
    description: '一位师兄/师姐主动邀你切磋，胜负会影响你在宗门的地位。',
    category: 'story',
    icon: '⚔️',
    rarity: 'common',
    weight: 40,
    cooldownDays: 30,
    requirements: {},
    choices: [
      { text: '全力以赴，争强好胜', effects: { reputation: 15, enemys: 0.5, injuries: 10 } },
      { text: '点到为止，给足面子', effects: { reputation: 5, friendship: 10, face: 20 } },
      { text: '故意示弱，隐藏实力', effects: { reputation: -5, hiddenPower: true } },
    ],
  },
  {
    id: 'breakthrough_failure',
    title: '突破失败',
    description: '冲击境界失败！你感受到经脉受损，心魔滋生...',
    category: 'crisis',
    icon: '💥',
    rarity: 'uncommon',
    weight: 35,
    cooldownDays: 100,
    requirements: { breakthroughAttempt: true, successRate: '<=0.7' },
    choices: [
      { text: '闭关疗伤，稳扎稳打', effects: { recoveryDays: 30, innerDemon: -10 } },
      { text: '不服再来，一鼓作气', effects: { recoveryDays: 7, nextAttemptBonus: 0.1, innerDemon: 20 } },
      { text: '寻找丹药，辅助修复', effects: { recoveryDays: 10, resources: -200 } },
    ],
  },
  {
    id: 'enlightenment_moment',
    title: '一朝悟道',
    description: '看到落叶飘落，听到泉水叮咚，刹那间你顿悟了大道的一丝玄机...',
    category: 'opportunity',
    icon: '💡',
    rarity: 'epic',
    weight: 3,
    cooldownDays: 1000,
    requirements: { realm: '>=foundation_early', comprehension: '>=50' },
    choices: [
      { text: '闭死关，细细品味', effects: { dayPass: 100, comprehension: 50, cultivation: 500 } },
    ],
    flavorText: '"十年枯坐，不如一朝悟道。"',
  },
  {
    id: 'righteous_dilemma',
    title: '正邪抉择',
    description: '你遇到魔道修士掳掠凡人，是挺身而出还是明哲保身？',
    category: 'story',
    icon: '⚖️',
    rarity: 'rare',
    weight: 12,
    cooldownDays: 365,
    requirements: {},
    choices: [
      { text: '路见不平，拔刀相助', effects: { righteous: 30, combatExp: 50, danger: 60 } },
      { text: '暗中报信，借刀杀人', effects: { righteous: 10, subtle: 20, safe: true } },
      { text: '不管闲事，速速离去', effects: { righteous: -20, safe: true, daoHeart: -5 } },
      { text: '见猎心喜，黑吃黑', effects: { righteous: -50, resources: 300, daoHeart: -20 } },
    ],
  },
]

export const ECONOMY_EVENTS: GameEvent[] = [
  {
    id: 'potato_famine',
    title: '马铃薯晚疫病',
    description: '马铃薯大面积枯萎，农民的主食来源断绝。饥荒正在蔓延...',
    category: 'crisis',
    icon: '🥔',
    rarity: 'uncommon',
    weight: 15,
    cooldownDays: 3650,
    requirements: { year: '>=1845', agriculture: '>=potato_staple' },
    choices: [
      { text: '自由放任，市场会自己调节', effects: { mortality: 50, migration: 30, radicalism: 40, landowner_opinion: 20 } },
      { text: '国家干预，禁止粮食出口', effects: { food_shortage: -30, budget: -20, industrialist_opinion: -20 } },
      { text: '举外债，进口粮食赈灾', effects: { debt: 50, radicals: -20, prestige: 10 } },
    ],
    source: '爱尔兰大饥荒 1845-1849',
  },
  {
    id: 'spring_of_nations',
    title: '民族之春',
    description: '革命浪潮席卷欧洲！自由、平等、博爱的呼声响彻大街小巷...',
    category: 'crisis',
    icon: '🇫🇷',
    rarity: 'epic',
    weight: 8,
    cooldownDays: 10000,
    requirements: { year: 1848 },
    choices: [
      { text: '血腥镇压，枪杆子里出政权', effects: { revolution: 0.3, military_power: 30, radicals: 60, prestige: -20 } },
      { text: '主动改革，让步保皇', effects: { constitutionalism: true, revolution: 0.1, liberals: 50, landowner_opinion: -30 } },
      { text: '逊位跑路，君子不立危墙', effects: { republic: true, game_over_monarch: true } },
    ],
    source: '1848年革命',
  },
  {
    id: 'panic_1873',
    title: '维也纳股市崩盘',
    description: '黑色星期五！维也纳股市崩溃，银行开始挤兑。全球经济大萧条来临...',
    category: 'crisis',
    icon: '📉',
    rarity: 'rare',
    weight: 10,
    cooldownDays: 7300,
    requirements: { year: 1873 },
    choices: [
      { text: '金本位不动摇，清算破产企业', effects: { bank_failures: 50, unemployment: 20, deflation: 15 } },
      { text: '开动印钞机，拯救银行', effects: { inflation: 10, moral_hazard: true, bankers_opinion: 50 } },
      { text: '国有化破产银行', effects: { socialist_opinion: 50, capitalist_opinion: -50 } },
    ],
    source: '1873年大恐慌',
  },
  {
    id: 'commune_paris',
    title: '巴黎公社',
    description: '无产阶级在巴黎建立了自己的政权！全世界的工人都在注视着...',
    category: 'historic',
    icon: '🔴',
    rarity: 'epic',
    weight: 5,
    cooldownDays: 36500,
    requirements: { country: 'FRA', year: 1871 },
    choices: [
      { text: '血腥镇压，血流成河', effects: { trade_union_power: -80, socialist_opinion: -100, prestige: -30 } },
      { text: '谈判让步，大赦天下', effects: { commune_survives: true, first_socialist_state: true } },
    ],
    source: '巴黎公社 1871',
  },
  {
    id: 'opium_war',
    title: '鸦片战争',
    description: '大英帝国的远征军来了！他们要求自由贸易，包括鸦片在内。',
    category: 'crisis',
    icon: '🚢',
    rarity: 'epic',
    weight: 5,
    cooldownDays: 36500,
    requirements: { country: 'CHN', year: 1840 },
    choices: [
      { text: '坚决禁烟，血战到底', effects: { war_with_britain: true, prestige: -50, modernization_force: true } },
      { text: '屈辱求和，五口通商', effects: { unequal_treaty: true, radicals: 40, western_influence: 30 } },
    ],
    source: '第一次鸦片战争 1840',
  },
  {
    id: 'luddite_riots',
    title: '卢德运动',
    description: '工人们认为机器夺走了他们的工作，开始捣毁纺织厂的新机器...',
    category: 'crisis',
    icon: '⚙️',
    rarity: 'uncommon',
    weight: 20,
    cooldownDays: 1000,
    requirements: { industrialization: '>=early', unemployment: '>=15' },
    choices: [
      { text: '派兵镇压，绞死暴民', effects: { militant_workers: 40, factories_safe: true, unrest: -20 } },
      { text: '谈判，禁止加班', effects: { worker_satisfaction: 30, productivity: -10 } },
      { text: '军队保护工厂，不理会诉求', effects: { productivity: 10, union_power: 30, unrest: 30 } },
    ],
    source: '卢德运动 1811-1816',
  },
  {
    id: 'charter_movement',
    title: '宪章运动',
    description: '工人阶级提出了六点政治要求：普选权、秘密投票、取消财产资格...',
    category: 'story',
    icon: '📜',
    rarity: 'rare',
    weight: 12,
    cooldownDays: 7300,
    requirements: { country: 'GBR', year: '1838-1857' },
    choices: [
      { text: '镇压，禁止集会', effects: { unrest: 40, radicals: 30 } },
      { text: '逐步让步，部分改革', effects: { middle_class_support: 30, radicals: -15, progressivism: 20 } },
      { text: '接受六点要求', effects: { universal_suffrage: true, socialist_opinion: 50, landowner_opinion: -50 } },
    ],
    source: '宪章运动',
  },
  {
    id: 'bank_run',
    title: '银行挤兑',
    description: '谣言四起！储户们疯狂涌向银行提取存款，银行现金即将耗尽...',
    category: 'crisis',
    icon: '🏦',
    rarity: 'uncommon',
    weight: 18,
    cooldownDays: 500,
    requirements: { finance_system: '>=early_banking' },
    choices: [
      { text: '暂停提款，银行放假', effects: { confidence: -30, panic_spreads: true } },
      { text: '中央银行紧急贷款', effects: { inflation: 5, moral_hazard: true, confidence: 20 } },
      { text: '让银行破产，市场出清', effects: { bank_failures: 15, deflation: 10, unemployment: 10 } },
    ],
  },
  {
    id: 'harvest_failure',
    title: '谷物歉收',
    description: '气候异常，今年的收成只有往年的一半。面包价格正在飞涨...',
    category: 'crisis',
    icon: '🌾',
    rarity: 'common',
    weight: 30,
    cooldownDays: 365,
    requirements: {},
    choices: [
      { text: '废除谷物法，自由进口', effects: { food_prices: -20, landowner_opinion: -40, industrialist_opinion: 30 } },
      { text: '维持关税，保护农民', effects: { food_prices: 30, urban_unrest: 25, landowner_opinion: 30 } },
      { text: '价格管制，打击囤积居奇', effects: { food_prices: -10, merchants_opinion: -30, shortages: true } },
    ],
  },
  {
    id: 'strike_general',
    title: '总罢工',
    description: '工会号召全国总罢工！街头挤满了示威的工人，工厂全部停工...',
    category: 'crisis',
    icon: '✊',
    rarity: 'rare',
    weight: 15,
    cooldownDays: 1500,
    requirements: { union_density: '>=30', inequality: '>=40' },
    choices: [
      { text: '武力镇压，逮捕领袖', effects: { strike_broken: true, union_power: -50, radicals: 80 } },
      { text: '接受条件，工资普涨15%', effects: { strike_ends: true, profit_margin: -15, worker_satisfaction: 50 } },
      { text: '戒严，军队接管', effects: { civil_war_risk: 0.3, authoritarian_power: 50 } },
    ],
  },
]

export const XIANXIA_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_breakthrough',
    name: '初窥门径',
    description: '成功突破到炼气第一层',
    icon: '🌬️',
    difficulty: 'easy',
    requirements: { realm: 'qi_refining_1' },
    rewards: { spiritStones: 100 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'foundation_success',
    name: '筑基大业',
    description: '筑基成功，真正踏上修真之路',
    icon: '🏔️',
    difficulty: 'medium',
    requirements: { realm: 'foundation_early' },
    rewards: { spiritStones: 1000 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'golden_core_legend',
    name: '金丹传说',
    description: '结成金丹，大道可期',
    icon: '💎',
    difficulty: 'hard',
    requirements: { realm: 'golden_core_early' },
    rewards: { spiritStones: 10000 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'immortal_ascended',
    name: '破碎虚空',
    description: '渡劫飞升，成仙永生',
    icon: '🌟',
    difficulty: 'impossible',
    requirements: { realm: 'true_immortal' },
    rewards: {},
    hidden: true,
    onceOnly: true,
  },
  {
    id: 'breakthrough_nodrug',
    name: '丹石无用',
    description: '不使用任何丹药筑基成功',
    icon: '💪',
    difficulty: 'hard',
    requirements: { realm: 'foundation_early', pills_used: 0 },
    rewards: { daoHeart: 50 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'alchemy_master',
    name: '丹道大宗师',
    description: '炼制出渡劫仙丹',
    icon: '🔥',
    difficulty: 'hard',
    requirements: { pills_made: '>=heavenly_tribulation_pill' },
    rewards: { alchemy: 100 },
    hidden: true,
    onceOnly: true,
  },
  {
    id: 'founder_of_sect',
    name: '开宗立派',
    description: '建立自己的宗门',
    icon: '🏛️',
    difficulty: 'hard',
    requirements: { sect_founded: true },
    rewards: { prestige: 500 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'dao_companion_max',
    name: '神仙眷侣',
    description: '与道侣好感度达到满级',
    icon: '💕',
    difficulty: 'medium',
    requirements: { companion_favor: 100 },
    rewards: { dual_cultivation: true },
    hidden: false,
    onceOnly: true,
  },
]

export const ECONOMY_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'industrial_revolution',
    name: '工业革命',
    description: '工厂雇佣工人超过农业人口',
    icon: '🏭',
    difficulty: 'medium',
    requirements: { factory_workers: '>farmers' },
    rewards: { prestige: 100 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'no_more_serfdom',
    name: '农奴解放者',
    description: '废除农奴制度',
    icon: '🔓',
    difficulty: 'medium',
    requirements: { law: 'emancipation' },
    rewards: { prestige: 150 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'universal_vote',
    name: '民主灯塔',
    description: '实现普选权',
    icon: '🗳️',
    difficulty: 'hard',
    requirements: { law: 'universal_suffrage' },
    rewards: { prestige: 200 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'welfare_state',
    name: '从摇篮到坟墓',
    description: '建立完整的福利国家制度',
    icon: '🏥',
    difficulty: 'hard',
    requirements: { law: 'welfare_state' },
    rewards: { prestige: 250 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'world_gdp_number_one',
    name: '世界工厂',
    description: 'GDP成为世界第一',
    icon: '🌍',
    difficulty: 'hard',
    requirements: { gdp_rank: 1 },
    rewards: { prestige: 500 },
    hidden: false,
    onceOnly: true,
  },
  {
    id: 'communism_achieved',
    name: '全世界无产者联合起来',
    description: '建立社会主义政权',
    icon: '☭',
    difficulty: 'hard',
    requirements: { ideology: 'socialist', revolution: true },
    rewards: {},
    hidden: true,
    onceOnly: true,
  },
  {
    id: 'reactionary_dream',
    name: '反动的胜利',
    description: '游戏结束时仍然维持绝对君主制和农奴制',
    icon: '👑',
    difficulty: 'medium',
    requirements: { law_monarchy_absolute: true, year: 1900 },
    rewards: {},
    hidden: true,
    onceOnly: true,
  },
  {
    id: 'blood_and_iron',
    name: '铁血宰相',
    description: '通过三次王朝战争统一国家',
    icon: '⚔️',
    difficulty: 'impossible',
    requirements: { country: 'GER', unification: true },
    rewards: { prestige: 1000 },
    hidden: true,
    onceOnly: true,
  },
]

export function rollForEvent<T extends GameEvent>(eventPool: T[], state: Record<string, any>): T | null {
  const eligibleEvents = eventPool.filter(event => {
    for (const [key, value] of Object.entries(event.requirements)) {
      const stateValue = state[key]
      if (stateValue === undefined) return false
      if (typeof value === 'string') {
        if (value.startsWith('>=')) return stateValue >= parseFloat(value.slice(2))
        if (value.startsWith('<=')) return stateValue <= parseFloat(value.slice(2))
        if (value.startsWith('>')) return stateValue > parseFloat(value.slice(1))
        if (value.startsWith('<')) return stateValue < parseFloat(value.slice(1))
        return stateValue === value
      }
      if (stateValue !== value) return false
    }
    return true
  })

  const totalWeight = eligibleEvents.reduce((sum, e) => sum + e.weight, 0)
  if (totalWeight === 0) return null

  let random = Math.random() * totalWeight
  for (const event of eligibleEvents) {
    random -= event.weight
    if (random <= 0) return event
  }

  return eligibleEvents[0] || null
}

export function checkAchievements<T extends Achievement>(achievements: T[], state: Record<string, any>): T[] {
  return achievements.filter(achievement => {
    for (const [key, value] of Object.entries(achievement.requirements)) {
      const stateValue = state[key]
      if (stateValue === undefined) return false
      if (typeof value === 'string') {
        if (value.startsWith('>=')) return stateValue >= parseFloat(value.slice(2))
        if (value.startsWith('<=')) return stateValue <= parseFloat(value.slice(2))
        if (value.startsWith('>')) return stateValue > parseFloat(value.slice(1))
        if (value.startsWith('<')) return stateValue < parseFloat(value.slice(1))
        return stateValue === value
      }
      if (stateValue !== value) return false
    }
    return true
  })
}
