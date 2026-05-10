import type { Answer, AssessmentResult } from '../../types'
import { buildAnswerMap } from './calculator-utils'

export interface PSS10Result {
  overallScore: number
  stressLevel: 'low' | 'moderate' | 'high'
  dimensionScores: {
    perceivedStress: number
    uncontrollability: number
    copingAbility: number
    overwhelm: number
  }
  interpretation: {
    summary: string
    levelName: string
    warnings: string[]
    recommendations: string[]
  }
}

export function calculatePSS10(answers: Answer[]): PSS10Result & AssessmentResult {
  const answerMap = buildAnswerMap(answers, 10)

  const reverseItems = ['pss-4', 'pss-5', 'pss-7', 'pss-8']
  const perceivedStressItems = ['pss-1', 'pss-3', 'pss-9']
  const uncontrollabilityItems = ['pss-2', 'pss-5']
  const copingItems = ['pss-4', 'pss-7', 'pss-8']
  const overwhelmItems = ['pss-6', 'pss-10']

  let rawScore = 0
  let perceivedStressScore = 0
  let uncontrollabilityScore = 0
  let copingScore = 0
  let overwhelmScore = 0

  answers.forEach((answer) => {
    const questionId = answer.questionId
    let value = answer.value || 0

    if (reverseItems.includes(questionId)) {
      value = 4 - value
    }

    rawScore += value

    if (perceivedStressItems.includes(questionId)) {
      perceivedStressScore += value
    }
    if (uncontrollabilityItems.includes(questionId)) {
      uncontrollabilityScore += value
    }
    if (copingItems.includes(questionId)) {
      copingScore += value
    }
    if (overwhelmItems.includes(questionId)) {
      overwhelmScore += value
    }
  })

  const perceivedStressNorm = Math.round((perceivedStressScore / 12) * 100)
  const uncontrollabilityNorm = Math.round((uncontrollabilityScore / 8) * 100)
  const copingNorm = Math.round((copingScore / 12) * 100)
  const overwhelmNorm = Math.round((overwhelmScore / 8) * 100)

  let stressLevel: PSS10Result['stressLevel']
  let levelName: string
  let summary: string
  const warnings: string[] = []
  const recommendations: string[] = []

  if (rawScore < 14) {
    stressLevel = 'low'
    levelName = '低压力'
    summary = '您的压力知觉水平处于正常范围，能够较好地应对生活中的压力事件。'
    recommendations.push('继续保持良好的生活习惯，包括规律运动和充足睡眠')
    recommendations.push('适度参与社交活动，维持健康的心理状态')
  } else if (rawScore < 27) {
    stressLevel = 'moderate'
    levelName = '中等压力'
    summary = '您的压力知觉水平中等，在某些情境下可能会感到压力较大。'
    warnings.push('压力水平需要注意管理，避免长期积累')

    if (uncontrollabilityNorm > 50) {
      warnings.push('失控感较强，建议提升对生活事件的可控性认知')
      recommendations.push('尝试使用时间管理工具，合理规划每日任务')
      recommendations.push('建立日常routine，增强对生活的掌控感')
    }

    if (overwhelmNorm > 50) {
      warnings.push('有被压力压垮的感觉，需要及时调整')
      recommendations.push('将大任务分解为小步骤，逐步完成')
      recommendations.push('学会说"不"，避免承担过多责任')
    }

    recommendations.push('学习压力管理技巧，如深呼吸、正念冥想')
    recommendations.push('保持规律运动，每周至少3次，每次30分钟')
  } else {
    stressLevel = 'high'
    levelName = '高压力'
    summary = '您的压力知觉水平较高，可能正在经历持续的心理紧张状态。'

    if (perceivedStressNorm > 70) {
      warnings.push('主观紧张感非常强烈，请立即关注心理健康')
      warnings.push('⚠️ 长期高压状态可能影响身心健康')
    }

    if (uncontrollabilityNorm > 70) {
      warnings.push('失控感严重，需要重建对生活的掌控')
      recommendations.push('寻求专业心理咨询，评估压力源并获取支持')
    }

    if (overwhelmNorm > 70) {
      warnings.push('强烈的感觉到无法应对，建议采取行动')
      recommendations.push('识别并减少可控的压力源')
      recommendations.push('考虑暂时调整工作或生活节奏')
    }

    if (copingNorm < 30) {
      warnings.push('压力应对能力偏低，需要学习新的应对策略')
      recommendations.push('参加压力管理培训或寻求专业帮助')
    }

    recommendations.push('建议寻求专业心理支持')
    recommendations.push('尝试渐进式肌肉放松或冥想练习')
    recommendations.push('与信任的朋友或家人倾诉，获得情感支持')
    recommendations.push('保证充足睡眠，必要时寻求医生帮助')
  }

  return {
    overallScore: rawScore,
    stressLevel,
    dimensionScores: {
      perceivedStress: perceivedStressNorm,
      uncontrollability: uncontrollabilityNorm,
      copingAbility: copingNorm,
      overwhelm: overwhelmNorm,
    },
    dimensions: [
      { name: '压力感知', score: perceivedStressNorm, description: '对生活中紧张事件的感知程度' },
      { name: '失控感', score: uncontrollabilityNorm, description: '感觉无法掌控重要事情的程度' },
      { name: '应对能力', score: copingNorm, description: '相信自己能够有效处理事务的信心' },
      { name: '压迫感', score: overwhelmNorm, description: '感觉困难堆积过多难以克服的程度' },
    ],
    interpretation: {
      summary,
      levelName,
      warnings,
      recommendations,
    },
    type: 'pss10',
  }
}
