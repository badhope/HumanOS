export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  dimension: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  value: number;
}

export interface Dimension {
  id: string;
  name: string;
  description: string;
  weights?: Record<string, number>;
}

export interface Assessment {
  id: string;
  assessmentId: string;
  name: string;
  category: AssessmentCategory;
  description: string;
  duration: number;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  dimensions: Dimension[];
  questions: Question[];
  analysisTemplate: string;
  version: string;
}

export type AssessmentCategory =
  | 'personality'
  | 'psychology'
  | 'cognitive'
  | 'ideology'
  | 'career';

export interface AssessmentResult {
  id?: number;
  assessmentId: string;
  category: AssessmentCategory;
  completedAt: Date;
  answers: Record<string, number>;
  score: number;
  dimensions: Record<string, number>;
  percentile?: Record<string, number>;
  analysis?: string;
  reliability?: number;
}

export interface AssessmentMetadata {
  assessmentId: string;
  name: string;
  category: AssessmentCategory;
  description: string;
  duration: number;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  participantCount: number;
  averageScore?: number;
}
