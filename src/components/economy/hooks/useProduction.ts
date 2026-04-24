import { useCallback, useMemo } from 'react'
import type { Industry, Building } from '../types/economy-types'

export function useProduction(industries: Industry[]) {
  const calculateIndustryOutput = useCallback((industry: Industry) => {
    const totalOutput: Record<string, number> = {}
    industry.buildings.forEach(building => {
      if (!building.isActive) return
      const efficiency = building.efficiency * (building.workers / Math.max(1, building.maxWorkers))
      Object.entries(building.production).forEach(([commodity, amount]) => {
        totalOutput[commodity] = (totalOutput[commodity] || 0) + amount * efficiency
      })
    })
    return totalOutput
  }, [])

  const totalProduction = useMemo(() => {
    const output: Record<string, number> = {}
    industries.forEach(industry => {
      const industryOutput = calculateIndustryOutput(industry)
      Object.entries(industryOutput).forEach(([commodity, amount]) => {
        output[commodity] = (output[commodity] || 0) + amount
      })
    })
    return output
  }, [industries, calculateIndustryOutput])

  const toggleBuilding = useCallback((industryId: string, buildingId: string, industries: Industry[]) => {
    return industries.map(industry => {
      if (industry.id !== industryId) return industry
      return {
        ...industry,
        buildings: industry.buildings.map(b =>
          b.id === buildingId ? { ...b, isActive: !b.isActive } : b
        ),
      }
    })
  }, [])

  const hireWorkers = useCallback((industryId: string, buildingId: string, amount: number, industries: Industry[]) => {
    return industries.map(industry => {
      if (industry.id !== industryId) return industry
      return {
        ...industry,
        buildings: industry.buildings.map(b => {
          if (b.id !== buildingId) return b
          return {
            ...b,
            workers: Math.min(b.maxWorkers, Math.max(0, b.workers + amount)),
          }
        }),
      }
    })
  }, [])

  const fireWorkers = useCallback((industryId: string, buildingId: string, amount: number, industries: Industry[]) => {
    return hireWorkers(industryId, buildingId, -amount, industries)
  }, [hireWorkers])

  return {
    totalProduction,
    calculateIndustryOutput,
    toggleBuilding,
    hireWorkers,
    fireWorkers,
  }
}
