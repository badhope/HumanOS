// =============================================================================
//  统一计算器 Wrapper - 自动切换前后端计算
// =============================================================================
import { apiClient, CalculationResponse } from './apiClient'
import { standardCalculators, StandardCalculatorId } from '../utils/calculators'
import { buildAnswerMap } from '../utils/calculators/calculator-utils'
import { Answer } from '../types'
import visitorService from './visitorIdentity'

export type UnifiedCalculationResult = CalculationResponse & {
  source: 'frontend' | 'backend'
  latency?: number
  accuracy: number
}

const BACKEND_CALCULATOR_IDS = [
  'ocean-bigfive',
  'burnout-mbi',
  'sas-standard',
  'holland-sds',
  'ecr-attachment',
  'dark-triangle',
  'dark-triad',
  'eq-goleman',
  'iq-ravens',
  'ideology-9square',
  'slacking-purity',
  'foodie-level',
  'internet-addiction',
  'life-meaning',
  'patriotism-purity',
  'sexual-experience',
  'gma-maturity',
  'cast-parenting',
  'philo-spectrum',
  'onepiece-bounty',
  'lacan-diagnosis',
  'pua-resistance',
  'fubao-index',
]

class CalculatorService {
  private useBackend: boolean = true
  private fallbackToFrontend: boolean = true
  private backendAvailable: boolean | null = null
  private lastBackendCheck: number = 0
  private readonly CHECK_CACHE_MS = 60000

  constructor() {
    this.checkBackendAvailability(true)
  }

  hasBackendCalculator(assessmentId: string): boolean {
    return BACKEND_CALCULATOR_IDS.includes(assessmentId)
  }

  async checkBackendAvailability(force: boolean = false): Promise<boolean> {
    const now = Date.now()
    
    if (!force && this.backendAvailable === true && (now - this.lastBackendCheck) < this.CHECK_CACHE_MS) {
      return true
    }
    
    try {
      this.backendAvailable = await apiClient.healthCheck()
      this.lastBackendCheck = now
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

  async shouldUseBackend(assessmentId?: string): Promise<boolean> {
    if (!this.useBackend) return false
    
    if (assessmentId && this.hasBackendCalculator(assessmentId)) {
      await this.checkBackendAvailability()
    }
    
    return this.backendAvailable === true
  }

  getCalculationSource(): 'frontend' | 'backend' | 'auto' {
    if (!this.useBackend) return 'frontend'
    if (this.backendAvailable === true) return 'backend'
    if (this.backendAvailable === false) return 'frontend'
    return 'auto'
  }

  private normalizeAnswerValues(answerMap: Record<string, number>): Record<string, number> {
    const normalized: Record<string, number> = {}
    
    Object.entries(answerMap).forEach(([key, value]) => {
      let val = typeof value === 'number' ? value : Number(value) || 3
      
      if (val >= 1 && val <= 4) {
        val = Math.round(val * 5 / 4)
      }
      
      normalized[key] = val
    })
    
    return normalized
  }

  private calculateAccuracyScore(answeredCount: number): number {
    if (answeredCount >= 50) return 99
    if (answeredCount >= 40) return 95
    if (answeredCount >= 30) return 90
    if (answeredCount >= 25) return 85
    if (answeredCount >= 20) return 78
    if (answeredCount >= 15) return 70
    return Math.max(50, 50 + answeredCount * 1.5)
  }

  async calculate(
    assessmentId: StandardCalculatorId,
    answers: Answer[] | Record<string, number>,
    options: {
      forceFrontend?: boolean
      forceBackend?: boolean
      userId?: number
    } = {}
  ): Promise<UnifiedCalculationResult> {
    const startTime = Date.now()

    const hasBackend = this.hasBackendCalculator(assessmentId)
    
    const useBackendCalc =
      !options.forceFrontend &&
      (options.forceBackend || hasBackend) &&
      (await this.shouldUseBackend(assessmentId))

    const calculator = standardCalculators[assessmentId]
    let answerMap = Array.isArray(answers) ? buildAnswerMap(answers) : answers
    
    answerMap = this.normalizeAnswerValues(answerMap)

    const archiveOnce = () => apiClient.archiveResult(assessmentId, answerMap).catch(() => {})

    if (useBackendCalc) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          if (attempt > 0) {
            await new Promise((resolve) => setTimeout(resolve, 500 * attempt))
          }
          
          const result = await apiClient.calculateAssessment(assessmentId, {
            answers: answerMap,
            user_id: options.userId,
            session_id: visitorService.getVisitorId(),
            include_norm: true,
            include_interpretation: true,
          })

          archiveOnce()

          const accuracy = this.calculateAccuracyScore(Object.keys(answerMap).length)
          return {
            ...result,
            source: 'backend',
            latency: Date.now() - startTime,
            accuracy,
          } as UnifiedCalculationResult
        } catch (error) {
          console.warn(`[Calculator] 后端计算 (尝试 ${attempt + 1}/2) 失败:`, error)

          if (attempt === 1 && !this.fallbackToFrontend) {
            throw error
          }
        }
      }
    }

    const frontendResult = calculator(answerMap as any)
    archiveOnce()
    const accuracy = this.calculateAccuracyScore(Object.keys(answerMap).length)

    return this.adaptFrontendResult(
      assessmentId,
      frontendResult,
      Date.now() - startTime,
      accuracy
    )
  }

  private adaptFrontendResult(
    assessmentId: string,
    frontendResult: any,
    latency: number,
    accuracy: number
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
      accuracy,
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

  /**
   * ==============================================
   *  后端标准化格式 → 前端原生格式 适配器
   * ==============================================
   * 【解决根本问题】所有 Report 组件都在读取 result.score / result.O / result.typeCode
   * 【之前的bug】后端返回 overall_score / dimensions 数组，组件读到 undefined
   * 【这个适配器】让24个Report组件零修改就能正常工作
   */
  adaptToFrontendNativeFormat(result: any): any {
    if (!result) return result

    const adapted: any = {
      ...result,
      score: result.overall_score || result.score,
    }

    if (result.dimensions && Array.isArray(result.dimensions)) {
      result.dimensions.forEach((dim: any) => {
        const id = dim.dimension_id || dim.id || dim.dimension || dim.key
        if (id) {
          adapted[id] = dim.raw_score ?? dim.score ?? dim.value
        }
      })
      
      adapted.dimensions = result.dimensions.map((dim: any) => ({
        name: dim.dimension_id || dim.id || dim.dimension || dim.key,
        label: dim.name,
        score: dim.raw_score ?? dim.score ?? dim.value,
        percentile: dim.percentile,
        level: dim.level,
        z_score: dim.z_score,
        t_score: dim.t_score,
        stanine: dim.stanine,
      }))
    }

    if (result.type_profile) {
      adapted.type = result.type_profile.type
      adapted.typeCode = result.type_profile.code
      adapted.code = result.type_profile.code
      
      if (result.type_profile.attachment_style) {
        const styleMap: Record<string, string> = {
          'secure': 'secure',
          'preoccupied': 'anxious',
          'dismissive': 'avoidant',
          'fearful': 'fearful',
        }
        adapted.style = styleMap[result.type_profile.attachment_style] || result.type_profile.attachment_style
      }
      
      Object.entries(result.type_profile).forEach(([key, value]) => {
        if (!(key in adapted)) {
          adapted[key] = value
        }
      })
    }

    if (result.interpretation) {
      adapted.interpretation = result.interpretation.summary || result.interpretation
      adapted.level = result.interpretation.level
    }

    if (result.career_suggestions) {
      adapted.careers = result.career_suggestions
    }

    if (result.development_advice) {
      adapted.advice = result.development_advice
      adapted.suggestions = result.development_advice
    }

    if (result.strengths) {
      adapted.strengths = result.strengths
    }

    if (result.blind_spots) {
      adapted.blindSpots = result.blind_spots
    }

    return adapted
  }
}

const calculatorService = new CalculatorService()

export { calculatorService }

export default calculatorService
