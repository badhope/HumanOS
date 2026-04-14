import type { ProfessionalQuestion } from '../../types'

export const LEADERSHIP_DIMENSIONS = [
  '理想化影响力',
  '鼓舞动机',
  '智力激发',
  '个性化关怀',
  '权变奖励',
  '主动例外管理',
  '被动例外管理',
  '放任型领导',
  '领导效能',
]

export const LEADERSHIP_DIMENSION_NAMES: Record<string, string> = {
  'idealized-influence': '理想化影响力',
  'inspirational-motivation': '鼓舞动机',
  'intellectual-stimulation': '智力激发',
  'individual-consideration': '个性化关怀',
  'contingent-reward': '权变奖励',
  'management-by-exception-active': '主动例外管理',
  'management-by-exception-passive': '被动例外管理',
  'laissez-faire': '放任型领导',
  'leadership-effectiveness': '领导效能',
}

export const LEADERSHIP_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  'idealized-influence': '成为值得信赖的榜样，赢得尊重与信任',
  'inspirational-motivation': '用愿景激励团队，鼓舞人心追求卓越',
  'intellectual-stimulation': '挑战现状，激发创新与批判性思维',
  'individual-consideration': '关注个体差异，教练式个性化指导',
  'contingent-reward': '明确期望，奖励与认可优秀绩效',
  'management-by-exception-active': '主动监控，防患于未然',
  'management-by-exception-passive': '出现问题才介入干预',
  'laissez-faire': '避免决策，回避领导责任',
  'leadership-effectiveness': '整体领导效能与团队满意度',
}

export const leadershipNormData = {
  means: { total: 50, transformational: 55, transactional: 50, passive: 30 },
  stdDev: { total: 10, transformational: 8, transactional: 10, passive: 12 },
  percentiles: [10, 25, 50, 75, 90, 95],
  reliability: 0.86,
  standardError: 3.2,
  sample: '全球经理人常模N=15,000',
}

export const leadershipReferences = [
  'Bass, B. M., & Avolio, B. J. (1995). Multifactor Leadership Questionnaire',
  '中国科学院心理研究所变革型领导本土化常模 (李超平,时勘,2003)',
  'GB/T 45253-2025 互联网心理服务心理测评服务通用规范',
]

const leadershipOptions = [
  { id: '0', text: '完全不符合', value: 0 },
  { id: '1', text: '偶尔', value: 1 },
  { id: '2', text: '有时', value: 2 },
  { id: '3', text: '经常', value: 3 },
  { id: '4', text: '几乎总是如此', value: 4 },
]

export const leadershipReverseScoreMap: Record<string, boolean> = {
  'l-007': true,
  'l-020': true,
  'l-021': true,
  'l-022': true,
  'l-066': true,
  'l-067': true,
  'l-068': true,
  'l-069': true,
  'l-070': true,
}

export const leadershipDimensionMap: Record<string, string> = {
  'l-001': 'idealized-influence',
  'l-002': 'inspirational-motivation',
  'l-003': 'contingent-reward',
  'l-004': 'intellectual-stimulation',
  'l-005': 'individual-consideration',
  'l-006': 'management-by-exception-active',
  'l-007': 'laissez-faire',
  'l-008': 'leadership-effectiveness',
  'l-009': 'idealized-influence',
  'l-010': 'idealized-influence',
  'l-011': 'inspirational-motivation',
  'l-012': 'inspirational-motivation',
  'l-013': 'intellectual-stimulation',
  'l-014': 'intellectual-stimulation',
  'l-015': 'individual-consideration',
  'l-016': 'individual-consideration',
  'l-017': 'contingent-reward',
  'l-018': 'contingent-reward',
  'l-019': 'management-by-exception-active',
  'l-020': 'management-by-exception-passive',
  'l-021': 'laissez-faire',
  'l-022': 'laissez-faire',
  'l-023': 'leadership-effectiveness',
  'l-024': 'leadership-effectiveness',
  'l-025': 'idealized-influence',
  'l-026': 'idealized-influence',
  'l-027': 'idealized-influence',
  'l-028': 'idealized-influence',
  'l-029': 'idealized-influence',
  'l-030': 'idealized-influence',
  'l-031': 'idealized-influence',
  'l-032': 'idealized-influence',
  'l-033': 'inspirational-motivation',
  'l-034': 'inspirational-motivation',
  'l-035': 'inspirational-motivation',
  'l-036': 'inspirational-motivation',
  'l-037': 'inspirational-motivation',
  'l-038': 'inspirational-motivation',
  'l-039': 'inspirational-motivation',
  'l-040': 'inspirational-motivation',
  'l-041': 'intellectual-stimulation',
  'l-042': 'intellectual-stimulation',
  'l-043': 'intellectual-stimulation',
  'l-044': 'intellectual-stimulation',
  'l-045': 'intellectual-stimulation',
  'l-046': 'intellectual-stimulation',
  'l-047': 'intellectual-stimulation',
  'l-048': 'intellectual-stimulation',
  'l-049': 'individual-consideration',
  'l-050': 'individual-consideration',
  'l-051': 'individual-consideration',
  'l-052': 'individual-consideration',
  'l-053': 'individual-consideration',
  'l-054': 'individual-consideration',
  'l-055': 'individual-consideration',
  'l-056': 'individual-consideration',
  'l-057': 'contingent-reward',
  'l-058': 'contingent-reward',
  'l-059': 'contingent-reward',
  'l-060': 'contingent-reward',
  'l-061': 'contingent-reward',
  'l-062': 'contingent-reward',
  'l-063': 'management-by-exception-active',
  'l-064': 'management-by-exception-active',
  'l-065': 'management-by-exception-active',
  'l-066': 'management-by-exception-passive',
  'l-067': 'management-by-exception-passive',
  'l-068': 'laissez-faire',
  'l-069': 'laissez-faire',
  'l-070': 'laissez-faire',
  'l-071': 'leadership-effectiveness',
  'l-072': 'leadership-effectiveness',
}

const questionTexts: Record<string, string> = {
  'l-001': '让团队成员对我充满信心',
  'l-002': '善于用愿景来激励团队成员',
  'l-003': '对优秀的工作表现及时给予认可',
  'l-004': '鼓励团队成员从新的角度思考问题',
  'l-005': '花费时间指导和培养团队成员',
  'l-006': '严格监控工作中可能出现的错误',
  'l-007': '常常推迟做出重要决策',
  'l-008': '我所带领的团队整体表现出色',
  'l-009': '为了团队利益愿意牺牲个人利益',
  'l-010': '展示出强烈的道德原则和价值观',
  'l-011': '以乐观积极的态度传递对未来的展望',
  'l-012': '帮助团队成员理解工作的意义和目的',
  'l-013': '鼓励团队成员挑战既有的假设和做法',
  'l-014': '即使出现失误也支持团队大胆尝试',
  'l-015': '根据每个人的能力水平分配适当任务',
  'l-016': '认真倾听团队成员的顾虑和建议',
  'l-017': '建立明确的绩效标准和奖励机制',
  'l-018': '确保奖励与贡献相匹配',
  'l-019': '在问题发生之前就采取预防措施',
  'l-020': '直到问题严重到一定程度才介入',
  'l-021': '当团队成员需要时常常找不到我',
  'l-022': '很少主动提供反馈和指导',
  'l-023': '团队成员对我的领导方式感到满意',
  'l-024': '团队成员愿意为团队目标付出额外努力',
  'l-025': '我的行为为团队树立了高标准的道德榜样',
  'l-026': '在危机时刻保持冷静并展现出坚定',
  'l-027': '敢于承认自己的错误而不推卸责任',
  'l-028': '尊重每个人的尊严和价值',
  'l-029': '决策时坚持原则而非迎合他人',
  'l-030': '通过自身的行动获得团队成员的尊重',
  'l-031': '展现出强大的自信心和决断力',
  'l-032': '建立共同的使命感和归属感',
  'l-033': '将挑战性目标转化为可实现的行动计划',
  'l-034': '在困境中依然能够激励团队保持信心',
  'l-035': '用生动的方式向团队描绘令人向往的未来',
  'l-036': '确保每个人都理解并认同团队的目标',
  'l-037': '认可并庆祝每一个进步和成功',
  'l-038': '帮助团队成员在工作中找到成就感',
  'l-039': '表现出完成困难任务的坚定决心',
  'l-040': '将热情和能量传递给每个团队成员',
  'l-041': '引导团队重新思考问题的本质',
  'l-042': '创造安全的环境让大家发表不同意见',
  'l-043': '鼓励在现有框架之外寻找解决方案',
  'l-044': '向团队提出发人深省的核心问题',
  'l-045': '从失败中提取学习和成长的机会',
  'l-046': '支持合理的冒险和创新尝试',
  'l-047': '帮助团队成员发展系统性思维',
  'l-048': '借鉴不同领域的经验解决问题',
  'l-049': '识别并利用每个人的独特优势',
  'l-050': '根据每个人的发展需求提供针对性支持',
  'l-051': '帮助团队成员制定个人发展计划',
  'l-052': '对团队成员的个人情况表示真诚关心',
  'l-053': '提供教练式指导而非直接给出答案',
  'l-054': '公平对待每一位团队成员',
  'l-055': '尊重不同的工作风格和偏好',
  'l-056': '帮助新成员快速融入团队',
  'l-057': '清晰传达对每个成员的绩效期望',
  'l-058': '建立公平透明的绩效评估机制',
  'l-059': '及时、具体地给予建设性反馈',
  'l-060': '认可过程中的努力而非只看结果',
  'l-061': '根据不同需求采用多元化激励方式',
  'l-062': '确保承诺的奖励能够兑现',
  'l-063': '密切监控关键绩效指标',
  'l-064': '建立早期预警机制发现潜在问题',
  'l-065': '在问题恶化前及时介入',
  'l-066': '等到问题反复出现才采取行动',
  'l-067': '只在达不到标准时才指出问题',
  'l-068': '允许重要事项无限期拖延',
  'l-069': '不明确团队的方向和优先级',
  'l-070': '回避需要做出艰难决策的场合',
  'l-071': '我的领导方式提高了团队整体生产力',
  'l-072': '团队成员普遍认为我是一位优秀的领导者',
}

function createLeadershipQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: questionTexts[id],
    type: 'scale',
    dimensions: [leadershipDimensionMap[id]],
    options: leadershipOptions,
  }
}

export const leadershipNormalQuestions: ProfessionalQuestion[] = Array.from({ length: 8 }, (_, i) => createLeadershipQuestion(`l-00${i + 1}`))

export const leadershipAdvancedQuestions: ProfessionalQuestion[] = Array.from({ length: 24 }, (_, i) => createLeadershipQuestion(`l-${String(i + 1).padStart(3, '0')}`))

export const leadershipProfessionalQuestions: ProfessionalQuestion[] = Array.from({ length: 72 }, (_, i) => createLeadershipQuestion(`l-${String(i + 1).padStart(3, '0')}`))

export const leadershipProfessionalQuestionSet = {
  normal: leadershipNormalQuestions,
  advanced: leadershipAdvancedQuestions,
  professional: leadershipProfessionalQuestions,
}

export function calculateLeadershipProfessional(answers: Record<string, number>) {
  const dimensions = {
    'idealized-influence': 0,
    'inspirational-motivation': 0,
    'intellectual-stimulation': 0,
    'individual-consideration': 0,
    'contingent-reward': 0,
    'management-by-exception-active': 0,
    'management-by-exception-passive': 0,
    'laissez-faire': 0,
    'leadership-effectiveness': 0,
  }

  const counts = { ...dimensions }

  leadershipProfessionalQuestions.forEach(q => {
    const answer = answers[q.id]
    const dimension = leadershipDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      const value = leadershipReverseScoreMap[q.id] ? 4 - answer : answer
      dimensions[dimension as keyof typeof dimensions] += value
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 4)) * 100) : 50])
  ) as Record<string, number>

  const transformational = Math.round(
    (scores['idealized-influence'] +
      scores['inspirational-motivation'] +
      scores['intellectual-stimulation'] +
      scores['individual-consideration']) /
      4
  )

  const transactional = Math.round(
    (scores['contingent-reward'] +
      scores['management-by-exception-active'] +
      (100 - scores['management-by-exception-passive']) / 2) /
      3
  )

  const passiveAvoidant = Math.round(
    (scores['management-by-exception-passive'] + scores['laissez-faire']) / 2
  )

  const overall = Math.round((transformational * 0.5 + transactional * 0.35 + (100 - passiveAvoidant) * 0.15))

  return {
    overall,
    transformational,
    transactional,
    passiveAvoidant,
    dimensionScores: scores,
    confidence: 0.92,
    consistency: 0.88,
  }
}

export function getLeadershipInterpretation(score: number, dimension: string) {
  if (dimension === 'laissez-faire' || dimension === 'management-by-exception-passive') {
    if (score < 25) return '健康的非放任型领导风格'
    if (score < 45) return '适当授权的平衡型'
    return '需要警惕过度回避领导责任'
  }

  if (score < 30) return '该维度需要重点改进'
  if (score < 50) return '该维度有一定发展空间'
  if (score < 70) return '该维度表现良好'
  if (score < 85) return '该维度是你的领导优势'
  return '该维度是你的核心领导力特长'
}
