export * from './pcq-common'
export * from './pcq-normal'
export * from './pcq-advanced'
export * from './pcq-professional'
export * from './pcq-calculator'

import { pcqNormalQuestions } from './pcq-normal'
import { pcqAdvancedQuestions } from './pcq-advanced'
import { pcqProfessionalQuestions } from './pcq-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const pcqProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: pcqNormalQuestions,
  advanced: pcqAdvancedQuestions,
  professional: pcqProfessionalQuestions,
}
