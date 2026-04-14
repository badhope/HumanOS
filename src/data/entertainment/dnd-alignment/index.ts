export * from './dnd-common'
export * from './dnd-calculator'
export * from './dnd-normal'
export * from './dnd-advanced'
export * from './dnd-professional'

import { dndNormalQuestions } from './dnd-normal'
import { dndAdvancedQuestions } from './dnd-advanced'
import { dndProfessionalQuestions } from './dnd-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const dndAlignmentQuestionSet: ProfessionalQuestionSet = {
  normal: dndNormalQuestions,
  advanced: dndAdvancedQuestions,
  professional: dndProfessionalQuestions,
}
