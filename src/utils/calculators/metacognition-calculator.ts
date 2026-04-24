import type { Answer, AssessmentResult, Dimension } from '../../types'

export type MetaDimension = 'knowledge' | 'regulation' | 'monitoring' | 'evaluation'

const dimensionInfo: Record<MetaDimension, {
  name: string
  description: string
}> = {
  knowledge: {
    name: '元认知知识',
    description: '关于自己认知过程和策略的知识',
  },
  regulation: {
    name: '认知调节',
    description: '调整和控制自己认知过程的能力',
  },
  monitoring: {
    name: '认知监控',
    description: '实时觉察自己认知状态的能力',
  },
  evaluation: {
    name: '认知评估',
    description: '评估和反思自己认知有效性的能力',
  },
}

const scoreBands = [
  { min: 0, max: 25, level: '认知盲', description: '对自己的思维过程几乎没有觉察，容易陷入思维陷阱和认知偏差' },
  { min: 26, max: 45, level: '元认知较弱', description: '元觉察能力有限，需要系统性学习如何"思考自己的思考"' },
  { min: 46, max: 65, level: '元认知中等', description: '具备基本的自我觉察能力，在复杂情境下仍需加强' },
  { min: 66, max: 85, level: '元认知良好', description: '能够有效监控和调节自己的思维过程，善于反思' },
  { min: 86, max: 100, level: '觉醒者', description: '真正的思考者！能够站在第三视角观察和优化自己的每一个思维过程' },
]

export function calculateMetacognition(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    knowledge: ['meta1', 'meta5', 'meta9', 'meta13', 'meta17'],
    regulation: ['meta2', 'meta6', 'meta10', 'meta14', 'meta18'],
    monitoring: ['meta3', 'meta7', 'meta11', 'meta15', 'meta19'],
    evaluation: ['meta4', 'meta8', 'meta12', 'meta16', 'meta20'],
  }

  const reverseScoredItems = ['meta5', 'meta10', 'meta15', 'meta20']
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('metan', 'meta')
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
    const info = dimensionInfo[dim as MetaDimension]
    
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
    type: 'metacognition',
    title: '元认知测评完成',
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
    traits.push({ name: '第三视角', description: '你能够跳出自己看自己', positive: true })
    traits.push({ name: '思维觉醒', description: '不再是思维的奴隶，而是思维的主人', positive: true })
  }

  if (overallScore <= 25) {
    traits.push({ name: '当局者迷', description: '完全沉浸在思维内容中，难以跳出来', positive: false })
  }

  if (highDims.includes('认知调节')) traits.push({ name: '大脑超频', description: '能够随意切换和调整自己的思维模式', positive: true })
  if (highDims.includes('认知监控')) traits.push({ name: '自我觉察大师', description: '每一个念头你都能清晰地观察', positive: true })
  if (highDims.includes('认知评估')) traits.push({ name: '思维复盘者', description: '你能够精准评估自己思维的有效性', positive: true })

  if (lowDims.includes('认知监控')) traits.push({ name: '思维自动驾驶', description: '大多数时候思维在无意识地运行', positive: false })
  if (lowDims.includes('认知调节')) traits.push({ name: '思维反刍', description: '陷入负面思维时难以自拔', positive: false })

  return traits
}
