import type { Assessment } from '../types'
import { sasStandardAssessment } from './assessments/sas-standard'
import { sdsStandardAssessment } from './assessments/sds-standard'
import { pssStandardAssessment } from './assessments/pss-standard'
import { pcqStandardAssessment } from './assessments/pcq-standard'
import { hardinessStandardAssessment } from './assessments/hardiness-standard'
import { schwartzStandardAssessment } from './assessments/schwartz-standard'
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
import { puaResistanceAssessment } from './assessments/pua-resistance'
import { fubaoIndexAssessment } from './assessments/fubao-index'
import { burnoutAssessment } from './assessments/burnout-mbi'
import { sbtiAssessment } from './assessments/sbti-personality'
import { abmLoveAnimalAssessment } from './assessments/abm-love-animal'
import { colorSubconsciousAssessment } from './assessments/color-subconscious'
import { mentalAgeAssessment } from './assessments/mental-age'

export const assessments: Assessment[] = [
  sbtiAssessment,
  abmLoveAnimalAssessment,
  colorSubconsciousAssessment,
  mentalAgeAssessment,
  sasStandardAssessment,
  sdsStandardAssessment,
  pssStandardAssessment,
  pcqStandardAssessment,
  hardinessStandardAssessment,
  schwartzStandardAssessment,
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
  puaResistanceAssessment,
  fubaoIndexAssessment,
  burnoutAssessment,
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

export function getSubcategoriesByCategory(category: string): string[] {
  const subcategoryMap: Record<string, string[]> = {
    '自我认知': ['特质论人格', '黑暗三角', '互联网人格', '心智成熟度', '情绪能力', '焦虑水平', '流体智力'],
    '意识形态': ['政治坐标', '国家认同', '哲学立场', '精神分析', '存在主义', '潜意识'],
    '职业发展': ['职业兴趣', '职业耗竭', '企业文化', '职场行为', '权力适应'],
    '社交关系': ['社会智力', '依恋风格', '恋爱模式', '亲子关系', '反操纵能力'],
    '心理健康': [],
    '娱乐趣味': ['动漫同人', '饮食文化', '数字生活', '亲密探索'],
  }
  return subcategoryMap[category] || []
}
