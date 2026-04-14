import type { ProfessionalQuestion } from '../../../types'

export const MLQ_DIMENSIONS = [
  'idealizedInfluence',
  'inspirationalMotivation',
  'intellectualStimulation',
  'individualConsideration',
  'contingentReward',
  'managementByException',
  'laissezFaire',
] as const

export const MLQ_DIMENSION_NAMES: Record<MLQDimension, string> = {
  idealizedInfluence: '理想化影响力',
  inspirationalMotivation: '鼓舞性激励',
  intellectualStimulation: '智力激发',
  individualConsideration: '个性化关怀',
  contingentReward: '权变奖励',
  managementByException: '例外管理',
  laissezFaire: '放任型领导',
}

export const LEADERSHIP_STYLES = [
  { label: '变革型大师', code: 'Transformational-Master', description: '激励超越自我的愿景型领导' },
  { label: '交易型执行者', code: 'Transactional-Executive', description: '结果导向的高效管理者' },
  { label: '服务型公仆', code: 'Servant-Leader', description: '以他人成长为核心的利他领导' },
  { label: '自主赋能型', code: 'Empowering-Coach', description: '赋能团队成员的教练式领导' },
  { label: '平衡智慧型', code: 'Balanced-Wisdom', description: '灵活切换多种风格的成熟领导' },
  { label: '使命驱动型', code: 'Purpose-Driven', description: '以超越利润的意义为引领' },
  { label: '无为而治型', code: 'Hands-Off-Steward', description: '信任并授权团队自主决策' },
] as const

export const MLQ_LEVELS = [
  { range: [0, 25], label: '初阶管理者', description: '依赖职权，关注任务完成' },
  { range: [25, 40], label: '进阶监督者', description: '开始关注团队动机与关系' },
  { range: [40, 55], label: '胜任领导者', description: '能够有效激励与发展团队' },
  { range: [55, 70], label: '优秀领导者', description: '具备变革型领导核心能力' },
  { range: [70, 85], label: '卓越领导者', description: '全方位领导技能精通' },
  { range: [85, 100], label: '传奇领导力', description: '创造持久影响力的典范' },
]

export type MLQDimension = typeof MLQ_DIMENSIONS[number]

export const mlqNormData = { overall: { n: 65000, mean: 52, sd: 18 } }
export const mlqReferences = [
  'Bass, B. M., & Avolio, B. J. (1994). Improving organizational effectiveness through transformational leadership.',
  '变革型领导力理论与 MLQ 多因子领导力问卷',
]

export interface MLQQuestionMeta {
  dimension: MLQDimension
  factorLoading: number
  discrimination: number
  pole: string
}

export type MLQQuestion = ProfessionalQuestion & { meta: MLQQuestionMeta }






