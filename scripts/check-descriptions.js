#!/usr/bin/env node

import { assessmentDescriptions } from './src/utils/assessmentDescriptions.js';
import { standardCalculators } from './src/utils/calculators/index.js';

console.log('='.repeat(80));
console.log('📊 当前测评描述状态检查');
console.log('='.repeat(80));
console.log();

const calculatorIds = Object.keys(standardCalculators);
const describedIds = Object.keys(assessmentDescriptions);

console.log(`计算器总数: ${calculatorIds.length}`);
console.log(`已有描述数: ${describedIds.length}`);
console.log();

console.log('✅ 已有描述的测评:');
describedIds.forEach((id, i) => {
  const dimensions = Object.keys(assessmentDescriptions[id]);
  console.log(`  ${i + 1}. ${id} (${dimensions.length}个维度)`);
});
console.log();

console.log('❌ 缺失描述的测评:');
const missing = calculatorIds.filter(id => !describedIds.includes(id));
missing.forEach((id, i) => {
  console.log(`  ${i + 1}. ${id}`);
});
console.log();
console.log(`缺失: ${missing.length}个`);
