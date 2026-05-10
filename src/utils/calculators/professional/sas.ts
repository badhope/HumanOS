import type { Answer, ProfessionalAssessmentResult } from './types'
import { calculateTScore, calculatePercentileFromTScore, getScoreRange, SAS_MATH_SYSTEM, calculateConfidenceInterval, calculateAccuracy, createRiskAssessment } from './types'
import { calculateSASIndex, interpretSASScore } from '../../../data/professional/sas-professional'
import { generateProfessionalResult } from '../../professionalScoring'

export function calculateSASProfessional(answers: Answer[]): ProfessionalAssessmentResult {
  const reverseItems = ['sas-5', 'sas-9', 'sas-13', 'sas-17', 'sas-19']
  
  let rawScore = 0
  const itemScores: number[] = []
  
  answers.forEach((answer) => {
    let value = answer.value || 0
    if (reverseItems.includes(answer.questionId)) {
      value = 5 - value
    }
    rawScore += value
    itemScores.push(value)
  })

  const indexScore = calculateSASIndex(rawScore)
  const interpretation = interpretSASScore(indexScore)

  const severityLevel = SAS_MATH_SYSTEM.severityLevels.find(
    l => indexScore >= l.indexRange[0] && indexScore <= l.indexRange[1]
  )

  const tScore = calculateTScore(rawScore, 40, 10)
  const percentile = calculatePercentileFromTScore(tScore)

  const subscaleScores: Record<string, any> = {
    anxiety: {
      rawScore,
      maxScore: 80,
      standardScore: indexScore,
      percentile,
      level: getSeverityLevel(indexScore),
      interpretation: interpretation.description,
    },
  }

  const riskAssessment = createRiskAssessment(
    { anxiety: indexScore },
    { anxiety: { warning: 45, critical: 60 } }
  )

  const confidenceInterval = calculateConfidenceInterval(indexScore, 10, answers.length, 0.95)

  return generateProfessionalResult(
    {
      type: 'sas-professional',
      title: `焦虑自评量表 - ${interpretation.level}`,
      description: interpretation.description,
      score: indexScore,
      accuracy: calculateAccuracy(answers.length, 20),
      dimensions: [
        { 
          name: '焦虑指数', 
          score: indexScore, 
          maxScore: 100, 
          description: interpretation.level,
          confidenceInterval,
        },
      ],
      strengths: indexScore < 45 ? ['焦虑水平正常'] : [],
      weaknesses: indexScore >= 45 ? ['焦虑水平偏高'] : [],
      careers: [],
      suggestions: [interpretation.recommendation],
      standardScore: indexScore,
      subscaleScores,
      riskAssessment,
      clinicalInterpretation: interpretation.description,
      interventionRecommendations: [interpretation.recommendation],
      profileAnalysis: {
        rawScore,
        indexScore,
        severityLevel: severityLevel?.level,
        itemScores,
        formula: SAS_MATH_SYSTEM.scoringFormula,
      },
      references: [
        'Zung, W. W. (1971). A rating instrument for anxiety disorders. Psychosomatics, 12(6), 371-379.',
        'Dunstan, D. A., & Scott, D. (2020). Norms for Zung\'s Self-rating Anxiety Scale. BMC Psychiatry.',
      ],
    },
    'professional'
  )
}

function getSeverityLevel(indexScore: number): string {
  if (indexScore < 45) return 'low'
  if (indexScore < 60) return 'average'
  if (indexScore < 75) return 'high'
  return 'very_high'
}
