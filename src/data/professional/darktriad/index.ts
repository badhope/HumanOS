export * from './darktriad-common'
export * from './darktriad-normal'
export * from './darktriad-advanced'
export * from './darktriad-professional'
export * from './darktriad-calculator'

import { darktriadNormalQuestions } from './darktriad-normal'
import { darktriadAdvancedQuestions } from './darktriad-advanced'
import { darktriadProfessionalQuestions } from './darktriad-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const darktriadProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: darktriadNormalQuestions,
  advanced: darktriadAdvancedQuestions,
  professional: darktriadProfessionalQuestions,
}



