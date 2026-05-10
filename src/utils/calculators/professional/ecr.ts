import type { Answer, ProfessionalAssessmentResult } from './types'
import { calculatePercentileFromTScore, getScoreRange, ATTACHMENT_MATH_SYSTEM, calculateAccuracy } from './types'
import { attachmentStyles, determineAttachmentStyle } from '../../../data/professional/attachment-professional'
import { generateProfessionalResult } from '../../professionalScoring'

export function calculateAttachmentProfessional(answers: Answer[]): ProfessionalAssessmentResult {
  let anxietyScore = 0
  let avoidanceScore = 0
  let anxietyCount = 0
  let avoidanceCount = 0
  const anxietyItems: number[] = []
  const avoidanceItems: number[] = []

  answers.forEach((answer) => {
    const subscale = answer.dimension || answer.trait || ''
    if (subscale === 'anxiety') {
      anxietyScore += answer.value || 0
      anxietyCount++
      anxietyItems.push(answer.value || 0)
    } else if (subscale === 'avoidance') {
      avoidanceScore += answer.value || 0
      avoidanceCount++
      avoidanceItems.push(answer.value || 0)
    }
  })

  const avgAnxiety = anxietyCount > 0 ? anxietyScore / anxietyCount : 0
  const avgAvoidance = avoidanceCount > 0 ? avoidanceScore / avoidanceCount : 0

  const style = determineAttachmentStyle(avgAnxiety, avgAvoidance)
  const styleInfo = attachmentStyles[style]

  const anxietyPercentile = Math.round((avgAnxiety / 7) * 100)
  const avoidancePercentile = Math.round((avgAvoidance / 7) * 100)

  const anxietyRange = getScoreRange(anxietyPercentile)
  const avoidanceRange = getScoreRange(avoidancePercentile)

  const dimensions = [
    { 
      name: '焦虑维度', 
      score: anxietyPercentile, 
      maxScore: 100, 
      description: `焦虑得分: ${avgAnxiety.toFixed(2)} (${anxietyRange.level})`,
      level: anxietyRange.level,
    },
    { 
      name: '回避维度', 
      score: avoidancePercentile, 
      maxScore: 100, 
      description: `回避得分: ${avgAvoidance.toFixed(2)} (${avoidanceRange.level})`,
      level: avoidanceRange.level,
    },
  ]

  const subscaleScores: Record<string, any> = {
    anxiety: {
      rawScore: anxietyScore,
      maxScore: anxietyCount * 7,
      standardScore: anxietyPercentile,
      percentile: anxietyPercentile,
      level: anxietyRange.level,
      interpretation: anxietyRange.interpretation,
    },
    avoidance: {
      rawScore: avoidanceScore,
      maxScore: avoidanceCount * 7,
      standardScore: avoidancePercentile,
      percentile: avoidancePercentile,
      level: avoidanceRange.level,
      interpretation: avoidanceRange.interpretation,
    },
  }

  const styleClassification = ATTACHMENT_MATH_SYSTEM.styleClassification.find(
    s => avgAnxiety >= s.anxietyRange[0] && avgAnxiety < s.anxietyRange[1] &&
         avgAvoidance >= s.avoidanceRange[0] && avgAvoidance < s.avoidanceRange[1]
  )

  return generateProfessionalResult(
    {
      type: 'attachment-professional',
      title: `依恋风格评估 - ${styleInfo.name}`,
      description: styleInfo.description,
      score: 0,
      accuracy: calculateAccuracy(answers.length, 36),
      dimensions,
      strengths: styleInfo.strengths,
      weaknesses: styleInfo.challenges,
      careers: [],
      suggestions: [styleInfo.recommendation],
      subscaleScores,
      clinicalInterpretation: styleInfo.relationshipPattern,
      profileAnalysis: {
        style,
        avgAnxiety,
        avgAvoidance,
        styleClassification,
        anxietyItems,
        avoidanceItems,
        formula: ATTACHMENT_MATH_SYSTEM.scoringFormula,
      },
      references: [
        'Fraley, R. C., Waller, N. G., & Brennan, K. A. (2000). An item response theory analysis. J Pers Soc Psychol.',
        'Mikulincer, M., & Shaver, P. R. (2016). Attachment in adulthood. Guilford Press.',
      ],
    },
    'professional'
  )
}
