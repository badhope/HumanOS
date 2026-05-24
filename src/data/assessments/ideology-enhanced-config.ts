import type { Assessment } from '../../types'
import { calculateIdeologyEnhanced } from '../../utils/calculators/ideology-enhanced'
import { getQuestionsForVersion } from './ideology-enhanced'

export const ideologyEnhancedAssessment: Assessment = {
  id: 'ideology-enhanced',
  title: '意识形态罗盘 5×5 (增强版)',
  description: '了解你在不同社会议题上的立场 - 支持普通版和专业版',
  category: '意识形态',
  subcategory: '政治坐标',
  difficulty: 'standard',
  duration: 5,
  quality: '专业',
  resultCalculator: calculateIdeologyEnhanced,
  questions: getQuestionsForVersion('normal'),
}
