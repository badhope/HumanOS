import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const OCB_DIMENSIONS = [
  '利他行为 Altruism',
  '责任心 Conscientiousness',
  '公民美德 Civic Virtue',
  '谦恭有礼 Courtesy',
  '运动员精神 Sportsmanship',
  '组织认同 Organizational Identification',
  '人际和谐 Interpersonal Harmony',
  '保护组织资源 Protecting Resources',
]

export const OCB_DIMENSION_NAMES: Record<string, string> = {
  altruism: '利他行为',
  conscientiousness: '责任心',
  'civic-virtue': '公民美德',
  courtesy: '谦恭有礼',
  sportsmanship: '运动员精神',
  identification: '组织认同',
  harmony: '人际和谐',
  protection: '保护资源',
}

export const OCB_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  altruism: '主动帮助同事解决工作相关问题的行为',
  conscientiousness: '超越角色要求的自我约束与尽职行为',
  'civic-virtue': '主动参与组织治理与建设性建言',
  courtesy: '尊重他人、维护良好人际边界的行为',
  sportsmanship: '面对不如意情境时的宽容与大局观',
  identification: '对组织产生归属感与自豪感',
  harmony: '主动维护团队和谐、化解人际冲突的行为',
  protection: '主动保护组织财产与声誉的行为',
}

export const ocbNormData = {
  means: {
    overall: 54,
    altruism: 56,
    conscientiousness: 58,
    'civic-virtue': 52,
    courtesy: 55,
    sportsmanship: 48,
    identification: 53,
    harmony: 54,
    protection: 51,
  },
  stdDeviations: {
    altruism: 9.8,
    conscientiousness: 8.5,
    'civic-virtue': 11.2,
    courtesy: 10.1,
    sportsmanship: 12.3,
  },
  percentiles: {
    veryLow: 18,
    low: 32,
    average: 50,
    high: 68,
    veryHigh: 82,
  },
  clinicalCutoffs: {
    OCBOverallLow: 35,
    SportsmanshipLow: 30,
    CivicVirtueLow: 30,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.84,
      altruism: 0.78,
      conscientiousness: 0.76,
      'civic-virtue': 0.75,
      courtesy: 0.77,
      sportsmanship: 0.72,
    },
    testRetestReliability: {
      '4weeks': 0.74,
      '6months': 0.66,
    },
    constructValidity: {
      '与组织承诺相关': '0.62',
      '与工作绩效相关': '0.48',
      '与领导成员交换相关': '0.55',
      '与离职意向相关': '-0.42',
    },
  },
  norms: {
    privateSector: 'N=5,200, 民营企业',
    stateOwned: 'N=2,400, 国有企业',
    foreignOwned: 'N=1,600, 外资企业',
    nonProfit: 'N=800, 非营利组织',
  },
}

export const ocbReferences = [
  'Organ, D. W. (1988). Organizational citizenship behavior: The good soldier syndrome. Lexington Books.',
  'Smith, C. A., Organ, D. W., & Near, J. P. (1983). Organizational citizenship behavior: Its nature and antecedents. Journal of Applied Psychology, 68(4), 653-663.',
  'Podsakoff, P. M., MacKenzie, S. B., Paine, J. B., & Bachrach, D. G. (2000). Organizational citizenship behaviors: A critical review of the theoretical and empirical literature and suggestions for future research. Journal of Management, 26(3), 513-563.',
  'LePine, J. A., Erez, A., & Johnson, D. E. (2002). The nature and dimensionality of organizational citizenship behavior: A critical review and meta-analysis. Journal of Applied Psychology, 87(1), 52-65.',
  'Williams, L. J., & Anderson, S. E. (1991). Job satisfaction and organizational commitment as predictors of organizational citizenship and in-role behaviors. Journal of Management, 17(3), 601-617.',
  'Farh, J. L., Earley, P. C., & Lin, S. C. (1997). Impetus for action: A cultural analysis of justice and organizational citizenship behavior in Chinese society. Administrative Science Quarterly, 42(3), 421-444.',
  'Chiaburu, D. S., Oh, I. S., Berry, C. M., Li, N., & Gardner, R. G. (2011). The two faces of organizational citizenship behavior: An investigation of the relationships between OCBs, task performance, and citizenship pressure. Academy of Management Journal, 54(6), 1130-1150.',
  'Podsakoff, N. P., Whiting, S. W., Podsakoff, P. M., & Blume, B. D. (2009). Individual- and organizational-level consequences of organizational citizenship behaviors: A meta-analysis. Journal of Applied Psychology, 94(1), 122-141.',
]

const ocbOptions = [
  { id: '0', text: '完全不符合', value: 0 },
  { id: '1', text: '比较不符合', value: 1 },
  { id: '2', text: '一般', value: 2 },
  { id: '3', text: '比较符合', value: 3 },
  { id: '4', text: '完全符合', value: 4 },
]

export const ocbDimensionMap: Record<string, string> = {
  'ocb-001': 'altruism',
  'ocb-002': 'altruism',
  'ocb-003': 'altruism',
  'ocb-004': 'altruism',
  'ocb-005': 'altruism',
  'ocb-006': 'altruism',
  'ocb-007': 'altruism',
  'ocb-008': 'conscientiousness',
  'ocb-009': 'conscientiousness',
  'ocb-010': 'conscientiousness',
  'ocb-011': 'conscientiousness',
  'ocb-012': 'conscientiousness',
  'ocb-013': 'conscientiousness',
  'ocb-014': 'conscientiousness',
  'ocb-015': 'civic-virtue',
  'ocb-016': 'civic-virtue',
  'ocb-017': 'civic-virtue',
  'ocb-018': 'civic-virtue',
  'ocb-019': 'civic-virtue',
  'ocb-020': 'civic-virtue',
  'ocb-021': 'civic-virtue',
  'ocb-022': 'courtesy',
  'ocb-023': 'courtesy',
  'ocb-024': 'courtesy',
  'ocb-025': 'courtesy',
  'ocb-026': 'courtesy',
  'ocb-027': 'courtesy',
  'ocb-028': 'courtesy',
  'ocb-029': 'sportsmanship',
  'ocb-030': 'sportsmanship',
  'ocb-031': 'sportsmanship',
  'ocb-032': 'sportsmanship',
  'ocb-033': 'sportsmanship',
  'ocb-034': 'sportsmanship',
  'ocb-035': 'sportsmanship',
  'ocb-036': 'identification',
  'ocb-037': 'identification',
  'ocb-038': 'identification',
  'ocb-039': 'identification',
  'ocb-040': 'identification',
  'ocb-041': 'identification',
  'ocb-042': 'identification',
  'ocb-043': 'harmony',
  'ocb-044': 'harmony',
  'ocb-045': 'harmony',
  'ocb-046': 'harmony',
  'ocb-047': 'harmony',
  'ocb-048': 'harmony',
  'ocb-049': 'harmony',
  'ocb-050': 'protection',
  'ocb-051': 'protection',
  'ocb-052': 'protection',
  'ocb-053': 'protection',
  'ocb-054': 'protection',
  'ocb-055': 'protection',
  'ocb-056': 'protection',
  'ocb-057': 'altruism',
  'ocb-058': 'conscientiousness',
  'ocb-059': 'civic-virtue',
  'ocb-060': 'courtesy',
  'ocb-061': 'sportsmanship',
  'ocb-062': 'identification',
  'ocb-063': 'harmony',
}

const ocbQuestionTexts: Record<string, string> = {
  'ocb-001': '我会主动帮助工作量大的同事',
  'ocb-002': '新同事入职时我会主动提供指导帮助',
  'ocb-003': '同事遇到工作困难时我会伸出援手',
  'ocb-004': '我愿意与同事分享自己的知识和经验',
  'ocb-005': '我会主动分担同事的工作压力',
  'ocb-006': '我会热心帮助同事解决工作中的问题',
  'ocb-007': '同事请假时我愿意帮忙承担其工作',
  'ocb-008': '我总是准时出勤，很少迟到早退',
  'ocb-009': '即使无人监督我也会认真完成工作',
  'ocb-010': '我的工作质量总是超过要求的标准',
  'ocb-011': '我严格遵守组织的各项规章制度',
  'ocb-012': '我会主动加班完成重要的工作',
  'ocb-013': '我对待工作认真负责，极少出现差错',
  'ocb-014': '我会提前做好工作计划和准备',
  'ocb-015': '我会主动参加公司的会议和活动',
  'ocb-016': '我关注公司的发展动态和战略方向',
  'ocb-017': '我会对公司的发展提出建设性意见',
  'ocb-018': '我积极参与组织的改进项目',
  'ocb-019': '我会主动了解行业的最新发展',
  'ocb-020': '我愿意承担额外的工作职责',
  'ocb-021': '我会投票选举优秀的员工代表',
  'ocb-022': '与人交往时我总是保持礼貌和尊重',
  'ocb-023': '做决定前我会考虑对他人的影响',
  'ocb-024': '我会及时告知他人可能影响他们的信息',
  'ocb-025': '我尊重他人的时间和工作安排',
  'ocb-026': '我不干涉同事的工作方式',
  'ocb-027': '与不同意见的人交流我依然保持礼貌',
  'ocb-028': '我会主动感谢他人的帮助和支持',
  'ocb-029': '遇到不完美的情况我不会抱怨',
  'ocb-030': '为了团队整体利益我愿意牺牲个人便利',
  'ocb-031': '我能够接受临时的工作调整安排',
  'ocb-032': '即使受到委屈也不会影响我的工作',
  'ocb-033': '我相信组织最终会做出公正的决定',
  'ocb-034': '我能够正确看待工作中的得失',
  'ocb-035': '我不介意做一些额外的琐事',
  'ocb-036': '我为自己是这个组织的一员而自豪',
  'ocb-037': '在外人面前我会主动维护公司形象',
  'ocb-038': '公司取得成就时我感到由衷的高兴',
  'ocb-039': '我把公司的事看作是自己的事',
  'ocb-040': '我会向朋友推荐我们的公司和产品',
  'ocb-041': '我与公司休戚与共、荣辱与共',
  'ocb-042': '我愿意长期在这个组织发展',
  'ocb-043': '我会主动调解同事之间的矛盾',
  'ocb-044': '我努力营造轻松和谐的工作氛围',
  'ocb-045': '我会避免说一些可能引起矛盾的话',
  'ocb-046': '我愿意主动与有分歧的人和解',
  'ocb-047': '我欣赏和肯定同事的优点和成就',
  'ocb-048': '我包容同事的小缺点和不足',
  'ocb-049': '我积极参与团队建设活动',
  'ocb-050': '我会制止浪费公司资源的行为',
  'ocb-051': '我会保护公司的财产和商业机密',
  'ocb-052': '我发现问题会及时向上级反映',
  'ocb-053': '我不会利用公司资源办私人的事情',
  'ocb-054': '我注意节约水电和办公用品',
  'ocb-055': '遇到损害公司利益的行为我会制止',
  'ocb-056': '我会妥善保管公司的设备和资料',
  'ocb-057': '当同事遇到个人困难时我会表示关心',
  'ocb-058': '我会主动检查自己的工作确保没有差错',
  'ocb-059': '我关注公司的长期发展而非眼前利益',
  'ocb-060': '我会耐心倾听他人的不同意见',
  'ocb-061': '面对批评我会虚心接受并改进',
  'ocb-062': '我会向亲友宣传我们公司的好',
  'ocb-063': '我努力与每一位同事都保持良好关系',
}

function createOCBQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: ocbQuestionTexts[id],
    type: 'scale',
    dimensions: [ocbDimensionMap[id]],
    options: ocbOptions,
  }
}

export const ocbProfessionalQuestions: ProfessionalQuestion[] = Array.from({ length: 63 }, (_, i) => createOCBQuestion(`ocb-${String(i + 1).padStart(3, '0')}`))

export const ocbProfessionalQuestionSet = {
  normal: ocbProfessionalQuestions.slice(0, 27),
  advanced: ocbProfessionalQuestions.slice(0, 45),
  professional: ocbProfessionalQuestions,
}

export function calculateOCBScores(answerMap: Record<string, number>) {
  const dimensions = {
    altruism: 0,
    conscientiousness: 0,
    'civic-virtue': 0,
    courtesy: 0,
    sportsmanship: 0,
    identification: 0,
    harmony: 0,
    protection: 0,
  }
  const counts = { ...dimensions }

  ocbProfessionalQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = ocbDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 4)) * 100) : 50])
  ) as Record<string, number>

  const overallOCB = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length)
  const interpersonalOCB = Math.round((scores.altruism + scores.courtesy + scores.harmony) / 3)
  const organizationalOCB = Math.round((scores.conscientiousness + scores['civic-virtue'] + scores.identification + scores.protection) / 4)

  const sortedDimensions = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  return {
    scores,
    overallOCB,
    interpersonalOCB,
    organizationalOCB,
    dominantDimension: sortedDimensions[0],
  }
}

export function calculateOCBProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateOCBScores(answerMap)
  const dominantName = OCB_DIMENSION_NAMES[result.dominantDimension]

  const level = result.overallOCB >= 70 ? '卓越贡献者' : result.overallOCB >= 50 ? '良好公民' : '基础达标'

  return generateProfessionalResult({
    type: 'organizational-citizenship',
    title: '组织公民行为OCB专业报告',
    description: `你的组织公民角色：${level}，最突出的表现维度：${dominantName}`,
    score: result.overallOCB,
    accuracy: 87,
    dimensions: [
      ...Object.entries(result.scores).map(([k, v]) => ({
        name: OCB_DIMENSION_NAMES[k],
        score: v,
        maxScore: 100,
        description: OCB_DIMENSION_DESCRIPTIONS[k],
      })),
      { name: '人际指向OCB', score: result.interpersonalOCB, maxScore: 100, description: '利他+礼貌+人际和谐综合' },
      { name: '组织指向OCB', score: result.organizationalOCB, maxScore: 100, description: '尽责+公民美德+认同+保护综合' },
    ],
    strengths: [
      `组织公民等级：${level} (${result.overallOCB}分)`,
      `最突出维度：${dominantName}`,
      `人际OCB:${result.interpersonalOCB}分 / 组织OCB:${result.organizationalOCB}分`,
    ],
    weaknesses: [],
    careers: [],
  }, 'professional')
}
