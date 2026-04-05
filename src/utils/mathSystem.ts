/**
 * 专业测评数学计算体系
 * 
 * 本模块定义了所有专业测评的数学计算框架，包括：
 * 1. 题目权重系统
 * 2. 维度计算公式
 * 3. 分数区间映射
 * 4. 细腻分析算法
 */

// ==================== 基础数学常量 ====================
export const MATH_CONSTANTS = {
  T_SCORE_MEAN: 50,
  T_SCORE_SD: 10,
  Z_SCORE_MEAN: 0,
  Z_SCORE_SD: 1,
  PERCENTILE_BASE: 100,
  CONFIDENCE_LEVEL_95: 1.96,
  CONFIDENCE_LEVEL_90: 1.645,
  CONFIDENCE_LEVEL_99: 2.576,
}

// ==================== 分数区间定义 ====================
export interface ScoreRange {
  min: number
  max: number
  level: string
  description: string
  color: string
  interpretation: string
}

export const SCORE_RANGES: ScoreRange[] = [
  {
    min: 0,
    max: 20,
    level: '极低',
    description: '显著低于平均水平',
    color: '#ef4444',
    interpretation: '该维度表现极低，可能需要特别关注和改进',
  },
  {
    min: 21,
    max: 35,
    level: '很低',
    description: '明显低于平均水平',
    color: '#f97316',
    interpretation: '该维度表现较低，建议进行针对性提升',
  },
  {
    min: 36,
    max: 44,
    level: '偏低',
    description: '略低于平均水平',
    color: '#f59e0b',
    interpretation: '该维度表现略低于平均，有提升空间',
  },
  {
    min: 45,
    max: 55,
    level: '平均',
    description: '处于平均水平',
    color: '#10b981',
    interpretation: '该维度表现正常，处于大多数人的水平',
  },
  {
    min: 56,
    max: 64,
    level: '偏高',
    description: '略高于平均水平',
    color: '#3b82f6',
    interpretation: '该维度表现较好，有一定优势',
  },
  {
    min: 65,
    max: 79,
    level: '很高',
    description: '明显高于平均水平',
    color: '#6366f1',
    interpretation: '该维度表现优秀，是个人优势',
  },
  {
    min: 80,
    max: 100,
    level: '极高',
    description: '显著高于平均水平',
    color: '#8b5cf6',
    interpretation: '该维度表现卓越，是突出优势',
  },
]

// ==================== MBTI 数学计算体系 ====================
export interface MBTICalculationSystem {
  dimensions: {
    EI: MBTIDimensionConfig
    SN: MBTIDimensionConfig
    TF: MBTIDimensionConfig
    JP: MBTIDimensionConfig
  }
  questionWeights: Record<string, MBTIQuestionWeight>
  clarityIndex: MBTIClarityConfig
}

export interface MBTIDimensionConfig {
  name: string
  leftPole: string
  rightPole: string
  questionCount: number
  maxScore: number
  formula: string
}

export interface MBTIQuestionWeight {
  id: string
  subscale: string
  direction: 'direct' | 'reverse'
  weights: {
    optionA: { trait: string; value: number }
    optionB: { trait: string; value: number }
  }
}

export interface MBTIClarityConfig {
  formula: string
  levels: {
    range: [number, number]
    level: string
    description: string
  }[]
}

export const MBTI_MATH_SYSTEM: MBTICalculationSystem = {
  dimensions: {
    EI: {
      name: '外向-内向',
      leftPole: 'E (外向)',
      rightPole: 'I (内向)',
      questionCount: 24,
      maxScore: 48,
      formula: 'E_score = Σ(E_option_values), I_score = Σ(I_option_values), Preference = E_score - I_score',
    },
    SN: {
      name: '感觉-直觉',
      leftPole: 'S (感觉)',
      rightPole: 'N (直觉)',
      questionCount: 24,
      maxScore: 48,
      formula: 'S_score = Σ(S_option_values), N_score = Σ(N_option_values), Preference = S_score - N_score',
    },
    TF: {
      name: '思考-情感',
      leftPole: 'T (思考)',
      rightPole: 'F (情感)',
      questionCount: 24,
      maxScore: 48,
      formula: 'T_score = Σ(T_option_values), F_score = Σ(F_option_values), Preference = T_score - F_score',
    },
    JP: {
      name: '判断-感知',
      leftPole: 'J (判断)',
      rightPole: 'P (感知)',
      questionCount: 21,
      maxScore: 42,
      formula: 'J_score = Σ(J_option_values), P_score = Σ(P_option_values), Preference = J_score - P_score',
    },
  },
  questionWeights: {},
  clarityIndex: {
    formula: 'Clarity = |Preference| / MaxPossibleScore × 100',
    levels: [
      { range: [0, 10], level: '轻微', description: '偏好不明显，可能两种倾向都有' },
      { range: [11, 25], level: '中等', description: '有一定偏好，但不够强烈' },
      { range: [26, 40], level: '清晰', description: '偏好比较明确' },
      { range: [41, 100], level: '非常清晰', description: '偏好非常明确和强烈' },
    ],
  },
}

// ==================== 大五人格 数学计算体系 ====================
export interface BigFiveCalculationSystem {
  domains: Record<string, BigFiveDomainConfig>
  facets: Record<string, BigFiveFacetConfig>
  scoringFormula: BigFiveScoringFormula
  normConversion: BigFiveNormConversion
}

export interface BigFiveDomainConfig {
  code: string
  name: string
  facetCount: number
  questionCount: number
  scoreRange: [number, number]
  tScoreFormula: string
}

export interface BigFiveFacetConfig {
  code: string
  name: string
  domain: string
  questionCount: number
  reverseScored: boolean[]
  weight: number
}

export interface BigFiveScoringFormula {
  rawScore: string
  domainScore: string
  tScore: string
  percentile: string
}

export interface BigFiveNormConversion {
  population: string
  sampleSize: number
  ageGroups: Record<string, { mean: number; sd: number }>
}

export const BIGFIVE_MATH_SYSTEM: BigFiveCalculationSystem = {
  domains: {
    N: {
      code: 'N',
      name: '神经质',
      facetCount: 6,
      questionCount: 48,
      scoreRange: [0, 240],
      tScoreFormula: 'T = 50 + 10 × (RawScore - Mean) / SD',
    },
    E: {
      code: 'E',
      name: '外向性',
      facetCount: 6,
      questionCount: 48,
      scoreRange: [0, 240],
      tScoreFormula: 'T = 50 + 10 × (RawScore - Mean) / SD',
    },
    O: {
      code: 'O',
      name: '开放性',
      facetCount: 6,
      questionCount: 48,
      scoreRange: [0, 240],
      tScoreFormula: 'T = 50 + 10 × (RawScore - Mean) / SD',
    },
    A: {
      code: 'A',
      name: '宜人性',
      facetCount: 6,
      questionCount: 48,
      scoreRange: [0, 240],
      tScoreFormula: 'T = 50 + 10 × (RawScore - Mean) / SD',
    },
    C: {
      code: 'C',
      name: '尽责性',
      facetCount: 6,
      questionCount: 48,
      scoreRange: [0, 240],
      tScoreFormula: 'T = 50 + 10 × (RawScore - Mean) / SD',
    },
  },
  facets: {},
  scoringFormula: {
    rawScore: 'RawScore = Σ(AnswerValues), with reverse scoring applied',
    domainScore: 'DomainScore = Σ(FacetScores) / FacetCount',
    tScore: 'TScore = 50 + 10 × (DomainScore - NormMean) / NormSD',
    percentile: 'Percentile = Φ(TScore) × 100, where Φ is the standard normal CDF',
  },
  normConversion: {
    population: '中国成年人常模',
    sampleSize: 2000,
    ageGroups: {
      '18-25': { mean: 120, sd: 20 },
      '26-35': { mean: 115, sd: 22 },
      '36-45': { mean: 110, sd: 24 },
      '46-55': { mean: 105, sd: 25 },
      '56+': { mean: 100, sd: 26 },
    },
  },
}

// ==================== SAS 焦虑量表 数学计算体系 ====================
export interface SASCalculationSystem {
  questionConfig: SASQuestionConfig[]
  scoringFormula: SASScoringFormula
  indexConversion: SASIndexConversion
  severityLevels: SASSeverityLevel[]
}

export interface SASQuestionConfig {
  id: string
  text: string
  reverseScored: boolean
  weight: number
}

export interface SASScoringFormula {
  rawScore: string
  indexScore: string
  interpretation: string
}

export interface SASIndexConversion {
  formula: string
  table: { rawRange: [number, number]; indexRange: [number, number] }[]
}

export interface SASSeverityLevel {
  indexRange: [number, number]
  level: string
  description: string
  recommendation: string
}

export const SAS_MATH_SYSTEM: SASCalculationSystem = {
  questionConfig: [
    { id: 'sas-1', text: '我感到比平常更神经过敏和焦虑', reverseScored: false, weight: 1 },
    { id: 'sas-2', text: '我无缘无故地感到害怕', reverseScored: false, weight: 1 },
    { id: 'sas-3', text: '我容易心里烦乱或觉得惊恐', reverseScored: false, weight: 1 },
    { id: 'sas-4', text: '我觉得我可能将要发疯', reverseScored: false, weight: 1 },
    { id: 'sas-5', text: '我觉得一切都很好，也不会发生什么不幸', reverseScored: true, weight: 1 },
    { id: 'sas-6', text: '我手脚发抖打颤', reverseScored: false, weight: 1 },
    { id: 'sas-7', text: '我因为头痛、颈痛和背痛而苦恼', reverseScored: false, weight: 1 },
    { id: 'sas-8', text: '我感觉容易衰弱和疲乏', reverseScored: false, weight: 1 },
    { id: 'sas-9', text: '我觉得心平气和，并且容易安静坐着', reverseScored: true, weight: 1 },
    { id: 'sas-10', text: '我觉得心跳得很快', reverseScored: false, weight: 1 },
    { id: 'sas-11', text: '我因为一阵阵头晕而苦恼', reverseScored: false, weight: 1 },
    { id: 'sas-12', text: '我有晕倒发作，或觉得要晕倒似的', reverseScored: false, weight: 1 },
    { id: 'sas-13', text: '我吸气呼气都感到很容易', reverseScored: true, weight: 1 },
    { id: 'sas-14', text: '我手脚麻木和刺痛', reverseScored: false, weight: 1 },
    { id: 'sas-15', text: '我因为胃痛和消化不良而苦恼', reverseScored: false, weight: 1 },
    { id: 'sas-16', text: '我常常要小便', reverseScored: false, weight: 1 },
    { id: 'sas-17', text: '我的手常常是干燥温暖的', reverseScored: true, weight: 1 },
    { id: 'sas-18', text: '我脸红发热', reverseScored: false, weight: 1 },
    { id: 'sas-19', text: '我容易入睡并且一夜睡得很好', reverseScored: true, weight: 1 },
    { id: 'sas-20', text: '我做恶梦', reverseScored: false, weight: 1 },
  ],
  scoringFormula: {
    rawScore: 'RawScore = Σ(Score_i), where Score_i = Value_i if not reverse, else (5 - Value_i)',
    indexScore: 'IndexScore = RawScore × 1.25 (取整数)',
    interpretation: 'IndexScore反映焦虑程度：<45正常，45-59轻度，60-74中度，≥75重度',
  },
  indexConversion: {
    formula: 'Index = Raw × 1.25',
    table: [
      { rawRange: [20, 35], indexRange: [25, 44] },
      { rawRange: [36, 47], indexRange: [45, 59] },
      { rawRange: [48, 59], indexRange: [60, 74] },
      { rawRange: [60, 80], indexRange: [75, 100] },
    ],
  },
  severityLevels: [
    {
      indexRange: [0, 44],
      level: '正常范围',
      description: '焦虑水平在正常范围内',
      recommendation: '保持良好的心理状态，继续关注心理健康',
    },
    {
      indexRange: [45, 59],
      level: '轻度焦虑',
      description: '存在轻度焦虑症状',
      recommendation: '建议进行放松训练，适当运动，如症状持续建议咨询专业人士',
    },
    {
      indexRange: [60, 74],
      level: '中度焦虑',
      description: '存在中度焦虑症状',
      recommendation: '建议寻求心理咨询师帮助，进行专业评估和干预',
    },
    {
      indexRange: [75, 100],
      level: '重度焦虑',
      description: '存在重度焦虑症状',
      recommendation: '强烈建议尽快就医，接受专业心理治疗或药物治疗',
    },
  ],
}

// ==================== EQ 情商 数学计算体系 ====================
export interface EQCalculationSystem {
  dimensions: Record<string, EQDimensionConfig>
  subscales: Record<string, EQSubscaleConfig>
  scoringFormula: EQScoringFormula
  profileAnalysis: EQProfileAnalysis
}

export interface EQDimensionConfig {
  code: string
  name: string
  subscaleCount: number
  questionCount: number
  weight: number
}

export interface EQSubscaleConfig {
  code: string
  name: string
  dimension: string
  questionCount: number
  reverseScored: boolean[]
}

export interface EQScoringFormula {
  subscaleScore: string
  dimensionScore: string
  totalEQ: string
  percentile: string
}

export interface EQProfileAnalysis {
  strengthThreshold: number
  developmentThreshold: number
  balanceFormula: string
}

export const EQ_MATH_SYSTEM: EQCalculationSystem = {
  dimensions: {
    SP: { code: 'SP', name: '自我认知', subscaleCount: 3, questionCount: 24, weight: 1 },
    SE: { code: 'SE', name: '自我表达', subscaleCount: 3, questionCount: 24, weight: 1 },
    IP: { code: 'IP', name: '人际关系', subscaleCount: 3, questionCount: 24, weight: 1 },
    DM: { code: 'DM', name: '决策能力', subscaleCount: 3, questionCount: 24, weight: 1 },
    SM: { code: 'SM', name: '压力管理', subscaleCount: 3, questionCount: 24, weight: 1 },
  },
  subscales: {},
  scoringFormula: {
    subscaleScore: 'SubscaleScore = Σ(AnswerValues) / QuestionCount × 20',
    dimensionScore: 'DimensionScore = Σ(SubscaleScores) / SubscaleCount',
    totalEQ: 'TotalEQ = Σ(DimensionScores) / DimensionCount',
    percentile: 'Percentile = lookup in norm table based on TotalEQ',
  },
  profileAnalysis: {
    strengthThreshold: 65,
    developmentThreshold: 45,
    balanceFormula: 'Balance = Max(DimensionScores) - Min(DimensionScores)',
  },
}

// ==================== 霍兰德职业兴趣 数学计算体系 ====================
export interface HollandCalculationSystem {
  types: Record<string, HollandTypeConfig>
  scoringFormula: HollandScoringFormula
  codeInterpretation: HollandCodeInterpretation
}

export interface HollandTypeConfig {
  code: string
  name: string
  questionCount: number
  maxScore: number
}

export interface HollandScoringFormula {
  typeScore: string
  dominantTypes: string
  hollandCode: string
}

export interface HollandCodeInterpretation {
  codeLength: number
  matchingCareers: string
  workEnvironment: string
}

export const HOLLAND_MATH_SYSTEM: HollandCalculationSystem = {
  types: {
    R: { code: 'R', name: '现实型', questionCount: 7, maxScore: 35 },
    I: { code: 'I', name: '研究型', questionCount: 7, maxScore: 35 },
    A: { code: 'A', name: '艺术型', questionCount: 7, maxScore: 35 },
    S: { code: 'S', name: '社会型', questionCount: 7, maxScore: 35 },
    E: { code: 'E', name: '企业型', questionCount: 7, maxScore: 35 },
    C: { code: 'C', name: '常规型', questionCount: 7, maxScore: 35 },
  },
  scoringFormula: {
    typeScore: 'TypeScore = Σ(AnswerValues for each type)',
    dominantTypes: 'DominantTypes = Sort(TypeScores) DESC, take top 3',
    hollandCode: 'HollandCode = Concatenate(DominantTypeCodes)',
  },
  codeInterpretation: {
    codeLength: 3,
    matchingCareers: 'Based on Holland Code dictionary',
    workEnvironment: 'Based on type combinations',
  },
}

// ==================== 依恋风格 数学计算体系 ====================
export interface AttachmentCalculationSystem {
  dimensions: Record<string, AttachmentDimensionConfig>
  scoringFormula: AttachmentScoringFormula
  styleClassification: AttachmentStyleClassification[]
}

export interface AttachmentDimensionConfig {
  code: string
  name: string
  questionCount: number
  maxScore: number
}

export interface AttachmentScoringFormula {
  dimensionScore: string
  averageScore: string
  styleDetermination: string
}

export interface AttachmentStyleClassification {
  anxietyRange: [number, number]
  avoidanceRange: [number, number]
  style: string
  name: string
  description: string
}

export const ATTACHMENT_MATH_SYSTEM: AttachmentCalculationSystem = {
  dimensions: {
    ANX: { code: 'ANX', name: '焦虑维度', questionCount: 18, maxScore: 126 },
    AVO: { code: 'AVO', name: '回避维度', questionCount: 18, maxScore: 126 },
  },
  scoringFormula: {
    dimensionScore: 'DimensionScore = Σ(AnswerValues)',
    averageScore: 'AverageScore = DimensionScore / QuestionCount',
    styleDetermination: 'Style = f(AnxietyAvg, AvoidanceAvg) based on quadrant',
  },
  styleClassification: [
    {
      anxietyRange: [0, 3],
      avoidanceRange: [0, 3],
      style: 'secure',
      name: '安全型',
      description: '低焦虑、低回避，能够建立健康的亲密关系',
    },
    {
      anxietyRange: [3, 7],
      avoidanceRange: [0, 3],
      style: 'preoccupied',
      name: '焦虑型',
      description: '高焦虑、低回避，渴望亲密但担心被拒绝',
    },
    {
      anxietyRange: [0, 3],
      avoidanceRange: [3, 7],
      style: 'dismissive',
      name: '回避型',
      description: '低焦虑、高回避，倾向于独立和自我依赖',
    },
    {
      anxietyRange: [3, 7],
      avoidanceRange: [3, 7],
      style: 'fearful',
      name: '恐惧型',
      description: '高焦虑、高回避，渴望亲密但又害怕受伤害',
    },
  ],
}

// ==================== 通用计算函数 ====================

/**
 * 计算T分数
 * T = 50 + 10 × (X - M) / SD
 */
export function calculateTScore(rawScore: number, mean: number, sd: number): number {
  return Math.round(MATH_CONSTANTS.T_SCORE_MEAN + MATH_CONSTANTS.T_SCORE_SD * ((rawScore - mean) / sd))
}

/**
 * 计算Z分数
 * Z = (X - M) / SD
 */
export function calculateZScore(rawScore: number, mean: number, sd: number): number {
  return (rawScore - mean) / sd
}

/**
 * 计算百分位数（使用正态分布近似）
 */
export function calculatePercentileFromTScore(tScore: number): number {
  const zScore = (tScore - MATH_CONSTANTS.T_SCORE_MEAN) / MATH_CONSTANTS.T_SCORE_SD
  return Math.round(normalCDF(zScore) * 100)
}

/**
 * 标准正态分布累积分布函数近似
 */
function normalCDF(x: number): number {
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x < 0 ? -1 : 1
  x = Math.abs(x) / Math.sqrt(2)

  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return 0.5 * (1.0 + sign * y)
}

/**
 * 根据分数获取分数区间
 */
export function getScoreRange(score: number): ScoreRange {
  for (const range of SCORE_RANGES) {
    if (score >= range.min && score <= range.max) {
      return range
    }
  }
  return SCORE_RANGES[SCORE_RANGES.length - 1]
}

/**
 * 计算置信区间
 */
export function calculateConfidenceInterval(
  score: number,
  sd: number,
  n: number,
  level: 0.90 | 0.95 | 0.99 = 0.95
): { lower: number; upper: number; level: number } {
  const zValues = {
    0.90: MATH_CONSTANTS.CONFIDENCE_LEVEL_90,
    0.95: MATH_CONSTANTS.CONFIDENCE_LEVEL_95,
    0.99: MATH_CONSTANTS.CONFIDENCE_LEVEL_99,
  }
  const z = zValues[level]
  const se = sd / Math.sqrt(n)
  const margin = z * se

  return {
    lower: Math.round(score - margin),
    upper: Math.round(score + margin),
    level,
  }
}

/**
 * 计算Cronbach's Alpha信度系数
 * α = (k / (k - 1)) × (1 - Σ(σi²) / σt²)
 */
export function calculateCronbachAlpha(itemVariances: number[], totalVariance: number): number {
  const k = itemVariances.length
  const sumItemVariances = itemVariances.reduce((sum, v) => sum + v, 0)
  return (k / (k - 1)) * (1 - sumItemVariances / totalVariance)
}

/**
 * 加权平均计算
 */
export function calculateWeightedAverage(values: number[], weights: number[]): number {
  if (values.length !== weights.length) {
    throw new Error('Values and weights must have the same length')
  }
  const sum = values.reduce((acc, val, i) => acc + val * weights[i], 0)
  const weightSum = weights.reduce((acc, w) => acc + w, 0)
  return sum / weightSum
}

/**
 * 标准差计算
 */
export function calculateStandardDeviation(values: number[]): number {
  const n = values.length
  const mean = values.reduce((sum, v) => sum + v, 0) / n
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2))
  const variance = squaredDiffs.reduce((sum, v) => sum + v, 0) / n
  return Math.sqrt(variance)
}

/**
 * 计算维度平衡度
 */
export function calculateDimensionBalance(scores: number[]): {
  balance: number
  dominantIndex: number
  weakestIndex: number
  description: string
} {
  const max = Math.max(...scores)
  const min = Math.min(...scores)
  const balance = max - min
  const dominantIndex = scores.indexOf(max)
  const weakestIndex = scores.indexOf(min)

  let description = ''
  if (balance <= 10) {
    description = '各维度发展均衡'
  } else if (balance <= 20) {
    description = '各维度发展较为均衡'
  } else if (balance <= 30) {
    description = '存在一定的维度差异'
  } else {
    description = '维度差异明显，建议关注薄弱环节'
  }

  return { balance, dominantIndex, weakestIndex, description }
}
