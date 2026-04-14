/**
 * ==============================================
 * 📱 网瘾程度测评 - 核心计算器
 * ==============================================
 * 【测评定位】当代人数字生存状态鉴定
 * 【核心算法】使用时长 + 社媒依赖 + 游戏沉迷 + FOMO + 线下能力
 */

import type { Answer } from '../../types'

/**
 * 网瘾程度结果接口
 * 【⚠️  超级重要警告】
 * 1. 这里的 dimension key 必须与题目文件的 dimension 100% 一致！
 *    不一致 = 对应维度分数永远是 0！
 * 2. 这里的字段名必须与 ReportTemplate.tsx 中使用的完全一致！
 *    不一致 = Report 里 result.xxx 返回 undefined = 页面空白！
 */
export interface InternetAddictionResult extends Record<string, any> {
  rawScore: number
  addictionIndex: number
  classification: 'transcendent' | 'god' | 'addict' | 'normal' | 'casual' | 'hermit'
  classificationEmoji: string
  dimensions: {
    dailyUsage: number
    socialMedia: number
    gaming: number
    fomo: number
    offlineAbility: number
  }
  title: string
  description: string
  levelName: string
  dimensionDescriptions: Record<string, string>
  internetQuotes: string[]
  addictionRank: string
  detoxSuggestions: string[]
  digitalNativeLevel: string
}

const CLASSIFICATIONS = {
  transcendent: { name: '数字飞升', emoji: '👼', desc: '你已经与互联网融为一体。吃饭睡觉手机不离手，上厕所不带手机就拉不出来。你的精神生活完全在网上，现实世界只是偶尔登录的服务器。' },
  god: { name: '网瘾之神', emoji: '🌐', desc: '5G信号就是你的生命线，WiFi密码就是你的圣经。一天25小时在线，电量低于50%就开始恐慌。' },
  addict: { name: '重度网瘾', emoji: '📱', desc: '手机是你的外置器官。醒着第一件事摸手机，睡前最后一件事刷手机。没有手机就浑身难受，焦虑到抠脚。' },
  normal: { name: '正常网民', emoji: '💻', desc: '合理使用互联网，该上网上网，该生活生活。数字时代的良好公民。' },
  casual: { name: '轻度用户', emoji: '☕', desc: '互联网只是工具，不是生活。偶尔刷刷手机，更多时间在现实世界。' },
  hermit: { name: '数字隐士', emoji: '🏔️', desc: '你是怎么做到的？一天手机使用不超过一小时？朋友圈半年不更新？在这个时代还能保持低网络依赖，你是真正的高人。' },
}

const DIMENSION_NAMES: Record<string, string> = {
  dailyUsage: '日均使用',
  socialMedia: '社交媒体',
  gaming: '游戏沉迷',
  fomo: '错失恐惧',
  offlineAbility: '断网生存',
}

const INTERNET_QUOTES = [
  '断网半小时，感觉错过了整个世界',
  '机不在手，魂都没有',
  '我的眼睛很大，装得下整个手机屏幕',
  '电量1%的恐慌，大于99%的所有事',
  'WiFi满格，人间值得',
  '网上冲浪五千年，一醒回到解放前',
  '别问我在不在，我永远都在',
]

export function calculateInternetAddiction(answers: Answer[]): InternetAddictionResult {
  const dimensions = {
    dailyUsage: 0,
    socialMedia: 0,
    gaming: 0,
    fomo: 0,
    offlineAbility: 0,
  }

  const dimensionCount: Record<string, number> = {}
  Object.keys(dimensions).forEach(k => dimensionCount[k] = 0)

  answers.forEach(answer => {
    const dim = answer.dimension || ''
    const value = typeof answer.value === 'number' ? answer.value : 3
    if (Object.prototype.hasOwnProperty.call(dimensions, dim)) {
      dimensions[dim as keyof typeof dimensions] += value
      dimensionCount[dim]++
    }
  })

  Object.keys(dimensions).forEach(key => {
    if (dimensionCount[key] > 0) {
      dimensions[key as keyof typeof dimensions] = Math.round(
        (dimensions[key as keyof typeof dimensions] / dimensionCount[key] - 1) * 100 / 4
      )
    }
  })

  const rawScore = Object.values(dimensions).reduce((a, b) => a + b, 0)
  const addictionIndex = Math.round(rawScore / 5)

  let classification: InternetAddictionResult['classification']
  if (addictionIndex >= 92) classification = 'transcendent'
  else if (addictionIndex >= 78) classification = 'god'
  else if (addictionIndex >= 62) classification = 'addict'
  else if (addictionIndex >= 40) classification = 'normal'
  else if (addictionIndex >= 20) classification = 'casual'
  else classification = 'hermit'

  const config = CLASSIFICATIONS[classification]

  const dimensionDescriptions: Record<string, string> = {
    dailyUsage: dimensions.dailyUsage >= 80
      ? '日均12小时+，手机长在手上了'
      : dimensions.dailyUsage >= 50
        ? '日均8小时，上班摸鱼下班刷'
        : dimensions.dailyUsage >= 25
          ? '日均4小时，健康上网好青年'
          : '日均不到2小时，你手机是用来打电话的？',
    socialMedia: dimensions.socialMedia >= 80
      ? '微博豆瓣小红书，吃瓜第一线永不缺席'
      : dimensions.socialMedia >= 50
        ? '每天必刷朋友圈，点赞评论是基本礼仪'
        : dimensions.socialMedia >= 25
          ? '偶尔看看，不追热点'
          : '朋友圈半年不更新，仿佛退网',
    gaming: dimensions.gaming >= 80
      ? '职业选手级别，在线时长比上班还久'
      : dimensions.gaming >= 50
        ? '每天必打几把，不打浑身难受'
        : dimensions.gaming >= 25
          ? '周末消遣，娱乐为主'
          : '游戏是什么？能吃吗？',
    fomo: dimensions.fomo >= 80
      ? '半小时不看手机就焦虑，感觉错过了一个亿'
      : dimensions.fomo >= 50
        ? '消息必须秒回，红点全部要点掉'
        : dimensions.fomo >= 25
          ? '看到了就回，不急'
          : '手机静音三天不看也无所谓',
    offlineAbility: dimensions.offlineAbility >= 80
      ? '断网一天直接去世，建议直接送ICU'
      : dimensions.offlineAbility >= 50
        ? '断网半天就坐立不安，开始到处找WiFi'
        : dimensions.offlineAbility >= 25
          ? '断网几个小时还能接受，看看书也行'
          : '断网？正好清净几天',
  }

  const detoxSuggestions: string[] = []
  if (addictionIndex >= 70) {
    detoxSuggestions.push('紧急建议：现在就把手机放下，去阳台看看风景')
    detoxSuggestions.push('尝试睡前一小时不碰手机，失眠会找上你，但坚持就是胜利')
    detoxSuggestions.push('周末找个没有WiFi的地方，体验原始生活')
    detoxSuggestions.push('卸载掉最耗时间的三个APP，你会发现时间多了好多')
  } else if (addictionIndex >= 50) {
    detoxSuggestions.push('开启屏幕使用时间提醒，关注自己的上网时长')
    detoxSuggestions.push('吃饭时不看手机，好好感受食物的味道')
    detoxSuggestions.push('试试每天留一小时"无手机时间"')
  } else if (addictionIndex >= 30) {
    detoxSuggestions.push('继续保持，合理使用互联网是现代人的基本素养')
    detoxSuggestions.push('多利用网络学习新知识，而不是纯娱乐')
  } else {
    detoxSuggestions.push('大师，请问您是如何在这个时代做到断舍离的？')
    detoxSuggestions.push('请收我为徒，传授一下数字极简的秘诀')
    detoxSuggestions.push('当代陶渊明，说的就是你')
  }

  let addictionRank: string
  if (classification === 'transcendent') addictionRank = '你已经超越了人类的极限，成为了网络本身。赛博朋克的终极形态。'
  else if (classification === 'god') addictionRank = '全网前1%的网瘾天花板，各大平台的核心日活用户'
  else if (classification === 'addict') addictionRank = '标准网瘾患者，互联网的中坚力量'
  else if (classification === 'normal') addictionRank = '健康的互联网用户，继续保持'
  else if (classification === 'casual') addictionRank = '轻度用户，网络只是你生活的调味品'
  else addictionRank = '你真的不是从古代穿越来的吗？'

  let digitalNativeLevel: string
  if (addictionIndex >= 90) digitalNativeLevel = '数字原住民第一代，生在网上长在网上'
  else if (addictionIndex >= 75) digitalNativeLevel = '资深网民，互联网活化石'
  else if (addictionIndex >= 60) digitalNativeLevel = '合格的网络公民'
  else if (addictionIndex >= 40) digitalNativeLevel = '现代社会良好市民'
  else if (addictionIndex >= 20) digitalNativeLevel = '数字移民，刚学会上网不久'
  else digitalNativeLevel = '赛博空间的隐士'

  return {
    rawScore,
    addictionIndex,
    classification,
    classificationEmoji: config.emoji,
    dimensions,
    title: `${config.emoji} ${config.name}`,
    description: config.desc,
    levelName: config.name,
    dimensionDescriptions,
    internetQuotes: INTERNET_QUOTES.sort(() => Math.random() - 0.5).slice(0, 3),
    addictionRank,
    detoxSuggestions,
    digitalNativeLevel,
  }
}
