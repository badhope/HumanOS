import type { Answer, AssessmentResult, Dimension } from '../../types'

export type TransformationalDimension = 'idealized-influence' | 'inspirational-motivation' | 'intellectual-stimulation' | 'individualized-consideration'

const dimensionNames: Record<TransformationalDimension, string> = {
  'idealized-influence': '理想化影响',
  'inspirational-motivation': '鼓舞动机',
  'intellectual-stimulation': '智力激发',
  'individualized-consideration': '个性化关怀',
}

const dimensionDescriptions: Record<TransformationalDimension, string> = {
  'idealized-influence': '成为榜样，赢得信任和尊重',
  'inspirational-motivation': '描绘愿景，激励团队追求卓越',
  'intellectual-stimulation': '挑战现状，鼓励创新和批判性思维',
  'individualized-consideration': '关注个体，因材施教培养下属',
}

const leaderTypes = [
  { min: 0, max: 30, level: '初出茅庐管理者', description: '领导力还在萌芽期，需要更多实践和学习' },
  { min: 31, max: 50, level: '任务型管理者', description: '擅长完成目标，但在激励和发展他人方面仍需提升' },
  { min: 51, max: 70, level: '服务型领导者', description: '关心团队成员，能够带领团队稳定前进' },
  { min: 71, max: 85, level: '变革型领导者', description: '真正的变革推动者，能够带领团队突破和成长' },
  { min: 86, max: 100, level: '魅力型领袖', description: '天生的领导者，人们心甘情愿追随你' },
]

export function calculateMLQ(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    'idealized-influence': ['mlq1', 'mlq5', 'mlq9', 'mlq13', 'mlq17'],
    'inspirational-motivation': ['mlq2', 'mlq6', 'mlq10', 'mlq14', 'mlq18'],
    'intellectual-stimulation': ['mlq3', 'mlq7', 'mlq11', 'mlq15', 'mlq19'],
    'individualized-consideration': ['mlq4', 'mlq8', 'mlq12', 'mlq16', 'mlq20'],
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    const value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('mlqn', 'mlq')
    answerMap[qid] = value
  })

  const dimensions: Dimension[] = []
  const scores: Record<string, number> = {}

  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const normalizedScore = Math.min(100, Math.max(0, (((score / ids.length) - 1) / 4) * 100))
    scores[dim] = Math.round(normalizedScore)
    
    dimensions.push({
      name: dimensionNames[dim as TransformationalDimension],
      score: Math.round(normalizedScore),
      description: dimensionDescriptions[dim as TransformationalDimension],
    })
  })

  const overallScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 4)
  const leaderType = leaderTypes.find(t => overallScore >= t.min && overallScore <= t.max) || leaderTypes[2]
  const traits = generateTraits(scores, overallScore)

  return {
    type: 'mlq',
    title: '领导力测评完成',
    subtitle: leaderType.level,
    summary: leaderType.description,
    overallScore,
    dimensions,
    traits,
  }
}

function generateTraits(scores: Record<string, number>, overallScore: number) {
  const traits: any[] = []

  if (overallScore >= 85) {
    traits.push({ name: '天生领袖', description: '人们会不自觉地追随你', positive: true })
  }

  if (scores['idealized-influence'] >= 80) {
    traits.push({ name: '精神图腾', description: '你的存在本身就是激励', positive: true })
  }

  if (scores['inspirational-motivation'] >= 80) {
    traits.push({ name: '造梦大师', description: '能够点燃每个人心中的火焰', positive: true })
  }

  if (scores['intellectual-stimulation'] >= 80) {
    traits.push({ name: '思维教练', description: '授人以渔，教人思考', positive: true })
  }

  if (scores['individualized-consideration'] >= 80) {
    traits.push({ name: '精神导师', description: '看见每一个人的独特潜力', positive: true })
  }

  if (scores['idealized-influence'] >= 75 && scores['inspirational-motivation'] >= 75) {
    traits.push({ name: '魅力人格', description: '自带光环的领导者', positive: true })
  }

  if (scores['intellectual-stimulation'] >= 75 && scores['individualized-consideration'] >= 75) {
    traits.push({ name: '人才挖掘机', description: '普通人在你手下也能发光发热', positive: true })
  }

  if (overallScore <= 25) {
    traits.push({ name: '独行者', description: '管好自己就行，带队太累了', positive: true })
  }

  const allHigh = Object.values(scores).every(s => s >= 70)
  if (allHigh) {
    traits.push({ name: '4D全能领袖', description: '四个维度全部满点，六边形战士', positive: true })
  }

  return traits
}
