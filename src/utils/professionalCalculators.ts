import type { Answer, ProfessionalAssessmentResult } from '../types'
import {
  calculateRawScore,
  createRiskAssessment,
  generateProfessionalResult,
} from './professionalScoring'
import {
  enhanceResultDifferentiation,
  validateResultDifferentiation,
} from './resultDifferentiation'
import {
  calculateTScore,
  calculatePercentileFromTScore,
  getScoreRange,
  calculateConfidenceInterval,
  calculateDimensionBalance,
  MBTI_MATH_SYSTEM,
  BIGFIVE_MATH_SYSTEM,
  SAS_MATH_SYSTEM,
  EQ_MATH_SYSTEM,
  HOLLAND_MATH_SYSTEM,
  ATTACHMENT_MATH_SYSTEM,
} from './mathSystem'
import { mbtiPersonalities } from '../data/mbti-data'
import { bigFiveSubscaleNames } from '../data/professional/bigfive-professional'
import { eqDimensions } from '../data/professional/eq-professional'
import { hollandTypes, calculateHollandCode } from '../data/professional/holland-professional'
import {
  calculateDark,
  calculateKolb,
  calculateASI,
  calculateMindset,
  calculateMLQ,
  calculateMFT,
  calculatePCQ,
  calculateSchwartz,
  calculateMetacognition,
  calculateTKI,
  calculateELS,
  calculateOCB,
  calculateHardiness,
  calculateSlacking,
  calculateFoodie,
  calculateInternetAddiction,
  calculateLifeMeaning,
  calculatePatriotism,
  calculateSexualExperience,
  calculateGMA,
  calculateCAST,
  calculatePhilo,
  calculateBounty,
  calculateLacan,
  calculatePUA,
  calculateFuBao,
  calculateBurnout,
} from './calculators'

export {
  calculateSASProfessional,
  calculateAttachmentProfessional,
  calculatePoliticalIdeologyProfessional,
  calculateSDSProfessional,
  calculatePSSProfessional,
} from './calculators/professional'

export { calculateSASProfessional as SAS_PROFESSIONAL_DEPRECATED } from './calculators/professional/sas'
export { calculateAttachmentProfessional as ATTACHMENT_PROFESSIONAL_DEPRECATED } from './calculators/professional/ecr'
export { calculatePoliticalIdeologyProfessional as POLITICAL_IDEOLOGY_PROFESSIONAL_DEPRECATED } from './calculators/professional/ideology'
export { calculateSDSProfessional as SDS_PROFESSIONAL_DEPRECATED } from './calculators/professional/sds'
export { calculatePSSProfessional as PSS_PROFESSIONAL_DEPRECATED } from './calculators/professional/pss'

export {
  enhanceResultDifferentiation,
  validateResultDifferentiation,
}

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

  const subscaleScores: Record<string, any> = {
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

function createMBTISubscaleScore(scoreA: number, scoreB: number, dimension: string): any {
  const total = scoreA + scoreB
  const clarity = calculatePreferenceClarity(scoreA, scoreB)
  const range = getScoreRange(clarity)
  
  return {
    rawScore: Math.max(scoreA, scoreB),
    maxScore: total,
    standardScore: clarity,
    percentile: calculatePercentileFromTScore(50 + clarity / 2),
    level: range.level,
    interpretation: range.interpretation,
  }
}

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

  const subscaleScores: Record<string, any> = {}
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
      level: range.level,
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

export function calculateEQProfessional(answers: Answer[]): ProfessionalAssessmentResult {
  const subscaleScores: Record<string, any> = {}
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
      level: range.level,
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

function calculateAccuracy(answeredCount: number, totalQuestions: number): number {
  const completionRate = answeredCount / totalQuestions
  const baseAccuracy = 85
  const maxBonus = 15
  return Math.min(99, Math.round(baseAccuracy + completionRate * maxBonus))
}

export async function calculateProfessionalResult(
  assessmentType: string,
  answers: Answer[],
  mode: 'normal' | 'advanced' | 'professional'
): Promise<ProfessionalAssessmentResult> {
  const professionalModule = await import('./calculators/professional')
  const {
    calculateSASProfessional,
    calculateAttachmentProfessional,
    calculatePoliticalIdeologyProfessional,
    calculateSDSProfessional,
    calculatePSSProfessional,
  } = professionalModule

  const calculators: Record<string, (answers: Answer[]) => any> = {
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
    'pss': calculatePSSProfessional,
    'perceived-stress': calculatePSSProfessional,
    'dark-triad': calculateDark,
    'dark': calculateDark,
    'kolb': calculateKolb,
    'learning-style': calculateKolb,
    'asi': calculateASI,
    'authoritarian': calculateASI,
    'mindset': calculateMindset,
    'growth-mindset': calculateMindset,
    'mlq': calculateMLQ,
    'meaning-in-life': calculateMLQ,
    'mft': calculateMFT,
    'moral-foundations': calculateMFT,
    'pcq': calculatePCQ,
    'psychological-capital': calculatePCQ,
    'schwartz': calculateSchwartz,
    'values': calculateSchwartz,
    'metacognition': calculateMetacognition,
    'meta-cognitive': calculateMetacognition,
    'tki': calculateTKI,
    'conflict-style': calculateTKI,
    'els': calculateELS,
    'emotional-labor': calculateELS,
    'ocb': calculateOCB,
    'organizational-citizenship': calculateOCB,
    'hardiness': calculateHardiness,
    'psychological-hardiness': calculateHardiness,
    'slacking': calculateSlacking,
    'slack-off': calculateSlacking,
    'foodie': calculateFoodie,
    'internet-addiction': calculateInternetAddiction,
    'life-meaning': calculateLifeMeaning,
    'patriotism': calculatePatriotism,
    'sexual-experience': calculateSexualExperience,
    'gma': calculateGMA,
    'general-mental-ability': calculateGMA,
    'cast': calculateCAST,
    'philo': calculatePhilo,
    'philosophy': calculatePhilo,
    'bounty': calculateBounty,
    'lacan': calculateLacan,
    'pua': calculatePUA,
    'fubao': calculateFuBao,
    'burnout': calculateBurnout,
    'job-burnout': calculateBurnout,
  }

  const calculator = calculators[assessmentType]
  if (calculator) {
    const rawResult = calculator(answers) as any
    
    return {
      type: assessmentType,
      ...rawResult,
      mode: mode,
      accuracy: rawResult.accuracy ?? 85 + Math.floor(Math.random() * 10),
      strengths: rawResult.strengths ?? rawResult.traits ?? [],
      weaknesses: rawResult.weaknesses ?? [],
      careers: rawResult.careers ?? [],
    }
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
