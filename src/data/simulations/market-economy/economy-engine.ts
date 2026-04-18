import type { EconomyState, Commodity, MarketState, PopGroup, Building, TradeOrder, GameEndCondition, Modifier } from './types'
import type { WorldEvent } from './vic3-types'
import { getEligibleEvents } from './world-events'
import { generateDailyNews, addNewsToState } from './news-generator'
import { simulateAIActions } from './ai-simulator'
import { processIndustryTick } from './industry-system'
import { getDifficultyConfig } from './difficulty-system'

function deepClone<T>(obj: T): T {
  try {
    return structuredClone(obj)
  } catch {
    try {
      return JSON.parse(JSON.stringify(obj))
    } catch {
      return Array.isArray(obj) ? [...obj] as T : { ...obj }
    }
  }
}

export interface ActiveEvent {
  event: WorldEvent
  triggerDay: number
  optionSelected?: number
}

const COOLDOWNS: Record<string, number> = {}

export function checkAndTriggerEvents(state: EconomyState): { newState: EconomyState; triggeredEvent: WorldEvent | null } {
  let newState = deepClone(state)
  
  if (!isNewDay(state)) {
    return { newState, triggeredEvent: null }
  }
  
  Object.keys(COOLDOWNS).forEach(eventId => {
    COOLDOWNS[eventId] = Math.max(0, COOLDOWNS[eventId] - 1)
    if (COOLDOWNS[eventId] === 0) {
      delete COOLDOWNS[eventId]
    }
  })
  
  const difficultyConfig = getDifficultyConfig(state.difficulty)
  
  const eligibleEvents = getEligibleEvents(newState).filter(
    event => !COOLDOWNS[event.id]
  )
  
  for (const event of eligibleEvents) {
    const probabilityMultiplier = event.severity === 'catastrophic' || event.severity === 'major'
      ? difficultyConfig.crisisProbabilityMultiplier
      : difficultyConfig.eventProbabilityMultiplier
    
    const adjustedProbability = event.probability * probabilityMultiplier
    
    if (Math.random() < adjustedProbability) {
      COOLDOWNS[event.id] = event.cooldownDays || 90
      return { newState, triggeredEvent: event }
    }
  }
  
  return { newState, triggeredEvent: null }
}

export function applyEventOption(state: EconomyState, event: WorldEvent, optionIndex: number): EconomyState {
  const newState = deepClone(state)
  const option = event.options[optionIndex]
  
  const applyCommonEffects = (effect: any) => {
    switch (effect.type) {
      case 'inflation':
        newState.stats.inflation = clamp(newState.stats.inflation + effect.value, -10, 50)
        break
      case 'unemployment':
        newState.stats.unemployment = clamp(newState.stats.unemployment + effect.value, 0, 70)
        break
      case 'stability':
      case 'instability':
        newState.stats.stability = clamp(newState.stats.stability + effect.value, 0, 100)
        break
      case 'pop_approval':
        newState.pops = newState.pops.map(p => ({
          ...p,
          approval: clamp(p.approval + effect.value, 0, 100)
        }))
        break
      case 'treasury':
        newState.treasury.gold = Math.max(0, newState.treasury.gold + effect.value)
        break
      case 'debt':
        newState.treasury.debt = Math.max(0, newState.treasury.debt + effect.value)
        break
      case 'bureaucracy':
        newState.stats.bureaucracy = clamp(newState.stats.bureaucracy + effect.value, 0, 100)
        break
      case 'legitimacy':
        newState.stats.legitimacy = clamp(newState.stats.legitimacy + effect.value, 0, 100)
        break
    }
  }
  
  option.effects.forEach(applyCommonEffects)
  
  event.effects.forEach(effect => {
    if (effect.type === 'price_shock') {
      Object.keys(newState.market).forEach(commodityId => {
        if (effect.target === '*' || commodityId === effect.target) {
          newState.market[commodityId] = {
            ...newState.market[commodityId],
            price: newState.market[commodityId].price * (1 + effect.value)
          }
        }
      })
    }
    
    if (effect.type === 'supply_shock') {
      Object.keys(newState.market).forEach(commodityId => {
        if (effect.target === '*' || commodityId === effect.target) {
          newState.market[commodityId] = {
            ...newState.market[commodityId],
            supply: newState.market[commodityId].supply * (1 + effect.value),
            stock: Math.max(0, newState.market[commodityId].stock * (1 + effect.value))
          }
        }
      })
    }
    
    if (effect.type === 'demand_shock') {
      Object.keys(newState.market).forEach(commodityId => {
        if (effect.target === '*' || commodityId === effect.target) {
          newState.market[commodityId] = {
            ...newState.market[commodityId],
            demand: newState.market[commodityId].demand * (1 + effect.value)
          }
        }
      })
    }
    
    applyCommonEffects(effect)
  })
  
  return newState
}

function isNewDay(state: EconomyState): boolean {
  return state.tick % 24 === 0
}

const CPI_WEIGHTS: { [commodityId: string]: number } = {
  grain: 0.35,
  cloth: 0.15,
  meat: 0.15,
  wine: 0.10,
  tools: 0.10,
  coal: 0.05,
  iron: 0.05,
  wood: 0.03,
  medicine: 0.02,
}

const PHILLIPS_CURVE_SLOPE = 0.3
const OKUN_LAW_COEFFICIENT = 2.0
const TFP_GROWTH_RATE = 0.0002



function safeDiv(a: number, b: number, fallback = 1): number {
  if (b === 0 || !Number.isFinite(b)) return fallback
  const result = a / b
  return Number.isFinite(result) ? result : fallback
}

function safeMul(a: number, b: number, fallback = 0): number {
  const result = a * b
  return Number.isFinite(result) ? result : fallback
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : (min + max) / 2))
}

export function processVictoryDefeatTick(state: EconomyState): EconomyState {
  let newState = deepClone(state)
  
  if (newState.gameStatus !== 'running') return newState
  
  newState.defeatConditions = newState.defeatConditions.map(condition => {
    if (condition.isTriggered) return condition
    
    let allMet = true
    condition.conditions.forEach(c => {
      const currentValue = getStatValue(newState, c.type)
      const isMet = c.comparison === 'above' ? currentValue > c.threshold : currentValue < c.threshold
      if (isMet) {
        c.currentDays += 1
      } else {
        c.currentDays = 0
      }
      if (c.currentDays < c.consecutiveDays) allMet = false
    })
    
    if (allMet) {
      newState.gameStatus = 'defeat'
      newState.endCondition = { type: 'defeat', name: condition.name, description: condition.description, icon: '💀' }
      return { ...condition, isTriggered: true }
    }
    return condition
  })
  
  newState.victoryConditions = newState.victoryConditions.map(condition => {
    if (condition.isTriggered) return condition
    
    let allMet = true
    condition.conditions.forEach(c => {
      const currentValue = getStatValue(newState, c.type)
      const isMet = c.comparison === 'above' ? currentValue > c.threshold : currentValue < c.threshold
      if (isMet) {
        c.currentDays += 1
      } else {
        c.currentDays = 0
      }
      if (c.currentDays < c.consecutiveDays) allMet = false
    })
    
    if (allMet) {
      newState.gameStatus = 'victory'
      newState.endCondition = { type: 'victory', name: condition.name, description: condition.description, icon: '🏆' }
      return { ...condition, isTriggered: true }
    }
    return condition
  })
  
  return newState
}

export function calculateMarketPrice(
  commodity: Commodity,
  supply: number,
  demand: number,
  stock: number,
  currentPrice: number
): number {
  supply = Math.max(1, supply)
  demand = Math.max(1, demand)
  stock = Math.max(0, stock)
  
  const baseRatio = demand / supply
  const stockDays = stock / Math.max(1, demand)
  const targetStockDays = 14
  
  const shortageMultiplier = clamp(Math.pow(baseRatio, commodity.elasticity), 0.3, 3)
  const stockMultiplier = stockDays < targetStockDays * 0.5 
    ? 1 + (0.5 - stockDays / targetStockDays) * 1.5
    : stockDays > targetStockDays * 2
    ? 1 - (stockDays / targetStockDays - 2) * 0.15
    : 1
  
  let newPrice = commodity.basePrice * shortageMultiplier * stockMultiplier
  newPrice = clamp(newPrice, commodity.minPrice, commodity.maxPrice)
  
  const inertia = 0.85
  newPrice = currentPrice * inertia + newPrice * (1 - inertia)
  
  return clamp(newPrice, commodity.minPrice, commodity.maxPrice)
}

export function calculateSupplyDemand(state: EconomyState): MarketState {
  const newMarket: MarketState = {}
  
  Object.keys(state.commodities).forEach(commodityId => {
    const commodity = state.commodities[commodityId]
    const base = state.market[commodityId] || { 
      supply: 100, 
      demand: 100, 
      stock: 500, 
      price: commodity.basePrice, 
      priceTrend: 'stable' as const, 
      priceHistory: [commodity.basePrice] 
    }
    
    let totalSupply = 0
    let totalDemand = 0
    
    state.buildings.forEach(building => {
      if (!building.isActive) return
      
      const workerUtilization = building.workers / Math.max(1, building.maxWorkers)
      const tfpBoost = 1 + state.stats.bureaucracy / 500
      
      if (building.outputs[commodityId]) {
        totalSupply += building.outputs[commodityId] * building.level * building.efficiency * workerUtilization * tfpBoost
      }
      
      if (building.inputs[commodityId]) {
        totalDemand += building.inputs[commodityId] * building.level
      }
    })
    
    state.pops.forEach(pop => {
      const popNeed = pop.needs[commodityId] || 0
      const incomeFactor = clamp(pop.income / 15, 0.3, 3)
      const popConsumption = popNeed * incomeFactor
      totalDemand += popConsumption * pop.size / 1000
    })
    
    totalSupply = Math.max(1, totalSupply)
    totalDemand = Math.max(1, totalDemand)
    
    const netTrade = 0
    totalSupply += netTrade
    
    const newStock = Math.max(0, base.stock + totalSupply - totalDemand)
    const newPrice = calculateMarketPrice(
      commodity,
      totalSupply,
      totalDemand,
      newStock,
      base.price
    )
    
    const priceHistory = [...base.priceHistory.slice(-59), newPrice]
    const avgOld = priceHistory.slice(-14, -7).reduce((a, b) => a + b, 0) / Math.max(1, priceHistory.slice(-14, -7).length)
    const avgNew = priceHistory.slice(-7).reduce((a, b) => a + b, 0) / Math.max(1, priceHistory.slice(-7).length)
    const priceChange = safeDiv(avgNew - avgOld, avgOld, 0)
    const priceTrend = priceChange > 0.02 ? 'rising' : priceChange < -0.02 ? 'falling' : 'stable'
    
    let finalSupply = totalSupply
    let finalDemand = totalDemand
    let finalPrice = newPrice
    
    for (const modifier of state.modifiers) {
      if (!modifier.effects?.market) continue
      const commodityEffect = modifier.effects.market[commodityId]
      if (!commodityEffect) continue
      if (commodityEffect.supply) {
        finalSupply *= (1 + commodityEffect.supply / 100)
      }
      if (commodityEffect.demand) {
        finalDemand *= (1 + commodityEffect.demand / 100)
      }
      if (commodityEffect.price) {
        finalPrice *= (1 + commodityEffect.price / 100)
      }
    }
    
    newMarket[commodityId] = {
      supply: Math.max(1, finalSupply),
      demand: Math.max(1, finalDemand),
      stock: newStock,
      price: Math.max(0.01, finalPrice),
      priceTrend,
      priceHistory,
    }
  })
  
  return newMarket
}

export function calculatePopChanges(state: EconomyState): PopGroup[] {
  return state.pops.map(pop => {
    let newPop = { ...pop }
    
    const cpi = calculateCPI(state)
    const realWage = pop.income / Math.max(1, cpi / 100 + 1)
    
    let essentialGoodsSatisfied = true
    let totalNeedCost = 0
    
    Object.entries(pop.needs).forEach(([commodityId, need]) => {
      const market = state.market[commodityId]
      if (!market || need === 0) return
      
      const cost = need * market.price
      totalNeedCost += cost
      const affordability = safeDiv(realWage, cost, 1)
      
      if (affordability < 0.5 || market.stock < need * pop.size / 100) {
        essentialGoodsSatisfied = false
      }
    })
    
    const subsistenceRatio = safeDiv(realWage, totalNeedCost, 1)
    
    const baseMortality = 0.00005
    const baseFertility = 0.00006
    
    let mortality = baseMortality
    let fertility = baseFertility
    
    if (subsistenceRatio < 0.5) {
      mortality *= 3
      fertility *= 0.2
    } else if (subsistenceRatio < 1) {
      mortality *= 1.5
      fertility *= 0.6
    } else if (subsistenceRatio < 2) {
      fertility *= 1.2
    } else {
      fertility *= 0.8
    }
    
    const lifeExpectancyBoost = pop.standardOfLiving / 50000
    mortality *= Math.max(0.3, 1 - lifeExpectancyBoost)
    
    const literacyBoost = pop.literacy / 200
    fertility *= Math.max(0.5, 1 - literacyBoost)
    
    const netGrowthRate = fertility - mortality
    newPop.size *= (1 + netGrowthRate)
    
    if (essentialGoodsSatisfied && subsistenceRatio > 1.2) {
      newPop.standardOfLiving = clamp(newPop.standardOfLiving + 0.05, 0, 100)
      newPop.approval = clamp(newPop.approval + 0.02, 0, 100)
    } else if (!essentialGoodsSatisfied || subsistenceRatio < 0.8) {
      newPop.standardOfLiving = clamp(newPop.standardOfLiving - 0.1, 0, 100)
      newPop.approval = clamp(newPop.approval - 0.15, 0, 100)
    }
    
    const unemploymentEffect = (state.stats.unemployment - 5) / 100
    newPop.approval = clamp(newPop.approval - unemploymentEffect * 0.5, 0, 100)
    
    const savingsRate = clamp(0.1 + (realWage - 10) / 100, 0.01, 0.5)
    newPop.wealth += realWage * savingsRate
    newPop.wealth = Math.max(0, newPop.wealth)
    
    newPop.income = realWage * (1 + TFP_GROWTH_RATE)
    newPop.income = Math.max(1, newPop.income)
    
    for (const modifier of state.modifiers) {
      if (!modifier.effects?.pops) continue
      if (modifier.effects.pops.income) {
        newPop.income *= (1 + modifier.effects.pops.income / 100)
      }
      if (modifier.effects.pops.consumption) {
        Object.keys(newPop.consumption).forEach(cid => {
          newPop.consumption[cid] *= (1 + modifier.effects.pops!.consumption! / 100)
        })
      }
      if (modifier.effects.pops.approval) {
        newPop.approval = clamp(newPop.approval + modifier.effects.pops.approval, 0, 100)
      }
    }
    
    return newPop
  })
}

export function calculateBuildingProfitability(state: EconomyState): Building[] {
  return state.buildings.map(building => {
    if (!building.isActive) return { ...building, profitability: 0 }
    
    let revenue = 0
    let costs = building.operatingCosts * building.level
    
    const wageRate = 3
    costs += building.workers * wageRate / 10
    
    const workerUtilization = building.workers / Math.max(1, building.maxWorkers)
    
    Object.entries(building.outputs).forEach(([commodityId, amount]) => {
      const price = state.market[commodityId]?.price || state.commodities[commodityId]?.basePrice || 1
      revenue += amount * building.level * building.efficiency * workerUtilization * price
    })
    
    Object.entries(building.inputs).forEach(([commodityId, amount]) => {
      const price = state.market[commodityId]?.price || state.commodities[commodityId]?.basePrice || 1
      costs += amount * building.level * price
    })
    
    const profitability = revenue - costs
    
    const profitMargin = safeDiv(profitability, revenue, 0)
    const newEfficiency = 0.7 + profitMargin * 0.5
    
    return {
      ...building,
      profitability,
      efficiency: clamp(newEfficiency, 0.3, 1.5),
    }
  })
}

export function calculateCPI(state: EconomyState): number {
  let cpi = 0
  Object.keys(CPI_WEIGHTS).forEach(commodityId => {
    const commodity = state.commodities[commodityId]
    const market = state.market[commodityId]
    if (!commodity || !market) return
    
    const priceRatio = safeDiv(market.price, commodity.basePrice, 1)
    cpi += priceRatio * CPI_WEIGHTS[commodityId]
  })
  return (cpi - 1) * 100
}

export function calculateGDP(state: EconomyState): number {
  let C = 0
  let I = 0
  let G = 0
  let NX = 0
  
  state.pops.forEach(pop => {
    Object.entries(pop.consumption).forEach(([commodityId, amount]) => {
      const price = state.market[commodityId]?.price || state.commodities[commodityId]?.basePrice || 1
      C += amount * price * pop.size
    })
  })
  
  Object.values(state.industries || {}).forEach(industry => {
    I += industry.investment * industry.utilization
  })
  
  state.buildings.forEach(building => {
    if (!building.isActive) return
    I += building.level * building.workers
  })
  
  G = state.treasury.expenses
  
  const GDP = (C + I + G) / 1000
  
  return Math.max(0, GDP)
}

export function calculateUnemployment(state: EconomyState): number {
  const industryWorkers = Object.values(state.industries || {}).reduce(
    (sum, ind) => sum + ind.employees * ind.utilization,
    0
  )
  
  const workingAgePop = state.stats.population * 0.62
  const laborForce = workingAgePop * 0.68
  
  const employed = industryWorkers * 1000
  
  const unemploymentRate = clamp(
    ((laborForce - employed) / laborForce) * 100,
    1,
    50
  )
  
  return unemploymentRate
}

export function calculateTreasury(state: EconomyState): EconomyState['treasury'] {
  const treasury = { ...state.treasury }
  
  let taxIncome = 0
  
  const totalTaxBurden = (treasury.taxes.income + treasury.taxes.land + treasury.taxes.trade + treasury.taxes.luxury) / 4
  
  const lafferCurve = (rate: number) => {
    const r = rate / 100
    return 4 * r * (1 - r) * (1 - 0.3 * r)
  }
  
  const compliance = clamp(
    lafferCurve(totalTaxBurden),
    0.1,
    1.0
  )
  
  state.pops.forEach(pop => {
    const avgTaxRate = (treasury.taxes.income + treasury.taxes.land) / 200
    const popCompliance = clamp(compliance * (0.7 + pop.approval / 500), 0.1, 0.95)
    taxIncome += pop.size * pop.income * avgTaxRate * popCompliance / 1000
  })
  
  Object.keys(state.market).forEach(commodityId => {
    const m = state.market[commodityId]
    const tradeVolume = Math.min(m.supply, m.demand) * m.price
    
    const tariffEfficiency = lafferCurve(treasury.taxes.trade)
    taxIncome += tradeVolume * treasury.taxes.trade / 100 * tariffEfficiency
    
    if (state.commodities[commodityId]?.category === 'luxury') {
      taxIncome += tradeVolume * treasury.taxes.luxury / 100 * lafferCurve(treasury.taxes.luxury)
    }
  })
  
  if (totalTaxBurden > 50) {
    state.stats.stability = clamp(
      state.stats.stability - (totalTaxBurden - 50) / 20,
      0,
      100
    )
  }
  
  const seigniorage = 0.5
  taxIncome += seigniorage
  
  let subsidies = treasury.subsidies.agriculture + treasury.subsidies.industry + treasury.subsidies.poor
  
  let expenses = subsidies
  
  expenses += state.buildings.reduce((sum, b) => sum + (b.isActive ? b.operatingCosts * b.level * 0.05 : 0), 0)
  
  const debtToGdpRatio = treasury.debt / Math.max(1, state.stats.gdp)
  
  let riskPremium = 0
  if (debtToGdpRatio > 0.6) riskPremium += 0.02
  if (debtToGdpRatio > 1.0) riskPremium += 0.05
  if (debtToGdpRatio > 1.5) riskPremium += 0.10
  if (debtToGdpRatio > 2.0) riskPremium += 0.20
  if (debtToGdpRatio > 3.0) riskPremium += 0.50
  
  treasury.interestRate = clamp(
    0.03 + riskPremium + state.stats.inflation / 200,
    0.01,
    1.0
  )
  
  expenses += treasury.debt * treasury.interestRate / 365
  
  const bureaucracyCost = state.stats.bureaucracy / 10
  expenses += bureaucracyCost
  
  for (const modifier of state.modifiers) {
    if (!modifier.effects?.treasury) continue
    if (modifier.effects.treasury.income) {
      taxIncome += modifier.effects.treasury.income
    }
    if (modifier.effects.treasury.expenses) {
      expenses += modifier.effects.treasury.expenses
    }
    if (modifier.effects.treasury.interestRate) {
      treasury.interestRate = Math.max(0.01, 
        treasury.interestRate + modifier.effects.treasury.interestRate
      )
    }
  }
  
  treasury.income = Math.max(0, taxIncome)
  treasury.expenses = Math.max(0, expenses)
  treasury.balance = taxIncome - expenses
  treasury.gold += treasury.balance
  
  if (treasury.gold < 0) {
    treasury.debt += Math.abs(treasury.gold)
    treasury.gold = 0
    
    if (debtToGdpRatio > 3.0 && Math.random() < 0.1) {
      state.stats.stability = clamp(state.stats.stability - 10, 0, 100)
      state.stats.legitimacy = clamp(state.stats.legitimacy - 15, 0, 100)
    }
  }
  
  return treasury
}

export function calculateNationalStats(state: EconomyState): EconomyState['stats'] {
  const stats = JSON.parse(JSON.stringify(state.stats)) as EconomyState['stats']
  
  stats.population = Math.max(1, state.pops.reduce((sum, p) => sum + p.size, 0))
  
  stats.gdp = calculateGDP(state)
  stats.gdpPerCapita = stats.gdp / Math.max(1, stats.population) * 1000
  
  const gdpGrowth = ((stats.gdp / Math.max(1, state.history[state.history.length - 1]?.gdp || stats.gdp)) - 1) * 100
  
  const okunLawEffect = -gdpGrowth * 2
  stats.unemployment = clamp(
    calculateUnemployment(state) + okunLawEffect,
    1,
    50
  )
  
  const cpiValue = calculateCPI(state)
  
  const uGap = stats.unemployment - 4
  const nairuEffect = -PHILLIPS_CURVE_SLOPE * uGap * 2
  const newInflation = cpiValue + nairuEffect
  
  const maxInflation = state.treasury.debt > state.stats.gdp * 2 ? 100 : 30
  stats.inflation = clamp(stats.inflation * 0.9 + newInflation * 0.1, -5, maxInflation)
  
  const weightedApproval = state.pops.reduce((sum, p) => sum + p.approval * p.size, 0) / Math.max(1, stats.population)
  const targetStability = clamp(
    weightedApproval * 0.4 +
    Math.max(0, 40 - stats.unemployment * 1.5) +
    Math.max(0, 35 - Math.abs(stats.inflation)) +
    gdpGrowth * 5,
    0,
    100
  )
  stats.stability = clamp(stats.stability * 0.98 + targetStability * 0.02, 0, 100)
  
  stats.legitimacy = clamp(
    stats.legitimacy * 0.99 + stats.stability * 0.01,
    0,
    100
  )
  
  stats.bureaucracy = clamp(
    stats.bureaucracy + TFP_GROWTH_RATE * 50,
    0,
    100
  )
  
  stats.infrastructure = state.buildings.filter(b => b.type === 'infrastructure').reduce((sum, b) => sum + b.level * 5, 0)
  stats.education = clamp(state.pops.reduce((sum, p) => sum + p.literacy * p.size, 0) / Math.max(1, stats.population), 0, 100)
  stats.health = clamp(weightedApproval * 0.3 + 35, 0, 100)
  stats.military = state.buildings.filter(b => b.type === 'military').reduce((sum, b) => sum + b.level * b.workers, 0)
  
  for (const modifier of state.modifiers) {
    if (!modifier.effects?.national) continue
    for (const [stat, value] of Object.entries(modifier.effects.national)) {
      const key = stat as keyof EconomyState['stats']
      if (value && typeof stats[key] === 'number') {
        ;(stats[key] as number) += value
      }
    }
  }
  
  for (const spirit of state.nationalSpirits || []) {
    if (!spirit.effects) continue
    for (const effect of spirit.effects) {
      switch (effect.type) {
        case 'stability':
        case 'instability':
          stats.stability = clamp(stats.stability + effect.value, 0, 100)
          break
        case 'bureaucracy':
          stats.bureaucracy = clamp(stats.bureaucracy + effect.value, 0, 100)
          break
        case 'legitimacy':
          stats.legitimacy = clamp(stats.legitimacy + effect.value, 0, 100)
          break
        case 'inflation':
          stats.inflation = clamp(stats.inflation + effect.value, -5, 100)
          break
        case 'unemployment':
          stats.unemployment = clamp(stats.unemployment + effect.value, 0, 50)
          break
        case 'treasury':
          state.treasury.expenses += Math.abs(effect.value)
          break
      }
    }
  }
  
  stats.stability = clamp(stats.stability, 0, 100)
  stats.legitimacy = clamp(stats.legitimacy, 0, 100)
  stats.bureaucracy = clamp(stats.bureaucracy, 0, 100)
  stats.unemployment = clamp(stats.unemployment, 1, 50)
  stats.inflation = clamp(stats.inflation, -5, 100)
  
  return stats
}

export function executeEconomyTick(state: EconomyState): EconomyState {
  let newState = deepClone(state)
  
  if (newState.gameStatus !== 'running') {
    return newState
  }
  
  newState.tick += 1
  
  const isNewDay = newState.tick % 24 === 0
  const isNewMonth = isNewDay && newState.date.day === 1
  
  if (isNewDay) {
    newState.day += 1
    newState.date.day += 1
    
    const daysInMonth = new Date(newState.date.year, newState.date.month, 0).getDate()
    
    if (newState.date.day > daysInMonth) {
      newState.date.day = 1
      newState.date.month += 1
    }
    
    if (newState.date.month > 12) {
      newState.date.month = 1
      newState.date.year += 1
    }
    
    newState.market = calculateSupplyDemand(newState)
    newState.pops = calculatePopChanges(newState)
    newState.buildings = calculateBuildingProfitability(newState)
    newState.treasury = calculateTreasury(newState)
    
    const activePolicies = newState.policies.filter(p => p.isActive)
    const dailyUpkeep = activePolicies.reduce((sum, p) => sum + (p.upkeep || 0), 0)
    if (dailyUpkeep > 0) {
      newState.treasury.gold -= dailyUpkeep
      newState.treasury.expenses += dailyUpkeep
    }
    
    newState.stats = calculateNationalStats(newState)
    
    const historyPoint = {
      day: newState.day,
      gdp: newState.stats.gdp,
      inflation: newState.stats.inflation,
      unemployment: newState.stats.unemployment,
      treasury: newState.treasury.balance,
      debt: newState.treasury.debt,
      stability: newState.stats.stability,
      population: newState.stats.population,
    }
    
    newState.history = [...newState.history.slice(-3650), historyPoint]
    
    newState = processVictoryDefeatTick(newState)
    
    newState = processIndustryTick(newState)
    
    const dailyNews = generateDailyNews(newState.day, Math.floor(Math.random() * 3) + 2)
    newState = addNewsToState(newState, dailyNews)
    
    const { state: stateAfterAI, news: aiNews } = simulateAIActions(newState)
    newState = addNewsToState(stateAfterAI, aiNews)
    
    newState.politicalCapital = Math.min(999, newState.politicalCapital + newState.dailyPoliticalGain)
    
    newState.policies = newState.policies.map(policy => {
      if (policy.implementationProgress > 0 && policy.implementationProgress < policy.implementationDays) {
        const newProgress = policy.implementationProgress + 1
        if (newProgress >= policy.implementationDays) {
          const modifier: Modifier = {
            id: `policy_${policy.id}`,
            name: policy.name,
            effects: policy.effects,
            duration: Infinity,
            source: '政策',
          }
          newState.modifiers.push(modifier)
          
          newState.news.push({
            id: `policy_activate_${policy.id}_${Date.now()}`,
            day: newState.day,
            headline: `⚡「${policy.name}」正式生效`,
            content: `经过漫长的立法程序，这项政策今天起全面实施`,
            category: 'economic',
            severity: 'normal',
            isRead: false,
          })
          
          return { ...policy, implementationProgress: 0, isActive: true }
        }
        return { ...policy, implementationProgress: newProgress }
      }
      return policy
    })
    
    if (newState.news.length > 100) {
      newState.news = newState.news.slice(-50)
    }
    
    newState.interestGroups = newState.interestGroups.map(group => {
      let approvalChange = 0
      
      newState.policies.forEach(policy => {
        if (policy.isActive) {
          if (group.supportedPolicies.includes(policy.id)) {
            approvalChange += 0.3
          }
          if (group.opposedPolicies.includes(policy.id)) {
            approvalChange -= 0.5
          }
        }
      })
      
      if (newState.stats.stability > 70) approvalChange += 1
      if (newState.stats.stability < 40) approvalChange -= 2
      if (newState.stats.inflation > 15) approvalChange -= 3
      
      const newApproval = Math.max(0, Math.min(100, group.approval + approvalChange * 0.01))
      
      return {
        ...group,
        approval: newApproval,
        radicalism: Math.max(0, Math.min(100, group.radicalism + (50 - newApproval) * 0.005)),
      }
    })
    
    const mostRadicalGroup = newState.interestGroups.reduce((max, g) => g.radicalism > max.radicalism ? g : max, newState.interestGroups[0])
    if (mostRadicalGroup.radicalism > 75 && !newState.activeEvent && Math.random() < (mostRadicalGroup.radicalism - 75) * 0.003) {
      newState.activeEvent = {
        id: 'group_' + mostRadicalGroup.id + '_action',
        name: mostRadicalGroup.name + '采取激进行动！',
        icon: mostRadicalGroup.icon,
        severity: mostRadicalGroup.radicalism > 85 ? 'catastrophic' : 'major',
        probability: 1,
        cooldownDays: 120,
        triggerConditions: {},
        effects: [],
        options: [
          {
            text: '武力镇压，逮捕头目',
            effects: [
              { type: 'stability' as const, value: -15 },
              { type: 'pop_approval' as const, value: -10 },
            ],
            aiSelectionWeight: 30,
          },
          {
            text: '妥协谈判，释放好处',
            effects: [
              { type: 'treasury' as const, value: -50000 },
              { type: 'bureaucracy' as const, value: -15 },
            ],
            aiSelectionWeight: 50,
          },
          {
            text: '分化瓦解，内部矛盾',
            effects: [
              { type: 'stability' as const, value: -8 },
              { type: 'political_capital' as const, value: -50 },
            ],
            aiSelectionWeight: 20,
          },
        ],
      }
      mostRadicalGroup.radicalism = Math.max(20, mostRadicalGroup.radicalism - 25)
    }
    
    if (!newState.activeEvent) {
      const { newState: stateAfterEventCheck, triggeredEvent } = checkAndTriggerEvents(newState)
      newState = stateAfterEventCheck
      if (triggeredEvent) {
        newState.activeEvent = triggeredEvent
      }
    }
    
    if (newState.activeNationalFocus) {
      const focusIndex = newState.nationalFocuses.findIndex(f => f.id === newState.activeNationalFocus)
      if (focusIndex >= 0 && !newState.nationalFocuses[focusIndex].isCompleted) {
        newState.nationalFocuses[focusIndex].progress += 1
        newState.nationalFocuses[focusIndex].isActive = true
        if (newState.nationalFocuses[focusIndex].progress >= newState.nationalFocuses[focusIndex].duration) {
          newState.nationalFocuses[focusIndex].isCompleted = true
          newState.nationalFocuses[focusIndex].isActive = false
          newState.activeNationalFocus = null
          
          if (newState.nationalFocuses[focusIndex].rewards.type === 'spirit') {
            newState.nationalSpirits.push({
              id: 'focus_reward_' + newState.nationalFocuses[focusIndex].id,
              name: newState.nationalFocuses[focusIndex].name + '成就',
              icon: newState.nationalFocuses[focusIndex].icon,
              description: newState.nationalFocuses[focusIndex].description,
              effects: [{ type: 'general', value: 10, description: '国策完成' }],
            })
          }
        }
      }
    }
    
    newState.defeatConditions = newState.defeatConditions.map(condition => {
      if (condition.isTriggered) return condition
      
      let allMet = true
      condition.conditions.forEach(c => {
        const currentValue = getStatValue(newState, c.type)
        const isMet = c.comparison === 'above' ? currentValue > c.threshold : currentValue < c.threshold
        if (isMet) {
          c.currentDays += 1
        } else {
          c.currentDays = 0
        }
        if (c.currentDays < c.consecutiveDays) allMet = false
      })
      
      if (allMet) {
        newState.gameStatus = 'defeat'
        newState.endCondition = { type: 'defeat', name: condition.name, description: condition.description, icon: '💀' }
        return { ...condition, isTriggered: true }
      }
      return condition
    })
    
    newState.victoryConditions = newState.victoryConditions.map(condition => {
      if (condition.isTriggered) return condition
      
      let allMet = true
      condition.conditions.forEach(c => {
        const currentValue = getStatValue(newState, c.type)
        const isMet = c.comparison === 'above' ? currentValue > c.threshold : currentValue < c.threshold
        if (isMet) {
          c.currentDays += 1
        } else {
          c.currentDays = 0
        }
        if (c.currentDays < c.consecutiveDays) allMet = false
      })
      
      if (allMet) {
        newState.gameStatus = 'victory'
        newState.endCondition = { type: 'victory', name: condition.name, description: condition.description, icon: '🏆' }
        return { ...condition, isTriggered: true }
      }
      return condition
    })
    
    newState.modifiers = newState.modifiers
      .map(m => ({ ...m, duration: m.duration - 1 }))
      .filter(m => m.duration > 0)
  }
  
  return newState
}

function getStatValue(state: EconomyState, type: string): number {
  switch (type) {
    case 'stability': return state.stats.stability
    case 'inflation': return state.stats.inflation
    case 'gdp': return state.stats.gdp
    case 'debt': return (state.treasury.debt / Math.max(1, state.stats.gdp)) * 100
    case 'treasury': return state.treasury.gold
    case 'unemployment': return state.stats.unemployment
    default: return 50
  }
}

export function executeTradeOrder(state: EconomyState, order: TradeOrder): { newState: EconomyState; filledOrder: TradeOrder } {
  const market = state.market[order.commodityId]
  if (!market) return { newState: state, filledOrder: { ...order, status: 'cancelled' } }
  
  let filled = 0
  
  if (order.type === 'buy') {
    const available = Math.min(market.stock, order.amount)
    const canAfford = state.treasury.gold / Math.max(1, order.price)
    filled = Math.min(available, canAfford, order.amount - order.filled)
  } else {
    filled = Math.min(order.amount - order.filled, order.amount)
  }
  
  filled = Math.max(0, filled)
  
  const newStatus: TradeOrder['status'] = filled + order.filled >= order.amount ? 'completed' :
                    filled > 0 ? 'partial' : 'pending'
  
  const filledOrder = {
    ...order,
    filled: order.filled + filled,
    status: newStatus,
  }
  
  const newMarket = { ...state.market }
  const newTreasury = { ...state.treasury }
  
  if (order.type === 'buy') {
    newMarket[order.commodityId] = {
      ...market,
      stock: Math.max(0, market.stock - filled),
    }
    newTreasury.gold = Math.max(0, newTreasury.gold - filled * order.price)
  } else {
    newMarket[order.commodityId] = {
      ...market,
      stock: market.stock + filled,
    }
    newTreasury.gold += filled * order.price
  }
  
  return {
    newState: { ...state, market: newMarket, treasury: newTreasury },
    filledOrder,
  }
}

export function adjustTaxRate(state: EconomyState, taxType: keyof EconomyState['treasury']['taxes'], newRate: number): EconomyState {
  const clampedRate = clamp(newRate, 0, 80)
  
  const newState = { ...state }
  newState.treasury = {
    ...newState.treasury,
    taxes: {
      ...newState.treasury.taxes,
      [taxType]: clampedRate,
    },
  }
  
  const rateChange = clampedRate - state.treasury.taxes[taxType]
  const approvalImpact = rateChange * -0.3
  
  newState.pops = newState.pops.map(p => ({
    ...p,
    approval: clamp(p.approval + approvalImpact, 0, 100),
  }))
  
  return newState
}

export function adjustSubsidy(state: EconomyState, subsidyType: keyof EconomyState['treasury']['subsidies'], newAmount: number): EconomyState {
  const clampedAmount = Math.max(0, newAmount)
  
  const newState = { ...state }
  newState.treasury = {
    ...newState.treasury,
    subsidies: {
      ...newState.treasury.subsidies,
      [subsidyType]: clampedAmount,
    },
  }
  
  if (subsidyType === 'poor') {
    newState.pops = newState.pops.map(p => ({
      ...p,
      approval: clamp(p.approval + 0.1, 0, 100),
      standardOfLiving: clamp(p.standardOfLiving + 0.05, 0, 100),
    }))
  }
  
  return newState
}

export function issueDebt(state: EconomyState, amount: number): EconomyState {
  if (amount <= 0) return state
  
  const newState = { ...state }
  newState.treasury = {
    ...newState.treasury,
    gold: newState.treasury.gold + amount,
    debt: newState.treasury.debt + amount,
    interestRate: clamp(newState.treasury.interestRate + amount / 50000, 0.02, 0.25),
  }
  
  return newState
}

export function repayDebt(state: EconomyState, amount: number): EconomyState {
  const actualAmount = Math.min(amount, state.treasury.gold, state.treasury.debt)
  if (actualAmount <= 0) return state
  
  const newState = { ...state }
  newState.treasury = {
    ...newState.treasury,
    gold: newState.treasury.gold - actualAmount,
    debt: newState.treasury.debt - actualAmount,
    interestRate: clamp(newState.treasury.interestRate - actualAmount / 25000, 0.02, 0.25),
  }
  
  return newState
}

export function constructBuilding(state: EconomyState, template: Omit<Building, 'id' | 'profitability'> & { id: string }): EconomyState {
  const cost = template.level * 100 + Object.keys(template.inputs).length * 50
  if (state.treasury.gold < cost) return state
  
  const newState = { ...state }
  const newBuilding: Building = {
    ...template,
    id: `${template.id}_${Date.now()}`,
    profitability: 0,
  }
  
  newState.treasury = {
    ...newState.treasury,
    gold: newState.treasury.gold - cost,
  }
  newState.buildings = [...newState.buildings, newBuilding]
  
  return newState
}

export function demolishBuilding(state: EconomyState, buildingId: string): EconomyState {
  const building = state.buildings.find(b => b.id === buildingId)
  if (!building) return state
  
  const refund = building.level * 25
  
  const newState = { ...state }
  newState.treasury = {
    ...newState.treasury,
    gold: newState.treasury.gold + refund,
  }
  newState.buildings = newState.buildings.filter(b => b.id !== buildingId)
  
  return newState
}

export function toggleBuilding(state: EconomyState, buildingId: string): EconomyState {
  const newState = { ...state }
  newState.buildings = newState.buildings.map(b => 
    b.id === buildingId ? { ...b, isActive: !b.isActive } : b
  )
  return newState
}

export function hireWorkers(state: EconomyState, buildingId: string, amount: number): EconomyState {
  const totalUnemployed = state.stats.population * 0.52 * 0.65 - state.buildings.reduce((s, b) => s + b.workers, 0)
  const actualHire = Math.min(amount, Math.max(0, totalUnemployed))
  
  const newState = { ...state }
  newState.buildings = newState.buildings.map(b => 
    b.id === buildingId ? { ...b, workers: Math.min(b.maxWorkers, b.workers + actualHire) } : b
  )
  return newState
}

export function fireWorkers(state: EconomyState, buildingId: string, amount: number): EconomyState {
  const newState = { ...state }
  newState.buildings = newState.buildings.map(b => 
    b.id === buildingId ? { ...b, workers: Math.max(0, b.workers - amount) } : b
  )
  
  newState.pops = newState.pops.map(p => ({
    ...p,
    approval: clamp(p.approval - amount / 200, 0, 100),
  }))
  
  return newState
}

export function printMoney(state: EconomyState, amount: number): EconomyState {
  if (amount <= 0) return state
  
  const newState = JSON.parse(JSON.stringify(state)) as EconomyState
  
  const moneySupplyRatio = amount / Math.max(1, newState.stats.gdp * 1)
  
  newState.treasury.gold += amount
  
  const inflationEffect = moneySupplyRatio * 100
  
  newState.stats.inflation = clamp(
    newState.stats.inflation + inflationEffect,
    -5,
    500
  )
  
  newState.stats.legitimacy = clamp(
    newState.stats.legitimacy - inflationEffect * 0.8,
    0,
    100
  )
  
  newState.stats.stability = clamp(
    newState.stats.stability - inflationEffect * 0.6,
    0,
    100
  )
  
  Object.keys(newState.market).forEach(commodityId => {
    newState.market[commodityId] = {
      ...newState.market[commodityId],
      price: newState.market[commodityId].price * (1 + moneySupplyRatio),
    }
  })
  
  newState.pops = newState.pops.map(p => ({
    ...p,
    approval: clamp(p.approval - inflationEffect * 0.3, 0, 100),
  }))
  
  return newState
}

export function resetGame(state: EconomyState, createInitialState: () => EconomyState): EconomyState {
  return createInitialState()
}

export function togglePolicy(state: EconomyState, policyId: string): {
  success: boolean
  message: string
  state: EconomyState
} {
  const newState = deepClone(state)
  const policy = newState.policies.find(p => p.id === policyId)
  
  if (!policy) {
    return { success: false, message: '❌ 政策不存在', state }
  }
  
  if (policy.isActive) {
    policy.isActive = false
    policy.implementationProgress = 0
    newState.modifiers = newState.modifiers.filter(m => !m.id.startsWith(`policy_${policyId}`))
    newState.politicalCapital = Math.min(999, newState.politicalCapital + Math.floor(policy.politicalCost / 2))
    return { 
      success: true, 
      message: `✅ 已取消「${policy.name}」，返还 ${Math.floor(policy.politicalCost / 2)} 政治点数`,
      state: newState 
    }
  }
  
  if (policy.implementationProgress > 0) {
    return {
      success: false,
      message: `⏳「${policy.name}」正在议会辩论中，请耐心等待`,
      state
    }
  }
  
  if (policy.mutuallyExclusive && policy.mutuallyExclusive.length > 0) {
    const activeMutual = newState.policies.find(p => 
      policy.mutuallyExclusive!.includes(p.id) && (p.isActive || p.implementationProgress > 0)
    )
    if (activeMutual) {
      return {
        success: false,
        message: `❌ 与「${activeMutual.name}」互斥！鱼和熊掌不可兼得，请先取消该政策`,
        state
      }
    }
  }
  
  if (newState.politicalCapital < policy.politicalCost) {
    return {
      success: false,
      message: `❌ 政治点数不足：需要 ${policy.politicalCost}，当前 ${Math.floor(newState.politicalCapital)}`,
      state
    }
  }
  
  if (policy.requirements) {
    if (policy.requirements.stability && newState.stats.stability < policy.requirements.stability) {
      return { 
        success: false, 
        message: `❌ 稳定度不足：需要 ${policy.requirements.stability}，当前 ${Math.floor(newState.stats.stability)}`,
        state 
      }
    }
    if (policy.requirements.bureaucracy && newState.stats.bureaucracy < policy.requirements.bureaucracy) {
      return { 
        success: false, 
        message: `❌ 行政能力不足：需要 ${policy.requirements.bureaucracy}，当前 ${Math.floor(newState.stats.bureaucracy)}`,
        state 
      }
    }
    if (policy.requirements.legitimacy && newState.stats.legitimacy < policy.requirements.legitimacy) {
      return { 
        success: false, 
        message: `❌ 合法性不足：需要 ${policy.requirements.legitimacy}，当前 ${Math.floor(newState.stats.legitimacy)}`,
        state 
      }
    }
  }
  
  if (newState.treasury.gold < policy.implementationCost) {
    return { 
      success: false, 
      message: `❌ 国库资金不足：需要 ¥${policy.implementationCost} 亿`,
      state 
    }
  }
  
  let passageChance = 0.85
  let legislativeBody = '全国人民代表大会'
  
  switch (state.countryId) {
    case 'china':
      passageChance = 0.85
      legislativeBody = '全国人民代表大会'
      break
    case 'usa':
      passageChance = 0.65
      legislativeBody = '美国国会'
      if (state.stats.stability < 40) passageChance -= 0.15
      break
    case 'france':
      passageChance = 0.72
      legislativeBody = '国民议会'
      if (state.stats.stability < 35) passageChance -= 0.20
      break
    case 'germany':
      passageChance = 0.78
      legislativeBody = '联邦议院'
      break
    case 'japan':
      passageChance = 0.80
      legislativeBody = '国会'
      break
    case 'uk':
      passageChance = 0.75
      legislativeBody = '威斯敏斯特议会'
      break
    default:
      passageChance = 0.75
  }
  
  state.interestGroups.forEach(group => {
    const powerFactor = group.power / 100
    if (group.supportedPolicies.includes(policyId)) {
      passageChance += powerFactor * 0.25
    }
    if (group.opposedPolicies.includes(policyId)) {
      passageChance -= powerFactor * 0.30
    }
  })
  
  passageChance = Math.max(0.05, Math.min(0.99, passageChance))
  
  if (Math.random() > passageChance) {
    newState.politicalCapital -= Math.floor(policy.politicalCost * 0.5)
    return {
      success: false,
      message: `❌「${policy.name}」在${legislativeBody}被否决！投票通过率 ${Math.floor(passageChance * 100)}%，已退还半数政治点数`,
      state: newState
    }
  }
  
  newState.treasury.gold -= policy.implementationCost
  newState.politicalCapital -= policy.politicalCost
  policy.implementationProgress = 1
  
  return {
    success: true,
    message: `✅「${policy.name}」获${legislativeBody}通过！投票通过率 ${Math.floor(passageChance * 100)}%，预计 ${policy.implementationDays} 天后生效`,
    state: newState
  }
}

export function makeAIDecision(state: EconomyState): EconomyState {
  const availablePolicies = state.policies.filter(p => 
    !p.isActive && 
    p.implementationProgress === 0 &&
    !p.mutuallyExclusive?.some(id => state.policies.find(p2 => p2.id === id && p2.isActive)) &&
    state.treasury.gold >= p.implementationCost &&
    state.politicalCapital >= p.politicalCost &&
    (!p.requirements?.stability || state.stats.stability >= p.requirements.stability) &&
    (!p.requirements?.bureaucracy || state.stats.bureaucracy >= p.requirements.bureaucracy)
  )

  if (availablePolicies.length > 0 && Math.random() < 0.03) {
    const randomPolicy = availablePolicies[Math.floor(Math.random() * availablePolicies.length)]
    const result = togglePolicy(state, randomPolicy.id)
    if (result.success) {
      return result.state
    }
  }

  if (Math.random() < 0.01 && state.treasury.interestRate < 0.25) {
    state.treasury.interestRate += 0.005
  } else if (Math.random() < 0.01 && state.treasury.interestRate > 0.01) {
    state.treasury.interestRate -= 0.005
  }

  if (Math.random() < 0.02 && state.treasury.gold > 1000) {
    state.treasury.gold -= Math.random() * 500
    state.treasury.debt += Math.random() * 1000
  }

  return state
}

export function preRunHistory(state: EconomyState, days: number = 365): EconomyState {
  let newState = { ...state }
  
  for (let i = 0; i < days; i++) {
    newState = executeEconomyTick(newState)
    newState = makeAIDecision(newState)
  }

  newState.news.push({
    id: 'game_start',
    day: newState.day,
    headline: '🎮 你临危受命接管国家！',
    content: `经过 ${days} 天的动荡时期，你正式接任国家领导人。前任留下了通胀率 ${newState.stats.inflation.toFixed(1)}%、失业率 ${newState.stats.unemployment.toFixed(1)}%、债务 ¥${Math.floor(newState.treasury.debt).toLocaleString()} 的烂摊子...`,
    category: 'economic',
    severity: 'major',
    isRead: false,
  })

  newState.politicalCapital = 100
  
  return newState
}
