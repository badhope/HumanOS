import type { Answer, AssessmentResult, Dimension } from '../../types'

export type LearningMode = 'concrete-experience' | 'reflective-observation' | 'abstract-conceptualization' | 'active-experimentation'

export type LearningStyle = 'diverging' | 'assimilating' | 'converging' | 'accommodating'

const modeNames: Record<LearningMode, string> = {
  'concrete-experience': '具体体验',
  'reflective-observation': '反思观察',
  'abstract-conceptualization': '抽象概念化',
  'active-experimentation': '主动实践',
}

const styleNames: Record<LearningStyle, string> = {
  diverging: '发散型',
  assimilating: '同化型',
  converging: '收敛型',
  accommodating: '调适型',
}

const styleDescriptions: Record<LearningStyle, string> = {
  diverging: '感受+观察：想象力丰富，善于从不同角度看问题，喜欢小组讨论',
  assimilating: '思考+观察：擅长归纳整理，构建理论模型，喜欢逻辑清晰的结构',
  converging: '思考+实践：擅长解决实际问题，喜欢技术应用和实验验证',
  accommodating: '感受+实践：动手能力强，喜欢新挑战，靠直觉和探索解决问题',
}

export function calculateKolb(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    'concrete-experience': ['kolb1', 'kolb5', 'kolb9'],
    'reflective-observation': ['kolb2', 'kolb6', 'kolb10'],
    'abstract-conceptualization': ['kolb3', 'kolb7', 'kolb11'],
    'active-experimentation': ['kolb4', 'kolb8', 'kolb12'],
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    const value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('kolbn', 'kolb')
    answerMap[qid] = value
  })

  const dimensions: Dimension[] = []
  const scores: Record<string, number> = {}

  Object.entries(dimensionMap).forEach(([mode, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const normalizedScore = Math.min(100, Math.max(0, (((score / ids.length) - 1) / 4) * 100))
    scores[mode] = Math.round(normalizedScore)
    
    dimensions.push({
      name: modeNames[mode as LearningMode],
      score: Math.round(normalizedScore),
      description: '',
    })
  })

  const aeAc = scores['active-experimentation'] - scores['reflective-observation']
  const ceAb = scores['concrete-experience'] - scores['abstract-conceptualization']

  let style: LearningStyle
  if (aeAc < 0 && ceAb > 0) style = 'diverging'
  else if (aeAc < 0 && ceAb <= 0) style = 'assimilating'
  else if (aeAc >= 0 && ceAb <= 0) style = 'converging'
  else style = 'accommodating'

  const overallScore = Math.round((scores['concrete-experience'] + scores['reflective-observation'] + 
                          scores['abstract-conceptualization'] + scores['active-experimentation']) / 4)
  const traits = generateTraits(scores, style)

  return {
    type: 'kolb',
    title: '学习风格测评完成',
    subtitle: `${styleNames[style]}学习者`,
    summary: `你是典型的「${styleNames[style]}」学习者。${styleDescriptions[style]}`,
    overallScore,
    dimensions,
    traits,
  }
}

function generateTraits(scores: Record<string, number>, style: LearningStyle) {
  const traits: any[] = []

  if (style === 'diverging') {
    traits.push({ name: '头脑风暴王者', description: '一个人能想出一个团队的点子', positive: true })
    traits.push({ name: '人文艺术家', description: '对人和情感特别敏感', positive: true })
  }

  if (style === 'assimilating') {
    traits.push({ name: '人形编译器', description: '混乱信息进，清晰模型出', positive: true })
    traits.push({ name: '架构师思维', description: '追求逻辑的严谨和体系的完整', positive: true })
  }

  if (style === 'converging') {
    traits.push({ name: '问题终结者', description: 'Talk is cheap, show me the solution', positive: true })
    traits.push({ name: '工程师基因', description: '能用就好，不追求完美', positive: true })
  }

  if (style === 'accommodating') {
    traits.push({ name: '冒险家', description: '先做了再说，边做边调整', positive: true })
    traits.push({ name: '实践出真知', description: '纸上得来终觉浅', positive: true })
  }

  if (scores['concrete-experience'] >= 80) {
    traits.push({ name: '体验派', description: '亲身感受比什么都重要', positive: true })
  }

  if (scores['abstract-conceptualization'] >= 80) {
    traits.push({ name: '理论大师', description: '没有什么不能被建模', positive: true })
  }

  if (scores['active-experimentation'] >= 80) {
    traits.push({ name: '行动派', description: '干就完了', positive: true })
  }

  if (scores['reflective-observation'] >= 80) {
    traits.push({ name: '深度思考者', description: '三思而后行，谋定而后动', positive: true })
  }

  const balanced = Object.values(scores).every(s => s >= 40 && s <= 60)
  if (balanced) {
    traits.push({ name: '全科学习者', description: '四种模式均衡发展，适应性极强', positive: true })
  }

  return traits
}
