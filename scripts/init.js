#!/usr/bin/env node

/**
 * HumanOS 项目初始化脚本
 * 用于快速初始化和定制项目
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

// 项目类型配置
const projectTypes = {
  graduation: {
    name: '毕业设计版',
    description: '适合本科/研究生毕业设计项目',
    features: ['完整文档', '学术论文支持', '答辩材料', '测试报告'],
  },
  enterprise: {
    name: '企业应用版',
    description: '适合企业内部测评和人才管理',
    features: ['多租户支持', '数据分析', 'API文档', '部署指南'],
  },
  personal: {
    name: '个人项目版',
    description: '适合个人学习和快速原型开发',
    features: ['快速启动', '简化配置', '学习文档', '示例代码'],
  },
}

// 主题配置
const themes = {
  default: { name: '默认主题', primaryColor: '#3b82f6', backgroundColor: '#0f172a' },
  light: { name: '明亮主题', primaryColor: '#3b82f6', backgroundColor: '#ffffff' },
  dark: { name: '暗黑主题', primaryColor: '#8b5cf6', backgroundColor: '#0a0a0a' },
}

// 数据库配置
const databaseTypes = {
  local: '本地存储 (localStorage)',
  firebase: 'Firebase',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
}

async function init() {
  log('\n🚀 欢迎使用 HumanOS 项目模板初始化工具！\n', 'cyan')
  log('=' .repeat(60), 'blue')

  // 1. 收集项目基本信息
  log('\n📝 项目基本信息\n', 'bright')
  const projectName = await question(`项目名称 [humanos-app]: `) || 'humanos-app'
  const projectDescription = await question(`项目描述 [心理测评平台]: `) || '心理测评平台'
  const authorName = await question(`作者姓名: `) || 'Your Name'
  const authorEmail = await question(`作者邮箱: `) || 'your.email@example.com'

  // 2. 选择项目类型
  log('\n🎯 选择项目类型\n', 'bright')
  const typeKeys = Object.keys(projectTypes)
  typeKeys.forEach((key, index) => {
    const type = projectTypes[key]
    log(`  ${index + 1}. ${type.name} - ${type.description}`, 'cyan')
    log(`     特性: ${type.features.join(', ')}`, 'reset')
  })

  const typeChoice = await question(`\n请选择项目类型 [1-${typeKeys.length}]: `)
  const projectType = typeKeys[parseInt(typeChoice) - 1] || 'personal'

  // 3. 选择主题
  log('\n🎨 选择主题风格\n', 'bright')
  const themeKeys = Object.keys(themes)
  themeKeys.forEach((key, index) => {
    const theme = themes[key]
    log(`  ${index + 1}. ${theme.name}`, 'cyan')
  })

  const themeChoice = await question(`\n请选择主题 [1-${themeKeys.length}]: `)
  const selectedTheme = themeKeys[parseInt(themeChoice) - 1] || 'default'

  // 4. 选择数据库类型
  log('\n💾 选择数据存储方式\n', 'bright')
  const dbKeys = Object.keys(databaseTypes)
  dbKeys.forEach((key, index) => {
    log(`  ${index + 1}. ${databaseTypes[key]}`, 'cyan')
  })

  const dbChoice = await question(`\n请选择数据库 [1-${dbKeys.length}]: `)
  const databaseType = dbKeys[parseInt(dbChoice) - 1] || 'local'

  // 5. 选择功能模块
  log('\n⚙️  选择功能模块\n', 'bright')
  const modules = {
    assessments: { name: '心理测评模块', default: true },
    userSystem: { name: '用户系统', default: true },
    dataVisualization: { name: '数据可视化', default: true },
    animations: { name: '动画效果', default: true },
    threeD: { name: '3D效果', default: false },
  }

  const selectedModules = {}
  for (const [key, module] of Object.entries(modules)) {
    const answer = await question(`  启用 ${module.name}? [Y/n]: `)
    selectedModules[key] = answer.toLowerCase() !== 'n'
  }

  // 6. 确认配置
  log('\n📋 配置确认\n', 'bright')
  log(`  项目名称: ${projectName}`, 'cyan')
  log(`  项目描述: ${projectDescription}`, 'cyan')
  log(`  作者: ${authorName} <${authorEmail}>`, 'cyan')
  log(`  项目类型: ${projectTypes[projectType].name}`, 'cyan')
  log(`  主题风格: ${themes[selectedTheme].name}`, 'cyan')
  log(`  数据存储: ${databaseTypes[databaseType]}`, 'cyan')
  log(`  功能模块:`, 'cyan')
  for (const [key, enabled] of Object.entries(selectedModules)) {
    log(`    - ${modules[key].name}: ${enabled ? '✓' : '✗'}`, enabled ? 'green' : 'red')
  }

  const confirm = await question(`\n确认生成项目? [Y/n]: `)
  if (confirm.toLowerCase() === 'n') {
    log('\n❌ 已取消项目初始化', 'red')
    rl.close()
    return
  }

  // 7. 生成配置文件
  log('\n🔨 正在生成项目...\n', 'bright')

  const config = {
    project: {
      name: projectName,
      description: projectDescription,
      author: { name: authorName, email: authorEmail },
      type: projectType,
    },
    theme: themes[selectedTheme],
    database: { type: databaseType },
    modules: selectedModules,
    createdAt: new Date().toISOString(),
  }

  // 写入配置文件
  fs.writeFileSync(
    path.join(process.cwd(), 'humanos.config.json'),
    JSON.stringify(config, null, 2)
  )

  // 更新 package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    packageJson.name = projectName
    packageJson.description = projectDescription
    packageJson.author = `${authorName} <${authorEmail}>`
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  }

  // 创建环境变量文件
  const envContent = `# 项目配置
VITE_APP_NAME=${projectName}
VITE_APP_DESCRIPTION=${projectDescription}
VITE_APP_AUTHOR=${authorName}
VITE_THEME=${selectedTheme}
VITE_DATABASE_TYPE=${databaseType}

# API配置 (如需要)
# VITE_API_BASE_URL=http://localhost:3000/api
# VITE_FIREBASE_API_KEY=your_api_key
# VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# VITE_FIREBASE_PROJECT_ID=your_project_id
`

  fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent)

  // 创建项目说明文件
  const readmeContent = `# ${projectName}

${projectDescription}

## 项目信息

- **项目类型**: ${projectTypes[projectType].name}
- **作者**: ${authorName}
- **创建时间**: ${new Date().toLocaleDateString('zh-CN')}

## 功能模块

${Object.entries(selectedModules)
  .filter(([_, enabled]) => enabled)
  .map(([key, _]) => `- ${modules[key].name}`)
  .join('\n')}

## 快速开始

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
\`\`\`

## 文档

- [项目架构](./ARCHITECTURE.md)
- [贡献指南](./CONTRIBUTING.md)
- [更新日志](./CHANGELOG.md)

## 许可证

MIT License

---

使用 HumanOS 模板生成 | [了解更多](https://github.com/badhope/HumanOS)
`

  fs.writeFileSync(path.join(process.cwd(), 'PROJECT.md'), readmeContent)

  // 完成
  log('\n✅ 项目初始化完成！\n', 'green')
  log('=' .repeat(60), 'blue')
  log('\n📚 下一步操作:\n', 'bright')
  log('  1. 查看 PROJECT.md 了解项目信息', 'cyan')
  log('  2. 查看 humanos.config.json 查看配置', 'cyan')
  log('  3. 运行 npm install 安装依赖', 'cyan')
  log('  4. 运行 npm run dev 启动开发服务器', 'cyan')
  log('  5. 根据项目类型查看对应文档:\n', 'cyan')

  if (projectType === 'graduation') {
    log('     - docs/thesis-template/ 论文模板', 'yellow')
    log('     - docs/defense-presentation/ 答辩材料', 'yellow')
    log('     - docs/test-report/ 测试报告', 'yellow')
  } else if (projectType === 'enterprise') {
    log('     - docs/api/ API文档', 'yellow')
    log('     - docs/deployment/ 部署指南', 'yellow')
  } else {
    log('     - docs/tutorial/ 学习教程', 'yellow')
    log('     - examples/ 示例代码', 'yellow')
  }

  log('\n🎉 祝你使用愉快！\n', 'green')

  rl.close()
}

// 运行初始化
init().catch(error => {
  log(`\n❌ 初始化失败: ${error.message}`, 'red')
  rl.close()
  process.exit(1)
})
