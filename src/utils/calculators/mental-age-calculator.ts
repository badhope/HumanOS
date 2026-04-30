import type { Answer } from '../../types'

export function calculateMentalAge(answers: Answer[]) {
  const dimensions: Record<string, number[]> = {
    cognition: [],
    emotional: [],
    social: [],
    responsibility: [],
    resilience: [],
  }
  const dimensionMap: Record<string, string> = {
    'age-1': 'cognition', 'age-2': 'cognition', 'age-3': 'cognition',
    'age-4': 'emotional', 'age-5': 'emotional', 'age-6': 'emotional',
    'age-7': 'social', 'age-8': 'social', 'age-9': 'social',
    'age-10': 'responsibility', 'age-11': 'responsibility', 'age-12': 'responsibility',
    'age-13': 'resilience', 'age-14': 'resilience', 'age-15': 'resilience',
    'age-16': 'resilience', 'age-17': 'resilience', 'age-18': 'resilience',
  }

  answers.forEach((answer: any) => {
    const qid = answer.questionId
    const dim = dimensionMap[qid] || 'resilience'
    const v = typeof answer.value === 'number' ? answer.value : parseInt(String(answer.value || 3))
    dimensions[dim].push(v)
  })

  const scores: Record<string, number> = {}
  Object.keys(dimensions).forEach(key => {
    const arr = dimensions[key]
    const avg = arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length)
    scores[key] = Math.round((6 - avg) * 20)
  })

  const totalScore = (scores.cognition + scores.emotional + scores.social +
    scores.resilience * 0.5 + scores.responsibility * 0.5) / 4

  const LEVELS = [
    { min: 90, type: '永恒童心', emoji: '👶', age: 7 },
    { min: 75, type: '热血少年', emoji: '🔥', age: 18 },
    { min: 60, type: '新锐青年', emoji: '⚡', age: 25 },
    { min: 45, type: '成熟壮年', emoji: '🧠', age: 35 },
    { min: 30, type: '智慧长者', emoji: '🎣', age: 50 },
    { min: 0, type: '千年老妖', emoji: '🏛️', age: 99 },
  ]

  const level = LEVELS.find(l => totalScore >= l.min) || LEVELS[5]
  const mentalAge = level.age + Math.floor(Math.random() * 5)

  return {
    mentalAge,
    type: level.type,
    emoji: level.emoji,
    dimensionScores: scores,
    dimensions: [
      { name: '认知开放度', score: scores.cognition, color: '#8B5CF6' },
      { name: '情绪稳定性', score: scores.emotional, color: '#EC4899' },
      { name: '社交成熟度', score: scores.social, color: '#10B981' },
      { name: '责任感', score: scores.responsibility, color: '#F59E0B' },
      { name: '抗挫力', score: scores.resilience, color: '#0EA5E9' },
    ],
    title: `你的心理年龄: ${mentalAge}岁`,
    subtitle: level.type,
    summary: `经测评，你的心理年龄为 ${mentalAge} 岁，属于「${level.type}」类型。`,
    overallScore: Math.round(totalScore),
  }
}
