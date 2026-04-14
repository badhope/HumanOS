/**
 * ==============================================
 * 💰 福报指数测评 - 核心计算器
 * ==============================================
 * 【测评定位】打工人PUA感染程度鉴定
 * 【核心算法】5维度 × 5题/维度 = 25题
 * 【⚠️  超级重要警告】
 * 1. 【危险！】这个计算器按题目dimension累加！
 *    题目文件的dimension拼写错了 → 对应维度永远0分！
 * 2. 这里的dimension key 必须与题目文件100%一致！
 * 3. 改了dimension名三处必须一起改：题目→计算器→Report！
 */

import type { Answer } from '../../types'

/**
 * 福报指数结果接口定义
 * 【五大福报维度】
 * - overtimeAcceptance: 加班接受度
 * - bossWorship: 老板崇拜
 * - sacrificeWillingness: 牺牲意愿
 * - gratitudeLevel: 感恩等级
 * - struggleBelief: 奋斗信仰
 */
export interface FuBaoResult extends Record<string, any> {
  rawScore: number
  fubaoIndex: number
  percentile: number
  classification: 'martyr' | 'model' | 'normal' | 'awakened' | 'rebel'
  classificationEmoji: string
  dimensions: {
    overtimeAcceptance: number
    bossWorship: number
    sacrificeWillingness: number
    gratitudeLevel: number
    struggleBelief: number
  }
  title: string
  description: string
  levelName: string
  dimensionDescriptions: Record<string, string>
  corporateQuotes: string[]
  lifeAdvice: string
  projection: string
}

const CLASSIFICATIONS = {
  martyr: { name: '福报烈士', emoji: '⚰️', desc: '公司就是我的家，老板就是我亲爹。加班使我快乐，福报使我升华。' },
  model: { name: '福报楷模', emoji: '🏆', desc: '996是修来的缘分，能加班是前世的福报。' },
  normal: { name: '福报打工人', emoji: '👷', desc: '加班虽苦，但房贷更苦。福报好不好，看工资发多少。' },
  awakened: { name: '觉醒之人', emoji: '🧠', desc: '看透了福报的本质，工作是为了生活，生活不是为了工作。' },
  rebel: { name: '反福报斗士', emoji: '⚔️', desc: '拒绝PUA，反对加班，准时下班是打工人的神圣不可侵犯的权利！' },
}

const DIMENSION_NAMES: Record<string, string> = {
  overtimeAcceptance: '加班接受度',
  bossWorship: '老板崇拜度',
  sacrificeWillingness: '牺牲意愿',
  gratitudeLevel: '感恩程度',
  struggleBelief: '奋斗信念',
}

const CORPORATE_QUOTES = [
  '—— 年轻人不要老想着钱，要多想想你能为公司创造什么价值',
  '—— 能在我们公司加班是你们的福报，很多人想来都没这个机会',
  '—— 你看那些优秀的人，哪个不是凌晨两三点还在工作',
  '—— 现在辛苦几年，将来就可以早点退休了',
  '—— 我们是创业公司，要有一点奉献精神',
]

export function calculateFuBao(answers: Answer[]): FuBaoResult {
  const dimensions = {
    overtimeAcceptance: 0,
    bossWorship: 0,
    sacrificeWillingness: 0,
    gratitudeLevel: 0,
    struggleBelief: 0,
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
      dimensions[key as keyof typeof dimensions] /= dimensionCount[key]
    }
  })

  const rawScore = Object.values(dimensions).reduce((a, b) => a + b, 0)
  const fubaoIndex = Math.round(rawScore * 100 / 25)

  let classification: FuBaoResult['classification']
  if (fubaoIndex >= 85) classification = 'martyr'
  else if (fubaoIndex >= 70) classification = 'model'
  else if (fubaoIndex >= 50) classification = 'normal'
  else if (fubaoIndex >= 30) classification = 'awakened'
  else classification = 'rebel'

  const config = CLASSIFICATIONS[classification]

  const dimensionDescriptions: Record<string, string> = {
    overtimeAcceptance: dimensions.overtimeAcceptance >= 4 
      ? '主动申请加班，周末没事就来公司转转' 
      : dimensions.overtimeAcceptance >= 3
        ? '老板不走我不走，大家都在我也留'
        : '到点就收拾东西，多待一分钟都是损失',
    bossWorship: dimensions.bossWorship >= 4
      ? '老板说的都是对的，老板朋友圈必点赞'
      : dimensions.bossWorship >= 3
        ? '老板指令坚决执行，有意见私下再说'
        : '老板画的饼，我一眼就能看穿',
    sacrificeWillingness: dimensions.sacrificeWillingness >= 4
      ? '婚假只休3天，产假休完立刻返岗'
      : dimensions.sacrificeWillingness >= 3
        ? '家人重要，但项目上线更重要'
        : '家人健康第一，公司电话下班后免打扰',
    gratitudeLevel: dimensions.gratitudeLevel >= 4
      ? '感谢公司给我这个加班的机会'
      : dimensions.gratitudeLevel >= 3
        ? '发工资的时候还是挺感谢公司的'
        : '我干活你给钱，等价交换谈什么感恩',
    struggleBelief: dimensions.struggleBelief >= 4
      ? '今天的奋斗是明天的福报'
      : dimensions.struggleBelief >= 3
        ? '奋斗还是要的，但不能瞎奋斗'
        : '奋斗B的本质是内卷，我选择躺平',
  }

  let projection = ''
  if (classification === 'martyr') {
    projection = '预测：35岁达到人生巅峰 —— 被公司输送到社会输送人才，带着一身脂肪肝和腰椎间盘突出，光荣毕业！'
  } else if (classification === 'model') {
    projection = '预测：有望成为部门骨干，每年能拿一次"优秀员工"奖状（价值500元购物卡），代价是少活3年。'
  } else if (classification === 'normal') {
    projection = '预测：普普通通打工人，该加班加班，该摸鱼摸鱼，不求大富大贵，但求平安退休。'
  } else if (classification === 'awakened') {
    projection = '预测：工作生活平衡大师，下班失联第一人。晋升慢但快乐多，头发比同龄人多30%。'
  } else {
    projection = '预测：有望成为劳动仲裁小能手，HR黑名单常驻嘉宾。宁可不工作，也不能被工作强奸！'
  }

  return {
    rawScore,
    fubaoIndex,
    percentile: Math.min(99, Math.round((fubaoIndex - 20) * 1.2)),
    classification,
    classificationEmoji: config.emoji,
    dimensions,
    title: '福报指数测评报告',
    description: config.desc,
    levelName: config.name,
    dimensionDescriptions,
    corporateQuotes: CORPORATE_QUOTES,
    lifeAdvice: classification === 'rebel' || classification === 'awakened'
      ? '保持清醒，拒绝PUA。记住：公司是老板的，身体是自己的。'
      : '工作重要，健康更重要。加班可以，但请务必记得要加班费。',
    projection,
  }
}
