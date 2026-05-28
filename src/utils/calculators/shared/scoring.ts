/**
 * 共享的评分工具函数
 * 提供通用的分数计算和处理方法
 */

/**
 * 将原始分数标准化到指定范围
 * @param value 原始值
 * @param min 原始最小值
 * @param max 原始最大值
 * @param targetMin 目标最小值 (默认 0)
 * @param targetMax 目标最大值 (默认 100)
 * @returns 标准化后的分数
 */
export function normalizeScore(
  value: number,
  min: number,
  max: number,
  targetMin: number = 0,
  targetMax: number = 100
): number {
  if (min >= max) return targetMin
  
  // 防止超出范围
  const clampedValue = Math.max(min, Math.min(max, value))
  
  return Math.round(
    targetMin + ((clampedValue - min) / (max - min)) * (targetMax - targetMin)
  )
}

/**
 * 计算平均值
 * @param values 数值数组
 * @returns 平均值
 */
export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, val) => sum + val, 0) / values.length
}

/**
 * 计算标准差
 * @param values 数值数组
 * @returns 标准差
 */
export function calculateStandardDeviation(values: number[]): number {
  if (values.length < 2) return 0
  
  const mean = calculateMean(values)
  const sumSquaredDiffs = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0)
  
  return Math.sqrt(sumSquaredDiffs / (values.length - 1))
}

/**
 * 计算百分位数
 * @param score 分数
 * @param percentiles 百分位数映射表
 * @returns 百分位排名
 */
export function calculatePercentileRank(
  score: number,
  percentiles: Record<number, number>
): number {
  const sortedKeys = Object.keys(percentiles)
    .map(Number)
    .sort((a, b) => a - b)
  
  if (sortedKeys.length === 0) return 50
  
  for (let i = 0; i < sortedKeys.length; i++) {
    if (score <= percentiles[sortedKeys[i]]) {
      if (i === 0) return sortedKeys[0]
      
      const lowerP = sortedKeys[i - 1]
      const upperP = sortedKeys[i]
      const lowerVal = percentiles[lowerP]
      const upperVal = percentiles[upperP]
      
      // 线性插值
      const ratio = (score - lowerVal) / (upperVal - lowerVal)
      return Math.round(lowerP + ratio * (upperP - lowerP))
    }
  }
  
  return sortedKeys[sortedKeys.length - 1]
}

/**
 * 安全的对象属性获取
 * @param obj 对象
 * @param path 属性路径
 * @param defaultValue 默认值
 * @returns 属性值或默认值
 */
export function safeGet<T = any>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined {
  const parts = path.split('.')
  let result: any = obj
  
  for (const part of parts) {
    if (result === null || result === undefined) {
      return defaultValue
    }
    result = result[part]
  }
  
  return (result as T) ?? defaultValue
}

export default {
  normalizeScore,
  calculateMean,
  calculateStandardDeviation,
  calculatePercentileRank,
  safeGet,
}
