export { type PSSDimension, pssNormData, pssReferences } from './pss-common'
export { pssNormalQuestions } from './pss-normal'
export { pssAdvancedQuestions } from '../pss-advanced'
export { pssProfessionalQuestions } from './pss-professional'
export { calculateProfessionalMode } from './pss-calculator'

import { pssNormalQuestions } from './pss-normal'
import { pssAdvancedQuestions } from '../pss-advanced'
import { pssProfessionalQuestions } from './pss-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const pssProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: pssNormalQuestions,
  advanced: pssAdvancedQuestions,
  professional: pssProfessionalQuestions,
}
