/**
 * ==============================================
 * 🤔 哲学光谱测评 - 核心计算器
 * ==============================================
 * 【测评定位】哲学立场六维坐标系
 * 【核心算法】6坐标轴 × 8题/轴 = 48题
 *
 * 【⚠️  超级重要警告】
 * 1. 按题目dimension累加计分！
 * 2. dimension拼写错了 = 对应坐标永远在中间！
 *
 * 【✅ 多样性增强引擎 v1.0 已集成】
 * - 应答风格校正：消除趋中效应
 * - IRT区分度加权：极端选项权重更大
 * - 结果多样性增强：70%用户获得独特结果
 * - 人群常模对比：唯一性分数计算
 */

import type { Answer, AssessmentResult } from '../../types'
import { buildAnswerMap, calculateLikertScore } from './calculator-utils'
import { diversityEngine, isomericEngine, POPULATION_NORMS } from '../../data/assessments/diversity-enhancement-engine'
import { philoAssessment } from '../../data/assessments/philo-spectrum'

/**
 * 哲学光谱维度接口
 * 【六大哲学坐标轴】
 * - realism: 实在论 ↔ 反实在论
 * - individualism: 集体主义 ↔ 个人主义
 * - rationalism: 理性主义 ↔ 经验主义
 * - universalism: 普遍主义 ↔ 特殊主义
 * - progressivism: 进步主义 ↔ 保守主义
 * - positiveFreedom: 消极自由 ↔ 积极自由
 */
export interface PhiloDimension {
  name: string
  left: string
  right: string
  score: number
  leaning: 'left' | 'center' | 'right'
}

export interface PhiloResult extends Record<string, any> {
  dimensionScores: {
    realism: number
    individualism: number
    rationalism: number
    universalism: number
    progressivism: number
    positiveFreedom: number
  }
  dimensionDetails: PhiloDimension[]
  radarData: { dimension: string; score: number; fullMark: number }[]
  primarySchool: {
    name: string
    description: string
    keyThinkers: string[]
    keyWorks: string[]
  }
  secondarySchools: {
    name: string
    compatibility: number
  }[]
  philosophicalProfile: {
    thinkingStyle: string
    argumentTendency: string
    typicalBlindSpot: string
  }
  intellectualPeerGroup: string
  recommendedReading: string[]
  typeName: string
  typeEmoji: string
}

const philosophicalSchools = [
  {
    name: '分析的自由主义',
    profile: { realism: 70, individualism: 75, rationalism: 80, universalism: 75, progressivism: 60, positiveFreedom: 30 },
    description: '罗尔斯式的自由主义者，相信理性建构正义原则，支持程序正义与基本权利的普遍性。',
    keyThinkers: ['罗尔斯', '德沃金', '哈贝马斯'],
    keyWorks: ['正义论', '认真对待权利', '交往行为理论'],
  },
  {
    name: '后现代解构主义',
    profile: { realism: 20, individualism: 55, rationalism: 25, universalism: 15, progressivism: 50, positiveFreedom: 45 },
    description: '怀疑一切宏大叙事，认为真理与意义都是社会建构的，致力于揭露权力与知识的共谋。',
    keyThinkers: ['德里达', '福柯', '利奥塔'],
    keyWorks: ['论文字学', '规训与惩罚', '后现代状况'],
  },
  {
    name: '自由意志主义',
    profile: { realism: 65, individualism: 95, rationalism: 70, universalism: 60, progressivism: 40, positiveFreedom: 10 },
    description: '诺齐克式的最小国家拥护者，坚信财产权神圣不可侵犯，反对一切形式的再分配。',
    keyThinkers: ['诺齐克', '哈耶克', '罗斯巴德'],
    keyWorks: ['无政府、国家与乌托邦', '通往奴役之路'],
  },
  {
    name: '黑格尔式马克思主义',
    profile: { realism: 55, individualism: 15, rationalism: 75, universalism: 85, progressivism: 90, positiveFreedom: 90 },
    description: '相信历史的辩证运动，坚持积极自由的实现，认为集体的自我实现才是真正的解放。',
    keyThinkers: ['卢卡奇', '葛兰西', '阿尔都塞'],
    keyWorks: ['历史与阶级意识', '狱中札记', '保卫马克思'],
  },
  {
    name: '实用主义传统',
    profile: { realism: 50, individualism: 60, rationalism: 40, universalism: 45, progressivism: 65, positiveFreedom: 55 },
    description: '有用即真理，不追求形而上学的确定性，强调实践效果与可错论的探索精神。',
    keyThinkers: ['皮尔士', '詹姆斯', '杜威'],
    keyWorks: ['实用主义', '民主主义与教育', '经验与自然'],
  },
  {
    name: '社群主义',
    profile: { realism: 60, individualism: 20, rationalism: 55, universalism: 40, progressivism: 50, positiveFreedom: 75 },
    description: '麦金太尔式的美德伦理追随者，认为自我是文化传统构成的，正义内生于特定社群。',
    keyThinkers: ['麦金太尔', '桑德尔', '泰勒'],
    keyWorks: ['德性之后', '自由主义与正义的局限'],
  },
  {
    name: '保守主义传统',
    profile: { realism: 75, individualism: 50, rationalism: 45, universalism: 25, progressivism: 10, positiveFreedom: 40 },
    description: '伯克式的传统守护者，相信理性的有限性，尊重演化而成的习俗与偏见的智慧。',
    keyThinkers: ['伯克', '休谟', '奥克肖特'],
    keyWorks: ['法国革命反思录', '人类理解研究'],
  },
  {
    name: '结构主义马克思主义',
    profile: { realism: 40, individualism: 10, rationalism: 60, universalism: 70, progressivism: 75, positiveFreedom: 65 },
    description: '相信深层结构决定表层现象，意识形态国家机器理论，阶级分析的坚定支持者。',
    keyThinkers: ['阿尔都塞', '普兰查斯', '巴利巴尔'],
    keyWorks: ['阅读资本论', '政治权力与社会阶级'],
  },
]

const dimensionInfo: PhiloDimension[] = [
  { name: '实在论', left: '反实在论', right: '实在论', score: 50, leaning: 'center' },
  { name: '个体主义', left: '整体主义', right: '个体主义', score: 50, leaning: 'center' },
  { name: '理性主义', left: '经验主义', right: '理性主义', score: 50, leaning: 'center' },
  { name: '普遍主义', left: '特殊主义', right: '普遍主义', score: 50, leaning: 'center' },
  { name: '进步主义', left: '保守主义', right: '进步主义', score: 50, leaning: 'center' },
  { name: '积极自由', left: '消极自由', right: '积极自由', score: 50, leaning: 'center' },
]

export function calculatePhilo(answers: Answer[]): PhiloResult & AssessmentResult {
  const answerMap = buildAnswerMap(answers)

  const reverseRealism = ['philo-3', 'philo-8', 'philo-13']
  const reverseIndividualism = ['philo-18', 'philo-23', 'philo-28']
  const reverseRationalism = ['philo-33', 'philo-38', 'philo-43']
  const reverseUniversalism = ['philo-48', 'philo-2', 'philo-7']
  const reverseProgressivism = ['philo-12', 'philo-17', 'philo-22']
  const reverseFreedom = ['philo-27', 'philo-32', 'philo-37']

  const realismItems = ['philo-1', 'philo-6', 'philo-11', 'philo-16', 'philo-21', 'philo-26', 'philo-31', 'philo-36']
  const individualismItems = ['philo-2', 'philo-7', 'philo-12', 'philo-17', 'philo-22', 'philo-27', 'philo-32', 'philo-37']
  const rationalismItems = ['philo-3', 'philo-8', 'philo-13', 'philo-18', 'philo-23', 'philo-28', 'philo-33', 'philo-38']
  const universalismItems = ['philo-4', 'philo-9', 'philo-14', 'philo-19', 'philo-24', 'philo-29', 'philo-34', 'philo-39']
  const progressivismItems = ['philo-5', 'philo-10', 'philo-15', 'philo-20', 'philo-25', 'philo-30', 'philo-35', 'philo-40']
  const freedomItems = ['philo-41', 'philo-42', 'philo-43', 'philo-44', 'philo-45', 'philo-46', 'philo-47', 'philo-48']

  const rawScores = {
    realism: calculateLikertScore(answerMap, realismItems, reverseRealism),
    individualism: calculateLikertScore(answerMap, individualismItems, reverseIndividualism),
    rationalism: calculateLikertScore(answerMap, rationalismItems, reverseRationalism),
    universalism: calculateLikertScore(answerMap, universalismItems, reverseUniversalism),
    progressivism: calculateLikertScore(answerMap, progressivismItems, reverseProgressivism),
    positiveFreedom: calculateLikertScore(answerMap, freedomItems, reverseFreedom),
  }

  const responseValues = Object.fromEntries(
    Object.entries(answerMap).map(([k, v]) => [k, typeof v === 'number' ? v : Number(v) || 3])
  )

  const responseStyle = diversityEngine.calculateResponseStyle(responseValues, 5)

  const correctedScores = diversityEngine.applyResponseStyleCorrection(rawScores, responseStyle)

  const enhancedScores = diversityEngine.enhanceResultDiversity(correctedScores, {
    responseId: 'philo-' + Date.now(),
    rawScores,
    responseStyle,
    diversityMetrics: {
      scoreEntropy: diversityEngine.calculateShannonEntropy(Object.values(rawScores)),
      dimensionSpread: Math.max(...Object.values(rawScores)) - Math.min(...Object.values(rawScores)),
      resultUniqueness: diversityEngine.calculateUniquenessScore(rawScores, POPULATION_NORMS),
    },
  })

  const dimensionScores = enhancedScores as typeof rawScores

  const fingerprint = isomericEngine.generateResponseFingerprint(responseValues, philoAssessment.questions)
  const contrastItems = isomericEngine.extractContrastItems(responseValues, rawScores)
  const midrangeSubtype = isomericEngine.classifyMidrangeSubtype(fingerprint, dimensionScores)
  const allScoresInMidrange = Object.values(dimensionScores).every(s => s >= 42 && s <= 58)

  const dimensionDetails = dimensionInfo.map((info, i) => {
    const keys = Object.keys(dimensionScores) as (keyof PhiloResult['dimensionScores'])[]
    const score = dimensionScores[keys[i]]
    return {
      ...info,
      score,
      leaning: score < 35 ? 'left' : score > 65 ? 'right' : 'center' as 'left' | 'center' | 'right',
    }
  })

  const radarData = dimensionDetails.map(d => ({
    dimension: `${d.left}-${d.right}`,
    score: d.score,
    fullMark: 100,
  }))

  const calculateSimilarity = (profile: Record<string, number>) => {
    let similarity = 0
    Object.entries(dimensionScores).forEach(([key, value]) => {
      const diff = Math.abs(value - (profile[key] || 50))
      similarity += (100 - diff)
    })
    return similarity / 6
  }

  const rankedSchools = philosophicalSchools
    .map(school => ({ ...school, similarity: calculateSimilarity(school.profile) }))
    .sort((a, b) => b.similarity - a.similarity)

  const primarySchool = rankedSchools[0]
  const secondarySchools = rankedSchools.slice(1, 4).map(s => ({ name: s.name, compatibility: s.similarity }))

  const thinkingMatrix = [
    { cond: dimensionScores.rationalism > 70, style: '演绎型思考者：喜欢从第一原则出发构建严密论证' },
    { cond: dimensionScores.rationalism < 30, style: '判例型思考者：依赖具体案例与情境化判断' },
    { cond: dimensionScores.realism > 70, style: '实体实在论：相信概念背后有真实对应的存在' },
    { cond: dimensionScores.realism < 30, style: '唯名论倾向：所有分类都是方便的语言游戏' },
  ]

  const philosophicalProfile = {
    thinkingStyle: thinkingMatrix.find(x => x.cond)?.style || '反思平衡型：在原则与直觉之间来回调整',
    argumentTendency: dimensionScores.universalism > 60 ? '倾向于援引普遍原则' : '倾向于援引具体情境',
    typicalBlindSpot: dimensionScores.individualism > 70
      ? '容易忽视结构约束，过度归因于个体选择'
      : dimensionScores.individualism < 30
        ? '容易陷入决定论，低估个体能动性空间'
        : '在结构与能动性之间保持适度怀疑',
  }

  const intellectualPeerGroup = [
    primarySchool.keyThinkers[0],
    secondarySchools[0].name,
    secondarySchools[1].name,
  ].join(' · ')

  const recommendedReading = [
    primarySchool.keyWorks[0],
    ...rankedSchools.slice(1, 3).map(s => s.keyWorks[0]),
  ]

  const uniquenessScore = diversityEngine.calculateUniquenessScore(dimensionScores, POPULATION_NORMS)
  const diversityInterpretations = diversityEngine.generateResultInterpretation({
    responseId: 'philo-' + Date.now(),
    rawScores,
    responseStyle,
    diversityMetrics: {
      scoreEntropy: diversityEngine.calculateShannonEntropy(Object.values(rawScores)),
      dimensionSpread: Math.max(...Object.values(rawScores)) - Math.min(...Object.values(rawScores)),
      resultUniqueness: uniquenessScore,
    },
  })

  return {
    dimensionScores,
    dimensionDetails,
    radarData,
    primarySchool: {
      name: primarySchool.name,
      description: primarySchool.description,
      keyThinkers: primarySchool.keyThinkers,
      keyWorks: primarySchool.keyWorks,
    },
    secondarySchools,
    philosophicalProfile,
    intellectualPeerGroup,
    recommendedReading,
    diversityAnalysis: {
      uniquenessScore: Math.round(uniquenessScore),
      extremityScore: Math.round(responseStyle.extremityScore * 100),
      midpointAvoidance: Math.round((1 - responseStyle.midpointRatio) * 100),
      interpretations: diversityInterpretations,
    },
    isomericAnalysis: allScoresInMidrange ? {
      enabled: true,
      subtype: midrangeSubtype.name,
      subtypeDescription: midrangeSubtype.description,
      characteristicItems: midrangeSubtype.characteristicItems,
      contrastInterpretation: isomericEngine.generateIsomericInterpretation({
        fingerprint,
        patternType: 'midrange',
        subtype: midrangeSubtype.name,
        signatureItems: [...contrastItems.aboveExpectation, ...contrastItems.belowExpectation],
        contrastAnalysis: contrastItems,
      }, '哲学光谱'),
    } : null,
    typeName: allScoresInMidrange ? midrangeSubtype.name : primarySchool.name,
    typeEmoji: allScoresInMidrange ? '🎯' : uniquenessScore > 70 ? '💎' : dimensionScores.progressivism > 60 ? '🔮' : dimensionScores.realism > 60 ? '🔍' : '🧩',
  }
}
