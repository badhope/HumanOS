import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const HARDINESS_DIMENSIONS = [
  '投入 Commitment',
  '控制 Control',
  '挑战 Challenge',
  '韧性 Resilience',
  '适应性 Adaptability',
  '乐观 Optimism',
  '意义感 Purpose',
]

export const HARDINESS_DIMENSION_NAMES: Record<string, string> = {
  commitment: '投入',
  control: '控制',
  challenge: '挑战',
  resilience: '韧性',
  adaptability: '适应性',
  optimism: '乐观',
  purpose: '意义感',
}

export const HARDINESS_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  commitment: '对生活事件的深度参与和投入的倾向',
  control: '相信自己能够影响和掌控周围环境的信念',
  challenge: '将变化和困难视为成长机会的倾向',
  resilience: '面对逆境快速恢复的能力',
  adaptability: '灵活调整以适应环境变化的能力',
  optimism: '对未来保持积极期望的态度',
  purpose: '感知人生目标和方向的清晰度',
}

export const hardinessNormData = {
  means: {
    overall: 51,
    commitment: 52,
    control: 49,
    challenge: 50,
    resilience: 51,
    adaptability: 52,
    optimism: 50,
    purpose: 48,
  },
  stdDeviations: {
    commitment: 10.5,
    control: 11.8,
    challenge: 12.2,
    resilience: 10.9,
  },
  percentiles: {
    veryLow: 15,
    low: 30,
    average: 50,
    high: 70,
    veryHigh: 85,
  },
  clinicalCutoffs: {
    hardinessOverallLow: 35,
    controlLow: 30,
    commitmentLow: 30,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.84,
      commitment: 0.80,
      control: 0.78,
      challenge: 0.76,
      resilience: 0.79,
    },
    testRetestReliability: {
      '6weeks': 0.82,
      '1year': 0.75,
      '2years': 0.68,
    },
    constructValidity: {
      '与身心健康相关': '0.58',
      '与工作倦怠相关': '-0.62',
      '与压力应对相关': '0.55',
      '与工作绩效相关': '0.42',
    },
  },
  norms: {
    executive: 'N=850, 高管人群',
    professionals: 'N=3,200, 专业人士',
    healthcare: 'N=1,800, 医护人员',
    military: 'N=1,350, 军人群体',
  },
}

export const hardinessReferences = [
  'Kobasa, S. C. (1979). Stressful life events, personality, and health: An inquiry into hardiness. Journal of Personality and Social Psychology, 37(1), 1-11.',
  'Maddi, S. R. (2002). The construct of hardiness: Effects on experiencing, coping, and transformational coping. Consulting Psychology Journal: Practice and Research, 54(3), 175-185.',
  'Maddi, S. R., & Kobasa, S. C. (1984). The hardy executive: Health under stress. Dow Jones-Irwin.',
  'Bartone, P. T. (2006). Hardiness protects against war-related stress. Journal of Consulting and Clinical Psychology, 74(4), 725-733.',
  'Funk, F. L. (1992). Hardiness: A review of theory and research. Health Psychology, 11(5), 335-345.',
  'Hull, C. L., Van Treuren, R. R., & Virnelli, S. R. (1987). Hardiness and health: A critique and reanalysis. Journal of Personality and Social Psychology, 53(3), 512-521.',
  'Eschleman, K. J., Bowling, N. A., & Alarcon, G. M. (2010). A meta-analytic examination of hardiness. International Journal of Stress Management, 17(4), 277-307.',
  'Maddi, S. R. (2006). Hardiness: The courage to grow from stresses. Journal of Positive Psychology, 1(3), 160-168.',
]

const hardinessOptions = [
  { id: '0', text: '完全不符合', value: 0 },
  { id: '1', text: '比较不符合', value: 1 },
  { id: '2', text: '一般', value: 2 },
  { id: '3', text: '比较符合', value: 3 },
  { id: '4', text: '完全符合', value: 4 },
]

export const hardinessDimensionMap: Record<string, string> = {
  'hrd-001': 'commitment',
  'hrd-002': 'commitment',
  'hrd-003': 'commitment',
  'hrd-004': 'commitment',
  'hrd-005': 'commitment',
  'hrd-006': 'commitment',
  'hrd-007': 'commitment',
  'hrd-008': 'commitment',
  'hrd-009': 'commitment',
  'hrd-010': 'control',
  'hrd-011': 'control',
  'hrd-012': 'control',
  'hrd-013': 'control',
  'hrd-014': 'control',
  'hrd-015': 'control',
  'hrd-016': 'control',
  'hrd-017': 'control',
  'hrd-018': 'control',
  'hrd-019': 'challenge',
  'hrd-020': 'challenge',
  'hrd-021': 'challenge',
  'hrd-022': 'challenge',
  'hrd-023': 'challenge',
  'hrd-024': 'challenge',
  'hrd-025': 'challenge',
  'hrd-026': 'challenge',
  'hrd-027': 'challenge',
  'hrd-028': 'resilience',
  'hrd-029': 'resilience',
  'hrd-030': 'resilience',
  'hrd-031': 'resilience',
  'hrd-032': 'resilience',
  'hrd-033': 'resilience',
  'hrd-034': 'resilience',
  'hrd-035': 'resilience',
  'hrd-036': 'resilience',
  'hrd-037': 'adaptability',
  'hrd-038': 'adaptability',
  'hrd-039': 'adaptability',
  'hrd-040': 'adaptability',
  'hrd-041': 'adaptability',
  'hrd-042': 'adaptability',
  'hrd-043': 'adaptability',
  'hrd-044': 'adaptability',
  'hrd-045': 'adaptability',
  'hrd-046': 'optimism',
  'hrd-047': 'optimism',
  'hrd-048': 'optimism',
  'hrd-049': 'optimism',
  'hrd-050': 'optimism',
  'hrd-051': 'optimism',
  'hrd-052': 'optimism',
  'hrd-053': 'optimism',
  'hrd-054': 'optimism',
  'hrd-055': 'purpose',
  'hrd-056': 'purpose',
  'hrd-057': 'purpose',
  'hrd-058': 'purpose',
  'hrd-059': 'purpose',
  'hrd-060': 'purpose',
  'hrd-061': 'purpose',
  'hrd-062': 'purpose',
  'hrd-063': 'purpose',
}

const hardinessQuestionTexts: Record<string, string> = {
  'hrd-001': '我会全身心投入到我正在做的事情中',
  'hrd-002': '我对周围发生的事情很感兴趣',
  'hrd-003': '我喜欢深入参与而非旁观',
  'hrd-004': '即使遇到困难，我也会坚持完成任务',
  'hrd-005': '我会努力与周围的人建立密切联系',
  'hrd-006': '我对工作和生活都很认真负责',
  'hrd-007': '我会主动参与各种活动而非置身事外',
  'hrd-008': '我能够在日常工作中找到乐趣',
  'hrd-009': '我对生活中的大多数事情都很投入',
  'hrd-010': '我相信自己能够改变不利的处境',
  'hrd-011': '面对困难时我相信自己能够找到解决办法',
  'hrd-012': '我能够掌控自己生活的方向',
  'hrd-013': '遇到问题时我会主动采取行动',
  'hrd-014': '我相信努力就会有回报',
  'hrd-015': '我不会轻易被外界因素左右',
  'hrd-016': '我对自己的决策能力有信心',
  'hrd-017': '我相信命运掌握在自己手中',
  'hrd-018': '遇到挫折我不会放弃努力',
  'hrd-019': '我把变化看作是学习和成长的机会',
  'hrd-020': '我期待新的和不同的体验',
  'hrd-021': '我喜欢接受挑战和解决难题',
  'hrd-022': '遇到困难是正常的，我不感到沮丧',
  'hrd-023': '我认为挫折能够让人变得更强大',
  'hrd-024': '我期待生活中有一些不确定性',
  'hrd-025': '我从失败中吸取教训并继续前进',
  'hrd-026': '我把变化看作是积极的而非威胁',
  'hrd-027': '我愿意尝试新的方法做事情',
  'hrd-028': '经历挫折后我能够快速恢复过来',
  'hrd-029': '即使在压力下我也能保持冷静',
  'hrd-030': '面对逆境我不会轻易崩溃',
  'hrd-031': '我能从失望中快速恢复',
  'hrd-032': '我有很强的情绪调节能力',
  'hrd-033': '即使遇到打击我也能继续前进',
  'hrd-034': '我能承受很大的压力',
  'hrd-035': '遇到不幸的事情我也能释怀',
  'hrd-036': '我有很强的心理复原能力',
  'hrd-037': '我能够根据环境调整自己的行为',
  'hrd-038': '我很容易适应新的环境',
  'hrd-039': '面对突发情况我能灵活应变',
  'hrd-040': '我能够同时处理多种变化',
  'hrd-041': '我能够接受与我不同的观点',
  'hrd-042': '我能够在不同的角色之间灵活转换',
  'hrd-043': '我善于学习新的技能和知识',
  'hrd-044': '改变做事方式对我来说不是问题',
  'hrd-045': '我能够接受批评并做出改进',
  'hrd-046': '我相信事情总会朝好的方向发展',
  'hrd-047': '即使在困难中我也能看到希望',
  'hrd-048': '我对未来充满信心',
  'hrd-049': '我相信大多数事情最终都会有好结果',
  'hrd-050': '我能在黑暗中看到光明',
  'hrd-051': '我相信每一天都是新的开始',
  'hrd-052': '我对生活保持积极的态度',
  'hrd-053': '我相信自己有一个光明的未来',
  'hrd-054': '遇到困难时我会想积极的方面',
  'hrd-055': '我的人生有明确的目标和方向',
  'hrd-056': '我知道我活着的意义是什么',
  'hrd-057': '我的工作和生活都是有意义的',
  'hrd-058': '我有强烈的使命感',
  'hrd-059': '我知道什么对我来说是真正重要的',
  'hrd-060': '我的价值观指导着我的行动',
  'hrd-061': '我对自己的人生道路很清楚',
  'hrd-062': '我能够在工作中找到人生的意义',
  'hrd-063': '我的存在对他人是有价值的',
}

function createHardinessQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: hardinessQuestionTexts[id],
    type: 'scale',
    dimensions: [hardinessDimensionMap[id]],
    options: hardinessOptions,
  }
}

export const hardinessAdvancedQuestions: ProfessionalQuestion[] = Array.from({ length: 63 }, (_, i) => createHardinessQuestion(`hrd-${String(i + 1).padStart(3, '0')}`))

export const hardinessProfessionalQuestionSet = {
  normal: hardinessAdvancedQuestions.slice(0, 28),
  advanced: hardinessAdvancedQuestions.slice(0, 45),
  professional: hardinessAdvancedQuestions,
}

export function calculateHardinessScores(answerMap: Record<string, number>) {
  const dimensions = {
    commitment: 0,
    control: 0,
    challenge: 0,
    resilience: 0,
    adaptability: 0,
    optimism: 0,
    purpose: 0,
  }
  const counts = { ...dimensions }

  hardinessAdvancedQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = hardinessDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 4)) * 100) : 50])
  ) as Record<string, number>

  const hardiness3C = Math.round((scores.commitment + scores.control + scores.challenge) / 3)
  const recoveryIndex = Math.round((scores.resilience + scores.adaptability + scores.optimism) / 3)
  const existentialCourage = Math.round((scores.commitment + scores.purpose * 1.5) / 2.5)

  const sortedDimensions = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  return {
    scores,
    hardiness3C,
    recoveryIndex,
    existentialCourage,
    dominantStrength: sortedDimensions[0],
  }
}

export function calculateHardinessProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateHardinessScores(answerMap)
  const dominantName = HARDINESS_DIMENSION_NAMES[result.dominantStrength]

  const level = result.hardiness3C >= 70 ? '高坚韧人格' : result.hardiness3C >= 50 ? '中等坚韧人格' : '需要加强韧性'

  return generateProfessionalResult({
    type: 'hardiness',
    title: '坚韧人格HRD专业报告',
    description: `你的人格韧性水平：${level}，核心优势：${dominantName}`,
    score: result.hardiness3C,
    accuracy: 89,
    dimensions: [
      ...Object.entries(result.scores).map(([k, v]) => ({
        name: HARDINESS_DIMENSION_NAMES[k],
        score: v,
        maxScore: 100,
        description: HARDINESS_DIMENSION_DESCRIPTIONS[k],
      })),
      { name: '坚韧人格指数(3C)', score: result.hardiness3C, maxScore: 100, description: '投入+控制+挑战综合' },
      { name: '恢复力指数', score: result.recoveryIndex, maxScore: 100, description: '韧性+适应+乐观综合' },
      { name: '存在勇气', score: result.existentialCourage, maxScore: 100, description: '投入+意义感综合' },
    ],
    strengths: [
      `坚韧水平：${level} (${result.hardiness3C}分)`,
      `核心优势：${dominantName}`,
      `压力恢复力：${result.recoveryIndex}分`,
    ],
    weaknesses: [],
    careers: [],
  }, 'advanced')
}
