import type { Answer, AssessmentResult, Dimension } from '../../../types'
import type { MetacognitionDimension } from './metacognition-common'
import { dimensionInfo, scoreBands } from './metacognition-common'

interface MetaAnswer extends Answer {
  meta?: {
    dimension: MetacognitionDimension
    reverse: boolean
    discrimination: number
    factorLoading: number
  }
}

export function calculateMetacognitionResult(answers: Answer[]): AssessmentResult {
  const dimensionScores: Record<MetacognitionDimension, number[]> = {
    knowledge: [],
    monitoring: [],
    control: [],
    reflection: [],
  }

  answers.forEach((answer: MetaAnswer) => {
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

  ;(Object.keys(dimensionScores) as MetacognitionDimension[]).forEach((dimension) => {
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
    type: 'metacognition',
    title: '元认知能力测评完成',
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

  if (overallScore >= 80) {
    traits.push({ name: '思维觉醒者', description: '深刻觉知自己的思维过程，真正做到"知之为知之"', positive: true })
    traits.push({ name: '高效学习者', description: '善于运用元认知策略，学习效率远超常人', positive: true })
  }

  if (overallScore <= 25) {
    traits.push({ name: '认知盲区', description: '处于"不知道自己不知道"的状态，缺乏自我觉知', positive: false })
  }

  if (highDims.includes('元认知知识')) {
    traits.push({ name: '知己达人', description: '非常了解自己的认知边界和能力范围', positive: true })
  }

  if (highDims.includes('认知监控')) {
    traits.push({ name: '思维观察者', description: '能够实时觉察自己的思维状态，保持清明', positive: true })
  }

  if (highDims.includes('认知控制')) {
    traits.push({ name: '策略大师', description: '灵活运用各种认知策略，高效处理信息', positive: true })
  }

  if (highDims.includes('反思复盘')) {
    traits.push({ name: '复盘专家', description: '善于从经验中学习，迭代速度极快', positive: true })
  }

  if (lowDims.includes('元认知知识')) {
    traits.push({ name: '邓宁-克鲁格效应', description: '容易高估自己的能力，低估任务难度', positive: false })
  }

  if (lowDims.includes('认知监控')) {
    traits.push({ name: '思维自动驾驶', description: '思维常常处于无意识的自动驾驶模式', positive: false })
  }

  if (lowDims.includes('认知控制')) {
    traits.push({ name: '策略僵化', description: '习惯于固定的思维模式，难以灵活调整', positive: false })
  }

  if (lowDims.includes('反思复盘')) {
    traits.push({ name: '历史重复者', description: '难以从经验中学习，容易重蹈覆辙', positive: false })
  }

  return traits
}
