/**
 * ==============================================
 * 🐟 摸鱼纯度测评 - 核心计算器
 * ==============================================
 * 【测评定位】打工人职场生存技能鉴定
 * 【核心算法】演技水平 + 时间管理 + 理由储备 + 反侦察能力 + 心态
 */

import type { Answer } from '../../types'

/**
 * 【⚠️  超级重要警告】
 * 1. 这里的 dimension key 必须与题目文件的 dimension 100% 一致！
 *    不一致 = 对应维度分数永远是 0！
 * 2. 这里的字段名必须与 ReportTemplate.tsx 中使用的完全一致！
 *    不一致 = Report 里 result.xxx 返回 undefined = 页面空白！
 */
export interface SlackingResult extends Record<string, any> {
  rawScore: number
  slackingIndex: number
  classification: 'god' | 'master' | 'normal' | 'worker' | 'slave'
  classificationEmoji: string
  dimensions: {
    meetingEvading: number
    pretendWorking: number
    toiletEscape: number
    overtimeResistance: number
    gossipExpert: number
  }
  title: string
  description: string
  levelName: string
  dimensionDescriptions: Record<string, string>
  slackingQuotes: string[]
  slackingRank: string
  slackingTips: string[]
  anti996Level: string
}

const CLASSIFICATIONS = {
  god: { name: '摸鱼之神', emoji: '🐟', desc: '公司就是我的带薪拉屎场所。一天工作10分钟，剩下7小时50分全在摸鱼，老板还觉得你很努力。' },
  master: { name: '摸鱼大师', emoji: '🎣', desc: '摸鱼界的扛把子。带薪拉屎一小时，老板路过我还在敲键盘。' },
  normal: { name: '正常摸鱼', emoji: '🦥', desc: '该干活干活，该摸鱼摸鱼。劳逸结合，不卷不躺。' },
  worker: { name: '老实人', emoji: '🐮', desc: '老板说什么就做什么，叫加班就加班。摸鱼是什么？能吃吗？' },
  slave: { name: '社畜本畜', emoji: '💪', desc: '卷王本王。别人摸鱼我工作，别人下班我加班。老板的好员工，同事的眼中钉。' },
}

const DIMENSION_NAMES: Record<string, string> = {
  meetingEvading: '逃会技巧',
  pretendWorking: '假装工作',
  toiletEscape: '厕所遁术',
  overtimeResistance: '反加班',
  gossipExpert: '八卦专家',
}

const SLACKING_QUOTES = [
  '上班不摸鱼，不如回家卖鱼',
  '工作是为了摸鱼，摸鱼才是正经事',
  '只要我摸鱼摸得够快，焦虑就追不上我',
  '摸鱼一时爽，一直摸鱼一直爽',
  '带薪拉屎是打工人最后的倔强',
]

export function calculateSlacking(answers: Answer[]): SlackingResult {
  const dimensions = {
    meetingEvading: 0,
    pretendWorking: 0,
    toiletEscape: 0,
    overtimeResistance: 0,
    gossipExpert: 0,
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
  const slackingIndex = Math.round(rawScore / 5)

  let classification: SlackingResult['classification']
  if (slackingIndex >= 85) classification = 'god'
  else if (slackingIndex >= 65) classification = 'master'
  else if (slackingIndex >= 45) classification = 'normal'
  else if (slackingIndex >= 25) classification = 'worker'
  else classification = 'slave'

  const config = CLASSIFICATIONS[classification]

  const dimensionDescriptions: Record<string, string> = {
    meetingEvading: dimensions.meetingEvading >= 80
      ? '开会永远不在工位，电话永远接不通'
      : dimensions.meetingEvading >= 50
        ? '能不参加的会绝不参加'
        : dimensions.meetingEvading >= 25
          ? '尽量少开会，但躲不过的也没办法'
          : '开会积极分子，每次必到还抢着发言',
    pretendWorking: dimensions.pretendWorking >= 80
      ? '老板路过我永远在高速敲键盘'
      : dimensions.pretendWorking >= 50
        ? '表面工作做得很到位'
        : dimensions.pretendWorking >= 25
          ? '偶尔会假装很忙'
          : '摸鱼太明显，老板已经看你不爽了',
    toiletEscape: dimensions.toiletEscape >= 80
      ? '带薪拉屎王者，一次40分钟起步'
      : dimensions.toiletEscape >= 50
        ? '厕所是我第二个家'
        : dimensions.toiletEscape >= 25
          ? '每天上几次厕所放空一下'
          : '直肠子，5分钟解决战斗',
    overtimeResistance: dimensions.overtimeResistance >= 80
      ? '到点就走，谁叫加班都不好使'
      : dimensions.overtimeResistance >= 50
        ? '没事绝不加班，有事尽量早点走'
        : dimensions.overtimeResistance >= 25
          ? '实在没办法才会加一下班'
          : '主动加班，还劝同事一起卷',
    gossipExpert: dimensions.gossipExpert >= 80
      ? '全公司的瓜都逃不过我的耳朵'
      : dimensions.gossipExpert >= 50
        ? '八卦信息站，啥都知道一点'
        : dimensions.gossipExpert >= 25
          ? '偶尔参与一下办公室八卦'
          : '两耳不闻窗外事，一心只想写代码',
  }

  let slackingRank = ''
  if (classification === 'god') slackingRank = '🐟 摸鱼等级：SSS级 摸鱼之神'
  else if (classification === 'master') slackingRank = '🎣 摸鱼等级：S级 摸鱼大师'
  else if (classification === 'normal') slackingRank = '🦥 摸鱼等级：A级 普通摸鱼人'
  else if (classification === 'worker') slackingRank = '🐮 摸鱼等级：C级 老实人'
  else slackingRank = '💪 摸鱼等级：E级 卷王本王'

  const anti996Level = slackingIndex >= 80
    ? '🌈 反996指数：100% 摸鱼就是革命！'
    : slackingIndex >= 60
      ? '✊ 反996指数：70% 摸鱼是打工人的觉醒'
      : slackingIndex >= 40
        ? '😐 反996指数：50% 还行，偶尔摸一下'
        : '🔴 反996指数：20% 卷，接着卷！'

  const slackingTips = [
    slackingIndex < 30 ? '⚠️ 忠告：别卷了，命重要' : '💡 温馨提示：摸鱼也要讲究基本法，别太过分',
    '老板过来的时候不要刷微博，要刷GitHub',
    '摸鱼的时候表情要严肃，好像在思考什么重大问题',
    '带耳机不一定是在听歌，很可能是在摸鱼',
    '多去茶水间接水，多去厕所放空，有益身心健康',
  ]

  return {
    rawScore,
    slackingIndex,
    classification,
    classificationEmoji: config.emoji,
    dimensions,
    title: '摸鱼纯度测评报告',
    description: config.desc,
    levelName: config.name,
    dimensionDescriptions,
    slackingQuotes: SLACKING_QUOTES,
    slackingRank,
    slackingTips,
    anti996Level,
  }
}
