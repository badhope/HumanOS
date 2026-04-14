import type { ProfessionalQuestion } from '../../../types'

export const SAS_DIMENSIONS = ['psychicAnxiety', 'somaticAnxiety', 'sleepDisturbance', 'cognitiveImpairment'] as const

export const SAS_DIMENSION_NAMES: Record<SASDimension, string> = {
  psychicAnxiety: '精神性焦虑',
  somaticAnxiety: '躯体性焦虑',
  sleepDisturbance: '睡眠障碍',
  cognitiveImpairment: '认知功能受损',
}

export const SAS_SEVERITY_BANDS = [
  { range: [20, 28], label: '无症状', description: '完全无焦虑体验，情绪状态稳定', intervention: '维持健康生活方式' },
  { range: [28, 35], label: '极轻微', description: '偶有烦躁，不影响日常功能', intervention: '正念呼吸，规律运动' },
  { range: [35, 42], label: '轻微', description: '可察觉的紧张感，可控', intervention: '放松训练，社交支持' },
  { range: [42, 48], label: '轻度偏下', description: '持续担忧，工作效率略降', intervention: '认知调整，减少咖啡因' },
  { range: [48, 54], label: '轻度焦虑', description: '明确的焦虑症状，开始影响生活', intervention: '专业心理咨询，压力管理' },
  { range: [54, 60], label: '轻中度', description: '焦虑症状明显，社会功能受损', intervention: '临床评估，考虑药物干预' },
  { range: [60, 66], label: '中度焦虑', description: '症状持续，回避行为增加', intervention: 'CBT治疗，精神科就诊' },
  { range: [66, 72], label: '中重度偏下', description: '惊恐发作可能，工作社交困难', intervention: '强化治疗，药物调整' },
  { range: [72, 78], label: '中重度', description: '严重焦虑，自主神经症状显著', intervention: '密切监护，综合治疗' },
  { range: [78, 85], label: '重度焦虑', description: '急性焦虑状态，功能严重受损', intervention: '精神科急诊，住院评估' },
  { range: [85, 100], label: '极重度', description: '濒死感或解体体验，危机状态', intervention: '立即就医，危机干预' },
] as const

export function getSASBand(score: number): typeof SAS_SEVERITY_BANDS[number] {
  return SAS_SEVERITY_BANDS.find(band => score >= band.range[0] && score < band.range[1]) || SAS_SEVERITY_BANDS[5]
}

export const SAS_ITEMS = [
  '焦虑心境', '紧张', '害怕', '失眠',
  '认知功能', '抑郁心境', '躯体感觉', '运动系统',
  '心血管', '呼吸', '胃肠道', '生殖泌尿系',
  '植物神经', '会谈时行为表现'
]

export const sasInterpretation = {
  ranges: [
    { min: 0, max: 49, level: '正常', description: '没有明显焦虑症状', recommendation: '继续保持良好心态' },
    { min: 50, max: 59, level: '轻度焦虑', description: '可能存在轻度焦虑情绪', recommendation: '注意情绪调节，适当放松' },
    { min: 60, max: 69, level: '中度焦虑', description: '有明显焦虑症状', recommendation: '建议寻求专业心理咨询' },
    { min: 70, max: 100, level: '重度焦虑', description: '焦虑症状较为严重', recommendation: '请及时就医，接受专业治疗' },
  ],
}

export const sasNormData = {
  total: { mean: 45, sd: 10, n: 10000 },
}

export const sasReferences = [
  'Zung, W. W. (1971). A rating instrument for anxiety disorders. Psychosomatics, 12(6), 371-379.',
  '张明园. (1998). 精神科评定量表手册. 湖南科学技术出版社.',
]

export type SASDimension = typeof SAS_DIMENSIONS[number]

export interface SASQuestionMeta {
  item?: string
  reverseScored?: boolean
  factorLoading: number
  discrimination?: number
  dimension?: SASDimension
  pole?: string
  [key: string]: any
}

export type SASQuestion = ProfessionalQuestion & { meta: SASQuestionMeta }



