export const USA_NATION_DESIGN = {
  id: 'usa',
  name: '美利坚合众国',
  flag: '🇺🇸',
  tagline: '山巅之城 - 自由世界的领袖',
  
  coreIdentity: {
    superpower: true,
    reserveCurrency: true,
    hegemon: true,
    meltingPot: true,
    checksAndBalances: true,
  },

  coreMechanics: [
    {
      id: 'exorbitant_privilege',
      name: '美元霸权',
      description: '印美元收割全世界，全球买单',
      icon: '💵',
      effects: {
        printMoneyInflationPenalty: -0.7,
        debtInterestRate: -0.5,
        sanctionsPower: +50,
      },
    },
    {
      id: 'deep_state',
      name: '深层政府',
      description: '行政、议会、司法、军方、媒体、科技公司分立制衡',
      icon: '🕶️',
      effects: {
        radicalChangeResistance: +80,
        coupResistance: +90,
        reformDifficulty: +40,
      },
    },
    {
      id: 'partisan_warfare',
      name: '两党政争',
      description: '民主党 vs 共和党 无限内斗',
      icon: '⚔️',
      effects: {
        policyPendulum: true,
        midtermPenalty: true,
        populismRising: true,
      },
    },
    {
      id: 'soft_power',
      name: '软实力霸权',
      description: '文化、科技、教育统治全球',
      icon: '🎬',
      effects: {
        brainGain: +50,
        techLeadership: +30,
        allianceSystem: +40,
      },
    },
  ],

  playStyle: {
    difficulty: 2,
    description: '世界霸主，容错率极高但转型极难',
    recommended: '适合新手学习，适合高手玩霸权',
    victoryConditions: [
      '维持单极霸权到2050年',
      '和平击败中国崛起',
      '制造业回流复兴',
      '解决两党极化撕裂',
    ],
    defeatConditions: [
      '内战爆发',
      '美元丧失储备货币地位',
      '债务违约国家破产',
    ],
  },
}

export const USA_FOCUS_TREE = {
  branches: {
    establishment: {
      id: 'establishment',
      name: '建制派路线',
      icon: '🏛️',
      description: '布什-克林顿-布什-希拉里 正统路线',
      mutuallyExclusiveWith: ['populist', 'progressive'],
      color: '#4A5568',
    },
    progressive: {
      id: 'progressive',
      name: '进步主义路线',
      icon: '🌹',
      description: '桑德斯-AOC 左翼激进路线',
      mutuallyExclusiveWith: ['establishment', 'populist'],
      color: '#E53E3E',
    },
    populist: {
      id: 'populist',
      name: '民粹主义路线',
      icon: '🦅',
      description: '特朗普 美国优先路线',
      mutuallyExclusiveWith: ['establishment', 'progressive'],
      color: '#3182CE',
    },
  },

  focuses: [
    {
      id: 'neoliberal_consensus',
      name: '新自由主义共识',
      branch: 'establishment',
      icon: '🌐',
      duration: 180,
      cost: { politicalCapital: 40 },
      requires: [],
      mutuallyExclusive: ['make_america_great_again', 'workers_revolution'],
      effects: {
        foreignInvestment: +30,
        wallStreetApproval: +20,
        manufacturing: -10,
        inequality: +15,
      },
      description: '继续全球化，金融资本主导',
    },
    {
      id: 'forever_wars',
      name: '永久战争',
      branch: 'establishment',
      icon: '⚔️',
      duration: 365,
      cost: { politicalCapital: 60, treasury: 200 },
      requires: ['neoliberal_consensus'],
      effects: {
        militaryIndustrialComplex: +20,
        warWeariness: +30,
        debt: +500,
        stability: -10,
      },
      description: '军工复合体驱动的全球干涉',
    },
    {
      id: 'bailout_wallstreet',
      name: '华尔街救市',
      branch: 'establishment',
      icon: '🏦',
      duration: 90,
      cost: { politicalCapital: 80 },
      requires: ['neoliberal_consensus'],
      effects: {
        wallStreetApproval: +40,
        populism: +25,
        inequality: +20,
        treasury: -800,
      },
      description: '危机来了，先救银行再说',
    },
    {
      id: 'make_america_great_again',
      name: '让美国再次伟大',
      branch: 'populist',
      icon: '🦅',
      duration: 180,
      cost: { politicalCapital: 50 },
      requires: [],
      mutuallyExclusive: ['neoliberal_consensus', 'workers_revolution'],
      effects: {
        baseApproval: +30,
        mediaOpposition: +40,
        immigration: -30,
        manufacturing: +15,
      },
      description: '美国优先，贸易战，建墙',
    },
    {
      id: 'drain_the_swamp',
      name: '抽干沼泽',
      branch: 'populist',
      icon: '🐊',
      duration: 365,
      cost: { politicalCapital: 100 },
      requires: ['make_america_great_again'],
      effects: {
        deepStateOpposition: +60,
        corruption: -15,
        stability: -20,
        approval: +25,
      },
      description: '清洗华盛顿建制派',
    },
    {
      id: 'trade_war_china',
      name: '对华贸易战',
      branch: 'populist',
      icon: '💥',
      duration: 270,
      cost: { politicalCapital: 70 },
      requires: ['make_america_great_again'],
      effects: {
        inflation: +3,
        manufacturing: +10,
        chinaRelation: -50,
        farmerSubsidies: -100,
      },
      description: '关税大战，制造业回流',
    },
    {
      id: 'workers_revolution',
      name: '工人革命',
      branch: 'progressive',
      icon: '✊',
      duration: 180,
      cost: { politicalCapital: 60 },
      requires: [],
      mutuallyExclusive: ['neoliberal_consensus', 'make_america_great_again'],
      effects: {
        wallStreetOpposition: +50,
        workerApproval: +35,
        inequality: -15,
        investment: -20,
      },
      description: '向亿万富豪宣战',
    },
    {
      id: 'medicare_for_all',
      name: '全民医保',
      branch: 'progressive',
      icon: '🏥',
      duration: 540,
      cost: { politicalCapital: 120, treasury: 1000 },
      requires: ['workers_revolution'],
      effects: {
        approval: +30,
        debt: +1500,
        pharmaOpposition: +40,
        healthOutcomes: +25,
      },
      description: '单一支付者全民医保体系',
    },
    {
      id: 'green_new_deal',
      name: '绿色新政',
      branch: 'progressive',
      icon: '🌱',
      duration: 730,
      cost: { politicalCapital: 100, treasury: 2000 },
      requires: ['workers_revolution'],
      effects: {
        energyIndependence: +30,
        debt: +3000,
        jobs: +5,
        oilIndustryOpposition: +50,
      },
      description: '万亿美元气候基础设施计划',
    },
  ],
}

export const USA_UI_MENU_ARCHITECTURE = {
  primary: [
    {
      id: 'dashboard',
      name: '总览',
      icon: '📊',
      items: [],
      default: true,
    },
    {
      id: 'economy',
      name: '经济',
      icon: '💰',
      items: [
        { id: 'overview', name: '宏观概览' },
        { id: 'budget', name: '财政预算' },
        { id: 'trade', name: '国际贸易' },
        { id: 'industries', name: '产业政策' },
      ],
    },
    {
      id: 'politics',
      name: '政治',
      icon: '🏛️',
      items: [
        { id: 'approval', name: '支持率' },
        { id: 'congress', name: '国会' },
        { id: 'elections', name: '选举' },
        { id: 'scandals', name: '丑闻' },
      ],
    },
    {
      id: 'focus',
      name: '国策',
      icon: '🌳',
      items: [
        { id: 'tree', name: '国策树' },
        { id: 'progress', name: '进行中' },
        { id: 'completed', name: '已完成' },
      ],
    },
    {
      id: 'tech',
      name: '科技',
      icon: '🔬',
      items: [
        { id: 'research', name: '研发' },
        { id: 'projects', name: '重大项目' },
      ],
    },
    {
      id: 'events',
      name: '事件',
      icon: '⚡',
      items: [],
      badge: true,
    },
  ],

  dashboardWidgets: [
    {
      id: 'core_numbers',
      name: '核心数据',
      size: 'large',
      metrics: ['gdp', 'inflation', 'unemployment', 'approval'],
    },
    {
      id: 'focus_in_progress',
      name: '进行中国策',
      size: 'medium',
    },
    {
      id: 'upcoming_events',
      name: '即将到来',
      size: 'medium',
    },
    {
      id: 'alert_warnings',
      name: '警报',
      size: 'small',
    },
  ],

  complexityLevels: {
    beginner: {
      name: '简单模式',
      hideAdvanced: true,
      tooltips: true,
      recommendations: true,
      visibleMetrics: 8,
    },
    normal: {
      name: '标准模式',
      hideAdvanced: false,
      tooltips: true,
      recommendations: false,
      visibleMetrics: 15,
    },
    paradox: {
      name: 'P社模式',
      hideAdvanced: false,
      tooltips: false,
      recommendations: false,
      visibleMetrics: 'all',
    },
  },
}

export const USA_2019_START = {
  country: 'USA',
  countryName: '美利坚合众国',
  date: { year: 2019, month: 1, day: 20 },
  description: '特朗普上任2周年，即将开始竞选连任',

  initialStats: {
    population: 328.2,
    gdp: 21430,
    gdpPerCapita: 65300,
    inflation: 1.8,
    unemployment: 3.6,
    stability: 55,
    treasury: -380,
    debt: 22700,
    debtToGdp: 106,
    legitimacy: 48,
    militancy: 35,
    approval: 42,
    centralBankRate: 2.5,
    currencyReserves: 130,
    polarization: 68,
    populusm: 45,
    politicalCapital: 80,
    researchPoints: 50,
  },

  activeSituations: [
    {
      id: 'trump_presidency',
      name: '特朗普任期',
      description: '非传统总统，每天都有大新闻',
      timer: 730,
      effects: { polarization: +0.1 },
    },
    {
      id: '2020_election_coming',
      name: '2020大选年',
      description: '美国历史上最分裂的一次选举',
      timer: 295,
      effects: {},
    },
  ],
}

export const USA_HISTORICAL_EVENTS = [
  {
    id: 'trump_impeachment_1',
    name: '第一次弹劾特朗普',
    date: { year: 2019, month: 12, day: 18 },
    effects: {
      approval: -3,
      polarization: +10,
      republicanLoyalty: +15,
    },
  },
  {
    id: 'covid_usa',
    name: '新冠抵达美国',
    date: { year: 2020, month: 3, day: 13 },
    effects: {
      gdpGrowth: -4.5,
      unemployment: +10,
      approval: -8,
      treasury: -3000,
      debt: +3000,
    },
    choices: [
      {
        name: '全面封城 + 纾困金',
        effects: { gdpGrowth: -3, approval: +5, debt: +5000, inflation: +3 },
      },
      {
        name: '群体免疫，经济优先',
        effects: { gdpGrowth: -1, approval: -15, deaths: '1M+' },
      },
    ],
  },
  {
    id: 'george_floyd_riots',
    name: 'BLM全国暴动',
    date: { year: 2020, month: 5, day: 25 },
    effects: {
      stability: -15,
      militancy: +20,
      polarization: +25,
      approval: -5,
    },
  },
  {
    id: 'election_2020',
    name: '2020总统大选',
    date: { year: 2020, month: 11, day: 3 },
    effects: {},
    choices: [
      {
        name: '承认败选，和平交接',
        effects: { stability: +10, republicanAnger: +30 },
      },
      {
        name: '选举欺诈！战斗到底',
        effects: { stability: -25, republicanLoyalty: +40 },
      },
    ],
  },
  {
    id: 'capitol_riot',
    name: '国会山暴动',
    date: { year: 2021, month: 1, day: 6 },
    effects: {
      stability: -20,
      legitimacy: -15,
      polarization: +40,
    },
  },
]

export function getUSAStartingTips(): string[] {
  return [
    '💡 你最大的优势是美元霸权 - 印钞全球买单，善用这个BUG',
    '⚠️ 两党极化是最大的定时炸弹',
    '🎯 2020大选是第一个重大岔路口',
    '🦠 新冠疫情处理将定义你的整个任期',
    '💰 债务虽然很高，但美元是世界货币 - 你可以比别的国家印更多钱',
  ]
}
