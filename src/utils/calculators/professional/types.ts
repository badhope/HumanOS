import type { Answer, ProfessionalAssessmentResult, SubscaleScore } from '../../../types'
import {
  rawToTScore,
  calculatePercentile,
  calculateConfidenceInterval,
  calculateDimensionBalance,
  STANDARD_NORMS,
} from '../../professionalScoring'
import { createRiskAssessment } from '../../professionalScoring'

export {
  rawToTScore as calculateTScore,
  calculatePercentile as calculatePercentileFromTScore,
  calculateConfidenceInterval,
  calculateDimensionBalance,
  STANDARD_NORMS,
}

export type { Answer, ProfessionalAssessmentResult, SubscaleScore }
export { createRiskAssessment }

export function calculateAccuracy(answeredCount: number, totalQuestions: number): number {
  const completionRate = answeredCount / totalQuestions
  const baseAccuracy = 85
  const maxBonus = 15
  return Math.min(99, Math.round(baseAccuracy + completionRate * maxBonus))
}

export function calculatePreferenceClarity(scoreA: number, scoreB: number): number {
  const total = scoreA + scoreB
  if (total === 0) return 0
  return Math.round(Math.abs(scoreA - scoreB) / total * 100)
}
