import type { Answer, SubscaleScore, ProfileDimension, RiskAssessment, ProfessionalAssessmentResult } from '../types'

export interface NormData {
  population: string
  mean: number
  sd: number
  n: number
  percentiles: Record<number, number>
}

export interface ScaleConfig {
  name: string
  items: number[]
  reverseItems?: number[]
  maxItemScore: number
  normData?: NormData
}

export function calculateRawScore(
  answers: Answer[],
  itemIds: string[],
  reverseItems: string[] = [],
  maxItemScore: number = 5
): number {
  let rawScore = 0
  itemIds.forEach((itemId) => {
    const answer = answers.find((a) => a.questionId === itemId)
    if (answer && answer.value !== undefined) {
      if (reverseItems.includes(itemId)) {
        rawScore += maxItemScore - answer.value + 1
      } else {
        rawScore += answer.value
      }
    }
  })
  return rawScore
}

export function rawToStandardScore(
  rawScore: number,
  maxScore: number,
  normMean: number = 50,
  normSD: number = 10
): number {
  const percentage = rawScore / maxScore
  return Math.round(normMean + (percentage - 0.5) * normSD * 2)
}

export function rawToTScore(
  rawScore: number,
  mean: number,
  sd: number
): number {
  return Math.round(50 + 10 * ((rawScore - mean) / sd))
}

export function rawToZScore(
  rawScore: number,
  mean: number,
  sd: number
): number {
  return (rawScore - mean) / sd
}

export function calculatePercentile(
  score: number,
  percentiles: Record<number, number>
): number {
  const keys = Object.keys(percentiles).map(Number).sort((a, b) => a - b)
  for (let i = 0; i < keys.length; i++) {
    if (score <= percentiles[keys[i]]) {
      if (i === 0) return keys[i]
      const lowerKey = keys[i - 1]
      const upperKey = keys[i]
      const lowerVal = percentiles[lowerKey]
      const upperVal = percentiles[upperKey]
      const ratio = (score - lowerVal) / (upperVal - lowerVal)
      return Math.round(lowerKey + ratio * (upperKey - lowerKey))
    }
  }
  return 99
}

export function calculateCronbachAlpha(
  itemScores: number[][],
  totalScores: number[]
): number {
  const n = itemScores[0]?.length || 0
  if (n === 0) return 0

  const itemVariances = itemScores.map((scores) => {
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length
    return scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length
  })

  const totalVariance = (() => {
    const mean = totalScores.reduce((a, b) => a + b, 0) / totalScores.length
    return totalScores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / totalScores.length
  })()

  const sumItemVariances = itemVariances.reduce((a, b) => a + b, 0)
  return (n / (n - 1)) * (1 - sumItemVariances / totalVariance)
}

export function calculateConfidenceInterval(
  score: number,
  sem: number,
  confidenceLevel: number = 0.95
): { lower: number; upper: number; level: number } {
  const zScore = confidenceLevel === 0.95 ? 1.96 : confidenceLevel === 0.99 ? 2.58 : 1.645
  return {
    lower: Math.round(score - zScore * sem),
    upper: Math.round(score + zScore * sem),
    level: confidenceLevel,
  }
}

export function interpretScoreLevel(
  percentile: number
): 'very_low' | 'low' | 'average' | 'high' | 'very_high' {
  if (percentile < 10) return 'very_low'
  if (percentile < 25) return 'low'
  if (percentile < 75) return 'average'
  if (percentile < 90) return 'high'
  return 'very_high'
}

export function createSubscaleScore(
  rawScore: number,
  maxScore: number,
  normData?: NormData
): SubscaleScore {
  const standardScore = normData
    ? rawToTScore(rawScore, normData.mean, normData.sd)
    : rawToStandardScore(rawScore, maxScore)

  const percentile = normData
    ? calculatePercentile(rawScore, normData.percentiles)
    : Math.round((rawScore / maxScore) * 100)

  const level = interpretScoreLevel(percentile)

  const interpretations: Record<string, string> = {
    very_low: '显著低于平均水平，建议关注并寻求专业指导',
    low: '低于平均水平，存在一定提升空间',
    average: '处于平均水平，表现正常',
    high: '高于平均水平，表现良好',
    very_high: '显著高于平均水平，表现优异',
  }

  return {
    rawScore,
    maxScore,
    standardScore,
    percentile,
    level,
    interpretation: interpretations[level],
  }
}

export function createProfileDimension(
  score: number,
  percentile: number,
  description: string,
  clinicalSignificance?: string
): ProfileDimension {
  let level = '平均'
  if (percentile < 10) level = '极低'
  else if (percentile < 25) level = '偏低'
  else if (percentile < 75) level = '平均'
  else if (percentile < 90) level = '偏高'
  else level = '极高'

  return {
    score,
    percentile,
    level,
    description,
    clinicalSignificance,
  }
}

export function createRiskAssessment(
  scores: Record<string, number>,
  thresholds: Record<string, { warning: number; critical: number }>
): RiskAssessment {
  const indicators: string[] = []
  const recommendations: string[] = []
  let maxRisk: 'minimal' | 'low' | 'moderate' | 'high' | 'severe' = 'minimal'
  let requiresFollowUp = false

  Object.entries(scores).forEach(([scale, score]) => {
    const threshold = thresholds[scale]
    if (threshold) {
      if (score >= threshold.critical) {
        indicators.push(`${scale}得分达到临界值(${score})`)
        recommendations.push(`建议立即就${scale}相关问题寻求专业帮助`)
        maxRisk = 'severe'
        requiresFollowUp = true
      } else if (score >= threshold.warning) {
        indicators.push(`${scale}得分偏高(${score})`)
        recommendations.push(`建议关注${scale}相关问题`)
        if (maxRisk !== 'severe') maxRisk = 'high'
      }
    }
  })

  if (indicators.length === 0) {
    indicators.push('未发现显著风险指标')
    recommendations.push('继续保持良好的心理状态')
  }

  return {
    level: maxRisk,
    indicators,
    recommendations,
    requiresFollowUp,
  }
}

export const STANDARD_NORMS: Record<string, NormData> = {
  general: {
    population: '一般人群',
    mean: 50,
    sd: 10,
    n: 1000,
    percentiles: {
      1: 20,
      5: 30,
      10: 35,
      25: 40,
      50: 50,
      75: 60,
      90: 65,
      95: 70,
      99: 80,
    },
  },
  clinical: {
    population: '临床样本',
    mean: 60,
    sd: 12,
    n: 500,
    percentiles: {
      1: 30,
      5: 40,
      10: 45,
      25: 50,
      50: 60,
      75: 70,
      90: 75,
      95: 80,
      99: 90,
    },
  },
}

export function generateProfessionalResult(
  baseResult: Partial<ProfessionalAssessmentResult>,
  mode: 'normal' | 'advanced' | 'professional'
): ProfessionalAssessmentResult {
  return {
    type: baseResult.type || '',
    title: baseResult.title || '',
    description: baseResult.description || '',
    score: baseResult.score || 0,
    accuracy: baseResult.accuracy || 85,
    dimensions: baseResult.dimensions || [],
    strengths: baseResult.strengths || [],
    weaknesses: baseResult.weaknesses || [],
    careers: baseResult.careers || [],
    mode,
    ...baseResult,
  } as ProfessionalAssessmentResult
}
