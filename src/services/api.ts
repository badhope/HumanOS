import { ideologyEnhancedAssessment as enhancedConfig, getQuestionsForVersion } from '../data/assessments/ideology-enhanced'
import { standardAssessments } from '../data/assessments'
import { getDimensionDescriptionForAssessment } from '../utils/assessmentDescriptions'
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
      professional_question_count: 56,
      normal_question_count: 28,
      ...enhancedConfig,
    };
  }

  // Check standard assessments
  const assessment = standardAssessments[assessmentId as keyof typeof standardAssessments];
  if (assessment) {
    return {
      ...assessment,
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
  // session.answers 是 Map<string, { questionId: string; optionId: string; value: number }>
  const answersMap = session.answers || new Map();

  // 转换为兼容格式
  const answers: Record<string, number> = {};
  answersMap.forEach((answer, questionId) => {
    answers[questionId] = answer.value;
  });

  const scores: Record<string, number[]> = {};
  const dimensionScores: Record<string, number> = {};

  // 收集所有维度
  const dimensions = new Set<string>();
  session.questions.forEach((q) => {
    dimensions.add(q.dimension || 'general');
  });
  
  dimensions.forEach((dim) => {
    scores[dim] = [];
  });

  // 计算每个维度的得分
  session.questions.forEach((q) => {
    const dim = q.dimension || 'general';
    const answer = answers[q.id] || answersMap.get(q.id);
    
    if (answer !== undefined) {
      let value = typeof answer === 'object' ? answer.value : answer;
      
      // 反向计分
      if (q.reverse_scored) {
        // 假设选项最大值为5，则反向计分为 6 - value
        value = 6 - value;
      }
      
      const weight = q.weight || 1;
      scores[dim].push(value * weight);
    }
  });

  // 计算每个维度的平均分并转换为 0-100
  const dimensionsArray: Array<{
    name: string;
    score: number;
    description?: string;
    title?: string;
    tags?: string[];
    suggestions?: string[];
  }> = [];
  
  dimensions.forEach((dim) => {
    const dimScores = scores[dim];
    let dimensionScore = 50; // 默认值
    
    if (dimScores.length > 0) {
      const avg = dimScores.reduce((a, b) => a + b, 0) / dimScores.length;
      // 将 1-5 量表转换为 0-100
      dimensionScore = ((avg - 1) / 4) * 100;
    }
    
    dimensionScores[dim] = dimensionScore;
    
    // 使用新的描述系统获取详细描述
    const detailedDesc = getDimensionDescriptionForAssessment(
      session.assessment_id,
      dim,
      dimensionScore
    );
    
    dimensionsArray.push({
      name: dim,
      score: dimensionScore,
      title: detailedDesc.title,
      description: detailedDesc.description,
      tags: detailedDesc.tags,
      suggestions: detailedDesc.suggestions
    });
  });

  const labels = generateLabelsHelper(dimensionScores);
  
  // 计算综合得分
  const allScores = Object.values(dimensionScores);
  const overallScore = allScores.length > 0 
    ? allScores.reduce((a, b) => a + b, 0) / allScores.length 
    : 50;

  return {
    id: generateId(),
    result_id: generateId(),
    assessment_id: session.assessment_id,
    session_id: session.session_id,
    mode: session.mode,
    scores: dimensionScores,
    labels,
    completed_at: new Date().toISOString(),
    answers,
    dimensions: dimensionsArray,
    score: overallScore,
    percentile: Math.round(100 - overallScore),
    accuracy: calculateAccuracy(session.questions.length, Object.keys(answers).length),
  };
}

function getDimensionDescription(dimension: string, score: number): string {
  const descriptions: Record<string, { high: string; medium: string; low: string }> = {
    'social_anxiety': {
      high: '您的社交焦虑水平较高，在社交场合容易感到紧张和不安',
      medium: '您有一定的社交焦虑，在某些场合可能会感到紧张',
      low: '您能够从容应对各种社交场合，社交焦虑水平较低'
    },
    'somatic_anxiety': {
      high: '您经常出现焦虑的躯体症状，如心慌、出汗等',
      medium: '您偶尔会出现焦虑相关的躯体反应',
      low: '您的身体状态较为放松，焦虑躯体症状较少'
    },
    'cognitive_anxiety': {
      high: '您容易过度担忧，脑子里总是想各种可能出问题的事情',
      medium: '您有时会过度担心，但能够自我调节',
      low: '您心态平和，不容易被担忧困扰'
    },
    'sleep_anxiety': {
      high: '您的睡眠质量较差，经常受到失眠或噩梦的困扰',
      medium: '您的睡眠一般，有时会受到影响',
      low: '您的睡眠质量良好，能够安稳入睡'
    },
    'general': {
      high: '您在此维度得分较高',
      medium: '您在此维度得分中等',
      low: '您在此维度得分较低'
    },
    'economic': {
      high: '您在经济议题上倾向于保护主义',
      medium: '您在经济议题上持中立或平衡立场',
      low: '您在经济议题上倾向于自由主义'
    },
    'social': {
      high: '您在社会议题上倾向于权威主义',
      medium: '您对社会议题持中立立场',
      low: '您在社会议题上倾向于自由主义'
    },
    'cultural': {
      high: '您在文化议题上倾向于传统保守',
      medium: '您在文化议题上持平衡立场',
      low: '您在文化议题上倾向于开放进步'
    },
    'diplomatic': {
      high: '您在外交议题上倾向于民族主义',
      medium: '您在外交议题上持平衡立场',
      low: '您在外交议题上倾向于全球主义'
    },
    'governance': {
      high: '您倾向于强政府模式',
      medium: '您对政府角色持平衡态度',
      low: '您倾向于小政府模式'
    },
    'civil_liberty': {
      high: '您高度重视公民自由',
      medium: '您在公民自由与安全间寻求平衡',
      low: '您更重视社会秩序'
    },
    'technological': {
      high: '您对技术发展持谨慎态度',
      medium: '您对技术发展持平衡观点',
      low: '您是技术乐观主义者'
    }
  };
  
  const dimDesc = descriptions[dimension] || descriptions['general'];
  if (score >= 60) return dimDesc.high;
  if (score >= 40) return dimDesc.medium;
  return dimDesc.low;
}

function calculateAccuracy(totalQuestions: number, answeredQuestions: number): number {
  if (totalQuestions === 0) return 0;
  const ratio = answeredQuestions / totalQuestions;
  return Math.round(ratio * 100);
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
