import type { Answer, AssessmentResult, Dimension } from '../../types'

export type HardinessDimension = 'commitment' | 'control' | 'challenge'

const dimensionInfo: Record<HardinessDimension, {
  name: string
  description: string
}> = {
  commitment: {
    name: '投入性',
    description: '对生活充满热情，深度参与每件事情的态度',
  },
  control: {
    name: '控制性',
    description: '相信自己能够影响事情发展的内心信念',
  },
  challenge: {
    name: '挑战性',
    description: '视变化和挫折为成长机会的积极心态',
  },
}

const scoreBands = [
  { min: 0, max: 25, level: '心理韧性极低', description: '对压力高度敏感，在挫折面前容易崩溃，需要系统学习压力应对和心理建设方法' },
  { min: 26, max: 45, level: '心理韧性较低', description: '面对重大挫折时容易感到无助，需要更多支持和积极心态培养' },
  { min: 46, max: 65, level: '心理韧性中等', description: '具备基本的抗压能力，能够应对常规压力，在极端环境下仍需加强' },
  { min: 66, max: 85, level: '心理韧性良好', description: '具备良好的心理弹性，能够在挫折中保持冷静并快速恢复' },
  { min: 86, max: 100, level: '心理韧性极强', description: '3C人格完整！投入×控制×挑战三合一，真正的抗压达人，越挫越勇' },
]

export function calculateHardiness(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    commitment: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    control: ['h7', 'h8', 'h9', 'h10', 'h11', 'h12'],
    challenge: ['h13', 'h14', 'h15', 'h16', 'h17', 'h18'],
  }

  const reverseScoredItems = ['h3', 'h6', 'h9', 'h12', 'h15', 'h18']
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('hn', 'h')
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
    const maxScore = (ids.length || 1) * 5
    const normalizedScore = Math.min(100, Math.max(0, ((score / ids.length - 1) / 4) * 100))
    const info = dimensionInfo[dim as HardinessDimension]
    
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
    type: 'hardiness',
    title: '坚韧人格测评完成',
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

  if (overallScore >= 80) {
    traits.push({ name: '抗压达人', description: '高压下依然保持冷静和高效', positive: true })
  }

  if (overallScore <= 25) {
    traits.push({ name: '玻璃心', description: '对压力反应敏感，需要更多支持', positive: false })
  }

  if (highDims.includes('投入性')) traits.push({ name: '沉浸式玩家', description: '对生活充满热情，能深度参与每件事', positive: true })
  if (highDims.includes('控制性')) traits.push({ name: '命运操盘手', description: '相信自己能影响事情发展而非被动接受', positive: true })
  if (highDims.includes('挑战性')) traits.push({ name: '拥抱变化', description: '视变化为机遇而非威胁，永远在成长', positive: true })

  if (lowDims.includes('投入性')) traits.push({ name: '疏离感', description: '难以深度参与生活，容易感到空虚', positive: false })
  if (lowDims.includes('控制性')) traits.push({ name: '外控型', description: '倾向于认为事情由运气和环境决定', positive: false })
  if (lowDims.includes('挑战性')) traits.push({ name: '舒适区囚徒', description: '回避改变，喜欢确定安稳的环境', positive: false })

  return traits
}
