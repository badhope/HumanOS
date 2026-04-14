import {
  BIG_FIVE_FACTORS,
  BIG_FIVE_FACTOR_NAMES,
  BIG_FIVE_FACTOR_DESCRIPTIONS,
  BIG_FIVE_DIMENSION_BANDS,
  BIG_FIVE_FACETS,
  BIG_FIVE_PERSONALITY_PROFILES,
  bigFiveNormData,
  bigFiveReferences,
  type BigFiveQuestion,
  type BigFiveFactor,
} from './bigfive-common'
import type { AssessmentResult, Dimension } from '../../../types'

export interface BigFiveAnswer {
  questionId: string
  value: number
}

export interface BigFiveScores {
  O: number
  C: number
  E: number
  A: number
  N: number
}

export interface BigFiveFacetScores {
  [factor: string]: Record<string, number>
}

export interface BigFiveDimensionResult {
  factor: string
  factorName: string
  description: string
  score: number
  rawScore: number
  percentile: number
  zScore: number
  band: string
  bandDescription: string
  clarity: number
  facetScores: Record<string, number>
}

export function calculateProfessionalBigFive(
  answers: BigFiveAnswer[],
  questions: BigFiveQuestion[]
): AssessmentResult {
  const rawScores = calculateWeightedRawScores(answers, questions)
  const dimensionResults = processEachDimension(rawScores, answers, questions)
  const personalityProfile = determinePersonalityProfile(dimensionResults)
  const reliability = calculateReliability(answers, questions)

  return buildComprehensiveResult(rawScores, dimensionResults, personalityProfile, reliability)
}

function calculateWeightedRawScores(
  answers: BigFiveAnswer[],
  questions: BigFiveQuestion[]
): BigFiveScores {
  const scores: BigFiveScores = { O: 0, C: 0, E: 0, A: 0, N: 0 }
  const weightSums: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 }

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta) return

    const factor = (question.meta.factor || question.meta.dimension || 'O') as BigFiveFactor
    const discrimination = question.meta.discrimination || 0.5
    const factorLoading = question.meta.factorLoading || 0.7
    const weight = discrimination * factorLoading * 2

    let value = answer.value
    if (question.meta.reverseScored) {
      value = 6 - value
    }

    const socialDesirability = question.meta.socialDesirability || 0.5
    const sdCorrection = 1 - Math.abs(0.5 - socialDesirability) * 0.3
    const weightedValue = value * weight * sdCorrection

    scores[factor] += weightedValue
    weightSums[factor] += weight
  })

  Object.keys(scores).forEach(key => {
    const factor = key as BigFiveFactor
    if (weightSums[factor] > 0) {
      scores[factor] = ((scores[factor] / weightSums[factor] - 1) / 4) * 100
    }
    scores[factor] = Math.max(0, Math.min(100, scores[factor]))
  })

  return scores
}

function processEachDimension(
  scores: BigFiveScores,
  answers: BigFiveAnswer[],
  questions: BigFiveQuestion[]
): BigFiveDimensionResult[] {
  return BIG_FIVE_FACTORS.map(factor => {
    const finalScore = Math.max(0, Math.min(100, scores[factor]))

    const norm = bigFiveNormData[factor as keyof typeof bigFiveNormData]
    const zScore = (finalScore - norm.mean) / norm.sd
    const percentile = Math.round(50 + zScore * 16)
    const finalPercentile = Math.max(1, Math.min(99, percentile))

    const bands = BIG_FIVE_DIMENSION_BANDS[factor as keyof typeof BIG_FIVE_DIMENSION_BANDS]
    const band = bands.find(b => finalScore >= b.range[0] && finalScore <= b.range[1]) || bands[5]

    const facetScores = calculateFacetScores(factor, answers, questions)
    const clarity = Math.abs(finalScore - 50) * 2

    return {
      factor,
      factorName: BIG_FIVE_FACTOR_NAMES[factor],
      description: BIG_FIVE_FACTOR_DESCRIPTIONS[factor],
      score: Math.round(finalScore),
      rawScore: finalScore,
      percentile: finalPercentile,
      zScore: Number(zScore.toFixed(2)),
      band: band.band,
      bandDescription: band.description,
      clarity: Math.round(clarity),
      facetScores,
    }
  })
}

function calculateFacetScores(
  factor: string,
  answers: BigFiveAnswer[],
  questions: BigFiveQuestion[]
): Record<string, number> {
  const facetScores: Record<string, number> = {}
  const facetCounts: Record<string, number> = {}

  BIG_FIVE_FACETS[factor as keyof typeof BIG_FIVE_FACETS].forEach(facet => {
    facetScores[facet] = 0
    facetCounts[facet] = 0
  })

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta) return
    const qFactor = (question.meta.factor || question.meta.dimension) as BigFiveFactor
    if (qFactor !== factor) return

    const facet = question.meta.facet || 'general'
    if (Object.prototype.hasOwnProperty.call(facetScores, facet)) {
      let value = answer.value
      if (question.meta.reverseScored) {
        value = 6 - value
      }
      facetScores[facet] += ((value - 1) / 4) * 100
      facetCounts[facet] += 1
    }
  })

  Object.keys(facetScores).forEach(facet => {
    if (facetCounts[facet] > 0) {
      facetScores[facet] = Math.round(facetScores[facet] / facetCounts[facet])
    }
  })

  return facetScores
}

function determinePersonalityProfile(dimensionResults: BigFiveDimensionResult[]): {
  code: string
  name: string
  description: string
  archetype: string
} {
  const [O, C, E, A, N] = dimensionResults

  const codeParts: string[] = []
  codeParts.push(O.score >= 60 ? 'H' : O.score <= 40 ? 'L' : 'R')
  codeParts.push(C.score >= 60 ? 'C' : C.score <= 40 ? 'U' : 'O')
  codeParts.push(E.score >= 60 ? 'E' : E.score <= 40 ? 'I' : 'M')
  codeParts.push(A.score >= 60 ? 'A' : A.score <= 40 ? 'C' : 'M')
  codeParts.push(N.score >= 60 ? 'N' : N.score <= 40 ? 'S' : 'M')

  const code = codeParts.join('')

  const matchingProfile = Object.entries(BIG_FIVE_PERSONALITY_PROFILES).find(([key]) => {
    return key.split('').every((char, i) => char === code[i] || char === code[i].toUpperCase())
  })

  if (matchingProfile) {
    return { code, ...matchingProfile[1] }
  }

  return {
    code,
    name: '独特人格',
    description: '拥有独特的人格特质组合，难以简单归类',
    archetype: '独一无二',
  }
}

function generateDynamicStrengths(dimensionResults: BigFiveDimensionResult[]): string[] {
  const strengths: string[] = []
  const [O, C, E, A, N] = dimensionResults

  if (O.score >= 70) strengths.push('极富创造力，思维开阔创新')
  else if (O.score >= 60) strengths.push('富有想象力，乐于接受新事物')
  if (O.score <= 30) strengths.push('极度务实，专注于实际解决方案')

  if (C.score >= 70) strengths.push('极端自律可靠，追求卓越品质')
  else if (C.score >= 60) strengths.push('组织性强，认真负责值得信赖')
  if (C.score <= 30) strengths.push('高度灵活，适应变化能力强')

  if (E.score >= 70) strengths.push('精力充沛热情，社交影响力强')
  else if (E.score >= 60) strengths.push('善于社交沟通，积极乐观')
  if (E.score <= 30) strengths.push('深度专注，独立工作能力极强')

  if (A.score >= 70) strengths.push('真诚友善共情，人际和谐建设者')
  else if (A.score >= 60) strengths.push('合作利他，易于相处')
  if (A.score <= 30) strengths.push('客观理性，竞争意志坚定')

  if (N.score <= 20) strengths.push('情绪超级稳定，压力下泰然自若')
  else if (N.score <= 30) strengths.push('冷静从容，抗压能力强')
  if (N.score >= 70) strengths.push('情绪敏感度高，危机预警能力强')

  return strengths.filter((item, index) => strengths.indexOf(item) === index).slice(0, 6)
}

function generateDynamicWeaknesses(dimensionResults: BigFiveDimensionResult[]): string[] {
  const weaknesses: string[] = []
  const [O, C, E, A, N] = dimensionResults

  if (O.score >= 80) weaknesses.push('可能过于空想，缺乏实际执行')
  if (O.score <= 20) weaknesses.push('过于保守，抗拒新尝试')

  if (C.score >= 80) weaknesses.push('可能过度控制，完美主义负担')
  if (C.score <= 20) weaknesses.push('组织性不足，容易拖延散漫')

  if (E.score >= 80) weaknesses.push('可能过度社交，缺乏深度思考')
  if (E.score <= 20) weaknesses.push('社交回避，容易被孤立')

  if (A.score >= 80) weaknesses.push('过度讨好他人，边界感缺失')
  if (A.score <= 20) weaknesses.push('人际过于强硬，合作困难')

  if (N.score >= 80) weaknesses.push('情绪过度敏感，容易焦虑崩溃')
  if (N.score <= 20) weaknesses.push('情绪反应迟钝，缺乏共情信号')

  return weaknesses.filter((item, index) => weaknesses.indexOf(item) === index).slice(0, 5)
}

function generateCareerRecommendations(dimensionResults: BigFiveDimensionResult[]): string[] {
  const careers: string[] = []
  const [O, C, E, A, N] = dimensionResults

  if (O.score >= 70 && C.score >= 60) careers.push('战略咨询', '产品创新', '研发设计')
  if (O.score <= 30 && C.score >= 70) careers.push('质量管理', '流程优化', '财务审计')

  if (E.score >= 70 && A.score >= 60) careers.push('销售管理', '人力资源', '市场品牌')
  if (E.score <= 30 && O.score >= 60) careers.push('学术研究', '数据分析', '程序开发')

  if (C.score >= 70 && N.score <= 30) careers.push('项目管理', '运营管理', '风险控制')
  if (A.score >= 70 && N.score <= 40) careers.push('心理咨询', '医疗护理', '教育培训')

  if (O.score >= 60 && E.score >= 60 && C.score <= 40) careers.push('创意策划', '艺术创作', '媒体传播')
  if (C.score >= 60 && A.score <= 40 && E.score >= 60) careers.push('企业高管', '投资银行', '创业孵化')

  return careers.filter((item, index) => careers.indexOf(item) === index).slice(0, 8)
}

function calculateReliability(answers: BigFiveAnswer[], questions: BigFiveQuestion[]): number {
  const validQuestions = questions.filter(q =>
    answers.some(a => a.questionId === q.id) && q.meta
  )

  if (validQuestions.length < 10) return 0.7

  const avgFactorLoading = validQuestions.reduce((sum, q) => sum + q.meta.factorLoading, 0) / validQuestions.length
  const consistencyScore = calculateResponseConsistency(answers)

  return Math.min(0.95, 0.65 + avgFactorLoading * 0.2 + consistencyScore * 0.15)
}

function calculateResponseConsistency(answers: BigFiveAnswer[]): number {
  if (answers.length < 10) return 0.5

  const values = answers.map(a => a.value)
  const extremeResponses = values.filter(v => v === 1 || v === 5).length / values.length
  const sameResponse = Math.max(...[1, 2, 3, 4, 5].map(v => values.filter(x => x === v).length)) / values.length

  if (extremeResponses > 0.8 || sameResponse > 0.7) return 0
  if (extremeResponses > 0.6 || sameResponse > 0.5) return 0.3
  return 0.7
}

function buildComprehensiveResult(
  rawScores: BigFiveScores,
  dimensionResults: BigFiveDimensionResult[],
  personalityProfile: ReturnType<typeof determinePersonalityProfile>,
  reliability: number
): AssessmentResult {
  const strengths = generateDynamicStrengths(dimensionResults)
  const weaknesses = generateDynamicWeaknesses(dimensionResults)
  const careers = generateCareerRecommendations(dimensionResults)

  const dimensions: Dimension[] = dimensionResults.map(dr => ({
    name: dr.factorName,
    score: dr.score,
    maxScore: 100,
    percentile: dr.percentile,
    description: dr.bandDescription,
    band: dr.band,
    zScore: dr.zScore,
    clarity: dr.clarity,
    subDimensions: Object.entries(dr.facetScores).map(([name, score]) => ({ name, score })),
  }))

  return {
    type: 'BigFive',
    typeName: '大五人格专业测评',
    typeCode: personalityProfile.code,
    archetype: personalityProfile.archetype,
    title: `${personalityProfile.name} - ${personalityProfile.archetype}`,
    summary: personalityProfile.description,
    dimensions,
    overallScore: Math.round(dimensionResults.reduce((s, d) => s + d.score, 0) / dimensionResults.length),
    strengths,
    areasForGrowth: weaknesses,
    careerRecommendations: careers,
    reliability: Number(reliability.toFixed(2)),
    standardError: Number((15 * Math.sqrt(1 - reliability)).toFixed(2)),
    uniquenessIndex: calculateUniquenessIndex(rawScores),
    interpretiveNotes: generateInterpretiveNotes(dimensionResults, reliability),
    references: bigFiveReferences,
  }
}

function calculateUniquenessIndex(scores: BigFiveScores): number {
  const meanDeviation = Object.values(scores).reduce((sum, score) => sum + Math.abs(score - 50), 0) / 5
  return Math.min(99, Math.round(meanDeviation * 1.5 + 30))
}

function generateInterpretiveNotes(dimensionResults: BigFiveDimensionResult[], reliability: number): string[] {
  const notes: string[] = []
  const extremes = dimensionResults.filter(d => d.score <= 15 || d.score >= 85)

  if (extremes.length >= 2) {
    notes.push(`您在${extremes.map(d => d.factorName).join('、')}维度上表现出极端特征，这构成了您独特的人格标识`)
  }

  if (dimensionResults.every(d => d.score >= 40 && d.score <= 60)) {
    notes.push('您的各维度得分都接近人群平均水平，这表明您具有极强的环境适应性和人格弹性')
  }

  if (reliability < 0.7) {
    notes.push('本次测评一致性指标略低，建议结合其他信息综合解读结果')
  } else if (reliability >= 0.9) {
    notes.push('本次测评信度优秀，结果具有高度参考价值')
  }

  return notes
}


export const calculateNormalMode = calculateProfessionalBigFive


export const calculateAdvancedMode = calculateProfessionalBigFive


export const calculateProfessionalMode = calculateProfessionalBigFive





