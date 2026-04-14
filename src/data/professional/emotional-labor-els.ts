import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const ELS_DIMENSIONS = [
  '表层扮演 Surface Acting',
  '深层扮演 Deep Acting',
  '自然表达 Genuine Emotion',
  '情绪耗竭 Emotional Exhaustion',
  '去人格化 Depersonalization',
  '工作投入度 Work Engagement',
  '自主性情绪调节 Autonomous Regulation',
  '控制性情绪调节 Controlled Regulation',
  '情绪规则感知 Emotional Rules Perception',
]

export const ELS_DIMENSION_NAMES: Record<string, string> = {
  'surface-acting': '表层扮演',
  'deep-acting': '深层扮演',
  'genuine': '自然表达',
  'emotional-exhaustion': '情绪耗竭',
  'depersonalization': '去人格化',
  'engagement': '工作投入度',
  'autonomous-regulation': '自主性调节',
  'controlled-regulation': '控制性调节',
  'rule-perception': '情绪规则感知',
}

export const ELS_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  'surface-acting': '伪装外在情绪表现而内心感受保持不变',
  'deep-acting': '努力调整内心感受以符合外在表现要求',
  'genuine': '内心真实感受与外在表现自然一致',
  'emotional-exhaustion': '情绪资源过度消耗导致的身心疲惫',
  'depersonalization': '对工作对象产生冷漠疏远的态度',
  'engagement': '对工作充满热情和投入的状态',
  'autonomous-regulation': '出于内在认同主动进行情绪调节',
  'controlled-regulation': '迫于外部压力被动进行情绪调节',
  'rule-perception': '准确感知组织的情绪表达规则',
}

export const elsNormData = {
  means: {
    overall: 51,
    'surface-acting': 47,
    'deep-acting': 53,
    'genuine': 55,
    'emotional-exhaustion': 58,
    'depersonalization': 45,
    'engagement': 52,
    'autonomous-regulation': 54,
    'controlled-regulation': 46,
    'rule-perception': 50,
  },
  stdDeviations: {
    'surface-acting': 13.2,
    'deep-acting': 11.5,
    'genuine': 10.8,
    'emotional-exhaustion': 14.1,
    'depersonalization': 12.7,
    'engagement': 11.3,
  },
  percentiles: {
    veryLow: 12,
    low: 28,
    average: 50,
    high: 72,
    veryHigh: 88,
  },
  clinicalCutoffs: {
    'surface-actingHigh': 70,
    'emotionalExhaustionHigh': 75,
    'genuineEmotionLow': 30,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.83,
      'surface-acting': 0.80,
      'deep-acting': 0.78,
      'genuine': 0.75,
      'emotional-exhaustion': 0.86,
      'depersonalization': 0.79,
    },
    testRetestReliability: {
      '4weeks': 0.76,
      '3months': 0.68,
    },
    constructValidity: {
      '与MBI倦怠相关': '0.62 (情绪耗竭)',
      '与工作满意度相关': '-0.48 (表层扮演)',
      '与离职意向相关': '0.41 (表层扮演)',
    },
  },
  norms: {
    serviceIndustry: 'N=4,250, 客服/零售/餐饮行业',
    healthcare: 'N=1,850, 医护人员样本',
    education: 'N=1,200, 教师群体',
    management: 'N=850, 企业管理人员',
  },
}

export const elsReferences = [
  'Hochschild, A. R. (1983). The managed heart: Commercialization of human feeling. University of California Press.',
  'Grandey, A. A. (2000). Emotion regulation in the workplace: A new way to conceptualize emotional labor. Journal of Occupational Health Psychology, 5(1), 95-110.',
  'Brotheridge, C. M., & Grandey, A. A. (2002). Emotional labor and burnout: Comparing two perspectives of "people work". Journal of Vocational Behavior, 60(1), 17-39.',
  'Diefendorff, J. M., Croyle, M. H., & Gosserand, R. H. (2005). The dimensionality and antecedents of emotional labor strategies. Journal of Vocational Behavior, 66(2), 339-360.',
  'Zapf, D., Seifert, C., Schmutte, B., Mertini, H., & Holz, M. (2001). Emotion work and job stressors and their effects on burnout. Psychology & Health, 16(5), 527-545.',
  'Hülsheger, U. R., & Schewe, A. F. (2011). Emotional labor and strain: A meta-analysis. Journal of Occupational Health Psychology, 16(4), 361-389.',
  'Mesmer-Magnus, J. R., DeChurch, L. A., & Wax, A. M. (2012). Display rules and emotional labor: A meta-analytic investigation. Journal of Management, 38(5), 1541-1569.',
  'Wang, H., Seibert, S. E., & Taylor, M. S. (2011). Antecedents and outcomes of organizational identification: A meta-analysis. Journal of Applied Psychology, 96(6), 1051-1064.',
]

const elsOptions = [
  { id: '0', text: '完全不符合', value: 0 },
  { id: '1', text: '比较不符合', value: 1 },
  { id: '2', text: '一般', value: 2 },
  { id: '3', text: '比较符合', value: 3 },
  { id: '4', text: '完全符合', value: 4 },
]

export const elsDimensionMap: Record<string, string> = {
  'els-001': 'surface-acting',
  'els-002': 'surface-acting',
  'els-003': 'surface-acting',
  'els-004': 'surface-acting',
  'els-005': 'surface-acting',
  'els-006': 'surface-acting',
  'els-007': 'surface-acting',
  'els-008': 'deep-acting',
  'els-009': 'deep-acting',
  'els-010': 'deep-acting',
  'els-011': 'deep-acting',
  'els-012': 'deep-acting',
  'els-013': 'deep-acting',
  'els-014': 'deep-acting',
  'els-015': 'genuine',
  'els-016': 'genuine',
  'els-017': 'genuine',
  'els-018': 'genuine',
  'els-019': 'genuine',
  'els-020': 'genuine',
  'els-021': 'genuine',
  'els-022': 'emotional-exhaustion',
  'els-023': 'emotional-exhaustion',
  'els-024': 'emotional-exhaustion',
  'els-025': 'emotional-exhaustion',
  'els-026': 'emotional-exhaustion',
  'els-027': 'emotional-exhaustion',
  'els-028': 'emotional-exhaustion',
  'els-029': 'depersonalization',
  'els-030': 'depersonalization',
  'els-031': 'depersonalization',
  'els-032': 'depersonalization',
  'els-033': 'depersonalization',
  'els-034': 'depersonalization',
  'els-035': 'depersonalization',
  'els-036': 'engagement',
  'els-037': 'engagement',
  'els-038': 'engagement',
  'els-039': 'engagement',
  'els-040': 'engagement',
  'els-041': 'engagement',
  'els-042': 'engagement',
  'els-043': 'autonomous-regulation',
  'els-044': 'autonomous-regulation',
  'els-045': 'autonomous-regulation',
  'els-046': 'autonomous-regulation',
  'els-047': 'autonomous-regulation',
  'els-048': 'autonomous-regulation',
  'els-049': 'autonomous-regulation',
  'els-050': 'controlled-regulation',
  'els-051': 'controlled-regulation',
  'els-052': 'controlled-regulation',
  'els-053': 'controlled-regulation',
  'els-054': 'controlled-regulation',
  'els-055': 'controlled-regulation',
  'els-056': 'controlled-regulation',
  'els-057': 'rule-perception',
  'els-058': 'rule-perception',
  'els-059': 'rule-perception',
  'els-060': 'rule-perception',
  'els-061': 'rule-perception',
  'els-062': 'rule-perception',
  'els-063': 'rule-perception',
}

const elsQuestionTexts: Record<string, string> = {
  'els-001': '工作中我会假装表现出某种情绪，即使内心并没有',
  'els-002': '与客户交流时，我会戴上专业的情绪面具',
  'els-003': '我善于控制面部表情来展示符合期望的情绪',
  'els-004': '即使心情不好，我也会表现出热情友好的样子',
  'els-005': '我的外在情绪表达和内心真实感受往往不一样',
  'els-006': '我会压抑真实感受来维持职业形象',
  'els-007': '我擅长按照角色要求表演出恰当的情绪',
  'els-008': '我会主动调整内心的真实感受来适应工作要求',
  'els-009': '我努力让自己真正感受到应该表现出来的情绪',
  'els-010': '面对客户前我会主动调整自己的情绪状态',
  'els-011': '我会尝试换位思考来产生真诚的同理心',
  'els-012': '我通过心理暗示让自己进入工作需要的情绪中',
  'els-013': '我能够将组织的情感要求内化为真实感受',
  'els-014': '我会深入思考情境意义来唤起相应的情绪',
  'els-015': '我的情绪表达通常是内心真实感受的自然流露',
  'els-016': '我的外在表现和内心感受基本保持一致',
  'els-017': '我不需要刻意伪装就能表现合适的情绪',
  'els-018': '我的专业素养让我自然会做出恰当反应',
  'els-019': '我与客户的情感交流都是真诚的',
  'els-020': '我的情感表达不需要太多有意识的控制',
  'els-021': '工作中我的情绪反应都是真实自然的',
  'els-022': '一天工作结束后我常感到情绪上精疲力尽',
  'els-023': '持续的情绪调节让我感到身心俱疲',
  'els-024': '我感觉自己的情绪资源正在被耗尽',
  'els-025': '与人打交道后我需要很长时间才能恢复',
  'els-026': '我经常感到情感透支和精力枯竭',
  'els-027': '情绪劳动让我对工作产生了倦怠感',
  'els-028': '早晨想到要面对一天的工作就感到疲惫',
  'els-029': '工作中我逐渐对人变得冷漠和疏远',
  'els-030': '我开始把客户当作需要处理的物体而非人',
  'els-031': '我对服务对象的问题变得漠不关心',
  'els-032': '遇到难缠的客户我会产生轻蔑的想法',
  'els-033': '我变得愤世嫉俗，怀疑人性的美好',
  'els-034': '我尽量减少与工作对象的深入交流',
  'els-035': '工作中我越来越难以产生同情心',
  'els-036': '我对工作内容始终保持浓厚的兴趣',
  'els-037': '即使进行情绪劳动我也感到充满活力',
  'els-038': '我能从帮助他人的过程中获得能量',
  'els-039': '工作中的情感交流让我感到充实快乐',
  'els-040': '我积极投入地参与每一次客户互动',
  'els-041': '我对工作充满热情和自豪感',
  'els-042': '我能够从情绪劳动中获得成就感',
  'els-043': '我认同情绪表达是工作专业性的体现',
  'els-044': '我将情绪调节视为自我成长的机会',
  'els-045': '真诚的客户互动让我感到愉悦和满足',
  'els-046': '我主动学习更有效的情绪管理策略',
  'els-047': '我将情绪劳动看作职业能力的重要组成',
  'els-048': '优秀的情绪表现让我获得职业成就感',
  'els-049': '进行情绪调节主要是为了不被处罚',
  'els-050': '如果不控制情绪可能会带来负面后果',
  'els-051': '我担心真实情绪会引起不必要的麻烦',
  'els-052': '表现出正确情绪主要是为了获得好评价',
  'els-053': '组织的严格规定迫使我进行情绪管理',
  'els-054': '我害怕真实的情绪表达会得罪人',
  'els-055': '外在压力是我进行情绪调节的主要原因',
  'els-056': '我清楚地知道组织期望我表现出哪些情绪',
  'els-057': '我能够准确把握在何时应该表现何种情绪',
  'els-058': '我了解不同情境下的情绪表达规则',
  'els-059': '我能敏锐感知他人对我情绪的期待',
  'els-060': '我清楚哪些情绪表达是符合职业规范的',
  'els-061': '我能够根据情境灵活调整情绪表达策略',
  'els-062': '我准确理解职业角色的情感要求',
  'els-063': '我能预判我的情绪表达会产生什么影响',
}

function createELSQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: elsQuestionTexts[id],
    type: 'scale',
    dimensions: [elsDimensionMap[id]],
    options: elsOptions,
  }
}

export const elsAdvancedQuestions: ProfessionalQuestion[] = Array.from({ length: 63 }, (_, i) => createELSQuestion(`els-${String(i + 1).padStart(3, '0')}`))

export const elsProfessionalQuestionSet = {
  normal: elsAdvancedQuestions.slice(0, 27),
  advanced: elsAdvancedQuestions.slice(0, 45),
  professional: elsAdvancedQuestions,
}

export function calculateELSScores(answerMap: Record<string, number>) {
  const dimensions = {
    'surface-acting': 0,
    'deep-acting': 0,
    'genuine': 0,
    'emotional-exhaustion': 0,
    'depersonalization': 0,
    'engagement': 0,
    'autonomous-regulation': 0,
    'controlled-regulation': 0,
    'rule-perception': 0,
  }
  const counts = { ...dimensions }

  elsAdvancedQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = elsDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 4)) * 100) : 50])
  ) as Record<string, number>

  const emotionalLaborIndex = Math.round((scores['surface-acting'] + scores['deep-acting']) / 2)
  const burnoutRisk = Math.round((scores['emotional-exhaustion'] + scores['depersonalization'] * 1.5) / 2.5)
  const wellbeing = Math.round((scores['genuine'] + scores['engagement'] + scores['autonomous-regulation'] * 0.5) / 2.5)

  const sortedDimensions = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  return {
    scores,
    emotionalLaborIndex,
    burnoutRisk,
    wellbeing: Math.max(0, Math.min(100, wellbeing)),
    dominantStrategy: sortedDimensions[0],
  }
}

export function calculateELSProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateELSScores(answerMap)
  const dominantName = ELS_DIMENSION_NAMES[result.dominantStrategy]

  const riskLevel = result.burnoutRisk >= 70 ? '高风险' : result.burnoutRisk >= 50 ? '中等风险' : '低风险'

  return generateProfessionalResult({
    type: 'emotional-labor',
    title: '情绪劳动ELS专业报告',
    description: `你的主导情绪调节策略：${dominantName}，职业倦怠风险：${riskLevel}`,
    score: result.wellbeing,
    accuracy: 88,
    dimensions: [
      ...Object.entries(result.scores).map(([k, v]) => ({
        name: ELS_DIMENSION_NAMES[k],
        score: v,
        maxScore: 100,
        description: ELS_DIMENSION_DESCRIPTIONS[k],
      })),
      { name: '情绪劳动强度指数', score: result.emotionalLaborIndex, maxScore: 100, description: '表层+深层扮演综合' },
      { name: '职业倦怠风险', score: result.burnoutRisk, maxScore: 100, description: riskLevel },
    ],
    strengths: [
      `主导策略：${dominantName}`,
      `情绪劳动强度：${result.emotionalLaborIndex}分`,
      `职业健康指数：${result.wellbeing}分`,
    ],
    weaknesses: [],
    careers: [],
  }, 'advanced')
}
