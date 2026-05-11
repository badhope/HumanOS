const fs = require('fs');
const path = require('path');

const dir = './src/data/assessments';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

let totalQuestions = 0;
let totalAssessments = 0;

console.log('=== 心理测评题目数量表 ===\n');
console.log('| 序号 | 测评名称                     | 题目数 |');
console.log('|------|-----------------------------|--------|');

files.forEach((file, index) => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');

  // Extract name
  const nameMatch = content.match(/^\s*name:\s*['"]([^'"]+)['"]/m);
  const name = nameMatch ? nameMatch[1] : file.replace('.ts', '');

  // Count questions by looking for text: patterns inside questions array
  const questionsMatch = content.match(/questions:\s*\[([\s\S]*?)\]\s*,?\s*$/m);
  let count = 0;

  if (questionsMatch) {
    // Count individual question objects by looking for distinct text fields
    const questionTexts = questionsMatch[1].match(/text:\s*['"][^'"]+['"]/g);
    count = questionTexts ? questionTexts.length : 0;
  }

  if (name && count > 0) {
    totalQuestions += count;
    totalAssessments++;
    const paddedName = name.padEnd(26);
    console.log(`| ${String(index + 1).padStart(3)} | ${paddedName} | ${String(count).padStart(4)}  |`);
  }
});

console.log('|------|-----------------------------|--------|');
console.log(`|      | 总计 ${totalAssessments} 个测评             | ${String(totalQuestions).padStart(4)}  |`);
console.log('\n注：部分测评可能使用动态题目生成，未计入总数。');
