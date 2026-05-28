/**
 * 计算引擎验证测试
 * 测试所有计算器的功能并记录详细日志
 */

import { standardCalculators, StandardCalculatorId } from '../src/utils/calculators'
import { calculationLogger } from '../src/utils/calculators/calculation-logger'

interface Answer {
  questionId: string
  value: number
}

// 创建随机测试答案
function createRandomAnswers(count: number): Answer[] {
  return Array.from({ length: count }, (_, i) => ({
    questionId: `q${i + 1}`,
    value: Math.floor(Math.random() * 5) + 1
  }))
}

// 创建特定模式的答案（用于测试不同场景）
function createPatternedAnswers(count: number, pattern: 'all-high' | 'all-low' | 'mixed' | 'alternating'): Answer[] {
  const patterns = {
    'all-high': Array(count).fill(5),
    'all-low': Array(count).fill(1),
    'mixed': Array(count).fill(0).map(() => Math.floor(Math.random() * 5) + 1),
    'alternating': Array(count).fill(0).map((_, i) => i % 2 === 0 ? 5 : 1)
  }
  
  return Array.from({ length: count }, (_, i) => ({
    questionId: `q${i + 1}`,
    value: patterns[pattern][i]
  }))
}

// 测试单个计算器
function testCalculator(id: StandardCalculatorId, calculator: Function, testCases: Answer[][]): {
  success: boolean
  result: any
  errors: string[]
  testCaseResults: Array<{ input: string; output: any; score: number }>
} {
  const errors: string[] = []
  const testCaseResults: Array<{ input: string; output: any; score: number }> = []
  
  for (const testCase of testCases) {
    try {
      const result = calculator(testCase)
      
      if (!result) {
        errors.push(`Test case returned null/undefined`)
        continue
      }
      
      if (typeof result !== 'object') {
        errors.push(`Result is not an object: ${typeof result}`)
        continue
      }
      
      // 检查必要字段
      const hasScore = 'score' in result || 'totalScore' in result || 'finalScore' in result
      if (!hasScore) {
        errors.push(`Result missing score field`)
      }
      
      const score = result.score ?? result.totalScore ?? result.finalScore ?? 0
      testCaseResults.push({
        input: `${testCase.length} answers`,
        output: result,
        score
      })
      
    } catch (error) {
      errors.push(`Exception: ${(error as Error).message}`)
    }
  }
  
  return {
    success: errors.length === 0,
    result: testCaseResults[0]?.output || null,
    errors,
    testCaseResults
  }
}

// 完整的测试套件
async function runFullTestSuite(): Promise<void> {
  console.log('='.repeat(80))
  console.log('🧪 计算引擎完整验证测试')
  console.log(`⏰ 开始时间: ${new Date().toISOString()}`)
  console.log('='.repeat(80))
  console.log()
  
  // 加载之前的日志
  calculationLogger.loadFromLocalStorage()
  calculationLogger.clearLogs()
  
  const calculators = Object.entries(standardCalculators)
  const results: Array<{
    id: string
    status: 'pass' | 'fail' | 'warn'
    testResult: any
  }> = []
  
  console.log(`📊 测试 ${calculators.length} 个计算器...\n`)
  
  for (const [id, calculator] of calculators) {
    process.stdout.write(`测试 ${id}... `)
    
    const testCases = [
      createRandomAnswers(20),
      createPatternedAnswers(20, 'all-high'),
      createPatternedAnswers(20, 'all-low'),
      createPatternedAnswers(20, 'alternating')
    ]
    
    const testResult = testCalculator(id as StandardCalculatorId, calculator, testCases)
    
    if (testResult.success) {
      console.log(`✅ 通过 (${testResult.testCaseResults.length} 个测试用例)`)
      results.push({ id, status: 'pass', testResult })
      
      // 记录成功日志
      const firstResult = testResult.testCaseResults[0]
      if (firstResult) {
        calculationLogger.log({
          calculatorId: id,
          input: {
            answerCount: 20,
            questionIds: testCases[0].map(a => a.questionId),
            sampleAnswers: testCases[0].slice(0, 5).reduce((acc, a) => {
              acc[a.questionId] = a.value
              return acc
            }, {})
          },
          processing: {
            dimensionScores: {},
            reverseScoringApplied: false,
            normalizationApplied: true
          },
          output: {
            finalScore: firstResult.score,
            dimensionResults: {},
            summary: 'Test completed successfully'
          },
          metadata: {
            calculationTime: 0,
            version: '1.0.0',
            environment: 'test'
          }
        })
      }
    } else if (testResult.errors.length > 0 && testResult.errors.some(e => e.includes('Exception'))) {
      console.log(`❌ 失败`)
      console.log(`   错误: ${testResult.errors[0]}`)
      results.push({ id, status: 'fail', testResult })
    } else {
      console.log(`⚠️  警告`)
      results.push({ id, status: 'warn', testResult })
    }
  }
  
  // 保存日志
  calculationLogger.saveToLocalStorage()
  
  // 生成报告
  console.log()
  console.log('='.repeat(80))
  console.log('📋 测试报告')
  console.log('='.repeat(80))
  console.log()
  
  const passCount = results.filter(r => r.status === 'pass').length
  const failCount = results.filter(r => r.status === 'fail').length
  const warnCount = results.filter(r => r.status === 'warn').length
  
  console.log(`✅ 通过: ${passCount}`)
  console.log(`❌ 失败: ${failCount}`)
  console.log(`⚠️  警告: ${warnCount}`)
  console.log(`📊 总计: ${results.length}`)
  console.log()
  
  // 失败详情
  if (failCount > 0) {
    console.log('❌ 失败的计算器:')
    results.filter(r => r.status === 'fail').forEach(r => {
      console.log(`  - ${r.id}`)
      r.testResult.errors.forEach((e: string) => console.log(`    错误: ${e}`))
    })
    console.log()
  }
  
  // 警告详情
  if (warnCount > 0) {
    console.log('⚠️  警告的计算器:')
    results.filter(r => r.status === 'warn').forEach(r => {
      console.log(`  - ${r.id}`)
      r.testResult.errors.forEach((e: string) => console.log(`    原因: ${e}`))
    })
    console.log()
  }
  
  // 示例计算结果
  console.log('='.repeat(80))
  console.log('📊 示例计算结果（随机答案）')
  console.log('='.repeat(80))
  console.log()
  
  const sampleCalculator = calculators[0]
  if (sampleCalculator) {
    const [id, calculator] = sampleCalculator
    const sampleAnswers = createRandomAnswers(20)
    try {
      const result = calculator(sampleAnswers)
      console.log(`计算器: ${id}`)
      console.log(`输入: ${JSON.stringify(sampleAnswers.slice(0, 3), null, 2)}...`)
      console.log(`输出:`, JSON.stringify(result, null, 2))
      console.log()
    } catch (error) {
      console.log(`计算失败: ${(error as Error).message}`)
    }
  }
  
  // 保存详细报告
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      passed: passCount,
      failed: failCount,
      warnings: warnCount
    },
    results,
    logs: calculationLogger.getLogs()
  }
  
  const reportPath = `/workspace/test-reports/calculation-test-${Date.now()}.json`
  const fs = await import('fs')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  
  console.log('='.repeat(80))
  console.log('✅ 测试完成')
  console.log(`📄 详细报告已保存到: ${reportPath}`)
  console.log(`📝 日志已保存到 localStorage`)
  console.log('='.repeat(80))
}

// 运行测试
runFullTestSuite().catch(console.error)
