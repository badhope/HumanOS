import type { Answer, AssessmentResult, Dimension } from '../../types'

export type MftFoundation = 'care' | 'fairness' | 'loyalty' | 'authority' | 'sanctity'

const foundationNames: Record<MftFoundation, string> = {
  care: '关爱/伤害',
  fairness: '公平/欺骗',
  loyalty: '忠诚/背叛',
  authority: '权威/颠覆',
  sanctity: '圣洁/堕落',
}

const foundationDescriptions: Record<MftFoundation, string> = {
  care: '对他人痛苦的感知和同情心',
  fairness: '对公平正义和互惠的关注',
  loyalty: '对内群体的忠诚和牺牲精神',
  authority: '对传统、等级和秩序的尊重',
  sanctity: '对神圣和纯洁的道德感知',
}

export function calculateMFT(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    care: ['mft1', 'mft6', 'mft11', 'mft16', 'mft21', 'mft26'],
    fairness: ['mft2', 'mft7', 'mft12', 'mft17', 'mft22', 'mft27'],
    loyalty: ['mft3', 'mft8', 'mft13', 'mft18', 'mft23', 'mft28'],
    authority: ['mft4', 'mft9', 'mft14', 'mft19', 'mft24', 'mft29'],
    sanctity: ['mft5', 'mft10', 'mft15', 'mft20', 'mft25', 'mft30'],
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    const value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('mftn', 'mft')
    answerMap[qid] = value
  })

  const dimensions: Dimension[] = []
  const scores: Record<string, number> = {}

  Object.entries(dimensionMap).forEach(([foundation, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const normalizedScore = Math.min(100, Math.max(0, (((score / ids.length) - 1) / 4) * 100))
    scores[foundation] = Math.round(normalizedScore)
    
    dimensions.push({
      name: foundationNames[foundation as MftFoundation],
      score: Math.round(normalizedScore),
      description: foundationDescriptions[foundation as MftFoundation],
    })
  })

  const moralMatrix = getMoralOrientation(scores)
  const traits = generateTraits(scores)

  return {
    type: 'mft',
    title: '道德基础测评完成',
    subtitle: moralMatrix.label,
    summary: moralMatrix.description,
    overallScore: Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5),
    dimensions,
    traits,
  }
}

function getMoralOrientation(scores: Record<string, number>) {
  const individualizing = (scores.care + scores.fairness) / 2
  const binding = (scores.loyalty + scores.authority + scores.sanctity) / 3
  const diff = individualizing - binding

  if (diff > 25) return { label: '🔵 典型自由主义者', description: '高度重视关爱和公平，对约束性道德关注较少。这是典型的进步主义道德观。' }
  if (diff > 10) return { label: '🔵 温和自由主义者', description: '更倾向于关爱和公平，但也能理解其他道德基础。' }
  if (diff < -25) return { label: '🔴 典型保守主义者', description: '五道德基础均衡发展，高度重视忠诚、权威和圣洁。这是典型的传统主义道德观。' }
  if (diff < -10) return { label: '🔴 温和保守主义者', description: '认可所有道德基础，更强调忠诚和秩序的价值。' }
  return { label: '⚪ 道德中间派', description: '在个人化道德和约束性道德之间取得了平衡，能够理解双方立场。' }
}

function generateTraits(scores: Record<string, number>) {
  const traits: any[] = []

  if (scores.care >= 85) {
    traits.push({ name: '慈悲心肠', description: '他人的痛苦就是你的痛苦', positive: true })
  }

  if (scores.fairness >= 85) {
    traits.push({ name: '正义化身', description: '这个世界必须是公平的', positive: true })
  }

  if (scores.loyalty >= 80) {
    traits.push({ name: '自己人', description: '背叛是你最不能容忍的事情', positive: true })
  }

  if (scores.authority >= 80) {
    traits.push({ name: '秩序守护者', description: '没有规矩，不成方圆', positive: true })
  }

  if (scores.sanctity >= 80) {
    traits.push({ name: '洁癖灵魂', description: '有些底线是绝对不能触碰的', positive: true })
  }

  if (scores.sanctity <= 25) {
    traits.push({ name: '道德虚无主义', description: '没有什么是神圣不可侵犯的', positive: true })
  }

  if (scores.care >= 75 && scores.loyalty <= 30) {
    traits.push({ name: '世界公民', description: '道德关怀不设国界，人人平等', positive: true })
  }

  if (scores.loyalty >= 75 && scores.care <= 40) {
    traits.push({ name: '血浓于水', description: '非我族类，其心必异', positive: false })
  }

  const allHigh = Object.values(scores).every(s => s >= 60)
  if (allHigh) {
    traits.push({ name: '道德完人', description: '五维全满，道德感异常强烈', positive: true })
  }

  const allLow = Object.values(scores).every(s => s <= 35)
  if (allLow) {
    traits.push({ name: '虚无主义', description: '道德只是人类的幻觉罢了', positive: false })
  }

  return traits
}
