export * from './love-common'
export * from './love-calculator'
export * from './love-normal'
export * from './love-advanced'
export * from './love-professional'

import { loveNormalQuestions } from './love-normal'
import { loveAdvancedQuestions } from './love-advanced'
import { loveProfessionalQuestions } from './love-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const loveStyleQuestionSet: ProfessionalQuestionSet = {
  normal: loveNormalQuestions,
  advanced: loveAdvancedQuestions,
  professional: loveProfessionalQuestions,
}
