import type { Answer, ProfessionalAssessmentResult } from './types'
import { generateProfessionalResult } from '../../professionalScoring'

export function calculatePoliticalIdeologyProfessional(
  answers: Answer[],
  mode: 'normal' | 'advanced' | 'professional' = 'professional'
): ProfessionalAssessmentResult {
  const dimensions = {
    'economic-equality': 0,
    'economic-market': 0,
    'social-liberty': 0,
    'social-authority': 0,
  }

  answers.forEach((answer) => {
    if (answer.subscale && answer.value) {
      dimensions[answer.subscale as keyof typeof dimensions] += answer.value
    }
  })

  const economicLeftScore = dimensions['economic-equality']
  const economicRightScore = dimensions['economic-market']
  const socialLibertyScore = dimensions['social-liberty']
  const socialAuthorityScore = dimensions['social-authority']

  const economicPosition = ((economicLeftScore - economicRightScore) / (economicLeftScore + economicRightScore)) * 100
  const socialPosition = ((socialLibertyScore - socialAuthorityScore) / (socialLibertyScore + socialAuthorityScore)) * 100

  let economicLabel: string
  let socialLabel: string

  if (economicPosition <= -40) economicLabel = '强右翼/自由市场'
  else if (economicPosition <= -15) economicLabel = '中右翼'
  else if (economicPosition < 15) economicLabel = '经济中间派'
  else if (economicPosition < 40) economicLabel = '中左翼'
  else economicLabel = '强左翼/社会主义'

  if (socialPosition <= -40) socialLabel = '强权威/保守'
  else if (socialPosition <= -15) socialLabel = '中权威'
  else if (socialPosition < 15) socialLabel = '社会中间派'
  else if (socialPosition < 40) socialLabel = '中自由'
  else socialLabel = '强自由/自由主义'

  return generateProfessionalResult({
    type: 'political-ideology-professional',
    title: `${economicLabel} · ${socialLabel}`,
    description: `基于${answers.length}道专业题目的政治坐标分析：经济轴${Math.round(economicPosition)}%（${economicLabel}），社会轴${Math.round(socialPosition)}%（${socialLabel}）`,
    score: Math.round(Math.abs(economicPosition) + Math.abs(socialPosition)),
    accuracy: 88,
    dimensions: [
      { name: '经济平等倾向', score: economicLeftScore, maxScore: 75, description: '' },
      { name: '市场自由倾向', score: economicRightScore, maxScore: 75, description: '' },
      { name: '个人自由倾向', score: socialLibertyScore, maxScore: 75, description: '' },
      { name: '社会秩序倾向', score: socialAuthorityScore, maxScore: 75, description: '' },
    ],
    strengths: [`${economicLabel}在经济议题上立场明确`, `${socialLabel}在社会议题上态度清晰`],
    weaknesses: ['可更多了解不同政治哲学'],
    careers: ['政策分析师', '政治顾问', '学者', '记者', '公务员'],
    suggestions: [`🏛️ 政治意识形态专业评估报告（${answers.length}题）

📊 你的政治坐标：
• 经济维度：${Math.round(economicPosition)}% → ${economicLabel}
• 社会维度：${Math.round(socialPosition)}% → ${socialLabel}

💡 详细解读：
• 经济左倾：支持再分配、福利国家、政府干预
• 经济右倾：支持自由市场、私有化、减税
• 社会自由：重视个人权利、公民自由、多元文化
• 社会权威：重视传统价值、社会秩序、集体利益

📚 推荐阅读：
根据你的位置，建议了解相关政治哲学的经典著作和现代应用。
`],
  }, mode)
}
