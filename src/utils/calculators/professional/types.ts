import type { Answer, ProfessionalAssessmentResult, SubscaleScore } from '../../../types'
import {
  calculateTScore,
  calculatePercentileFromTScore,
  getScoreRange,
  calculateConfidenceInterval,
  calculateDimensionBalance,
  MBTI_MATH_SYSTEM,
  BIGFIVE_MATH_SYSTEM,
  SAS_MATH_SYSTEM,
  EQ_MATH_SYSTEM,
  HOLLAND_MATH_SYSTEM,
  ATTACHMENT_MATH_SYSTEM,
} from '../../mathSystem'
import { createRiskAssessment } from '../../professionalScoring'

export {
  calculateTScore,
  calculatePercentileFromTScore,
  getScoreRange,
  calculateConfidenceInterval,
  calculateDimensionBalance,
  MBTI_MATH_SYSTEM,
  BIGFIVE_MATH_SYSTEM,
  SAS_MATH_SYSTEM,
  EQ_MATH_SYSTEM,
  HOLLAND_MATH_SYSTEM,
  ATTACHMENT_MATH_SYSTEM,
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
