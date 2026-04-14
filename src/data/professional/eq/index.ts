export * from './eq-common'
export * from './eq-normal'
export * from './eq-advanced'
export * from './eq-professional'
export * from './eq-calculator'

import { eqNormalQuestions } from './eq-normal'
import { eqAdvancedQuestions } from './eq-advanced'
import { eqProfessionalQuestions } from './eq-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const eqProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: eqNormalQuestions,
  advanced: eqAdvancedQuestions,
  professional: eqProfessionalQuestions,
}



