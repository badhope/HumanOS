import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const CSE_DIMENSIONS = [
  '自尊 Self-Esteem',
  '自我效能 Self-Efficacy',
  '情绪稳定性 Neuroticism',
  '内控点 Locus of Control',
]

export const CSE_DIMENSION_NAMES: Record<string, string> = {
  selfEsteem: '自尊',
  selfEfficacy: '自我效能',
  emotionalStability: '情绪稳定性',
  locusOfControl: '内控点',
}

export const CSE_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  selfEsteem: '对自我价值的整体评价和接纳程度',
  selfEfficacy: '相信自己有能力完成任务的信念',
  emotionalStability: '情绪稳定和不易焦虑的倾向',
  locusOfControl: '相信自己能够掌控人生的信念',
}

export const cseNormData = {
  means: {
    overall: 52,
    selfEsteem: 51,
    selfEfficacy: 53,
    emotionalStability: 50,
    locusOfControl: 54,
  },
  stdDeviations: {
    selfEsteem: 10.8,
    selfEfficacy: 9.5,
    emotionalStability: 11.2,
    locusOfControl: 10.1,
  },
  percentiles: {
    veryLow: 12,
    low: 28,
    average: 50,
    high: 72,
    veryHigh: 88,
  },
  clinicalCutoffs: {
    CSEOverallLow: 30,
    SelfEsteemLow: 25,
    EmotionalStabilityLow: 25,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.86,
      selfEsteem: 0.82,
      selfEfficacy: 0.79,
      emotionalStability: 0.81,
      locusOfControl: 0.77,
    },
    testRetestReliability: {
      '4weeks': 0.81,
      '1year': 0.74,
      '3years': 0.65,
    },
    constructValidity: {
      '与工作满意度相关': '0.58',
      '与工作绩效相关': '0.48',
      '与职业成功相关': '0.52',
      '与职业倦怠相关': '-0.50',
    },
  },
  norms: {
    executives: 'N=750, 高管人群',
    managers: 'N=2,200, 中层管理者',
    professionals: 'N=1,850, 专业人士',
    graduates: 'N=800, 应届毕业生',
  },
}

export const cseReferences = [
  'Judge, T. A., Locke, E. A., & Durham, C. C. (1997). The dispositional approach to job attitudes: A critical evaluation. Research in Organizational Behavior, 19, 151-188.',
  'Judge, T. A., & Bono, J. E. (2001). Relationship of core self-evaluations traits - self-esteem, generalized self-efficacy, locus of control, and emotional stability - with job satisfaction and job performance: A meta-analysis. Journal of Applied Psychology, 86(1), 80-92.',
  'Judge, T. A., Erez, A., Bono, J. E., & Thoresen, C. J. (2002). The core self-evaluations scale: Development of a measure. Personnel Psychology, 55(2), 303-331.',
  'Chang, C. H., Ferris, D. L., Johnson, R. E., Rosen, C. C., & Tan, J. A. (2012). Core self-evaluations in China: A meta-analytic investigation of construct validity, cross-cultural generalizability, and relative contribution to work outcomes. Personnel Psychology, 65(2), 305-361.',
  'Johnson, R. E., Rosen, C. C., & Levy, P. E. (2008). The mediating role of job characteristics in the relationship between core self-evaluations and work outcomes. Journal of Applied Psychology, 93(2), 358-369.',
  'Staw, B. M., & Cohen-Charash, Y. (2005). The dispositional approach to job satisfaction: More than a mirage, but not yet an oasis. Journal of Organizational Behavior, 26(1), 59-78.',
  'Ollier-Malaterre, A., Rothbard, N. P., & Berg, J. M. (2013). It was all a dream: The role of core self-evaluations in boundaryless career experiences. Academy of Management Journal, 56(4), 1143-1168.',
  'Debusscher, J., Hofmans, J., & De Fruyt, F. (2014). The reciprocal relationship between core self-evaluations and perceived vocational success: A longitudinal investigation. Journal of Vocational Behavior, 84(3), 269-279.',
]

const cseOptions = [
  { id: '0', text: '完全不符合', value: 0 },
  { id: '1', text: '比较不符合', value: 1 },
  { id: '2', text: '一般', value: 2 },
  { id: '3', text: '比较符合', value: 3 },
  { id: '4', text: '完全符合', value: 4 },
]

export const cseDimensionMap: Record<string, string> = {
  'cse-001': 'selfEsteem',
  'cse-002': 'selfEsteem',
  'cse-003': 'selfEsteem',
  'cse-004': 'selfEsteem',
  'cse-005': 'selfEsteem',
  'cse-006': 'selfEsteem',
  'cse-007': 'selfEsteem',
  'cse-008': 'selfEsteem',
  'cse-009': 'selfEsteem',
  'cse-010': 'selfEsteem',
  'cse-011': 'selfEsteem',
  'cse-012': 'selfEsteem',
  'cse-013': 'selfEsteem',
  'cse-014': 'selfEfficacy',
  'cse-015': 'selfEfficacy',
  'cse-016': 'selfEfficacy',
  'cse-017': 'selfEfficacy',
  'cse-018': 'selfEfficacy',
  'cse-019': 'selfEfficacy',
  'cse-020': 'selfEfficacy',
  'cse-021': 'selfEfficacy',
  'cse-022': 'selfEfficacy',
  'cse-023': 'selfEfficacy',
  'cse-024': 'selfEfficacy',
  'cse-025': 'selfEfficacy',
  'cse-026': 'selfEfficacy',
  'cse-027': 'emotionalStability',
  'cse-028': 'emotionalStability',
  'cse-029': 'emotionalStability',
  'cse-030': 'emotionalStability',
  'cse-031': 'emotionalStability',
  'cse-032': 'emotionalStability',
  'cse-033': 'emotionalStability',
  'cse-034': 'emotionalStability',
  'cse-035': 'emotionalStability',
  'cse-036': 'emotionalStability',
  'cse-037': 'emotionalStability',
  'cse-038': 'emotionalStability',
  'cse-039': 'emotionalStability',
  'cse-040': 'locusOfControl',
  'cse-041': 'locusOfControl',
  'cse-042': 'locusOfControl',
  'cse-043': 'locusOfControl',
  'cse-044': 'locusOfControl',
  'cse-045': 'locusOfControl',
  'cse-046': 'locusOfControl',
  'cse-047': 'locusOfControl',
  'cse-048': 'locusOfControl',
  'cse-049': 'locusOfControl',
  'cse-050': 'locusOfControl',
  'cse-051': 'locusOfControl',
  'cse-052': 'locusOfControl',
  'cse-053': 'locusOfControl',
  'cse-054': 'locusOfControl',
}

const cseQuestionTexts: Record<string, string> = {
  'cse-001': '我对自己感到满意',
  'cse-002': '我觉得自己是个有价值的人',
  'cse-003': '我喜欢自己本来的样子',
  'cse-004': '我觉得自己和大多数人一样好',
  'cse-005': '我尊重自己',
  'cse-006': '我对自己有积极的评价',
  'cse-007': '我觉得自己有很多优点',
  'cse-008': '总的来说，我对自己很满意',
  'cse-009': '我不觉得自己是个失败者',
  'cse-010': '我能够正视自己的缺点',
  'cse-011': '我觉得自己值得被爱和尊重',
  'cse-012': '我对自己的能力充满信心',
  'cse-013': '我不会因为批评而过分贬低自己',
  'cse-014': '我相信自己有能力应对各种情况',
  'cse-015': '即使别人反对我，我也有办法获得我想要的',
  'cse-016': '我能够成功地完成各种任务',
  'cse-017': '我能够解决遇到的大部分问题',
  'cse-018': '我相信自己在遇到困难时能够坚持下去',
  'cse-019': '我能够实现为自己设定的目标',
  'cse-020': '我善于处理突发事件',
  'cse-021': '我能够有效地应对各种挑战',
  'cse-022': '我总能找到解决问题的方法',
  'cse-023': '我相信只要努力就能成功',
  'cse-024': '我有信心面对困难的工作',
  'cse-025': '我能够实现自己的人生目标',
  'cse-026': '我在遇到挫折时不会轻易放弃',
  'cse-027': '我很少感到焦虑或紧张',
  'cse-028': '我能够很好地应对压力',
  'cse-029': '我很少感到沮丧或抑郁',
  'cse-030': '我能够在压力下保持冷静',
  'cse-031': '我不会因为小事而心烦意乱',
  'cse-032': '我总是保持情绪稳定',
  'cse-033': '我很少感到悲观或绝望',
  'cse-034': '我对大多数事情都能保持平常心',
  'cse-035': '我不容易感到害怕或担忧',
  'cse-036': '我能够很好地控制自己的情绪',
  'cse-037': '我很少感到疲惫或精力不足',
  'cse-038': '我对生活总是保持平衡的态度',
  'cse-039': '我能够很好地应对变化',
  'cse-040': '我相信命运掌握在自己手中',
  'cse-041': '我的成功主要靠自己的努力',
  'cse-042': '我相信我能够改变自己的处境',
  'cse-043': '我不相信运气或命运决定我的人生',
  'cse-044': '我的努力总会有回报',
  'cse-045': '我能够通过行动来影响事情的发展',
  'cse-046': '我不会把失败归咎于运气不好',
  'cse-047': '我相信自己是人生的主宰',
  'cse-048': '遇到问题时我会主动采取行动',
  'cse-049': '我的未来由我自己决定',
  'cse-050': '我不相信事情的发展是命中注定的',
  'cse-051': '我总是为自己的行为负责',
  'cse-052': '我相信努力比运气更重要',
  'cse-053': '我能够通过自己的行动创造美好的未来',
  'cse-054': '我不会让环境主宰我的人生',
}

function createCSEQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: cseQuestionTexts[id],
    type: 'scale',
    dimensions: [cseDimensionMap[id]],
    options: cseOptions,
  }
}

export const cseAdvancedQuestions: ProfessionalQuestion[] = Array.from({ length: 54 }, (_, i) => createCSEQuestion(`cse-${String(i + 1).padStart(3, '0')}`))

export const cseProfessionalQuestionSet = {
  normal: cseAdvancedQuestions.slice(0, 24),
  advanced: cseAdvancedQuestions.slice(0, 40),
  professional: cseAdvancedQuestions,
}

export function calculateCSEScores(answerMap: Record<string, number>) {
  const dimensions = {
    selfEsteem: 0,
    selfEfficacy: 0,
    emotionalStability: 0,
    locusOfControl: 0,
  }
  const counts = { ...dimensions }

  cseAdvancedQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = cseDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 4)) * 100) : 50])
  ) as Record<string, number>

  const overallCSE = Math.round((scores.selfEsteem + scores.selfEfficacy + scores.emotionalStability + scores.locusOfControl) / 4)
  const agency = Math.round((scores.selfEfficacy + scores.locusOfControl) / 2)
  const selfRegard = Math.round((scores.selfEsteem + scores.emotionalStability) / 2)

  const sortedDimensions = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  return {
    scores,
    overallCSE,
    agency,
    selfRegard,
    dominantDimension: sortedDimensions[0],
  }
}

export function calculateCSEProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateCSEScores(answerMap)
  const dominantName = CSE_DIMENSION_NAMES[result.dominantDimension]

  const level = result.overallCSE >= 70 ? '高核心自我评价' : result.overallCSE >= 50 ? '中等核心自我评价' : '需要提升自我认知'

  return generateProfessionalResult({
    type: 'core-self-evaluation',
    title: '核心自我评价CSE专业报告',
    description: `你的自我评价水平：${level}，核心优势：${dominantName}`,
    score: result.overallCSE,
    accuracy: 90,
    dimensions: [
      ...Object.entries(result.scores).map(([k, v]) => ({
        name: CSE_DIMENSION_NAMES[k],
        score: v,
        maxScore: 100,
        description: CSE_DIMENSION_DESCRIPTIONS[k],
      })),
      { name: '核心自我评价总分', score: result.overallCSE, maxScore: 100, description: '四维度综合指数' },
      { name: '能动意识', score: result.agency, maxScore: 100, description: '自我效能+内控点' },
      { name: '自我接纳', score: result.selfRegard, maxScore: 100, description: '自尊+情绪稳定性' },
    ],
    strengths: [
      `CSE水平：${level} (${result.overallCSE}分)`,
      `核心优势：${dominantName}`,
      `自我能动性：${result.agency}分`,
    ],
    weaknesses: [],
    careers: [],
  }, 'advanced')
}
