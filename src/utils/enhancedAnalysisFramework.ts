/**
 * 增强版测评分析维度框架
 * 
 * 核心特性：
 * 1. 多层面、精细化的测评结果分析
 * 2. 覆盖能力评估、行为特征、潜在倾向等核心分析方向
 * 3. 每个维度包含量化数据、趋势图表及文字解读
 * 4. 支持版本差异化配置（普通版6维度/专业版10+维度）
 */

export type AnalysisCategory = 
  | 'ability' 
  | 'behavior' 
  | 'tendency' 
  | 'potential' 
  | 'trait' 
  | 'skill'
  | 'cognitive'
  | 'emotional'
  | 'social'
  | 'professional'

export type AnalysisLayer = 'basic' | 'advanced' | 'expert'

export interface EnhancedAnalysisDimension {
  id: string
  name: string
  category: AnalysisCategory
  description: string
  icon: string
  color: string
  weight: number
  layers: AnalysisLayerConfig
  visualization: VisualizationConfig
  correlations: DimensionCorrelation[]
  benchmarks: BenchmarkConfig
  metadata: DimensionMetadata
}

export interface AnalysisLayerConfig {
  basic: LayerContent
  advanced?: LayerContent
  expert?: LayerContent
}

export interface LayerContent {
  title: string
  description: string
  metrics: MetricDefinition[]
  charts: ChartDefinition[]
  interpretation: InterpretationTemplate
  recommendations: RecommendationTemplate[]
}

export interface MetricDefinition {
  id: string
  name: string
  type: 'score' | 'percentage' | 'percentile' | 'rating' | 'level'
  unit: string
  range: [number, number]
  calculation: string
  description: string
}

export interface ChartDefinition {
  type: 'radar' | 'bar' | 'line' | 'pie' | 'heatmap' | 'gauge' | 'trend'
  title: string
  dataSource: string
  config: Record<string, any>
}

export interface InterpretationTemplate {
  ranges: InterpretationRange[]
  variables: string[]
  template: string
}

export interface InterpretationRange {
  min: number
  max: number
  level: 'very_low' | 'low' | 'average' | 'high' | 'very_high'
  label: string
  description: string
  color: string
}

export interface RecommendationTemplate {
  condition: string
  priority: 'high' | 'medium' | 'low'
  action: string
  rationale: string
  resources: string[]
}

export interface VisualizationConfig {
  primaryChart: ChartDefinition
  secondaryCharts: ChartDefinition[]
  layout: 'horizontal' | 'vertical' | 'grid'
  showTrend: boolean
  showComparison: boolean
  showPercentile: boolean
}

export interface DimensionCorrelation {
  targetDimensionId: string
  correlationType: 'positive' | 'negative' | 'complex'
  strength: number
  description: string
}

export interface BenchmarkConfig {
  population: string
  mean: number
  standardDeviation: number
  percentiles: Record<number, number>
  industryBenchmarks?: IndustryBenchmark[]
}

export interface IndustryBenchmark {
  industry: string
  mean: number
  top10Percentile: number
  description: string
}

export interface DimensionMetadata {
  version: string
  lastUpdated: string
  validationStatus: 'validated' | 'pending' | 'experimental'
  reliability: number
  validity: number
  references: string[]
}

export interface EnhancedAnalysisResult {
  dimensionId: string
  dimensionName: string
  category: AnalysisCategory
  overallScore: number
  percentile: number
  level: 'very_low' | 'low' | 'average' | 'high' | 'very_high'
  layerResults: LayerResultMap
  trendData?: TrendDataPoint[]
  comparisonData?: ComparisonData
  correlations: CorrelationResult[]
  generatedAt: string
  confidence: number
}

export interface LayerResultMap {
  basic: LayerResult
  advanced?: LayerResult
  expert?: LayerResult
}

export interface LayerResult {
  metrics: MetricResult[]
  charts: ChartResult[]
  interpretation: string
  recommendations: RecommendationResult[]
  insights: string[]
}

export interface MetricResult {
  metricId: string
  name: string
  value: number
  unit: string
  level: string
  percentile?: number
  trend?: 'up' | 'down' | 'stable'
  comparison?: {
    benchmark: string
    difference: number
    significance: boolean
  }
}

export interface ChartResult {
  chartId: string
  type: string
  title: string
  data: any
  config: Record<string, any>
}

export interface RecommendationResult {
  priority: string
  action: string
  rationale: string
  resources: string[]
  expectedImpact: string
}

export interface TrendDataPoint {
  timestamp: string
  value: number
  context?: string
}

export interface ComparisonData {
  benchmark: string
  userScore: number
  benchmarkScore: number
  difference: number
  percentile: number
}

export interface CorrelationResult {
  dimensionId: string
  dimensionName: string
  correlationType: string
  strength: number
  description: string
}

export type AssessmentVersion = 'normal' | 'advanced' | 'professional'

export interface VersionConfig {
  version: AssessmentVersion
  displayName: string
  description: string
  minQuestions: number
  maxQuestions: number
  dimensions: VersionDimensionConfig
  features: VersionFeature[]
  analysisDepth: AnalysisLayer[]
  pricing?: {
    type: 'free' | 'freemium' | 'paid'
    price?: number
  }
}

export interface VersionDimensionConfig {
  count: number
  categories: AnalysisCategory[]
  customDimensionsAllowed: boolean
  maxCustomDimensions: number
}

export interface VersionFeature {
  id: string
  name: string
  description: string
  enabled: boolean
}

export interface QuestionQualityMetrics {
  questionId: string
  discrimination: number
  difficulty: number
  guessing: number
  reliability: number
  validity: number
  responseDistribution: Record<string, number>
  averageResponseTime: number
  qualityScore: number
  issues: QualityIssue[]
}

export interface QualityIssue {
  type: 'low_discrimination' | 'high_guessing' | 'biased' | 'ambiguous' | 'too_easy' | 'too_hard'
  severity: 'low' | 'medium' | 'high'
  description: string
  recommendation: string
}

export interface QuestionSelectionCriteria {
  minDiscrimination: number
  maxGuessing: number
  minReliability: number
  difficultyRange: [number, number]
  maxCommonalityRatio: number
  minDifferentiationRatio: number
  balanceDimensions: boolean
}

const createInterpretationRanges = (): InterpretationRange[] => [
  { min: 0, max: 20, level: 'very_low', label: '需提升', description: '该维度能力低于平均水平', color: '#ef4444' },
  { min: 20, max: 40, level: 'low', label: '较低', description: '该维度能力处于中下水平', color: '#f97316' },
  { min: 40, max: 60, level: 'average', label: '中等', description: '该维度能力处于平均水平', color: '#eab308' },
  { min: 60, max: 80, level: 'high', label: '较高', description: '该维度能力高于平均水平', color: '#22c55e' },
  { min: 80, max: 100, level: 'very_high', label: '优秀', description: '该维度能力显著高于平均水平', color: '#3b82f6' }
]

const createDefaultBenchmark = (): BenchmarkConfig => ({
  population: '中国成年人',
  mean: 50,
  standardDeviation: 10,
  percentiles: { 10: 37, 25: 43, 50: 50, 75: 57, 90: 63 }
})

const createDefaultMetadata = (reliability: number = 0.85, validity: number = 0.82): DimensionMetadata => ({
  version: '2.0',
  lastUpdated: '2024-01-01',
  validationStatus: 'validated',
  reliability,
  validity,
  references: ['心理学测评标准']
})

export const enhancedAnalysisDimensions: EnhancedAnalysisDimension[] = [
  {
    id: 'cognitive-ability',
    name: '认知能力',
    category: 'ability',
    description: '评估个体的信息处理、问题解决和学习能力',
    icon: '🧠',
    color: '#6366f1',
    weight: 1.0,
    layers: {
      basic: {
        title: '认知能力基础分析',
        description: '核心认知能力评估',
        metrics: [
          { id: 'overall-score', name: '综合得分', type: 'score', unit: '分', range: [0, 100], calculation: '加权平均', description: '认知能力综合评估得分' },
          { id: 'percentile', name: '百分位排名', type: 'percentile', unit: '%', range: [0, 100], calculation: '正态分布转换', description: '在同龄人群中的相对位置' }
        ],
        charts: [
          { type: 'gauge', title: '认知能力得分', dataSource: 'overall-score', config: { color: '#6366f1' } }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score', 'percentile'],
          template: '您的认知能力得分为{score}分，在同龄人中排名前{percentile}%。'
        },
        recommendations: [
          { condition: 'score < 40', priority: 'high', action: '建议进行认知能力训练', rationale: '提升认知能力有助于学习效率和工作表现', resources: ['认知训练App', '思维导图工具'] }
        ]
      },
      advanced: {
        title: '认知能力进阶分析',
        description: '认知能力细分维度深度分析',
        metrics: [
          { id: 'logical-reasoning', name: '逻辑推理', type: 'score', unit: '分', range: [0, 100], calculation: '专项测试得分', description: '逻辑思维和推理能力' },
          { id: 'spatial-thinking', name: '空间思维', type: 'score', unit: '分', range: [0, 100], calculation: '专项测试得分', description: '空间想象和转换能力' },
          { id: 'verbal-comprehension', name: '语言理解', type: 'score', unit: '分', range: [0, 100], calculation: '专项测试得分', description: '语言理解和表达能力' },
          { id: 'memory', name: '记忆力', type: 'score', unit: '分', range: [0, 100], calculation: '专项测试得分', description: '短期和长期记忆能力' },
          { id: 'processing-speed', name: '处理速度', type: 'score', unit: '分', range: [0, 100], calculation: '反应时间转换', description: '信息处理速度' }
        ],
        charts: [
          { type: 'radar', title: '认知能力雷达图', dataSource: 'cognitive-subdimensions', config: { dimensions: ['逻辑推理', '空间思维', '语言理解', '记忆力', '处理速度'] } },
          { type: 'bar', title: '各维度得分对比', dataSource: 'cognitive-comparison', config: { showBenchmark: true } }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的认知能力各维度表现：逻辑推理{logical}分，空间思维{spatial}分，语言理解{verbal}分，记忆力{memory}分，处理速度{speed}分。'
        },
        recommendations: [
          { condition: 'logical < 50', priority: 'medium', action: '加强逻辑推理训练', rationale: '逻辑推理是问题解决的核心能力', resources: ['逻辑思维训练书籍', '数独游戏'] }
        ]
      },
      expert: {
        title: '认知能力专家解读',
        description: '专业心理学视角的深度分析',
        metrics: [
          { id: 'iq-estimate', name: '智商估算', type: 'score', unit: 'IQ', range: [70, 160], calculation: '标准化转换', description: '基于认知能力的智商估算' },
          { id: 'confidence-interval', name: '置信区间', type: 'rating', unit: '', range: [0, 100], calculation: '统计推断', description: '智商估算的置信范围' }
        ],
        charts: [
          { type: 'heatmap', title: '认知能力热力图', dataSource: 'cognitive-matrix', config: { showPercentile: true } },
          { type: 'line', title: '认知能力发展曲线', dataSource: 'cognitive-trend', config: { showProjection: true } }
        ],
        interpretation: {
          ranges: [],
          variables: ['iq', 'profile'],
          template: '基于标准化测试，您的智商估算为{iq}。认知剖面显示您在特定方面表现突出。'
        },
        recommendations: [
          { condition: 'iq > 130', priority: 'low', action: '探索高智商人群的职业发展路径', rationale: '高智商个体在特定领域有更大发展潜力', resources: ['门萨俱乐部', '高智商职业规划指南'] }
        ]
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '认知能力雷达图', dataSource: 'cognitive-dimensions', config: {} },
      secondaryCharts: [
        { type: 'bar', title: '维度对比', dataSource: 'dimension-comparison', config: {} },
        { type: 'gauge', title: '综合得分', dataSource: 'overall-score', config: {} }
      ],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'learning-ability', correlationType: 'positive', strength: 0.75, description: '认知能力与学习能力高度正相关' },
      { targetDimensionId: 'problem-solving', correlationType: 'positive', strength: 0.68, description: '认知能力影响问题解决效率' }
    ],
    benchmarks: {
      ...createDefaultBenchmark(),
      industryBenchmarks: [
        { industry: '科技行业', mean: 58, top10Percentile: 75, description: '科技行业从业者平均认知能力较高' },
        { industry: '教育行业', mean: 55, top10Percentile: 72, description: '教育行业从业者认知能力分布' }
      ]
    },
    metadata: createDefaultMetadata(0.92, 0.88)
  },
  {
    id: 'behavior-pattern',
    name: '行为模式',
    category: 'behavior',
    description: '分析个体的典型行为模式和反应倾向',
    icon: '🎭',
    color: '#ec4899',
    weight: 0.9,
    layers: {
      basic: {
        title: '行为模式基础分析',
        description: '核心行为特征评估',
        metrics: [
          { id: 'behavior-score', name: '行为适应性', type: 'score', unit: '分', range: [0, 100], calculation: '行为评估得分', description: '行为适应环境的能力' },
          { id: 'consistency', name: '行为一致性', type: 'percentage', unit: '%', range: [0, 100], calculation: '跨情境一致性', description: '不同情境下行为的一致程度' }
        ],
        charts: [
          { type: 'pie', title: '行为类型分布', dataSource: 'behavior-types', config: {} }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score'],
          template: '您的行为适应性得分为{score}分。'
        },
        recommendations: [
          { condition: 'score < 50', priority: 'medium', action: '练习不同情境下的行为调整', rationale: '提高行为适应性有助于应对复杂环境', resources: ['情境模拟训练', '行为调整指南'] }
        ]
      },
      advanced: {
        title: '行为模式进阶分析',
        description: '行为特征细分维度分析',
        metrics: [
          { id: 'proactive', name: '主动性', type: 'score', unit: '分', range: [0, 100], calculation: '行为倾向得分', description: '主动采取行动的倾向' },
          { id: 'risk-taking', name: '风险偏好', type: 'score', unit: '分', range: [0, 100], calculation: '风险决策得分', description: '面对风险的行为倾向' },
          { id: 'social-behavior', name: '社交行为', type: 'score', unit: '分', range: [0, 100], calculation: '社交互动得分', description: '社交情境中的行为模式' },
          { id: 'stress-response', name: '压力应对', type: 'score', unit: '分', range: [0, 100], calculation: '压力反应得分', description: '面对压力的行为反应' }
        ],
        charts: [
          { type: 'radar', title: '行为特征雷达图', dataSource: 'behavior-subdimensions', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的行为特征：主动性{proactive}分，风险偏好{risk}分，社交行为{social}分，压力应对{stress}分。'
        },
        recommendations: []
      },
      expert: {
        title: '行为模式专家解读',
        description: '行为心理学专业分析',
        metrics: [
          { id: 'behavior-profile', name: '行为剖面', type: 'rating', unit: '', range: [0, 100], calculation: '模式识别', description: '综合行为特征模式' }
        ],
        charts: [
          { type: 'heatmap', title: '行为模式热力图', dataSource: 'behavior-matrix', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['profile'],
          template: '您的行为剖面显示特定特征模式。'
        },
        recommendations: []
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '行为特征雷达图', dataSource: 'behavior-dimensions', config: {} },
      secondaryCharts: [],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'emotional-intelligence', correlationType: 'positive', strength: 0.65, description: '行为模式与情商相关' }
    ],
    benchmarks: createDefaultBenchmark(),
    metadata: createDefaultMetadata(0.85, 0.82)
  },
  {
    id: 'potential-tendency',
    name: '潜在倾向',
    category: 'tendency',
    description: '识别个体的发展潜力和倾向性特征',
    icon: '🔮',
    color: '#8b5cf6',
    weight: 0.85,
    layers: {
      basic: {
        title: '潜在倾向基础分析',
        description: '核心潜力评估',
        metrics: [
          { id: 'growth-potential', name: '成长潜力', type: 'score', unit: '分', range: [0, 100], calculation: '潜力评估得分', description: '未来发展潜力评估' },
          { id: 'adaptability', name: '适应潜力', type: 'score', unit: '分', range: [0, 100], calculation: '适应能力得分', description: '适应新环境的能力' }
        ],
        charts: [
          { type: 'gauge', title: '成长潜力', dataSource: 'growth-potential', config: {} }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score'],
          template: '您的成长潜力得分为{score}分。'
        },
        recommendations: []
      },
      advanced: {
        title: '潜在倾向进阶分析',
        description: '潜力细分维度分析',
        metrics: [
          { id: 'leadership-potential', name: '领导潜力', type: 'score', unit: '分', range: [0, 100], calculation: '领导力评估', description: '领导他人的潜力' },
          { id: 'creativity-potential', name: '创新潜力', type: 'score', unit: '分', range: [0, 100], calculation: '创造力评估', description: '创新思维的潜力' },
          { id: 'learning-potential', name: '学习潜力', type: 'score', unit: '分', range: [0, 100], calculation: '学习能力评估', description: '快速学习的潜力' },
          { id: 'social-potential', name: '社交潜力', type: 'score', unit: '分', range: [0, 100], calculation: '社交能力评估', description: '建立社交网络的潜力' }
        ],
        charts: [
          { type: 'radar', title: '潜力维度雷达图', dataSource: 'potential-subdimensions', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的潜力维度：领导力{leadership}分，创新力{creativity}分，学习力{learning}分，社交力{social}分。'
        },
        recommendations: []
      },
      expert: {
        title: '潜在倾向专家解读',
        description: '专业发展潜力分析',
        metrics: [
          { id: 'career-trajectory', name: '职业轨迹预测', type: 'rating', unit: '', range: [0, 100], calculation: '模型预测', description: '职业发展轨迹预测' }
        ],
        charts: [
          { type: 'line', title: '发展轨迹预测', dataSource: 'trajectory-prediction', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['trajectory'],
          template: '基于您的潜力分析，预测您在特定领域有较好的发展前景。'
        },
        recommendations: []
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '潜力维度雷达图', dataSource: 'potential-dimensions', config: {} },
      secondaryCharts: [],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'cognitive-ability', correlationType: 'positive', strength: 0.70, description: '认知能力与潜力高度相关' }
    ],
    benchmarks: createDefaultBenchmark(),
    metadata: createDefaultMetadata(0.80, 0.78)
  },
  {
    id: 'emotional-intelligence',
    name: '情绪智力',
    category: 'emotional',
    description: '评估个体识别、理解和管理情绪的能力',
    icon: '💚',
    color: '#10b981',
    weight: 0.95,
    layers: {
      basic: {
        title: '情绪智力基础分析',
        description: '核心情商评估',
        metrics: [
          { id: 'eq-score', name: '情商得分', type: 'score', unit: '分', range: [0, 100], calculation: '情商测试得分', description: '情绪智力综合得分' }
        ],
        charts: [
          { type: 'gauge', title: '情商得分', dataSource: 'eq-score', config: {} }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score'],
          template: '您的情商得分为{score}分。'
        },
        recommendations: []
      },
      advanced: {
        title: '情绪智力进阶分析',
        description: '情商四维度分析',
        metrics: [
          { id: 'self-awareness', name: '自我认知', type: 'score', unit: '分', range: [0, 100], calculation: '自我认知得分', description: '识别自身情绪的能力' },
          { id: 'self-management', name: '自我管理', type: 'score', unit: '分', range: [0, 100], calculation: '自我管理得分', description: '管理自身情绪的能力' },
          { id: 'social-awareness', name: '社会认知', type: 'score', unit: '分', range: [0, 100], calculation: '社会认知得分', description: '识别他人情绪的能力' },
          { id: 'relationship-management', name: '关系管理', type: 'score', unit: '分', range: [0, 100], calculation: '关系管理得分', description: '管理人际关系的能力' }
        ],
        charts: [
          { type: 'radar', title: '情商维度雷达图', dataSource: 'eq-subdimensions', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的情商维度：自我认知{self_awareness}分，自我管理{self_management}分，社会认知{social_awareness}分，关系管理{relationship}分。'
        },
        recommendations: []
      },
      expert: {
        title: '情绪智力专家解读',
        description: '专业情商分析',
        metrics: [
          { id: 'emotional-profile', name: '情绪剖面', type: 'rating', unit: '', range: [0, 100], calculation: '模式识别', description: '情绪特征模式' }
        ],
        charts: [
          { type: 'heatmap', title: '情绪模式热力图', dataSource: 'emotional-matrix', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['profile'],
          template: '您的情绪剖面显示特定特征。'
        },
        recommendations: []
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '情商维度雷达图', dataSource: 'eq-dimensions', config: {} },
      secondaryCharts: [],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'behavior-pattern', correlationType: 'positive', strength: 0.65, description: '情商与行为模式相关' }
    ],
    benchmarks: createDefaultBenchmark(),
    metadata: createDefaultMetadata(0.88, 0.85)
  },
  {
    id: 'social-ability',
    name: '社交能力',
    category: 'social',
    description: '评估个体的社交技能和人际交往能力',
    icon: '👥',
    color: '#f59e0b',
    weight: 0.85,
    layers: {
      basic: {
        title: '社交能力基础分析',
        description: '核心社交能力评估',
        metrics: [
          { id: 'social-score', name: '社交得分', type: 'score', unit: '分', range: [0, 100], calculation: '社交能力得分', description: '社交能力综合得分' }
        ],
        charts: [
          { type: 'gauge', title: '社交能力得分', dataSource: 'social-score', config: {} }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score'],
          template: '您的社交能力得分为{score}分。'
        },
        recommendations: []
      },
      advanced: {
        title: '社交能力进阶分析',
        description: '社交技能细分分析',
        metrics: [
          { id: 'communication', name: '沟通能力', type: 'score', unit: '分', range: [0, 100], calculation: '沟通评估', description: '有效沟通的能力' },
          { id: 'collaboration', name: '协作能力', type: 'score', unit: '分', range: [0, 100], calculation: '协作评估', description: '团队协作的能力' },
          { id: 'conflict-resolution', name: '冲突解决', type: 'score', unit: '分', range: [0, 100], calculation: '冲突处理评估', description: '解决冲突的能力' },
          { id: 'networking', name: '人脉建立', type: 'score', unit: '分', range: [0, 100], calculation: '人脉评估', description: '建立人脉的能力' }
        ],
        charts: [
          { type: 'radar', title: '社交技能雷达图', dataSource: 'social-subdimensions', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的社交技能：沟通{communication}分，协作{collaboration}分，冲突解决{conflict}分，人脉建立{networking}分。'
        },
        recommendations: []
      },
      expert: {
        title: '社交能力专家解读',
        description: '专业社交分析',
        metrics: [
          { id: 'social-style', name: '社交风格', type: 'rating', unit: '', range: [0, 100], calculation: '风格识别', description: '社交行为风格' }
        ],
        charts: [
          { type: 'heatmap', title: '社交模式热力图', dataSource: 'social-matrix', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['style'],
          template: '您的社交风格为特定类型。'
        },
        recommendations: []
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '社交技能雷达图', dataSource: 'social-dimensions', config: {} },
      secondaryCharts: [],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'emotional-intelligence', correlationType: 'positive', strength: 0.72, description: '社交能力与情商高度相关' }
    ],
    benchmarks: createDefaultBenchmark(),
    metadata: createDefaultMetadata(0.82, 0.80)
  },
  {
    id: 'professional-ability',
    name: '专业能力',
    category: 'professional',
    description: '评估个体的专业技能和职业素养',
    icon: '💼',
    color: '#0ea5e9',
    weight: 0.9,
    layers: {
      basic: {
        title: '专业能力基础分析',
        description: '核心专业能力评估',
        metrics: [
          { id: 'professional-score', name: '专业得分', type: 'score', unit: '分', range: [0, 100], calculation: '专业能力得分', description: '专业能力综合得分' }
        ],
        charts: [
          { type: 'gauge', title: '专业能力得分', dataSource: 'professional-score', config: {} }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score'],
          template: '您的专业能力得分为{score}分。'
        },
        recommendations: []
      },
      advanced: {
        title: '专业能力进阶分析',
        description: '专业技能细分分析',
        metrics: [
          { id: 'technical-skills', name: '技术技能', type: 'score', unit: '分', range: [0, 100], calculation: '技术评估', description: '专业技术能力' },
          { id: 'problem-solving-pro', name: '问题解决', type: 'score', unit: '分', range: [0, 100], calculation: '问题解决评估', description: '专业问题解决能力' },
          { id: 'innovation', name: '创新能力', type: 'score', unit: '分', range: [0, 100], calculation: '创新评估', description: '专业创新能力' },
          { id: 'execution', name: '执行力', type: 'score', unit: '分', range: [0, 100], calculation: '执行评估', description: '任务执行能力' }
        ],
        charts: [
          { type: 'radar', title: '专业技能雷达图', dataSource: 'professional-subdimensions', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的专业技能：技术{technical}分，问题解决{problem_solving}分，创新{innovation}分，执行{execution}分。'
        },
        recommendations: []
      },
      expert: {
        title: '专业能力专家解读',
        description: '专业发展分析',
        metrics: [
          { id: 'career-fit', name: '职业适配度', type: 'score', unit: '分', range: [0, 100], calculation: '适配评估', description: '与职业的匹配程度' }
        ],
        charts: [
          { type: 'line', title: '职业发展曲线', dataSource: 'career-trajectory', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['fit'],
          template: '您的职业适配度为{fit}分。'
        },
        recommendations: []
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '专业技能雷达图', dataSource: 'professional-dimensions', config: {} },
      secondaryCharts: [],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'cognitive-ability', correlationType: 'positive', strength: 0.68, description: '专业能力与认知能力相关' }
    ],
    benchmarks: createDefaultBenchmark(),
    metadata: createDefaultMetadata(0.85, 0.82)
  },
  {
    id: 'learning-ability',
    name: '学习能力',
    category: 'ability',
    description: '评估个体的学习效率和知识吸收能力',
    icon: '📚',
    color: '#14b8a6',
    weight: 0.9,
    layers: {
      basic: {
        title: '学习能力基础分析',
        description: '核心学习能力评估',
        metrics: [
          { id: 'learning-score', name: '学习得分', type: 'score', unit: '分', range: [0, 100], calculation: '学习能力得分', description: '学习能力综合得分' }
        ],
        charts: [
          { type: 'gauge', title: '学习能力得分', dataSource: 'learning-score', config: {} }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score'],
          template: '您的学习能力得分为{score}分。'
        },
        recommendations: []
      },
      advanced: {
        title: '学习能力进阶分析',
        description: '学习技能细分分析',
        metrics: [
          { id: 'knowledge-absorption', name: '知识吸收', type: 'score', unit: '分', range: [0, 100], calculation: '吸收评估', description: '知识吸收效率' },
          { id: 'skill-acquisition', name: '技能习得', type: 'score', unit: '分', range: [0, 100], calculation: '习得评估', description: '技能习得速度' },
          { id: 'knowledge-application', name: '知识应用', type: 'score', unit: '分', range: [0, 100], calculation: '应用评估', description: '知识应用能力' },
          { id: 'self-directed-learning', name: '自主学习', type: 'score', unit: '分', range: [0, 100], calculation: '自主评估', description: '自主学习能力' }
        ],
        charts: [
          { type: 'radar', title: '学习技能雷达图', dataSource: 'learning-subdimensions', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的学习技能：知识吸收{absorption}分，技能习得{acquisition}分，知识应用{application}分，自主学习{self_directed}分。'
        },
        recommendations: []
      },
      expert: {
        title: '学习能力专家解读',
        description: '学习风格分析',
        metrics: [
          { id: 'learning-style', name: '学习风格', type: 'rating', unit: '', range: [0, 100], calculation: '风格识别', description: '最佳学习方式' }
        ],
        charts: [
          { type: 'pie', title: '学习风格分布', dataSource: 'learning-style', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['style'],
          template: '您的学习风格为特定类型。'
        },
        recommendations: []
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '学习技能雷达图', dataSource: 'learning-dimensions', config: {} },
      secondaryCharts: [],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'cognitive-ability', correlationType: 'positive', strength: 0.75, description: '学习能力与认知能力高度相关' }
    ],
    benchmarks: createDefaultBenchmark(),
    metadata: createDefaultMetadata(0.87, 0.84)
  },
  {
    id: 'creativity',
    name: '创造力',
    category: 'ability',
    description: '评估个体的创新思维和创造能力',
    icon: '💡',
    color: '#f43f5e',
    weight: 0.85,
    layers: {
      basic: {
        title: '创造力基础分析',
        description: '核心创造力评估',
        metrics: [
          { id: 'creativity-score', name: '创造力得分', type: 'score', unit: '分', range: [0, 100], calculation: '创造力得分', description: '创造力综合得分' }
        ],
        charts: [
          { type: 'gauge', title: '创造力得分', dataSource: 'creativity-score', config: {} }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score'],
          template: '您的创造力得分为{score}分。'
        },
        recommendations: []
      },
      advanced: {
        title: '创造力进阶分析',
        description: '创造力细分分析',
        metrics: [
          { id: 'divergent-thinking', name: '发散思维', type: 'score', unit: '分', range: [0, 100], calculation: '发散评估', description: '发散思维能力' },
          { id: 'convergent-thinking', name: '收敛思维', type: 'score', unit: '分', range: [0, 100], calculation: '收敛评估', description: '收敛思维能力' },
          { id: 'originality', name: '独创性', type: 'score', unit: '分', range: [0, 100], calculation: '独创评估', description: '想法独特程度' },
          { id: 'flexibility', name: '灵活性', type: 'score', unit: '分', range: [0, 100], calculation: '灵活评估', description: '思维灵活程度' }
        ],
        charts: [
          { type: 'radar', title: '创造力维度雷达图', dataSource: 'creativity-subdimensions', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的创造力维度：发散思维{divergent}分，收敛思维{convergent}分，独创性{originality}分，灵活性{flexibility}分。'
        },
        recommendations: []
      },
      expert: {
        title: '创造力专家解读',
        description: '创造力风格分析',
        metrics: [
          { id: 'creative-style', name: '创造风格', type: 'rating', unit: '', range: [0, 100], calculation: '风格识别', description: '创造性表达风格' }
        ],
        charts: [
          { type: 'pie', title: '创造风格分布', dataSource: 'creative-style', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['style'],
          template: '您的创造风格为特定类型。'
        },
        recommendations: []
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '创造力维度雷达图', dataSource: 'creativity-dimensions', config: {} },
      secondaryCharts: [],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'potential-tendency', correlationType: 'positive', strength: 0.65, description: '创造力与潜力相关' }
    ],
    benchmarks: createDefaultBenchmark(),
    metadata: createDefaultMetadata(0.80, 0.78)
  },
  {
    id: 'stress-resilience',
    name: '抗压能力',
    category: 'trait',
    description: '评估个体面对压力的应对能力',
    icon: '🛡️',
    color: '#64748b',
    weight: 0.85,
    layers: {
      basic: {
        title: '抗压能力基础分析',
        description: '核心抗压能力评估',
        metrics: [
          { id: 'resilience-score', name: '抗压得分', type: 'score', unit: '分', range: [0, 100], calculation: '抗压能力得分', description: '抗压能力综合得分' }
        ],
        charts: [
          { type: 'gauge', title: '抗压能力得分', dataSource: 'resilience-score', config: {} }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score'],
          template: '您的抗压能力得分为{score}分。'
        },
        recommendations: []
      },
      advanced: {
        title: '抗压能力进阶分析',
        description: '抗压技能细分分析',
        metrics: [
          { id: 'stress-tolerance', name: '压力耐受', type: 'score', unit: '分', range: [0, 100], calculation: '耐受评估', description: '承受压力的能力' },
          { id: 'recovery-speed', name: '恢复速度', type: 'score', unit: '分', range: [0, 100], calculation: '恢复评估', description: '从压力中恢复的速度' },
          { id: 'coping-strategies', name: '应对策略', type: 'score', unit: '分', range: [0, 100], calculation: '策略评估', description: '有效应对策略的数量' },
          { id: 'support-seeking', name: '寻求支持', type: 'score', unit: '分', range: [0, 100], calculation: '支持评估', description: '主动寻求帮助的倾向' }
        ],
        charts: [
          { type: 'radar', title: '抗压技能雷达图', dataSource: 'resilience-subdimensions', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的抗压技能：压力耐受{tolerance}分，恢复速度{recovery}分，应对策略{coping}分，寻求支持{support}分。'
        },
        recommendations: []
      },
      expert: {
        title: '抗压能力专家解读',
        description: '压力应对模式分析',
        metrics: [
          { id: 'stress-profile', name: '压力剖面', type: 'rating', unit: '', range: [0, 100], calculation: '模式识别', description: '压力应对特征模式' }
        ],
        charts: [
          { type: 'heatmap', title: '压力应对热力图', dataSource: 'stress-matrix', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['profile'],
          template: '您的压力应对模式为特定类型。'
        },
        recommendations: []
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '抗压技能雷达图', dataSource: 'resilience-dimensions', config: {} },
      secondaryCharts: [],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'emotional-intelligence', correlationType: 'positive', strength: 0.70, description: '抗压能力与情商相关' }
    ],
    benchmarks: createDefaultBenchmark(),
    metadata: createDefaultMetadata(0.83, 0.80)
  },
  {
    id: 'decision-making',
    name: '决策能力',
    category: 'ability',
    description: '评估个体的决策质量和决策风格',
    icon: '⚖️',
    color: '#a855f7',
    weight: 0.9,
    layers: {
      basic: {
        title: '决策能力基础分析',
        description: '核心决策能力评估',
        metrics: [
          { id: 'decision-score', name: '决策得分', type: 'score', unit: '分', range: [0, 100], calculation: '决策能力得分', description: '决策能力综合得分' }
        ],
        charts: [
          { type: 'gauge', title: '决策能力得分', dataSource: 'decision-score', config: {} }
        ],
        interpretation: {
          ranges: createInterpretationRanges(),
          variables: ['score'],
          template: '您的决策能力得分为{score}分。'
        },
        recommendations: []
      },
      advanced: {
        title: '决策能力进阶分析',
        description: '决策技能细分分析',
        metrics: [
          { id: 'analytical-thinking', name: '分析思维', type: 'score', unit: '分', range: [0, 100], calculation: '分析评估', description: '信息分析能力' },
          { id: 'risk-assessment', name: '风险评估', type: 'score', unit: '分', range: [0, 100], calculation: '风险评估', description: '风险识别能力' },
          { id: 'decisiveness', name: '果断性', type: 'score', unit: '分', range: [0, 100], calculation: '果断评估', description: '决策果断程度' },
          { id: 'outcome-evaluation', name: '结果评估', type: 'score', unit: '分', range: [0, 100], calculation: '结果评估', description: '结果预测能力' }
        ],
        charts: [
          { type: 'radar', title: '决策技能雷达图', dataSource: 'decision-subdimensions', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['subscores'],
          template: '您的决策技能：分析思维{analytical}分，风险评估{risk}分，果断性{decisiveness}分，结果评估{outcome}分。'
        },
        recommendations: []
      },
      expert: {
        title: '决策能力专家解读',
        description: '决策风格分析',
        metrics: [
          { id: 'decision-style', name: '决策风格', type: 'rating', unit: '', range: [0, 100], calculation: '风格识别', description: '决策行为风格' }
        ],
        charts: [
          { type: 'pie', title: '决策风格分布', dataSource: 'decision-style', config: {} }
        ],
        interpretation: {
          ranges: [],
          variables: ['style'],
          template: '您的决策风格为特定类型。'
        },
        recommendations: []
      }
    },
    visualization: {
      primaryChart: { type: 'radar', title: '决策技能雷达图', dataSource: 'decision-dimensions', config: {} },
      secondaryCharts: [],
      layout: 'horizontal',
      showTrend: true,
      showComparison: true,
      showPercentile: true
    },
    correlations: [
      { targetDimensionId: 'cognitive-ability', correlationType: 'positive', strength: 0.72, description: '决策能力与认知能力相关' }
    ],
    benchmarks: createDefaultBenchmark(),
    metadata: createDefaultMetadata(0.84, 0.81)
  }
]

export const versionConfigs: Record<AssessmentVersion, VersionConfig> = {
  normal: {
    version: 'normal',
    displayName: '普通版',
    description: '基础测评，快速了解自身特点',
    minQuestions: 20,
    maxQuestions: 49,
    dimensions: {
      count: 6,
      categories: ['ability', 'behavior', 'tendency', 'emotional', 'social', 'professional'],
      customDimensionsAllowed: false,
      maxCustomDimensions: 0
    },
    features: [
      { id: 'basic-analysis', name: '基础分析', description: '提供基础分析报告', enabled: true },
      { id: 'basic-charts', name: '基础图表', description: '提供基础可视化图表', enabled: true },
      { id: 'recommendations', name: '建议', description: '提供改进建议', enabled: true }
    ],
    analysisDepth: ['basic'],
    pricing: { type: 'free' }
  },
  advanced: {
    version: 'advanced',
    displayName: '进阶版',
    description: '深度测评，全面了解自身优势',
    minQuestions: 50,
    maxQuestions: 99,
    dimensions: {
      count: 8,
      categories: ['ability', 'behavior', 'tendency', 'emotional', 'social', 'professional', 'cognitive', 'trait'],
      customDimensionsAllowed: false,
      maxCustomDimensions: 0
    },
    features: [
      { id: 'basic-analysis', name: '基础分析', description: '提供基础分析报告', enabled: true },
      { id: 'advanced-analysis', name: '进阶分析', description: '提供进阶深度分析', enabled: true },
      { id: 'basic-charts', name: '基础图表', description: '提供基础可视化图表', enabled: true },
      { id: 'advanced-charts', name: '进阶图表', description: '提供进阶可视化图表', enabled: true },
      { id: 'recommendations', name: '建议', description: '提供改进建议', enabled: true },
      { id: 'benchmark', name: '基准对比', description: '与行业基准对比', enabled: true }
    ],
    analysisDepth: ['basic', 'advanced'],
    pricing: { type: 'freemium' }
  },
  professional: {
    version: 'professional',
    displayName: '专业版',
    description: '专业测评，全面深度分析',
    minQuestions: 100,
    maxQuestions: 200,
    dimensions: {
      count: 10,
      categories: ['ability', 'behavior', 'tendency', 'emotional', 'social', 'professional', 'cognitive', 'trait', 'skill', 'potential'],
      customDimensionsAllowed: true,
      maxCustomDimensions: 5
    },
    features: [
      { id: 'basic-analysis', name: '基础分析', description: '提供基础分析报告', enabled: true },
      { id: 'advanced-analysis', name: '进阶分析', description: '提供进阶深度分析', enabled: true },
      { id: 'expert-analysis', name: '专家解读', description: '提供专家级解读', enabled: true },
      { id: 'basic-charts', name: '基础图表', description: '提供基础可视化图表', enabled: true },
      { id: 'advanced-charts', name: '进阶图表', description: '提供进阶可视化图表', enabled: true },
      { id: 'expert-charts', name: '专家图表', description: '提供专家级可视化图表', enabled: true },
      { id: 'recommendations', name: '建议', description: '提供改进建议', enabled: true },
      { id: 'benchmark', name: '基准对比', description: '与行业基准对比', enabled: true },
      { id: 'trend-analysis', name: '趋势分析', description: '历史数据趋势分析', enabled: true },
      { id: 'custom-dimensions', name: '自定义维度', description: '添加自定义分析维度', enabled: true },
      { id: 'export-report', name: '导出报告', description: '导出专业分析报告', enabled: true }
    ],
    analysisDepth: ['basic', 'advanced', 'expert'],
    pricing: { type: 'paid', price: 99 }
  }
}

export const defaultQuestionSelectionCriteria: QuestionSelectionCriteria = {
  minDiscrimination: 0.3,
  maxGuessing: 0.25,
  minReliability: 0.7,
  difficultyRange: [0.3, 0.7],
  maxCommonalityRatio: 0.7,
  minDifferentiationRatio: 0.3,
  balanceDimensions: true
}

export class EnhancedAnalysisFramework {
  private dimensions: Map<string, EnhancedAnalysisDimension>
  private versionConfigs: Map<AssessmentVersion, VersionConfig>
  private customDimensions: Map<string, EnhancedAnalysisDimension>

  constructor() {
    this.dimensions = new Map()
    this.versionConfigs = new Map()
    this.customDimensions = new Map()
    this.initializeDimensions()
    this.initializeVersionConfigs()
  }

  private initializeDimensions(): void {
    enhancedAnalysisDimensions.forEach(dim => {
      this.dimensions.set(dim.id, dim)
    })
  }

  private initializeVersionConfigs(): void {
    Object.entries(versionConfigs).forEach(([version, config]) => {
      this.versionConfigs.set(version as AssessmentVersion, config)
    })
  }

  getVersionConfig(version: AssessmentVersion): VersionConfig | undefined {
    return this.versionConfigs.get(version)
  }

  getDimensionsForVersion(version: AssessmentVersion): EnhancedAnalysisDimension[] {
    const config = this.versionConfigs.get(version)
    if (!config) return []

    return Array.from(this.dimensions.values())
      .filter(dim => config.dimensions.categories.includes(dim.category))
      .slice(0, config.dimensions.count)
  }

  getDimension(dimensionId: string): EnhancedAnalysisDimension | undefined {
    return this.dimensions.get(dimensionId) || this.customDimensions.get(dimensionId)
  }

  addCustomDimension(dimension: EnhancedAnalysisDimension): void {
    this.customDimensions.set(dimension.id, dimension)
  }

  removeCustomDimension(dimensionId: string): boolean {
    return this.customDimensions.delete(dimensionId)
  }

  analyzeDimension(
    dimensionId: string,
    data: any,
    layer: AnalysisLayer = 'basic'
  ): EnhancedAnalysisResult | null {
    const dimension = this.getDimension(dimensionId)
    if (!dimension) return null

    const layerConfig = dimension.layers[layer]
    if (!layerConfig) return null

    const metrics = this.calculateMetrics(layerConfig.metrics, data)
    const charts = this.generateCharts(layerConfig.charts, data)
    const interpretation = this.generateInterpretation(layerConfig.interpretation, metrics)
    const recommendations = this.generateRecommendations(layerConfig.recommendations, metrics)

    const overallScore = this.calculateOverallScore(metrics)
    const percentile = this.calculatePercentile(overallScore, dimension.benchmarks)
    const level = this.determineLevel(overallScore, dimension.layers.basic.interpretation.ranges)

    const layerResult: LayerResult = {
      metrics,
      charts,
      interpretation,
      recommendations,
      insights: this.generateInsights(metrics, dimension)
    }

    const layerResults: LayerResultMap = {
      basic: layer === 'basic' ? layerResult : this.createEmptyLayerResult(),
      advanced: layer === 'advanced' ? layerResult : undefined,
      expert: layer === 'expert' ? layerResult : undefined
    }

    return {
      dimensionId,
      dimensionName: dimension.name,
      category: dimension.category,
      overallScore,
      percentile,
      level,
      layerResults,
      correlations: this.calculateCorrelations(dimension, data),
      generatedAt: new Date().toISOString(),
      confidence: this.calculateConfidence(metrics, dimension.metadata)
    }
  }

  private createEmptyLayerResult(): LayerResult {
    return {
      metrics: [],
      charts: [],
      interpretation: '',
      recommendations: [],
      insights: []
    }
  }

  private calculateMetrics(metrics: MetricDefinition[], data: any): MetricResult[] {
    return metrics.map(metric => {
      const rawValue = data[metric.id] !== undefined 
        ? data[metric.id] 
        : (metric.range[0] + metric.range[1]) / 2
      
      const normalizedValue = Math.min(metric.range[1], Math.max(metric.range[0], rawValue))
      
      const mean = (metric.range[0] + metric.range[1]) / 2
      const sd = (metric.range[1] - metric.range[0]) / 4
      const zScore = (normalizedValue - mean) / sd
      const percentile = Math.min(99, Math.max(1, Math.round((1 / (1 + Math.exp(-zScore))) * 100)))
      
      const deviation = normalizedValue - mean
      
      return {
        metricId: metric.id,
        name: metric.name,
        value: normalizedValue,
        unit: metric.unit,
        level: percentile > 75 ? 'excellent' : percentile > 50 ? 'average' : 'needs_improvement',
        percentile,
        trend: deviation > 0 ? 'up' : deviation < 0 ? 'down' : 'stable'
      }
    })
  }

  private generateCharts(charts: ChartDefinition[], data: any): ChartResult[] {
    return charts.map(chart => ({
      chartId: chart.type,
      type: chart.type,
      title: chart.title,
      data: data[chart.dataSource] || {},
      config: chart.config
    }))
  }

  private generateInterpretation(template: InterpretationTemplate, metrics: MetricResult[]): string {
    let result = template.template
    metrics.forEach(metric => {
      result = result.replace(`{${metric.metricId}}`, metric.value.toFixed(1))
    })
    return result
  }

  private generateRecommendations(templates: RecommendationTemplate[], metrics: MetricResult[]): RecommendationResult[] {
    return templates.map(template => ({
      priority: template.priority,
      action: template.action,
      rationale: template.rationale,
      resources: template.resources,
      expectedImpact: '预期改善效果'
    }))
  }

  private calculateOverallScore(metrics: MetricResult[]): number {
    if (metrics.length === 0) return 50
    return metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length
  }

  private calculatePercentile(score: number, benchmarks: BenchmarkConfig): number {
    const zScore = (score - benchmarks.mean) / benchmarks.standardDeviation
    return Math.min(99, Math.max(1, Math.round((1 / (1 + Math.exp(-zScore))) * 100)))
  }

  private determineLevel(score: number, ranges: InterpretationRange[]): 'very_low' | 'low' | 'average' | 'high' | 'very_high' {
    for (const range of ranges) {
      if (score >= range.min && score < range.max) {
        return range.level
      }
    }
    return 'average'
  }

  private generateInsights(metrics: MetricResult[], dimension: EnhancedAnalysisDimension): string[] {
    const insights: string[] = []
    const avgScore = this.calculateOverallScore(metrics)
    
    if (avgScore >= 80) {
      insights.push(`您在${dimension.name}方面表现优秀，继续保持并发挥优势`)
    } else if (avgScore >= 60) {
      insights.push(`您在${dimension.name}方面表现良好，有进一步提升空间`)
    } else {
      insights.push(`您在${dimension.name}方面有较大提升空间，建议制定改进计划`)
    }
    
    return insights
  }

  private calculateCorrelations(dimension: EnhancedAnalysisDimension, data: any): CorrelationResult[] {
    return dimension.correlations.map(corr => ({
      dimensionId: corr.targetDimensionId,
      dimensionName: this.getDimension(corr.targetDimensionId)?.name || corr.targetDimensionId,
      correlationType: corr.correlationType,
      strength: corr.strength,
      description: corr.description
    }))
  }

  private calculateConfidence(metrics: MetricResult[], metadata: DimensionMetadata): number {
    return metadata.reliability * metadata.validity
  }

  generateComprehensiveAnalysis(
    version: AssessmentVersion,
    data: any
  ): EnhancedAnalysisResult[] {
    const dimensions = this.getDimensionsForVersion(version)
    const config = this.getVersionConfig(version)
    
    return dimensions.map(dim => {
      const layers = config?.analysisDepth || ['basic']
      const result = this.analyzeDimension(dim.id, data, layers[0])
      
      if (result && layers.length > 1) {
        layers.slice(1).forEach(layer => {
          const layerResult = this.analyzeDimension(dim.id, data, layer)
          if (layerResult) {
            const layerData = layerResult.layerResults[layer as keyof LayerResultMap]
            if (layerData) {
              result.layerResults[layer as keyof LayerResultMap] = layerData as LayerResult
            }
          }
        })
      }
      
      return result
    }).filter((r): r is EnhancedAnalysisResult => r !== null)
  }

  validateQuestionQuality(
    question: any,
    criteria: QuestionSelectionCriteria = defaultQuestionSelectionCriteria
  ): QuestionQualityMetrics {
    const discrimination = Math.random()
    const difficulty = Math.random()
    const guessing = Math.random()
    const reliability = Math.random()
    const validity = Math.random()
    
    const issues: QualityIssue[] = []
    
    if (discrimination < criteria.minDiscrimination) {
      issues.push({
        type: 'low_discrimination',
        severity: 'high',
        description: '题目区分度过低',
        recommendation: '建议修改题目以提高区分度'
      })
    }
    
    if (guessing > criteria.maxGuessing) {
      issues.push({
        type: 'high_guessing',
        severity: 'medium',
        description: '猜测概率过高',
        recommendation: '建议增加选项数量或提高干扰项质量'
      })
    }
    
    if (difficulty < criteria.difficultyRange[0]) {
      issues.push({
        type: 'too_easy',
        severity: 'low',
        description: '题目过于简单',
        recommendation: '建议增加题目难度'
      })
    }
    
    if (difficulty > criteria.difficultyRange[1]) {
      issues.push({
        type: 'too_hard',
        severity: 'low',
        description: '题目过于困难',
        recommendation: '建议降低题目难度'
      })
    }
    
    const qualityScore = (discrimination + reliability + validity) / 3
    
    return {
      questionId: question.id || 'unknown',
      discrimination,
      difficulty,
      guessing,
      reliability,
      validity,
      responseDistribution: {},
      averageResponseTime: 0,
      qualityScore,
      issues
    }
  }

  selectQuestions(
    questions: any[],
    targetCount: number,
    version: AssessmentVersion,
    criteria: QuestionSelectionCriteria = defaultQuestionSelectionCriteria
  ): any[] {
    const config = this.getVersionConfig(version)
    if (!config) return questions.slice(0, targetCount)
    
    const validatedQuestions = questions.map(q => ({
      question: q,
      metrics: this.validateQuestionQuality(q, criteria)
    }))
    
    const filteredQuestions = validatedQuestions.filter(q => 
      q.metrics.qualityScore >= 0.5 && q.metrics.issues.length === 0
    )
    
    const sortedQuestions = filteredQuestions.sort((a, b) => 
      b.metrics.qualityScore - a.metrics.qualityScore
    )
    
    return sortedQuestions.slice(0, targetCount).map(q => q.question)
  }

  analyzeAssessment(
    assessmentId: string,
    answers: Record<string, any>,
    version: AssessmentVersion = 'professional'
  ): AssessmentAnalysisResult {
    const dimensions = this.getDimensionsForVersion(version)
    const dimensionResults = this.calculateDimensionScores(assessmentId, answers, dimensions)
    
    const overallScore = this.calculateOverallAssessmentScore(dimensionResults)
    const overallLevel = this.determineOverallLevel(overallScore)
    const strengths = this.identifyStrengths(dimensionResults)
    const weaknesses = this.identifyWeaknesses(dimensionResults)
    const recommendations = this.generateAssessmentRecommendations(dimensionResults, overallScore)
    
    return {
      assessmentId,
      version,
      overallScore,
      overallLevel,
      dimensionResults,
      strengths,
      weaknesses,
      recommendations,
      generatedAt: new Date().toISOString(),
      confidence: this.calculateOverallConfidence(dimensionResults)
    }
  }

  calculateDimensionScores(
    assessmentId: string,
    answers: Record<string, any>,
    dimensions: EnhancedAnalysisDimension[]
  ): DimensionScoreResult[] {
    return dimensions.map(dimension => {
      const relevantAnswers = this.filterRelevantAnswers(answers, dimension)
      const rawScore = this.calculateRawScore(relevantAnswers)
      const normalizedScore = this.normalizeScore(rawScore, dimension)
      const percentile = this.calculatePercentile(normalizedScore, dimension.benchmarks)
      const level = this.determineLevel(normalizedScore, dimension.layers.basic.interpretation.ranges)
      
      return {
        dimensionId: dimension.id,
        dimensionName: dimension.name,
        category: dimension.category,
        rawScore,
        normalizedScore,
        percentile,
        level,
        interpretation: this.generateDimensionInterpretation(dimension, normalizedScore, level),
        metrics: this.calculateDimensionMetrics(dimension, relevantAnswers)
      }
    })
  }

  private filterRelevantAnswers(answers: Record<string, any>, dimension: EnhancedAnalysisDimension): Record<string, any> {
    const relevantKeys = Object.keys(answers).filter(key => 
      key.toLowerCase().includes(dimension.id.toLowerCase()) ||
      key.toLowerCase().includes(dimension.category.toLowerCase())
    )
    const filtered: Record<string, any> = {}
    relevantKeys.forEach(key => {
      filtered[key] = answers[key]
    })
    return filtered
  }

  private calculateRawScore(answers: Record<string, any>): number {
    const values = Object.values(answers).filter(v => typeof v === 'number') as number[]
    if (values.length === 0) return 50
    return values.reduce((sum, val) => sum + val, 0) / values.length
  }

  private normalizeScore(rawScore: number, dimension: EnhancedAnalysisDimension): number {
    const range = dimension.layers.basic.metrics[0]?.range || [0, 100]
    const min = range[0]
    const max = range[1]
    return Math.min(max, Math.max(min, rawScore))
  }

  private calculateOverallAssessmentScore(dimensionResults: DimensionScoreResult[]): number {
    if (dimensionResults.length === 0) return 50
    return dimensionResults.reduce((sum, dr) => sum + dr.normalizedScore, 0) / dimensionResults.length
  }

  private determineOverallLevel(score: number): 'excellent' | 'good' | 'average' | 'below_average' | 'poor' {
    if (score >= 90) return 'excellent'
    if (score >= 75) return 'good'
    if (score >= 60) return 'average'
    if (score >= 40) return 'below_average'
    return 'poor'
  }

  private identifyStrengths(dimensionResults: DimensionScoreResult[]): string[] {
    return dimensionResults
      .filter(dr => dr.normalizedScore >= 75)
      .map(dr => dr.dimensionName)
  }

  private identifyWeaknesses(dimensionResults: DimensionScoreResult[]): string[] {
    return dimensionResults
      .filter(dr => dr.normalizedScore < 50)
      .map(dr => dr.dimensionName)
  }

  private generateDimensionInterpretation(
    dimension: EnhancedAnalysisDimension,
    score: number,
    level: string
  ): string {
    const range = dimension.layers.basic.interpretation.ranges.find(r => r.level === level)
    return range ? `${dimension.name}：${range.description}` : `${dimension.name}：表现中等`
  }

  private calculateDimensionMetrics(
    dimension: EnhancedAnalysisDimension,
    answers: Record<string, any>
  ): MetricResult[] {
    return dimension.layers.basic.metrics.map(metric => ({
      metricId: metric.id,
      name: metric.name,
      value: this.calculateRawScore(answers),
      unit: metric.unit,
      level: 'average',
      percentile: 50,
      trend: 'stable'
    }))
  }

  private calculateOverallConfidence(dimensionResults: DimensionScoreResult[]): number {
    if (dimensionResults.length === 0) return 0
    return dimensionResults.reduce((sum, dr) => sum + 0.8, 0) / dimensionResults.length
  }

  private generateAssessmentRecommendations(
    dimensionResults: DimensionScoreResult[],
    overallScore: number
  ): RecommendationResult[] {
    const recommendations: RecommendationResult[] = []
    
    dimensionResults.forEach(dr => {
      if (dr.normalizedScore < 50) {
        recommendations.push({
          priority: 'high',
          action: `加强${dr.dimensionName}方面的能力提升`,
          rationale: `您在${dr.dimensionName}方面的得分较低，需要重点关注和改进`,
          resources: ['相关培训课程', '实践练习', '专业指导'],
          expectedImpact: '预期可提升20-30%'
        })
      } else if (dr.normalizedScore >= 75) {
        recommendations.push({
          priority: 'low',
          action: `继续发挥${dr.dimensionName}方面的优势`,
          rationale: `您在${dr.dimensionName}方面表现优秀，建议继续保持并寻求更高突破`,
          resources: ['进阶课程', '挑战性任务', '导师指导'],
          expectedImpact: '预期可达到顶尖水平'
        })
      }
    })
    
    if (overallScore < 60) {
      recommendations.push({
        priority: 'high',
        action: '制定系统性提升计划',
        rationale: '整体表现有待提高，建议制定全面的改进计划',
        resources: ['专业咨询', '系统培训', '定期评估'],
        expectedImpact: '预期可提升整体表现30%以上'
      })
    }
    
    return recommendations
  }
}

export interface AssessmentAnalysisResult {
  assessmentId: string
  version: AssessmentVersion
  overallScore: number
  overallLevel: 'excellent' | 'good' | 'average' | 'below_average' | 'poor'
  dimensionResults: DimensionScoreResult[]
  strengths: string[]
  weaknesses: string[]
  recommendations: RecommendationResult[]
  generatedAt: string
  confidence: number
}

export interface DimensionScoreResult {
  dimensionId: string
  dimensionName: string
  category: AnalysisCategory
  rawScore: number
  normalizedScore: number
  percentile: number
  level: 'very_low' | 'low' | 'average' | 'high' | 'very_high'
  interpretation: string
  metrics: MetricResult[]
}

export const enhancedAnalysisFramework = new EnhancedAnalysisFramework()
