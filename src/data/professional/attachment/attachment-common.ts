import type { ProfessionalQuestion } from '../../../types'

export const ATTACHMENT_DIMENSIONS = ['ANXIETY', 'AVOIDANCE'] as const

export const ATTACHMENT_DIMENSION_NAMES: Record<string, string> = {
  'ANXIETY': '依恋焦虑',
  'AVOIDANCE': '依恋回避',
}

export const ATTACHMENT_DIMENSION_FULL_NAMES: Record<string, string> = {
  'ANXIETY': '依恋焦虑 (被抛弃恐惧)',
  'AVOIDANCE': '依恋回避 (亲密不适)',
}

export const ATTACHMENT_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  'ANXIETY': '对被抛弃、被拒绝的深层恐惧，自我价值感的内在稳定性，对他人回应的情绪敏感性',
  'AVOIDANCE': '对情感亲密和依赖他人的本能不适，心理防御强度，对极端独立的执念程度',
}

export const ATTACHMENT_DIMENSION_BANDS: Record<string, Array<{ range: [number, number]; band: string; description: string }>> = {
  ANXIETY: [
    { range: [0, 10], band: '极度淡定', description: '宇宙级安全感，天塌下来都不担心会被抛弃' },
    { range: [11, 20], band: '典型安心', description: '非常有安全感，几乎不会担心关系出问题' },
    { range: [21, 30], band: '温和安心', description: '比较自信，相信自己值得被爱' },
    { range: [31, 40], band: '轻微安心', description: '轻度有安全感，偶尔会有小担忧但很快平复' },
    { range: [41, 45], band: '略偏安心', description: '微偏向安全，大部分时候都很安心' },
    { range: [46, 54], band: '中间型', description: '安全感水平中等，不焦虑也不过度放心' },
    { range: [55, 59], band: '略偏敏感', description: '微偏向敏感，偶尔会胡思乱想' },
    { range: [60, 69], band: '轻微敏感', description: '轻度焦虑，需要定期确认对方的心意' },
    { range: [70, 79], band: '温和焦虑', description: '偏焦虑型，需要很多的爱和肯定才能安心' },
    { range: [80, 89], band: '典型焦虑', description: '标准的焦虑型，一点风吹草动就觉得要被抛弃了' },
    { range: [90, 100], band: '极度焦虑', description: '一秒没回消息=你不爱我了，24小时高强度分离焦虑' },
  ],
  AVOIDANCE: [
    { range: [0, 10], band: '极度粘人', description: '完全没有边界，24小时贴在一起都不够' },
    { range: [11, 20], band: '典型亲密', description: '非常享受亲密，依赖是爱最自然的表达' },
    { range: [21, 30], band: '温和亲密', description: '比较喜欢亲密，坦诚和连接是关系的基础' },
    { range: [31, 40], band: '轻微亲密', description: '轻度享受亲密，信任并愿意依赖对方' },
    { range: [41, 45], band: '略偏亲密', description: '微偏向亲密，大部分时候愿意敞开心扉' },
    { range: [46, 54], band: '中间型', description: '亲密与独立平衡，既能亲近也能独处' },
    { range: [55, 59], band: '略偏独立', description: '微偏向独立，需要一些个人空间' },
    { range: [60, 69], band: '轻微回避', description: '轻度独立，太亲密会有点不自在' },
    { range: [70, 79], band: '温和回避', description: '偏回避型，极度重视独立，情感习惯性抽离' },
    { range: [80, 89], band: '典型回避', description: '标准的回避型，一谈恋爱就想逃跑的人间孤狼' },
    { range: [90, 100], band: '极度回避', description: '亲密过敏体质，爱会消失对不对，不如我先消失' },
  ],
}

export const ATTACHMENT_FACETS: Record<string, string[]> = {
  ANXIETY: ['抛弃恐惧', '认可渴求', '情绪反应性', '分离痛苦', '自我价值不稳定性'],
  AVOIDANCE: ['亲密不适', '情感疏离', '自立强调', '依赖否认', '亲密恐惧'],
}

export const ATTACHMENT_ARCHETYPES: Record<string, { name: string; description: string; archetype: string; loveLanguage: string }> = {
  'LL': { name: '安全型本真者', description: '焦虑与回避双低，最健康的依恋模式', archetype: '爱的大师', loveLanguage: '真诚陪伴+双向奔赴' },
  'HL': { name: '追爱的小刺猬', description: '高焦虑低回避，越爱越不安的粘人精', archetype: '粘人猫咪', loveLanguage: '秒回+报备+时时刻刻的在意' },
  'LH': { name: '逃家的独行侠', description: '低焦虑高回避，爱自由胜过爱爱情的人间孤岛', archetype: '高冷猫咪', loveLanguage: '给我空间+我找你的时候你要在' },
  'HH': { name: '爱恨交织的龙卷风', description: '焦虑与回避双高，想要爱又推开爱的矛盾体', archetype: '炸毛刺猬', loveLanguage: '我推开你的时候，要抱紧我但别太近' },
}

export const ATTACHMENT_STYLES: Record<string, {
  name: string
  description: string
  characteristics: string[]
  relationshipPattern: string
  growthAreas: string[]
}> = {
  'SECURE': {
    name: '安全型依恋',
    description: '在亲密关系中感到自在，能够平衡亲密与独立，信任他人也信任自己',
    characteristics: ['情绪稳定', '有效沟通', '适度依赖', '信任他人', '接纳不完美'],
    relationshipPattern: '能够享受亲密，也能尊重边界。冲突时聚焦问题解决而非情绪宣泄，能够给予和接受支持。',
    growthAreas: ['继续保持真诚沟通', '加深对伴侣内心世界的理解', '在关系中保持成长心态'],
  },
  'PREOCCUPIED': {
    name: '专注型依恋（焦虑型）',
    description: '渴望极度亲密，害怕被抛弃，对关系中的信号高度敏感',
    characteristics: ['害怕孤独', '需要持续确认', '情绪波动大', '过度理想化', '害怕拒绝'],
    relationshipPattern: '容易陷入恋爱脑，过度投入关系，常常揣测对方心意，容易因小事感到受伤或被忽视。',
    growthAreas: ['建立内在安全感', '降低对他人回应的期待', '发展独立的兴趣和社交圈'],
  },
  'DISMISSIVE': {
    name: '漠视型依恋（回避型）',
    description: '过度强调独立，情感疏远，回避真正的亲密',
    characteristics: ['强调独立', '情感隔离', '否认需要', '贬低依赖', '自我满足'],
    relationshipPattern: '总是保持距离，"不需要任何人"的姿态下隐藏着对被控制的恐惧，倾向于在关系太近时撤离。',
    growthAreas: ['承认对连接的需要', '练习情感的脆弱性', '学会信任和依赖他人'],
  },
  'FEARFUL': {
    name: '恐惧型依恋（混乱型）',
    description: '既渴望亲密又害怕受伤，在靠近与逃离之间摇摆',
    characteristics: ['矛盾心态', '害怕亲密', '信任困难', '情感波动', '边界模糊'],
    relationshipPattern: '想要爱又不敢爱，对方靠近就想逃，对方疏远又想要抓回来，容易陷入爱恨交织的关系模式。',
    growthAreas: ['建立一致的内在安全感', '理清自己的真实需要', '学会设定健康的边界'],
  },
}

export const ecrNormData = {
  overall: { mean: 50, sd: 15, n: 20000 },
  ANXIETY: { mean: 50, sd: 18, n: 20000 },
  AVOIDANCE: { mean: 50, sd: 18, n: 20000 },
}

export const attachmentReferences = [
  'Bartholomew, K., & Horowitz, L. M. (1991). Attachment styles among young adults: A test of a four-category model. Journal of Personality and Social Psychology, 61(2), 226-244.',
  'Brennan, K. A., Clark, C. L., & Shaver, P. R. (1998). Self-report measurement of adult attachment: An integrative overview. In J. A. Simpson & W. S. Rholes (Eds.), Attachment theory and close relationships (pp. 46-76). Guilford Press.',
  'Fraley, R. C., Waller, N. G., & Brennan, K. A. (2000). An item-response theory analysis of self-report measures of adult attachment. Journal of Personality and Social Psychology, 78(2), 350-365.',
]

export type AttachmentDimension = typeof ATTACHMENT_DIMENSIONS[number]

export interface AttachmentQuestionMeta {
  dimension: AttachmentDimension
  facet: string
  factorLoading: number
  discrimination: number
  difficulty: number
  reverseScored?: boolean
  socialDesirability: number
}

export type AttachmentQuestion = ProfessionalQuestion & { meta: AttachmentQuestionMeta }



