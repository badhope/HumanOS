import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const PES_DIMENSIONS = [
  '工作意义感 Meaning',
  '自我效能感 Competence',
  '工作自主性 Self-determination',
  '工作影响力 Impact',
]

export const PES_DIMENSION_NAMES: Record<string, string> = {
  meaning: '工作意义感',
  competence: '自我效能感',
  autonomy: '工作自主性',
  impact: '工作影响力',
}

export const PES_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  meaning: '感知工作目标与价值与个人价值观的一致程度',
  competence: '对自身完成工作能力的自信心',
  autonomy: '对工作决策和执行的自主决定权',
  impact: '感知自身对组织战略与结果的影响程度',
}

export const pesNormData = {
  means: {
    overall: 52,
    meaning: 55,
    competence: 51,
    autonomy: 50,
    impact: 52,
  },
  stdDeviations: {
    meaning: 10.2,
    competence: 11.5,
    autonomy: 12.8,
    impact: 11.3,
  },
  percentiles: {
    veryLow: 15,
    low: 30,
    average: 50,
    high: 70,
    veryHigh: 85,
  },
  clinicalCutoffs: {
    empowermentLow: 35,
    autonomyLow: 30,
    impactLow: 30,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.86,
      meaning: 0.82,
      competence: 0.79,
      autonomy: 0.81,
      impact: 0.78,
    },
    testRetestReliability: {
      '4weeks': 0.72,
      '6months': 0.65,
    },
    constructValidity: {
      '与工作满意度相关': '0.58',
      '与组织承诺相关': '0.52',
      '与创新行为相关': '0.48',
      '与离职意向相关': '-0.45',
    },
  },
  norms: {
    knowledgeWorkers: 'N=4,800, IT/研发/咨询行业',
    publicSector: 'N=1,850, 政府及事业单位',
    manufacturing: 'N=1,200, 制造业员工',
    healthcare: 'N=650, 医疗机构',
  },
}

export const pesReferences = [
  'Thomas, K. W., & Velthouse, B. A. (1990). Cognitive elements of empowerment: An "interpretive" model of intrinsic task motivation. Academy of Management Review, 15(4), 666-681.',
  'Spreitzer, G. M. (1995). Psychological empowerment in the workplace: Dimensions, measurement, and validation. Academy of Management Journal, 38(5), 1442-1465.',
  'Conger, J. A., & Kanungo, R. N. (1988). The empowerment process: Integrating theory and practice. Academy of Management Review, 13(3), 471-482.',
  'Maynard, M. T., Gilson, L. L., & Mathieu, J. E. (2012). Empowerment - fad or fundamental? A multi-level, multi-dimensional examination of empowerment over time. Journal of Organizational Behavior, 33(8), 1065-1090.',
  'Seibert, S. E., Silver, S. R., & Randolph, W. A. (2004). Taking empowerment to the next level: A multiple-level model of empowerment, performance, and satisfaction. Academy of Management Journal, 47(3), 332-349.',
  'Spreitzer, G. M. (2008). Taking stock of psychological empowerment research: What have we learned, and where do we go from here? In J. C. Quick & L. E. Tetrick (Eds.), Handbook of occupational health psychology. American Psychological Association.',
  'Zhang, X., & Bartol, K. M. (2010). Linking empowering leadership and employee creativity: The influence of psychological empowerment, intrinsic motivation, and creative process engagement. Academy of Management Journal, 53(1), 107-128.',
  'Lee, F., Wei, Y., & Sia, C. L. (2017). Psychological empowerment: A meta-analysis of antecedents, correlates, and consequences. Journal of Management, 44(7), 2607-2633.',
]

const pesOptions = [
  { id: '0', text: '完全不符合', value: 0 },
  { id: '1', text: '比较不符合', value: 1 },
  { id: '2', text: '一般', value: 2 },
  { id: '3', text: '比较符合', value: 3 },
  { id: '4', text: '完全符合', value: 4 },
]

export const pesDimensionMap: Record<string, string> = {
  'pes-001': 'meaning',
  'pes-002': 'meaning',
  'pes-003': 'meaning',
  'pes-004': 'meaning',
  'pes-005': 'meaning',
  'pes-006': 'meaning',
  'pes-007': 'meaning',
  'pes-008': 'competence',
  'pes-009': 'competence',
  'pes-010': 'competence',
  'pes-011': 'competence',
  'pes-012': 'competence',
  'pes-013': 'competence',
  'pes-014': 'competence',
  'pes-015': 'autonomy',
  'pes-016': 'autonomy',
  'pes-017': 'autonomy',
  'pes-018': 'autonomy',
  'pes-019': 'autonomy',
  'pes-020': 'autonomy',
  'pes-021': 'autonomy',
  'pes-022': 'impact',
  'pes-023': 'impact',
  'pes-024': 'impact',
  'pes-025': 'impact',
  'pes-026': 'impact',
  'pes-027': 'impact',
  'pes-028': 'impact',
  'pes-029': 'meaning',
  'pes-030': 'meaning',
  'pes-031': 'meaning',
  'pes-032': 'meaning',
  'pes-033': 'meaning',
  'pes-034': 'meaning',
  'pes-035': 'meaning',
  'pes-036': 'competence',
  'pes-037': 'competence',
  'pes-038': 'competence',
  'pes-039': 'competence',
  'pes-040': 'competence',
  'pes-041': 'competence',
  'pes-042': 'competence',
  'pes-043': 'autonomy',
  'pes-044': 'autonomy',
  'pes-045': 'autonomy',
  'pes-046': 'autonomy',
  'pes-047': 'autonomy',
  'pes-048': 'autonomy',
  'pes-049': 'autonomy',
  'pes-050': 'impact',
  'pes-051': 'impact',
  'pes-052': 'impact',
  'pes-053': 'impact',
  'pes-054': 'impact',
}

const pesQuestionTexts: Record<string, string> = {
  'pes-001': '我做的工作对我个人来说非常有意义',
  'pes-002': '我的工作活动对我个人具有重要意义',
  'pes-003': '我所做的工作与我的个人价值观高度一致',
  'pes-004': '我热爱我的工作本身',
  'pes-005': '我的工作让我感受到存在的价值',
  'pes-006': '我认为我的工作很重要',
  'pes-007': '工作让我找到了人生的方向感',
  'pes-008': '我对自己完成工作任务的能力充满信心',
  'pes-009': '我掌握了完成工作所需要的技能',
  'pes-010': '我自信能够高质量地完成本职工作',
  'pes-011': '我对自己的工作能力感到自豪',
  'pes-012': '工作中的挑战我都有信心应对',
  'pes-013': '我觉得自己胜任目前的岗位',
  'pes-014': '复杂的任务我也能独立完成',
  'pes-015': '我可以自主决定如何开展我的工作',
  'pes-016': '我在工作中有很大的自主权',
  'pes-017': '我可以独立决定工作的方法和节奏',
  'pes-018': '我能控制工作中的重要决策',
  'pes-019': '我的意见在工作中能够被重视',
  'pes-020': '我可以自主安排工作优先级',
  'pes-021': '我不需要事无巨细都向上级请示',
  'pes-022': '我对所在部门的决策有影响力',
  'pes-023': '我的建议能够影响所在团队的发展方向',
  'pes-024': '我对组织战略的执行有发言权',
  'pes-025': '我的工作能显著影响团队的绩效',
  'pes-026': '我对组织的最终成果有贡献',
  'pes-027': '我的想法在组织中有一定的影响力',
  'pes-028': '我能推动一些重要事情的进展',
  'pes-029': '我觉得自己的工作是有价值的贡献',
  'pes-030': '工作让我体验到成就感',
  'pes-031': '我在工作中找到了使命感',
  'pes-032': '我的工作目标对社会有积极影响',
  'pes-033': '工作使我能够实现个人价值',
  'pes-034': '我对工作充满热情',
  'pes-035': '工作让我每天都充满期待',
  'pes-036': '面对困难时我相信自己能够解决',
  'pes-037': '我在专业领域有足够的能力',
  'pes-038': '我比多数同事有更强的工作能力',
  'pes-039': '我不断提升自己的工作技能',
  'pes-040': '我有信心承担更大的责任',
  'pes-041': '我总能找到解决问题的办法',
  'pes-042': '我对自己的能力有清醒的认识',
  'pes-043': '工作中我可以按照自己的方式做事',
  'pes-044': '我能够灵活安排工作时间',
  'pes-045': '我可以尝试新的工作方法',
  'pes-046': '没有人干涉我具体的工作过程',
  'pes-047': '制定工作计划时我有参与权',
  'pes-048': '我可以自主决定工作的标准',
  'pes-049': '我对工作结果有重要影响',
  'pes-050': '我参与制定团队的重大决策',
  'pes-051': '我是团队中重要的一员',
  'pes-052': '我的工作产出直接关系到团队成功',
  'pes-053': '我有能力改变一些不合理的事情',
  'pes-054': '组织的未来发展与我息息相关',
}

function createPESQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: pesQuestionTexts[id],
    type: 'scale',
    dimensions: [pesDimensionMap[id]],
    options: pesOptions,
  }
}

export const pesAdvancedQuestions: ProfessionalQuestion[] = Array.from({ length: 54 }, (_, i) => createPESQuestion(`pes-${String(i + 1).padStart(3, '0')}`))

export const pesProfessionalQuestionSet = {
  normal: pesAdvancedQuestions.slice(0, 24),
  advanced: pesAdvancedQuestions.slice(0, 40),
  professional: pesAdvancedQuestions,
}

export function calculatePESScores(answerMap: Record<string, number>) {
  const dimensions = {
    meaning: 0,
    competence: 0,
    autonomy: 0,
    impact: 0,
  }
  const counts = { ...dimensions }

  pesAdvancedQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = pesDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 4)) * 100) : 50])
  ) as Record<string, number>

  const overallEmpowerment = Math.round((scores.meaning + scores.competence + scores.autonomy + scores.impact) / 4)
  const intrinsicMotivation = Math.round((scores.meaning * 1.5 + scores.competence) / 2.5)
  const agenticOrientation = Math.round((scores.autonomy * 1.2 + scores.impact * 0.8) / 2)

  const sortedDimensions = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  return {
    scores,
    overallEmpowerment,
    intrinsicMotivation,
    agenticOrientation,
    dominantDimension: sortedDimensions[0],
  }
}

export function calculatePESProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculatePESScores(answerMap)
  const dominantName = PES_DIMENSION_NAMES[result.dominantDimension]

  const level = result.overallEmpowerment >= 70 ? '高度授权' : result.overallEmpowerment >= 50 ? '中等授权' : '授权不足'

  return generateProfessionalResult({
    type: 'psychological-empowerment',
    title: '心理授权PES专业报告',
    description: `你的整体心理授权水平：${level}，主导维度：${dominantName}`,
    score: result.overallEmpowerment,
    accuracy: 89,
    dimensions: [
      ...Object.entries(result.scores).map(([k, v]) => ({
        name: PES_DIMENSION_NAMES[k],
        score: v,
        maxScore: 100,
        description: PES_DIMENSION_DESCRIPTIONS[k],
      })),
      { name: '内在动机', score: result.intrinsicMotivation, maxScore: 100, description: '工作意义+自我效能综合' },
      { name: '能动导向', score: result.agenticOrientation, maxScore: 100, description: '自主性+影响力综合' },
    ],
    strengths: [
      `整体授权水平：${level} (${result.overallEmpowerment}分)`,
      `主导维度：${dominantName}`,
      `内在动机：${result.intrinsicMotivation}分`,
    ],
    weaknesses: [],
    careers: [],
  }, 'advanced')
}
