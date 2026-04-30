/**
 * D.R.E.A.M 官场人格五维测评 计算器
 * 适配器：桥接 professional/officialdom-calculator.ts 和 standardCalculators
 */
import { calculateOfficialdom } from '@data/professional/officialdom/officialdom-calculator'

/**
 * standardCalculators 传入的是 Record<string, number> 格式的 answers
 * officialdom-calculator 期望的是 Answer[] 格式
 * 这里做格式转换
 */
export function calculateOfficialdomWrapper(answers: Record<string, number> | any[]) {
  const answerArray = Array.isArray(answers)
    ? answers
    : Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        selectedOptions: [],
        value: typeof value === 'number' ? value : parseInt(String(value || 3)),
      }))

  return calculateOfficialdom(answerArray as any)
}
