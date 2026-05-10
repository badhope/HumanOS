import type { Answer } from '../../types'

export interface PSQIResult {
  score: number
  title: string
  subtitle: string
  description: string
  dimensions: Array<{
    name: string
    score: number
    maxScore: number
    description: string
  }>
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  careers: string[]
  radarData?: Array<{ dimension: string; score: number; fullMark: number }>
  sleepQualityLevel: 'good' | 'fair' | 'poor' | 'veryPoor'
  sleepQualityText: string
}

const dimensionMapping: Record<string, string[]> = {
  sleepQuality: ['psqi_n01', 'psqi_n14', 'psqi_n18'],
  sleepLatency: ['psqi_n02', 'psqi_n03'],
  sleepDuration: ['psqi_n04'],
  sleepEfficiency: ['psqi_n05', 'psqi_n06'],
  sleepDisturbance: ['psqi_n07', 'psqi_n08'],
  hypnoticDrugs: ['psqi_n09'],
  daytimeDysfunction: ['psqi_n10', 'psqi_n11', 'psqi_n16'],
  sleepHabits: ['psqi_n12', 'psqi_n13', 'psqi_n17'],
  sleepEnvironment: ['psqi_n15'],
}

const dimensionNames: Record<string, string> = {
  sleepQuality: '主观睡眠质量',
  sleepLatency: '睡眠潜伏期',
  sleepDuration: '睡眠持续时间',
  sleepEfficiency: '睡眠效率',
  sleepDisturbance: '睡眠障碍',
  hypnoticDrugs: '催眠药物',
  daytimeDysfunction: '日间功能障碍',
  sleepHabits: '睡眠习惯',
  sleepEnvironment: '睡眠环境',
}

export function calculatePSQI(answers: Answer[]): PSQIResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 0))
  })

  const dimensions: PSQIResult['dimensions'] = []
  let totalScore = 0

  Object.entries(dimensionMapping).forEach(([dimKey, questionIds]) => {
    let sum = 0
    questionIds.forEach(qid => {
      const value = answerMap[qid]
      if (value !== undefined) {
        sum += value
      }
    })
    const avgScore = questionIds.length > 0 ? sum / questionIds.length : 0
    const normalizedScore = Math.min(100, Math.max(0, ((avgScore / 3) * 100)))
    
    dimensions.push({
      name: dimensionNames[dimKey] || dimKey,
      score: Math.round(normalizedScore),
      maxScore: 100,
      description: getDimensionDescription(dimKey, normalizedScore),
    })
    totalScore += avgScore
  })

  const finalScore = Math.round(totalScore)
  let sleepQualityLevel: PSQIResult['sleepQualityLevel']
  let sleepQualityText: string

  if (finalScore <= 5) {
    sleepQualityLevel = 'good'
    sleepQualityText = '睡眠质量良好'
  } else if (finalScore <= 10) {
    sleepQualityLevel = 'fair'
    sleepQualityText = '睡眠质量一般'
  } else if (finalScore <= 15) {
    sleepQualityLevel = 'poor'
    sleepQualityText = '睡眠质量较差'
  } else {
    sleepQualityLevel = 'veryPoor'
    sleepQualityText = '睡眠质量很差'
  }

  const strengths: string[] = []
  const weaknesses: string[] = []
  const suggestions: string[] = []

  dimensions.forEach(dim => {
    if (dim.score >= 70) {
      strengths.push(`${dim.name}表现良好`)
    } else if (dim.score <= 40) {
      weaknesses.push(`${dim.name}需要改善`)
    }
  })

  if (finalScore > 10) {
    suggestions.push('建议保持规律作息时间')
    suggestions.push('睡前避免使用电子设备')
    suggestions.push('营造舒适的睡眠环境')
  }
  if (finalScore > 15) {
    suggestions.push('考虑咨询睡眠专家')
    suggestions.push('记录睡眠日记以便更好地了解睡眠模式')
  }
  if (finalScore <= 5) {
    suggestions.push('继续保持良好的睡眠习惯')
    suggestions.push('适度运动有助于提高睡眠质量')
  }

  return {
    score: finalScore,
    title: '睡眠质量测评报告',
    subtitle: `综合得分: ${finalScore}分`,
    description: `您的睡眠质量${sleepQualityText}，${sleepQualityLevel === 'good' ? '继续保持良好的睡眠习惯' : sleepQualityLevel === 'fair' ? '有一些方面可以改善' : '建议采取措施改善睡眠'}`,
    dimensions,
    strengths,
    weaknesses,
    suggestions,
    careers: [],
    radarData: dimensions.map(d => ({ dimension: d.name, score: d.score, fullMark: 100 })),
    sleepQualityLevel,
    sleepQualityText,
  }
}

function getDimensionDescription(dimKey: string, score: number): string {
  const descriptions: Record<string, Record<string, string>> = {
    sleepQuality: {
      good: '您的睡眠质量很好',
      fair: '睡眠质量有待改善',
      poor: '睡眠质量较差',
      veryPoor: '睡眠质量很差',
    },
    sleepLatency: {
      good: '入睡速度正常',
      fair: '偶尔入睡困难',
      poor: '经常入睡困难',
      veryPoor: '长期入睡困难',
    },
    sleepDuration: {
      good: '睡眠时长充足',
      fair: '睡眠时长略少',
      poor: '睡眠时长不足',
      veryPoor: '严重睡眠不足',
    },
  }

  const level = score >= 70 ? 'good' : score >= 50 ? 'fair' : score >= 30 ? 'poor' : 'veryPoor'
  return descriptions[dimKey]?.[level] || ''
}
