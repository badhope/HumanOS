import type { ProfessionalQuestionSet } from '../../../types'
export * from './ecr-calculator'
export * from './ecr-common'

import { ecrNormalQuestions } from './ecr-normal'
import { ecrAdvancedQuestions } from './ecr-advanced'
import { ecrProfessionalQuestions } from './ecr-professional'

export { ecrNormalQuestions, ecrAdvancedQuestions, ecrProfessionalQuestions }

export const ecrProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: ecrNormalQuestions,
  advanced: ecrAdvancedQuestions,
  professional: ecrProfessionalQuestions,
}
