import type { Question } from '../types'
import { cache } from './cacheLayer'

interface QuestionQualityConfig {
  maxNormalVersionQuestions: number
  minOptionsPerQuestion: number
  maxTextSimilarityThreshold: number
}

const DEFAULT_CONFIG: QuestionQualityConfig = {
  maxNormalVersionQuestions: 28,
  minOptionsPerQuestion: 4,
  maxTextSimilarityThreshold: 0.75,
}

const SIMILARITY_CACHE = new Map<string, number>()

function hashQuestions(questions: Question[]): string {
  const ids = questions.map(q => q.id || q.text.slice(0, 50)).join('|')
  let hash = 0
  for (let i = 0; i < ids.length; i++) {
    hash = ((hash << 5) - hash) + ids.charCodeAt(i)
    hash |= 0
  }
  return hash.toString(36)
}

function getOrCache<T extends Question[]>(
  key: string,
  factory: () => T
): T {
  const cached = cache.get(key)
  if (cached) return cached as T

  const value = factory()
  cache.set(`qqc:${key}`, value, { persistent: true, ttl: 86400000 })
  return value
}

function calculateTextSimilarity(text1: string, text2: string): number {
  const cacheKey = `${text1.length}:${text2.length}:${text1.slice(0, 10)}:${text2.slice(0, 10)}`
  const cached = SIMILARITY_CACHE.get(cacheKey)
  if (cached !== undefined) return cached

  const normalize = (text: string) =>
    text.toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-z0-9]/g, '')
      .replace(/[的了是我你在不有和就人都这为们到说要去会着那看好听好只又可还多没也最]/g, '')

  const t1 = normalize(text1)
  const t2 = normalize(text2)

  let result = 0
  if (t1 === t2) {
    result = 1
  } else if (t1.length === 0 || t2.length === 0) {
    result = 0
  } else {
    let matches = 0
    const set1 = new Set(t1.split(''))
    const set2 = new Set(t2.split(''))

    set1.forEach(char => {
      if (set2.has(char)) matches++
    })

    const union = new Set([...t1.split(''), ...t2.split('')]).size
    result = matches / union
  }

  SIMILARITY_CACHE.set(cacheKey, result)
  if (SIMILARITY_CACHE.size > 5000) {
    SIMILARITY_CACHE.clear()
  }

  return result
}

export function deduplicateQuestions(
  questions: Question[],
  threshold: number = DEFAULT_CONFIG.maxTextSimilarityThreshold
): Question[] {
  const cacheKey = `dedup:${hashQuestions(questions)}:${threshold}`

  return getOrCache(cacheKey, () => {
    const result: Question[] = []
    const usedIndexes = new Set<number>()

    for (let i = 0; i < questions.length; i++) {
      if (usedIndexes.has(i)) continue

      const q1 = questions[i]
      result.push(q1)

      for (let j = i + 1; j < questions.length; j++) {
        if (usedIndexes.has(j)) continue

        const q2 = questions[j]
        const similarity = calculateTextSimilarity(q1.text, q2.text)

        if (similarity >= threshold) {
          usedIndexes.add(j)
        }
      }
    }

    return result
  })
}

export function stratifiedSampling(
  questions: Question[],
  targetCount: number
): Question[] {
  const cacheKey = `sample:${hashQuestions(questions)}:${targetCount}`

  return getOrCache(cacheKey, () => {
    const uniqueQuestions = deduplicateQuestions(questions)

    const dimensionGroups: Record<string, Question[]> = {}

    uniqueQuestions.forEach(q => {
      const dim = q.dimension || 'general'
      if (!dimensionGroups[dim]) {
        dimensionGroups[dim] = []
      }
      dimensionGroups[dim].push(q)
    })

    const dimensions = Object.keys(dimensionGroups)
    const perDimension = Math.ceil(targetCount / Math.max(dimensions.length, 1))

    const result: Question[] = []

    dimensions.forEach(dim => {
      const group = dimensionGroups[dim]
      const shuffled = [...group].sort(() => Math.random() - 0.5)
      result.push(...shuffled.slice(0, perDimension))
    })

    return result
      .sort(() => Math.random() - 0.5)
      .slice(0, targetCount)
      .map(q => ({
        ...q,
        type: 'single' as const,
      }))
  })
}

export function ensureFourOptions(questions: Question[]): Question[] {
  const standardOptions = [
    { id: '1', text: '非常不同意', value: 1 },
    { id: '2', text: '有些不同意', value: 2 },
    { id: '3', text: '有些同意', value: 3 },
    { id: '4', text: '非常同意', value: 4 },
  ]

  const bipolarOptions = [
    { id: '1', text: '完全不符合', value: 1 },
    { id: '2', text: '比较不符合', value: 2 },
    { id: '3', text: '比较符合', value: 3 },
    { id: '4', text: '完全符合', value: 4 },
  ]

  const frequencyOptions = [
    { id: '1', text: '从不', value: 1 },
    { id: '2', text: '偶尔', value: 2 },
    { id: '3', text: '经常', value: 3 },
    { id: '4', text: '总是', value: 4 },
  ]

  return questions.map(q => {
    if (q.options && q.options.length >= 4) {
      return q
    }

    let optionsToUse = standardOptions

    const text = q.text.toLowerCase()
    if (text.includes('符合') || text.includes('描述') || text.includes('像我')) {
      optionsToUse = bipolarOptions
    } else if (text.includes('经常') || text.includes('通常') || text.includes('频率') || text.includes('感到')) {
      optionsToUse = frequencyOptions
    }

    return {
      ...q,
      type: 'single' as const,
      options: optionsToUse,
    }
  })
}

export function generateNormalVersion(questions: Question[]): Question[] {
  const sampled = stratifiedSampling(questions, DEFAULT_CONFIG.maxNormalVersionQuestions)
  return ensureFourOptions(sampled)
}

export function processAssessmentQuestions(
  questions: Question[],
  mode: 'normal' | 'professional' = 'normal'
): Question[] {
  const cacheKey = `process:${hashQuestions(questions)}:${mode}`

  return getOrCache(cacheKey, () => {
    if (mode === 'professional') {
      return deduplicateQuestions(questions)
    }
    return generateNormalVersion(questions)
  })
}

export function getQualityControlStats() {
  return {
    similarityCacheSize: SIMILARITY_CACHE.size,
  }
}
