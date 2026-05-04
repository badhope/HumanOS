// 使用 TypeScript 的方式直接导入模块来获取正确数据
import { standardAssessmentList } from './src/data/assessments/index.js';

console.log('=== 测评题目数量统计（从 actual code） ===\n');
console.log('ID'.padEnd(30), '题目数'.padEnd(10), '标题'.padEnd(35));
console.log('-'.repeat(80));

for (const assessment of standardAssessmentList) {
  const questionCount = assessment.questions?.length || 0;
  console.log(
    assessment.id.padEnd(30),
    String(questionCount).padEnd(10),
    assessment.title.padEnd(35)
  );
}

console.log('\n=== 统计完成 ===\n');
console.log('总测评数:', standardAssessmentList.length);
