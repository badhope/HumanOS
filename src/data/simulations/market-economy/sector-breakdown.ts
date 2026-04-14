import type { EconomyState } from './types'
import type { SectorBreakdown } from './vic3-types'

export function calculateSectorBreakdown(state: EconomyState): SectorBreakdown {
  const primaryCommodities = ['grain', 'iron', 'coal', 'oil', 'cotton']
  const secondaryCommodities = ['steel', 'tools', 'cloth', 'cement', 'machinery', 'chemicals']
  const tertiaryWeight = calculateTertiaryWeight(state)
  
  let primaryOutput = 0
  let secondaryOutput = 0
  let primaryEmployment = 0
  let secondaryEmployment = 0
  
  Object.values(state.buildings).forEach(building => {
    if (!building.isActive || building.workers === 0) return
    
    const outputs = Object.keys(building.outputs)
    const isPrimary = outputs.some(o => primaryCommodities.includes(o))
    const isSecondary = outputs.some(o => secondaryCommodities.includes(o))
    
    const buildingOutput = building.level * building.efficiency * 100
    
    if (isPrimary) {
      primaryOutput += buildingOutput
      primaryEmployment += building.workers
    } else if (isSecondary) {
      secondaryOutput += buildingOutput
      secondaryEmployment += building.workers
    }
  })
  
  const totalGdp = state.stats.gdp
  const tertiaryOutput = totalGdp * tertiaryWeight
  const totalEmployment = state.stats.population * (1 - state.stats.unemployment / 100)
  const tertiaryEmployment = totalEmployment * tertiaryWeight
  
  const agricultureRatio = 0.45
  const miningRatio = 0.30
  const energyRatio = 0.25
  
  const heavyIndustryRatio = 0.35
  const lightIndustryRatio = 0.30
  const manufacturingRatio = 0.25
  const constructionRatio = 0.10
  
  const financeRatio = 0.15
  const retailRatio = 0.35
  const servicesRatio = 0.35
  const governmentRatio = 0.15
  
  return {
    primary: {
      agriculture: primaryOutput * agricultureRatio,
      mining: primaryOutput * miningRatio,
      energy: primaryOutput * energyRatio,
      totalEmployment: primaryEmployment,
      totalOutput: primaryOutput,
    },
    secondary: {
      heavyIndustry: secondaryOutput * heavyIndustryRatio,
      lightIndustry: secondaryOutput * lightIndustryRatio,
      manufacturing: secondaryOutput * manufacturingRatio,
      construction: secondaryOutput * constructionRatio,
      totalEmployment: secondaryEmployment,
      totalOutput: secondaryOutput,
    },
    tertiary: {
      finance: tertiaryOutput * financeRatio,
      retail: tertiaryOutput * retailRatio,
      services: tertiaryOutput * servicesRatio,
      government: tertiaryOutput * governmentRatio,
      totalEmployment: tertiaryEmployment,
      totalOutput: tertiaryOutput,
    },
  }
}

function calculateTertiaryWeight(state: EconomyState): number {
  const gdpPerCapita = state.stats.gdp / Math.max(1, state.stats.population)
  
  const baseTertiary = 0.35
  
  const gdpBonus = Math.min(0.30, gdpPerCapita / 50000 * 0.15)
  
  const urbanBonus = 0.05
  
  const techBonus = state.policies.filter(p => p.isActive && p.category === 'economy').length * 0.02
  
  return Math.min(0.80, baseTertiary + gdpBonus + urbanBonus + techBonus)
}

export function getSectorEmploymentByType(
  breakdown: SectorBreakdown,
  sector: 'primary' | 'secondary' | 'tertiary'
): number {
  return breakdown[sector].totalEmployment
}

export function getSectorOutputByType(
  breakdown: SectorBreakdown,
  sector: 'primary' | 'secondary' | 'tertiary'
): number {
  return breakdown[sector].totalOutput
}

export function formatSectorName(sector: string): string {
  const names: { [key: string]: string } = {
    primary: '第一产业（农业/资源）',
    secondary: '第二产业（工业/制造）',
    tertiary: '第三产业（服务业）',
    agriculture: '农业',
    mining: '采矿',
    energy: '能源',
    heavyIndustry: '重工业',
    lightIndustry: '轻工业',
    manufacturing: '制造业',
    construction: '建筑业',
    finance: '金融业',
    retail: '零售业',
    services: '服务业',
    government: '政府服务',
  }
  return names[sector] || sector
}

export function calculateSectorGrowth(
  current: SectorBreakdown,
  previous: SectorBreakdown
): {
  primaryGrowth: number
  secondaryGrowth: number
  tertiaryGrowth: number
} {
  const calcGrowth = (curr: number, prev: number) => 
    prev > 0 ? ((curr - prev) / prev * 100) : 0
  
  return {
    primaryGrowth: calcGrowth(
      current.primary.totalOutput, 
      previous.primary.totalOutput
    ),
    secondaryGrowth: calcGrowth(
      current.secondary.totalOutput, 
      previous.secondary.totalOutput
    ),
    tertiaryGrowth: calcGrowth(
      current.tertiary.totalOutput, 
      previous.tertiary.totalOutput
    ),
  }
}
