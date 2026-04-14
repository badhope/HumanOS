import type { CTDimension, CTQuestion } from './ct-common'
import { CT_DIMENSIONS, CT_DIMENSION_NAMES, CT_PROFILES, ctNormData, ctReferences } from './ct-common'
import type { Answer, AssessmentResult } from '../../../types'

export function calculateNormalMode(answers: Answer[], questions: CTQuestion[]): AssessmentResult {
  return calculateProfessionalCT(answers, questions)
}

export function calculateAdvancedMode(answers: Answer[], questions: CTQuestion[]): AssessmentResult {
  return calculateProfessionalCT(answers, questions)
}

function calculateWeightedRawScores(answers: Answer[], questions: CTQuestion[]) {
  const totals = {} as Record<CTDimension, { sum: number; count: number; weighted: number }>
  CT_DIMENSIONS.forEach(dim => totals[dim] = { sum: 0, count: 0, weighted: 0 })

  answers.forEach(answer => {
    const q = questions.find(x => x.id === answer.questionId)
    if (q && answer.value !== undefined) {
      let v = answer.value
      if (q.meta.pole === 'low') v = 6 - v
      const weight = q.meta.factorLoading * q.meta.discrimination
      totals[q.meta.dimension].weighted += v * weight
      totals[q.meta.dimension].count++
    }
  })

  const dimensions = {} as Record<CTDimension, number>
  let overall = 0, count = 0
  CT_DIMENSIONS.forEach(dim => {
    dimensions[dim] = totals[dim].count > 0 ? Math.round(20 + (totals[dim].weighted / totals[dim].count) * 11) : 50
    overall += dimensions[dim]; count++
  })

  return { overall: Math.round(overall / count), dimensions }
}

function determineCTProfile(scores: Record<CTDimension, number>) {
  const sorted = [...CT_DIMENSIONS].sort((a, b) => scores[b] - scores[a])
  if (scores.inference >= 70 && scores.analysis >= 70) return CT_PROFILES[0]
  if (scores.evaluation >= 70 && scores.selfRegulation >= 70) return CT_PROFILES[1]
  if (scores.analysis >= 65 && scores.explanation >= 65) return CT_PROFILES[2]
  if (scores.interpretation >= 65) return CT_PROFILES[3]
  if (scores.selfRegulation >= 65) return CT_PROFILES[4]
  if (scores.evaluation >= 60) return CT_PROFILES[5]
  return CT_PROFILES[6]
}

export function calculateProfessionalMode(answers: Answer[], questions: CTQuestion[]): AssessmentResult {
  const raw = calculateWeightedRawScores(answers, questions)
  const profile = determineCTProfile(raw.dimensions)

  const dimResults = CT_DIMENSIONS.map(dim => ({
    name: CT_DIMENSION_NAMES[dim],
    score: raw.dimensions[dim],
  }))

  return {
    type: 'CT',
    typeName: '批判性思维专业测评',
    archetype: profile.label,
    title: `批判性思维报告 - ${profile.label}`,
    summary: `总体思维成熟度 ${raw.overall}/100。${profile.description}`,
    description: profile.description,
    overallScore: raw.overall,
    dimensions: dimResults,
    strengths: [`最强维度: ${CT_DIMENSION_NAMES[[...CT_DIMENSIONS].sort((a, b) => raw.dimensions[b] - raw.dimensions[a])[0]]}`],
    suggestions: [
      '刻意练习认知偏差识别，每周记录3个自己的思维谬误',
      '论证重构练习：将复杂论点拆分为前提+结论',
      '反向思考：为反对观点建立最佳论证',
      '发展元认知：思考自己的思考过程',
    ],
    cognitiveBiases: generateBiasAwareness(raw.dimensions),
    reliability: 0.84,
    normSample: ctNormData.overall.n,
    references: ctReferences,
  }
}

export function calculateProfessionalCT(answers: Answer[], questions: CTQuestion[]): AssessmentResult {
  return calculateProfessionalMode(answers, questions)
}

function generateBiasAwareness(dimensions: Record<CTDimension, number>): string[] {
  const biases: string[] = []
  if (dimensions.evaluation <= 45) biases.push('确认偏误风险：倾向于寻找支持自己观点的证据')
  if (dimensions.selfRegulation <= 45) biases.push('锚定效应风险：第一印象影响过大')
  if (dimensions.inference <= 45) biases.push('轻率概括：样本不足就下结论')
  return biases.length > 0 ? biases : ['思维校准良好，继续保持觉察']
}




