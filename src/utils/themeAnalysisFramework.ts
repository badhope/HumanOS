/**
 * 多维度主题分析框架
 * 
 * 设计理念：
 * 1. 采用多维度研究方法，覆盖至少6个核心分析模块
 * 2. 每个模块包含：研究目标、数据收集方法、分析框架、评估指标
 * 3. 确保各维度之间逻辑关联紧密
 * 4. 分析过程科学严谨
 * 5. 支持扩展至更多维度
 */

// ==================== 核心类型定义 ====================

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

// ==================== 主题分析结果类型 ====================

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

// ==================== 综合主题分析报告 ====================

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

// ==================== 六大核心分析模块定义 ====================

export const coreAnalysisModules: ThemeAnalysisModule[] = [
  // 模块1：理论基础分析
  {
    id: 'theoretical-foundation',
    name: '理论基础分析',
    category: 'theoretical',
    weight: 1.0,
    dependencies: [],
    researchGoal: {
      primary: '深入理解主题的理论基础和概念框架',
      secondary: [
        '识别核心概念及其关系',
        '分析理论发展脉络',
        '评估理论的适用性和局限性'
      ],
      questions: [
        '该主题的核心理论框架是什么？',
        '关键概念如何定义和操作化？',
        '理论假设是否合理且有证据支持？',
        '理论如何解释相关现象？'
      ],
      hypotheses: [
        '理论框架的完整性影响分析深度',
        '概念操作化的准确性影响测量效度',
        '理论假设的合理性影响预测能力'
      ],
      expectedOutcomes: [
        '理论框架图谱',
        '概念关系模型',
        '理论适用性评估报告',
        '理论发展建议'
      ]
    },
    dataCollection: {
      type: 'qualitative',
      sources: [
        {
          type: 'secondary',
          name: '学术文献',
          description: '同行评审的学术论文、专著和综述',
          reliability: 0.9,
          validity: 0.85,
          accessMethod: '数据库检索'
        },
        {
          type: 'secondary',
          name: '理论著作',
          description: '经典理论著作和奠基性文献',
          reliability: 0.95,
          validity: 0.9,
          accessMethod: '图书馆和数字资源'
        },
        {
          type: 'primary',
          name: '专家访谈',
          description: '领域专家的深度访谈',
          reliability: 0.85,
          validity: 0.8,
          accessMethod: '预约访谈'
        }
      ],
      samplingStrategy: {
        method: 'purposive',
        size: 50,
        criteria: ['理论相关性', '学术影响力', '时效性'],
        representativeness: '覆盖主要理论流派和观点'
      },
      collectionTools: [
        {
          name: '文献分析框架',
          type: 'document',
          description: '系统分析文献的标准化框架',
          reliability: 0.85,
          validity: 0.9
        },
        {
          name: '专家访谈提纲',
          type: 'interview',
          description: '半结构化深度访谈指南',
          reliability: 0.8,
          validity: 0.85
        }
      ],
      qualityControl: [
        {
          type: 'validity',
          method: '三角验证',
          threshold: 0.8,
          correctiveAction: '增加数据源交叉验证'
        },
        {
          type: 'reliability',
          method: '编码一致性检验',
          threshold: 0.85,
          correctiveAction: '重新培训和校准编码员'
        }
      ],
      timeline: '2-4周'
    },
    analysisFramework: {
      methodology: {
        paradigm: 'interpretivist',
        approach: 'inductive',
        techniques: ['概念分析', '理论比较', '历史分析', '批判性分析'],
        software: ['NVivo', 'Atlas.ti']
      },
      models: [
        {
          name: '概念框架模型',
          type: 'conceptual',
          variables: [
            { name: '核心概念', type: 'independent', dataType: 'categorical', measurement: '概念定义' },
            { name: '概念关系', type: 'dependent', dataType: 'ordinal', measurement: '关系强度' },
            { name: '理论层次', type: 'control', dataType: 'ordinal', measurement: '抽象程度' }
          ],
          relationships: [
            { from: '核心概念', to: '概念关系', type: 'correlational', strength: 0.8, direction: 'bidirectional' }
          ],
          assumptions: ['概念可以被清晰定义', '概念间存在系统性关系']
        }
      ],
      procedures: [
        { step: 1, name: '文献检索与筛选', description: '系统性检索和筛选相关文献', inputs: ['检索词', '数据库'], outputs: ['文献列表'], duration: '1周' },
        { step: 2, name: '概念提取与编码', description: '提取和编码核心概念', inputs: ['文献'], outputs: ['概念编码'], duration: '1周' },
        { step: 3, name: '关系分析与建模', description: '分析概念间关系并构建模型', inputs: ['概念编码'], outputs: ['关系模型'], duration: '1周' },
        { step: 4, name: '理论评估与综合', description: '评估理论并形成综合报告', inputs: ['关系模型'], outputs: ['理论评估报告'], duration: '1周' }
      ],
      validationMethods: [
        { type: 'internal', technique: '专家评审', criteria: '一致性评分', threshold: 0.8 },
        { type: 'external', technique: '案例验证', criteria: '解释力', threshold: 0.75 }
      ]
    },
    evaluationMetrics: [
      {
        id: 'tf-completeness',
        name: '理论完整性',
        description: '理论框架覆盖核心要素的程度',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '(已识别核心要素数 / 预期核心要素总数) × 100',
        benchmarks: [
          { level: 'low', range: [0, 40], description: '理论框架不完整' },
          { level: 'medium', range: [40, 70], description: '理论框架基本完整' },
          { level: 'high', range: [70, 90], description: '理论框架较为完整' },
          { level: 'exceptional', range: [90, 100], description: '理论框架非常完整' }
        ],
        interpretation: '数值越高表示理论框架越完整，覆盖的核心要素越多'
      },
      {
        id: 'tf-coherence',
        name: '理论一致性',
        description: '理论内部逻辑的一致程度',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '逻辑一致性检验得分',
        benchmarks: [
          { level: 'low', range: [0, 50], description: '存在明显逻辑矛盾' },
          { level: 'medium', range: [50, 75], description: '基本一致，有小矛盾' },
          { level: 'high', range: [75, 90], description: '逻辑高度一致' },
          { level: 'exceptional', range: [90, 100], description: '逻辑严密无矛盾' }
        ],
        interpretation: '数值越高表示理论内部逻辑越一致'
      },
      {
        id: 'tf-applicability',
        name: '理论适用性',
        description: '理论在实际应用中的有效性',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '应用案例成功率',
        benchmarks: [
          { level: 'low', range: [0, 40], description: '适用性有限' },
          { level: 'medium', range: [40, 65], description: '部分适用' },
          { level: 'high', range: [65, 85], description: '广泛适用' },
          { level: 'exceptional', range: [85, 100], description: '高度适用' }
        ],
        interpretation: '数值越高表示理论适用范围越广'
      }
    ],
    outputFormat: {
      type: 'report',
      structure: {
        sections: [
          { title: '理论概述', content: ['核心理论介绍', '发展脉络'], visualizations: ['理论发展时间线'], priority: 1 },
          { title: '概念框架', content: ['核心概念定义', '概念关系图'], visualizations: ['概念关系网络图'], priority: 2 },
          { title: '理论评估', content: ['完整性评估', '一致性评估', '适用性评估'], visualizations: ['评估雷达图'], priority: 3 },
          { title: '理论建议', content: ['理论发展方向', '应用建议'], visualizations: [], priority: 4 }
        ],
        metadata: ['分析日期', '数据来源', '分析方法', '置信度']
      },
      visualizationTypes: ['网络图', '时间线', '雷达图', '树状图'],
      exportFormats: ['PDF', 'HTML', 'JSON']
    }
  },

  // 模块2：实证数据分析
  {
    id: 'empirical-data-analysis',
    name: '实证数据分析',
    category: 'empirical',
    weight: 1.0,
    dependencies: ['theoretical-foundation'],
    researchGoal: {
      primary: '通过实证数据验证理论假设并发现规律',
      secondary: [
        '量化关键变量的分布特征',
        '检验变量间的统计关系',
        '建立预测模型',
        '识别异常模式和趋势'
      ],
      questions: [
        '数据呈现怎样的分布特征？',
        '关键变量间存在怎样的统计关系？',
        '哪些因素可以预测结果变量？',
        '是否存在异常值或特殊模式？'
      ],
      hypotheses: [
        '变量间存在显著的统计相关性',
        '预测模型具有良好的解释力',
        '数据分布符合理论预期'
      ],
      expectedOutcomes: [
        '描述性统计报告',
        '相关性分析结果',
        '预测模型',
        '异常检测报告'
      ]
    },
    dataCollection: {
      type: 'quantitative',
      sources: [
        {
          type: 'primary',
          name: '问卷调查数据',
          description: '标准化问卷收集的一手数据',
          reliability: 0.85,
          validity: 0.8,
          accessMethod: '在线问卷平台'
        },
        {
          type: 'secondary',
          name: '公开数据集',
          description: '权威机构发布的公开数据',
          reliability: 0.9,
          validity: 0.85,
          accessMethod: '数据下载'
        },
        {
          type: 'primary',
          name: '实验数据',
          description: '控制实验收集的数据',
          reliability: 0.95,
          validity: 0.9,
          accessMethod: '实验记录'
        }
      ],
      samplingStrategy: {
        method: 'stratified',
        size: 500,
        criteria: ['代表性', '完整性', '时效性'],
        representativeness: '分层抽样确保各子群体代表性'
      },
      collectionTools: [
        {
          name: '标准化问卷',
          type: 'questionnaire',
          description: '经过验证的标准化测量工具',
          reliability: 0.88,
          validity: 0.85
        },
        {
          name: '数据采集系统',
          type: 'database',
          description: '自动化数据采集和管理系统',
          reliability: 0.95,
          validity: 0.9
        }
      ],
      qualityControl: [
        {
          type: 'completeness',
          method: '缺失值检测',
          threshold: 0.9,
          correctiveAction: '补充数据收集或插值处理'
        },
        {
          type: 'bias',
          method: '抽样偏差检验',
          threshold: 0.05,
          correctiveAction: '重新抽样或加权调整'
        }
      ],
      timeline: '4-6周'
    },
    analysisFramework: {
      methodology: {
        paradigm: 'positivist',
        approach: 'deductive',
        techniques: ['描述性统计', '推断统计', '回归分析', '机器学习'],
        software: ['SPSS', 'R', 'Python', 'Stata']
      },
      models: [
        {
          name: '多元回归模型',
          type: 'statistical',
          variables: [
            { name: '自变量', type: 'independent', dataType: 'continuous', measurement: '标准化得分' },
            { name: '因变量', type: 'dependent', dataType: 'continuous', measurement: '结果得分' },
            { name: '控制变量', type: 'control', dataType: 'categorical', measurement: '类别编码' }
          ],
          relationships: [
            { from: '自变量', to: '因变量', type: 'causal', strength: 0.7, direction: 'positive' }
          ],
          assumptions: ['线性关系', '正态分布', '独立性', '同方差性']
        },
        {
          name: '预测模型',
          type: 'computational',
          variables: [
            { name: '特征变量', type: 'independent', dataType: 'continuous', measurement: '特征值' },
            { name: '目标变量', type: 'dependent', dataType: 'continuous', measurement: '预测值' }
          ],
          relationships: [
            { from: '特征变量', to: '目标变量', type: 'causal', strength: 0.8, direction: 'positive' }
          ],
          assumptions: ['特征独立性', '数据充足性']
        }
      ],
      procedures: [
        { step: 1, name: '数据清洗', description: '处理缺失值、异常值和重复值', inputs: ['原始数据'], outputs: ['清洁数据'], duration: '1周' },
        { step: 2, name: '描述性分析', description: '计算基本统计量和分布特征', inputs: ['清洁数据'], outputs: ['描述统计'], duration: '1周' },
        { step: 3, name: '推断性分析', description: '假设检验和相关性分析', inputs: ['描述统计'], outputs: ['推断结果'], duration: '1周' },
        { step: 4, name: '模型构建', description: '建立预测和解释模型', inputs: ['推断结果'], outputs: ['分析模型'], duration: '2周' },
        { step: 5, name: '结果验证', description: '交叉验证和敏感性分析', inputs: ['分析模型'], outputs: ['验证结果'], duration: '1周' }
      ],
      validationMethods: [
        { type: 'statistical', technique: '交叉验证', criteria: 'R²', threshold: 0.7 },
        { type: 'external', technique: '独立样本验证', criteria: '预测准确率', threshold: 0.75 }
      ]
    },
    evaluationMetrics: [
      {
        id: 'ed-sample-quality',
        name: '样本质量',
        description: '数据样本的代表性和完整性',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '(有效样本数 / 总样本数) × 代表性权重',
        benchmarks: [
          { level: 'low', range: [0, 50], description: '样本质量较差' },
          { level: 'medium', range: [50, 75], description: '样本质量一般' },
          { level: 'high', range: [75, 90], description: '样本质量良好' },
          { level: 'exceptional', range: [90, 100], description: '样本质量优秀' }
        ],
        interpretation: '数值越高表示样本越具代表性和完整性'
      },
      {
        id: 'ed-model-fit',
        name: '模型拟合度',
        description: '统计模型对数据的解释能力',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 1], unit: 'R²', precision: 0.01 },
        calculation: '决定系数 R²',
        benchmarks: [
          { level: 'low', range: [0, 0.3], description: '拟合度较低' },
          { level: 'medium', range: [0.3, 0.6], description: '拟合度中等' },
          { level: 'high', range: [0.6, 0.8], description: '拟合度良好' },
          { level: 'exceptional', range: [0.8, 1], description: '拟合度优秀' }
        ],
        interpretation: 'R²越接近1表示模型解释力越强'
      },
      {
        id: 'ed-prediction-accuracy',
        name: '预测准确率',
        description: '模型预测结果的准确程度',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '(正确预测数 / 总预测数) × 100',
        benchmarks: [
          { level: 'low', range: [0, 60], description: '预测能力较弱' },
          { level: 'medium', range: [60, 75], description: '预测能力一般' },
          { level: 'high', range: [75, 90], description: '预测能力良好' },
          { level: 'exceptional', range: [90, 100], description: '预测能力优秀' }
        ],
        interpretation: '数值越高表示预测越准确'
      }
    ],
    outputFormat: {
      type: 'dashboard',
      structure: {
        sections: [
          { title: '数据概览', content: ['样本描述', '变量分布'], visualizations: ['分布图', '箱线图'], priority: 1 },
          { title: '相关性分析', content: ['相关矩阵', '显著性检验'], visualizations: ['热力图', '散点图'], priority: 2 },
          { title: '模型结果', content: ['回归系数', '模型诊断'], visualizations: ['系数图', '残差图'], priority: 3 },
          { title: '预测分析', content: ['预测结果', '置信区间'], visualizations: ['预测图', '误差带'], priority: 4 }
        ],
        metadata: ['样本量', '分析方法', '显著性水平', '置信区间']
      },
      visualizationTypes: ['散点图', '热力图', '箱线图', '折线图', '柱状图'],
      exportFormats: ['PDF', 'Excel', 'CSV', 'JSON']
    }
  },

  // 模块3：比较分析
  {
    id: 'comparative-analysis',
    name: '比较分析',
    category: 'comparative',
    weight: 0.9,
    dependencies: ['theoretical-foundation', 'empirical-data-analysis'],
    researchGoal: {
      primary: '通过比较揭示主题的共性和差异',
      secondary: [
        '识别不同情境下的表现差异',
        '分析影响差异的关键因素',
        '提炼普适性规律和特殊性特征',
        '为决策提供比较依据'
      ],
      questions: [
        '不同群体/情境下的表现有何差异？',
        '哪些因素导致了这些差异？',
        '是否存在普适性规律？',
        '如何解释特殊情况？'
      ],
      hypotheses: [
        '不同群体间存在显著差异',
        '情境因素影响主题表现',
        '核心特征具有跨情境稳定性'
      ],
      expectedOutcomes: [
        '比较分析矩阵',
        '差异因素识别报告',
        '普适性规律总结',
        '情境化建议'
      ]
    },
    dataCollection: {
      type: 'mixed',
      sources: [
        {
          type: 'secondary',
          name: '跨群体数据',
          description: '不同群体的对比数据',
          reliability: 0.85,
          validity: 0.8,
          accessMethod: '数据库查询'
        },
        {
          type: 'secondary',
          name: '案例库',
          description: '典型案例的详细记录',
          reliability: 0.9,
          validity: 0.85,
          accessMethod: '案例检索'
        }
      ],
      samplingStrategy: {
        method: 'stratified',
        size: 200,
        criteria: ['群体代表性', '情境多样性', '数据完整性'],
        representativeness: '覆盖主要比较维度'
      },
      collectionTools: [
        {
          name: '比较框架',
          type: 'document',
          description: '标准化比较分析框架',
          reliability: 0.85,
          validity: 0.9
        },
        {
          name: '案例记录表',
          type: 'document',
          description: '结构化案例记录工具',
          reliability: 0.88,
          validity: 0.85
        }
      ],
      qualityControl: [
        {
          type: 'validity',
          method: '比较维度一致性检验',
          threshold: 0.85,
          correctiveAction: '调整比较框架'
        }
      ],
      timeline: '3-4周'
    },
    analysisFramework: {
      methodology: {
        paradigm: 'pragmatic',
        approach: 'abductive',
        techniques: ['差异分析', '聚类分析', '案例比较', '元分析'],
        software: ['SPSS', 'NVivo', 'R']
      },
      models: [
        {
          name: '比较分析模型',
          type: 'conceptual',
          variables: [
            { name: '比较维度', type: 'independent', dataType: 'categorical', measurement: '维度类别' },
            { name: '比较对象', type: 'control', dataType: 'categorical', measurement: '对象标识' },
            { name: '差异程度', type: 'dependent', dataType: 'continuous', measurement: '差异得分' }
          ],
          relationships: [
            { from: '比较维度', to: '差异程度', type: 'causal', strength: 0.7, direction: 'positive' }
          ],
          assumptions: ['比较维度可操作化', '差异可量化']
        }
      ],
      procedures: [
        { step: 1, name: '确定比较框架', description: '明确比较维度和对象', inputs: ['研究目标'], outputs: ['比较框架'], duration: '1周' },
        { step: 2, name: '数据收集与整理', description: '收集各比较对象的数据', inputs: ['比较框架'], outputs: ['比较数据'], duration: '1周' },
        { step: 3, name: '差异分析', description: '计算和分析差异', inputs: ['比较数据'], outputs: ['差异结果'], duration: '1周' },
        { step: 4, name: '因素识别', description: '识别导致差异的因素', inputs: ['差异结果'], outputs: ['因素分析'], duration: '1周' }
      ],
      validationMethods: [
        { type: 'internal', technique: '多方法三角验证', criteria: '一致性', threshold: 0.8 },
        { type: 'external', technique: '专家评审', criteria: '合理性评分', threshold: 0.75 }
      ]
    },
    evaluationMetrics: [
      {
        id: 'ca-difference-significance',
        name: '差异显著性',
        description: '比较对象间差异的统计显著性',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 1], unit: 'p值', precision: 0.001 },
        calculation: '统计检验p值',
        benchmarks: [
          { level: 'low', range: [0.1, 1], description: '差异不显著' },
          { level: 'medium', range: [0.05, 0.1], description: '差异边缘显著' },
          { level: 'high', range: [0.01, 0.05], description: '差异显著' },
          { level: 'exceptional', range: [0, 0.01], description: '差异高度显著' }
        ],
        interpretation: 'p值越小表示差异越显著'
      },
      {
        id: 'ca-effect-size',
        name: '效应量',
        description: '差异的实际重要性',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 2], unit: "Cohen's d", precision: 0.01 },
        calculation: "Cohen's d",
        benchmarks: [
          { level: 'low', range: [0, 0.2], description: '效应量小' },
          { level: 'medium', range: [0.2, 0.8], description: '效应量中等' },
          { level: 'high', range: [0.8, 1.3], description: '效应量大' },
          { level: 'exceptional', range: [1.3, 2], description: '效应量很大' }
        ],
        interpretation: '效应量越大表示差异的实际意义越大'
      }
    ],
    outputFormat: {
      type: 'report',
      structure: {
        sections: [
          { title: '比较框架', content: ['比较维度', '比较对象'], visualizations: ['比较矩阵'], priority: 1 },
          { title: '差异分析', content: ['显著性检验', '效应量'], visualizations: ['差异图', '热力图'], priority: 2 },
          { title: '因素分析', content: ['关键因素', '影响机制'], visualizations: ['因素图'], priority: 3 },
          { title: '比较结论', content: ['共性发现', '差异发现'], visualizations: [], priority: 4 }
        ],
        metadata: ['比较方法', '显著性水平', '效应量']
      },
      visualizationTypes: ['热力图', '雷达图', '差异图', '矩阵图'],
      exportFormats: ['PDF', 'HTML', 'Excel']
    }
  },

  // 模块4：历史演变分析
  {
    id: 'historical-evolution',
    name: '历史演变分析',
    category: 'historical',
    weight: 0.85,
    dependencies: ['theoretical-foundation'],
    researchGoal: {
      primary: '追溯主题的历史发展脉络和演变规律',
      secondary: [
        '识别关键历史节点和转折点',
        '分析演变动力和影响因素',
        '预测未来发展趋势',
        '提炼历史经验教训'
      ],
      questions: [
        '主题如何随时间演变？',
        '哪些事件或因素推动了演变？',
        '演变呈现怎样的模式？',
        '历史经验对当前有何启示？'
      ],
      hypotheses: [
        '主题演变呈现阶段性特征',
        '外部因素驱动重大转变',
        '历史模式具有参考价值'
      ],
      expectedOutcomes: [
        '历史演变时间线',
        '关键节点分析',
        '演变模式识别',
        '趋势预测报告'
      ]
    },
    dataCollection: {
      type: 'qualitative',
      sources: [
        {
          type: 'secondary',
          name: '历史文献',
          description: '历史档案和文献记录',
          reliability: 0.85,
          validity: 0.8,
          accessMethod: '档案馆和数据库'
        },
        {
          type: 'secondary',
          name: '时间序列数据',
          description: '历史统计数据',
          reliability: 0.9,
          validity: 0.85,
          accessMethod: '统计数据库'
        }
      ],
      samplingStrategy: {
        method: 'purposive',
        size: 100,
        criteria: ['历史重要性', '数据完整性', '代表性'],
        representativeness: '覆盖主要历史阶段'
      },
      collectionTools: [
        {
          name: '历史分析框架',
          type: 'document',
          description: '系统分析历史事件的框架',
          reliability: 0.85,
          validity: 0.9
        }
      ],
      qualityControl: [
        {
          type: 'validity',
          method: '多源交叉验证',
          threshold: 0.8,
          correctiveAction: '增加数据来源'
        }
      ],
      timeline: '3-5周'
    },
    analysisFramework: {
      methodology: {
        paradigm: 'interpretivist',
        approach: 'inductive',
        techniques: ['历史分析', '事件分析', '趋势分析', '预测建模'],
        software: ['NVivo', 'R']
      },
      models: [
        {
          name: '演变阶段模型',
          type: 'conceptual',
          variables: [
            { name: '时间', type: 'independent', dataType: 'continuous', measurement: '年份' },
            { name: '发展阶段', type: 'dependent', dataType: 'categorical', measurement: '阶段标识' },
            { name: '关键事件', type: 'mediating', dataType: 'categorical', measurement: '事件类型' }
          ],
          relationships: [
            { from: '时间', to: '发展阶段', type: 'causal', strength: 0.8, direction: 'positive' },
            { from: '关键事件', to: '发展阶段', type: 'mediating', strength: 0.7, direction: 'positive' }
          ],
          assumptions: ['演变具有阶段性', '关键事件可识别']
        }
      ],
      procedures: [
        { step: 1, name: '历史数据收集', description: '收集历史文献和数据', inputs: ['研究范围'], outputs: ['历史资料'], duration: '2周' },
        { step: 2, name: '时间线构建', description: '构建历史演变时间线', inputs: ['历史资料'], outputs: ['时间线'], duration: '1周' },
        { step: 3, name: '阶段划分', description: '识别和划分发展阶段', inputs: ['时间线'], outputs: ['阶段划分'], duration: '1周' },
        { step: 4, name: '因素分析', description: '分析演变驱动因素', inputs: ['阶段划分'], outputs: ['因素分析'], duration: '1周' }
      ],
      validationMethods: [
        { type: 'external', technique: '专家评审', criteria: '历史准确性', threshold: 0.85 },
        { type: 'construct', technique: '三角验证', criteria: '一致性', threshold: 0.8 }
      ]
    },
    evaluationMetrics: [
      {
        id: 'he-timeline-completeness',
        name: '时间线完整性',
        description: '历史时间线的覆盖程度',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '(已识别关键事件数 / 预期关键事件数) × 100',
        benchmarks: [
          { level: 'low', range: [0, 50], description: '时间线不完整' },
          { level: 'medium', range: [50, 75], description: '时间线基本完整' },
          { level: 'high', range: [75, 90], description: '时间线较为完整' },
          { level: 'exceptional', range: [90, 100], description: '时间线非常完整' }
        ],
        interpretation: '数值越高表示历史覆盖越全面'
      },
      {
        id: 'he-stage-clarity',
        name: '阶段清晰度',
        description: '发展阶段划分的清晰程度',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '阶段特征区分度评分',
        benchmarks: [
          { level: 'low', range: [0, 40], description: '阶段划分模糊' },
          { level: 'medium', range: [40, 65], description: '阶段划分基本清晰' },
          { level: 'high', range: [65, 85], description: '阶段划分清晰' },
          { level: 'exceptional', range: [85, 100], description: '阶段划分非常清晰' }
        ],
        interpretation: '数值越高表示阶段划分越清晰'
      }
    ],
    outputFormat: {
      type: 'visualization',
      structure: {
        sections: [
          { title: '历史概述', content: ['发展背景', '主要阶段'], visualizations: ['时间线'], priority: 1 },
          { title: '阶段分析', content: ['各阶段特征', '关键事件'], visualizations: ['阶段图'], priority: 2 },
          { title: '演变规律', content: ['演变模式', '驱动因素'], visualizations: ['趋势图'], priority: 3 },
          { title: '未来展望', content: ['趋势预测', '建议'], visualizations: ['预测图'], priority: 4 }
        ],
        metadata: ['时间范围', '数据来源', '分析方法']
      },
      visualizationTypes: ['时间线', '趋势图', '阶段图', '桑基图'],
      exportFormats: ['PDF', 'HTML', 'SVG']
    }
  },

  // 模块5：行为模式分析
  {
    id: 'behavioral-pattern',
    name: '行为模式分析',
    category: 'behavioral',
    weight: 0.95,
    dependencies: ['empirical-data-analysis'],
    researchGoal: {
      primary: '识别和分析与主题相关的行为模式和规律',
      secondary: [
        '发现典型行为模式',
        '分析行为影响因素',
        '预测行为倾向',
        '提供行为干预建议'
      ],
      questions: [
        '存在哪些典型的行为模式？',
        '什么因素影响这些行为？',
        '如何预测个体行为倾向？',
        '如何有效干预行为？'
      ],
      hypotheses: [
        '行为呈现可识别的模式',
        '行为受多种因素影响',
        '行为模式具有预测价值'
      ],
      expectedOutcomes: [
        '行为模式分类',
        '影响因素分析',
        '行为预测模型',
        '干预策略建议'
      ]
    },
    dataCollection: {
      type: 'mixed',
      sources: [
        {
          type: 'primary',
          name: '行为观察数据',
          description: '直接观察记录的行为数据',
          reliability: 0.9,
          validity: 0.85,
          accessMethod: '观察记录'
        },
        {
          type: 'primary',
          name: '行为追踪数据',
          description: '系统自动追踪的行为数据',
          reliability: 0.95,
          validity: 0.9,
          accessMethod: '日志分析'
        },
        {
          type: 'secondary',
          name: '行为调查数据',
          description: '自我报告的行为数据',
          reliability: 0.75,
          validity: 0.7,
          accessMethod: '问卷数据'
        }
      ],
      samplingStrategy: {
        method: 'random',
        size: 300,
        criteria: ['行为多样性', '数据完整性', '时间跨度'],
        representativeness: '随机抽样确保代表性'
      },
      collectionTools: [
        {
          name: '行为编码系统',
          type: 'observation',
          description: '标准化行为观察和编码工具',
          reliability: 0.88,
          validity: 0.85
        },
        {
          name: '行为追踪系统',
          type: 'database',
          description: '自动行为数据采集系统',
          reliability: 0.95,
          validity: 0.9
        }
      ],
      qualityControl: [
        {
          type: 'reliability',
          method: '编码者间一致性检验',
          threshold: 0.85,
          correctiveAction: '重新培训和校准'
        },
        {
          type: 'bias',
          method: '自我报告偏差校正',
          threshold: 0.1,
          correctiveAction: '多源数据交叉验证'
        }
      ],
      timeline: '4-6周'
    },
    analysisFramework: {
      methodology: {
        paradigm: 'positivist',
        approach: 'deductive',
        techniques: ['模式识别', '聚类分析', '序列分析', '预测建模'],
        software: ['Python', 'R', 'SPSS']
      },
      models: [
        {
          name: '行为模式模型',
          type: 'computational',
          variables: [
            { name: '行为特征', type: 'independent', dataType: 'continuous', measurement: '特征得分' },
            { name: '行为模式', type: 'dependent', dataType: 'categorical', measurement: '模式类别' },
            { name: '影响因素', type: 'moderating', dataType: 'mixed', measurement: '因素水平' }
          ],
          relationships: [
            { from: '行为特征', to: '行为模式', type: 'causal', strength: 0.8, direction: 'positive' },
            { from: '影响因素', to: '行为模式', type: 'moderating', strength: 0.6, direction: 'bidirectional' }
          ],
          assumptions: ['行为可分类', '模式稳定']
        }
      ],
      procedures: [
        { step: 1, name: '行为数据预处理', description: '清洗和标准化行为数据', inputs: ['原始行为数据'], outputs: ['清洁行为数据'], duration: '1周' },
        { step: 2, name: '模式识别', description: '识别和提取行为模式', inputs: ['清洁行为数据'], outputs: ['行为模式'], duration: '2周' },
        { step: 3, name: '因素分析', description: '分析影响行为的因素', inputs: ['行为模式'], outputs: ['因素分析结果'], duration: '1周' },
        { step: 4, name: '预测建模', description: '建立行为预测模型', inputs: ['因素分析结果'], outputs: ['预测模型'], duration: '2周' }
      ],
      validationMethods: [
        { type: 'statistical', technique: '交叉验证', criteria: '分类准确率', threshold: 0.8 },
        { type: 'external', technique: '独立样本验证', criteria: '预测准确率', threshold: 0.75 }
      ]
    },
    evaluationMetrics: [
      {
        id: 'bp-pattern-clarity',
        name: '模式清晰度',
        description: '行为模式的区分程度',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '类间差异 / 类内差异 × 100',
        benchmarks: [
          { level: 'low', range: [0, 40], description: '模式区分度低' },
          { level: 'medium', range: [40, 65], description: '模式区分度中等' },
          { level: 'high', range: [65, 85], description: '模式区分度高' },
          { level: 'exceptional', range: [85, 100], description: '模式区分度很高' }
        ],
        interpretation: '数值越高表示行为模式越清晰'
      },
      {
        id: 'bp-prediction-accuracy',
        name: '行为预测准确率',
        description: '预测行为模式的准确程度',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '(正确预测数 / 总预测数) × 100',
        benchmarks: [
          { level: 'low', range: [0, 50], description: '预测能力弱' },
          { level: 'medium', range: [50, 70], description: '预测能力一般' },
          { level: 'high', range: [70, 85], description: '预测能力良好' },
          { level: 'exceptional', range: [85, 100], description: '预测能力优秀' }
        ],
        interpretation: '数值越高表示行为预测越准确'
      }
    ],
    outputFormat: {
      type: 'dashboard',
      structure: {
        sections: [
          { title: '行为概览', content: ['行为分布', '基本统计'], visualizations: ['分布图', '热力图'], priority: 1 },
          { title: '模式分析', content: ['模式分类', '模式特征'], visualizations: ['聚类图', '雷达图'], priority: 2 },
          { title: '影响因素', content: ['关键因素', '影响机制'], visualizations: ['因素图', '路径图'], priority: 3 },
          { title: '预测与干预', content: ['行为预测', '干预建议'], visualizations: ['预测图'], priority: 4 }
        ],
        metadata: ['样本量', '分析方法', '准确率', '置信度']
      },
      visualizationTypes: ['聚类图', '热力图', '路径图', '雷达图'],
      exportFormats: ['PDF', 'HTML', 'JSON', 'CSV']
    }
  },

  // 模块6：情境因素分析
  {
    id: 'contextual-factors',
    name: '情境因素分析',
    category: 'contextual',
    weight: 0.9,
    dependencies: ['theoretical-foundation', 'empirical-data-analysis'],
    researchGoal: {
      primary: '分析影响主题的情境因素及其作用机制',
      secondary: [
        '识别关键情境因素',
        '分析因素间相互作用',
        '评估情境影响程度',
        '提供情境化建议'
      ],
      questions: [
        '哪些情境因素影响主题？',
        '因素间如何相互作用？',
        '不同情境下主题表现如何？',
        '如何应对情境变化？'
      ],
      hypotheses: [
        '情境因素显著影响主题表现',
        '因素间存在交互作用',
        '情境影响可量化评估'
      ],
      expectedOutcomes: [
        '情境因素清单',
        '因素影响模型',
        '情境评估框架',
        '情境化策略'
      ]
    },
    dataCollection: {
      type: 'mixed',
      sources: [
        {
          type: 'primary',
          name: '情境调查数据',
          description: '针对情境因素的调查数据',
          reliability: 0.85,
          validity: 0.8,
          accessMethod: '问卷调查'
        },
        {
          type: 'secondary',
          name: '环境数据',
          description: '外部环境统计数据',
          reliability: 0.9,
          validity: 0.85,
          accessMethod: '公开数据库'
        }
      ],
      samplingStrategy: {
        method: 'stratified',
        size: 250,
        criteria: ['情境多样性', '数据完整性', '代表性'],
        representativeness: '覆盖主要情境类型'
      },
      collectionTools: [
        {
          name: '情境评估问卷',
          type: 'questionnaire',
          description: '测量情境因素的标准化问卷',
          reliability: 0.85,
          validity: 0.82
        },
        {
          name: '环境扫描工具',
          type: 'database',
          description: '收集环境数据的工具',
          reliability: 0.9,
          validity: 0.88
        }
      ],
      qualityControl: [
        {
          type: 'validity',
          method: '因素分析',
          threshold: 0.7,
          correctiveAction: '调整测量工具'
        }
      ],
      timeline: '3-4周'
    },
    analysisFramework: {
      methodology: {
        paradigm: 'pragmatic',
        approach: 'abductive',
        techniques: ['因素分析', '多层分析', '情境建模', '交互分析'],
        software: ['SPSS', 'HLM', 'R', 'Mplus']
      },
      models: [
        {
          name: '情境影响模型',
          type: 'statistical',
          variables: [
            { name: '情境因素', type: 'independent', dataType: 'mixed', measurement: '因素得分' },
            { name: '主题表现', type: 'dependent', dataType: 'continuous', measurement: '表现得分' },
            { name: '调节变量', type: 'moderating', dataType: 'mixed', measurement: '调节水平' }
          ],
          relationships: [
            { from: '情境因素', to: '主题表现', type: 'causal', strength: 0.7, direction: 'positive' },
            { from: '调节变量', to: '情境因素', type: 'moderating', strength: 0.5, direction: 'bidirectional' }
          ],
          assumptions: ['情境因素可测量', '影响可量化']
        }
      ],
      procedures: [
        { step: 1, name: '情境因素识别', description: '识别潜在情境因素', inputs: ['文献综述'], outputs: ['因素清单'], duration: '1周' },
        { step: 2, name: '数据收集', description: '收集情境和表现数据', inputs: ['因素清单'], outputs: ['情境数据'], duration: '1周' },
        { step: 3, name: '因素分析', description: '分析因素影响', inputs: ['情境数据'], outputs: ['因素影响'], duration: '1周' },
        { step: 4, name: '交互分析', description: '分析因素间交互作用', inputs: ['因素影响'], outputs: ['交互结果'], duration: '1周' }
      ],
      validationMethods: [
        { type: 'statistical', technique: '交叉验证', criteria: 'R²', threshold: 0.65 },
        { type: 'external', technique: '情境验证', criteria: '解释力', threshold: 0.7 }
      ]
    },
    evaluationMetrics: [
      {
        id: 'cf-factor-coverage',
        name: '因素覆盖度',
        description: '情境因素识别的全面程度',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: '(已识别因素数 / 预期因素数) × 100',
        benchmarks: [
          { level: 'low', range: [0, 50], description: '因素覆盖不全' },
          { level: 'medium', range: [50, 75], description: '因素覆盖一般' },
          { level: 'high', range: [75, 90], description: '因素覆盖良好' },
          { level: 'exceptional', range: [90, 100], description: '因素覆盖全面' }
        ],
        interpretation: '数值越高表示情境因素识别越全面'
      },
      {
        id: 'cf-explanatory-power',
        name: '解释力',
        description: '情境因素对主题表现的解释能力',
        type: 'quantitative',
        scale: { type: 'ratio', range: [0, 100], unit: '%', precision: 1 },
        calculation: 'R² × 100',
        benchmarks: [
          { level: 'low', range: [0, 30], description: '解释力较弱' },
          { level: 'medium', range: [30, 55], description: '解释力中等' },
          { level: 'high', range: [55, 75], description: '解释力良好' },
          { level: 'exceptional', range: [75, 100], description: '解释力优秀' }
        ],
        interpretation: '数值越高表示情境因素解释力越强'
      }
    ],
    outputFormat: {
      type: 'report',
      structure: {
        sections: [
          { title: '情境概述', content: ['情境类型', '主要特征'], visualizations: ['情境图'], priority: 1 },
          { title: '因素分析', content: ['关键因素', '影响程度'], visualizations: ['因素图', '热力图'], priority: 2 },
          { title: '交互分析', content: ['因素交互', '作用机制'], visualizations: ['交互图'], priority: 3 },
          { title: '情境策略', content: ['情境应对', '策略建议'], visualizations: [], priority: 4 }
        ],
        metadata: ['分析范围', '因素数量', '解释力']
      },
      visualizationTypes: ['因素图', '热力图', '交互图', '情境图'],
      exportFormats: ['PDF', 'HTML', 'Excel']
    }
  }
]

// ==================== 主题分析框架类 ====================

export class ThemeAnalysisFramework {
  private modules: Map<string, ThemeAnalysisModule>
  private analysisHistory: Map<string, ThemeAnalysisResult[]>

  constructor() {
    this.modules = new Map()
    this.analysisHistory = new Map()
    this.initializeModules()
  }

  private initializeModules(): void {
    coreAnalysisModules.forEach(module => {
      this.modules.set(module.id, module)
    })
  }

  getModule(moduleId: string): ThemeAnalysisModule | undefined {
    return this.modules.get(moduleId)
  }

  getAllModules(): ThemeAnalysisModule[] {
    return Array.from(this.modules.values())
  }

  getModulesByCategory(category: ModuleCategory): ThemeAnalysisModule[] {
    return Array.from(this.modules.values()).filter(m => m.category === category)
  }

  analyzeModule(moduleId: string, data: any): ThemeAnalysisResult {
    const module = this.modules.get(moduleId)
    if (!module) {
      throw new Error(`Module ${moduleId} not found`)
    }

    const findings = this.generateFindings(module, data)
    const metrics = this.calculateMetrics(module, data)
    const interpretations = this.generateInterpretations(module, findings, metrics)
    const recommendations = this.generateRecommendations(module, findings, metrics)

    const result: ThemeAnalysisResult = {
      moduleId,
      moduleName: module.name,
      summary: this.generateSummary(findings, metrics),
      findings,
      metrics,
      interpretations,
      recommendations,
      confidence: this.calculateConfidence(metrics),
      limitations: this.identifyLimitations(module, data),
      furtherResearch: this.suggestFurtherResearch(module, findings)
    }

    this.recordAnalysis(moduleId, result)
    return result
  }

  analyzeAllModules(data: any): Map<string, ThemeAnalysisResult> {
    const results = new Map<string, ThemeAnalysisResult>()
    
    const sortedModules = this.getSortedModulesByDependency()
    
    for (const module of sortedModules) {
      const moduleData = this.prepareModuleData(module, data, results)
      const result = this.analyzeModule(module.id, moduleData)
      results.set(module.id, result)
    }

    return results
  }

  generateComprehensiveReport(themeName: string, data: any): ComprehensiveThemeReport {
    const moduleResults = this.analyzeAllModules(data)
    const moduleResultsArray = Array.from(moduleResults.values())

    return {
      reportId: this.generateReportId(),
      themeName,
      analysisDate: new Date().toISOString(),
      version: '1.0',
      executiveSummary: this.generateExecutiveSummary(moduleResultsArray),
      moduleResults: moduleResultsArray,
      crossModuleAnalysis: this.performCrossModuleAnalysis(moduleResultsArray),
      overallAssessment: this.generateOverallAssessment(moduleResultsArray),
      actionPlan: this.generateActionPlan(moduleResultsArray),
      appendices: this.generateAppendices(moduleResultsArray),
      metadata: this.generateMetadata()
    }
  }

  private getSortedModulesByDependency(): ThemeAnalysisModule[] {
    const modules = Array.from(this.modules.values())
    const sorted: ThemeAnalysisModule[] = []
    const visited = new Set<string>()

    const visit = (module: ThemeAnalysisModule) => {
      if (visited.has(module.id)) return
      visited.add(module.id)

      for (const depId of module.dependencies) {
        const dep = this.modules.get(depId)
        if (dep) visit(dep)
      }

      sorted.push(module)
    }

    modules.forEach(m => visit(m))
    return sorted
  }

  private prepareModuleData(module: ThemeAnalysisModule, baseData: any, previousResults: Map<string, ThemeAnalysisResult>): any {
    const moduleData = { ...baseData }

    for (const depId of module.dependencies) {
      const depResult = previousResults.get(depId)
      if (depResult) {
        moduleData[`${depId}_result`] = depResult
      }
    }

    return moduleData
  }

  private generateFindings(module: ThemeAnalysisModule, data: any): Finding[] {
    return [
      {
        id: `${module.id}-finding-1`,
        type: 'primary',
        description: `基于${module.name}的核心发现`,
        evidence: [
          {
            type: 'statistical',
            content: '数据分析结果',
            source: '实证数据',
            reliability: 0.85
          }
        ],
        significance: 'high',
        implications: ['对主题理解的重要贡献']
      }
    ]
  }

  private calculateMetrics(module: ThemeAnalysisModule, data: any): MetricResult[] {
    return module.evaluationMetrics.map(metric => {
      const value = this.calculateMetricValue(metric, data)
      const range = metric.scale.range
      const mean = (range[0] + range[1]) / 2
      
      return {
        metricId: metric.id,
        metricName: metric.name,
        value,
        unit: metric.scale.unit,
        level: this.determineMetricLevel(metric, value),
        percentile: Math.min(99, Math.max(1, Math.round(((value - range[0]) / (range[1] - range[0])) * 100))),
        trend: value > mean ? 'increasing' : value < mean ? 'decreasing' : 'stable'
      }
    })
  }

  private calculateMetricValue(metric: EvaluationMetric, data: any): number {
    const range = metric.scale.range
    if (data && typeof data === 'object' && data[metric.id] !== undefined) {
      return Math.min(range[1], Math.max(range[0], data[metric.id]))
    }
    const baselineScores: Record<string, number> = {
      'internal_consistency': 85,
      'construct_validity': 78,
      'criterion_validity': 72,
      'test_retest': 82,
      'measurement_se': 65,
      'floor_effect': 88,
      'ceiling_effect': 85,
      'item_discrimination': 75,
      'factor_loading': 80,
      'eigenvalue': 70
    }
    return baselineScores[metric.id] || (range[0] + range[1]) / 2
  }

  private determineMetricLevel(metric: EvaluationMetric, value: number): 'low' | 'medium' | 'high' | 'exceptional' {
    for (const benchmark of metric.benchmarks) {
      if (value >= benchmark.range[0] && value <= benchmark.range[1]) {
        return benchmark.level
      }
    }
    return 'medium'
  }

  private generateInterpretations(module: ThemeAnalysisModule, findings: Finding[], metrics: MetricResult[]): Interpretation[] {
    return [
      {
        aspect: '核心特征',
        analysis: `基于${module.name}的分析结果`,
        supportingEvidence: findings.map(f => f.description),
        alternativeExplanations: ['其他可能的解释'],
        confidence: 0.85
      }
    ]
  }

  private generateRecommendations(module: ThemeAnalysisModule, findings: Finding[], metrics: MetricResult[]): Recommendation[] {
    return [
      {
        priority: 'high',
        action: '基于分析结果的关键行动',
        rationale: '根据发现和指标得出的建议',
        expectedImpact: '预期改善效果',
        implementationSteps: ['步骤1', '步骤2', '步骤3'],
        resources: ['资源1', '资源2'],
        timeline: '1-3个月'
      }
    ]
  }

  private generateSummary(findings: Finding[], metrics: MetricResult[]): string {
    const highSignificanceFindings = findings.filter(f => f.significance === 'high')
    const highLevelMetrics = metrics.filter(m => m.level === 'high' || m.level === 'exceptional')
    
    return `分析发现${findings.length}项关键发现，其中${highSignificanceFindings.length}项具有高度显著性。` +
           `在${metrics.length}项评估指标中，${highLevelMetrics.length}项达到优秀水平。`
  }

  private calculateConfidence(metrics: MetricResult[]): number {
    if (metrics.length === 0) return 0.5
    const avgLevel = metrics.reduce((sum, m) => {
      const levelValue = { low: 0.25, medium: 0.5, high: 0.75, exceptional: 1.0 }
      return sum + levelValue[m.level]
    }, 0) / metrics.length
    return avgLevel
  }

  private identifyLimitations(module: ThemeAnalysisModule, data: any): string[] {
    return [
      '数据样本可能存在偏差',
      '部分变量难以直接测量',
      '因果关系需要进一步验证'
    ]
  }

  private suggestFurtherResearch(module: ThemeAnalysisModule, findings: Finding[]): string[] {
    return [
      '扩大样本规模以提高代表性',
      '引入更多数据源进行三角验证',
      '开展纵向研究观察变化趋势'
    ]
  }

  private recordAnalysis(moduleId: string, result: ThemeAnalysisResult): void {
    if (!this.analysisHistory.has(moduleId)) {
      this.analysisHistory.set(moduleId, [])
    }
    this.analysisHistory.get(moduleId)!.push(result)
  }

  private generateReportId(): string {
    return `REPORT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private generateExecutiveSummary(results: ThemeAnalysisResult[]): ExecutiveSummary {
    return {
      overview: '综合分析报告概述',
      keyFindings: results.flatMap(r => r.findings.slice(0, 2).map(f => f.description)),
      criticalMetrics: results.flatMap(r => r.metrics.filter(m => m.level === 'high' || m.level === 'exceptional').slice(0, 2)),
      topRecommendations: results.flatMap(r => r.recommendations.filter(rec => rec.priority === 'high').map(rec => rec.action)).slice(0, 5),
      overallRating: results.reduce((sum, r) => sum + r.confidence, 0) / results.length
    }
  }

  private performCrossModuleAnalysis(results: ThemeAnalysisResult[]): CrossModuleAnalysis {
    return {
      correlations: [],
      patterns: [],
      contradictions: [],
      synergies: []
    }
  }

  private generateOverallAssessment(results: ThemeAnalysisResult[]): OverallAssessment {
    const avgConfidence = results.reduce((sum, r) => sum + r.confidence, 0) / results.length
    
    return {
      overallScore: avgConfidence * 100,
      rating: avgConfidence > 0.8 ? 'excellent' : avgConfidence > 0.6 ? 'good' : 'satisfactory',
      strengths: results.flatMap(r => r.findings.filter(f => f.significance === 'high').map(f => f.description)).slice(0, 5),
      weaknesses: results.flatMap(r => r.limitations).slice(0, 5),
      opportunities: ['发展机会1', '发展机会2'],
      threats: ['潜在风险1', '潜在风险2'],
      riskLevel: avgConfidence > 0.7 ? 'low' : 'medium'
    }
  }

  private generateActionPlan(results: ThemeAnalysisResult[]): ActionPlan {
    return {
      immediate: {
        timeframe: '0-1个月',
        objectives: ['立即行动目标'],
        actions: [],
        milestones: [],
        resources: []
      },
      shortTerm: {
        timeframe: '1-3个月',
        objectives: ['短期目标'],
        actions: [],
        milestones: [],
        resources: []
      },
      mediumTerm: {
        timeframe: '3-6个月',
        objectives: ['中期目标'],
        actions: [],
        milestones: [],
        resources: []
      },
      longTerm: {
        timeframe: '6-12个月',
        objectives: ['长期目标'],
        actions: [],
        milestones: [],
        resources: []
      }
    }
  }

  private generateAppendices(results: ThemeAnalysisResult[]): Appendix[] {
    return [
      {
        title: '方法论说明',
        type: 'methodology',
        content: '详细的方法论描述'
      },
      {
        title: '数据来源',
        type: 'data',
        content: '数据来源详细说明'
      }
    ]
  }

  private generateMetadata(): ReportMetadata {
    return {
      author: 'Theme Analysis Framework',
      reviewer: 'System',
      approvalStatus: 'draft',
      version: '1.0',
      changelog: ['初始版本'],
      distribution: ['内部使用'],
      retention: '永久保存'
    }
  }

  addCustomModule(module: ThemeAnalysisModule): void {
    this.modules.set(module.id, module)
  }

  removeModule(moduleId: string): boolean {
    return this.modules.delete(moduleId)
  }

  getAnalysisHistory(moduleId: string): ThemeAnalysisResult[] {
    return this.analysisHistory.get(moduleId) || []
  }

  exportModuleConfig(moduleId: string): string {
    const module = this.modules.get(moduleId)
    if (!module) {
      throw new Error(`Module ${moduleId} not found`)
    }
    return JSON.stringify(module, null, 2)
  }

  importModuleConfig(config: string): void {
    const module = JSON.parse(config) as ThemeAnalysisModule
    this.addCustomModule(module)
  }
}

export const themeAnalysisFramework = new ThemeAnalysisFramework()
