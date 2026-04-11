import { POLITICAL_IDEOLOGIES, IDEOLOGY_DIMENSIONS, IDEOLOGY_COMPATIBILITY } from './ideology-theoretical-framework'
import type { AssessmentMode } from './mode-configuration'
import { MODE_CONFIGURATIONS } from './mode-configuration'
import type {
  DimensionScore,
  IdeologyMatch,
  IdeologyConflictAnalysis,
  PerspectiveResult,
  ProfessionalAnalysis,
  ModeSpectrumResult,
} from './ideology-weighted-calculator'

class LRUCache<K, V> {
  private cache: Map<K, V>
  private readonly maxSize: number

  constructor(maxSize: number = 100) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value) {
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }
    this.cache.set(key, value)
  }

  has(key: K): boolean {
    return this.cache.has(key)
  }

  clear(): void {
    this.cache.clear()
  }

  get size(): number {
    return this.cache.size
  }
}

const similarityCache = new LRUCache<string, number>(500)
const vectorCache = new LRUCache<string, number[]>(100)

function getCacheKey(vecA: number[], vecB: number[], prefix: string = ''): string {
  return `${prefix}:${vecA.join(',')}|${vecB.join(',')}`
}

function fastCosineSimilarity(vecA: number[], vecB: number[]): number {
  const cacheKey = getCacheKey(vecA, vecB, 'cosine')
  const cached = similarityCache.get(cacheKey)
  if (cached !== undefined) return cached

  let dotProduct = 0
  let normA = 0
  let normB = 0

  const len = vecA.length
  for (let i = 0; i < len; i++) {
    const a = vecA[i]
    const b = vecB[i]
    dotProduct += a * b
    normA += a * a
    normB += b * b
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB)
  const result = denominator === 0 ? 0 : dotProduct / denominator

  similarityCache.set(cacheKey, result)
  return result
}

function fastWeightedCosineSimilarity(
  vecA: number[],
  vecB: number[],
  weights: number[] = IDEOLOGY_DIMENSIONS.map(d => d.weight)
): number {
  const cacheKey = getCacheKey(vecA, vecB, 'wcosine')
  const cached = similarityCache.get(cacheKey)
  if (cached !== undefined) return cached

  let dotProduct = 0
  let normA = 0
  let normB = 0

  const len = vecA.length
  for (let i = 0; i < len; i++) {
    const w = weights[i]
    const a = vecA[i]
    const b = vecB[i]
    dotProduct += w * a * b
    normA += w * a * a
    normB += w * b * b
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB)
  const result = denominator === 0 ? 0 : dotProduct / denominator

  similarityCache.set(cacheKey, result)
  return result
}

function fastEuclideanDistance(vecA: number[], vecB: number[]): number {
  let sum = 0
  const len = vecA.length
  for (let i = 0; i < len; i++) {
    const diff = vecA[i] - vecB[i]
    sum += diff * diff
  }
  return Math.sqrt(sum)
}

function calibratedEnsembleSimilarity(vecA: number[], vecB: number[]): number {
  const cacheKey = getCacheKey(vecA, vecB, 'ensemble')
  const cached = similarityCache.get(cacheKey)
  if (cached !== undefined) return cached

  const cosine = fastCosineSimilarity(vecA, vecB)
  const weightedCosine = fastWeightedCosineSimilarity(vecA, vecB)
  const distance = fastEuclideanDistance(vecA, vecB)
  const distanceSimilarity = 1 / (1 + distance / 45)

  const pearson = calculatePearsonCorrelation(vecA, vecB)

  const result = (0.30 * cosine) + (0.35 * weightedCosine) + (0.25 * distanceSimilarity) + (0.10 * pearson)

  similarityCache.set(cacheKey, result)
  return result
}

function calculatePearsonCorrelation(vecA: number[], vecB: number[]): number {
  const n = vecA.length
  if (n === 0) return 0

  let sumA = 0, sumB = 0, sumAB = 0, sumASq = 0, sumBSq = 0

  for (let i = 0; i < n; i++) {
    sumA += vecA[i]
    sumB += vecB[i]
    sumAB += vecA[i] * vecB[i]
    sumASq += vecA[i] * vecA[i]
    sumBSq += vecB[i] * vecB[i]
  }

  const numerator = n * sumAB - sumA * sumB
  const denominator = Math.sqrt((n * sumASq - sumA * sumA) * (n * sumBSq - sumB * sumB))

  return denominator === 0 ? 0.5 : (numerator / denominator + 1) / 2
}

function calculateDimensionScoresOptimized(
  answers: Record<string, number>,
  questionDimensions: Record<string, string>
): DimensionScore[] {
  const dimensionSums: Record<string, { sum: number; count: number; weights: number[] }> = {}

  const entries = Object.entries(answers)
  const len = entries.length

  for (let i = 0; i < len; i++) {
    const [questionId, answer] = entries[i]
    const dimension = questionDimensions[questionId]
    if (!dimension) continue

    if (!dimensionSums[dimension]) {
      dimensionSums[dimension] = { sum: 0, count: 0, weights: [] }
    }

    const normalizedAnswer = ((answer - 1) / 4) * 100
    dimensionSums[dimension].sum += normalizedAnswer
    dimensionSums[dimension].count++
  }

  const result: DimensionScore[] = new Array(IDEOLOGY_DIMENSIONS.length)

  for (let i = 0; i < IDEOLOGY_DIMENSIONS.length; i++) {
    const dim = IDEOLOGY_DIMENSIONS[i]
    const data = dimensionSums[dim.id] || { sum: 50, count: 1 }
    const rawScore = data.count > 0 ? data.sum / data.count : 50
    const weightedScore = rawScore * dim.weight

    result[i] = {
      dimensionId: dim.id,
      dimensionName: dim.name,
      rawScore: Math.round(rawScore * 10) / 10,
      normalizedScore: Math.round(rawScore),
      weightedScore: Math.round(weightedScore * 100) / 100,
      contribution: Math.round(dim.weight * 100),
      questionCount: data.count,
    }
  }

  return result
}

function calculateIdeologyMatchesOptimized(
  dimensionScores: DimensionScore[],
  mode: AssessmentMode
): IdeologyMatch[] {
  const config = MODE_CONFIGURATIONS[mode]

  const userVector = new Array(5)
  userVector[0] = dimensionScores[0]?.normalizedScore || 50
  userVector[1] = dimensionScores[1]?.normalizedScore || 50
  userVector[2] = dimensionScores[2]?.normalizedScore || 50
  userVector[3] = dimensionScores[3]?.normalizedScore || 50
  userVector[4] = dimensionScores[4]?.normalizedScore || 50

  const similarityFunction = {
    cosine: fastCosineSimilarity,
    'weighted-cosine': fastWeightedCosineSimilarity,
    ensemble: calibratedEnsembleSimilarity,
  }[config.algorithmConfig.similarityMethod]

  const matches: IdeologyMatch[] = new Array(POLITICAL_IDEOLOGIES.length)
  const ideologyVectorCache: number[] = new Array(5)

  for (let i = 0; i < POLITICAL_IDEOLOGIES.length; i++) {
    const ideology = POLITICAL_IDEOLOGIES[i]

    ideologyVectorCache[0] = ideology.economicPosition
    ideologyVectorCache[1] = ideology.socialPosition
    ideologyVectorCache[2] = ideology.culturalPosition
    ideologyVectorCache[3] = ideology.internationalPosition
    ideologyVectorCache[4] = ideology.ecologicalPosition

    const similarity = similarityFunction(userVector, ideologyVectorCache)
    const distance = config.algorithmConfig.enableDistanceCalibration
      ? fastEuclideanDistance(userVector, ideologyVectorCache)
      : 0

    const dimensionOverlap: Record<string, number> = {
      economic: 1 - Math.abs(userVector[0] - ideologyVectorCache[0]) / 100,
      social: 1 - Math.abs(userVector[1] - ideologyVectorCache[1]) / 100,
      cultural: 1 - Math.abs(userVector[2] - ideologyVectorCache[2]) / 100,
      international: 1 - Math.abs(userVector[3] - ideologyVectorCache[3]) / 100,
      ecological: 1 - Math.abs(userVector[4] - ideologyVectorCache[4]) / 100,
    }

    let matchLevel: IdeologyMatch['matchLevel']
    if (similarity > 0.975) matchLevel = 'perfect'
    else if (similarity > 0.93) matchLevel = 'excellent'
    else if (similarity > config.analysisConfig.minSimilarityThreshold + 0.18) matchLevel = 'good'
    else if (similarity > config.analysisConfig.minSimilarityThreshold) matchLevel = 'moderate'
    else matchLevel = 'weak'

    matches[i] = {
      ideologyId: ideology.id,
      ideologyName: ideology.name,
      canonicalName: ideology.canonicalName,
      similarityScore: Math.round(similarity * 10000) / 10000,
      distance: Math.round(distance * 100) / 100,
      dimensionOverlap,
      matchLevel,
    }
  }

  return matches
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, config.analysisConfig.maxIdeologyMatches)
}

function analyzeIdeologyConflictsOptimized(
  dominantIdeologies: string[]
): IdeologyConflictAnalysis[] {
  const analysis: IdeologyConflictAnalysis[] = []
  const len = dominantIdeologies.length

  const compatMap = new Map<string, typeof IDEOLOGY_COMPATIBILITY[0]>()
  IDEOLOGY_COMPATIBILITY.forEach(c => {
    compatMap.set(`${c.ideologyA}|${c.ideologyB}`, c)
    compatMap.set(`${c.ideologyB}|${c.ideologyA}`, c)
  })

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const ideoA = dominantIdeologies[i]
      const ideoB = dominantIdeologies[j]
      const compatibility = compatMap.get(`${ideoA}|${ideoB}`)

      let tensionLevel = 0
      let conflictType: IdeologyConflictAnalysis['conflictType'] = 'neutral'
      let explanation = '这两种意识形态之间没有记录在案的显著冲突或协同关系。'
      let resolutionPath: string | undefined

      if (compatibility) {
        conflictType = compatibility.compatibility
        explanation = compatibility.explanation

        switch (compatibility.compatibility) {
          case 'contradictory':
            tensionLevel = 92
            resolutionPath = '需要在核心原则之间做出根本选择，或建立明确的优先级排序。'
            break
          case 'tension':
            tensionLevel = 65
            resolutionPath = '可以通过制度设计和妥协在特定领域共存，但需要持续管理张力。'
            break
          case 'neutral':
            tensionLevel = 25
            break
          case 'complementary':
            tensionLevel = 8
            break
        }
      }

      analysis.push({
        ideologyA: ideoA,
        ideologyB: ideoB,
        conflictType,
        tensionLevel,
        explanation,
        resolutionPath,
      })
    }
  }

  return analysis.sort((a, b) => b.tensionLevel - a.tensionLevel)
}

export {
  LRUCache,
  fastCosineSimilarity,
  fastWeightedCosineSimilarity,
  fastEuclideanDistance,
  calibratedEnsembleSimilarity,
  calculatePearsonCorrelation,
  calculateDimensionScoresOptimized,
  calculateIdeologyMatchesOptimized,
  analyzeIdeologyConflictsOptimized,
  similarityCache,
  vectorCache,
}
