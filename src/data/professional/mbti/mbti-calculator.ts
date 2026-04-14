import { MBTI_DIMENSIONS, MBTI_DIMENSION_NAMES, MBTI_DIMENSION_DESCRIPTIONS, MBTI_TYPES, EXTENDED_MBTI_TYPES, MBTI_DIMENSION_BANDS, MBTI_SUB_DIMENSIONS, mbtiNormData, type MBTIQuestion } from './mbti-common'
import type { AssessmentResult, Dimension } from '../../../types'

export interface MBTIAnswer {
  questionId: string
  optionId: string
  value: number
  trait?: string
  dimension?: string
}

export interface MBTIScores {
  E: number
  I: number
  S: number
  N: number
  T: number
  F: number
  J: number
  P: number
  A: number
  Tu: number
}

export interface DimensionBand {
  range: [number, number]
  band: string
  description: string
}

export interface MBTIDimensionResult {
  dimension: string
  dimensionName: string
  score: number
  rawScore: number
  percentile: number
  band: string
  description: string
  preference: string
  clarity: number
  subDimensions: Record<string, number>
}

export interface SubDimensionScore {
  name: string
  score: number
  description: string
}

export function calculateProfessionalMBTI(answers: MBTIAnswer[], questions: MBTIQuestion[]): AssessmentResult {
  const rawScores = calculateWeightedRawScores(answers, questions)
  const dimensionResults = processEachDimension(rawScores, answers, questions)
  const typeCode = determineFullType(dimensionResults)
  const lieScore = calculateLieScore(answers)
  const reliability = calculateReliability(answers, questions)
  const responseStyle = analyzeResponseStyle(answers)
  const developmentPhase = detectDevelopmentPhase(rawScores, dimensionResults, answers)
  const contradictionAnalysis = detectResponseContradictions(answers, questions)

  return buildComprehensiveResult(rawScores, dimensionResults, typeCode, lieScore, reliability, responseStyle, developmentPhase, contradictionAnalysis)
}

function calculateWeightedRawScores(
  answers: MBTIAnswer[],
  questions: MBTIQuestion[]
): MBTIScores {
  const scores: MBTIScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, A: 0, Tu: 0 }
  const weightSums: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, A: 0, Tu: 0 }

  answers.forEach(answer => {
    if (!answer.trait) return

    const question = questions.find(q => q.id === answer.questionId)
    if (!question) return

    const discriminationWeight = question.meta.discrimination || 0.6
    const factorWeight = question.meta.factorLoading || 0.7
    const socialDesirabilityAdjustment = 1 - ((question.meta.socialDesirability || 0.5) - 0.5) * 0.3
    const finalWeight = discriminationWeight * factorWeight * socialDesirabilityAdjustment

    const trait = answer.trait as keyof MBTIScores
    if (trait in scores) {
      scores[trait] += answer.value * finalWeight
      weightSums[trait] += finalWeight
    }
  })

  Object.keys(scores).forEach(key => {
    const k = key as keyof MBTIScores
    if (weightSums[k] > 0) {
      scores[k] = scores[k] / weightSums[k]
    }
  })

  return scores
}

function processEachDimension(
  scores: MBTIScores,
  answers: MBTIAnswer[],
  questions: MBTIQuestion[]
): MBTIDimensionResult[] {
  const dimensionPairs = [
    { pole1: 'E', pole2: 'I', name: 'E/I' },
    { pole1: 'S', pole2: 'N', name: 'S/N' },
    { pole1: 'T', pole2: 'F', name: 'T/F' },
    { pole1: 'J', pole2: 'P', name: 'J/P' },
    { pole1: 'A', pole2: 'Tu', name: 'A/T' },
  ]

  return dimensionPairs.map(({ pole1, pole2, name }) => {
    const total = scores[pole1 as keyof MBTIScores] + scores[pole2 as keyof MBTIScores] || 1
    const dimensionScore = (scores[pole1 as keyof MBTIScores] / total) * 100
    const finalScore = Math.max(0, Math.min(100, dimensionScore))
    const preference = finalScore >= 50 ? pole1 : pole2
    const clarity = Math.abs(finalScore - 50) * 2

    const norm = mbtiNormData[preference as keyof typeof mbtiNormData]
    const zScore = (finalScore - norm.mean) / norm.sd
    const percentile = Math.round(50 + zScore * 15)
    const finalPercentile = Math.max(1, Math.min(99, percentile))

    const bands = MBTI_DIMENSION_BANDS[name as keyof typeof MBTI_DIMENSION_BANDS]
    const band = bands.find(b => finalScore >= b.range[0] && finalScore <= b.range[1]) || bands[5]

    const subDimensions = calculateSubDimensions(name, answers, questions)

    return {
      dimension: name,
      dimensionName: MBTI_DIMENSION_DESCRIPTIONS[name] || name,
      score: Math.round(finalScore),
      rawScore: finalScore,
      percentile: finalPercentile,
      band: band.band,
      description: band.description,
      preference,
      clarity: Math.round(clarity),
      subDimensions,
    }
  })
}

function calculateSubDimensions(
  dimension: string,
  answers: MBTIAnswer[],
  questions: MBTIQuestion[]
): Record<string, number> {
  const subDims = MBTI_SUB_DIMENSIONS[dimension as keyof typeof MBTI_SUB_DIMENSIONS] || []
  const results: Record<string, number> = {}

  subDims.forEach(subDim => {
    const dimQuestions = questions.filter(q => 
      q.meta.dimension === dimension && q.meta.facet === subDim
    )
    
    if (dimQuestions.length > 0) {
      let total = 0
      let count = 0
      dimQuestions.forEach(q => {
        const answer = answers.find(a => a.questionId === q.id)
        if (answer) {
          total += answer.value
          count++
        }
      })
      results[subDim] = count > 0 ? Math.round((total / (count * 5)) * 100) : 50
    } else {
      results[subDim] = 50
    }
  })

  return results
}

function determineFullType(dimensionResults: MBTIDimensionResult[]): string {
  const mainFour = dimensionResults.slice(0, 4).map(r => r.preference).join('')
  const identity = dimensionResults[4].preference
  // 确保正确生成带'-Tu'后缀的身份类型
  const typeSuffix = identity === 'T' ? 'Tu' : identity
  return `${mainFour}-${typeSuffix}`
}

function calculateLieScore(answers: MBTIAnswer[]): number {
  const lieAnswers = answers.filter(a => a.questionId.includes('-lie-'))
  if (lieAnswers.length === 0) return 0

  const extremeResponses = lieAnswers.filter(a => a.value >= 5 || a.value <= 1)
  return Math.round((extremeResponses.length / lieAnswers.length) * 100)
}

function calculateReliability(answers: MBTIAnswer[], questions: MBTIQuestion[]): number {
  const validQuestions = questions.filter(q => !q.subscale?.includes('LIE'))
  const averageDiscrimination = validQuestions.reduce((sum, q) => sum + (q.meta.discrimination || 0.6), 0) / validQuestions.length
  return Math.min(0.95, 0.70 + averageDiscrimination * 0.30)
}



function getSubDimensionDescription(name: string, score: number): string {
  if (score >= 80) return `表现卓越，显著特征`
  if (score >= 65) return `明显倾向，特征显著`
  if (score >= 55) return `中等偏上，有该倾向`
  if (score >= 45) return `平衡发展，灵活适应`
  if (score >= 30) return `中等偏下，轻微反向`
  return `反向特征，典型表现`
}

function generateProfileSignature(dimensionResults: MBTIDimensionResult[]): string {
  return dimensionResults.map(dr => {
    if (dr.clarity >= 60) return dr.band.includes('极端') ? '◆' : '●'
    if (dr.clarity >= 30) return dr.band.includes('典型') ? '■' : '▲'
    if (dr.clarity >= 10) return '○'
    return '◎'
  }).join(' ')
}

function calculateUniquenessIndex(dimensionResults: MBTIDimensionResult[]): number {
  const balancedCount = dimensionResults.filter(d => d.clarity < 20).length
  const extremeCount = dimensionResults.filter(d => d.clarity >= 60).length
  const baseScore = 50 + extremeCount * 8 - balancedCount * 5
  
  const middleBandCount = dimensionResults.filter(d => 
    d.score >= 41 && d.score <= 59
  ).length
  
  return Math.max(1, Math.min(99, baseScore - middleBandCount * 3))
}

function generateDynamicStrengths(dimensionResults: MBTIDimensionResult[], typeCode: string): string[] {
  const strengths: string[] = []
  const [ei, sn, tf, jp, at] = dimensionResults

  if (ei.score >= 60) strengths.push('社交能量充沛，善于建立人脉网络')
  if (ei.score <= 40) strengths.push('深度专注能力，独立思考深入')
  
  if (sn.score >= 60) strengths.push('敏锐的模式识别与未来洞察力')
  if (sn.score <= 40) strengths.push('务实精准，细节把控能力强')
  
  if (tf.score >= 60) strengths.push('共情力强，善于建立和谐关系')
  if (tf.score <= 40) strengths.push('逻辑分析严谨，客观决策能力')
  
  if (jp.score >= 60) strengths.push('卓越的规划与执行能力，高度自律')
  if (jp.score <= 40) strengths.push('高度灵活应变，机会捕捉能力强')
  
  if (at.score <= 40) strengths.push('情绪稳定，压力下保持冷静')
  if (at.score >= 60) strengths.push('追求卓越，持续自我驱动成长')

  const baseStrengths: Record<string, string[]> = {
    'INTJ': ['战略思维', '独立创新'],
    'INTP': ['逻辑分析', '求知欲强'],
    'ENTJ': ['领导能力', '决断力强'],
    'ENTP': ['思维敏捷', '创新精神'],
    'INFJ': ['洞察力强', '理想主义'],
    'INFP': ['价值观清晰', '真诚善良'],
    'ENFJ': ['感召力强', '利他主义'],
    'ENFP': ['热情洋溢', '想象力丰富'],
    'ISTJ': ['认真负责', '严谨细致'],
    'ISFJ': ['忠诚体贴', '细致入微'],
    'ESTJ': ['组织能力强', '务实高效'],
    'ESFJ': ['热心助人', '善于合作'],
    'ISTP': ['冷静理性', '动手能力强'],
    'ISFP': ['艺术敏感', '温和友善'],
    'ESTP': ['行动力强', '适应力强'],
    'ESFP': ['乐观向上', '善于表演'],
  }

  const baseType = typeCode.substring(0, 4)
  const allStrengths = [...strengths, ...(baseStrengths[baseType] || ['综合能力均衡'])]
  return allStrengths.filter((item, index) => allStrengths.indexOf(item) === index).slice(0, 6)
}

function generateDynamicWeaknesses(dimensionResults: MBTIDimensionResult[], typeCode: string): string[] {
  const weaknesses: string[] = []
  const [ei, sn, tf, jp, at] = dimensionResults

  if (ei.score >= 80) weaknesses.push('可能过度社交，缺乏深度独处')
  if (ei.score <= 20) weaknesses.push('社交能量消耗快，可能过于封闭')
  
  if (sn.score >= 80) weaknesses.push('可能过于空想，忽视当下现实')
  if (sn.score <= 20) weaknesses.push('可能过于保守，创新思维不足')
  
  if (tf.score >= 80) weaknesses.push('可能过于情感用事，决策不够客观')
  if (tf.score <= 20) weaknesses.push('可能过于理性，忽视他人感受')
  
  if (jp.score >= 80) weaknesses.push('可能过于刻板，缺乏灵活变通')
  if (jp.score <= 20) weaknesses.push('可能过于散漫，执行力待提升')
  
  if (at.score >= 80) weaknesses.push('可能过于敏感，自我要求过高')
  if (at.score <= 20) weaknesses.push('可能过于自满，缺乏改进动力')

  return weaknesses.length > 0 ? weaknesses : ['持续成长与平衡发展中']
}

function generateRecommendedCareers(dimensionResults: MBTIDimensionResult[], typeCode: string): string[] {
  const [ei, sn, tf, jp] = dimensionResults
  const careers: string[] = []

  if (sn.score >= 60 && tf.score >= 60) careers.push('战略咨询', '商业分析', '产品管理')
  if (sn.score >= 60 && tf.score <= 40) careers.push('系统架构', '数据科学', '研发工程')
  if (sn.score <= 40 && tf.score >= 60) careers.push('医疗健康', '财务管理', '质量控制')
  if (sn.score <= 40 && tf.score <= 40) careers.push('工程技术', '法律咨询', '经济分析')
  
  if (ei.score >= 60 && jp.score >= 60) careers.push('企业管理', '项目管理', '销售管理')
  if (ei.score >= 60 && jp.score <= 40) careers.push('市场营销', '创意策划', '教育培训')
  if (ei.score <= 40 && jp.score >= 60) careers.push('学术研究', '图书档案', '精算统计')
  if (ei.score <= 40 && jp.score <= 40) careers.push('艺术创作', '设计开发', '自由职业')

  return careers.filter((item, index) => careers.indexOf(item) === index).slice(0, 8)
}

interface ResponseStyle {
  style: 'extreme' | 'moderate' | 'central' | 'random' | 'balanced'
  styleName: string
  extremeCount: number
  moderateCount: number
  centralCount: number
  extremeRatio: number
  description: string
  recommendations: string[]
}

function analyzeResponseStyle(answers: MBTIAnswer[]): ResponseStyle {
  const validAnswers = answers.filter(a => a.value)
  const extremeCount = validAnswers.filter(a => a.value === 1 || a.value === 5).length
  const moderateCount = validAnswers.filter(a => a.value === 2 || a.value === 4).length
  const centralCount = validAnswers.filter(a => a.value === 3).length
  const total = validAnswers.length || 1

  const extremeRatio = extremeCount / total
  const centralRatio = centralCount / total

  let style: ResponseStyle['style'] = 'balanced'
  let styleName = '平衡型作答'
  let description = ''
  const recommendations: string[] = []

  if (extremeRatio >= 0.6) {
    style = 'extreme'
    styleName = '极端选择型'
    description = '您倾向于使用"完全符合"或"完全不符合"作答，表明您有鲜明的个人立场和明确的行为模式，极少处于模糊地带。'
    recommendations.push('您的边界感非常清晰，适合需要明确决策的岗位', '注意灰色地带也存在价值，偶尔尝试接纳中间状态')
  } else if (centralRatio >= 0.5) {
    style = 'central'
    styleName = '趋中作答型'
    description = '您更倾向于选择中间选项，表明您的适应力强、思维灵活，或在当前阶段处于人格整合与发展期。'
    recommendations.push('您具备出色的环境适应能力，适合复杂多变的工作场景', '这可能意味着您正处于人生过渡期或快速成长期')
  } else if (moderateCount / total >= 0.5) {
    style = 'moderate'
    styleName = '稳健审慎型'
    description = '您偏好"比较符合"或"不太符合"，说明您的自我认知成熟且审慎，不会轻易走极端。'
    recommendations.push('您的判断稳健可靠，是团队中重要的稳定力量', '您具备出色的情绪调节和自我认知能力')
  } else {
    style = 'balanced'
    styleName = '多维平衡型'
    description = '您的作答模式均衡分布，说明您的人格发展全面，能够根据不同场景灵活调整自己的状态。'
    recommendations.push('您具备出色的情境适应能力和角色切换能力', '人格发展成熟全面，适合复合型领导岗位')
  }

  return { style, styleName, extremeCount, moderateCount, centralCount, extremeRatio, description, recommendations }
}

interface DevelopmentPhase {
  phase: 'exploration' | 'establishment' | 'maintenance' | 'integration' | 'transformation'
  phaseName: string
  confidence: number
  indicators: string[]
  description: string
  growthSuggestions: string[]
}

function detectDevelopmentPhase(
  rawScores: MBTIScores,
  dimensionResults: MBTIDimensionResult[],
  answers: MBTIAnswer[]
): DevelopmentPhase {
  const lowClarityCount = dimensionResults.filter(d => d.clarity < 35).length
  const midClarityCount = dimensionResults.filter(d => d.clarity >= 35 && d.clarity < 60).length
  const highClarityCount = dimensionResults.filter(d => d.clarity >= 60).length
  
  const contradictionScore = Math.abs((rawScores.E || 3) - (rawScores.I || 3)) + 
    Math.abs((rawScores.T || 3) - (rawScores.F || 3))

  let phase: DevelopmentPhase['phase']
  let phaseName: string
  let confidence: number
  const indicators: string[] = []
  let description: string
  const growthSuggestions: string[] = []

  if (lowClarityCount >= 3) {
    phase = 'exploration'
    phaseName = '自我探索期'
    confidence = 85
    indicators.push('多个维度边界模糊', '作答趋中性明显')
    description = '您正处于宝贵的自我探索阶段。此时的"模糊"不是缺点，而是成长的空间。许多人在职业转型、学业进阶、人生转折期都会经历这个阶段。'
    growthSuggestions.push('不必急于给自己"贴标签"，人格正在整合中', '多尝试不同角色和场景，观察自己的真实反应', '这个阶段是最好的可塑性黄金期')
  } else if (highClarityCount >= 4 && contradictionScore > 3) {
    phase = 'establishment'
    phaseName = '风格确立期'
    confidence = 78
    indicators.push('特征维度高度清晰', '行为模式高度一致')
    description = '您的个人风格已经鲜明确立！知道自己是谁、想要什么、适合什么，这是非常宝贵的人生资产。此时最适合深度发展核心优势。'
    growthSuggestions.push('您的个人品牌已经形成，可以聚焦深耕', '核心能力护城河正在形成，建议乘胜追击', '注意发展"反脆弱"的备份能力')
  } else if (midClarityCount >= 3) {
    phase = 'integration'
    phaseName = '人格整合期'
    confidence = 82
    indicators.push('维度间逐渐平衡', '矛盾性特征开始融合')
    description = '您正在经历高级的人格整合阶段 —— 从"非此即彼"走向"兼容并蓄"。这是心理成熟度提升的标志，意味着您能够驾驭看似矛盾的特质。'
    growthSuggestions.push('恭喜！您正在超越简单的16型框架', '灵活切换对立特质是高阶能力的体现', '此时适合承担需要复合能力的挑战性角色')
  } else if (contradictionScore < 1.5 && lowClarityCount <= 1) {
    phase = 'maintenance'
    phaseName = '稳定发展期'
    confidence = 75
    indicators.push('各维度均衡稳定', '自我认知高度一致')
    description = '您的人格发展进入稳定平台期。这是输出价值、建立影响、沉淀成果的最佳时期。'
    growthSuggestions.push('当前是人生的黄金收获期', '在稳定中寻求微创新，避免舒适区陷阱', '开始考虑知识和经验的传承与输出')
  } else {
    phase = 'transformation'
    phaseName = '转型突破期'
    confidence = 70
    indicators.push('特征组合非常规', '呈现独特的维度图谱')
    description = '您的维度组合呈现罕见模式，可能正处于关键的人生转型或突破前夜。固有的标签已无法定义正在进化的您。'
    growthSuggestions.push('您的独特性本身就是核心竞争力', '不要被常规框架限制，创造自己的成功路径', '建议寻找或创造能发挥独特组合优势的领域')
  }

  return { phase, phaseName, confidence, indicators, description, growthSuggestions }
}

interface ContradictionAnalysis {
  contradictionLevel: 'low' | 'medium' | 'high'
  levelName: string
  contradictoryPairs: string[]
  defenseMechanisms: string[]
  interpretation: string
  integrationAdvice: string[]
}

function detectResponseContradictions(
  answers: MBTIAnswer[],
  questions: MBTIQuestion[]
): ContradictionAnalysis {
  const facetScores: Record<string, number> = {}
  
  questions.forEach(q => {
    const facet = q.meta.facet
    if (!facet) return
    const answer = answers.find(a => a.questionId === q.id)
    if (answer) {
      if (!facetScores[facet]) facetScores[facet] = 0
      facetScores[facet] += answer.value
    }
  })

  const contradictions: string[] = []
  
  if (Math.abs((facetScores['精力恢复'] || 15) - (facetScores['社交主动性'] || 15)) > 8) {
    contradictions.push('社交行为的「表面-深层」差异明显：独处充电但能够高质量社交')
  }
  if (Math.abs((facetScores['决策方式'] || 15) - (facetScores['人际关怀'] || 15)) > 7) {
    contradictions.push('决策系统存在「理性-情感」双重标准：对外理性，对内共情')
  }
  if (Math.abs((facetScores['计划性'] || 15) - (facetScores['适应力'] || 15)) > 9) {
    contradictions.push('时间管理呈现「计划-即兴」双模式切换：结构化框架内高度自由')
  }
  if (Math.abs((facetScores['注意力焦点'] || 15) - (facetScores['想象力'] || 15)) > 8) {
    contradictions.push('信息处理存在「现实-想象」分层：脚踏实地但思想天马行空')
  }

  let contradictionLevel: 'low' | 'medium' | 'high'
  let levelName: string
  const defenseMechanisms: string[] = []
  let interpretation: string
  const integrationAdvice: string[] = []

  if (contradictions.length >= 3) {
    contradictionLevel = 'high'
    levelName = '高度矛盾性人格'
    interpretation = '您拥有高度复杂的人格系统。表面的"矛盾"实际上是您能够同时驾驭对立的思维模式和行为方式，这是高阶认知能力的表现。'
    defenseMechanisms.push('情境化自我呈现', '认知框架灵活切换', '特质隔离策略')
    integrationAdvice.push('您的"矛盾"就是最大的差异化优势', '寻找需要同时驾驭对立能力的独特赛道', '不必追求"一致性"，保持复杂性就是竞争力')
  } else if (contradictions.length >= 1) {
    contradictionLevel = 'medium'
    levelName = '中度整合中人格'
    interpretation = '您存在一些有趣的特征张力。这些看似矛盾的地方恰恰是您成长的支点，也是未来突破的方向。'
    defenseMechanisms.push('场景化角色适配', '适度的认知失调容忍')
    integrationAdvice.push('这些张力是成长的能量，不是缺陷', '有意识地在对的场景用对的特质', '矛盾之处正是深度自我理解的切入点')
  } else {
    contradictionLevel = 'low'
    levelName = '高度一致性人格'
    interpretation = '您的内在高度统一，所思所言所行高度一致。这种一致性带来强大的信誉感和可预测性，是领导力和信任感的重要来源。'
    defenseMechanisms.push('自我认知高度统一', '行为-态度强耦合')
    integrationAdvice.push('一致性是您强大的个人品牌', '在核心领域深耕，建立专业权威', '注意保持对不同视角的开放性')
  }

  return { contradictionLevel, levelName, contradictoryPairs: contradictions, defenseMechanisms, interpretation, integrationAdvice }
}

function buildComprehensiveResult(
  rawScores: MBTIScores,
  dimensionResults: MBTIDimensionResult[],
  typeCode: string,
  lieScore: number,
  reliability: number,
  responseStyle: ResponseStyle,
  developmentPhase: DevelopmentPhase,
  contradictionAnalysis: ContradictionAnalysis
): AssessmentResult {
  const baseType = typeCode.substring(0, 4)
  const extendedType = EXTENDED_MBTI_TYPES[typeCode as keyof typeof EXTENDED_MBTI_TYPES] || EXTENDED_MBTI_TYPES['INTJ-A']
  const typeInfo = MBTI_TYPES[baseType as keyof typeof MBTI_TYPES] || MBTI_TYPES['INTJ']

  const dimensions: Dimension[] = dimensionResults.map(dr => ({
    name: `${dr.dimension} - ${dr.band}`,
    score: dr.score,
    maxScore: 100,
    percentile: dr.percentile,
    description: `${dr.description} (清晰度: ${dr.clarity}%)`,
  }))

  const subDimensionDetails: SubDimensionScore[] = []
  dimensionResults.forEach(dr => {
    Object.entries(dr.subDimensions).forEach(([name, score]) => {
      subDimensionDetails.push({
        name,
        score,
        description: getSubDimensionDescription(name, score),
      })
    })
  })

  const profileSignature = generateProfileSignature(dimensionResults)

  return {
    type: 'mbti-professional-enhanced',
    title: `MBTI专业版增强测评报告 - ${extendedType.name}`,
    description: `${extendedType.description} | 发展阶段：${developmentPhase.phaseName}`,
    score: Math.round(dimensionResults.reduce((sum, d) => sum + d.clarity, 0) / dimensionResults.length),
    accuracy: Math.min(0.95, 0.85 + reliability * 0.1),
    dimensions,
    typeCode,
    strengths: generateDynamicStrengths(dimensionResults, typeCode),
    weaknesses: generateDynamicWeaknesses(dimensionResults, typeCode),
    careers: generateRecommendedCareers(dimensionResults, typeCode),
    meta: {
      mode: 'professional-enhanced',
      lieScore,
      cronbachAlpha: reliability,
      standardError: Math.round(15 * Math.sqrt(1 - reliability) * 100) / 100,
      rawScores,
      dimensionResults,
      typeName: extendedType.name,
      archetype: extendedType.archetype,
      subDimensions: subDimensionDetails,
      profileSignature,
      uniquenessIndex: calculateUniquenessIndex(dimensionResults),
      responseStyle,
      developmentPhase,
      contradictionAnalysis,
    },
  }
}

export const calculateNormalMode = calculateProfessionalMBTI
export const calculateAdvancedMode = calculateProfessionalMBTI
export const calculateProfessionalMode = calculateProfessionalMBTI




