export interface AnalysisDimension {
  id: string
  name: string
  category: 'career' | 'personality' | 'status' | 'planning'
  description: string
  indicators: AnalysisIndicator[]
  weight: number
}

export interface AnalysisIndicator {
  id: string
  name: string
  description: string
  calculationMethod: string
  relatedTraits: string[]
  thresholdValues: {
    low: number
    medium: number
    high: number
  }
}

export interface AnalysisResult {
  dimension: string
  score: number
  level: 'low' | 'medium' | 'high'
  interpretation: string
  recommendations: string[]
  relatedFactors: string[]
  confidence: number
}

export interface ComprehensiveAnalysis {
  careerAnalysis: CareerAnalysisResult
  personalityAnalysis: PersonalityAnalysisResult
  statusAnalysis: StatusAnalysisResult
  planningAnalysis: PlanningAnalysisResult
  overallScore: number
  overallInterpretation: string
  keyStrengths: string[]
  areasForImprovement: string[]
  actionPlan: ActionPlan
}

export interface CareerAnalysisResult {
  suitableCareers: CareerMatch[]
  careerDevelopmentPath: CareerPath[]
  skillAssessment: SkillAssessment
  workEnvironmentPreference: WorkEnvironmentPreference
  leadershipPotential: LeadershipPotential
  teamRole: TeamRole
}

export interface CareerMatch {
  career: string
  matchScore: number
  reasons: string[]
  requiredSkills: string[]
  growthPotential: number
  salaryRange?: {
    entry: string
    mid: string
    senior: string
  }
}

export interface CareerPath {
  stage: string
  timeline: string
  milestones: string[]
  skills: string[]
  challenges: string[]
}

export interface SkillAssessment {
  technicalSkills: SkillCategory[]
  softSkills: SkillCategory[]
  transferableSkills: SkillCategory[]
  overallScore: number
}

export interface SkillCategory {
  name: string
  score: number
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  description: string
  improvementSuggestions: string[]
}

export interface WorkEnvironmentPreference {
  preferredType: 'remote' | 'hybrid' | 'onsite' | 'flexible'
  teamSize: 'small' | 'medium' | 'large'
  workStyle: 'independent' | 'collaborative' | 'mixed'
  pace: 'relaxed' | 'moderate' | 'fast'
  culture: string[]
}

export interface LeadershipPotential {
  score: number
  style: string
  strengths: string[]
  developmentAreas: string[]
  suitableRoles: string[]
}

export interface TeamRole {
  primaryRole: string
  secondaryRole: string
  contributionStyle: string
  collaborationPreference: string
}

export interface PersonalityAnalysisResult {
  coreTraits: PersonalityTrait[]
  strengths: PersonalityStrength[]
  blindSpots: PersonalityBlindSpot[]
  behavioralPatterns: BehavioralPattern[]
  emotionalIntelligence: EmotionalIntelligence
  socialStyle: SocialStyle
  decisionMakingStyle: DecisionMakingStyle
  stressResponse: StressResponse
}

export interface PersonalityTrait {
  name: string
  score: number
  percentile: number
  description: string
  manifestation: string[]
  impact: string
}

export interface PersonalityStrength {
  name: string
  description: string
  examples: string[]
  howToLeverage: string[]
}

export interface PersonalityBlindSpot {
  name: string
  description: string
  potentialImpact: string
  mitigationStrategies: string[]
}

export interface BehavioralPattern {
  pattern: string
  frequency: string
  triggers: string[]
  outcomes: string[]
  recommendations: string[]
}

export interface EmotionalIntelligence {
  overallScore: number
  selfAwareness: number
  selfRegulation: number
  motivation: number
  empathy: number
  socialSkills: number
  developmentPlan: string[]
}

export interface SocialStyle {
  type: string
  characteristics: string[]
  communicationPreference: string[]
  relationshipBuilding: string[]
}

export interface DecisionMakingStyle {
  type: string
  characteristics: string[]
  strengths: string[]
  weaknesses: string[]
  improvementTips: string[]
}

export interface StressResponse {
  typicalResponse: string
  copingMechanisms: string[]
  resilienceLevel: number
  stressors: string[]
  healthyStrategies: string[]
}

export interface StatusAnalysisResult {
  currentMentalState: MentalState
  lifeSatisfaction: LifeSatisfaction
  workLifeBalance: WorkLifeBalance
  physicalWellbeing: PhysicalWellbeing
  socialConnections: SocialConnections
  financialHealth: FinancialHealth
  personalGrowth: PersonalGrowth
}

export interface MentalState {
  overallScore: number
  anxiety: number
  depression: number
  stress: number
  happiness: number
  mindfulness: number
  warning: string[]
  positiveIndicators: string[]
}

export interface LifeSatisfaction {
  overallScore: number
  career: number
  relationships: number
  health: number
  finance: number
  personalGrowth: number
  recreation: number
}

export interface WorkLifeBalance {
  score: number
  workHours: string
  personalTime: string
  boundaries: string
  burnoutRisk: number
  recommendations: string[]
}

export interface PhysicalWellbeing {
  score: number
  energyLevel: number
  sleepQuality: number
  exerciseFrequency: string
  dietaryHabits: string
  healthConcerns: string[]
}

export interface SocialConnections {
  score: number
  familyRelationships: number
  friendships: number
  romanticRelationship: number
  professionalNetwork: number
  communityInvolvement: number
  loneliness: number
}

export interface FinancialHealth {
  score: number
  stability: number
  satisfaction: number
  stress: number
  goals: string[]
  concerns: string[]
}

export interface PersonalGrowth {
  score: number
  learningOrientation: number
  goalProgress: number
  selfActualization: number
  achievements: string[]
  aspirations: string[]
}

export interface PlanningAnalysisResult {
  shortTermGoals: Goal[]
  mediumTermGoals: Goal[]
  longTermGoals: Goal[]
  developmentPlan: DevelopmentPlan
  potentialObstacles: Obstacle[]
  resources: Resource[]
  timeline: Timeline
}

export interface Goal {
  id: string
  description: string
  category: string
  priority: 'high' | 'medium' | 'low'
  timeframe: string
  progress: number
  milestones: Milestone[]
  successCriteria: string[]
  potentialChallenges: string[]
}

export interface Milestone {
  description: string
  targetDate: string
  status: 'not_started' | 'in_progress' | 'completed'
}

export interface DevelopmentPlan {
  focusAreas: string[]
  actionItems: ActionItem[]
  timeline: string
  resources: string[]
  supportNeeded: string[]
}

export interface ActionItem {
  description: string
  priority: 'high' | 'medium' | 'low'
  deadline: string
  resources: string[]
  expectedOutcome: string
}

export interface Obstacle {
  description: string
  probability: number
  impact: number
  mitigationStrategy: string
}

export interface Resource {
  type: 'skill' | 'knowledge' | 'network' | 'financial' | 'time' | 'tool'
  name: string
  availability: 'available' | 'partial' | 'needed'
  howToAcquire?: string
}

export interface Timeline {
  phase: string
  duration: string
  goals: string[]
  activities: string[]
  checkpoints: string[]
}

export interface ActionPlan {
  immediate: ActionPhase
  shortTerm: ActionPhase
  mediumTerm: ActionPhase
  longTerm: ActionPhase
}

export interface ActionPhase {
  timeframe: string
  priorities: string[]
  actions: string[]
  resources: string[]
  expectedOutcomes: string[]
}
