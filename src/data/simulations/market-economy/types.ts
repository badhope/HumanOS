export interface Commodity {
  id: string
  name: string
  icon: string
  category: 'raw' | 'industrial' | 'consumer' | 'luxury'
  basePrice: number
  
  elasticity: number
  minPrice: number
  maxPrice: number
  
  weightPerUnit: number
  volumePerUnit: number
}

export interface MarketState {
  [commodityId: string]: {
    supply: number
    demand: number
    stock: number
    price: number
    priceTrend: 'rising' | 'falling' | 'stable'
    priceHistory: number[]
  }
}

export interface PopGroup {
  id: string
  name: string
  size: number
  income: number
  wealth: number
  
  consumption: { [commodityId: string]: number }
  needs: { [commodityId: string]: number }
  
  standardOfLiving: number
  approval: number
  literacy: number
}

export interface Building {
  id: string
  name: string
  type: 'production' | 'infrastructure' | 'service' | 'military'
  level: number
  workers: number
  maxWorkers: number
  
  inputs: { [commodityId: string]: number }
  outputs: { [commodityId: string]: number }
  operatingCosts: number
  profitability: number
  
  isActive: boolean
  efficiency: number
}

export interface Treasury {
  gold: number
  income: number
  expenses: number
  balance: number
  
  taxes: {
    income: number
    trade: number
    luxury: number
    land: number
  }
  
  subsidies: {
    agriculture: number
    industry: number
    poor: number
  }
  
  debt: number
  interestRate: number
}

export interface NationalStats {
  population: number
  gdp: number
  gdpPerCapita: number
  inflation: number
  unemployment: number
  
  stability: number
  legitimacy: number
  bureaucracy: number
  
  infrastructure: number
  education: number
  health: number
  military: number
}

export type GameStatus = 'running' | 'victory' | 'defeat'

export interface NationalSpirit {
  id: string
  name: string
  icon: string
  description: string
  effects: {
    type: string
    value: number
    description: string
  }[]
  isDebuff?: boolean
}

export interface Country {
  id: string
  name: string
  flag: string
  region: 'west' | 'east' | 'europe' | 'americas' | 'asia' | 'africa'
  difficulty: 1 | 2 | 3 | 4 | 5
  description: string
  politicalSystem?: string
  
  startingDate: {
    year: number
    month: number
    day: number
  }
  
  spirits: NationalSpirit[]
  
  initialStats: {
    population: number
    gdp: number
    inflation: number
    unemployment: number
    stability: number
    treasury: number
    debt: number
  }
  
  taxRates: {
    income: number
    trade: number
    luxury: number
    land: number
  }
  
  bonuses: {
    production: number
    research: number
    stability: number
    populationGrowth: number
    taxEfficiency: number
  }
  
  uniqueMechanics: string[]
  startingSituation: string
}

export type CountryId = 'usa' | 'china' | 'germany' | 'japan' | 'france' | 'uk' | 'russia' | 'india' | 'brazil' | 'southkorea'

export interface GameEndCondition {
  type: 'victory' | 'defeat'
  name: string
  description: string
  icon: string
}

export interface EconomyState {
  countryId: CountryId | null
  date: {
    year: number
    month: number
    day: number
  }
  day: number
  tick: number
  speed: 1 | 2 | 5 | 10
  
  gameStatus: GameStatus
  endCondition: GameEndCondition | null
  
  commodities: { [id: string]: Commodity }
  market: MarketState
  pops: PopGroup[]
  buildings: Building[]
  industries: { [id: string]: import('./vic3-types').Industry }
  treasury: Treasury
  stats: NationalStats
  
  nationalSpirits: NationalSpirit[]
  modifiers: Modifier[]
  policies: Policy[]
  laws: Law[]
  
  politicalCapital: number
  dailyPoliticalGain: number
  nationalFocuses: NationalFocus[]
  activeNationalFocus: string | null
  
  victoryConditions: VictoryDefeatCondition[]
  defeatConditions: VictoryDefeatCondition[]
  
  news: import('./vic3-types').NewsItem[]
  geopolitical: import('./vic3-types').GeoPoliticalState
  
  activeEvent: import('./vic3-types').WorldEvent | null
  
  interestGroups: import('./vic3-types').InterestGroup[]
  
  history: {
    day: number
    gdp: number
    inflation: number
    unemployment: number
    treasury: number
    debt: number
    stability: number
    population: number
  }[]
}

export interface Modifier {
  id: string
  name: string
  source: string
  duration: number
  effects: {
    market?: { [commodityId: string]: { supply?: number; demand?: number; price?: number } }
    pops?: { income?: number; consumption?: number; approval?: number }
    treasury?: { income?: number; expenses?: number; interestRate?: number }
    national?: { [stat in keyof NationalStats]?: number }
    production?: { efficiency?: number; input?: number; output?: number }
  }
}

export interface Policy {
  id: string
  name: string
  category: 'economy' | 'social' | 'labor' | 'trade' | 'finance'
  isActive: boolean
  icon?: string
  description?: string
  
  effects: Modifier['effects']
  implementationCost: number
  upkeep: number
  politicalCost: number
  implementationDays: number
  implementationProgress: number
  mutuallyExclusive?: string[]
  countries?: string[]
  
  requirements?: {
    stability?: number
    legitimacy?: number
    bureaucracy?: number
  }
}

export interface NationalFocus {
  id: string
  name: string
  icon: string
  description: string
  category: 'economy' | 'industry' | 'social' | 'military'
  duration: number
  progress: number
  isCompleted: boolean
  isActive: boolean
  requires?: string[]
  
  rewards: {
    type: 'spirit' | 'policy' | 'stats' | 'gold'
    id?: string
    effects?: Modifier['effects']
  }
}

export interface GameCondition {
  type: 'stability' | 'debt' | 'inflation' | 'unemployment' | 'treasury' | 'gdp'
  threshold: number
  comparison: 'above' | 'below'
  consecutiveDays: number
  currentDays: number
}

export interface VictoryDefeatCondition {
  id: string
  name: string
  description: string
  type: 'victory' | 'defeat'
  conditions: GameCondition[]
  isTriggered: boolean
}

export interface Law {
  id: string
  name: string
  category: 'taxation' | 'labor' | 'trade' | 'welfare'
  currentLevel: number
  maxLevel: number
  
  effectsPerLevel: Modifier['effects']
}

export interface TradeOrder {
  id: string
  commodityId: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  filled: number
  status: 'pending' | 'partial' | 'completed' | 'cancelled'
  dayCreated: number
  dayExpires?: number
}
