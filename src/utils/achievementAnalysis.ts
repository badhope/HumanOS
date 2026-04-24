/**
 * 成就系统高级分析引擎
 * 
 * 本模块实现了完整的成就分析与报告生成系统，包括：
 * 1. 核心分析算法与权重模型
 * 2. 精细化评分区间（15级）
 * 3. 专业词汇库与句式模板库
 * 4. 智能报告生成引擎
 */

// ==================== 一、核心权重模型 ====================

export interface WeightModel {
  dimensionWeights: Record<string, number>
  timeDecayFactor: number
  consistencyBonus: number
  improvementMultiplier: number
  diversityWeight: number
  streakWeight: number
}

export const DEFAULT_WEIGHT_MODEL: WeightModel = {
  dimensionWeights: {
    cognitive: 0.20,
    emotional: 0.20,
    social: 0.15,
    personality: 0.15,
    career: 0.10,
    mental_health: 0.20,
  },
  timeDecayFactor: 0.95,
  consistencyBonus: 1.15,
  improvementMultiplier: 1.25,
  diversityWeight: 0.10,
  streakWeight: 0.08,
}

export interface DimensionCategory {
  id: string
  name: string
  assessments: string[]
  baseWeight: number
  description: string
}

export const DIMENSION_CATEGORIES: DimensionCategory[] = [
  {
    id: 'cognitive',
    name: '认知能力',
    assessments: ['critical-thinking', 'creativity', 'memory', 'learning-style'],
    baseWeight: 0.20,
    description: '逻辑思维、创造力、记忆力等认知功能',
  },
  {
    id: 'emotional',
    name: '情绪智力',
    assessments: ['emotional-intelligence', 'emotional-regulation', 'stress'],
    baseWeight: 0.20,
    description: '情绪识别、理解、管理与运用能力',
  },
  {
    id: 'social',
    name: '社交能力',
    assessments: ['social-wisdom', 'attachment-style', 'leadership'],
    baseWeight: 0.15,
    description: '人际交往、沟通协作、社会适应能力',
  },
  {
    id: 'personality',
    name: '人格特质',
    assessments: ['mbti', 'bigfive', 'values'],
    baseWeight: 0.15,
    description: '稳定的个性特征与行为模式',
  },
  {
    id: 'career',
    name: '职业发展',
    assessments: ['holland', 'work-values', 'career-maturity'],
    baseWeight: 0.10,
    description: '职业兴趣、价值观与发展潜力',
  },
  {
    id: 'mental_health',
    name: '心理健康',
    assessments: ['sas', 'sds', 'wellbeing', 'resilience'],
    baseWeight: 0.20,
    description: '心理状态、压力水平与幸福感',
  },
]

// ==================== 二、精细化评分区间（15级） ====================

export interface FineScoreRange {
  min: number
  max: number
  level: number
  label: string
  description: string
  color: string
  gradient: string
  percentile: string
  traits: string[]
  recommendations: string[]
}

export const FINE_SCORE_RANGES: FineScoreRange[] = [
  {
    min: 0, max: 5, level: 1, label: '极低',
    description: '显著低于平均水平，需要重点关注',
    color: '#dc2626', gradient: 'from-red-700 to-red-600',
    percentile: '0-5%',
    traits: ['需要系统性支持', '基础能力待建立', '发展潜力巨大'],
    recommendations: ['建议从基础开始系统学习', '寻求专业指导', '制定阶段性小目标'],
  },
  {
    min: 6, max: 12, level: 2, label: '很低',
    description: '明显低于平均水平，有较大提升空间',
    color: '#ea580c', gradient: 'from-orange-700 to-orange-600',
    percentile: '5-12%',
    traits: ['存在明显短板', '需要针对性训练', '进步空间广阔'],
    recommendations: ['识别关键薄弱环节', '制定针对性提升计划', '保持耐心和坚持'],
  },
  {
    min: 13, max: 20, level: 3, label: '较低',
    description: '低于平均水平，可通过努力改善',
    color: '#f97316', gradient: 'from-orange-600 to-orange-500',
    percentile: '12-20%',
    traits: ['有改进意愿', '基础尚可', '需要方法指导'],
    recommendations: ['学习有效方法和技巧', '增加实践机会', '建立反馈机制'],
  },
  {
    min: 21, max: 28, level: 4, label: '偏低',
    description: '略低于平均水平，接近正常范围',
    color: '#f59e0b', gradient: 'from-amber-600 to-amber-500',
    percentile: '20-28%',
    traits: ['接近平均水平', '有提升意识', '发展态势良好'],
    recommendations: ['保持学习热情', '寻找榜样学习', '定期自我评估'],
  },
  {
    min: 29, max: 36, level: 5, label: '中下',
    description: '中等偏下水平，处于发展过渡期',
    color: '#eab308', gradient: 'from-yellow-600 to-yellow-500',
    percentile: '28-36%',
    traits: ['发展中的能力', '需要持续投入', '有上升潜力'],
    recommendations: ['制定中期发展目标', '拓展学习资源', '培养良好习惯'],
  },
  {
    min: 37, max: 44, level: 6, label: '中等偏下',
    description: '接近平均水平，有一定基础',
    color: '#ca8a04', gradient: 'from-yellow-500 to-lime-500',
    percentile: '36-44%',
    traits: ['基础能力扎实', '发展较为稳定', '可进一步提升'],
    recommendations: ['巩固现有基础', '探索进阶内容', '寻找突破点'],
  },
  {
    min: 45, max: 52, level: 7, label: '中等',
    description: '处于平均水平，表现正常',
    color: '#84cc16', gradient: 'from-lime-500 to-green-500',
    percentile: '44-52%',
    traits: ['符合大众水平', '发展均衡', '有提升空间'],
    recommendations: ['保持现有水平', '寻找差异化优势', '设定更高目标'],
  },
  {
    min: 53, max: 60, level: 8, label: '中等偏上',
    description: '略高于平均水平，表现良好',
    color: '#22c55e', gradient: 'from-green-500 to-emerald-500',
    percentile: '52-60%',
    traits: ['表现优于多数人', '有一定优势', '发展潜力良好'],
    recommendations: ['发挥现有优势', '弥补潜在短板', '追求更高水平'],
  },
  {
    min: 61, max: 68, level: 9, label: '中上',
    description: '高于平均水平，表现较好',
    color: '#10b981', gradient: 'from-emerald-500 to-teal-500',
    percentile: '60-68%',
    traits: ['能力较为突出', '发展态势良好', '具备竞争优势'],
    recommendations: ['深化专业能力', '拓展应用场景', '培养领导力'],
  },
  {
    min: 69, max: 76, level: 10, label: '较高',
    description: '明显高于平均水平，表现优秀',
    color: '#14b8a6', gradient: 'from-teal-500 to-cyan-500',
    percentile: '68-76%',
    traits: ['优势明显', '发展成熟', '可成为榜样'],
    recommendations: ['持续精进', '分享经验', '指导他人'],
  },
  {
    min: 77, max: 83, level: 11, label: '很高',
    description: '远高于平均水平，表现卓越',
    color: '#06b6d4', gradient: 'from-cyan-500 to-sky-500',
    percentile: '76-83%',
    traits: ['能力出众', '专业水平高', '具有影响力'],
    recommendations: ['追求卓越', '创新突破', '建立个人品牌'],
  },
  {
    min: 84, max: 89, level: 12, label: '极高',
    description: '显著高于平均水平，表现杰出',
    color: '#0ea5e9', gradient: 'from-sky-500 to-blue-500',
    percentile: '83-89%',
    traits: ['顶尖水平', '专业权威', '行业标杆'],
    recommendations: ['引领行业发展', '培养接班人', '创造更大价值'],
  },
  {
    min: 90, max: 94, level: 13, label: '卓越',
    description: '超越绝大多数人，表现非凡',
    color: '#3b82f6', gradient: 'from-blue-500 to-indigo-500',
    percentile: '89-94%',
    traits: ['行业精英', '创新引领者', '卓越贡献者'],
    recommendations: ['持续创新', '影响行业发展', '传承经验智慧'],
  },
  {
    min: 95, max: 98, level: 14, label: '杰出',
    description: '处于顶尖水平，表现非凡',
    color: '#6366f1', gradient: 'from-indigo-500 to-violet-500',
    percentile: '94-98%',
    traits: ['领域专家', '思想领袖', '变革推动者'],
    recommendations: ['引领变革', '塑造未来', '留下持久影响'],
  },
  {
    min: 99, max: 100, level: 15, label: '顶尖',
    description: '达到最高水平，表现极致',
    color: '#8b5cf6', gradient: 'from-violet-500 to-purple-500',
    percentile: '98-100%',
    traits: ['顶尖大师', '行业传奇', '历史创造者'],
    recommendations: ['传承智慧', '开创先河', '影响世代'],
  },
]

export function getFineScoreRange(score: number): FineScoreRange {
  for (const range of FINE_SCORE_RANGES) {
    if (score >= range.min && score <= range.max) {
      return range
    }
  }
  return FINE_SCORE_RANGES[7]
}

// ==================== 三、专业词汇库 ====================

export const VOCABULARY_LIBRARY = {
  adjectives: {
    positive: {
      very_high: [
        '卓越的', '杰出的', '非凡的', '顶尖的', '精湛的',
        '出类拔萃的', '登峰造极的', '炉火纯青的', '登堂入室的', '登峰造极的',
        '无可挑剔的', '令人赞叹的', '叹为观止的', '超凡脱俗的', '登峰造极的',
      ],
      high: [
        '优秀的', '出色的', '突出的', '显著的', '卓越的',
        '令人印象深刻的', '值得称赞的', '令人钦佩的', '超群的', '杰出的',
        '非同凡响的', '出类拔萃的', '独树一帜的', '鹤立鸡群的', '独占鳌头的',
      ],
      medium: [
        '良好的', '不错的', '稳健的', '扎实的', '可靠的',
        '值得肯定的', '有潜力的', '发展中的', '进步中的', '成长中的',
        '稳中有进的', '循序渐进的', '稳扎稳打的', '脚踏实地的', '稳中求进的',
      ],
      low: [
        '有待提升的', '发展中的', '潜力巨大的', '进步空间的', '成长可能的',
        '蓄势待发的', '厚积薄发的', '蓄势待发的', '蓄势待发的', '蓄势待发的',
      ],
    },
    negative: {
      very_high: [
        '亟需关注的', '需要重视的', '亟待改善的', '需要投入的', '值得关注的',
      ],
      high: [
        '有待加强的', '需要改进的', '可以提升的', '存在空间的', '发展可能的',
      ],
      medium: [
        '可以优化的', '有调整空间的', '可以完善的', '有待精进的', '可塑性强',
      ],
      low: [
        '基本达标的', '符合要求的', '满足条件的', '达到标准的', '符合预期的',
      ],
    },
  },
  nouns: {
    abilities: [
      '能力', '素养', '素质', '特质', '品质', '特征', '属性', '倾向', '风格', '模式',
      '潜力', '天赋', '资质', '禀赋', '才能', '本领', '技能', '技巧', '技艺', '造诣',
    ],
    development: [
      '成长', '进步', '提升', '发展', '突破', '飞跃', '蜕变', '升华', '进阶', '精进',
      '积累', '沉淀', '历练', '磨砺', '锤炼', '锻造', '塑造', '培养', '培育', '养成',
    ],
    psychology: [
      '心理特征', '人格特质', '认知模式', '行为倾向', '情绪状态', '思维习惯',
      '价值观念', '人生态度', '处世哲学', '生活智慧', '心理素质', '精神品质',
    ],
  },
  verbs: {
    actions: [
      '展现出', '体现出', '呈现出', '表现出', '反映出', '揭示出', '显示出',
      '彰显出', '流露出', '透露出', '表明', '证明', '证实', '验证', '印证',
    ],
    changes: [
      '提升', '增强', '强化', '巩固', '深化', '拓展', '延伸', '扩展', '扩大',
      '优化', '改善', '改进', '完善', '精进', '突破', '超越', '升华', '蜕变',
    ],
  },
  connectors: {
    transition: [
      '此外', '另外', '同时', '而且', '并且', '更重要的是', '值得注意的是',
      '需要指出的是', '值得一提的是', '不仅如此', '更进一步来说', '从另一个角度看',
    ],
    causation: [
      '因此', '所以', '由此可见', '这表明', '这说明', '这意味着', '基于此',
      '鉴于此', '考虑到这一点', '正因如此', '有鉴于此', '综合来看',
    ],
    emphasis: [
      '特别', '尤其', '值得注意的是', '需要强调的是', '重点在于', '关键在于',
      '核心在于', '本质在于', '根本在于', '重要的是', '关键的是', '核心的是',
    ],
  },
}

// ==================== 四、句式模板库 ====================

export interface SentenceTemplate {
  id: string
  category: 'opening' | 'analysis' | 'strength' | 'weakness' | 'suggestion' | 'closing' | 'transition'
  templates: string[]
  variables: string[]
}

export const SENTENCE_TEMPLATES: SentenceTemplate[] = [
  {
    id: 'opening_general',
    category: 'opening',
    templates: [
      '基于您完成的{assessmentCount}项测评，我们对您的{dimension}进行了全面分析。',
      '通过对您{timeRange}内的测评数据进行深度挖掘，我们发现了以下重要洞察。',
      '综合分析您的测评表现，您的{dimension}呈现出{pattern}的特点。',
      '在本次分析中，我们重点关注了您的{dimension}发展状况，以下是详细解读。',
    ],
    variables: ['assessmentCount', 'timeRange', 'dimension', 'pattern'],
  },
  {
    id: 'opening_score',
    category: 'opening',
    templates: [
      '您的综合得分为{score}分，处于{level}水平，{description}。',
      '测评结果显示，您的{dimension}得分为{score}分，{interpretation}。',
      '在{dimension}方面，您获得了{score}分的成绩，{additionalInfo}。',
    ],
    variables: ['score', 'level', 'description', 'dimension', 'interpretation', 'additionalInfo'],
  },
  {
    id: 'analysis_dimension',
    category: 'analysis',
    templates: [
      '在{dimension}维度上，您表现出{trait}的特征，这表明{implication}。',
      '分析显示，您的{dimension}得分为{score}分，{interpretation}。',
      '从{dimension}角度来看，您的表现{evaluation}，具体表现为{details}。',
      '您的{dimension}处于{level}水平，这意味着{meaning}。',
    ],
    variables: ['dimension', 'trait', 'implication', 'score', 'interpretation', 'evaluation', 'details', 'level', 'meaning'],
  },
  {
    id: 'analysis_trend',
    category: 'analysis',
    templates: [
      '与上次测评相比，您的{dimension}{trend}了{change}分，{interpretation}。',
      '追踪分析显示，您的{dimension}呈现{trendPattern}趋势，这反映了{insight}。',
      '从时间维度来看，您的{dimension}表现{stability}，{suggestion}。',
    ],
    variables: ['dimension', 'trend', 'change', 'interpretation', 'trendPattern', 'insight', 'stability', 'suggestion'],
  },
  {
    id: 'strength_high',
    category: 'strength',
    templates: [
      '您的{strength}表现突出，这是您的核心优势之一。',
      '在{strength}方面，您展现出{level}的能力，这为您{benefit}提供了有力支撑。',
      '{strength}是您的显著优势，您在此方面的表现超越了{percentile}%的人群。',
      '您在{strength}上的卓越表现，使您在{context}中具有独特的竞争优势。',
    ],
    variables: ['strength', 'level', 'benefit', 'percentile', 'context'],
  },
  {
    id: 'strength_moderate',
    category: 'strength',
    templates: [
      '您的{strength}处于良好水平，这是可以进一步发展的潜力领域。',
      '在{strength}方面，您表现出了{trait}，这为您的发展奠定了基础。',
      '{strength}是您的一个稳定优势，保持并深化这一能力将带来长远收益。',
    ],
    variables: ['strength', 'trait'],
  },
  {
    id: 'weakness_low',
    category: 'weakness',
    templates: [
      '您的{weakness}存在提升空间，建议{recommendation}。',
      '在{weakness}方面，您目前的表现{evaluation}，这可能会{impact}。',
      '{weakness}是需要关注的领域，通过{method}可以有效改善。',
      '您的{weakness}得分相对较低，但这恰恰意味着{opportunity}。',
    ],
    variables: ['weakness', 'recommendation', 'evaluation', 'impact', 'method', 'opportunity'],
  },
  {
    id: 'weakness_moderate',
    category: 'weakness',
    templates: [
      '您的{weakness}有优化空间，建议通过{method}进行提升。',
      '在{weakness}方面，您可以通过{action}来进一步增强。',
      '{weakness}是一个可以改进的领域，持续关注将带来显著进步。',
    ],
    variables: ['weakness', 'method', 'action'],
  },
  {
    id: 'suggestion_action',
    category: 'suggestion',
    templates: [
      '建议您{action}，这将有助于{benefit}。',
      '为了提升{dimension}，您可以尝试{method}。',
      '我们推荐您{recommendation}，预期可以{outcome}。',
      '针对{issue}，建议采取以下措施：{measures}。',
    ],
    variables: ['action', 'benefit', 'dimension', 'method', 'recommendation', 'outcome', 'issue', 'measures'],
  },
  {
    id: 'suggestion_longterm',
    category: 'suggestion',
    templates: [
      '从长期发展来看，建议您{longTermAction}。',
      '在未来{timeframe}内，您可以重点关注{focus}。',
      '为了实现{goal}，建议制定{plan}。',
    ],
    variables: ['longTermAction', 'timeframe', 'focus', 'goal', 'plan'],
  },
  {
    id: 'closing_encouragement',
    category: 'closing',
    templates: [
      '总体而言，您在{area}方面展现出{evaluation}，继续保持将取得更大进步。',
      '通过持续努力，您有望在{area}取得突破性进展。',
      '您的{strength}是宝贵财富，而{weakness}则是成长的机会。',
      '期待您在未来的发展中取得更加优异的表现！',
    ],
    variables: ['area', 'evaluation', 'strength', 'weakness'],
  },
  {
    id: 'closing_summary',
    category: 'closing',
    templates: [
      '综合以上分析，您的{dimension}整体表现{overall}，{summary}。',
      '总结来看，您的主要优势在于{strengths}，而{weaknesses}是需要重点发展的领域。',
      '本次分析揭示了您的{count}个核心特征，为您的个人发展提供了重要参考。',
    ],
    variables: ['dimension', 'overall', 'summary', 'strengths', 'weaknesses', 'count'],
  },
  {
    id: 'transition_topic',
    category: 'transition',
    templates: [
      '接下来，让我们深入分析您的{nextTopic}。',
      '在了解了{currentTopic}之后，我们来看看{nextTopic}。',
      '另一个值得关注的维度是{nextTopic}。',
      '与此相关，{relatedTopic}也呈现出有趣的特征。',
    ],
    variables: ['nextTopic', 'currentTopic', 'relatedTopic'],
  },
]

// ==================== 五、表达风格库 ====================

export interface ExpressionStyle {
  id: string
  name: string
  description: string
  tone: 'professional' | 'friendly' | 'encouraging' | 'analytical' | 'inspirational'
  features: {
    sentenceLength: 'short' | 'medium' | 'long' | 'varied'
    vocabularyLevel: 'simple' | 'moderate' | 'advanced' | 'expert'
    emotionIntensity: 'neutral' | 'mild' | 'moderate' | 'strong'
    structureType: 'linear' | 'hierarchical' | 'comparative' | 'narrative'
  }
}

export const EXPRESSION_STYLES: ExpressionStyle[] = [
  {
    id: 'professional',
    name: '专业严谨',
    description: '使用专业术语，逻辑清晰，客观中立',
    tone: 'professional',
    features: {
      sentenceLength: 'medium',
      vocabularyLevel: 'advanced',
      emotionIntensity: 'neutral',
      structureType: 'hierarchical',
    },
  },
  {
    id: 'friendly',
    name: '亲切友好',
    description: '语言通俗易懂，贴近日常，易于理解',
    tone: 'friendly',
    features: {
      sentenceLength: 'short',
      vocabularyLevel: 'simple',
      emotionIntensity: 'mild',
      structureType: 'linear',
    },
  },
  {
    id: 'encouraging',
    name: '鼓励支持',
    description: '积极正面，强调潜力与可能性',
    tone: 'encouraging',
    features: {
      sentenceLength: 'varied',
      vocabularyLevel: 'moderate',
      emotionIntensity: 'moderate',
      structureType: 'narrative',
    },
  },
  {
    id: 'analytical',
    name: '深度分析',
    description: '详细解读，多角度剖析，数据驱动',
    tone: 'analytical',
    features: {
      sentenceLength: 'long',
      vocabularyLevel: 'expert',
      emotionIntensity: 'neutral',
      structureType: 'comparative',
    },
  },
  {
    id: 'inspirational',
    name: '启发激励',
    description: '富有感染力，激发内在动力',
    tone: 'inspirational',
    features: {
      sentenceLength: 'varied',
      vocabularyLevel: 'moderate',
      emotionIntensity: 'strong',
      structureType: 'narrative',
    },
  },
]

// ==================== 六、核心分析算法 ====================

export interface AssessmentRecord {
  id?: string
  assessmentId: string
  completedAt: number
  score: number
  dimensions: { name: string; score: number; maxScore: number }[]
  category: string
}

export interface AnalysisResult {
  overallScore: number
  weightedScore: number
  level: FineScoreRange
  dimensionScores: Record<string, number>
  dimensionLevels: Record<string, FineScoreRange>
  strengths: string[]
  weaknesses: string[]
  trends: {
    dimension: string
    direction: 'improving' | 'declining' | 'stable'
    rate: number
  }[]
  insights: string[]
  recommendations: string[]
  profileSummary: string
  confidenceLevel: number
}

export class AchievementAnalyzer {
  private weightModel: WeightModel
  private records: AssessmentRecord[]

  constructor(records: AssessmentRecord[], weightModel: WeightModel = DEFAULT_WEIGHT_MODEL) {
    this.weightModel = weightModel
    this.records = this.preprocessRecords(records)
  }

  private preprocessRecords(records: AssessmentRecord[]): AssessmentRecord[] {
    return [...records].sort((a, b) => b.completedAt - a.completedAt)
  }

  public analyze(): AnalysisResult {
    const dimensionScores = this.calculateDimensionScores()
    const weightedScore = this.calculateWeightedScore(dimensionScores)
    const overallScore = this.calculateOverallScore()
    const level = getFineScoreRange(weightedScore)
    const dimensionLevels = this.getDimensionLevels(dimensionScores)
    const strengths = this.identifyStrengths(dimensionScores)
    const weaknesses = this.identifyWeaknesses(dimensionScores)
    const trends = this.analyzeTrends()
    const insights = this.generateInsights(dimensionScores, trends)
    const recommendations = this.generateRecommendations(dimensionScores, weaknesses)
    const profileSummary = this.generateProfileSummary(dimensionScores, level)
    const confidenceLevel = this.calculateConfidenceLevel()

    return {
      overallScore,
      weightedScore,
      level,
      dimensionScores,
      dimensionLevels,
      strengths,
      weaknesses,
      trends,
      insights,
      recommendations,
      profileSummary,
      confidenceLevel,
    }
  }

  private calculateDimensionScores(): Record<string, number> {
    const scores: Record<string, number> = {}
    const categoryScores: Record<string, number[]> = {}

    for (const category of DIMENSION_CATEGORIES) {
      categoryScores[category.id] = []
    }

    for (const record of this.records) {
      const category = this.getCategoryForAssessment(record.assessmentId)
      if (category && categoryScores[category]) {
        const normalizedScore = this.normalizeScore(record.score, 100)
        const timeWeight = this.calculateTimeWeight(record.completedAt)
        const weightedScore = normalizedScore * timeWeight
        categoryScores[category].push(weightedScore)
      }
    }

    for (const [category, scoreList] of Object.entries(categoryScores)) {
      if (scoreList.length > 0) {
        scores[category] = Math.round(scoreList.reduce((a, b) => a + b, 0) / scoreList.length)
      }
    }

    return scores
  }

  private calculateWeightedScore(dimensionScores: Record<string, number>): number {
    let totalWeight = 0
    let weightedSum = 0

    for (const [dimension, score] of Object.entries(dimensionScores)) {
      const weight = this.weightModel.dimensionWeights[dimension] || 0.1
      weightedSum += score * weight
      totalWeight += weight
    }

    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0
  }

  private calculateOverallScore(): number {
    if (this.records.length === 0) return 0

    const scores = this.records.map(r => this.normalizeScore(r.score, 100))
    const timeWeights = this.records.map(r => this.calculateTimeWeight(r.completedAt))
    
    let weightedSum = 0
    let totalWeight = 0
    
    for (let i = 0; i < scores.length; i++) {
      weightedSum += scores[i] * timeWeights[i]
      totalWeight += timeWeights[i]
    }

    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0
  }

  private normalizeScore(score: number, maxScore: number): number {
    return Math.min(100, Math.max(0, (score / maxScore) * 100))
  }

  private calculateTimeWeight(timestamp: number): number {
    const now = Date.now()
    const daysDiff = (now - timestamp) / (1000 * 60 * 60 * 24)
    return Math.pow(this.weightModel.timeDecayFactor, daysDiff / 30)
  }

  private getCategoryForAssessment(assessmentId: string): string | null {
    for (const category of DIMENSION_CATEGORIES) {
      if (category.assessments.some(a => assessmentId.includes(a) || a.includes(assessmentId))) {
        return category.id
      }
    }
    return 'personality'
  }

  private getDimensionLevels(dimensionScores: Record<string, number>): Record<string, FineScoreRange> {
    const levels: Record<string, FineScoreRange> = {}
    for (const [dimension, score] of Object.entries(dimensionScores)) {
      levels[dimension] = getFineScoreRange(score)
    }
    return levels
  }

  private identifyStrengths(dimensionScores: Record<string, number>): string[] {
    const sorted = Object.entries(dimensionScores)
      .sort((a, b) => b[1] - a[1])
    
    const strengths: string[] = []
    for (const [dimension, score] of sorted.slice(0, 3)) {
      const category = DIMENSION_CATEGORIES.find(c => c.id === dimension)
      if (category && score >= 60) {
        const level = getFineScoreRange(score)
        strengths.push(`${category.name}（${level.label}水平，超越${100 - parseInt(level.percentile.split('-')[0], 10)}%的人群）`)
      }
    }
    
    return strengths.length > 0 ? strengths : ['持续发展中，潜力可期']
  }

  private identifyWeaknesses(dimensionScores: Record<string, number>): string[] {
    const sorted = Object.entries(dimensionScores)
      .sort((a, b) => a[1] - b[1])
    
    const weaknesses: string[] = []
    for (const [dimension, score] of sorted.slice(0, 2)) {
      const category = DIMENSION_CATEGORIES.find(c => c.id === dimension)
      if (category && score < 50) {
        const level = getFineScoreRange(score)
        weaknesses.push(`${category.name}（${level.label}水平，有较大提升空间）`)
      }
    }
    
    return weaknesses
  }

  private analyzeTrends(): AnalysisResult['trends'] {
    const trends: AnalysisResult['trends'] = []
    
    if (this.records.length < 2) return trends

    const sortedRecords = [...this.records].sort((a, b) => a.completedAt - b.completedAt)
    const firstHalf = sortedRecords.slice(0, Math.floor(sortedRecords.length / 2))
    const secondHalf = sortedRecords.slice(Math.floor(sortedRecords.length / 2))

    const categoryScores: Record<string, { first: number[]; second: number[] }> = {}

    for (const record of firstHalf) {
      const category = this.getCategoryForAssessment(record.assessmentId)
      if (category) {
        if (!categoryScores[category]) categoryScores[category] = { first: [], second: [] }
        categoryScores[category].first.push(this.normalizeScore(record.score, 100))
      }
    }

    for (const record of secondHalf) {
      const category = this.getCategoryForAssessment(record.assessmentId)
      if (category) {
        if (!categoryScores[category]) categoryScores[category] = { first: [], second: [] }
        categoryScores[category].second.push(this.normalizeScore(record.score, 100))
      }
    }

    for (const [category, scores] of Object.entries(categoryScores)) {
      if (scores.first.length > 0 && scores.second.length > 0) {
        const firstAvg = scores.first.reduce((a, b) => a + b, 0) / scores.first.length
        const secondAvg = scores.second.reduce((a, b) => a + b, 0) / scores.second.length
        const diff = secondAvg - firstAvg

        trends.push({
          dimension: category,
          direction: diff > 3 ? 'improving' : diff < -3 ? 'declining' : 'stable',
          rate: Math.abs(Math.round(diff)),
        })
      }
    }

    return trends
  }

  private generateInsights(dimensionScores: Record<string, number>, trends: AnalysisResult['trends']): string[] {
    const insights: string[] = []

    const topDimension = Object.entries(dimensionScores)
      .sort((a, b) => b[1] - a[1])[0]
    
    if (topDimension) {
      const category = DIMENSION_CATEGORIES.find(c => c.id === topDimension[0])
      if (category) {
        insights.push(`您在${category.name}方面表现最为突出，这是您的核心竞争力所在。`)
      }
    }

    const improvingTrends = trends.filter(t => t.direction === 'improving')
    if (improvingTrends.length > 0) {
      const category = DIMENSION_CATEGORIES.find(c => c.id === improvingTrends[0].dimension)
      if (category) {
        insights.push(`您的${category.name}呈现上升趋势，进步幅度达${improvingTrends[0].rate}%，继续保持！`)
      }
    }

    const scoreValues = Object.values(dimensionScores)
    if (scoreValues.length > 0) {
      const maxScore = Math.max(...scoreValues)
      const minScore = Math.min(...scoreValues)
      const balance = maxScore - minScore

      if (balance <= 15) {
        insights.push('您的各项能力发展较为均衡，没有明显的短板，这是很好的基础。')
      } else if (balance >= 30) {
        insights.push('您的各项能力存在较大差异，建议关注发展较弱的领域以实现更全面的成长。')
      }
    }

    if (this.records.length >= 5) {
      insights.push(`您已累计完成${this.records.length}项测评，展现了持续自我探索的积极态度。`)
    }

    return insights
  }

  private generateRecommendations(dimensionScores: Record<string, number>, weaknesses: string[]): string[] {
    const recommendations: string[] = []

    for (const [dimension, score] of Object.entries(dimensionScores)) {
      if (score < 45) {
        const category = DIMENSION_CATEGORIES.find(c => c.id === dimension)
        if (category) {
          const level = getFineScoreRange(score)
          recommendations.push(`针对${category.name}，建议：${level.recommendations.join('；')}`)
        }
      }
    }

    if (recommendations.length === 0) {
      recommendations.push('继续保持现有的良好状态，追求更高水平的发展。')
      recommendations.push('可以尝试挑战更高难度的测评，进一步挖掘自身潜力。')
    }

    recommendations.push('建议定期进行自我评估，追踪个人成长轨迹。')

    return recommendations
  }

  private generateProfileSummary(dimensionScores: Record<string, number>, level: FineScoreRange): string {
    const categoryNames = DIMENSION_CATEGORIES.map(c => c.name)
    const topCategories = Object.entries(dimensionScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([id]) => DIMENSION_CATEGORIES.find(c => c.id === id)?.name)
      .filter(Boolean)

    const summary = `基于您完成的${this.records.length}项测评数据，您的综合心理特征画像如下：

您的整体心理素质处于${level.label}水平，在同龄人中位于${level.percentile}百分位。这表明您${level.description}。

在各项心理维度中，${topCategories.length > 0 ? `您的${topCategories.join('和')}表现最为突出` : '您的各项能力发展较为均衡'}，这些优势为您的生活和工作提供了有力支撑。

从发展趋势来看，您展现出持续成长的态势，具有较大的发展潜力。建议您继续保持自我探索的习惯，关注心理健康，在优势领域深耕的同时，也要注意补齐短板，实现全面发展。`

    return summary
  }

  private calculateConfidenceLevel(): number {
    let confidence = 0

    confidence += Math.min(30, this.records.length * 3)

    const categories = new Set(this.records.map(r => this.getCategoryForAssessment(r.assessmentId)))
    confidence += Math.min(30, categories.size * 6)

    if (this.records.length >= 2) {
      const timeSpan = Math.max(...this.records.map(r => r.completedAt)) - 
                       Math.min(...this.records.map(r => r.completedAt))
      const daysSpan = timeSpan / (1000 * 60 * 60 * 24)
      confidence += Math.min(20, daysSpan / 30 * 5)
    }

    const scores = this.records.map(r => this.normalizeScore(r.score, 100))
    if (scores.length > 1) {
      const mean = scores.reduce((a, b) => a + b, 0) / scores.length
      const variance = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length
      const consistency = Math.max(0, 20 - variance / 10)
      confidence += consistency
    }

    return Math.min(100, Math.round(confidence))
  }
}

// ==================== 七、报告生成引擎 ====================

export class ReportGenerator {
  private vocabulary: typeof VOCABULARY_LIBRARY
  private templates: typeof SENTENCE_TEMPLATES
  private styles: typeof EXPRESSION_STYLES

  constructor() {
    this.vocabulary = VOCABULARY_LIBRARY
    this.templates = SENTENCE_TEMPLATES
    this.styles = EXPRESSION_STYLES
  }

  public generateReport(
    analysis: AnalysisResult,
    style: ExpressionStyle = EXPRESSION_STYLES[0],
    detailLevel: 'brief' | 'standard' | 'detailed' | 'comprehensive' = 'detailed'
  ): string {
    const sections: string[] = []

    sections.push(this.generateOpening(analysis, style))
    sections.push(this.generateScoreOverview(analysis, style))
    
    if (detailLevel !== 'brief') {
      sections.push(this.generateDimensionAnalysis(analysis, style))
    }
    
    sections.push(this.generateStrengthsSection(analysis, style))
    sections.push(this.generateWeaknessesSection(analysis, style))
    
    if (detailLevel === 'detailed' || detailLevel === 'comprehensive') {
      sections.push(this.generateTrendsSection(analysis, style))
    }
    
    sections.push(this.generateRecommendationsSection(analysis, style))
    
    if (detailLevel === 'comprehensive') {
      sections.push(this.generateInsightsSection(analysis, style))
    }
    
    sections.push(this.generateClosing(analysis, style))

    return sections.filter(Boolean).join('\n\n')
  }

  private generateOpening(analysis: AnalysisResult, style: ExpressionStyle): string {
    const templates = this.templates.find(t => t.id === 'opening_general')?.templates || []
    const template = templates[Math.floor(Math.random() * templates.length)]
    
    return template
      .replace('{assessmentCount}', String(this.getRandomElement([3, 5, 8])))
      .replace('{dimension}', '心理特征')
      .replace('{timeRange}', this.getRandomElement(['近一个月', '近三个月', '近期']))
      .replace('{pattern}', this.getRandomElement(['稳定发展', '持续进步', '积极向上']))
  }

  private generateScoreOverview(analysis: AnalysisResult, style: ExpressionStyle): string {
    const { level, weightedScore, confidenceLevel } = analysis
    
    return `## 综合评分概览

您的综合得分为 **${weightedScore}分**，处于**${level.label}**水平（${level.percentile}百分位）。

${level.description}

📊 **置信度：${confidenceLevel}%** ${this.getConfidenceDescription(confidenceLevel)}

${this.generateScoreBar(weightedScore)}`
  }

  private generateScoreBar(score: number): string {
    const filled = Math.round(score / 5)
    const empty = 20 - filled
    return `[\`${'█'.repeat(filled)}${'░'.repeat(empty)}\`] ${score}%`
  }

  private generateDimensionAnalysis(analysis: AnalysisResult, style: ExpressionStyle): string {
    const { dimensionScores, dimensionLevels } = analysis
    const lines: string[] = ['## 各维度详细分析']

    for (const [dimension, score] of Object.entries(dimensionScores)) {
      const category = DIMENSION_CATEGORIES.find(c => c.id === dimension)
      const level = dimensionLevels[dimension]
      
      if (category && level) {
        lines.push(`\n### ${category.name}`)
        lines.push(`得分：${score}分 | 等级：${level.label} | 百分位：${level.percentile}`)
        lines.push(level.description)
        lines.push(`\n**核心特征：** ${level.traits.join('、')}`)
      }
    }

    return lines.join('\n')
  }

  private generateStrengthsSection(analysis: AnalysisResult, style: ExpressionStyle): string {
    const { strengths } = analysis
    
    if (strengths.length === 0) {
      return '## 核心优势\n\n您正在稳步发展中，各项能力具有成长潜力。'
    }

    const lines: string[] = ['## 核心优势', '']
    
    strengths.forEach((strength, index) => {
      lines.push(`${index + 1}. **${strength}**`)
      const adjective = this.getRandomElement(this.vocabulary.adjectives.positive.high)
      lines.push(`   ${adjective}表现，建议继续巩固和深化这一优势。`)
    })

    return lines.join('\n')
  }

  private generateWeaknessesSection(analysis: AnalysisResult, style: ExpressionStyle): string {
    const { weaknesses } = analysis
    
    if (weaknesses.length === 0) {
      return '## 发展空间\n\n您目前没有明显的短板，建议继续保持全面发展。'
    }

    const lines: string[] = ['## 发展空间', '']
    
    weaknesses.forEach((weakness, index) => {
      lines.push(`${index + 1}. **${weakness}**`)
      lines.push(`   ${this.getRandomElement(this.vocabulary.adjectives.positive.low)}，通过针对性训练可以显著改善。`)
    })

    return lines.join('\n')
  }

  private generateTrendsSection(analysis: AnalysisResult, style: ExpressionStyle): string {
    const { trends } = analysis
    
    if (trends.length === 0) {
      return ''
    }

    const lines: string[] = ['## 发展趋势分析', '']
    
    trends.forEach(trend => {
      const category = DIMENSION_CATEGORIES.find(c => c.id === trend.dimension)
      if (category) {
        const directionText = {
          improving: '📈 上升',
          declining: '📉 下降',
          stable: '➡️ 稳定',
        }[trend.direction]
        
        lines.push(`- **${category.name}**：${directionText}趋势，变化率 ${trend.rate}%`)
      }
    })

    return lines.join('\n')
  }

  private generateRecommendationsSection(analysis: AnalysisResult, style: ExpressionStyle): string {
    const { recommendations, level } = analysis
    
    const lines: string[] = ['## 行动建议', '']
    lines.push(`基于您的${level.label}水平表现，我们为您制定以下建议：`)
    lines.push('')
    
    recommendations.forEach((rec, index) => {
      lines.push(`${index + 1}. ${rec}`)
    })

    return lines.join('\n')
  }

  private generateInsightsSection(analysis: AnalysisResult, style: ExpressionStyle): string {
    const { insights } = analysis
    
    const lines: string[] = ['## 深度洞察', '']
    
    insights.forEach(insight => {
      lines.push(`💡 ${insight}`)
    })

    return lines.join('\n')
  }

  private generateClosing(analysis: AnalysisResult, style: ExpressionStyle): string {
    const { level } = analysis
    
    return `---

## 结语

感谢您完成本次心理测评分析。您的${level.label}水平表现展现了${this.getRandomElement(['积极', '稳健', '出色'])}的心理素质。

${this.getRandomElement([
  '持续的自我探索是成长的关键，期待您在未来的发展中取得更大进步！',
  '每一次测评都是认识自己的机会，祝您在人生道路上越走越远！',
  '您的成长潜力巨大，相信通过持续努力，一定能实现更高的目标！',
])}

*本报告由 HumanOS 智能分析系统生成，仅供参考。*`
  }

  private getConfidenceDescription(confidence: number): string {
    if (confidence >= 80) return '（分析结果高度可靠）'
    if (confidence >= 60) return '（分析结果较为可靠）'
    if (confidence >= 40) return '（分析结果基本可靠，建议增加测评数量）'
    return '（分析结果仅供参考，建议完成更多测评以提高准确性）'
  }

  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }
}

// ==================== 八、导出工具函数 ====================

export function analyzeAchievements(records: AssessmentRecord[]): AnalysisResult {
  const analyzer = new AchievementAnalyzer(records)
  return analyzer.analyze()
}

export function generateAchievementReport(
  records: AssessmentRecord[],
  options: {
    style?: ExpressionStyle
    detailLevel?: 'brief' | 'standard' | 'detailed' | 'comprehensive'
  } = {}
): { analysis: AnalysisResult; report: string } {
  const analyzer = new AchievementAnalyzer(records)
  const analysis = analyzer.analyze()
  
  const generator = new ReportGenerator()
  const report = generator.generateReport(
    analysis,
    options.style || EXPRESSION_STYLES[0],
    options.detailLevel || 'detailed'
  )

  return { analysis, report }
}
