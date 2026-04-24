import type { Answer, AssessmentResult, Dimension } from '../../types'

export type PcqDimension = 'efficacy' | 'hope' | 'resilience' | 'optimism'

const dimensionInfo: Record<PcqDimension, {
  name: string
  description: string
}> = {
  efficacy: {
    name: '自我效能',
    description: '面对充满信心地应对挑战性工作的能力',
  },
  hope: {
    name: '希望',
    description: '坚持目标并在必要时调整路径的意志力',
  },
  resilience: {
    name: '韧性',
    description: '从逆境和失败中恢复的能力',
  },
  optimism: {
    name: '乐观',
    description: '对现在和未来保持积极心态的倾向',
  },
}

const scoreBands = [
  { min: 0, max: 25, level: '极低心理资本', description: '心理资本严重匮乏，处于心理资源耗尽状态，需要系统性重建积极心理资源' },
  { min: 26, max: 45, level: '低心理资本', description: '心理资本较弱，在逆境中容易感到无助和悲观，需要学习积极心理建设方法' },
  { min: 46, max: 65, level: '中等心理资本', description: '具备基本的心理资本，能够应对常规挑战，在重大逆境中仍需加强心理资源' },
  { min: 66, max: 85, level: '高心理资本', description: '心理资本良好，具备丰富的心理资源，能够有效应对各种挑战和压力' },
  { min: 86, max: 100, level: 'HERO级心理资本', description: '内心真正强大！拥有Hope,Efficacy,Resilience,Optimism完整HERO心理资本' },
]

export function calculatePCQ(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    efficacy: ['pcq1', 'pcq2', 'pcq3', 'pcq4', 'pcq5', 'pcq6', 'pcq7'],
    hope: ['pcq8', 'pcq9', 'pcq10', 'pcq11', 'pcq12', 'pcq13'],
    resilience: ['pcq14', 'pcq15', 'pcq16', 'pcq17', 'pcq18', 'pcq19'],
    optimism: ['pcq20', 'pcq21', 'pcq22', 'pcq23', 'pcq24', 'pcq25', 'pcq26'],
  }

  const reverseScoredItems = ['pcq4', 'pcq6', 'pcq10', 'pcq12', 'pcq18', 'pcq22', 'pcq24']
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('pcqn', 'pcq')
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
    const info = dimensionInfo[dim as PcqDimension]
    
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
    type: 'pcq',
    title: '心理资本测评完成',
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
    traits.push({ name: 'HERO', description: '拥有完整的HERO心理资本：希望×效能×韧性×乐观', positive: true })
  }

  if (overallScore <= 25) {
    traits.push({ name: '心理耗竭', description: '心理能量耗尽，需要及时调整和恢复', positive: false })
  }

  if (highDims.includes('自我效能')) traits.push({ name: '自信心爆棚', description: '对自己完成任务的能力充满信心', positive: true })
  if (highDims.includes('希望')) traits.push({ name: '永远在路上', description: '对未来充满希望，总能找到实现目标的路径', positive: true })
  if (highDims.includes('韧性')) traits.push({ name: '打不死的小强', description: '逆境中能够快速反弹，越挫越勇', positive: true })
  if (highDims.includes('乐观')) traits.push({ name: '行走的小太阳', description: '总能看到事情好的一面，积极面对人生', positive: true })

  if (lowDims.includes('自我效能')) traits.push({ name: '自我怀疑', description: '对自己的能力缺乏信心', positive: false })
  if (lowDims.includes('希望')) traits.push({ name: '前途迷茫', description: '对未来感到困惑和无助', positive: false })
  if (lowDims.includes('韧性')) traits.push({ name: '玻璃心', description: '遇到挫折容易崩溃，难以快速恢复', positive: false })
  if (lowDims.includes('乐观')) traits.push({ name: '人间不值得', description: '倾向于看到事物的负面', positive: false })

  return traits
}
