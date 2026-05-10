/**
 * 多维度主题分析框架 - 类型定义
 */

export interface ThemeAnalysisModule {
  id: string
  name: string
  category: ModuleCategory
  researchGoal: ResearchGoal
  dataCollection: DataCollectionMethod
  analysisFramework: AnalysisFrameworkConfig
  evaluationMetrics: EvaluationMetric[]
  weight: number
  dependencies: string[]
  outputFormat: OutputFormat
}

export type ModuleCategory = 
  | 'theoretical' 
  | 'empirical' 
  | 'comparative' 
  | 'historical' 
  | 'behavioral' 
  | 'contextual'
  | 'predictive'
  | 'evaluative'

export interface ResearchGoal {
  primary: string
  secondary: string[]
  questions: string[]
  hypotheses: string[]
  expectedOutcomes: string[]
}

export interface DataCollectionMethod {
  type: 'quantitative' | 'qualitative' | 'mixed'
  sources: DataSource[]
  samplingStrategy: SamplingStrategy
  collectionTools: CollectionTool[]
  qualityControl: QualityControlMeasure[]
  timeline: string
}

export interface DataSource {
  type: 'primary' | 'secondary' | 'tertiary'
  name: string
  description: string
  reliability: number
  validity: number
  accessMethod: string
}

export interface SamplingStrategy {
  method: 'random' | 'stratified' | 'cluster' | 'purposive' | 'snowball'
  size: number
  criteria: string[]
  representativeness: string
}

export interface CollectionTool {
  name: string
  type: 'questionnaire' | 'interview' | 'observation' | 'document' | 'experiment' | 'database'
  description: string
  reliability: number
  validity: number
}

export interface QualityControlMeasure {
  type: 'validity' | 'reliability' | 'bias' | 'completeness'
  method: string
  threshold: number
  correctiveAction: string
}

export interface AnalysisFrameworkConfig {
  methodology: AnalysisMethodology
  models: AnalysisModel[]
  procedures: AnalysisProcedure[]
  validationMethods: ValidationMethod[]
}

export interface AnalysisMethodology {
  paradigm: 'positivist' | 'interpretivist' | 'critical' | 'pragmatic'
  approach: 'deductive' | 'inductive' | 'abductive'
  techniques: string[]
  software?: string[]
}

export interface AnalysisModel {
  name: string
  type: 'statistical' | 'conceptual' | 'computational' | 'mixed'
  variables: Variable[]
  relationships: VariableRelationship[]
  assumptions: string[]
}

export interface Variable {
  name: string
  type: 'independent' | 'dependent' | 'mediating' | 'moderating' | 'control'
  dataType: 'continuous' | 'categorical' | 'ordinal' | 'binary' | 'mixed'
  measurement: string
}

export interface VariableRelationship {
  from: string
  to: string
  type: 'causal' | 'correlational' | 'mediating' | 'moderating'
  strength: number
  direction: 'positive' | 'negative' | 'bidirectional'
}

export interface AnalysisProcedure {
  step: number
  name: string
  description: string
  inputs: string[]
  outputs: string[]
  duration: string
}

export interface ValidationMethod {
  type: 'internal' | 'external' | 'construct' | 'statistical'
  technique: string
  criteria: string
  threshold: number
}

export interface EvaluationMetric {
  id: string
  name: string
  description: string
  type: 'quantitative' | 'qualitative' | 'mixed'
  scale: MeasurementScale
  calculation: string
  benchmarks: Benchmark[]
  interpretation: string
}

export interface MeasurementScale {
  type: 'nominal' | 'ordinal' | 'interval' | 'ratio'
  range: [number, number]
  unit: string
  precision: number
}

export interface Benchmark {
  level: 'low' | 'medium' | 'high' | 'exceptional'
  range: [number, number]
  description: string
  percentile?: number
}

export interface OutputFormat {
  type: 'report' | 'dashboard' | 'visualization' | 'api' | 'database'
  structure: OutputStructure
  visualizationTypes: string[]
  exportFormats: string[]
}

export interface OutputStructure {
  sections: OutputSection[]
  metadata: string[]
}

export interface OutputSection {
  title: string
  content: string[]
  visualizations: string[]
  priority: number
}

export interface ThemeAnalysisResult {
  moduleId: string
  moduleName: string
  summary: string
  findings: Finding[]
  metrics: MetricResult[]
  interpretations: Interpretation[]
  recommendations: Recommendation[]
  confidence: number
  limitations: string[]
  furtherResearch: string[]
}

export interface Finding {
  id: string
  type: 'primary' | 'secondary' | 'incidental'
  description: string
  evidence: Evidence[]
  significance: 'high' | 'medium' | 'low'
  implications: string[]
}

export interface Evidence {
  type: 'statistical' | 'qualitative' | 'documentary' | 'observational'
  content: string
  source: string
  reliability: number
}

export interface MetricResult {
  metricId: string
  metricName: string
  value: number
  unit: string
  level: 'low' | 'medium' | 'high' | 'exceptional'
  percentile?: number
  trend?: 'increasing' | 'decreasing' | 'stable'
  comparison?: {
    benchmark: string
    difference: number
    significance: boolean
  }
}

export interface Interpretation {
  aspect: string
  analysis: string
  supportingEvidence: string[]
  alternativeExplanations: string[]
  confidence: number
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low'
  action: string
  rationale: string
  expectedImpact: string
  implementationSteps: string[]
  resources: string[]
  timeline: string
}

export interface ComprehensiveThemeReport {
  reportId: string
  themeName: string
  analysisDate: string
  version: string
  executiveSummary: ExecutiveSummary
  moduleResults: ThemeAnalysisResult[]
  crossModuleAnalysis: CrossModuleAnalysis
  overallAssessment: OverallAssessment
  actionPlan: ActionPlan
  appendices: Appendix[]
  metadata: ReportMetadata
}

export interface ExecutiveSummary {
  overview: string
  keyFindings: string[]
  criticalMetrics: MetricResult[]
  topRecommendations: string[]
  overallRating: number
}

export interface CrossModuleAnalysis {
  correlations: ModuleCorrelation[]
  patterns: CrossModulePattern[]
  contradictions: Contradiction[]
  synergies: Synergy[]
}

export interface ModuleCorrelation {
  module1: string
  module2: string
  coefficient: number
  significance: number
  interpretation: string
}

export interface CrossModulePattern {
  pattern: string
  involvedModules: string[]
  frequency: number
  significance: 'high' | 'medium' | 'low'
  description: string
}

export interface Contradiction {
  module1: string
  module2: string
  aspect: string
  description: string
  possibleReasons: string[]
  resolution: string
}

export interface Synergy {
  modules: string[]
  type: 'reinforcing' | 'complementary' | 'enabling'
  description: string
  impact: string
  leveragePoints: string[]
}

export interface OverallAssessment {
  overallScore: number
  rating: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'critical'
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

export interface ActionPlan {
  immediate: ActionPhase
  shortTerm: ActionPhase
  mediumTerm: ActionPhase
  longTerm: ActionPhase
}

export interface ActionPhase {
  timeframe: string
  objectives: string[]
  actions: PlannedAction[]
  milestones: Milestone[]
  resources: ResourceAllocation[]
}

export interface PlannedAction {
  id: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  responsible: string
  dependencies: string[]
  deliverables: string[]
}

export interface Milestone {
  name: string
  targetDate: string
  criteria: string[]
  status: 'pending' | 'in_progress' | 'completed' | 'delayed'
}

export interface ResourceAllocation {
  type: 'human' | 'financial' | 'technical' | 'time'
  amount: string
  source: string
  constraints: string[]
}

export interface Appendix {
  title: string
  type: 'data' | 'methodology' | 'calculation' | 'reference'
  content: string
}

export interface ReportMetadata {
  author: string
  reviewer: string
  approvalStatus: 'draft' | 'review' | 'approved' | 'published'
  version: string
  changelog: string[]
  distribution: string[]
  retention: string
}
