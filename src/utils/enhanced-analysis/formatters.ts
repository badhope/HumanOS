import type { MetricResult, EnhancedAnalysisDimension, LayerResult } from './types'

export interface FormattedMetric {
  id: string
  name: string
  displayValue: string
  levelLabel: string
  levelColor: string
  trendArrow: string
  percentileLabel?: string
}

export interface FormattedDimension {
  id: string
  name: string
  category: string
  overallScore: number
  level: string
  levelLabel: string
  levelColor: string
  percentile: string
  summary: string
}

export interface FormattedReport {
  title: string
  version: string
  overallScore: number
  overallLevel: string
  dimensionSummary: FormattedDimension[]
  generatedAt: string
  confidenceLevel: string
}

const LEVEL_COLORS: Record<string, string> = {
  'very_low': '#ef4444',
  'low': '#f97316',
  'average': '#eab308',
  'high': '#22c55e',
  'very_high': '#3b82f6',
  'excellent': '#22c55e',
  'good': '#22c55e',
  'below_average': '#f97316',
  'poor': '#ef4444',
  'needs_improvement': '#f97316'
}

const LEVEL_LABELS: Record<string, string> = {
  'very_low': '需提升',
  'low': '较低',
  'average': '中等',
  'high': '较高',
  'very_high': '优秀',
  'excellent': '优秀',
  'good': '良好',
  'below_average': '待提高',
  'poor': '较差',
  'needs_improvement': '待提升'
}

const TREND_ARROWS: Record<string, string> = {
  'up': '↑',
  'down': '↓',
  'stable': '→'
}

export function formatMetric(metric: MetricResult): FormattedMetric {
  const levelColor = LEVEL_COLORS[metric.level] || LEVEL_COLORS['average']
  const levelLabel = LEVEL_LABELS[metric.level] || LEVEL_LABELS['average']
  const trendArrow = TREND_ARROWS[metric.trend || 'stable'] || '→'

  return {
    id: metric.metricId,
    name: metric.name,
    displayValue: `${metric.value.toFixed(1)}${metric.unit}`,
    levelLabel,
    levelColor,
    trendArrow,
    percentileLabel: metric.percentile !== undefined ? `超过${metric.percentile}%的用户` : undefined
  }
}

export function formatDimension(
  dimension: EnhancedAnalysisDimension,
  score: number,
  level: string,
  percentile: number
): FormattedDimension {
  const levelColor = LEVEL_COLORS[level] || LEVEL_COLORS['average']
  const levelLabel = LEVEL_LABELS[level] || LEVEL_LABELS['average']

  return {
    id: dimension.id,
    name: dimension.name,
    category: dimension.category,
    overallScore: score,
    level,
    levelLabel,
    levelColor,
    percentile: `超过${percentile}%的用户`,
    summary: generateDimensionSummary(dimension.name, score, levelLabel)
  }
}

function generateDimensionSummary(name: string, score: number, levelLabel: string): string {
  return `${name}综合得分为${score.toFixed(1)}分，处于${levelLabel}水平`
}

export function formatLayerResult(layerName: string, layerResult: LayerResult): string {
  const lines: string[] = []

  lines.push(`【${layerName}分析】`)
  lines.push(layerResult.interpretation)
  lines.push('')

  if (layerResult.recommendations.length > 0) {
    lines.push('建议：')
    layerResult.recommendations.forEach((rec, index) => {
      lines.push(`${index + 1}. ${rec.action} (${rec.priority})`)
    })
  }

  if (layerResult.insights.length > 0) {
    lines.push('')
    lines.push('洞察：')
    layerResult.insights.forEach(insight => {
      lines.push(`• ${insight}`)
    })
  }

  return lines.join('\n')
}

export function formatOverallReport(
  version: string,
  overallScore: number,
  overallLevel: string,
  dimensions: FormattedDimension[],
  confidence: number
): FormattedReport {
  return {
    title: `${version}测评报告`,
    version,
    overallScore,
    overallLevel: LEVEL_LABELS[overallLevel] || overallLevel,
    dimensionSummary: dimensions,
    generatedAt: new Date().toISOString(),
    confidenceLevel: confidence >= 0.8 ? '高' : confidence >= 0.6 ? '中' : '低'
  }
}

export function exportToPlainText(report: FormattedReport): string {
  const lines: string[] = []

  lines.push('='.repeat(50))
  lines.push(report.title)
  lines.push('='.repeat(50))
  lines.push('')
  lines.push(`整体得分：${report.overallScore.toFixed(1)}分 (${report.overallLevel})`)
  lines.push(`报告置信度：${report.confidenceLevel}`)
  lines.push(`生成时间：${new Date(report.generatedAt).toLocaleString()}`)
  lines.push('')
  lines.push('-'.repeat(50))
  lines.push('各维度分析')
  lines.push('-'.repeat(50))
  lines.push('')

  report.dimensionSummary.forEach(dim => {
    lines.push(`【${dim.name}】`)
    lines.push(`  得分：${dim.overallScore.toFixed(1)}分`)
    lines.push(`  水平：${dim.levelLabel}`)
    lines.push(`  排名：${dim.percentile}`)
    lines.push(`  概述：${dim.summary}`)
    lines.push('')
  })

  lines.push('='.repeat(50))

  return lines.join('\n')
}
