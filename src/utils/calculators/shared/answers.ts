/**
 * 答案处理工具函数
 * 提供通用的答案数据处理方法
 */

export interface Answer {
  questionId: string
  value: number
}

/**
 * 将答案数组转换为对象映射
 * @param answers 答案数组
 * @returns {Record<string, number>} 答案映射
 */
export function answersToMap(answers: Answer[]): Record<string, number> {
  return answers.reduce((map, answer) => ({
    ...map,
    [answer.questionId]: answer.value
  }), {})
}

/**
 * 计算特定问题的总分
 * @param answers 答案数组
 * @param questionIds 需要计算的问题ID列表
 * @param reverseScoring 是否反向计分
 * @param maxValue 最大值（用于反向计分）
 * @returns 总分
 */
export function calculateSum(
  answers: Answer[],
  questionIds: string[],
  reverseScoring: boolean = false,
  maxValue: number = 5
): number {
  const map = answersToMap(answers)
  
  return questionIds.reduce((sum, id) => {
    if (map[id] !== undefined) {
      const val = reverseScoring 
        ? maxValue - map[id] + 1 
        : map[id]
      return sum + val
    }
    return sum
  }, 0)
}

/**
 * 计算维度分数
 * @param answers 答案数组
 * @param dimensionConfig 维度配置
 * @returns 维度分数结果
 */
export function calculateDimensionScores<T extends string>(
  answers: Answer[],
  dimensionConfig: Record<T, string[]>
): Record<T, number> {
  const result = {} as Record<T, number>
  
  for (const [dimension, questionIds] of Object.entries(dimensionConfig) as [T, string[]][]) {
    result[dimension] = calculateSum(answers, questionIds)
  }
  
  return result
}

/**
 * 获取最高分的维度
 * @param scores 分数对象
 * @returns 最高分的维度
 */
export function getTopDimension(scores: Record<string, number>): string {
  let maxScore = -Infinity
  let topDimension = ''
  
  for (const [dim, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score
      topDimension = dim
    }
  }
  
  return topDimension
}

export default {
  answersToMap,
  calculateSum,
  calculateDimensionScores,
  getTopDimension,
}
