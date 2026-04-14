import type { KolbDimension, KolbQuestion } from './kolb-common'
import { KOLB_DIMENSIONS, KOLB_DIMENSION_NAMES, KOLB_STYLES, getKolbStyle, kolbNormData, kolbReferences } from './kolb-common'
import type { Answer, AssessmentResult } from '../../../types'

interface RawScores {
  dimensions: Record<KolbDimension, number>
  learningCycle: string
}

function calculateWeightedRawScores(answers: Answer[], questions: KolbQuestion[]): RawScores {
  const dimensionTotals: Record<KolbDimension, { sum: number; count: number; weighted: number }> = {
    concreteExperience: { sum: 0, count: 0, weighted: 0 },
    reflectiveObservation: { sum: 0, count: 0, weighted: 0 },
    abstractConceptualization: { sum: 0, count: 0, weighted: 0 },
    activeExperimentation: { sum: 0, count: 0, weighted: 0 },
  }

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (question && answer.value !== undefined) {
      const dim = question.meta.dimension
      let value = answer.value
      if (question.meta.pole === 'low') {
        value = 6 - value
      }
      
      const weight = question.meta.factorLoading * question.meta.discrimination
      dimensionTotals[dim].sum += value
      dimensionTotals[dim].weighted += value * weight
      dimensionTotals[dim].count++
    }
  })

  const dimensions = {} as Record<KolbDimension, number>

  KOLB_DIMENSIONS.forEach(dim => {
    const d = dimensionTotals[dim]
    if (d.count > 0) {
      dimensions[dim] = Math.round(20 + (d.weighted / d.count) * 11)
    } else {
      dimensions[dim] = 50
    }
  })

  const aeRo = dimensions.activeExperimentation > dimensions.reflectiveObservation ? '行胜于思' : '思先于行'
  const acCe = dimensions.abstractConceptualization > dimensions.concreteExperience ? '抽象优于具象' : '具象胜过抽象'
  const learningCycle = `${aeRo} · ${acCe}`

  return {
    dimensions,
    learningCycle,
  }
}

function generateLearningAdvice(dimensions: Record<KolbDimension, number>): string[] {
  const advice: string[] = []
  const style = getKolbStyle(dimensions)
  
  if (style.code === 'Diverger') {
    advice.push('充分发挥创意和想象力优势，参与更多头脑风暴活动')
    advice.push('小组讨论和协作学习能最大化您的学习效果')
    advice.push('注意练习决策能力，避免过度分析导致行动迟缓')
  } else if (style.code === 'Assimilator') {
    advice.push('利用出色的逻辑建模能力，构建系统化知识框架')
    advice.push('阅读学术文献和理论著作风效最高')
    advice.push('增加实践验证环节，避免纸上谈兵')
  } else if (style.code === 'Converger') {
    advice.push('技术问题解决是您的强项，多参与工程实践')
    advice.push('实验和模拟练习能强化学习效果')
    advice.push('拓展人际敏感性，重视团队中的多元视角')
  } else if (style.code === 'Accommodator') {
    advice.push('沉浸式实践项目是最佳学习方式，在做中学')
    advice.push('领导力和执行力训练将如虎添翼')
    advice.push('加入计划环节，减少盲动带来的试错成本')
  } else if (style.code === 'Balanced' || style.code === 'Holistic') {
    advice.push('灵活切换学习模式，根据内容选择最佳策略')
    advice.push('您的适应性极强，可挑战跨学科综合项目')
  }
  
  const weakest = [...KOLB_DIMENSIONS].sort((a, b) => dimensions[a] - dimensions[b])[0]
  if (dimensions[weakest] <= 35) {
    const devMap: Record<string, string> = {
      concreteExperience: '增加沉浸式体验学习：案例分析、实地考察、角色扮演',
      reflectiveObservation: '养成写学习日志的习惯，每周复盘反思',
      abstractConceptualization: '练习绘制思维导图、撰写文献综述',
      activeExperimentation: '设置最小可行实验，将知识立即应用',
    }
    advice.push(`发展短板：${devMap[weakest]}`)
  }
  
  advice.push('完整学习圈：体验→反思→理论→实践，循环往复')
  return advice.slice(0, 6)
}

export function calculateProfessionalKolb(
  answers: Answer[],
  questions: KolbQuestion[]
): AssessmentResult {
  const rawScores = calculateWeightedRawScores(answers, questions)
  const style = getKolbStyle(rawScores.dimensions)

  const dimensionResults = KOLB_DIMENSIONS.map(dim => ({
    name: KOLB_DIMENSION_NAMES[dim],
    score: rawScores.dimensions[dim],
  }))

  return {
    type: 'KOLB',
    typeName: 'Kolb学习风格专业测评',
    typeCode: `KOLB-${style.code}`,
    archetype: style.label,
    title: `学习风格报告 - ${style.label}`,
    summary: `学习风格：${style.label}。${style.description}`,
    description: style.description,
    dimensions: dimensionResults,
    learningCycle: rawScores.learningCycle,
    styleCode: style.code,
    strengths: [
      `${style.label}典型特征突出`,
      '拥有清晰的学习偏好和策略意识',
    ],
    suggestions: generateLearningAdvice(rawScores.dimensions),
    optimalEnvironments: getOptimalEnvironments(style.code),
    teachingStrategies: generateTeachingStrategies(rawScores.dimensions),
    reliability: 0.86,
    standardError: 4.2,
    normSample: kolbNormData.overall.n,
    references: kolbReferences,
  }
}

function getOptimalEnvironments(code: string): string[] {
  const envMap: Record<string, string[]> = {
    Diverger: ['小组讨论', '头脑风暴工作坊', '创意项目', '人文艺术学科'],
    Assimilator: ['独立研究', '理论课程', '阅读与写作', '数学与基础科学'],
    Converger: ['实验教学', '技术实践', '问题导向学习', '工程与计算机科学'],
    Accommodator: ['实地实习', '项目制学习', '创业实践', '应用专业领域'],
    Balanced: ['混合式学习', '跨学科项目', '翻转课堂'],
    Holistic: ['研究型学习', '自主探究', '复杂系统学习'],
  }
  return envMap[code] || ['多元化学习环境']
}

function generateTeachingStrategies(dimensions: Record<KolbDimension, number>): string[] {
  const strategies: string[] = []
  if (dimensions.concreteExperience >= 60) {
    strategies.push('更多使用案例、故事、模拟和真实场景')
  }
  if (dimensions.reflectiveObservation >= 60) {
    strategies.push('给予充足的思考和观察时间，避免催促')
  }
  if (dimensions.abstractConceptualization >= 60) {
    strategies.push('提供概念框架、理论模型和数据支持')
  }
  if (dimensions.activeExperimentation >= 60) {
    strategies.push('设计动手实践环节，让学习立即验证')
  }
  return strategies
}




