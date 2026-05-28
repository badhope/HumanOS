import { ideologyEnhancedAssessment as enhancedConfig, getQuestionsForVersion } from '../data/assessments/ideology-enhanced'
import { standardAssessments } from '../data/assessments'
import type { EnhancedQuestion } from '../data/assessments/ideology-enhanced'

export interface Option {
  id: string
  text: string
  value: number
  sort_order: number
}

export interface Question {
  id: string
  type: 'core-principle' | 'policy-stand' | 'value-question' | 'trade-off' | 'single' | 'likert-5' | 'likert-7'
  text: string
  dimension: string
  weight: number
  discrimination: number
  difficulty: number
  reverse_scored: boolean
  options: Option[]
}

export interface Assessment {
  id: string
  title: string
  description: string
  category: string
  subcategory?: string
  difficulty: string
  duration: number
  quality: string
}

export interface Session {
  session_id: string
  assessment_id: string
  mode: 'normal' | 'professional'
  questions: Question[]
  total_questions: number
  answers?: Map<string, { questionId: string; optionId: string; value: number }>
}

export interface SessionProgress {
  session_id: string
  answered_count: number
  total_questions: number
}

export interface Result {
  id: string
  assessment_id: string
  session_id: string
  scores: Record<string, number>
  labels: Record<string, string>
  completed_at: string
  answers: Record<string, number>
}

const sessions = new Map<string, Session>()
const results = new Map<string, Result>()
let sessionCounter = 0

function generateId() {
  return `${Date.now()}-${++sessionCounter}`
}

function formatQuestion(q) {
  return {
    id: q.id,
    type: q.type || 'single',
    text: q.text,
    dimension: q.dimension || 'general',
    weight: q.weight || 1,
    discrimination: q.discrimination || 0.5,
    difficulty: q.difficulty || 0.5,
    reverse_scored: q.reverseScored || q.reverse_scored || false,
    options: q.options.map((o, idx) => ({
      id: o.id,
      text: o.text,
      value: o.value,
      sort_order: idx
    }))
  }
}

// Helper functions without `this` dependency
async function getAssessmentHelper(assessmentId) {
  if (assessmentId === 'ideology-enhanced') {
    return {
      id: enhancedConfig.id,
      title: enhancedConfig.title,
      description: enhancedConfig.description,
      category: enhancedConfig.category,
      subcategory: enhancedConfig.subcategory,
      difficulty: enhancedConfig.difficulty,
      duration: enhancedConfig.duration,
      quality: enhancedConfig.quality,
    };
  }

  // Check standard assessments
  const assessment = standardAssessments[assessmentId as keyof typeof standardAssessments];
  if (assessment) {
    return {
      id: assessment.id,
      title: assessment.title,
      description: assessment.description,
      category: assessment.category,
      subcategory: assessment.subcategory,
      difficulty: assessment.difficulty,
      duration: assessment.duration,
      quality: assessment.quality,
    };
  }

  throw new Error(`测评 ${assessmentId} 不存在`);
}

async function getAssessmentQuestionsHelper(assessmentId, mode = 'normal') {
  if (assessmentId === 'ideology-enhanced') {
    const localQuestions = getQuestionsForVersion(mode);
    return localQuestions.map(formatQuestion);
  }

  // Check standard assessments
  const assessment = standardAssessments[assessmentId as keyof typeof standardAssessments];
  if (assessment) {
    // Check if assessment has questions
    if ('questions' in assessment && Array.isArray(assessment.questions)) {
      let questions = assessment.questions;
      
      // Check if assessment has professionalQuestions for different modes
      if ('professionalQuestions' in assessment && assessment.professionalQuestions) {
        const proQuestions = assessment.professionalQuestions as any;
        if (mode === 'professional' && proQuestions.professional?.length) {
          questions = proQuestions.professional;
        } else if (proQuestions.normal?.length) {
          questions = proQuestions.normal;
        }
      } else {
        // For normal mode, limit to 28 questions if there are more
        if (mode === 'normal' && questions.length > 28) {
          questions = questions.slice(0, 28);
        }
      }
      
      return questions.map(formatQuestion);
    }
  }

  throw new Error(`测评 ${assessmentId} 不存在`);
}

function calculateResultHelper(session) {
  const answers = session.answers || new Map();

  const scores = {};
  const dimensionScores = {};

  const dimensions = new Set(session.questions.map((q) => q.dimension));
  dimensions.forEach((dim) => {
    scores[dim] = [];
  });

  session.questions.forEach((q) => {
    const answer = answers.get(q.id);
    if (answer) {
      const dim = q.dimension;
      if (scores[dim]) {
        const value = q.reverse_scored ? 6 - answer.value : answer.value;
        scores[dim].push(value * q.weight);
      }
    }
  });

  dimensions.forEach((dim) => {
    const dimScores = scores[dim];
    if (dimScores.length > 0) {
      const avg = dimScores.reduce((a, b) => a + b, 0) / dimScores.length;
      dimensionScores[dim] = ((avg - 1) / 4) * 100;
    } else {
      dimensionScores[dim] = 50;
    }
  });

  const labels = generateLabelsHelper(dimensionScores);

  return {
    id: generateId(),
    assessment_id: session.assessment_id,
    session_id: session.session_id,
    scores: dimensionScores,
    labels,
    completed_at: new Date().toISOString(),
    answers: Object.fromEntries(answers),
  };
}

function generateLabelsHelper(scores) {
  const labels = {};

  Object.keys(scores).forEach((dim) => {
    const score = scores[dim];
    if (score < 30) {
      labels[dim] = '低';
    } else if (score < 45) {
      labels[dim] = '偏低';
    } else if (score < 55) {
      labels[dim] = '中等';
    } else if (score < 70) {
      labels[dim] = '偏高';
    } else {
      labels[dim] = '高';
    }
  });

  return labels;
}

export const apiService = {
  getAssessment: getAssessmentHelper,
  getAssessmentQuestions: getAssessmentQuestionsHelper,
  createSession: async (assessmentId, mode = 'normal') => {
    const questions = await getAssessmentQuestionsHelper(assessmentId, mode);
    const session = {
      session_id: generateId(),
      assessment_id: assessmentId,
      mode,
      questions,
      total_questions: questions.length,
      answers: new Map(),
    };
    sessions.set(session.session_id, session);
    return session;
  },
  getSession: async (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error(`会话 ${sessionId} 不存在`);
    }
    return {
      session_id: sessionId,
      answered_count: session.answers?.size || 0,
      total_questions: session.total_questions,
    };
  },
  saveAnswer: async (sessionId, questionId, optionId, value) => {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error(`会话 ${sessionId} 不存在`);
    }
    if (!session.answers) {
      session.answers = new Map();
    }
    session.answers.set(questionId, { questionId, optionId, value });
    return {
      success: true,
      answer_id: `answer-${questionId}`,
      saved_count: session.answers.size,
    };
  },
  updateAnswer: async (sessionId, questionId, optionId, value) => {
    const result = await apiService.saveAnswer(sessionId, questionId, optionId, value);
    return { success: result.success };
  },
  submitAssessment: async (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error(`会话 ${sessionId} 不存在`);
    }
    const result = calculateResultHelper(session);
    results.set(result.id, result);
    sessions.delete(sessionId);
    return result;
  },
  calculateResult: calculateResultHelper,
  generateLabels: generateLabelsHelper,
  getResult: async (resultId) => {
    const result = results.get(resultId);
    if (!result) {
      throw new Error(`结果 ${resultId} 不存在`);
    }
    return result;
  },
};

export default apiService;
