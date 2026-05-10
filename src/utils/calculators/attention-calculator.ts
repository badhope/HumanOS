import type { Answer } from '../../types'

export interface AttentionResult {
  score: number
  title: string
  subtitle: string
  description: string
  dimensions: Array<{
    name: string
    score: number
    maxScore: number
    description: string
  }>
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  careers: string[]
  radarData?: Array<{ dimension: string; score: number; fullMark: number }>
  attentionLevel: string
  attentionLevelText: string
}

const dimensionMapping: Record<string, string[]> = {
  sustained: ['att1', 'att5', 'att9', 'att13'],
  selective: ['att2', 'att6', 'att10', 'att14'],
  divided: ['att3', 'att7', 'att11'],
  shifting: ['att4', 'att8', 'att12', 'att15'],
}

const dimensionNames: Record<string, string> = {
  sustained: '持续性注意力',
  selective: '选择性注意力',
  divided: '分配性注意力',
  shifting: '转换性注意力',
}

export function calculateAttention(answers: Answer[]): AttentionResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
  })

  const dimensions: AttentionResult['dimensions'] = []
  let totalScore = 0
  let totalQuestions = 0

  Object.entries(dimensionMapping).forEach(([dimKey, questionIds]) => {
    let sum = 0
    let count = 0
    questionIds.forEach(qid => {
      const value = answerMap[qid]
      if (value !== undefined) {
        sum += value
        count++
      }
    })
    const avgScore = count > 0 ? sum / count : 0
    const normalizedScore = Math.min(100, Math.max(0, ((avgScore - 1) / 4) * 100))
    
    dimensions.push({
      name: dimensionNames[dimKey] || dimKey,
      score: Math.round(normalizedScore),
      maxScore: 100,
      description: getDimensionDescription(dimKey, normalizedScore),
    })
    totalScore += normalizedScore
    totalQuestions++
  })

  const finalScore = Math.round(totalScore / totalQuestions)
  let attentionLevel: string
  let attentionLevelText: string

  if (finalScore >= 80) {
    attentionLevel = '优秀'
    attentionLevelText = '您的注意力水平非常优秀'
  } else if (finalScore >= 65) {
    attentionLevel = '良好'
    attentionLevelText = '您的注意力水平良好'
  } else if (finalScore >= 50) {
    attentionLevel = '一般'
    attentionLevelText = '您的注意力水平一般，有提升空间'
  } else {
    attentionLevel = '待提升'
    attentionLevelText = '您的注意力需要加强训练'
  }

  const strengths: string[] = []
  const weaknesses: string[] = []
  const suggestions: string[] = []

  dimensions.forEach(dim => {
    if (dim.score >= 75) {
      strengths.push(`${dim.name}表现突出`)
    } else if (dim.score <= 45) {
      weaknesses.push(`${dim.name}需要重点训练`)
    }
  })

  if (finalScore < 65) {
    suggestions.push('通过专注力训练游戏提升注意力')
    suggestions.push('使用番茄工作法训练持续注意力')
    suggestions.push('减少干扰，创造专注环境')
  }
  if (finalScore < 50) {
    suggestions.push('建议进行系统的注意力训练')
    suggestions.push('可以尝试正念冥想练习')
  }
  if (finalScore >= 65) {
    suggestions.push('继续保持良好的注意力习惯')
    suggestions.push('定期进行注意力训练保持状态')
  }

  return {
    score: finalScore,
    title: '注意力测试报告',
    subtitle: `注意力指数: ${finalScore}分`,
    description: attentionLevelText,
    dimensions,
    strengths: strengths.length > 0 ? strengths : ['注意力基本稳定'],
    weaknesses: weaknesses.length > 0 ? weaknesses : [],
    suggestions,
    careers: getAttentionCareers(dimensions),
    radarData: dimensions.map(d => ({ dimension: d.name, score: d.score, fullMark: 100 })),
    attentionLevel,
    attentionLevelText,
  }
}

function getDimensionDescription(dimKey: string, score: number): string {
  const descriptions: Record<string, { high: string; mid: string; low: string }> = {
    sustained: {
      high: '长时间保持专注能力强',
      mid: '持续注意力有待提高',
      low: '容易分心，难以长时间专注',
    },
    selective: {
      high: '能从干扰中快速筛选关键信息',
      mid: '选择性注意力一般',
      low: '容易被干扰信息分散注意力',
    },
    divided: {
      high: '多任务处理能力强',
      mid: '分配注意力能力有待提高',
      low: '难以同时处理多项任务',
    },
    shifting: {
      high: '任务切换灵活，适应变化快',
      mid: '转换注意力能力一般',
      low: '任务切换困难，容易卡在当前任务',
    },
  }

  const desc = descriptions[dimKey]
  if (!desc) return ''
  return score >= 65 ? desc.high : score >= 45 ? desc.mid : desc.low
}

function getAttentionCareers(dimensions: AttentionResult['dimensions']): string[] {
  const careers: string[] = []
  const dimScores: Record<string, number> = {}
  dimensions.forEach(d => {
    dimScores[d.name] = d.score
  })

  if (dimScores['持续性注意力'] >= 70) {
    careers.push('研究员')
    careers.push('程序开发者')
  }
  if (dimScores['选择性注意力'] >= 70) {
    careers.push('数据分析师')
    careers.push('审计员')
  }
  if (dimScores['分配性注意力'] >= 70) {
    careers.push('项目经理')
    careers.push('行政助理')
  }
  if (dimScores['转换性注意力'] >= 70) {
    careers.push('咨询顾问')
    careers.push('创业者')
  }

  if (careers.length === 0) {
    careers.push('内容创作者')
    careers.push('产品助理')
  }

  return careers.slice(0, 4)
}
