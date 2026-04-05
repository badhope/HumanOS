import type { Answer, ProfessionalAssessmentResult, SubscaleScore } from '../types'
import {
  calculateRawScore,
  rawToTScore,
  calculatePercentile,
  interpretScoreLevel,
  createSubscaleScore,
  createRiskAssessment,
  generateProfessionalResult,
  STANDARD_NORMS,
} from './professionalScoring'
import {
  enhanceResultDifferentiation,
  validateResultDifferentiation,
} from './resultDifferentiation'
import {
  calculateTScore,
  calculateZScore,
  calculatePercentileFromTScore,
  getScoreRange,
  calculateConfidenceInterval,
  calculateDimensionBalance,
  SCORE_RANGES,
  MATH_CONSTANTS,
  MBTI_MATH_SYSTEM,
  BIGFIVE_MATH_SYSTEM,
  SAS_MATH_SYSTEM,
  EQ_MATH_SYSTEM,
  HOLLAND_MATH_SYSTEM,
  ATTACHMENT_MATH_SYSTEM,
} from './mathSystem'
import { mbtiPersonalities } from '../data/mbti-data'
import { bigFiveSubscaleNames } from '../data/professional/bigfive-professional'
import { sasInterpretation, calculateSASIndex, interpretSASScore } from '../data/professional/sas-professional'
import { eqSubscaleNames, eqDimensions } from '../data/professional/eq-professional'
import { hollandTypes, calculateHollandCode } from '../data/professional/holland-professional'
import { attachmentStyles, determineAttachmentStyle } from '../data/professional/attachment-professional'
import { kolbLearningStyles } from '../data/professional/other-professional'

// ==================== MBTI 专业计分 ====================
/**
 * MBTI专业计分算法
 * 
 * 计算公式：
 * 1. 原始分数：E_score = Σ(E选项value), I_score = Σ(I选项value)
 * 2. 偏好强度：Clarity = |E - I| / (E + I) × 100
 * 3. 维度确定：选择得分较高的特质
 * 4. 类型组合：组合四个维度的偏好
 */
export function calculateMBTIProfessional(answers: Answer[]): ProfessionalAssessmentResult {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  const answerDetails: Array<{ questionId: string; trait: string; value: number }> = []
  
  answers.forEach((answer) => {
    if (answer.trait && answer.value) {
      scores[answer.trait as keyof typeof scores] += answer.value
      answerDetails.push({
        questionId: answer.questionId,
        trait: answer.trait,
        value: answer.value,
      })
    }
  })

  const eScore = scores.E
  const iScore = scores.I
  const sScore = scores.S
  const nScore = scores.N
  const tScore = scores.T
  const fScore = scores.F
  const jScore = scores.J
  const pScore = scores.P

  const type = [
    eScore >= iScore ? 'E' : 'I',
    sScore >= nScore ? 'S' : 'N',
    tScore >= fScore ? 'T' : 'F',
    jScore >= pScore ? 'J' : 'P',
  ].join('')

  const personality = mbtiPersonalities[type] || mbtiPersonalities.INTJ

  const eiClarity = calculatePreferenceClarity(eScore, iScore)
  const snClarity = calculatePreferenceClarity(sScore, nScore)
  const tfClarity = calculatePreferenceClarity(tScore, fScore)
  const jpClarity = calculatePreferenceClarity(jScore, pScore)

  const overallClarity = Math.round((eiClarity + snClarity + tfClarity + jpClarity) / 4)

  const dimensions = [
    { 
      name: '外向(E)', 
      score: eScore, 
      maxScore: 48, 
      description: getClarityDescription(eiClarity, 'E', 'I', eScore >= iScore),
      clarity: eiClarity,
    },
    { 
      name: '感觉(S)', 
      score: sScore, 
      maxScore: 48, 
      description: getClarityDescription(snClarity, 'S', 'N', sScore >= nScore),
      clarity: snClarity,
    },
    { 
      name: '思考(T)', 
      score: tScore, 
      maxScore: 48, 
      description: getClarityDescription(tfClarity, 'T', 'F', tScore >= fScore),
      clarity: tfClarity,
    },
    { 
      name: '判断(J)', 
      score: jScore, 
      maxScore: 42, 
      description: getClarityDescription(jpClarity, 'J', 'P', jScore >= pScore),
      clarity: jpClarity,
    },
  ]

  const subscaleScores: Record<string, SubscaleScore> = {
    EI: createMBTISubscaleScore(eScore, iScore, 'EI'),
    SN: createMBTISubscaleScore(sScore, nScore, 'SN'),
    TF: createMBTISubscaleScore(tScore, fScore, 'TF'),
    JP: createMBTISubscaleScore(jScore, pScore, 'JP'),
  }

  const scoreRange = getScoreRange(overallClarity)

  return generateProfessionalResult(
    {
      type: 'mbti-professional',
      title: `${type} - ${personality.title}`,
      description: personality.description,
      score: overallClarity,
      accuracy: calculateAccuracy(answers.length, 93),
      dimensions,
      strengths: personality.strengths,
      weaknesses: personality.weaknesses,
      careers: personality.careers,
      cognitiveFunctions: personality.cognitiveFunctions,
      relationships: personality.relationships,
      learning: personality.learning,
      suggestions: personality.growth,
      subscaleScores,
      profileAnalysis: {
        type,
        clarity: {
          overall: overallClarity,
          level: scoreRange.level,
          description: scoreRange.description,
        },
        dimensions: {
          EI: { preference: eScore >= iScore ? 'E' : 'I', clarity: eiClarity, scores: { E: eScore, I: iScore } },
          SN: { preference: sScore >= nScore ? 'S' : 'N', clarity: snClarity, scores: { S: sScore, N: nScore } },
          TF: { preference: tScore >= fScore ? 'T' : 'F', clarity: tfClarity, scores: { T: tScore, F: fScore } },
          JP: { preference: jScore >= pScore ? 'J' : 'P', clarity: jpClarity, scores: { J: jScore, P: pScore } },
        },
        answerDetails,
      },
      references: [
        'Myers, I. B., McCaulley, M. H., Quenk, N. L., & Hammer, A. L. (1998). MBTI Manual. Consulting Psychologists Press.',
        'Quenk, N. L. (2000). Essentials of Myers-Briggs Type Indicator assessment. John Wiley & Sons.',
      ],
    },
    'professional'
  )
}

function calculatePreferenceClarity(scoreA: number, scoreB: number): number {
  const total = scoreA + scoreB
  if (total === 0) return 0
  return Math.round(Math.abs(scoreA - scoreB) / total * 100)
}

function getClarityDescription(clarity: number, traitA: string, traitB: string, prefersA: boolean): string {
  const preference = prefersA ? traitA : traitB
  const level = MBTI_MATH_SYSTEM.clarityIndex.levels.find(
    l => clarity >= l.range[0] && clarity <= l.range[1]
  )
  return `偏好${preference}，清晰度${clarity}% (${level?.description || '中等'})`
}

function createMBTISubscaleScore(scoreA: number, scoreB: number, dimension: string): SubscaleScore {
  const total = scoreA + scoreB
  const clarity = calculatePreferenceClarity(scoreA, scoreB)
  const range = getScoreRange(clarity)
  
  return {
    rawScore: Math.max(scoreA, scoreB),
    maxScore: total,
    standardScore: clarity,
    percentile: calculatePercentileFromTScore(50 + clarity / 2),
    level: range.level as SubscaleScore['level'],
    interpretation: range.interpretation,
  }
}

// ==================== 大五人格专业计分 ====================
/**
 * 大五人格专业计分算法
 * 
 * 计算公式：
 * 1. 子量表原始分：SubscaleScore = Σ(AnswerValues)，反向计分题需转换
 * 2. 维度分数：DomainScore = Σ(SubscaleScores) / 6
 * 3. T分数：T = 50 + 10 × (DomainScore - Mean) / SD
 * 4. 百分位数：Percentile = Φ(T) × 100
 */
export function calculateBigFiveProfessional(answers: Answer[]): ProfessionalAssessmentResult {
  const subscaleItems: Record<string, string[]> = {
    N1: [], N2: [], N3: [], N4: [], N5: [], N6: [],
    E1: [], E2: [], E3: [], E4: [], E5: [], E6: [],
    O1: [], O2: [], O3: [], O4: [], O5: [], O6: [],
    A1: [], A2: [], A3: [], A4: [], A5: [], A6: [],
    C1: [], C2: [], C3: [], C4: [], C5: [], C6: [],
  }

  const reverseItems: string[] = []

  answers.forEach((answer) => {
    const subscale = answer.dimension || answer.trait
    if (subscale && subscaleItems[subscale]) {
      subscaleItems[subscale].push(answer.questionId)
    }
  })

  const subscaleScores: Record<string, SubscaleScore> = {}
  const domainScores: Record<string, number> = { N: 0, E: 0, O: 0, A: 0, C: 0 }
  const domainCounts: Record<string, number> = { N: 0, E: 0, O: 0, A: 0, C: 0 }
  const domainRawScores: Record<string, number[]> = { N: [], E: [], O: [], A: [], C: [] }

  Object.entries(subscaleItems).forEach(([subscale, items]) => {
    const rawScore = calculateRawScore(answers, items, reverseItems.filter((i) => items.includes(i)), 5)
    const maxScore = items.length * 5
    const domain = subscale[0]
    
    domainScores[domain] += rawScore
    domainCounts[domain] += items.length
    domainRawScores[domain].push(rawScore)

    const avgScore = rawScore / items.length
    const tScore = calculateTScore(avgScore, 3, 1)
    const percentile = calculatePercentileFromTScore(tScore)
    const range = getScoreRange(tScore)

    subscaleScores[subscale] = {
      rawScore,
      maxScore,
      standardScore: tScore,
      percentile,
      level: range.level as SubscaleScore['level'],
      interpretation: range.interpretation,
    }
  })

  const dimensions = Object.entries(domainScores).map(([domain, score]) => {
    const avgScore = score / domainCounts[domain]
    const tScore = calculateTScore(avgScore, 3, 1)
    const percentile = calculatePercentileFromTScore(tScore)
    const range = getScoreRange(tScore)
    
    return {
      name: getDomainName(domain),
      score: Math.round(percentile),
      maxScore: 100,
      tScore,
      description: getDomainDescription(domain, avgScore),
      level: range.level,
    }
  })

  const balanceAnalysis = calculateDimensionBalance(dimensions.map(d => d.score))

  const profileAnalysis: Record<string, any> = {}
  Object.entries(subscaleScores).forEach(([subscale, data]) => {
    profileAnalysis[subscale] = {
      score: data.rawScore,
      percentile: data.percentile,
      level: data.level,
      description: `${bigFiveSubscaleNames[subscale] || subscale}: ${data.interpretation}`,
    }
  })

  return generateProfessionalResult(
    {
      type: 'bigfive-professional',
      title: '大五人格专业评估报告',
      description: '基于NEO-PI-R模型的全面人格评估',
      score: 0,
      accuracy: calculateAccuracy(answers.length, 240),
      dimensions,
      strengths: dimensions.filter((d) => d.score >= 70).map((d) => d.name),
      weaknesses: dimensions.filter((d) => d.score < 40).map((d) => d.name),
      careers: getRecommendedCareers(domainScores),
      subscaleScores,
      profileAnalysis: {
        ...profileAnalysis,
        balance: balanceAnalysis,
        formula: BIGFIVE_MATH_SYSTEM.scoringFormula,
      },
      references: [
        'Costa, P. T., & McCrae, R. R. (1992). NEO PI-R professional manual. Psychological Assessment Resources.',
        'McCrae, R. R., & Costa, P. T. (2003). Personality in adulthood. Guilford Press.',
      ],
    },
    'professional'
  )
}

function getDomainName(domain: string): string {
  const names: Record<string, string> = {
    N: '神经质',
    E: '外向性',
    O: '开放性',
    A: '宜人性',
    C: '尽责性',
  }
  return names[domain] || domain
}

function getDomainDescription(domain: string, avgScore: number): string {
  const level = avgScore >= 4 ? '高' : avgScore >= 3 ? '中等偏高' : avgScore >= 2 ? '中等偏低' : '低'
  const descriptions: Record<string, string> = {
    N: `神经质水平${level}，${avgScore >= 3 ? '情绪波动较大，容易焦虑和担忧' : '情绪稳定，能够有效应对压力'}`,
    E: `外向性水平${level}，${avgScore >= 3 ? '善于社交，精力充沛' : '偏好独处，安静内敛'}`,
    O: `开放性水平${level}，${avgScore >= 3 ? '好奇心强，富有创造力' : '务实稳重，偏好传统'}`,
    A: `宜人性水平${level}，${avgScore >= 3 ? '善良合作，乐于助人' : '独立竞争，注重自我'}`,
    C: `尽责性水平${level}，${avgScore >= 3 ? '自律有序，追求成就' : '灵活随性，享受当下'}`,
  }
  return descriptions[domain] || ''
}

function getRecommendedCareers(scores: Record<string, number>): string[] {
  const careers: string[] = []
  if (scores.C >= 100) careers.push('管理岗位', '项目管理')
  if (scores.E >= 100) careers.push('销售', '公关', '培训')
  if (scores.O >= 100) careers.push('创意设计', '研发', '艺术')
  if (scores.A >= 100) careers.push('教育', '医疗', '社会工作')
  return careers.length > 0 ? careers : ['根据个人兴趣选择']
}

// ==================== SAS 焦虑量表专业计分 ====================
/**
 * SAS焦虑量表专业计分算法
 * 
 * 计算公式：
 * 1. 原始分：RawScore = Σ(Score_i)，反向计分题 Score_i = 5 - Value_i
 * 2. 指数分：IndexScore = RawScore × 1.25
 * 3. 严重程度：<45正常，45-59轻度，60-74中度，≥75重度
 */
export function calculateSASProfessional(answers: Answer[]): ProfessionalAssessmentResult {
  const reverseItems = ['sas-5', 'sas-9', 'sas-13', 'sas-17', 'sas-19']
  
  let rawScore = 0
  const itemScores: number[] = []
  
  answers.forEach((answer) => {
    let value = answer.value || 0
    if (reverseItems.includes(answer.questionId)) {
      value = 5 - value
    }
    rawScore += value
    itemScores.push(value)
  })

  const indexScore = calculateSASIndex(rawScore)
  const interpretation = interpretSASScore(indexScore)

  const severityLevel = SAS_MATH_SYSTEM.severityLevels.find(
    l => indexScore >= l.indexRange[0] && indexScore <= l.indexRange[1]
  )

  const tScore = calculateTScore(rawScore, 40, 10)
  const percentile = calculatePercentileFromTScore(tScore)

  const subscaleScores: Record<string, SubscaleScore> = {
    anxiety: {
      rawScore,
      maxScore: 80,
      standardScore: indexScore,
      percentile,
      level: getSeverityLevel(indexScore),
      interpretation: interpretation.description,
    },
  }

  const riskAssessment = createRiskAssessment(
    { anxiety: indexScore },
    { anxiety: { warning: 45, critical: 60 } }
  )

  const confidenceInterval = calculateConfidenceInterval(indexScore, 10, answers.length, 0.95)

  return generateProfessionalResult(
    {
      type: 'sas-professional',
      title: `焦虑自评量表 - ${interpretation.level}`,
      description: interpretation.description,
      score: indexScore,
      accuracy: calculateAccuracy(answers.length, 20),
      dimensions: [
        { 
          name: '焦虑指数', 
          score: indexScore, 
          maxScore: 100, 
          description: interpretation.level,
          confidenceInterval,
        },
      ],
      strengths: indexScore < 45 ? ['焦虑水平正常'] : [],
      weaknesses: indexScore >= 45 ? ['焦虑水平偏高'] : [],
      careers: [],
      suggestions: [interpretation.recommendation],
      standardScore: indexScore,
      subscaleScores,
      riskAssessment,
      clinicalInterpretation: interpretation.description,
      interventionRecommendations: [interpretation.recommendation],
      profileAnalysis: {
        rawScore,
        indexScore,
        severityLevel: severityLevel?.level,
        itemScores,
        formula: SAS_MATH_SYSTEM.scoringFormula,
      },
      references: [
        'Zung, W. W. (1971). A rating instrument for anxiety disorders. Psychosomatics, 12(6), 371-379.',
        'Dunstan, D. A., & Scott, D. (2020). Norms for Zung\'s Self-rating Anxiety Scale. BMC Psychiatry.',
      ],
    },
    'professional'
  )
}

function getSeverityLevel(indexScore: number): SubscaleScore['level'] {
  if (indexScore < 45) return 'low'
  if (indexScore < 60) return 'average'
  if (indexScore < 75) return 'high'
  return 'very_high'
}

// ==================== EQ 情商专业计分 ====================
/**
 * EQ情商专业计分算法
 * 
 * 计算公式：
 * 1. 子量表分数：SubscaleScore = Σ(AnswerValues) / QuestionCount × 20
 * 2. 维度分数：DimensionScore = Σ(SubscaleScores) / SubscaleCount
 * 3. 总体EQ：TotalEQ = Σ(DimensionScores) / DimensionCount
 * 4. 百分位数：基于常模表查表
 */
export function calculateEQProfessional(answers: Answer[]): ProfessionalAssessmentResult {
  const subscaleScores: Record<string, SubscaleScore> = {}
  const dimensionScores: Record<string, number> = {}
  const dimensionCounts: Record<string, number> = {}
  const subscaleRawScores: Record<string, number[]> = {}

  answers.forEach((answer) => {
    const subscale = answer.dimension || answer.trait || 'general'
    const dimension = Object.entries(eqDimensions).find(([, data]) => 
      data.subscales.includes(subscale)
    )?.[0] || 'general'

    if (!subscaleRawScores[subscale]) {
      subscaleRawScores[subscale] = []
    }
    subscaleRawScores[subscale].push(answer.value || 0)

    dimensionScores[dimension] = (dimensionScores[dimension] || 0) + (answer.value || 0)
    dimensionCounts[dimension] = (dimensionCounts[dimension] || 0) + 5
  })

  Object.entries(subscaleRawScores).forEach(([subscale, scores]) => {
    const rawScore = scores.reduce((a, b) => a + b, 0)
    const maxScore = scores.length * 5
    const avgScore = rawScore / scores.length
    const tScore = calculateTScore(avgScore, 3, 1)
    const percentile = calculatePercentileFromTScore(tScore)
    const range = getScoreRange(tScore)

    subscaleScores[subscale] = {
      rawScore,
      maxScore,
      standardScore: tScore,
      percentile,
      level: range.level as SubscaleScore['level'],
      interpretation: range.interpretation,
    }
  })

  const totalScore = Object.values(dimensionScores).reduce((a, b) => a + b, 0)
  const totalMax = Object.values(dimensionCounts).reduce((a, b) => a + b, 0)
  const overallEQ = Math.round((totalScore / totalMax) * 100)

  const dimensions = Object.entries(eqDimensions).map(([key, data]) => {
    const avgScore = (dimensionScores[key] || 0) / ((dimensionCounts[key] || 1) / 5)
    const tScore = calculateTScore(avgScore, 3, 1)
    const percentile = calculatePercentileFromTScore(tScore)
    const range = getScoreRange(tScore)
    
    return {
      name: data.name,
      score: Math.round(percentile),
      maxScore: 100,
      tScore,
      description: data.description,
      level: range.level,
    }
  })

  const balanceAnalysis = calculateDimensionBalance(dimensions.map(d => d.score))
  const strengths = dimensions.filter(d => d.score >= EQ_MATH_SYSTEM.profileAnalysis.strengthThreshold)
  const developments = dimensions.filter(d => d.score < EQ_MATH_SYSTEM.profileAnalysis.developmentThreshold)

  return generateProfessionalResult(
    {
      type: 'eq-professional',
      title: `情商评估报告 - EQ ${overallEQ}`,
      description: `您的总体情商水平为${overallEQ >= 70 ? '优秀' : overallEQ >= 50 ? '良好' : '需要提升'}`,
      score: overallEQ,
      accuracy: calculateAccuracy(answers.length, 133),
      dimensions,
      strengths: strengths.map(d => d.name),
      weaknesses: developments.map(d => d.name),
      careers: [],
      subscaleScores,
      profileAnalysis: {
        overallEQ,
        balance: balanceAnalysis,
        strengths: strengths.map(d => ({ name: d.name, score: d.score })),
        developments: developments.map(d => ({ name: d.name, score: d.score })),
        formula: EQ_MATH_SYSTEM.scoringFormula,
      },
      references: [
        'Bar-On, R. (1997). BarOn Emotional Quotient Inventory (EQ-i). Multi-Health Systems.',
        'MHS (2011). EQ-i 2.0 Technical Manual. Multi-Health Systems.',
      ],
    },
    'professional'
  )
}

// ==================== 霍兰德专业计分 ====================
/**
 * 霍兰德职业兴趣专业计分算法
 * 
 * 计算公式：
 * 1. 类型分数：TypeScore = Σ(AnswerValues for each type)
 * 2. 主导类型：DominantTypes = Sort(TypeScores) DESC, take top 3
 * 3. 霍兰德代码：HollandCode = Concatenate(DominantTypeCodes)
 */
export function calculateHollandProfessional(answers: Answer[]): ProfessionalAssessmentResult {
  const scores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  const answerDetails: Array<{ questionId: string; type: string; value: number }> = []

  answers.forEach((answer) => {
    const subscale = answer.dimension || answer.trait || ''
    if (subscale && Object.prototype.hasOwnProperty.call(scores, subscale)) {
      scores[subscale] += answer.value || 0
      answerDetails.push({
        questionId: answer.questionId,
        type: subscale,
        value: answer.value || 0,
      })
    }
  })

  const hollandCode = calculateHollandCode(scores)
  const primaryType = hollandTypes[hollandCode[0]] || hollandTypes.R
  const secondaryType = hollandTypes[hollandCode[1]] || hollandTypes.I
  const tertiaryType = hollandTypes[hollandCode[2]] || hollandTypes.A

  const maxScore = 35
  const dimensions = Object.entries(scores).map(([code, score]) => {
    const percentile = Math.round((score / maxScore) * 100)
    const range = getScoreRange(percentile)
    
    return {
      name: `${code} - ${hollandTypes[code]?.name || code}`,
      score,
      maxScore,
      percentile,
      description: hollandTypes[code]?.description || '',
      level: range.level,
    }
  })

  const sortedTypes = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([code, score]) => ({ code, score, name: hollandTypes[code]?.name || code }))

  const consistency = calculateHollandConsistency(hollandCode)
  const differentiation = calculateHollandDifferentiation(scores)

  return generateProfessionalResult(
    {
      type: 'holland-professional',
      title: `霍兰德职业兴趣 - ${hollandCode}`,
      description: `您的职业兴趣代码为${hollandCode}，主要类型为${primaryType.name}`,
      score: 0,
      accuracy: calculateAccuracy(answers.length, 42),
      dimensions,
      strengths: [primaryType.name, secondaryType.name],
      weaknesses: [],
      careers: [...primaryType.careers, ...secondaryType.careers],
      hollandCode,
      primaryType: { code: hollandCode[0], title: primaryType.name, description: primaryType.description },
      secondaryType: { code: hollandCode[1], title: secondaryType.name, description: secondaryType.description },
      tertiaryType: { code: hollandCode[2], title: tertiaryType.name, description: tertiaryType.description },
      workEnvironment: primaryType.workEnvironment,
      profileAnalysis: {
        hollandCode,
        sortedTypes,
        consistency,
        differentiation,
        answerDetails,
        formula: HOLLAND_MATH_SYSTEM.scoringFormula,
      },
      references: [
        'Holland, J. L. (1997). Making vocational choices (3rd ed.). Psychological Assessment Resources.',
        'Nauta, J. J. (2010). Holland\'s theory of vocational personalities. Journal of Counseling Psychology.',
      ],
    },
    'professional'
  )
}

function calculateHollandConsistency(code: string): number {
  const hexagon: Record<string, string[]> = {
    R: ['I', 'C'],
    I: ['R', 'A'],
    A: ['I', 'S'],
    S: ['A', 'E'],
    E: ['S', 'C'],
    C: ['E', 'R'],
  }
  
  if (code.length < 2) return 0
  
  const first = code[0]
  const second = code[1]
  
  if (hexagon[first]?.includes(second)) return 100
  if (hexagon[second]?.includes(first)) return 100
  
  const adjacentToFirst = [...(hexagon[first] || []), first]
  const adjacentToSecond = [...(hexagon[second] || []), second]
  
  if (adjacentToFirst.some(t => adjacentToSecond.includes(t))) return 66
  return 33
}

function calculateHollandDifferentiation(scores: Record<string, number>): number {
  const values = Object.values(scores)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min
  return Math.round((range / max) * 100)
}

// ==================== 依恋风格专业计分 ====================
/**
 * 依恋风格专业计分算法
 * 
 * 计算公式：
 * 1. 维度分数：DimensionScore = Σ(AnswerValues)
 * 2. 平均分数：AverageScore = DimensionScore / QuestionCount
 * 3. 风格确定：Style = f(AnxietyAvg, AvoidanceAvg) based on quadrant
 */
export function calculateAttachmentProfessional(answers: Answer[]): ProfessionalAssessmentResult {
  let anxietyScore = 0
  let avoidanceScore = 0
  let anxietyCount = 0
  let avoidanceCount = 0
  const anxietyItems: number[] = []
  const avoidanceItems: number[] = []

  answers.forEach((answer) => {
    const subscale = answer.dimension || answer.trait || ''
    if (subscale === 'anxiety') {
      anxietyScore += answer.value || 0
      anxietyCount++
      anxietyItems.push(answer.value || 0)
    } else if (subscale === 'avoidance') {
      avoidanceScore += answer.value || 0
      avoidanceCount++
      avoidanceItems.push(answer.value || 0)
    }
  })

  const avgAnxiety = anxietyCount > 0 ? anxietyScore / anxietyCount : 0
  const avgAvoidance = avoidanceCount > 0 ? avoidanceScore / avoidanceCount : 0

  const style = determineAttachmentStyle(avgAnxiety, avgAvoidance)
  const styleInfo = attachmentStyles[style]

  const anxietyPercentile = Math.round((avgAnxiety / 7) * 100)
  const avoidancePercentile = Math.round((avgAvoidance / 7) * 100)

  const anxietyRange = getScoreRange(anxietyPercentile)
  const avoidanceRange = getScoreRange(avoidancePercentile)

  const dimensions = [
    { 
      name: '焦虑维度', 
      score: anxietyPercentile, 
      maxScore: 100, 
      description: `焦虑得分: ${avgAnxiety.toFixed(2)} (${anxietyRange.level})`,
      level: anxietyRange.level,
    },
    { 
      name: '回避维度', 
      score: avoidancePercentile, 
      maxScore: 100, 
      description: `回避得分: ${avgAvoidance.toFixed(2)} (${avoidanceRange.level})`,
      level: avoidanceRange.level,
    },
  ]

  const subscaleScores: Record<string, SubscaleScore> = {
    anxiety: {
      rawScore: anxietyScore,
      maxScore: anxietyCount * 7,
      standardScore: anxietyPercentile,
      percentile: anxietyPercentile,
      level: anxietyRange.level as SubscaleScore['level'],
      interpretation: anxietyRange.interpretation,
    },
    avoidance: {
      rawScore: avoidanceScore,
      maxScore: avoidanceCount * 7,
      standardScore: avoidancePercentile,
      percentile: avoidancePercentile,
      level: avoidanceRange.level as SubscaleScore['level'],
      interpretation: avoidanceRange.interpretation,
    },
  }

  const styleClassification = ATTACHMENT_MATH_SYSTEM.styleClassification.find(
    s => avgAnxiety >= s.anxietyRange[0] && avgAnxiety < s.anxietyRange[1] &&
         avgAvoidance >= s.avoidanceRange[0] && avgAvoidance < s.avoidanceRange[1]
  )

  return generateProfessionalResult(
    {
      type: 'attachment-professional',
      title: `依恋风格评估 - ${styleInfo.name}`,
      description: styleInfo.description,
      score: 0,
      accuracy: calculateAccuracy(answers.length, 36),
      dimensions,
      strengths: styleInfo.strengths,
      weaknesses: styleInfo.challenges,
      careers: [],
      suggestions: [styleInfo.recommendation],
      subscaleScores,
      clinicalInterpretation: styleInfo.relationshipPattern,
      profileAnalysis: {
        style,
        avgAnxiety,
        avgAvoidance,
        styleClassification,
        anxietyItems,
        avoidanceItems,
        formula: ATTACHMENT_MATH_SYSTEM.scoringFormula,
      },
      references: [
        'Fraley, R. C., Waller, N. G., & Brennan, K. A. (2000). An item response theory analysis. J Pers Soc Psychol.',
        'Mikulincer, M., & Shaver, P. R. (2016). Attachment in adulthood. Guilford Press.',
      ],
    },
    'professional'
  )
}

// ==================== 辅助函数 ====================
function calculateAccuracy(answeredCount: number, totalQuestions: number): number {
  const completionRate = answeredCount / totalQuestions
  const baseAccuracy = 85
  const maxBonus = 15
  return Math.min(99, Math.round(baseAccuracy + completionRate * maxBonus))
}

// ==================== 统一计分入口 ====================
export function calculateProfessionalResult(
  assessmentType: string,
  answers: Answer[],
  mode: 'normal' | 'advanced' | 'professional'
): ProfessionalAssessmentResult {
  const calculators: Record<string, (answers: Answer[]) => ProfessionalAssessmentResult> = {
    'mbti-standard': calculateMBTIProfessional,
    'mbti': calculateMBTIProfessional,
    'big-five': calculateBigFiveProfessional,
    'bigfive': calculateBigFiveProfessional,
    'anxiety': calculateSASProfessional,
    'sas': calculateSASProfessional,
    'eq': calculateEQProfessional,
    'emotional-intelligence': calculateEQProfessional,
    'holland': calculateHollandProfessional,
    'career-interest': calculateHollandProfessional,
    'attachment': calculateAttachmentProfessional,
    'attachment-style': calculateAttachmentProfessional,
    'iq-test': calculateIQProfessional,
    'iq': calculateIQProfessional,
    'political-ideology': calculatePoliticalIdeologyProfessional,
    'political': calculatePoliticalIdeologyProfessional,
    'sds-depression': calculateSDSProfessional,
    'sds': calculateSDSProfessional,
  }

  const calculator = calculators[assessmentType]
  if (calculator) {
    return calculator(answers)
  }

  return generateProfessionalResult(
    {
      type: assessmentType,
      title: '专业评估报告',
      description: '基于专业量表的评估结果',
      score: 0,
      accuracy: 85,
      dimensions: [],
      strengths: [],
      weaknesses: [],
      careers: [],
    },
    mode
  )
}

// ==================== IQ 专业计分算法 ====================
export function calculateIQProfessional(answers: Answer[], mode: 'normal' | 'advanced' | 'professional' = 'professional'): ProfessionalAssessmentResult {
  const scores = { verbal: 0, spatial: 0, logical: 0, memory: 0 }
  const subscaleCounts = { verbal: 0, spatial: 0, logical: 0, memory: 0 }

  answers.forEach((answer) => {
    if (answer.subscale && answer.value) {
      scores[answer.subscale as keyof typeof scores] += answer.value
      subscaleCounts[answer.subscale as keyof typeof subscaleCounts]++
    }
  })

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const maxPossibleScore = 60

  const rawPercent = (totalScore / maxPossibleScore) * 100
  const iqScore = Math.round(70 + (rawPercent / 100) * 50)

  const verbalPercent = subscaleCounts.verbal > 0 ? (scores.verbal / (subscaleCounts.verbal * 1)) * 100 : 50
  const spatialPercent = subscaleCounts.spatial > 0 ? (scores.spatial / (subscaleCounts.spatial * 1)) * 100 : 50
  const logicalPercent = subscaleCounts.logical > 0 ? (scores.logical / (subscaleCounts.logical * 1)) * 100 : 50
  const memoryPercent = subscaleCounts.memory > 0 ? (scores.memory / (subscaleCounts.memory * 1)) * 100 : 50

  let iqLevel: string
  let description: string

  if (iqScore >= 130) {
    iqLevel = '卓越超群'
    description = '你的认知能力处于顶尖水平，展现出非凡的智力潜能。在逻辑推理、空间思维、语言理解和记忆力等各方面都表现出色。'
  } else if (iqScore >= 120) {
    iqLevel = '优秀'
    description = '你拥有优秀的认知能力，思维敏捷，学习能力强。在需要高度智力活动的领域将具有显著优势。'
  } else if (iqScore >= 110) {
    iqLevel = '中上'
    description = '你的认知能力高于平均水平，具有良好的分析问题和解决问题的能力。'
  } else if (iqScore >= 90) {
    iqLevel = '平均'
    description = '你的认知能力处于正常平均水平，能够有效处理日常生活中的各种智力任务。'
  } else if (iqScore >= 80) {
    iqLevel = '中下'
    description = '你的认知能力略低于平均水平，但在大多数情况下能够正常学习和工作。'
  } else {
    iqLevel = '待提升'
    description = '你的认知能力有较大的提升空间。通过针对性训练和练习，可以显著改善各项认知功能。'
  }

  return generateProfessionalResult({
    type: 'iq-professional',
    title: `IQ ${iqScore} - ${iqLevel}`,
    description,
    score: iqScore,
    accuracy: 90,
    dimensions: [
      { name: '言语理解', score: Math.round(verbalPercent), maxScore: 100, description: verbalPercent >= 70 ? '优秀' : verbalPercent >= 50 ? '良好' : '待提升' },
      { name: '知觉推理', score: Math.round(spatialPercent), maxScore: 100, description: spatialPercent >= 70 ? '优秀' : spatialPercent >= 50 ? '良好' : '待提升' },
      { name: '逻辑思维', score: Math.round(logicalPercent), maxScore: 100, description: logicalPercent >= 70 ? '优秀' : logicalPercent >= 50 ? '良好' : '待提升' },
      { name: '工作记忆', score: Math.round(memoryPercent), maxScore: 100, description: memoryPercent >= 70 ? '优秀' : memoryPercent >= 50 ? '良好' : '待提升' },
    ],
    strengths: [iqScore >= 110 ? '认知能力出色' : '有发展潜力'],
    weaknesses: iqScore < 90 ? ['可通过训练提升'] : [],
    careers: iqScore >= 120 ? ['科学家', '工程师', '医生', '律师', '教授', '研究员'] : ['分析师', '程序员', '教师', '会计师', '管理者'],
    suggestions: [`🧠 IQ专业评估报告（${answers.length}题完整版）

📊 你的智商得分：${iqScore} (${iqLevel})

🎯 各维度表现：
• 言语理解：${Math.round(verbalPercent)}% - ${verbalPercent >= 70 ? '优秀' : verbalPercent >= 50 ? '良好' : '待提升'}
• 知觉推理：${Math.round(spatialPercent)}% - ${spatialPercent >= 70 ? '优秀' : spatialPercent >= 50 ? '良好' : '待提升'}
• 逻辑思维：${Math.round(logicalPercent)}% - ${logicalPercent >= 70 ? '优秀' : logicalPercent >= 50 ? '良好' : '待提升'}
• 工作记忆：${Math.round(memoryPercent)}% - ${memoryPercent >= 70 ? '优秀' : memoryPercent >= 50 ? '良好' : '待提升'}

💡 提升建议：
${iqScore < 90 ? `
• 每日进行数独、逻辑谜题训练
• 学习编程或数学思维课程
• 阅读复杂文本并总结要点
• 练习记忆宫殿法
` : `
• 保持终身学习的习惯
• 跨学科知识整合
• 参与智力挑战活动
• 培养创造性思维
`}`],
  }, mode)
}

export function createDifferentiatedResult(
  baseResult: Parameters<typeof generateProfessionalResult>[0],
  mode: 'normal' | 'advanced' | 'professional' = 'professional'
): ProfessionalAssessmentResult {
  const base = generateProfessionalResult(baseResult, mode)
  return enhanceResultDifferentiation(base, { detailLevel: mode === 'professional' ? 'comprehensive' : mode === 'advanced' ? 'detailed' : 'standard' })
}

export { validateResultDifferentiation, enhanceResultDifferentiation }

// ==================== 政治意识形态专业计分算法 ====================
export function calculatePoliticalIdeologyProfessional(answers: Answer[], mode: 'normal' | 'advanced' | 'professional' = 'professional'): ProfessionalAssessmentResult {
  const dimensions = {
    'economic-equality': 0,
    'economic-market': 0,
    'social-liberty': 0,
    'social-authority': 0,
  }

  answers.forEach((answer) => {
    if (answer.subscale && answer.value) {
      dimensions[answer.subscale as keyof typeof dimensions] += answer.value
    }
  })

  const economicLeftScore = dimensions['economic-equality']
  const economicRightScore = dimensions['economic-market']
  const socialLibertyScore = dimensions['social-liberty']
  const socialAuthorityScore = dimensions['social-authority']

  const economicPosition = ((economicLeftScore - economicRightScore) / (economicLeftScore + economicRightScore)) * 100
  const socialPosition = ((socialLibertyScore - socialAuthorityScore) / (socialLibertyScore + socialAuthorityScore)) * 100

  let economicLabel: string
  let socialLabel: string

  if (economicPosition <= -40) economicLabel = '强右翼/自由市场'
  else if (economicPosition <= -15) economicLabel = '中右翼'
  else if (economicPosition < 15) economicLabel = '经济中间派'
  else if (economicPosition < 40) economicLabel = '中左翼'
  else economicLabel = '强左翼/社会主义'

  if (socialPosition <= -40) socialLabel = '强权威/保守'
  else if (socialPosition <= -15) socialLabel = '中权威'
  else if (socialPosition < 15) socialLabel = '社会中间派'
  else if (socialPosition < 40) socialLabel = '中自由'
  else socialLabel = '强自由/自由主义'

  return generateProfessionalResult({
    type: 'political-ideology-professional',
    title: `${economicLabel} · ${socialLabel}`,
    description: `基于${answers.length}道专业题目的政治坐标分析：经济轴${Math.round(economicPosition)}%（${economicLabel}），社会轴${Math.round(socialPosition)}%（${socialLabel}）`,
    score: Math.round(Math.abs(economicPosition) + Math.abs(socialPosition)),
    accuracy: 88,
    dimensions: [
      { name: '经济平等倾向', score: economicLeftScore, maxScore: 75, description: '' },
      { name: '市场自由倾向', score: economicRightScore, maxScore: 75, description: '' },
      { name: '个人自由倾向', score: socialLibertyScore, maxScore: 75, description: '' },
      { name: '社会秩序倾向', score: socialAuthorityScore, maxScore: 75, description: '' },
    ],
    strengths: [`${economicLabel}在经济议题上立场明确`, `${socialLabel}在社会议题上态度清晰`],
    weaknesses: ['可更多了解不同政治哲学'],
    careers: ['政策分析师', '政治顾问', '学者', '记者', '公务员'],
    suggestions: [`🏛️ 政治意识形态专业评估报告（${answers.length}题）

📊 你的政治坐标：
• 经济维度：${Math.round(economicPosition)}% → ${economicLabel}
• 社会维度：${Math.round(socialPosition)}% → ${socialLabel}

💡 详细解读：
• 经济左倾：支持再分配、福利国家、政府干预
• 经济右倾：支持自由市场、私有化、减税
• 社会自由：重视个人权利、公民自由、多元文化
• 社会权威：重视传统价值、社会秩序、集体利益

📚 推荐阅读：
根据你的位置，建议了解相关政治哲学的经典著作和现代应用。
`],
  }, mode)
}

// ==================== SDS抑郁自评专业计分算法 ====================
export function calculateSDSProfessional(answers: Answer[], mode: 'normal' | 'advanced' | 'professional' = 'professional'): ProfessionalAssessmentResult {
  let rawScore = 0
  const reverseScoredQuestions = ['sds-2', 'sds-5', 'sds-6', 'sds-12', 'sds-14', 'sds-16', 'sds-17', 'sds-18', 'sds-20']

  answers.forEach((answer) => {
    let value = answer.value || 0
    if (reverseScoredQuestions.includes(answer.questionId)) {
      value = 5 - value
    }
    rawScore += value
  })

  const standardScore = Math.round(rawScore * 1.25)
  const index = standardScore

  let level: string
  let severity: string
  let description: string

  if (index < 50) {
    level = '正常范围'
    severity = '无抑郁'
    description = '最近一周内没有明显的抑郁症状，心理健康状况良好。'
  } else if (index < 59) {
    level = '轻度抑郁'
    severity = '轻度'
    description = '存在轻微的抑郁症状，可能有偶尔的情绪低落或兴趣减退。'
  } else if (index < 69) {
    level = '中度抑郁'
    severity = '中度'
    description = '有中等程度的抑郁症状，包括持续的情绪低落、睡眠问题等。'
  } else {
    level = '重度抑郁'
    severity = '重度'
    description = '存在严重的抑郁症状，可能显著影响日常生活功能。'
  }

  return generateProfessionalResult({
    type: 'sds-depression-professional',
    title: `SDS评分: ${level}`,
    description,
    score: index,
    accuracy: 92,
    dimensions: [
      { name: '原始总分', score: rawScore, maxScore: 80, description: '' },
      { name: '标准分', score: standardScore, maxScore: 100, description: '' },
      { name: '抑郁指数', score: index, maxScore: 100, description: severity },
    ],
    strengths: index < 50 ? ['心理健康状况良好'] : ['已意识到需要关注'],
    weaknesses: index >= 50 ? [`存在${severity}抑郁症状`] : [],
    careers: [],
    suggestions: [`🧠 SDS抑郁自评专业报告（${answers.length}题完整版）

📊 评分详情：
• 原始分：${rawScore}/80
• 标准分：${standardScore}/100
• 抑郁指数：${index}
• 严重程度：${severity}

⚠️ 重要提示：
本量表为筛查工具，不能替代专业诊断。

${index >= 69 ? `
🚨 重度抑郁 - 强烈建议：
✅ 立即预约精神科医生或心理治疗师
✅ 告诉信任的人你的感受
✅ 不要孤立自己
✅ 紧急情况拨打心理援助热线：400-161-9995
` : index >= 59 ? `
💪 中度抑郁 - 建议：
• 寻求专业心理咨询
• 规律运动（每周3-4次，每次30分钟+）
• 保持规律作息时间
• 练习正念冥想（每天10-15分钟）
• 与亲友保持联系
• 避免酒精和药物
` : `
✨ 维持心理健康：
• 继续健康的生活方式
• 定期运动和社交
• 学会管理压力
• 保持充足睡眠（7-9小时）
`}`],
  }, mode)
}
