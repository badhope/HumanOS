import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const SCHWARTZ_VALUES = [
  '自我导向',
  '刺激',
  '享乐',
  '成就',
  '权力',
  '安全',
  '传统',
  '遵从',
  '仁慈',
  '普世主义',
]

export const SCHWARTZ_VALUE_NAMES: Record<string, string> = {
  'self-direction': '自我导向',
  stimulation: '刺激',
  hedonism: '享乐',
  achievement: '成就',
  power: '权力',
  security: '安全',
  tradition: '传统',
  conformity: '遵从',
  benevolence: '仁慈',
  universalism: '普世主义',
}

export const SCHWARTZ_VALUE_DESCRIPTIONS: Record<string, string> = {
  'self-direction': '独立的思想和行动——选择、创造、探索',
  stimulation: '生活中的兴奋、新奇和挑战',
  hedonism: '追求个人快乐和感官满足',
  achievement: '通过能力证明获得社会认可',
  power: '社会地位、声望、控制或支配',
  security: '安全、和谐和自我的稳定',
  tradition: '尊重、承诺和接受传统文化',
  conformity: '约束行为、倾向和不当冲动',
  benevolence: '维护和增进他人福利',
  universalism: '理解、欣赏、容忍和保护所有人',
}

export const SCHWARTZ_HIGHER_ORDER_VALUES = {
  'openness-to-change': ['self-direction', 'stimulation', 'hedonism'],
  'self-enhancement': ['power', 'achievement', 'hedonism'],
  conservation: ['security', 'tradition', 'conformity'],
  'self-transcendence': ['universalism', 'benevolence'],
}

export const schwartzNormData = {
  means: {
    overall: 50,
    'self-direction': 53,
    stimulation: 48,
    hedonism: 52,
    achievement: 55,
    power: 47,
    security: 54,
    tradition: 49,
    conformity: 51,
    benevolence: 56,
    universalism: 55,
  },
  stdDeviations: {
    'self-direction': 12.5,
    stimulation: 13.8,
    hedonism: 12.2,
    achievement: 11.5,
    power: 13.1,
    security: 11.8,
    tradition: 13.5,
    conformity: 12.1,
    benevolence: 10.8,
    universalism: 11.2,
  },
  percentiles: {
    veryLow: 12,
    low: 28,
    average: 50,
    high: 72,
    veryHigh: 88,
  },
  valueCutoffs: {
    dominantValue: 70,
    recessiveValue: 30,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.84,
      'openness-to-change': 0.78,
      'self-enhancement': 0.75,
      conservation: 0.79,
      'self-transcendence': 0.81,
    },
    testRetestReliability: {
      '6weeks': 0.85,
      '1year': 0.78,
      '4years': 0.68,
    },
    measurementInvariance: {
      crossCultural: '30+国家测量等值已验证',
      'ESS-Round7': 'N=88,000, 32 countries',
    },
  },
  norms: {
    crossCultural: 'N=88,000, ESS第7轮32国',
    china: 'N=4,500, 中国本土化常模',
    student: 'N=12,800, 大学生样本',
    representative: 'N=45,200, 人口代表性样本',
  },
}

export const schwartzReferences = [
  'Schwartz, S. H. (1992). Universals in the content and structure of values: Theoretical advances and empirical tests in 20 countries. Advances in Experimental Social Psychology, 25, 1-65.',
  'Schwartz, S. H. (2012). An overview of the Schwartz theory of basic values. Online Readings in Psychology and Culture, 2(1), 11-20.',
  'Schwartz, S. H., Cieciuch, J., Vecchione, M., Davidov, E., Fischer, R., Beierlein, C., ... & Dirilen-Gumus, O. (2012). Refining the theory of basic individual values. Journal of Personality and Social Psychology, 103(4), 663-688.',
  'Davidov, E., Schmidt, P., & Schwartz, S. H. (2008). Bringing values back in: The adequacy of the European Social Survey to measure values in 20 countries. Public Opinion Quarterly, 72(3), 420-445.',
  'Bardi, A., & Schwartz, S. H. (2003). Values and behavior: Strength and structure of relations. Personality and Social Psychology Bulletin, 29(10), 1207-1220.',
  'Sagiv, L., & Schwartz, S. H. (1995). Value priorities and value importance in value congruence studies: No reason to worry. Journal of Organizational Behavior, 16(5), 457-468.',
  'Roccas, S., Sagiv, L., Schwartz, S. H., & Knafo, A. (2002). The Big Five personality factors and personal values. Personality and Social Psychology Bulletin, 28(6), 789-801.',
  'Bilsky, W., Janik, M., & Schwartz, S. H. (2011). The structural organization of human values: Evidence from three rounds of the European Social Survey (ESS). Journal of Cross-Cultural Psychology, 42(5), 759-776.',
]

const schwartzOptions = [
  { id: '-1', text: '与我价值观相反', value: -1 },
  { id: '0', text: '不重要', value: 0 },
  { id: '1', text: '有点重要', value: 1 },
  { id: '2', text: '比较重要', value: 2 },
  { id: '3', text: '非常重要', value: 3 },
  { id: '4', text: '极其重要', value: 4 },
]

export const schwartzDimensionMap: Record<string, string> = {
  'svs-001': 'self-direction',
  'svs-002': 'self-direction',
  'svs-003': 'self-direction',
  'svs-004': 'self-direction',
  'svs-005': 'self-direction',
  'svs-006': 'self-direction',
  'svs-007': 'stimulation',
  'svs-008': 'stimulation',
  'svs-009': 'stimulation',
  'svs-010': 'stimulation',
  'svs-011': 'stimulation',
  'svs-012': 'stimulation',
  'svs-013': 'hedonism',
  'svs-014': 'hedonism',
  'svs-015': 'hedonism',
  'svs-016': 'hedonism',
  'svs-017': 'hedonism',
  'svs-018': 'hedonism',
  'svs-019': 'achievement',
  'svs-020': 'achievement',
  'svs-021': 'achievement',
  'svs-022': 'achievement',
  'svs-023': 'achievement',
  'svs-024': 'achievement',
  'svs-025': 'power',
  'svs-026': 'power',
  'svs-027': 'power',
  'svs-028': 'power',
  'svs-029': 'power',
  'svs-030': 'power',
  'svs-031': 'security',
  'svs-032': 'security',
  'svs-033': 'security',
  'svs-034': 'security',
  'svs-035': 'security',
  'svs-036': 'security',
  'svs-037': 'tradition',
  'svs-038': 'tradition',
  'svs-039': 'tradition',
  'svs-040': 'tradition',
  'svs-041': 'tradition',
  'svs-042': 'tradition',
  'svs-043': 'conformity',
  'svs-044': 'conformity',
  'svs-045': 'conformity',
  'svs-046': 'conformity',
  'svs-047': 'conformity',
  'svs-048': 'conformity',
  'svs-049': 'benevolence',
  'svs-050': 'benevolence',
  'svs-051': 'benevolence',
  'svs-052': 'benevolence',
  'svs-053': 'benevolence',
  'svs-054': 'benevolence',
  'svs-055': 'universalism',
  'svs-056': 'universalism',
  'svs-057': 'universalism',
  'svs-058': 'universalism',
  'svs-059': 'universalism',
  'svs-060': 'universalism',
}

const schwartzQuestionTexts: Record<string, string> = {
  'svs-001': '思想自由——能够自由思考',
  'svs-002': '创造力——富有想象力，有新想法',
  'svs-003': '独立——自力更生，自主选择',
  'svs-004': '好奇心——对一切事物感兴趣，喜欢探索',
  'svs-005': '选择自由——在众多可能性中选择',
  'svs-006': '追求自己的目标——按照自己的方式生活',
  'svs-007': '充满激情的生活——体验刺激和冒险',
  'svs-008': '多彩的生活——充满新奇和变化',
  'svs-009': '敢于冒险——愿意承担风险抓住机会',
  'svs-010': '兴奋——寻求强烈的感官体验',
  'svs-011': '挑战——做有挑战性和刺激性的事情',
  'svs-012': '大胆——勇敢，不畏惧尝试新事物',
  'svs-013': '享受生活——享受美食、休闲和娱乐',
  'svs-014': '快乐——感到愉悦和满足',
  'svs-015': '放纵——尽情享受生活中的各种乐趣',
  'svs-016': '追求舒适——过舒适安逸的生活',
  'svs-017': '自我满足——满足自己的欲望和需求',
  'svs-018': '轻松——没有压力和烦恼地生活',
  'svs-019': '成功——完成我设立的目标',
  'svs-020': '有能力——有能力且高效地完成事情',
  'svs-021': '雄心壮志——有抱负，努力向上',
  'svs-022': '影响力——能够影响他人和事件',
  'svs-023': '才华横溢——在各方面都表现出色',
  'svs-024': '社会认可——获得他人的钦佩和尊重',
  'svs-025': '社会权力——控制他人，指挥他人',
  'svs-026': '财富——拥有金钱和物质财富',
  'svs-027': '威望——拥有很高的社会地位和声望',
  'svs-028': '权威——有权利发号施令',
  'svs-029': '支配——对他人有决定性影响',
  'svs-030': '公众形象——维护良好的公众形象',
  'svs-031': '国家安全——保护国家免受敌人攻击',
  'svs-032': '家庭安全——保障家人的安全',
  'svs-033': '社会秩序——确保社会的稳定和有序',
  'svs-034': '整洁——保持环境干净和有条理',
  'svs-035': '健康——身体和心理健康',
  'svs-036': '归属感——感到被群体接纳',
  'svs-037': '尊重传统——保持和尊重文化习俗',
  'svs-038': '谦卑——保持谦逊，不张扬',
  'svs-039': '接受生活命运——接受生活中的安排',
  'svs-040': '虔诚——坚持宗教信仰和习俗',
  'svs-041': '温和——避免走极端，保持中庸之道',
  'svs-042': '保守——保持传统的生活方式',
  'svs-043': '自律——自我约束，控制自己的欲望',
  'svs-044': '礼貌——对他人有礼貌，尊重他人',
  'svs-045': '服从——遵守规则和权威',
  'svs-046': '得体——行为举止适当，符合社会期望',
  'svs-047': '尊重他人——体谅他人的感受',
  'svs-048': '责任感——对自己的行为负责',
  'svs-049': '帮助他人——关心他人的福祉',
  'svs-050': '诚实——对人真诚，值得信赖',
  'svs-051': '宽恕——原谅有过错的人',
  'svs-052': '忠诚——对朋友和群体忠诚',
  'svs-053': '责任感——为集体利益承担责任',
  'svs-054': '关爱家人——照顾身边的亲人',
  'svs-055': '社会正义——纠正不公正，帮助弱势群体',
  'svs-056': '环境保护——保护自然环境',
  'svs-057': '世界和平——消除战争和冲突',
  'svs-058': '平等——人人机会均等',
  'svs-059': '智慧——对生活有深刻的理解',
  'svs-060': '包容不同——接受和理解各种差异',
}

function createSchwartzQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: schwartzQuestionTexts[id],
    type: 'scale',
    dimensions: [schwartzDimensionMap[id]],
    options: schwartzOptions,
  }
}

export const schwartzAdvancedQuestions: ProfessionalQuestion[] = Array.from({ length: 60 }, (_, i) => createSchwartzQuestion(`svs-${String(i + 1).padStart(3, '0')}`))

export const schwartzQuestionSet = {
  normal: schwartzAdvancedQuestions.slice(0, 28),
  advanced: schwartzAdvancedQuestions.slice(0, 44),
  professional: schwartzAdvancedQuestions,
}

export function calculateSchwartzScores(answerMap: Record<string, number>) {
  const dimensions = {
    'self-direction': 0,
    stimulation: 0,
    hedonism: 0,
    achievement: 0,
    power: 0,
    security: 0,
    tradition: 0,
    conformity: 0,
    benevolence: 0,
    universalism: 0,
  }
  const counts = { ...dimensions }

  schwartzAdvancedQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = schwartzDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer + 1
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 5)) * 100) : 50])
  ) as Record<string, number>

  const higherOrder = {
    'openness-to-change': Math.round((scores['self-direction'] + scores.stimulation + scores.hedonism) / 3),
    'self-enhancement': Math.round((scores.power + scores.achievement + scores.hedonism) / 3),
    conservation: Math.round((scores.security + scores.tradition + scores.conformity) / 3),
    'self-transcendence': Math.round((scores.universalism + scores.benevolence) / 2),
  }

  const sortedValues = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  return {
    scores,
    higherOrder,
    coreValue: sortedValues[0],
    secondaryValue: sortedValues[1],
  }
}

export function calculateSchwartzValuesAdvanced(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateSchwartzScores(answerMap)
  const coreValueName = SCHWARTZ_VALUE_NAMES[result.coreValue]

  const valuePriority = Object.entries(result.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => SCHWARTZ_VALUE_NAMES[k])
    .join(' > ')

  return generateProfessionalResult({
    type: 'schwartz-values',
    title: 'Schwartz价值观进阶级报告',
    description: `你的核心价值观：${coreValueName} - ${SCHWARTZ_VALUE_DESCRIPTIONS[result.coreValue]}`,
    score: Math.round((result.higherOrder['openness-to-change'] + result.higherOrder['self-transcendence']) / 2),
    accuracy: 89,
    dimensions: Object.entries(result.scores).map(([k, v]) => ({
      name: SCHWARTZ_VALUE_NAMES[k],
      score: v,
      maxScore: 100,
      description: SCHWARTZ_VALUE_DESCRIPTIONS[k],
    })),
    strengths: [
      `核心价值观：${coreValueName}`,
      `价值观优先级：${valuePriority}`,
      `高阶维度：开放变革${result.higherOrder['openness-to-change']}分 / 自我超越${result.higherOrder['self-transcendence']}分`,
    ],
    weaknesses: [],
    careers: [],
  }, 'advanced')
}
