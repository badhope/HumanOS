import type { ProfessionalQuestion } from '../../../types'

export const MORAL_FOUNDATIONS = [
  'harm', 'fairness', 'ingroup', 'authority', 'purity', 'liberty',
] as const

export const MORAL_FOUNDATION_NAMES: Record<MoralFoundation, string> = {
  harm: '关怀/伤害',
  fairness: '公平/欺骗',
  ingroup: '忠诚/背叛',
  authority: '权威/颠覆',
  purity: '圣洁/堕落',
  liberty: '自由/压迫',
}

export const MORAL_PROFILES = [
  { label: '普世关怀型', code: 'Care-Focused', description: '以减少痛苦为核心道德指南' },
  { label: '正义卫士型', code: 'Justice-Focused', description: '公平与正义是最高原则' },
  { label: '社群纽带型', code: 'Community-Focused', description: '重视集体与传统价值' },
  { label: '律法维护型', code: 'Order-Focused', description: '维护秩序与权威是社会基石' },
  { label: '纯净原则型', code: 'Sanctity-Focused', description: '崇尚神圣与道德纯洁' },
  { label: '自由至上型', code: 'Liberty-Focused', description: '反抗压迫，捍卫个体自由' },
  { label: '多元平衡型', code: 'Balanced-Moral', description: '各道德基础均衡发展' },
] as const

export type MoralFoundation = typeof MORAL_FOUNDATIONS[number]

export const moralNormData = { overall: { n: 120000 } }
export const moralReferences = [
  'Haidt, J., & Graham, J. (2007). When morality opposes justice: Conservatives have moral intuitions that liberals may not recognize.',
  '道德基础理论 (Moral Foundations Theory)',
]

export interface MoralQuestionMeta {
  foundation: MoralFoundation
  factorLoading: number
  discrimination: number
  pole: 'high' | 'low'
}

export type MoralQuestion = ProfessionalQuestion & { meta: MoralQuestionMeta }





