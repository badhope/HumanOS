import type { ProfessionalQuestionSet } from '../../../types'
export { calculateIdeologyScores } from './ideology-calculator'
export { ideologyReferences } from './ideology-common'

import { ideologyNormalQuestions } from './ideology-normal'
import { ideologyAdvancedQuestions } from './ideology-advanced'
import { ideologyProfessionalQuestions } from '../ideology-professional'

export { ideologyNormalQuestions, ideologyAdvancedQuestions, ideologyProfessionalQuestions }

export const ideologyProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: ideologyNormalQuestions,
  advanced: ideologyAdvancedQuestions,
  professional: ideologyProfessionalQuestions.professional,
}
