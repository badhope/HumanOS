/**
 * 题目随机化工具
 * 用于随机打乱题目顺序（可选功能）
 */

export interface RandomizedQuestion<T = unknown> {
  originalIndex: number
  shuffledIndex: number
  data: T
}

export function generateSeed(): number {
  return Math.floor(Math.random() * 1000000)
}

export function smartRandomizeQuestions<T>(
  questions: T[],
  seed?: number
): RandomizedQuestion<T>[] {
  const random = seed ? seededRandom(seed) : Math.random
  
  return questions
    .map((data, originalIndex) => ({
      originalIndex,
      shuffledIndex: Math.floor(random() * questions.length),
      data
    }))
    .sort((a, b) => a.shuffledIndex - b.shuffledIndex)
}

export function convertBackToOriginalAnswer(
  shuffledIndex: number,
  randomizedQuestions: RandomizedQuestion[]
): number {
  const item = randomizedQuestions.find(q => q.shuffledIndex === shuffledIndex)
  return item ? item.originalIndex : shuffledIndex
}

function seededRandom(seed: number): () => number {
  let currentSeed = seed
  return () => {
    currentSeed = (currentSeed * 1103515245 + 12345) % 2147483648
    return currentSeed / 2147483648
  }
}
