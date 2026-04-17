import type { CultivationState, Technique, Dao, InventoryItem } from './types'
import { REALM_CONFIGS } from './realm-system'

export const SPIRIT_ROOTS: Record<string, { name: string; elements: string[]; bonus: number }> = {
  'five_elem': { name: '五灵根', elements: ['metal', 'wood', 'water', 'fire', 'earth'], bonus: 0.5 },
  'four_elem': { name: '四灵根', elements: ['metal', 'wood', 'water', 'fire'], bonus: 0.7 },
  'three_elem': { name: '三灵根', elements: ['metal', 'wood', 'water'], bonus: 1.0 },
  'dual_elem': { name: '双灵根', elements: ['water', 'fire'], bonus: 1.5 },
  'single_elem': { name: '天灵根', elements: ['fire'], bonus: 3.0 },
  'variant_thunder': { name: '雷灵根', elements: ['thunder'], bonus: 4.0 },
  'variant_ice': { name: '冰灵根', elements: ['ice'], bonus: 3.5 },
  'chaos': { name: '混沌灵根', elements: ['spatial', 'time'], bonus: 10.0 },
}

export const TECHNIQUES: Technique[] = [
  {
    id: 'basic_breathing',
    name: '基础吐纳法',
    rank: 'huang',
    type: 'cultivation',
    elements: [],
    description: '最基础的修炼法门，普及于整个修仙界',
    mastery: 0,
    max_mastery: 100,
    base_cultivation_speed: 1.0,
    effects: { spirit_regen: 1 },
    breakthrough_requirements: {},
    incompatibilities: []
  },
  {
    id: 'qi_refining_standard',
    name: '炼气诀',
    rank: 'xuan',
    type: 'cultivation',
    elements: [],
    description: '正统炼气法门，中正平和',
    mastery: 0,
    max_mastery: 200,
    base_cultivation_speed: 1.3,
    effects: { spirit_regen: 1.3, combat_power: 5 },
    breakthrough_requirements: { realm: 'qi_refining_3' },
    incompatibilities: ['demonic_art']
  },
  {
    id: 'yang_fire_art',
    name: '离火真经',
    rank: 'di',
    type: 'cultivation',
    elements: ['fire'],
    description: '至阳至刚的火属性功法，威力强大',
    mastery: 0,
    max_mastery: 500,
    base_cultivation_speed: 1.8,
    effects: { spirit_regen: 1.5, combat_power: 20, fire_damage: 50 },
    breakthrough_requirements: { realm: 'foundation_early', elements: ['fire'] },
    incompatibilities: ['ice_channel_art']
  },
  {
    id: 'ice_channel_art',
    name: '寒冰心法',
    rank: 'di',
    type: 'cultivation',
    elements: ['ice'],
    description: '至阴至寒的冰属性功法',
    mastery: 0,
    max_mastery: 500,
    base_cultivation_speed: 1.7,
    effects: { spirit_regen: 1.6, combat_power: 18, ice_damage: 50 },
    breakthrough_requirements: { realm: 'foundation_early', elements: ['ice'] },
    incompatibilities: ['yang_fire_art']
  },
  {
    id: 'thunder_sword_art',
    name: '雷霆剑诀',
    rank: 'tian',
    type: 'attack',
    elements: ['thunder'],
    description: '以雷淬剑，一剑破万法',
    mastery: 0,
    max_mastery: 1000,
    base_cultivation_speed: 0,
    effects: { combat_power: 100, thunder_damage: 200, attack_speed: 1.5 },
    breakthrough_requirements: { realm: 'golden_core_early', elements: ['thunder'] },
    incompatibilities: []
  },
  {
    id: 'sovereign_qi_art',
    name: '皇极霸体诀',
    rank: 'spirit',
    type: 'cultivation',
    elements: ['metal', 'earth'],
    description: '上古传承的至尊功法，万法不侵',
    mastery: 0,
    max_mastery: 5000,
    base_cultivation_speed: 3.0,
    effects: { spirit_regen: 3, combat_power: 500, body_toughness: 500 },
    breakthrough_requirements: { realm: 'nascent_soul_early' },
    incompatibilities: []
  },
  {
    id: 'void_manipulation',
    name: '虚空大道',
    rank: 'dao',
    type: 'divine',
    elements: ['spatial'],
    description: '掌控空间，咫尺天涯',
    mastery: 0,
    max_mastery: 20000,
    base_cultivation_speed: 5.0,
    effects: { combat_power: 5000, divine_sense: 1000 },
    breakthrough_requirements: { realm: 'void_refining_early' },
    incompatibilities: []
  }
]

export const DAOS: Dao[] = [
  {
    id: 'dao_fire',
    name: '火之大道',
    description: '掌控火焰，焚尽万物',
    depth: 0,
    max_depth: 100,
    insights: ['火焰初悟', '焚天烈焰', '寂灭之火', '神火本源'],
    abilities: ['fire_immunity', 'flame_summon', 'sun_fire'],
    relatedTechniques: ['yang_fire_art']
  },
  {
    id: 'dao_water',
    name: '水之大道',
    description: '上善若水，利万物而不争',
    depth: 0,
    max_depth: 100,
    insights: ['滴水穿石', '百川归海', '万载玄冰', '时空之水'],
    abilities: ['water_breathing', 'healing_water', 'freeze'],
    relatedTechniques: ['ice_channel_art']
  },
  {
    id: 'dao_sword',
    name: '剑之道',
    description: '一剑破万法，大道至简',
    depth: 0,
    max_depth: 100,
    insights: ['手中有剑', '心中有剑', '人剑合一', '无剑胜有剑'],
    abilities: ['sword_domain', 'ten_thousand_swords', 'sword_intent'],
    relatedTechniques: ['thunder_sword_art']
  },
  {
    id: 'dao_time',
    name: '时间大道',
    description: '光阴似箭，日月如梭',
    depth: 0,
    max_depth: 200,
    insights: ['刹那永恒', '岁月如梭', '时间加速', '时光倒流'],
    abilities: ['time_stop', 'age_reversal', 'foresight'],
    relatedTechniques: []
  },
  {
    id: 'dao_space',
    name: '空间大道',
    description: '须弥芥子，咫尺天涯',
    depth: 0,
    max_depth: 200,
    insights: ['空间折叠', '咫尺天涯', '空间破碎', '虚空造物'],
    abilities: ['teleport', 'pocket_dimension', 'void_storage'],
    relatedTechniques: ['void_manipulation']
  },
  {
    id: 'dao_life',
    name: '生命大道',
    description: '生生不息，造化无穷',
    depth: 0,
    max_depth: 150,
    insights: ['枯木逢春', '生生不息', '万物有灵', '创造生命'],
    abilities: ['instant_heal', 'resurrection', 'life_creation'],
    relatedTechniques: []
  },
  {
    id: 'dao_kill',
    name: '杀戮大道',
    description: '杀一是为罪，屠万是为雄',
    depth: 0,
    max_depth: 150,
    insights: ['血染千里', '尸山血海', '杀心通明', '万劫不复'],
    abilities: ['killing_domain', 'blood_power', 'death_aura'],
    relatedTechniques: []
  }
]

export const STARTING_ITEMS: InventoryItem[] = [
  {
    id: 'low_spirit_stone_10',
    name: '低阶灵石 x10',
    type: 'spirit_stone',
    quality: 'low',
    quantity: 10,
    description: '蕴含微薄灵气的晶石，修炼的基础资源',
    createdAt: 0
  },
  {
    id: 'basic_clothes',
    name: '粗布道袍',
    type: 'armor',
    quality: 'mortal',
    quantity: 1,
    description: '普通的修道者服饰，聊胜于无',
    createdAt: 0
  },
  {
    id: 'rusty_sword',
    name: '生锈铁剑',
    type: 'weapon',
    quality: 'mortal',
    quantity: 1,
    description: '一把普通的铁剑，已经生锈',
    createdAt: 0
  }
]

export function createInitialState(characterName: string): CultivationState {
  return {
    characterId: `player_${Date.now()}`,
    characterName,

    day: 1,
    tick: 0,
    gameSpeed: 1,
    paused: true,

    cultivation: {
      realm: 'mortal',
      sub_realm: 0,
      progress: 0,
      bottleneck: false,
      bottleneck_difficulty: 0,
      breakthrough_attempts: 0,
      last_breakthrough_day: 0,
      tribulation_cooldown: 0
    },

    attributes: {
      spirit_root: 50,
      spirit_root_elements: ['metal', 'wood', 'water', 'fire', 'earth'],
      bone_quality: 50,
      comprehension: 50,
      mindstate: 50,
      luck: 50,
      charisma: 50,
      combat_power: 1,
      max_spirit: 10,
      current_spirit: 10,
      spirit_regen: 0.1,
      soul_power: 1,
      divine_sense: 1,
      body_toughness: 5,
      dao_comprehension: {}
    },

    vitals: {
      age: 16,
      lifespan: 80,
      remaining_lifespan: 64,
      health: 100,
      max_health: 100,
      poison_resistance: 0,
      curse_resistance: 0,
      mood: 'calm',
      enlightenment_bonus: 0,
      karmic_value: 0,
      sin_value: 0,
      merit_value: 0
    },

    inventory: [...STARTING_ITEMS],
    gold: 100,
    spiritStones: {
      low: 10,
      mid: 0,
      high: 0,
      top: 0
    },

    techniques: [TECHNIQUES[0]],
    activeTechniqueId: 'basic_breathing',
    daos: [],

    knownNPCs: {},
    factionRelations: {},
    currentFaction: undefined,
    factionRank: undefined,

    quests: [],
    activeQuestId: undefined,

    events: [],
    eventCooldowns: {},
    activeEvent: undefined,

    currentTribulation: undefined,
    tribulationHistory: [],

    alchemySkill: 1,
    alchemyLevel: 1,
    alchemyExperience: 0,
    knownRecipes: ['qi_pill'],

    refiningSkill: 1,
    refiningLevel: 1,
    refiningExperience: 0,
    knownRefiningRecipes: ['spirit_sword'],

    exploredRealms: ['mortal_village'],
    currentLocation: 'mortal_village',
    inSecretRealm: undefined,
    secretRealmProgress: 0,

    ownedProperties: [],
    caveId: undefined,

    stats: {
      daysCultivated: 0,
      breakthroughs: 0,
      pillsCreated: 0,
      artifactsRefined: 0,
      enemiesDefeated: 0,
      questsCompleted: 0,
      eventsExperienced: 0,
      tribulationsPassed: 0,
      totalKarma: 0,
      daoInsightsGained: 0
    },

    history: [{
      day: 1,
      type: 'birth',
      message: `${characterName}踏上了修仙之路...`,
      importance: 'legendary'
    }],

    buffs: [],

    settings: {
      difficulty: 'normal',
      autoMode: false,
      eventNotifications: true,
      tribulationWarnings: true
    },

    achievements: [],
    milestones: {}
  }
}

export const CHARACTER_BACKGROUNDS = [
  {
    id: 'village_hero',
    name: '少年侠士',
    description: '山村少年，救了受伤的修仙者，得到入门心法',
    bonuses: { combat_power: 5, luck: 10, karma: 50 }
  },
  {
    id: 'scholar',
    name: '寒门书生',
    description: '十年寒窗，无意中读得道藏残卷，开了灵智',
    bonuses: { comprehension: 15, mindstate: 10, charisma: 5 }
  },
  {
    id: 'pharmacy_child',
    name: '药铺学徒',
    description: '自幼在药铺长大，遍识百草，对药性了如指掌',
    bonuses: { alchemySkill: 5, spirit_root: 10, poison_resistance: 20 }
  },
  {
    id: 'blacksmith_son',
    name: '铁匠之子',
    description: '天生神力，打铁二十载，锤炼出强横体魄',
    bonuses: { refiningSkill: 5, body_toughness: 20, bone_quality: 10 }
  },
  {
    id: 'orphan',
    name: '流浪孤儿',
    description: '孤苦伶仃，受尽世间冷暖，但也练就坚韧道心',
    bonuses: { mindstate: 20, soul_power: 10, survival: 30 }
  },
  {
    id: 'noble',
    name: '世家子弟',
    description: '出身名门，自幼资源充足，根骨不凡',
    bonuses: { spirit_root: 20, gold: 500, low_spirit_stones: 100 }
  },
  {
    id: 'demon_heritage',
    name: '魔族遗脉',
    description: '身具魔族血脉，修行神速但天劫威力倍增',
    bonuses: { combat_power: 30, spirit_regen: 0.5, tribulation_difficulty: 50 }
  },
  {
    id: 'reincarnated',
    name: '转世仙人',
    description: '大能转世，宿慧未消，悟性通天',
    bonuses: { comprehension: 50, dao_comprehension: 10, all_daos: 0.5 }
  }
]
