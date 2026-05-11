import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'src/data/assessments');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

let totalQuestions = 0;
let totalAssessments = 0;
const results = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');

  // Extract name - try title first, then name
  let nameMatch = content.match(/^\s*title:\s*['"]([^'"]+)['"]/m);
  if (!nameMatch) {
    nameMatch = content.match(/^\s*name:\s*['"]([^'"]+)['"]/m);
  }
  const name = nameMatch ? nameMatch[1] : file.replace('.ts', '');

  // Count questions - look for all types that indicate question objects
  const questionTypes = [
    'likert', 'likert-4', 'likert-5', 'likert-7', 'choice', 'single', 'multiple', 
    'text', 'slider', 'ranking', 'matrix', 'drag'
  ];
  
  let count = 0;
  for (const type of questionTypes) {
    const matches = content.match(new RegExp(`type:\\s*['"]${type}['"]`, 'g'));
    if (matches) count += matches.length;
  }

  if (name && count > 0) {
    totalQuestions += count;
    totalAssessments++;
    results.push({ name, count });
  }
}

// Sort by name
results.sort((a, b) => a.name.localeCompare(b.name));

console.log('=== 心理测评题目数量表 ===\n');
console.log('| 序号 | 测评名称                              | 题目数 |');
console.log('|------|--------------------------------------|--------|');

results.forEach((item, index) => {
  const paddedName = item.name.padEnd(34);
  console.log(`| ${String(index + 1).padStart(3)} | ${paddedName} | ${String(item.count).padStart(5)} |`);
});

console.log('|------|--------------------------------------|--------|');
console.log(`|      | 总计 ${totalAssessments} 个测评                        | ${String(totalQuestions).padStart(5)} |`);
