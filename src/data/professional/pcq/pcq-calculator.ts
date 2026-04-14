import type { Answer, AssessmentResult, Dimension } from '../../../types'
import type { PcqDimension } from './pcq-common'
import { dimensionInfo, scoreBands } from './pcq-common'

interface PcqAnswer extends Answer {
  meta?: {
    dimension: PcqDimension
    reverse: boolean
    discrimination: number
    factorLoading: number
  }
}

export function calculatePcqResult(answers: Answer[]): AssessmentResult {
  const dimensionScores: Record<PcqDimension, number[]> = {
    efficacy: [],
    hope: [],
    resilience: [],
    optimism: [],
  }

  answers.forEach((answer: PcqAnswer) => {
    const meta = answer.meta
    if (!meta) return

    const dimension = meta.dimension
    const reverse = meta.reverse
    const discrimination = meta.discrimination || 1
    const factorLoading = meta.factorLoading || 0.7

    let score = answer.value || 3
    if (reverse) {
      score = 6 - score
    }

    const weightedScore = score * discrimination * factorLoading
    dimensionScores[dimension].push(weightedScore)
  })

  const dimensions: Dimension[] = []
  let totalScore = 0
  let dimensionCount = 0

  ;(Object.keys(dimensionScores) as PcqDimension[]).forEach((dimension) => {
    const scores = dimensionScores[dimension]
    if (scores.length > 0) {
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
      const normalizedScore = Math.min(100, Math.max(0, ((avgScore - 1) / 4) * 100))
      const info = dimensionInfo[dimension]
      
      dimensions.push({
        name: info.name,
        score: normalizedScore,
        description: info.description,
      })
      
      totalScore += normalizedScore
      dimensionCount++
    }
  })

  const overallScore = dimensionCount > 0 ? Math.round(totalScore / dimensionCount) : 50
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
  const highDims = dimensions.filter(d => d.score >= 70).map(d => d.name)
  const lowDims = dimensions.filter(d => d.score <= 30).map(d => d.name)

  if (overallScore >= 85) {
    traits.push({ name: 'HERO', description: '拥有Hope,Efficacy,Resilience,Optimism完整心理资本', positive: true })
  }

  if (overallScore <= 25) {
    traits.push({ name: '心理耗竭', description: '心理能量耗尽，需要及时调整和恢复', positive: false })
  }

  if (highDims.includes('自我效能')) {
    traits.push({ name: '自信心爆棚', description: '对自己完成任务的能力充满信心', positive: true })
  }

  if (highDims.includes('意志力')) {
    traits.push({ name: '希望永存', description: '对未来充满希望，总能找到实现目标的路径', positive: true })
  }

  if (highDims.includes('韧性')) {
    traits.push({ name: '打不死的小强', description: '逆境中能够快速反弹，越挫越勇', positive: true })
  }

  if (highDims.includes('乐观')) {
    traits.push({ name: '小太阳', description: '总能看到事情好的一面，积极面对人生', positive: true })
  }

  if (lowDims.includes('自我效能')) {
    traits.push({ name: '自我怀疑', description: '对自己的能力缺乏信心', positive: false })
  }

  if (lowDims.includes('意志力')) {
    traits.push({ name: '前途迷茫', description: '对未来感到困惑和无助', positive: false })
  }

  if (lowDims.includes('韧性')) {
    traits.push({ name: '玻璃心', description: '遇到挫折容易崩溃，难以快速恢复', positive: false })
  }

  if (lowDims.includes('乐观')) {
    traits.push({ name: '人间不值得', description: '倾向于看到事物的负面', positive: false })
  }

  return traits
}
