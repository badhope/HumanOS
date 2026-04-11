import { STANDARDIZED_QUESTIONS, createQuestionSet } from './standardized-question-bank'
import { POLITICAL_IDEOLOGIES, IDEOLOGY_DIMENSIONS, IDEOLOGY_COMPATIBILITY } from './ideology-theoretical-framework'
import {
  calculateDimensionScores,
  calculateIdeologyMatches,
  analyzeIdeologyConflicts,
  determineCombinationType,
  generateCompleteIdeologySpectrum,
  type IdeologySpectrumResult,
} from './ideology-weighted-calculator'

export interface SystemValidationResult {
  questionBank: {
    totalQuestions: number
    questionsPerDimension: Record<string, number>
    uniqueIdeologiesInLoadings: string[]
    averageLoadingsPerQuestion: number
    modeQuestionCounts: Record<string, number>
  }
  theoreticalFramework: {
    totalIdeologies: number
    dimensions: number
    compatibilityPairs: number
    uniqueIdeologiesInFramework: string[]
  }
  algorithm: {
    dimensionWeightsSum: number
    recommendedQuestionCount: number
    testCases: ValidationTestCase[]
  }
  overallScore: number
  issues: string[]
  recommendations: string[]
}

export interface ValidationTestCase {
  name: string
  profile: Record<string, number>
  passes: boolean
  dominantIdeologies: string[]
  combinationType: string
  conflictCount: number
  error?: string
}

export function validatePoliticalIdeologySystem(): SystemValidationResult {
  const issues: string[] = []
  const recommendations: string[] = []

  const questionBank = validateQuestionBank(issues, recommendations)
  const theoreticalFramework = validateTheoreticalFramework(issues, recommendations)
  const algorithm = validateAlgorithms(issues, recommendations)

  const overallScore = calculateOverallScore(questionBank, theoreticalFramework, algorithm, issues)

  return {
    questionBank,
    theoreticalFramework,
    algorithm,
    overallScore,
    issues,
    recommendations,
  }
}

function validateQuestionBank(issues: string[], recommendations: string[]) {
  const result = {
    totalQuestions: STANDARDIZED_QUESTIONS.length,
    questionsPerDimension: {} as Record<string, number>,
    uniqueIdeologiesInLoadings: [] as string[],
    averageLoadingsPerQuestion: 0,
    modeQuestionCounts: {} as Record<string, number>,
  }

  const dimensions = ['economic', 'social', 'cultural', 'international', 'ecological']
  dimensions.forEach(dim => {
    result.questionsPerDimension[dim] = STANDARDIZED_QUESTIONS.filter(q => q.dimension === dim).length
  })

  Object.entries(result.questionsPerDimension).forEach(([dim, count]) => {
    if (count < 10) {
      issues.push(`维度 ${dim} 题目数量不足: ${count} 题 (建议至少15题)`)
    }
  })

  const allIdeologies = new Set<string>()
  let totalLoadings = 0
  STANDARDIZED_QUESTIONS.forEach(q => {
    Object.keys(q.ideologyLoadings).forEach(ideo => allIdeologies.add(ideo))
    totalLoadings += Object.keys(q.ideologyLoadings).length
  })

  result.uniqueIdeologiesInLoadings = Array.from(allIdeologies)
  result.averageLoadingsPerQuestion = Math.round((totalLoadings / STANDARDIZED_QUESTIONS.length) * 100) / 100

  if (result.averageLoadingsPerQuestion < 3) {
    recommendations.push('建议增加每题的意识形态载荷数，目前平均每题仅连接 ' + result.averageLoadingsPerQuestion + ' 种意识形态')
  }

  result.modeQuestionCounts = {
    normal: createQuestionSet('normal').length,
    advanced: createQuestionSet('advanced').length,
    professional: createQuestionSet('professional').length,
  }

  const advancedText = STANDARDIZED_QUESTIONS.some(q => q.text.includes('进阶') || q.text.includes('高级'))
  if (advancedText) {
    issues.push('题库中发现"进阶级"或"高级"表述，需要移除')
  }

  return result
}

function validateTheoreticalFramework(issues: string[], recommendations: string[]) {
  const result = {
    totalIdeologies: POLITICAL_IDEOLOGIES.length,
    dimensions: IDEOLOGY_DIMENSIONS.length,
    compatibilityPairs: IDEOLOGY_COMPATIBILITY.length,
    uniqueIdeologiesInFramework: POLITICAL_IDEOLOGIES.map(i => i.id),
  }

  if (result.totalIdeologies < 30) {
    recommendations.push(`目前仅定义了 ${result.totalIdeologies} 种意识形态，建议扩展到40种以上`)
  }

  const coveredIdeologies = new Set<string>()
  IDEOLOGY_COMPATIBILITY.forEach(pair => {
    coveredIdeologies.add(pair.ideologyA)
    coveredIdeologies.add(pair.ideologyB)
  })

  const coverage = Math.round((coveredIdeologies.size / result.totalIdeologies) * 100)
  if (coverage < 50) {
    recommendations.push(`意识形态兼容性关系覆盖率仅为 ${coverage}%，建议补充更多意识形态对的关系定义`)
  }

  const weightSum = IDEOLOGY_DIMENSIONS.reduce((sum, d) => sum + d.weight, 0)
  if (Math.abs(weightSum - 1.0) > 0.01) {
    issues.push(`维度权重总和为 ${weightSum}，应为 1.0`)
  }

  return result
}

function validateAlgorithms(issues: string[], recommendations: string[]) {
  const testCases: ValidationTestCase[] = []

  const dimensionWeightSum = IDEOLOGY_DIMENSIONS.reduce((sum, d) => sum + d.weight, 0)
  const recommendedQuestionCount = IDEOLOGY_DIMENSIONS.reduce((sum, d) => sum + d.questionDistribution, 0)

  const extremeLeftAnswers: Record<string, number> = {}
  const extremeRightAnswers: Record<string, number> = {}
  STANDARDIZED_QUESTIONS.forEach((q, i) => {
    extremeLeftAnswers[q.id] = i < STANDARDIZED_QUESTIONS.length / 2 ? 1 : 2
    extremeRightAnswers[q.id] = i < STANDARDIZED_QUESTIONS.length / 2 ? 4 : 5
  })

  const questionDimensions: Record<string, string> = {}
  STANDARDIZED_QUESTIONS.forEach(q => {
    questionDimensions[q.id] = q.dimension
  })

  const testProfiles = [
    { name: '极左翼测试', answers: extremeLeftAnswers, expectedDominance: ['socialism', 'anarcho', 'marxism'] },
    { name: '极右翼测试', answers: extremeRightAnswers, expectedDominance: ['conservatism', 'libertarian', 'nationalism'] },
    { name: '中立测试', answers: (() => {
      const neutral: Record<string, number> = {}
      STANDARDIZED_QUESTIONS.forEach(q => { neutral[q.id] = 3 })
      return neutral
    })(), expectedDominance: ['moderate', 'liberal', 'centrism'] },
    { name: '随机测试', answers: (() => {
      const random: Record<string, number> = {}
      STANDARDIZED_QUESTIONS.forEach(q => {
        random[q.id] = Math.floor(Math.random() * 5) + 1
      })
      return random
    })(), expectedDominance: [] },
  ]

  testProfiles.forEach(profile => {
    try {
      const spectrum = generateCompleteIdeologySpectrum(profile.answers, questionDimensions)
      const dominantNames = spectrum.dominantIdeologies.join(',')
      const matchesAny = profile.expectedDominance.some(keyword =>
        dominantNames.toLowerCase().includes(keyword.toLowerCase())
      )

      testCases.push({
        name: profile.name,
        profile: spectrum.spectralCoordinates,
        passes: profile.expectedDominance.length === 0 || matchesAny,
        dominantIdeologies: spectrum.dominantIdeologies,
        combinationType: spectrum.combinationType,
        conflictCount: spectrum.conflictAnalysis.length,
      })
    } catch (e) {
      testCases.push({
        name: profile.name,
        profile: {},
        passes: false,
        dominantIdeologies: [],
        combinationType: 'error',
        conflictCount: 0,
        error: String(e),
      })
      issues.push(`测试用例 "${profile.name}" 执行失败: ${e}`)
    }
  })

  return {
    dimensionWeightsSum: dimensionWeightSum,
    recommendedQuestionCount,
    testCases,
  }
}

function calculateOverallScore(
  questionBank: SystemValidationResult['questionBank'],
  theoreticalFramework: SystemValidationResult['theoreticalFramework'],
  algorithm: SystemValidationResult['algorithm'],
  issues: string[]
): number {
  let score = 100

  if (issues.length > 0) score -= issues.length * 5
  score -= Math.max(0, (15 - Object.values(questionBank.questionsPerDimension)[0] || 0) * 2)
  score -= Math.max(0, (36 - theoreticalFramework.totalIdeologies))

  const passedTests = algorithm.testCases.filter(t => t.passes).length
  score -= (algorithm.testCases.length - passedTests) * 10

  return Math.max(0, score)
}

export function printValidationReport(result: SystemValidationResult) {
  console.log('\n' + '='.repeat(60))
  console.log('      政治意识形态评估系统 - 系统验证报告')
  console.log('='.repeat(60))

  console.log('\n📊 题库质量检测:')
  console.log(`   总题目数: ${result.questionBank.totalQuestions} 题`)
  console.log(`   各维度题目分布:`)
  Object.entries(result.questionBank.questionsPerDimension).forEach(([dim, count]) => {
    console.log(`     - ${dim}: ${count} 题`)
  })
  console.log(`   平均每题意识形态载荷: ${result.questionBank.averageLoadingsPerQuestion} 种`)
  console.log(`   涉及意识形态数量: ${result.questionBank.uniqueIdeologiesInLoadings.length} 种`)
  console.log(`   模式题目数: 普通版 ${result.questionBank.modeQuestionCounts.normal} / 进阶版 ${result.questionBank.modeQuestionCounts.advanced} / 专业版 ${result.questionBank.modeQuestionCounts.professional}`)

  console.log('\n📚 理论框架完整性:')
  console.log(`   定义意识形态数量: ${result.theoreticalFramework.totalIdeologies} 种`)
  console.log(`   评估维度数量: ${result.theoreticalFramework.dimensions} 维`)
  console.log(`   意识形态兼容性关系: ${result.theoreticalFramework.compatibilityPairs} 对`)

  console.log('\n🧪 算法正确性测试:')
  console.log(`   维度权重总和: ${result.algorithm.dimensionWeightsSum} (${result.algorithm.dimensionWeightsSum === 1.0 ? '✓ 正确' : '✗ 错误'})`)
  result.algorithm.testCases.forEach(test => {
    console.log(`   ${test.passes ? '✓' : '✗'} ${test.name}`)
    console.log(`       主导意识形态: ${test.dominantIdeologies.join(', ') || '无'}`)
    console.log(`       组合类型: ${test.combinationType}`)
    console.log(`       冲突检测: ${test.conflictCount} 项`)
  })

  console.log('\n⚠️  发现问题:')
  if (result.issues.length === 0) {
    console.log('   ✓ 未发现严重问题')
  } else {
    result.issues.forEach(issue => {
      console.log(`   ✗ ${issue}`)
    })
  }

  console.log('\n💡 改进建议:')
  if (result.recommendations.length === 0) {
    console.log('   ✓ 系统状态良好')
  } else {
    result.recommendations.forEach(rec => {
      console.log(`   - ${rec}`)
    })
  }

  console.log('\n' + '-'.repeat(60))
  console.log(`   系统综合评分: ${result.overallScore} / 100 分`)
  console.log(`   评定结果: ${result.overallScore >= 90 ? '优秀 ✓' : result.overallScore >= 70 ? '良好' : result.overallScore >= 50 ? '需改进' : '不合格 ✗'}`)
  console.log('='.repeat(60) + '\n')
}

const validationResult = validatePoliticalIdeologySystem()
printValidationReport(validationResult)
