import { standardCalculators } from './src/utils/calculators'

console.log('🧪 开始测试所有计算器...\n')
console.log(`📊 共发现 ${Object.keys(standardCalculators).length} 个计算器\n`)

const testResults: Array<{ id: string; status: 'success' | 'error'; error?: string }> = []

// 创建模拟答案
const createMockAnswers = (count: number): Array<{ questionId: string; value: number }> => {
  return Array.from({ length: count }, (_, i) => ({
    questionId: `q${i + 1}`,
    value: Math.floor(Math.random() * 5) + 1
  }))
}

// 测试每个计算器
Object.entries(standardCalculators).forEach(([id, calculate]) => {
  try {
    console.log(`🔍 测试计算器: ${id}`)
    const mockAnswers = createMockAnswers(20)
    const result = calculate(mockAnswers)
    
    if (result) {
      console.log(`   ✅ 成功计算结果`)
      testResults.push({ id, status: 'success' })
    } else {
      console.log(`   ⚠️  返回值为空`)
      testResults.push({ id, status: 'error', error: '返回值为空' })
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.log(`   ❌ 错误: ${errorMsg}`)
    testResults.push({ id, status: 'error', error: errorMsg })
  }
})

// 输出总结
console.log('\n' + '='.repeat(60))
console.log('📋 测试总结')
console.log('='.repeat(60))

const successCount = testResults.filter(r => r.status === 'success').length
const errorCount = testResults.filter(r => r.status === 'error').length

console.log(`✅ 成功: ${successCount}`)
console.log(`❌ 错误: ${errorCount}`)
console.log(`📊 总计: ${testResults.length}`)

if (errorCount > 0) {
  console.log('\n' + '❌ 错误详情:')
  testResults
    .filter(r => r.status === 'error')
    .forEach(r => {
      console.log(`  - ${r.id}: ${r.error}`)
    })
}

console.log('\n' + '✅ 测试完成！')
