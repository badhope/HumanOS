import type { ProfessionalQuestion } from '../../../types'

export const BIG_FIVE_FACTORS = ['O', 'C', 'E', 'A', 'N'] as const

export const BIG_FIVE_FACTOR_NAMES: Record<string, string> = {
  'O': '开放性',
  'C': '尽责性',
  'E': '外向性',
  'A': '宜人性',
  'N': '神经质',
}

export const BIG_FIVE_FACTOR_DESCRIPTIONS: Record<string, string> = {
  'O': '对新体验、想法、价值观的接受和探索程度',
  'C': '组织性、自律性、责任感和成就导向的程度',
  'E': '在社交环境中的活跃度、能量水平和刺激寻求程度',
  'A': '人际互动中的合作、和谐、利他倾向',
  'N': '情绪不稳定和负面情绪体验的倾向',
}

export const BIG_FIVE_DIMENSION_BANDS: Record<string, Array<{ range: [number, number]; band: string; description: string }>> = {
  'O': [
    { range: [0, 10], band: '极端保守', description: '极度务实传统，坚守熟悉的方式，对变革高度抗拒' },
    { range: [11, 20], band: '典型保守', description: '标准的现实主义者，偏好具体实用，不喜欢抽象思考' },
    { range: [21, 30], band: '温和保守', description: '偏传统但能接受适度变化，注重实际经验而非空想' },
    { range: [31, 40], band: '轻微保守', description: '轻度务实倾向，立足现实但不排斥接触新事物' },
    { range: [41, 45], band: '略偏务实', description: '微偏向实际，在传统与创新间保持谨慎平衡' },
    { range: [46, 54], band: '中间型', description: '开放性与务实性平衡，能适应变化也重视现实基础' },
    { range: [55, 59], band: '略偏开放', description: '微开放倾向，对新想法持接纳但审慎的态度' },
    { range: [60, 69], band: '轻微开放', description: '轻度好奇，乐于探索新事物但也保持理性判断' },
    { range: [70, 79], band: '温和开放', description: '偏创新，思维活跃，有丰富的想象力和创造力' },
    { range: [80, 89], band: '典型开放', description: '标准的探索者，充满好奇心，热爱智力挑战与审美体验' },
    { range: [90, 100], band: '极端开放', description: '深度创新者，极度追求智力刺激，思想高度自由不羁' },
  ],
  'C': [
    { range: [0, 10], band: '极度散漫', description: '完全随心所欲，没有计划，极度抗拒规则束缚' },
    { range: [11, 20], band: '典型散漫', description: '随遇而安，不喜欢被约束，做事随性缺乏条理' },
    { range: [21, 30], band: '温和散漫', description: '偏好灵活自由，能应付基本秩序但不追求细节' },
    { range: [31, 40], band: '轻微散漫', description: '轻度随性，较为放松但关键时刻能保持自律' },
    { range: [41, 45], band: '略偏随性', description: '微偏向自由，在秩序与灵活间寻求弹性空间' },
    { range: [46, 54], band: '中间型', description: '尽责性与灵活性平衡，能自律也懂得适时放松' },
    { range: [55, 59], band: '略偏尽责', description: '微偏向可靠，基本靠谱但不做过度承诺' },
    { range: [60, 69], band: '轻微尽责', description: '轻度有条理，认真负责但允许适度弹性' },
    { range: [70, 79], band: '温和尽责', description: '偏严谨自律，组织性强，可靠且有成就导向' },
    { range: [80, 89], band: '典型尽责', description: '标准的完美主义者，高度负责，追求卓越成就' },
    { range: [90, 100], band: '极端尽责', description: '极致控制者，近乎强迫性地追求秩序，绝不允许出错' },
  ],
  'E': [
    { range: [0, 10], band: '极度内向', description: '深度隐居者，几乎完全回避社交，极度需要独处' },
    { range: [11, 20], band: '典型内向', description: '标准的独处者，偏好安静环境，社交活动耗能巨大' },
    { range: [21, 30], band: '温和内向', description: '偏安静内敛，小规模深度交流可接受但不主动' },
    { range: [31, 40], band: '轻微内向', description: '轻度内敛，社交适应力尚可但更享受独处时光' },
    { range: [41, 45], band: '略偏内向', description: '微偏向安静，在社交与独处间偏向后者但可切换' },
    { range: [46, 54], band: '中间型', description: '内外向平衡，典型Ambivert，视情境灵活调整状态' },
    { range: [55, 59], band: '略偏外向', description: '微偏向社交，喜欢与人互动但也需要安静时间' },
    { range: [60, 69], band: '轻微外向', description: '轻度合群，乐于社交但不追求成为关注中心' },
    { range: [70, 79], band: '温和外向', description: '偏热情活跃，喜欢人群，社交场合精力充沛' },
    { range: [80, 89], band: '典型外向', description: '标准的社交者，能量来自他人互动，追求刺激体验' },
    { range: [90, 100], band: '极端外向', description: '极度健谈者，无法忍受独处，持续需要外部社交刺激' },
  ],
  'A': [
    { range: [0, 10], band: '极度对抗', description: '极端利己主义者，为达目的不择手段，毫无共情' },
    { range: [11, 20], band: '典型对抗', description: '标准的竞争者，怀疑他人动机，优先考虑自身利益' },
    { range: [21, 30], band: '温和对抗', description: '偏强硬直接，有竞争心，在人际中保持一定距离' },
    { range: [31, 40], band: '轻微对抗', description: '轻度怀疑，较为务实，不轻易妥协但避免冲突' },
    { range: [41, 45], band: '略偏理性', description: '微偏向自我，在合作与竞争间保持务实态度' },
    { range: [46, 54], band: '中间型', description: '宜人性均衡，既能真诚合作也懂得维护自身利益' },
    { range: [55, 59], band: '略偏友善', description: '微偏向亲和，基本友善但保持必要的警惕' },
    { range: [60, 69], band: '轻微友善', description: '轻度合作，乐于助人但有自己的原则底线' },
    { range: [70, 79], band: '温和友善', description: '偏利他共情，信任他人，重视和谐人际关系' },
    { range: [80, 89], band: '典型宜人', description: '标准的支持者，真诚友善，乐于牺牲奉献帮助他人' },
    { range: [90, 100], band: '极端宜人', description: '极致利他者，近乎讨好型人格，绝不忍心拒绝任何人' },
  ],
  'N': [
    { range: [0, 10], band: '极度稳定', description: '近乎无情绪波动，极端冷静，任何情况下都波澜不惊' },
    { range: [11, 20], band: '典型稳定', description: '标准的情绪忍者，高度抗压，几乎不受负面情绪影响' },
    { range: [21, 30], band: '温和稳定', description: '偏镇定从容，情绪调节能力强，很少焦虑或愤怒' },
    { range: [31, 40], band: '轻微稳定', description: '轻度冷静，情绪平衡，正常压力下能保持稳定' },
    { range: [41, 45], band: '略偏稳定', description: '微偏向冷静，在感性与理性间偏向后者' },
    { range: [46, 54], band: '中间型', description: '情绪敏感度平衡，既有正常情绪反应也能及时调整' },
    { range: [55, 59], band: '略偏敏感', description: '微偏向感性，情绪体验丰富但大体可控' },
    { range: [60, 69], band: '轻微敏感', description: '轻度情绪化，容易感受到压力但能较快恢复' },
    { range: [70, 79], band: '温和敏感', description: '偏情绪反应，焦虑阈值低，对负面信息高度警觉' },
    { range: [80, 89], band: '典型神经质', description: '标准的情绪易感者，容易焦虑、抑郁、情绪波动大' },
    { range: [90, 100], band: '极端神经质', description: '极度情绪脆弱，持续焦虑状态，很小刺激就能引发崩溃' },
  ],
}

export const BIG_FIVE_FACETS: Record<string, string[]> = {
  'O': ['想象力丰富度', '审美敏感度', '情感体验深度', '行动好奇心', '思想包容性', '价值观开放性'],
  'C': ['自我胜任感', '生活条理性', '责任意识', '成就驱动力', '自律执行力', '决策审慎度'],
  'E': ['人际热情度', '社交合群性', '自信独断力', '精力活跃性', '刺激寻求水平', '积极情绪表达'],
  'A': ['人际信任度', '沟通坦率度', '利他倾向', '合作服从性', '谦逊态度', '共情关怀能力'],
  'N': ['焦虑易感性', '愤怒爆发阈', '抑郁倾向', '自我意识强度', '冲动控制力', '压力脆弱度'],
}

export const BIG_FIVE_FACET_WEIGHTS: Record<string, number[]> = {
  'O': [1.2, 1.0, 0.9, 1.1, 1.0, 0.8],
  'C': [1.0, 1.2, 1.1, 1.1, 1.0, 0.6],
  'E': [1.0, 1.1, 1.2, 1.0, 0.9, 0.8],
  'A': [0.9, 0.9, 1.2, 1.1, 0.9, 1.0],
  'N': [1.2, 1.0, 1.1, 1.0, 0.8, 0.9],
}

export const bigFiveNormData = {
  O: { mean: 50, sd: 10, n: 10000 },
  C: { mean: 50, sd: 10, n: 10000 },
  E: { mean: 50, sd: 10, n: 10000 },
  A: { mean: 50, sd: 10, n: 10000 },
  N: { mean: 50, sd: 10, n: 10000 },
}

export const BIG_FIVE_PERSONALITY_PROFILES: Record<string, { name: string; description: string; archetype: string }> = {
  'RCOEN': { name: '模范公民', description: '可靠、有组织、外向、友好、情绪稳定的社区支柱', archetype: '中流砥柱' },
  'RCOAS': { name: '平均型', description: '各维度都处于中间范围的适应良好者', archetype: '平凡英雄' },
  'HCOES': { name: '榜样型', description: '高尽责、高外向、高宜人、情绪稳定的天生领导者', archetype: '行为楷模' },
  'HCONS': { name: '自我中心型', description: '高尽责但低宜人，专注于目标的个人奋斗者', archetype: '孤胆英雄' },
  'LCOAH': { name: '沉默坚韧型', description: '低外向、高尽责、宜人的默默贡献者', archetype: '无名英雄' },
  'HOEAN': { name: '社交蝴蝶', description: '高开放、高外向、高宜人的人气王', archetype: '魅力中心' },
  'HOCEN': { name: '科学巨匠', description: '高开放、高尽责、情绪稳定的研究者', archetype: '真理探索者' },
  'LOCAH': { name: '实用保守派', description: '低开放、高尽责、低神经质的务实主义者', archetype: '稳健基石' },
  'HOELN': { name: '创意领袖', description: '高开放、高外向、低宜人的创新推动者', archetype: '变革先锋' },
  'HOCAN': { name: '完美主义者', description: '高开放、高尽责、高宜人、情绪稳定的理想主义者', archetype: '至善追寻者' },
}

export const bigFiveReferences = [
  'McCrae, R. R., & Costa, P. T. (1997). Personality trait structure as a human universal. American Psychologist, 52(5), 509-516.',
  'Costa, P. T., & McCrae, R. R. (1992). Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory (NEO-FFI) professional manual. Psychological Assessment Resources.',
  'John, O. P., Naumann, L. P., & Soto, C. J. (2008). Paradigm shift to the integrative Big Five trait taxonomy. Handbook of personality: Theory and research, 3, 114-158.',
]

export type BigFiveFactor = typeof BIG_FIVE_FACTORS[number]
export type BigFiveFacet = string

export interface BigFiveQuestionMeta {
  dimension: BigFiveFactor | string
  factor?: BigFiveFactor | string
  factorLoading: number
  discrimination: number
  pole: string
  facet?: string
  difficulty?: number
  reverseScored?: boolean
  socialDesirability?: number
}

export type BigFiveQuestion = ProfessionalQuestion & {
  dimension?: BigFiveFactor | string
  reverse?: boolean
  meta: BigFiveQuestionMeta
}



