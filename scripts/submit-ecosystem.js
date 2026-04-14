#!/usr/bin/env node
process.stdout.isTTY && process.stdout.setEncoding('utf8')
process.stderr.isTTY && process.stderr.setEncoding('utf8')
console.log('\n🌍 HumanOS 开源生态收录系统')
console.log('='.repeat(50))

console.log('\n📋 以下平台无需注册，自动爬取GitHub:')

const AUTO_CRAWL = [
  { name: 'Libraries.io', url: 'https://libraries.io/github/badhope/HumanOS', status: '✅ 自动爬取' },
  { name: 'Openbase.com', url: 'https://openbase.com/search?q=humanos', status: '✅ 自动爬取' },
  { name: 'BestOfJS.org', url: 'https://bestofjs.org/projects?search=humanos', status: '✅ 每月自动爬取' },
  { name: 'StackShare.io', url: 'https://stackshare.io/search?q=humanos', status: '✅ 自动收录' },
  { name: 'jsDelivr', url: 'https://www.jsdelivr.com/package/npm/humanos', status: '✅ npm发布后立即收录' },
  { name: 'UNPKG', url: 'https://unpkg.com/humanos/', status: '✅ npm发布后立即收录' },
]

console.log('\n🔄 自动收录平台:')
AUTO_CRAWL.forEach(p => console.log(`  ${p.status} ${p.name}: ${p.url}`))

console.log('\n📦 NPM 发布流程:')
console.log('  npm login        # 一次登录，永久有效')
console.log('  npm publish      # 发布，全球自动收录！')

console.log('\n⭐ 发布后24小时内自动收录:')
console.log('  ✅ npmjs.com/package/humanos')
console.log('  ✅ jsdelivr.com/package/npm/humanos')
console.log('  ✅ unpkg.com/humanos')
console.log('  ✅ libraries.io/npm/humanos')
console.log('  ✅ openbase.com/npm/humanos')
console.log('  ✅ npmtrends.com/humanos')
console.log('  ✅ npm-stat.com/humanos')

console.log('\n🏷️  GitHub Topics (关键！增加曝光)')
console.log('  请在GitHub项目主页添加以下话题标签:')
const TOPICS = [
  'assessment', 'personality-test', 'emotional-intelligence',
  'eq-test', 'psychological-test', 'mbti', 'big-five',
  'react', 'typescript', 'tailwindcss', 'vite',
  'open-source', 'web-app', 'chinese'
]
console.log('  ' + TOPICS.join(', '))

console.log('\n🎯 开发者流量平台（手动一次，永久曝光）:')
const MANUAL = [
  { name: 'Product Hunt', url: 'https://www.producthunt.com/posts/new' },
  { name: 'Hacker News Show HN', url: 'https://news.ycombinator.com/submit' },
  { name: 'Dev.to', url: 'https://dev.to/new' },
  { name: '掘金', url: 'https://juejin.cn/' },
  { name: 'V2EX', url: 'https://v2ex.com/' },
]
MANUAL.forEach(p => console.log(`  📌 ${p.name}: ${p.url}`))

console.log('\n💡 核心逻辑:')
console.log('  开发者搜索"情商测评"')
console.log('  → npm/libraries.io找到你的包')
console.log('  → 点击链接跳转到GitHub')
console.log('  → Star你的项目\n')
