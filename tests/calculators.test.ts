import { standardCalculators, StandardCalculatorId } from '../src/utils/calculators'

type Answer = {
  questionId: string
  value: number
}

// 创建测试用的答案数组
function createTestAnswers(count: number): Answer[] {
  return Array.from({ length: count }, (_, i) => ({
    questionId: `q${i + 1}`,
    value: Math.floor(Math.random() * 5) + 1,
  }))
}

// 计算结果验证器
function validateCalculator(id: StandardCalculatorId, calculator: Function): boolean {
  try {
    const answers = createTestAnswers(20)
    const result = calculator(answers)
    
    // 验证返回结果的基本结构
    const isValid = 
      result !== null && 
      result !== undefined && 
      typeof result === 'object'
    
    if (isValid) {
      console.log(`✅ ${id} - 计算正常`)
    } else {
      console.log(`❌ ${id} - 返回无效结果`)
    }
    
    return isValid
  } catch (error) {
    console.log(`❌ ${id} - 计算错误:`, (error as Error).message)
    return false
  }
}

console.log('🧪 开始计算器测试\n')

// 测试所有计算器
const results = Object.entries(standardCalculators).map(([id, calc]) => 
  validateCalculator(id as StandardCalculatorId, calc)
)

const passed = results.filter(Boolean).length
const total = results.length

console.log('\n' + '='.repeat(50))
console.log(`📊 测试结果: ${passed}/${total} 通过`)

if (passed === total) {
  console.log('🎉 所有计算器测试通过！')
} else {
  console.log(`⚠️  ${total - passed} 个计算器需要检查`)
  process.exit(1)
}

export {}
