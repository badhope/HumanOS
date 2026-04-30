/**
 * ABM 恋爱动物人格 计算器
 * 从 data/assessments/abm-love-animal.ts 提取的独立计算逻辑
 */

export function calculateABMLoveAnimal(answers: Record<string, number> | any[]) {
  const dimensionScores: Record<string, number[]> = {
    dependency: [],
    initiative: [],
    passion: [],
    emotional: [],
    idealism: [],
  }
  const dimensionMap: Record<string, string> = {
    'abm-1': 'dependency', 'abm-2': 'dependency', 'abm-3': 'dependency',
    'abm-4': 'initiative', 'abm-5': 'initiative', 'abm-6': 'initiative',
    'abm-7': 'passion', 'abm-8': 'passion', 'abm-9': 'passion',
    'abm-10': 'emotional', 'abm-11': 'emotional', 'abm-12': 'emotional',
    'abm-13': 'idealism', 'abm-14': 'idealism', 'abm-15': 'idealism', 'abm-16': 'idealism',
  }

  const TWELVE_LOVE_ANIMALS = [
    { type: 'cat', name: '傲娇猫', emoji: '🐱', desc: '表面冷淡内心火热' },
    { type: 'dog', name: '忠犬', emoji: '🐶', desc: '一心一意至死不渝' },
    { type: 'fox', name: '狡狐', emoji: '🦊', desc: '聪明机警魅力四射' },
    { type: 'rabbit', name: '软兔', emoji: '🐰', desc: '温柔敏感需要保护' },
    { type: 'eagle', name: '鹰眼', emoji: '🦅', desc: '自由独立不拘一格' },
    { type: 'panda', name: '竹熊', emoji: '🐼', desc: '慵懒可爱佛系恋爱' },
    { type: 'peacock', name: '孔雀', emoji: '🦚', desc: '华丽绽放引人注目' },
    { type: 'penguin', name: '企鹅', emoji: '🐧', desc: '忠诚专一共度一生' },
    { type: 'dolphin', name: '海豚', emoji: '🐬', desc: '聪慧温柔善于沟通' },
    { type: 'swan', name: '天鹅', emoji: '🦢', desc: '优雅浪漫追求完美' },
    { type: 'otter', name: '水獭', emoji: '🦦', desc: '活泼可爱充满活力' },
    { type: 'owl', name: '夜鸮', emoji: '🦉', desc: '深沉内敛洞察人心' },
  ]

  const answerArray = Array.isArray(answers)
    ? answers
    : Object.entries(answers).map(([questionId, value]) => ({ questionId, value }))

  answerArray.forEach((answer: any) => {
    const qid = answer.questionId || answer.questionId
    const dim = dimensionMap[qid] || 'dependency'
    const v = typeof answer.value === 'number' ? answer.value : parseInt(String(answer.value || 3))
    dimensionScores[dim].push(v)
  })

  const scores: Record<string, number> = {}
  Object.keys(dimensionScores).forEach(key => {
    const arr = dimensionScores[key]
    const avg = arr.reduce((a: number, b: number) => a + b, 0) / Math.max(1, arr.length)
    scores[key] = Math.round(avg * 20)
  })

  const signature = scores.dependency * 10000 + scores.initiative * 1000 +
    scores.passion * 100 + scores.emotional * 10 + scores.idealism

  const matchedAnimal = TWELVE_LOVE_ANIMALS[signature % 12]

  return {
    type: matchedAnimal.type,
    name: matchedAnimal.name,
    emoji: matchedAnimal.emoji,
    desc: matchedAnimal.desc,
    dimensionScores: scores,
    dimensions: [
      { name: '依赖度', score: scores.dependency, color: '#F59E0B' },
      { name: '主动性', score: scores.initiative, color: '#8B5CF6' },
      { name: '热情值', score: scores.passion, color: '#EC4899' },
      { name: '感性度', score: scores.emotional, color: '#F97316' },
      { name: '理想主义', score: scores.idealism, color: '#0EA5E9' },
    ],
    overall: matchedAnimal.name,
    allAnimals: TWELVE_LOVE_ANIMALS,
  }
}
