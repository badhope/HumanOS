/**
 * ==============================================
 * 🛡️ PUA 抵抗力测评 - 核心计算器
 * ==============================================
 * 【测评定位】精神控制免疫能力鉴定
 * 【核心算法】5维度 × 10题/维度 = 50题
 * 
 * ==============================================
 * 🤖 AI编码契约 - 大模型修改此文件必须遵守！
 * ==============================================
 * 🔴 绝对禁止的操作：
 * 1. 不准修改PUAResult接口的任何字段名
 * 2. 不准修改5个dimension的key名（gaslightResistance等）
 * 3. 不准修改第116行开始的维度映射字符串
 * 4. 不准修改分类阈值
 * 
 * 🟡 修改前必须完成的三方校验：
 * 1. 所有dimension值必须与pua-resistance.ts的题目100%一致
 * 2. 所有key必须与PUAReport组件中的雷达图labels一致
 * 3. 新增题目时必须同时更新这里的dimension映射
 * 
 * 🟢 允许的操作：
 * - 调整描述文本
 * - 新增防御建议条目
 * 
 * 【⚠️  血泪教训！】
 * 题目dimension拼错，这里不改 = 对应维度永远是0分！
 * 改了dimension名必须同时改：【题目文件】→【这里】→【Report组件】
 */

import type { Answer } from '../../types'

/**
 * PUA抵抗力结果接口定义
 * 【五大防御维度】
 * - gaslightResistance: 煤气灯抵抗力
 * - boundaryAwareness: 边界意识
 * - emotionalIndependence: 情感独立
 * - criticalThinking: 批判性思维
 * - selfEsteem: 自尊水平
 */
export interface PUAResult extends Record<string, any> {
  rawScore: number
  puaResistance: number
  percentile: number
  classification: 'immune' | 'awake' | 'normal' | 'vulnerable' | 'victim'
  classificationEmoji: string
  dimensions: {
    gaslightResistance: number
    boundaryAwareness: number
    emotionalIndependence: number
    criticalThinking: number
    selfEsteem: number
  }
  title: string
  description: string
  levelName: string
  dimensionDescriptions: Record<string, string>
  puaQuotes: string[]
  selfDefenseGuide: string[]
  warningLevel: string
}

const CLASSIFICATIONS = {
  immune: { name: 'PUA 免疫体', emoji: '🛡️', desc: '油盐不进，刀枪不入。PUA大师的克星，精神控制绝缘体。谁敢PUA你，你就PUA谁。' },
  awake: { name: 'PUA 觉醒者', emoji: '👁️', desc: '一眼看穿所有套路。PUA的每一句话在你听来都是笑点。内心毫无波动，甚至想笑。' },
  normal: { name: '普通人', emoji: '🧑', desc: '大部分时候能保持清醒，但遇到高手还是可能被套路。有一定的免疫力但还需加强。' },
  vulnerable: { name: '易感人群', emoji: '😔', desc: '心地善良，容易相信别人。别人说什么就信什么，是PUA最喜欢的类型。' },
  victim: { name: '重灾区', emoji: '💔', desc: 'PUA重灾区患者。需要立刻进行系统性脱敏治疗，重建自我价值体系。' },
}

const DIMENSION_NAMES: Record<string, string> = {
  gaslightResistance: '反煤气灯',
  boundaryAwareness: '边界意识',
  emotionalIndependence: '情感独立',
  criticalThinking: '批判思维',
  selfEsteem: '自尊水平',
}

const PUA_QUOTES = [
  '"我这么做都是因为我爱你"',
  '"别人怎么都没问题，就你事多"',
  '"我都是为了你好"',
  '"你要是这么想我也没办法"',
  '"你还不够成熟，太情绪化了"',
]

export function calculatePUA(answers: Answer[]): PUAResult {
  const dimensions = {
    gaslightResistance: 0,
    boundaryAwareness: 0,
    emotionalIndependence: 0,
    criticalThinking: 0,
    selfEsteem: 0,
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
  const puaResistance = Math.round((25 - rawScore) * 100 / 20)

  let classification: PUAResult['classification']
  if (puaResistance >= 85) classification = 'immune'
  else if (puaResistance >= 70) classification = 'awake'
  else if (puaResistance >= 50) classification = 'normal'
  else if (puaResistance >= 30) classification = 'vulnerable'
  else classification = 'victim'

  const config = CLASSIFICATIONS[classification]

  const dimensionDescriptions: Record<string, string> = {
    gaslightResistance: dimensions.gaslightResistance >= 4
      ? '对方刚开口，你就知道他要开始煤气灯了'
      : dimensions.gaslightResistance >= 3
        ? '有时会被绕进去，但总能反应过来'
        : '经常怀疑是不是自己真的错了',
    boundaryAwareness: dimensions.boundaryAwareness >= 4
      ? '我的边界神圣不可侵犯，敢越界立刻翻脸'
      : dimensions.boundaryAwareness >= 3
        ? '有边界意识，但不好意思拒绝别人'
        : '别人说什么都答应，不知道什么叫边界',
    emotionalIndependence: dimensions.emotionalIndependence >= 4
      ? '我的情绪我做主，谁也别想影响我'
      : dimensions.emotionalIndependence >= 3
        ? '大多数时候能保持情绪稳定'
        : '很容易被别人的评价影响心情',
    criticalThinking: dimensions.criticalThinking >= 4
      ? '凡事问三个为什么，从不轻易相信'
      : dimensions.criticalThinking >= 3
        ? '会思考，但偶尔还是会被带节奏'
        : '别人说什么信什么，独立思考是什么',
    selfEsteem: dimensions.selfEsteem >= 4
      ? '我就是最棒的，你说我不好是你眼睛瞎'
      : dimensions.selfEsteem >= 3
        ? '基本自信，偶尔自我怀疑'
        : '总觉得自己不够好，配不上别人',
  }

  const selfDefenseGuide = [
    puaResistance < 50 ? '⚠️ 紧急建议：立刻远离所有让你感到不舒服的人' : '✅ 保持警惕，相信自己的直觉',
    '对方说"都是为了你好"的时候，反问：那你倒是说说具体好在哪？',
    '被指责时，不要急着反思，先想想对方有没有资格说你',
    '真正对你好的人，不会让你一直自我怀疑',
    '你的感受永远是对的，不要因为别人否定自己',
  ]

  let warningLevel = ''
  if (classification === 'immune') warningLevel = '🟢 安全：您是PUA终结者'
  else if (classification === 'awake') warningLevel = '🟢 安全：PUA在您面前都是小丑'
  else if (classification === 'normal') warningLevel = '🟡 注意：遇到高手可能被套路'
  else if (classification === 'vulnerable') warningLevel = '🔴 警告：您是PUA易感人群'
  else warningLevel = '🔴 高危：请立刻进行心理建设'

  return {
    rawScore,
    puaResistance,
    percentile: Math.min(99, Math.round((100 - puaResistance) * 1.5)),
    classification,
    classificationEmoji: config.emoji,
    dimensions,
    title: 'PUA 耐受度测评报告',
    description: config.desc,
    levelName: config.name,
    dimensionDescriptions,
    puaQuotes: PUA_QUOTES,
    selfDefenseGuide,
    warningLevel,
  }
}
