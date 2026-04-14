import type { ProfessionalQuestionSet } from '../../../types'
export * from './mlq-calculator'
export * from './mlq-common'

import { mlqNormalQuestions } from './mlq-normal'
import { mlqAdvancedQuestions } from './mlq-advanced'
import { mlqProfessionalQuestions } from './mlq-professional'

export { mlqNormalQuestions, mlqAdvancedQuestions, mlqProfessionalQuestions }

export const mlqProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: mlqNormalQuestions,
  advanced: mlqAdvancedQuestions,
  professional: mlqProfessionalQuestions,
}
