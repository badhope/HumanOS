export interface DiversityEnhancementConfig {
  enableResponseStyleCorrection: boolean
  enableIRTItemWeighting: boolean
  enableExtremeResponseAmplification: boolean
  enableMidpointAvoidanceBonus: boolean
  enableChoiceJitter: boolean
  enhancementStrength: number
  maxAdjustmentPerDimension: number
  entropyThreshold: number
}

export const DEFAULT_STRENGTH_PRESETS = {
  CONSERVATIVE: { enhancementStrength: 0.5, maxAdjustmentPerDimension: 8, entropyThreshold: 1.8 },
  BALANCED: { enhancementStrength: 1.0, maxAdjustmentPerDimension: 15, entropyThreshold: 2.0 },
  AGGRESSIVE: { enhancementStrength: 1.5, maxAdjustmentPerDimension: 25, entropyThreshold: 2.3 },
} as const

export interface ResponseMeta {
  responseId: string
  rawScores: Record<string, number>
  responseStyle: {
    extremityScore: number
    midpointRatio: number
    acquiescenceBias: number
  }
  diversityMetrics: {
    scoreEntropy: number
    dimensionSpread: number
    resultUniqueness: number
  }
}

export const DEFAULT_DIVERSITY_CONFIG: DiversityEnhancementConfig = {
  enableResponseStyleCorrection: true,
  enableIRTItemWeighting: true,
  enableExtremeResponseAmplification: true,
  enableMidpointAvoidanceBonus: true,
  enableChoiceJitter: true,
  enhancementStrength: 1.0,
  maxAdjustmentPerDimension: 15,
  entropyThreshold: 2.0,
}

export class DiversityEnhancementEngine {
  private static instance: DiversityEnhancementEngine
  private config: DiversityEnhancementConfig

  private constructor(config: Partial<DiversityEnhancementConfig> = {}) {
    this.config = { ...DEFAULT_DIVERSITY_CONFIG, ...config }
  }

  static getInstance(): DiversityEnhancementEngine {
    if (!DiversityEnhancementEngine.instance) {
      DiversityEnhancementEngine.instance = new DiversityEnhancementEngine()
    }
    return DiversityEnhancementEngine.instance
  }

  calculateResponseStyle(
    responses: Record<string, number>,
    scalePoints: number = 5
  ): ResponseMeta['responseStyle'] {
    const values = Object.values(responses)
    const midpoint = (scalePoints + 1) / 2

    const extremityScore = values.reduce((sum, v) => sum + Math.abs(v - midpoint), 0) / values.length
    const maxExtremity = midpoint - 1

    const midpointCount = values.filter(v => Math.abs(v - midpoint) < 0.5).length
    const midpointRatio = midpointCount / values.length

    const acquiescenceBias = values.reduce((sum, v) => sum + (v - midpoint), 0) / values.length / maxExtremity

    return {
      extremityScore: extremityScore / maxExtremity,
      midpointRatio,
      acquiescenceBias,
    }
  }

  applyResponseStyleCorrection(
    dimensionScores: Record<string, number>,
    responseStyle: ResponseMeta['responseStyle']
  ): Record<string, number> {
    if (!this.config.enableResponseStyleCorrection) return dimensionScores

    const corrected: Record<string, number> = {}
    const midpointNormalization = 1 + (responseStyle.midpointRatio - 0.4) * 0.5

    Object.entries(dimensionScores).forEach(([dim, score]) => {
      const centered = score - 50
      const styleCorrected = centered * midpointNormalization
      const extremityBonus = centered * (0.1 + responseStyle.extremityScore * 0.2)

      corrected[dim] = Math.max(0, Math.min(100, 50 + styleCorrected + extremityBonus))
    })

    return corrected
  }

  calculateShannonEntropy(scores: number[]): number {
    const normalized = scores.map(s => Math.max(0.01, s / 100))
    const sum = normalized.reduce((a, b) => a + b, 0)
    const probabilities = normalized.map(n => n / sum)
    return -probabilities.reduce((entropy, p) => entropy + p * Math.log2(p), 0)
  }

  enhanceResultDiversity(
    finalScores: Record<string, number>,
    responseMeta: ResponseMeta
  ): Record<string, number> {
    const entropy = this.calculateShannonEntropy(Object.values(finalScores))

    if (entropy < this.config.entropyThreshold && this.config.enableChoiceJitter) {
      const maxDim = Object.entries(finalScores).reduce((a, b) => b[1] > a[1] ? b : a)[0]
      const minDim = Object.entries(finalScores).reduce((a, b) => b[1] < a[1] ? b : a)[0]

      const rawAdjustment = (this.config.entropyThreshold - entropy) * 8 * this.config.enhancementStrength
      const adjustment = Math.min(this.config.maxAdjustmentPerDimension, rawAdjustment)
      const enhanced = { ...finalScores }
      enhanced[maxDim] = Math.min(100, enhanced[maxDim] + adjustment)
      enhanced[minDim] = Math.max(0, enhanced[minDim] - adjustment)

      return enhanced
    }

    return finalScores
  }

  generateDiversityWeightedOptions<T extends { id: string; text: string; value: number }>(
    standardOptions: T[],
    questionType: 'personality' | 'opinion' | 'ability'
  ): T[] {
    if (!this.config.enableChoiceJitter || questionType === 'ability') {
      return standardOptions
    }

    return standardOptions.map((opt, index) => {
      if (index === 0 || index === standardOptions.length - 1) {
        return {
          ...opt,
          text: opt.text + (Math.random() > 0.5 ? '' : ''),
        }
      }
      return opt
    })
  }

  calculateUniquenessScore(
    userScores: Record<string, number>,
    populationNorms: Record<string, { mean: number; sd: number }>
  ): number {
    const zScores = Object.entries(userScores).map(([dim, score]) => {
      const norm = populationNorms[dim] || { mean: 50, sd: 15 }
      return Math.abs(score - norm.mean) / norm.sd
    })

    const meanDeviation = zScores.reduce((a, b) => a + b, 0) / zScores.length
    return Math.min(100, meanDeviation * 25)
  }

  generateResultInterpretation(meta: ResponseMeta): string[] {
    const interpretations: string[] = []

    if (meta.responseStyle.extremityScore > 0.6) {
      interpretations.push('您立场鲜明，态度明确，倾向于表达强烈的同意或反对')
    } else if (meta.responseStyle.extremityScore < 0.3) {
      interpretations.push('您思维审慎，避免极端判断，倾向于考虑问题的多面性')
    }

    if (meta.responseStyle.midpointRatio > 0.5) {
      interpretations.push('您善于保持开放心态，对多数问题持保留和辩证态度')
    } else if (meta.responseStyle.midpointRatio < 0.2) {
      interpretations.push('您决策果断，很少模棱两可，有明确的价值判断')
    }

    if (meta.diversityMetrics.resultUniqueness > 70) {
      interpretations.push('🌟 您的观点组合非常独特，属于人群中的少数派')
    } else if (meta.diversityMetrics.resultUniqueness > 40) {
      interpretations.push('您的观点组合具有鲜明的个人特色')
    } else {
      interpretations.push('您的观点与社会主流认知较为一致')
    }

    return interpretations
  }
}

export const diversityEngine = DiversityEnhancementEngine.getInstance()

export const DIVERSITY_OPTIMIZED_RESPONSE_SCALES = {
  personality6: [
    { id: '1', text: '🔴 完全不符合我', value: 1, diversityWeight: 1.5 },
    { id: '2', text: '🟠 大部分不符合', value: 2, diversityWeight: 1.2 },
    { id: '3', text: '🟡 有点不符合', value: 3, diversityWeight: 0.9 },
    { id: '4', text: '🟢 有点符合', value: 4, diversityWeight: 0.9 },
    { id: '5', text: '🔵 大部分符合', value: 5, diversityWeight: 1.2 },
    { id: '6', text: '🟣 完全符合我', value: 6, diversityWeight: 1.5 },
  ],

  forcedChoice4: [
    { id: '1', text: '明确反对', value: 1, diversityWeight: 1.4 },
    { id: '2', text: '倾向反对', value: 2, diversityWeight: 1.1 },
    { id: '3', text: '倾向赞同', value: 3, diversityWeight: 1.1 },
    { id: '4', text: '明确赞同', value: 4, diversityWeight: 1.4 },
  ],

  opinionBipolar5: [
    { id: '1', text: '强烈反对这个观点', value: 1, diversityWeight: 1.6 },
    { id: '2', text: '比较反对', value: 2, diversityWeight: 1.1 },
    { id: '3', text: '难以判断', value: 3, diversityWeight: 0.6 },
    { id: '4', text: '比较赞同', value: 4, diversityWeight: 1.1 },
    { id: '5', text: '强烈赞同这个观点', value: 5, diversityWeight: 1.6 },
  ],
} as const

export const POPULATION_NORMS: Record<string, { mean: number; sd: number }> = {
  realism: { mean: 58, sd: 18 },
  individualism: { mean: 62, sd: 21 },
  rationalism: { mean: 55, sd: 19 },
  universalism: { mean: 65, sd: 17 },
  progressivism: { mean: 59, sd: 20 },
  materialism: { mean: 52, sd: 22 },
  optimism: { mean: 57, sd: 18 },
  libertarian: { mean: 48, sd: 24 },
  equality: { mean: 68, sd: 16 },
  security: { mean: 61, sd: 19 },
  competition: { mean: 54, sd: 21 },
  cooperation: { mean: 63, sd: 18 },
  tradition: { mean: 49, sd: 23 },
  innovation: { mean: 64, sd: 17 },
  nationalism: { mean: 56, sd: 22 },
  globalism: { mean: 51, sd: 20 },
}

export interface IsomerProfile {
  fingerprint: number[]
  patternType: string
  subtype: string
  signatureItems: string[]
  contrastAnalysis: {
    aboveExpectation: string[]
    belowExpectation: string[]
  }
}

export interface IsomerArchetype {
  id: string
  name: string
  description: string
  patternSignature: number[]
  characteristicItems: string[]
}

const MIDRANGE_SUBTYPE_ARCHETYPES: Record<string, IsomerArchetype[]> = {
  lowVariance: [
    { 
      id: 'deliberate-thinker', 
      name: '审慎思考者', 
      description: '您在每个问题上都进行了深思熟虑，不轻易站队。这反映了您对复杂问题的成熟理解，拒绝简单化的二元对立——这是高级认知的标志，而非优柔寡断。', 
      patternSignature: [0, 0, 0, 0], 
      characteristicItems: ['系统中立性', '辩证思维', '复杂认知', '反二元论'] 
    },
    { 
      id: 'harmonious-integrator', 
      name: '温和包容者', 
      description: '您系统性地倾向于理解各方立场，不轻易采取极端态度。您相信每个观点都有合理成分，对话与融合才是解决问题的正道。', 
      patternSignature: [0.05, 0.05, 0.05, 0.05], 
      characteristicItems: ['包容大度', '寻求共识', '和谐优先', '多元主义'] 
    },
    { 
      id: 'skeptical-critic', 
      name: '怀疑批判者', 
      description: '您对所有立场都保持审慎的距离，对任何极端主张都自然地保留意见。这种健康的怀疑主义使您不易被意识形态所俘获。', 
      patternSignature: [-0.05, -0.05, -0.05, -0.05], 
      characteristicItems: ['怀疑精神', '独立判断', '反教条', '认知谦逊'] 
    },
  ],
  mediumVariance: [
    { 
      id: 'practical-pragmatist', 
      name: '实用务实派', 
      description: '您的中庸不是犹豫，而是基于现实的务实选择。您相信大多数真理都在两个极端之间的某处，原则要为结果让路。', 
      patternSignature: [0.1, -0.1, 0.1, -0.1], 
      characteristicItems: ['实用主义', '情境依赖', '灵活应变', '结果导向'] 
    },
    { 
      id: 'measured-optimist', 
      name: '审慎乐观派', 
      description: '您在保持现实主义的同时，系统性地倾向于更积极的选项。您相信进步是可能的，但必须以脚踏实地的方式实现。', 
      patternSignature: [0.15, 0.1, 0.05, 0], 
      characteristicItems: ['建设性乐观', '渐进改良', '现实主义', '稳中求进'] 
    },
    { 
      id: 'critical-realist', 
      name: '审慎悲观派', 
      description: '您对人类的过度理想主义保持警惕，系统性地认识到事物的复杂性和困难。清醒的悲观主义是您思想的独特力量。', 
      patternSignature: [-0.15, -0.1, -0.05, 0], 
      characteristicItems: ['清醒现实主义', '风险意识', '反乌托邦思维', '审慎保守'] 
    },
  ],
  highVariance: [
    { 
      id: 'conflicted-explorer', 
      name: '矛盾探索者', 
      description: '您内心存在有趣的观念张力——在某些问题上倾向传统，在另一些上又极度开放。这种内在矛盾正是您思想活力的源泉。', 
      patternSignature: [0.3, -0.3, 0.3, -0.3], 
      characteristicItems: ['观念张力', '自我冲突', '思想进化中', '认知失调耐受'] 
    },
    { 
      id: 'dialectical-synthesizer', 
      name: '辩证综合者', 
      description: '您能够同时持有表面矛盾的观点，因为您理解了更高层次的统一性。这是黑格尔意义上的辩证思维能力的体现。', 
      patternSignature: [0.4, 0.4, -0.4, -0.4], 
      characteristicItems: ['辩证思维', '正反合', '对立统一', '高阶认知'] 
    },
    { 
      id: 'secret-radical', 
      name: '隐蔽极端者', 
      description: '表面平衡的分数下隐藏着您在特定维度上的强烈立场。大多数问题您保持中立，但在真正关心的议题上，您的态度非常鲜明。', 
      patternSignature: [0.5, 0, 0, -0.5], 
      characteristicItems: ['特定议题极端化', '选择性极化', '核心信念坚定', '隐藏的激进'] 
    },
  ],
}

export class IsomericResultEngine {
  private static instance: IsomericResultEngine

  private constructor() {}

  static getInstance(): IsomericResultEngine {
    if (!IsomericResultEngine.instance) {
      IsomericResultEngine.instance = new IsomericResultEngine()
    }
    return IsomericResultEngine.instance
  }

  generateResponseFingerprint(
    responses: Record<string, number>,
    items: { id: string; dimension?: string }[]
  ): number[] {
    if (!items || items.length === 0) {
      return Object.keys(responses).sort().map(id => {
        const raw = responses[id] || 3
        return (raw - 3) / 2
      })
    }
    const sortedItems = [...items].sort((a, b) => a.id.localeCompare(b.id))
    return sortedItems.map(item => {
      const raw = responses[item.id] || 3
      return (raw - 3) / 2
    })
  }

  calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * (vecB[i] || 0), 0)
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
    return magA && magB ? dotProduct / (magA * magB) : 0
  }

  extractContrastItems(
    responses: Record<string, number>,
    dimensionMeans: Record<string, number>
  ): { aboveExpectation: string[]; belowExpectation: string[] } {
    const aboveExpectation: string[] = []
    const belowExpectation: string[] = []
    const entries = Object.entries(responses)
    
    if (entries.length === 0) {
      return { aboveExpectation: [], belowExpectation: [] }
    }
    
    entries.sort((a, b) => b[1] - a[1]).slice(0, 3).forEach(([id]) => {
      aboveExpectation.push(id)
    })
    
    entries.sort((a, b) => a[1] - b[1]).slice(0, 3).forEach(([id]) => {
      belowExpectation.push(id)
    })

    return { aboveExpectation, belowExpectation }
  }

  classifyMidrangeSubtype(
    fingerprint: number[],
    dimensionScores: Record<string, number>
  ): IsomerArchetype {
    const variance = Math.sqrt(
      fingerprint.reduce((sum, x) => sum + x * x, 0) / Math.max(1, fingerprint.length)
    )
    
    const mean = fingerprint.reduce((sum, x) => sum + x, 0) / Math.max(1, fingerprint.length)
    const absMax = Math.max(...fingerprint.map(Math.abs))

    if (variance < 0.1) {
      if (mean > 0.03) {
        return MIDRANGE_SUBTYPE_ARCHETYPES.lowVariance[1]
      } else if (mean < -0.03) {
        return MIDRANGE_SUBTYPE_ARCHETYPES.lowVariance[2]
      }
      return MIDRANGE_SUBTYPE_ARCHETYPES.lowVariance[0]
    } else if (variance < 0.2) {
      if (mean > 0.05) {
        return MIDRANGE_SUBTYPE_ARCHETYPES.mediumVariance[1]
      } else if (mean < -0.05) {
        return MIDRANGE_SUBTYPE_ARCHETYPES.mediumVariance[2]
      }
      return MIDRANGE_SUBTYPE_ARCHETYPES.mediumVariance[0]
    } else {
      const dimensions = Object.values(dimensionScores)
      const maxDeviation = Math.max(...dimensions.map(d => Math.abs(d - 50)))
      if (maxDeviation > 12 && absMax > 0.45) {
        return MIDRANGE_SUBTYPE_ARCHETYPES.highVariance[2]
      } else if (variance > 0.3) {
        return MIDRANGE_SUBTYPE_ARCHETYPES.highVariance[1]
      }
      return MIDRANGE_SUBTYPE_ARCHETYPES.highVariance[0]
    }
  }

  generateIsomericInterpretation(
    isomerProfile: IsomerProfile,
    rawDimensionName: string
  ): string {
    const archetype = isomerProfile.subtype
    const contrastCount = isomerProfile.contrastAnalysis.aboveExpectation.length + 
                        isomerProfile.contrastAnalysis.belowExpectation.length

    if (contrastCount >= 4) {
      return `虽然您在${rawDimensionName}维度上得分接近平均水平，但仔细分析您的回答模式发现了独特的认知特征。您在${isomerProfile.contrastAnalysis.aboveExpectation.length}个问题上表现出显著高于均值的认同，同时在${isomerProfile.contrastAnalysis.belowExpectation.length}个问题上明显保留——这种精确的选择性认同正是您思想的独特标记，与真正的"中间派"有着本质区别。`
    }

    return `同分异构分析：您属于【${archetype}】类型。平均分数只是表象，您的回答路径揭示了独特的认知风格。`
  }
}

export const isomericEngine = IsomericResultEngine.getInstance()

export interface DiversityWrapperConfig<T> {
  norms: Record<string, { mean: number; sd: number }>
  assessmentItems: { id: string; dimension?: string }[]
  scalePoints?: number
  getRawScores: (answerMap: Record<string, number>) => T
  getMidrangeOverride?: (enhancedScores: T, subtype: IsomerArchetype) => Partial<T>
}

export function withDiversityEnhancement<T extends Record<string, number>>(
  config: DiversityWrapperConfig<T>
) {
  return (answerMap: Record<string, number | string>) => {
    const responseValues = Object.fromEntries(
      Object.entries(answerMap).map(([k, v]) => [k, typeof v === 'number' ? v : Number(v) || 3])
    )

    const rawScores = config.getRawScores(responseValues)
    const responseStyle = diversityEngine.calculateResponseStyle(
      responseValues, 
      config.scalePoints || 5
    )

    const correctedScores = diversityEngine.applyResponseStyleCorrection(
      rawScores, 
      responseStyle
    ) as T
    
    const enhancedScores = diversityEngine.enhanceResultDiversity(correctedScores, {
      responseId: 'enhanced-' + Date.now(),
      rawScores,
      responseStyle,
      diversityMetrics: {
        scoreEntropy: diversityEngine.calculateShannonEntropy(Object.values(rawScores)),
        dimensionSpread: Math.max(...Object.values(rawScores)) - Math.min(...Object.values(rawScores)),
        resultUniqueness: diversityEngine.calculateUniquenessScore(rawScores, config.norms),
      },
    }) as T

    const fingerprint = isomericEngine.generateResponseFingerprint(
      responseValues, 
      config.assessmentItems
    )
    const contrastItems = isomericEngine.extractContrastItems(responseValues, rawScores)
    const midrangeSubtype = isomericEngine.classifyMidrangeSubtype(fingerprint, enhancedScores)
    const allScoresInMidrange = Object.values(enhancedScores).every(s => s >= 42 && s <= 58)

    return {
      enhancedScores,
      rawScores,
      diversityMeta: {
        responseStyle,
        uniquenessScore: Math.round(diversityEngine.calculateUniquenessScore(rawScores, config.norms)),
        extremityScore: Math.round(responseStyle.extremityScore * 100),
        midpointAvoidance: Math.round((1 - responseStyle.midpointRatio) * 100),
      },
      isomeric: allScoresInMidrange ? {
        enabled: true,
        subtype: midrangeSubtype.name,
        subtypeDescription: midrangeSubtype.description,
        characteristicItems: midrangeSubtype.characteristicItems,
        contrastInterpretation: isomericEngine.generateIsomericInterpretation({
          fingerprint,
          patternType: 'midrange',
          subtype: midrangeSubtype.name,
          signatureItems: [...contrastItems.aboveExpectation, ...contrastItems.belowExpectation],
          contrastAnalysis: contrastItems,
        }, '测评'),
      } : null,
      midrangeSubtype,
      allScoresInMidrange,
    }
  }
}

export default DiversityEnhancementEngine
