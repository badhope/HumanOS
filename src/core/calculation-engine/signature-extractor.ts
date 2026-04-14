export interface PersonalitySignature {
  signature: string
  traits: string[]
  extremeDimensions: {
    dimension: string
    direction: 'high' | 'low'
    zScore: number
    percentile: number
  }[]
  archetype: string
  description: string
}

export class PersonalitySignatureExtractor {
  private threshold: number
  private dimensionNames: Record<string, [string, string]>

  constructor(threshold: number = 1.5) {
    this.threshold = threshold
    this.dimensionNames = {
      O: ['保守传统', '开放探索'],
      C: ['灵活随性', '严谨尽责'],
      E: ['内倾沉静', '外倾主导'],
      A: ['竞争独立', '宜人合作'],
      N: ['冷静坚韧', '敏感细腻'],
      machiavellianism: ['理想主义', '策略务实'],
      narcissism: ['谦逊低调', '自信表现'],
      psychopathy: ['共情关怀', '果断无畏'],
      sadism: ['温和顺从', '支配控制'],
      selfAwareness: ['自我盲视', '自我洞察'],
      selfManagement: ['冲动随性', '自律坚毅'],
      socialAwareness: ['自我中心', '共情同理'],
      relationshipManagement: ['独立疏离', '领导影响'],
      ANXIETY: ['笃定自信', '焦虑敏感'],
      AVOIDANCE: ['亲密依恋', '自主回避'],
    }
  }

  extract(
    dimensionPercentiles: Record<string, number>,
    archetypeRules?: Record<string, (p: Record<string, number>) => boolean>
  ): PersonalitySignature {
    const zScores = this.percentileToZScore(dimensionPercentiles)
    const extremes = this.findExtremeDimensions(dimensionPercentiles, zScores)

    const traits = extremes.map(e => {
      const [lowName, highName] = this.dimensionNames[e.dimension] || ['偏低', '偏高']
      return e.direction === 'high' ? highName : lowName
    })

    const signature = traits.length > 0 ? traits.join(' + ') : '平衡型人格'

    const archetype = this.determineArchetype(extremes, archetypeRules, dimensionPercentiles)

    return {
      signature,
      traits,
      extremeDimensions: extremes,
      archetype,
      description: this.generateDescription(signature, traits, archetype),
    }
  }

  private percentileToZScore(percentiles: Record<string, number>): Record<string, number> {
    const zScores: Record<string, number> = {}
    for (const [dim, p] of Object.entries(percentiles)) {
      const clamped = Math.max(0.5, Math.min(99.5, p))
      zScores[dim] = this.inverseCDF(clamped / 100)
    }
    return zScores
  }

  private inverseCDF(p: number): number {
    const a1 = -39.6968302866538
    const a2 = 220.946098424521
    const a3 = -275.928510446969
    const a4 = 138.357751867269
    const a5 = -30.6647980661472
    const a6 = 2.50662827745924

    const b1 = -54.4760987982241
    const b2 = 161.585836858041
    const b3 = -155.698979859887
    const b4 = 66.8013118877197
    const b5 = -13.2806815528857

    const c1 = -7.78489400243029e-3
    const c2 = -0.322396458041136
    const c3 = -2.40075827716184
    const c4 = -2.54973253934373
    const c5 = 4.37466414146497
    const c6 = 2.93816398269878

    const d1 = 7.78469570904146e-3
    const d2 = 0.32246712907004
    const d3 = 2.445134137143
    const d4 = 3.75440866190742

    const pLow = 0.02425
    const pHigh = 1 - pLow

    let q, r

    if (p < pLow) {
      q = Math.sqrt(-2 * Math.log(p))
      return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
        ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
    }

    if (p <= pHigh) {
      q = p - 0.5
      r = q * q
      return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
        (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
    }

    q = Math.sqrt(-2 * Math.log(1 - p))
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
  }

  private findExtremeDimensions(
    percentiles: Record<string, number>,
    zScores: Record<string, number>
  ): PersonalitySignature['extremeDimensions'] {
    const extremes: PersonalitySignature['extremeDimensions'] = []

    for (const [dimension, z] of Object.entries(zScores)) {
      if (Math.abs(z) >= this.threshold) {
        extremes.push({
          dimension,
          direction: z > 0 ? 'high' : 'low',
          zScore: Math.round(z * 100) / 100,
          percentile: percentiles[dimension],
        })
      }
    }

    return extremes.sort((a, b) => Math.abs(b.zScore) - Math.abs(a.zScore))
  }

  private determineArchetype(
    extremes: PersonalitySignature['extremeDimensions'],
    customRules?: Record<string, (p: Record<string, number>) => boolean>,
    percentiles?: Record<string, number>
  ): string {
    if (customRules && percentiles) {
      for (const [archetype, rule] of Object.entries(customRules)) {
        if (rule(percentiles)) {
          return archetype
        }
      }
    }

    const highTraits = extremes.filter(e => e.direction === 'high').map(e => e.dimension)
    const lowTraits = extremes.filter(e => e.direction === 'low').map(e => e.dimension)

    if (highTraits.includes('psychopathy') && highTraits.includes('narcissism') && highTraits.includes('machiavellianism')) {
      return '黑暗三角典型'
    }

    if (highTraits.includes('N') && highTraits.includes('ANXIETY')) {
      return '敏感焦虑型'
    }

    if (highTraits.includes('C') && highTraits.includes('E') && highTraits.includes('A')) {
      return '天生领导者'
    }

    if (highTraits.includes('O') && lowTraits.includes('E')) {
      return '思想者型'
    }

    if (lowTraits.includes('N') && lowTraits.includes('ANXIETY') && lowTraits.includes('AVOIDANCE')) {
      return '安全型人格'
    }

    if (highTraits.includes('AVOIDANCE') && lowTraits.includes('ANXIETY')) {
      return ' dismissive回避型'
    }

    if (highTraits.includes('ANXIETY') && lowTraits.includes('AVOIDANCE')) {
      return '执着型依恋'
    }

    if (highTraits.includes('selfManagement') && highTraits.includes('C')) {
      return '高度自律型'
    }

    if (extremes.length === 0) {
      return '平衡整合型'
    }

    if (extremes.length === 1) {
      const [lowName, highName] = this.dimensionNames[extremes[0].dimension] || ['', '']
      return extremes[0].direction === 'high' ? `${highName}主导型` : `${lowName}主导型`
    }

    return '多维特质型'
  }

  private generateDescription(
    signature: string,
    traits: string[],
    archetype: string
  ): string {
    if (traits.length === 0) {
      return '你的人格特质非常平衡，各维度发展相对均匀，能够灵活适应不同情境的要求。这种平衡型人格往往具有良好的环境适应性和心理弹性。'
    }

    if (traits.length === 1) {
      return `${traits[0]}是你最核心的人格印记，这一特质在你行为的方方面面都有显著体现，构成了你区别于他人的主要识别特征。属于典型的${archetype}。`
    }

    const traitList = traits.slice(0, -1).join('、') + '与' + traits[traits.length - 1]
    return `你的核心人格印记是：${signature}。${traitList}这些特质的独特组合，构成了你作为${archetype}的鲜明识别特征。这些特质的互动模式是理解你行为模式的关键。`
  }
}
