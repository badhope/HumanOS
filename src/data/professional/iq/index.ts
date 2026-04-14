export * from './iq-common'
export * from './iq-normal'
export * from './iq-advanced'
export * from './iq-professional'
export * from './iq-calculator'
export * from './matrix-generator'
export * from '../../../components/RavenMatrixRenderer'

import { iqNormalQuestions } from './iq-normal'
import { iqAdvancedQuestions } from './iq-advanced'
import { iqProfessionalQuestions } from './iq-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const iqProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: iqNormalQuestions,
  advanced: iqAdvancedQuestions,
  professional: iqProfessionalQuestions,
}
