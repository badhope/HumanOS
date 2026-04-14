import type { ProfessionalQuestionSet } from '../../../types'
export * from './moral-calculator'
export * from './moral-common'

import { moralNormalQuestions } from './moral-normal'
import { moralAdvancedQuestions } from './moral-advanced'
import { moralProfessionalQuestions } from './moral-professional'

export { moralNormalQuestions, moralAdvancedQuestions, moralProfessionalQuestions }

export const moralProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: moralNormalQuestions,
  advanced: moralAdvancedQuestions,
  professional: moralProfessionalQuestions,
}
