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
  'dark-triad': darkAssessment,
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

export const standardAssessmentList = Object.values(standardAssessments).map(assessment => {
  const questionCount = assessment.questions?.length || 24
  const accurateDuration = Math.max(1, Math.ceil(questionCount / 7))
  return {
    ...assessment,
    questionCount,
    duration: accurateDuration,
  }
})

export const assessments = standardAssessmentList

const assessmentIdAliases: Record<string, string> = {
  'mbti': 'sbti-personality',
  'mbti-standard': 'sbti-personality',
  'big-five': 'ocean-bigfive',
  'bigfive': 'ocean-bigfive',
  'big5': 'ocean-bigfive',
  'dark-triangle': 'dark-triad',
  'dark': 'dark-triad',
  'anxiety': 'sas-standard',
  'sas': 'sas-standard',
  'eq': 'eq-goleman',
  'emotional-intelligence': 'eq-goleman',
  'iq': 'iq-ravens',
  'iq-test': 'iq-ravens',
  'holland': 'holland-sds',
  'career-interest': 'holland-sds',
  'attachment': 'ecr-attachment',
  'attachment-style': 'ecr-attachment',
  'ecr': 'ecr-attachment',
  'political': 'ideology-9square',
  'political-ideology': 'ideology-9square',
  'political-compass': 'ideology-9square',
  'depression': 'sds-standard',
  'sds-depression': 'sds-standard',
  'sds': 'sds-standard',
  'stress': 'pss-standard',
  'pss': 'pss-standard',
  'psychological-capital': 'pcq-standard',
  'pcq': 'pcq-standard',
  'values': 'schwartz-standard',
  'schwartz': 'schwartz-standard',
  'moral-foundations': 'mft-standard',
  'mft': 'mft-standard',
  'conflict-style': 'tki-standard',
  'tki': 'tki-standard',
  'emotional-labor': 'els-standard',
  'els': 'els-standard',
  'organizational-citizenship': 'ocb-standard',
  'ocb': 'ocb-standard',
  'growth-mindset': 'mindset-standard',
  'mindset': 'mindset-standard',
  'meta-cognitive': 'metacognition-standard',
  'metacognition': 'metacognition-standard',
  'learning-style': 'kolb-standard',
  'kolb': 'kolb-standard',
  'meaning-in-life': 'mlq-standard',
  'mlq': 'mlq-standard',
  'authoritarian': 'asi-standard',
  'asi': 'asi-standard',
  'psychological-hardiness': 'hardiness-standard',
  'hardiness': 'hardiness-standard',
  'slack-off': 'slacking-purity',
  'slacking': 'slacking-purity',
  'moyu': 'slacking-purity',
  'moyu-purity': 'slacking-purity',
  'internet-addiction': 'internet-addiction',
  'foodie': 'foodie-level',
  'patriotism': 'patriotism-purity',
  'patriot-purity': 'patriotism-purity',
  'general-mental-ability': 'gma-maturity',
  'gma': 'gma-maturity',
  'cast': 'cast-parenting',
  'philosophy': 'philo-spectrum',
  'philo': 'philo-spectrum',
  'bounty': 'onepiece-bounty',
  'onepiece': 'onepiece-bounty',
  'lacan': 'lacan-diagnosis',
  'pua': 'pua-resistance',
  'pua-resistance': 'pua-resistance',
  'fubao': 'fubao-index',
  'job-burnout': 'burnout-mbi',
  'burnout': 'burnout-mbi',
  'life-meaning': 'life-meaning',
  'sexual-experience': 'sexual-experience',
  'color-subconscious': 'color-subconscious',
  'love-animal': 'abm-love-animal',
  'abm-love-animal': 'abm-love-animal',
  'mental-age': 'mental-age',
  'sbti': 'sbti-personality',
  'officialdom': 'officialdom-dream',
  'disc': 'mft-standard',
  'enneagram': 'mft-standard',
  'love-language': 'mft-standard',
  'via-character': 'mft-standard',
}

export function getAssessmentById(id: string) {
  const normalizedId = id.toLowerCase().trim()
  const targetId = assessmentIdAliases[normalizedId] || normalizedId
  let match = standardAssessmentList.find(a => a.id === targetId)
  if (!match) {
    match = standardAssessmentList.find(a => 
      a.id.toLowerCase().includes(normalizedId) || 
      normalizedId.includes(a.id.toLowerCase().split('-')[0])
    )
  }
  if (!match) return undefined
  
  const questionCount = match.questions?.length || 24
  const accurateDuration = Math.max(1, Math.ceil(questionCount / 7))
  
  return {
    ...match,
    questionCount,
    duration: accurateDuration,
  }
}

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
