import type { ProfessionalQuestionSet } from '../../../types'
export * from './kolb-calculator'
export * from './kolb-common'

import { kolbNormalQuestions } from './kolb-normal'
import { kolbAdvancedQuestions } from './kolb-advanced'
import { kolbProfessionalQuestions } from './kolb-professional'

export { kolbNormalQuestions, kolbAdvancedQuestions, kolbProfessionalQuestions }

export const kolbProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: kolbNormalQuestions,
  advanced: kolbAdvancedQuestions,
  professional: kolbProfessionalQuestions,
}
