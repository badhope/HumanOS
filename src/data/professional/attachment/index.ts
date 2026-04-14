export * from './attachment-common'
export * from './attachment-normal'
export * from './attachment-advanced'
export * from './attachment-professional'
export * from './attachment-calculator'

import { attachmentNormalQuestions } from './attachment-normal'
import { attachmentAdvancedQuestions } from './attachment-advanced'
import { attachmentProfessionalQuestions } from './attachment-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const attachmentProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: attachmentNormalQuestions,
  advanced: attachmentAdvancedQuestions,
  professional: attachmentProfessionalQuestions,
}



