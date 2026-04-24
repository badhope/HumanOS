import type { EconomyState } from './types'
import { deepClone } from './economy-engine'

export type PoliticalSystemType = 'parliamentary' | 'presidential' | 'one_party' | 'authoritarian' | 'hybrid'

export interface PoliticalParty {
  id: string
  name: string
  ideology: 'conservative' | 'liberal' | 'socialist' | 'nationalist' | 'populist' | 'technocratic'
  seats: number
  approval: number
  supportedPolicies: string[]
  opposedPolicies: string[]
}

export interface Parliament {
  totalSeats: number
  majorityThreshold: number
  parties: PoliticalParty[]
  rulingCoalition: string[]
  opposition: string[]
  billsVoted: number
  billsPassed: number
}

export interface Bureaucracy {
  efficiency: number
  corruption: number
  capacity: number
  implementationDelay: number
}

export interface PoliticalSystem {
  type: PoliticalSystemType
  systemName: string
  description: string
  
  parliament?: Parliament
  bureaucracy: Bureaucracy
  
  policyImplementationCost: number
  policyImplementationTime: number
  executivePower: number
  legislativeChecks: number
  
  activeLaws: string[]
  pendingLaws: {
    policyId: string
    dayProposed: number
    daysUntilVote: number
    support: number
  }[]
}

const COUNTRY_POLITICAL_SYSTEMS: { [key: string]: PoliticalSystem } = {
  usa: {
    type: 'presidential',
    systemName: '总统制 + 三权分立',
    description: '美国式自由民主制度，政策实施需要国会两院批准。两党斗争激烈，重大法案通过困难。',
    
    parliament: {
      totalSeats: 535,
      majorityThreshold: 268,
      parties: [
        { id: 'democrat', name: '民主党', ideology: 'liberal', seats: 220, approval: 45, supportedPolicies: ['welfare', 'green_new_deal', 'minimum_wage'], opposedPolicies: ['tax_cut', 'deregulation'] },
        { id: 'republican', name: '共和党', ideology: 'conservative', seats: 215, approval: 42, supportedPolicies: ['tax_cut', 'deregulation', 'military'], opposedPolicies: ['welfare', 'minimum_wage'] },
      ],
      rulingCoalition: ['democrat'],
      opposition: ['republican'],
      billsVoted: 0,
      billsPassed: 0,
    },
    bureaucracy: {
      efficiency: 65,
      corruption: 15,
      capacity: 80,
      implementationDelay: 2,
    },
    
    policyImplementationCost: 2000,
    policyImplementationTime: 14,
    executivePower: 50,
    legislativeChecks: 80,
    
    activeLaws: [],
    pendingLaws: [],
  },
  
  china: {
    type: 'one_party',
    systemName: '中国特色社会主义',
    description: '中央集权制度，政策实施迅速有力。强大的执行能力，但需要庞大的官僚体系。',
    
    bureaucracy: {
      efficiency: 75,
      corruption: 25,
      capacity: 95,
      implementationDelay: 1,
    },
    
    policyImplementationCost: 1500,
    policyImplementationTime: 3,
    executivePower: 95,
    legislativeChecks: 10,
    
    activeLaws: [],
    pendingLaws: [],
  },
  
  russia: {
    type: 'authoritarian',
    systemName: '强势总统制',
    description: '高度集权的总统制，行政权力极大。政策实施快但容易出现腐败问题。',
    
    parliament: {
      totalSeats: 450,
      majorityThreshold: 226,
      parties: [
        { id: 'united_russia', name: '统一俄罗斯', ideology: 'nationalist', seats: 325, approval: 55, supportedPolicies: [], opposedPolicies: [] },
      ],
      rulingCoalition: ['united_russia'],
      opposition: [],
      billsVoted: 0,
      billsPassed: 0,
    },
    bureaucracy: {
      efficiency: 55,
      corruption: 40,
      capacity: 70,
      implementationDelay: 2,
    },
    
    policyImplementationCost: 1800,
    policyImplementationTime: 5,
    executivePower: 90,
    legislativeChecks: 15,
    
    activeLaws: [],
    pendingLaws: [],
  },
  
  eu: {
    type: 'hybrid',
    systemName: '欧盟超国家治理',
    description: '复杂的多层治理体系。政策协调成本高，需要各国共识。',
    
    parliament: {
      totalSeats: 705,
      majorityThreshold: 353,
      parties: [
        { id: 'epp', name: '欧洲人民党', ideology: 'conservative', seats: 180, approval: 40, supportedPolicies: [], opposedPolicies: [] },
        { id: 'sd', name: '社会民主党', ideology: 'socialist', seats: 145, approval: 38, supportedPolicies: [], opposedPolicies: [] },
      ],
      rulingCoalition: ['epp', 'sd'],
      opposition: [],
      billsVoted: 0,
      billsPassed: 0,
    },
    bureaucracy: {
      efficiency: 50,
      corruption: 12,
      capacity: 85,
      implementationDelay: 4,
    },
    
    policyImplementationCost: 3500,
    policyImplementationTime: 30,
    executivePower: 30,
    legislativeChecks: 95,
    
    activeLaws: [],
    pendingLaws: [],
  },
  
  default: {
    type: 'parliamentary',
    systemName: '议会民主制',
    description: '标准议会民主制度，多党竞争联合执政。',
    
    parliament: {
      totalSeats: 300,
      majorityThreshold: 151,
      parties: [],
      rulingCoalition: [],
      opposition: [],
      billsVoted: 0,
      billsPassed: 0,
    },
    bureaucracy: {
      efficiency: 60,
      corruption: 20,
      capacity: 70,
      implementationDelay: 3,
    },
    
    policyImplementationCost: 2000,
    policyImplementationTime: 10,
    executivePower: 60,
    legislativeChecks: 70,
    
    activeLaws: [],
    pendingLaws: [],
  },
}

export function getPoliticalSystem(countryId: string): PoliticalSystem {
  return deepClone(COUNTRY_POLITICAL_SYSTEMS[countryId] || COUNTRY_POLITICAL_SYSTEMS.default)
}

export function proposePolicy(
  politicalSystem: PoliticalSystem,
  policyId: string,
  state: EconomyState
): { politicalSystem: PoliticalSystem; success: boolean; message: string } {
  const newSystem = deepClone(politicalSystem)
  
  if (state.treasury.gold < newSystem.policyImplementationCost) {
    return {
      politicalSystem,
      success: false,
      message: `财政资源不足。实施需要¥${newSystem.policyImplementationCost}`,
    }
  }
  
  if (newSystem.type === 'one_party' || newSystem.type === 'authoritarian') {
    return {
      politicalSystem: newSystem,
      success: true,
      message: `政策已批准。将在${newSystem.policyImplementationTime}天后生效。`,
    }
  }
  
  if (newSystem.parliament) {
    const rulingSeats = newSystem.parliament.rulingCoalition.reduce(
      (sum, partyId) => sum + (newSystem.parliament!.parties.find(p => p.id === partyId)?.seats || 0),
      0
    )
    
    const hasMajority = rulingSeats >= newSystem.parliament.majorityThreshold
    
    if (!hasMajority) {
      return {
        politicalSystem,
        success: false,
        message: `执政联盟失去议会多数。法案无法通过。`,
      }
    }
    
    const passageChance = 0.3 + (rulingSeats / newSystem.parliament.totalSeats) * 0.5
    
    if (Math.random() < passageChance) {
      newSystem.parliament.billsVoted++
      newSystem.parliament.billsPassed++
      
      return {
        politicalSystem: newSystem,
        success: true,
        message: `议会投票通过。将在${newSystem.policyImplementationTime}天后生效。`,
      }
    } else {
      newSystem.parliament.billsVoted++
      
      return {
        politicalSystem: newSystem,
        success: false,
        message: `议会投票失败。党内出现反叛票。`,
      }
    }
  }
  
  return { politicalSystem: newSystem, success: true, message: '政策已批准。' }
}

export function processPendingLaws(
  politicalSystem: PoliticalSystem,
  state: EconomyState
): { politicalSystem: PoliticalSystem; enactedPolicies: string[] } {
  const newSystem = deepClone(politicalSystem)
  const enactedPolicies: string[] = []
  
  newSystem.pendingLaws = newSystem.pendingLaws.filter(law => {
    law.daysUntilVote--
    
    if (law.daysUntilVote <= 0) {
      enactedPolicies.push(law.policyId)
      newSystem.activeLaws.push(law.policyId)
      return false
    }
    
    return true
  })
  
  return { politicalSystem: newSystem, enactedPolicies }
}

export const EXPANDED_POLICIES = [
  {
    id: 'industrial_policy',
    name: '产业政策2035',
    category: 'economy',
    description: '国家主导的产业升级计划',
    implementationCost: 25000,
    upkeep: 2000,
    requirements: { stability: 50, bureaucracy: 60 },
    effects: [
      { type: 'gdp_growth', value: 2 },
      { type: 'treasury', value: -2000 },
      { type: 'bureaucracy', value: 5 },
    ],
    onlyForCountries: ['china'],
  },
  {
    id: 'green_new_deal',
    name: '绿色新政',
    category: 'economy',
    description: '万亿美元级能源转型计划',
    implementationCost: 50000,
    upkeep: 3500,
    requirements: { stability: 45 },
    effects: [
      { type: 'inflation', value: 3 },
      { type: 'unemployment', value: -4 },
      { type: 'treasury', value: -3500 },
    ],
    onlyForCountries: ['usa', 'eu'],
  },
  {
    id: 'made_in_usa',
    name: '美国制造法案',
    category: 'economy',
    description: '制造业回流补贴计划',
    implementationCost: 35000,
    upkeep: 2500,
    requirements: {},
    effects: [
      { type: 'unemployment', value: -3 },
      { type: 'inflation', value: 2 },
      { type: 'treasury', value: -2500 },
    ],
    onlyForCountries: ['usa'],
  },
  {
    id: 'belt_and_road',
    name: '一带一路倡议',
    category: 'diplomatic',
    description: '全球基础设施投资计划',
    implementationCost: 100000,
    upkeep: 5000,
    requirements: { stability: 60 },
    effects: [
      { type: 'soft_power', value: 20 },
      { type: 'treasury', value: -5000 },
      { type: 'gdp_growth', value: 1 },
    ],
    onlyForCountries: ['china'],
  },
  {
    id: 'defense_mobilization',
    name: '国防动员体制',
    category: 'military',
    description: '战时经济动员准备',
    implementationCost: 20000,
    upkeep: 3000,
    requirements: { stability: 55 },
    effects: [
      { type: 'military_power', value: 30 },
      { type: 'unemployment', value: -5 },
      { type: 'inflation', value: 4 },
    ],
    onlyForCountries: ['russia'],
  },
  {
    id: 'brexit_dividend',
    name: '脱欧红利释放',
    category: 'economy',
    description: '独立监管框架下的经济改革',
    implementationCost: 15000,
    upkeep: 1000,
    requirements: {},
    effects: [
      { type: 'bureaucracy', value: -10 },
      { type: 'inflation', value: -1 },
      { type: 'treasury', value: 1000 },
    ],
    onlyForCountries: ['uk'],
  },
  {
    id: 'central_bank_digital_currency',
    name: '央行数字货币',
    category: 'finance',
    description: '推出国家数字货币',
    implementationCost: 30000,
    upkeep: 1500,
    requirements: { bureaucracy: 70 },
    effects: [
      { type: 'bureaucracy', value: 10 },
      { type: 'treasury', value: 2500 },
      { type: 'pop_approval', value: -5 },
    ],
    onlyForCountries: ['china', 'eu'],
  },
  {
    id: 'universal_basic_income',
    name: '全民基本收入',
    category: 'social',
    description: '无条件全民基本收入保障',
    implementationCost: 80000,
    upkeep: 10000,
    requirements: { stability: 70, legitimacy: 80 },
    effects: [
      { type: 'pop_approval', value: 25 },
      { type: 'stability', value: 15 },
      { type: 'treasury', value: -10000 },
      { type: 'unemployment', value: 3 },
    ],
    onlyForCountries: [],
  },
  {
    id: 'nuclear_energy_program',
    name: '大规模核电计划',
    category: 'infrastructure',
    description: '建设新一代核电站群',
    implementationCost: 100000,
    upkeep: 5000,
    requirements: { bureaucracy: 65 },
    effects: [
      { type: 'energy_price', value: -30 },
      { type: 'inflation', value: -2 },
      { type: 'treasury', value: -5000 },
    ],
    onlyForCountries: [],
  },
  {
    id: 'ai_superpower',
    name: '人工智能国家战略',
    category: 'tech',
    description: '举国体制发展通用人工智能',
    implementationCost: 150000,
    upkeep: 8000,
    requirements: { stability: 50, bureaucracy: 75 },
    effects: [
      { type: 'productivity', value: 15 },
      { type: 'gdp_growth', value: 3 },
      { type: 'treasury', value: -8000 },
      { type: 'unemployment', value: 2 },
    ],
    onlyForCountries: ['usa', 'china', 'eu'],
  },
]
