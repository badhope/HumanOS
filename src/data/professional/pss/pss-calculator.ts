import type { PSSDimension, PSSQuestion } from './pss-common'
import { PSS_DIMENSIONS, PSS_DIMENSION_NAMES, PSS_STRESS_BANDS, pssNormData, pssReferences } from './pss-common'
import type { Answer, AssessmentResult } from '../../../types'

export function calculateNormalMode(answers: Answer[], questions: PSSQuestion[]): AssessmentResult {
  return calculateProfessionalMode(answers, questions)
}

export function calculateAdvancedMode(answers: Answer[], questions: PSSQuestion[]): AssessmentResult {
  return calculateProfessionalMode(answers, questions)
}

function calculateWeightedRawScores(answers: Answer[], questions: PSSQuestion[]) {
  const totals = {} as Record<PSSDimension, { sum: number; count: number; weighted: number }>
  PSS_DIMENSIONS.forEach(dim => totals[dim] = { sum: 0, count: 0, weighted: 0 })

  answers.forEach(answer => {
    const q = questions.find(x => x.id === answer.questionId)
    if (q && answer.value !== undefined) {
      let v = answer.value
      if (q.meta.pole === 'low') v = 5 - v
      const weight = q.meta.factorLoading * (q.meta.discrimination || 0.8)
      totals[q.meta.dimension as PSSDimension].weighted += v * weight
      totals[q.meta.dimension as PSSDimension].count++
    }
  })

  const dimensions = {} as Record<PSSDimension, number>
  let overall = 0, count = 0
  PSS_DIMENSIONS.forEach(dim => {
    dimensions[dim] = totals[dim].count > 0 ? Math.round(20 + (totals[dim].weighted / totals[dim].count) * 11) : 50
    overall += dimensions[dim]; count++
  })

  return { overall: Math.round(overall / count), dimensions }
}

function determineStressLevel(score: number) {
  if (score >= 75) return PSS_STRESS_BANDS[0]
  if (score >= 55) return PSS_STRESS_BANDS[1]
  if (score >= 35) return PSS_STRESS_BANDS[2]
  return PSS_STRESS_BANDS[3]
}

export function calculateProfessionalMode(answers: Answer[], questions: PSSQuestion[]): AssessmentResult {
  const raw = calculateWeightedRawScores(answers, questions)
  const stressLevel = determineStressLevel(raw.overall)

  const dimResults = PSS_DIMENSIONS.map(dim => ({
    name: PSS_DIMENSION_NAMES[dim],
    score: raw.dimensions[dim],
  }))

  const stressWarnings: string[] = []
  if (raw.dimensions.perceivedStress >= 70) stressWarnings.push('职业倦怠高风险')
  if (raw.dimensions.perceivedStress >= 60) stressWarnings.push('严重超负荷状态')
  if (raw.dimensions.copingAbility <= 40) stressWarnings.push('应对资源耗竭，建议立即调整')
  if (raw.dimensions.uncontrollability >= 65) stressWarnings.push('失控感显著，建议优先级重置')

  return {
    type: 'PSS',
    typeName: '压力知觉专业测评',
    archetype: stressLevel.label,
    title: `压力测评报告 - ${stressLevel.label}`,
    summary: `压力指数 ${raw.overall}/100，压力水平：${stressLevel.label}。${stressLevel.description}`,
    description: stressLevel.description,
    overallScore: raw.overall,
    dimensions: dimResults,
    strengths: raw.overall <= 40 ? ['压力韧性良好，适应力强'] : [`压力意识: ${raw.overall <= 50 ? '觉察良好' : '需要提升'}`],
    suggestions: [
      '建立每日压力日志，识别触发模式',
      '学习腹式呼吸：5-7-8 呼吸法',
      '设定数字断联时间，重建控制感',
      '每周至少 150 分钟中等强度运动',
    ],
    stressWarnings,
    reliability: 0.88,
    normSample: pssNormData.overall.n,
    references: pssReferences,
  }
}
