import type { PopGroup } from './types'

export interface ProductionMethod {
  id: string
  name: string
  icon: string
  
  inputs: { [commodityId: string]: number }
  outputs: { [commodityId: string]: number }
  
  laborRatio: number
  capitalIntensity: number
  
  requiredTech: string[]
  requiredInfrastructure: number
}

export interface InterestGroup {
  id: 'landowners' | 'industrialists' | 'trade_unions' | 'peasants' | 'army' | 'clergy' | 'intelligentsia'
  name: string
  icon: string
  
  power: number
  approval: number
  radicalism: number
  
  ideology: 'conservative' | 'liberal' | 'socialist' | 'fascist' | 'communist'
  
  supportedPolicies: string[]
  opposedPolicies: string[]
  
  members: string[]
}

export interface CountryAI {
  countryId: string
  
  personality: 'aggressive' | 'passive' | 'balanced' | 'mercantilist'
  
  priorities: {
    economic_growth: number
    military_power: number
    social_welfare: number
    autarky: number
  }
  
  relations: { [countryId: string]: number }
  
  lastActions: {
    day: number
    action: string
  }[]
}

export interface InternationalRelation {
  from: string
  to: string
  value: number
  tradeAgreement: boolean
  tariff: number
  sanctions: boolean
  militaryAlliance: boolean
}

export interface GlobalPower {
  id: string
  gdp: number
  military: number
  softPower: number
  sphereOfInfluence: string[]
}

export interface SupplyChainLink {
  exporters: string[]
  importers: string[]
  globalPrice: number
  tradeVolume: number
}

export interface ActiveSanction {
  from: string
  to: string
  commodities: string[]
  dailyDamage: number
}

export interface GeoPoliticalState {
  countries: { [key: string]: GlobalPower }
  relations: InternationalRelation[]
  globalSupplyChain: { [commodity: string]: SupplyChainLink }
  activeSanctions: ActiveSanction[]
}

export interface Industry {
  id: string
  name: string
  category: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
  subCategory: string
  
  level: number
  capacity: number
  utilization: number
  capitalStock: number
  investment: number
  profitMargin: number
  
  employees: number
  averageWage: number
  productivity: number
  
  inputs: { [commodity: string]: number }
  outputs: { [commodity: string]: number }
  
  subsidies: number
  taxRate: number
  regulation: number
  
  marketShare: { [company: string]: number }
}

export interface NewsItem {
  id: string
  day: number
  category: 'economic' | 'diplomatic' | 'military' | 'social' | 'tech'
  severity: 'minor' | 'normal' | 'major'
  headline: string
  content: string
  country?: string
  relatedCountry?: string
  isRead: boolean
}

export interface SectorBreakdown {
  primary: {
    agriculture: number
    mining: number
    energy: number
    totalOutput: number
    totalEmployment: number
  }
  secondary: {
    heavyIndustry: number
    lightIndustry: number
    manufacturing: number
    construction: number
    totalOutput: number
    totalEmployment: number
  }
  tertiary: {
    finance: number
    retail: number
    services: number
    government: number
    totalOutput: number
    totalEmployment: number
  }
}

export interface WorldEvent {
  id: string
  name: string
  icon: string
  severity: 'minor' | 'major' | 'catastrophic' | 'positive'
  
  probability: number
  cooldownDays: number
  countries?: string[]
  
  triggerConditions: {
    minDay?: number
    minInflation?: number
    maxInflation?: number
    minUnemployment?: number
    minStability?: number
    maxStability?: number
    minTreasury?: number
    maxTreasury?: number
    minDebtToGdp?: number
    maxDebtToGdp?: number
    dayOfYear?: number[]
    requiredSpirit?: string
    requiredPolicy?: string
  }
  
  effects: {
    type: 'price_shock' | 'supply_shock' | 'demand_shock' | 'instability' | 'pop_approval' | 'treasury' | 'spirit' | 'inflation' | 'unemployment' | 'bureaucracy' | 'debt' | 'stability' | 'legitimacy'
    target?: string
    value: number
    duration: number
  }[]
  
  options: {
    text: string
    effects: {
      type: string
      value: number
    }[]
    aiSelectionWeight: number
  }[]
}
