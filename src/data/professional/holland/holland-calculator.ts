import {
  HOLLAND_TYPES,
  HOLLAND_TYPE_NAMES,
  HOLLAND_TYPE_FULL_NAMES,
  HOLLAND_TYPE_DESCRIPTIONS,
  HOLLAND_DIMENSION_BANDS,
  HOLLAND_FACETS,
  HOLLAND_CAREER_ARCHETYPES,
  hollandNormData,
  hollandReferences,
  type HollandQuestion,
  type HollandType,
} from './holland-common'
import type { AssessmentResult, Dimension } from '../../../types'

export interface HollandAnswer {
  questionId: string
  value: number
}

export interface HollandScores {
  R: number
  I: number
  A: number
  S: number
  E: number
  C: number
}

export interface HollandDimensionResult {
  type: string
  typeName: string
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

export function calculateProfessionalHolland(
  answers: HollandAnswer[],
  questions: HollandQuestion[]
): AssessmentResult {
  const rawScores = calculateWeightedRawScores(answers, questions)
  const dimensionResults = processEachDimension(rawScores, answers, questions)
  const topThree = getTopThreeTypes(dimensionResults)
  const careerProfile = determineCareerProfile(dimensionResults)
  const consistency = calculateProfileConsistency(rawScores)
  const reliability = calculateReliability(answers, questions)

  return buildComprehensiveResult(rawScores, dimensionResults, topThree, careerProfile, consistency, reliability)
}

function calculateWeightedRawScores(
  answers: HollandAnswer[],
  questions: HollandQuestion[]
): HollandScores {
  const scores: HollandScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  const weightSums: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta) return

    const type = (question.meta.type || question.meta.dimension || 'R') as HollandType
    const discrimination = question.meta.discrimination || 0.5
    const weight = discrimination * 1.2

    const normalizedValue = ((answer.value - 1) / 6) * 4 + 1

    const socialDesirability = question.meta.socialDesirability || 0.5
    const sdCorrection = 1 - Math.abs(0.5 - socialDesirability) * 0.2
    const weightedValue = normalizedValue * weight * sdCorrection

    scores[type] += weightedValue
    weightSums[type] += weight
  })

  Object.keys(scores).forEach(key => {
    const type = key as HollandType
    if (weightSums[type] > 0) {
      scores[type] = ((scores[type] / weightSums[type] - 1) / 4) * 100
    }
    scores[type] = Math.max(0, Math.min(100, scores[type]))
  })

  return scores
}

function processEachDimension(
  scores: HollandScores,
  answers: HollandAnswer[],
  questions: HollandQuestion[]
): HollandDimensionResult[] {
  return HOLLAND_TYPES.map(type => {
    const finalScore = Math.max(0, Math.min(100, scores[type]))

    const norm = hollandNormData[type as keyof typeof hollandNormData]
    const zScore = (finalScore - norm.mean) / norm.sd
    const percentile = Math.round(50 + zScore * 16)
    const finalPercentile = Math.max(1, Math.min(99, percentile))

    const bands = HOLLAND_DIMENSION_BANDS[type as keyof typeof HOLLAND_DIMENSION_BANDS]
    const band = bands.find(b => finalScore >= b.range[0] && finalScore <= b.range[1]) || bands[5]

    const facetScores = calculateFacetScores(type, answers, questions)
    const clarity = Math.abs(finalScore - 50) * 2

    return {
      type,
      typeName: HOLLAND_TYPE_NAMES[type],
      description: HOLLAND_TYPE_DESCRIPTIONS[type],
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
  type: string,
  answers: HollandAnswer[],
  questions: HollandQuestion[]
): Record<string, number> {
  const facetScores: Record<string, number> = {}
  const facetCounts: Record<string, number> = {}

  HOLLAND_FACETS[type as keyof typeof HOLLAND_FACETS].forEach(facet => {
    facetScores[facet] = 0
    facetCounts[facet] = 0
  })

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta || question.meta.type !== type) return

    const facets = HOLLAND_FACETS[type as keyof typeof HOLLAND_FACETS]
    const activityType = question.meta.activityType
    const facetIndex = activityType === 'interest' ? 0 : activityType === 'competence' ? 1 : 2
    const facet = facets[facetIndex] || facets[0]

    if (Object.prototype.hasOwnProperty.call(facetScores, facet)) {
      facetScores[facet] += ((answer.value - 1) / 6) * 100
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

function getTopThreeTypes(dimensionResults: HollandDimensionResult[]): string[] {
  return [...dimensionResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(dr => dr.type)
}

function determineCareerProfile(dimensionResults: HollandDimensionResult[]): {
  code: string
  name: string
  description: string
  archetype: string
} {
  const sorted = [...dimensionResults].sort((a, b) => b.score - a.score)
  const topThreeCodes = sorted.slice(0, 3).map(dr => dr.type).join('')

  const matchingProfile = HOLLAND_CAREER_ARCHETYPES[topThreeCodes]

  if (matchingProfile) {
    return { code: topThreeCodes, ...matchingProfile }
  }

  const topThreeNames = sorted.slice(0, 3).map(dr => HOLLAND_TYPE_FULL_NAMES[dr.type]).join(' + ')

  return {
    code: topThreeCodes,
    name: `独特职业画像 - ${topThreeCodes}`,
    description: `您的职业兴趣组合为: ${topThreeNames}，这是一种独特的职业人格配置`,
    archetype: '职业探索者',
  }
}

function generateDynamicStrengths(dimensionResults: HollandDimensionResult[]): string[] {
  const strengths: string[] = []
  const sorted = [...dimensionResults].sort((a, b) => b.score - a.score)
  const [first, second, third] = sorted

  if (first.score >= 70) {
    strengths.push(`在${HOLLAND_TYPE_FULL_NAMES[first.type]}方面具有卓越的天赋和热情`)
  } else if (first.score >= 60) {
    strengths.push(`明显偏好${HOLLAND_TYPE_FULL_NAMES[first.type]}类工作`)
  }

  if (second.score >= 60) {
    strengths.push(`${HOLLAND_TYPE_NAMES[second.type]}是您的第二大职业优势`)
  }

  if (first.score >= 60 && second.score >= 60) {
    strengths.push(`擅长将${HOLLAND_TYPE_NAMES[first.type]}与${HOLLAND_TYPE_NAMES[second.type]}思维结合解决问题`)
  }

  if (third.score >= 55) {
    strengths.push(`具备良好的${HOLLAND_TYPE_NAMES[third.type]}能力作为重要补充`)
  }

  const extremes = sorted.filter(d => d.score >= 80)
  if (extremes.length >= 1) {
    strengths.push(`在${extremes.map(d => HOLLAND_TYPE_NAMES[d.type]).join('、')}领域有罕见的强烈兴趣`)
  }

  const balanced = sorted.filter(d => d.score >= 45 && d.score <= 55)
  if (balanced.length >= 4) {
    strengths.push('职业兴趣非常广泛，适应多种工作环境')
  }

  return strengths.filter((item, index) => strengths.indexOf(item) === index).slice(0, 6)
}

function generateDynamicDevelopmentAreas(dimensionResults: HollandDimensionResult[]): string[] {
  const areas: string[] = []
  const sorted = [...dimensionResults].sort((a, b) => a.score - b.score)
  const [lowest, secondLowest] = sorted

  if (lowest.score <= 20) {
    areas.push(`${HOLLAND_TYPE_FULL_NAMES[lowest.type]}兴趣极低，建议职业方向尽量避开此类工作`)
  } else if (lowest.score <= 35) {
    areas.push(`对${HOLLAND_TYPE_NAMES[lowest.type]}类工作兴趣不高，不作为主要发展方向`)
  }

  if (secondLowest.score <= 30) {
    areas.push(`${HOLLAND_TYPE_NAMES[secondLowest.type]}也是您兴趣较低的领域`)
  }

  const topScore = Math.max(...dimensionResults.map(d => d.score))
  if (topScore < 55) {
    areas.push('整体职业兴趣分化不明显，建议进一步探索确认')
  }

  const [R, I, A, S, E, C] = dimensionResults
  if (E.score <= 30 && S.score >= 60) {
    areas.push('乐于助人但不喜欢领导，适合专家型而非管理型职业')
  }
  if (R.score <= 30 && I.score <= 30) {
    areas.push('不太适合深度技术或研究岗位，偏向与人打交道或创意的工作')
  }
  if (A.score <= 30 && C.score <= 30) {
    areas.push('不太喜欢创意表达或文书事务，更适合动态灵活的工作环境')
  }

  return areas.filter((item, index) => areas.indexOf(item) === index).slice(0, 5)
}

function generateSpecificCareerRecommendations(dimensionResults: HollandDimensionResult[]): string[] {
  const careers: string[] = []
  const sorted = [...dimensionResults].sort((a, b) => b.score - a.score)
  const topCode = sorted.slice(0, 3).map(d => d.type).join('')
  const [R, I, A, S, E, C] = dimensionResults

  if (R.score >= 65 && I.score >= 65) careers.push('机械工程师', '电气工程师', '软件架构师')
  if (I.score >= 65 && A.score >= 60) careers.push('数据科学家', 'UX研究员', '创新产品经理')
  if (A.score >= 65 && S.score >= 60) careers.push('艺术治疗师', '创意总监', '品牌策划')
  if (S.score >= 65 && E.score >= 60) careers.push('人力资源总监', '培训发展专家', '学校校长')
  if (E.score >= 65 && C.score >= 60) careers.push('首席执行官', '投资银行家', '管理咨询合伙人')
  if (C.score >= 65 && R.score >= 60) careers.push('财务总监', '精算师', '质量管理工程师')

  if (R.score >= 70) careers.push('航空航天工程师', '外科医生', '高级技师')
  if (I.score >= 70) careers.push('理论物理学家', '人工智能研究员', '哲学教授')
  if (A.score >= 70) careers.push('当代艺术家', '电影导演', '文学作家')
  if (S.score >= 70) careers.push('临床心理学家', '社会工作者', '公益组织创始人')
  if (E.score >= 70) careers.push('创业公司创始人', '风险投资家', '政治领袖')
  if (C.score >= 70) careers.push('审计合伙人', '税务专家', '系统架构师')

  const balancedScore = Math.max(...dimensionResults.map(d => d.score)) - Math.min(...dimensionResults.map(d => d.score))
  if (balancedScore < 30) careers.push('跨职能管理', '产品经理', '综合管理岗')

  return careers.filter((item, index) => careers.indexOf(item) === index).slice(0, 10)
}

function calculateProfileConsistency(scores: HollandScores): number {
  const hexagonDistance: Record<string, number> = {
    'RC': 1, 'CR': 1, 'RI': 2, 'IR': 2, 'RA': 3, 'AR': 3, 'RS': 4, 'SR': 4, 'RE': 5, 'ER': 5,
    'IE': 1, 'EI': 1, 'IC': 2, 'CI': 2, 'IS': 5, 'SI': 5, 'IA': 5, 'AI': 5,
    'AS': 1, 'SA': 1, 'AE': 2, 'EA': 2, 'AC': 5, 'CA': 5,
    'SE': 1, 'ES': 1, 'SC': 4, 'CS': 4,
    'EC': 2, 'CE': 2,
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [first, second] = sorted.slice(0, 2)
  const key = first[0] + second[0]
  const distance = hexagonDistance[key] || 3

  return Math.round((1 - distance / 6) * 100)
}

function calculateReliability(answers: HollandAnswer[], questions: HollandQuestion[]): number {
  const validQuestions = questions.filter(q =>
    answers.some(a => a.questionId === q.id) && q.meta
  )

  if (validQuestions.length < 15) return 0.7

  const avgDiscrimination = validQuestions.reduce((sum, q) => sum + q.meta.discrimination, 0) / validQuestions.length
  const consistencyScore = calculateResponseConsistency(answers)

  return Math.min(0.95, 0.72 + avgDiscrimination * 0.15 + consistencyScore * 0.08)
}

function calculateResponseConsistency(answers: HollandAnswer[]): number {
  if (answers.length < 15) return 0.5

  const values = answers.map(a => a.value)
  const extremeResponses = values.filter(v => v === 1 || v === 7).length / values.length
  const sameResponse = Math.max(...[1, 2, 3, 4, 5, 6, 7].map(v => values.filter(x => x === v).length)) / values.length

  if (extremeResponses > 0.8 || sameResponse > 0.7) return 0
  if (extremeResponses > 0.6 || sameResponse > 0.5) return 0.3
  return 0.7
}

function buildComprehensiveResult(
  rawScores: HollandScores,
  dimensionResults: HollandDimensionResult[],
  topThree: string[],
  careerProfile: ReturnType<typeof determineCareerProfile>,
  consistency: number,
  reliability: number
): AssessmentResult {
  const strengths = generateDynamicStrengths(dimensionResults)
  const developmentAreas = generateDynamicDevelopmentAreas(dimensionResults)
  const careers = generateSpecificCareerRecommendations(dimensionResults)

  const dimensions: Dimension[] = dimensionResults.map(dr => ({
    name: dr.typeName,
    score: dr.score,
    maxScore: 100,
    percentile: dr.percentile,
    description: dr.bandDescription,
    band: dr.band,
    zScore: dr.zScore,
    clarity: dr.clarity,
    subDimensions: Object.entries(dr.facetScores).map(([name, score]) => ({ name, score })),
  }))

  const differentiation = Math.max(...Object.values(rawScores)) - Math.min(...Object.values(rawScores))

  return {
    type: 'Holland',
    typeName: '霍兰德职业兴趣专业测评',
    typeCode: careerProfile.code,
    archetype: careerProfile.archetype,
    title: `${careerProfile.name} - ${careerProfile.code}职业代码`,
    summary: careerProfile.description,
    dimensions,
    overallScore: Math.round(Object.values(rawScores).reduce((s, v) => s + v, 0) / 6),
    topThreeTypes: topThree,
    hollandCode: careerProfile.code,
    strengths,
    areasForGrowth: developmentAreas,
    careerRecommendations: careers,
    profileConsistency: consistency,
    profileDifferentiation: Math.round(differentiation),
    reliability: Number(reliability.toFixed(2)),
    standardError: Number((15 * Math.sqrt(1 - reliability)).toFixed(2)),
    uniquenessIndex: calculateUniquenessIndex(rawScores),
    interpretiveNotes: generateInterpretiveNotes(dimensionResults, reliability, consistency, differentiation),
    references: hollandReferences,
  }
}

function calculateUniquenessIndex(scores: HollandScores): number {
  const sorted = Object.values(scores).sort((a, b) => b - a)
  const gaps: number[] = []
  for (let i = 0; i < sorted.length - 1; i++) {
    gaps.push(sorted[i] - sorted[i + 1])
  }
  const meanGap = gaps.reduce((s, g) => s + g, 0) / gaps.length
  return Math.min(99, Math.round(meanGap * 2.5 + 30))
}

function generateInterpretiveNotes(
  dimensionResults: HollandDimensionResult[],
  reliability: number,
  consistency: number,
  differentiation: number
): string[] {
  const notes: string[] = []

  if (differentiation >= 50) {
    notes.push('您的职业兴趣分化非常清晰，职业方向明确，这是职业成熟度的标志')
  } else if (differentiation <= 20) {
    notes.push('您的职业兴趣相对平坦，建议进行更多职业探索和实践体验')
  }

  if (consistency >= 80) {
    notes.push('您的霍兰德代码一致性极佳，兴趣与六边形理论高度吻合')
  } else if (consistency <= 40) {
    notes.push('您的职业兴趣组合相对独特，跨领域工作可能更适合您')
  }

  const [R, I, A, S, E, C] = dimensionResults
  if (E.score >= 70 && C.score >= 70) {
    notes.push('您同时具备高企业型和高常规型特征，非常适合走管理晋升路线')
  }
  if (S.score >= 70 && A.score >= 70) {
    notes.push('您的社会型与艺术型双高，助人+创意的结合在教育和咨询领域极具优势')
  }
  if (I.score >= 70 && R.score <= 30) {
    notes.push('您是纯研究型而非技术实操型，偏向理论科学而非应用工程')
  }

  if (reliability < 0.7) {
    notes.push('本次测评作答一致性一般，建议在安静专注的环境下重新作答')
  }

  return notes
}





