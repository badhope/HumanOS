export { hollandNormData, type HollandDimension } from './holland-common'
export { hollandNormalQuestions } from './holland-normal'
export { hollandAdvancedQuestions } from './holland-advanced'
export { hollandProfessionalQuestions } from '../holland-professional'
export { calculateProfessionalHolland } from './holland-calculator'

import { hollandNormalQuestions } from './holland-normal'
import { hollandAdvancedQuestions } from './holland-advanced'
import { hollandProfessionalQuestions } from '../holland-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const hollandProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: hollandNormalQuestions,
  advanced: hollandAdvancedQuestions,
  professional: hollandProfessionalQuestions.professional,
}
