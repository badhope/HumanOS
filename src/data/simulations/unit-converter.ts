export type UnitSystem = 'legacy' | 'standard' | 'display'

export interface UnitConversionOptions {
  sourceSystem: UnitSystem
  targetSystem: UnitSystem
  targetCurrency?: string
}

export class UnitConverter {
  static readonly LEGACY_TO_STANDARD = {
    population: 1 / 1000000,
    gdp: 1 / 1000,
    treasury: 1 / 1000,
    debt: 1 / 1000,
    currencyReserves: 1 / 1000,
  }

  static convertPopulation(value: number, from: UnitSystem, to: UnitSystem): number {
    if (from === to) return value
    if (from === 'legacy' && to === 'standard') return value * this.LEGACY_TO_STANDARD.population
    if (from === 'standard' && to === 'legacy') return value / this.LEGACY_TO_STANDARD.population
    return value
  }

  static convertGDP(value: number, from: UnitSystem, to: UnitSystem): number {
    if (from === to) return value
    if (from === 'legacy' && to === 'standard') return value * this.LEGACY_TO_STANDARD.gdp
    if (from === 'standard' && to === 'legacy') return value / this.LEGACY_TO_STANDARD.gdp
    return value
  }

  static convertMoney(value: number, from: UnitSystem, to: UnitSystem): number {
    if (from === to) return value
    if (from === 'legacy' && to === 'standard') return value * this.LEGACY_TO_STANDARD.treasury
    if (from === 'standard' && to === 'legacy') return value / this.LEGACY_TO_STANDARD.treasury
    return value
  }

  static convertState(
    state: Record<string, any>,
    options: UnitConversionOptions
  ): Record<string, any> {
    const { sourceSystem, targetSystem } = options
    if (sourceSystem === targetSystem) return state

    const result: Record<string, any> = { ...state }

    if (state.population) {
      result.population = this.convertPopulation(state.population, sourceSystem, targetSystem)
    }

    if (state.gdp) {
      result.gdp = this.convertGDP(state.gdp, sourceSystem, targetSystem)
    }

    if (state.treasury !== undefined) {
      result.treasury = this.convertMoney(state.treasury, sourceSystem, targetSystem)
    }

    if (state.debt !== undefined) {
      result.debt = this.convertMoney(state.debt, sourceSystem, targetSystem)
    }

    if (state.currencyReserves !== undefined) {
      result.currencyReserves = this.convertMoney(state.currencyReserves, sourceSystem, targetSystem)
    }

    return result
  }

  static formatMoney(value: number, system: UnitSystem = 'standard'): string {
    const scales = [
      { threshold: 1000000, suffix: 'T', divisor: 1000000 },
      { threshold: 1000, suffix: 'B', divisor: 1000 },
      { threshold: 1, suffix: 'B', divisor: 1 },
    ]

    for (const scale of scales) {
      if (value >= scale.threshold) {
        return `$${(value / scale.divisor).toFixed(1)}${scale.suffix}`
      }
    }

    return `$${value.toFixed(0)}M`
  }

  static formatPopulation(value: number, system: UnitSystem = 'standard'): string {
    if (system === 'standard') {
      if (value >= 1000) return `${(value / 1000).toFixed(1)}B 人`
      return `${value.toFixed(1)}M 人`
    } else {
      if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B 人`
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M 人`
      return `${(value / 1000).toFixed(0)}K 人`
    }
  }
}

export function standardizeCountryStats(legacyCountry: any): Record<string, any> {
  return {
    ...legacyCountry,
    initialStats: UnitConverter.convertState(legacyCountry.initialStats, {
      sourceSystem: 'legacy',
      targetSystem: 'standard',
    }),
  }
}

export const COUNTRY_STANDARDIZATION_MAP: Record<string, string> = {
  usa: 'USA',
  china: 'CHN',
  germany: 'DEU',
  japan: 'JPN',
  uk: 'GBR',
  france: 'FRA',
  russia: 'RUS',
  india: 'IND',
  brazil: 'BRA',
  southkorea: 'KOR',
  prussia: 'PRU',
  russian_empire: 'RUS_EMP',
}

export function getStandardUnitProfile(countryId: string) {
  const code = COUNTRY_STANDARDIZATION_MAP[countryId] || 'RUS'
  const { COUNTRY_UNIT_PROFILES } = require('./standard-units-system')
  return COUNTRY_UNIT_PROFILES[code]
}

export function formatStateForDisplay(state: Record<string, any>, countryId: string): Record<string, any> {
  const profile = getStandardUnitProfile(countryId)
  const standardState = state.gdp > 100000 ? UnitConverter.convertState(state, {
    sourceSystem: 'legacy',
    targetSystem: 'standard',
  }) : state

  return {
    population: UnitConverter.formatPopulation(standardState.population),
    gdp: `$${standardState.gdp.toFixed(0)}B`,
    gdpLocal: `${profile.currency.symbol}${(standardState.gdp * profile.currency.exchangeRateVsUSD).toFixed(0)}B ${profile.currency.isoCode}`,
    gdpPerCapita: `$${standardState.gdpPerCapita?.toFixed(0) || (standardState.gdp * 1000 / standardState.population).toFixed(0)}`,
    inflation: `${standardState.inflation.toFixed(1)}%`,
    unemployment: `${standardState.unemployment.toFixed(1)}%`,
    treasury: `$${standardState.treasury.toFixed(1)}B`,
    debt: `$${standardState.debt.toFixed(1)}B`,
    debtToGdp: `${(standardState.debt / standardState.gdp * 100).toFixed(0)}%`,
  }
}
