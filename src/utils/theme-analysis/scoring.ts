/**
 * 多维度主题分析框架 - 评分逻辑
 */

import type { 
  ThemeAnalysisModule, 
  EvaluationMetric, 
  MetricResult, 
  Finding,
  FindingType,
  SignificanceLevel,
  TrendDirection,
  MetricLevel
} from './types'

const baselineScores: Record<string, number> = {
  'internal_consistency': 85,
  'construct_validity': 78,
  'criterion_validity': 72,
  'test_retest': 82,
  'measurement_se': 65,
  'floor_effect': 88,
  'ceiling_effect': 85,
  'item_discrimination': 75,
  'factor_loading': 80,
  'eigenvalue': 70
}

export interface ScoringConfig {
  enableTrendAnalysis: boolean
  enablePercentileCalculation: boolean
  baselineMode: 'strict' | 'moderate' | 'lenient'
}

const defaultScoringConfig: ScoringConfig = {
  enableTrendAnalysis: true,
  enablePercentileCalculation: true,
  baselineMode: 'moderate'
}

export function calculateMetricValue(
  metric: EvaluationMetric, 
  data: any, 
  config: Partial<ScoringConfig> = {}
): number {
  const cfg = { ...defaultScoringConfig, ...config }
  const range = metric.scale.range

  if (data && typeof data === 'object' && data[metric.id] !== undefined) {
    const rawValue = data[metric.id]
    if (typeof rawValue === 'number') {
      return Math.min(range[1], Math.max(range[0], rawValue))
    }
  }

  const baseValue = baselineScores[metric.id] || (range[0] + range[1]) / 2

  switch (cfg.baselineMode) {
    case 'strict':
      return baseValue * 0.9
    case 'moderate':
      return baseValue
    case 'lenient':
      return baseValue * 1.1
    default:
      return baseValue
  }
}

export function determineMetricLevel(
  metric: EvaluationMetric, 
  value: number
): MetricLevel {
  for (const benchmark of metric.benchmarks) {
    if (value >= benchmark.range[0] && value <= benchmark.range[1]) {
      return benchmark.level
    }
  }
  return 'medium'
}

export function calculatePercentile(
  value: number, 
  range: [number, number]
): number {
  const [min, max] = range
  const percentile = ((value - min) / (max - min)) * 100
  return Math.min(99, Math.max(1, Math.round(percentile)))
}

export function determineTrend(
  value: number, 
  range: [number, number]
): TrendDirection {
  const mean = (range[0] + range[1]) / 2
  if (value > mean * 1.1) return 'increasing'
  if (value < mean * 0.9) return 'decreasing'
  return 'stable'
}

export function calculateMetricResult(
  module: ThemeAnalysisModule, 
  data: any,
  config: Partial<ScoringConfig> = {}
): MetricResult[] {
  return module.evaluationMetrics.map(metric => {
    const value = calculateMetricValue(metric, data, config)
    const range = metric.scale.range
    const cfg = { ...defaultScoringConfig, ...config }

    const result: MetricResult = {
      metricId: metric.id,
      metricName: metric.name,
      value,
      unit: metric.scale.unit,
      level: determineMetricLevel(metric, value)
    }

    if (cfg.enablePercentileCalculation) {
      result.percentile = calculatePercentile(value, range)
    }

    if (cfg.enableTrendAnalysis) {
      result.trend = determineTrend(value, range)
    }

    return result
  })
}

export function calculateConfidence(metrics: MetricResult[]): number {
  if (metrics.length === 0) return 0.5
  
  const levelValue: Record<MetricLevel, number> = {
    low: 0.25,
    medium: 0.5,
    high: 0.75,
    exceptional: 1.0
  }
  
  const avgLevel = metrics.reduce((sum, m) => {
    return sum + levelValue[m.level]
  }, 0) / metrics.length
  
  return avgLevel
}

export function calculateOverallScore(
  results: Array<{ metrics: MetricResult[]; confidence: number }>,
  weights: Record<string, number> = {}
): number {
  if (results.length === 0) return 0

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0) || results.length
  
  let weightedSum = 0
  let weightSum = 0

  results.forEach((result, index) => {
    const weight = weights[`module_${index}`] || 1
    const avgMetricScore = result.metrics.length > 0
      ? result.metrics.reduce((sum, m) => {
          const levelValue: Record<MetricLevel, number> = {
            low: 0.25,
            medium: 0.5,
            high: 0.75,
            exceptional: 1.0
          }
          return sum + levelValue[m.level]
        }, 0) / result.metrics.length
      : result.confidence

    weightedSum += avgMetricScore * weight
    weightSum += weight
  })

  return (weightedSum / weightSum) * 100
}

export function scoreFinding(
  module: ThemeAnalysisModule, 
  data: any
): Finding[] {
  return [
    {
      id: `${module.id}-finding-1`,
      type: 'primary',
      description: `基于${module.name}的核心发现`,
      evidence: [
        {
          type: 'statistical',
          content: '数据分析结果',
          source: '实证数据',
          reliability: 0.85
        }
      ],
      significance: 'high',
      implications: ['对主题理解的重要贡献']
    }
  ]
}

export function calculateBenchmarkComparison(
  value: number,
  benchmarkValue: number,
  range: [number, number]
): { difference: number; significance: boolean } {
  const rangeSize = range[1] - range[0]
  const normalizedValue = (value - range[0]) / rangeSize
  const normalizedBenchmark = (benchmarkValue - range[0]) / rangeSize
  
  const difference = (normalizedValue - normalizedBenchmark) * 100
  const significance = Math.abs(difference) > 10

  return { difference, significance }
}

export function calculateCorrelationScore(
  coefficient: number,
  significance: number
): number {
  const coefficientScore = Math.abs(coefficient) * 100
  const significanceBonus = significance < 0.05 ? 10 : significance < 0.1 ? 5 : 0
  
  return Math.min(100, coefficientScore + significanceBonus)
}

export function calculateEffectSize(
  mean1: number,
  mean2: number,
  sd1: number,
  sd2: number
): number {
  const pooledSD = Math.sqrt((sd1 * sd1 + sd2 * sd2) / 2)
  if (pooledSD === 0) return 0
  return Math.abs(mean1 - mean2) / pooledSD
}

export function interpretEffectSize(cohensD: number): {
  level: 'small' | 'medium' | 'large'
  description: string
} {
  if (Math.abs(cohensD) < 0.2) {
    return { level: 'small', description: '效应量较小' }
  } else if (Math.abs(cohensD) < 0.8) {
    return { level: 'medium', description: '效应量中等' }
  } else {
    return { level: 'large', description: '效应量较大' }
  }
}

export function calculateWeightedAverage(
  values: number[],
  weights: number[]
): number {
  if (values.length !== weights.length || values.length === 0) {
    return 0
  }
  
  const totalWeight = weights.reduce((a, b) => a + b, 0)
  if (totalWeight === 0) return 0

  const weightedSum = values.reduce((sum, val, i) => sum + val * weights[i], 0)
  return weightedSum / totalWeight
}

export function normalizeScores(scores: number[]): number[] {
  const min = Math.min(...scores)
  const max = Math.max(...scores)
  const range = max - min
  
  if (range === 0) return scores.map(() => 50)
  
  return scores.map(s => ((s - min) / range) * 100)
}

export function calculateTrendScore(
  historicalValues: number[],
  recentValues: number[]
): number {
  if (historicalValues.length === 0 || recentValues.length === 0) {
    return 50
  }

  const historicalMean = historicalValues.reduce((a, b) => a + b, 0) / historicalValues.length
  const recentMean = recentValues.reduce((a, b) => a + b, 0) / recentValues.length
  
  const changePercent = ((recentMean - historicalMean) / historicalMean) * 100
  
  const trendScore = 50 + Math.min(50, Math.max(-50, changePercent))
  
  return Math.min(100, Math.max(0, trendScore))
}
