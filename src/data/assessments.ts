import type { Assessment } from '../types'
import { sasStandardAssessment } from './assessments/sas-standard'
import { ecrAttachmentAssessment } from './assessments/ecr-attachment'
import { hollandSDSAssessment } from './assessments/holland-sds'
import { ideologyAssessment } from './assessments/ideology-9square'
import { iqAssessment } from './assessments/iq-ravens'
import { eqAssessment } from './assessments/eq-goleman'
import { darkAssessment } from './assessments/dark-triad'
import { oceanAssessment } from './assessments/ocean-bigfive'
import { officialdomAssessment } from './assessments/officialdom-dream'
import { gmaAssessment } from './assessments/gma-maturity'
import { castAssessment } from './assessments/cast-parenting'
import { philoAssessment } from './assessments/philo-spectrum'
import { bountyAssessment } from './assessments/onepiece-bounty'
import { lacanAssessment } from './assessments/lacan-diagnosis'
import { slackingPurityAssessment } from './assessments/slacking-purity'
import { foodieLevelAssessment } from './assessments/foodie-level'
import { internetAddictionAssessment } from './assessments/internet-addiction'
import { lifeMeaningAssessment } from './assessments/life-meaning'
import { patriotismPurityAssessment } from './assessments/patriotism-purity'
import { sexualExperienceAssessment } from './assessments/sexual-experience'

export const assessments: Assessment[] = [
  sasStandardAssessment,
  ecrAttachmentAssessment,
  hollandSDSAssessment,
  ideologyAssessment,
  iqAssessment,
  eqAssessment,
  darkAssessment,
  oceanAssessment,
  officialdomAssessment,
  gmaAssessment,
  castAssessment,
  philoAssessment,
  bountyAssessment,
  lacanAssessment,
  slackingPurityAssessment,
  foodieLevelAssessment,
  internetAddictionAssessment,
  lifeMeaningAssessment,
  patriotismPurityAssessment,
  sexualExperienceAssessment,
]

export function getAssessmentById(id: string): Assessment | undefined {
  return assessments.find(a => a.id === id)
}

export function getAllCategories(): string[] {
  return Array.from(new Set(assessments.map(a => a.category)))
}

export function getAssessmentsByCategory(category: string): Assessment[] {
  return assessments.filter(a => a.category === category)
}
