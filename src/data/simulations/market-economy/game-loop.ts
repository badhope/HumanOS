export interface CountryStart {
  id: string
  name: string
  flag: string
  description: string
  startYear: number
  difficulty: 'tutorial' | 'easy' | 'normal' | 'hard' | 'nightmare'
  startingConditions: Record<string, number | string>
  nationalFocus: string[]
  exclusiveEvents: string[]
  victoryPaths: string[]
}

export interface HistoricPhase {
  id: string
  name: string
  yearRange: [number, number]
  description: string
  historicalEvents: string[]
  technologies: string[]
  crises: string[]
  mandatoryLaws: string[]
}

export interface IdeologyPath {
  id: string
  name: string
  icon: string
  description: string
  coreValues: string[]
  supportedBy: string[]
  opposedBy: string[]
  keyLaws: string[]
  victoryCondition: string
  uniqueEvents: string[]
}

export interface NationEnding {
  id: string
  name: string
  icon: string
  category: 'triumph' | 'victory' | 'stalemate' | 'defeat' | 'disaster' | 'secret'
  description: string
  epilogue: string
  requirements: Record<string, number | string | boolean>
  yearRequired: number
}

export const NATION_STARTS: CountryStart[] = [
  {
    id: 'PRU',
    name: '普鲁士王国',
    flag: '🇩🇪',
    description: '教程国家。军国主义传统，纪律严明。目标：统一德意志。',
    startYear: 1836,
    difficulty: 'tutorial',
    startingConditions: {
      gdp: 5000,
      population: 15,
      literacy: 60,
      army: 30,
      prestige: 40,
      industrialization: 25,
    },
    nationalFocus: ['military', 'industrialization', 'unification'],
    exclusiveEvents: ['three_wars', 'blood_and_iron', 'kulturkampf'],
    victoryPaths: ['german_unification', 'great_power', 'reactionary_dream'],
  },
  {
    id: 'GBR',
    name: '大英帝国',
    flag: '🇬🇧',
    description: '日不落帝国。世界工厂，海军第一。目标：维持世界霸权。',
    startYear: 1836,
    difficulty: 'easy',
    startingConditions: {
      gdp: 20000,
      population: 25,
      literacy: 70,
      navy: 100,
      prestige: 100,
      industrialization: 80,
    },
    nationalFocus: ['navy', 'colonies', 'free_trade'],
    exclusiveEvents: ['chartist_movement', 'victorian_era', 'pax_britannica'],
    victoryPaths: ['world_hegemon', 'liberal_democracy'],
  },
  {
    id: 'FRA',
    name: '法兰西王国',
    flag: '🇫🇷',
    description: '欧洲文化中心。经历了大革命的阵痛。',
    startYear: 1836,
    difficulty: 'normal',
    startingConditions: {
      gdp: 15000,
      population: 32,
      literacy: 55,
      army: 50,
      prestige: 80,
      industrialization: 40,
    },
    nationalFocus: ['culture', 'army', 'republicanism'],
    exclusiveEvents: ['1848_revolution', 'napoleon_iii', 'paris_commune'],
    victoryPaths: ['napoleonic_empire', 'socialist_revolution'],
  },
  {
    id: 'RUS',
    name: '俄罗斯帝国',
    flag: '🇷🇺',
    description: '冰雪巨人。农奴制根深蒂固，但潜力无穷。',
    startYear: 1836,
    difficulty: 'hard',
    startingConditions: {
      gdp: 10000,
      population: 70,
      literacy: 15,
      army: 80,
      prestige: 60,
      industrialization: 5,
      serfdom: 100,
    },
    nationalFocus: ['westernization', 'serf_emancipation', 'pan_slavism'],
    exclusiveEvents: ['decembrist_revolt', 'alexander_ii_reform', 'october_revolution'],
    victoryPaths: ['soviet_union', 'tsarist_autocracy'],
  },
  {
    id: 'CHN',
    name: '大清帝国',
    flag: '🇨🇳',
    description: '天朝上国的迷梦。西方的坚船利炮即将到来。',
    startYear: 1836,
    difficulty: 'nightmare',
    startingConditions: {
      gdp: 25000,
      population: 400,
      literacy: 5,
      army: 100,
      prestige: 90,
      industrialization: 1,
      westernization: 0,
    },
    nationalFocus: ['self_strengthening', 'modernization', 'nationalism'],
    exclusiveEvents: ['opium_war', 'taiping_rebellion', 'hundred_days_reform', 'xinhai_revolution'],
    victoryPaths: ['middle_kingdom', 'communist_victory', 'westernization'],
  },
  {
    id: 'USA',
    name: '美利坚合众国',
    flag: '🇺🇸',
    description: '山巅之城。未来的世界霸主，但首先要解决奴隶制问题。',
    startYear: 1836,
    difficulty: 'normal',
    startingConditions: {
      gdp: 12000,
      population: 17,
      literacy: 75,
      army: 15,
      prestige: 50,
      industrialization: 50,
      slavery: 50,
    },
    nationalFocus: ['manifest_destiny', 'civil_war', 'industrialization'],
    exclusiveEvents: ['texas_independence', 'civil_war', 'gilded_age'],
    victoryPaths: ['manifest_destiny', 'city_upon_a_hill'],
  },
  {
    id: 'JAP',
    name: '德川幕府',
    flag: '🇯🇵',
    description: '闭关锁国的岛国。黑船即将叩关。',
    startYear: 1836,
    difficulty: 'hard',
    startingConditions: {
      gdp: 3000,
      population: 30,
      literacy: 40,
      army: 20,
      prestige: 30,
      industrialization: 2,
      sakoku: 100,
    },
    nationalFocus: ['meiji_ishin', 'rapid_industrialization', 'militarization'],
    exclusiveEvents: ['perry_expedition', 'boshin_war', 'meiji_restoration'],
    victoryPaths: ['rising_sun', 'asiatic_co_prosperity'],
  },
]

export const HISTORIC_PHASES: HistoricPhase[] = [
  {
    id: 'phase1',
    name: '工业黎明',
    yearRange: [1836, 1848],
    description: '蒸汽机的浓烟正在升起。旧制度还在苟延残喘。',
    historicalEvents: ['opium_war', 'chartist_movement', 'potato_famine'],
    technologies: ['steam_engine', 'railroad', 'breech_loader'],
    crises: ['harvest_failure', 'bank_run'],
    mandatoryLaws: ['early_industrialization'],
  },
  {
    id: 'phase2',
    name: '革命之年',
    yearRange: [1848, 1871],
    description: '民族之春席卷欧洲。旧秩序摇摇欲坠。',
    historicalEvents: ['spring_of_nations', 'crimean_war', 'paris_commune'],
    technologies: ['electricity', 'public_health', 'dreadnought'],
    crises: ['panic_1873', 'luddite_riots'],
    mandatoryLaws: ['nation_state_formation'],
  },
  {
    id: 'phase3',
    name: '统一时代',
    yearRange: [1871, 1890],
    description: '铁血宰相统一德意志。第二次工业革命开始。',
    historicalEvents: ['german_unification', 'second_industrial_revolution', 'gilded_age'],
    technologies: ['combustion_engine', 'nitrogen_fixation', 'scientific_management'],
    crises: ['long_depression', 'strike_general'],
    mandatoryLaws: ['capitalism_triumph'],
  },
  {
    id: 'phase4',
    name: '帝国主义',
    yearRange: [1890, 1914],
    description: '瓜分世界的狂潮。两大军事集团对峙。',
    historicalEvents: ['scrambled_for_africa', 'naval_arms_race', 'balkan_wars'],
    technologies: ['aviation', 'chemical_weapons', 'tanks'],
    crises: ['war_scares', 'assassination'],
    mandatoryLaws: ['world_war_inevitable'],
  },
  {
    id: 'phase5',
    name: '大战与革命',
    yearRange: [1914, 1936],
    description: '终结一切战争的战争。以及终结一切和平的和平。',
    historicalEvents: ['great_war', 'russian_revolution', 'treaty_of_versailles'],
    technologies: ['total_war', 'communism', 'fascism'],
    crises: ['great_depression', 'civil_wars'],
    mandatoryLaws: ['ideology_triumph'],
  },
]

export const IDEOLOGY_PATHS: IdeologyPath[] = [
  {
    id: 'conservatism',
    name: '保守主义',
    icon: '👑',
    description: '王座与祭坛。维护传统，反对激进变革。',
    coreValues: ['君主制', '国教', '贵族特权', '农业社会'],
    supportedBy: ['landowners', 'clergy', 'military'],
    opposedBy: ['industrialists', 'intelligentsia', 'trade_unions'],
    keyLaws: ['absolute_monarchy', 'serfdom', 'state_religion'],
    victoryCondition: 'reactionary_dream',
    uniqueEvents: ['holy_alliance_restored', 'ancien_regime_forever'],
  },
  {
    id: 'liberalism',
    name: '自由主义',
    icon: '🎩',
    description: '自由、平等、博爱。自由贸易与宪政。',
    coreValues: ['立宪君主制', '自由市场', '世俗化', '法治'],
    supportedBy: ['industrialists', 'intelligentsia', 'petite_bourgeoisie'],
    opposedBy: ['landowners', 'clergy', 'trade_unions'],
    keyLaws: ['constitutional_monarchy', 'laissez_faire', 'secularism'],
    victoryCondition: 'liberal_democracy',
    uniqueEvents: ['enlightenment_triumph', 'free_world_leader'],
  },
  {
    id: 'socialism',
    name: '社会主义',
    icon: '☭',
    description: '全世界无产者，联合起来！',
    coreValues: ['共和国', '计划经济', '福利国家', '无产阶级专政'],
    supportedBy: ['trade_unions', 'intelligentsia', 'peasants'],
    opposedBy: ['landowners', 'industrialists', 'military'],
    keyLaws: ['republic', 'welfare_state', 'universal_suffrage'],
    victoryCondition: 'dictatorship_of_proletariat',
    uniqueEvents: ['world_revolution', 'communist_international'],
  },
  {
    id: 'nationalism',
    name: '民族主义',
    icon: '⚔️',
    description: '血与铁。国家统一与民族复兴。',
    coreValues: ['祖国统一', '军国主义', '光荣孤立', '殖民地'],
    supportedBy: ['military', 'petite_bourgeoisie', 'industrialists'],
    opposedBy: ['clergy', 'internationalists'],
    keyLaws: ['conscription', 'jingoism', 'protectionism'],
    victoryCondition: 'great_power',
    uniqueEvents: ['blood_and_iron', 'unification_wars'],
  },
  {
    id: 'reactionism',
    name: '反动主义',
    icon: '🖤',
    description: '不仅拒绝进步，还要倒退。',
    coreValues: ['绝对专制', '消灭进步', '封建复辟', '净化'],
    supportedBy: ['military', 'extremists'],
    opposedBy: ['everyone else'],
    keyLaws: ['absolute_monarchy', 'ban_all_parties', 'censorship_total'],
    victoryCondition: 'order_prevails',
    uniqueEvents: ['night_watchman_state', 'triumph_of_the_will'],
  },
]

export const NATION_ENDINGS: NationEnding[] = [
  {
    id: 'world_hegemon',
    name: '日不落帝国',
    icon: '🌅',
    category: 'triumph',
    description: '统治海洋，统治世界',
    epilogue: `1936年，伦敦。
不列颠尼亚统治着七海四洲。
米字旗飘扬在全球四分之一的土地上。
英语成为世界语，英镑成为世界货币。
罗马之后，再无此等霸业。

【完美结局：帝国永在】`,
    requirements: { country: 'GBR', gdp_rank: 1, navy_rank: 1, year: 1936 },
    yearRequired: 1936,
  },
  {
    id: 'german_unification',
    name: '德意志国',
    icon: '⚔️',
    category: 'triumph',
    description: '通过三次王朝战争统一德意志',
    epilogue: `凡尔赛宫镜厅。
1871年1月18日，
普鲁士国王在凡尔赛宫加冕为德意志皇帝。
七百年的分裂终告终结。
一个统一、强大的德意志在欧洲中心崛起。

【完美结局：铁血铸就的帝国】`,
    requirements: { country: 'PRU', germany_unified: true, year: '<=1871' },
    yearRequired: 1871,
  },
  {
    id: 'soviet_union',
    name: '十月革命',
    icon: '🔴',
    category: 'triumph',
    description: '阿芙乐尔号的炮声震动世界',
    epilogue: `冬宫被攻陷的那个夜晚，
人类历史翻开了新的一页。
全世界的工人都听到了十月的炮声。
一个幽灵，共产主义的幽灵，在欧洲游荡。
而现在，它拥有了自己的祖国。

【完美结局：全世界无产者联合起来！】`,
    requirements: { country: 'RUS', ideology: 'socialism', revolution: true, year: '<=1917' },
    yearRequired: 1917,
  },
  {
    id: 'paris_commune_victory',
    name: '公社万岁！',
    icon: '🔴',
    category: 'secret',
    description: '世界上第一个无产阶级国家幸存',
    epilogue: `梯也尔的军队溃败了。
巴黎公社不仅没有被淹没在血泊中，
反而传遍了整个法国，整个欧洲。
马克思说的对：
"工人阶级的巴黎永远不会被忘记！"

【隐藏结局：新拉马克主义的胜利】`,
    requirements: { country: 'FRA', commune_survived: true, year: 1871 },
    yearRequired: 1871,
  },
  {
    id: 'zhongxing',
    name: '同治中兴',
    icon: '🐉',
    category: 'victory',
    description: '大清的洋务运动成功，避免了亡国灭种',
    epilogue: `1911年，北京。
洋务运动成功了。
北洋舰队不仅夺回了制海权，
甚至开到了英吉利海峡炫耀武力。
天朝上国的迷梦，
居然在坚船利炮下实现了。

【好结局：老佛爷英明！】`,
    requirements: { country: 'CHN', modernization: '>=80', not_defeated: true, year: 1912 },
    yearRequired: 1912,
  },
  {
    id: 'meiji_restoration',
    name: '明治维新',
    icon: '☀️',
    category: 'triumph',
    description: '脱亚入欧，成为列强',
    epilogue: `1905年，对马海峡。
东乡平八郎的联合舰队全歼了俄国波罗的海舰队。
亚洲人第一次打败了欧洲列强。
日本成为了第一个非欧洲的帝国主义国家。
日出之国，冉冉升起。

【完美结局：脱亚入欧】`,
    requirements: { country: 'JAP', industrialization: '>=80', defeated_russia: true, year: 1905 },
    yearRequired: 1905,
  },
  {
    id: 'reactionary_dream',
    name: '正统主义的胜利',
    icon: '👑',
    category: 'victory',
    description: '1900年仍然维持农奴制和绝对君主制',
    epilogue: `1900年，圣彼得堡。
革命者被镇压了，
改革者被流放了，
外国干涉被击退了。
农奴制万岁！
沙皇万岁！
黑暗的中世纪还能再续一千年！

【隐藏成就：反动分子的大胜利】`,
    requirements: { serfdom: 100, absolute_monarchy: true, year: 1900 },
    yearRequired: 1900,
  },
  {
    id: 'civil_war',
    name: '内战',
    icon: '⚔️',
    category: 'defeat',
    description: '国家陷入残酷的内战',
    epilogue: `政府军和叛军在全国各地厮杀。
农田荒芜，城市焚毁。
曾经繁荣的国家变成了一片废墟。
没有人记得为什么而战了。
杀戮已经成了目的本身。

【坏结局：兄弟阋墙】`,
    requirements: { civil_war: true, legitimacy: '<=10' },
    yearRequired: 0,
  },
  {
    id: 'revolution',
    name: '革命！',
    icon: '🔥',
    category: 'stalemate',
    description: '政府被推翻，旧秩序崩溃',
    epilogue: `冬宫的大门被撞开了。
国王/皇帝/总统逃跑了。
愤怒的群众涌上街头。
旧世界的一切都被砸得粉碎。
接下来会发生什么？
谁也不知道。

【中立结局：旧世界已死，新世界方生】`,
    requirements: { revolution: true, government_overthrown: true },
    yearRequired: 0,
  },
  {
    id: 'bankruptcy',
    name: '国家破产',
    icon: '💸',
    category: 'disaster',
    description: '国债违约，国家信用彻底崩溃',
    epilogue: `国库空空如也。
外国银行家拒绝提供新的贷款。
军队因为欠饷哗变了。
政府宣布破产。
一个近代化的奇迹就这样结束了。

【坏结局：金融崩溃】`,
    requirements: { debt_to_gdp: '>=200', defaulted: true },
    yearRequired: 0,
  },
  {
    id: 'great_depression',
    name: '大萧条',
    icon: '📉',
    category: 'defeat',
    description: '经济彻底崩溃，失业率50%',
    epilogue: `银行倒闭，工厂关门，农民破产。
曾经不可一世的资本家在街头卖苹果。
面包队一眼望不到头。
自由市场的神话破灭了。
极端主义开始抬头。

【坏结局：无尽的萧条】`,
    requirements: { unemployment: '>=50', gdp_drop: '>=50', year: 1929 },
    yearRequired: 1929,
  },
  {
    id: 'manifest_destiny',
    name: '天定命运',
    icon: '🦅',
    category: 'triumph',
    description: '从大西洋到太平洋，美利坚横跨两大洋',
    epilogue: `从普利茅斯的岩石到金门大桥，
一个横跨两大洋的帝国诞生了。
自由的土地，勇敢者的家园。
山巅之城，光照万国。

【完美结局：美国世纪】`,
    requirements: { country: 'USA', manifest_destiny_complete: true, year: 1890 },
    yearRequired: 1890,
  },
]

export function getPhaseForYear(year: number): HistoricPhase {
  if (year < 1848) return HISTORIC_PHASES[0]
  if (year < 1871) return HISTORIC_PHASES[1]
  if (year < 1890) return HISTORIC_PHASES[2]
  if (year < 1914) return HISTORIC_PHASES[3]
  return HISTORIC_PHASES[4]
}
