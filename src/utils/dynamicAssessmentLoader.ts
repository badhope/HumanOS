export type StandardAssessmentId = string
import { assessmentCache } from './assessmentCache'

let standardAssessmentList: any[] = []

export interface AssessmentMeta {
  id: StandardAssessmentId
  title: string
  category: string
  subcategory: string
  questionCount: number
  estimatedTime: number
  icon: string
}

const assessmentMetaCache: Record<StandardAssessmentId, AssessmentMeta> = {} as any

async function buildMetaCache() {
  const mod = await import('../data/assessments' as any)
  const list = mod.assessments || mod.standardAssessmentList || []
  standardAssessmentList = list
  list.forEach((assessment: any) => {
    assessmentMetaCache[assessment.id] = {
      id: assessment.id,
      title: assessment.title,
      category: assessment.category,
      subcategory: assessment.subcategory,
      questionCount: assessment.questions.length,
      estimatedTime: Math.ceil(assessment.questions.length * 0.15),
      icon: assessment.icon || '📊'
    }
  })
}

buildMetaCache()

export function getAllAssessmentMeta(): AssessmentMeta[] {
  return Object.values(assessmentMetaCache)
}

export function getAssessmentMeta(id: StandardAssessmentId): AssessmentMeta | undefined {
  return assessmentMetaCache[id]
}

const assessmentImports: Record<StandardAssessmentId, () => Promise<any>> = {
  'sas-standard': () => import('../data/assessments/sas-standard'),
  'ecr-attachment': () => import('../data/assessments/ecr-attachment'),
  'holland-sds': () => import('../data/assessments/holland-sds'),
  'ideology-9square': () => import('../data/assessments/ideology-9square'),
  'iq-ravens': () => import('../data/assessments/iq-ravens'),
  'eq-goleman': () => import('../data/assessments/eq-goleman'),
  'dark-triangle': () => import('../data/assessments/dark-triad'),
  'ocean-bigfive': () => import('../data/assessments/ocean-bigfive'),
  'slacking-purity': () => import('../data/assessments/slacking-purity'),
  'foodie-level': () => import('../data/assessments/foodie-level'),
  'internet-addiction': () => import('../data/assessments/internet-addiction'),
  'life-meaning': () => import('../data/assessments/life-meaning'),
  'patriotism-purity': () => import('../data/assessments/patriotism-purity'),
  'sexual-experience': () => import('../data/assessments/sexual-experience'),
  'officialdom-dream': () => import('../data/assessments/officialdom-dream'),
  'gma-maturity': () => import('../data/assessments/gma-maturity'),
  'cast-parenting': () => import('../data/assessments/cast-parenting'),
  'philo-spectrum': () => import('../data/assessments/philo-spectrum'),
  'onepiece-bounty': () => import('../data/assessments/onepiece-bounty'),
  'lacan-diagnosis': () => import('../data/assessments/lacan-diagnosis'),
  'pua-resistance': () => import('../data/assessments/pua-resistance'),
  'fubao-index': () => import('../data/assessments/fubao-index'),
  'burnout-mbi': () => import('../data/assessments/burnout-mbi'),
  'color-subconscious': () => import('../data/assessments/color-subconscious'),
  'abm-love-animal': () => import('../data/assessments/abm-love-animal'),
  'mental-age': () => import('../data/assessments/mental-age'),
  'sbti-personality': () => import('../data/assessments/sbti-personality'),
} as any

export async function loadAssessment(id: StandardAssessmentId): Promise<any> {
  if (assessmentCache.has(id)) {
    if (import.meta.env.DEV) {
      console.log(`[Cache Hit] ${id}`)
    }
    return assessmentCache.get(id)
  }

  if (import.meta.env.DEV) {
    console.log(`[Dynamic Load] ${id}`)
  }

  const importFn = assessmentImports[id]
  if (!importFn) {
    throw new Error(`Assessment not found: ${id}`)
  }

  const module = await importFn()
  const assessmentKey = Object.keys(module)[0]
  const assessment = module[assessmentKey]

  assessmentCache.set(id, assessment)

  return assessment
}

export function preloadAssessments(ids: StandardAssessmentId[]): void {
  ids.forEach(id => {
    if (!assessmentCache.has(id)) {
      loadAssessment(id).catch(() => {})
    }
  })
}

export function getCacheStats() {
  return {
    assessment: assessmentCache.getStats(),
  }
}

export function preloadTopAssessments(): void {
  const topAssessments: StandardAssessmentId[] = [
    'ocean-bigfive',
    'ideology-9square',
    'iq-ravens',
    'eq-goleman',
    'mbti-16personalities',
  ] as any
  
  setTimeout(() => preloadAssessments(topAssessments), 2000)
}
