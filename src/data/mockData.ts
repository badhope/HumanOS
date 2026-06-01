import { Assessment, Question } from '../types';
import { 
  BIG_FIVE_ASSESSMENT, 
  BIG_FIVE_QUESTIONS,
  BIG_FIVE_TRAITS,
  TRAIT_INTERPRETATIONS
} from './bigFiveData';
import { 
  STRESS_TEST_ASSESSMENT, 
  STRESS_TEST_QUESTIONS 
} from './stressTestData';
import { 
  GAD7_ASSESSMENT, 
  GAD7_QUESTIONS 
} from './anxietyGad7Data';

const otherAssessments: Assessment[] = [
  {
    id: 'emotion-management',
    title: '情绪管理能力',
    description: '测试你的情绪管理和社交能力。',
    category: '情绪',
    totalQuestions: 10,
    icon: '💗',
    difficulty: '简单',
    estimatedTime: '5分钟'
  }
];

export const mockAssessments: Assessment[] = [
  BIG_FIVE_ASSESSMENT,
  STRESS_TEST_ASSESSMENT,
  GAD7_ASSESSMENT,
  ...otherAssessments
];

export function generateMockQuestions(count: number): Question[] {
  const sampleQuestions: Question[] = [
    { id: 'q1', text: '你喜欢与人交往吗？', trait: 'E', reverse: false },
    { id: 'q2', text: '你经常思考问题的本质吗？', trait: 'O', reverse: false },
    { id: 'q3', text: '你做事有条理吗？', trait: 'C', reverse: false },
    { id: 'q4', text: '你容易信任他人吗？', trait: 'A', reverse: false },
    { id: 'q5', text: '你经常感到焦虑吗？', trait: 'N', reverse: true }
  ];
  
  if (count === 60) {
    return BIG_FIVE_QUESTIONS;
  }
  
  return Array.from({ length: count }, (_, i) => ({
    ...sampleQuestions[i % sampleQuestions.length],
    id: `q${i + 1}`
  }));
}

export const traitDescriptions = Object.entries(BIG_FIVE_TRAITS).map(([key, trait]) => ({
  name: trait.name,
  score: 50 + Math.floor(Math.random() * 30),
  description: TRAIT_INTERPRETATIONS[key as keyof typeof TRAIT_INTERPRETATIONS].high.description
}));

export function getQuestionsForAssessment(assessmentId: string): Question[] {
  if (assessmentId === 'big-five' || assessmentId === '1') {
    return BIG_FIVE_QUESTIONS;
  }
  if (assessmentId === 'stress-test' || assessmentId === '2') {
    return STRESS_TEST_QUESTIONS;
  }
  if (assessmentId === 'anxiety-gad7' || assessmentId === '3') {
    return GAD7_QUESTIONS;
  }
  if (assessmentId === 'emotion-management') {
    return generateMockQuestions(10);
  }
  return generateMockQuestions(10);
}
