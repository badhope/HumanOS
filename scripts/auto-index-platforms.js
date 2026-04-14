#!/usr/bin/env node
process.stdout.isTTY && process.stdout.setEncoding('utf8')
process.stderr.isTTY && process.stderr.setEncoding('utf8')
console.log('\n🌍 HumanOS 零注册收录平台大全')
console.log('='.repeat(60))
console.log('\n💯 这些平台 100% 不需要登录/注册！完全自动爬取GitHub')
console.log('💡 你已经把代码推到GitHub了，剩下的交给时间...\n')

const PLATFORMS = [
  {
    name: 'GitHub 站内搜索',
    url: 'https://github.com/search?q=assessment+chinese',
    time: '即时收录',
    note: 'GitHub是最大的开发者平台，自带流量'
  },
  {
    name: 'Libraries.io',
    url: 'https://libraries.io/github/badhope/HumanOS',
    time: '1-3天自动爬取',
    note: '全球最大的开源项目索引平台'
  },
  {
    name: 'Openbase.com',
    url: 'https://openbase.com/search?q=humanos+assessment',
    time: '1-7天自动爬取',
    note: '开发者找包对比平台'
  },
  {
    name: 'BestOfJS.org',
    url: 'https://bestofjs.org/',
    time: '每月爬取热门项目',
    note: 'JavaScript项目排行榜，带流量'
  },
  {
    name: 'StackShare.io',
    url: 'https://stackshare.io/search?q=assessment',
    time: '自动索引',
    note: '技术栈发现平台'
  },
  {
    name: 'jsDelivr CDN',
    url: 'https://cdn.jsdelivr.net/gh/badhope/HumanOS@main/',
    time: '即时生效！',
    note: '✅ 全球CDN，直接从GitHub拉取，无需发布！'
  },
  {
    name: 'Statically.io CDN',
    url: 'https://cdn.statically.io/gh/badhope/HumanOS/main/',
    time: '即时生效！',
    note: '✅ 又一个直接从GitHub拉取的全球CDN'
  },
  {
    name: 'Githack.com',
    url: 'https://raw.githack.com/badhope/HumanOS/main/',
    time: '即时生效！',
    note: '✅ GitHub CDN加速，国内可用'
  },
  {
    name: 'JSDelivr GH Pages',
    url: 'https://badhope.github.io/HumanOS/',
    time: '已开启',
    note: '✅ GitHub Pages 全球访问'
  },
  {
    name: 'Deno Deploy',
    url: 'https://dash.deno.com/new',
    time: 'GitHub授权一键',
    note: '点击授权，自动部署'
  },
  {
    name: 'Cloudflare Pages',
    url: 'https://pages.cloudflare.com/',
    time: 'GitHub授权一键',
    note: '国内速度最快，点击授权'
  },
]

console.log('📋 零注册收录平台：')
console.log('-'.repeat(60))
PLATFORMS.forEach((p, i) => {
  console.log(`\n${String(i+1).padStart(2)}. ${p.name}`)
  console.log(`   🔗 ${p.url}`)
  console.log(`   ⏱️  ${p.time}`)
  console.log(`   💡 ${p.note}`)
})

console.log('\n' + '='.repeat(60))
console.log('\n🚀 三大CDN直接可用（现在就能打开！）：')
console.log('\n   ✅ jsDelivr:  https://cdn.jsdelivr.net/gh/badhope/HumanOS@main/dist/index.html')
console.log('   ✅ Statically: https://cdn.statically.io/gh/badhope/HumanOS/main/dist/index.html')
console.log('   ✅ GitHack: https://raw.githack.com/badhope/HumanOS/main/dist/index.html')
console.log('\n💡 这三个CDN直接拉取你GitHub上的代码，连部署都省了！')

console.log('\n🇨🇳 国内开发者友好方案：')
console.log('\n   1. Gitee 镜像: https://gitee.com/ 一键导入GitHub项目')
console.log('   2. GitCode: https://gitcode.com/ 一键导入')
console.log('   3. 腾讯云开发: GitHub授权一键部署')
console.log('   4. 阿里云Serverless: GitHub授权部署')

console.log('\n🎯 总结：你其实什么都不用做！')
console.log('')
console.log('   代码推到GitHub → 全球平台自动爬取 → 开发者找到你 → Star！')
console.log('')
console.log('   ✅ jsDelivr 已经在给你做CDN了')
console.log('   ✅ Libraries.io 3天内会收录你')
console.log('   ✅ GitHub搜索已经能搜到你的项目了')
console.log('')
console.log('🎉 躺着就能被全球开发者发现！\n')
