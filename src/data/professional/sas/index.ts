export * from './sas-common'
export * from './sas-normal'
export * from './sas-advanced'
export * from './sas-professional'
export * from './sas-calculator'

import { sasNormalQuestions } from './sas-normal'
import { sasAdvancedQuestions } from './sas-advanced'
import { sasProfessionalQuestions } from './sas-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const sasProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: sasNormalQuestions,
  advanced: sasAdvancedQuestions,
  professional: sasProfessionalQuestions,
}
