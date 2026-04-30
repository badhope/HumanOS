export { sasNormData, sasInterpretation } from './sas-common'
export { sasNormalQuestions } from './sas-normal'
export { sasAdvancedQuestions } from './sas-advanced'
export { sasProfessionalQuestions } from '../sas-professional'
export { calculateProfessionalMode } from './sas-calculator'

import { sasNormalQuestions } from './sas-normal'
import { sasAdvancedQuestions } from './sas-advanced'
import { sasProfessionalQuestions } from '../sas-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const sasProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: sasNormalQuestions,
  advanced: sasAdvancedQuestions,
  professional: sasProfessionalQuestions.professional,
}
