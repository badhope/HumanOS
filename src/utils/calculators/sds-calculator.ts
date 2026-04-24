import type { Answer } from '../../types'

export interface SDSResult extends Record<string, any> {
  rawScore: number
  standardScore: number
  percentile: number
  level: 'normal' | 'mild' | 'moderate' | 'severe'
  levelText: string
  dimensions: {
    affective: { score: number; percentage: number; level: string }
    somatic: { score: number; percentage: number; level: string }
    cognitive: { score: number; percentage: number; level: string }
    psychomotor: { score: number; percentage: number; level: string }
  }
  radarData: { dimension: string; score: number; fullMark: number }[]
  interpretation: string
  recommendations: string[]
  warning: string
}

export function calculateSDS(answers: Answer[]): SDSResult {
  const dimensionMap: Record<string, string[]> = {
    affective: ['sds_n01', 'sds_n02', 'sds_n03', 'sds_n15'],
    somatic: ['sds_n04', 'sds_n05', 'sds_n07', 'sds_n08', 'sds_n09', 'sds_n10'],
    cognitive: ['sds_n11', 'sds_n14', 'sds_n16', 'sds_n17', 'sds_n18', 'sds_n19'],
    psychomotor: ['sds_n06', 'sds_n12', 'sds_n13', 'sds_n20'],
  }

  const reverseScoredItems = ['sds_n02', 'sds_n05', 'sds_n06', 'sds_n11', 'sds_n12', 'sds_n14', 'sds_n16', 'sds_n17', 'sds_n18', 'sds_n20']
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 1))
    if (reverseScoredItems.includes(a.questionId)) {
      value = 5 - value
    }
    answerMap[a.questionId] = value
  })

  const dimensions: SDSResult['dimensions'] = {} as SDSResult['dimensions']
  let totalRaw = 0

  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 2), 0)
    const maxScore = (ids.length || 1) * 4
    const percentage = Math.round((score / maxScore) * 100)
    let level = '正常'
    if (percentage >= 75) level = '重度'
    else if (percentage >= 60) level = '中度'
    else if (percentage >= 50) level = '轻度'
    dimensions[dim as keyof SDSResult['dimensions']] = { score, percentage, level }
    totalRaw += score
  })

  const standardScore = Math.round(totalRaw * 1.25)
  let percentile = 50
  if (standardScore < 53) percentile = 25
  else if (standardScore < 63) percentile = 50
  else if (standardScore < 73) percentile = 75
  else percentile = 95

  let level: SDSResult['level'] = 'normal'
  let levelText = '正常范围'
  if (standardScore >= 73) { level = 'severe'; levelText = '重度抑郁' }
  else if (standardScore >= 63) { level = 'moderate'; levelText = '中度抑郁' }
  else if (standardScore >= 53) { level = 'mild'; levelText = '轻度抑郁' }

  const radarData = [
    { dimension: '情感障碍', score: dimensions.affective.percentage, fullMark: 100 },
    { dimension: '躯体症状', score: dimensions.somatic.percentage, fullMark: 100 },
    { dimension: '认知偏差', score: dimensions.cognitive.percentage, fullMark: 100 },
    { dimension: '精神运动', score: dimensions.psychomotor.percentage, fullMark: 100 },
  ]

  const interpretations = {
    normal: '你的情绪状态整体健康，没有明显抑郁症状。继续保持积极的生活态度和健康的生活方式。',
    mild: '你可能处于轻度抑郁状态。建议多与朋友家人交流，适当增加户外活动，注意情绪调节。',
    moderate: '你有中度抑郁倾向。建议寻求专业心理咨询，学习情绪管理技巧，建立健康的作息规律。',
    severe: '你有较明显的抑郁症状。强烈建议立即寻求专业心理医生或精神科医师的帮助，请不要独自面对。',
  }

  const recommendations = [
    '每天保持 30 分钟以上的户外活动，晒太阳有助于血清素分泌',
    '建立规律的作息时间，保证 7-8 小时睡眠',
    '适度运动，有氧运动是天然的抗抑郁剂',
    '减少社交媒体使用时间，避免信息过载',
    '每周至少与朋友深度交流一次',
  ]

  const warnings = level === 'severe' 
    ? '⚠️ 本测评仅作初步筛查，不能替代专业诊断。如果有自杀念头，请立即拨打心理援助热线。'
    : level === 'moderate'
    ? '⚠️ 如果症状持续超过两周，建议寻求专业心理咨询帮助。'
    : ''

  return {
    rawScore: totalRaw,
    standardScore,
    percentile,
    level,
    levelText,
    dimensions,
    radarData,
    interpretation: interpretations[level],
    recommendations,
    warning: warnings,
  }
}
