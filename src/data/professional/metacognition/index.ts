export * from './metacognition-common'
export * from './metacognition-normal'
export * from './metacognition-advanced'
export * from './metacognition-professional'
export * from './metacognition-calculator'

import { metacognitionNormalQuestions } from './metacognition-normal'
import { metacognitionAdvancedQuestions } from './metacognition-advanced'
import { metacognitionProfessionalQuestions } from './metacognition-professional'
import type { ProfessionalQuestionSet } from '../../../types'

export const metacognitionProfessionalQuestionSet: ProfessionalQuestionSet = {
  normal: metacognitionNormalQuestions,
  advanced: metacognitionAdvancedQuestions,
  professional: metacognitionProfessionalQuestions,
}
