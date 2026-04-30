import type { Dimension, TraitScore } from '../../types'

type DimensionWithId = Dimension & { dimensionId?: string; rawScore?: number; percentile?: number }

export interface AssessmentRecord {
  id: string
  assessmentId: string
  assessmentName: string
  completedAt: string
  dimensions: DimensionWithId[]
  traits?: TraitScore[]
  overall?: number
  type?: string
}

export interface GrowthInsight {
  category: string
  level: 'strength' | 'development' | 'warning' | 'excellent'
  score: number
  title: string
  description: string
  relatedAssessments: string[]
}

export interface TrainingSuggestion {
  id: string
  category: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  frequency: string
  relatedDims: string[]
  expectedImprovement: string
  resources?: string[]
}

export interface PersonalGrowthReport {
  summary: {
    strongestAreas: string[]
    focusAreas: string[]
    overallBalance: number
  }
  insights: GrowthInsight[]
  trainingPlan: TrainingSuggestion[]
  nextSteps: string[]
  growthPath: string
}

const DIMENSION_CATEGORIES: Record<string, { name: string; threshold: number }> = {
  resilience: { name: '心理韧性', threshold: 65 },
  emotional: { name: '情绪能力', threshold: 60 },
  social: { name: '社交能力', threshold: 60 },
  cognitive: { name: '认知能力', threshold: 65 },
  motivation: { name: '动机水平', threshold: 60 },
  career: { name: '职业发展', threshold: 60 },
  leadership: { name: '领导力', threshold: 65 },
  values: { name: '价值观', threshold: 50 },
}

const DIMENSION_MAPPING: Record<string, string> = {
  resilience: 'resilience', adaptability: 'resilience', hardiness: 'resilience',
  control: 'resilience', challenge: 'resilience', coping: 'resilience',
  reappraisal: 'emotional', emotional: 'emotional', empathy: 'emotional',
  regulation: 'emotional', selfawareness: 'emotional', selfregulation: 'emotional',
  selfkindness: 'emotional', mindfulness: 'emotional',
  socialskills: 'social', altruism: 'social', individualized: 'social',
  courtesy: 'social', civicvirtue: 'social',
  planning: 'cognitive', monitoring: 'cognitive', evaluation: 'cognitive',
  metacognition: 'cognitive', intellectual: 'cognitive',
  efficacy: 'motivation', hope: 'motivation', optimism: 'motivation',
  inspirational: 'motivation', achievement: 'motivation', internality: 'motivation',
  initiative: 'motivation', initiating: 'motivation',
  concern: 'career', confidence: 'career', curiosity: 'career',
  identifying: 'career', scanning: 'career', persisting: 'career',
  idealized: 'leadership', contingent: 'leadership', management: 'leadership',
  conscientiousness: 'values', selfdirection: 'values', stimulation: 'values',
  hedonism: 'values', power: 'values', security: 'values',
}

function mapDimensionToCategory(dimId: string): string {
  const found = Object.entries(DIMENSION_MAPPING).find(
    ([key]) => dimId.toLowerCase().includes(key)
  )
  return found ? found[1] : 'general'
}

function aggregateScores(records: AssessmentRecord[]) {
  const categoryScores: Record<string, number[]> = {}
  const allDimensions: Record<string, DimensionWithId & { count: number }> = {}

  records.forEach(record => {
    record.dimensions.forEach(dim => {
      const category = mapDimensionToCategory(dim.dimensionId || dim.name || 'general')
      if (!categoryScores[category]) categoryScores[category] = []
      categoryScores[category].push(dim.percentile ?? dim.rawScore ?? dim.score ?? 50)

      const key = `${record.assessmentId}:${dim.dimensionId || dim.name}`
      if (!allDimensions[key]) {
        allDimensions[key] = { ...dim, count: 0 }
      }
      allDimensions[key].count++
    })
  })

  const averages: Record<string, number> = {}
  Object.entries(categoryScores).forEach(([cat, scores]) => {
    averages[cat] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  })

  return { averages, categoryScores, allDimensions }
}

function generateInsights(
  averages: Record<string, number>,
  records: AssessmentRecord[]
): GrowthInsight[] {
  const insights: GrowthInsight[] = []

  Object.entries(averages).forEach(([category, score]) => {
    const info = DIMENSION_CATEGORIES[category] || { name: category, threshold: 60 }
    const catRecords = records.filter(r =>
      r.dimensions.some(d => mapDimensionToCategory(d.dimensionId || d.name || '') === category)
    )

    if (score >= 85) {
      insights.push({
        category,
        level: 'excellent',
        score,
        title: `${info.name}：卓越天赋`,
        description: `你的${info.name}达到了前15%的水平！这是你的核心优势，可以在工作和生活中充分发挥。`,
        relatedAssessments: catRecords.map(r => r.assessmentName),
      })
    } else if (score >= info.threshold + 10) {
      insights.push({
        category,
        level: 'strength',
        score,
        title: `${info.name}：优势领域`,
        description: `${info.name}是你的显著优势。保持并继续发展，可以成为核心竞争力。`,
        relatedAssessments: catRecords.map(r => r.assessmentName),
      })
    } else if (score >= info.threshold - 10) {
      insights.push({
        category,
        level: 'development',
        score,
        title: `${info.name}：发展空间`,
        description: `${info.name}处于中等水平。有针对性的训练可以显著提升这一领域。`,
        relatedAssessments: catRecords.map(r => r.assessmentName),
      })
    } else {
      insights.push({
        category,
        level: 'warning',
        score,
        title: `${info.name}：需要关注`,
        description: `${info.name}相对薄弱。建议优先发展，可以带来最大的边际改善。`,
        relatedAssessments: catRecords.map(r => r.assessmentName),
      })
    }
  })

  return insights.sort((a, b) => b.score - a.score)
}

export const TRAINING_PROGRAMS: TrainingSuggestion[] = [
  {
    id: 'resilience-building',
    category: 'resilience',
    title: '心理韧性建设',
    description: '通过认知重构和暴露训练建立强大的心理韧性',
    difficulty: 'intermediate',
    duration: '4周',
    frequency: '每天15分钟',
    relatedDims: ['resilience', 'hardiness', 'coping', 'control'],
    expectedImprovement: '20-30%心理韧性提升',
    resources: ['ABCDE认知日记法', '压力接种训练', '最小阻力原则'],
  },
  {
    id: 'emotional-regulation',
    category: 'emotional',
    title: '情绪调节大师',
    description: '学习科学的情绪管理技术，掌握认知重评和正念方法',
    difficulty: 'beginner',
    duration: '6周',
    frequency: '每天20分钟',
    relatedDims: ['reappraisal', 'suppression', 'selfregulation', 'mindfulness'],
    expectedImprovement: '情绪波动减少40%，情绪清晰度提升',
    resources: ['RULER情绪模型', '正念呼吸法', '情绪日记'],
  },
  {
    id: 'empathy-training',
    category: 'social',
    title: '同理心与社交技能',
    description: '提升共情能力和社交知觉，建立高质量人际关系',
    difficulty: 'intermediate',
    duration: '8周',
    frequency: '每周3次练习',
    relatedDims: ['empathy', 'socialskills', 'altruism', 'individualized'],
    expectedImprovement: '人际满意度提升50%',
    resources: ['非暴力沟通', '主动倾听技术', '视角转换练习'],
  },
  {
    id: 'metacognition-enhance',
    category: 'cognitive',
    title: '元认知能力升级',
    description: '升级你的操作系统：学会如何学习',
    difficulty: 'advanced',
    duration: '12周',
    frequency: '每天30分钟',
    relatedDims: ['planning', 'monitoring', 'evaluation', 'metacognition'],
    expectedImprovement: '学习效率提升100%',
    resources: ['费曼学习法', '间隔重复', '思维模型100个'],
  },
  {
    id: 'growth-mindset',
    category: 'motivation',
    title: '成长型心态培养',
    description: '从固定型思维转向成长型思维，释放潜能',
    difficulty: 'beginner',
    duration: '4周',
    frequency: '每天10分钟',
    relatedDims: ['growth', 'challenge', 'effort', 'mistakes'],
    expectedImprovement: '挑战接受度提升60%，挫折复原加速',
    resources: ['思维模式：新成功心理学', '失败重构练习', '微成就追踪'],
  },
  {
    id: 'career-design',
    category: 'career',
    title: '职业生涯设计',
    description: '系统化的职业探索与规划，找到并实现理想职业',
    difficulty: 'advanced',
    duration: '12周',
    frequency: '每周6小时',
    relatedDims: ['concern', 'control', 'curiosity', 'confidence'],
    expectedImprovement: '职业满意度提升，收入潜力增加',
    resources: ['职业锚测评', '设计思维工作坊', '价值主张画布'],
  },
  {
    id: 'leadership-essentials',
    category: 'leadership',
    title: '领导力精要',
    description: '从个体贡献者到领导者的核心能力转型',
    difficulty: 'intermediate',
    duration: '8周',
    frequency: '每周5小时+实践',
    relatedDims: ['idealized', 'inspirational', 'contingent', 'management'],
    expectedImprovement: '团队生产力提升30%，下属满意度显著提高',
    resources: ['领导力挑战模型', '情景领导II', '360度反馈'],
  },
  {
    id: 'self-compassion',
    category: 'emotional',
    title: '自我慈悲练习',
    description: '停止自我批评，学会善待自己的科学方法',
    difficulty: 'beginner',
    duration: '4周',
    frequency: '每天15分钟',
    relatedDims: ['selfkindness', 'commonhumanity', 'mindfulness', 'selfjudgment'],
    expectedImprovement: '焦虑抑郁水平显著降低，自我接纳提升',
    resources: ['自我慈悲创始人课程', 'RAIN法', '慈心冥想'],
  },
  {
    id: 'proactive-habits',
    category: 'motivation',
    title: '主动型人格养成',
    description: '从被动反应到主动创造，成为人生的掌舵人',
    difficulty: 'intermediate',
    duration: '6周',
    frequency: '日常践行',
    relatedDims: ['scanning', 'identifying', 'initiating', 'persisting'],
    expectedImprovement: '机会识别能力和执行力大幅提升',
    resources: ['高效能人士的7个习惯', 'WOOP执行法', '实施意图'],
  },
  {
    id: 'conflict-mastery',
    category: 'social',
    title: '冲突管理大师',
    description: '掌握5种冲突处理模式，化冲突为共赢',
    difficulty: 'advanced',
    duration: '6周',
    frequency: '理论+实践',
    relatedDims: ['competing', 'collaborating', 'compromising', 'avoiding'],
    expectedImprovement: '80%冲突得到建设性解决',
    resources: ['关键对话', '利益基础谈判', 'TKI冲突模型'],
  },
]

function generateTrainingPlan(insights: GrowthInsight[], _records: AssessmentRecord[]): TrainingSuggestion[] {
  const plan: TrainingSuggestion[] = []
  const developmentCategories = insights
    .filter(i => i.level === 'development' || i.level === 'warning')
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(i => i.category)

  const strengthCategories = insights
    .filter(i => i.level === 'strength' || i.level === 'excellent')
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(i => i.category)

  developmentCategories.forEach(category => {
    const program = TRAINING_PROGRAMS.find(p => p.category === category)
    if (program && !plan.find(p => p.id === program.id)) {
      plan.push(program)
    }
  })

  strengthCategories.forEach(category => {
    const program = TRAINING_PROGRAMS.find(p => p.category === category)
    if (program && !plan.find(p => p.id === program.id)) {
      plan.push(program)
    }
  })

  if (plan.length === 0) {
    plan.push(TRAINING_PROGRAMS[4], TRAINING_PROGRAMS[1])
  }

  return plan.slice(0, 5)
}

function generateNextSteps(insights: GrowthInsight[]): string[] {
  const steps: string[] = []
  const focusAreas = insights.filter(i => i.level === 'development' || i.level === 'warning')

  if (focusAreas.length > 0) {
    const topFocus = focusAreas.sort((a, b) => a.score - b.score)[0]
    steps.push(
      `本周优先关注：${topFocus.title}。每天花30分钟开始第一个训练模块。`,
      `记录在${topFocus.category}领域的每一个小进步。`
    )
  }

  const strengths = insights.filter(i => i.level === 'strength' || i.level === 'excellent')
  if (strengths.length > 0) {
    steps.push(
      `充分发挥你在 ${strengths.slice(0, 2).map(s => s.category).join('、')} 的优势。`,
      '思考如何用这些优势帮助他人和创造价值。'
    )
  }

  steps.push(
    '每月完成一个追踪测评，量化成长进度。',
    '加入学习社群，获得同伴支持和反馈。'
  )

  return steps
}

function determineGrowthPath(insights: GrowthInsight[]): string {
  const excellent = insights.filter(i => i.level === 'excellent').length
  const strengths = insights.filter(i => i.level === 'strength').length
  const warnings = insights.filter(i => i.level === 'warning').length

  if (excellent >= 3) {
    return '🌟 精英成长者：你在多个领域已达卓越。建议追求人生志业，向导师和影响力方向发展。'
  }
  if (strengths >= 3 && warnings === 0) {
    return '🚀 加速成长者：基础全面，优势明显。可以启动更具挑战性的目标，进入快速上升通道。'
  }
  if (warnings >= 2) {
    return '🌱 筑基阶段：先集中解决短板，建立稳固的心理地基。一个一个攻克，厚积薄发。'
  }
  return '📈 稳步成长者：平衡发展中，继续保持训练节奏，优势与短板兼顾。'
}

export function generatePersonalGrowthReport(
  assessmentRecords: AssessmentRecord[]
): PersonalGrowthReport {
  if (assessmentRecords.length === 0) {
    return {
      summary: {
        strongestAreas: [],
        focusAreas: ['开始第一个测评吧！'],
        overallBalance: 0,
      },
      insights: [],
      trainingPlan: TRAINING_PROGRAMS.slice(0, 3),
      nextSteps: ['完成至少3个核心测评以获取深度分析', '从大五人格、焦虑量表开始'],
      growthPath: '🎯 你的成长旅程即将开始',
    }
  }

  const { averages } = aggregateScores(assessmentRecords)
  const insights = generateInsights(averages, assessmentRecords)
  const trainingPlan = generateTrainingPlan(insights, assessmentRecords)
  const nextSteps = generateNextSteps(insights)
  const growthPath = determineGrowthPath(insights)

  const strongest = insights
    .filter(i => i.level === 'strength' || i.level === 'excellent')
    .slice(0, 3)
    .map(i => i.title)

  const focus = insights
    .filter(i => i.level === 'development' || i.level === 'warning')
    .slice(0, 3)
    .map(i => i.title)

  const scores = Object.values(averages)
  const balance = scores.length > 0
    ? Math.round(100 - (Math.max(...scores) - Math.min(...scores)))
    : 50

  return {
    summary: {
      strongestAreas: strongest.length > 0 ? strongest : ['正在形成中'],
      focusAreas: focus.length > 0 ? focus : ['保持平衡发展'],
      overallBalance: Math.max(0, Math.min(100, balance)),
    },
    insights,
    trainingPlan,
    nextSteps,
    growthPath,
  }
}

export function createGrowthRecorder() {
  const STORAGE_KEY = 'mindmirror-growth-records'

  return {
    save(record: Omit<AssessmentRecord, 'id' | 'completedAt'>): AssessmentRecord {
      const records = this.loadAll()
      const newRecord: AssessmentRecord = {
        ...record,
        id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        completedAt: new Date().toISOString(),
      }
      records.push(newRecord)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
      return newRecord
    },

    loadAll(): AssessmentRecord[] {
      try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
      } catch {
        return []
      }
    },

    remove(recordId: string) {
      const records = this.loadAll().filter(r => r.id !== recordId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
    },

    clearAll() {
      localStorage.removeItem(STORAGE_KEY)
    },

    exportData() {
      return JSON.stringify(this.loadAll(), null, 2)
    },
  }
}
