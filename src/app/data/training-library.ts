import type { TrainingProgram } from '../components/training/TrainingEngine'
import COGNITION_TRAININGS from './training-cognition'
import EMOTION_TRAININGS from './training-emotion'
import ATTACHMENT_TRAININGS from './training-attachment'
import { SOCIAL_TRAININGS, FUN_EXTENDED_TRAININGS } from './training-social-fun'

// ============================================
// 📚 完整8大轨道训练体系
// ============================================

export const FOUNDATION_TRAININGS: TrainingProgram[] = [
  {
    id: 'emotion-anchoring',
    title: '情绪锚定训练',
    subtitle: '建立你的情绪稳定开关',
    icon: '🧘',
    duration: '5分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'emotion',
    benefits: [
      '478呼吸法 - 60秒快速平复焦虑',
      '身体扫描 - 觉察情绪的身体信号',
      '5-4-3-2-1技术 - 惊恐发作急救',
    ],
    exercises: [
      { id: 'b1', title: '准备', instruction: '找一个舒服的姿势坐好', duration: 10, type: 'guided' },
      { id: 'b2', title: '478呼吸法', instruction: '跟随节奏：吸气4秒 → 屏气7秒 → 呼气8秒', duration: 60, type: 'breathing' },
      { id: 'b3', title: '休息', instruction: '自然呼吸，感受身体的变化', duration: 15, type: 'rest' },
      { id: 'b4', title: '身体扫描', instruction: '把注意力从头顶逐步移到脚底', duration: 90, type: 'guided' },
      { id: 'b5', title: '5-4-3-2-1着陆', instruction: '说出5看4听3摸2闻1尝', duration: 60, type: 'guided' },
    ],
  },
  {
    id: 'self-compassion',
    title: '自我同情练习',
    subtitle: '停止自我攻击，与自己和解',
    icon: '💗',
    duration: '8分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'emotion',
    benefits: [
      '学会像对待朋友一样对待自己',
      '停止内心的批评和指责',
      '在痛苦中给自己拥抱',
    ],
    exercises: [
      { id: 's1', title: '准备', instruction: '回想一件最近让你自责的事情', duration: 15, type: 'guided' },
      { id: 's2', title: '第一步', instruction: '如果好朋友遇到这件事，你会怎么说？', duration: 60, type: 'reflection' },
      { id: 's3', title: '休息', instruction: '深呼吸3次', duration: 20, type: 'rest' },
      { id: 's4', title: '第二步', instruction: '现在把同样的话对自己说一遍', duration: 120, type: 'guided' },
      { id: 's5', title: '第三步', instruction: '所有人都会犯错，这就是做人的一部分', duration: 60, type: 'guided' },
      { id: 's6', title: '整合', instruction: '把手放在心上，感受来自自己的善意', duration: 45, type: 'guided' },
    ],
  },
  {
    id: 'boundary-setting',
    title: '边界建立训练',
    subtitle: '学会说不，不做老好人',
    icon: '🛡️',
    duration: '10分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'social',
    benefits: [
      '识别自己的边界在哪里',
      '学会温和而坚定地拒绝',
      '不再为别人的情绪负责',
    ],
    exercises: [
      { id: 'bo1', title: '准备', instruction: '回想一个让你不舒服的请求', duration: 15, type: 'guided' },
      { id: 'bo2', title: '红线识别', instruction: '哪一点让你不舒服？时间？精力？还是价值观？', duration: 60, type: 'reflection' },
      { id: 'bo3', title: '拒绝句式', instruction: '"感谢你的邀请，但我这次不方便。"', duration: 45, type: 'guided' },
      { id: 'bo4', title: '练习', instruction: '不需要解释太多，不需要道歉', duration: 60, type: 'guided' },
      { id: 'bo5', title: '休息', instruction: '为自己勇敢而骄傲', duration: 20, type: 'rest' },
      { id: 'bo6', title: '内化', instruction: '我的感受和别人的感受一样重要', duration: 60, type: 'guided' },
    ],
  },
  {
    id: 'micro-habit',
    title: '微习惯启动',
    subtitle: '用最小行动打破拖延',
    icon: '🌱',
    duration: '3分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'career',
    benefits: [
      '永远从"小到不可能失败"开始',
      '不需要意志力，也能坚持',
      '建立正向飞轮效应',
    ],
    exercises: [
      { id: 'm1', title: '准备', instruction: '选一件你一直在拖延的事', duration: 10, type: 'guided' },
      { id: 'm2', title: '缩小', instruction: '把它缩小到30秒就能做完的版本', duration: 60, type: 'reflection' },
      { id: 'm3', title: '倒数', instruction: '5 - 4 - 3 - 2 - 1', duration: 5, type: 'countdown' },
      { id: 'm4', title: '立刻做！', instruction: '现在就去做那30秒的版本！', duration: 60, type: 'guided' },
      { id: 'm5', title: '庆祝', instruction: '你做到了！为自己鼓掌', duration: 15, type: 'guided' },
    ],
  },
  {
    id: 'cognitive-restructuring',
    title: '认知重构训练',
    subtitle: '打破负面思维的死循环',
    icon: '🔄',
    duration: '12分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'cognition',
    benefits: [
      '识别认知扭曲的10种模式',
      '把灾难化思维拉回现实',
      '建立客观中立的思维习惯',
    ],
    exercises: [
      { id: 'c1', title: '准备', instruction: '想一个最近让你焦虑的念头', duration: 15, type: 'guided' },
      { id: 'c2', title: '第一步', instruction: '支持这个想法的证据有哪些？', duration: 90, type: 'reflection' },
      { id: 'c3', title: '第二步', instruction: '反对这个想法的证据有哪些？', duration: 90, type: 'reflection' },
      { id: 'c4', title: '休息', instruction: '深呼吸，让思绪清空', duration: 20, type: 'rest' },
      { id: 'c5', title: '第三步', instruction: '最符合现实的情况是什么？', duration: 60, type: 'guided' },
      { id: 'c6', title: '第四步', instruction: '即使最坏情况发生了，我能应对吗？', duration: 60, type: 'guided' },
      { id: 'c7', title: '整合', instruction: '现在你对这件事的感觉是？', duration: 45, type: 'reflection' },
    ],
  },
  {
    id: 'gratitude',
    title: '感恩三件事',
    subtitle: '培养感恩心态，提升幸福感',
    icon: '🙏',
    duration: '3分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'emotion',
    benefits: [
      '每天记录三件值得感恩的事',
      '培养积极心态和正向思维',
      '增强生活满意度和幸福感',
    ],
    exercises: [
      { id: 'g1', title: '准备', instruction: '找一个安静的地方，闭上眼睛深呼吸', duration: 10, type: 'guided' },
      { id: 'g2', title: '回想', instruction: '今天发生了什么让你感到开心或感激的事？', duration: 30, type: 'reflection' },
      { id: 'g3', title: '记录第一件', instruction: '写下或默念第一件让你感恩的事', duration: 30, type: 'guided' },
      { id: 'g4', title: '记录第二件', instruction: '写下或默念第二件让你感恩的事', duration: 30, type: 'guided' },
      { id: 'g5', title: '记录第三件', instruction: '写下或默念第三件让你感恩的事', duration: 30, type: 'guided' },
      { id: 'g6', title: '感受', instruction: '感受感恩带来的温暖和满足', duration: 20, type: 'rest' },
    ],
  },
]

// ============================================
// 🎮 经典趣味训练（已移至 training-social-fun.ts 扩展）
// ============================================

export const FUN_TRAININGS: TrainingProgram[] = []

// ============================================
// 🚀 八轨道训练体系导出
// ============================================

export const EMOTION_TRAININGS_FULL = [...EMOTION_TRAININGS]
export const COGNITION_TRAININGS_FULL = [...COGNITION_TRAININGS]
export const ATTACHMENT_TRAININGS_FULL = [...ATTACHMENT_TRAININGS]
export const SOCIAL_TRAININGS_FULL = [...SOCIAL_TRAININGS]
export const FUN_TRAININGS_FULL = [...FUN_TRAININGS, ...FUN_EXTENDED_TRAININGS]

export const CAREER_TRAININGS: TrainingProgram[] = [
  {
    id: 'career-vision',
    title: '职业愿景探索',
    subtitle: '找到你真正热爱的事业',
    icon: '🎯',
    duration: '10分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'career',
    benefits: [
      '明确职业方向和目标',
      '识别核心职业价值观',
      '制定可行的职业计划',
    ],
    exercises: [
      { id: 'cv1', title: '准备', instruction: '找一个安静的地方，回想你的职业经历', duration: 15, type: 'guided' },
      { id: 'cv2', title: '回忆高光时刻', instruction: '回想工作中最有成就感的三件事', duration: 90, type: 'reflection' },
      { id: 'cv3', title: '识别模式', instruction: '这些事情有什么共同点？', duration: 60, type: 'reflection' },
      { id: 'cv4', title: '休息', instruction: '深呼吸3次', duration: 20, type: 'rest' },
      { id: 'cv5', title: '理想工作', instruction: '描述你理想中的工作是什么样的', duration: 60, type: 'guided' },
      { id: 'cv6', title: '下一步', instruction: '明天可以做什么小行动？', duration: 45, type: 'guided' },
    ],
  },
  {
    id: 'skill-gap-analysis',
    title: '技能差距分析',
    subtitle: '清晰定位成长方向',
    icon: '📈',
    duration: '8分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'career',
    benefits: [
      '识别当前技能水平',
      '明确目标技能要求',
      '制定学习计划',
    ],
    exercises: [
      { id: 'sg1', title: '准备', instruction: '列出当前职位需要的核心技能', duration: 30, type: 'guided' },
      { id: 'sg2', title: '自评', instruction: '对每项技能评分（1-5分）', duration: 60, type: 'reflection' },
      { id: 'sg3', title: '目标', instruction: '目标职位需要哪些技能？', duration: 60, type: 'guided' },
      { id: 'sg4', title: '差距', instruction: '找出差距最大的3项技能', duration: 45, type: 'reflection' },
      { id: 'sg5', title: '计划', instruction: '为每项技能制定学习路径', duration: 60, type: 'guided' },
    ],
  },
]

export const VALUES_TRAININGS: TrainingProgram[] = [
  {
    id: 'values-clarification',
    title: '价值观澄清',
    subtitle: '找到人生的指南针',
    icon: '🧭',
    duration: '12分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'values',
    benefits: [
      '识别核心价值观',
      '明确人生优先级',
      '做出符合价值观的选择',
    ],
    exercises: [
      { id: 'vc1', title: '准备', instruction: '放松身心，深呼吸', duration: 15, type: 'guided' },
      { id: 'vc2', title: '价值清单', instruction: '从列表中选出10个最重要的价值观', duration: 90, type: 'guided' },
      { id: 'vc3', title: '排序', instruction: '将10个价值观按重要性排序', duration: 60, type: 'reflection' },
      { id: 'vc4', title: '休息', instruction: '闭上眼睛，感受内心', duration: 20, type: 'rest' },
      { id: 'vc5', title: '前3名', instruction: '选出最重要的3个价值观', duration: 45, type: 'guided' },
      { id: 'vc6', title: '检验', instruction: '最近的选择是否符合这些价值观？', duration: 60, type: 'reflection' },
    ],
  },
  {
    id: 'values-alignment',
    title: '价值观对齐',
    subtitle: '让生活与价值观一致',
    icon: '🎯',
    duration: '10分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'values',
    benefits: [
      '评估当前生活与价值观的契合度',
      '找出需要调整的领域',
      '制定行动方案',
    ],
    exercises: [
      { id: 'va1', title: '准备', instruction: '回顾你最重要的3个价值观', duration: 15, type: 'guided' },
      { id: 'va2', title: '评估', instruction: '在工作、家庭、健康、社交四个方面评分', duration: 60, type: 'reflection' },
      { id: 'va3', title: '差距', instruction: '哪个领域差距最大？', duration: 30, type: 'reflection' },
      { id: 'va4', title: '行动', instruction: '制定一个小行动来缩小差距', duration: 60, type: 'guided' },
      { id: 'va5', title: '承诺', instruction: '承诺在本周内完成这个行动', duration: 30, type: 'guided' },
    ],
  },
]

export const MINDFULNESS_TRAININGS: TrainingProgram[] = [
  {
    id: 'mindful-breathing',
    title: '正念呼吸',
    subtitle: '活在当下的艺术',
    icon: '🌬️',
    duration: '10分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'mindfulness',
    benefits: [
      '训练专注力和觉察力',
      '减少焦虑和压力',
      '培养平静的内心',
    ],
    exercises: [
      { id: 'mb1', title: '准备', instruction: '找一个舒适的姿势坐下', duration: 15, type: 'guided' },
      { id: 'mb2', title: '觉察呼吸', instruction: '把注意力集中在呼吸上', duration: 60, type: 'guided' },
      { id: 'mb3', title: '走神觉察', instruction: '当思绪飘走时，温柔地拉回来', duration: 90, type: 'guided' },
      { id: 'mb4', title: '扩展觉察', instruction: '觉察身体的感受', duration: 60, type: 'guided' },
      { id: 'mb5', title: '结束', instruction: '慢慢睁开眼睛，感受当下', duration: 30, type: 'guided' },
    ],
  },
  {
    id: 'mindful-eating',
    title: '正念饮食',
    subtitle: '用心感受每一口',
    icon: '🍎',
    duration: '8分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'mindfulness',
    benefits: [
      '改善饮食习惯',
      '增加饮食满足感',
      '培养感恩之心',
    ],
    exercises: [
      { id: 'me1', title: '准备', instruction: '准备一小口食物', duration: 10, type: 'guided' },
      { id: 'me2', title: '观察', instruction: '观察食物的颜色、形状、气味', duration: 30, type: 'guided' },
      { id: 'me3', title: '品尝', instruction: '放进嘴里，慢慢咀嚼', duration: 60, type: 'guided' },
      { id: 'me4', title: '感受', instruction: '感受食物的味道和质地', duration: 60, type: 'guided' },
      { id: 'me5', title: '感恩', instruction: '感谢食物带来的滋养', duration: 30, type: 'guided' },
    ],
  },
]

// ============================================
// 📊 训练总库 - 目前共 41+ 个训练项目
// ============================================

export const ALL_TRAININGS = [
  ...FOUNDATION_TRAININGS,
  ...EMOTION_TRAININGS_FULL,
  ...COGNITION_TRAININGS_FULL,
  ...ATTACHMENT_TRAININGS_FULL,
  ...SOCIAL_TRAININGS_FULL,
  ...FUN_TRAININGS_FULL,
  ...CAREER_TRAININGS,
  ...VALUES_TRAININGS,
  ...MINDFULNESS_TRAININGS,
]

export const getTrainingById = (id: string) => ALL_TRAININGS.find(t => t.id === id)

export const getTrainingsByCategory = (category: string) => 
  ALL_TRAININGS.filter(t => t.category === category)

// 测评ID到维度ID的映射
const ASSESSMENT_TO_DIMENSION_MAP: Record<string, Record<string, string[]>> = {
  'bigfive': {
    'O': ['openness'],
    'C': ['conscientiousness'],
    'E': ['extraversion'],
    'A': ['agreeableness'],
    'N': ['neuroticism'],
  },
  'sas': {
    'anxiety': ['sas_anxiety', 'sas_somatic'],
    'somatic': ['sas_somatic'],
    'cognitive': ['sas_cognitive'],
  },
  'sds': {
    'depression': ['sds_depression'],
    'psychological': ['sds_psychological'],
  },
  'pss': {
    'stress': ['pss_stress'],
  },
  'burnout': {
    'exhaustion': ['burnout'],
    'cynicism': ['burnout_cynicism'],
    'accomplishment': ['burnout_accomplishment'],
  },
  'eq': {
    'selfAwareness': ['eq_self'],
    'selfManagement': ['eq_self'],
    'selfMotivation': ['eq_self'],
    'empathy': ['eq_empathy'],
    'socialSkills': ['eq_social'],
  },
  'ecr': {
    'anxiety': ['attachment_anxiety'],
    'avoidance': ['attachment_avoidance'],
  },
  'attachment': {
    'anxious': ['attachment_anxiety'],
    'avoidant': ['attachment_avoidance'],
    'fearful': ['attachment_fearful'],
    'secure': ['attachment_secure'],
  },
  'holland': {
    'R': ['holland_realistic'],
    'I': ['holland_investigative'],
    'A': ['holland_artistic'],
    'S': ['holland_social'],
    'E': ['holland_enterprising'],
    'C': ['holland_conventional'],
  },
  'iq': {
    'logical': ['iq_logical'],
    'verbal': ['iq_verbal'],
    'spatial': ['iq_spatial'],
  },
}

// 维度到训练ID的映射
const DIMENSION_TO_TRAINING_MAP: Record<string, string[]> = {
  'openness': ['cognitive-flexibility-o-low', 'openness-grounding-o-high'],
  'conscientiousness': ['conscientiousness-structure-c-low', 'perfectionism-detox-c-high'],
  'extraversion': ['introvert-confidence-e-low', 'performer-grounding-e-high'],
  'agreeableness': ['agreeableness-warmth-a-low', 'people-pleaser-detox-a-high'],
  'neuroticism': ['neuroticism-calming-n-high', 'emotional-range-expansion'],
  'sas_anxiety': ['anxiety-first-aid', 'what-if-technique', 'emotion-anchoring'],
  'sas_somatic': ['pressure-valve', 'emotion-anchoring'],
  'sas_cognitive': ['cognitive-restructuring', 'what-if-technique'],
  'pss_stress': ['pressure-valve', 'stress-inoculation'],
  'burnout': ['burnout-reset', 'meaning-reconstruction', 'self-compassion'],
  'burnout_cynicism': ['meaning-reconstruction'],
  'eq_self': ['self-compassion', 'emotion-anchoring'],
  'eq_empathy': ['avoidant-empathy', 'secure-base-strengthening'],
  'eq_social': ['social-basics', 'deep-connection'],
  'attachment_anxiety': ['anxious-self-reassurance', 'anxious-boundary-setting'],
  'attachment_avoidance': ['avoidant-opening', 'avoidant-empathy'],
  'attachment_fearful': ['fearful-trust-building'],
  'attachment_secure': ['secure-base-strengthening'],
  'dark_narcissism': ['narcissism-empathy'],
  'disc_dominance': ['d-type-softening'],
  'disc_influence': ['i-type-listening'],
  'disc_steadiness': ['s-type-assertiveness'],
  'disc_compliance': ['people-pleaser-detox-a-high'],
}

export const getTrainingsForDimension = (dimension: string, score: number): TrainingProgram[] => {
  const trainingIds = DIMENSION_TO_TRAINING_MAP[dimension] || []
  return ALL_TRAININGS.filter(t => {
    if (!trainingIds.includes(t.id)) return false
    if (!t.targetScoreRange) return true
    const [min, max] = t.targetScoreRange
    return score >= min && score <= max
  })
}

export const getTrainingsForAssessment = (assessmentId: string, dimensions?: Record<string, number>): TrainingProgram[] => {
  const dimensionMap = ASSESSMENT_TO_DIMENSION_MAP[assessmentId]
  if (!dimensionMap) return []
  
  const recommendations: TrainingProgram[] = []
  
  if (dimensions) {
    for (const [dimKey, targetDims] of Object.entries(dimensionMap)) {
      const score = dimensions[dimKey] ?? dimensions[dimKey.toLowerCase()] ?? 0
      
      for (const targetDim of targetDims) {
        const trainings = getTrainingsForDimension(targetDim, score)
        recommendations.push(...trainings)
      }
    }
  }
  
  return [...new Set(recommendations)].slice(0, 6)
}

export const getRecommendedTrainings = (moodLevel?: number, dimensions?: Record<string, number>, assessmentId?: string): TrainingProgram[] => {
  if (assessmentId && dimensions) {
    const fromAssessment = getTrainingsForAssessment(assessmentId, dimensions)
    if (fromAssessment.length > 0) return fromAssessment.slice(0, 5)
  }
  
  let trainings = [...ALL_TRAININGS].filter(t => t.level === 1)
  
  if (dimensions) {
    const dimensionRecommendations: TrainingProgram[] = []
    for (const dim of Object.keys(dimensions)) {
      const matched = getTrainingsForDimension(dim, dimensions[dim])
      dimensionRecommendations.push(...matched)
    }
    if (dimensionRecommendations.length > 0) {
      return [...new Set(dimensionRecommendations)].slice(0, 5)
    }
  }
  
  if (moodLevel !== undefined && moodLevel <= 1) {
    trainings = trainings.filter(t => ['emotion', 'attachment', 'mindfulness'].includes(t.category))
  } else if (moodLevel !== undefined && moodLevel >= 3) {
    trainings = trainings.filter(t => ['cognition', 'social', 'career'].includes(t.category))
  }
  
  return trainings.slice(0, 5)
}

export const getRelatedTrainings = (assessmentId: string): TrainingProgram[] => {
  const relatedTrainings: TrainingProgram[] = []
  
  for (const training of ALL_TRAININGS) {
    if (training.relatedAssessments?.includes(assessmentId)) {
      relatedTrainings.push(training)
    }
  }
  
  return relatedTrainings
}
