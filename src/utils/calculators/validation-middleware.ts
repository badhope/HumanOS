import type { Answer } from '../../types'

export interface ValidationOptions {
  minValue?: number
  maxValue?: number
  expectedCount?: number
  strictMode?: boolean
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  sanitizedAnswers: Record<string, number>
}

export function validateAnswers(
  rawAnswers: Answer[] | Record<string, number>,
  options: ValidationOptions = {}
): ValidationResult {
  const { minValue = 1, maxValue = 5, expectedCount, strictMode = false } = options
  const errors: string[] = []
  const warnings: string[] = []
  const sanitizedAnswers: Record<string, number> = {}

  const answerMap: Record<string, number> = Array.isArray(rawAnswers)
    ? rawAnswers.reduce((acc, a) => {
        const value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3), 10)
        acc[a.questionId] = value
        return acc
      }, {} as Record<string, number>)
    : rawAnswers

  Object.entries(answerMap).forEach(([key, rawValue]) => {
    let value = rawValue

    if (typeof value !== 'number' || Number.isNaN(value)) {
      if (strictMode) {
        errors.push(`无效值: ${key} = ${value}`)
      } else {
        warnings.push(`修正无效值: ${key} = ${value} → 3`)
        value = 3
      }
    }

    if (value < minValue || value > maxValue) {
      if (strictMode) {
        errors.push(`超出范围: ${key} = ${value} (应为 ${minValue}-${maxValue})`)
      } else {
        warnings.push(`修正边界值: ${key} = ${value} → ${Math.min(maxValue, Math.max(minValue, value))}`)
        value = Math.min(maxValue, Math.max(minValue, value))
      }
    }

    sanitizedAnswers[key] = value
  })

  if (expectedCount && Object.keys(sanitizedAnswers).length < expectedCount) {
    const missing = expectedCount - Object.keys(sanitizedAnswers).length
    warnings.push(`缺少 ${missing} 个答案，已使用默认值填充`)
    for (let i = 1; i <= expectedCount; i++) {
      if (!sanitizedAnswers[String(i)]) {
        sanitizedAnswers[String(i)] = 3
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    sanitizedAnswers,
  }
}

export function createCalculatorWithValidation<T extends object>(
  calculatorFn: (answers: Answer[]) => T,
  validationOptions: ValidationOptions = {}
) {
  return (answers: Answer[]): T => {
    const validation = validateAnswers(answers, validationOptions)
    if (!validation.isValid) {
      console.warn('[Calculator Validation]', validation.warnings)
    }
    return calculatorFn(answers)
  }
}
