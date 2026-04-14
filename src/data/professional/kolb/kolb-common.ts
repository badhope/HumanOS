import type { ProfessionalQuestion } from '../../../types'

export const KOLB_DIMENSIONS = ['concreteExperience', 'reflectiveObservation', 'abstractConceptualization', 'activeExperimentation'] as const

export const KOLB_DIMENSION_NAMES: Record<KolbDimension, string> = {
  concreteExperience: '具体经验',
  reflectiveObservation: '反思观察',
  abstractConceptualization: '抽象概念化',
  activeExperimentation: '主动实践',
}

export const KOLB_STYLES = [
  { label: '发散型', code: 'Diverger', description: '善于从多角度观察，喜欢头脑风暴，想象力丰富' },
  { label: '同化型', code: 'Assimilator', description: '善于归纳整理，构建理论模型，逻辑性强' },
  { label: '聚合型', code: 'Converger', description: '善于解决问题，偏好技术应用，实用性强' },
  { label: '顺应型', code: 'Accommodator', description: '善于动手实践，喜欢冒险探索，直觉导向' },
  { label: '平衡型', code: 'Balanced', description: '学习风格灵活，能在不同情境间切换' },
  { label: '分析-实践型', code: 'Analytical-Practical', description: '兼具逻辑分析与动手验证能力' },
  { label: '体验-反思型', code: 'Experience-Reflective', description: '在体验中深度思考，善于总结升华' },
  { label: '全脑学习型', code: 'Holistic', description: '四维度均衡发展，适应性极强' },
] as const

export const LEARNING_BANDS = [
  { range: [0, 25], label: '较弱倾向', description: '较少使用该学习模式' },
  { range: [25, 40], label: '轻度倾向', description: '在特定情境下会使用' },
  { range: [40, 55], label: '中等倾向', description: '常规学习模式之一' },
  { range: [55, 70], label: '明显倾向', description: '偏好的学习模式' },
  { range: [70, 85], label: '强烈倾向', description: '主导学习模式' },
  { range: [85, 100], label: '极度倾向', description: '标志性学习特征' },
]

export function getKolbStyle(scores: Record<KolbDimension, number>): typeof KOLB_STYLES[number] {
  const aeRo = scores.activeExperimentation - scores.reflectiveObservation
  const acCe = scores.abstractConceptualization - scores.concreteExperience
  
  const maxDiff = Math.max(Math.abs(aeRo), Math.abs(acCe))
  
  if (maxDiff < 12) return KOLB_STYLES[7]
  if (maxDiff < 18) return KOLB_STYLES[4]
  
  if (aeRo < -10 && acCe < -10) return KOLB_STYLES[0]
  if (aeRo < -10 && acCe > 10) return KOLB_STYLES[1]
  if (aeRo > 10 && acCe > 10) return KOLB_STYLES[2]
  if (aeRo > 10 && acCe < -10) return KOLB_STYLES[3]
  
  if (acCe > 15) return KOLB_STYLES[5]
  return KOLB_STYLES[6]
}

export type KolbDimension = typeof KOLB_DIMENSIONS[number]

export const kolbNormData = {
  overall: { n: 120000 },
}

export const kolbReferences = [
  'Kolb, D. A. (1984). Experiential learning: Experience as the source of learning and development.',
  'Kolb 体验式学习理论模型',
]

export interface KolbQuestionMeta {
  dimension: KolbDimension
  factorLoading: number
  discrimination: number
  pole: string
}

export type KolbQuestion = ProfessionalQuestion & {
  meta: KolbQuestionMeta
}





