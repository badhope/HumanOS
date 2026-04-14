/**
 * ==============================================
 * 🍶 人情世故成熟度测评 - 核心计算器
 * ==============================================
 * 【测评定位】中国式社会生存能力鉴定
 * 【核心算法】5维度 × 10题/维度 = 50题
 * 
 * 【⚠️  超级重要警告】
 * 1. 按题目dimension累加计分！
 * 2. dimension拼写错了 = 对应维度永远0分！
 */

import type { Answer, AssessmentResult } from '../../types'

/**
 * 人情世故成熟度结果接口
 * 【五大社会生存维度】
 * - tableManner: 餐桌礼仪
 * - speakingArt: 说话艺术
 * - giftGiving: 送礼哲学
 * - eyeContact: 眼神交流
 * - drinkingCulture: 酒桌文化
 */
export interface GMAResult extends Record<string, any> {
  rawScore: number
  gmaScore: number
  percentile: number
  classification: 'legend' | 'master' | 'adept' | 'normal' | 'novice' | 'danger'
  classificationEmoji: string
  dimensions: {
    tableManner: number
    speakingArt: number
    giftGiving: number
    eyeContact: number
    drinkingCulture: number
  }
  radarData: { dimension: string; score: number; fullMark: number }[]
  typeDescription: string
  famousPeers: string[]
  survivalGuide: string[]
  dangerZones: string[]
  workplaceAdvice: string[]
}

const CLASSIFICATION_DESCRIPTIONS: Record<GMAResult['classification'], string> = {
  legend: '🏆 人情世故传奇级：您已达到"世事洞明皆学问，人情练达即文章"的化境。您不是在做人情，您就是人情世故本身。',
  master: '🧙 人精大师级：阅人无数，老谋深算。大多数人心里想什么，您扫一眼就明白了。',
  adept: '🎯 得心应手级：您已掌握人情世故的核心精髓，在大多数场合都能游刃有余。',
  normal: '📚 合格入门级：基本规矩都懂，重大场合不会出错，但还需要更多历练。',
  novice: '🌱 萌新观察级：道理都懂，但一到实战就容易社恐/社死。',
  danger: '⚠️ 高危型：您的真性情在这个复杂的社会里非常珍贵，但也非常危险。',
}

const SCENE_MASTERS = [
  '王熙凤', '薛宝钗', '韦小宝', '纪晓岚', '和珅', '杜月笙',
  '刘姥姥', '宋江', '吴用', '曹孟德', '刘备', '周恩来'
]

export function calculateGMA(answers: Answer[]): GMAResult {
  const dimensionMap: Record<keyof GMAResult['dimensions'], string[]> = {
    tableManner: ['gma-1', 'gma-2', 'gma-3', 'gma-4', 'gma-5', 'gma-6', 'gma-31', 'gma-32', 'gma-33', 'gma-34'],
    speakingArt: ['gma-7', 'gma-8', 'gma-9', 'gma-10', 'gma-11', 'gma-12', 'gma-35', 'gma-36', 'gma-37', 'gma-38'],
    giftGiving: ['gma-13', 'gma-14', 'gma-15', 'gma-16', 'gma-17', 'gma-18', 'gma-39', 'gma-40', 'gma-41', 'gma-42'],
    eyeContact: ['gma-19', 'gma-20', 'gma-21', 'gma-22', 'gma-23', 'gma-24', 'gma-43', 'gma-44', 'gma-45', 'gma-46'],
    drinkingCulture: ['gma-25', 'gma-26', 'gma-27', 'gma-28', 'gma-29', 'gma-30', 'gma-47', 'gma-48', 'gma-49', 'gma-50'],
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
  })

  const dimensions: GMAResult['dimensions'] = {} as GMAResult['dimensions']
  let totalRaw = 0

  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const percentage = Math.round((score / (ids.length * 5)) * 100)
    dimensions[dim as keyof GMAResult['dimensions']] = percentage
    totalRaw += score
  })

  const gmaScore = Math.round(50 + ((totalRaw - 150) / 100) * 50)
  let percentile = 50
  if (gmaScore >= 130) percentile = 99
  else if (gmaScore >= 120) percentile = 95
  else if (gmaScore >= 110) percentile = 84
  else if (gmaScore >= 100) percentile = 50
  else if (gmaScore >= 90) percentile = 30
  else if (gmaScore >= 80) percentile = 15
  else percentile = 5

  let classification: GMAResult['classification'] = 'normal'
  let classificationEmoji = '📚'

  if (gmaScore >= 130) { classification = 'legend'; classificationEmoji = '🏆' }
  else if (gmaScore >= 120) { classification = 'master'; classificationEmoji = '🧙' }
  else if (gmaScore >= 110) { classification = 'adept'; classificationEmoji = '🎯' }
  else if (gmaScore >= 100) { classification = 'normal'; classificationEmoji = '📚' }
  else if (gmaScore >= 85) { classification = 'novice'; classificationEmoji = '🌱' }
  else { classification = 'danger'; classificationEmoji = '⚠️' }

  const radarData = [
    { dimension: '饭桌规矩', score: dimensions.tableManner, fullMark: 100 },
    { dimension: '说话艺术', score: dimensions.speakingArt, fullMark: 100 },
    { dimension: '送礼分寸', score: dimensions.giftGiving, fullMark: 100 },
    { dimension: '眼色等级', score: dimensions.eyeContact, fullMark: 100 },
    { dimension: '酒桌文化', score: dimensions.drinkingCulture, fullMark: 100 },
  ]

  const getSurvivalGuide = () => {
    const guide: string[] = []
    if (dimensions.speakingArt >= 80) guide.push('你说"我再想想"的时候，其实已经在说"不行"了——这是你的天赋')
    if (dimensions.eyeContact >= 80) guide.push('你能读懂空气中的微妙情绪，这是大多数人用钱都买不到的能力')
    if (dimensions.giftGiving >= 80) guide.push('你送的礼永远让人舒服，不觉得是行贿，只觉得是心意')
    if (dimensions.tableManner >= 80) guide.push('饭桌上你就是气氛的调节器，每个人都觉得被照顾到了')
    
    if (dimensions.drinkingCulture >= 80) guide.push('酒桌就是你的舞台。劝酒、挡酒、代酒，每一样都拿捏得恰到好处')
    if (dimensions.speakingArt <= 30) guide.push('心直口快是优点也是致命伤。话到嘴边留半句，说出口之前先数三个数')
    if (dimensions.eyeContact <= 30) guide.push('你是典型的"眼里没活"的人。多观察，少说话，先看别人怎么做')
    if (dimensions.giftGiving <= 30) guide.push('人情往来是这个社会的润滑剂。不贵重，但要"走心"')
    if (dimensions.tableManner <= 30) guide.push('坐哪儿、转桌方向、谁先动筷——这些小细节决定了别人对你的第一印象')
    
    if (gmaScore <= 70) guide.push('🚨 重大场合请务必携带一位人精好友作为你的"翻译官"')
    return guide.slice(0, 6)
  }

  const getDangerZones = () => {
    const weakest = Object.entries(dimensions).sort((a, b) => a[1] - b[1])[0][0]
    const zones: string[] = []
    if (weakest === 'speakingArt') zones.push('⚠️ 公开表扬／私下批评——这个顺序永远不能搞反')
    if (weakest === 'eyeContact') zones.push('⚠️ 领导说"原则上同意"就是不同意，"再研究研究"就是拒绝')
    if (weakest === 'giftGiving') zones.push('⚠️ 千万不要当众送礼，千万不要送太贵重的礼')
    if (weakest === 'tableManner') zones.push('⚠️ 永远不要第一个动筷，永远不要夹最后一块肉')
    if (weakest === 'drinkingCulture') zones.push('⚠️ 宁可少喝也别喝多，喝多了说的每句话都会变成呈堂证供')
    
    zones.push('别人自嘲的时候千万不要附和，那不是谦虚，是在等你反驳')
    zones.push('不拆穿、不点破、不说教——成年人的世界只筛选，不教育')
    return zones.slice(0, 4)
  }

  const famousPeers = SCENE_MASTERS
    .sort(() => Math.random() - 0.5)
    .slice(0, 3 + Math.floor(gmaScore / 40))

  const typeDescription = CLASSIFICATION_DESCRIPTIONS[classification] +
    `\n\n您的人情世故得分为 **${gmaScore} 分**，超过了全国 ${percentile}% 的人群。` +
    (gmaScore <= 70 ? '\n\n💡 提醒：这个社会对真诚的人恶意最大，但也对真正真诚的人回报最厚。' : '') +
    (gmaScore >= 130 ? '\n\n💡 大成者都是"非典型"人精：知世故而不世故，才是最善良的成熟。' : '')

  return {
    rawScore: totalRaw,
    gmaScore,
    percentile,
    classification,
    classificationEmoji,
    dimensions,
    radarData,
    typeDescription,
    famousPeers,
    survivalGuide: getSurvivalGuide(),
    dangerZones: getDangerZones(),
    workplaceAdvice: [
      '收到消息别秒回，重要的消息更要等一等。太快 = 你的时间不值钱',
      '夸人要在公开场合，骂人要在电梯里',
      'XX总说"我简单说两句" = 至少一个小时起步',
      '"我对事不对人" = 我就是针对你',
    ],
  }
}
