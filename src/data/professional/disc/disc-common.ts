import type { ProfessionalQuestion } from '../../../types'

export const DISC_DIMENSIONS = ['dominance', 'influence', 'steadiness', 'compliance'] as const

export const DISC_DIMENSION_NAMES: Record<DISCDimension, string> = {
  dominance: '支配型',
  influence: '影响型',
  steadiness: '稳健型',
  compliance: '谨慎型',
}

export const DISC_PROFILES = [
  { label: 'D型主导', description: '直接、果断、结果导向、追求挑战' },
  { label: 'I型主导', description: '热情、乐观、善于社交、鼓舞人心' },
  { label: 'S型主导', description: '耐心、可靠、善于倾听、追求和谐' },
  { label: 'C型主导', description: '严谨、精确、注重细节、追求品质' },
  { label: 'DI型', description: '行动力强的沟通者，兼具决断力与说服力' },
  { label: 'DS型', description: '坚定的执行者，既有魄力又有耐心' },
  { label: 'DC型', description: '高标准的推动者，果断且注重质量' },
  { label: 'IS型', description: '友善的协调者，热情且善于合作' },
  { label: 'IC型', description: '创意的完美主义者，有想法且讲细节' },
  { label: 'SC型', description: '缜密的规划者，稳健且追求准确' },
  { label: '平衡型', description: '适应性强，能灵活切换不同行为风格' },
] as const

export const DOMINANCE_BANDS = [
  { range: [0, 18], label: '合作型', description: '避免冲突，重视共识决策' },
  { range: [18, 28], label: '温和型', description: '偏好协商而非命令' },
  { range: [28, 38], label: '支持型', description: '在需要时会挺身而出' },
  { range: [38, 48], label: '决断型', description: '自信果断，敢于负责' },
  { range: [48, 58], label: '坚定型', description: '意志坚强，勇于挑战' },
  { range: [58, 68], label: '进取型', description: '目标导向，敢于竞争' },
  { range: [68, 78], label: '驱动型', description: '结果至上，势不可挡' },
  { range: [78, 88], label: '强力型', description: '直截了当，控制力强' },
  { range: [88, 100], label: '权威型', description: '极度自信，天生的领导者' },
]

export function getDISCProfile(scores: Record<DISCDimension, number>): typeof DISC_PROFILES[number] {
  const sorted = [...DISC_DIMENSIONS].sort((a, b) => scores[b] - scores[a])
  const primary = sorted[0]
  const secondary = sorted[1]
  const gap = scores[primary] - scores[secondary]
  
  if (gap < 8) {
    const combo = `${primary[0].toUpperCase()}${secondary[0].toUpperCase()}`
    const profile = DISC_PROFILES.find(p => p.label.startsWith(combo))
    if (profile) return profile
  }
  
  if (gap < 12) return DISC_PROFILES[10]
  
  const indexMap: Record<string, number> = { dominance: 0, influence: 1, steadiness: 2, compliance: 3 }
  return DISC_PROFILES[indexMap[primary]]
}

export type DISCDimension = typeof DISC_DIMENSIONS[number]

export const discNormData = {
  overall: { n: 250000 },
}

export const discReferences = [
  'Marston, W. M. (1928). Emotions of Normal People. Kegan Paul, Trench, Trubner & Co.',
  'William Moulton Marston 原始 DISC 行为理论',
]

export interface DISCQuestionMeta {
  dimension: DISCDimension
  factorLoading: number
  discrimination: number
  pole: string
}

export type DISCQuestion = ProfessionalQuestion & {
  meta: DISCQuestionMeta
}





