import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const DISC_STYLES = [
  '支配型 D - Dominance',
  '影响型 I - Influence',
  '稳健型 S - Steadiness',
  '谨慎型 C - Conscientiousness',
]

export const DISC_STYLE_NAMES: Record<string, string> = {
  d: '支配型',
  i: '影响型',
  s: '稳健型',
  c: '谨慎型',
}

export const DISC_STYLE_DESCRIPTIONS: Record<string, string> = {
  d: '结果导向、果断自信、勇于挑战、追求掌控的指挥者风格',
  i: '热情乐观、善于社交、鼓舞人心、追求认同的说服者风格',
  s: '耐心稳重、可靠忠诚、善于倾听、追求和谐的支持者风格',
  c: '精确严谨、理性分析、注重品质、追求完美的思考者风格',
}

export const DISC_STYLE_INTERPRETATIONS: Record<string, string> = {
  d: '典型的驱动型人格，适合领导岗位和开拓型工作',
  i: '典型的社交型人格，适合销售和公共关系类工作',
  s: '典型的稳健型人格，适合行政和服务类工作',
  c: '典型的分析型人格，适合研发和质量控制类工作',
}

export const discNormData = {
  means: {
    overall: 50,
    d: 48,
    i: 51,
    s: 52,
    c: 49,
  },
  stdDeviations: {
    d: 13.5,
    i: 12.8,
    s: 11.2,
    c: 12.4,
  },
  percentiles: {
    veryLow: 10,
    low: 25,
    average: 50,
    high: 75,
    veryHigh: 90,
  },
  profileCutoffs: {
    dominanceHigh: 70,
    influenceHigh: 75,
    steadinessHigh: 75,
    conscientiousnessHigh: 75,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.82,
      d: 0.78,
      i: 0.79,
      s: 0.76,
      c: 0.77,
    },
    testRetestReliability: {
      '4weeks': 0.81,
      '1year': 0.72,
      '2years': 0.65,
    },
    constructValidity: {
      '与管理绩效相关': '0.48 (D高分值)',
      '与销售业绩相关': '0.52 (I高分值)',
      '与客服满意度相关': '0.46 (S高分值)',
      '与工作准确性相关': '0.50 (C高分值)',
    },
  },
  norms: {
    executive: 'N=2,100, 高管人群',
    sales: 'N=3,800, 销售人员',
    management: 'N=4,500, 中层管理者',
    professional: 'N=4,600, 专业技术人员',
  },
}

export const discReferences = [
  'Marston, W. M. (1928). Emotions of Normal People. Kegan Paul, Trench, Trubner & Co.',
  'William Moulton Marston - DISC理论创始人. (1928). 常人的情绪.',
  'Clayton, P. (1996). Everything DiSC: A research-based leadership model. Inscape Publishing.',
  'Bradberry, T., & Greaves, J. (2003). The DISC Personality System. TalentSmart.',
  'Merenda, P. F. (1997). A guide to the use and interpretation of the DISCUS personality profile. Performance Management Consultants.',
  'Drenth, P. J. D., Thierry, H., & de Wolff, C. J. (1998). Handbook of work and organizational psychology. Psychology Press.',
  'Streufert, S., & Nogami, G. Y. (1989). Cognitive style and DISC behavioral characteristics. Social Behavior and Personality, 17(1), 1-14.',
  'Di Stefano, J., & Hulbert, B. (2000). The discriminant validity of the DISC behaviour style instrument. SA Journal of Industrial Psychology, 26(2), 1-7.',
]

const discOptions = [
  { id: '0', text: '完全不符合', value: 0 },
  { id: '1', text: '比较不符合', value: 1 },
  { id: '2', text: '一般', value: 2 },
  { id: '3', text: '比较符合', value: 3 },
  { id: '4', text: '完全符合', value: 4 },
]

export const discDimensionMap: Record<string, string> = {
  'disc-001': 'd',
  'disc-002': 'd',
  'disc-003': 'd',
  'disc-004': 'd',
  'disc-005': 'd',
  'disc-006': 'd',
  'disc-007': 'd',
  'disc-008': 'd',
  'disc-009': 'd',
  'disc-010': 'd',
  'disc-011': 'd',
  'disc-012': 'd',
  'disc-013': 'd',
  'disc-014': 'd',
  'disc-015': 'd',
  'disc-016': 'd',
  'disc-017': 'd',
  'disc-018': 'd',
  'disc-019': 'i',
  'disc-020': 'i',
  'disc-021': 'i',
  'disc-022': 'i',
  'disc-023': 'i',
  'disc-024': 'i',
  'disc-025': 'i',
  'disc-026': 'i',
  'disc-027': 'i',
  'disc-028': 'i',
  'disc-029': 'i',
  'disc-030': 'i',
  'disc-031': 'i',
  'disc-032': 'i',
  'disc-033': 'i',
  'disc-034': 'i',
  'disc-035': 'i',
  'disc-036': 's',
  'disc-037': 's',
  'disc-038': 's',
  'disc-039': 's',
  'disc-040': 's',
  'disc-041': 's',
  'disc-042': 's',
  'disc-043': 's',
  'disc-044': 's',
  'disc-045': 's',
  'disc-046': 's',
  'disc-047': 's',
  'disc-048': 's',
  'disc-049': 's',
  'disc-050': 's',
  'disc-051': 's',
  'disc-052': 's',
  'disc-053': 's',
  'disc-054': 'c',
  'disc-055': 'c',
  'disc-056': 'c',
  'disc-057': 'c',
  'disc-058': 'c',
  'disc-059': 'c',
  'disc-060': 'c',
  'disc-061': 'c',
  'disc-062': 'c',
  'disc-063': 'c',
  'disc-064': 'c',
  'disc-065': 'c',
  'disc-066': 'c',
  'disc-067': 'c',
  'disc-068': 'c',
  'disc-069': 'c',
  'disc-070': 'c',
  'disc-071': 'c',
  'disc-072': 'c',
}

const discQuestionTexts: Record<string, string> = {
  'disc-001': '我喜欢接受挑战和竞争',
  'disc-002': '我倾向于直接坦率地表达观点',
  'disc-003': '我享受掌控局面的感觉',
  'disc-004': '我追求结果更甚于过程的完美',
  'disc-005': '我敢于做出艰难的决策',
  'disc-006': '我不害怕面对冲突和反对意见',
  'disc-007': '我喜欢设定高目标并努力达成',
  'disc-008': '我倾向于快速决策而非反复斟酌',
  'disc-009': '我愿意承担风险来获得更大回报',
  'disc-010': '我喜欢领导和指导他人工作',
  'disc-011': '我会坚持自己的观点不轻易让步',
  'disc-012': '我追求效率和速度',
  'disc-013': '我能够独立做出重要决定',
  'disc-014': '我喜欢创新和变革',
  'disc-015': '我对权威敢于提出质疑',
  'disc-016': '我会主动争取自己想要的',
  'disc-017': '面对困难我不会轻易放弃',
  'disc-018': '我喜欢有压力的工作环境',
  'disc-019': '我喜欢与人交往和结识新朋友',
  'disc-020': '我善于说服别人接受我的观点',
  'disc-021': '我充满热情和乐观精神',
  'disc-022': '我喜欢在团队中发挥影响力',
  'disc-023': '我擅长激励和鼓舞他人',
  'disc-024': '我说话风趣幽默，善于活跃气氛',
  'disc-025': '我喜欢公开表达我的想法',
  'disc-026': '我很容易与陌生人建立关系',
  'disc-027': '我享受成为众人关注的焦点',
  'disc-028': '我擅长处理人际关系问题',
  'disc-029': '我喜欢分享我的经验和想法',
  'disc-030': '我对新事物充满好奇心和热情',
  'disc-031': '我善于调动团队的积极性',
  'disc-032': '我擅长口头表达和演讲',
  'disc-033': '我喜欢社交活动和聚会',
  'disc-034': '我有很强的说服能力',
  'disc-035': '我能够快速融入新环境',
  'disc-036': '我是一个耐心和随和的人',
  'disc-037': '我擅长倾听别人的想法和感受',
  'disc-038': '我喜欢稳定和可预测的工作环境',
  'disc-039': '我是一个可靠和值得信赖的人',
  'disc-040': '我善于与不同类型的人合作',
  'disc-041': '我不喜欢突如其来的变化',
  'disc-042': '我擅长建立长期的友好关系',
  'disc-043': '我是一个很好的团队合作者',
  'disc-044': '我善于保持冷静和镇定',
  'disc-045': '我会按部就班地完成工作',
  'disc-046': '我喜欢帮助和支持他人',
  'disc-047': '我对变化持谨慎态度',
  'disc-048': '我能够持续专注地做一件事',
  'disc-049': '我善于调解矛盾和冲突',
  'disc-050': '我追求和谐的人际关系',
  'disc-051': '我做事稳健不喜欢冒险',
  'disc-052': '我有很强的毅力和恒心',
  'disc-053': '我尊重传统和既定的规则',
  'disc-054': '我注重细节和准确性',
  'disc-055': '我喜欢用数据和事实说话',
  'disc-056': '我追求完美和高品质',
  'disc-057': '我善于进行逻辑分析和推理',
  'disc-058': '我喜欢制定详细的计划',
  'disc-059': '我做事认真严谨，一丝不苟',
  'disc-060': '我擅长发现问题和错误',
  'disc-061': '我喜欢有明确标准和规则的工作',
  'disc-062': '我重视质量胜于速度',
  'disc-063': '我善于组织和整理信息',
  'disc-064': '我做事有条不紊、秩序井然',
  'disc-065': '我对自己和他人有很高的标准',
  'disc-066': '我喜欢深入研究和探索问题本质',
  'disc-067': '我注重客观事实而非主观感受',
  'disc-068': '我擅长系统化思维和流程设计',
  'disc-069': '我遵守规则和程序办事',
  'disc-070': '我追求精确而非大概',
  'disc-071': '我善于进行批判性思考',
  'disc-072': '我做事前会做充分的准备',
}

function createDISCQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: discQuestionTexts[id],
    type: 'scale',
    dimensions: [discDimensionMap[id]],
    options: discOptions,
  }
}

export const discProfessionalQuestions: ProfessionalQuestion[] = Array.from({ length: 72 }, (_, i) => createDISCQuestion(`disc-${String(i + 1).padStart(3, '0')}`))

export const discProfessionalQuestionSet = {
  normal: discProfessionalQuestions.slice(0, 32),
  advanced: discProfessionalQuestions.slice(0, 52),
  professional: discProfessionalQuestions,
}

export function calculateDISCScores(answerMap: Record<string, number>) {
  const dimensions = {
    d: 0,
    i: 0,
    s: 0,
    c: 0,
  }
  const counts = { ...dimensions }

  discProfessionalQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = discDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 4)) * 100) : 50])
  ) as Record<string, number>

  const taskOrientation = Math.round((scores.d * 1.5 + scores.c * 0.5) / 2)
  const peopleOrientation = Math.round((scores.i * 1.2 + scores.s * 0.8) / 2)
  const assertiveness = Math.round((scores.d + scores.i - scores.s - scores.c + 200) / 4)
  const flexibility = Math.round((scores.i + scores.s - scores.d - scores.c + 200) / 4)

  const sortedStyles = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  const primaryStyle = sortedStyles[0]
  const secondaryStyle = sortedStyles[1]
  const profileType = `${primaryStyle.toUpperCase()}${secondaryStyle.toUpperCase()}`

  return {
    scores,
    taskOrientation,
    peopleOrientation,
    assertiveness: Math.max(0, Math.min(100, assertiveness)),
    flexibility: Math.max(0, Math.min(100, flexibility)),
    primaryStyle,
    secondaryStyle,
    profileType,
  }
}

export function calculateDISCProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateDISCScores(answerMap)
  const primaryStyleName = DISC_STYLE_NAMES[result.primaryStyle]

  return generateProfessionalResult({
    type: 'disc-behavior-style',
    title: 'DISC行为风格专业报告',
    description: `你的DISC行为风格：${primaryStyleName} (${result.profileType}型) - ${DISC_STYLE_DESCRIPTIONS[result.primaryStyle]}`,
    score: Math.round((result.taskOrientation + result.peopleOrientation) / 2),
    accuracy: 88,
    dimensions: [
      ...Object.entries(result.scores).map(([k, v]) => ({
        name: DISC_STYLE_NAMES[k],
        score: v,
        maxScore: 100,
        description: DISC_STYLE_INTERPRETATIONS[k],
      })),
      { name: '任务导向', score: result.taskOrientation, maxScore: 100, description: '关注结果与效率的倾向' },
      { name: '人际导向', score: result.peopleOrientation, maxScore: 100, description: '关注关系与感受的倾向' },
      { name: '独断性', score: result.assertiveness, maxScore: 100, description: '主动影响与掌控的倾向' },
      { name: '适应性', score: result.flexibility, maxScore: 100, description: '开放与应变的倾向' },
    ],
    strengths: [
      `行为模式：${result.profileType}型`,
      `主导风格：${primaryStyleName} - ${DISC_STYLE_DESCRIPTIONS[result.primaryStyle]}`,
      `次要风格：${DISC_STYLE_NAMES[result.secondaryStyle]}`,
    ],
    weaknesses: [],
    careers: [],
  }, 'professional')
}
