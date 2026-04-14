export * from './pss-common'
export * from './pss-normal'
export * from './pss-advanced'
export * from './pss-professional'
export * from './pss-calculator'

import { pssNormalQuestions } from './pss-normal'
import { pssAdvancedQuestions } from './pss-advanced'
import { pssProfessionalQuestions } from './pss-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const pssProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: pssNormalQuestions,
  advanced: pssAdvancedQuestions,
  professional: pssProfessionalQuestions,
}
