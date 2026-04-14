import type { ProfessionalQuestion } from '../../../types'

export const ECR_DIMENSIONS = ['anxiety', 'avoidance'] as const

export const ECR_DIMENSION_NAMES: Record<ECRDimension, string> = {
  anxiety: '依恋焦虑',
  avoidance: '依恋回避',
}

export const ATTACHMENT_STYLES = [
  { label: '安全型', quadrant: 'low-low', description: '舒适的亲密关系，信任且独立', security: 90 },
  { label: '专注型', quadrant: 'high-low', description: '渴望亲密，但害怕被抛弃，情感需求高', security: 50 },
  { label: '冷漠型', quadrant: 'low-high', description: '过度独立，回避亲密，否认情感需求', security: 45 },
  { label: '恐惧型', quadrant: 'high-high', description: '既渴望亲密又害怕受伤，充满内心冲突', security: 25 },
  { label: '焦虑倾向型', quadrant: 'moderate-low', description: '有些担心被抛弃，但整体关系稳定', security: 75 },
  { label: '回避倾向型', quadrant: 'low-moderate', description: '珍惜独立空间，仍能建立深度连接', security: 70 },
  { label: '成长中安全型', quadrant: 'moderate-moderate', description: '正在发展安全依恋能力，持续进步中', security: 65 },
] as const

export const ANXIETY_BANDS = [
  { range: [0, 20], label: '极度安心', description: '对关系充满信心，完全不担心被抛弃' },
  { range: [20, 30], label: '非常安心', description: '情感基础稳固，安全感充足' },
  { range: [30, 40], label: '相对安心', description: '偶尔有些担心，但整体稳定' },
  { range: [40, 50], label: '轻度焦虑', description: '开始需要确认对方的爱意' },
  { range: [50, 60], label: '中度焦虑', description: '经常担心被抛弃，需要大量 reassurance' },
  { range: [60, 70], label: '明显焦虑', description: '害怕独处，对关系变化高度敏感' },
  { range: [70, 80], label: '高度焦虑', description: '经常处于被抛弃的恐惧中' },
  { range: [80, 90], label: '严重焦虑', description: '依恋系统过度激活，严重影响生活' },
  { range: [90, 100], label: '极度焦虑', description: '创伤性的被抛弃恐惧' },
]

export const AVOIDANCE_BANDS = [
  { range: [0, 20], label: '极度亲近', description: '渴望情感融合，毫无保留' },
  { range: [20, 30], label: '非常亲近', description: '享受亲密无间，信任开放' },
  { range: [30, 40], label: '适度亲近', description: '享受亲密，也需要一些空间' },
  { range: [40, 50], label: '轻度回避', description: '对过于亲近感到有些不适' },
  { range: [50, 60], label: '中度回避', description: '需要大量独立空间，难以敞开心扉' },
  { range: [60, 70], label: '明显回避', description: '情感疏离，倾向于自给自足' },
  { range: [70, 80], label: '高度回避', description: '拒绝依赖，亲密接触引起不适' },
  { range: [80, 90], label: '严重回避', description: '情感关闭，几乎无法建立连接' },
  { range: [90, 100], label: '极度回避', description: '解离性的情感隔离' },
]

export function getAttachmentStyle(anxiety: number, avoidance: number): typeof ATTACHMENT_STYLES[number] {
  if (anxiety < 45 && avoidance < 45) return ATTACHMENT_STYLES[0]
  if (anxiety >= 55 && avoidance < 45) return ATTACHMENT_STYLES[1]
  if (anxiety < 45 && avoidance >= 55) return ATTACHMENT_STYLES[2]
  if (anxiety >= 55 && avoidance >= 55) return ATTACHMENT_STYLES[3]
  if (anxiety >= 45 && anxiety < 55 && avoidance < 45) return ATTACHMENT_STYLES[4]
  if (anxiety < 45 && avoidance >= 45 && avoidance < 55) return ATTACHMENT_STYLES[5]
  return ATTACHMENT_STYLES[6]
}

export type ECRDimension = typeof ECR_DIMENSIONS[number]

export const ecrNormData = {
  overall: { n: 85000 },
}

export const ecrReferences = [
  'Brennan, K. A., Clark, C. L., & Shaver, P. R. (1998). Self-report measurement of adult attachment: An integrative overview.',
  'Bartholomew, K., & Horowitz, L. M. (1991). Attachment styles among young adults: A test of a four-category model.',
]

export interface ECRQuestionMeta {
  dimension: ECRDimension
  reverseScored?: boolean
  factorLoading: number
  discrimination: number
}

export type ECRQuestion = ProfessionalQuestion & {
  meta: ECRQuestionMeta
}





