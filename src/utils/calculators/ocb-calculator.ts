import type { Answer, AssessmentResult, Dimension } from '../../types'

export type OcbDimension = 'altruism' | 'conscientiousness' | 'sportsmanship' | 'courtesy' | 'civic-virtue'

const dimensionNames: Record<OcbDimension, string> = {
  altruism: '利他行为',
  conscientiousness: '责任意识',
  sportsmanship: '运动员精神',
  courtesy: '谦恭有礼',
  'civic-virtue': '公民美德',
}

const dimensionDescriptions: Record<OcbDimension, string> = {
  altruism: '主动帮助同事解决工作相关问题',
  conscientiousness: '超越岗位基本要求的尽责行为',
  sportsmanship: '不抱怨、不斤斤计较的包容心态',
  courtesy: '尊重他人、提前沟通的礼貌行为',
  'civic-virtue': '主动参与和维护组织整体利益',
}

export function calculateOCB(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    altruism: ['ocb1', 'ocb6', 'ocb11', 'ocb16', 'ocb21'],
    conscientiousness: ['ocb2', 'ocb7', 'ocb12', 'ocb17', 'ocb22'],
    sportsmanship: ['ocb3', 'ocb8', 'ocb13', 'ocb18'],
    courtesy: ['ocb4', 'ocb9', 'ocb14', 'ocb19', 'ocb23'],
    'civic-virtue': ['ocb5', 'ocb10', 'ocb15', 'ocb20', 'ocb24'],
  }

  const reverseScoredItems = ['ocb3', 'ocb8', 'ocb13', 'ocb18']
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('ocbn', 'ocb')
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
      name: dimensionNames[dim as OcbDimension],
      score: Math.round(normalizedScore),
      description: dimensionDescriptions[dim as OcbDimension],
    })
  })

  const ocbScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5)
  const traits = generateTraits(scores, ocbScore)

  let subtitle = '组织公民画像'
  if (ocbScore >= 85) subtitle = '🌟 感动公司年度人物'
  else if (ocbScore <= 25) subtitle = '💼 契约精神代言人'

  return {
    type: 'ocb',
    title: '组织公民行为测评完成',
    subtitle,
    summary: `你的组织公民指数: ${ocbScore}分。这正是老板偷偷观察，却永远不会写在KPI里的东西。`,
    overallScore: ocbScore,
    dimensions,
    traits,
  }
}

function generateTraits(scores: Record<string, number>, ocbScore: number) {
  const traits: any[] = []

  if (ocbScore >= 90) {
    traits.push({ name: 'CEO御用工具人', description: '公司没你明天就倒闭', positive: true })
  }

  if (scores.altruism >= 85) {
    traits.push({ name: '办公室活雷锋', description: '同事的问题就是你的问题', positive: true })
  }

  if (scores.conscientiousness >= 85) {
    traits.push({ name: '卷王本王', description: '不用996，自发007', positive: true })
  }

  if (scores.sportsmanship >= 80) {
    traits.push({ name: '背锅侠', description: '功成不必在我，锅来了我先接', positive: true })
  }

  if (scores.courtesy >= 80) {
    traits.push({ name: '职场外交官', description: '情商天花板，说话让人舒服', positive: true })
  }

  if (scores['civic-virtue'] >= 85) {
    traits.push({ name: '主人翁意识', description: '公司就是我的家', positive: true })
  }

  if (scores.conscientiousness >= 75 && scores.altruism >= 75) {
    traits.push({ name: '明日之星', description: '老板心中的下一个晋升人选', positive: true })
  }

  if (ocbScore <= 20) {
    traits.push({ name: '反PUA大师', description: '给多少钱干多少活，不多管闲事', positive: true })
  }

  if (scores.sportsmanship <= 25) {
    traits.push({ name: '锱铢必较', description: '我的就是我的，一分一毫算清楚', positive: false })
  }

  if (scores['civic-virtue'] <= 25) {
    traits.push({ name: '打工而已', description: '公司只是赚钱的地方罢了', positive: true })
  }

  return traits
}
