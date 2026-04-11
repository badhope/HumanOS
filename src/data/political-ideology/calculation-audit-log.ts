import type { StandardizedQuestion } from './standardized-question-bank'
import type { DimensionScore, IdeologyMatch } from './ideology-weighted-calculator'
import type { AssessmentMode } from './mode-configuration'
import { POLITICAL_IDEOLOGIES } from './ideology-theoretical-framework'

export interface QuestionAnswerLog {
  questionId: string
  questionText: string
  dimension: string
  rawAnswer: number
  normalizedAnswer: number
  ideologyLoadings: Record<string, number>
  scoringDirection: 1 | -1
  finalContribution: Record<string, number>
}

export interface DimensionCalculationLog {
  dimensionId: string
  dimensionName: string
  questionCount: number
  questionIds: string[]
  rawSum: number
  rawAverage: number
  normalizedScore: number
  dimensionWeight: number
  weightedScore: number
  contributionPercentage: number
}

export interface IdeologySimilarityLog {
  ideologyId: string
  ideologyName: string
  userVector: number[]
  ideologyVector: number[]
  cosineSimilarity: number
  weightedCosineSimilarity: number
  euclideanDistance: number
  pearsonCorrelation: number
  finalSimilarityScore: number
  algorithmWeights: {
    cosine: number
    weightedCosine: number
    distance: number
    pearson: number
  }
  dimensionByDimensionMatch: Record<string, number>
}

export interface AlgorithmConfigLog {
  mode: AssessmentMode
  similarityMethod: string
  enableDistanceCalibration: boolean
  subDimensionWeighting: boolean
  performanceOptimization: boolean
  minSimilarityThreshold: number
  maxIdeologyMatches: number
  timestamp: string
  calculationId: string
}

export interface CalculationAuditLog {
  calculationId: string
  timestamp: string
  version: string
  algorithmConfig: AlgorithmConfigLog
  questionAnswers: QuestionAnswerLog[]
  dimensionCalculations: DimensionCalculationLog[]
  ideologySimilarities: IdeologySimilarityLog[]
  finalResultSummary: {
    topIdeologies: { ideologyId: string; ideologyName: string; score: number }[]
    dimensionScores: { dimensionId: string; score: number }[]
    combinationType: string
  }
  verificationHash: string
}

function generateCalculationId(): string {
  return `calc-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
}

function generateVerificationHash(log: Partial<CalculationAuditLog>): string {
  const data = JSON.stringify({
    questions: log.questionAnswers?.map(q => q.questionId + q.rawAnswer),
    dimensions: log.dimensionCalculations?.map(d => d.dimensionId + d.normalizedScore),
    timestamp: log.timestamp,
    calculationId: log.calculationId,
  })
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}

class AuditLogger {
  private static instance: AuditLogger
  private logs: CalculationAuditLog[] = []
  private currentLog: Partial<CalculationAuditLog> = {}
  private enabled: boolean = true

  private constructor() {}

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger()
    }
    return AuditLogger.instance
  }

  startCalculation(mode: AssessmentMode, config: any): string {
    const calculationId = generateCalculationId()
    const timestamp = new Date().toISOString()

    this.currentLog = {
      calculationId,
      timestamp,
      version: '2.4.0-audit',
      algorithmConfig: {
        mode,
        similarityMethod: config.algorithmConfig.similarityMethod,
        enableDistanceCalibration: config.algorithmConfig.enableDistanceCalibration,
        subDimensionWeighting: config.algorithmConfig.subDimensionWeighting,
        performanceOptimization: config.algorithmConfig.performanceOptimization,
        minSimilarityThreshold: config.analysisConfig.minSimilarityThreshold,
        maxIdeologyMatches: config.analysisConfig.maxIdeologyMatches,
        timestamp,
        calculationId,
      },
      questionAnswers: [],
      dimensionCalculations: [],
      ideologySimilarities: [],
    }

    console.log(`[AUDIT] Calculation started: ${calculationId} (Mode: ${mode})`)
    console.log(`[AUDIT] Algorithm: ${config.algorithmConfig.similarityMethod}`)

    return calculationId
  }

  logQuestionAnswer(
    question: StandardizedQuestion,
    rawAnswer: number,
    finalContribution: Record<string, number>
  ): void {
    if (!this.enabled) return

    const normalizedAnswer = ((rawAnswer - 1) / 4) * 100

    const log: QuestionAnswerLog = {
      questionId: question.id,
      questionText: question.text,
      dimension: question.dimension,
      rawAnswer,
      normalizedAnswer,
      ideologyLoadings: { ...question.ideologyLoadings },
      scoringDirection: question.scoringDirection,
      finalContribution,
    }

    this.currentLog.questionAnswers?.push(log)

    console.log(
      `[AUDIT] Question ${question.id}: Answer=${rawAnswer} (${normalizedAnswer.toFixed(1)}%)`,
      `Dimension: ${question.dimension}`
    )
  }

  logDimensionCalculation(
    dimensionId: string,
    dimensionName: string,
    questionIds: string[],
    rawSum: number,
    dimensionWeight: number
  ): void {
    if (!this.enabled) return

    const questionCount = questionIds.length
    const rawAverage = questionCount > 0 ? rawSum / questionCount : 50
    const normalizedScore = Math.round(rawAverage)
    const weightedScore = rawAverage * dimensionWeight
    const contributionPercentage = Math.round(dimensionWeight * 100)

    const log: DimensionCalculationLog = {
      dimensionId,
      dimensionName,
      questionCount,
      questionIds,
      rawSum,
      rawAverage,
      normalizedScore,
      dimensionWeight,
      weightedScore,
      contributionPercentage,
    }

    this.currentLog.dimensionCalculations?.push(log)

    console.log(
      `[AUDIT] Dimension ${dimensionId}:`,
      `Score=${normalizedScore}, Questions=${questionCount}, Weight=${contributionPercentage}%`
    )
  }

  logIdeologySimilarity(
    ideologyId: string,
    userVector: number[],
    similarities: {
      cosine: number
      weightedCosine: number
      distance: number
      pearson: number
      final: number
    }
  ): void {
    if (!this.enabled) return

    const ideology = POLITICAL_IDEOLOGIES.find(i => i.id === ideologyId)
    if (!ideology) return

    const ideologyVector = [
      ideology.economicPosition,
      ideology.socialPosition,
      ideology.culturalPosition,
      ideology.internationalPosition,
      ideology.ecologicalPosition,
    ]

    const algorithmWeights = {
      cosine: 0.30,
      weightedCosine: 0.35,
      distance: 0.25,
      pearson: 0.10,
    }

    const dimensionByDimensionMatch: Record<string, number> = {
      economic: 1 - Math.abs(userVector[0] - ideologyVector[0]) / 100,
      social: 1 - Math.abs(userVector[1] - ideologyVector[1]) / 100,
      cultural: 1 - Math.abs(userVector[2] - ideologyVector[2]) / 100,
      international: 1 - Math.abs(userVector[3] - ideologyVector[3]) / 100,
      ecological: 1 - Math.abs(userVector[4] - ideologyVector[4]) / 100,
    }

    const log: IdeologySimilarityLog = {
      ideologyId,
      ideologyName: ideology.name,
      userVector: [...userVector],
      ideologyVector: [...ideologyVector],
      cosineSimilarity: similarities.cosine,
      weightedCosineSimilarity: similarities.weightedCosine,
      euclideanDistance: similarities.distance,
      pearsonCorrelation: similarities.pearson,
      finalSimilarityScore: similarities.final,
      algorithmWeights,
      dimensionByDimensionMatch,
    }

    this.currentLog.ideologySimilarities?.push(log)

    console.log(
      `[AUDIT] Similarity ${ideologyId}:`,
      `Final=${(similarities.final * 100).toFixed(1)}%`,
      `Cosine=${(similarities.cosine * 100).toFixed(1)}%`,
      `Weighted=${(similarities.weightedCosine * 100).toFixed(1)}%`,
      `Pearson=${(similarities.pearson * 100).toFixed(1)}%`
    )
  }

  completeCalculation(
    finalMatches: IdeologyMatch[],
    dimensionScores: DimensionScore[],
    combinationType: string
  ): CalculationAuditLog {
    this.currentLog.finalResultSummary = {
      topIdeologies: finalMatches.slice(0, 8).map(m => ({
        ideologyId: m.ideologyId,
        ideologyName: m.ideologyName,
        score: m.similarityScore,
      })),
      dimensionScores: dimensionScores.map(d => ({
        dimensionId: d.dimensionId,
        score: d.normalizedScore,
      })),
      combinationType,
    }

    this.currentLog.verificationHash = generateVerificationHash(this.currentLog)

    const completeLog = this.currentLog as CalculationAuditLog
    this.logs.push(completeLog)

    console.log('=' .repeat(60))
    console.log(`[AUDIT] Calculation COMPLETE: ${completeLog.calculationId}`)
    console.log(`[AUDIT] Verification Hash: ${completeLog.verificationHash}`)
    console.log(`[AUDIT] Top Ideologies:`)
    completeLog.finalResultSummary.topIdeologies.forEach((m, i) => {
      console.log(`  ${i + 1}. ${m.ideologyName}: ${(m.score * 100).toFixed(1)}%`)
    })
    console.log(`[AUDIT] Combination Type: ${combinationType}`)
    console.log('=' .repeat(60))

    this.currentLog = {}
    return completeLog
  }

  getCalculationLog(calculationId: string): CalculationAuditLog | undefined {
    return this.logs.find(log => log.calculationId === calculationId)
  }

  getAllLogs(): CalculationAuditLog[] {
    return [...this.logs]
  }

  verifyCalculation(calculationId: string): boolean {
    const log = this.getCalculationLog(calculationId)
    if (!log) return false

    const recomputedHash = generateVerificationHash(log)
    return recomputedHash === log.verificationHash
  }

  exportLog(calculationId: string): string {
    const log = this.getCalculationLog(calculationId)
    if (!log) return ''
    return JSON.stringify(log, null, 2)
  }

  printAuditReport(calculationId: string): void {
    const log = this.getCalculationLog(calculationId)
    if (!log) {
      console.log(`[AUDIT] Log not found: ${calculationId}`)
      return
    }

    console.log('\n')
    console.log('╔' + '═'.repeat(78) + '╗')
    console.log('║' + ' '.repeat(25) + 'CALCULATION AUDIT REPORT' + ' '.repeat(25) + '║')
    console.log('╠' + '═'.repeat(78) + '╣')
    console.log(`║  Calculation ID: ${log.calculationId.padEnd(58)}║`)
    console.log(`║  Timestamp: ${log.timestamp.padEnd(65)}║`)
    console.log(`║  Mode: ${log.algorithmConfig.mode.padEnd(20)} Algorithm: ${log.algorithmConfig.similarityMethod.padEnd(35)}║`)
    console.log(`║  Verification Hash: ${log.verificationHash.padEnd(55)}║`)
    console.log('╠' + '─'.repeat(78) + '╣')
    console.log('║' + ' '.repeat(30) + 'QUESTION ANSWERS' + ' '.repeat(30) + '║')
    console.log('╠' + '─'.repeat(78) + '╣')

    log.questionAnswers.forEach((q, i) => {
      const line = `  ${String(i + 1).padStart(2)}. [${q.dimension.padEnd(13)}] Answer=${q.rawAnswer} (${String(q.normalizedAnswer.toFixed(1)).padStart(5)}%) - ${q.questionText.substring(0, 45)}`
      console.log(`║${line.padEnd(78)}║`)
    })

    console.log('╠' + '─'.repeat(78) + '╣')
    console.log('║' + ' '.repeat(30) + 'DIMENSION SCORES' + ' '.repeat(32) + '║')
    console.log('╠' + '─'.repeat(78) + '╣')

    log.dimensionCalculations.forEach(d => {
      const line = `  ${d.dimensionName.padEnd(15)}: ${String(d.normalizedScore).padStart(3)} points (${d.questionCount} questions, ${d.contributionPercentage}% weight)`
      console.log(`║${line.padEnd(78)}║`)
    })

    console.log('╠' + '─'.repeat(78) + '╣')
    console.log('║' + ' '.repeat(30) + 'IDEOLOGY MATCHES' + ' '.repeat(32) + '║')
    console.log('╠' + '─'.repeat(78) + '╣')

    log.ideologySimilarities
      .sort((a, b) => b.finalSimilarityScore - a.finalSimilarityScore)
      .slice(0, 10)
      .forEach((m, i) => {
        const line = `  ${String(i + 1).padStart(2)}. ${m.ideologyName.padEnd(25)} ${String((m.finalSimilarityScore * 100).toFixed(1)).padStart(5)}%`
        console.log(`║${line.padEnd(78)}║`)
      })

    console.log('╠' + '─'.repeat(78) + '╣')
    console.log(`║  Combination Type: ${log.finalResultSummary.combinationType.padEnd(56)}║`)
    console.log('╚' + '═'.repeat(78) + '╝')
    console.log('\n')
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }
}

export const auditLogger = AuditLogger.getInstance()

export function withAuditLogging<T>(
  calculationName: string,
  fn: () => T,
  meta?: Record<string, any>
): T {
  const startTime = performance.now()
  console.log(`[AUDIT] Executing: ${calculationName}`)
  if (meta) {
    console.log(`[AUDIT] Metadata:`, JSON.stringify(meta))
  }

  try {
    const result = fn()
    const duration = performance.now() - startTime
    console.log(`[AUDIT] ${calculationName} completed in ${duration.toFixed(2)}ms`)
    return result
  } catch (error) {
    const duration = performance.now() - startTime
    console.error(`[AUDIT] ${calculationName} FAILED after ${duration.toFixed(2)}ms:`, error)
    throw error
  }
}
