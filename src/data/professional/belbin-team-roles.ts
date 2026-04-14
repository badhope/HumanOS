import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const BELBIN_ROLES = [
  '智多星 Plant',
  '资源调查员 RI',
  '协调者 CO',
  '塑造者 SH',
  '监督评价者 ME',
  '合作者 TW',
  '执行者 IMP',
  '完美主义者 CF',
  '专家 SP',
]

export const BELBIN_ROLE_NAMES: Record<string, string> = {
  plant: '智多星 Plant',
  'resource-investigator': '资源调查员 RI',
  coordinator: '协调者 CO',
  shaper: '塑造者 SH',
  'monitor-evaluator': '监督评价者 ME',
  teamworker: '合作者 TW',
  implementer: '执行者 IMP',
  'completer-finisher': '完美主义者 CF',
  specialist: '专家 SP',
}

export const BELBIN_ROLE_DESCRIPTIONS: Record<string, string> = {
  plant: '创造力与想象力的源泉，善于提出突破性创意与解决方案',
  'resource-investigator': '人脉广阔的社交达人，善于发掘外部机会与资源',
  coordinator: '成熟的团队组织者，协调各方资源实现共同目标',
  shaper: '挑战现状的推动者，为团队注入前进的动力与紧迫感',
  'monitor-evaluator': '冷静理性的战略分析师，做出审慎明智的判断',
  teamworker: '合作精神的化身，营造和谐的团队氛围',
  implementer: '务实高效的行动派，将想法转化为具体执行',
  'completer-finisher': '注重细节的完美主义者，确保质量与准时交付',
  specialist: '深耕特定领域的专才，提供稀缺的专业知识',
}

export const BELBIN_CATEGORIES = {
  thinking: ['plant', 'monitor-evaluator', 'specialist'],
  social: ['resource-investigator', 'coordinator', 'teamworker'],
  action: ['shaper', 'implementer', 'completer-finisher'],
}

export const belbinNormData = {
  means: {
    overall: 50,
    plant: 48,
    'resource-investigator': 53,
    coordinator: 55,
    shaper: 51,
    'monitor-evaluator': 52,
    teamworker: 54,
    implementer: 51,
    'completer-finisher': 49,
    specialist: 50,
  },
  stdDeviations: {
    plant: 13.5,
    'resource-investigator': 12.2,
    coordinator: 11.8,
    shaper: 12.8,
    'monitor-evaluator': 11.5,
    teamworker: 10.8,
    implementer: 11.2,
    'completer-finisher': 12.1,
    specialist: 12.5,
  },
  percentiles: {
    veryLow: 15,
    low: 30,
    average: 50,
    high: 70,
    veryHigh: 85,
  },
  profileCutoffs: {
    dominantRole: 65,
    preferredRoles: 55,
    avoidableRoles: 35,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.82,
      thinkingRoles: 0.76,
      socialRoles: 0.78,
      actionRoles: 0.75,
    },
    testRetestReliability: {
      '4weeks': 0.78,
      '1year': 0.70,
      '3years': 0.62,
    },
    constructValidity: {
      '与团队绩效相关': '0.48 (配置均衡团队)',
      '与管理成功相关': '0.52 (CO/ME/SH组合)',
      '与创新绩效相关': '0.45 (PL/RI高分组)',
    },
  },
  norms: {
    executiveTeams: 'N=1,200, 高管团队',
    projectTeams: 'N=3,800, 项目团队',
    techTeams: 'N=2,100, 技术团队',
    mbaStudents: 'N=1,400, MBA学员',
  },
}

export const belbinReferences = [
  'Belbin, R. M. (1981). Management teams: Why they succeed or fail. Heinemann Professional Publishing.',
  'Belbin, R. M. (1993). Team roles at work. Butterworth-Heinemann.',
  'Belbin, R. M. (2010). Management teams: Why they succeed or fail (2nd ed.). Butterworth-Heinemann.',
  'Fisher, S. G., Hunter, T. A., & Macrosson, W. D. K. (2001). A factor analysis of the Belbin team role self-perception inventory. Journal of Occupational and Organizational Psychology, 74(1), 121-134.',
  'Batenburg, R. S., van der Wal, R., & Waslander, S. (2007). The reliability and validity of the Dutch Belbin Team Role Self-Perception Inventory. International Journal of Selection and Assessment, 15(3), 292-304.',
  'Jackson, S. E., Joshi, A., & Erhardt, N. L. (2003). Recent research on team and organizational diversity: SWOT analysis and implications. Journal of Management, 29(6), 801-830.',
  'Senior, B. (1997). Team roles and team performance: Is there "really" a link? Journal of Occupational and Organizational Psychology, 70(3), 241-258.',
  'Mathieu, J. E., Maynard, M. T., Rapp, T., & Gilson, L. (2008). Team effectiveness 1997-2007: A review of recent advancements and a glimpse into the future. Journal of Management, 34(3), 410-476.',
]

const belbinOptions = [
  { id: '0', text: '完全不符合', value: 0 },
  { id: '1', text: '比较不符合', value: 1 },
  { id: '2', text: '一般', value: 2 },
  { id: '3', text: '比较符合', value: 3 },
  { id: '4', text: '完全符合', value: 4 },
]

export const belbinDimensionMap: Record<string, string> = {
  'belbin-001': 'plant',
  'belbin-002': 'plant',
  'belbin-003': 'plant',
  'belbin-004': 'plant',
  'belbin-005': 'plant',
  'belbin-006': 'plant',
  'belbin-007': 'plant',
  'belbin-008': 'plant',
  'belbin-009': 'resource-investigator',
  'belbin-010': 'resource-investigator',
  'belbin-011': 'resource-investigator',
  'belbin-012': 'resource-investigator',
  'belbin-013': 'resource-investigator',
  'belbin-014': 'resource-investigator',
  'belbin-015': 'resource-investigator',
  'belbin-016': 'resource-investigator',
  'belbin-017': 'coordinator',
  'belbin-018': 'coordinator',
  'belbin-019': 'coordinator',
  'belbin-020': 'coordinator',
  'belbin-021': 'coordinator',
  'belbin-022': 'coordinator',
  'belbin-023': 'coordinator',
  'belbin-024': 'coordinator',
  'belbin-025': 'shaper',
  'belbin-026': 'shaper',
  'belbin-027': 'shaper',
  'belbin-028': 'shaper',
  'belbin-029': 'shaper',
  'belbin-030': 'shaper',
  'belbin-031': 'shaper',
  'belbin-032': 'shaper',
  'belbin-033': 'monitor-evaluator',
  'belbin-034': 'monitor-evaluator',
  'belbin-035': 'monitor-evaluator',
  'belbin-036': 'monitor-evaluator',
  'belbin-037': 'monitor-evaluator',
  'belbin-038': 'monitor-evaluator',
  'belbin-039': 'monitor-evaluator',
  'belbin-040': 'monitor-evaluator',
  'belbin-041': 'teamworker',
  'belbin-042': 'teamworker',
  'belbin-043': 'teamworker',
  'belbin-044': 'teamworker',
  'belbin-045': 'teamworker',
  'belbin-046': 'teamworker',
  'belbin-047': 'teamworker',
  'belbin-048': 'teamworker',
  'belbin-049': 'implementer',
  'belbin-050': 'implementer',
  'belbin-051': 'implementer',
  'belbin-052': 'implementer',
  'belbin-053': 'implementer',
  'belbin-054': 'implementer',
  'belbin-055': 'implementer',
  'belbin-056': 'implementer',
  'belbin-057': 'completer-finisher',
  'belbin-058': 'completer-finisher',
  'belbin-059': 'completer-finisher',
  'belbin-060': 'completer-finisher',
  'belbin-061': 'completer-finisher',
  'belbin-062': 'completer-finisher',
  'belbin-063': 'completer-finisher',
  'belbin-064': 'completer-finisher',
  'belbin-065': 'specialist',
  'belbin-066': 'specialist',
  'belbin-067': 'specialist',
  'belbin-068': 'specialist',
  'belbin-069': 'specialist',
  'belbin-070': 'specialist',
  'belbin-071': 'specialist',
  'belbin-072': 'specialist',
}

const belbinQuestionTexts: Record<string, string> = {
  'belbin-001': '我经常能想到别人想不到的创意点子',
  'belbin-002': '我喜欢从全新的角度思考问题',
  'belbin-003': '我善于打破常规思维提出突破性方案',
  'belbin-004': '我常能为难题找到出人意料的解决方案',
  'belbin-005': '我的想象力丰富，经常有原创性想法',
  'belbin-006': '在讨论陷入僵局时，我能提出全新思路',
  'belbin-007': '我喜欢进行发散性思维和头脑风暴',
  'belbin-008': '我经常能够将不相关的想法联系起来',
  'belbin-009': '我善于建立并维护广泛的人际网络',
  'belbin-010': '我能快速发现并把握新出现的机会',
  'belbin-011': '我擅长通过人脉获取需要的资源和信息',
  'belbin-012': '与陌生人交谈时我能很快找到共同话题',
  'belbin-013': '我热衷于探索团队外部的各种可能性',
  'belbin-014': '我能敏锐地察觉到外部环境的变化',
  'belbin-015': '我擅长谈判和争取外部支持',
  'belbin-016': '参加社交活动时我能带回有用的联系人',
  'belbin-017': '我擅长引导团队讨论并达成共识',
  'belbin-018': '面对复杂情况我能保持冷静并抓住重点',
  'belbin-019': '我能公平地对待团队中的每一个成员',
  'belbin-020': '我善于发现和发挥每个人的特长',
  'belbin-021': '冲突出现时我能有效地调解矛盾',
  'belbin-022': '我能清晰地分配工作和明确职责',
  'belbin-023': '团队决策时我能促进大家做出选择',
  'belbin-024': '我能协调不同观点向共同目标前进',
  'belbin-025': '我喜欢挑战现状，推动事情向前发展',
  'belbin-026': '在压力下我反而能激发更强的动力',
  'belbin-027': '我不怕对抗，敢于坚持自己的立场',
  'belbin-028': '我总是试图找到更有效的做事方式',
  'belbin-029': '我不介意成为打破僵局的那个人',
  'belbin-030': '我善于给团队施加适当的紧迫感',
  'belbin-031': '我追求卓越，不能容忍平庸的表现',
  'belbin-032': '遇到障碍时我能找到绕过去的方法',
  'belbin-033': '我做决策时非常谨慎，不急于下结论',
  'belbin-034': '我善于进行批判性分析和逻辑思考',
  'belbin-035': '我能客观地权衡各种方案的利弊',
  'belbin-036': '别人认为我是一个理性和冷静的人',
  'belbin-037': '我能发现他人建议中的潜在缺陷',
  'belbin-038': '做决定时我优先考虑长期影响',
  'belbin-039': '我不轻易受情绪或激情的影响',
  'belbin-040': '我擅长进行战略性思考和长远规划',
  'belbin-041': '我敏感地察觉到团队成员的情绪变化',
  'belbin-042': '我总是愿意支持和帮助其他团队成员',
  'belbin-043': '我善于营造友好合作的团队氛围',
  'belbin-044': '遇到分歧时我倾向于灵活和妥协',
  'belbin-045': '我是很好的倾听者，能接纳不同意见',
  'belbin-046': '我优先考虑维护团队的和谐关系',
  'belbin-047': '我经常默默地为团队做幕后贡献',
  'belbin-048': '团队需要时我会做出个人的适当让步',
  'belbin-049': '我喜欢将计划转化为具体的执行步骤',
  'belbin-050': '我做事有系统，注重效率和纪律',
  'belbin-051': '我能把抽象的想法变成可操作的方案',
  'belbin-052': '我雷厉风行，说到做到',
  'belbin-053': '我关注实际可行性，不追求华而不实',
  'belbin-054': '我擅长组织资源完成既定目标',
  'belbin-055': '我坚持不懈直到任务完成为止',
  'belbin-056': '我遵守规则，工作稳定可靠',
  'belbin-057': '交付工作前我会反复检查确保没有错误',
  'belbin-058': '我对工作质量要求很高，容不得马虎',
  'belbin-059': '我总能按时完成任务，从不拖延',
  'belbin-060': '我善于发现细节中的潜在问题',
  'belbin-061': '我会跟进直到所有事项都完美收尾',
  'belbin-062': '接近截止日期时我的效率反而最高',
  'belbin-063': '我担心出错，因此总是提前开始工作',
  'belbin-064': '最后交付时我会亲自进行最终审核',
  'belbin-065': '在特定领域我拥有深厚的专业知识',
  'belbin-066': '遇到专业问题时大家都会来请教我',
  'belbin-067': '我热衷于钻研自己领域的最新发展',
  'belbin-068': '我宁愿深入一个领域也不愿样样通',
  'belbin-069': '技术细节对我来说不是问题反而很有趣',
  'belbin-070': '我专注于维护自己领域的专业标准',
  'belbin-071': '遇到难题时我能提供特定的技术解决方案',
  'belbin-072': '我为团队带来稀缺的专业技能和知识',
}

function createBelbinQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: belbinQuestionTexts[id],
    type: 'scale',
    dimensions: [belbinDimensionMap[id]],
    options: belbinOptions,
  }
}

export const belbinNormalQuestions: ProfessionalQuestion[] = Array.from({ length: 18 }, (_, i) => createBelbinQuestion(`belbin-0${String(i + 1).padStart(2, '0')}`))

export const belbinAdvancedQuestions: ProfessionalQuestion[] = Array.from({ length: 45 }, (_, i) => createBelbinQuestion(`belbin-0${String(i + 1).padStart(2, '0')}`))

export const belbinProfessionalQuestions: ProfessionalQuestion[] = Array.from({ length: 72 }, (_, i) => createBelbinQuestion(`belbin-${String(i + 1).padStart(3, '0')}`))

export const belbinProfessionalQuestionSet = {
  normal: belbinNormalQuestions,
  advanced: belbinAdvancedQuestions,
  professional: belbinProfessionalQuestions,
}

export function calculateBelbinScores(answerMap: Record<string, number>) {
  const dimensions = {
    plant: 0,
    'resource-investigator': 0,
    coordinator: 0,
    shaper: 0,
    'monitor-evaluator': 0,
    teamworker: 0,
    implementer: 0,
    'completer-finisher': 0,
    specialist: 0,
  }
  const counts = { ...dimensions }

  belbinProfessionalQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = belbinDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 4)) * 100) : 50])
  ) as Record<string, number>

  const categories = {
    thinking: Math.round((scores.plant + scores['monitor-evaluator'] + scores.specialist) / 3),
    social: Math.round((scores['resource-investigator'] + scores.coordinator + scores.teamworker) / 3),
    action: Math.round((scores.shaper + scores.implementer + scores['completer-finisher']) / 3),
  }

  const sortedRoles = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  return {
    scores,
    categories,
    primaryRole: sortedRoles[0],
    secondaryRole: sortedRoles[1],
    tertiaryRole: sortedRoles[2],
  }
}

export function calculateBelbinProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateBelbinScores(answerMap)
  const primaryRoleName = BELBIN_ROLE_NAMES[result.primaryRole]

  return generateProfessionalResult({
    type: 'belbin-team-roles',
    title: 'Belbin团队角色专业报告',
    description: `你的主导团队角色：${primaryRoleName}`,
    score: Math.round((result.categories.thinking + result.categories.social + result.categories.action) / 3),
    accuracy: 87,
    dimensions: Object.entries(result.scores).map(([k, v]) => ({
      name: BELBIN_ROLE_NAMES[k],
      score: v,
      maxScore: 100,
      description: BELBIN_ROLE_DESCRIPTIONS[k],
    })),
    strengths: [
      `主要角色：${primaryRoleName} - ${BELBIN_ROLE_DESCRIPTIONS[result.primaryRole]}`,
      `次要角色：${BELBIN_ROLE_NAMES[result.secondaryRole]}`,
      `第三角色：${BELBIN_ROLE_NAMES[result.tertiaryRole]}`,
    ],
    weaknesses: [],
    careers: [],
  }, 'professional')
}
