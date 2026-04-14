import type { ProfessionalQuestion } from '../../../types'

export const EQ_DIMENSIONS = ['selfAwareness', 'selfManagement', 'socialAwareness', 'relationshipManagement'] as const

export const EQ_DIMENSION_NAMES: Record<string, string> = {
  selfAwareness: '自我觉知',
  selfManagement: '自我管理',
  socialAwareness: '社会觉知',
  relationshipManagement: '关系管理',
}

export const EQ_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  selfAwareness: '识别自身情绪、优势、局限和价值信念的能力',
  selfManagement: '调节自身情绪、冲动和适应变化的能力',
  socialAwareness: '理解他人情绪、视角和关切的能力',
  relationshipManagement: '建立和维持健康人际关系的能力',
}

export const EQ_DIMENSION_BANDS: Record<string, Array<{ range: [number, number]; band: string; description: string }>> = {
  selfAwareness: [
    { range: [0, 10], band: '极度麻木', description: '完全无法感知自身情绪，对自己的优势和局限毫无认识' },
    { range: [11, 20], band: '典型麻木', description: '情绪觉察严重不足，自我认知非常模糊' },
    { range: [21, 30], band: '温和迟钝', description: '自我觉察能力有限，需要他人反馈才能认识自己' },
    { range: [31, 40], band: '轻微迟钝', description: '轻度自我觉察不足，偶尔忽略内心感受' },
    { range: [41, 45], band: '略偏内向', description: '微偏向内心封闭，对自我觉察关注较少' },
    { range: [46, 54], band: '中间型', description: '自我觉察能力平均，能识别基本情绪' },
    { range: [55, 59], band: '略偏觉知', description: '微偏向自我觉察，开始关注内心世界' },
    { range: [60, 69], band: '轻微觉知', description: '有较好的情绪觉察能力，了解自己的大致优劣势' },
    { range: [70, 79], band: '温和觉知', description: '自我觉察清晰，能准确识别和命名多种情绪' },
    { range: [80, 89], band: '典型觉知', description: '深度自我认知，情绪体验非常丰富且细腻' },
    { range: [90, 100], band: '极度觉知', description: '近乎完全的自我透明，对自己的每一丝情绪都了然于心' },
  ],
  selfManagement: [
    { range: [0, 10], band: '极度冲动', description: '完全受情绪支配，毫无自控能力，适应力为零' },
    { range: [11, 20], band: '典型失控', description: '情绪管理非常困难，经常冲动行事且难以恢复' },
    { range: [21, 30], band: '温和失控', description: '自我调节能力较弱，压力下容易情绪崩溃' },
    { range: [31, 40], band: '轻微失控', description: '情绪管理基本但不稳定，遇到挫折容易波动' },
    { range: [41, 45], band: '略偏被动', description: '微偏向被动应对，情绪调节有时滞后' },
    { range: [46, 54], band: '中间型', description: '情绪管理能力平均，普通情境下能保持稳定' },
    { range: [55, 59], band: '略偏主动', description: '微偏向主动调节，能有意识地管理情绪' },
    { range: [60, 69], band: '轻微自律', description: '情绪控制良好，大多数情况下能保持冷静' },
    { range: [70, 79], band: '温和自律', description: '自我管理能力强，面对压力和挫折能灵活调适' },
    { range: [80, 89], band: '典型自律', description: '高度情绪自控，即使在极端压力下也能保持镇定' },
    { range: [90, 100], band: '极度自律', description: '近乎完美的情绪调节大师，情绪状态始终如一的稳定' },
  ],
  socialAwareness: [
    { range: [0, 10], band: '极度自我', description: '完全无视他人感受，毫无同理心，社交中极其迟钝' },
    { range: [11, 20], band: '典型自我', description: '非常自我中心，很难理解他人视角和情绪' },
    { range: [21, 30], band: '温和自我', description: '社会觉知能力偏低，常常忽略他人的非语言信号' },
    { range: [31, 40], band: '轻微自我', description: '轻度社会觉察不足，需要明确表达才能理解他人感受' },
    { range: [41, 45], band: '略偏自我', description: '微偏向关注自己，对他人感受有时不够敏感' },
    { range: [46, 54], band: '中间型', description: '社会觉知能力平均，能理解大多数明显的情绪信号' },
    { range: [55, 59], band: '略偏敏感', description: '微偏向社会觉察，能注意到他人情绪的细微变化' },
    { range: [60, 69], band: '轻微敏感', description: '同理心良好，能准确感知他人情绪和需求' },
    { range: [70, 79], band: '温和敏感', description: '社会知觉敏锐，善于洞察他人未言说的真实感受' },
    { range: [80, 89], band: '典型敏感', description: '高度共情能力，几乎能与任何人产生情感共鸣' },
    { range: [90, 100], band: '极度敏感', description: '近乎读心术级别的共情，能精准捕捉任何微妙的人际信号' },
  ],
  relationshipManagement: [
    { range: [0, 10], band: '极度疏离', description: '完全无法建立和维持关系，人际冲突不断' },
    { range: [11, 20], band: '典型疏离', description: '关系管理能力严重不足，难以维持健康的人际连接' },
    { range: [21, 30], band: '温和疏离', description: '人际技能有限，关系容易出现问题和矛盾' },
    { range: [31, 40], band: '轻微疏离', description: '轻度关系管理不足，维持深度连接有困难' },
    { range: [41, 45], band: '略偏独立', description: '微偏向独立，有时在关系中保持距离' },
    { range: [46, 54], band: '中间型', description: '关系管理能力平均，能维持基本正常的社交网络' },
    { range: [55, 59], band: '略偏连接', description: '微偏向人际连接，重视关系质量' },
    { range: [60, 69], band: '轻微擅长', description: '关系技能良好，是很好的合作者和沟通者' },
    { range: [70, 79], band: '温和擅长', description: '人际关系管理出色，善于影响、沟通和解决冲突' },
    { range: [80, 89], band: '典型擅长', description: '天生的关系建筑师，能建立和维持广泛深厚的人际网络' },
    { range: [90, 100], band: '极度擅长', description: '传奇级别的人际关系大师，任何人都能成为他的挚友和盟友' },
  ],
}

export const EQ_SUBSCALES: Record<string, string[]> = {
  selfAwareness: ['情绪识别精确度', '自我评估准确度', '自我价值感强度'],
  selfManagement: ['情绪控制能力', '环境适应弹性', '成就驱动力', '乐观坚韧度'],
  socialAwareness: ['同理共鸣深度', '组织政治敏感度', '服务他人导向'],
  relationshipManagement: ['影响说服能力', '沟通表达清晰度', '冲突解决智慧', '团队协作贡献度'],
}

export const EQ_EMOTIONAL_PROFILES: Record<string, { name: string; description: string; archetype: string }> = {
  'HHHH': { name: '情商宗师', description: '四大维度全高，完美的情绪智力典范', archetype: '心灵导师' },
  'HHHL': { name: '内圣外王', description: '自我维度极高，关系管理略弱的智者', archetype: '修行大师' },
  'HHLH': { name: '感知天才', description: '自我管理略弱但共情能力超强的心灵捕手', archetype: '灵魂知己' },
  'HHLL': { name: '深度内省者', description: '自我觉察极高但社会技能略弱的内观大师', archetype: '内观禅师' },
  'HLHH': { name: '天生领袖', description: '自我觉察略低但行动和关系能力超强的掌舵人', archetype: '魅力领袖' },
  'HLHL': { name: '行动巨擘', description: '自我管理和执行能力超强的实干家', archetype: '执行大师' },
  'HLLH': { name: '人情练达', description: '社会觉知和关系管理双高的社交达人', archetype: '人脉枢纽' },
  'HLLL': { name: '自我觉察者', description: '自我觉知领先其他维度的清醒观察者', archetype: '人间清醒' },
  'LHHH': { name: '社交磁铁', description: '自我觉察略低但其他三维全高的人缘王', archetype: '人气中心' },
  'LHHL': { name: '情绪守护者', description: '自我管理和共情能力出众的情绪容器', archetype: '情绪容器' },
  'LHLH': { name: '温暖连接者', description: '共情和关系能力出色的关系建造者', archetype: '关系纽带' },
  'LHLL': { name: '冷静自律者', description: '自我管理出色的沉默稳定器', archetype: '情绪锚点' },
  'LLHH': { name: '社交操盘手', description: '社会觉知和关系管理双高的人际战略家', archetype: '人际军师' },
  'LLHL': { name: '服务天使', description: '共情能力超群的无私奉献者', archetype: '守护天使' },
  'LLLH': { name: '关系天才', description: '仅凭关系管理能力就能获得成功的社交奇才', archetype: '社交奇才' },
  'MMMM': { name: '情绪中庸者', description: '各维度均衡发展的情绪正常人', archetype: '情绪公民' },
}

export const eqNormData = {
  selfAwareness: { mean: 50, sd: 10, n: 10000 },
  selfManagement: { mean: 50, sd: 10, n: 10000 },
  socialAwareness: { mean: 50, sd: 10, n: 10000 },
  relationshipManagement: { mean: 50, sd: 10, n: 10000 },
}

export const eqReferences = [
  'Goleman, D. (1995). Emotional intelligence. Bantam.',
  'Bar-On, R. (1997). Bar-On Emotional Quotient Inventory (EQ-i): Technical manual. Multi-Health Systems.',
  'Mayer, J. D., Salovey, P., & Caruso, D. R. (2000). Models of emotional intelligence. Handbook of intelligence, 396-420.',
]

export type EQDimension = typeof EQ_DIMENSIONS[number]

export interface EQQuestionMeta {
  dimension: EQDimension
  subscale: string
  discrimination: number
  difficulty: number
  socialDesirability: number
}

export type EQQuestion = ProfessionalQuestion & { meta: EQQuestionMeta }



