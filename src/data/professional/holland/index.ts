export * from './holland-common'
export * from './holland-normal'
export * from './holland-advanced'
export * from './holland-professional'
export * from './holland-calculator'

import { hollandNormalQuestions } from './holland-normal'
import { hollandAdvancedQuestions } from './holland-advanced'
import { hollandProfessionalQuestions } from './holland-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const hollandProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: hollandNormalQuestions,
  advanced: hollandAdvancedQuestions,
  professional: hollandProfessionalQuestions,
}
