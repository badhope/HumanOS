export interface QuestionResponse {
  questionId: string
  value: number
  responseTime?: number
}

export interface DimensionScore {
  dimension: string
  rawScore: number
  standardizedScore: number
  percentile: number
  numberOfItems: number
  reliability: number
}

export interface CalculationResult {
  dimensions: DimensionScore[]
  overallScore?: number
  reliability: number
  responsePattern: {
    consistency: number
    averageResponseTime: number
    rapidResponseRate: number
  }
  warnings: string[]
}

export interface ItemMeta {
  dimension: string
  reversed: boolean
  factorLoading: number
}

export interface NormData {
  dimension: string
  mean: number
  stdDev: number
  percentiles: number[]
  sampleSize: number
}

export interface CalculationOptions {
  maxMissingRate: number
  rapidResponseThreshold: number
  consistencyThreshold: number
  winsorizeLevel: number
}

const DEFAULT_OPTIONS: CalculationOptions = {
  maxMissingRate: 0.05,
  rapidResponseThreshold: 2000,
  consistencyThreshold: 0.6,
  winsorizeLevel: 0.01,
}

export class StandardScoreCalculator {
  private itemMetas: Map<string, ItemMeta>
  private normData: Map<string, NormData>
  private options: CalculationOptions

  constructor(
    itemMetas: Record<string, ItemMeta>,
    normData: NormData[],
    options?: Partial<CalculationOptions>
  ) {
    this.itemMetas = new Map(Object.entries(itemMetas))
    this.normData = new Map(normData.map(n => [n.dimension, n]))
    this.options = { ...DEFAULT_OPTIONS, ...options }
  }

  calculate(responses: QuestionResponse[]): CalculationResult {
    const warnings: string[] = []
    const validResponses = this.validateAndCleanResponses(responses, warnings)

    const patternAnalysis = this.analyzeResponsePattern(validResponses)
    if (patternAnalysis.consistency < this.options.consistencyThreshold) {
      warnings.push('应答模式一致性较低，结果仅供参考')
    }
    if (patternAnalysis.rapidResponseRate > 0.3) {
      warnings.push('发现较多快速作答，可能影响结果准确性')
    }

    const dimensionRawScores = this.calculateDimensionRawScores(validResponses, warnings)

    const dimensions: DimensionScore[] = []
    for (const [dimension, { score, count, items }] of dimensionRawScores) {
      const standardizedScore = this.convertToStandardScore(dimension, score, count)
      const percentile = this.mapToPercentile(dimension, standardizedScore)
      const reliability = this.calculateSplitHalfReliability(items)

      dimensions.push({
        dimension,
        rawScore: score,
        standardizedScore,
        percentile,
        numberOfItems: count,
        reliability,
      })
    }

    const overallReliability = this.calculateOverallReliability(dimensions)

    return {
      dimensions,
      reliability: overallReliability,
      responsePattern: patternAnalysis,
      warnings,
    }
  }

  private validateAndCleanResponses(
    responses: QuestionResponse[],
    warnings: string[]
  ): QuestionResponse[] {
    const totalItems = this.itemMetas.size
    const missingCount = totalItems - responses.length
    const missingRate = missingCount / totalItems

    if (missingRate > this.options.maxMissingRate) {
      warnings.push(`缺失答题比例 ${(missingRate * 100).toFixed(1)}%，可能降低信度`)
    }

    const validResponses: QuestionResponse[] = []
    for (const resp of responses) {
      const meta = this.itemMetas.get(resp.questionId)
      if (meta) {
        validResponses.push(resp)
      }
    }

    return validResponses
  }

  private analyzeResponsePattern(responses: QuestionResponse[]) {
    if (responses.length === 0) {
      return { consistency: 0, averageResponseTime: 0, rapidResponseRate: 0 }
    }

    const times = responses.map(r => r.responseTime ?? 5000).filter(t => t > 0)
    const avgTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 5000
    const rapidCount = times.filter(t => t < this.options.rapidResponseThreshold).length
    const rapidRate = times.length > 0 ? rapidCount / times.length : 0

    const values = responses.map(r => r.value)
    const consistency = this.calculateResponseConsistency(values)

    return {
      consistency,
      averageResponseTime: avgTime,
      rapidResponseRate: rapidRate,
    }
  }

  private calculateResponseConsistency(values: number[]): number {
    if (values.length < 10) return 1.0

    const midCount = values.filter(v => v === 4).length
    const midRatio = midCount / values.length

    const runs = this.countRuns(values)
    const expectedRuns = (2 * values.length - 1) / 3

    const runRatio = Math.min(runs / expectedRuns, 1.5) / 1.5
    const consistency = 1 - Math.abs(0.5 - midRatio) * runRatio

    return Math.max(0, Math.min(1, consistency))
  }

  private countRuns(values: number[]): number {
    if (values.length === 0) return 0
    let runs = 1
    for (let i = 1; i < values.length; i++) {
      if (values[i] !== values[i - 1]) runs++
    }
    return runs
  }

  private calculateDimensionRawScores(
    responses: QuestionResponse[],
    warnings: string[]
  ): Map<string, { score: number; count: number; items: number[] }> {
    const dimensionData = new Map<string, { score: number; count: number; items: number[] }>()

    for (const resp of responses) {
      const meta = this.itemMetas.get(resp.questionId)
      if (!meta) continue

      let value = resp.value
      if (meta.reversed) {
        value = 8 - value
      }

      const weightedValue = value * meta.factorLoading

      if (!dimensionData.has(meta.dimension)) {
        dimensionData.set(meta.dimension, { score: 0, count: 0, items: [] })
      }

      const data = dimensionData.get(meta.dimension)!
      data.score += weightedValue
      data.count++
      data.items.push(value)
    }

    for (const [dim, data] of dimensionData) {
      data.score = this.winsorize(data.score, this.options.winsorizeLevel)
    }

    return dimensionData
  }

  private convertToStandardScore(dimension: string, rawScore: number, itemCount: number): number {
    const norm = this.normData.get(dimension)
    if (!norm) {
      const meanPerItem = 4
      return 50 + 10 * ((rawScore / itemCount - meanPerItem) / 2)
    }

    const adjustedMean = norm.mean
    const adjustedStd = norm.stdDev

    const z = (rawScore - adjustedMean) / adjustedStd
    return Math.round(50 + 10 * Math.max(-3, Math.min(3, z)))
  }

  private mapToPercentile(dimension: string, standardizedScore: number): number {
    const norm = this.normData.get(dimension)
    if (!norm || !norm.percentiles || norm.percentiles.length === 0) {
      const z = (standardizedScore - 50) / 10
      const percentile = Math.round(this.normalCDF(z) * 100)
      return Math.max(0, Math.min(99, percentile))
    }

    const sorted = [...norm.percentiles].sort((a, b) => a - b)
    const rank = sorted.filter(x => x < standardizedScore).length
    const ties = sorted.filter(x => x === standardizedScore).length
    const percentile = Math.round(((rank + 0.5 * ties) / sorted.length) * 100)

    return Math.max(0, Math.min(99, percentile))
  }

  private normalCDF(z: number): number {
    return 0.5 * (1 + this.erf(z / Math.sqrt(2)))
  }

  private erf(x: number): number {
    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    const sign = x >= 0 ? 1 : -1
    x = Math.abs(x)

    const t = 1 / (1 + p * x)
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

    return sign * y
  }

  private calculateSplitHalfReliability(items: number[]): number {
    if (items.length < 8) return 0.70

    const half1 = items.filter((_, i) => i % 2 === 0)
    const half2 = items.filter((_, i) => i % 2 === 1)

    const r = this.pearsonCorrelation(half1, half2)

    return (2 * r) / (1 + r)
  }

  private pearsonCorrelation(x: number[], y: number[]): number {
    const n = Math.min(x.length, y.length)
    if (n < 2) return 0

    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((s, xi, i) => s + xi * (y[i] || 0), 0)
    const sumX2 = x.reduce((a, b) => a + b * b, 0)
    const sumY2 = y.reduce((a, b) => a + b * b, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt(
      (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
    )

    return denominator === 0 ? 0 : numerator / denominator
  }

  private calculateOverallReliability(dimensions: DimensionScore[]): number {
    if (dimensions.length === 0) return 0

    const weightedSum = dimensions.reduce(
      (sum, d) => sum + d.reliability * d.numberOfItems,
      0
    )
    const totalItems = dimensions.reduce((sum, d) => sum + d.numberOfItems, 0)

    return totalItems > 0 ? weightedSum / totalItems : 0.8
  }

  private winsorize(value: number, level: number): number {
    return value
  }
}
