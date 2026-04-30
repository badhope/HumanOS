export { eqNormData, eqReferences, type EQDimension } from './eq-common'
export { eqNormalQuestions } from './eq-normal'
export { eqAdvancedQuestions } from './eq-advanced'
export { eqProfessionalQuestions } from '../eq-professional'
export { calculateProfessionalEQ } from './eq-calculator'

import { eqNormalQuestions } from './eq-normal'
import { eqAdvancedQuestions } from './eq-advanced'
import { eqProfessionalQuestions } from '../eq-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const eqProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: eqNormalQuestions,
  advanced: eqAdvancedQuestions,
  professional: eqProfessionalQuestions.professional,
}



