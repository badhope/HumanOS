export * from './bigfive-common'
export * from './bigfive-normal'
export * from './bigfive-advanced'
export * from './bigfive-professional'
export * from './bigfive-calculator'

import { bigfiveNormalQuestions } from './bigfive-normal'
import { bigfiveAdvancedQuestions } from './bigfive-advanced'
import { bigfiveProfessionalQuestions } from './bigfive-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const bigfiveProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: bigfiveNormalQuestions,
  advanced: bigfiveAdvancedQuestions,
  professional: bigfiveProfessionalQuestions,
}



