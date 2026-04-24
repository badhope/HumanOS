type StandardAssessmentId = string
import { loadAssessment, getCacheStats } from './dynamicAssessmentLoader'
import { assessmentCache, calculationCache } from './assessmentCache'
import { indexedDBCache } from './indexedDBCache'

interface BenchmarkResult {
  id: string
  loadTime: number
  parseTime: number
  questionCount: number
  cacheHit: boolean
}

export async function benchmarkAssessmentLoading(
  ids: StandardAssessmentId[] = []
): Promise<{
  results: BenchmarkResult[]
  summary: {
    totalTime: number
    avgTime: number
    totalQuestions: number
    cacheHitRate: string
  }
}> {
  if (ids.length === 0) {
    const mod = await import('../data/assessments' as any)
    ids = mod.standardAssessmentList.map((a: any) => a.id)
  }

  console.log('\n' + '='.repeat(60))
  console.log('🚀 题库加载性能基准测试')
  console.log('='.repeat(60))

  const results: BenchmarkResult[] = []

  for (const id of ids) {
    const cacheHit = assessmentCache.has(id)
    
    const start = performance.now()
    const assessment = await loadAssessment(id)
    const loadEnd = performance.now()

    const questionCount = assessment?.questions?.length || 0

    results.push({
      id,
      loadTime: loadEnd - start,
      parseTime: 0,
      questionCount,
      cacheHit,
    })

    const hitMarker = cacheHit ? '💾 缓存命中' : '📥 动态加载'
    console.log(`  ${id.padEnd(25)}: ${(loadEnd - start).toFixed(1).padStart(6)}ms (${questionCount}题) ${hitMarker}`)
  }

  const totalTime = results.reduce((s, r) => s + r.loadTime, 0)
  const totalQuestions = results.reduce((s, r) => s + r.questionCount, 0)
  const cacheHits = results.filter(r => r.cacheHit).length

  console.log('\n' + '-'.repeat(60))
  console.log(`📊 总结:`)
  console.log(`  总加载时间: ${totalTime.toFixed(1)}ms`)
  console.log(`  平均加载: ${(totalTime / ids.length).toFixed(1)}ms`)
  console.log(`  总题目数: ${totalQuestions}`)
  console.log(`  缓存命中率: ${(cacheHits / ids.length * 100).toFixed(0)}%`)
  console.log(`  缓存状态:`, getCacheStats())
  console.log('='.repeat(60) + '\n')

  return {
    results,
    summary: {
      totalTime,
      avgTime: totalTime / ids.length,
      totalQuestions,
      cacheHitRate: `${(cacheHits / ids.length * 100).toFixed(1)}%`,
    },
  }
}

export async function simulateLargeQuestionBank(
  questionCount: number = 10000
): Promise<void> {
  console.log(`\n🧪 模拟大型题库压力测试 (${questionCount} 题)`)
  
  const answers: Record<string, number> = {}
  for (let i = 1; i <= questionCount; i++) {
    answers[String(i)] = Math.floor(Math.random() * 5) + 1
  }

  const start = performance.now()
  
  const hash = JSON.stringify(answers)
  calculationCache.set(hash, { simulated: true })
  
  const end = performance.now()

  console.log(`  ${questionCount} 题答案哈希计算与缓存: ${(end - start).toFixed(1)}ms`)
  console.log(`  内存使用: ${(JSON.stringify(answers).length / 1024).toFixed(1)} KB\n`)
}

export async function runFullBenchmark(): Promise<void> {
  console.clear()
  
  await benchmarkAssessmentLoading()
  
  await simulateLargeQuestionBank(1000)
  await simulateLargeQuestionBank(10000)
  await simulateLargeQuestionBank(100000)

  console.log('💾 IndexedDB 支持:', indexedDBCache.support())
  console.log('📦 IndexedDB 状态:', await indexedDBCache.getStats())
}

if (import.meta.env.DEV) {
  const w = window as any
  w.benchmark = {
    runFullBenchmark,
    benchmarkAssessmentLoading,
    simulateLargeQuestionBank,
    assessmentCache,
    calculationCache,
    indexedDBCache,
  }
}
