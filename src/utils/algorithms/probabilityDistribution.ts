export function normalPDF(x: number, mean: number, stdDev: number): number {
  if (stdDev <= 0) return 0
  const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2)
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent)
}

export function normalCDF(x: number, mean: number, stdDev: number): number {
  const z = (x - mean) / stdDev
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989422804014327
  const p = d * Math.exp(-z * z / 2) * (t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.8212560 + t * 1.3302744)))))
  return z > 0 ? 1 - p : p
}

export function percentileRank(score: number, mean: number, stdDev: number): number {
  return Math.round(normalCDF(score, mean, stdDev) * 100)
}

export function confidenceInterval(mean: number, stdDev: number, n: number, level: number = 0.95): [number, number] {
  const zScore = level === 0.99 ? 2.576 : level === 0.95 ? 1.96 : 1.645
  const margin = zScore * (stdDev / Math.sqrt(n))
  return [mean - margin, mean + margin]
}

export function cronbachAlpha(itemVariances: number[], totalVariance: number): number {
  const k = itemVariances.length
  if (k <= 1 || totalVariance <= 0) return 0
  const sumItemVar = itemVariances.reduce((s, v) => s + v, 0)
  return (k / (k - 1)) * (1 - sumItemVar / totalVariance)
}

export function cohensD(mean1: number, mean2: number, sd1: number, sd2: number): number {
  const pooledSD = Math.sqrt((sd1 * sd1 + sd2 * sd2) / 2)
  if (pooledSD === 0) return 0
  return (mean1 - mean2) / pooledSD
}
