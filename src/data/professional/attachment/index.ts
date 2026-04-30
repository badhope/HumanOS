export { attachmentReferences } from './attachment-common'
export { attachmentNormalQuestions } from './attachment-normal'
export { attachmentAdvancedQuestions } from './attachment-advanced'
export { ecrProfessionalQuestions } from '../attachment-professional'
export { calculateProfessionalMode } from './attachment-calculator'

import { attachmentNormalQuestions } from './attachment-normal'
import { attachmentAdvancedQuestions } from './attachment-advanced'
import { ecrProfessionalQuestions } from '../attachment-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const attachmentProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: attachmentNormalQuestions,
  advanced: attachmentAdvancedQuestions,
  professional: ecrProfessionalQuestions.professional,
}



