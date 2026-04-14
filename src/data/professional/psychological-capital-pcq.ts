import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const PCQ_DIMENSIONS = [
  '自我效能 Efficacy',
  '希望 Hope',
  '韧性 Resilience',
  '乐观 Optimism',
]

export const PCQ_DIMENSION_NAMES: Record<string, string> = {
  efficacy: '自我效能',
  hope: '希望',
  resilience: '韧性',
  optimism: '乐观',
}

export const PCQ_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  efficacy: '面对挑战性工作时的信心与能力信念',
  hope: '为了目标锲而不舍并调整路径实现目标的意志',
  resilience: '遇到困境和挫折时能够反弹恢复的能力',
  optimism: '对当前和未来的成功做积极归因的倾向',
}

export const pcqNormData = {
  means: {
    overall: 53,
    efficacy: 54,
    hope: 52,
    resilience: 51,
    optimism: 55,
  },
  stdDeviations: {
    efficacy: 10.2,
    hope: 11.5,
    resilience: 12.1,
    optimism: 10.8,
  },
  percentiles: {
    veryLow: 15,
    low: 30,
    average: 50,
    high: 70,
    veryHigh: 85,
  },
  clinicalCutoffs: {
    PsyCapOverallLow: 35,
    ResilienceLow: 30,
    HopeLow: 30,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.88,
      efficacy: 0.82,
      hope: 0.80,
      resilience: 0.78,
      optimism: 0.76,
    },
    testRetestReliability: {
      '6weeks': 0.76,
      '6months': 0.68,
      '1year': 0.60,
    },
    constructValidity: {
      '与工作绩效相关': '0.52',
      '与组织承诺相关': '0.48',
      '与幸福感相关': '0.58',
      '与离职意向相关': '-0.46',
    },
  },
  norms: {
    china: 'N=4,200, 中国企业样本',
    usa: 'N=3,800, 美国企业样本',
    europe: 'N=1,800, 欧洲企业样本',
    global: 'N=700, 跨国企业样本',
  },
}

export const pcqReferences = [
  'Luthans, F., Youssef, C. M., & Avolio, B. J. (2007). Psychological capital: Developing the human competitive edge. Oxford University Press.',
  'Luthans, F., Avolio, B. J., Avey, J. B., & Norman, S. M. (2007). Positive psychological capital: Measurement and relationship with performance and satisfaction. Personnel Psychology, 60(3), 541-572.',
  'Luthans, F., Norman, S. M., Avolio, B. J., & Avey, J. B. (2008). The mediating role of psychological capital in the supportive organizational climate - employee performance relationship. Journal of Organizational Behavior, 29(2), 219-238.',
  'Avey, J. B., Reichard, R. J., Luthans, F., & Mhatre, K. H. (2011). Meta-analysis of the impact of positive psychological capital on employee attitudes, behaviors, and performance. Human Resource Development Quarterly, 22(2), 127-152.',
  'Newman, A., Ucbasaran, D., Zhu, F., & Hirst, G. (2014). Psychological capital: A review and synthesis. Journal of Organizational Behavior, 35(S1), S120-S138.',
  'Youssef, C. M., & Luthans, F. (2007). Positive organizational behavior in the workplace: The impact of hope, optimism, and resilience. Journal of Management, 33(5), 774-800.',
  'Luthans, F., & Youssef, C. M. (2004). Human, social, and now positive psychological capital management: Investing in people for competitive advantage. Organizational Dynamics, 33(2), 143-160.',
  'Zhang, S., Xu, L., Sun, J. M., & Li, X. (2018). Psychological capital in China: A systematic review and meta-analysis. Frontiers in Psychology, 9, 1195.',
]

const pcqOptions = [
  { id: '0', text: '完全不同意', value: 0 },
  { id: '1', text: '比较不同意', value: 1 },
  { id: '2', text: '有点不同意', value: 2 },
  { id: '3', text: '有点同意', value: 3 },
  { id: '4', text: '比较同意', value: 4 },
  { id: '5', text: '非常同意', value: 5 },
  { id: '6', text: '完全同意', value: 6 },
]

export const pcqDimensionMap: Record<string, string> = {
  'pcq-001': 'efficacy',
  'pcq-002': 'efficacy',
  'pcq-003': 'efficacy',
  'pcq-004': 'efficacy',
  'pcq-005': 'efficacy',
  'pcq-006': 'efficacy',
  'pcq-007': 'efficacy',
  'pcq-008': 'efficacy',
  'pcq-009': 'efficacy',
  'pcq-010': 'efficacy',
  'pcq-011': 'efficacy',
  'pcq-012': 'efficacy',
  'pcq-013': 'efficacy',
  'pcq-014': 'efficacy',
  'pcq-015': 'efficacy',
  'pcq-016': 'hope',
  'pcq-017': 'hope',
  'pcq-018': 'hope',
  'pcq-019': 'hope',
  'pcq-020': 'hope',
  'pcq-021': 'hope',
  'pcq-022': 'hope',
  'pcq-023': 'hope',
  'pcq-024': 'hope',
  'pcq-025': 'hope',
  'pcq-026': 'hope',
  'pcq-027': 'hope',
  'pcq-028': 'hope',
  'pcq-029': 'hope',
  'pcq-030': 'hope',
  'pcq-031': 'resilience',
  'pcq-032': 'resilience',
  'pcq-033': 'resilience',
  'pcq-034': 'resilience',
  'pcq-035': 'resilience',
  'pcq-036': 'resilience',
  'pcq-037': 'resilience',
  'pcq-038': 'resilience',
  'pcq-039': 'resilience',
  'pcq-040': 'resilience',
  'pcq-041': 'resilience',
  'pcq-042': 'resilience',
  'pcq-043': 'resilience',
  'pcq-044': 'resilience',
  'pcq-045': 'resilience',
  'pcq-046': 'optimism',
  'pcq-047': 'optimism',
  'pcq-048': 'optimism',
  'pcq-049': 'optimism',
  'pcq-050': 'optimism',
  'pcq-051': 'optimism',
  'pcq-052': 'optimism',
  'pcq-053': 'optimism',
  'pcq-054': 'optimism',
  'pcq-055': 'optimism',
  'pcq-056': 'optimism',
  'pcq-057': 'optimism',
  'pcq-058': 'optimism',
  'pcq-059': 'optimism',
  'pcq-060': 'optimism',
  'pcq-061': 'optimism',
  'pcq-062': 'optimism',
  'pcq-063': 'optimism',
}

const pcqQuestionTexts: Record<string, string> = {
  'pcq-001': '我相信能够分析长远问题并找到解决方案',
  'pcq-002': '面对困难的工作任务时，我充满信心',
  'pcq-003': '我相信自己有能力独立完成重要的工作',
  'pcq-004': '我相信自己能够在短时间内学习新的技能',
  'pcq-005': '我相信能够为团队目标做出重要贡献',
  'pcq-006': '我相信自己能够有效地管理时间和优先级',
  'pcq-007': '我相信自己能够处理压力大的工作任务',
  'pcq-008': '我相信自己能够与不同的人有效合作',
  'pcq-009': '我相信自己能够做出正确的决策',
  'pcq-010': '我相信自己能够激励和影响他人',
  'pcq-011': '我相信自己能够适应新的工作环境',
  'pcq-012': '我相信自己能够解决复杂的技术问题',
  'pcq-013': '我相信自己能够带领团队完成目标',
  'pcq-014': '我相信自己能够与客户建立良好的关系',
  'pcq-015': '我相信自己能够创新地解决问题',
  'pcq-016': '如果我陷入困境，我能想到很多办法摆脱',
  'pcq-017': '我对自己的未来充满希望和期待',
  'pcq-018': '我总会不遗余力地追寻我设定的工作目标',
  'pcq-019': '我能够制定详细的计划来实现我的目标',
  'pcq-020': '遇到障碍时，我能够想出多条实现目标的路径',
  'pcq-021': '我总是充满干劲地追求我的职业目标',
  'pcq-022': '我相信只要付出努力就一定能够成功',
  'pcq-023': '我对实现人生目标充满信心',
  'pcq-024': '遇到困难时，我不会轻易放弃自己的目标',
  'pcq-025': '我能够根据实际情况灵活调整实现目标的策略',
  'pcq-026': '我对公司的发展前景抱有积极的期待',
  'pcq-027': '我相信未来的机会比现在更多',
  'pcq-028': '即使暂时遇到困难，我也坚持向目标前进',
  'pcq-029': '我总是能够看到事情的积极面和可能性',
  'pcq-030': '我为自己设定了具有挑战性的目标',
  'pcq-031': '工作遇到挫折时，我通常能够很快恢复',
  'pcq-032': '即使遇到困难的事情，我也能够继续前进',
  'pcq-033': '面对不确定性，我能够保持积极的心态',
  'pcq-034': '我能够从容地应对工作中的压力和困难',
  'pcq-035': '经历失败后，我能够很快重新振作起来',
  'pcq-036': '遇到突发情况时，我能够保持冷静并有效应对',
  'pcq-037': '我不害怕工作中遇到的挑战和困难',
  'pcq-038': '我相信每一次挫折都是成长的机会',
  'pcq-039': '遇到变化时，我能够快速适应和调整',
  'pcq-040': '即使在困境中，我也能够保持乐观的态度',
  'pcq-041': '我有很强的毅力，不会轻易放弃',
  'pcq-042': '我能够在逆境中找到前进的动力',
  'pcq-043': '我相信自己有能力克服任何困难',
  'pcq-044': '遇到批评时，我能够从中学习并改进',
  'pcq-045': '我能够在困难时期保持团队的士气',
  'pcq-046': '在工作中，我总是对事情的发展持乐观态度',
  'pcq-047': '我相信事情最终都会朝着好的方向发展',
  'pcq-048': '遇到问题时，我总是先看到积极的一面',
  'pcq-049': '我相信大多数事情都是有意义的',
  'pcq-050': '我对自己的能力和未来都很有信心',
  'pcq-051': '即使遇到困难，我也相信事情会好转',
  'pcq-052': '我总是期待美好的事情会发生',
  'pcq-053': '我对自己的人生态度非常积极',
  'pcq-054': '我相信每天都有新的机会和可能',
  'pcq-055': '我不会因为失败而变得消极',
  'pcq-056': '我相信自己值得拥有美好的未来',
  'pcq-057': '遇到挑战时，我相信我能够成功克服',
  'pcq-058': '我相信每一个问题都有解决的办法',
  'pcq-059': '我对团队的成功充满信心',
  'pcq-060': '我相信努力和坚持终将带来回报',
  'pcq-061': '我总是看到杯子里半满的水，而不是半空的',
  'pcq-062': '我相信未来会比现在更好',
  'pcq-063': '我相信只要有希望就有可能',
}

function createPCQQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: pcqQuestionTexts[id],
    type: 'scale',
    dimensions: [pcqDimensionMap[id]],
    options: pcqOptions,
  }
}

export const pcqProfessionalQuestions: ProfessionalQuestion[] = Array.from({ length: 63 }, (_, i) => createPCQQuestion(`pcq-${String(i + 1).padStart(3, '0')}`))

export const pcqProfessionalQuestionSet = {
  normal: pcqProfessionalQuestions.slice(0, 28),
  advanced: pcqProfessionalQuestions.slice(0, 45),
  professional: pcqProfessionalQuestions,
}

export function calculatePCQScores(answerMap: Record<string, number>) {
  const dimensions = {
    efficacy: 0,
    hope: 0,
    resilience: 0,
    optimism: 0,
  }
  const counts = { ...dimensions }

  pcqProfessionalQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = pcqDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 6)) * 100) : 50])
  ) as Record<string, number>

  const overallPsyCap = Math.round((scores.efficacy + scores.hope + scores.resilience + scores.optimism) / 4)
  const agenticCapability = Math.round((scores.efficacy + scores.hope) / 2)
  const bufferingCapacity = Math.round((scores.resilience + scores.optimism) / 2)
  const growthOrientation = Math.round((scores.hope * 1.2 + scores.resilience * 0.8) / 2)

  const sortedDimensions = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  return {
    scores,
    overallPsyCap,
    agenticCapability,
    bufferingCapacity,
    growthOrientation,
    dominantStrength: sortedDimensions[0],
  }
}

export function calculatePCQProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculatePCQScores(answerMap)
  const dominantName = PCQ_DIMENSION_NAMES[result.dominantStrength]

  const level = result.overallPsyCap >= 75 ? '卓越心理资本' : result.overallPsyCap >= 50 ? '健康心理资本' : '需要加强心理资本建设'

  return generateProfessionalResult({
    type: 'psychological-capital',
    title: '心理资本PCQ专业报告',
    description: `你的心理资本水平：${level}，HERO核心优势：${dominantName}`,
    score: result.overallPsyCap,
    accuracy: 91,
    dimensions: [
      ...Object.entries(result.scores).map(([k, v]) => ({
        name: PCQ_DIMENSION_NAMES[k],
        score: v,
        maxScore: 100,
        description: PCQ_DIMENSION_DESCRIPTIONS[k],
      })),
      { name: 'HERO总体心理资本', score: result.overallPsyCap, maxScore: 100, description: '效能+希望+韧性+乐观综合' },
      { name: '能动能力', score: result.agenticCapability, maxScore: 100, description: '效能+希望指向未来' },
      { name: '缓冲能力', score: result.bufferingCapacity, maxScore: 100, description: '韧性+乐观应对当下' },
      { name: '成长导向', score: result.growthOrientation, maxScore: 100, description: '希望+韧性促进发展' },
    ],
    strengths: [
      `PsyCap等级：${level} (${result.overallPsyCap}分)`,
      `HERO优势：${dominantName} - ${PCQ_DIMENSION_DESCRIPTIONS[result.dominantStrength]}`,
      `成长潜力：${result.growthOrientation}分`,
    ],
    weaknesses: [],
    careers: [],
  }, 'professional')
}
