export interface FocusNode {
  id: string
  name: string
  icon: string
  description: string
  category: 'political' | 'economic' | 'military' | 'social' | 'diplomatic'
  branch: string
  duration: number
  cost: Record<string, number>
  requires: string[]
  mutuallyExclusive: string[]
  effects: Record<string, number | string | boolean>
  oneTime: boolean
  completed: boolean
  available: boolean
  x: number
  y: number
}

export interface TechNode {
  id: string
  name: string
  icon: string
  description: string
  tier: 1 | 2 | 3 | 4 | 5
  category: string
  researchCost: number
  researchTime: number
  requires: string[]
  effects: Record<string, number>
  passiveBonus: boolean
  duration?: number
  completed: boolean
  researching: boolean
}

export interface FocusBranch {
  id: string
  name: string
  icon: string
  description: string
  ideology?: string
  mutuallyExclusiveWith: string[]
  nodes: string[]
}

export const FOCUS_BRANCHES: Record<string, FocusBranch> = {
  authoritarian: {
    id: 'authoritarian',
    name: '国家主义道路',
    icon: '🦅',
    description: '强化中央集权，牺牲部分自由换取稳定和效率',
    ideology: '权威主义',
    mutuallyExclusiveWith: ['liberal', 'socialist'],
    nodes: ['strongman', 'state_capitalism', 'nationalism', 'censorship'],
  },
  liberal: {
    id: 'liberal',
    name: '自由主义道路',
    icon: '🗽',
    description: '拥抱市场和自由，小政府大社会',
    ideology: '自由主义',
    mutuallyExclusiveWith: ['authoritarian', 'socialist'],
    nodes: ['free_market', 'privatization', 'open_society', 'west_alignment'],
  },
  socialist: {
    id: 'socialist',
    name: '社会主义道路',
    icon: '☭',
    description: '公平优先，全面公有制和计划经济',
    ideology: '社会主义',
    mutuallyExclusiveWith: ['authoritarian', 'liberal'],
    nodes: ['planned_economy', 'wealth_redistribution', 'worker_control', 'anti_imperialism'],
  },
  pragmatic: {
    id: 'pragmatic',
    name: '实用主义路线',
    icon: '⚖️',
    description: '不走极端，在各种路线间寻求平衡',
    mutuallyExclusiveWith: [],
    nodes: ['gradual_reform', 'mixed_economy', 'multipolar', 'technology_focus'],
  },
}

export const RUSSIA_FOCUS_TREE: FocusNode[] = [
  {
    id: 'putin_consolidation',
    name: '巩固权力',
    icon: '👑',
    description: '清洗异己，将所有权力集中到总统办公室',
    category: 'political',
    branch: 'authoritarian',
    duration: 180,
    cost: { politicalCapital: 50 },
    requires: [],
    mutuallyExclusive: ['free_market'],
    effects: { stability: +15, legitimacy: +10, approval: +5, corruption: +5 },
    oneTime: true,
    completed: false,
    available: true,
    x: 0, y: 0,
  },
  {
    id: 'oligarch_crackdown',
    name: '打击寡头',
    icon: '⚔️',
    description: '选择性打击不听话的寡头，收回关键资产',
    category: 'political',
    branch: 'authoritarian',
    duration: 270,
    cost: { politicalCapital: 80 },
    requires: ['putin_consolidation'],
    mutuallyExclusive: [],
    effects: { approval: +20, treasury: +100, corruption: -10, legitimacy: +5 },
    oneTime: true,
    completed: false,
    available: false,
    x: 1, y: 0,
  },
  {
    id: 'state_capitalism',
    name: '国家资本主义',
    icon: '🏛️',
    description: '大型企业国有化，国家控制战略经济命脉',
    category: 'economic',
    branch: 'authoritarian',
    duration: 365,
    cost: { politicalCapital: 100 },
    requires: ['oligarch_crackdown'],
    mutuallyExclusive: ['privatization'],
    effects: { stability: +10, sanctionsImpact: -15, treasury: +200, foreignInvestment: -30 },
    oneTime: true,
    completed: false,
    available: false,
    x: 2, y: 0,
  },
  {
    id: 'national_bargain',
    name: '社会契约',
    icon: '🤝',
    description: '用稳定和福利换取民众的政治沉默',
    category: 'social',
    branch: 'authoritarian',
    duration: 365,
    cost: { politicalCapital: 60, treasury: 50 },
    requires: ['state_capitalism'],
    mutuallyExclusive: [],
    effects: { approval: +15, militancy: -15, inflation: +3, debt: +100 },
    oneTime: true,
    completed: false,
    available: false,
    x: 3, y: 0,
  },
  {
    id: 'free_market',
    name: '全面市场化',
    icon: '📈',
    description: '彻底放开价格管制，取消市场准入限制',
    category: 'economic',
    branch: 'liberal',
    duration: 180,
    cost: { politicalCapital: 70 },
    requires: [],
    mutuallyExclusive: ['state_capitalism', 'planned_economy'],
    effects: { gdpGrowth: +2, inflation: +8, unemployment: +5, corruption: -10 },
    oneTime: true,
    completed: false,
    available: true,
    x: 0, y: 2,
  },
  {
    id: 'privatization',
    name: '大规模私有化',
    icon: '🏢',
    description: '将所有国有企业快速拍卖给私人投资者',
    category: 'economic',
    branch: 'liberal',
    duration: 365,
    cost: { politicalCapital: 90 },
    requires: ['free_market'],
    mutuallyExclusive: ['state_capitalism'],
    effects: { treasury: +300, foreignInvestment: +40, corruption: +15, militancy: +10 },
    oneTime: true,
    completed: false,
    available: false,
    x: 1, y: 2,
  },
  {
    id: 'west_alignment',
    name: '融入西方',
    icon: '🌐',
    description: '政治经济全面向西方靠拢，寻求加入欧盟',
    category: 'diplomatic',
    branch: 'liberal',
    duration: 540,
    cost: { politicalCapital: 120 },
    requires: ['privatization'],
    mutuallyExclusive: ['eurasian_integration'],
    effects: { sanctionsImpact: -50, foreignInvestment: +50, technology: +30, legitimacy: -20 },
    oneTime: true,
    completed: false,
    available: false,
    x: 2, y: 2,
  },
  {
    id: 'planned_economy',
    name: '计划经济',
    icon: '📋',
    description: '恢复 Gosplan，对经济进行全面中央计划',
    category: 'economic',
    branch: 'socialist',
    duration: 365,
    cost: { politicalCapital: 100 },
    requires: [],
    mutuallyExclusive: ['free_market', 'state_capitalism'],
    effects: { unemployment: -8, inflation: -5, gdpGrowth: -2, stability: +10 },
    oneTime: true,
    completed: false,
    available: true,
    x: 0, y: 4,
  },
  {
    id: 'wealth_redistribution',
    name: '财富再分配',
    icon: '💸',
    description: '高额累进税，劫富济贫缩小贫富差距',
    category: 'social',
    branch: 'socialist',
    duration: 270,
    cost: { politicalCapital: 80 },
    requires: ['planned_economy'],
    mutuallyExclusive: [],
    effects: { approval: +25, militancy: -20, capitalFlight: +40, gdpGrowth: -1 },
    oneTime: true,
    completed: false,
    available: false,
    x: 1, y: 4,
  },
  {
    id: 'eurasian_integration',
    name: '欧亚一体化',
    icon: '🌍',
    description: '建立欧亚经济联盟，恢复苏联经济空间',
    category: 'diplomatic',
    branch: 'authoritarian',
    duration: 540,
    cost: { politicalCapital: 100 },
    requires: ['state_capitalism'],
    mutuallyExclusive: ['west_alignment'],
    effects: { gdpGrowth: +1.5, stability: +5, sanctionsImpact: -10, foreignInvestment: -15 },
    oneTime: true,
    completed: false,
    available: false,
    x: 2, y: 1,
  },
  {
    id: 'military_keynesianism',
    name: '军事凯恩斯主义',
    icon: '⚔️',
    description: '大规模扩军，军工拉动整个国民经济',
    category: 'military',
    branch: 'authoritarian',
    duration: 365,
    cost: { politicalCapital: 70, treasury: 200 },
    requires: ['state_capitalism'],
    mutuallyExclusive: [],
    effects: { gdpGrowth: +2, unemployment: -5, debt: +300, militancy: +10 },
    oneTime: true,
    completed: false,
    available: false,
    x: 2, y: 0.5,
  },
  {
    id: 'technology_focus',
    name: '技术立国',
    icon: '🔬',
    description: '举国体制攻克关键核心技术',
    category: 'economic',
    branch: 'pragmatic',
    duration: 730,
    cost: { politicalCapital: 60, treasury: 300 },
    requires: [],
    mutuallyExclusive: [],
    effects: { gdpGrowth: +1, brainDrain: -20, sanctionsImpact: -20, debt: +150 },
    oneTime: true,
    completed: false,
    available: true,
    x: 1, y: 3,
  },
  {
    id: 'gradual_reform',
    name: '渐进改革',
    icon: '🐢',
    description: '不搞休克疗法，小步快走稳定优先',
    category: 'political',
    branch: 'pragmatic',
    duration: 365,
    cost: { politicalCapital: 40 },
    requires: ['technology_focus'],
    mutuallyExclusive: [],
    effects: { stability: +10, inflation: -2, gdpGrowth: +0.5, reformPace: 'gradual' },
    oneTime: true,
    completed: false,
    available: false,
    x: 2, y: 3,
  },
]

export const TECHNOLOGY_TREE: TechNode[] = [
  {
    id: 'digital_gov',
    name: '数字政府',
    icon: '💻',
    description: '所有政务服务上线，官僚效率大幅提升',
    tier: 1,
    category: 'digital',
    researchCost: 50,
    researchTime: 180,
    requires: [],
    effects: { corruption: -8, bureaucraticEfficiency: +20 },
    passiveBonus: true,
    completed: false,
    researching: false,
  },
  {
    id: 'ai_administration',
    name: 'AI治理',
    icon: '🤖',
    description: '用人工智能优化经济预测和政策制定',
    tier: 2,
    category: 'digital',
    researchCost: 100,
    researchTime: 365,
    requires: ['digital_gov'],
    effects: { gdpGrowth: +0.5, inflation: -1 },
    passiveBonus: true,
    completed: false,
    researching: false,
  },
  {
    id: 'cbdc',
    name: '央行数字货币',
    icon: '🪙',
    description: '发行数字卢布，实现全面金融监控',
    tier: 2,
    category: 'digital',
    researchCost: 80,
    researchTime: 270,
    requires: ['digital_gov'],
    effects: { sanctionsImpact: -20, corruption: -5, capitalFlight: -25 },
    passiveBonus: true,
    completed: false,
    researching: false,
  },
  {
    id: 'import_substitution',
    name: '进口替代',
    icon: '🏭',
    description: '国产化所有关键进口品',
    tier: 1,
    category: 'industry',
    researchCost: 60,
    researchTime: 270,
    requires: [],
    effects: { sanctionsImpact: -15, inflation: +2, gdpGrowth: +0.5 },
    passiveBonus: true,
    completed: false,
    researching: false,
  },
  {
    id: 'high_tech_manufacturing',
    name: '高端制造',
    icon: '🔧',
    description: '发展精密机械、化工、电子工业',
    tier: 2,
    category: 'industry',
    researchCost: 120,
    researchTime: 540,
    requires: ['import_substitution'],
    effects: { gdpGrowth: +1, sanctionsImpact: -10 },
    passiveBonus: true,
    completed: false,
    researching: false,
  },
  {
    id: 'resource_diversification',
    name: '经济多元化',
    icon: '🛠️',
    description: '降低对油气出口的依赖',
    tier: 2,
    category: 'industry',
    researchCost: 150,
    researchTime: 730,
    requires: ['import_substitution'],
    effects: { sanctionsImpact: -30, gdpVolatility: -50 },
    passiveBonus: true,
    completed: false,
    researching: false,
  },
  {
    id: 'social_safety_net',
    name: '社会保障网',
    icon: '🛡️',
    description: '建立全面的失业救济和低保体系',
    tier: 1,
    category: 'social',
    researchCost: 70,
    researchTime: 180,
    requires: [],
    effects: { militancy: -15, approval: +10, stability: +5 },
    passiveBonus: true,
    completed: false,
    researching: false,
  },
  {
    id: 'pension_reform',
    name: '养老金改革',
    icon: '👴',
    description: '可持续的养老金制度',
    tier: 2,
    category: 'social',
    researchCost: 90,
    researchTime: 365,
    requires: ['social_safety_net'],
    effects: { debt: -100, approval: -10, stability: -5, longtermStability: +20 },
    passiveBonus: true,
    completed: false,
    researching: false,
  },
  {
    id: 'healthcare_modernization',
    name: '医疗现代化',
    icon: '🏥',
    description: '全面升级公共卫生系统',
    tier: 2,
    category: 'social',
    researchCost: 120,
    researchTime: 365,
    requires: ['social_safety_net'],
    effects: { approval: +15, pandemicResilience: +50 },
    passiveBonus: true,
    completed: false,
    researching: false,
  },
]

export const HISTORICAL_EVENTS_2019 = [
  {
    id: 'covid_outbreak',
    name: '新冠疫情爆发',
    date: { year: 2020, month: 3, day: 1 },
    description: 'WHO宣布新冠全球大流行',
    mandatory: true,
    effects: {
      gdpGrowth: -3,
      inflation: +2,
      unemployment: +3,
      stability: -5,
      approval: -5,
    },
    choices: [
      {
        name: '全面封城',
        effects: { gdpGrowth: -5, stability: +5, pandemicDeaths: 'low' },
      },
      {
        name: '群体免疫',
        effects: { gdpGrowth: -1, stability: -10, pandemicDeaths: 'high' },
      },
    ],
  },
  {
    id: '2022_invasion',
    name: '俄乌战争爆发',
    date: { year: 2022, month: 2, day: 24 },
    description: '全面入侵乌克兰，西方大规模制裁',
    mandatory: true,
    effects: {
      sanctionsImpact: +50,
      inflation: +15,
      capitalFlight: +100,
      brainDrain: +50,
      stability: -10,
      warWeariness: 0,
    },
    choices: [
      {
        name: '全面战争动员',
        effects: { warWeariness: +30, stability: +10, militancy: -10 },
      },
      {
        name: '特别军事行动',
        effects: { warWeariness: +10, stability: -5, militancy: +10 },
      },
    ],
  },
  {
    id: 'energy_crisis_2022',
    name: '欧洲能源危机',
    date: { year: 2022, month: 9, day: 1 },
    description: '北溪管道爆炸，能源价格飙升',
    mandatory: true,
    effects: {
      inflation: +8,
      treasury: +150,
      currencyReserves: -80,
    },
  },
  {
    id: 'wagner_rebellion',
    name: '瓦格纳兵变',
    date: { year: 2023, month: 6, day: 24 },
    description: '普里戈任武装叛乱向莫斯科进军',
    mandatory: true,
    effects: {
      stability: -20,
      legitimacy: -15,
      approval: -10,
      militancy: +15,
    },
  },
]

export const START_DATE_2019 = { year: 2019, month: 1, day: 1 }

export function checkFocusAvailability(
  focus: FocusNode,
  completedFocuses: string[],
  state: Record<string, any>
): boolean {
  if (focus.completed) return false
  if (focus.mutuallyExclusive.some(id => completedFocuses.includes(id))) return false
  if (!focus.requires.every(id => completedFocuses.includes(id))) return false
  
  for (const [resource, amount] of Object.entries(focus.cost)) {
    if ((state[resource] || 0) < amount) return false
  }
  
  return true
}

export function applyFocusEffects(
  focus: FocusNode,
  state: Record<string, any>
): Record<string, any> {
  const newState = { ...state }
  
  for (const [key, value] of Object.entries(focus.effects)) {
    if (typeof value === 'number') {
      newState[key] = (newState[key] || 0) + value
    } else {
      newState[key] = value
    }
  }
  
  return newState
}

export function calculateFocusTreeProgress(
  completedFocuses: string[],
  allFocuses: FocusNode[]
): number {
  return Math.round((completedFocuses.length / allFocuses.length) * 100)
}
