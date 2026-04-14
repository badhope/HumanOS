/**
 * ==============================================
 * 🧠 人生意义感测评 - 核心计算器
 * ==============================================
 * 【测评定位】存在主义哲学向人格测评
 * 【核心算法】25题 × 5维度 × 5题/维度
 * 【心理学模型】意义治疗法 + 存在主义心理学
 */

import type { Answer } from '../../types'

/**
 * 人生意义感结果接口
 * 【⚠️  超级重要警告】
 * 1. 这里的 dimension key 必须与题目文件的 dimension 100% 一致！
 *    不一致 = 对应维度分数永远是 0！
 * 2. 这里的字段名必须与 ReportTemplate.tsx 中使用的完全一致！
 *    不一致 = Report 里 result.xxx 返回 undefined = 页面空白！
 */
export interface LifeMeaningResult extends Record<string, any> {
  rawScore: number              // 原始总分
  meaningIndex: number          // 人生意义指数 0-100
  classification: string        // 分类标识
  classificationEmoji: string   // 段位emoji（与Report一致）
  dimensions: {                 // 五维分数
    selfRealization: number     // 马斯洛需求顶层
    relationshipQuality: number // 亲密关系质量
    contribution: number        // 社会贡献感
    personalGrowth: number      // 个人成长
    transcendence: number       // 灵性超越性
  }
  title: string                 // 报告标题
  description: string           // 段位描述
  levelName: string             // 段位名称
  dimensionDescriptions: Record<string, string>
  philosophyQuotes: string[]    // 哲学金句
  meaningRank: string           // 排名说明
  lifeSuggestions: string[]     // 人生建议
  enlightenmentLevel: string    // 开悟等级
}

const CLASSIFICATIONS = {
  enlightened: { name: '大彻大悟', emoji: '🧘', desc: '已经找到了人生的答案。不困于心，不乱于情。不念过往，不畏将来。可以去当人生导师了。' },
  seeker: { name: '在路上', emoji: '🚶', desc: '一直在寻找人生的意义。虽然还没找到，但寻找本身就是意义。' },
  normal: { name: '正常人', emoji: '🙂', desc: '没想那么多，该吃吃该喝喝。过好每一天就是最大的意义。' },
  confused: { name: '迷茫青年', emoji: '🤷', desc: '间歇性踌躇满志，持续性混吃等死。经常在深夜思考人生然后emo。' },
  nihilist: { name: '究极摆烂', emoji: '💀', desc: '人生本就没有意义。万物皆虚，万事皆允。摆烂才是终极答案。' },
}

const DIMENSION_NAMES: Record<string, string> = {
  selfRealization: '自我实现',
  relationshipQuality: '人际关系',
  contribution: '奉献精神',
  personalGrowth: '个人成长',
  transcendence: '超越性追求',
}

const PHILOSOPHY_QUOTES = [
  '人是悬挂在自己编织的意义之网上的动物 —— 马克斯·韦伯',
  '人生的意义不在于长度，而在于深度 —— 爱默生',
  '真正的英雄主义，是认清生活真相后依然热爱生活 —— 罗曼·罗兰',
  '存在先于本质 —— 萨特',
  '所有的人都在寻找不存在的答案 —— 加缪',
]

export function calculateLifeMeaning(answers: Answer[]): LifeMeaningResult {
  const dimensions = {
    selfRealization: 0,
    relationshipQuality: 0,
    contribution: 0,
    personalGrowth: 0,
    transcendence: 0,
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
  const meaningIndex = Math.round(rawScore / 5)

  let classification: LifeMeaningResult['classification']
  if (meaningIndex >= 85) classification = 'enlightened'
  else if (meaningIndex >= 65) classification = 'seeker'
  else if (meaningIndex >= 45) classification = 'normal'
  else if (meaningIndex >= 25) classification = 'confused'
  else classification = 'nihilist'

  const config = CLASSIFICATIONS[classification]

  const dimensionDescriptions: Record<string, string> = {
    selfRealization: dimensions.selfRealization >= 80
      ? '正在做自己真正热爱的事情，每天都充满能量'
      : dimensions.selfRealization >= 50
        ? '知道自己想要什么，并且在努力追求'
        : dimensions.selfRealization >= 25
          ? '还在探索自己真正想要的是什么'
          : '不知道自己想要什么，每天都在摸鱼',
    relationshipQuality: dimensions.relationshipQuality >= 80
      ? '有爱你的家人，有志同道合的朋友，此生足矣'
      : dimensions.relationshipQuality >= 50
        ? '有几个真心朋友，家庭关系也还不错'
        : dimensions.relationshipQuality >= 25
          ? '人际关系一般，没什么特别交心的朋友'
          : '社交恐惧症，基本上一个人独来独往',
    contribution: dimensions.contribution >= 80
      ? '活着就是为了改变世界'
      : dimensions.contribution >= 50
        ? '希望能为这个世界留下点什么'
        : dimensions.contribution >= 25
          ? '不给别人添麻烦就好了'
          : '不给这个世界添乱就是最大的贡献',
    personalGrowth: dimensions.personalGrowth >= 80
      ? '每天都在进化，今天的我吊打昨天的我'
      : dimensions.personalGrowth >= 50
        ? '一直在学习，希望成为更好的自己'
        : dimensions.personalGrowth >= 25
          ? '偶尔会学习，但大部分时候在摸鱼'
          : '躺平了，就这样吧，再努力也就那样',
    transcendence: dimensions.transcendence >= 80
      ? '已经参透了宇宙的终极奥秘'
      : dimensions.transcendence >= 50
        ? '相信有某种超越性的存在'
        : dimensions.transcendence >= 25
          ? '有没有神？偶尔会想想这个问题'
          : '人死如灯灭，哪有什么来世',
  }

  let meaningRank = ''
  if (classification === 'enlightened') meaningRank = '🧘 开悟等级：SSS级 人生导师'
  else if (classification === 'seeker') meaningRank = '🚶 探索等级：S级 真理追求者'
  else if (classification === 'normal') meaningRank = '🙂 通透等级：A级 普通智者'
  else if (classification === 'confused') meaningRank = '🤷 迷茫等级：C级 需要指引'
  else meaningRank = '💀 虚无等级：E级 究极摆烂王'

  const enlightenmentLevel = meaningIndex >= 80
    ? '✨ 开悟指数：100% 您已证得大道'
    : meaningIndex >= 60
      ? '🌟 开悟指数：70% 慧根深厚，根骨奇佳'
      : meaningIndex >= 40
        ? '💡 开悟指数：50% 凡夫俗子，尚有救药'
        : '🌑 开悟指数：20% 还在红尘中打滚'

  const lifeSuggestions = [
    meaningIndex < 30 ? '💡 建议：少刷抖音多读书，答案不在短视频里' : '💡 人生本来就没有标准答案，寻找的过程就是答案',
    '不要为了尚未发生的事情焦虑',
    '接受自己只是个普通人这件事',
    '照顾好自己的身体和情绪，这是最重要的',
    '跟喜欢的人做喜欢的事，就是最好的人生',
  ]

  return {
    rawScore,
    meaningIndex,
    classification,
    classificationEmoji: config.emoji,
    dimensions,
    title: '人生意义感测评报告',
    description: config.desc,
    levelName: config.name,
    dimensionDescriptions,
    philosophyQuotes: PHILOSOPHY_QUOTES,
    meaningRank,
    lifeSuggestions,
    enlightenmentLevel,
  }
}
