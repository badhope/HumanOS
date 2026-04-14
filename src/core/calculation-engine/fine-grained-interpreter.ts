import { FINE_GRAINED_INTERPRETATIONS, ScoreInterpretation } from '../../data/professional/finer-score-interpretation'

export interface InterpretationResult {
  dimension: string
  percentile: number
  label: string
  description: string
  characteristics: string[]
  behavioralTraits: string[]
  growthRecommendations: string[]
  intensity: number
}

export class FineGrainedInterpreter {
  private interpretations: Record<string, ScoreInterpretation[]>

  constructor(customInterpretations?: Record<string, ScoreInterpretation[]>) {
    this.interpretations = customInterpretations || FINE_GRAINED_INTERPRETATIONS
  }

  interpret(dimension: string, percentile: number): InterpretationResult {
    const dimensionInterps = this.interpretations[dimension]

    if (!dimensionInterps) {
      return this.generateDefaultInterpretation(dimension, percentile)
    }

    const interpretation = dimensionInterps.find(
      i => percentile >= i.min && percentile < i.max
    )

    if (!interpretation) {
      const clamped = Math.max(0, Math.min(99, percentile))
      return this.generateDefaultInterpretation(dimension, clamped)
    }

    return {
      dimension,
      percentile,
      label: interpretation.label,
      description: interpretation.description,
      characteristics: interpretation.characteristics,
      behavioralTraits: interpretation.behavioralTraits,
      growthRecommendations: interpretation.growthRecommendations,
      intensity: percentile / 100,
    }
  }

  interpretBatch(scores: Record<string, number>): InterpretationResult[] {
    return Object.entries(scores).map(([dim, p]) => this.interpret(dim, p))
  }

  private generateDefaultInterpretation(
    dimension: string,
    percentile: number
  ): InterpretationResult {
    const intensity = percentile / 100
    const isHigh = percentile >= 50

    const traitMapping: Record<string, [string, string]> = {
      O: ['保守', '开放探索'],
      C: ['随性灵活', '严谨尽责'],
      E: ['内倾沉静', '外倾活跃'],
      A: ['竞争独立', '宜人合作'],
      N: ['情绪稳定', '敏感细腻'],
      machiavellianism: ['真诚直接', '策略务实'],
      narcissism: ['谦逊低调', '自信表现'],
      psychopathy: ['共情关怀', '果断大胆'],
      sadism: ['温和善良', '支配强势'],
      selfAwareness: ['自我盲视', '自我洞察'],
      selfManagement: ['冲动随性', '自律可控'],
      socialAwareness: ['自我中心', '共情同理'],
      relationshipManagement: ['疏离独立', '影响领导'],
      ANXIETY: ['笃定自信', '敏感焦虑'],
      AVOIDANCE: ['亲密依赖', '独立回避'],
    }

    const [lowTrait, highTrait] = traitMapping[dimension] || ['低', '高']

    return {
      dimension,
      percentile,
      label: isHigh ? `高${highTrait}` : `偏${lowTrait}`,
      description: this.generateDescription(dimension, percentile, lowTrait, highTrait),
      characteristics: this.generateCharacteristics(lowTrait, highTrait, intensity),
      behavioralTraits: this.generateTraits(lowTrait, highTrait, intensity),
      growthRecommendations: this.generateRecommendations(lowTrait, highTrait, intensity),
      intensity,
    }
  }

  private generateDescription(
    dimension: string,
    percentile: number,
    low: string,
    high: string
  ): string {
    if (percentile < 15) {
      return `在该维度上表现出显著的${low}特征，属于人群中较低的15%。`
    }
    if (percentile < 35) {
      return `在该维度上偏向${low}，位于人群的15%-35%区间。`
    }
    if (percentile < 65) {
      return `在该维度上处于中等水平，${low}与${high}特征相对平衡。`
    }
    if (percentile < 85) {
      return `在该维度上偏向${high}，位于人群的65%-85%区间。`
    }
    return `在该维度上表现出显著的${high}特征，属于人群中最高的15%。`
  }

  private generateCharacteristics(
    low: string,
    high: string,
    intensity: number
  ): string[] {
    const characteristics: string[] = []

    if (intensity < 0.3) {
      characteristics.push(`典型的${low}取向`)
      characteristics.push(`${low}特征非常明显`)
    } else if (intensity < 0.5) {
      characteristics.push(`整体偏向${low}`)
      characteristics.push(`情境中会表现出${low}特质`)
    } else if (intensity < 0.7) {
      characteristics.push(`${low}与${high}特质并存`)
      characteristics.push('根据情境灵活调整表现')
    } else if (intensity < 0.85) {
      characteristics.push(`整体偏向${high}`)
      characteristics.push(`情境中会表现出${high}特质`)
    } else {
      characteristics.push(`典型的${high}取向`)
      characteristics.push(`${high}特征非常明显`)
    }

    return characteristics
  }

  private generateTraits(low: string, high: string, intensity: number): string[] {
    const traits: string[] = []

    if (intensity < 0.5) {
      traits.push(`决策时更多体现${low}倾向`)
      traits.push(`人际交往中带有${low}色彩`)
    }

    if (intensity >= 0.5) {
      traits.push(`决策时更多体现${high}倾向`)
      traits.push(`人际交往中带有${high}色彩`)
    }

    const deviation = Math.abs(intensity - 0.5)
    if (deviation > 0.3) {
      traits.push('该维度是你的核心人格特质之一')
    } else {
      traits.push('该维度在你的人格中相对中性')
    }

    return traits
  }

  private generateRecommendations(
    low: string,
    high: string,
    intensity: number
  ): string[] {
    const recommendations: string[] = []

    if (intensity < 0.15) {
      recommendations.push(`注意过度${low}可能带来的局限`)
      recommendations.push(`尝试在适当场合练习${high}的表达方式`)
    } else if (intensity > 0.85) {
      recommendations.push(`注意过度${high}可能带来的负面影响`)
      recommendations.push(`学习在适当的时候运用${low}的优势`)
    } else if (intensity < 0.5) {
      recommendations.push(`发挥你的${low}优势`)
      recommendations.push(`有意识地发展${high}能力`)
    } else {
      recommendations.push(`发挥你的${high}优势`)
      recommendations.push(`保持对${low}面向的觉察`)
    }

    return recommendations
  }
}
