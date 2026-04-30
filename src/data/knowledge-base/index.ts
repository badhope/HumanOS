export * from './theories/mbti-theory'
export * from './theories/learning-styles-theory'

export { default as MBTI_KNOWLEDGE } from './theories/mbti-theory'
export { LEARNING_STYLES_THEORY } from './theories/learning-styles-theory'

export type { TypeProfile } from './theories/mbti-theory'
export type { LearningStyleProfile } from './theories/learning-styles-theory'

import { getMBTITheory } from './theories/mbti-theory'
import { getLearningStyleTheory } from './theories/learning-styles-theory'

export type AssessmentType = 'mbti' | 'learning-style' | 'big-five' | 'dark-triad' | 'iq' | 'eq'

export function getKnowledgeForResult(
  assessmentId: string,
  result: Record<string, any>
) {
  try {
    if (!assessmentId || !result) {
      return null
    }

    const typeMatch = String(assessmentId).toLowerCase()
    
    if (typeMatch.includes('mbti') || typeMatch.includes('sbti') || typeMatch.includes('16personalities')) {
      let typeCode = result.type || (result.dimension?.type)
      if (typeCode) {
        const profile = getMBTITheory(typeCode)
        if (profile) {
          return {
            type: 'mbti',
            profile
          }
        }
      }
    }
    
    if (typeMatch.includes('kolb') || typeMatch.includes('learning') || typeMatch.includes('学习')) {
      let typeCode = result.type || (result.learningStyle?.type) || (result.style?.type)
      if (!typeCode && result.preference) {
        typeCode = result.preference.type
      }
      if (typeCode) {
        const profile = getLearningStyleTheory(typeCode)
        if (profile) {
          return {
            type: 'learning-style',
            profile
          }
        }
      }
    }
  } catch (e) {
    console.warn('知识库检索失败:', e)
  }
  
  return null
}

