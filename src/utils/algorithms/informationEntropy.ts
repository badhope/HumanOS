export function shannonEntropy(probabilities: number[]): number {
  return probabilities.reduce((entropy, p) => {
    if (p <= 0 || p >= 1) return entropy
    return entropy - p * Math.log2(p)
  }, 0)
}

export function normalizeToProbabilities(values: number[]): number[] {
  const sum = values.reduce((s, v) => s + Math.abs(v), 0)
  if (sum === 0) return values.map(() => 1 / values.length)
  return values.map(v => Math.abs(v) / sum)
}

export function dimensionEntropy(scores: Record<string, number>): number {
  const values = Object.values(scores)
  const probs = normalizeToProbabilities(values)
  return shannonEntropy(probs)
}

export function informationGain(beforeEntropy: number, afterEntropy: number): number {
  return beforeEntropy - afterEntropy
}

export function calculateScoreEntropy(answers: number[], maxScore: number = 5): number {
  const bins = new Array(maxScore).fill(0)
  answers.forEach(a => {
    const idx = Math.min(Math.max(Math.floor(a) - 1, 0), maxScore - 1)
    bins[idx]++
  })
  const total = answers.length
  const probs = bins.map(b => b / total)
  return shannonEntropy(probs)
}
