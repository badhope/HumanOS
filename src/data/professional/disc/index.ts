export * from './disc-common'
export * from './disc-normal'
export * from './disc-advanced'
export * from './disc-professional'
export * from './disc-calculator'

import { discNormalQuestions } from './disc-normal'
import { discAdvancedQuestions } from './disc-advanced'
import { discProfessionalQuestions } from './disc-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const discProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: discNormalQuestions,
  advanced: discAdvancedQuestions,
  professional: discProfessionalQuestions,
}
