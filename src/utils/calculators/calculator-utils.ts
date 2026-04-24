import type { Answer } from '../../types'

export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getAnswerValue(answer: Answer | undefined, defaultValue: number = 3): number {
  if (answer === undefined) return defaultValue
  if (typeof answer.value === 'number') return answer.value
  const parsed = parseInt(String(answer.value), 10)
  return isNaN(parsed) ? defaultValue : parsed
}

export function buildAnswerMap(answers: Answer[], defaultValue: number = 3): Record<string, number> {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = getAnswerValue(a, defaultValue)
  })
  return answerMap
}

export function safeDivide(numerator: number, denominator: number, fallback: number = 50): number {
  return denominator > 0 ? numerator / denominator : fallback
}

export function calculateDimensionScore(
  answerMap: Record<string, number>,
  questionIds: string[],
  defaultValue?: number
): { score: number; percentage: number } {
  const answeredIds = questionIds.filter(id => answerMap[id] !== undefined)
  const count = answeredIds.length || 1
  const maxScore = count * 4
  const score = answeredIds.reduce((sum, id) => sum + answerMap[id], 0)
  const percentage = Math.round(safeDivide(score, maxScore, 0.5) * 100)
  return { score, percentage }
}

export function calculateLikertScore(
  answerMap: Record<string, number>,
  items: string[],
  reverse: string[] = [],
  defaultValue?: number
): number {
  const answeredItems = items.filter(id => answerMap[id] !== undefined)
  const count = answeredItems.length || 1
  let raw = 0
  answeredItems.forEach(id => {
    let val = answerMap[id]
    if (reverse.includes(id)) val = 6 - val
    raw += val
  })
  return Math.round(safeDivide(raw - count, count * 3, 0.5) * 100)
}

export function normalizeScore(score: number, min: number = 0, max: number = 100): number {
  return Math.max(min, Math.min(max, score))
}

export function getPercentile(normalizedScore: number): number {
  if (normalizedScore >= 130) return 99
  if (normalizedScore >= 120) return 95
  if (normalizedScore >= 110) return 84
  if (normalizedScore >= 100) return 50
  if (normalizedScore >= 90) return 30
  if (normalizedScore >= 80) return 15
  return 5
}
