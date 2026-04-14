import type { DISCDimension, DISCQuestion } from './disc-common'
import { DISC_DIMENSIONS, DISC_DIMENSION_NAMES, DISC_PROFILES, getDISCProfile, discNormData, discReferences } from './disc-common'
import type { Answer, AssessmentResult } from '../../../types'

interface RawScores {
  dimensions: Record<DISCDimension, number>
  profileCode: string
}

function calculateWeightedRawScores(answers: Answer[], questions: DISCQuestion[]): RawScores {
  const dimensionTotals: Record<DISCDimension, { sum: number; count: number; weighted: number }> = {
    dominance: { sum: 0, count: 0, weighted: 0 },
    influence: { sum: 0, count: 0, weighted: 0 },
    steadiness: { sum: 0, count: 0, weighted: 0 },
    compliance: { sum: 0, count: 0, weighted: 0 },
  }

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (question && answer.value !== undefined) {
      const dim = question.meta.dimension
      let value = answer.value
      if (question.meta.pole === 'low') {
        value = 6 - value
      }
      
      const weight = question.meta.factorLoading * question.meta.discrimination
      dimensionTotals[dim].sum += value
      dimensionTotals[dim].weighted += value * weight
      dimensionTotals[dim].count++
    }
  })

  const dimensions = {} as Record<DISCDimension, number>

  DISC_DIMENSIONS.forEach(dim => {
    const d = dimensionTotals[dim]
    if (d.count > 0) {
      dimensions[dim] = Math.round(15 + (d.weighted / d.count) * 12)
    } else {
      dimensions[dim] = 50
    }
  })

  const sorted = [...DISC_DIMENSIONS].sort((a, b) => dimensions[b] - dimensions[a])
  const profileCode = sorted.map(d => d[0].toUpperCase()).join('')

  return {
    dimensions,
    profileCode,
  }
}

function generateWorkStyleAdvice(dimensions: Record<DISCDimension, number>): string[] {
  const advice: string[] = []
  const sorted = [...DISC_DIMENSIONS].sort((a, b) => dimensions[b] - dimensions[a])
  const primary = sorted[0]
  
  if (primary === 'dominance') {
    advice.push('给予更大的自主权和结果导向的KPI，避免微观管理')
    advice.push('提供挑战性目标和竞争环境激发潜力')
    advice.push('注意倾听他人意见，决策前适当放缓节奏')
  } else if (primary === 'influence') {
    advice.push('提供公开认可和赞赏的机会，重视社交环境')
    advice.push('安排需要人际互动和说服的工作角色')
    advice.push('帮助建立时间管理系统，避免过度承诺')
  } else if (primary === 'steadiness') {
    advice.push('提供稳定的工作环境和清晰的期望，避免频繁变动')
    advice.push('发挥耐心和倾听优势，安排团队支持性角色')
    advice.push('鼓励主动表达不同意见，建立安全感')
  } else if (primary === 'compliance') {
    advice.push('提供清晰的规则、流程和质量标准')
    advice.push('给予足够时间进行深入分析，避免仓促决策')
    advice.push('避免模糊指令，重视数据和逻辑性')
  }
  
  if (dimensions.dominance >= 70 && dimensions.steadiness <= 35) {
    advice.push('重要决策后安排缓冲期，倾听团队执行顾虑')
  }
  if (dimensions.influence >= 70 && dimensions.compliance <= 35) {
    advice.push('建立书面确认机制，确保细节不被遗漏')
  }
  
  advice.push('理想团队：D设定方向，I推动沟通，S确保执行，C把控质量')
  return advice.slice(0, 6)
}

export function calculateProfessionalDISC(
  answers: Answer[],
  questions: DISCQuestion[]
): AssessmentResult {
  const rawScores = calculateWeightedRawScores(answers, questions)
  const profile = getDISCProfile(rawScores.dimensions)

  const dimensionResults = DISC_DIMENSIONS.map(dim => ({
    name: DISC_DIMENSION_NAMES[dim],
    score: rawScores.dimensions[dim],
    letter: dim[0].toUpperCase(),
  }))

  return {
    type: 'DISC',
    typeName: 'DISC行为风格专业测评',
    typeCode: `DISC-${rawScores.profileCode}`,
    archetype: profile.label,
    title: `DISC行为风格报告 - ${profile.label}`,
    summary: `行为特征：${profile.label}。${profile.description}`,
    description: profile.description,
    dimensions: dimensionResults,
    profileCode: rawScores.profileCode,
    strengths: [
      `${DISC_DIMENSION_NAMES[[...DISC_DIMENSIONS].sort((a, b) => rawScores.dimensions[b] - rawScores.dimensions[a])[0]]}优势突出`,
      '行为风格一致性良好，可预测性高',
    ],
    suggestions: generateWorkStyleAdvice(rawScores.dimensions),
    workEnvironment: `偏好: ${getPreferredEnvironment(rawScores.dimensions)}。建议回避: ${getEnvironmentToAvoid(rawScores.dimensions)}`,
    communicationTips: generateCommunicationTips(rawScores.dimensions),
    reliability: 0.85,
    standardError: 4.5,
    normSample: discNormData.overall.n,
    references: discReferences,
  }
}

function getPreferredEnvironment(dimensions: Record<DISCDimension, number>): string {
  const sorted = [...DISC_DIMENSIONS].sort((a, b) => dimensions[b] - dimensions[a])
  const envMap: Record<string, string> = {
    dominance: '自主、结果导向、挑战、创新',
    influence: '开放、社交、认可、协作',
    steadiness: '稳定、和谐、可预测、支持',
    compliance: '精确、有序、专业、质量',
  }
  return envMap[sorted[0]] + ' + ' + envMap[sorted[1]].split('、')[0]
}

function getEnvironmentToAvoid(dimensions: Record<DISCDimension, number>): string {
  const sorted = [...DISC_DIMENSIONS].sort((a, b) => dimensions[a] - dimensions[b])
  const avoidMap: Record<string, string> = {
    dominance: '过度控制、官僚主义、缺乏挑战',
    influence: '孤立、沉默、缺乏反馈',
    steadiness: '频繁变动、冲突、高压',
    compliance: '混乱、模糊规则、强制冒险',
  }
  return avoidMap[sorted[0]]
}

function generateCommunicationTips(dimensions: Record<DISCDimension, number>): string[] {
  const tips: string[] = []
  if (dimensions.dominance >= 60) {
    tips.push('与D沟通：直截了当，聚焦结果，节省时间')
  }
  if (dimensions.influence >= 60) {
    tips.push('与I沟通：先建立关系，给予赞美和关注')
  }
  if (dimensions.steadiness >= 60) {
    tips.push('与S沟通：建立信任，给予时间适应变化')
  }
  if (dimensions.compliance >= 60) {
    tips.push('与C沟通：提供数据和逻辑，留出思考时间')
  }
  return tips
}




