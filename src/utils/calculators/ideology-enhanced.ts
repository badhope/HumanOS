
import type { Answer } from '../../types'
import {
  EnhancedQuestion,
  enhancedIdeologyQuestions,
} from '../../data/assessments/ideology-enhanced'
import { diversityEngine, isomericEngine } from '../diversity-enhancement-engine'

const randomPick = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]

const IDEOLOGY_NORMS = {
  economicScore: { mean: 52, sd: 22 },
  socialScore: { mean: 48, sd: 24 },
  diplomaticScore: { mean: 55, sd: 21 },
  culturalScore: { mean: 53, sd: 23 },
}

export interface IdeologyResult extends Record<string, any> {
  version: 'normal' | 'professional'
  totalQuestions: number
  weightedScore: number
  economicScore: number
  socialScore: number
  diplomaticScore: number
  culturalScore: number
  economicAxis:
    | 'far-left'
    | 'left'
    | 'center'
    | 'right'
    | 'far-right'
  socialAxis:
    | 'authoritarian'
    | 'moderate'
    | 'centrist'
    | 'liberal'
    | 'libertarian'
  diplomaticAxis: 'internationalist' | 'neutral' | 'nationalist'
  culturalAxis:
    | 'traditionalist'
    | 'conservative'
    | 'neutral'
    | 'progressive'
    | 'radical'
  ideologyType: string
  ideologyEmoji: string
  specificIdeology: string
  gridPosition: { row: number; col: number }
  dimensions: { name: string; score: number }[]
  compassData: { axis: string; value: number; position: string }[]
  typeDescription: string
  famousPeople: string[]
  typicalTraits: string[]
  internetPersona: string
  classicTake: string
  whatMakesYouMad: string
  debateTactics: string[]
  famousQuote: string
  historicalEventTake: string
  compatibility: { best: string[]; worst: string[] }
  enemiesList: string[]
  readingList: string[]
  memeLevel: string
  purityScore: number
  culturalPosition: string
  questionBreakdown: {
    corePrinciple: { count: number; weight: number }
    tradeOff: { count: number; weight: number }
    policyStand: { count: number; weight: number }
    valueQuestion: { count: number; weight: number }
  }
}

export function calculateIdeologyEnhanced(
  answers: Answer[],
  version: 'normal' | 'professional'
): IdeologyResult {
  const answerMap: Record<string, number> = {}
  answers.forEach((a) => {
    answerMap[a.questionId] =
      typeof a.value === 'number'
        ? a.value
        : parseInt(String(a.value || 3), 10)
  })

  const answeredQuestions = enhancedIdeologyQuestions.filter((q) =>
    answerMap.hasOwnProperty(q.id)
  )

  const { rawScores, questionBreakdown, totalWeight } = calculateWeightedScores(
    answeredQuestions,
    answerMap,
    version
  )

  const responseValues = Object.fromEntries(
    Object.entries(answerMap).map(([k, v]) => [
      k,
      typeof v === 'number' ? v : Number(v) || 3,
    ])
  )
  const responseStyle = diversityEngine.calculateResponseStyle(
    responseValues,
    5
  )
  const correctedScores = diversityEngine.applyResponseStyleCorrection(
    rawScores,
    responseStyle
  )
  const enhanced = diversityEngine.enhanceResultDiversity(correctedScores, {
    responseId: `ideology-${version}-${Date.now()}`,
    rawScores,
    responseStyle,
    diversityMetrics: {
      scoreEntropy: diversityEngine.calculateShannonEntropy(
        Object.values(rawScores)
      ),
      dimensionSpread:
        Math.max(...Object.values(rawScores)) -
        Math.min(...Object.values(rawScores)),
      resultUniqueness: diversityEngine.calculateUniquenessScore(
        rawScores,
        IDEOLOGY_NORMS
      ),
    },
  }) as typeof rawScores

  const { economicScore, socialScore, diplomaticScore, culturalScore } =
    enhanced

  const allScoresInMidrange = Object.values(enhanced).every(
    (s) => s >= 42 && s <= 58
  )
  const fingerprint = isomericEngine.generateResponseFingerprint(
    responseValues,
    answeredQuestions.map((q) => ({ ...q, id: q.id, options: q.options }))
  )
  const midrangeSubtype =
    isomericEngine.classifyMidrangeSubtype(fingerprint, enhanced)

  const getEconomicAxis = (s: number) => {
    if (s < 15) return 'far-left'
    if (s < 35) return 'left'
    if (s < 55) return 'center'
    if (s < 75) return 'right'
    return 'far-right'
  }

  const getSocialAxis = (s: number) => {
    if (s < 15) return 'libertarian'
    if (s < 30) return 'liberal'
    if (s < 45) return 'centrist'
    if (s < 70) return 'moderate'
    return 'authoritarian'
  }

  const economicAxis = getEconomicAxis(economicScore)
  const socialAxis = getSocialAxis(socialScore)

  let specificIdeology = '中间派'

  if (economicAxis === 'far-left' && socialAxis === 'authoritarian')
    specificIdeology = '斯大林主义 🚩'
  else if (economicAxis === 'far-left' && socialAxis === 'moderate')
    specificIdeology = '毛主义 ☭'
  else if (economicAxis === 'far-left' && socialAxis === 'centrist')
    specificIdeology = '托洛茨基主义 🌐'
  else if (
    economicAxis === 'far-left' &&
    (socialAxis === 'liberal' || socialAxis === 'libertarian')
  )
    specificIdeology = '无政府共产主义 ⚫'
  else if (economicAxis === 'left' && socialAxis === 'authoritarian')
    specificIdeology = '国家社会主义 ⚒️'
  else if (economicAxis === 'left' && socialAxis === 'moderate')
    specificIdeology = '社会民主主义 🕊️'
  else if (economicAxis === 'left' && socialAxis === 'centrist')
    specificIdeology = '民主社会主义 ✊'
  else if (
    economicAxis === 'left' &&
    (socialAxis === 'liberal' || socialAxis === 'libertarian')
  )
    specificIdeology = '自由意志社会主义 🔴'
  else if (economicAxis === 'center' && socialAxis === 'authoritarian')
    specificIdeology = '国家威权主义 ⚔️'
  else if (economicAxis === 'center' && socialAxis === 'moderate')
    specificIdeology = '第三条道路 🤝'
  else if (economicAxis === 'center' && socialAxis === 'centrist')
    specificIdeology = '实用主义 🤷'
  else if (
    economicAxis === 'center' &&
    (socialAxis === 'liberal' || socialAxis === 'libertarian')
  )
    specificIdeology = '社会自由主义 🗽'
  else if (economicAxis === 'right' && socialAxis === 'authoritarian')
    specificIdeology = '国家资本主义 🦅'
  else if (economicAxis === 'right' && socialAxis === 'moderate')
    specificIdeology = '保守主义 🎩'
  else if (economicAxis === 'right' && socialAxis === 'centrist')
    specificIdeology = '古典自由主义 📜'
  else if (
    economicAxis === 'right' &&
    (socialAxis === 'liberal' || socialAxis === 'libertarian')
  )
    specificIdeology = '新自由主义 💹'
  else if (economicAxis === 'far-right' && socialAxis === 'authoritarian')
    specificIdeology = '法西斯主义 🟨'
  else if (economicAxis === 'far-right' && socialAxis === 'moderate')
    specificIdeology = '民族保守主义 🦅'
  else if (
    economicAxis === 'far-right' &&
    (socialAxis === 'liberal' || socialAxis === 'libertarian')
  )
    specificIdeology = '安那其资本主义 💵'

  const ideologyEmoji = specificIdeology.split(' ')[1] || '🤷'

  const col =
    economicScore < 20 ? 0 : economicScore < 40 ? 1 : economicScore < 60 ? 2 : economicScore < 80 ? 3 : 4
  const row =
    socialScore < 20 ? 0 : socialScore < 40 ? 1 : socialScore < 60 ? 2 : socialScore < 80 ? 3 : 4

  const dimensions = {
    equality: Math.max(0, 100 - economicScore),
    market: economicScore,
    authority: socialScore,
    liberty: Math.max(0, 100 - socialScore),
    nation: diplomaticScore,
    international: Math.max(0, 100 - diplomaticScore),
    tradition: culturalScore,
    progress: Math.max(0, 100 - culturalScore),
  }

  const compassData = [
    { axis: '经济平等', value: dimensions.equality, position: '左翼' },
    { axis: '自由市场', value: dimensions.market, position: '右翼' },
    { axis: '国家权威', value: dimensions.authority, position: '威权' },
    { axis: '个人自由', value: dimensions.liberty, position: '自由' },
  ]

  const typeDescriptions: Record<string, string[]> = {
    '斯大林主义 🚩': [
      '你是斯大林主义者。你相信只有高度集权的计划经济和无产阶级专政才能真正实现社会主义。',
      '一国社会主义信徒。社会主义必须先在一个国家站稳脚跟。',
    ],
    '毛主义 ☭': [
      '你是毛主义者。你相信农民是真正的革命主体，枪杆子里出政权。',
      '人民战争思想。相信群众路线，造反有理。',
    ],
    '社会民主主义 🕊️': [
      '你是社会民主主义者——当代西方的主流左翼。高税收、高福利、强大的工会。',
      '温和而坚定的改良派。你想要的是北欧模式。',
    ],
    '实用主义 🤷': [
      '恭喜你是稀有的政治实用主义者！你觉得所有意识形态信徒都是神经病。什么有效就用什么。',
      '哪有什么放之四海而皆准的真理？所有宏大叙事都是骗局。就事论事，见招拆招，才是真正的成熟。',
    ],
    '社会自由主义 🗽': [
      '你是社会自由主义者——当代西方的主流价值观。个人自由、宽容、多元、人权。',
      '启蒙价值的继承者。政府是必要的恶，但必须被关在笼子里。',
    ],
    '保守主义 🎩': [
      '你是传统保守主义者。小政府、低税收、自由市场、家庭价值、宗教传统。',
      '伯克的信徒。激进的社会工程只会带来灾难。',
    ],
    '中间派 🤷': ['你是真正的中间派。你完美地平衡了各个维度，不极端于任何方向。'],
  }

  const famousPeopleDatabase: Record<string, string[]> = {
    '斯大林主义 🚩': ['约瑟夫·斯大林', '金日成', '恩维尔·霍查'],
    '毛主义 ☭': ['毛泽东', '胡志明', '波尔布特'],
    '社会民主主义 🕊️': ['伯恩斯坦', '托尼·布莱尔', '北欧各国首相'],
    '实用主义 🤷': ['默克尔', '大多数技术官僚'],
    '社会自由主义 🗽': ['富兰克林·罗斯福', '肯尼迪', '奥巴马'],
    '保守主义 🎩': ['撒切尔夫人', '罗纳德·里根', '温斯顿·丘吉尔'],
    '中间派 🤷': ['地球上绝大多数正常人类'],
  }

  const traitDatabase: Record<string, string[]> = {
    '斯大林主义 🚩': ['计划经济', '高速工业化', '无产阶级专政'],
    '毛主义 ☭': ['群众路线', '农民革命', '人民战争'],
    '社会民主主义 🕊️': ['福利国家', '议会道路', '改良主义'],
    '实用主义 🤷': ['就事论事', '见招拆招', '反极端'],
    '社会自由主义 🗽': ['公民自由', '人权', '文化多元'],
    '保守主义 🎩': ['传统价值', '小政府', '减税'],
    '中间派 🤷': ['平衡', '理性', '温和'],
  }

  const internetPersonaDatabase: Record<string, string> = {
    '斯大林主义 🚩': 'B站苏联军乐爱好者，键政左壬',
    '毛主义 ☭': '小红书革命美学博主，微博左派意见领袖',
    '社会民主主义 🕊️': '豆瓣鹅组老组员，温和理中客',
    '实用主义 🤷': '大多数中国人，不参与任何争论，默默赚钱',
    '社会自由主义 🗽': '一线城市白领，LGBTQ+支持者',
    '保守主义 🎩': '中年男性企业家',
    '中间派 🤷': '看完所有阵营吵架然后默默关上手机去做饭的沉默大多数',
  }

  const memeLevel =
    (Math.abs(economicScore - 50) + Math.abs(socialScore - 50)) > 80
      ? '💀 纯度魔王'
      : (Math.abs(economicScore - 50) + Math.abs(socialScore - 50)) > 60
      ? '🔥 纯度战士'
      : '🌱 温和派'

  const culturalPosition =
    culturalScore < 40
      ? '🌱 温和进步派'
      : culturalScore < 60
      ? '⚖️ 文化中立'
      : '🏛️ 文化保守派'

  const defaultPersona = '看完所有争论然后默默去做饭的地球公民'
  const defaultTake = '你们说的都对，但是今晚吃什么？'

  const finalIdeology = allScoresInMidrange
    ? `${midrangeSubtype.name}`
    : specificIdeology
  const finalEmoji = allScoresInMidrange ? '🎯' : ideologyEmoji

  return {
    version,
    totalQuestions: answeredQuestions.length,
    weightedScore: totalWeight,
    economicScore,
    socialScore,
    diplomaticScore,
    culturalScore,
    economicAxis,
    socialAxis,
    diplomaticAxis:
      diplomaticScore < 33
        ? 'internationalist'
        : diplomaticScore < 66
        ? 'neutral'
        : 'nationalist',
    culturalAxis:
      culturalScore < 40
        ? 'progressive'
        : culturalScore < 60
        ? 'neutral'
        : 'conservative',
    ideologyType: allScoresInMidrange
      ? midrangeSubtype.name
      : specificIdeology.split(' ')[0],
    ideologyEmoji: finalEmoji,
    specificIdeology: finalIdeology,
    gridPosition: { row, col },
    dimensions: [
      { name: '平等', score: dimensions.equality },
      { name: '市场', score: dimensions.market },
      { name: '权威', score: dimensions.authority },
      { name: '自由', score: dimensions.liberty },
    ],
    compassData,
    typeDescription: allScoresInMidrange
      ? midrangeSubtype.description
      : randomPick(typeDescriptions[specificIdeology] || typeDescriptions['中间派 🤷'] || ['你是真正的中间派']),
    famousPeople: famousPeopleDatabase[specificIdeology] || famousPeopleDatabase['中间派 🤷'],
    typicalTraits: traitDatabase[specificIdeology] || traitDatabase['中间派 🤷'],
    internetPersona: internetPersonaDatabase[specificIdeology] || defaultPersona,
    classicTake: defaultTake,
    whatMakesYouMad: '任何争论影响你干饭的时候',
    debateTactics: ['默默退出群聊', '然后点个外卖'],
    famousQuote: '生活还要继续',
    historicalEventTake: '历史就是历史，争论毫无意义',
    compatibility: { best: ['中间派 🤷'], worst: ['所有极端分子'] },
    enemiesList: ['所有极端分子'],
    readingList: ['好好生活，少看网'],
    memeLevel,
    purityScore: Math.abs(economicScore - 50) + Math.abs(socialScore - 50),
    culturalPosition,
    questionBreakdown,
  }
}

function calculateWeightedScores(
  questions: EnhancedQuestion[],
  answerMap: Record<string, number>,
  version: 'normal' | 'professional'
): {
  rawScores: {
    economicScore: number
    socialScore: number
    diplomaticScore: number
    culturalScore: number
  }
  questionBreakdown: {
    corePrinciple: { count: number; weight: number }
    tradeOff: { count: number; weight: number }
    policyStand: { count: number; weight: number }
    valueQuestion: { count: number; weight: number }
  }
  totalWeight: number
} {
  const economicQuestions = questions.filter((q) => q.dimension === 'economic')
  const socialQuestions = questions.filter((q) => q.dimension === 'social')
  const diplomaticQuestions = questions.filter((q) => q.dimension === 'diplomatic')
  const culturalQuestions = questions.filter((q) => q.dimension === 'cultural')

  let totalWeight = 0
  const questionBreakdown = {
    corePrinciple: { count: 0, weight: 0 },
    tradeOff: { count: 0, weight: 0 },
    policyStand: { count: 0, weight: 0 },
    valueQuestion: { count: 0, weight: 0 },
  }

  const calculateDimensionScore = (dimensionQuestions: EnhancedQuestion[]) => {
    let weightedSum = 0
    let weightSum = 0

    dimensionQuestions.forEach((q) => {
      let value = answerMap[q.id] || 3
      if (q.reverseScored) {
        value = 6 - value
      }

      let questionWeight = q.weight
      
      if (version === 'professional') {
        questionWeight *= q.discrimination
      }

      weightedSum += value * questionWeight
      weightSum += questionWeight
      totalWeight += questionWeight

      const typeKey: keyof typeof questionBreakdown =
        q.type === 'core-principle'
          ? 'corePrinciple'
          : q.type === 'trade-off'
          ? 'tradeOff'
          : q.type === 'policy-stand'
          ? 'policyStand'
          : 'valueQuestion'
      questionBreakdown[typeKey].count++
      questionBreakdown[typeKey].weight += questionWeight
    })

    return Math.round(((weightedSum - weightSum) / (weightSum * 4)) * 100)
  }

  const economicScore = calculateDimensionScore(economicQuestions)
  const socialScore = calculateDimensionScore(socialQuestions)
  const diplomaticScore = calculateDimensionScore(diplomaticQuestions)
  const culturalScore = calculateDimensionScore(culturalQuestions)

  return {
    rawScores: {
      economicScore,
      socialScore,
      diplomaticScore,
      culturalScore,
    },
    questionBreakdown,
    totalWeight,
  }
}
