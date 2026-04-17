import type { Answer, AssessmentResult } from '../../types'
import { buildAnswerMap } from './calculator-utils'

export interface BurnoutResult {
  overallScore: number
  burnoutLevel: 'low' | 'moderate' | 'high' | 'severe'
  dimensionScores: {
    emotionalExhaustion: number
    depersonalization: number
    personalAccomplishment: number
  }
  interpretation: {
    summary: string
    warnings: string[]
    recommendations: string[]
  }
}

export function calculateBurnout(answers: Answer[]): BurnoutResult & AssessmentResult {
  const answerMap = buildAnswerMap(answers, 3)

  const calculateDimension = (prefix: string, count: number, reverse: boolean = false) => {
    let sum = 0
    for (let i = 1; i <= count; i++) {
      const key = `burnout_${String(i).padStart(2, '0')}`
      const value = answerMap[key] || 3
      if (key.includes(prefix)) {
        sum += reverse ? (7 - value) : value
      }
    }
    return sum
  }

  const eeKeys = ['01', '02', '05', '08', '10', '12', '15', '18', '21']
  const dpKeys = ['04', '06', '09', '14', '16', '19']
  const paKeys = ['03', '07', '11', '13', '17', '20', '22']

  let emotionalExhaustion = 0
  eeKeys.forEach(k => emotionalExhaustion += answerMap[`burnout_${k}`] || 3)

  let depersonalization = 0
  dpKeys.forEach(k => depersonalization += answerMap[`burnout_${k}`] || 3)

  let personalAccomplishment = 0
  paKeys.forEach(k => personalAccomplishment += (7 - (answerMap[`burnout_${k}`] || 3)))

  const eeNormalized = Math.min(100, Math.round((emotionalExhaustion / 54) * 100))
  const dpNormalized = Math.min(100, Math.round((depersonalization / 36) * 100))
  const paNormalized = Math.min(100, Math.round((personalAccomplishment / 42) * 100))

  const overallScore = Math.round((eeNormalized + dpNormalized + (100 - paNormalized)) / 3)

  let burnoutLevel: BurnoutResult['burnoutLevel']
  if (overallScore < 30) burnoutLevel = 'low'
  else if (overallScore < 50) burnoutLevel = 'moderate'
  else if (overallScore < 75) burnoutLevel = 'high'
  else burnoutLevel = 'severe'

  const levelNames = {
    low: '低倦怠',
    moderate: '中度倦怠',
    high: '高度倦怠',
    severe: '严重倦怠',
  }

  const warnings: string[] = []
  const recommendations: string[] = []

  if (eeNormalized > 60) {
    warnings.push('情绪衰竭程度较高，请注意心理能量恢复')
    recommendations.push('强制每日工作休息间隔，采用番茄工作法')
    recommendations.push('建立工作边界，下班后完全断开工作联系')
  }

  if (dpNormalized > 50) {
    warnings.push('出现明显的去人格化倾向，对他人开始产生冷漠态度')
    recommendations.push('每天记录3件工作中值得感恩的小事')
    recommendations.push('每周进行一次与人深度联结的社交活动')
  }

  if (paNormalized < 50) {
    warnings.push('个人成就感偏低，自我价值感下降')
    recommendations.push('建立微小成就记录系统，每日复盘')
    recommendations.push('重新审视工作目标，将其分解为可达成的小里程碑')
  }

  if (burnoutLevel === 'severe') {
    warnings.unshift('⚠️ 严重倦怠风险，建议立即采取干预措施')
    recommendations.unshift('建议寻求专业心理咨询支持')
    recommendations.unshift('考虑与领导沟通，调整工作负荷')
  }

  recommendations.push('每周保持至少150分钟中等强度有氧运动')
  recommendations.push('学习并实践正念冥想，每天10分钟')
  recommendations.push('保证每晚7-8小时高质量睡眠')

  return {
    overallScore,
    burnoutLevel,
    dimensionScores: {
      emotionalExhaustion: eeNormalized,
      depersonalization: dpNormalized,
      personalAccomplishment: paNormalized,
    },
    dimensions: [
      { name: '情绪衰竭', score: eeNormalized, description: '工作过度透支，情感资源耗尽' },
      { name: '去人格化', score: dpNormalized, description: '对工作对象冷漠、麻木的态度' },
      { name: '个人成就感', score: paNormalized, description: '对自己工作成就和能力的评价' },
    ],
    interpretation: {
      summary: `您的整体职业倦怠水平为「${levelNames[burnoutLevel]}」状态。${
        burnoutLevel === 'severe' ? '强烈建议立即采取干预措施！' :
        burnoutLevel === 'high' ? '需要高度关注并开始调整工作方式。' :
        burnoutLevel === 'moderate' ? '建议关注并进行适度调整。' :
        '您的工作状态整体健康，请继续保持。'
      }`,
      warnings,
      recommendations,
    },
    type: 'burnout',
  }
}
