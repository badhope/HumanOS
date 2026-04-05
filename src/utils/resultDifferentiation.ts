import type { ProfessionalAssessmentResult } from '../types'

export interface DifferentiationConfig {
  scoreRanges: {
    min: number
    max: number
    label: string
    color: string
    intensity: 'very-low' | 'low' | 'medium' | 'high' | 'very-high'
  }[]
  variationThreshold: number
  detailLevel: 'basic' | 'standard' | 'detailed' | 'comprehensive'
}

const defaultDifferentiationConfig: DifferentiationConfig = {
  scoreRanges: [
    { min: 0, max: 20, label: '极低', color: '#ef4444', intensity: 'very-low' },
    { min: 20, max: 40, label: '较低', color: '#f97316', intensity: 'low' },
    { min: 40, max: 60, label: '中等', color: '#eab308', intensity: 'medium' },
    { min: 60, max: 80, label: '较高', color: '#22c55e', intensity: 'high' },
    { min: 80, max: 100, label: '极高', color: '#3b82f6', intensity: 'very-high' },
  ],
  variationThreshold: 5,
  detailLevel: 'comprehensive',
}

export function enhanceResultDifferentiation(
  result: ProfessionalAssessmentResult,
  config: Partial<DifferentiationConfig> = {}
): ProfessionalAssessmentResult {
  const finalConfig = { ...defaultDifferentiationConfig, ...config }
  const { scoreRanges, detailLevel } = finalConfig

  const scoreRange = scoreRanges.find(
    (range) => result.score >= range.min && result.score < range.max
  ) || scoreRanges[2]

  const enhancedDimensions = result.dimensions.map((dim) => ({
    ...dim,
    description: generateDimensionDescription(dim.score, dim.maxScore, dim.name),
    maxScore: dim.maxScore || 100,
  }))

  const dimensionData = enhancedDimensions.map(d => ({ name: d.name, score: d.score, maxScore: d.maxScore }))

  const enhancedStrengths = generatePersonalizedStrengths(
    result.score,
    result.strengths,
    scoreRange.intensity,
    detailLevel
  )

  const enhancedWeaknesses = generatePersonalizedWeaknesses(
    result.score,
    result.weaknesses,
    scoreRange.intensity,
    detailLevel
  )

  const enhancedSuggestions = generateDetailedSuggestions(
    result.score,
    result.suggestions || [],
    scoreRange,
    detailLevel,
    dimensionData
  )

  const enhancedDescription = generateDynamicDescription(
    result.title,
    result.score,
    scoreRange,
    detailLevel,
    dimensionData
  )

  return {
    ...result,
    dimensions: enhancedDimensions,
    strengths: enhancedStrengths,
    weaknesses: enhancedWeaknesses,
    suggestions: enhancedSuggestions,
    description: enhancedDescription,
  }
}

function generateDimensionDescription(
  score: number,
  maxScore: string | number | undefined,
  dimensionName: string
): string {
  const max = Number(maxScore) || 100
  const percentage = (score / max) * 100

  if (percentage >= 90) return `卓越水平 - 超越90%的人群`
  if (percentage >= 75) return `优秀水平 - 超越75%的人群`
  if (percentage >= 60) return `良好水平 - 高于平均水平`
  if (percentage >= 45) return `中等水平 - 接近平均线`
  if (percentage >= 30) return `待提升 - 低于平均水平`
  return `需要关注 - 建议重点改善`
}

function generatePersonalizedStrengths(
  score: number,
  baseStrengths: string[],
  intensity: string,
  detailLevel: string
): string[] {
  const dynamicStrengths = [...baseStrengths]

  const intensityMap: Record<string, string[]> = {
    'very-high': [
      '展现出卓越的能力和潜力',
      '在相关领域具有显著优势',
      '具备持续发展的坚实基础',
    ],
    'high': [
      '表现优于大多数人',
      '具备良好的发展潜力',
      '在某些方面表现突出',
    ],
    'medium': [
      '处于正常发展轨道',
      '有明确的提升空间',
      '基础能力扎实',
    ],
    'low': [
      '存在可挖掘的潜力',
      '通过努力可以显著提升',
      '建议制定针对性提升计划',
    ],
    'very-low': [
      '需要更多关注和支持',
      '建议从基础开始逐步建立',
      '可以通过训练获得改善',
    ],
  }

  const additionalStrengths = intensityMap[intensity] || []
  if (detailLevel === 'detailed' || detailLevel === 'comprehensive') {
    dynamicStrengths.push(...additionalStrengths.slice(0, 2))
  }

  return dynamicStrengths.length > 0 ? dynamicStrengths : ['具备基本能力']
}

function generatePersonalizedWeaknesses(
  score: number,
  baseWeaknesses: string[],
  intensity: string,
  detailLevel: string
): string[] {
  const dynamicWeaknesses = [...baseWeaknesses]

  if (intensity === 'very-low' || intensity === 'low') {
    dynamicWeaknesses.push('需要系统性改进')
    if (detailLevel === 'comprehensive') {
      dynamicWeaknesses.push('建议寻求专业指导')
    }
  } else if (intensity === 'medium') {
    dynamicWeaknesses.push('仍有优化空间')
  }

  return dynamicWeaknesses
}

function generateDetailedSuggestions(
  score: number,
  baseSuggestions: string[],
  scoreRange: { label: string; intensity: string; color: string },
  detailLevel: string,
  dimensions: { name: string; score: number; maxScore: string | number }[]
): string[] {
  const suggestions: string[] = [...baseSuggestions]

  if (detailLevel === 'standard' || detailLevel === 'detailed' || detailLevel === 'comprehensive') {
    suggestions.push(`\n📊 综合评分：${score}/100 (${scoreRange.label}水平)`)

    if (dimensions.length > 0) {
      suggestions.push('\n🎯 各维度详细分析：')
      dimensions.forEach((dim) => {
        const percentage = Math.round((dim.score / Number(dim.maxScore)) * 100)
        suggestions.push(`• ${dim.name}：${percentage}%`)
      })
    }
  }

  if (detailLevel === 'detailed' || detailLevel === 'comprehensive') {
    const actionItems = generateActionableItems(score, scoreRange.intensity)
    suggestions.push('\n💡 行动建议：')
    actionItems.forEach((item) => {
      suggestions.push(`• ${item}`)
    })
  }

  if (detailLevel === 'comprehensive') {
    suggestions.push('\n📈 长期发展规划：')
    suggestions.push(...generateLongTermPlan(score, scoreRange.intensity))
  }

  return suggestions
}

function generateActionableItems(score: number, intensity: string): string[] {
  const items: Record<string, string[]> = {
    'very-high': [
      '保持当前优势并继续精进',
      '考虑在专业领域深入发展',
      '分享经验帮助他人成长',
      '设定更具挑战性的目标',
    ],
    'high': [
      '巩固现有优势领域',
      '识别并弥补薄弱环节',
      '定期进行自我评估和反思',
      '拓展相关知识技能',
    ],
    'medium': [
      '制定系统的提升计划',
      '平衡发展各个维度',
      '寻找学习和实践机会',
      '建立规律的练习习惯',
    ],
    'low': [
      '从基础知识开始学习',
      '寻求导师或专业人士指导',
      '分解目标为小步骤逐步完成',
      '保持耐心和持续性',
    ],
    'very-low': [
      '不要气馁，每个人都是从零开始',
      '找到适合自己节奏的学习方式',
      '专注于小而具体的进步',
      '建立支持系统（朋友、社群等）',
    ],
  }

  return items[intensity] || items['medium']
}

function generateLongTermPlan(score: number, intensity: string): string[] {
  const plans: Record<string, string[]> = {
    'very-high': [
      '短期（1-3个月）：深化专业技能，参与高级培训',
      '中期（3-6个月）：承担挑战性项目，扩展影响力',
      '长期（6-12个月）：成为领域专家，指导他人',
    ],
    'high': [
      '短期：强化优势，补齐短板',
      '中期：实践应用，积累经验',
      '长期：全面发展，追求卓越',
    ],
    'medium': [
      '短期：明确目标，制定计划',
      '中期：系统学习，稳步提升',
      '长期：突破瓶颈，实现跃升',
    ],
    'low': [
      '短期：建立基础，培养习惯',
      '中期：持续练习，积累信心',
      '长期：显著进步，达到平均水平',
    ],
    'very-low': [
      '短期：接受现状，开始行动',
      '中期：看到进步，增强动力',
      '长期：脱胎换骨，焕然一新',
    ],
  }

  return plans[intensity] || plans['medium']
}

function generateDynamicDescription(
  title: string,
  score: number,
  scoreRange: { label: string; intensity: string; color: string },
  detailLevel: string,
  dimensions: { name: string; score: number; maxScore: string | number }[]
): string {
  const baseDescription = `根据${title.split(':')[0] || '测评'}的结果分析`

  let detailedAnalysis = ''

  switch (scoreRange.intensity) {
    case 'very-high':
      detailedAnalysis =
        '你在该领域表现出色，展现出卓越的潜能。你的能力和素质远超一般水平，这为你未来的发展奠定了坚实的基础。继续保持这种积极的发展态势，同时注意平衡各个方面的发展。'
      break
    case 'high':
      detailedAnalysis =
        '你在该领域表现良好，高于大多数人的水平。你具备了扎实的基础和一些突出的优点。通过针对性的提升和持续的练习，你有潜力达到更高的水平。'
      break
    case 'medium':
      detailedAnalysis =
        '你在该领域的表现在正常范围内，既有优势也有可以提升的空间。这是一个很好的起点，通过系统的学习和练习，你可以逐步提升到更高水平。'
      break
    case 'low':
      detailedAnalysis =
        '你在该领域还有较大的提升空间。这可能意味着你需要更多的练习、学习或经验积累。不要担心，每个人都有自己的发展节奏，重要的是持续努力。'
      break
    case 'very-low':
      detailedAnalysis =
        '你在该领域目前处于起步阶段。这完全正常，因为每个人的背景和经历都不同。关键是要认识到这一点，并采取积极的行动来改善。即使是小小的进步也值得庆祝。'
      break
  }

  if (detailLevel === 'detailed' || detailLevel === 'comprehensive') {
    const topDimensions = dimensions
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map((d) => `${d.name}(${Math.round((d.score / Number(d.maxScore)) * 100)}%)`)
      .join('、')

    const weakDimensions = dimensions
      .sort((a, b) => a.score - b.score)
      .slice(0, 2)
      .map((d) => `${d.name}(${Math.round((d.score / Number(d.maxScore)) * 100)}%)`)
      .join('、')

    detailedAnalysis += `\n\n主要优势维度：${topDimensions}\n待提升维度：${weakDimensions}`
  }

  return `${baseDescription}，\n\n${detailedAnalysis}`
}

export function calculateResultDifference(
  result1: ProfessionalAssessmentResult,
  result2: ProfessionalAssessmentResult
): {
  overallDifference: number
  dimensionDifferences: { name: string; diff: number; significant: boolean }[]
  isSignificantlyDifferent: boolean
  similarityPercentage: number
} {
  const overallDiff = Math.abs(result1.score - result2.score)

  const dimensionDifferences = result1.dimensions.map((dim1, index) => {
    const dim2 = result2.dimensions[index]
    const diff = Math.abs(dim1.score - dim2.score)
    return {
      name: dim1.name,
      diff,
      significant: diff > 10,
    }
  })

  const avgDimensionDiff =
    dimensionDifferences.reduce((sum, d) => sum + d.diff, 0) /
    (dimensionDifferences.length || 1)

  const similarityPercentage = Math.max(0, 100 - overallDiff)

  return {
    overallDifference: overallDiff,
    dimensionDifferences,
    isSignificantlyDifferent: overallDiff > 15 || avgDimensionDiff > 10,
    similarityPercentage,
  }
}

export function validateResultDifferentiation(results: ProfessionalAssessmentResult[]): {
  valid: boolean
  issues: string[]
  recommendations: string[]
} {
  const issues: string[] = []
  const recommendations: string[] = []

  if (results.length < 2) {
    return {
      valid: true,
      issues: [],
      recommendations: ['需要至少2个结果才能验证差异化'],
    }
  }

  for (let i = 0; i < results.length; i++) {
    for (let j = i + 1; j < results.length; j++) {
      const diff = calculateResultDifference(results[i], results[j])

      if (!diff.isSignificantlyDifferent && diff.similarityPercentage > 85) {
        issues.push(
          `结果 ${i + 1} 和 ${j + 1} 过于相似（相似度 ${diff.similarityPercentage.toFixed(1)}%）`
        )
        recommendations.push('考虑增加评分算法的敏感度或引入更多差异化因素')
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues,
    recommendations,
  }
}
