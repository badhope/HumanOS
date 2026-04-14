import type { ProfessionalQuestionSet } from '../../../types'
export * from './ideology-calculator'
export * from './ideology-common'

import { ideologyNormalQuestions } from './ideology-normal'
import { ideologyAdvancedQuestions } from './ideology-advanced'
import { ideologyProfessionalQuestions } from './ideology-professional'

export { ideologyNormalQuestions, ideologyAdvancedQuestions, ideologyProfessionalQuestions }

export const ideologyProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: ideologyNormalQuestions,
  advanced: ideologyAdvancedQuestions,
  professional: ideologyProfessionalQuestions,
}
