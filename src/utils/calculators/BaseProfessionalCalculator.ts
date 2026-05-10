import type { Answer, AssessmentResult, Dimension, TraitScore } from '../../types'
import { globalIsomerCalculator } from '../isomer-calculator'

export interface CalculatorConfig {
  name: string
  dimensionKeys: string[]
  dimensionNames: Record<string, string>
  questionPrefix: string
  reverseScored?: string[]
  traitsGenerator?: (scores: Record<string, number>, dimensions: Dimension[]) => TraitScore[]
  summaryGenerator?: (scores: Record<string, number>, dimensions: Dimension[], overallScore: number) => { title: string; subtitle: string; summary: string }
  scoringWeights?: Record<string, number>
}

export abstract class BaseProfessionalCalculator {
  protected abstract config: CalculatorConfig

  protected normalizeAnswer(answer: Answer): number {
    const value = typeof answer.value === 'number' ? answer.value : parseInt(String(answer.value || 3), 10)
    return Math.max(1, Math.min(5, value))
  }

  protected buildAnswerMap(answers: Answer[]): Record<string, number> {
    const answerMap: Record<string, number> = {}
    const { questionPrefix } = this.config
    
    answers.forEach(a => {
      const qid = a.questionId
      const normalizedQid = this.normalizeQuestionId(qid, questionPrefix)
      answerMap[normalizedQid] = this.normalizeAnswer(a)
    })
    return answerMap
  }

  protected normalizeQuestionId(qid: string, prefix: string): string {
    const lowerQid = qid.toLowerCase()
    const lowerPrefix = prefix.toLowerCase()
    
    if (lowerQid.startsWith(lowerPrefix)) {
      const suffix = qid.slice(prefix.length)
      const cleanSuffix = suffix.replace(/^_?n?/i, '')
      if (/^\d+$/.test(cleanSuffix)) {
        return `${prefix}${cleanSuffix}`
      }
    }
    
    const match = qid.match(/^([a-zA-Z]+)[-_]?n?(\d+)$/i)
    if (match) {
      const [, prefixPart, numPart] = match
      const cleanPrefix = prefixPart.toLowerCase()
      const cleanPrefixNormalized = lowerPrefix.replace(/[-_]/g, '')
      
      if (cleanPrefix.includes(cleanPrefixNormalized) || cleanPrefixNormalized.includes(cleanPrefix)) {
        return `${prefix}${numPart}`
      }
    }
    
    return qid
  }

  protected calculateDimensions(answerMap: Record<string, number>): { dimensions: Dimension[]; scores: Record<string, number> } {
    const dimensions: Dimension[] = []
    const scores: Record<string, number> = {}
    const { dimensionKeys, dimensionNames, reverseScored = [], questionPrefix } = this.config

    dimensionKeys.forEach((dimKey, dimIndex) => {
      const questionIds = this.getDimensionQuestionIds(dimKey, dimIndex)
      const score = questionIds.reduce((sum, qid) => {
        const lookupKeys = [
          `${questionPrefix}${qid}`,
          `${questionPrefix}_${qid}`,
          `${questionPrefix}n${qid}`,
          qid,
        ]
        let value = 3
        for (const key of lookupKeys) {
          if (answerMap[key] !== undefined) {
            value = answerMap[key]
            break
          }
        }
        
        const reverseKey = `${questionPrefix}${qid}`
        if (reverseScored.includes(reverseKey) || reverseScored.includes(qid)) {
          const maxVal = 5
          value = maxVal + 1 - value
        }
        return sum + value
      }, 0)

      const normalizedScore = this.normalizeScore(score, questionIds.length)
      scores[dimKey] = Math.round(normalizedScore)

      dimensions.push({
        name: dimensionNames[dimKey] || dimKey,
        score: Math.round(normalizedScore),
        description: '',
      })
    })

    return { dimensions, scores }
  }

  protected normalizeScore(score: number, questionCount: number): number {
    if (questionCount === 0) return 0
    const average = score / questionCount
    return Math.min(100, Math.max(0, ((average - 1) / 4) * 100))
  }

  protected getDimensionQuestionIds(_dimKey: string, dimIndex: number): string[] {
    const start = dimIndex * 3 + 1
    return [String(start), String(start + 1), String(start + 2)]
  }

  protected calculateOverallScore(scores: Record<string, number>): number {
    const values = Object.values(scores)
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  }

  protected generateTraits(_scores: Record<string, number>, _dimensions: Dimension[]): TraitScore[] {
    return this.config.traitsGenerator?.(_scores, _dimensions) ?? []
  }

  protected generateSummary(scores: Record<string, number>, dimensions: Dimension[], overallScore: number): { title: string; subtitle: string; summary: string } {
    if (this.config.summaryGenerator) {
      return this.config.summaryGenerator(scores, dimensions, overallScore)
    }
    return {
      title: `${this.config.name}测评完成`,
      subtitle: `综合得分: ${overallScore}`,
      summary: `测评完成，感谢你的参与。你的${this.config.name}综合得分为 ${overallScore} 分。`,
    }
  }

  public calculate(answers: Answer[]): AssessmentResult {
    const answerMap = this.buildAnswerMap(answers)
    const { dimensions, scores } = this.calculateDimensions(answerMap)
    const overallScore = this.calculateOverallScore(scores)
    const summary = this.generateSummary(scores, dimensions, overallScore)
    const traits = this.generateTraits(scores, dimensions)
    
    const baseResult = {
      type: this.config.name.toLowerCase(),
      ...summary,
      overallScore,
      dimensions,
      traits,
    }
    
    const answerValues: Record<string, number> = {}
    answers.forEach((a, i) => {
      answerValues[String(i + 1)] = this.normalizeAnswer(a)
    })
    
    const enhanced = globalIsomerCalculator.enhanceResult(baseResult, answerValues)
    return enhanced as AssessmentResult
  }
}

export function createProfessionalCalculator(config: CalculatorConfig) {
  class DynamicCalculator extends BaseProfessionalCalculator {
    protected config = config
  }
  const calculator = new DynamicCalculator()
  return (answers: Answer[]) => calculator.calculate(answers)
}
