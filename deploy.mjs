#!/usr/bin/env node
process.stdout.isTTY && process.stdout.setEncoding('utf8')
process.stderr.isTTY && process.stderr.setEncoding('utf8')
import { execSync } from 'child_process'
import fs from 'fs'

const PLATFORMS = {
  vercel: {
    name: 'Vercel',
    emoji: '▲',
    url: 'https://vercel.com',
  },
  netlify: {
    name: 'Netlify',
    emoji: '◈',
    url: 'https://netlify.com',
  },
  cloudflare: {
    name: 'Cloudflare Pages',
    emoji: '⚡',
    url: 'https://pages.cloudflare.com',
  },
  surge: {
    name: 'Surge.sh',
    emoji: '🌊',
    url: 'https://surge.sh',
  },
  github: {
    name: 'GitHub Pages',
    emoji: '🐙',
    url: 'https://pages.github.com',
  },
}

console.log('\n🚀 HumanOS 多平台自动分发系统')
console.log('='.repeat(50))

function runCommand(cmd, description) {
  console.log(`\n  ⏳ ${description}...`)
  try {
    execSync(cmd, { stdio: 'inherit' })
    console.log(`  ✅ ${description} 完成`)
    return true
  } catch (e) {
    console.log(`  ❌ ${description} 失败: ${e.message}`)
    return false
  }
}

async function main() {
  const target = process.argv[2] || 'all'
  
  console.log(`\n📋 分发目标: ${target === 'all' ? '全部平台' : target.toUpperCase()}`)
  console.log(`\n🔨 第一步: 构建生产版本...`)
  
  if (!runCommand('npm run build', '生产环境构建')) {
    console.log('\n❌ 构建失败，终止部署')
    process.exit(1)
  }

  if (!fs.existsSync('dist')) {
    console.log('\n❌ 构建产物不存在')
    process.exit(1)
  }

  console.log(`\n📦 构建产物大小: ${Math.round(fs.statSync('dist/index.html').size / 1024)} KB`)
  
  const results = {}

  if (target === 'all' || target === 'vercel') {
    console.log(`\n${PLATFORMS.vercel.emoji} ===== 部署到 ${PLATFORMS.vercel.name} =====`)
    results.vercel = runCommand('vercel --prod', 'Vercel 部署')
  }

  if (target === 'all' || target === 'netlify') {
    console.log(`\n${PLATFORMS.netlify.emoji} ===== 部署到 ${PLATFORMS.netlify.name} =====`)
    results.netlify = runCommand('netlify deploy --prod --dir=dist', 'Netlify 部署')
  }

  if (target === 'all' || target === 'cloudflare') {
    console.log(`\n${PLATFORMS.cloudflare.emoji} ===== 部署到 ${PLATFORMS.cloudflare.name} =====`)
    results.cloudflare = runCommand('wrangler pages deploy dist --project-name=humanos', 'Cloudflare Pages 部署')
  }

  if (target === 'all' || target === 'surge') {
    console.log(`\n${PLATFORMS.surge.emoji} ===== 部署到 ${PLATFORMS.surge.name} =====`)
    results.surge = runCommand('surge dist humanos-demo.surge.sh', 'Surge.sh 部署')
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 分发结果汇总')
  console.log('='.repeat(50))
  
  Object.entries(results).forEach(([platform, success]) => {
    const p = PLATFORMS[platform]
    console.log(`${p.emoji} ${p.name}: ${success ? '✅ 成功' : '❌ 失败'}`)
  })

  const successCount = Object.values(results).filter(Boolean).length
  const totalCount = Object.keys(results).length
  
  console.log(`\n🎉 总计: ${successCount}/${totalCount} 平台分发成功!`)
  
  if (successCount > 0) {
    console.log('\n🌍 你的网站现在可以在全球访问了!')
  }
  
  console.log('\n💡 提示: 首次使用会自动打开浏览器登录，之后全程无需人工干预')
  console.log('💡 下次只需要运行: node deploy.mjs\n')
}

main().catch(console.error)
