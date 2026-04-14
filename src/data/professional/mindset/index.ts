export * from './mindset-common'
export * from './mindset-normal'
export * from './mindset-advanced'
export * from './mindset-professional'
export * from './mindset-calculator'

import { mindsetNormalQuestions } from './mindset-normal'
import { mindsetAdvancedQuestions } from './mindset-advanced'
import { mindsetProfessionalQuestions } from './mindset-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const mindsetProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: mindsetNormalQuestions,
  advanced: mindsetAdvancedQuestions,
  professional: mindsetProfessionalQuestions,
}
