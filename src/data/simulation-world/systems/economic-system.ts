import type {
  Commodity,
  Industry,
  PopulationStrata,
  EconomicSystem,
  EconomicPhase,
} from '../world-v2-types'

export const COMMODITY_DATABASE: Omit<Commodity, 'supply' | 'demand' | 'price' | 'priceHistory'>[] = [
  { id: 'wheat', name: '小麦', category: 'agricultural', icon: '🌾', volatility: 0.15, producers: [], consumers: [] },
  { id: 'rice', name: '大米', category: 'agricultural', icon: '🍚', volatility: 0.12, producers: [], consumers: [] },
  { id: 'corn', name: '玉米', category: 'agricultural', icon: '🌽', volatility: 0.18, producers: [], consumers: [] },
  { id: 'beef', name: '牛肉', category: 'agricultural', icon: '🥩', volatility: 0.25, producers: [], consumers: [] },
  { id: 'pork', name: '猪肉', category: 'agricultural', icon: '🥓', volatility: 0.22, producers: [], consumers: [] },
  { id: 'cotton', name: '棉花', category: 'agricultural', icon: '☁️', volatility: 0.20, producers: [], consumers: [] },
  { id: 'tea', name: '茶叶', category: 'agricultural', icon: '🍵', volatility: 0.30, producers: [], consumers: [] },
  { id: 'coffee', name: '咖啡', category: 'agricultural', icon: '☕', volatility: 0.35, producers: [], consumers: [] },
  { id: 'sugar', name: '砂糖', category: 'agricultural', icon: '🍬', volatility: 0.18, producers: [], consumers: [] },
  { id: 'tobacco', name: '烟草', category: 'agricultural', icon: '🚬', volatility: 0.25, producers: [], consumers: [] },
  { id: 'opium', name: '鸦片', category: 'agricultural', icon: '💊', volatility: 0.50, producers: [], consumers: [] },
  { id: 'silk', name: '丝绸', category: 'agricultural', icon: '🧣', volatility: 0.40, producers: [], consumers: [] },
  { id: 'wool', name: '羊毛', category: 'agricultural', icon: '🐑', volatility: 0.20, producers: [], consumers: [] },
  { id: 'timber', name: '木材', category: 'industrial', icon: '🪵', volatility: 0.15, producers: [], consumers: [] },
  { id: 'iron', name: '生铁', category: 'industrial', icon: '🔩', volatility: 0.25, producers: [], consumers: [] },
  { id: 'steel', name: '钢铁', category: 'industrial', icon: '⚙️', volatility: 0.22, producers: [], consumers: [] },
  { id: 'coal', name: '煤炭', category: 'industrial', icon: '⚫', volatility: 0.18, producers: [], consumers: [] },
  { id: 'oil', name: '石油', category: 'industrial', icon: '🛢️', volatility: 0.45, producers: [], consumers: [] },
  { id: 'electricity', name: '电力', category: 'industrial', icon: '⚡', volatility: 0.12, producers: [], consumers: [] },
  { id: 'machinery', name: '机械', category: 'industrial', icon: '🏭', volatility: 0.30, producers: [], consumers: [] },
  { id: 'chemicals', name: '化工', category: 'industrial', icon: '🧪', volatility: 0.35, producers: [], consumers: [] },
  { id: 'rubber', name: '橡胶', category: 'industrial', icon: '🧱', volatility: 0.28, producers: [], consumers: [] },
  { id: 'munitions', name: '军火', category: 'strategic', icon: '💣', volatility: 0.60, producers: [], consumers: [] },
  { id: 'uranium', name: '铀矿', category: 'strategic', icon: '☢️', volatility: 0.80, producers: [], consumers: [] },
  { id: 'chips', name: '芯片', category: 'strategic', icon: '💿', volatility: 0.70, producers: [], consumers: [] },
  { id: 'textiles', name: '纺织品', category: 'consumer', icon: '👔', volatility: 0.15, producers: [], consumers: [] },
  { id: 'furniture', name: '家具', category: 'consumer', icon: '🛋️', volatility: 0.20, producers: [], consumers: [] },
  { id: 'pharmaceuticals', name: '药品', category: 'consumer', icon: '💊', volatility: 0.35, producers: [], consumers: [] },
  { id: 'alcohol', name: '酒类', category: 'consumer', icon: '🍷', volatility: 0.25, producers: [], consumers: [] },
  { id: 'luxury_goods', name: '奢侈品', category: 'consumer', icon: '💎', volatility: 0.50, producers: [], consumers: [] },
  { id: 'automobiles', name: '汽车', category: 'consumer', icon: '🚗', volatility: 0.40, producers: [], consumers: [] },
  { id: 'electronics', name: '电子产品', category: 'consumer', icon: '📱', volatility: 0.45, producers: [], consumers: [] },
  { id: 'gold', name: '黄金', category: 'financial', icon: '🥇', volatility: 0.10, producers: [], consumers: [] },
  { id: 'silver', name: '白银', category: 'financial', icon: '🥈', volatility: 0.15, producers: [], consumers: [] },
]

export const INDUSTRY_DATABASE: Omit<Industry, 'productionCapacity' | 'utilizationRate' | 'employment' | 'profitMargin' | 'technologyLevel'>[] = [
  { id: 'agriculture', name: '农业', sector: 'primary' },
  { id: 'mining', name: '采矿业', sector: 'primary' },
  { id: 'textile', name: '纺织业', sector: 'secondary' },
  { id: 'food_processing', name: '食品加工', sector: 'secondary' },
  { id: 'steel_industry', name: '钢铁工业', sector: 'secondary' },
  { id: 'machinery_manufacturing', name: '机械制造', sector: 'secondary' },
  { id: 'chemical_industry', name: '化学工业', sector: 'secondary' },
  { id: 'electronics_industry', name: '电子工业', sector: 'secondary' },
  { id: 'automotive_industry', name: '汽车工业', sector: 'secondary' },
  { id: 'defense_industry', name: '国防工业', sector: 'secondary' },
  { id: 'construction', name: '建筑业', sector: 'secondary' },
  { id: 'transportation', name: '交通运输', sector: 'tertiary' },
  { id: 'banking', name: '银行业', sector: 'tertiary' },
  { id: 'retail', name: '零售业', sector: 'tertiary' },
  { id: 'healthcare', name: '医疗保健', sector: 'tertiary' },
  { id: 'education', name: '教育', sector: 'tertiary' },
  { id: 'media', name: '传媒娱乐', sector: 'tertiary' },
  { id: 'information_technology', name: '信息技术', sector: 'quaternary' },
  { id: 'research_development', name: '研发', sector: 'quaternary' },
]

export const FACTIONS_DATABASE = [
  { id: 'conservatives', name: '保守党', ideology: '保守主义', icon: '🦁', color: '#1d4ed8' },
  { id: 'liberals', name: '自由党', ideology: '自由主义', icon: '🦅', color: '#3b82f6' },
  { id: 'social_democrats', name: '社会民主党', ideology: '社会民主主义', icon: '🌹', color: '#ef4444' },
  { id: 'communists', name: '共产党', ideology: '共产主义', icon: '☭', color: '#dc2626' },
  { id: 'nationalists', name: '民族主义党', ideology: '民族主义', icon: '🦅', color: '#f59e0b' },
  { id: 'fascists', name: '法西斯党', ideology: '法西斯主义', icon: '⚡', color: '#000000' },
  { id: 'anarchists', name: '无政府主义者', ideology: '无政府主义', icon: '⚫', color: '#1f2937' },
  { id: 'green_party', name: '绿党', ideology: '生态主义', icon: '🌿', color: '#22c55e' },
  { id: 'military_junta', name: '军政府', ideology: '军国主义', icon: '🎖️', color: '#78716c' },
  { id: 'clerical', name: '教权派', ideology: '神权主义', icon: '✝️', color: '#a855f7' },
  { id: 'technocrats', name: '技术官僚党', ideology: '技治主义', icon: '🔬', color: '#06b6d4' },
  { id: 'populists', name: '民粹党', ideology: '民粹主义', icon: '🔥', color: '#f97316' },
]

export class EconomicEngine {
  private state: EconomicSystem
  private turn: number = 0

  constructor(scenarioType: '18th_century' | '19th_century' | 'modern' | 'future' = 'modern') {
    this.state = this.createInitialEconomicState(scenarioType)
  }

  private createInitialEconomicState(type: string): EconomicSystem {
    const commodities: Record<string, Commodity> = {}
    COMMODITY_DATABASE.forEach(c => {
      commodities[c.id] = {
        ...c,
        supply: 100,
        demand: 100,
        price: 100,
        priceHistory: [100, 100, 100],
      }
    })

    const industries: Record<string, Industry> = {}
    INDUSTRY_DATABASE.forEach(i => {
      industries[i.id] = {
        ...i,
        productionCapacity: 100,
        utilizationRate: 0.8,
        employment: 10000,
        profitMargin: 0.1,
        technologyLevel: 1,
      }
    })

    const basePopulation = type === 'modern' ? 100000000 : type === '19th_century' ? 30000000 : 5000000

    return {
      commodities,
      industries,
      population: {
        total: basePopulation,
        growthRate: 0.01,
        aristocracy: this.createStrata(0.005, 100, basePopulation),
        bourgeoisie: this.createStrata(0.05, 20, basePopulation),
        petiteBourgeoisie: this.createStrata(0.15, 5, basePopulation),
        proletariat: this.createStrata(0.60, 1, basePopulation),
        peasantry: this.createStrata(0.15, 0.5, basePopulation),
        lumpenproletariat: this.createStrata(0.045, 0.2, basePopulation),
      },
      gdp: basePopulation * 1000,
      gdpGrowth: [0.03, 0.025, 0.02],
      inflationRate: 0.02,
      unemploymentRate: 0.05,
      giniCoefficient: 0.45,
      interestRate: 0.05,
      nationalDebt: basePopulation * 500,
      currencyStrength: 100,
      creditRating: 'AAA',
      businessCycle: {
        phase: 'expansion',
        amplitude: 0.5,
        durationInPhase: 4,
        nextPhaseEstimate: 8,
      },
    }
  }

  private createStrata(percentage: number, incomeMultiplier: number, totalPop: number): PopulationStrata {
    const size = Math.floor(totalPop * percentage)
    return {
      size,
      averageIncome: 5000 * incomeMultiplier,
      wealth: 50000 * incomeMultiplier * incomeMultiplier,
      consumption: {},
      ideology: {},
      militancy: 0.3,
      literacy: percentage > 0.5 ? 0.99 : percentage > 0.1 ? 0.9 : percentage > 0.01 ? 0.5 : 0.99,
      lifeExpectancy: 75 + (incomeMultiplier - 1) * 2,
    }
  }

  advanceTurn(): {
    priceChanges: Record<string, number>
    gdpGrowth: number
    newUnemployment: number
    cyclePhase?: EconomicPhase
  } {
    this.turn++

    const priceChanges = this.updateSupplyDemandPrices()
    this.updatePopulation()
    this.updateIndustries()

    const oldGdp = this.state.gdp
    this.calculateGDP()
    const gdpGrowthRate = (this.state.gdp - oldGdp) / oldGdp

    this.updateBusinessCycle()

    this.state.gdpGrowth.shift()
    this.state.gdpGrowth.push(gdpGrowthRate)

    return {
      priceChanges,
      gdpGrowth: gdpGrowthRate,
      newUnemployment: this.state.unemploymentRate,
      cyclePhase: this.state.businessCycle.phase,
    }
  }

  private updateSupplyDemandPrices(): Record<string, number> {
    const priceChanges: Record<string, number> = {}

    Object.values(this.state.commodities).forEach(commodity => {
      const supplyDemandRatio = commodity.demand / Math.max(commodity.supply, 1)
      const elasticity = 0.3 + commodity.volatility
      
      const targetPrice = 100 * Math.pow(supplyDemandRatio, elasticity)
      const priceAdjustment = (targetPrice - commodity.price) * 0.3
      
      const oldPrice = commodity.price
      commodity.price = Math.max(1, commodity.price + priceAdjustment + (Math.random() - 0.5) * commodity.volatility * 10)
      commodity.priceHistory.shift()
      commodity.priceHistory.push(commodity.price)
      
      priceChanges[commodity.id] = (commodity.price - oldPrice) / oldPrice
      
      commodity.supply += (commodity.price - 100) / 200 * 2
      commodity.demand -= (commodity.price - 100) / 200 * 1.5
      
      commodity.supply *= 0.98
      commodity.demand *= 0.98
      commodity.supply += 2 + Math.random() * 2
      commodity.demand += 2 + Math.random() * 2
    })

    return priceChanges
  }

  private updatePopulation(): void {
    const strata = this.state.population
    
    strata.aristocracy.size = Math.floor(strata.aristocracy.size * (1 + this.state.population.growthRate * 0.5))
    strata.bourgeoisie.size = Math.floor(strata.bourgeoisie.size * (1 + this.state.population.growthRate * 1.2))
    strata.petiteBourgeoisie.size = Math.floor(strata.petiteBourgeoisie.size * (1 + this.state.population.growthRate * 1.1))
    strata.proletariat.size = Math.floor(strata.proletariat.size * (1 + this.state.population.growthRate * 1.0))
    strata.peasantry.size = Math.floor(strata.peasantry.size * (1 + this.state.population.growthRate * 0.8))
    strata.lumpenproletariat.size = Math.floor(strata.lumpenproletariat.size * (1 + this.state.population.growthRate * 1.5))

    const total =
      strata.aristocracy.size +
      strata.bourgeoisie.size +
      strata.petiteBourgeoisie.size +
      strata.proletariat.size +
      strata.peasantry.size +
      strata.lumpenproletariat.size
    this.state.population.total = total

    const phaseModifier = this.getCyclePhaseModifier()
    strata.proletariat.militancy = Math.min(1, Math.max(0, 
      strata.proletariat.militancy + 
      (this.state.unemploymentRate - 0.05) * 2 + 
      (this.state.inflationRate - 0.02) * 3 +
      phaseModifier * 0.1
    ))
  }

  private updateIndustries(): void {
    const phaseModifier = this.getCyclePhaseModifier()
    
    Object.values(this.state.industries).forEach(industry => {
      const demandModifier = 1 + phaseModifier * 0.2
      
      industry.utilizationRate = Math.min(0.95, Math.max(0.4,
        industry.utilizationRate + (demandModifier - 1) * 0.1 + (Math.random() - 0.5) * 0.05
      ))
      
      industry.profitMargin = Math.max(0, 0.1 * industry.utilizationRate - 0.05)
      
      if (industry.profitMargin > 0.15) {
        industry.productionCapacity *= 1.02
        industry.technologyLevel += 0.01
      } else if (industry.profitMargin < 0.02) {
        industry.productionCapacity *= 0.99
      }
    })

    const totalCapacity = Object.values(this.state.industries).reduce((s, i) => s + i.productionCapacity * i.utilizationRate, 0)
    const totalLabor = Object.values(this.state.industries).reduce((s, i) => s + i.employment, 0)
    const laborForce = this.state.population.proletariat.size + this.state.population.petiteBourgeoisie.size * 0.5
    
    this.state.unemploymentRate = Math.max(0.01, 1 - totalLabor / laborForce)
  }

  private calculateGDP(): void {
    let industrialOutput = 0
    Object.values(this.state.industries).forEach(industry => {
      industrialOutput += industry.productionCapacity * industry.utilizationRate * 1000
    })

    const consumption = this.state.population.total * 5000 * (1 - this.state.unemploymentRate)
    const government = this.state.gdp * 0.2
    const investment = Object.values(this.state.industries)
      .filter(i => i.profitMargin > 0.1).length * 1000000

    this.state.gdp = industrialOutput * 0.4 + consumption * 0.4 + government + investment
  }

  private updateBusinessCycle(): void {
    const cycle = this.state.businessCycle
    cycle.durationInPhase++

    const transitionProbability = this.getPhaseTransitionProbability()
    
    if (Math.random() < transitionProbability || cycle.durationInPhase >= cycle.nextPhaseEstimate) {
      const phases: EconomicPhase[] = ['recovery', 'expansion', 'peak', 'contraction', 'recession', 'depression']
      const currentIdx = phases.indexOf(cycle.phase)
      
      if (cycle.phase === 'depression') {
        cycle.phase = 'recovery'
      } else if (cycle.phase === 'peak') {
        cycle.phase = 'contraction'
      } else {
        cycle.phase = phases[(currentIdx + 1) % phases.length]
      }
      
      cycle.durationInPhase = 0
      cycle.nextPhaseEstimate = 4 + Math.floor(Math.random() * 8)
      cycle.amplitude = 0.3 + Math.random() * 0.7
    }

    const phaseModifier = this.getCyclePhaseModifier()
    this.state.inflationRate = Math.max(-0.05, 0.02 + phaseModifier * 0.03 + (Math.random() - 0.5) * 0.01)
  }

  private getCyclePhaseModifier(): number {
    const modifiers: Record<EconomicPhase, number> = {
      'boom': 1.0,
      'expansion': 0.5,
      'peak': 0.2,
      'contraction': -0.3,
      'recession': -0.7,
      'depression': -1.0,
      'recovery': 0.3,
    }
    return modifiers[this.state.businessCycle.phase] || 0
  }

  private getPhaseTransitionProbability(): number {
    const base = 0.05
    const durationFactor = this.state.businessCycle.durationInPhase * 0.02
    return base + durationFactor
  }

  getCommodityPrice(commodityId: string): number {
    return this.state.commodities[commodityId]?.price || 100
  }

  getCommodityTrend(commodityId: string): 'rising' | 'falling' | 'stable' {
    const history = this.state.commodities[commodityId]?.priceHistory || [100, 100, 100]
    const trend = history[2] - history[0]
    if (trend > 5) return 'rising'
    if (trend < -5) return 'falling'
    return 'stable'
  }

  getStrataMilitancy(): Record<string, number> {
    const s = this.state.population
    return {
      aristocracy: s.aristocracy.militancy,
      bourgeoisie: s.bourgeoisie.militancy,
      petiteBourgeoisie: s.petiteBourgeoisie.militancy,
      proletariat: s.proletariat.militancy,
      peasantry: s.peasantry.militancy,
      lumpenproletariat: s.lumpenproletariat.militancy,
    }
  }

  getRevolutionRisk(): number {
    const militancy = Object.values(this.getStrataMilitancy())
    const avgMilitancy = militancy.reduce((a, b) => a + b, 0) / militancy.length
    const unemploymentFactor = this.state.unemploymentRate * 5
    const inequalityFactor = (this.state.giniCoefficient - 0.3) * 2
    const phaseFactor = Math.abs(this.getCyclePhaseModifier())
    
    return Math.min(1, (avgMilitancy * 0.4 + unemploymentFactor * 0.2 + inequalityFactor * 0.2 + phaseFactor * 0.2))
  }

  getEconomicHealth(): number {
    const gdpScore = this.state.gdpGrowth.reduce((a, b) => a + b, 0) / 3 * 20 + 0.5
    const unemploymentScore = 1 - this.state.unemploymentRate * 10
    const inflationScore = 1 - Math.abs(this.state.inflationRate) * 10
    const phaseScore = (this.getCyclePhaseModifier() + 1) / 2
    
    return Math.max(0, Math.min(1, (gdpScore + unemploymentScore + inflationScore + phaseScore) / 4))
  }

  getState(): EconomicSystem {
    return JSON.parse(JSON.stringify(this.state))
  }

  getTurn(): number {
    return this.turn
  }

  getBusinessCycle(): EconomicPhase {
    return this.state.businessCycle.phase
  }

  applyEconomicShock(shockType: 'oil_crisis' | 'financial_crash' | 'pandemic' | 'war' | 'tech_boom'): void {
    const shocks: Record<string, Partial<EconomicSystem>> = {
      'oil_crisis': {
        inflationRate: 0.15,
        businessCycle: { ...this.state.businessCycle, phase: 'recession' as EconomicPhase },
      },
      'financial_crash': {
        gdpGrowth: [-0.08, -0.05, -0.03],
        unemploymentRate: 0.15,
        businessCycle: { ...this.state.businessCycle, phase: 'depression' as EconomicPhase },
      },
      'pandemic': {
        gdpGrowth: [-0.05, -0.03, 0.01],
        unemploymentRate: 0.10,
      },
      'war': {
        inflationRate: 0.10,
        gdpGrowth: [0.05, 0.02, -0.02],
      },
      'tech_boom': {
        gdpGrowth: [0.06, 0.05, 0.04],
        businessCycle: { ...this.state.businessCycle, phase: 'boom' as EconomicPhase },
      },
    }

    const shock = shocks[shockType]
    if (shock) {
      Object.assign(this.state, shock)
    }
  }
}
