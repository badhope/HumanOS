/**
 * ==============================================
 * 🇨🇳 爱国主义纯度测评 - 核心计算器
 * ==============================================
 * 【文件定位】这是爱国主义测评的分数计算核心引擎
 * 【输入】用户答题的答案数组 (每题1-5分)
 * 【输出】标准化的PatriotismResult结果对象
 * 
 * 【算法流程】
 * 1. 按维度分组累加原始分
 * 2. 每个维度归一化到 0-100 分
 * 3. 计算 5 个维度平均分得到总爱国指数
 * 4. 根据阈值匹配对应的段位分类
 * 5. 生成维度解读 + 金句 + 建议
 */

import type { Answer } from '../../types'

/**
 * 爱国主义测评结果接口定义
 * 【⚠️  超级重要警告】
 * 1. 这里的 dimension key 必须与题目文件的 dimension 100% 一致！
 *    不一致 = 对应维度分数永远是 0！
 * 2. 这里的字段名必须与 ReportTemplate.tsx 中使用的完全一致！
 *    不一致 = Report 里 result.xxx 返回 undefined = 页面空白！
 */
export interface PatriotismResult extends Record<string, any> {
  rawScore: number              // 原始总分
  patriotismIndex: number       // 核心指数 0-100（5维平均分）
  classification: string        // 分类标识（用于匹配段位）
  classificationEmoji: string   // 段位emoji
  dimensions: {                 // 五维分数 0-100 分
    nationalPride: number
    culturalConfidence: number
    historicalIdentity: number
    socialResponsibility: number
    internationalOutlook: number
  }
  title: string                 // 报告标题
  description: string           // 段位描述文案
  levelName: string             // 段位名称（如：根正苗红）
  dimensionDescriptions: Record<string, string>  // 各维度文字解读
  patrioticQuotes: string[]     // 红色金句数组
  patriotRank: string           // 击败排名描述
  lifeSuggestions: string[]     // 进阶建议数组
  rednessLevel: string          // 红色等级称号
}

const CLASSIFICATIONS = {
  ultranationalist: { name: '战狼本狼', emoji: '🐺', desc: '刻在DNA里的红色基因。听到国歌就起立，看到国旗就敬礼。犯我中华者虽远必诛！' },
  patriot: { name: '根正苗红', emoji: '🇨🇳', desc: '社会主义优秀接班人。清澈的爱，只为中国。国家有需要，我第一个上！' },
  normal: { name: '正常爱国青年', emoji: '🌟', desc: '热爱祖国，但也有自己的思考。理性爱国，从我做起。' },
  indifferent: { name: '佛系路人', emoji: '😶', desc: '国家大事与我无瓜，过好自己的小日子就行。' },
  cynical: { name: '人间清醒', emoji: '🤔', desc: '键盘政治局常客。擅长从各种角度挑刺，朋友圈知名抬杠专家。' },
}

const DIMENSION_NAMES: Record<string, string> = {
  nationalPride: '民族自豪感',
  culturalConfidence: '文化自信',
  historicalIdentity: '历史认同',
  socialResponsibility: '社会责任感',
  internationalOutlook: '国际视野',
}

const PATRIOTIC_QUOTES = [
  '清澈的爱，只为中国',
  '此生无悔入华夏，来世还做中国人',
  '我们的征途是星辰大海',
  '如果奇迹有颜色，那一定是中国红',
  '哪有什么岁月静好，只是有人替你负重前行',
]

export function calculatePatriotism(answers: Answer[]): PatriotismResult {
  const dimensions = {
    nationalPride: 0,
    culturalConfidence: 0,
    historicalIdentity: 0,
    socialResponsibility: 0,
    internationalOutlook: 0,
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
  const patriotismIndex = Math.round(rawScore / 5)

  let classification: PatriotismResult['classification']
  if (patriotismIndex >= 85) classification = 'ultranationalist'
  else if (patriotismIndex >= 65) classification = 'patriot'
  else if (patriotismIndex >= 45) classification = 'normal'
  else if (patriotismIndex >= 25) classification = 'indifferent'
  else classification = 'cynical'

  const config = CLASSIFICATIONS[classification]

  const dimensionDescriptions: Record<string, string> = {
    nationalPride: dimensions.nationalPride >= 80
      ? '看到中国赢了比自己赢了还激动'
      : dimensions.nationalPride >= 50
        ? '为祖国的成就感到骄傲'
        : dimensions.nationalPride >= 25
          ? '还行吧，也就那样'
          : '外国的月亮就是比较圆',
    culturalConfidence: dimensions.culturalConfidence >= 80
      ? '中华文化天下第一，不接受反驳'
      : dimensions.culturalConfidence >= 50
        ? '中华文化博大精深，需要我们传承'
        : dimensions.culturalConfidence >= 25
          ? '传统文化还行，但是现代文化嘛...'
          : '传统文化都是糟粕，要全盘西化',
    historicalIdentity: dimensions.historicalIdentity >= 80
      ? '上下五千年，这就叫历史底蕴'
      : dimensions.historicalIdentity >= 50
        ? '铭记历史，勿忘国耻，振兴中华'
        : dimensions.historicalIdentity >= 25
          ? '历史都是胜利者写的，看看就好'
          : '中国人的历史劣根性就是太重了',
    socialResponsibility: dimensions.socialResponsibility >= 80
      ? '国家兴亡，匹夫有责。我随时准备着'
      : dimensions.socialResponsibility >= 50
        ? '做好自己的事，不给国家添麻烦'
        : dimensions.socialResponsibility >= 25
          ? '先顾好自己再说吧'
          : '这个国家跟我有半毛钱关系？',
    internationalOutlook: dimensions.internationalOutlook >= 80
      ? '师夷长技以制夷，保持开放心态'
      : dimensions.internationalOutlook >= 50
        ? '不卑不亢，独立自主的外交'
        : dimensions.internationalOutlook >= 25
          ? '外国的东西也不是完全不能用'
          : '抵制一切外国货，从我做起！',
  }

  let patriotRank = ''
  if (classification === 'ultranationalist') patriotRank = '🐺 战狼等级：SSS+ 满级大佬'
  else if (classification === 'patriot') patriotRank = '🇨🇳 爱国等级：S级 根正苗红'
  else if (classification === 'normal') patriotRank = '⭐ 爱国等级：A级 良好市民'
  else if (classification === 'indifferent') patriotRank = '😶 爱国等级：C级 需要加强教育'
  else patriotRank = '🤔 爱国等级：E级 键盘政治局常委'

  const rednessLevel = patriotismIndex >= 80
    ? '🔴 纯度鉴定：100% 纯正中国红，刻进DNA的红色基因'
    : patriotismIndex >= 60
      ? '🟡 纯度鉴定：70% 又红又专好青年'
      : patriotismIndex >= 40
        ? '🟢 纯度鉴定：50% 普通爱国群众'
        : '⚪ 纯度鉴定：30% 建议重上思想道德课'

  const lifeSuggestions = [
    patriotismIndex >= 80 ? '⚠️ 理性爱国，拒绝网络暴力' : '💡 爱国不是口号，是做好自己的每一件事',
    '多看新闻联播，少看微博热搜',
    '好好学习，好好工作，就是最大的爱国',
    '文化自信不是盲目排外，是好的都可以学',
    '独立思考，不被带节奏',
  ]

  return {
    rawScore,
    patriotismIndex,
    classification,
    classificationEmoji: config.emoji,
    dimensions,
    title: '爱国主义纯度测评报告',
    description: config.desc,
    levelName: config.name,
    dimensionDescriptions,
    patrioticQuotes: PATRIOTIC_QUOTES,
    patriotRank,
    lifeSuggestions,
    rednessLevel,
  }
}
