export interface Assessment {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'lite' | 'standard' | 'expert'
  duration: number
  questions: Question[]
  resultCalculator: (answers: Answer[]) => AssessmentResult
}

export interface Question {
  id: string
  text: string
  type: 'single' | 'multiple' | 'scale'
  options: Option[]
  category?: string
}

export interface Option {
  id: string
  text: string
  value: number
  trait?: string
}

export interface Answer {
  questionId: string
  selectedOptions: string[]
  value?: number
}

export interface AssessmentResult {
  type: string
  title: string
  description: string
  traits: TraitScore[]
  details: {
    strengths: string[]
    weaknesses: string[]
    careers: string[]
    relationships: string
  }
  scores: Record<string, number>
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
  assessments: CompletedAssessment[]
  createdAt: Date
  updatedAt: Date
}

export interface CompletedAssessment {
  assessmentId: string
  completedAt: Date
  result: AssessmentResult
  answers: Answer[]
}

export interface NavItem {
  label: string
  path: string
  icon: string
}
