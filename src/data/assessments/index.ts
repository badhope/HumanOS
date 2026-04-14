import { sasStandardAssessment } from './sas-standard'
import { ecrAttachmentAssessment } from './ecr-attachment'
import { hollandSDSAssessment } from './holland-sds'
import { ideologyAssessment } from './ideology-9square'
import { iqAssessment } from './iq-ravens'
import { eqAssessment } from './eq-goleman'
import { darkAssessment } from './dark-triad'
import { oceanAssessment } from './ocean-bigfive'
import { slackingPurityAssessment } from './slacking-purity'
import { foodieLevelAssessment } from './foodie-level'
import { internetAddictionAssessment } from './internet-addiction'
import { lifeMeaningAssessment } from './life-meaning'
import { patriotismPurityAssessment } from './patriotism-purity'
import { sexualExperienceAssessment } from './sexual-experience'

export const standardAssessments = {
  'sas-standard': sasStandardAssessment,
  'ecr-attachment': ecrAttachmentAssessment,
  'holland-sds': hollandSDSAssessment,
  'ideology-9square': ideologyAssessment,
  'iq-ravens': iqAssessment,
  'eq-goleman': eqAssessment,
  'dark-triangle': darkAssessment,
  'ocean-bigfive': oceanAssessment,
  'slacking-purity': slackingPurityAssessment,
  'foodie-level': foodieLevelAssessment,
  'internet-addiction': internetAddictionAssessment,
  'life-meaning': lifeMeaningAssessment,
  'patriotism-purity': patriotismPurityAssessment,
  'sexual-experience': sexualExperienceAssessment,
}

export type StandardAssessmentId = keyof typeof standardAssessments

export const getStandardAssessment = (id: StandardAssessmentId) => {
  return standardAssessments[id]
}

export const standardAssessmentList = Object.values(standardAssessments)
