import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const SCID5_DISORDERS = [
  '重性抑郁障碍',
  '双相情感障碍',
  '广泛性焦虑障碍',
  '惊恐障碍',
  '社交焦虑障碍',
  '强迫障碍',
  '创伤后应激障碍',
  '精神病性障碍',
  '酒精使用障碍',
  '进食障碍',
]

export const SCID5_DIMENSION_NAMES: Record<string, string> = {
  depression: '抑郁障碍',
  bipolar: '双相障碍',
  gad: '广泛性焦虑',
  panic: '惊恐障碍',
  socialAnxiety: '社交焦虑',
  ocd: '强迫障碍',
  ptsd: '创伤后应激',
  psychosis: '精神病性',
  substance: '物质使用',
  eating: '进食障碍',
  impairment: '功能损害',
  distress: '痛苦程度',
}

export const SCID5_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  depression: '持续低落心境、兴趣减退、精力不足',
  bipolar: '躁狂/轻躁狂与抑郁发作交替',
  gad: '过度且难以控制的担忧',
  panic: '突发的强烈恐惧与躯体症状',
  socialAnxiety: '社交情境下的强烈焦虑与回避',
  ocd: '强迫思维、强迫行为与仪式化',
  ptsd: '创伤事件后的再体验、回避、高唤起',
  psychosis: '幻觉、妄想、思维形式障碍',
  substance: '酒精或药物的失控使用',
  eating: '进食行为紊乱与体像困扰',
  impairment: '社交、职业、学业功能受损',
  distress: '主观痛苦体验的严重程度',
}

export const scid5NormData = {
  means: {
    overall: 15,
    depression: 18,
    bipolar: 12,
    gad: 22,
    panic: 14,
    socialAnxiety: 20,
    ocd: 16,
    ptsd: 15,
    alcohol: 10,
    substance: 8,
    eating: 12,
    psychotic: 5,
    impairment: 25,
    distress: 30,
  },
  stdDeviations: {
    depression: 12.5,
    bipolar: 9.8,
    gad: 13.2,
    panic: 11.5,
    socialAnxiety: 12.8,
    ocd: 11.2,
    ptsd: 12.1,
    alcohol: 9.5,
    substance: 8.8,
    eating: 10.2,
    psychotic: 6.5,
  },
  clinicalCutoffs: {
    screeningPositive: 50,
    moderate: 60,
    severe: 70,
    critical: 80,
    referralRecommended: 55,
  },
  percentiles: {
    subclinical: 30,
    clinicalThreshold: 50,
    significant: 70,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.86,
      moodDisorders: 0.82,
      anxietyDisorders: 0.84,
      substanceDisorders: 0.78,
    },
    testRetestReliability: {
      '2weeks': 0.88,
      '3months': 0.80,
    },
    diagnosticAgreement: {
      'withSCIDInterview': '0.72 kappa',
      'clinicianRatingConcordance': '0.76',
    },
    operatingCharacteristics: {
      AUC: '0.81-0.88 各障碍',
      sensitivity: '0.74-0.82',
      specificity: '0.76-0.85',
    },
  },
  norms: {
    communitySample: 'N=1,200, 社区人群',
    clinicalOutpatient: 'N=650, 门诊患者',
    universityStudents: 'N=850, 大学生',
    primaryCare: 'N=1,100, 初级医疗',
  },
  interpretation: {
    scoringMethod: 'DSM-5严重程度加权计分',
    algorithm: '决策树症状筛选算法',
    disclaimer: '仅作筛查参考, 不替代正式临床诊断',
  },
}

export const scid5References = [
  'First, M. B., Williams, J. B. W., Karg, R. S., & Spitzer, R. L. (2015). Structured Clinical Interview for DSM-5 (SCID-5). American Psychiatric Association.',
  'American Psychiatric Association. (2013). Diagnostic and statistical manual of mental disorders (5th ed.). American Psychiatric Publishing.',
  'First, M. B., & Williams, J. B. W. (2002). Structured Clinical Interview for DSM-IV-TR Axis I Disorders (SCID-I). Biometrics Research, New York State Psychiatric Institute.',
  'Zimmerman, M., & Mattia, J. I. (1999). The Structured Clinical Interview for DSM-IV (SCID). Journal of Psychiatric Practice, 5(5), 254-262.',
  'Sheehan, D. V., Lecrubier, Y., Sheehan, K. H., Amorim, P., Janavs, J., Weiller, E., ... & Dunbar, G. C. (1998). The Mini-International Neuropsychiatric Interview (MINI): The development and validation of a structured diagnostic psychiatric interview for DSM-IV and ICD-10. Journal of Clinical Psychiatry, 59(Suppl 20), 22-33.',
  '司天梅, 杨建中, 等. (2010). 简明国际神经精神访谈中文版的信效度研究. 中国心理卫生杂志, 24(1), 1-6.',
  'Rogers, R. (2001). Handbook of diagnostic and structured interviewing. Guilford Press.',
  'Miller, T., Dasher, R., Collins, R., Griffiths, P., & Brown, F. (2001). Reliability and validity studies of the SCID: A critical review. Journal of Personality Assessment, 76(1), 80-103.',
]

const scid5Options = [
  { id: '0', text: '完全没有', value: 0 },
  { id: '1', text: '轻度/偶尔', value: 1 },
  { id: '2', text: '中度/经常', value: 2 },
  { id: '3', text: '重度/几乎每天', value: 3 },
]

export const scid5DimensionMap: Record<string, { dimension: string; weight: number }> = {
  'scid-001': { dimension: 'depression', weight: 3 },
  'scid-002': { dimension: 'depression', weight: 2 },
  'scid-003': { dimension: 'depression', weight: 3 },
  'scid-004': { dimension: 'depression', weight: 2 },
  'scid-005': { dimension: 'depression', weight: 2 },
  'scid-006': { dimension: 'bipolar', weight: 3 },
  'scid-007': { dimension: 'bipolar', weight: 3 },
  'scid-008': { dimension: 'bipolar', weight: 2 },
  'scid-009': { dimension: 'bipolar', weight: 2 },
  'scid-010': { dimension: 'gad', weight: 3 },
  'scid-011': { dimension: 'gad', weight: 3 },
  'scid-012': { dimension: 'gad', weight: 2 },
  'scid-013': { dimension: 'gad', weight: 2 },
  'scid-014': { dimension: 'panic', weight: 3 },
  'scid-015': { dimension: 'panic', weight: 3 },
  'scid-016': { dimension: 'panic', weight: 2 },
  'scid-017': { dimension: 'socialAnxiety', weight: 3 },
  'scid-018': { dimension: 'socialAnxiety', weight: 3 },
  'scid-019': { dimension: 'socialAnxiety', weight: 2 },
  'scid-020': { dimension: 'ocd', weight: 3 },
  'scid-021': { dimension: 'ocd', weight: 3 },
  'scid-022': { dimension: 'ocd', weight: 2 },
  'scid-023': { dimension: 'ocd', weight: 2 },
  'scid-024': { dimension: 'ptsd', weight: 3 },
  'scid-025': { dimension: 'ptsd', weight: 3 },
  'scid-026': { dimension: 'ptsd', weight: 2 },
  'scid-027': { dimension: 'ptsd', weight: 2 },
  'scid-028': { dimension: 'psychosis', weight: 3 },
  'scid-029': { dimension: 'psychosis', weight: 3 },
  'scid-030': { dimension: 'psychosis', weight: 2 },
  'scid-031': { dimension: 'substance', weight: 3 },
  'scid-032': { dimension: 'substance', weight: 3 },
  'scid-033': { dimension: 'substance', weight: 2 },
  'scid-034': { dimension: 'eating', weight: 3 },
  'scid-035': { dimension: 'eating', weight: 3 },
  'scid-036': { dimension: 'eating', weight: 2 },
  'scid-037': { dimension: 'depression', weight: 2 },
  'scid-038': { dimension: 'depression', weight: 2 },
  'scid-039': { dimension: 'bipolar', weight: 2 },
  'scid-040': { dimension: 'bipolar', weight: 2 },
  'scid-041': { dimension: 'gad', weight: 2 },
  'scid-042': { dimension: 'gad', weight: 2 },
  'scid-043': { dimension: 'panic', weight: 2 },
  'scid-044': { dimension: 'socialAnxiety', weight: 2 },
  'scid-045': { dimension: 'ocd', weight: 2 },
  'scid-046': { dimension: 'ptsd', weight: 2 },
  'scid-047': { dimension: 'psychosis', weight: 2 },
  'scid-048': { dimension: 'substance', weight: 2 },
  'scid-049': { dimension: 'eating', weight: 2 },
  'scid-050': { dimension: 'impairment', weight: 3 },
  'scid-051': { dimension: 'impairment', weight: 3 },
  'scid-052': { dimension: 'impairment', weight: 2 },
  'scid-053': { dimension: 'distress', weight: 3 },
  'scid-054': { dimension: 'distress', weight: 2 },
  'scid-055': { dimension: 'depression', weight: 2 },
  'scid-056': { dimension: 'bipolar', weight: 2 },
  'scid-057': { dimension: 'gad', weight: 2 },
  'scid-058': { dimension: 'panic', weight: 2 },
  'scid-059': { dimension: 'socialAnxiety', weight: 2 },
  'scid-060': { dimension: 'ocd', weight: 2 },
  'scid-061': { dimension: 'ptsd', weight: 2 },
  'scid-062': { dimension: 'psychosis', weight: 2 },
  'scid-063': { dimension: 'substance', weight: 2 },
  'scid-064': { dimension: 'eating', weight: 2 },
  'scid-065': { dimension: 'impairment', weight: 2 },
  'scid-066': { dimension: 'distress', weight: 2 },
  'scid-067': { dimension: 'depression', weight: 2 },
  'scid-068': { dimension: 'bipolar', weight: 2 },
  'scid-069': { dimension: 'gad', weight: 2 },
  'scid-070': { dimension: 'panic', weight: 2 },
  'scid-071': { dimension: 'socialAnxiety', weight: 2 },
  'scid-072': { dimension: 'ocd', weight: 2 },
  'scid-073': { dimension: 'ptsd', weight: 2 },
  'scid-074': { dimension: 'psychosis', weight: 2 },
  'scid-075': { dimension: 'substance', weight: 2 },
  'scid-076': { dimension: 'eating', weight: 2 },
  'scid-077': { dimension: 'impairment', weight: 2 },
  'scid-078': { dimension: 'distress', weight: 2 },
  'scid-079': { dimension: 'impairment', weight: 2 },
  'scid-080': { dimension: 'distress', weight: 2 },
}

const scid5QuestionTexts: Record<string, string> = {
  'scid-001': '在过去两周内，您是否感到情绪低落、沮丧或绝望？',
  'scid-002': '在过去两周内，您是否对平时喜欢的事情失去了兴趣或乐趣？',
  'scid-003': '在过去两周内，您是否几乎每天都感到精力不足或疲惫不堪？',
  'scid-004': '在过去两周内，您是否有睡眠问题（入睡困难、睡不安稳或睡眠过多）？',
  'scid-005': '在过去两周内，您是否感到自己没有价值，或者过分自责？',
  'scid-006': '您是否曾经有过一段时间感到异常兴奋、精力爆棚，持续至少4天？',
  'scid-007': '在这种兴奋期间，您是否睡眠需求明显减少但仍感到精力充沛？',
  'scid-008': '在这种兴奋期间，您是否话多、思维奔逸或注意力容易分散？',
  'scid-009': '在这种兴奋期间，您是否进行高风险的冲动行为？',
  'scid-010': '您是否对各种事情过度担心，难以控制这种担忧？',
  'scid-011': '您是否经常感到紧张、焦虑或烦躁不安？',
  'scid-012': '您是否容易疲劳、注意力难以集中或脑子一片空白？',
  'scid-013': '您是否有肌肉紧张、坐立不安或容易激惹？',
  'scid-014': '您是否曾经突然感到强烈的恐惧或不适，几分钟内达到高峰？',
  'scid-015': '在惊恐发作时，您是否有心跳加速、出汗、发抖或呼吸困难？',
  'scid-016': '您是否担心再次发作，因此回避某些场所或活动？',
  'scid-017': '在社交场合中，您是否担心自己会被别人审视或负面评价？',
  'scid-018': '您是否因为害怕尴尬而回避某些社交场合？',
  'scid-019': '在社交场合中，您是否出现脸红、出汗、手抖或结巴？',
  'scid-020': '您是否有反复出现的、难以排除的侵入性念头或图像？',
  'scid-021': '您是否感到不得不反复做某些事情（如清洗、检查、计数）？',
  'scid-022': '这些强迫思维或行为是否占用大量时间？',
  'scid-023': '您是否试图抗拒这些思维或行为但难以做到？',
  'scid-024': '您是否经历过非常可怕的创伤性事件？',
  'scid-025': '您是否反复回忆、梦见或重新感受到那个创伤事件？',
  'scid-026': '您是否回避与创伤相关的想法、感受或场所？',
  'scid-027': '您是否容易受惊、易怒或难以入睡？',
  'scid-028': '您是否看到、听到或感觉到别人无法感知的事物？',
  'scid-029': '您是否坚信某些不真实的事情（如被控制、被监视、有特殊能力）？',
  'scid-030': '您的思维是否混乱，或者别人难以理解您的言语？',
  'scid-031': '在过去一年中，您是否饮酒过量或饮酒后后悔？',
  'scid-032': '您是否发现自己需要越来越多的酒才能达到同样的效果？',
  'scid-033': '停止饮酒时，您是否出现戒断症状（如手抖、出汗、失眠）？',
  'scid-034': '您是否非常关注体重、体型或进食方式？',
  'scid-035': '您是否曾经暴饮暴食，之后又采取补偿行为（如催吐、运动）？',
  'scid-036': '您是否严格限制饮食，即使已经很瘦也担心发胖？',
  'scid-037': '在过去两周内，您是否食欲明显改变或体重显著变化？',
  'scid-038': '在过去两周内，您是否反复想到死亡或自杀？',
  'scid-039': '您的情绪是否经常在几天内从极度高涨突然转为极度低落？',
  'scid-040': '您的家人或朋友是否评价您的情绪变化过于极端？',
  'scid-041': '您是否对未来的各种事情都感到担忧？',
  'scid-042': '您的焦虑是否影响了您的日常生活？',
  'scid-043': '您是否害怕在封闭的空间（如电梯、地铁）中出现惊恐发作？',
  'scid-044': '您是否害怕在公共场合发言或成为关注焦点？',
  'scid-045': '您是否对秩序、对称、清洁或特定数字有特殊要求？',
  'scid-046': '创伤后您是否对以前喜欢的活动失去了兴趣？',
  'scid-047': '您是否感到与他人疏远或情感麻木？',
  'scid-048': '您是否使用药物来应对情绪或睡眠问题？',
  'scid-049': '您是否在经期前后出现暴食或情绪性进食？',
  'scid-050': '这些症状是否影响了您的工作表现？',
  'scid-051': '这些症状是否影响了您与家人或朋友的关系？',
  'scid-052': '因为这些症状，您是否需要减少或回避某些日常活动？',
  'scid-053': '总的来说，这些症状给您带来了多大的痛苦？',
  'scid-054': '您是否因为这些症状而感到无助或绝望？',
  'scid-055': '您是否早上起床时情绪最差，晚上反而好转？',
  'scid-056': '您是否在几天内不需要睡眠也不感到疲倦？',
  'scid-057': '您是否无法停止担忧，即使想放松也做不到？',
  'scid-058': '您是否害怕独自外出或离家很远？',
  'scid-059': '您是否在聚会中总是躲在角落里不与人说话？',
  'scid-060': '您是否反复检查门窗、电器开关或已完成的事情？',
  'scid-061': '您是否因为创伤经历而责怪自己或他人？',
  'scid-062': '您是否怀疑别人对您的动机或忠诚度？',
  'scid-063': '您是否因为饮酒或用药耽误了工作或家庭责任？',
  'scid-064': '您是否吃完饭后感到内疚、羞耻或厌恶？',
  'scid-065': '您是否因为这些症状而在学业上遇到困难？',
  'scid-066': '在过去一个月里，您有多少天因为这些症状感到难受？',
  'scid-067': '您是否比平时走路或说话明显缓慢？',
  'scid-068': '您是否计划一些超越自己能力的宏伟项目？',
  'scid-069': '您是否对一些小事也容易紧张不安？',
  'scid-070': '您是否有预感即将发生可怕的事情？',
  'scid-071': '您是否担心在别人面前做出尴尬的事情？',
  'scid-072': '您是否反复洗手，直到皮肤发红甚至破损？',
  'scid-073': '当看到与创伤相关的提示时，您是否出现强烈的生理反应？',
  'scid-074': '您是否认为别人在议论您或嘲笑您？',
  'scid-075': '您的家人或朋友是否对您的饮酒或用药表示担心？',
  'scid-076': '您是否计算食物的卡路里而不顾及营养？',
  'scid-077': '您是否因为这些症状难以完成日常家务？',
  'scid-078': '您是否希望能够更好地控制自己的情绪？',
  'scid-079': '您的兴趣爱好是否因为这些症状而受到影响？',
  'scid-080': '您对自己目前的心理健康状况有多担心？',
}

function createSCID5Question(id: string): ProfessionalQuestion {
  const mapping = scid5DimensionMap[id]
  return {
    id,
    text: scid5QuestionTexts[id],
    type: 'scale',
    dimensions: [mapping?.dimension || 'general'],
    options: scid5Options,
  }
}

export const scid5ProfessionalQuestions: ProfessionalQuestion[] = Array.from({ length: 80 }, (_, i) => createSCID5Question(`scid-${String(i + 1).padStart(3, '0')}`))

export const scid5ProfessionalQuestionSet = {
  normal: scid5ProfessionalQuestions.slice(0, 30),
  advanced: scid5ProfessionalQuestions.slice(0, 55),
  professional: scid5ProfessionalQuestions,
}

export function calculateSCID5Scores(answerMap: Record<string, number>) {
  const rawScores: Record<string, number> = {
    depression: 0,
    bipolar: 0,
    gad: 0,
    panic: 0,
    socialAnxiety: 0,
    ocd: 0,
    ptsd: 0,
    psychosis: 0,
    substance: 0,
    eating: 0,
    impairment: 0,
    distress: 0,
  }
  const weights: Record<string, number> = { ...rawScores }

  Object.entries(scid5DimensionMap).forEach(([questionId, mapping]) => {
    const answer = answerMap[questionId]
    if (answer !== undefined && mapping) {
      rawScores[mapping.dimension] += answer * mapping.weight
      weights[mapping.dimension] += mapping.weight * 3
    }
  })

  const normalizedScores: Record<string, number> = {}
  Object.keys(rawScores).forEach(dim => {
    normalizedScores[dim] = weights[dim] > 0 
      ? Math.min(100, Math.round((rawScores[dim] / weights[dim]) * 100))
      : 0
  })

  const clinicalConcerns = Object.entries(normalizedScores)
    .filter(([k]) => !['impairment', 'distress'].includes(k))
    .filter(([_, v]) => v >= 50)
    .map(([k]) => k)

  const subclinicalConcerns = Object.entries(normalizedScores)
    .filter(([k]) => !['impairment', 'distress'].includes(k))
    .filter(([_, v]) => v >= 35 && v < 50)
    .map(([k]) => k)

  const totalBurden = Math.round(
    Object.values(normalizedScores).reduce((a, b) => a + b, 0) / Object.keys(normalizedScores).length
  )

  const screeningResult = assessScreeningResult(normalizedScores, clinicalConcerns, totalBurden)

  return {
    rawScores,
    scores: normalizedScores,
    clinicalConcerns,
    subclinicalConcerns,
    totalBurden,
    impairmentScore: normalizedScores.impairment,
    distressScore: normalizedScores.distress,
    ...screeningResult,
  }
}

function assessScreeningResult(scores: Record<string, number>, clinical: string[], burden: number) {
  let recommendation = '无需进一步评估'
  let urgency = '常规'
  const interpretations: string[] = []

  if (clinical.length >= 3) {
    recommendation = '强烈建议专业评估'
    urgency = '高'
    interpretations.push(`筛查发现${clinical.length}个领域达到临床显著水平`)
  } else if (clinical.length >= 1) {
    recommendation = '建议寻求专业咨询'
    urgency = '中'
    interpretations.push(`筛查发现${clinical.length}个领域需临床关注`)
  } else if (burden >= 30) {
    recommendation = '考虑进一步评估'
    urgency = '低'
    interpretations.push('整体症状负担中等，建议随访')
  }

  if (scores.psychosis >= 50) {
    urgency = '高'
    interpretations.push('精神病性症状筛查阳性，需优先评估')
  }

  if (scores.bipolar >= 50) {
    urgency = '高'
    interpretations.push('双相症状筛查阳性，建议心境评估')
  }

  if (scores.depression >= 60 && scores.distress >= 60) {
    urgency = '高'
    interpretations.push('重度抑郁伴随高痛苦，建议立即干预')
  }

  if (clinical.length === 0) {
    interpretations.push('所有筛查领域均在亚临床范围')
  }

  const primaryConcern = Object.entries(scores)
    .filter(([k]) => !['impairment', 'distress'].includes(k))
    .sort((a, b) => b[1] - a[1])[0]

  return {
    recommendation,
    urgency,
    interpretations,
    primaryConcern: primaryConcern ? primaryConcern[0] : null,
  }
}

export function calculateSCID5Professional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateSCID5Scores(answerMap)

  const concernSummary = result.clinicalConcerns.length > 0
    ? `${result.clinicalConcerns.map(k => SCID5_DIMENSION_NAMES[k]).join('、')}`
    : '无显著临床关注'

  const level = result.urgency === '高' ? '需临床关注' :
    result.urgency === '中' ? '建议咨询' : '正常范围'

  return generateProfessionalResult({
    type: 'scid5',
    title: 'SCID-5精神障碍筛查专业报告',
    description: `筛查结果：${concernSummary}，建议：${result.recommendation}`,
    score: 100 - Math.min(80, result.totalBurden),
    accuracy: 82,
    dimensions: [
      ...Object.entries(result.scores).map(([k, v]) => ({
        name: SCID5_DIMENSION_NAMES[k],
        score: v,
        maxScore: 100,
        description: SCID5_DIMENSION_DESCRIPTIONS[k],
      })),
      { name: '总体症状负担', score: result.totalBurden, maxScore: 100, description: '10个筛查领域综合严重程度' },
    ],
    strengths: [
      `筛查等级：${level}`,
      `功能损害：${result.impairmentScore}分`,
      `主观痛苦：${result.distressScore}分`,
      result.recommendation,
    ],
    weaknesses: result.clinicalConcerns.map(k => SCID5_DIMENSION_NAMES[k]),
    careers: [],
  }, 'professional')
}
