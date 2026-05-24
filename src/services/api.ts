/**
 * MindMirror API 服务
 * 使用本地数据，无需后端
 */

import { ideologyEnhancedAssessment, getQuestionsForVersion } from '../data/assessments/ideology-enhanced'
import type { EnhancedQuestion } from '../data/assessments/ideology-enhanced'


/**
 * 类型定义
 */
export interface Option {
  id: string
  text: string
  value: number
  sort_order: number
}

export interface Question {
  id: string
  type: 'core-principle' | 'policy-stand' | 'value-question' | 'trade-off'
  text: string
  dimension: 'economic' | 'social' | 'cultural' | 'diplomatic' | 'ecological'
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

// 本地存储的会话数据
const sessions = new Map<string, Session>()
const results = new Map<string, Result>()
let sessionCounter = 0


/**
 * 辅助函数：生成唯一ID
 */
function generateId(): string {
  return `${Date.now()}-${++sessionCounter}`
}

/**
 * 辅助函数：将本地问题格式转换为API格式
 */
function formatQuestion(q: EnhancedQuestion): Question {
  return {
    id: q.id,
    type: q.type,
    text: q.text,
    dimension: q.dimension,
    weight: q.weight,
    discrimination: q.discrimination,
    difficulty: q.difficulty,
    reverse_scored: q.reverseScored || false,
    options: q.options.map((o, idx) => ({
      id: o.id,
      text: o.text,
      value: o.value,
      sort_order: idx
    }))
  }
}


/**
 * API 服务
 */
export const apiService = {
  // ============ 测评相关 ============

  /**
   * 获取测评信息
   */
  getAssessment: async (assessmentId: string) => {
    if (assessmentId === 'ideology-enhanced') {
      return {
        id: ideologyEnhancedAssessment.id,
        title: ideologyEnhancedAssessment.title,
        description: ideologyEnhancedAssessment.description,
        category: ideologyEnhancedAssessment.category,
        subcategory: ideologyEnhancedAssessment.subcategory,
        difficulty: ideologyEnhancedAssessment.difficulty,
        duration: ideologyEnhancedAssessment.duration,
        quality: ideologyEnhancedAssessment.quality,
      } as Assessment
    }
    throw new Error(`测评 ${assessmentId} 不存在`)
  },

  /**
   * 获取测评题目
   */
  getAssessmentQuestions: async (
    assessmentId: string,
    mode: 'normal' | 'professional' = 'normal'
  ): Promise<Question[]> => {
    if (assessmentId !== 'ideology-enhanced') {
      throw new Error(`测评 ${assessmentId} 不存在`)
    }

    const localQuestions = getQuestionsForVersion(mode)
    return localQuestions.map(formatQuestion)
  },

  // ============ 会话相关 ============

  /**
   * 创建测评会话
   */
  createSession: async (
    assessmentId: string,
    mode: 'normal' | 'professional' = 'normal'
  ): Promise<Session> => {
    const questions = await this.getAssessmentQuestions(assessmentId, mode)
    
    const session: Session = {
      session_id: generateId(),
      assessment_id: assessmentId,
      mode,
      questions,
      total_questions: questions.length,
      answers: new Map()
    }

    sessions.set(session.session_id, session)
    return session
  },

  /**
   * 获取会话进度
   */
  getSession: async (sessionId: string): Promise<SessionProgress> => {
    const session = sessions.get(sessionId)
    
    if (!session) {
      throw new Error(`会话 ${sessionId} 不存在`)
    }

    return {
      session_id: sessionId,
      answered_count: session.answers?.size || 0,
      total_questions: session.total_questions
    }
  },

  // ============ 答案相关 ============

  /**
   * 保存答案
   */
  saveAnswer: async (
    sessionId: string,
    questionId: string,
    optionId: string,
    value: number
  ): Promise<{ success: boolean; answer_id: string; saved_count: number }> => {
    const session = sessions.get(sessionId)
    
    if (!session) {
      throw new Error(`会话 ${sessionId} 不存在`)
    }

    if (!session.answers) {
      session.answers = new Map()
    }

    session.answers.set(questionId, { questionId, optionId, value })

    return {
      success: true,
      answer_id: `answer-${questionId}`,
      saved_count: session.answers.size
    }
  },

  /**
   * 更新答案
   */
  updateAnswer: async (
    sessionId: string,
    questionId: string,
    optionId: string,
    value: number
  ): Promise<{ success: boolean }> => {
    const result = await this.saveAnswer(sessionId, questionId, optionId, value)
    return { success: result.success }
  },

  /**
   * 提交测评
   */
  submitAssessment: async (sessionId: string): Promise<Result> => {
    const session = sessions.get(sessionId)
    
    if (!session) {
      throw new Error(`会话 ${sessionId} 不存在`)
    }

    // 计算结果
    const result = this.calculateResult(session)
    
    results.set(result.id, result)
    sessions.delete(sessionId)

    return result
  },

  /**
   * 计算测评结果
   */
  calculateResult: (session: Session): Result => {
    const answers = session.answers || new Map()
    
    // 按维度分组计算分数
    const scores: Record<string, number[]> = {}
    const dimensionScores: Record<string, number> = {}

    // 初始化各维度
    const dimensions = ['economic', 'social', 'cultural', 'diplomatic']
    dimensions.forEach(dim => {
      scores[dim] = []
    })

    // 计算每个维度的分数
    session.questions.forEach(q => {
      const answer = answers.get(q.id)
      if (answer) {
        const dim = q.dimension
        if (scores[dim]) {
          // 如果是反向计分，需要反转分数
          const value = q.reverse_scored 
            ? (6 - answer.value) 
            : answer.value
          scores[dim].push(value * q.weight)
        }
      }
    })

    // 计算平均分（0-100）
    dimensions.forEach(dim => {
      const dimScores = scores[dim]
      if (dimScores.length > 0) {
        const avg = dimScores.reduce((a, b) => a + b, 0) / dimScores.length
        // 将1-5分转换为0-100分
        dimensionScores[dim] = ((avg - 1) / 4) * 100
      } else {
        dimensionScores[dim] = 50
      }
    })

    // 生成标签
    const labels = this.generateLabels(dimensionScores)

    return {
      id: generateId(),
      assessment_id: session.assessment_id,
      session_id: session.session_id,
      scores: dimensionScores,
      labels,
      completed_at: new Date().toISOString(),
      answers: Object.fromEntries(answers)
    }
  },

  /**
   * 生成标签
   */
  generateLabels: (scores: Record<string, number>): Record<string, string> => {
    const labels: Record<string, string> = {}

    // 经济维度
    if (scores.economic < 30) {
      labels.economic = '极左翼'
    } else if (scores.economic < 45) {
      labels.economic = '左翼'
    } else if (scores.economic < 55) {
      labels.economic = '中立'
    } else if (scores.economic < 70) {
      labels.economic = '右翼'
    } else {
      labels.economic = '极右翼'
    }

    // 社会维度
    if (scores.social < 30) {
      labels.social = '极权主义'
    } else if (scores.social < 45) {
      labels.social = '威权主义'
    } else if (scores.social < 55) {
      labels.social = '中立'
    } else if (scores.social < 70) {
      labels.social = '自由主义'
    } else {
      labels.social = '极端自由'
    }

    // 文化维度
    if (scores.cultural < 30) {
      labels.cultural = '极端保守'
    } else if (scores.cultural < 45) {
      labels.cultural = '保守主义'
    } else if (scores.cultural < 55) {
      labels.cultural = '温和主义'
    } else if (scores.cultural < 70) {
      labels.cultural = '进步主义'
    } else {
      labels.cultural = '极端进步'
    }

    // 外交维度
    if (scores.diplomatic < 30) {
      labels.diplomatic = '孤立主义'
    } else if (scores.diplomatic < 45) {
      labels.diplomatic = '民族主义'
    } else if (scores.diplomatic < 55) {
      labels.diplomatic = '国际主义'
    } else if (scores.diplomatic < 70) {
      labels.diplomatic = '全球主义'
    } else {
      labels.diplomatic = '世界主义'
    }

    return labels
  },

  /**
   * 获取结果
   */
  getResult: async (resultId: string): Promise<Result> => {
    const result = results.get(resultId)
    
    if (!result) {
      throw new Error(`结果 ${resultId} 不存在`)
    }

    return result
  },
}

export default apiService
