export * from './mbti-common'
export * from './mbti-professional-120'
export * from './mbti-calculator'

import { mbtiProfessional120Questions } from './mbti-professional-120'
import type { ProfessionalQuestionSet } from '../../../types'

export const mbtiProfessionalQuestionSet: ProfessionalQuestionSet = {
  professional: mbtiProfessional120Questions,
  professional120: mbtiProfessional120Questions,
}
