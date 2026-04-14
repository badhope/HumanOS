import type { ProfessionalQuestionSet } from '../../../types'
export * from './ct-calculator'
export * from './ct-common'

import { ctNormalQuestions } from './ct-normal'
import { ctAdvancedQuestions } from './ct-advanced'
import { ctProfessionalQuestions } from './ct-professional'

export { ctNormalQuestions, ctAdvancedQuestions, ctProfessionalQuestions }

export const ctProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: ctNormalQuestions,
  advanced: ctAdvancedQuestions,
  professional: ctProfessionalQuestions,
}
