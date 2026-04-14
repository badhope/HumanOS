import type { Answer, AssessmentResult, Dimension } from '../../../types'
import type { LoveStyleType } from './love-common'
import { styleProfiles } from './love-common'

interface LoveAnswer extends Answer {
  meta?: {
    dimension: LoveStyleType
    reverse: boolean
    weight: number
  }
}

export function calculateLoveStyle(answers: Answer[]): AssessmentResult {
  const styleScores: Record<LoveStyleType, number[]> = {
    eros: [],
    ludus: [],
    storge: [],
    pragma: [],
    mania: [],
    agape: [],
  }

  answers.forEach((answer: LoveAnswer) => {
    const meta = answer.meta
    if (!meta) return

    let score = answer.value || 3
    if (meta.reverse) {
      score = 6 - score
    }

    const weightedScore = score * (meta.weight || 1)
    styleScores[meta.dimension].push(weightedScore)
  })

  const dimensions: Dimension[] = []
  const finalScores: Record<LoveStyleType, number> = {} as Record<LoveStyleType, number>

  ;(Object.keys(styleScores) as LoveStyleType[]).forEach((style) => {
    const scores = styleScores[style]
    if (scores.length > 0) {
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
      const normalizedScore = Math.min(100, Math.max(0, ((avgScore - 1) / 4) * 100))
      finalScores[style] = normalizedScore
      
      const profile = styleProfiles[style]
      dimensions.push({
        name: profile.name,
        score: normalizedScore,
        description: profile.description,
      })
    }
  })

  const primaryStyle = (Object.keys(finalScores) as LoveStyleType[])
    .sort((a, b) => finalScores[b] - finalScores[a])[0]

  const profile = styleProfiles[primaryStyle]
  const traits = generateTraits(primaryStyle, finalScores)

  return {
    type: 'love-style',
    title: `你的恋爱风格是「${profile.name}」`,
    subtitle: profile.title,
    summary: profile.description,
    quote: profile.quote,
    strength: profile.strength,
    weakness: profile.weakness,
    celebrities: profile.celebrities,
    dimensions,
    traits,
  }
}

function generateTraits(primaryStyle: LoveStyleType, scores: Record<LoveStyleType, number>) {
  const traits: any[] = []
  const highStyles = (Object.keys(scores) as LoveStyleType[]).filter(s => scores[s] >= 70)

  switch (primaryStyle) {
    case 'eros':
      traits.push({ name: '浪漫至死不渝', description: '你相信灵魂伴侣和命中注定', positive: true })
      traits.push({ name: '颜值即正义', description: '眼缘是第一关', positive: true })
      break
    case 'ludus':
      traits.push({ name: '爱情游戏大师', description: '万花丛中过，片叶不沾身', positive: true })
      traits.push({ name: '新鲜感成瘾', description: '追逐的过程才是快乐', positive: false })
      break
    case 'storge':
      traits.push({ name: '陪伴是最长情的告白', description: '细水长流才是真', positive: true })
      traits.push({ name: '老友型恋人', description: '先做朋友，再做爱人', positive: true })
      break
    case 'pragma':
      traits.push({ name: '恋爱产品经理', description: '列出需求清单，逐项打分', positive: true })
      traits.push({ name: '风险控制专家', description: '恋爱也要算ROI', positive: false })
      break
    case 'mania':
      traits.push({ name: '恋爱脑晚期', description: '爱情就是全世界', positive: true })
      traits.push({ name: '情绪过山车', description: '上天堂下地狱只需要一句话', positive: false })
      break
    case 'agape':
      traits.push({ name: '无条件的爱', description: '我爱你，与你无关', positive: true })
      traits.push({ name: '奉献型人格', description: '你的快乐就是我的快乐', positive: true })
      break
  }

  if (highStyles.includes('eros') && highStyles.includes('storge')) {
    traits.push({ name: '理想配偶', description: '既有激情又有温情，完美恋爱模板', positive: true })
  }

  if (highStyles.includes('pragma') && highStyles.includes('agape')) {
    traits.push({ name: '清醒的深情', description: '理智地选择了奋不顾身', positive: true })
  }

  if (scores['ludus'] <= 20) {
    traits.push({ name: '忠诚专一', description: '确定关系后就不会三心二意', positive: true })
  }

  if (scores['mania'] <= 20) {
    traits.push({ name: '情绪稳定', description: '不会在爱情中患得患失', positive: true })
  }

  return traits
}
