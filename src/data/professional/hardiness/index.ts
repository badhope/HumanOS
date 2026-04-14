export * from './hardiness-common'
export * from './hardiness-normal'
export * from './hardiness-advanced'
export * from './hardiness-professional'
export * from './hardiness-calculator'

import { hardinessNormalQuestions } from './hardiness-normal'
import { hardinessAdvancedQuestions } from './hardiness-advanced'
import { hardinessProfessionalQuestions } from './hardiness-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const hardinessProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: hardinessNormalQuestions,
  advanced: hardinessAdvancedQuestions,
  professional: hardinessProfessionalQuestions,
}
