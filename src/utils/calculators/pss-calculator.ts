import type { Answer } from '../../types'

export interface PSSResult extends Record<string, any> {
  totalScore: number
  percentile: number
  level: 'low' | 'moderate' | 'high' | 'severe'
  levelText: string
  dimensions: {
    perceivedStress: { score: number; percentage: number; level: string }
    uncontrollability: { score: number; percentage: number; level: string }
    copingAbility: { score: number; percentage: number; level: string }
    overload: { score: number; percentage: number; level: string }
  }
  radarData: { dimension: string; score: number; fullMark: number }[]
  interpretation: string
  recommendations: string[]
  warning: string
}

export function calculatePSS(answers: Answer[]): PSSResult {
  const dimensionMap: Record<string, string[]> = {
    perceivedStress: ['pss_n01', 'pss_n03', 'pss_n12', 'pss_n13', 'pss_n16'],
    uncontrollability: ['pss_n02', 'pss_n05', 'pss_n08', 'pss_n11'],
    copingAbility: ['pss_n04', 'pss_n07', 'pss_n09', 'pss_n10', 'pss_n14', 'pss_n18', 'pss_n20'],
    overload: ['pss_n06', 'pss_n15', 'pss_n17', 'pss_n19'],
  }

  const reverseScoredItems = ['pss_n07', 'pss_n08', 'pss_n09', 'pss_n10', 'pss_n11', 'pss_n14', 'pss_n18', 'pss_n20']
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 0))
    if (reverseScoredItems.includes(a.questionId)) {
      value = 4 - value
    }
    answerMap[a.questionId] = value
  })

  const dimensions: PSSResult['dimensions'] = {} as PSSResult['dimensions']
  let totalScore = 0

  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 2), 0)
    const maxScore = (ids.length || 1) * 4
    const percentage = Math.round((score / maxScore) * 100)
    let level = '正常'
    if (percentage >= 75) level = '高'
    else if (percentage >= 60) level = '中高'
    else if (percentage >= 40) level = '中等'
    dimensions[dim as keyof PSSResult['dimensions']] = { score, percentage, level }
    totalScore += score
  })

  let percentile = 50
  if (totalScore < 13) percentile = 25
  else if (totalScore < 27) percentile = 50
  else if (totalScore < 40) percentile = 75
  else percentile = 95

  let level: PSSResult['level'] = 'moderate'
  let levelText = '正常压力水平'
  if (totalScore >= 40) { level = 'severe'; levelText = '压力过载' }
  else if (totalScore >= 27) { level = 'high'; levelText = '压力较高' }
  else if (totalScore < 13) { level = 'low'; levelText = '压力很低' }

  const radarData = [
    { dimension: '感知压力', score: dimensions.perceivedStress.percentage, fullMark: 100 },
    { dimension: '失控感', score: dimensions.uncontrollability.percentage, fullMark: 100 },
    { dimension: '应对能力', score: 100 - dimensions.copingAbility.percentage, fullMark: 100 },
    { dimension: '任务过载', score: dimensions.overload.percentage, fullMark: 100 },
  ]

  const interpretations = {
    low: '你的压力水平很低，生活状态轻松自在。继续保持这份平和与从容。',
    moderate: '你的压力水平适中，处于健康范围内。适度的压力有助于发挥最佳状态。',
    high: '你的压力水平偏高。注意及时调整节奏，避免长期高负荷运转。',
    severe: '你正处于严重压力过载状态！请立即放慢脚步，给自己喘息的空间，必要时寻求支持。',
  }

  const recommendations = [
    '学习 4-7-8 呼吸法：吸气4秒，屏息7秒，呼气8秒',
    '每天安排 10 分钟什么都不做的空白时间',
    '学习说"不"，减少不必要的承诺和任务',
    '睡前一小时停止使用电子设备',
    '每周安排一次完全不碰工作的"无产出日"',
  ]

  const warnings = level === 'severe'
    ? '⚠️ 持续高压会严重损害身心健康，请立即减负，身体健康比什么都重要。'
    : level === 'high'
    ? '⚠️ 注意觉察压力信号，头痛、失眠、易怒都是身体在发出警告。'
    : ''

  return {
    totalScore,
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
