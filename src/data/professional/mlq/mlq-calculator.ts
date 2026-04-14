import type { Answer, AssessmentResult } from '../../../types'
import type { MLQDimension, MLQQuestion } from './mlq-common'
import { MLQ_DIMENSIONS, MLQ_DIMENSION_NAMES, LEADERSHIP_STYLES, mlqNormData, mlqReferences } from './mlq-common'

export function calculateNormalMode(answers: Answer[], questions: MLQQuestion[]): AssessmentResult {
  return calculateProfessionalMode(answers, questions)
}

export function calculateAdvancedMode(answers: Answer[], questions: MLQQuestion[]): AssessmentResult {
  return calculateProfessionalMode(answers, questions)
}

function calculateWeightedRawScores(answers: Answer[], questions: MLQQuestion[]) {
  const totals = {} as Record<MLQDimension, { sum: number; count: number; weighted: number }>
  MLQ_DIMENSIONS.forEach(dim => totals[dim] = { sum: 0, count: 0, weighted: 0 })

  answers.forEach(answer => {
    const q = questions.find(x => x.id === answer.questionId)
    if (q && answer.value !== undefined) {
      let v = answer.value
      if (q.meta.pole === 'low') v = 6 - v
      const weight = q.meta.factorLoading * q.meta.discrimination
      totals[q.meta.dimension as MLQDimension].weighted += v * weight
      totals[q.meta.dimension as MLQDimension].count++
    }
  })

  const dimensions = {} as Record<MLQDimension, number>
  let overall = 0, count = 0
  MLQ_DIMENSIONS.forEach(dim => {
    dimensions[dim] = totals[dim].count > 0 ? Math.round(20 + (totals[dim].weighted / totals[dim].count) * 11) : 50
    overall += dimensions[dim]; count++
  })

  return { overall: Math.round(overall / count), dimensions }
}

function determineLeadershipStyle(scores: Record<MLQDimension, number>) {
  if (scores.idealizedInfluence >= 70 && scores.inspirationalMotivation >= 70) return LEADERSHIP_STYLES[0]
  if (scores.individualConsideration >= 70 && scores.intellectualStimulation >= 70) return LEADERSHIP_STYLES[1]
  if (scores.contingentReward >= 70 && scores.managementByException >= 60) return LEADERSHIP_STYLES[2]
  if (scores.laissezFaire <= 30) return LEADERSHIP_STYLES[3]
  return LEADERSHIP_STYLES[4]
}

export function calculateProfessionalMode(answers: Answer[], questions: MLQQuestion[]): AssessmentResult {
  const raw = calculateWeightedRawScores(answers, questions)
  const style = determineLeadershipStyle(raw.dimensions)

  const dimResults = MLQ_DIMENSIONS.map(dim => ({
    name: MLQ_DIMENSION_NAMES[dim],
    score: raw.dimensions[dim],
  }))

  const developmentActions: string[] = []
  if (raw.dimensions.idealizedInfluence <= 45) developmentActions.push('提升情景意识：练习用"A4纸讲清公司3年目标"')
  if (raw.dimensions.inspirationalMotivation <= 45) developmentActions.push('练习故事化沟通：把战略转化为团队叙事')
  if (raw.dimensions.individualConsideration <= 45) developmentActions.push('建立个性化成长对话：每周1对1教练模式')
  if (raw.dimensions.intellectualStimulation <= 45) developmentActions.push('挑战性提问训练：为什么？还有吗？')
  if (raw.dimensions.contingentReward <= 45) developmentActions.push('建立明确的认可-贡献矩阵')

  return {
    type: 'MLQ',
    typeName: '多元领导风格专业测评',
    archetype: style.label,
    title: `领导力报告 - ${style.label}`,
    summary: `总体领导力成熟度 ${raw.overall}/100。${style.description}`,
    description: style.description,
    overallScore: raw.overall,
    dimensions: dimResults,
    strengths: [`最强领导力维度: ${MLQ_DIMENSION_NAMES[[...MLQ_DIMENSIONS].sort((a, b) => raw.dimensions[b] - raw.dimensions[a])[0]]}`],
    suggestions: [
      '领导力是可习得的技能，而非天赋',
      '每周记录3个有效领导时刻并复盘',
      '寻求360度反馈，尤其是来自下属的视角',
      '找到你的领导原型偶像并建立模仿清单',
    ],
    developmentActions,
    reliability: 0.86,
    normSample: mlqNormData.overall.n,
    references: mlqReferences,
  }
}
