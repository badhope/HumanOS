const fs = require('fs');
const path = require('path');

const assessmentsDir = path.join(__dirname, 'src', 'data', 'assessments');

// 获取所有 .ts 文件（排除 index.ts）
const files = fs.readdirSync(assessmentsDir).filter(file => 
  file.endsWith('.ts') && file !== 'index.ts'
);

console.log('=== 测评题目数量统计 ===\n');
console.log('文件名称'.padEnd(35), '题目数'.padEnd(8), 'ID');
console.log('-'.repeat(60));

const stats = {};

for (const file of files) {
  const filePath = path.join(assessmentsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 使用简单的方法统计题目数：看 questions 数组中的项目
  // 这里用正则匹配 questions: [ 然后到对应 ] 结束
  const questionsMatch = content.match(/questions:\s*\[([\s\S]*?)\](?=\s*(?:,|\n\s*(?:id|title|resultCalculator|category|subcategory|duration|difficulty|quality|icon|description)\s*:|$))/);
  
  if (questionsMatch) {
    const questionsContent = questionsMatch[1];
    // 统计 { id: '...', type: 'single' 这样的模式
    const questionCount = (questionsContent.match(/\{[\s]*?id:[\s]*?['"]/g) || []).length;
    
    // 尝试获取 id
    let idMatch = content.match(/id:\s*['"](.*?)['"]/);
    const id = idMatch ? idMatch[1] : 'unknown';
    
    stats[file] = { questionCount, id, fileName: file };
    console.log(file.padEnd(35), String(questionCount).padEnd(8), id);
  } else {
    console.log(file.padEnd(35), 'N/A'.padEnd(8), '-');
  }
}

console.log('\n=== 统计完成 ===\n');
console.log('总测评数:', files.length);
console.log('可用统计数:', Object.keys(stats).length);
