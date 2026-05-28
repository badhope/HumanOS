const fs = require('fs');

// 读取两个文件
const baseFile = fs.readFileSync('/workspace/src/utils/assessmentDescriptions.ts', 'utf8');
const additionalFile = fs.readFileSync('/workspace/src/utils/additionalAssessmentDescriptions.ts', 'utf8');

// 提取assessmentDescriptions对象的结束位置
const endMatch = baseFile.match(/^};/m);
if (!endMatch) {
  console.error('❌ 无法找到assessmentDescriptions对象的结束位置');
  process.exit(1);
}

const endIndex = baseFile.indexOf('};\n\nexport function');

// 提取assessmentDescriptions对象内容
const baseContent = baseFile.substring(baseFile.indexOf('export const assessmentDescriptions: AssessmentDescriptions = {'), endIndex);

// 提取additionalAssessmentDescriptions对象内容
const additionalStart = additionalFile.indexOf('export const additionalAssessmentDescriptions = {');
const additionalEnd = additionalFile.lastIndexOf('}');
const additionalContent = additionalFile.substring(additionalStart, additionalEnd + 1);

// 合并内容
const mergedContent = `export const assessmentDescriptions: AssessmentDescriptions = {
${baseContent.substring(baseContent.indexOf('{') + 1, baseContent.length - 1).trim()}
${additionalContent.replace('export const additionalAssessmentDescriptions = {', '').replace(/^}$/m, '').trim()}
};`;

// 保留原始文件的接口定义和函数部分
const beforeObject = baseFile.substring(0, baseFile.indexOf('export const assessmentDescriptions: AssessmentDescriptions = {'));
const afterObject = baseFile.substring(endIndex);

// 生成合并后的文件
const mergedFile = beforeObject + mergedContent + '\n\n' + afterObject.replace(/^\nexport function getDimensionDescriptionForAssessment.*$/s, '\nexport function getDimensionDescriptionForAssessment(\n  assessmentId: string,\n  dimension: string,\n  score: number\n): {\n  name: string;\n  title: string;\n  description: string;\n  tags: string[];\n  suggestions: string[];\n} {\n  const assessmentDesc = assessmentDescriptions[assessmentId];\n  if (!assessmentDesc) {\n    return getGenericDescription(dimension, score);\n  }\n\n  const dimensionDesc = assessmentDesc[dimension];\n  if (!dimensionDesc) {\n    return getGenericDescription(dimension, score);\n  }\n\n  if (score >= 60) {\n    return {\n      name: dimensionDesc.name,\n      title: dimensionDesc.high.title,\n      description: dimensionDesc.high.description,\n      tags: dimensionDesc.high.tags,\n      suggestions: dimensionDesc.high.suggestions\n    };\n  } else if (score >= 40) {\n    return {\n      name: dimensionDesc.name,\n      title: dimensionDesc.medium.title,\n      description: dimensionDesc.medium.description,\n      tags: dimensionDesc.medium.tags,\n      suggestions: dimensionDesc.medium.suggestions\n    };\n  } else {\n    return {\n      name: dimensionDesc.name,\n      title: dimensionDesc.low.title,\n      description: dimensionDesc.low.description,\n      tags: dimensionDesc.low.tags,\n      suggestions: dimensionDesc.low.suggestions\n    };\n  }\n}\n\nexport function getGenericDescription(\n  dimension: string,\n  score: number\n): {\n  name: string;\n  title: string;\n  description: string;\n  tags: string[];\n  suggestions: string[];\n} {\n  const genericDescriptions: Record<string, any> = {\n    general: {\n      name: dimension,\n      high: {\n        title: \'高分\' + dimension,\n        description: \'您在这个维度表现突出，反映出较强的相关特质。\',\n        tags: [\'表现优秀\', \'高分特质\'],\n        suggestions: [\'继续保持发挥优势\']\n      },\n      medium: {\n        title: \'中等\' + dimension,\n        description: \'您在这个维度表现中等，有进一步发展的空间。\',\n        tags: [\'表现中等\', \'有潜力\'],\n        suggestions: [\'继续练习提升\']\n      },\n      low: {\n        title: \'低分\' + dimension,\n        description: \'您在这个维度表现较低，但这并不代表您的全部。\',\n        tags: [\'表现较低\', \'可发展\'],\n        suggestions: [\'针对性培养\']\n      }\n    }\n  };\n\n  const desc = genericDescriptions[dimension] || genericDescriptions.general;\n\n  if (score >= 60) {\n    return {\n      name: desc.name,\n      title: desc.high.title,\n      description: desc.high.description,\n      tags: desc.high.tags,\n      suggestions: desc.high.suggestions\n    };\n  } else if (score >= 40) {\n    return {\n      name: desc.name,\n      title: desc.medium.title,\n      description: desc.medium.description,\n      tags: desc.medium.tags,\n      suggestions: desc.medium.suggestions\n    };\n  } else {\n    return {\n      name: desc.name,\n      title: desc.low.title,\n      description: desc.low.description,\n      tags: desc.low.tags,\n      suggestions: desc.low.suggestions\n    };\n  }\n}\n');

fs.writeFileSync('/workspace/src/utils/assessmentDescriptions.ts', mergedFile);

console.log('✅ 合并完成！');
