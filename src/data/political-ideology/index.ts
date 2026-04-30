import { validatePoliticalIdeologySystem, printValidationReport } from './system-validation'
import { validatePerformanceAndConsistency, printPerformanceReport } from './performance-validation'
import { POLITICAL_IDEOLOGIES, IDEOLOGY_DIMENSIONS } from './ideology-theoretical-framework'
import { STANDARDIZED_QUESTIONS } from './standardized-question-bank'

export * from './ideology-theoretical-framework'
export * from './ideology-weighted-calculator'
export * from './standardized-question-bank'
export * from './system-validation'
export * from './mode-configuration'
export * from './performance-validation'

export { default as PoliticalIdeologySpectrum } from '../../components/charts/PoliticalIdeologySpectrum'
export { default as ModeSelector } from '../../components/ModeSelector'

export * from '../../hooks/useAssessmentMode'

export function runSystemValidation() {
  const result = validatePoliticalIdeologySystem()
  printValidationReport(result)
  return result
}

export function runFullValidation() {
  console.log('\n' + '═'.repeat(70))
  console.log('🧪 运行完整系统验证（包含性能与一致性检测）')
  console.log('═'.repeat(70))

  const systemResult = validatePoliticalIdeologySystem()
  const performanceResult = validatePerformanceAndConsistency()

  printValidationReport(systemResult)
  printPerformanceReport(performanceResult)

  return {
    system: systemResult,
    performance: performanceResult,
  }
}

console.log('📋 政治意识形态评估系统已成功加载')
console.log(`   - ${POLITICAL_IDEOLOGIES.length} 种意识形态理论`)
console.log(`   - ${IDEOLOGY_DIMENSIONS.length} 维评估体系`)
console.log(`   - ${STANDARDIZED_QUESTIONS.length} 道标准化题目`)
console.log(`   - 3 种测评模式: 🎯 普通 | 🔬 进阶 | ⚡ 专业`)
console.log('\n✨ 系统就绪！执行 runFullValidation() 运行完整验证')

if (typeof window !== 'undefined') {
  (window as any).PoliticalIdeologySystem = {
    runValidation: runSystemValidation,
    runFullValidation,
  }
}
