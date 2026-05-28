#!/usr/bin/env node

/**
 * 合并详细描述到主描述文件
 */

const fs = require('fs');
const path = require('path');

// 读取主描述文件
const mainFilePath = path.join(__dirname, '../src/utils/assessmentDescriptions.ts');
let mainContent = fs.readFileSync(mainFilePath, 'utf8');

// 读取完整描述文件
const completeFilePath = path.join(__dirname, '../src/utils/completeAssessmentDescriptions.ts');
const completeContent = fs.readFileSync(completeFilePath, 'utf8');

// 提取assessmentDescriptions对象的内容
const startMarker = 'export const assessmentDescriptions: AssessmentDescriptions = {';
const endMarker = '};\n\nexport function getDimensionDescriptionForAssessment';

const startIndex = mainContent.indexOf(startMarker);
const endIndex = mainContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('❌ 无法找到正确的插入位置');
  process.exit(1);
}

// 提取assessmentDescriptions对象之前的内容
const beforeObject = mainContent.substring(0, startIndex + startMarker.length);

// 提取assessmentDescriptions对象之后的内容
const afterObject = mainContent.substring(endIndex);

// 提取完整描述的内容
const completeStart = completeContent.indexOf('export const completeAssessmentDescriptions = {');
const completeEnd = completeContent.lastIndexOf('}');
const completeDescriptions = completeContent.substring(completeStart + 'export const completeAssessmentDescriptions = {'.length, completeEnd + 1);

// 合并内容
const mergedContent = `${beforeObject}
${completeDescriptions.trimEnd()}
${afterObject}`;

// 写回文件
fs.writeFileSync(mainFilePath, mergedContent);

console.log('✅ 详细描述合并完成！');
console.log('📊 现在所有测评都有完整的多维度描述了');
