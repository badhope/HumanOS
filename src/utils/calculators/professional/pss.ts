import type { Answer, ProfessionalAssessmentResult } from './types'
import { generateProfessionalResult } from '../../professionalScoring'

export function calculatePSSProfessional(
  answers: Answer[],
  mode: 'normal' | 'advanced' | 'professional' = 'professional'
): ProfessionalAssessmentResult {
  let rawScore = 0
  const reverseItems = ['pss-4', 'pss-5', 'pss-7', 'pss-8']
  
  answers.forEach((answer) => {
    let value = answer.value || 0
    if (reverseItems.includes(answer.questionId)) {
      value = 4 - value
    }
    rawScore += value
  })

  const severityLevel = getPSSLevel(rawScore)

  return generateProfessionalResult({
    type: 'pss-professional',
    title: `压力知觉量表 - ${severityLevel.label}`,
    description: severityLevel.description,
    score: rawScore,
    accuracy: 90,
    dimensions: [
      {
        name: '压力知觉总分',
        score: rawScore,
        maxScore: 40,
        description: severityLevel.label,
      },
    ],
    strengths: rawScore < 14 ? ['压力知觉水平正常'] : [],
    weaknesses: rawScore >= 14 ? ['压力知觉偏高'] : [],
    careers: [],
    suggestions: [severityLevel.recommendation],
    profileAnalysis: {
      rawScore,
      formula: 'RawScore = Σ(Score_i), 反向计分题 Score_i = 4 - Value_i',
    },
  }, mode)
}

function getPSSLevel(score: number): { label: string; description: string; recommendation: string } {
  if (score < 14) {
    return {
      label: '低压力',
      description: '您的压力知觉处于较低水平，能够有效应对生活中的压力源。',
      recommendation: '继续保持健康的生活方式，包括规律运动、充足睡眠和社交活动。',
    }
  } else if (score < 27) {
    return {
      label: '中等压力',
      description: '您的压力知觉处于中等水平，在某些情况下可能会感到压力较大。',
      recommendation: '建议学习一些压力管理技巧，如深呼吸、正念冥想或时间管理方法。',
    }
  } else {
    return {
      label: '高压力',
      description: '您的压力知觉处于较高水平，可能需要关注心理健康。',
      recommendation: '建议寻求专业心理帮助，同时尝试运动、社交和放松技巧来缓解压力。',
    }
  }
}
