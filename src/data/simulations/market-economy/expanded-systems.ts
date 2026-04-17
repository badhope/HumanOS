import type { EconomyState } from './types'
import type { DifficultyLevel } from './difficulty-system'
import { getDifficultyConfig } from './difficulty-system'
import { clamp } from './economy-engine'

const ENVIRONMENTAL_DAMAGE: Record<string, number> = {
  coal_mining: 2.5,
  oil_extraction: 3.0,
  steel_industry: 4.0,
  chemical_industry: 5.0,
  power_generation_coal: 6.0,
  automobile: 2.0,
}

export function calculateEnvironmentTick(state: EconomyState, difficulty: DifficultyLevel): EconomyState {
  const config = getDifficultyConfig(difficulty)
  let newState = { ...state } as any

  if (!newState.environment) {
    newState.environment = {
      pollution: 30,
      renewableEnergyRatio: 0.1,
      environmentalScore: 65,
    }
  }

  let pollutionGeneration = 0
  let industryCount = 0

  for (const industryId of Object.keys(state.industries || {})) {
    industryCount++
    const industry = state.industries[industryId]
    const damageRate = ENVIRONMENTAL_DAMAGE[industryId] || 1.0
    pollutionGeneration += (industry.utilization || 0.5) * damageRate * industry.level
  }

  const techLevel = (state.stats as any).techLevel || 1.0
  const greenTechReduction = Math.min(0.7, techLevel * 0.05)

  newState.environment.pollution += (pollutionGeneration / Math.max(1, industryCount) - 5) * (1 - greenTechReduction) * config.inflationSensitivity
  newState.environment.pollution = clamp(newState.environment.pollution, 0, 100)

  const stabilityImpact = -0.05 * newState.environment.pollution

  newState.stats.stability = clamp(
    newState.stats.stability + stabilityImpact * 0.1,
    0, 100
  )

  newState.stats = newState.stats as any
  newState.stats.techLevel = techLevel + 0.001

  return newState as EconomyState
}

export function calculateResearchTick(state: EconomyState): EconomyState {
  return state
}

export function calculatePopDynamicsTick(state: EconomyState, difficulty: DifficultyLevel): EconomyState {
  const config = getDifficultyConfig(difficulty)
  let newState = { ...state } as any

  const economicPain = state.stats.inflation * 0.5 + state.stats.unemployment * 0.8

  for (const pop of newState.pops) {
    let approvalChange = -economicPain * 0.01 * config.unemploymentSensitivity
    pop.approval = clamp(pop.approval + approvalChange, 0, 100)
  }

  return newState as EconomyState
}

export function executeExpandedSystemsTick(state: EconomyState, difficulty: DifficultyLevel = 'normal'): EconomyState {
  let newState = state

  newState = calculateEnvironmentTick(newState, difficulty)
  newState = calculatePopDynamicsTick(newState, difficulty)

  return newState
}
