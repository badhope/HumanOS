import type { ProfessionalQuestion } from '../../../types'

export const PSS_DIMENSIONS = ['perceivedStress', 'uncontrollability', 'overload', 'copingAbility'] as const

export const PSS_DIMENSION_NAMES: Record<PSSDimension, string> = {
  perceivedStress: '知觉压力',
  uncontrollability: '失控感',
  overload: '超负荷',
  copingAbility: '应对能力',
}

export const PSS_STRESS_BANDS = [
  { range: [0, 13], label: '几乎无压力', description: '压力水平极低，身心状态轻松', intervention: '维持当前平衡的生活节奏' },
  { range: [13, 20], label: '轻微压力', description: '偶有压力事件，整体可控', intervention: '保持觉察，适度放松' },
  { range: [20, 26], label: '轻度压力', description: '可感知的持续压力', intervention: '增加休息，建立边界' },
  { range: [26, 33], label: '轻中度压力', description: '开始出现耗竭迹象', intervention: '主动减压，调整期望' },
  { range: [33, 40], label: '中度压力', description: '身心负荷较大', intervention: '寻求支持，减少承诺' },
  { range: [40, 47], label: '中重度偏下', description: '压力持续累积', intervention: '专业心理咨询' },
  { range: [47, 53], label: '中度偏高压', description: '慢性压力状态', intervention: '强制休息，工作调整' },
  { range: [53, 60], label: '高压状态', description: '身心严重超负荷', intervention: '临床评估' },
  { range: [60, 67], label: '重度压力', description: '接近崩溃边缘', intervention: '医疗干预' },
  { range: [67, 75], label: '危机状态', description: '急性应激反应', intervention: '危机干预' },
  { range: [75, 100], label: '严重耗竭', description: '职业倦怠/身心崩溃', intervention: '立即停工休养' },
] as const

export function getPSSBand(score: number): typeof PSS_STRESS_BANDS[number] {
  return PSS_STRESS_BANDS.find(band => score >= band.range[0] && score < band.range[1]) || PSS_STRESS_BANDS[5]
}

export type PSSDimension = typeof PSS_DIMENSIONS[number]

export const pssNormData = {
  overall: { mean: 45, sd: 12, n: 5000 },
}

export const pssReferences = [
  'Cohen, S., Kamarck, T., & Mermelstein, R. (1983). A global measure of perceived stress. Journal of Health and Social Behavior, 385-396.',
  'Cohen, S., & Williamson, G. (1988). Perceived stress in a probability sample of the United States.',
]

export interface PSSQuestionMeta {
  dimension: PSSDimension
  reverseScored?: boolean
  factorLoading: number
  discrimination?: number
  pole?: string
  [key: string]: any
}

export type PSSQuestion = ProfessionalQuestion & {
  meta: PSSQuestionMeta
}



