import type { Answer, ProfessionalAssessmentResult } from './types'
import { generateProfessionalResult } from '../../professionalScoring'

export function calculateSDSProfessional(
  answers: Answer[],
  mode: 'normal' | 'advanced' | 'professional' = 'professional'
): ProfessionalAssessmentResult {
  let rawScore = 0
  const reverseScoredQuestions = ['sds-2', 'sds-5', 'sds-6', 'sds-12', 'sds-14', 'sds-16', 'sds-17', 'sds-18', 'sds-20']

  answers.forEach((answer) => {
    let value = answer.value || 0
    if (reverseScoredQuestions.includes(answer.questionId)) {
      value = 5 - value
    }
    rawScore += value
  })

  const standardScore = Math.round(rawScore * 1.25)
  const index = standardScore

  let level: string
  let severity: string
  let description: string

  if (index < 50) {
    level = '正常范围'
    severity = '无抑郁'
    description = '最近一周内没有明显的抑郁症状，心理健康状况良好。'
  } else if (index < 59) {
    level = '轻度抑郁'
    severity = '轻度'
    description = '存在轻微的抑郁症状，可能有偶尔的情绪低落或兴趣减退。'
  } else if (index < 69) {
    level = '中度抑郁'
    severity = '中度'
    description = '有中等程度的抑郁症状，包括持续的情绪低落、睡眠问题等。'
  } else {
    level = '重度抑郁'
    severity = '重度'
    description = '存在严重的抑郁症状，可能显著影响日常生活功能。'
  }

  return generateProfessionalResult({
    type: 'sds-depression-professional',
    title: `SDS评分: ${level}`,
    description,
    score: index,
    accuracy: 92,
    dimensions: [
      { name: '原始总分', score: rawScore, maxScore: 80, description: '' },
      { name: '标准分', score: standardScore, maxScore: 100, description: '' },
      { name: '抑郁指数', score: index, maxScore: 100, description: severity },
    ],
    strengths: index < 50 ? ['心理健康状况良好'] : ['已意识到需要关注'],
    weaknesses: index >= 50 ? [`存在${severity}抑郁症状`] : [],
    careers: [],
    suggestions: [`🧠 SDS抑郁自评专业报告（${answers.length}题完整版）

📊 评分详情：
• 原始分：${rawScore}/80
• 标准分：${standardScore}/100
• 抑郁指数：${index}
• 严重程度：${severity}

⚠️ 重要提示：
本量表为筛查工具，不能替代专业诊断。

${index >= 69 ? `
🚨 重度抑郁 - 强烈建议：
✅ 立即预约精神科医生或心理治疗师
✅ 告诉信任的人你的感受
✅ 不要孤立自己
✅ 紧急情况拨打心理援助热线：400-161-9995
` : index >= 59 ? `
💪 中度抑郁 - 建议：
• 寻求专业心理咨询
• 规律运动（每周3-4次，每次30分钟+）
• 保持规律作息时间
• 练习正念冥想（每天10-15分钟）
• 与亲友保持联系
• 避免酒精和药物
` : `
✨ 维持心理健康：
• 继续健康的生活方式
• 定期运动和社交
• 学会管理压力
• 保持充足睡眠（7-9小时）
`}`],
  }, mode)
}
