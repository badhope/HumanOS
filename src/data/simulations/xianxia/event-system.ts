import type { CultivationState, CultivationEvent } from './types'
import { compareRealm } from './realm-system'

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function chance(probability: number): boolean {
  return Math.random() < probability
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : (min + max) / 2))
}

export const CULTIVATION_EVENTS: CultivationEvent[] = [
  {
    id: 'mysterious_old_man',
    name: '神秘老者',
    type: 'opportunity',
    description: '一位拄着拐杖的神秘老者出现在你面前，似乎想对你说些什么...',
    choices: [
      {
        id: 'listen',
        description: '恭敬地倾听老者的教诲',
        successRate: 0.9,
        requiredStats: { charisma: 30 },
        successEffects: { comprehension: 10, technique: '神秘心法' },
        failEffects: {},
        specialText: '老者满意地点点头，传授了你一些修炼心得'
      },
      {
        id: 'ignore',
        description: '不理会，继续修炼',
        successRate: 1,
        successEffects: {},
        failEffects: { luck: -5 },
        specialText: '老者叹息一声，消失不见'
      },
      {
        id: 'attack',
        description: '试图抢劫老者',
        successRate: 0.05,
        successEffects: { gold: 1000, spiritStones_low: 50 },
        failEffects: { health: -50, karmic_value: -100 },
        specialText: '你被老者一指弹飞，身受重伤'
      }
    ],
    rarity: 'rare',
    min_realm: 'qi_refining_1',
    cooldown: 100,
    conditions: {},
    oneTime: false,
    triggered: false
  },
  {
    id: 'herb_discovery',
    name: '灵药奇遇',
    type: 'opportunity',
    description: '你在山间修炼时，偶然发现一株散发着异香的灵草！',
    choices: [
      {
        id: 'careful',
        description: '小心翼翼地采挖，避免损伤药性',
        successRate: 0.8,
        requiredStats: { comprehension: 40 },
        successEffects: { item: '千年灵芝 x2', alchemyExperience: 50 },
        failEffects: { item: '灵草残骸' },
        specialText: '你成功采集了完整的灵药！'
      },
      {
        id: 'quick',
        description: '不管那么多，直接挖了再说',
        successRate: 0.4,
        successEffects: { item: '千年灵芝' },
        failEffects: {},
        specialText: '灵草药性流失了大半...'
      }
    ],
    rarity: 'uncommon',
    min_realm: 'qi_refining_1',
    cooldown: 50,
    conditions: { location: 'mountains' },
    oneTime: false,
    triggered: false
  },
  {
    id: 'demonic_cultivator',
    name: '魔道修士',
    type: 'crisis',
    description: '一股邪恶的气息逼近！一名血修发现了你的踪迹！',
    choices: [
      {
        id: 'fight',
        description: '拔剑迎战',
        successRate: 0.5,
        requiredStats: { combat_power: 50 },
        successEffects: { loot: '储物袋', merit_value: 50 },
        failEffects: { health: -80, spiritStones_low: -20 },
        specialText: '激战之后你险胜！'
      },
      {
        id: 'flee',
        description: '立即逃跑',
        successRate: 0.7,
        requiredStats: {},
        successEffects: {},
        failEffects: { health: -30, inventory: '随机物品丢失' },
        specialText: '慌不择路，逃出生天'
      },
      {
        id: 'join',
        description: '表示愿意归顺魔道',
        successRate: 0.9,
        successEffects: { technique: '血炼大法', sin_value: 100 },
        failEffects: {},
        specialText: '魔修桀桀怪笑，传给你一门邪功'
      }
    ],
    rarity: 'uncommon',
    min_realm: 'qi_refining_5',
    cooldown: 80,
    conditions: { karmic_value: 0 },
    oneTime: false,
    triggered: false
  },
  {
    id: 'enlightenment',
    name: '顿悟',
    type: 'enlightenment',
    description: '道心通明，福至心灵！你进入了奇妙的顿悟状态！',
    choices: [
      {
        id: 'cultivate',
        description: '进入深层修炼',
        successRate: 1,
        successEffects: {
          progress: 50,
          comprehension: 5,
          mood: 'enlightened',
          enlightenment_bonus: 100
        },
        failEffects: {},
        specialText: '修为大进！'
      }
    ],
    rarity: 'rare',
    min_realm: 'qi_refining_3',
    cooldown: 365,
    conditions: { mindstate: 60 },
    oneTime: false,
    triggered: false
  },
  {
    id: 'sect_recruitment',
    name: '门派招募',
    type: 'opportunity',
    description: '修仙门派前来招收弟子，测灵石在你身上发出耀眼光芒！',
    choices: [
      {
        id: 'join',
        description: '拜入门下，成为外门弟子',
        successRate: 0.95,
        requiredStats: { spirit_root: 30 },
        successEffects: {
          faction: '青云门',
          factionRank: '外门弟子',
          spiritStones_monthly: 10
        },
        failEffects: {},
        specialText: '你正式成为修仙门派的一员！'
      },
      {
        id: 'decline',
        description: '婉拒邀请，继续散修之路',
        successRate: 1,
        successEffects: { luck: 5, freedom: true },
        failEffects: {},
        specialText: '长老遗憾地摇摇头，赠了你一本基础功法便离开了'
      }
    ],
    rarity: 'uncommon',
    min_realm: 'qi_refining_2',
    cooldown: 180,
    conditions: { age: 25 },
    oneTime: true,
    triggered: false
  },
  {
    id: 'inner_demon',
    name: '心魔滋生',
    type: 'crisis',
    description: '修炼出了岔子！心魔入侵，眼前出现无数幻境...',
    choices: [
      {
        id: 'resist',
        description: '坚守道心，对抗心魔',
        successRate: 0.6,
        requiredStats: { mindstate: 50 },
        successEffects: { mindstate: 10, soul_power: 15 },
        failEffects: { health: -50, mood: 'depressed' },
        specialText: '道心愈发坚定！破而后立！'
      },
      {
        id: 'embrace',
        description: '接受心魔，我即是魔',
        successRate: 0.8,
        successEffects: { combat_power: 20, sin_value: 50, dao: '杀戮之道' },
        failEffects: {},
        specialText: '你走上了另一条道路...'
      },
      {
        id: 'meditation',
        description: '停下修炼，静心打坐',
        successRate: 0.9,
        successEffects: {},
        failEffects: {},
        specialText: '心魔渐渐平息了...'
      }
    ],
    rarity: 'uncommon',
    min_realm: 'foundation_early',
    cooldown: 200,
    conditions: { bottleneck: true },
    oneTime: false,
    triggered: false
  },
  {
    id: 'ancient_ruins',
    name: '上古遗迹',
    type: 'opportunity',
    description: '你无意中发现了一处上古修士的坐化之地！',
    choices: [
      {
        id: 'enter',
        description: '深入探索遗迹',
        successRate: 0.5,
        requiredStats: { divine_sense: 50, combat_power: 100 },
        successEffects: {
          loot: '上古传承',
          technique: 'random_heaven_rank',
          dao_depth: 5
        },
        failEffects: {
          health: -100,
          curse: '上古诅咒'
        },
        specialText: '你获得了上古大能的传承！'
      },
      {
        id: 'report',
        description: '将消息上报宗门',
        successRate: 1,
        successEffects: { contribution: 500, faction_reputation: 20 },
        failEffects: {},
        specialText: '宗门对你大加赞赏！'
      },
      {
        id: 'leave',
        description: '此地太危险，速速离开',
        successRate: 1,
        successEffects: { luck: 3 },
        failEffects: {},
        specialText: '你明智地选择了离开'
      }
    ],
    rarity: 'legendary',
    min_realm: 'foundation_late',
    cooldown: 730,
    conditions: { luck: 60 },
    oneTime: true,
    triggered: false
  },
  {
    id: 'dragon_gate',
    name: '龙门开启',
    type: 'opportunity',
    description: '天地异象！传说中的龙门再次开启！',
    choices: [
      {
        id: 'leap',
        description: '鱼跃龙门！',
        successRate: 0.1,
        requiredStats: { luck: 80, combat_power: 500 },
        successEffects: {
          realm_breakthrough: true,
          spirit_root: 30,
          title: '跃龙门者'
        },
        failEffects: {
          health: -200,
          lifespan: -100
        },
        specialText: '化龙！！！你的生命层次得到升华！'
      }
    ],
    rarity: 'mythic',
    min_realm: 'golden_core_early',
    cooldown: 3650,
    conditions: {},
    oneTime: true,
    triggered: false
  },
  {
    id: 'immortal_encounter',
    name: '谪仙临凡',
    type: 'encounter',
    description: '天上传来仙音，一位真正的仙人降临人间！',
    choices: [
      {
        id: 'kneel',
        description: '跪伏在地，乞求指点',
        successRate: 0.3,
        requiredStats: { karmic_value: 100 },
        successEffects: {
          dao_insight: 'random',
          immortal_boon: true,
          lifespan: 500
        },
        failEffects: {},
        specialText: '仙人赞许，为你讲道三日'
      },
      {
        id: 'observe',
        description: '默默观察，感悟仙人气息',
        successRate: 0.9,
        successEffects: { dao_depth: 3 },
        failEffects: {},
        specialText: '你若有所悟...'
      }
    ],
    rarity: 'mythic',
    min_realm: 'nascent_soul_early',
    cooldown: 1825,
    conditions: { merit_value: 200 },
    oneTime: true,
    triggered: false
  },
  {
    id: 'love_at_first_sight',
    name: '仙缘',
    type: 'encounter',
    description: '一位风姿绰约的女修/俊朗非凡的男修与你擦肩而过，你们对视了一眼...',
    choices: [
      {
        id: 'approach',
        description: '主动搭话',
        successRate: 0.6,
        requiredStats: { charisma: 50 },
        successEffects: {
          relationship: '道侣候选',
          quest: '双修之旅'
        },
        failEffects: { mood: 'depressed' },
        specialText: '相谈甚欢，互留了传讯符'
      },
      {
        id: 'nod',
        description: '点头示意，擦肩而过',
        successRate: 1,
        successEffects: { karma: 1 },
        failEffects: {},
        specialText: '或许只是人生中的过客吧...'
      }
    ],
    rarity: 'rare',
    min_realm: 'foundation_early',
    cooldown: 100,
    conditions: { mood: 'calm' },
    oneTime: false,
    triggered: false
  }
]

export function checkDailyEvent(state: CultivationState): CultivationEvent | null {
  if (state.activeEvent) return null

  let eventChance = 0.03

  eventChance *= 1 + state.attributes.luck / 200

  if (state.cultivation.bottleneck) eventChance *= 1.5

  if (state.inSecretRealm) eventChance *= 2

  if (state.vitals.mood === 'enlightened') eventChance *= 1.5

  for (const [eventId, cd] of Object.entries(state.eventCooldowns)) {
    if (state.day < cd) continue
    delete state.eventCooldowns[eventId]
  }

  if (!chance(eventChance)) return null

  const eligibleEvents = CULTIVATION_EVENTS.filter(event => {
    if (event.oneTime && state.events.some(e => e.id === event.id)) return false
    if (state.eventCooldowns[event.id]) return false
    if (compareRealm(state.cultivation.realm, event.min_realm) < 0) return false

    if (event.conditions.bottleneck && !state.cultivation.bottleneck) return false
    if (event.conditions.mindstate && state.attributes.mindstate < event.conditions.mindstate) return false
    if (event.conditions.luck && state.attributes.luck < event.conditions.luck) return false
    if (event.conditions.merit_value && state.vitals.merit_value < event.conditions.merit_value) return false
    if (event.conditions.age && state.vitals.age > event.conditions.age) return false

    return true
  })

  if (eligibleEvents.length === 0) return null

  const rarityWeights: Record<string, number> = {
    common: 100,
    uncommon: 50,
    rare: 20,
    legendary: 5,
    mythic: 1
  }

  let totalWeight = 0
  const weightedEvents = eligibleEvents.map(e => {
    const weight = rarityWeights[e.rarity] || 10
    totalWeight += weight
    return { event: e, weight }
  })

  let roll = random(0, totalWeight)
  for (const we of weightedEvents) {
    roll -= we.weight
    if (roll <= 0) {
      return { ...we.event }
    }
  }

  return { ...eligibleEvents[0] }
}

export function resolveEventChoice(
  state: CultivationState,
  event: CultivationEvent,
  choiceId: string
): {
  newState: CultivationState
  success: boolean
  message: string
} {
  let newState = { ...state }
  const choice = event.choices.find(c => c.id === choiceId)

  if (!choice) {
    return { newState, success: false, message: '无效的选择' }
  }

  newState.stats.eventsExperienced += 1
  newState.events.push({ ...event, triggered: true })
  newState.eventCooldowns[event.id] = state.day + event.cooldown

  if (choice.requiredStats) {
    for (const [stat, value] of Object.entries(choice.requiredStats)) {
      if ((newState.attributes as any)[stat] < value) {
        return {
          newState,
          success: false,
          message: `${stat}属性不足，需要${value}点`
        }
      }
    }
  }

  const success = chance(choice.successRate)

  if (success) {
    applyEffects(newState, choice.successEffects)
    return {
      newState,
      success: true,
      message: choice.specialText || '成功了！'
    }
  } else {
    applyEffects(newState, choice.failEffects)
    return {
      newState,
      success: false,
      message: choice.specialText || '失败了...'
    }
  }
}

function applyEffects(state: CultivationState, effects: Record<string, any>) {
  for (const [key, value] of Object.entries(effects)) {
    switch (key) {
      case 'comprehension':
      case 'mindstate':
      case 'luck':
      case 'charisma':
      case 'combat_power':
      case 'soul_power':
      case 'divine_sense':
      case 'body_toughness':
        state.attributes[key] = clamp(state.attributes[key] + value, 0, 1000)
        break
      case 'health':
        state.vitals.health = clamp(state.vitals.health + value, 0, state.vitals.max_health)
        break
      case 'lifespan':
        state.vitals.lifespan = Math.max(1, state.vitals.lifespan + value)
        break
      case 'karmic_value':
        state.vitals.karmic_value = clamp(state.vitals.karmic_value + value, -1000, 1000)
        break
      case 'sin_value':
        state.vitals.sin_value += Math.abs(value)
        break
      case 'merit_value':
        state.vitals.merit_value += Math.abs(value)
        break
      case 'mood':
        state.vitals.mood = value
        break
      case 'enlightenment_bonus':
        state.vitals.enlightenment_bonus = value
        break
      case 'progress':
        state.cultivation.progress += value
        break
      case 'gold':
        state.gold += Math.abs(value)
        break
      case 'dao_depth':
        if (state.daos.length > 0) {
          state.daos[0].depth = Math.min(state.daos[0].depth + value, state.daos[0].max_depth)
        }
        break
      case 'alchemyExperience':
        state.alchemyExperience += value
        break
    }
  }
}

export const NPC_TEMPLATES = [
  {
    id: 'senior_brother',
    name: '大师兄',
    aiProfile: 'righteous',
    personality: ['正直', '严厉', '护短'],
    factionRole: '核心弟子',
    baseRealm: 'foundation_perfect',
    dialogue: ['师弟，修炼切不可懈怠！', '宗门的荣誉重于一切！', '有问题尽管来找我。']
  },
  {
    id: 'elder_yao',
    name: '药长老',
    aiProfile: 'neutral',
    personality: ['温和', '嗜丹如命', '健忘'],
    factionRole: '长老',
    baseRealm: 'golden_core_late',
    dialogue: ['炼丹，最重要的是心性...', '这株药草年份不够啊', '你刚才说什么来着？']
  },
  {
    id: 'mysterious_merchant',
    name: '神秘商人',
    aiProfile: 'greedy',
    personality: ['狡诈', '消息灵通', '唯利是图'],
    factionRole: '客卿',
    baseRealm: 'foundation_late',
    dialogue: ['客官，好东西要看看吗？', '价格好商量嘛...', '这可是亏本买卖啊！']
  },
  {
    id: 'saintess',
    name: '圣女',
    aiProfile: 'altruistic',
    personality: ['慈悲', '坚定', '普渡众生'],
    factionRole: '圣女',
    baseRealm: 'golden_core_early',
    dialogue: ['施主，苦海无边回头是岸', '愿大道保佑你', '放下屠刀立地成佛']
  },
  {
    id: 'demon_lord',
    name: '血魔老祖',
    aiProfile: 'evil',
    personality: ['残忍', '狡猾', '嗜血'],
    factionRole: '魔尊',
    baseRealm: 'nascent_soul_early',
    dialogue: ['桀桀桀...新鲜的血肉！', '正道？不过是笑话罢了', '顺我者昌逆我者亡！']
  },
  {
    id: 'hermit',
    name: '隐士',
    aiProfile: 'neutral',
    personality: ['淡泊', '智慧', '神秘'],
    factionRole: '客卿',
    baseRealm: 'nascent_soul_perfect',
    dialogue: ['道可道非常道', '一切随缘吧', '你的命数很有趣...']
  }
]
