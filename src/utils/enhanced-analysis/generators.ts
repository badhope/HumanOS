import type {
  ChartDefinition,
  ChartResult,
  InterpretationTemplate,
  RecommendationTemplate,
  MetricResult,
  EnhancedAnalysisDimension,
  RecommendationResult,
} from './types'

export function generateCharts(charts: ChartDefinition[], data: any): ChartResult[] {
  return charts.map(chart => ({
    chartId: chart.type,
    type: chart.type,
    title: chart.title,
    data: data[chart.dataSource] || {},
    config: chart.config
  }))
}

export function generateInterpretation(template: InterpretationTemplate, metrics: MetricResult[]): string {
  let result = template.template
  metrics.forEach(metric => {
    result = result.replace(`{${metric.metricId}}`, metric.value.toFixed(1))
  })
  return result
}

export function generateRecommendations(templates: RecommendationTemplate[], _metrics: MetricResult[]): RecommendationResult[] {
  return templates.map(template => ({
    priority: template.priority,
    action: template.action,
    rationale: template.rationale,
    resources: template.resources,
    expectedImpact: '预期改善效果'
  }))
}

export function generateInsights(metrics: MetricResult[], dimension: EnhancedAnalysisDimension): string[] {
  const insights: string[] = []
  const avgScore = metrics.length > 0
    ? metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length
    : 50

  if (avgScore >= 80) {
    insights.push(`您在${dimension.name}方面表现优秀，继续保持并发挥优势`)
  } else if (avgScore >= 60) {
    insights.push(`您在${dimension.name}方面表现良好，有进一步提升空间`)
  } else {
    insights.push(`您在${dimension.name}方面有较大提升空间，建议制定改进计划`)
  }

  return insights
}

export function generateDimensionInterpretation(
  dimension: EnhancedAnalysisDimension,
  score: number,
  level: string
): string {
  const range = dimension.layers.basic.interpretation.ranges.find(r => r.level === level)
  return range ? `${dimension.name}：${range.description}` : `${dimension.name}：表现中等`
}

export function generateAssessmentRecommendations(
  dimensionResults: { dimensionName: string; normalizedScore: number }[],
  overallScore: number
): RecommendationResult[] {
  const recommendations: RecommendationResult[] = []

  dimensionResults.forEach(dr => {
    if (dr.normalizedScore < 50) {
      recommendations.push({
        priority: 'high',
        action: `加强${dr.dimensionName}方面的能力提升`,
        rationale: `您在${dr.dimensionName}方面的得分较低，需要重点关注和改进`,
        resources: ['相关培训课程', '实践练习', '专业指导'],
        expectedImpact: '预期可提升20-30%'
      })
    } else if (dr.normalizedScore >= 75) {
      recommendations.push({
        priority: 'low',
        action: `继续发挥${dr.dimensionName}方面的优势`,
        rationale: `您在${dr.dimensionName}方面表现优秀，建议继续保持并寻求更高突破`,
        resources: ['进阶课程', '挑战性任务', '导师指导'],
        expectedImpact: '预期可达到顶尖水平'
      })
    }
  })

  if (overallScore < 60) {
    recommendations.push({
      priority: 'high',
      action: '制定系统性提升计划',
      rationale: '整体表现有待提高，建议制定全面的改进计划',
      resources: ['专业咨询', '系统培训', '定期评估'],
      expectedImpact: '预期可提升整体表现30%以上'
    })
  }

  return recommendations
}
