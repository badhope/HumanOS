// =============================================================================
//  统一计算器 Wrapper - 自动切换前后端计算
// =============================================================================
import { apiClient, CalculationResponse } from './apiClient'
import { standardCalculators, StandardCalculatorId } from '../utils/calculators'

export type UnifiedCalculationResult = CalculationResponse & {
  source: 'frontend' | 'backend'
  latency?: number
}

class CalculatorService {
  private useBackend: boolean = apiClient.isBackendEnabled()
  private fallbackToFrontend: boolean = true
  private backendAvailable: boolean | null = null

  constructor() {
    this.checkBackendAvailability()
  }

  async checkBackendAvailability(): Promise<boolean> {
    try {
      this.backendAvailable = await apiClient.healthCheck()
      return this.backendAvailable
    } catch {
      this.backendAvailable = false
      return false
    }
  }

  setUseBackend(enabled: boolean) {
    this.useBackend = enabled
    apiClient.toggleBackend(enabled)
  }

  shouldUseBackend(): boolean {
    return this.useBackend && this.backendAvailable === true
  }

  getCalculationSource(): 'frontend' | 'backend' | 'auto' {
    if (!this.useBackend) return 'frontend'
    if (this.backendAvailable === true) return 'backend'
    if (this.backendAvailable === false) return 'frontend'
    return 'auto'
  }

  async calculate(
    assessmentId: StandardCalculatorId,
    answers: Record<string, number>,
    options: {
      forceFrontend?: boolean
      forceBackend?: boolean
      userId?: number
    } = {}
  ): Promise<UnifiedCalculationResult> {
    const startTime = Date.now()

    const useBackendCalc =
      !options.forceFrontend &&
      (options.forceBackend || this.shouldUseBackend())

    const calculator = standardCalculators[assessmentId]

    if (useBackendCalc) {
      try {
        const result = await apiClient.calculateAssessment(assessmentId, {
          answers,
          user_id: options.userId,
          include_norm: true,
          include_interpretation: true,
        })

        return {
          ...result,
          source: 'backend',
          latency: Date.now() - startTime,
        }
      } catch (error) {
        console.warn('[Calculator] 后端计算失败，回退到前端计算:', error)

        if (!this.fallbackToFrontend) {
          throw error
        }
      }
    }

    const frontendResult = calculator(answers as any)

    return this.adaptFrontendResult(
      assessmentId,
      frontendResult,
      Date.now() - startTime
    )
  }

  private adaptFrontendResult(
    assessmentId: string,
    frontendResult: any,
    latency: number
  ): UnifiedCalculationResult {
    const assessmentNames: Record<string, string> = {
      'ocean-bigfive': '大五人格测评 (OCEAN)',
      'burnout-mbi': 'MBI 职业倦怠量表',
      'sas-standard': 'SAS 焦虑自评量表',
      'holland-sds': '霍兰德职业兴趣测评 (SDS)',
      'ecr-attachment': 'ECR 依恋风格测评',
      'dark-triangle': '暗黑三角人格',
      'eq-goleman': '戈尔曼情商量表',
      'iq-ravens': '瑞文标准推理测验',
      'ideology-9square': '政治九宫格',
      'slacking-purity': '摸鱼纯度测试',
      'foodie-level': '吃货等级认证',
      'internet-addiction': '网瘾程度鉴定',
      'life-meaning': '人生意义量表',
      'patriotism-purity': '爱国纯度测试',
      'sexual-experience': '性经验量表',
      'gma-maturity': '心理成熟度量表',
      'cast-parenting': 'CAST 教养方式量表',
      'philo-spectrum': '哲学光谱测试',
      'onepiece-bounty': '海贼王赏金鉴定',
      'lacan-diagnosis': '拉康精神分析诊断',
      'pua-resistance': 'PUA 抵抗力测试',
      'fubao-index': '福报指数测试',
    }

    const dimensions = this.normalizeDimensions(frontendResult)

    return {
      assessment_id: assessmentId,
      assessment_name: assessmentNames[assessmentId] || assessmentId,
      overall_score: this.extractOverallScore(frontendResult),
      dimensions,
      type_profile: frontendResult.type || frontendResult.code ? {
        code: frontendResult.code,
        type: frontendResult.type,
      } : undefined,
      interpretation: frontendResult.interpretation
        ? { summary: frontendResult.interpretation }
        : frontendResult.level
        ? { level: frontendResult.level }
        : undefined,
      career_suggestions: frontendResult.careers,
      development_advice: frontendResult.advice || frontendResult.suggestions,
      strengths: frontendResult.strengths,
      blind_spots: frontendResult.blindSpots,
      source: 'frontend',
      latency,
      calculated_at: new Date().toISOString(),
      version: '2.5.0-fe',
    }
  }

  private normalizeDimensions(result: any): any[] {
    if (result.dimensions && Array.isArray(result.dimensions)) {
      return result.dimensions.map((d: any) => ({
        id: d.id || d.dimension || d.key,
        name: d.name || d.label,
        raw_score: d.score || d.raw || d.value,
        percentile: d.percentile,
        stanine: d.stanine,
        level: d.level || d.tier,
        interpretation: d.interpretation || d.description,
      }))
    }

    return Object.entries(result)
      .filter(([key, val]) => typeof val === 'number' && key.length <= 3)
      .map(([key, score]) => ({
        id: key,
        name: key,
        raw_score: score as number,
        level: '',
      }))
  }

  private extractOverallScore(result: any): number | undefined {
    if (typeof result.score === 'number') return result.score
    if (typeof result.total === 'number') return result.total
    if (typeof result.overall === 'number') return result.overall
    return undefined
  }
}

const calculatorService = new CalculatorService()

export { calculatorService }

export default calculatorService
