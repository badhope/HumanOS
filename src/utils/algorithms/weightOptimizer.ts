import { dimensionEntropy } from './informationEntropy'

export interface OptimizedWeights {
  weights: Record<string, number>
  entropy: number
  discrimination: number
  reliability: number
}

export function optimizeWeights(
  rawScores: Record<string, number>,
  itemCounts: Record<string, number>
): OptimizedWeights {
  const keys = Object.keys(rawScores)
  if (keys.length === 0) {
    return { weights: {}, entropy: 0, discrimination: 0, reliability: 0 }
  }

  const entropy = dimensionEntropy(rawScores)
  const maxEntropy = Math.log2(keys.length)
  const normalizedEntropy = maxEntropy > 0 ? entropy / maxEntropy : 0

  const rawWeights: Record<string, number> = {}
  keys.forEach(key => {
    const score = rawScores[key]
    const count = itemCounts[key] || 1
    const reliabilityFactor = Math.min(count / 10, 1)
    rawWeights[key] = Math.abs(score) * (0.5 + 0.5 * reliabilityFactor)
  })

  const totalWeight = Object.values(rawWeights).reduce((s, w) => s + w, 0)
  const normalizedWeights: Record<string, number> = {}
  keys.forEach(key => {
    normalizedWeights[key] = totalWeight > 0 ? rawWeights[key] / totalWeight : 1 / keys.length
  })

  const discrimination = calculateDiscrimination(rawScores)
  const reliability = Math.min(1, normalizedEntropy * 0.4 + discrimination * 0.3 + 0.3)

  return {
    weights: normalizedWeights,
    entropy: normalizedEntropy,
    discrimination,
    reliability,
  }
}

function calculateDiscrimination(scores: Record<string, number>): number {
  const values = Object.values(scores)
  if (values.length <= 1) return 0
  const mean = values.reduce((s, v) => s + v, 0) / values.length
  const variance = values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length
  const stdDev = Math.sqrt(variance)
  const cv = mean !== 0 ? stdDev / Math.abs(mean) : 0
  return Math.min(1, cv)
}

export function adjustScoreWithEntropy(
  rawScore: number,
  answerEntropy: number,
  maxEntropy: number
): number {
  if (maxEntropy === 0) return rawScore
  const entropyRatio = answerEntropy / maxEntropy
  const adjustment = 1 + (entropyRatio - 0.5) * 0.1
  return Math.round(rawScore * adjustment)
}

export function calculateResultConfidence(
  dimensions: Array<{ score: number; maxScore?: number }>,
  answerCount: number,
  entropyValue: number,
  maxEntropy: number
): number {
  let baseConfidence = 70
  if (answerCount >= 20) baseConfidence += 10
  if (answerCount >= 30) baseConfidence += 5
  const entropyBonus = maxEntropy > 0 ? (entropyValue / maxEntropy) * 10 : 5
  const dimensionCoverage = Math.min(dimensions.length / 5, 1) * 5
  return Math.min(99, Math.round(baseConfidence + entropyBonus + dimensionCoverage))
}
