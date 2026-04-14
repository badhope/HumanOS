import type { SASDimension, SASQuestion } from './sas-common'
import { SAS_DIMENSIONS, SAS_DIMENSION_NAMES, SAS_SEVERITY_BANDS, sasNormData, sasReferences } from './sas-common'
import type { Answer, AssessmentResult } from '../../../types'

export function calculateNormalMode(answers: Answer[], questions: SASQuestion[]): AssessmentResult {
  return calculateProfessionalMode(answers, questions)
}

export function calculateAdvancedMode(answers: Answer[], questions: SASQuestion[]): AssessmentResult {
  return calculateProfessionalMode(answers, questions)
}

function calculateWeightedRawScores(answers: Answer[], questions: SASQuestion[]) {
  const totals = {} as Record<SASDimension, { sum: number; count: number; weighted: number }>
  SAS_DIMENSIONS.forEach(dim => totals[dim] = { sum: 0, count: 0, weighted: 0 })

  answers.forEach(answer => {
    const q = questions.find(x => x.id === answer.questionId)
    if (q && answer.value !== undefined) {
      let v = answer.value
      if (q.meta.pole === 'low') v = 5 - v
      const weight = q.meta.factorLoading * (q.meta.discrimination || 0.8)
      totals[q.meta.dimension as SASDimension].weighted += v * weight
      totals[q.meta.dimension as SASDimension].count++
    }
  })

  const dimensions = {} as Record<SASDimension, number>
  let overall = 0, count = 0
  SAS_DIMENSIONS.forEach(dim => {
    dimensions[dim] = totals[dim].count > 0 ? Math.round(20 + (totals[dim].weighted / totals[dim].count) * 11) : 50
    overall += dimensions[dim]; count++
  })

  return { overall: Math.round(overall / count), dimensions }
}

function determineAnxietyLevel(score: number) {
  if (score >= 70) return SAS_SEVERITY_BANDS[9]
  if (score >= 55) return SAS_SEVERITY_BANDS[6]
  if (score >= 40) return SAS_SEVERITY_BANDS[3]
  return SAS_SEVERITY_BANDS[1]
}

export function calculateProfessionalMode(answers: Answer[], questions: SASQuestion[]): AssessmentResult {
  const raw = calculateWeightedRawScores(answers, questions)
  const anxietyLevel = determineAnxietyLevel(raw.overall)

  const dimResults = SAS_DIMENSIONS.map(dim => ({
    name: SAS_DIMENSION_NAMES[dim],
    score: raw.dimensions[dim],
  }))

  const actionFlags: string[] = []
  if (raw.overall >= 50) actionFlags.push('达到临床筛查阳性阈值')
  if (raw.dimensions.somaticAnxiety >= 60) actionFlags.push('躯体化风险升高')
  if (raw.dimensions.sleepDisturbance >= 55) actionFlags.push('睡眠持续困难')

  return {
    type: 'SAS',
    typeName: '焦虑自评专业测评',
    archetype: anxietyLevel.label,
    title: `焦虑状态报告 - ${anxietyLevel.label}`,
    summary: `焦虑指数 ${raw.overall}/100，状态：${anxietyLevel.label}。${anxietyLevel.description}`,
    description: anxietyLevel.description,
    overallScore: raw.overall,
    dimensions: dimResults,
    strengths: raw.overall <= 35 ? ['状态平稳，情绪调节能力良好'] : [`觉察能力: ${raw.overall <= 50 ? '情绪觉察良好' : '需要关注'}`],
    suggestions: [
      '每天 2 次 5-4-3-2-1 感官接地练习',
      '减少咖啡因摄入，尤其下午 2 点后',
      '建立固定的睡前仪式，改善睡眠质量',
      '记录焦虑触发日记，识别认知扭曲',
      '每周 3 次，每次 30 分钟有氧运动',
    ],
    actionFlags,
    reliability: 0.91,
    standardError: 3.5,
    normSample: sasNormData.total.n,
    references: sasReferences,
  }
}
