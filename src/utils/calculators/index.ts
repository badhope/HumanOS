import { calculateSAS, SASResult } from './sas-calculator'
import { calculateECR, ECRResult } from './ecr-calculator'
import { calculateHolland, HollandResult } from './holland-calculator'

export type { SASResult, ECRResult, HollandResult }

export const standardCalculators = {
  'sas-standard': calculateSAS,
  'ecr-attachment': calculateECR,
  'holland-sds': calculateHolland,
}

export type StandardCalculatorId = keyof typeof standardCalculators

export const getStandardCalculator = (id: StandardCalculatorId) => {
  return standardCalculators[id]
}
