import { STANDARDIZED_QUESTIONS, createQuestionSet } from './standardized-question-bank'
import { generateModeAwareIdeologySpectrum, auditLogger } from './ideology-weighted-calculator'
import { MODE_CONFIGURATIONS, AssessmentMode } from './mode-configuration'
import type { CalculationAuditLog } from './calculation-audit-log'

interface PerformanceMetrics {
  mode: AssessmentMode
  executionTime: number
  memoryUsage: number
  questionCount: number
  operationsPerSecond: number
}

interface ConsistencyMetrics {
  variance: number
  isConsistent: boolean
  iterations: number
  standardDeviation: number
  topMatchStability: number
}

interface ValidationResult {
  performance: PerformanceMetrics[]
  consistency: ConsistencyMetrics
  crossModeComparison: {
    mode: AssessmentMode
    topIdeology: string
    avgSimilarity: number
  }[]
  algorithmBenchmark: {
    cosine: number
    weightedCosine: number
    ensemble: number
  }
}

function generateRandomAnswers(count: number): Record<string, number> {
  const answers: Record<string, number> = {}
  const questions = STANDARDIZED_QUESTIONS.slice(0, count)

  questions.forEach((q) => {
    answers[q.id] = Math.floor(Math.random() * 5) + 1
  })

  return answers
}

function measurePerformance(mode: AssessmentMode, iterations: number = 10): PerformanceMetrics {
  const config = MODE_CONFIGURATIONS[mode]
  const questionCount = config.questionConfig.totalQuestions
  const answers = generateRandomAnswers(questionCount)
  const questionDimensions = Object.fromEntries(
    STANDARDIZED_QUESTIONS.slice(0, questionCount).map(q => [q.id, q.dimension])
  )

  const startMemory = (performance as any).memory?.usedJSHeapSize || 0
  const startTime = performance.now()

  for (let i = 0; i < iterations; i++) {
    generateModeAwareIdeologySpectrum(answers, questionDimensions, mode)
  }

  const endTime = performance.now()
  const endMemory = (performance as any).memory?.usedJSHeapSize || 0

  const avgTime = (endTime - startTime) / iterations
  const avgMemory = (endMemory - startMemory) / 1024 / 1024 / iterations

  return {
    mode,
    executionTime: Math.round(avgTime * 100) / 100,
    memoryUsage: Math.round(avgMemory * 100) / 100,
    questionCount,
    operationsPerSecond: Math.round(1000 / avgTime),
  }
}

function verifyConsistency(): ConsistencyMetrics {
  const answers = generateRandomAnswers(75)
  const questionDimensions = Object.fromEntries(
    STANDARDIZED_QUESTIONS.map(q => [q.id, q.dimension])
  )

  const iterations = 20
  const results: number[] = []
  const topMatches: string[] = []

  for (let i = 0; i < iterations; i++) {
    const result = generateModeAwareIdeologySpectrum(answers, questionDimensions, 'professional')
    const avgSimilarity = result.ideologyMatches.reduce((sum, m) => sum + m.similarityScore, 0) / result.ideologyMatches.length
    results.push(avgSimilarity)
    topMatches.push(result.ideologyMatches[0].ideologyId)
  }

  const mean = results.reduce((a, b) => a + b, 0) / results.length
  const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length
  const standardDeviation = Math.sqrt(variance)

  const uniqueTopMatches = new Set(topMatches).size
  const topMatchStability = 1 - (uniqueTopMatches - 1) / iterations

  return {
    variance: Math.round(variance * 100000) / 100000,
    isConsistent: variance < 0.0001,
    iterations,
    standardDeviation: Math.round(standardDeviation * 100000) / 100000,
    topMatchStability: Math.round(topMatchStability * 100) / 100,
  }
}

function compareModes() {
  const answers = generateRandomAnswers(75)
  const questionDimensions = Object.fromEntries(
    STANDARDIZED_QUESTIONS.map(q => [q.id, q.dimension])
  )

  const modes: AssessmentMode[] = ['normal', 'advanced', 'professional']

  return modes.map((mode) => {
    const result = generateModeAwareIdeologySpectrum(answers, questionDimensions, mode)
    return {
      mode,
      topIdeology: result.ideologyMatches[0].ideologyName,
      avgSimilarity: Math.round(result.ideologyMatches[0].similarityScore * 10000) / 10000,
    }
  })
}

function benchmarkAlgorithms() {
  const {
    calculateWeightedCosineSimilarity,
    calculateEnsembleSimilarity,
  } = require('./ideology-weighted-calculator')

  const vecA = Array.from({ length: 5 }, () => Math.random() * 100)
  const vecB = Array.from({ length: 5 }, () => Math.random() * 100)

  function cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0
    let normA = 0
    let normB = 0
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i]
      normA += a[i] * a[i]
      normB += b[i] * b[i]
    }
    const denominator = Math.sqrt(normA) * Math.sqrt(normB)
    return denominator === 0 ? 0 : dotProduct / denominator
  }

  const iterations = 10000

  const startCosine = performance.now()
  for (let i = 0; i < iterations; i++) {
    cosineSimilarity(vecA, vecB)
  }
  const cosineTime = performance.now() - startCosine

  const startWeighted = performance.now()
  for (let i = 0; i < iterations; i++) {
    calculateWeightedCosineSimilarity(vecA, vecB)
  }
  const weightedTime = performance.now() - startWeighted

  const startEnsemble = performance.now()
  for (let i = 0; i < iterations; i++) {
    calculateEnsembleSimilarity(vecA, vecB)
  }
  const ensembleTime = performance.now() - startEnsemble

  return {
    cosine: Math.round((iterations / cosineTime) * 100) / 100,
    weightedCosine: Math.round((iterations / weightedTime) * 100) / 100,
    ensemble: Math.round((iterations / ensembleTime) * 100) / 100,
  }
}

export function validatePerformanceAndConsistency(): ValidationResult {
  return {
    performance: [
      measurePerformance('normal', 50),
      measurePerformance('advanced', 30),
      measurePerformance('professional', 20),
    ],
    consistency: verifyConsistency(),
    crossModeComparison: compareModes(),
    algorithmBenchmark: benchmarkAlgorithms(),
  }
}

export function printPerformanceReport(result: ValidationResult) {
  console.log('\n' + '='.repeat(60))
  console.log('🚀 性能与算法一致性验证报告')
  console.log('='.repeat(60))

  console.log('\n📊 各模式性能指标:')
  result.performance.forEach((perf) => {
    const config = MODE_CONFIGURATIONS[perf.mode]
    console.log(`\n  ${config.icon} ${config.displayName}:`)
    console.log(`     题目数量: ${perf.questionCount} 题`)
    console.log(`     平均执行时间: ${perf.executionTime} ms`)
    console.log(`     每秒操作数: ${perf.operationsPerSecond} ops/s`)
    console.log(`     内存使用: ${perf.memoryUsage} MB`)
  })

  console.log('\n🔬 算法一致性验证:')
  console.log(`     方差: ${result.consistency.variance}`)
  console.log(`     标准差: ${result.consistency.standardDeviation}`)
  console.log(`     顶部匹配稳定性: ${result.consistency.topMatchStability * 100}%`)
  console.log(`     一致性状态: ${result.consistency.isConsistent ? '✅ 通过' : '⚠️ 需优化'}`)

  console.log('\n🔄 跨模式结果对比:')
  result.crossModeComparison.forEach((cmp) => {
    const config = MODE_CONFIGURATIONS[cmp.mode]
    console.log(`     ${config.icon} ${config.displayName}: ${cmp.topIdeology} (相似度: ${cmp.avgSimilarity})`)
  })

  console.log('\n⚡ 算法效率基准 (k ops/s):')
  console.log(`     Cosine:          ${result.algorithmBenchmark.cosine} k ops/s`)
  console.log(`     Weighted Cosine: ${result.algorithmBenchmark.weightedCosine} k ops/s`)
  console.log(`     Ensemble:        ${result.algorithmBenchmark.ensemble} k ops/s`)

  const allPerformant = result.performance.every(p => p.executionTime < 50)
  const efficiencyRatio = result.algorithmBenchmark.ensemble / result.algorithmBenchmark.cosine

  console.log('\n' + '-'.repeat(60))
  console.log('📋 总结:')
  console.log(`     性能达标: ${allPerformant ? '✅ 全部通过' : '⚠️ 部分模式超时'}`)
  console.log(`     专业模式效率比: ${Math.round(efficiencyRatio * 100)}%`)
  console.log(`     整体评级: ${allPerformant && result.consistency.isConsistent ? '🌟 优秀' : allPerformant ? '👍 良好' : '🔧 需改进'}`)
  console.log('='.repeat(60) + '\n')
}

export interface AuditValidationResult {
  auditLogId: string
  verificationHash: string
  hashValid: boolean
  questionCount: number
  dimensionCount: number
  ideologyCount: number
  allQuestionsLogged: boolean
  allDimensionsLogged: boolean
  allIdeologiesLogged: boolean
  completeTraceability: boolean
}

export function validateAuditLogging(): AuditValidationResult {
  const questions = createQuestionSet('normal')
  const answers: Record<string, number> = {}
  questions.forEach((q, i) => {
    answers[q.id] = (i % 5) + 1
  })

  const questionDimensions = Object.fromEntries(questions.map(q => [q.id, q.dimension]))
  const result = generateModeAwareIdeologySpectrum(answers, questionDimensions, 'normal')
  const auditLog = result.auditLog!

  const hashValid = auditLogger.verifyCalculation(result.auditLogId)
  const allQuestionsLogged = questions.every(q => 
    auditLog.questionAnswers.some(a => a.questionId === q.id)
  )
  const allDimensionsLogged = ['economic', 'social', 'cultural', 'international', 'ecological']
    .every(dim => auditLog.dimensionCalculations.some(d => d.dimensionId === dim))
  const allIdeologiesLogged = auditLog.ideologySimilarities.length >= 30

  const completeTraceability = hashValid
    && allQuestionsLogged
    && allDimensionsLogged
    && allIdeologiesLogged
    && auditLog.questionAnswers.length === Object.keys(answers).length

  return {
    auditLogId: result.auditLogId,
    verificationHash: auditLog.verificationHash,
    hashValid,
    questionCount: auditLog.questionAnswers.length,
    dimensionCount: auditLog.dimensionCalculations.length,
    ideologyCount: auditLog.ideologySimilarities.length,
    allQuestionsLogged,
    allDimensionsLogged,
    allIdeologiesLogged,
    completeTraceability,
  }
}

export function printAuditValidationReport(result: AuditValidationResult) {
  console.log('\n' + '╔' + '═'.repeat(78) + '╗')
  console.log('║' + ' '.repeat(22) + '🔍 计算溯源审计验证报告' + ' '.repeat(22) + '║')
  console.log('╠' + '═'.repeat(78) + '╣')
  console.log(`║  计算ID:     ${result.auditLogId.padEnd(61)}║`)
  console.log(`║  验证哈希:   ${result.verificationHash.padEnd(61)}║`)
  console.log(`║  哈希验证:   ${result.hashValid ? '✅ 通过' : '❌ 失败'.padEnd(55)}║`)
  console.log('╠' + '─'.repeat(78) + '╣')
  console.log(`║  📝 题目答案记录: ${String(result.questionCount).padStart(3)} / 60  ${result.allQuestionsLogged ? '✅' : '❌'.padStart(45)}║`)
  console.log(`║  📊 维度计算记录: ${String(result.dimensionCount).padStart(3)} / 5   ${result.allDimensionsLogged ? '✅' : '❌'.padStart(45)}║`)
  console.log(`║  🎯 意识形态计算: ${String(result.ideologyCount).padStart(3)} / 30+ ${result.allIdeologiesLogged ? '✅' : '❌'.padStart(44)}║`)
  console.log('╠' + '─'.repeat(78) + '╣')
  console.log(`║  完整溯源性: ${(result.completeTraceability ? '✅ 所有计算步骤均可溯源验证' : '❌ 溯源链存在断点').padEnd(66)}║`)
  console.log('╚' + '═'.repeat(78) + '╝\n')

  if (result.completeTraceability) {
    console.log('\n🎉 所有计算步骤已完全记录并通过验证哈希校验！')
    console.log('   每道题目、每个维度、每个意识形态的相似度计算均可追溯、可审计。\n')
  }
}

export function printFullAuditReport(calculationId?: string) {
  if (calculationId) {
    auditLogger.printAuditReport(calculationId)
  } else {
    const allLogs = auditLogger.getAllLogs()
    if (allLogs.length > 0) {
      auditLogger.printAuditReport(allLogs[allLogs.length - 1].calculationId)
    } else {
      console.log('没有找到审计日志记录')
    }
  }
}

if (typeof window !== 'undefined') {
  (window as any).PerformanceValidation = {
    validatePerformanceAndConsistency,
    printPerformanceReport,
    validateAuditLogging,
    printAuditValidationReport,
    printFullAuditReport,
    auditLogger,
  }
}
