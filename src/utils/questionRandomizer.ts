import type { Question, Option } from '../types'

export interface RandomizedQuestion extends Omit<Question, 'options'> {
  options: (Option & { originalIndex: number })[]
  originalIndex: number
}

export interface RandomizationConfig {
  minQuestions: number
  maxQuestions: number
  shuffleQuestions: boolean
  shuffleOptions: boolean
  seed: string | null
}

const DEFAULT_CONFIG: RandomizationConfig = {
  minQuestions: 20,
  maxQuestions: 50,
  shuffleQuestions: true,
  shuffleOptions: true,
  seed: null,
}

class SeededRandom {
  private seed: number

  constructor(seed: string) {
    this.seed = this.hashString(seed)
  }

  private hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash)
  }

  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff
    return this.seed / 0x7fffffff
  }

  shuffleArray<T>(array: T[]): T[] {
    const result = [...array]
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1))
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }
}

export function generateSeed(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const random2 = Math.random().toString(36).substring(2, 15)
  return `${timestamp}-${random}-${random2}`
}

function getOrCreateSeed(assessmentId: string, mode: string): string {
  const storageKey = `randomization-seed-${assessmentId}-${mode}`
  const existingSeed = localStorage.getItem(storageKey)
  
  if (existingSeed) {
    return existingSeed
  }
  
  const newSeed = generateSeed()
  localStorage.setItem(storageKey, newSeed)
  return newSeed
}

export function smartRandomizeQuestions(
  questions: Question[],
  config: Partial<RandomizationConfig> = {}
): RandomizedQuestion[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  
  const seed = finalConfig.seed || getOrCreateSeed(
    questions.length > 0 ? questions[0].id || 'default' : 'default',
    'normal'
  )
  const rng = new SeededRandom(seed)
  
  const validQuestions = questions.filter(q => 
    q && q.text && q.options && q.options.length > 0
  )
  
  if (validQuestions.length === 0) {
    return []
  }
  
  let selectedQuestions: Question[]
  
  if (validQuestions.length <= finalConfig.minQuestions) {
    selectedQuestions = validQuestions
  } else {
    const targetCount = Math.min(
      Math.max(
        finalConfig.minQuestions,
        Math.floor(validQuestions.length * 0.5)
      ),
      finalConfig.maxQuestions,
      validQuestions.length
    )
    
    if (finalConfig.shuffleQuestions) {
      const shuffled = rng.shuffleArray(validQuestions)
      selectedQuestions = shuffled.slice(0, targetCount)
    } else {
      selectedQuestions = validQuestions.slice(0, targetCount)
    }
  }
  
  const result: RandomizedQuestion[] = selectedQuestions.map((q, index) => {
    let options: (Option & { originalIndex: number })[]
    
    if (finalConfig.shuffleOptions) {
      const shuffledOptions = rng.shuffleArray(q.options)
      options = shuffledOptions.map((opt, optIndex) => ({
        ...opt,
        originalIndex: optIndex
      }))
    } else {
      options = q.options.map((opt, optIndex) => ({
        ...opt,
        originalIndex: optIndex
      }))
    }
    
    return {
      ...q,
      options,
      originalIndex: index
    }
  })
  
  if (finalConfig.shuffleQuestions && result.length > 1) {
    return rng.shuffleArray(result)
  }
  
  return result
}

export function getRandomizationInfo(questions: Question[]): {
  totalAvailable: number
  willBeSelected: number
  randomizationSeed: string
} {
  const seed = generateSeed()
  const targetCount = Math.min(
    Math.max(20, Math.floor(questions.length * 0.5)),
    50,
    questions.length
  )
  
  return {
    totalAvailable: questions.length,
    willBeSelected: questions.length <= 20 ? questions.length : targetCount,
    randomizationSeed: seed
  }
}

export function clearRandomizationSeed(assessmentId: string, mode: string): void {
  const storageKey = `randomization-seed-${assessmentId}-${mode}`
  localStorage.removeItem(storageKey)
}

export function restoreRandomizationSeed(seed: string): (questions: Question[]) => RandomizedQuestion[] {
  return (questions: Question[]) => {
    return smartRandomizeQuestions(questions, { seed, shuffleQuestions: true, shuffleOptions: true })
  }
}

export function convertBackToOriginalAnswer(
  selectedOptionId: string,
  question: RandomizedQuestion
): number {
  const selectedOption = question.options.find(opt => opt.id === selectedOptionId)
  
  if (selectedOption) {
    return selectedOption.value ?? 3
  }
  
  const numericId = parseInt(selectedOptionId)
  if (!isNaN(numericId) && numericId >= 0 && numericId < question.options.length) {
    return question.options[numericId].value ?? 3
  }
  
  return 3
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
