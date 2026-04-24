import { sasStandardAssessment } from './sas-standard'
import { sdsStandardAssessment } from './sds-standard'
import { pssStandardAssessment } from './pss-standard'
import { pcqStandardAssessment } from './pcq-standard'
import { hardinessStandardAssessment } from './hardiness-standard'
import { schwartzStandardAssessment } from './schwartz-standard'
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
import { officialdomAssessment } from './officialdom-dream'
import { gmaAssessment } from './gma-maturity'
import { castAssessment } from './cast-parenting'
import { philoAssessment } from './philo-spectrum'
import { bountyAssessment } from './onepiece-bounty'
import { lacanAssessment } from './lacan-diagnosis'
import { puaResistanceAssessment } from './pua-resistance'
import { fubaoIndexAssessment } from './fubao-index'
import { burnoutAssessment } from './burnout-mbi'
import { colorSubconsciousAssessment } from './color-subconscious'
import { abmLoveAnimalAssessment } from './abm-love-animal'
import { mentalAgeAssessment } from './mental-age'
import { sbtiAssessment } from './sbti-personality'
import { tkiStandardAssessment } from './tki-standard'
import { elsStandardAssessment } from './els-standard'
import { ocbStandardAssessment } from './ocb-standard'
import { mftStandardAssessment } from './mft-standard'
import { mindsetStandardAssessment } from './mindset-standard'
import { metacognitionStandardAssessment } from './metacognition-standard'
import { kolbStandardAssessment } from './kolb-standard'
import { mlqStandardAssessment } from './mlq-standard'
import { asiStandardAssessment } from './asi-standard'

export const standardAssessments = {
  'kolb-standard': kolbStandardAssessment,
  'mlq-standard': mlqStandardAssessment,
  'asi-standard': asiStandardAssessment,
  'sas-standard': sasStandardAssessment,
  'sds-standard': sdsStandardAssessment,
  'pss-standard': pssStandardAssessment,
  'pcq-standard': pcqStandardAssessment,
  'hardiness-standard': hardinessStandardAssessment,
  'schwartz-standard': schwartzStandardAssessment,
  'mindset-standard': mindsetStandardAssessment,
  'metacognition-standard': metacognitionStandardAssessment,
  'tki-standard': tkiStandardAssessment,
  'els-standard': elsStandardAssessment,
  'ocb-standard': ocbStandardAssessment,
  'mft-standard': mftStandardAssessment,
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
  'officialdom-dream': officialdomAssessment,
  'gma-maturity': gmaAssessment,
  'cast-parenting': castAssessment,
  'philo-spectrum': philoAssessment,
  'onepiece-bounty': bountyAssessment,
  'lacan-diagnosis': lacanAssessment,
  'pua-resistance': puaResistanceAssessment,
  'fubao-index': fubaoIndexAssessment,
  'burnout-mbi': burnoutAssessment,
  'color-subconscious': colorSubconsciousAssessment,
  'abm-love-animal': abmLoveAnimalAssessment,
  'mental-age': mentalAgeAssessment,
  'sbti-personality': sbtiAssessment,
}

export type StandardAssessmentId = keyof typeof standardAssessments

export const getStandardAssessment = (id: StandardAssessmentId) => {
  return standardAssessments[id]
}

export const standardAssessmentList = Object.values(standardAssessments)

export function getAllCategories(): string[] {
  return Array.from(new Set(standardAssessmentList.map(a => a.category))).sort()
}

export function getAllSubcategories(): string[] {
  return Array.from(new Set(standardAssessmentList.map(a => a.subcategory))).sort()
}

export function getSubcategoriesByCategory(category: string): string[] {
  return Array.from(new Set(
    standardAssessmentList
      .filter(a => a.category === category)
      .map(a => a.subcategory)
  )).sort()
}

export function getAssessmentsByCategory(category: string) {
  return standardAssessmentList.filter(a => a.category === category)
}

export function getAssessmentsBySubcategory(subcategory: string) {
  return standardAssessmentList.filter(a => a.subcategory === subcategory)
}

export type CategoryTree = Record<string, {
  subcategories: string[]
  count: number
  assessments: typeof standardAssessmentList
}>

export function getCategoryTree(): CategoryTree {
  const tree: CategoryTree = {}
  getAllCategories().forEach(category => {
    const assessments = getAssessmentsByCategory(category)
    tree[category] = {
      subcategories: getSubcategoriesByCategory(category),
      count: assessments.length,
      assessments
    }
  })
  return tree
}
