import {
  generatePersonalGrowthReport,
  createGrowthRecorder,
  TRAINING_PROGRAMS,
} from './personal-growth-analyzer'

import type {
  AssessmentRecord,
  GrowthInsight,
  TrainingSuggestion,
  PersonalGrowthReport,
} from './personal-growth-analyzer'

export type {
  AssessmentRecord,
  GrowthInsight,
  TrainingSuggestion,
  PersonalGrowthReport,
}

export {
  generatePersonalGrowthReport,
  createGrowthRecorder,
  TRAINING_PROGRAMS,
}

export function integrateResultToGrowthSystem(result: any, assessmentId: string, assessmentName: string) {
  const recorder = createGrowthRecorder()
  
  return recorder.save({
    assessmentId,
    assessmentName,
    dimensions: result.dimensions || [],
    traits: result.traits,
    overall: result.overallScore || result.overall,
    type: result.type || result.typeCode,
  })
}

export function generateResultWithTrainingSuggestions(result: any, _assessmentId: string) {
  const dimensions = result.dimensions || []
  
  const suggestions: TrainingSuggestion[] = []
  
  for (const dim of dimensions) {
    const score = dim.percentile || dim.score || 50
    
    if (score < 50) {
      const matchingPrograms = TRAINING_PROGRAMS.filter(p => 
        p.relatedDims.some(d => 
          (dim.dimensionId || dim.name || '').toLowerCase().includes(d.toLowerCase())
        )
      )
      if (matchingPrograms.length > 0 && !suggestions.find(s => s.id === matchingPrograms[0].id)) {
        suggestions.push(matchingPrograms[0])
      }
    }
  }
  
  return {
    ...result,
    recommendedTraining: suggestions.slice(0, 3),
  }
}
