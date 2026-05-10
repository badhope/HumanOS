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
