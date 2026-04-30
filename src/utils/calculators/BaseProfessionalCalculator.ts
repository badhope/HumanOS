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
    answers.forEach(a => {
      const qid = a.questionId.replace(new RegExp(`^${this.config.questionPrefix}[n]?`), this.config.questionPrefix)
      answerMap[qid] = this.normalizeAnswer(a)
    })
    return answerMap
  }

  protected calculateDimensions(answerMap: Record<string, number>): { dimensions: Dimension[]; scores: Record<string, number> } {
    const dimensions: Dimension[] = []
    const scores: Record<string, number> = {}
    const { dimensionKeys, dimensionNames, reverseScored = [], questionPrefix } = this.config

    dimensionKeys.forEach((dimKey, dimIndex) => {
      const questionIds = this.getDimensionQuestionIds(dimKey, dimIndex)
      let score = questionIds.reduce((sum, qid) => {
        let value = answerMap[`${questionPrefix}${qid}`] ?? 3
        if (reverseScored.includes(`${questionPrefix}${qid}`)) {
          value = 6 - value
        }
        return sum + value
      }, 0)

      const normalizedScore = Math.min(100, Math.max(0, (((score / questionIds.length) - 1) / 4) * 100))
      scores[dimKey] = Math.round(normalizedScore)

      dimensions.push({
        name: dimensionNames[dimKey] || dimKey,
        score: Math.round(normalizedScore),
        description: '',
      })
    })

    return { dimensions, scores }
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
