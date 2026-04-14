import type { ProfessionalQuestion } from '../../../types'

export const CT_DIMENSIONS = ['analysis', 'evaluation', 'inference', 'interpretation', 'explanation', 'selfRegulation'] as const

export const CT_DIMENSION_NAMES: Record<CTDimension, string> = {
  analysis: '分析能力',
  evaluation: '评估判断',
  inference: '推理演绎',
  interpretation: '解释理解',
  explanation: '论证说明',
  selfRegulation: '自我校准',
}

export const CT_PROFILES = [
  { label: '逻辑大师型', description: '推理严谨，善于发现逻辑漏洞，追求真理' },
  { label: '怀疑探究型', description: '质疑一切，不轻易接受表面结论' },
  { label: '客观分析型', description: '中立客观，基于证据做出判断' },
  { label: '直觉整合型', description: '善于把握整体，快速洞察核心' },
  { label: '审慎决策型', description: '三思而后行，考虑周全再行动' },
  { label: '辩证思维型', description: '容纳多元视角，寻求综合平衡' },
  { label: '成长思维型', description: '开放包容，乐于修正自己的观点' },
] as const

export const CT_LEVELS = [
  { range: [0, 25], label: '前反思期', description: '依赖权威，简单二元思维' },
  { range: [25, 40], label: '初始挑战期', description: '开始质疑，但缺乏系统方法' },
  { range: [40, 55], label: '探索发展期', description: '掌握基本批判思维工具' },
  { range: [55, 70], label: '熟练应用期', description: '系统性分析，独立思考能力强' },
  { range: [70, 85], label: '精通整合期', description: '高阶思维，能处理复杂问题' },
  { range: [85, 100], label: '大师典范期', description: '思维智慧，知行合一' },
]

export type CTDimension = typeof CT_DIMENSIONS[number]

export const ctNormData = { overall: { n: 45000 } }
export const ctReferences = ['Facione, P. A. (1990). Critical thinking: A statement of expert consensus for purposes of educational assessment and instruction.', '德尔菲报告批判性思维能力模型']

export interface CTQuestionMeta {
  dimension: CTDimension
  factorLoading: number
  discrimination: number
  pole: 'high' | 'low'
}

export type CTQuestion = ProfessionalQuestion & { meta: CTQuestionMeta }





