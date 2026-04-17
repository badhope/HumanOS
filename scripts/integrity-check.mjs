#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(__dirname, '..', 'src')

console.log('🔍 HumanOS 完整性检查系统启动...\n')

let totalIssues = 0
const reports = []

function addReport(level, category, message) {
  reports.push({ level, category, message })
  if (level === 'error') totalIssues++
}

function colorize(level, text) {
  const colors = {
    error: '\x1b[31m',
    warning: '\x1b[33m',
    success: '\x1b[32m',
    info: '\x1b[36m',
    reset: '\x1b[0m'
  }
  return `${colors[level] || ''}${text}${colors.reset}`
}

const assessmentsDir = path.join(srcDir, 'data', 'assessments')
const assessmentFiles = fs.readdirSync(assessmentsDir)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts')
  .map(f => f.replace('.ts', ''))

const assessmentsIndexPath = path.join(srcDir, 'data', 'assessments.ts')
const assessmentsIndexContent = fs.readFileSync(assessmentsIndexPath, 'utf-8')
const registeredAssessments = assessmentsIndexContent
  .match(/import \{ (\w+) \} from '\.\/assessments\//g)
  ?.map(m => m.match(/import \{ (\w+) \}/)?.[1]) || []

addReport('info', '测评注册检查', `发现 ${assessmentFiles.length} 个测评数据文件`)
addReport('info', '测评注册检查', `已注册 ${registeredAssessments.length} 个测评`)

for (const file of assessmentFiles) {
  const filePath = path.join(assessmentsDir, file + '.ts')
  const content = fs.readFileSync(filePath, 'utf-8')
  const exportMatch = content.match(/export const (\w+): Assessment = \{/)
  
  if (exportMatch) {
    const exportName = exportMatch[1]
    if (!assessmentsIndexContent.includes(exportName)) {
      addReport('error', '测评注册检查', `测评未注册: ${exportName} (${file}.ts)`)
    }
  } else if (file !== 'index') {
    addReport('warning', '测评注册检查', `文件缺少标准导出: ${file}.ts`)
  }
}

const calculatorsDir = path.join(srcDir, 'utils', 'calculators')
const calculatorFiles = fs.readdirSync(calculatorsDir)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'calculator-utils.ts')

const calculatorsIndexPath = path.join(srcDir, 'utils', 'calculators', 'index.ts')
const calculatorsIndexContent = fs.readFileSync(calculatorsIndexPath, 'utf-8')
const registeredCalculators = calculatorsIndexContent
  .match(/import \{ (\w+) \} from '\.\//g)
  ?.map(m => m.match(/import \{ (\w+) \}/)?.[1]) || []

addReport('info', '计算器注册检查', `发现 ${calculatorFiles.length} 个计算器文件`)
addReport('info', '计算器注册检查', `已注册 ${Math.floor(registeredCalculators.length / 2)} 个计算器`)

for (const file of calculatorFiles) {
  const filePath = path.join(calculatorsDir, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  const funcMatch = content.match(/export function calculate(\w+)/)
  
  if (funcMatch) {
    const funcName = `calculate${funcMatch[1]}`
    if (!calculatorsIndexContent.includes(funcName)) {
      addReport('error', '计算器注册检查', `计算器函数未注册: ${funcName} (${file})`)
    }
  }
}

const pagesDir = path.join(srcDir, 'pages')
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'))

const appPath = path.join(srcDir, 'App.tsx')
const appContent = fs.readFileSync(appPath, 'utf-8')

addReport('info', '路由注册检查', `发现 ${pageFiles.length} 个页面文件`)

for (const file of pageFiles) {
  const pageName = file.replace('.tsx', '')
  if (!appContent.includes(pageName) && 
      !['NotFound', 'Loading'].includes(pageName) &&
      !pageName.includes('ModeSelect')) {
    addReport('warning', '路由注册检查', `页面可能缺少路由: ${file}`)
  }
}

const professionalDir = path.join(srcDir, 'data', 'professional')
const professionalFiles = fs.readdirSync(professionalDir, { recursive: true })
  .filter(f => f.toString().endsWith('.ts'))

addReport('info', '专业版检查', `发现 ${professionalFiles.length} 个专业版测评文件`)

const simulationDir = path.join(srcDir, 'data', 'simulations')
const simDirs = fs.readdirSync(simulationDir)

addReport('info', '模拟系统检查', `发现 ${simDirs.length} 个模拟系统模块`)
for (const dir of ['xianxia', 'market-economy']) {
  if (simDirs.includes(dir)) {
    addReport('success', '模拟系统检查', `✓ ${dir} 模块已加载`)
  }
}

console.log('\n📋 检查报告汇总:\n')

for (const report of reports) {
  const prefix = report.level === 'error' ? '❌' : report.level === 'warning' ? '⚠️' : report.level === 'success' ? '✓' : 'ℹ️'
  console.log(`  ${prefix} ${colorize(report.level, report.category.padEnd(15))} ${report.message}`)
}

console.log('\n' + '='.repeat(60))
if (totalIssues > 0) {
  console.log(colorize('error', `❌ 发现 ${totalIssues} 个严重问题需要修复`))
  process.exit(1)
} else {
  console.log(colorize('success', '✅ 所有核心完整性检查通过'))
  process.exit(0)
}
