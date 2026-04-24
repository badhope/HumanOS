export interface Assessment {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  difficulty: 'lite' | 'standard' | 'expert'
  duration: number
  quality: string
  icon?: string
  questionCount?: number
  questions: Question[]
  resultCalculator: (answers: Answer[]) => Record<string, any> | AssessmentResult
  tag?: string
  cardStyle?: 'default' | 'flip' | 'glow'
  professionalQuestions?: ProfessionalQuestionSet
  professionalCalculator?: (answers: Answer[], mode: string) => Record<string, any> | ProfessionalAssessmentResult
}

export interface ProfessionalQuestionSet {
  normal?: ProfessionalQuestion[]
  normal30?: ProfessionalQuestion[]
  advanced?: ProfessionalQuestion[]
  advanced60?: ProfessionalQuestion[]
  professional: ProfessionalQuestion[]
  professional120?: ProfessionalQuestion[]
}

export interface ProfessionalQuestion {
  id: string
  text: string
  type: 'single' | 'multiple' | 'scale' | 'ranking' | 'scenario' | 'likert-3' | 'likert-4' | 'likert-5' | 'likert-6' | 'likert-6-reverse' | 'likert-7'
  scenario?: string
  dimensions?: string[]
  options: ProfessionalOption[]
  category?: string
  subscale?: string
  reverseScored?: boolean
  normGroup?: string
}

export interface ProfessionalOption {
  id?: string
  text: string
  value: number
  trait?: string
  dimension?: string
}

export interface ProfessionalAssessmentResult extends AssessmentResult {
  mode: 'normal' | 'advanced' | 'professional'
  standardScore?: number
  percentileRank?: number
  confidenceInterval?: {
    lower: number
    upper: number
    level: number
  }
  reliability?: {
    cronbachAlpha: number
    testRetest?: number
  }
  validity?: {
    constructValidity: number
    criterionValidity: number
  }
  normComparison?: {
    population: string
    mean: number
    sd: number
    percentile: number
  }
  clinicalInterpretation?: string
  diagnosticIndicators?: string[]
  interventionRecommendations?: string[]
  references?: string[]
  subscaleScores?: Record<string, SubscaleScore>
  profileAnalysis?: Record<string, any>
  riskAssessment?: RiskAssessment
  tertiaryType?: {
    code: string
    title: string
    description: string
  }
}

export interface SubscaleScore {
  rawScore: number
  maxScore: number
  standardScore: number
  percentile: number
  level: 'very_low' | 'low' | 'average' | 'high' | 'very_high'
  interpretation: string
}

export interface ProfileDimension {
  score: number
  percentile: number
  level: string
  description: string
  clinicalSignificance?: string
}

export interface RiskAssessment {
  level: 'minimal' | 'low' | 'moderate' | 'high' | 'severe'
  indicators: string[]
  recommendations: string[]
  requiresFollowUp: boolean
}

export interface Question {
  id: string
  text: string
  type: 'single' | 'multiple' | 'scale' | 'scenario' | 'ranking' | 'likert-3' | 'likert-4' | 'likert-5' | 'likert-6' | 'likert-6-reverse' | 'likert-7'
  scenario?: string
  subscale?: string
  dimension?: string
  reverseScored?: boolean
  options: Option[]
  category?: string
  meta?: Record<string, any>
}

export interface Option {
  id?: string
  text: string
  value: number
  trait?: string
}

export interface Answer {
  questionId: string
  selectedOptions: string[]
  value?: number
  trait?: string
  dimension?: string
  subscale?: string
  isCorrect?: boolean
}

export interface AssessmentResult {
  [key: string]: any
  type?: string
  typeCode?: string
  typeName?: string
  title?: string
  subtitle?: string
  summary?: string
  description?: string
  score?: number
  accuracy?: number
  dimensions?: Dimension[]
  strengths?: string[]
  weaknesses?: string[]
  careers?: string[]
  suggestions?: string[]
  meta?: Record<string, any>
  
  cognitiveFunctions?: {
    dominant: string
    auxiliary: string
    tertiary: string
    inferior: string
  }
  
  relationships?: string
  learning?: string
  
  profileAnalysis?: {
    openness?: DimensionDetail
    conscientiousness?: DimensionDetail
    extraversion?: DimensionDetail
    agreeableness?: DimensionDetail
    neuroticism?: DimensionDetail
  }
  
  cognitiveProfile?: {
    logical: string
    spatial: string
    verbal: string
    memory: string
  }
  
  iqRange?: string
  percentile?: string
  
  eqDimensions?: {
    selfAwareness: string
    selfManagement: string
    socialAwareness: string
    relationshipManagement: string
  }
  
  eqRange?: string
  improvementAreas?: string[]
  
  hollandCode?: string
  primaryType?: {
    code: string
    title: string
    description: string
  }
  secondaryType?: {
    code: string
    title: string
    description: string
  }
  workEnvironment?: string
  workStyle?: string
  
  traits?: TraitScore[]
  details?: {
    strengths?: string[]
    weaknesses?: string[]
    careers?: string[]
    relationships?: string
    [key: string]: unknown
  }
  scores?: Record<string, number>
}

export interface Dimension {
  name: string
  score: number
  maxScore?: number
  description?: string
  clarity?: number
  tScore?: number
  level?: string
  percentile?: number
  confidenceInterval?: {
    lower: number
    upper: number
    level: number
  }
}

export interface DimensionDetail {
  score: number
  level: string
  description: string
}

export interface TraitScore {
  name: string
  score: number
  maxScore: number
  description: string
}

export interface UserProfile {
  id: string
  name: string
  avatar?: string
  bio?: string
  assessments: CompletedAssessment[]
  createdAt: Date | number
  updatedAt?: Date
}

export interface CompletedAssessment {
  id?: string
  assessmentId: string
  completedAt: Date
  result: any
  answers: Answer[]
  mode?: string
  calculationSource?: 'frontend' | 'backend'
}

export interface NavItem {
  label: string
  path: string
  icon: string
}
