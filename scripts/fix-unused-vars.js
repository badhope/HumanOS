import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 修复规则
const fixRules = [
  {
    file: path.join(__dirname, '../src/components/DiscoverCard.tsx'),
    find: /const CategoryCard = memo\(function CategoryCard\(\{ name, icon: Icon, color, bgGradient, borderColor, subcategories \}/,
    replace: 'const CategoryCard = memo(function CategoryCard({ name, icon: Icon, bgGradient, borderColor, subcategories }: CategoryCardProps) {'
  },
  {
    file: path.join(__dirname, '../src/components/ParticleBackground.tsx'),
    find: /import \{ useEffect, useMemo, useRef, type FC, type Connection \}/,
    replace: 'import { useEffect, useMemo, useRef, type FC }'
  }
];

console.log('🔧 开始批量修复未使用的导入...\n');

for (let i = 0; i < fixRules.length; i++) {
  const rule = fixRules[i];
  try {
    if (fs.existsSync(rule.file)) {
      let content = fs.readFileSync(rule.file, 'utf8');
      
      const match = content.match(rule.find);
      if (match) {
        content = content.replace(rule.find, rule.replace);
        fs.writeFileSync(rule.file, content);
        console.log(`✅ 修复 ${i + 1}: ${path.basename(rule.file)}`);
      }
    }
  } catch (error) {
    console.log(`❌ 修复失败 ${i + 1}: ${rule.file}`, error.message);
  }
}

console.log('\n✅ 批量修复完成！');
