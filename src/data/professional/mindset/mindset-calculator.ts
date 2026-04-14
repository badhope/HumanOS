import type { Answer, AssessmentResult, Dimension } from '../../../types'
import type { MindsetDimension } from './mindset-common'
import { dimensionInfo, scoreBands } from './mindset-common'

interface MindsetAnswer extends Answer {
  meta?: {
    dimension: MindsetDimension
    reverse: boolean
    discrimination: number
    factorLoading: number
  }
}

export function calculateMindsetResult(answers: Answer[]): AssessmentResult {
  const dimensionScores: Record<MindsetDimension, number[]> = {
    challenge: [],
    effort: [],
    failure: [],
    criticism: [],
    success: [],
  }

  answers.forEach((answer: MindsetAnswer) => {
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

  ;(Object.keys(dimensionScores) as MindsetDimension[]).forEach((dimension) => {
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
  const highDims = dimensions.filter(d => d.score >= 70).map(d => d.name)
  const lowDims = dimensions.filter(d => d.score <= 30).map(d => d.name)

  if (overallScore >= 85) {
    traits.push({ name: '终身成长者', description: '德韦克教授理想中的思维模式，能力对你而言只是起点', positive: true })
    traits.push({ name: '反脆弱体质', description: '凡是杀不死你的，都会让你更强大', positive: true })
  }

  if (overallScore <= 25) {
    traits.push({ name: '思维囚徒', description: '你被自己的信念囚禁在"我不行"的牢笼中', positive: false })
  }

  if (highDims.includes('拥抱挑战')) {
    traits.push({ name: '舒适区拓荒者', description: '你的舒适区一直在扩张', positive: true })
  }

  if (highDims.includes('努力信念')) {
    traits.push({ name: '复利信徒', description: '相信时间的力量，享受指数级成长的前夜', positive: true })
  }

  if (highDims.includes('面对挫折')) {
    traits.push({ name: '挫折炼金师', description: '失败是你的原料，反馈是你的养料', positive: true })
  }

  if (highDims.includes('接纳反馈')) {
    traits.push({ name: '认知开源者', description: '你的心智从不设防，真理比面子重要一万倍', positive: true })
  }

  if (highDims.includes('看待他人成功')) {
    traits.push({ name: '成长共同体', description: '别人的光是你的光，你的路是大家的路', positive: true })
  }

  if (lowDims.includes('拥抱挑战')) {
    traits.push({ name: '安全第一主义', description: '熟悉比完美更重要，从不打无准备之仗', positive: false })
  }

  if (lowDims.includes('努力信念')) {
    traits.push({ name: '天赋崇拜者', description: '相信天才论，把"我不够聪明"挂在嘴边', positive: false })
  }

  if (lowDims.includes('面对挫折')) {
    traits.push({ name: '一次失败定型症', description: '一次不行，就是永远不行', positive: false })
  }

  if (lowDims.includes('接纳反馈')) {
    traits.push({ name: '自我防御专家', description: '批评=攻击，认错=认输', positive: false })
  }

  if (lowDims.includes('看待他人成功')) {
    traits.push({ name: '零和博弈思维', description: '别人的成功就是你的失败', positive: false })
  }

  return traits
}
