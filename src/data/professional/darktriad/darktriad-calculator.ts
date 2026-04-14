import {
  DARKTRIAD_DIMENSIONS,
  DARKTRIAD_DIMENSION_NAMES,
  DARKTRIAD_DIMENSION_FULL_NAMES,
  DARKTRIAD_DIMENSION_DESCRIPTIONS,
  DARKTRIAD_DIMENSION_BANDS,
  DARKTRIAD_FACETS,
  DARK_PROFILES,
  darkTriadNormData,
  darkTriadReferences,
  type DarkTriadQuestion,
  type DarkTriadDimension,
} from './darktriad-common'
import type { AssessmentResult, Dimension } from '../../../types'

export interface DarkTriadAnswer {
  questionId: string
  value: number
}

export interface DarkTriadScores {
  machiavellianism: number
  narcissism: number
  psychopathy: number
  sadism: number
}

export interface DarkTriadDimensionResult {
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
  facetScores: Record<string, number>
}

export function calculateProfessionalDarkTriad(
  answers: DarkTriadAnswer[],
  questions: DarkTriadQuestion[]
): AssessmentResult {
  const rawScores = calculateWeightedRawScores(answers, questions)
  const dimensionResults = processEachDimension(rawScores, answers, questions)
  const darkProfile = determineDarkProfile(dimensionResults)
  const darkIndex = calculateDarkIndex(rawScores)
  const reliability = calculateReliability(answers, questions)

  return buildComprehensiveResult(rawScores, dimensionResults, darkProfile, darkIndex, reliability)
}

function calculateWeightedRawScores(
  answers: DarkTriadAnswer[],
  questions: DarkTriadQuestion[]
): DarkTriadScores {
  const scores: DarkTriadScores = { machiavellianism: 0, narcissism: 0, psychopathy: 0, sadism: 0 }
  const weightSums: Record<string, number> = { machiavellianism: 0, narcissism: 0, psychopathy: 0, sadism: 0 }

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta) return

    const dimension = question.meta.dimension
    const discrimination = question.meta.discrimination || 0.5
    const factorLoading = question.meta.factorLoading || 0.6
    const weight = discrimination * factorLoading * 1.5

    let adjustedValue = answer.value
    if (question.meta.reverseScored) {
      adjustedValue = 6 - answer.value
    }

    const socialDesirability = question.meta.socialDesirability || 0.5
    const sdCorrection = 1 + Math.abs(0.5 - socialDesirability) * 0.3
    const weightedValue = ((adjustedValue - 1) / 4) * 100 * weight * sdCorrection

    scores[dimension] += weightedValue
    weightSums[dimension] += weight
  })

  Object.keys(scores).forEach(key => {
    const dimension = key as DarkTriadDimension
    if (weightSums[dimension] > 0) {
      scores[dimension] = scores[dimension] / weightSums[dimension]
    }
    scores[dimension] = Math.max(0, Math.min(100, scores[dimension]))
  })

  return scores
}

function processEachDimension(
  scores: DarkTriadScores,
  answers: DarkTriadAnswer[],
  questions: DarkTriadQuestion[]
): DarkTriadDimensionResult[] {
  return DARKTRIAD_DIMENSIONS.map(dimension => {
    const finalScore = Math.max(0, Math.min(100, scores[dimension]))

    const norm = darkTriadNormData[dimension as keyof typeof darkTriadNormData]
    const zScore = (finalScore - norm.mean) / norm.sd
    const percentile = Math.round(50 + zScore * 16)
    const finalPercentile = Math.max(1, Math.min(99, percentile))

    const bands = DARKTRIAD_DIMENSION_BANDS[dimension as keyof typeof DARKTRIAD_DIMENSION_BANDS]
    const band = bands.find(b => finalScore >= b.range[0] && finalScore <= b.range[1]) || bands[5]

    const facetScores = calculateFacetScores(dimension, answers, questions)
    const clarity = Math.abs(finalScore - 50) * 2

    return {
      dimension,
      dimensionName: DARKTRIAD_DIMENSION_NAMES[dimension],
      description: DARKTRIAD_DIMENSION_DESCRIPTIONS[dimension],
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
  dimension: string,
  answers: DarkTriadAnswer[],
  questions: DarkTriadQuestion[]
): Record<string, number> {
  const facetScores: Record<string, number> = {}
  const facetCounts: Record<string, number> = {}

  DARKTRIAD_FACETS[dimension as keyof typeof DARKTRIAD_FACETS].forEach(facet => {
    facetScores[facet] = 0
    facetCounts[facet] = 0
  })

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta || question.meta.dimension !== dimension) return

    const facet = question.meta.facet
    if (facet && Object.prototype.hasOwnProperty.call(facetScores, facet)) {
      let adjustedValue = answer.value
      if (question.meta.reverseScored) adjustedValue = 6 - answer.value
      facetScores[facet] += ((adjustedValue - 1) / 4) * 100
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

function determineDarkProfile(dimensionResults: DarkTriadDimensionResult[]): {
  code: string
  name: string
  description: string
  archetype: string
  danger: string
} {
  const profileCode = dimensionResults
    .sort((a, b) => b.score - a.score)
    .map(dr => dr.score >= 60 ? 'H' : dr.score <= 40 ? 'L' : 'M')
    .join('')

  const simpleCode = dimensionResults.map(dr => dr.score >= 60 ? 'H' : 'L').join('')
  const matchingProfile = DARK_PROFILES[simpleCode]

  if (matchingProfile) {
    return { code: profileCode, ...matchingProfile }
  }

  const highTraits = dimensionResults.filter(d => d.score >= 60).map(d => DARKTRIAD_DIMENSION_NAMES[d.dimension])
  const lowTraits = dimensionResults.filter(d => d.score <= 40).map(d => DARKTRIAD_DIMENSION_NAMES[d.dimension])

  let description = '您的黑暗人格特征相对平衡'
  let archetype = '普通人'
  let danger = '无风险'

  if (highTraits.length >= 2) {
    description = `您在${highTraits.join('、')}方面具有明显的黑暗人格特征`
    archetype = '策略家'
    danger = '中低风险'
  } else if (highTraits.length === 1) {
    description = `您在${highTraits[0]}方面有一定的黑暗人格倾向`
    archetype = '现实主义者'
    danger = '低风险'
  } else if (lowTraits.length >= 3) {
    description = '您几乎没有黑暗人格特征，是非常善良的人'
    archetype = '纯良者'
    danger = '无风险'
  }

  return {
    code: profileCode,
    name: `黑暗人格画像 - ${profileCode}`,
    description,
    archetype,
    danger,
  }
}

function generateDynamicStrengths(dimensionResults: DarkTriadDimensionResult[]): string[] {
  const strengths: string[] = []
  const [M, N, P, S] = dimensionResults

  if (M.score >= 60 && M.score < 80) {
    strengths.push('优秀的战略思维和政治智慧，擅长在复杂环境中达成目标')
  }
  if (N.score >= 60 && N.score < 80) {
    strengths.push('强大的自信心和个人魅力，善于自我营销和争取资源')
  }
  if (P.score >= 60 && P.score < 80) {
    strengths.push('高度的理性决策能力，做决定不受情绪干扰')
  }
  if (S.score >= 60 && S.score < 80) {
    strengths.push('强大的支配能力，善于掌控局面和推动结果')
  }

  if (M.score <= 40) strengths.push('真诚正直，建立信任关系的能力很强')
  if (N.score <= 40) strengths.push('谦逊低调，能与团队和谐共事')
  if (P.score <= 40) strengths.push('同理心强，能真正关怀和理解他人')
  if (S.score <= 40) strengths.push('友善平和，善于营造和谐氛围')

  if (M.score >= 50 && M.score < 65 && P.score >= 50 && P.score < 65) {
    strengths.push('平衡的实用主义与情感，既有手腕又有温度')
  }

  const allScores = dimensionResults.map(d => d.score)
  const balanced = allScores.filter(s => s >= 40 && s <= 65).length
  if (balanced >= 3) {
    strengths.push('人格非常平衡，既能保护自己又不伤害他人')
  }

  return strengths.filter((item, index) => strengths.indexOf(item) === index).slice(0, 6)
}

function generateDynamicCaveats(dimensionResults: DarkTriadDimensionResult[]): string[] {
  const caveats: string[] = []
  const [M, N, P, S] = dimensionResults

  if (M.score >= 80) {
    caveats.push('极端权谋倾向：可能为了目标牺牲重要的人际关系和道德底线')
  } else if (M.score >= 65) {
    caveats.push('注意不要过度操纵，真诚才是长期关系的基础')
  }

  if (N.score >= 80) {
    caveats.push('极端自恋：可能严重缺乏共情，把所有人都当成满足自己的工具')
  } else if (N.score >= 65) {
    caveats.push('注意自我膨胀，多倾听和真正尊重他人')
  }

  if (P.score >= 80) {
    caveats.push('极度冷酷：您可能完全感受不到他人的痛苦，建议寻求专业评估')
  } else if (P.score >= 65) {
    caveats.push('注意情感隔离，尝试建立更深层次的情感连接')
  }

  if (S.score >= 80) {
    caveats.push('极端施虐：以他人痛苦为乐是严重的心理问题，请立即寻求专业帮助')
  } else if (S.score >= 65) {
    caveats.push('注意攻击性表达，找到健康的方式释放支配欲')
  }

  const highCount = dimensionResults.filter(d => d.score >= 70).length
  if (highCount >= 3) {
    caveats.push('您的黑暗人格得分非常高，在人际关系中请特别注意分寸')
  }

  if (M.score <= 20) caveats.push('过度单纯，在职场和复杂环境中容易被利用')
  if (P.score <= 20) caveats.push('过度共情，可能形成讨好型人格并 burnout')

  return caveats.filter((item, index) => caveats.indexOf(item) === index).slice(0, 5)
}

function generateLifeStrategies(dimensionResults: DarkTriadDimensionResult[]): string[] {
  const strategies: string[] = []
  const [M, N, P, S] = dimensionResults

  if (M.score >= 60) strategies.push('适合需要政治智慧的职业：管理、谈判、战略、投资')
  if (N.score >= 60) strategies.push('适合需要存在感的职业：表演、销售、创业、领导岗位')
  if (P.score >= 60) strategies.push('适合高压决策的职业：外科医生、特种部队、危机处理')
  if (S.score >= 60) strategies.push('适合需要竞争的职业：竞技体育、诉讼律师、激进投资')

  if (M.score <= 40) strategies.push('选择道德价值观清晰的组织和团队')
  if (N.score <= 40) strategies.push('发挥协作优势，做幕后英雄型角色')
  if (P.score <= 40) strategies.push('助人行业非常适合您：医疗、教育、社工')
  if (S.score <= 40) strategies.push('合作型而非竞争型的工作环境更能让您发挥')

  if (M.score >= 60 && P.score >= 60 && S.score >= 60) {
    strategies.push('警告：您的人格组合有较高风险伤害他人，请主动设置行为红线')
  }

  if (M.score >= 60 && N.score >= 60 && P.score >= 60) {
    strategies.push('经典黑暗三角组合，权力是您的春药，也是您的毒药')
  }

  if (M.score <= 40 && N.score <= 40 && P.score <= 40 && S.score <= 40) {
    strategies.push('纯良人格是稀有的礼物，保护好自己也保护好这份珍贵')
  }

  return strategies.filter((item, index) => strategies.indexOf(item) === index).slice(0, 6)
}

function calculateDarkIndex(scores: DarkTriadScores): number {
  const weighted = {
    psychopathy: scores.psychopathy * 1.5,
    sadism: scores.sadism * 1.3,
    machiavellianism: scores.machiavellianism * 1.1,
    narcissism: scores.narcissism * 1.0,
  }
  return Math.min(100, Math.round(
    (weighted.psychopathy + weighted.sadism + weighted.machiavellianism + weighted.narcissism) / 4.9
  ))
}

function calculateReliability(answers: DarkTriadAnswer[], questions: DarkTriadQuestion[]): number {
  const validQuestions = questions.filter(q =>
    answers.some(a => a.questionId === q.id) && q.meta
  )

  if (validQuestions.length < 12) return 0.65

  const avgFactorLoading = validQuestions.reduce((sum, q) => sum + q.meta.factorLoading, 0) / validQuestions.length
  const consistencyScore = calculateResponseConsistency(answers)

  return Math.min(0.96, 0.70 + avgFactorLoading * 0.15 + consistencyScore * 0.1)
}

function calculateResponseConsistency(answers: DarkTriadAnswer[]): number {
  if (answers.length < 12) return 0.5

  const values = answers.map(a => a.value)
  const sociallyDesirable = values.filter(v => v === 1).length / values.length
  const extremeDark = values.filter(v => v === 5).length / values.length

  if (sociallyDesirable > 0.8) return 0.1
  if (extremeDark > 0.7) return 0.3
  return 0.75
}

function buildComprehensiveResult(
  rawScores: DarkTriadScores,
  dimensionResults: DarkTriadDimensionResult[],
  darkProfile: ReturnType<typeof determineDarkProfile>,
  darkIndex: number,
  reliability: number
): AssessmentResult {
  const strengths = generateDynamicStrengths(dimensionResults)
  const caveats = generateDynamicCaveats(dimensionResults)
  const strategies = generateLifeStrategies(dimensionResults)

  const dimensions: Dimension[] = dimensionResults.map(dr => ({
    name: dr.dimensionName,
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
    type: 'DarkTriad',
    typeName: '黑暗人格四元专业测评',
    typeCode: darkProfile.code,
    archetype: darkProfile.archetype,
    title: `${darkProfile.name} - ${darkProfile.danger}`,
    summary: darkProfile.description,
    dimensions,
    overallScore: darkIndex,
    darkIndex,
    dangerLevel: darkProfile.danger,
    topDarkTraits: dimensionResults.sort((a, b) => b.score - a.score).slice(0, 2).map(d => d.dimensionName),
    strengths,
    areasForGrowth: caveats,
    lifeStrategies: strategies,
    reliability: Number(reliability.toFixed(2)),
    standardError: Number((15 * Math.sqrt(1 - reliability)).toFixed(2)),
    manipulationResistanceIndex: Math.round((100 - rawScores.machiavellianism) * 0.7 + 30),
    interpretiveNotes: generateInterpretiveNotes(dimensionResults, darkIndex, reliability),
    references: darkTriadReferences,
  }
}

function generateInterpretiveNotes(
  dimensionResults: DarkTriadDimensionResult[],
  darkIndex: number,
  reliability: number
): string[] {
  const notes: string[] = []

  if (darkIndex >= 80) {
    notes.push('您的黑暗人格指数属于人群中最高的1%，这既是巨大的力量也是巨大的诅咒')
  } else if (darkIndex >= 65) {
    notes.push('您的黑暗人格指数显著高于平均，您比大多数人更现实也更冷酷')
  } else if (darkIndex <= 25) {
    notes.push('您的黑暗人格指数属于人群中最低的5%，这个世界需要更多像您这样善良的人')
  }

  const [M, N, P, S] = dimensionResults
  if (M.score >= 70 && P.score <= 40) {
    notes.push('高权谋+低冷酷是"理性马基雅维利"，只做对的事，不会为了伤害而伤害')
  }
  if (N.score >= 70 && P.score <= 40) {
    notes.push('高自恋+低冷酷是"良性自恋"，追求卓越但不会践踏他人')
  }
  if (P.score >= 70 && S.score <= 40) {
    notes.push('高精神病态+低施虐是"成功精神病态"，见于很多顶级CEO和特种部队')
  }
  if (S.score >= 70) {
    notes.push('施虐倾向是黑暗人格中最被低估的维度，您需要特别注意管理这份能量')
  }

  if (reliability < 0.65) {
    notes.push('作答一致性一般，黑暗特质测量容易受到社会期望偏差影响')
  }

  return notes
}


export const calculateDarkTriadProfessional = calculateProfessionalDarkTriad




