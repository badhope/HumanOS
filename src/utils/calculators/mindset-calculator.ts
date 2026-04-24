import type { Answer, AssessmentResult, Dimension } from '../../types'

export type MindsetDimension = 'challenge' | 'effort' | 'failure' | 'criticism' | 'success'

const dimensionInfo: Record<MindsetDimension, {
  name: string
  description: string
}> = {
  challenge: {
    name: '拥抱挑战',
    description: '走出舒适区，主动寻求成长机会的倾向',
  },
  effort: {
    name: '努力信念',
    description: '相信努力能够改变能力和天赋的信念',
  },
  failure: {
    name: '面对挫折',
    description: '失败后坚持而非放弃的复原能力',
  },
  criticism: {
    name: '接受批评',
    description: '从负面反馈中学习而非防御的能力',
  },
  success: {
    name: '他人成功',
    description: '从他人成功中获得灵感而非威胁的心态',
  },
}

const scoreBands = [
  { min: 0, max: 25, level: '典型固定型思维', description: '相信能力是天生的，回避挑战，畏惧失败，思维模式严重限制了你的成长潜力' },
  { min: 26, max: 45, level: '偏固定型思维', description: '倾向于认为能力是固定的，在挫折面前容易放弃，需要培养成长心态' },
  { min: 46, max: 65, level: '中间型思维', description: '具备基本的成长意识，但在重大挑战和失败面前仍容易滑向固定型思维' },
  { min: 66, max: 85, level: '成长型思维', description: '相信能力可以通过努力发展，能够从挑战和反馈中持续学习' },
  { min: 86, max: 100, level: '终身成长者', description: '德韦克教授定义的理想思维模式！对你而言，能力永远只是成长的起点' },
]

export function calculateMindset(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    challenge: ['m1', 'm9', 'm16'],
    effort: ['m3', 'm7', 'm10', 'm17'],
    failure: ['m2', 'm4', 'm11', 'm18'],
    criticism: ['m5', 'm12', 'm19'],
    success: ['m6', 'm13', 'm14', 'm15', 'm20'],
  }

  const reverseScoredItems = ['m2', 'm3', 'm5', 'm6', 'm7', 'm13', 'm15']
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('msn', 'm')
    if (reverseScoredItems.includes(qid)) {
      value = 6 - value
    }
    answerMap[qid] = value
  })

  const dimensions: Dimension[] = []
  let totalScore = 0
  let dimensionCount = 0

  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const normalizedScore = Math.min(100, Math.max(0, (((score / ids.length) - 1) / 4) * 100))
    const info = dimensionInfo[dim as MindsetDimension]
    
    dimensions.push({
      name: info.name,
      score: Math.round(normalizedScore),
      description: info.description,
    })
    
    totalScore += normalizedScore
    dimensionCount++
  })

  const overallScore = Math.round(totalScore / dimensionCount)
  const band = scoreBands.find(b => overallScore >= b.min && overallScore <= b.max) || scoreBands[2]
  const traits = generateTraits(overallScore, dimensions)

  return {
    type: 'mindset',
    title: '思维模式测评完成',
    subtitle: band.level,
    summary: band.description,
    overallScore,
    dimensions,
    traits,
  }
}

function generateTraits(overallScore: number, dimensions: Dimension[]) {
  const traits: any[] = []
  const highDims = dimensions.filter(d => d.score >= 75).map(d => d.name)
  const lowDims = dimensions.filter(d => d.score <= 30).map(d => d.name)

  if (overallScore >= 85) {
    traits.push({ name: '终身成长者', description: '德韦克教授理想的思维模式', positive: true })
    traits.push({ name: '反脆弱体质', description: '凡是杀不死你的，都会让你更强大', positive: true })
  }

  if (overallScore <= 25) {
    traits.push({ name: '思维囚徒', description: '被"我不行"的信念囚禁在牢笼中', positive: false })
  }

  if (highDims.includes('拥抱挑战')) traits.push({ name: '舒适区拓荒者', description: '你的舒适区每天都在扩张', positive: true })
  if (highDims.includes('努力信念')) traits.push({ name: '复利信徒', description: '相信时间的力量，享受指数成长的前夜', positive: true })
  if (highDims.includes('面对挫折')) traits.push({ name: '打不死的小强', description: '失败只是数据点，不是最终判决', positive: true })
  if (highDims.includes('接受批评')) traits.push({ name: '反馈海绵', description: '批评是免费的升级包', positive: true })
  if (highDims.includes('他人成功')) traits.push({ name: '见贤思齐', description: '别人的成功是你的灵感来源', positive: true })

  if (lowDims.includes('拥抱挑战')) traits.push({ name: '舒适区居民', description: '喜欢确定安稳，回避未知挑战', positive: false })
  if (lowDims.includes('努力信念')) traits.push({ name: '宿命论者', description: '倾向于相信天赋决定一切', positive: false })
  if (lowDims.includes('面对挫折')) traits.push({ name: '一击即溃', description: '失败容易让你一蹶不振', positive: false })

  return traits
}
