import type { Question } from '../../../types'
import { getAdvancedQuestions } from './matrix-generator'

const ravenQuestions = getAdvancedQuestions()

export const iqAdvancedQuestions: Question[] = ravenQuestions.map((q) => ({
  id: q.id,
  text: `请选择最合适的图形填入问号位置`,
  type: 'single',
  options: q.options.map((opt, idx) => ({
    id: String(idx),
    text: `选项 ${String.fromCharCode(65 + idx)}`,
    value: idx === q.correctAnswer ? 1 : 0,
  })),
  category: q.set,
  difficulty: q.difficulty <= 2 ? 'basic' : q.difficulty <= 3 ? 'intermediate' : 'advanced',
  cognitiveLoad: q.difficulty,
  timeEstimate: q.timeLimit,
  meta: {
    matrix: q.matrix,
    matrixOptions: q.options,
    rules: q.rules,
    explanation: q.explanation,
    correctAnswer: q.correctAnswer,
  },
}))
