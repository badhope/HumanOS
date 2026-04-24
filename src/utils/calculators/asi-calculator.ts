import type { Answer, AssessmentResult, Dimension } from '../../types'

export type ExplanatoryDimension = 'control' | 'stability' | 'globality' | 'internality'

const dimensionNames: Record<ExplanatoryDimension, string> = {
  control: '可控性',
  stability: '稳定性',
  globality: '普遍性',
  internality: '内外因',
}

const dimensionDescriptions: Record<ExplanatoryDimension, string> = {
  control: '相信自己能够改变事情的程度',
  stability: '认为逆境是暂时的还是永久的',
  globality: '认为逆境影响生活的各个方面还是特定领域',
  internality: '倾向于归因自己还是外部环境',
}

const optimismLevels = [
  { min: 0, max: 25, level: '💀 习得性无助预备役', description: '习惯性的悲观解释风格，容易在挫折面前放弃' },
  { min: 26, max: 45, level: '🌧️ 现实主义悲观者', description: '偏谨慎的解释风格，倾向于做最坏的打算' },
  { min: 46, max: 55, level: '⚖️ 平衡的现实主义者', description: '在乐观和悲观之间取得了平衡' },
  { min: 56, max: 75, level: '☀️ 韧性乐观派', description: '健康的乐观解释风格，善于从逆境中恢复' },
  { min: 76, max: 100, level: '🚀 反脆弱体质', description: '杀不死你的只会让你更强大！天生的逆行者' },
]

export function calculateASI(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    stability: ['asi1', 'asi5', 'asi9', 'asi13', 'asi17', 'asi21'],
    globality: ['asi2', 'asi6', 'asi10', 'asi14', 'asi18', 'asi22'],
    internality: ['asi3', 'asi7', 'asi11', 'asi15', 'asi19', 'asi23'],
    control: ['asi4', 'asi8', 'asi12', 'asi16', 'asi20', 'asi24'],
  }

  const reverseScoredItems = ['asi1', 'asi5', 'asi9', 'asi13', 'asi17', 'asi21', 'asi2', 'asi6', 'asi10', 'asi14', 'asi18', 'asi22']
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('asin', 'asi')
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
      name: dimensionNames[dim as ExplanatoryDimension],
      score: Math.round(normalizedScore),
      description: dimensionDescriptions[dim as ExplanatoryDimension],
    })
  })

  const hopeScore = Math.round((scores.stability + scores.control) / 2)
  const resilienceScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 4)
  const level = optimismLevels.find(l => resilienceScore >= l.min && resilienceScore <= l.max) || optimismLevels[2]
  const traits = generateTraits(scores, resilienceScore)

  return {
    type: 'asi',
    title: '逆商测评完成',
    subtitle: level.level,
    summary: `${level.description}。你的韧性指数：${resilienceScore}分，希望指数：${hopeScore}分。`,
    overallScore: resilienceScore,
    dimensions,
    traits,
  }
}

function generateTraits(scores: Record<string, number>, resilience: number) {
  const traits: any[] = []

  if (resilience >= 90) {
    traits.push({ name: '凤凰涅槃', description: '每一次跌倒都站得更稳', positive: true })
  }

  if (scores.stability >= 80) {
    traits.push({ name: '雨过天晴', description: '再大的风雨总会过去的', positive: true })
  }

  if (scores.control >= 80) {
    traits.push({ name: '命运操盘手', description: '我命由我不由天', positive: true })
  }

  if (scores.globality >= 80) {
    traits.push({ name: '隧道视野', description: '坏事不会扩散，该干嘛干嘛', positive: true })
  }

  if (scores.internality >= 60) {
    traits.push({ name: '反求诸己', description: '行有不得，反求诸己', positive: true })
  }

  if (scores.stability <= 25) {
    traits.push({ name: '灾难化思维', description: '一点小事就感觉天塌了', positive: false })
  }

  if (scores.control <= 25) {
    traits.push({ name: '宿命论者', description: '万般皆是命，半点不由人', positive: false })
  }

  if (scores.globality <= 25) {
    traits.push({ name: '多米诺骨牌', description: '一件事不顺就觉得什么都不顺', positive: false })
  }

  if (scores.control >= 75 && scores.stability >= 75) {
    traits.push({ name: '高希望体质', description: '永远相信美好的事情即将发生', positive: true })
  }

  if (resilience <= 20) {
    traits.push({ name: '玻璃心', description: '轻轻一碰就碎了', positive: false })
  }

  return traits
}
