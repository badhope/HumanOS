export interface GamePhase {
  id: string
  name: string
  description: string
  unlockRealm: string
  mainQuests: string[]
  sideQuests: string[]
  events: string[]
  featuresUnlocked: string[]
}

export interface Origin {
  id: string
  name: string
  icon: string
  description: string
  backstory: string
  startingBonus: Record<string, number | string | boolean>
  startingMalus: Record<string, number | string | boolean>
  exclusiveQuests: string[]
  difficulty: 'easy' | 'normal' | 'hard' | 'nightmare'
}

export interface Ending {
  id: string
  name: string
  icon: string
  category: 'good' | 'bad' | 'true' | 'secret'
  description: string
  epilogue: string
  requirements: Record<string, number | string | boolean>
  karmaRequired: number
}

export interface MainQuest {
  id: string
  name: string
  description: string
  phase: number
  objectives: {
    id: string
    description: string
    completed: boolean
    requirements: Record<string, number | string | boolean>
  }[]
  rewards: Record<string, number>
  nextQuest: string
  choices: {
    text: string
    effects: Record<string, number | string | boolean>
    nextBranch: string
  }[]
}

export const CULTIVATION_ORIGINS: Origin[] = [
  {
    id: 'sect_disciple',
    name: '宗门弟子',
    icon: '🏛️',
    description: '名门正派的内门弟子，根正苗红。',
    backstory: '你是青云门的内门弟子，师父是宗门长老，师兄师姐对你关怀备至。',
    startingBonus: {
      spiritStones: 500,
      realm: 'qi_refining_3',
      technique: 'purple_cloud',
      sectFavor: 30,
      pills: 20,
    },
    startingMalus: { righteous: 20, cannotGoDemonic: true, sectDuties: true },
    exclusiveQuests: ['sect_elder_expectation', 'inner_sector_competition'],
    difficulty: 'easy',
  },
  {
    id: 'rogue_cultivator',
    name: '散修',
    icon: '🏃',
    description: '无门无派，逍遥自在但资源匮乏。',
    backstory: '你是一介散修，偶然捡到一本残破功法踏上仙途。一切都要靠自己。',
    startingBonus: {
      freedom: true,
      combatExp: 20,
      anySectJoinable: true,
    },
    startingMalus: {
      spiritStones: 50,
      realm: 'qi_refining_1',
      technique: 'basic_qi',
      pills: 2,
    },
    exclusiveQuests: ['rogue_luck', 'ancient_ruin_discovery'],
    difficulty: 'normal',
  },
  {
    id: 'aristocrat',
    name: '世家子弟',
    icon: '👑',
    description: '修真世家出身，资源无限但束缚也多。',
    backstory: '你是千年修真家族的嫡子，背负着家族兴盛的使命。',
    startingBonus: {
      spiritStones: 2000,
      realm: 'qi_refining_5',
      technique: 'family_heritage',
      artifact: 'heirloom',
      connections: 50,
    },
    startingMalus: {
      familyObligation: true,
      arrangedMarriage: true,
      enemyFamily: true,
    },
    exclusiveQuests: ['family_honor', 'marriage_alliance'],
    difficulty: 'easy',
  },
  {
    id: 'trash',
    name: '废柴流',
    icon: '💀',
    description: '灵根尽废，人人欺凌。但你有一个秘密...',
    backstory: '你是宗门里人人嘲笑的废柴，灵根残破不堪。但是你胸口的玉佩里，住着一个活了万年的老鬼师父。',
    startingBonus: {
      heavenlyJade: true,
      ancientTeacher: true,
      futureProtagonist: true,
      plotArmor: true,
    },
    startingMalus: {
      spiritStones: 10,
      realm: 'mortal',
      spiritualRoot: -50,
      bullies: true,
      sectFavor: -30,
    },
    exclusiveQuests: ['jade_reveal', 'face_slapping_moment'],
    difficulty: 'nightmare',
  },
  {
    id: 'demonic_seed',
    name: '魔教圣子',
    icon: '😈',
    description: '魔道巨擘的传人，开局就是地狱难度。',
    backstory: '你是鬼王宗少主，正道人人得而诛之。魔道内部也人人想取你而代之。',
    startingBonus: {
      spiritStones: 3000,
      realm: 'foundation_early',
      technique: 'demon_seal',
      demonicPower: 50,
      artifacts: 3,
    },
    startingMalus: {
      righteous: -50,
      wantedByOrthodox: true,
      internalBetrayal: true,
      innerDemon: 50,
    },
    exclusiveQuests: ['demonic_succession', 'righteous_hunt'],
    difficulty: 'hard',
  },
]

export const CULTIVATION_PHASES: GamePhase[] = [
  {
    id: 'phase1',
    name: '初入仙途',
    description: '炼气期：打牢根基的关键时期',
    unlockRealm: 'mortal',
    mainQuests: ['reach_qi_3', 'get_technique', 'first_breakthrough'],
    sideQuests: ['gather_herbs', 'sect_duties_easy'],
    events: ['mysterious_old_man', 'friendly_duel', 'herb_discovery'],
    featuresUnlocked: ['basic_meditation', 'basic_alchemy'],
  },
  {
    id: 'phase2',
    name: '筑基大业',
    description: '筑基：真正踏上修真之路',
    unlockRealm: 'qi_refining_7',
    mainQuests: ['obtain_foundation_pill', 'choose_technique_path', 'foundation_attempt'],
    sideQuests: ['sect_competition', 'dao_companion_meet'],
    events: ['sect_conspiracy', 'dao_companion_meet', 'breakthrough_failure'],
    featuresUnlocked: ['advanced_alchemy', 'sect_missions', 'combat_system'],
  },
  {
    id: 'phase3',
    name: '金丹大道',
    description: '金丹：传说中的境界',
    unlockRealm: 'foundation_perfect',
    mainQuests: ['prepare_golden_core', 'overcome_inner_demon', 'tribulation_survive'],
    sideQuests: ['become_elder', 'take_disciple', 'life_bound_artifact'],
    events: ['ancient_ruins', 'demonic_tribulation', 'righteous_dilemma'],
    featuresUnlocked: ['artifact_refining', 'sect_politics', 'take_disciples'],
  },
  {
    id: 'phase4',
    name: '元婴老祖',
    description: '元婴：宗门的支柱',
    unlockRealm: 'golden_core_perfect',
    mainQuests: ['nascent_soul_breakthrough', 'sect_grand_elder', 'found_sect_decision'],
    sideQuests: ['empire_court_visit', 'cross_continent_adventure'],
    events: ['sect_war', 'demon_invasion', 'immortal_realm_visitor'],
    featuresUnlocked: ['found_sect', 'diplomacy', 'large_scale_combat'],
  },
  {
    id: 'phase5',
    name: '渡劫飞升',
    description: '大乘期：凡人界的巅峰',
    unlockRealm: 'dao_integration_early',
    mainQuests: ['prepare_ascension', 'worldly_affairs_end', 'final_tribulation'],
    sideQuests: ['leave_legacy', 'choose_successor'],
    events: ['heavenly_tribulation', 'demonic_god_battle', 'immortal_invitation'],
    featuresUnlocked: ['world_laws', 'ascension'],
  },
]

export const CULTIVATION_ENDINGS: Ending[] = [
  {
    id: 'true_immortal',
    name: '破碎虚空',
    icon: '🌟',
    category: 'true',
    description: '渡劫成功，飞升仙界',
    epilogue: `九九天劫过后，天门大开。
你回首望了一眼生活了万年的凡界，
有过爱恨，有过情仇，有过辉煌，有过低谷。
但这一切，都只是过眼云烟。
一步踏入天门，你，终成大道。

【真结局：这只是开始】`,
    requirements: { realm: 'true_immortal', daoHeart: '>=90', innerDemon: '<=10' },
    karmaRequired: 50,
  },
  {
    id: 'sect_founder',
    name: '开宗立派',
    icon: '🏛️',
    category: 'good',
    description: '建立传承万代的大宗门',
    epilogue: `你没有选择飞升。
你在人间建立了传承万代的大宗门，
十万弟子，三千长老，香火鼎盛。
百万年后，你的雕像依然矗立在山巅，
受万代修士膜拜。

【好结局：人过留名】`,
    requirements: { sect_founded: true, sect_influence: '>=10000', disciples: '>=10000' },
    karmaRequired: 30,
  },
  {
    id: 'lovers',
    name: '神仙眷侣',
    icon: '💕',
    category: 'good',
    description: '与道侣携手归隐',
    epilogue: `什么飞升，什么大道，都不重要。
你带着道侣隐居在十万大山深处。
每日炼丹下棋，看日出日落。
不求长生不老，但求朝夕相伴。
一万年太久，只争朝夕。

【好结局：只羡鸳鸯不羡仙】`,
    requirements: { companion_favor: 100, companion_max_realm: '>=golden_core', daoHeart: '>=60' },
    karmaRequired: 20,
  },
  {
    id: 'demon_lord',
    name: '魔尊降临',
    icon: '👿',
    category: 'good',
    description: '一统魔道，万魔朝拜',
    epilogue: `正道伪善，仙道虚伪。
你以无上魔力压服整个魔界，
建立了一统的魔国。
万千魔修俯首称臣，
正道仙人不敢越雷池一步。
你就是——魔尊重楼。

【魔道结局：我命由我不由天】`,
    requirements: { realm: 'dao_integration_perfect', demonicPower: '>=100', righteous: '<=-50' },
    karmaRequired: -50,
  },
  {
    id: 'world_ancestor',
    name: '世界之祖',
    icon: '🐉',
    category: 'secret',
    description: '炼化整个世界，成为天道本身',
    epilogue: `渡劫？飞升？
为什么要去别人的世界做小辈？
你选择了第三条路：
炼化这方世界，自己成为天道！
从此以后，
万物兴衰由你定，
众生死活由你决。
你就是——世界的本身。

【隐藏结局：胜天半子】`,
    requirements: { realm: 'world_ancestor', comprehend_world_law: true, devour_heaven_tribulation: true },
    karmaRequired: 0,
  },
  {
    id: 'dead_sit',
    name: '坐化归西',
    icon: '💀',
    category: 'bad',
    description: '寿元耗尽，遗憾而终',
    epilogue: `寿元的最后一天，
你坐在洞府的蒲团上，
回首一生，碌碌无为。
终究，还是没能跨过那道坎。
也许，这就是绝大多数修士的结局。

【坏结局：修仙界的一粒尘埃】`,
    requirements: { lifespan: 0, realm: '<=foundation_perfect' },
    karmaRequired: 0,
  },
  {
    id: 'tribulation_failure',
    name: '形神俱灭',
    icon: '⚡',
    category: 'bad',
    description: '渡劫失败，灰飞烟灭',
    epilogue: `第八十一道天雷落下。
你的元婴在惨叫中化为飞灰。
十万年修行，一朝散尽。
天雷过后，
什么都没有留下，
仿佛你从未来过这世界。

【坏结局：天道的肥料】`,
    requirements: { heavenly_tribulation_failed: true },
    karmaRequired: 0,
  },
  {
    id: 'demonic_possession',
    name: '走火入魔',
    icon: '👹',
    category: 'bad',
    description: '心魔反噬，沦为怪物',
    epilogue: `在一次突破中，
心魔终于反噬了你。
你失去了所有理智，
只剩下杀戮和破坏的本能。
昔日的天之骄子，
变成了人人得而诛之的魔头。

【坏结局：人性的丧失】`,
    requirements: { innerDemon: '>=100', sanity: 0 },
    karmaRequired: -30,
  },
]

export const XIANXIA_MAIN_QUESTS: MainQuest[] = [
  {
    id: 'tutorial_1',
    name: '【新手教程】引气入体',
    description: '学习最基础的吐纳之法',
    phase: 1,
    objectives: [
      { id: '1a', description: '按 M 键打坐修炼 10 秒', completed: false, requirements: { meditateSeconds: 10 } },
      { id: '1b', description: '按空格暂停游戏，查看属性面板', completed: false, requirements: { paused: true } },
      { id: '1c', description: '按 F1 打开百科，查看炼气期说明', completed: false, requirements: { helpOpened: true } },
    ],
    rewards: { spiritStones: 100, pill: 5 },
    nextQuest: 'tutorial_2',
    choices: [],
  },
  {
    id: 'tutorial_2',
    name: '【新手教程】筑基准备',
    description: '了解突破的基本机制',
    phase: 1,
    objectives: [
      { id: '2a', description: '达到炼气9层', completed: false, requirements: { realm: 'qi_refining_9' } },
      { id: '2b', description: '在百科中查看"筑基丹"词条', completed: false, requirements: { conceptViewed: 'foundation-pill' } },
      { id: '2c', description: '攒够200灵石购买筑基丹', completed: false, requirements: { spiritStones: 200 } },
    ],
    rewards: { foundationPill: 1, daoHeart: 10 },
    nextQuest: 'foundation_quest',
    choices: [
      {
        text: '稳扎稳打，等到圆满再突破',
        effects: { breakthroughBonus: 0.2, daoHeart: 10 },
        nextBranch: 'steady_path',
      },
      {
        text: '富贵险中求，现在就尝试',
        effects: { breakthroughBonus: -0.1, spiritStones: 100 },
        nextBranch: 'risky_path',
      },
    ],
  },
]

export function getPhaseForRealm(realm: string): GamePhase | undefined {
  const realmOrder = ['mortal', 'qi_refining_1', 'qi_refining_3', 'qi_refining_7', 'foundation_early', 
    'foundation_perfect', 'golden_core_perfect', 'nascent_soul_early', 'dao_integration_early']
  const index = realmOrder.indexOf(realm)
  
  if (index < 3) return CULTIVATION_PHASES[0]
  if (index < 5) return CULTIVATION_PHASES[1]
  if (index < 6) return CULTIVATION_PHASES[2]
  if (index < 7) return CULTIVATION_PHASES[3]
  return CULTIVATION_PHASES[4]
}

export function checkEndingConditions(state: Record<string, any>): Ending[] {
  return CULTIVATION_ENDINGS.filter(ending => {
    for (const [key, value] of Object.entries(ending.requirements)) {
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
