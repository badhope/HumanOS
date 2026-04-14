import type { Answer, AssessmentResult, Dimension } from '../../../types'
import type { HardinessDimension } from './hardiness-common'
import { dimensionInfo, scoreBands } from './hardiness-common'

interface HardinessAnswer extends Answer {
  meta?: {
    dimension: HardinessDimension
    reverse: boolean
    discrimination: number
    factorLoading: number
  }
}

export function calculateHardinessResult(answers: Answer[]): AssessmentResult {
  const dimensionScores: Record<HardinessDimension, number[]> = {
    commitment: [],
    control: [],
    challenge: [],
  }

  answers.forEach((answer: HardinessAnswer) => {
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

  ;(Object.keys(dimensionScores) as HardinessDimension[]).forEach((dimension) => {
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
  const highDims = dimensions.filter(d => d.score >= 70).map(d => d.name)
  const lowDims = dimensions.filter(d => d.score <= 30).map(d => d.name)

  if (overallScore >= 80) {
    traits.push({ name: '抗压达人', description: '在压力下依然能够保持冷静和高效', positive: true })
    traits.push({ name: '成长型思维', description: '视挫折为学习和进步的机会', positive: true })
  }

  if (overallScore <= 25) {
    traits.push({ name: '敏感脆弱', description: '对压力和挫折反应敏感，需要更多支持', positive: false })
  }

  if (highDims.includes('投入性')) {
    traits.push({ name: '全心投入', description: '对生活充满热情，能够深度参与每件事', positive: true })
  }

  if (highDims.includes('控制性')) {
    traits.push({ name: '掌控感强', description: '相信自己能够影响事情的发展', positive: true })
  }

  if (highDims.includes('挑战性')) {
    traits.push({ name: '拥抱变化', description: '视变化为成长的机遇而非威胁', positive: true })
  }

  if (lowDims.includes('投入性')) {
    traits.push({ name: '疏离感', description: '难以深度参与生活，容易感到空虚', positive: false })
  }

  if (lowDims.includes('控制性')) {
    traits.push({ name: '外控型', description: '倾向于认为事情由运气和环境决定', positive: false })
  }

  if (lowDims.includes('挑战性')) {
    traits.push({ name: '安于现状', description: '倾向于待在舒适区，回避改变', positive: false })
  }

  return traits
}
