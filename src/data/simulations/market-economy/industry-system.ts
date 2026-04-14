import type { Industry } from './vic3-types'
import type { EconomyState } from './types'

export interface IndustryInput {
  commodity: string
  amount: number
  priceSensitivity: number
}

export interface IndustryOutput {
  commodity: string
  baseAmount: number
  economiesOfScale: number
}

const INDUSTRY_DEFINITIONS: Industry[] = [
  {
    id: 'grain_farming',
    name: '粮食种植业',
    category: 'primary',
    subCategory: '农业',
    level: 10,
    capacity: 1000,
    utilization: 0.85,
    capitalStock: 50000,
    investment: 500,
    profitMargin: 0.12,
    employees: 5000,
    averageWage: 35000,
    productivity: 1.0,
    inputs: { fertilizer: 0.1, energy: 0.05 },
    outputs: { grain: 1.0 },
    subsidies: 0,
    taxRate: 0.10,
    regulation: 0.20,
    marketShare: {},
  },
  {
    id: 'livestock',
    name: '畜牧业',
    category: 'primary',
    subCategory: '农业',
    level: 8,
    capacity: 800,
    utilization: 0.80,
    capitalStock: 40000,
    investment: 400,
    profitMargin: 0.15,
    employees: 3000,
    averageWage: 38000,
    productivity: 1.0,
    inputs: { grain: 0.5, energy: 0.1 },
    outputs: { meat: 0.7, leather: 0.2 },
    subsidies: 0,
    taxRate: 0.10,
    regulation: 0.25,
    marketShare: {},
  },
  {
    id: 'coal_mining',
    name: '煤炭开采业',
    category: 'primary',
    subCategory: '采矿',
    level: 12,
    capacity: 1500,
    utilization: 0.75,
    capitalStock: 120000,
    investment: 1200,
    profitMargin: 0.18,
    employees: 8000,
    averageWage: 55000,
    productivity: 1.0,
    inputs: { tools: 0.1, energy: 0.2 },
    outputs: { coal: 1.5 },
    subsidies: 0,
    taxRate: 0.15,
    regulation: 0.40,
    marketShare: {},
  },
  {
    id: 'oil_extraction',
    name: '石油开采业',
    category: 'primary',
    subCategory: '能源',
    level: 15,
    capacity: 2000,
    utilization: 0.90,
    capitalStock: 250000,
    investment: 2500,
    profitMargin: 0.35,
    employees: 6000,
    averageWage: 85000,
    productivity: 1.0,
    inputs: { machinery: 0.15, steel: 0.1 },
    outputs: { oil: 2.0 },
    subsidies: 0,
    taxRate: 0.25,
    regulation: 0.35,
    marketShare: {},
  },
  {
    id: 'iron_mining',
    name: '黑色金属矿采选',
    category: 'primary',
    subCategory: '采矿',
    level: 10,
    capacity: 1200,
    utilization: 0.82,
    capitalStock: 80000,
    investment: 800,
    profitMargin: 0.16,
    employees: 4500,
    averageWage: 52000,
    productivity: 1.0,
    inputs: { energy: 0.3, tools: 0.1 },
    outputs: { iron: 1.2 },
    subsidies: 0,
    taxRate: 0.15,
    regulation: 0.30,
    marketShare: {},
  },
  {
    id: 'steel_industry',
    name: '钢铁工业',
    category: 'secondary',
    subCategory: '重工业',
    level: 18,
    capacity: 2500,
    utilization: 0.70,
    capitalStock: 300000,
    investment: 3000,
    profitMargin: 0.08,
    employees: 12000,
    averageWage: 65000,
    productivity: 1.0,
    inputs: { iron: 1.5, coal: 2.0, energy: 0.5 },
    outputs: { steel: 1.8 },
    subsidies: 0,
    taxRate: 0.18,
    regulation: 0.45,
    marketShare: {},
  },
  {
    id: 'chemical_industry',
    name: '化学工业',
    category: 'secondary',
    subCategory: '重工业',
    level: 14,
    capacity: 1800,
    utilization: 0.78,
    capitalStock: 200000,
    investment: 2000,
    profitMargin: 0.14,
    employees: 7000,
    averageWage: 68000,
    productivity: 1.0,
    inputs: { oil: 0.8, energy: 0.4 },
    outputs: { chemicals: 1.0, fertilizer: 0.5 },
    subsidies: 0,
    taxRate: 0.18,
    regulation: 0.50,
    marketShare: {},
  },
  {
    id: 'machinery_manufacturing',
    name: '通用设备制造业',
    category: 'secondary',
    subCategory: '制造业',
    level: 16,
    capacity: 2000,
    utilization: 0.82,
    capitalStock: 220000,
    investment: 2200,
    profitMargin: 0.12,
    employees: 15000,
    averageWage: 70000,
    productivity: 1.0,
    inputs: { steel: 0.8, electronics: 0.2 },
    outputs: { machinery: 1.0, tools: 0.5 },
    subsidies: 0,
    taxRate: 0.17,
    regulation: 0.30,
    marketShare: {},
  },
  {
    id: 'automotive',
    name: '汽车制造业',
    category: 'secondary',
    subCategory: '制造业',
    level: 20,
    capacity: 3000,
    utilization: 0.75,
    capitalStock: 400000,
    investment: 4000,
    profitMargin: 0.10,
    employees: 25000,
    averageWage: 75000,
    productivity: 1.0,
    inputs: { steel: 0.6, machinery: 0.2, electronics: 0.3 },
    outputs: { automobiles: 1.0 },
    subsidies: 0,
    taxRate: 0.20,
    regulation: 0.55,
    marketShare: {},
  },
  {
    id: 'electronics',
    name: '电子信息制造业',
    category: 'secondary',
    subCategory: '制造业',
    level: 18,
    capacity: 2200,
    utilization: 0.85,
    capitalStock: 350000,
    investment: 3500,
    profitMargin: 0.18,
    employees: 20000,
    averageWage: 80000,
    productivity: 1.0,
    inputs: { chemicals: 0.3, energy: 0.2 },
    outputs: { electronics: 1.2 },
    subsidies: 0,
    taxRate: 0.15,
    regulation: 0.25,
    marketShare: {},
  },
  {
    id: 'textile_industry',
    name: '纺织服装业',
    category: 'secondary',
    subCategory: '轻工业',
    level: 12,
    capacity: 3500,
    utilization: 0.80,
    capitalStock: 80000,
    investment: 800,
    profitMargin: 0.07,
    employees: 30000,
    averageWage: 35000,
    productivity: 1.0,
    inputs: { cotton: 1.0, chemicals: 0.2 },
    outputs: { cloth: 1.5 },
    subsidies: 0,
    taxRate: 0.15,
    regulation: 0.25,
    marketShare: {},
  },
  {
    id: 'construction_industry',
    name: '建筑业',
    category: 'secondary',
    subCategory: '建筑业',
    level: 25,
    capacity: 5000,
    utilization: 0.88,
    capitalStock: 150000,
    investment: 1500,
    profitMargin: 0.06,
    employees: 40000,
    averageWage: 45000,
    productivity: 1.0,
    inputs: { steel: 0.4, cement: 0.8, machinery: 0.1 },
    outputs: { construction: 2.0 },
    subsidies: 0,
    taxRate: 0.13,
    regulation: 0.40,
    marketShare: {},
  },
  {
    id: 'cement_industry',
    name: '水泥建材业',
    category: 'secondary',
    subCategory: '重工业',
    level: 15,
    capacity: 4000,
    utilization: 0.65,
    capitalStock: 100000,
    investment: 1000,
    profitMargin: 0.09,
    employees: 8000,
    averageWage: 48000,
    productivity: 1.0,
    inputs: { coal: 0.5, energy: 0.3 },
    outputs: { cement: 2.5 },
    subsidies: 0,
    taxRate: 0.16,
    regulation: 0.50,
    marketShare: {},
  },
  {
    id: 'power_generation',
    name: '电力生产业',
    category: 'primary',
    subCategory: '能源',
    level: 22,
    capacity: 5000,
    utilization: 0.92,
    capitalStock: 450000,
    investment: 4500,
    profitMargin: 0.11,
    employees: 12000,
    averageWage: 72000,
    productivity: 1.0,
    inputs: { coal: 0.8, oil: 0.2 },
    outputs: { energy: 5.0 },
    subsidies: 0,
    taxRate: 0.12,
    regulation: 0.45,
    marketShare: {},
  },
  {
    id: 'retail_trade',
    name: '零售批发业',
    category: 'tertiary',
    subCategory: '商贸流通',
    level: 30,
    capacity: 8000,
    utilization: 0.95,
    capitalStock: 200000,
    investment: 2000,
    profitMargin: 0.05,
    employees: 60000,
    averageWage: 32000,
    productivity: 1.0,
    inputs: {},
    outputs: { services: 3.0 },
    subsidies: 0,
    taxRate: 0.17,
    regulation: 0.20,
    marketShare: {},
  },
  {
    id: 'financial_services',
    name: '金融服务业',
    category: 'tertiary',
    subCategory: '金融',
    level: 25,
    capacity: 3000,
    utilization: 0.90,
    capitalStock: 800000,
    investment: 8000,
    profitMargin: 0.25,
    employees: 15000,
    averageWage: 120000,
    productivity: 1.0,
    inputs: { services: 0.5 },
    outputs: { financial_services: 2.0 },
    subsidies: 0,
    taxRate: 0.25,
    regulation: 0.60,
    marketShare: {},
  },
  {
    id: 'real_estate',
    name: '房地产业',
    category: 'tertiary',
    subCategory: '服务业',
    level: 28,
    capacity: 4000,
    utilization: 0.85,
    capitalStock: 600000,
    investment: 6000,
    profitMargin: 0.20,
    employees: 10000,
    averageWage: 85000,
    productivity: 1.0,
    inputs: { construction: 0.3, financial_services: 0.2 },
    outputs: { services: 2.5 },
    subsidies: 0,
    taxRate: 0.22,
    regulation: 0.50,
    marketShare: {},
  },
  {
    id: 'transportation',
    name: '交通运输业',
    category: 'tertiary',
    subCategory: '基础设施',
    level: 24,
    capacity: 5000,
    utilization: 0.88,
    capitalStock: 500000,
    investment: 5000,
    profitMargin: 0.08,
    employees: 25000,
    averageWage: 55000,
    productivity: 1.0,
    inputs: { energy: 1.0, machinery: 0.2 },
    outputs: { services: 3.0 },
    subsidies: 0,
    taxRate: 0.10,
    regulation: 0.40,
    marketShare: {},
  },
  {
    id: 'healthcare',
    name: '医疗健康业',
    category: 'tertiary',
    subCategory: '公共服务',
    level: 20,
    capacity: 3500,
    utilization: 0.95,
    capitalStock: 300000,
    investment: 3000,
    profitMargin: 0.12,
    employees: 35000,
    averageWage: 75000,
    productivity: 1.0,
    inputs: { chemicals: 0.5, services: 0.3 },
    outputs: { services: 2.0 },
    subsidies: 0,
    taxRate: 0.08,
    regulation: 0.65,
    marketShare: {},
  },
  {
    id: 'education',
    name: '教育服务业',
    category: 'tertiary',
    subCategory: '公共服务',
    level: 22,
    capacity: 4000,
    utilization: 0.92,
    capitalStock: 250000,
    investment: 2500,
    profitMargin: 0.05,
    employees: 30000,
    averageWage: 58000,
    productivity: 1.0,
    inputs: { services: 0.4 },
    outputs: { human_capital: 1.5 },
    subsidies: 0,
    taxRate: 0.05,
    regulation: 0.45,
    marketShare: {},
  },
  {
    id: 'software_it',
    name: '软件与信息技术',
    category: 'quaternary',
    subCategory: '数字经济',
    level: 25,
    capacity: 3000,
    utilization: 0.95,
    capitalStock: 200000,
    investment: 4000,
    profitMargin: 0.28,
    employees: 20000,
    averageWage: 110000,
    productivity: 1.0,
    inputs: { electronics: 0.3, energy: 0.4 },
    outputs: { digital_services: 2.5 },
    subsidies: 0,
    taxRate: 0.12,
    regulation: 0.15,
    marketShare: {},
  },
  {
    id: 'pharmaceuticals',
    name: '医药制造业',
    category: 'secondary',
    subCategory: '制造业',
    level: 18,
    capacity: 1500,
    utilization: 0.90,
    capitalStock: 350000,
    investment: 5000,
    profitMargin: 0.35,
    employees: 12000,
    averageWage: 95000,
    productivity: 1.0,
    inputs: { chemicals: 1.0, services: 0.3 },
    outputs: { pharmaceuticals: 1.0 },
    subsidies: 0,
    taxRate: 0.18,
    regulation: 0.75,
    marketShare: {},
  },
  {
    id: 'aerospace',
    name: '航空航天工业',
    category: 'secondary',
    subCategory: '高端制造',
    level: 12,
    capacity: 500,
    utilization: 0.85,
    capitalStock: 400000,
    investment: 6000,
    profitMargin: 0.15,
    employees: 8000,
    averageWage: 95000,
    productivity: 1.0,
    inputs: { machinery: 0.8, electronics: 0.6, steel: 0.4 },
    outputs: { aerospace: 0.5 },
    subsidies: 0,
    taxRate: 0.15,
    regulation: 0.70,
    marketShare: {},
  },
  {
    id: 'agriculture_tech',
    name: '农业科技',
    category: 'quaternary',
    subCategory: '科技服务',
    level: 8,
    capacity: 800,
    utilization: 0.80,
    capitalStock: 50000,
    investment: 1000,
    profitMargin: 0.22,
    employees: 3000,
    averageWage: 70000,
    productivity: 1.0,
    inputs: { chemicals: 0.4, digital_services: 0.3 },
    outputs: { services: 0.8 },
    subsidies: 0,
    taxRate: 0.10,
    regulation: 0.20,
    marketShare: {},
  },
]

export function getDefaultIndustries(countryId: string): { [id: string]: Industry } {
  const industries: { [id: string]: Industry } = {}
  
  const modifiers: { [key: string]: number } = {
    china: 1.8,
    usa: 1.5,
    germany: 1.3,
    japan: 1.2,
    eu: 1.4,
    default: 1.0,
  }
  
  const modifier = modifiers[countryId] || modifiers.default
  
  INDUSTRY_DEFINITIONS.forEach(industry => {
    const adjustedIndustry = JSON.parse(JSON.stringify(industry)) as Industry
    adjustedIndustry.level = Math.round(industry.level * modifier)
    adjustedIndustry.capacity = Math.round(industry.capacity * modifier)
    adjustedIndustry.capitalStock = Math.round(industry.capitalStock * modifier)
    
    if (countryId === 'china') {
      if (['steel_industry', 'construction_industry', 'cement_industry', 'machinery_manufacturing'].includes(industry.id)) {
        adjustedIndustry.level = Math.round(adjustedIndustry.level * 1.5)
        adjustedIndustry.capacity = Math.round(adjustedIndustry.capacity * 1.5)
      }
      if (industry.category === 'quaternary') {
        adjustedIndustry.level = Math.round(adjustedIndustry.level * 0.8)
      }
    }
    
    if (countryId === 'usa') {
      if (['software_it', 'pharmaceuticals', 'aerospace', 'financial_services'].includes(industry.id)) {
        adjustedIndustry.level = Math.round(adjustedIndustry.level * 1.5)
        adjustedIndustry.capacity = Math.round(adjustedIndustry.capacity * 1.5)
      }
    }
    
    if (countryId === 'germany') {
      if (['automotive', 'machinery_manufacturing', 'chemical_industry'].includes(industry.id)) {
        adjustedIndustry.level = Math.round(adjustedIndustry.level * 1.4)
      }
    }
    
    industries[industry.id] = adjustedIndustry
  })
  
  return industries
}

export function calculateIndustryOutput(industry: Industry): number {
  return industry.level * industry.capacity * industry.utilization * industry.productivity
}

export function calculateIndustryEmployment(industry: Industry): number {
  return industry.employees * industry.utilization
}

export function investInIndustry(
  state: EconomyState,
  industryId: string,
  amount: number
): { state: EconomyState; success: boolean; message: string } {
  const newState = JSON.parse(JSON.stringify(state)) as EconomyState
  
  if (!newState.industries || !newState.industries[industryId]) {
    return { state, success: false, message: '行业不存在' }
  }
  
  if (newState.treasury.gold < amount) {
    return { state, success: false, message: '资金不足' }
  }
  
  const industry = newState.industries[industryId]
  industry.investment += amount
  industry.capitalStock += amount
  
  const expansionChance = amount / industry.capitalStock
  
  if (Math.random() < expansionChance) {
    industry.level += 1
    industry.capacity = Math.round(industry.capacity * 1.1)
    return {
      state: newState,
      success: true,
      message: `${industry.name}成功升级到等级 ${industry.level}！产能提升10%。`,
    }
  }
  
  industry.productivity *= 1.02
  return {
    state: newState,
    success: true,
    message: `完成${industry.name}技术改造。生产效率提升2%。`,
  }
}

export function adjustIndustryRegulation(
  state: EconomyState,
  industryId: string,
  newRegulation: number
): EconomyState {
  const newState = JSON.parse(JSON.stringify(state)) as EconomyState
  
  if (newState.industries && newState.industries[industryId]) {
    const industry = newState.industries[industryId]
    const oldRegulation = industry.regulation
    
    industry.regulation = Math.max(0, Math.min(1, newRegulation))
    
    if (newRegulation > oldRegulation) {
      industry.profitMargin -= 0.02
      industry.productivity *= 0.98
    } else {
      industry.profitMargin += 0.015
    }
  }
  
  return newState
}

export function processIndustryTick(state: EconomyState): EconomyState {
  const newState = JSON.parse(JSON.stringify(state)) as EconomyState
  
  if (!newState.industries) return newState
  
  Object.values(newState.industries).forEach(industry => {
    const randomFactor = 0.98 + Math.random() * 0.04
    industry.utilization = Math.max(0.5, Math.min(0.99, industry.utilization * randomFactor))
    
    if (industry.investment > industry.capitalStock * 0.01) {
      industry.productivity *= 1.001
    }
  })
  
  return newState
}
