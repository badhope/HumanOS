#!/usr/bin/env node

/**
 * 验证所有测评类型是否都有描述
 */

import { standardCalculators } from '../src/utils/calculators'
import { assessmentDescriptions } from '../src/utils/assessmentDescriptions'

const calculatorIds = Object.keys(standardCalculators)
const describedIds = Object.keys(assessmentDescriptions)

console.log('='.repeat(80))
console.log('📊 测评描述完整性验证')
console.log('='.repeat(80))
console.log()

console.log(`计算器总数: ${calculatorIds.length}`)
console.log(`已有描述数: ${describedIds.length}`)
console.log()

// 找出缺失描述的计算器
const missingDescriptions = calculatorIds.filter(id => !describedIds.includes(id))

if (missingDescriptions.length > 0) {
  console.log(`❌ 缺失描述的计算器 (${missingDescriptions.length}个):`)
  missingDescriptions.forEach(id => {
    console.log(`  - ${id}`)
  })
} else {
  console.log('✅ 所有计算器都有描述！')
}

console.log()
console.log('='.repeat(80))
console.log('已描述的计算器列表:')
console.log('='.repeat(80))
describedIds.forEach((id, index) => {
  console.log(`${index + 1}. ${id}`)
})

console.log()
console.log(`✅ 完成！ ${describedIds.length}/${calculatorIds.length} 个计算器有描述`)
