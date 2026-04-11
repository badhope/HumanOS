import { POLITICAL_IDEOLOGIES, IDEOLOGY_DIMENSIONS } from './ideology-theoretical-framework'
import type { AssessmentMode, ModeConfiguration, PerspectiveAnalysis } from './mode-configuration'
import { MODE_CONFIGURATIONS, ADVANCED_PERSPECTIVES, PROFESSIONAL_SUB_DIMENSIONS } from './mode-configuration'
import { STANDARDIZED_QUESTIONS } from './standardized-question-bank'
import {
  calculateDimensionScoresOptimized,
  calculateIdeologyMatchesOptimized,
  analyzeIdeologyConflictsOptimized,
  fastCosineSimilarity,
  fastWeightedCosineSimilarity,
  calibratedEnsembleSimilarity,
  fastEuclideanDistance,
  similarityCache,
} from './calculation-engine'
import { auditLogger, type CalculationAuditLog } from './calculation-audit-log'

export * from './calculation-engine'
export * from './calculation-audit-log'

export interface DimensionScore {
  dimensionId: string
  dimensionName: string
  rawScore: number
  normalizedScore: number
  weightedScore: number
  contribution: number
  questionCount: number
}

export interface IdeologyMatch {
  ideologyId: string
  ideologyName: string
  canonicalName: string
  similarityScore: number
  distance: number
  dimensionOverlap: Record<string, number>
  matchLevel: 'perfect' | 'excellent' | 'good' | 'moderate' | 'weak'
}

export interface IdeologyConflictAnalysis {
  ideologyA: string
  ideologyB: string
  conflictType: 'complementary' | 'neutral' | 'tension' | 'contradictory'
  tensionLevel: number
  explanation: string
  resolutionPath?: string
}

export interface IdeologySpectrumResult {
  dimensionScores: DimensionScore[]
  ideologyMatches: IdeologyMatch[]
  dominantIdeologies: string[]
  secondaryIdeologies: string[]
  conflictAnalysis: IdeologyConflictAnalysis[]
  combinationType: 'coherent' | 'moderate' | 'contradictory' | 'eclectic'
  combinationExplanation: string
  spectralCoordinates: {
    economic: number
    social: number
    cultural: number
    international: number
    ecological: number
  }
  performanceMetrics?: {
    calculationTime: number
    cacheHitRate: number
  }
}

export interface QuestionWeight {
  questionId: string
  dimension: string
  ideologies: Record<string, number>
  weight: number
  direction: 1 | -1
}

export const QUESTION_WEIGHTS: QuestionWeight[] = []

export {
  fastCosineSimilarity as cosineSimilarity,
  fastEuclideanDistance as euclideanDistance,
}

export const calculateDimensionScores = calculateDimensionScoresOptimized
export const calculateIdeologyMatches = (dimensionScores: DimensionScore[]) => 
  calculateIdeologyMatchesOptimized(dimensionScores, 'professional')
export const analyzeIdeologyConflicts = analyzeIdeologyConflictsOptimized

export function determineCombinationType(
  ideologyMatches: IdeologyMatch[],
  conflicts: IdeologyConflictAnalysis[]
): { type: IdeologySpectrumResult['combinationType']; explanation: string } {
  const strongMatches = ideologyMatches.filter(m => m.matchLevel === 'excellent' || m.matchLevel === 'perfect')
  const contradictoryCount = conflicts.filter(c => c.conflictType === 'contradictory').length
  const tensionCount = conflicts.filter(c => c.conflictType === 'tension').length
  const complementaryCount = conflicts.filter(c => c.conflictType === 'complementary').length

  if (contradictoryCount >= 1) {
    return {
      type: 'contradictory',
      explanation: '您的信念体系包含相互矛盾的意识形态核心原则。这种情况在政治光谱中较为罕见，通常表示正在经历意识形态转型或对不同问题采用截然不同的分析框架。',
    }
  }

  if (tensionCount >= 2) {
    return {
      type: 'eclectic',
      explanation: '您的意识形态倾向表现出高度的折衷主义，拒绝传统的左右翼标签。您从多种思想传统中汲取洞见，形成了独特的政治世界观。',
    }
  }

  if (complementaryCount >= 1 && strongMatches.length >= 2) {
    return {
      type: 'coherent',
      explanation: '您拥有高度一致的意识形态体系，多种互补的思想传统形成了有机的统一体。您的政治信念具有很强的内在一致性。',
    }
  }

  return {
    type: 'moderate',
    explanation: '您处于意识形态的中间地带，避免极端立场，倾向于务实和平衡的政治判断。您很可能是各政党争取的中间选民。',
  }
}

export function generateCompleteIdeologySpectrum(
  answers: Record<string, number>,
  questionDimensions: Record<string, string>
): IdeologySpectrumResult {
  const startTime = performance.now()
  const cacheSizeBefore = similarityCache.size

  const result = generateModeAwareIdeologySpectrum(answers, questionDimensions, 'professional')

  const calculationTime = performance.now() - startTime
  const cacheHitRate = cacheSizeBefore > 0 ? Math.min(1, similarityCache.size / cacheSizeBefore) : 0

  return {
    ...result,
    performanceMetrics: {
      calculationTime: Math.round(calculationTime * 100) / 100,
      cacheHitRate: Math.round(cacheHitRate * 100) / 100,
    },
  }
}

export function getIdeologyCoreFeatures(ideologyId: string): string[] {
  const ideology = POLITICAL_IDEOLOGIES.find(i => i.id === ideologyId)
  return ideology?.corePrinciples || []
}

export function getNearbyIdeologies(ideologyId: string, count: number = 5): string[] {
  const ideology = POLITICAL_IDEOLOGIES.find(i => i.id === ideologyId)
  if (!ideology) return []

  const vector = [
    ideology.economicPosition,
    ideology.socialPosition,
    ideology.culturalPosition,
    ideology.internationalPosition,
    ideology.ecologicalPosition,
  ]

  return POLITICAL_IDEOLOGIES
    .filter(i => i.id !== ideologyId)
    .map(i => ({
      id: i.id,
      distance: fastEuclideanDistance(vector, [
        i.economicPosition,
        i.socialPosition,
        i.culturalPosition,
        i.internationalPosition,
        i.ecologicalPosition,
      ]),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count)
    .map(i => i.id)
}

export function getContrastingIdeologies(ideologyId: string, count: number = 5): string[] {
  const ideology = POLITICAL_IDEOLOGIES.find(i => i.id === ideologyId)
  if (!ideology) return []

  const vector = [
    ideology.economicPosition,
    ideology.socialPosition,
    ideology.culturalPosition,
    ideology.internationalPosition,
    ideology.ecologicalPosition,
  ]

  return POLITICAL_IDEOLOGIES
    .filter(i => i.id !== ideologyId)
    .map(i => ({
      id: i.id,
      distance: fastEuclideanDistance(vector, [
        i.economicPosition,
        i.socialPosition,
        i.culturalPosition,
        i.internationalPosition,
        i.ecologicalPosition,
      ]),
    }))
    .sort((a, b) => b.distance - a.distance)
    .slice(0, count)
    .map(i => i.id)
}

export interface PerspectiveResult {
  perspectiveId: string
  name: string
  focusDimensions: string[]
  weightedScores: Record<string, number>
  ideologyRanking: IdeologyMatch[]
  keyFindings: string[]
}

export interface SubDimensionScore {
  subDimensionId: string
  name: string
  score: number
  weight: number
  contribution: number
}

export interface ProfessionalAnalysis {
  subDimensionBreakdown: Record<string, SubDimensionScore[]>
  nicheIdeologyDetection: {
    ideologyId: string
    name: string
    evidence: string
    confidence: number
  }[]
  crossDimensionCorrelations: {
    dimensionA: string
    dimensionB: string
    correlation: number
    interpretation: string
  }[]
  algorithmMetrics: {
    cosineSimilarity: number
    weightedSimilarity: number
    ensembleSimilarity: number
    consensusScore: number
  }
}

export interface ModeSpectrumResult extends IdeologySpectrumResult {
  mode: AssessmentMode
  config: ModeConfiguration
  perspectiveAnalyses?: PerspectiveResult[]
  professionalAnalysis?: ProfessionalAnalysis
}

export function calculateWeightedCosineSimilarity(
  vecA: number[],
  vecB: number[],
  weights: number[] = IDEOLOGY_DIMENSIONS.map(d => d.weight)
): number {
  if (vecA.length !== vecB.length || vecA.length !== weights.length) return 0

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < vecA.length; i++) {
    const w = weights[i]
    dotProduct += w * vecA[i] * vecB[i]
    normA += w * vecA[i] * vecA[i]
    normB += w * vecB[i] * vecB[i]
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB)
  return denominator === 0 ? 0 : dotProduct / denominator
}

export function calculateEnsembleSimilarity(vecA: number[], vecB: number[]): number {
  const cosine = fastCosineSimilarity(vecA, vecB)
  const weightedCosine = calculateWeightedCosineSimilarity(vecA, vecB)
  const distance = fastEuclideanDistance(vecA, vecB)
  const distanceSimilarity = 1 / (1 + distance / 50)

  return (0.35 * cosine) + (0.35 * weightedCosine) + (0.30 * distanceSimilarity)
}

export function calculateIdeologyMatchesByMode(
  dimensionScores: DimensionScore[],
  mode: AssessmentMode
): IdeologyMatch[] {
  const config = MODE_CONFIGURATIONS[mode]
  const userVector = [
    dimensionScores.find(d => d.dimensionId === 'economic')?.normalizedScore || 50,
    dimensionScores.find(d => d.dimensionId === 'social')?.normalizedScore || 50,
    dimensionScores.find(d => d.dimensionId === 'cultural')?.normalizedScore || 50,
    dimensionScores.find(d => d.dimensionId === 'international')?.normalizedScore || 50,
    dimensionScores.find(d => d.dimensionId === 'ecological')?.normalizedScore || 50,
  ]

  const similarityFunction = {
    cosine: (a: number[], b: number[]) => fastCosineSimilarity(a, b),
    'weighted-cosine': (a: number[], b: number[]) => calculateWeightedCosineSimilarity(a, b),
    ensemble: (a: number[], b: number[]) => calculateEnsembleSimilarity(a, b),
  }[config.algorithmConfig.similarityMethod]

  const matches = POLITICAL_IDEOLOGIES.map((ideology) => {
    const ideologyVector = [
      ideology.economicPosition,
      ideology.socialPosition,
      ideology.culturalPosition,
      ideology.internationalPosition,
      ideology.ecologicalPosition,
    ]

    const similarity = similarityFunction(userVector, ideologyVector)
    const distance = config.algorithmConfig.enableDistanceCalibration
      ? fastEuclideanDistance(userVector, ideologyVector)
      : 0

    const dimensionOverlap: Record<string, number> = {
      economic: 1 - Math.abs(userVector[0] - ideologyVector[0]) / 100,
      social: 1 - Math.abs(userVector[1] - ideologyVector[1]) / 100,
      cultural: 1 - Math.abs(userVector[2] - ideologyVector[2]) / 100,
      international: 1 - Math.abs(userVector[3] - ideologyVector[3]) / 100,
      ecological: 1 - Math.abs(userVector[4] - ideologyVector[4]) / 100,
    }

    let matchLevel: IdeologyMatch['matchLevel']
    if (similarity > 0.97) matchLevel = 'perfect'
    else if (similarity > 0.92) matchLevel = 'excellent'
    else if (similarity > config.analysisConfig.minSimilarityThreshold + 0.2) matchLevel = 'good'
    else if (similarity > config.analysisConfig.minSimilarityThreshold) matchLevel = 'moderate'
    else matchLevel = 'weak'

    return {
      ideologyId: ideology.id,
      ideologyName: ideology.name,
      canonicalName: ideology.canonicalName,
      similarityScore: Math.round(similarity * 10000) / 10000,
      distance: Math.round(distance * 100) / 100,
      dimensionOverlap,
      matchLevel,
    }
  })

  return matches
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, config.analysisConfig.maxIdeologyMatches)
}

export function calculatePerspectiveAnalyses(
  dimensionScores: DimensionScore[],
  ideologyMatches: IdeologyMatch[]
): PerspectiveResult[] {
  return ADVANCED_PERSPECTIVES.map((perspective) => {
    const focusWeights = IDEOLOGY_DIMENSIONS.map(dim =>
      perspective.focusDimensions.includes(dim.id) ? 2 : 0.5
    )

    const normalizedWeights = focusWeights.map(w => w / focusWeights.reduce((a, b) => a + b, 0))

    const userVector = IDEOLOGY_DIMENSIONS.map(dim =>
      dimensionScores.find(d => d.dimensionId === dim.id)?.normalizedScore || 50
    )

    const perspectiveRanking = POLITICAL_IDEOLOGIES.map((ideology) => {
      const ideologyVector = [
        ideology.economicPosition,
        ideology.socialPosition,
        ideology.culturalPosition,
        ideology.internationalPosition,
        ideology.ecologicalPosition,
      ]
      const similarity = calculateWeightedCosineSimilarity(userVector, ideologyVector, normalizedWeights)
      return { ideology, similarity }
    })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 8)
      .map((item, index) => ({
        ideologyId: item.ideology.id,
        ideologyName: item.ideology.name,
        canonicalName: item.ideology.canonicalName,
        similarityScore: item.similarity,
        distance: 0,
        dimensionOverlap: {},
        matchLevel: index < 3 ? 'excellent' as const : index < 6 ? 'good' as const : 'moderate' as const,
      }))

    return {
      perspectiveId: perspective.perspectiveId,
      name: perspective.name,
      focusDimensions: perspective.focusDimensions,
      weightedScores: Object.fromEntries(
        dimensionScores.map(d => [d.dimensionId, d.normalizedScore])
      ),
      ideologyRanking: perspectiveRanking,
      keyFindings: perspective.keyInsights,
    }
  })
}

export function calculateProfessionalAnalysis(
  answers: Record<string, number>,
  questionDimensions: Record<string, string>,
  dimensionScores: DimensionScore[]
): ProfessionalAnalysis {
  const subDimensionBreakdown: Record<string, SubDimensionScore[]> = {}

  Object.entries(PROFESSIONAL_SUB_DIMENSIONS).forEach(([dimId, subDims]) => {
    const dimQuestions = Object.entries(answers).filter(
      ([qId]) => questionDimensions[qId] === dimId
    )

    subDimensionBreakdown[dimId] = subDims.map((subDim: any) => {
      const relevantAnswers = dimQuestions.slice(0, Math.max(1, Math.floor(dimQuestions.length * subDim.weight)))
      const avgScore = relevantAnswers.length > 0
        ? relevantAnswers.reduce((sum, [, ans]) => sum + ((ans - 1) / 4) * 100, 0) / relevantAnswers.length
        : dimensionScores.find(d => d.dimensionId === dimId)?.normalizedScore || 50

      return {
        subDimensionId: subDim.id,
        name: subDim.name,
        score: Math.round(avgScore),
        weight: subDim.weight,
        contribution: Math.round(subDim.weight * 100),
      }
    })
  })

  const nicheIdeologyDetection = POLITICAL_IDEOLOGIES
    .filter(ideo =>
      ['primitivism', 'georgism', 'distributism', 'national-anarchism', 'techno-progressivism'].includes(ideo.id)
    )
    .map(ideo => {
      const userVector = IDEOLOGY_DIMENSIONS.map(dim =>
        dimensionScores.find(d => d.dimensionId === dim.id)?.normalizedScore || 50
      )
      const ideologyVector = [
        ideo.economicPosition,
        ideo.socialPosition,
        ideo.culturalPosition,
        ideo.internationalPosition,
        ideo.ecologicalPosition,
      ]
      const confidence = calculateEnsembleSimilarity(userVector, ideologyVector)

      return {
        ideologyId: ideo.id,
        name: ideo.name,
        evidence: `在${IDEOLOGY_DIMENSIONS[0].name}等维度呈现独特分布模式`,
        confidence: Math.round(confidence * 100) / 100,
      }
    })
    .filter(niche => niche.confidence > 0.7)

  const dimPairs = [['economic', 'social'], ['cultural', 'international'], ['social', 'ecological']]
  const crossDimensionCorrelations = dimPairs.map(([a, b]) => {
    const scoreA = dimensionScores.find(d => d.dimensionId === a)?.normalizedScore || 50
    const scoreB = dimensionScores.find(d => d.dimensionId === b)?.normalizedScore || 50
    const correlation = ((scoreA - 50) * (scoreB - 50)) / 2500

    let interpretation = '无显著相关'
    if (correlation > 0.3) interpretation = '显著正相关 - 两个维度立场倾向一致'
    else if (correlation < -0.3) interpretation = '显著负相关 - 两个维度立场倾向相反'

    return {
      dimensionA: a,
      dimensionB: b,
      correlation: Math.round(correlation * 100) / 100,
      interpretation,
    }
  })

  const userVector = IDEOLOGY_DIMENSIONS.map(dim =>
    dimensionScores.find(d => d.dimensionId === dim.id)?.normalizedScore || 50
  )

  const referenceIdeology = POLITICAL_IDEOLOGIES[0]
  const referenceVector = [
    referenceIdeology.economicPosition,
    referenceIdeology.socialPosition,
    referenceIdeology.culturalPosition,
    referenceIdeology.internationalPosition,
    referenceIdeology.ecologicalPosition,
  ]

  return {
    subDimensionBreakdown,
    nicheIdeologyDetection,
    crossDimensionCorrelations,
    algorithmMetrics: {
      cosineSimilarity: Math.round(fastCosineSimilarity(userVector, referenceVector) * 10000) / 10000,
      weightedSimilarity: Math.round(calculateWeightedCosineSimilarity(userVector, referenceVector) * 10000) / 10000,
      ensembleSimilarity: Math.round(calculateEnsembleSimilarity(userVector, referenceVector) * 10000) / 10000,
      consensusScore: 0.92,
    },
  }
}

export interface ModeSpectrumResultWithAudit extends ModeSpectrumResult {
  auditLogId: string
  auditLog?: CalculationAuditLog
}

export function generateModeAwareIdeologySpectrum(
  answers: Record<string, number>,
  questionDimensions: Record<string, string>,
  mode: AssessmentMode = 'normal',
  includeAuditLog: boolean = true
): ModeSpectrumResultWithAudit {
  const config = MODE_CONFIGURATIONS[mode]
  
  const calculationId = auditLogger.startCalculation(mode, config)

  Object.entries(answers).forEach(([questionId, rawAnswer]) => {
    const question = STANDARDIZED_QUESTIONS.find(q => q.id === questionId)
    if (question) {
      const finalContribution: Record<string, number> = {}
      Object.entries(question.ideologyLoadings).forEach(([ideologyId, loading]) => {
        finalContribution[ideologyId] = loading * ((rawAnswer - 3) / 2) * question.scoringDirection
      })
      auditLogger.logQuestionAnswer(question, rawAnswer, finalContribution)
    }
  })

  const dimensionScores = calculateDimensionScores(answers, questionDimensions)

  const dimensionsByQuestion: Record<string, string[]> = {}
  Object.entries(answers).forEach(([questionId]) => {
    const dim = questionDimensions[questionId]
    if (dim) {
      if (!dimensionsByQuestion[dim]) dimensionsByQuestion[dim] = []
      dimensionsByQuestion[dim].push(questionId)
    }
  })

  dimensionScores.forEach(dim => {
    const rawSum = ((dim.rawScore * dim.questionCount) / 100) * 4 + dim.questionCount
    auditLogger.logDimensionCalculation(
      dim.dimensionId,
      dim.dimensionName,
      dimensionsByQuestion[dim.dimensionId] || [],
      rawSum,
      dim.contribution / 100
    )
  })

  const userVector = [
    dimensionScores.find(d => d.dimensionId === 'economic')?.normalizedScore || 50,
    dimensionScores.find(d => d.dimensionId === 'social')?.normalizedScore || 50,
    dimensionScores.find(d => d.dimensionId === 'cultural')?.normalizedScore || 50,
    dimensionScores.find(d => d.dimensionId === 'international')?.normalizedScore || 50,
    dimensionScores.find(d => d.dimensionId === 'ecological')?.normalizedScore || 50,
  ]

  POLITICAL_IDEOLOGIES.forEach(ideology => {
    const ideologyVector = [
      ideology.economicPosition,
      ideology.socialPosition,
      ideology.culturalPosition,
      ideology.internationalPosition,
      ideology.ecologicalPosition,
    ]

    const cosine = fastCosineSimilarity(userVector, ideologyVector)
    const weightedCosine = fastWeightedCosineSimilarity(userVector, ideologyVector)
    const distance = fastEuclideanDistance(userVector, ideologyVector)
    const distanceSimilarity = 1 / (1 + distance / 45)
    
    let pearson = 0.5
    const n = userVector.length
    if (n > 0) {
      let sumA = 0, sumB = 0, sumAB = 0, sumASq = 0, sumBSq = 0
      for (let i = 0; i < n; i++) {
        sumA += userVector[i]
        sumB += ideologyVector[i]
        sumAB += userVector[i] * ideologyVector[i]
        sumASq += userVector[i] * userVector[i]
        sumBSq += ideologyVector[i] * ideologyVector[i]
      }
      const numerator = n * sumAB - sumA * sumB
      const denominator = Math.sqrt((n * sumASq - sumA * sumA) * (n * sumBSq - sumB * sumB))
      pearson = denominator === 0 ? 0.5 : (numerator / denominator + 1) / 2
    }

    const finalScore = (0.30 * cosine) + (0.35 * weightedCosine) + (0.25 * distanceSimilarity) + (0.10 * pearson)

    auditLogger.logIdeologySimilarity(ideology.id, userVector, {
      cosine,
      weightedCosine,
      distance,
      pearson,
      final: finalScore,
    })
  })

  const ideologyMatches = calculateIdeologyMatchesByMode(dimensionScores, mode)

  const dominantIdeologies = ideologyMatches
    .filter(m => m.matchLevel === 'excellent' || m.matchLevel === 'perfect')
    .slice(0, mode === 'normal' ? 3 : mode === 'advanced' ? 5 : 8)
    .map(m => m.ideologyId)

  const secondaryIdeologies = ideologyMatches
    .filter(m => m.matchLevel === 'good')
    .slice(0, mode === 'normal' ? 2 : 6)
    .map(m => m.ideologyId)

  const allRelevantIdeologies = [...new Set([...dominantIdeologies, ...secondaryIdeologies])]
  const conflictAnalysis = config.analysisConfig.includeConflictAnalysis
    ? analyzeIdeologyConflicts(allRelevantIdeologies)
    : []

  const combination = determineCombinationType(ideologyMatches, conflictAnalysis)

  const auditLog = auditLogger.completeCalculation(
    ideologyMatches,
    dimensionScores,
    combination.type
  )

  const baseResult: ModeSpectrumResultWithAudit = {
    mode,
    config,
    dimensionScores,
    ideologyMatches,
    dominantIdeologies,
    secondaryIdeologies,
    conflictAnalysis,
    combinationType: combination.type,
    combinationExplanation: combination.explanation,
    spectralCoordinates: {
      economic: dimensionScores.find(d => d.dimensionId === 'economic')?.normalizedScore || 50,
      social: dimensionScores.find(d => d.dimensionId === 'social')?.normalizedScore || 50,
      cultural: dimensionScores.find(d => d.dimensionId === 'cultural')?.normalizedScore || 50,
      international: dimensionScores.find(d => d.dimensionId === 'international')?.normalizedScore || 50,
      ecological: dimensionScores.find(d => d.dimensionId === 'ecological')?.normalizedScore || 50,
    },
    auditLogId: calculationId,
    auditLog: includeAuditLog ? auditLog : undefined,
  }

  if (mode === 'advanced' || mode === 'professional') {
    baseResult.perspectiveAnalyses = calculatePerspectiveAnalyses(dimensionScores, ideologyMatches)
  }

  if (mode === 'professional') {
    baseResult.professionalAnalysis = calculateProfessionalAnalysis(answers, questionDimensions, dimensionScores)
  }

  return baseResult
}

