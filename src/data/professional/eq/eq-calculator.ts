import {
  EQ_DIMENSIONS,
  EQ_DIMENSION_NAMES,
  EQ_DIMENSION_DESCRIPTIONS,
  EQ_DIMENSION_BANDS,
  EQ_SUBSCALES,
  EQ_EMOTIONAL_PROFILES,
  eqNormData,
  eqReferences,
  type EQQuestion,
  type EQDimension,
} from './eq-common'
import type { AssessmentResult, Dimension } from '../../../types'

export interface EQAnswer {
  questionId: string
  value: number
}

export interface EQScores {
  selfAwareness: number
  selfManagement: number
  socialAwareness: number
  relationshipManagement: number
}

export interface EQDimensionResult {
  dimension: string
  dimensionName: string
  description: string
  score: number
  rawScore: number
  percentile: number
  zScore: number
  band: string
  bandDescription: string
  clarity: number
  subscaleScores: Record<string, number>
}

export function calculateProfessionalEQ(
  answers: EQAnswer[],
  questions: EQQuestion[]
): AssessmentResult {
  const rawScores = calculateWeightedRawScores(answers, questions)
  const dimensionResults = processEachDimension(rawScores, answers, questions)
  const emotionalProfile = determineEmotionalProfile(dimensionResults)
  const reliability = calculateReliability(answers, questions)

  return buildComprehensiveResult(rawScores, dimensionResults, emotionalProfile, reliability)
}

function calculateWeightedRawScores(
  answers: EQAnswer[],
  questions: EQQuestion[]
): EQScores {
  const scores: EQScores = {
    selfAwareness: 0,
    selfManagement: 0,
    socialAwareness: 0,
    relationshipManagement: 0,
  }
  const weightSums: Record<string, number> = {
    selfAwareness: 0,
    selfManagement: 0,
    socialAwareness: 0,
    relationshipManagement: 0,
  }

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta) return

    const dimension = question.meta.dimension
    const discrimination = question.meta.discrimination || 0.5
    const weight = discrimination * 1.5

    let value = answer.value
    const socialDesirability = question.meta.socialDesirability || 0.5
    const sdCorrection = 1 - Math.abs(0.5 - socialDesirability) * 0.25
    const weightedValue = value * weight * sdCorrection

    scores[dimension] += weightedValue
    weightSums[dimension] += weight
  })

  Object.keys(scores).forEach(key => {
    const dimension = key as EQDimension
    if (weightSums[dimension] > 0) {
      scores[dimension] = ((scores[dimension] / weightSums[dimension] - 1) / 4) * 100
    }
    scores[dimension] = Math.max(0, Math.min(100, scores[dimension]))
  })

  return scores
}

function processEachDimension(
  scores: EQScores,
  answers: EQAnswer[],
  questions: EQQuestion[]
): EQDimensionResult[] {
  return EQ_DIMENSIONS.map(dimension => {
    const finalScore = Math.max(0, Math.min(100, scores[dimension]))

    const norm = eqNormData[dimension as keyof typeof eqNormData]
    const zScore = (finalScore - norm.mean) / norm.sd
    const percentile = Math.round(50 + zScore * 16)
    const finalPercentile = Math.max(1, Math.min(99, percentile))

    const bands = EQ_DIMENSION_BANDS[dimension as keyof typeof EQ_DIMENSION_BANDS]
    const band = bands.find(b => finalScore >= b.range[0] && finalScore <= b.range[1]) || bands[5]

    const subscaleScores = calculateSubscaleScores(dimension, answers, questions)
    const clarity = Math.abs(finalScore - 50) * 2

    return {
      dimension,
      dimensionName: EQ_DIMENSION_NAMES[dimension],
      description: EQ_DIMENSION_DESCRIPTIONS[dimension],
      score: Math.round(finalScore),
      rawScore: finalScore,
      percentile: finalPercentile,
      zScore: Number(zScore.toFixed(2)),
      band: band.band,
      bandDescription: band.description,
      clarity: Math.round(clarity),
      subscaleScores,
    }
  })
}

function calculateSubscaleScores(
  dimension: string,
  answers: EQAnswer[],
  questions: EQQuestion[]
): Record<string, number> {
  const subscaleScores: Record<string, number> = {}
  const subscaleCounts: Record<string, number> = {}

  EQ_SUBSCALES[dimension as keyof typeof EQ_SUBSCALES].forEach(subscale => {
    subscaleScores[subscale] = 0
    subscaleCounts[subscale] = 0
  })

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta || question.meta.dimension !== dimension) return

    const subscale = question.meta.subscale
    if (Object.prototype.hasOwnProperty.call(subscaleScores, subscale)) {
      subscaleScores[subscale] += ((answer.value - 1) / 4) * 100
      subscaleCounts[subscale] += 1
    }
  })

  Object.keys(subscaleScores).forEach(subscale => {
    if (subscaleCounts[subscale] > 0) {
      subscaleScores[subscale] = Math.round(subscaleScores[subscale] / subscaleCounts[subscale])
    }
  })

  return subscaleScores
}

function determineEmotionalProfile(dimensionResults: EQDimensionResult[]): {
  code: string
  name: string
  description: string
  archetype: string
} {
  const codeParts = dimensionResults.map(dr => {
    if (dr.score >= 65) return 'H'
    if (dr.score <= 35) return 'L'
    return 'M'
  })

  const code = codeParts.join('')

  const matchingProfile = EQ_EMOTIONAL_PROFILES[code]

  if (matchingProfile) {
    return { code, ...matchingProfile }
  }

  return {
    code,
    name: '独特情商画像',
    description: '拥有独特的情绪智力组合模式',
    archetype: '情绪艺术家',
  }
}

function generateDynamicStrengths(dimensionResults: EQDimensionResult[]): string[] {
  const strengths: string[] = []
  const [selfAwareness, selfManagement, socialAwareness, relationshipManagement] = dimensionResults

  if (selfAwareness.score >= 70) strengths.push('情绪自我觉察极其敏锐，自我认知深度非凡')
  else if (selfAwareness.score >= 60) strengths.push('情绪觉知清晰，了解自己的优势与局限')
  if (selfAwareness.score <= 30) strengths.push('情绪极度稳定，很少受情绪波动困扰')

  if (selfManagement.score >= 70) strengths.push('情绪自控能力超群，压力下保持极度冷静')
  else if (selfManagement.score >= 60) strengths.push('自我管理良好，适应变化能力强')
  if (selfManagement.score <= 30) strengths.push('率性而为，活在当下，真实不造作')

  if (socialAwareness.score >= 70) strengths.push('共情能力卓越，能深度理解他人感受')
  else if (socialAwareness.score >= 60) strengths.push('社会感知敏锐，善于察言观色')
  if (socialAwareness.score <= 30) strengths.push('不受他人情绪干扰，保持客观独立判断')

  if (relationshipManagement.score >= 70) strengths.push('关系经营大师，人际影响力非同凡响')
  else if (relationshipManagement.score >= 60) strengths.push('沟通协调能力出色，善于处理人际关系')
  if (relationshipManagement.score <= 30) strengths.push('独立不依赖，不需要外界肯定也能自足')

  return strengths.filter((item, index) => strengths.indexOf(item) === index).slice(0, 6)
}

function generateDynamicGrowthAreas(dimensionResults: EQDimensionResult[]): string[] {
  const areas: string[] = []
  const [selfAwareness, selfManagement, socialAwareness, relationshipManagement] = dimensionResults

  if (selfAwareness.score >= 80) areas.push('可能过度自我关注，导致过度分析和内耗')
  if (selfAwareness.score <= 20) areas.push('情绪觉察不足，容易忽视自己的真实需求')

  if (selfManagement.score >= 80) areas.push('过度压抑情绪可能导致内在压力累积')
  if (selfManagement.score <= 20) areas.push('情绪冲动管理需要加强，三思而后行')

  if (socialAwareness.score >= 80) areas.push('过度共情可能导致情绪边界模糊和倦怠')
  if (socialAwareness.score <= 20) areas.push('社会敏感度提升空间，多倾听他人反馈')

  if (relationshipManagement.score >= 80) areas.push('可能过度承担关系责任，需要设立健康边界')
  if (relationshipManagement.score <= 20) areas.push('人际技能可以进一步打磨，从主动表达开始')

  return areas.filter((item, index) => areas.indexOf(item) === index).slice(0, 5)
}

function generateDevelopmentRecommendations(dimensionResults: EQDimensionResult[]): string[] {
  const recommendations: string[] = []
  const [selfAwareness, selfManagement, socialAwareness, relationshipManagement] = dimensionResults

  if (selfAwareness.score >= 60 && selfManagement.score >= 60) recommendations.push('高管教练', '领导力发展', '组织变革顾问')
  if (selfAwareness.score >= 60 && socialAwareness.score >= 60) recommendations.push('心理咨询', '生命教练', '人力资源')
  if (selfManagement.score >= 60 && relationshipManagement.score >= 60) recommendations.push('项目管理', '运营总监', '危机处理')
  if (socialAwareness.score >= 60 && relationshipManagement.score >= 60) recommendations.push('销售总监', '客户关系', '公共关系')

  if (selfAwareness.score <= 40) recommendations.push('正念冥想练习', '情绪日志记录')
  if (selfManagement.score <= 40) recommendations.push('呼吸放松训练', '延迟反应练习')
  if (socialAwareness.score <= 40) recommendations.push('积极倾听练习', '非语言信号识别')
  if (relationshipManagement.score <= 40) recommendations.push('建设性反馈练习', '冲突调解训练')

  return recommendations.filter((item, index) => recommendations.indexOf(item) === index).slice(0, 8)
}

function calculateReliability(answers: EQAnswer[], questions: EQQuestion[]): number {
  const validQuestions = questions.filter(q =>
    answers.some(a => a.questionId === q.id) && q.meta
  )

  if (validQuestions.length < 10) return 0.7

  const avgDiscrimination = validQuestions.reduce((sum, q) => sum + q.meta.discrimination, 0) / validQuestions.length
  const consistencyScore = calculateResponseConsistency(answers)

  return Math.min(0.95, 0.7 + avgDiscrimination * 0.15 + consistencyScore * 0.1)
}

function calculateResponseConsistency(answers: EQAnswer[]): number {
  if (answers.length < 10) return 0.5

  const values = answers.map(a => a.value)
  const extremeResponses = values.filter(v => v === 1 || v === 5).length / values.length
  const sameResponse = Math.max(...[1, 2, 3, 4, 5].map(v => values.filter(x => x === v).length)) / values.length

  if (extremeResponses > 0.8 || sameResponse > 0.7) return 0
  if (extremeResponses > 0.6 || sameResponse > 0.5) return 0.3
  return 0.7
}

function buildComprehensiveResult(
  rawScores: EQScores,
  dimensionResults: EQDimensionResult[],
  emotionalProfile: ReturnType<typeof determineEmotionalProfile>,
  reliability: number
): AssessmentResult {
  const strengths = generateDynamicStrengths(dimensionResults)
  const growthAreas = generateDynamicGrowthAreas(dimensionResults)
  const recommendations = generateDevelopmentRecommendations(dimensionResults)

  const dimensions: Dimension[] = dimensionResults.map(dr => ({
    name: dr.dimensionName,
    score: dr.score,
    maxScore: 100,
    percentile: dr.percentile,
    description: dr.bandDescription,
    band: dr.band,
    zScore: dr.zScore,
    clarity: dr.clarity,
    subDimensions: Object.entries(dr.subscaleScores).map(([name, score]) => ({ name, score })),
  }))

  const overallEQ = Math.round(dimensionResults.reduce((s, d) => s + d.score, 0) / dimensionResults.length)

  return {
    type: 'EQ',
    typeName: '情商专业测评',
    typeCode: emotionalProfile.code,
    archetype: emotionalProfile.archetype,
    title: `${emotionalProfile.name} - ${emotionalProfile.archetype}`,
    summary: emotionalProfile.description,
    dimensions,
    overallScore: overallEQ,
    overallLevel: getEQLevel(overallEQ),
    strengths,
    areasForGrowth: growthAreas,
    developmentRecommendations: recommendations,
    reliability: Number(reliability.toFixed(2)),
    standardError: Number((15 * Math.sqrt(1 - reliability)).toFixed(2)),
    uniquenessIndex: calculateUniquenessIndex(rawScores),
    interpretiveNotes: generateInterpretiveNotes(dimensionResults, reliability, overallEQ),
    references: eqReferences,
  }
}

function getEQLevel(score: number): string {
  if (score >= 90) return '大师级'
  if (score >= 80) return '专家级'
  if (score >= 70) return '优秀'
  if (score >= 60) return '良好'
  if (score >= 50) return '中等'
  if (score >= 40) return '基础'
  return '发展中'
}

function calculateUniquenessIndex(scores: EQScores): number {
  const meanDeviation = Object.values(scores).reduce((sum, score) => sum + Math.abs(score - 50), 0) / 4
  return Math.min(99, Math.round(meanDeviation * 1.8 + 25))
}

function generateInterpretiveNotes(
  dimensionResults: EQDimensionResult[],
  reliability: number,
  overallEQ: number
): string[] {
  const notes: string[] = []

  if (overallEQ >= 85) {
    notes.push('您的情商表现极为卓越，这是非常罕见的情绪智力水平')
  } else if (overallEQ >= 70) {
    notes.push('您的情商显著高于平均水平，这是事业成功和生活幸福的重要预测指标')
  }

  const extremes = dimensionResults.filter(d => d.score <= 15 || d.score >= 85)
  if (extremes.length >= 2) {
    notes.push(`您在${extremes.map(d => d.dimensionName).join('、')}方面表现出极端特征，定义了您独特的情商风格`)
  }

  const [sa, sm, soa, rm] = dimensionResults
  if (sm.score - sa.score >= 30) {
    notes.push('您的情绪管理能力显著高于自我觉察能力，建议增加内心探索以获得更大提升')
  }
  if (rm.score - soa.score >= 30) {
    notes.push('您的关系技能出众但共情相对薄弱，这可能造成"高效但缺乏温度"的印象')
  }

  if (reliability < 0.7) {
    notes.push('本次测评作答一致性略低，请在放松状态下诚实作答获得更准确结果')
  }

  return notes
}


export const calculateEQProfessional = calculateProfessionalEQ




