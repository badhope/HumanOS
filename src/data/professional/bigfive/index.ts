export { bigFiveNormData, bigFiveReferences } from './bigfive-common'
export { bigfiveNormalQuestions } from './bigfive-normal'
export { bigfiveAdvancedQuestions } from './bigfive-advanced'
export { bigFiveProfessionalQuestions } from '../bigfive-professional'
export { calculateProfessionalMode } from './bigfive-calculator'

import { bigfiveNormalQuestions } from './bigfive-normal'
import { bigfiveAdvancedQuestions } from './bigfive-advanced'
import { bigFiveProfessionalQuestions } from '../bigfive-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const bigfiveProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: bigfiveNormalQuestions,
  advanced: bigfiveAdvancedQuestions,
  professional: bigFiveProfessionalQuestions.professional,
}



