import type { IsomerAnalysis, DemographicSegment, ThemeRelevance } from '../types'

export interface IsomerConfig {
  enableExtremityAnalysis: boolean
  enablePathDivergence: boolean
  enableThematicWeighting: boolean
  archetypeMapping: Record<string, { name: string; description: string }>
  demographicClusters: { name: string; x: number; y: number }[]
}

const DEFAULT_ARCHETYPES = {
  DEEP_THINKER: { name: '深度思考型', description: '倾向于在做出选择前进行深度思考，不轻易选择极端选项。虽然表面得分接近平均，但内在思维缜密，具有独特视角。' },
  DECISIVE: { name: '果断决策型', description: '对自己的选择非常确定，倾向于选择明确的极端选项而回避模糊中间项。具有强烈的个人立场和清晰的价值观。' },
  EXPLORER: { name: '多元探索型', description: '回答模式分布广泛，能够接纳多种视角。思维开放，对新事物抱有好奇心，不愿意被单一框架束缚。' },
  BALANCER: { name: '平衡整合型', description: '能够在对立观点之间找到平衡点，具有出色的整合思维和辩证思考能力。擅长处理复杂矛盾的局面。' },
}

const DEFAULT_CLUSTERS = [
  { name: '传统型', x: 25, y: 30 },
  { name: '平衡型', x: 50, y: 50 },
  { name: '探索型', x: 75, y: 75 },
  { name: '先锋型', x: 80, y: 35 },
]

export class IsomerCalculator {
  private config: IsomerConfig

  constructor(config: Partial<IsomerConfig> = {}) {
    this.config = {
      enableExtremityAnalysis: true,
      enablePathDivergence: true,
      enableThematicWeighting: true,
      archetypeMapping: DEFAULT_ARCHETYPES,
      demographicClusters: DEFAULT_CLUSTERS,
      ...config,
    }
  }

  calculateResponseExtremity(answers: Record<string, number>, scalePoints: number = 5): number {
    const values = Object.values(answers)
    const midpoint = (scalePoints + 1) / 2
    const maxExtremity = midpoint - 1

    const extremitySum = values.reduce((sum, v) => sum + Math.abs(v - midpoint), 0)
    return extremitySum / values.length / maxExtremity
  }

  calculateMidpointAvoidance(answers: Record<string, number>, scalePoints: number = 5): number {
    const values = Object.values(answers)
    const midpoint = (scalePoints + 1) / 2

    const midpointCount = values.filter(v => Math.abs(v - midpoint) < 0.5).length
    return 1 - midpointCount / values.length
  }

  determineArchetype(extremity: number, midpointAvoidance: number): { name: string; description: string } {
    const archetypes = Object.values(this.config.archetypeMapping)
    const index = Math.floor((extremity * 0.6 + midpointAvoidance * 0.4) * archetypes.length) % archetypes.length
    return archetypes[index]
  }

  calculateDemographicSegment(dimensions: Record<string, number>): {
    group: string
    percentage: string
    coordinates: { x: number; y: number }
    clusters: { name: string; x: number; y: number }[]
  } {
    const dimValues = Object.values(dimensions)
    const avgX = dimValues.length > 0 ? dimValues.reduce((a, b) => a + b, 0) / dimValues.length : 50
    const variance = dimValues.length > 0
      ? dimValues.reduce((sum, v) => sum + Math.pow(v - avgX, 2), 0) / dimValues.length
      : 50

    const x = Math.min(100, Math.max(0, avgX))
    const y = Math.min(100, Math.max(0, 50 + (variance - 250) / 10))

    const distances = this.config.demographicClusters.map(c =>
      Math.sqrt(Math.pow(c.x - x, 2) + Math.pow(c.y - y, 2))
    )
    const nearestIndex = distances.indexOf(Math.min(...distances))

    return {
      group: this.config.demographicClusters[nearestIndex].name,
      percentage: ((1 - distances[nearestIndex] / 141) * 15 + 8).toFixed(1) + '%',
      coordinates: { x, y },
      clusters: this.config.demographicClusters,
    }
  }

  calculateThemeRelevance(
    answers: Record<string, number>,
    themeItemMapping: Record<string, string[]>
  ): ThemeRelevance {
    const result: ThemeRelevance = {}

    Object.entries(themeItemMapping).forEach(([theme, itemIds]) => {
      const relevantAnswers = itemIds.map(id => answers[id]).filter(Boolean)
      if (relevantAnswers.length === 0) return

      const avgScore = relevantAnswers.reduce((a, b) => a + b, 0) / relevantAnswers.length
      const variance = relevantAnswers.reduce((sum, v) => sum + Math.pow(v - avgScore, 2), 0) / relevantAnswers.length
      const consistency = 1 - Math.min(1, variance / 4)

      result[theme] = {
        weight: avgScore / 5,
        contributionScore: (avgScore / 5) * consistency,
        description: this.getThemeDescription(theme, avgScore / 5),
      }
    })

    return result
  }

  private getThemeDescription(theme: string, weight: number): string {
    if (weight > 0.7) return `该主题在您的回答中表现显著，是核心特质之一`
    if (weight > 0.5) return `该主题在您的回答中有一定体现，属于中等相关`
    return `该主题在您的回答中表现较弱，影响相对较小`
  }

  enhanceResult<T extends Record<string, any>>(
    baseResult: T,
    answers: Record<string, number>,
    themeMapping?: Record<string, string[]>
  ): T & {
    isomerAnalysis: IsomerAnalysis
    demographicSegment: DemographicSegment
    themeRelevance?: ThemeRelevance
  } {
    const extremity = this.calculateResponseExtremity(answers)
    const midpointAvoidance = this.calculateMidpointAvoidance(answers)
    const archetype = this.determineArchetype(extremity, midpointAvoidance)

    const dimensions = baseResult.dimensions?.reduce((acc: Record<string, number>, d: any) => {
      acc[d.name || d.id] = d.score || 50
      return acc
    }, {}) || {}

    return {
      ...baseResult,
      isomerAnalysis: {
        extremity,
        midpointAvoidance,
        uniquenessPercentile: Math.floor((extremity + midpointAvoidance) / 2 * 100),
        archetype: archetype.name,
        archetypeDescription: archetype.description,
        responsePathSignature: `${Math.floor(extremity * 100)}-${Math.floor(midpointAvoidance * 100)}`,
      },
      demographicSegment: this.calculateDemographicSegment(dimensions),
      ...(themeMapping && {
        themeRelevance: this.calculateThemeRelevance(answers, themeMapping),
      }),
    }
  }
}

export const globalIsomerCalculator = new IsomerCalculator()
