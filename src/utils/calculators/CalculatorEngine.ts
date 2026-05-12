import { normalizeResult } from './normalizeResult'
import type { AssessmentResult } from '../../types'

interface CalculationContext {
  assessmentId: string
  answers: number[]
  mode: 'normal' | 'advanced' | 'professional'
}

interface CalculationMetadata {
  calculatorUsed: string
  calculationTime: number
  fallbackUsed: boolean
  entropy?: number
  reliability?: number
}

interface CalculationResult {
  result: AssessmentResult
  metadata: CalculationMetadata
}

class CalculatorEngine {
  private static instance: CalculatorEngine

  private constructor() {}

  static getInstance(): CalculatorEngine {
    if (!CalculatorEngine.instance) {
      CalculatorEngine.instance = new CalculatorEngine()
    }
    return CalculatorEngine.instance
  }

  // 安全验证 answers 数组
  private validateAnswers(answers: unknown): number[] {
    if (!Array.isArray(answers)) return []
    return answers
      .map(a => typeof a === 'number' ? a : 0)
      .map(v => Math.max(0, Math.min(100, v))) // 限制在合理范围
  }

  async calculate(context: CalculationContext): Promise<CalculationResult> {
    const startTime = performance.now()
    const { assessmentId, answers, mode } = context

    try {
      const validatedAnswers = this.validateAnswers(answers)
      const result = await this.executeCalculator(assessmentId, validatedAnswers, mode)
      const normalizedResult = normalizeResult(result, assessmentId)
      const calculationTime = performance.now() - startTime

      return {
        result: normalizedResult,
        metadata: {
          calculatorUsed: mode === 'professional' ? 'professional' : 'standard',
          calculationTime,
          fallbackUsed: false,
        },
      }
    } catch (primaryError) {
      console.warn(`[CalculatorEngine] 主计算器失败 (${assessmentId}):`, primaryError)

      try {
        const validatedAnswers = this.validateAnswers(answers)
        const fallbackResult = this.fallbackCalculate(assessmentId, validatedAnswers)
        const normalizedResult = normalizeResult(fallbackResult, assessmentId)
        const calculationTime = performance.now() - startTime

        return {
          result: normalizedResult,
          metadata: {
            calculatorUsed: 'fallback',
            calculationTime,
            fallbackUsed: true,
          },
        }
      } catch (fallbackError) {
        console.error(`[CalculatorEngine] 降级计算器也失败 (${assessmentId}):`, fallbackError)
        const calculationTime = performance.now() - startTime

        const validatedAnswers = this.validateAnswers(answers)
        return {
          result: this.emergencyResult(assessmentId, validatedAnswers),
          metadata: {
            calculatorUsed: 'emergency',
            calculationTime,
            fallbackUsed: true,
          },
        }
      }
    }
  }

  private async executeCalculator(
    assessmentId: string,
    answers: number[],
    mode: string
  ): Promise<AssessmentResult> {
    if (mode === 'professional') {
      const { calculateProfessionalResult } = await import('../professionalCalculators')
      return await calculateProfessionalResult(assessmentId, answers, mode)
    }

    const assessmentModule = await this.loadAssessmentModule(assessmentId)
    if (assessmentModule?.resultCalculator) {
      return assessmentModule.resultCalculator(answers)
    }

    const { calculateProfessionalResult } = await import('../professionalCalculators')
    return await calculateProfessionalResult(assessmentId, answers, mode)
  }

  private async loadAssessmentModule(assessmentId: string): Promise<any> {
    try {
      const moduleMap: Record<string, () => Promise<any>> = {
        'ocean-bigfive': () => import('../../data/assessments/ocean-bigfive'),
        'dark-triad': () => import('../../data/assessments/dark-triad'),
        'eq-goleman': () => import('../../data/assessments/eq-goleman'),
        'ecr-attachment': () => import('../../data/assessments/ecr-attachment'),
        'scl90': () => import('../../data/assessments/scl90-symptoms'),
        'sas-standard': () => import('../../data/assessments/sas-standard'),
        'sleep-quality': () => import('../../data/assessments/sleep-quality'),
        'holland-sds': () => import('../../data/assessments/holland-sds'),
        'burnout-mbi': () => import('../../data/assessments/burnout-mbi'),
        'cast-parenting': () => import('../../data/assessments/cast-parenting'),
        'ideology-9square': () => import('../../data/assessments/ideology-9square'),
        'iq-ravens': () => import('../../data/assessments/iq-ravens'),
        'gma-maturity': () => import('../../data/assessments/gma-maturity'),
        'mental-age': () => import('../../data/assessments/mental-age'),
        'sbti-personality': () => import('../../data/assessments/sbti-personality'),
        'schwartz-standard': () => import('../../data/assessments/schwartz-standard'),
        'tki-standard': () => import('../../data/assessments/tki-standard'),
        'slacking-purity': () => import('../../data/assessments/slacking-purity'),
        'sexual-experience': () => import('../../data/assessments/sexual-experience'),
        'onepiece-bounty': () => import('../../data/assessments/onepiece-bounty'),
        'abm-love-animal': () => import('../../data/assessments/abm-love-animal'),
        'color-subconscious': () => import('../../data/assessments/color-subconscious'),
        'sds-standard': () => import('../../data/assessments/sds-standard'),
        'lacan-diagnosis': () => import('../../data/assessments/lacan-diagnosis'),
        'pss-stress': () => import('../../data/assessments/pss-stress'),
        'pss-standard': () => import('../../data/assessments/pss-standard'),
        'foodie-level': () => import('../../data/assessments/foodie-level'),
        'internet-addiction': () => import('../../data/assessments/internet-addiction'),
        'mindset-standard': () => import('../../data/assessments/mindset-standard'),
        'metacognition-standard': () => import('../../data/assessments/metacognition-standard'),
        'ocb-standard': () => import('../../data/assessments/ocb-standard'),
        'pcq-standard': () => import('../../data/assessments/pcq-standard'),
        'philo-spectrum': () => import('../../data/assessments/philo-spectrum'),
        'life-meaning': () => import('../../data/assessments/life-meaning'),
        'pua-resistance': () => import('../../data/assessments/pua-resistance'),
        'officialdom-dream': () => import('../../data/assessments/officialdom-dream'),
        'patriotism-purity': () => import('../../data/assessments/patriotism-purity'),
        'mlq-standard': () => import('../../data/assessments/mlq-standard'),
        'fubao-index': () => import('../../data/assessments/fubao-index'),
        'kolb-standard': () => import('../../data/assessments/kolb-standard'),
        'hardiness-standard': () => import('../../data/assessments/hardiness-standard'),
        'els-standard': () => import('../../data/assessments/els-standard'),
        'asi-standard': () => import('../../data/assessments/asi-standard'),
        'attention-test': () => import('../../data/assessments/attention-test'),
        'mft-standard': () => import('../../data/assessments/mft-standard'),
        'love-languages': () => import('../../data/entertainment/love-languages'),
      }
      const loader = moduleMap[assessmentId]
      if (loader) {
        const mod = await loader()
        return mod.default || mod
      }
    } catch (e) {
      console.warn(`[CalculatorEngine] 无法加载测评模块 ${assessmentId}:`, e)
    }
    return null
  }

  private fallbackCalculate(assessmentId: string, answers: number[]): AssessmentResult {
    const validAnswers = answers.filter(a => typeof a === 'number' && !isNaN(a))
    const sum = validAnswers.reduce((s, a) => s + a, 0)
    const avg = validAnswers.length > 0 ? sum / validAnswers.length : 0
    const maxPossible = validAnswers.length * 5
    const percentage = maxPossible > 0 ? Math.round((sum / maxPossible) * 100) : 0

    return {
      type: assessmentId,
      score: percentage,
      accuracy: 70,
      title: '基础分析报告',
      description: `基于 ${validAnswers.length} 道题目的基础分析`,
      dimensions: [
        { name: '综合得分', score: percentage },
      ],
      strengths: ['已完成测评'],
      weaknesses: ['建议重新测评获取更详细结果'],
      careers: [],
      suggestions: ['建议重新完成测评以获取更精确的分析结果'],
    }
  }

  private emergencyResult(assessmentId: string, answers: number[]): AssessmentResult {
    return {
      type: assessmentId,
      score: 0,
      accuracy: 0,
      title: '计算异常',
      description: '结果计算过程中出现异常，请重新测评',
      dimensions: [],
      strengths: [],
      weaknesses: [],
      careers: [],
      suggestions: ['请重新完成测评'],
    }
  }
}

export const calculatorEngine = CalculatorEngine.getInstance()
export type { CalculationContext, CalculationMetadata, CalculationResult }
