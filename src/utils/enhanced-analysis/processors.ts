import type {
  MetricDefinition,
  MetricResult,
  BenchmarkConfig,
  InterpretationRange,
  EnhancedAnalysisDimension,
  DimensionCorrelation,
  CorrelationResult,
  DimensionMetadata,
} from './types'

export function createInterpretationRanges(): InterpretationRange[] {
  return [
    { min: 0, max: 20, level: 'very_low', label: '需提升', description: '该维度能力低于平均水平', color: '#ef4444' },
    { min: 20, max: 40, level: 'low', label: '较低', description: '该维度能力处于中下水平', color: '#f97316' },
    { min: 40, max: 60, level: 'average', label: '中等', description: '该维度能力处于平均水平', color: '#eab308' },
    { min: 60, max: 80, level: 'high', label: '较高', description: '该维度能力高于平均水平', color: '#22c55e' },
    { min: 80, max: 100, level: 'very_high', label: '优秀', description: '该维度能力显著高于平均水平', color: '#3b82f6' }
  ]
}

export function createDefaultBenchmark(): BenchmarkConfig {
  return {
    population: '中国成年人',
    mean: 50,
    standardDeviation: 10,
    percentiles: { 10: 37, 25: 43, 50: 50, 75: 57, 90: 63 }
  }
}

export function createDefaultMetadata(reliability: number = 0.85, validity: number = 0.82): DimensionMetadata {
  return {
    version: '2.0',
    lastUpdated: '2024-01-01',
    validationStatus: 'validated',
    reliability,
    validity,
    references: ['心理学测评标准']
  }
}

export function calculateMetrics(metrics: MetricDefinition[], data: any): MetricResult[] {
  return metrics.map(metric => {
    const rawValue = data[metric.id] !== undefined
      ? data[metric.id]
      : (metric.range[0] + metric.range[1]) / 2

    const normalizedValue = Math.min(metric.range[1], Math.max(metric.range[0], rawValue))

    const mean = (metric.range[0] + metric.range[1]) / 2
    const sd = (metric.range[1] - metric.range[0]) / 4
    const zScore = (normalizedValue - mean) / sd
    const percentile = Math.min(99, Math.max(1, Math.round((1 / (1 + Math.exp(-zScore))) * 100)))

    const deviation = normalizedValue - mean

    return {
      metricId: metric.id,
      name: metric.name,
      value: normalizedValue,
      unit: metric.unit,
      level: percentile > 75 ? 'excellent' : percentile > 50 ? 'average' : 'needs_improvement',
      percentile,
      trend: deviation > 0 ? 'up' : deviation < 0 ? 'down' : 'stable'
    }
  })
}

export function calculateOverallScore(metrics: MetricResult[]): number {
  if (metrics.length === 0) return 50
  return metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length
}

export function calculatePercentile(score: number, benchmarks: BenchmarkConfig): number {
  const zScore = (score - benchmarks.mean) / benchmarks.standardDeviation
  return Math.min(99, Math.max(1, Math.round((1 / (1 + Math.exp(-zScore))) * 100)))
}

export function determineLevel(score: number, ranges: InterpretationRange[]): 'very_low' | 'low' | 'average' | 'high' | 'very_high' {
  for (const range of ranges) {
    if (score >= range.min && score < range.max) {
      return range.level
    }
  }
  return 'average'
}

export function calculateConfidence(metrics: MetricResult[], metadata: DimensionMetadata): number {
  return metadata.reliability * metadata.validity
}

export function calculateCorrelations(dimension: EnhancedAnalysisDimension, getDimension: (id: string) => EnhancedAnalysisDimension | undefined): CorrelationResult[] {
  return dimension.correlations.map(corr => ({
    dimensionId: corr.targetDimensionId,
    dimensionName: getDimension(corr.targetDimensionId)?.name || corr.targetDimensionId,
    correlationType: corr.correlationType,
    strength: corr.strength,
    description: corr.description
  }))
}

export function filterRelevantAnswers(answers: Record<string, any>, dimension: EnhancedAnalysisDimension): Record<string, any> {
  const relevantKeys = Object.keys(answers).filter(key =>
    key.toLowerCase().includes(dimension.id.toLowerCase()) ||
    key.toLowerCase().includes(dimension.category.toLowerCase())
  )
  const filtered: Record<string, any> = {}
  relevantKeys.forEach(key => {
    filtered[key] = answers[key]
  })
  return filtered
}

export function calculateRawScore(answers: Record<string, any>): number {
  const values = Object.values(answers).filter(v => typeof v === 'number') as number[]
  if (values.length === 0) return 50
  return values.reduce((sum, val) => sum + val, 0) / values.length
}

export function normalizeScore(rawScore: number, dimension: EnhancedAnalysisDimension): number {
  const range = dimension.layers.basic.metrics[0]?.range || [0, 100]
  const min = range[0]
  const max = range[1]
  return Math.min(max, Math.max(min, rawScore))
}

export function calculateOverallAssessmentScore(dimensionResults: { normalizedScore: number }[]): number {
  if (dimensionResults.length === 0) return 50
  return dimensionResults.reduce((sum, dr) => sum + dr.normalizedScore, 0) / dimensionResults.length
}

export function calculateOverallConfidence(dimensionResults: unknown[]): number {
  if (dimensionResults.length === 0) return 0
  return dimensionResults.reduce((sum) => sum + 0.8, 0) / dimensionResults.length
}

export function determineOverallLevel(score: number): 'excellent' | 'good' | 'average' | 'below_average' | 'poor' {
  if (score >= 90) return 'excellent'
  if (score >= 75) return 'good'
  if (score >= 60) return 'average'
  if (score >= 40) return 'below_average'
  return 'poor'
}
