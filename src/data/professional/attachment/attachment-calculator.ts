import {
  ATTACHMENT_DIMENSIONS,
  ATTACHMENT_DIMENSION_NAMES,
  ATTACHMENT_DIMENSION_FULL_NAMES,
  ATTACHMENT_DIMENSION_DESCRIPTIONS,
  ATTACHMENT_DIMENSION_BANDS,
  ATTACHMENT_FACETS,
  ATTACHMENT_ARCHETYPES,
  ATTACHMENT_STYLES,
  ecrNormData,
  attachmentReferences,
  type AttachmentQuestion,
  type AttachmentDimension,
} from './attachment-common'
import type { AssessmentResult, Dimension } from '../../../types'

export interface AttachmentAnswer {
  questionId: string
  value: number
}

export interface AttachmentScores {
  ANXIETY: number
  AVOIDANCE: number
}

export interface AttachmentDimensionResult {
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

export function calculateProfessionalAttachment(
  answers: AttachmentAnswer[],
  questions: AttachmentQuestion[]
): AssessmentResult {
  const rawScores = calculateWeightedRawScores(answers, questions)
  const dimensionResults = processEachDimension(rawScores, answers, questions)
  const attachmentStyle = determineAttachmentStyle(rawScores)
  const attachmentArchetype = determineAttachmentArchetype(rawScores)
  const securityIndex = calculateSecurityIndex(rawScores)
  const reliability = calculateReliability(answers, questions)

  return buildComprehensiveResult(rawScores, dimensionResults, attachmentStyle, attachmentArchetype, securityIndex, reliability)
}

function calculateWeightedRawScores(
  answers: AttachmentAnswer[],
  questions: AttachmentQuestion[]
): AttachmentScores {
  const scores: AttachmentScores = { ANXIETY: 0, AVOIDANCE: 0 }
  const weightSums: Record<string, number> = { ANXIETY: 0, AVOIDANCE: 0 }

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta) return

    const dimension = question.meta.dimension
    const discrimination = question.meta.discrimination || 0.5
    const factorLoading = question.meta.factorLoading || 0.6
    const weight = discrimination * factorLoading * 1.4

    let adjustedValue = answer.value
    if (question.meta.reverseScored) {
      adjustedValue = 8 - answer.value
    }

    const socialDesirability = question.meta.socialDesirability || 0.5
    const sdCorrection = 1 + Math.abs(0.5 - socialDesirability) * 0.25
    const weightedValue = ((adjustedValue - 1) / 6) * 100 * weight * sdCorrection

    scores[dimension] += weightedValue
    weightSums[dimension] += weight
  })

  Object.keys(scores).forEach(key => {
    const dimension = key as AttachmentDimension
    if (weightSums[dimension] > 0) {
      scores[dimension] = scores[dimension] / weightSums[dimension]
    }
    scores[dimension] = Math.max(0, Math.min(100, scores[dimension]))
  })

  return scores
}

function processEachDimension(
  scores: AttachmentScores,
  answers: AttachmentAnswer[],
  questions: AttachmentQuestion[]
): AttachmentDimensionResult[] {
  return ATTACHMENT_DIMENSIONS.map(dimension => {
    const finalScore = Math.max(0, Math.min(100, scores[dimension]))

    const norm = ecrNormData[dimension as keyof typeof ecrNormData]
    const zScore = (finalScore - norm.mean) / norm.sd
    const percentile = Math.round(50 + zScore * 16)
    const finalPercentile = Math.max(1, Math.min(99, percentile))

    const bands = ATTACHMENT_DIMENSION_BANDS[dimension as keyof typeof ATTACHMENT_DIMENSION_BANDS]
    const band = bands.find(b => finalScore >= b.range[0] && finalScore <= b.range[1]) || bands[5]

    const facetScores = calculateFacetScores(dimension, answers, questions)
    const clarity = Math.abs(finalScore - 50) * 2

    return {
      dimension,
      dimensionName: ATTACHMENT_DIMENSION_NAMES[dimension],
      description: ATTACHMENT_DIMENSION_DESCRIPTIONS[dimension],
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
  answers: AttachmentAnswer[],
  questions: AttachmentQuestion[]
): Record<string, number> {
  const facetScores: Record<string, number> = {}
  const facetCounts: Record<string, number> = {}

  ATTACHMENT_FACETS[dimension as keyof typeof ATTACHMENT_FACETS].forEach(facet => {
    facetScores[facet] = 0
    facetCounts[facet] = 0
  })

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (!question?.meta || question.meta.dimension !== dimension) return

    const facet = question.meta.facet
    if (facet && Object.prototype.hasOwnProperty.call(facetScores, facet)) {
      let adjustedValue = answer.value
      if (question.meta.reverseScored) adjustedValue = 8 - answer.value
      facetScores[facet] += ((adjustedValue - 1) / 6) * 100
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

function determineAttachmentStyle(scores: AttachmentScores): typeof ATTACHMENT_STYLES[keyof typeof ATTACHMENT_STYLES] & { code: string } {
  const isAnxious = scores.ANXIETY >= 55
  const isAvoidant = scores.AVOIDANCE >= 55

  let code: string
  if (!isAnxious && !isAvoidant) {
    code = 'SECURE'
  } else if (isAnxious && !isAvoidant) {
    code = 'PREOCCUPIED'
  } else if (!isAnxious && isAvoidant) {
    code = 'DISMISSIVE'
  } else {
    code = 'FEARFUL'
  }

  return { code, ...ATTACHMENT_STYLES[code] }
}

function determineAttachmentArchetype(scores: AttachmentScores): typeof ATTACHMENT_ARCHETYPES[keyof typeof ATTACHMENT_ARCHETYPES] & { code: string } {
  const hCode = (scores.ANXIETY >= 55 ? 'H' : 'L') + (scores.AVOIDANCE >= 55 ? 'H' : 'L')
  return { code: hCode, ...ATTACHMENT_ARCHETYPES[hCode] }
}

function generateStrengths(scores: AttachmentScores): string[] {
  const strengths: string[] = []

  if (scores.ANXIETY <= 40) {
    strengths.push('内在安全感很强，能够信任伴侣和关系本身')
    strengths.push('情绪稳定性高，不会因为小事陷入灾难性思维')
  }

  if (scores.AVOIDANCE <= 40) {
    strengths.push('能够享受真正的亲密，不惧怕依赖和脆弱')
    strengths.push('情感开放度高，能够与伴侣深度连接')
  }

  if (scores.ANXIETY <= 50 && scores.AVOIDANCE <= 50) {
    strengths.push('健康的依恋模式，能够平衡亲密与独立')
    strengths.push('冲突处理能力强，既不攻击也不逃避')
  }

  if (scores.ANXIETY >= 55 && scores.ANXIETY < 75) {
    strengths.push('对关系非常投入，能够敏锐觉察伴侣的情绪变化')
    strengths.push('浪漫且热情，能给关系带来很多激情和活力')
  }

  if (scores.AVOIDANCE >= 55 && scores.AVOIDANCE < 75) {
    strengths.push('独立性强，不依赖他人也能过得很好')
    strengths.push('理性冷静，在关系危机中能够保持镇定')
  }

  if (scores.ANXIETY >= 45 && scores.ANXIETY <= 65 && scores.AVOIDANCE >= 45 && scores.AVOIDANCE <= 65) {
    strengths.push('依恋模式非常平衡，既有温度又有边界')
  }

  return strengths.filter((item, index) => strengths.indexOf(item) === index).slice(0, 6)
}

function generateHealingAreas(scores: AttachmentScores): string[] {
  const areas: string[] = []

  if (scores.ANXIETY >= 80) {
    areas.push('被抛弃创伤非常深刻，建议通过心理咨询进行深度疗愈')
  } else if (scores.ANXIETY >= 65) {
    areas.push('建立自我价值感，减少"被抛弃=我不够好"的认知链接')
    areas.push('学习自我安抚，降低对他人回应的过度依赖')
  } else if (scores.ANXIETY >= 55) {
    areas.push('练习正念，觉察并接纳焦虑情绪而不是被它控制')
  }

  if (scores.AVOIDANCE >= 80) {
    areas.push('深度情感隔离防御机制，需要专业帮助解开早年的心结')
  } else if (scores.AVOIDANCE >= 65) {
    areas.push('承认对连接的需要，脆弱不是软弱而是勇气')
    areas.push('练习留在不舒服的亲密中，而不是习惯性逃跑')
  } else if (scores.AVOIDANCE >= 55) {
    areas.push('慢慢学习表达真实的感受，而不是总是"我没事"')
  }

  if (scores.ANXIETY >= 65 && scores.AVOIDANCE >= 65) {
    areas.push('混乱型模式需要特别关照，推拉是内心矛盾的外在表现')
    areas.push('找到一个安全的人，练习在关系中保持一致')
  }

  if (scores.ANXIETY <= 30 && scores.AVOIDANCE <= 30) {
    areas.push('注意不要过度承担对方的情绪责任，保持健康边界')
  }

  return areas.filter((item, index) => areas.indexOf(item) === index).slice(0, 5)
}

function generateRelationshipAdvice(scores: AttachmentScores): string[] {
  const advice: string[] = []

  if (scores.ANXIETY >= 55 && scores.AVOIDANCE <= 50) {
    advice.push('找安全型或同样焦虑型的伴侣，回避型会让你发疯')
    advice.push('直接表达需要而不是用情绪绑架的方式')
  }

  if (scores.AVOIDANCE >= 55 && scores.ANXIETY <= 50) {
    advice.push('找能给你空间又不会离开的安全型伴侣')
    advice.push('主动沟通你的"需要独处"不是"不爱了"')
  }

  if (scores.ANXIETY >= 55 && scores.AVOIDANCE >= 55) {
    advice.push('恐惧型最需要的是一个情绪极其稳定的安全型')
    advice.push('在关系中练习"我说的就是我想的"，减少口是心非')
  }

  if (scores.ANXIETY <= 50 && scores.AVOIDANCE <= 50) {
    advice.push('你是关系中的安全基地，请保护好这份珍贵的能力')
    advice.push('注意不要做焦虑或回避型的"情绪疗愈师"')
  }

  if (Math.abs(scores.ANXIETY - scores.AVOIDANCE) <= 10) {
    advice.push('你的依恋模式相对灵活，适应不同伴侣的能力较强')
  }

  advice.push('没有不好的依恋模式，只有没有被看见的创伤')
  advice.push('成人依恋是可以改变的，觉察就是改变的开始')

  return advice.filter((item, index) => advice.indexOf(item) === index).slice(0, 6)
}

function calculateSecurityIndex(scores: AttachmentScores): number {
  return Math.round(Math.max(0, Math.min(100,
    100 - Math.sqrt(Math.pow((100 - scores.ANXIETY) - 50, 2) + Math.pow((100 - scores.AVOIDANCE) - 50, 2)) * 1.5
  )))
}

function calculateReliability(answers: AttachmentAnswer[], questions: AttachmentQuestion[]): number {
  const validQuestions = questions.filter(q =>
    answers.some(a => a.questionId === q.id) && q.meta
  )

  if (validQuestions.length < 18) return 0.68

  const avgFactorLoading = validQuestions.reduce((sum, q) => sum + q.meta.factorLoading, 0) / validQuestions.length
  const consistencyScore = calculateResponseConsistency(answers)

  return Math.min(0.95, 0.72 + avgFactorLoading * 0.14 + consistencyScore * 0.08)
}

function calculateResponseConsistency(answers: AttachmentAnswer[]): number {
  if (answers.length < 18) return 0.5

  const values = answers.map(a => a.value)
  const secureResponses = values.filter(v => v === 1 || v === 2).length / values.length
  const insecureResponses = values.filter(v => v === 6 || v === 7).length / values.length

  if (secureResponses > 0.85 || insecureResponses > 0.85) return 0.2
  if (secureResponses > 0.7 || insecureResponses > 0.7) return 0.4
  return 0.75
}

function buildComprehensiveResult(
  rawScores: AttachmentScores,
  dimensionResults: AttachmentDimensionResult[],
  attachmentStyle: ReturnType<typeof determineAttachmentStyle>,
  attachmentArchetype: ReturnType<typeof determineAttachmentArchetype>,
  securityIndex: number,
  reliability: number
): AssessmentResult {
  const strengths = generateStrengths(rawScores)
  const healingAreas = generateHealingAreas(rawScores)
  const relationshipAdvice = generateRelationshipAdvice(rawScores)

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
    type: 'Attachment',
    typeName: '成人依恋专业测评',
    typeCode: attachmentStyle.code + '-' + attachmentArchetype.code,
    archetype: attachmentArchetype.archetype,
    title: `${attachmentStyle.name} - ${attachmentArchetype.name}`,
    summary: `${attachmentStyle.description}\n\n${attachmentArchetype.description}\n\n爱的语言: ${attachmentArchetype.loveLanguage}`,
    dimensions,
    overallScore: securityIndex,
    securityIndex,
    attachmentStyle: attachmentStyle.name,
    attachmentArchetype: attachmentArchetype.name,
    loveLanguage: attachmentArchetype.loveLanguage,
    quadrantPosition: {
      anxiety: Math.round(rawScores.ANXIETY),
      avoidance: Math.round(rawScores.AVOIDANCE),
    },
    characteristics: attachmentStyle.characteristics,
    relationshipPattern: attachmentStyle.relationshipPattern,
    strengths,
    areasForGrowth: healingAreas,
    relationshipAdvice,
    reliability: Number(reliability.toFixed(2)),
    standardError: Number((12 * Math.sqrt(1 - reliability)).toFixed(2)),
    healingPotentialIndex: Math.round(30 + Math.abs(rawScores.ANXIETY - 50) + Math.abs(rawScores.AVOIDANCE - 50)),
    interpretiveNotes: generateInterpretiveNotes(rawScores, securityIndex, reliability),
    references: attachmentReferences,
  }
}

function generateInterpretiveNotes(
  scores: AttachmentScores,
  securityIndex: number,
  reliability: number
): string[] {
  const notes: string[] = []

  if (securityIndex >= 80) {
    notes.push('您的依恋安全性属于人群中最高的5%，这既是幸运也是可以传递给他人的礼物')
  } else if (securityIndex <= 30) {
    notes.push('您的依恋受过不少伤，但疗愈的潜力也同样巨大')
  }

  if (scores.ANXIETY >= 70 && scores.AVOIDANCE <= 30) {
    notes.push('纯焦虑型是人群中占比最大的不安全依恋，也是最容易被治愈的')
  }
  if (scores.AVOIDANCE >= 70 && scores.ANXIETY <= 30) {
    notes.push('纯回避型最容易被误认为是"安全型"，因为看起来情绪太"稳定"了')
  }
  if (scores.ANXIETY >= 60 && scores.AVOIDANCE >= 60) {
    notes.push('恐惧型是四种类型中最痛苦的，也是最容易误诊的，您的混乱只是因为想要的太多了')
  }

  if (Math.abs(scores.ANXIETY - scores.AVOIDANCE) <= 8 && scores.ANXIETY >= 45 && scores.ANXIETY <= 55) {
    notes.push('您正处在依恋模式的转变期，这是成长的黄金时机')
  }

  if (reliability < 0.7) {
    notes.push('作答一致性一般，依恋测评最容易受到当下感情状态的影响')
  }

  return notes
}


export const calculateNormalMode = calculateProfessionalAttachment


export const calculateAdvancedMode = calculateProfessionalAttachment


export const calculateProfessionalMode = calculateProfessionalAttachment




