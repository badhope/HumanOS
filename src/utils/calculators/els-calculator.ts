import type { Answer, AssessmentResult, Dimension } from '../../types'

export type ElsDimension = 'surface-acting' | 'deep-acting' | 'genuine' | 'emotional-exhaustion'

const dimensionNames: Record<ElsDimension, string> = {
  'surface-acting': '表层扮演',
  'deep-acting': '深层扮演',
  'genuine': '自然表达',
  'emotional-exhaustion': '情绪耗竭',
}

const dimensionDescriptions: Record<ElsDimension, string> = {
  'surface-acting': '强颜欢笑：面具之下，内心毫无波澜',
  'deep-acting': '深层扮演：入戏太深，真假难分',
  'genuine': '真情流露：做自己，表里如一',
  'emotional-exhaustion': '情绪耗竭：笑容僵住，内心掏空',
}

export function calculateELS(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    'surface-acting': ['els1', 'els5', 'els9', 'els13', 'els17'],
    'deep-acting': ['els2', 'els6', 'els10', 'els14', 'els18'],
    'genuine': ['els3', 'els7', 'els11', 'els15'],
    'emotional-exhaustion': ['els4', 'els8', 'els12', 'els16'],
  }

  const reverseScoredItems = ['els3', 'els7', 'els11', 'els15']
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('elsn', 'els')
    if (reverseScoredItems.includes(qid)) {
      value = 6 - value
    }
    answerMap[qid] = value
  })

  const dimensions: Dimension[] = []
  const scores: Record<string, number> = {}

  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const normalizedScore = Math.min(100, Math.max(0, (((score / ids.length) - 1) / 4) * 100))
    scores[dim] = Math.round(normalizedScore)
    
    dimensions.push({
      name: dimensionNames[dim as ElsDimension],
      score: Math.round(normalizedScore),
      description: dimensionDescriptions[dim as ElsDimension],
    })
  })

  const burnoutIndex = Math.round((scores['surface-acting'] + scores['emotional-exhaustion'] - scores['genuine']) / 2)
  const traits = generateTraits(scores, burnoutIndex)

  let subtitle = '情绪劳动报告'
  if (burnoutIndex >= 75) subtitle = '⚠️ 职业倦怠高风险'
  else if (scores['genuine'] >= 80) subtitle = '✨ 情绪劳动者的理想状态'
  else if (scores['surface-acting'] >= 75) subtitle = '🎭 职业演员认证'

  return {
    type: 'els',
    title: '情绪劳动测评完成',
    subtitle,
    summary: `表层扮演 ${scores['surface-acting']}分，深层扮演 ${scores['deep-acting']}分。情绪耗竭风险指数: ${burnoutIndex}分。`,
    overallScore: burnoutIndex,
    dimensions,
    traits,
  }
}

function generateTraits(scores: Record<string, number>, burnoutIndex: number) {
  const traits: any[] = []

  if (burnoutIndex >= 85) {
    traits.push({ name: '笑容杀手', description: '你的情绪电池即将耗尽，急需充电！', positive: false })
  }

  if (scores['surface-acting'] >= 80) {
    traits.push({ name: '职业微笑师', description: '脸上笑嘻嘻，心里MMP的大师', positive: true })
  }

  if (scores['deep-acting'] >= 80) {
    traits.push({ name: '方法派演员', description: '你不是在装情绪，你是真的变成了那个情绪', positive: true })
  }

  if (scores['genuine'] >= 80) {
    traits.push({ name: '情绪自由', description: '不用装，做自己，这是最高境界', positive: true })
  }

  if (scores['surface-acting'] >= 75 && scores['emotional-exhaustion'] >= 75) {
    traits.push({ name: '情绪打工人', description: '拿多少钱，演多少戏，情绪劳动也是劳动', positive: true })
  }

  if (scores['deep-acting'] >= 70 && scores['genuine'] >= 70) {
    traits.push({ name: '真诚的伪装', description: '装到最后，连自己都信了', positive: true })
  }

  if (scores['genuine'] <= 25 && scores['surface-acting'] >= 75) {
    traits.push({ name: '人格分裂预备役', description: '内在和外在已经不是同一个人了', positive: false })
  }

  if (burnoutIndex <= 20) {
    traits.push({ name: '没心没肺', description: '不内耗，不纠结，情绪能量异常充沛', positive: true })
  }

  return traits
}
