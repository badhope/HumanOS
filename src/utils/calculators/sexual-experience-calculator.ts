/**
 * ==============================================
 * 🔥 性经验指数测评 - 核心计算器
 * ==============================================
 * 【测评定位】成年人经验等级鉴定（娱乐向）
 * 【核心算法】实战 + 理论 + 技术 + 多样性 + 开放度
 */

import type { Answer } from '../../types'

/**
 * 性经验指数结果接口
 * 【⚠️  超级重要警告】
 * 1. 这里的 dimension key 必须与题目文件的 dimension 100% 一致！
 *    不一致 = 对应维度分数永远是 0！
 * 2. 这里的字段名必须与 ReportTemplate.tsx 中使用的完全一致！
 *    不一致 = Report 里 result.xxx 返回 undefined = 页面空白！
 */
export interface SexualExperienceResult extends Record<string, any> {
  rawScore: number
  experienceIndex: number
  classification: 'virgin' | 'rookie' | 'normal' | 'veteran' | 'master' | 'legend'
  classificationEmoji: string
  dimensions: {
    theoretical: number
    practical: number
    diversity: number
    openness: number
    technique: number
  }
  title: string
  description: string
  levelName: string
  dimensionDescriptions: Record<string, string>
  funFacts: string[]
  experienceRank: string
  peerComparison: string
  lifeAdvice: string[]
}

const CLASSIFICATIONS = {
  virgin: { name: '白纸一张', emoji: '📄', desc: '理论为零，实践为零。人类进化史上的奇迹，互联网时代的活化石。纯爱战神说的就是你。' },
  rookie: { name: '入门学徒', emoji: '🌱', desc: '理论大于实践，纸上谈兵型选手。看过的小电影比实战次数多，口嗨王者。' },
  normal: { name: '正常人类', emoji: '🧑', desc: '经验不多不少，刚好够用。有过一些经历，对这个领域有基本的认知。' },
  veteran: { name: '身经百战', emoji: '⚔️', desc: '老司机一枚。各种场面都见过，什么套路都懂，朋友眼中的情感导师。' },
  master: { name: '究极老司机', emoji: '🏆', desc: '理论实践双丰收。你的朋友们有情感问题第一个想到的就是你。' },
  legend: { name: '都市传说', emoji: '👑', desc: '传说中的人物。你的经历可以写进都市怪谈，是别人口中"我有一个朋友"的那个朋友。' },
}

const DIMENSION_NAMES: Record<string, string> = {
  theoretical: '理论知识',
  practical: '实战经验',
  diversity: '涉猎广度',
  openness: '开放程度',
  technique: '技巧掌握',
}

const FUN_FACTS = [
  '据统计，人一生平均会接吻超过20000次',
  '全球首次性行为平均年龄约为17岁',
  '性学家研究表明：健康的性生活可以延长寿命',
  '良好的亲密关系是最好的护肤品',
  '柏拉图式恋爱也是一种选择',
]

export function calculateSexualExperience(answers: Answer[]): SexualExperienceResult {
  const dimensions = {
    theoretical: 0,
    practical: 0,
    diversity: 0,
    openness: 0,
    technique: 0,
  }

  const dimensionCount: Record<string, number> = {}
  Object.keys(dimensions).forEach(k => dimensionCount[k] = 0)

  answers.forEach(answer => {
    const dim = answer.dimension || ''
    const value = typeof answer.value === 'number' ? answer.value : 1
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
  const experienceIndex = Math.round(rawScore / 5)

  let classification: SexualExperienceResult['classification']
  if (experienceIndex >= 90) classification = 'legend'
  else if (experienceIndex >= 75) classification = 'master'
  else if (experienceIndex >= 55) classification = 'veteran'
  else if (experienceIndex >= 35) classification = 'normal'
  else if (experienceIndex >= 15) classification = 'rookie'
  else classification = 'virgin'

  const config = CLASSIFICATIONS[classification]

  const dimensionDescriptions: Record<string, string> = {
    theoretical: dimensions.theoretical >= 80
      ? '熟背各种姿势大全，专业术语张口就来'
      : dimensions.theoretical >= 50
        ? '看过不少教学视频，理论基础扎实'
        : dimensions.theoretical >= 25
          ? '知道一些基本常识'
          : '这题超纲了，完全不懂',
    practical: dimensions.practical >= 80
      ? '身经百战，各种大风大浪都见过'
      : dimensions.practical >= 50
        ? '有过一些实际经验'
        : dimensions.practical >= 25
          ? '有过入门级体验'
          : '理论王者，实战青铜，说的就是你',
    diversity: dimensions.diversity >= 80
      ? '敢于尝试各种新鲜事物，生命在于体验'
      : dimensions.diversity >= 50
        ? '不排斥，但也不会主动尝试'
        : dimensions.diversity >= 25
          ? '还是传统一点比较好'
          : '一生一世一双人就是我的信条',
    openness: dimensions.openness >= 80
      ? '性是很正常很美好的事情，没什么不能谈的'
      : dimensions.openness >= 50
        ? '可以和亲密的人讨论相关话题'
        : dimensions.openness >= 25
          ? '有点害羞，但也不是完全不能接受'
          : '好羞耻，不要问我这种问题',
    technique: dimensions.technique >= 80
      ? '五星好评，业界公认的顶级选手'
      : dimensions.technique >= 50
        ? '技术还不错，能让对方满意'
        : dimensions.technique >= 25
          ? '还在学习中，未来可期'
          : '顺其自然，有爱就好',
  }

  let experienceRank = ''
  if (classification === 'legend') experienceRank = '🏆 您的经验超越了全球99%的人类'
  else if (classification === 'master') experienceRank = '🥇 您的经验超越了全球90%的人类'
  else if (classification === 'veteran') experienceRank = '🥈 您的经验超越了全球70%的人类'
  else if (classification === 'normal') experienceRank = '🥉 您的经验超越了全球50%的人类'
  else if (classification === 'rookie') experienceRank = '📈 您还需要继续努力'
  else experienceRank = '🌟 您是这个时代珍稀的纯爱战神'

  const peerComparison = experienceIndex >= 60
    ? `恭喜！您的经验指数 ${experienceIndex} 分，显著高于同龄人平均水平`
    : experienceIndex >= 40
      ? `您的经验指数 ${experienceIndex} 分，处于人类正常水平`
      : `您的经验指数 ${experienceIndex} 分，属于珍稀保护动物级别`

  const lifeAdvice = [
    experienceIndex < 20 ? '💡 纯爱是最珍贵的品质，不要为了攀比而焦虑' : '💡 经验多少不重要，重要的是和喜欢的人一起体验',
    '安全永远是第一位的，保护自己也保护对方',
    '良好的沟通是和谐关系的基础',
    '每个人的节奏都不一样，不要被peer pressure绑架',
    '爱是比技巧更重要的东西',
  ]

  return {
    rawScore,
    experienceIndex,
    classification,
    classificationEmoji: config.emoji,
    dimensions,
    title: '性经验指数测评报告',
    description: config.desc,
    levelName: config.name,
    dimensionDescriptions,
    funFacts: FUN_FACTS,
    experienceRank,
    peerComparison,
    lifeAdvice,
  }
}
