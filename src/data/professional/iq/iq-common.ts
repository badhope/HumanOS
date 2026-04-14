import type { LucideIcon } from 'lucide-react'
import * as Icons from 'lucide-react'

export type MatrixIconName = keyof typeof Icons
export type ShapeType = 'circle' | 'square' | 'triangle' | 'diamond' | 'pentagon' | 'hexagon' | 'star' | 'plus' | 'minus' | 'cross'

export interface MatrixCell {
  isMissing?: boolean
  icon?: MatrixIconName
  shape?: ShapeType
  count?: number
  rotation?: number
  size?: number
  filled?: boolean
  color?: 'black' | 'gray' | 'white'
  lines?: number
}

export interface MatrixRule {
  type: 'pattern_completion' | 'analogy' | 'progression' | 'series_relation' | 'abstract_reasoning' | 'shape_constancy' | 'shape_progression' | 'count_progression' | 'rotation' | 'overlay' | 'xor' | 'size_progression' | 'fill_pattern' | 'line_progression' | 'perception' | 'comparison' | 'composition' | 'transformation'
  dimension: 'row' | 'column' | 'both' | 'perception' | 'comparison' | 'composition' | 'transformation'
  description: string
}

export interface MatrixQuestion {
  id: string
  set: 'A' | 'B' | 'C' | 'D' | 'E'
  difficulty: 1 | 2 | 3 | 4 | 5
  matrixSize: 2 | 3
  matrix: MatrixCell[][]
  options: MatrixCell[]
  correctAnswer: number
  rules: MatrixRule[]
  explanation: string
  cognitiveDomain: string
  timeLimit: number
}

export const RAVEN_SETS = {
  A: { name: '视觉辨别', description: '简单图形比较、匹配', difficulty: 1, questionCount: 12 },
  B: { name: '类同比较', description: '图形类比、组合匹配', difficulty: 2, questionCount: 12 },
  C: { name: '比较推理', description: '渐进变化、图形组合', difficulty: 3, questionCount: 12 },
  D: { name: '系列关系', description: '图形套合、量的变化', difficulty: 4, questionCount: 12 },
  E: { name: '抽象推理', description: '套合互换、空间整合', difficulty: 5, questionCount: 12 },
}

export const IQ_DIMENSIONS = ['A', 'B', 'C', 'D', 'E'] as const
export const IQ_DIMENSION_NAMES: Record<string, string> = {
  A: '视觉辨别',
  B: '类同比较',
  C: '比较推理',
  D: '系列关系',
  E: '抽象推理',
}

export const IQ_BANDS = [
  { range: [0, 55], label: '极端低', description: '认知功能显著受限，需要系统性支持和训练', percentile: 0.1 },
  { range: [55, 65], label: '典型低', description: '抽象思维困难，需要具体、分步的指导', percentile: 1 },
  { range: [65, 75], label: '温和低', description: '学习新技能需要更多重复，擅长结构化任务', percentile: 5 },
  { range: [75, 85], label: '轻微低', description: '处理复杂信息较慢，但可以通过经验弥补', percentile: 16 },
  { range: [85, 92], label: '略偏低', description: '认知能力略低于平均，实践中表现稳定', percentile: 30 },
  { range: [92, 108], label: '中间型', description: '认知能力处于人群正态分布的核心区域', percentile: 50 },
  { range: [108, 115], label: '略偏高', description: '学习能力良好，能够掌握中等复杂度概念', percentile: 70 },
  { range: [115, 125], label: '轻微高', description: '能够独立分析问题，快速掌握新技能', percentile: 84 },
  { range: [125, 135], label: '温和高', description: '优秀的问题解决者，擅长策略性思维', percentile: 95 },
  { range: [135, 145], label: '典型高', description: '认知天赋突出，概念化能力极强', percentile: 99 },
  { range: [145, 200], label: '极端高', description: '智力天赋卓越，具备突破性思维潜能', percentile: 99.9 },
] as const

export function getIQBand(score: number): typeof IQ_BANDS[number] {
  return IQ_BANDS.find(band => score >= band.range[0] && score < band.range[1]) || IQ_BANDS[5]
}

export const iqNormData = {
  overall: { mean: 100, sd: 15, n: 10000 },
}

export const iqReferences = [
  'Raven, J. C. (1938). Progressive matrices: A perceptual test of intelligence. London: Lewis.',
  'Cattell, R. B. (1963). Theory of fluid and crystallized intelligence: A critical experiment.',
  'Spearman, C. (1904). "General Intelligence," Objectively Determined and Measured.',
]

export function calculateZScore(rawScore: number, mean: number = 100, sd: number = 15): number {
  return (rawScore - mean) / sd
}

export function calculatePercentile(zScore: number): number {
  const cdf = 0.5 * (1 + Math.sign(zScore) * Math.sqrt(1 - Math.exp(-2 * zScore * zScore / Math.PI)))
  return Math.round(cdf * 100)
}

export function rawScoreToIQ(correct: number, total: number): number {
  const accuracy = correct / total
  return Math.round(70 + accuracy * 80)
}
