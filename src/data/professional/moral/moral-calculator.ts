import type { MoralFoundation, MoralQuestion } from './moral-common'
import { MORAL_FOUNDATIONS, MORAL_FOUNDATION_NAMES, MORAL_PROFILES, moralNormData, moralReferences } from './moral-common'
import type { Answer, AssessmentResult } from '../../../types'

export function calculateNormalMode(answers: Answer[], questions: MoralQuestion[]): AssessmentResult {
  return calculateProfessionalMode(answers, questions)
}

export function calculateAdvancedMode(answers: Answer[], questions: MoralQuestion[]): AssessmentResult {
  return calculateProfessionalMode(answers, questions)
}

function calculateWeightedRawScores(answers: Answer[], questions: MoralQuestion[]) {
  const totals = {} as Record<MoralFoundation, { sum: number; count: number; weighted: number }>
  MORAL_FOUNDATIONS.forEach(dim => totals[dim] = { sum: 0, count: 0, weighted: 0 })

  answers.forEach(answer => {
    const q = questions.find(x => x.id === answer.questionId)
    if (q && answer.value !== undefined) {
      let v = answer.value
      if (q.meta.pole === 'low') v = 6 - v
      const weight = q.meta.factorLoading * q.meta.discrimination
      totals[q.meta.foundation as MoralFoundation].weighted += v * weight
      totals[q.meta.foundation as MoralFoundation].count++
    }
  })

  const dimensions = {} as Record<MoralFoundation, number>
  MORAL_FOUNDATIONS.forEach(dim => {
    dimensions[dim] = totals[dim].count > 0 ? Math.round(20 + (totals[dim].weighted / totals[dim].count) * 11) : 50
  })

  return { dimensions }
}

function determineMoralProfile(scores: Record<MoralFoundation, number>) {
  const sorted = [...MORAL_FOUNDATIONS].sort((a, b) => scores[b] - scores[a])
  if (scores.harm >= 70 && scores.fairness >= 70) return MORAL_PROFILES[0]
  if (scores.authority >= 70 && scores.purity >= 70) return MORAL_PROFILES[1]
  if (scores.ingroup >= 70 && scores.authority >= 70) return MORAL_PROFILES[2]
  if (scores.liberty >= 70) return MORAL_PROFILES[3]
  return MORAL_PROFILES[4]
}

export function calculateProfessionalMode(answers: Answer[], questions: MoralQuestion[]): AssessmentResult {
  const raw = calculateWeightedRawScores(answers, questions)
  const profile = determineMoralProfile(raw.dimensions)

  const dimResults = MORAL_FOUNDATIONS.map(dim => ({
    name: MORAL_FOUNDATION_NAMES[dim],
    score: raw.dimensions[dim],
  }))

  const moralBlindspots: string[] = []
  if (raw.dimensions.harm <= 45) moralBlindspots.push('可能过度保护，难以做出艰难的功利选择')
  if (raw.dimensions.fairness <= 45) moralBlindspots.push('可能在追求公平时无视其他道德考量')
  if (raw.dimensions.ingroup <= 45) moralBlindspots.push('可能产生部落主义，对圈外人产生偏见')
  if (raw.dimensions.authority <= 45) moralBlindspots.push('可能盲目服从权威，忽视不公正')
  if (raw.dimensions.purity <= 45) moralBlindspots.push('可能将无害行为道德化，产生道德说教')
  if (raw.dimensions.liberty <= 45) moralBlindspots.push('可能接受威权，牺牲个人自由')

  return {
    type: 'MORAL',
    typeName: '道德基础专业测评',
    archetype: profile.label,
    title: `道德基础报告 - ${profile.label}`,
    summary: `道德人格：${profile.label}。${profile.description}`,
    description: profile.description,
    dimensions: dimResults,
    strengths: [`最强道德直觉: ${MORAL_FOUNDATION_NAMES[[...MORAL_FOUNDATIONS].sort((a, b) => raw.dimensions[b] - raw.dimensions[a])[0]]}`],
    suggestions: [
      '道德直觉是进化的礼物，而非真理的来源',
      '练习主动为对立的道德框架建立最佳论证',
      '注意：道德纯洁可能导致道德残忍',
      '扩大你的道德圈，考虑圈外人的视角',
    ],
    moralBlindspots,
    reliability: 0.82,
    normSample: moralNormData.overall.n,
    references: moralReferences,
  }
}
