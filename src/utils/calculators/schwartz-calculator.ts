import type { Answer, AssessmentResult, Dimension } from '../../types'

const valueNames: Record<string, string> = {
  'self-direction': '自我导向',
  stimulation: '刺激',
  hedonism: '享乐',
  achievement: '成就',
  power: '权力',
  security: '安全',
  tradition: '传统',
  conformity: '遵从',
  benevolence: '仁慈',
  universalism: '普世主义',
}

const valueDescriptions: Record<string, string> = {
  'self-direction': '独立思想和行动——选择、创造、探索',
  stimulation: '生活中的兴奋、新奇和挑战',
  hedonism: '追求个人快乐和感官满足',
  achievement: '通过能力证明获得社会认可',
  power: '社会地位、声望、控制或支配',
  security: '安全、和谐和自我的稳定',
  tradition: '尊重、承诺和接受传统文化',
  conformity: '约束行为、倾向和不当冲动',
  benevolence: '维护和增进他人福利',
  universalism: '理解、欣赏、容忍和保护所有人',
}

const higherOrderValues = {
  '开放变化': ['self-direction', 'stimulation', 'hedonism'],
  '自我提升': ['power', 'achievement', 'hedonism'],
  '保守安稳': ['security', 'tradition', 'conformity'],
  '自我超越': ['universalism', 'benevolence'],
}

export function calculateSchwartz(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    'self-direction': ['sw1', 'sw10', 'sw19', 'sw21', 'sw30'],
    stimulation: ['sw2', 'sw11', 'sw22', 'sw31'],
    hedonism: ['sw20', 'sw23', 'sw32'],
    achievement: ['sw3', 'sw12', 'sw24', 'sw33'],
    power: ['sw4', 'sw13', 'sw25', 'sw34'],
    security: ['sw9', 'sw18', 'sw27', 'sw36'],
    tradition: ['sw6', 'sw15', 'sw26', 'sw35'],
    conformity: ['sw5', 'sw14', 'sw28'],
    benevolence: ['sw7', 'sw16', 'sw29', 'sw37'],
    universalism: ['sw8', 'sw17', 'sw38', 'sw39', 'sw40'],
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    const value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('schwartz_n', 'sw')
    answerMap[qid] = value
  })

  const dimensions: Dimension[] = []
  const valueScores: Record<string, number> = {}

  Object.entries(dimensionMap).forEach(([value, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const avgScore = score / ids.length
    const normalizedScore = Math.min(100, Math.max(0, ((avgScore - 1) / 4) * 100))
    valueScores[value] = Math.round(normalizedScore)
    
    dimensions.push({
      name: valueNames[value],
      score: Math.round(normalizedScore),
      description: valueDescriptions[value],
    })
  })

  const topValue = Object.entries(valueScores).sort((a, b) => b[1] - a[1])[0]
  const bottomValue = Object.entries(valueScores).sort((a, b) => a[1] - b[1])[0]
  
  const overallScore = Math.round(Object.values(valueScores).reduce((a, b) => a + b, 0) / 10)
  const dominantValueName = valueNames[topValue[0]]
  const recessiveValueName = valueNames[bottomValue[0]]

  const traits = generateTraits(valueScores)

  return {
    type: 'schwartz',
    title: '价值观测评完成',
    subtitle: `核心价值观: ${dominantValueName}`,
    summary: `你的主导价值观是「${dominantValueName}」，${topValue[1]}分。最不看重「${recessiveValueName}」。价值观决定了你人生的每一个重大选择。`,
    overallScore,
    dimensions,
    traits,
  }
}

function generateTraits(scores: Record<string, number>) {
  const traits: any[] = []
  const highValues = Object.entries(scores).filter(([_, s]) => s >= 75).map(([k]) => k)
  const lowValues = Object.entries(scores).filter(([_, s]) => s <= 30).map(([k]) => k)

  if (highValues.includes('universalism') && highValues.includes('benevolence')) {
    traits.push({ name: '利他主义者', description: '真正关心他人和世界福祉的超越型人格', positive: true })
  }

  if (highValues.includes('power') && highValues.includes('achievement')) {
    traits.push({ name: '野心家', description: '追求权力、地位和成就的攀登者', positive: true })
  }

  if (highValues.includes('security') && highValues.includes('tradition') && highValues.includes('conformity')) {
    traits.push({ name: '保守主义', description: '重视安全、传统和秩序的稳健派', positive: true })
  }

  if (highValues.includes('self-direction') && highValues.includes('stimulation')) {
    traits.push({ name: '探索者', description: '追求自由、创意和新奇体验的人生玩家', positive: true })
  }

  if (highValues.includes('hedonism') && scores['hedonism'] >= 85) {
    traits.push({ name: '及时行乐', description: '活在当下，享受人生是你的人生哲学', positive: true })
  }

  if (lowValues.includes('power') && lowValues.includes('achievement')) {
    traits.push({ name: '淡泊名利', description: '对世俗的成功和地位毫不在意', positive: true })
  }

  if (lowValues.includes('tradition') && lowValues.includes('conformity')) {
    traits.push({ name: '反叛精神', description: '质疑权威，拒绝墨守成规', positive: true })
  }

  if (lowValues.includes('universalism') && lowValues.includes('benevolence')) {
    traits.push({ name: '个人主义', description: '优先考虑自己而非他人', positive: false })
  }

  return traits
}
