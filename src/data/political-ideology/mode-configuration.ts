import { IDEOLOGY_DIMENSIONS } from './ideology-theoretical-framework'

export type AssessmentMode = 'normal' | 'advanced' | 'professional'

export interface ModeConfiguration {
  mode: AssessmentMode
  displayName: string
  description: string
  icon: string
  questionConfig: {
    totalQuestions: number
    questionsPerDimension: Record<string, number>
    randomizeOrder: boolean
    showProgress: boolean
    enableAdaptiveBranching?: boolean
  }
  analysisConfig: {
    maxIdeologyMatches: number
    minSimilarityThreshold: number
    includeSecondaryDimensions: boolean
    includeConflictAnalysis: boolean
    includeHistoricalContext: boolean
    dimensionDepth: 'basic' | 'enhanced' | 'granular'
    crossDimensionAnalysis: boolean
    includeCognitiveProfile?: boolean
    includeMetaDimensionAnalysis?: boolean
    includeQualityMetrics?: boolean
    includeCalculationAudit?: boolean
    includeIRTItemAnalysis?: boolean
    includeNicheIdeologyDetection?: boolean
    includeContradictionAnalysis?: boolean
  }
  outputConfig: {
    showMatchPercentage: boolean
    showDimensionBreakdown: boolean
    includeRecommendations: boolean
    includeReadingList: boolean
    includeEndingAnalysis?: boolean
    includeDecisionPath?: boolean
    includeLifePathAnalysis?: boolean
    includeValueMap?: boolean
    includeCognitiveAnalysis?: boolean
    includeMetaAnalysis?: boolean
    includeQualityReport?: boolean
    includeAuditTrail?: boolean
    includePsychometrics?: boolean
    includeContradictionMap?: boolean
    includeNicheIdeologyDetails?: boolean
    exportFormats: string[]
  }
  uiConfig: {
    compactMode: boolean
    showTooltips: boolean
    animatedVisualizations: boolean
    allowDrilldown: boolean
    showDecisionHistory?: boolean
    showEndingGallery?: boolean
    showCharacterFate?: boolean
    showPerformanceMetrics?: boolean
    showAuditLog?: boolean
    showPsychometricCharts?: boolean
    showContradictionMatrix?: boolean
    showIRTInformationCurve?: boolean
  }
  algorithmConfig: {
    similarityMethod: 'cosine' | 'weighted-cosine' | 'ensemble'
    enableDistanceCalibration: boolean
    subDimensionWeighting: boolean
    performanceOptimization: boolean
    decisionPathWeighting?: boolean
    lifeStageWeighting?: boolean
    enableDynamicWeightAdjustment?: boolean
    enableMultiLayerCalibration?: boolean
    enableQualityControl?: boolean
    enableIRTScoring?: boolean
    enableAdaptiveMatching?: boolean
    enableContradictionDetection?: boolean
    enableNicheResolution?: boolean
  }
  validationConfig?: {
    enableCrossValidation: boolean
    enableExpertReviewCheck: boolean
    enableResponseConsistencyCheck: boolean
    crossValidationRounds: number
    consistencyThreshold: number
    enableIRTCalibration?: boolean
    enableBootstrapValidation?: boolean
  }
  sectionConfig?: {
    sectionA: {
      name: string
      description: string
      questionCount: number
      adaptive: boolean
      mandatory: boolean
    }
    sectionB: {
      name: string
      description: string
      minQuestions: number
      maxQuestions: number
      adaptive: boolean
      terminationCriteria: {
        minSeparation: number
        maxPosteriorUncertainty: number
      }
    }
  }
}

export const MODE_CONFIGURATIONS: Record<AssessmentMode, ModeConfiguration> = {
  normal: {
    mode: 'normal',
    displayName: '普通模式',
    description: '标准化意识形态测评，35道题覆盖核心维度，适合快速了解自身意识形态倾向',
    icon: '🎯',
    questionConfig: {
      totalQuestions: 35,
      questionsPerDimension: {
        economic: 7,
        social: 7,
        cultural: 7,
        international: 7,
        ecological: 7,
      },
      randomizeOrder: true,
      showProgress: true,
    },
    analysisConfig: {
      maxIdeologyMatches: 8,
      minSimilarityThreshold: 0.70,
      includeSecondaryDimensions: true,
      includeConflictAnalysis: true,
      includeHistoricalContext: true,
      dimensionDepth: 'enhanced',
      crossDimensionAnalysis: false,
    },
    outputConfig: {
      showMatchPercentage: true,
      showDimensionBreakdown: true,
      includeRecommendations: true,
      includeReadingList: true,
      exportFormats: ['summary', 'json'],
    },
    uiConfig: {
      compactMode: false,
      showTooltips: true,
      animatedVisualizations: true,
      allowDrilldown: true,
    },
    algorithmConfig: {
      similarityMethod: 'weighted-cosine',
      enableDistanceCalibration: true,
      subDimensionWeighting: false,
      performanceOptimization: true,
    },
  },
  advanced: {
    mode: 'advanced',
    displayName: '进阶模式',
    description: '多维度深度分析，8维度120题精密测评，含认知能力评估与元分析，生成专业级报告',
    icon: '🔬',
    questionConfig: {
      totalQuestions: 120,
      questionsPerDimension: {
        economic: 15,
        social: 15,
        cultural: 15,
        international: 15,
        ecological: 15,
        epistemological: 15,
        anthropological: 15,
        temporal: 15,
      },
      randomizeOrder: true,
      showProgress: true,
    },
    analysisConfig: {
      maxIdeologyMatches: 16,
      minSimilarityThreshold: 0.60,
      includeSecondaryDimensions: true,
      includeConflictAnalysis: true,
      includeHistoricalContext: true,
      dimensionDepth: 'granular',
      crossDimensionAnalysis: true,
      includeCognitiveProfile: true,
      includeMetaDimensionAnalysis: true,
      includeQualityMetrics: true,
      includeCalculationAudit: true,
    },
    outputConfig: {
      showMatchPercentage: true,
      showDimensionBreakdown: true,
      includeRecommendations: true,
      includeReadingList: true,
      includeCognitiveAnalysis: true,
      includeMetaAnalysis: true,
      includeQualityReport: true,
      includeAuditTrail: true,
      exportFormats: ['summary', 'detailed', 'academic', 'json', 'csv'],
    },
    uiConfig: {
      compactMode: false,
      showTooltips: true,
      animatedVisualizations: true,
      allowDrilldown: true,
      showPerformanceMetrics: true,
      showAuditLog: true,
    },
    algorithmConfig: {
      similarityMethod: 'ensemble',
      enableDistanceCalibration: true,
      subDimensionWeighting: true,
      performanceOptimization: false,
      enableDynamicWeightAdjustment: true,
      enableMultiLayerCalibration: true,
      enableQualityControl: true,
    },
    validationConfig: {
      enableCrossValidation: true,
      enableExpertReviewCheck: true,
      enableResponseConsistencyCheck: true,
      crossValidationRounds: 3,
      consistencyThreshold: 0.75,
    },
  },
  professional: {
    mode: 'professional',
    displayName: '专业模式',
    description: '深度意识形态测评，100道题更全面覆盖，通过更多题目提供更精确的意识形态定位',
    icon: '🔬',
    questionConfig: {
      totalQuestions: 100,
      questionsPerDimension: {
        economic: 20,
        social: 20,
        cultural: 20,
        international: 20,
        ecological: 20,
      },
      randomizeOrder: true,
      showProgress: true,
    },
    analysisConfig: {
      maxIdeologyMatches: 8,
      minSimilarityThreshold: 0.70,
      includeSecondaryDimensions: true,
      includeConflictAnalysis: true,
      includeHistoricalContext: true,
      dimensionDepth: 'enhanced',
      crossDimensionAnalysis: false,
    },
    outputConfig: {
      showMatchPercentage: true,
      showDimensionBreakdown: true,
      includeRecommendations: true,
      includeReadingList: true,
      exportFormats: ['summary', 'json'],
    },
    uiConfig: {
      compactMode: false,
      showTooltips: true,
      animatedVisualizations: true,
      allowDrilldown: true,
    },
    algorithmConfig: {
      similarityMethod: 'weighted-cosine',
      enableDistanceCalibration: true,
      subDimensionWeighting: false,
      performanceOptimization: true,
    },
  },
}

export interface PerspectiveAnalysis {
  perspectiveId: string
  name: string
  focusDimensions: string[]
  keyInsights: string[]
  methodology: string
}

export const ADVANCED_PERSPECTIVES: PerspectiveAnalysis[] = [
  {
    perspectiveId: 'classical-ideology',
    name: '经典意识形态视角',
    focusDimensions: ['economic', 'social'],
    keyInsights: [
      '基于传统左右翼光谱的标准分析框架',
      '重点考察国家-市场关系与个人自由维度',
      '与20世纪主流政治思潮直接对标',
    ],
    methodology: '诺兰二维图表法 + 八象限意识形态映射',
  },
  {
    perspectiveId: 'cultural-critical',
    name: '文化批判视角',
    focusDimensions: ['cultural', 'social'],
    keyInsights: [
      '聚焦身份政治与文化价值分歧',
      '分析进步主义与传统主义的张力',
      '考察多元文化与民族认同的平衡',
    ],
    methodology: '文化唯物主义分析框架 + 后现代理论视角',
  },
  {
    perspectiveId: 'international-relations',
    name: '国际关系视角',
    focusDimensions: ['international', 'economic'],
    keyInsights: [
      '民族主义与全球主义的光谱定位',
      '地缘政治立场的系统映射',
      '全球化态度的多维度解构',
    ],
    methodology: '建构主义国际关系理论 + 世界体系分析',
  },
  {
    perspectiveId: 'ecological-political',
    name: '生态政治视角',
    focusDimensions: ['ecological', 'economic', 'cultural'],
    keyInsights: [
      '人类中心主义与生态中心主义定位',
      '可持续发展范式的意识形态基础',
      '技术乐观主义与审慎主义分野',
    ],
    methodology: '政治生态学 + 环境正义理论框架',
  },
  {
    perspectiveId: 'intersectional',
    name: '交叉性分析视角',
    focusDimensions: ['economic', 'social', 'cultural', 'international', 'ecological'],
    keyInsights: [
      '各维度权力关系的交叉作用分析',
      '意识形态内部的矛盾与张力识别',
      '多元压迫结构的系统性揭示',
    ],
    methodology: '黑人女权主义交叉性理论 + 霸权意识形态批判',
  },
]

export const PROFESSIONAL_SUB_DIMENSIONS = {
  economic: [
    { id: 'ownership', name: '所有制偏好', weight: 0.25 },
    { id: 'distribution', name: '分配正义观', weight: 0.25 },
    { id: 'regulation', name: '监管态度', weight: 0.20 },
    { id: 'labor', name: '劳资关系立场', weight: 0.15 },
    { id: 'welfare', name: '福利国家观', weight: 0.15 },
  ],
  social: [
    { id: 'autonomy', name: '个人自主权重', weight: 0.25 },
    { id: 'authority', name: '权威服从倾向', weight: 0.25 },
    { id: 'equality', name: '平等价值取向', weight: 0.25 },
    { id: 'security', name: '安全自由平衡', weight: 0.25 },
  ],
  cultural: [
    { id: 'tradition', name: '传统变革倾向', weight: 0.20 },
    { id: 'secular', name: '世俗宗教关系', weight: 0.20 },
    { id: 'identity', name: '身份政治立场', weight: 0.25 },
    { id: 'expression', name: '表达自由态度', weight: 0.20 },
    { id: 'science', name: '科学技术观', weight: 0.15 },
  ],
  international: [
    { id: 'sovereignty', name: '主权让渡意愿', weight: 0.30 },
    { id: 'migration', name: '移民政策立场', weight: 0.25 },
    { id: 'defense', name: '国防外交倾向', weight: 0.25 },
    { id: 'trade', name: '贸易政策偏好', weight: 0.20 },
  ],
  ecological: [
    { id: 'anthropocentric', name: '人类中心程度', weight: 0.30 },
    { id: 'growth', name: '增长范式态度', weight: 0.25 },
    { id: 'technology', name: '技术解决信念', weight: 0.25 },
    { id: 'justice', name: '代际正义观', weight: 0.20 },
  ],
}

export function getModeConfiguration(mode: AssessmentMode): ModeConfiguration {
  return MODE_CONFIGURATIONS[mode]
}

export function getQuestionsForMode(mode: AssessmentMode): number {
  return MODE_CONFIGURATIONS[mode].questionConfig.totalQuestions
}

export function getAdvancedPerspectives(): PerspectiveAnalysis[] {
  return ADVANCED_PERSPECTIVES
}

export function getProfessionalSubDimensions(dimension: string): any[] {
  return PROFESSIONAL_SUB_DIMENSIONS[dimension as keyof typeof PROFESSIONAL_SUB_DIMENSIONS] || []
}

export default MODE_CONFIGURATIONS
