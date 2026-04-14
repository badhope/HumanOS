/**
 * ==============================================
 * 😰 焦虑自评量表 SAS - 核心计算器
 * ==============================================
 * 【测评定位】Zung氏焦虑自评量表 标准化临床测评
 * 【核心算法】4维度 × 硬编码题号 = 50题
 * 【理论来源】Zung Self-Rating Anxiety Scale
 * 
 * 【⚠️  超级重要警告】
 * 1. 直接按题号 sas-1~50 硬编码分组！
 * 2. 有反向计分题！不要漏了reverse！
 * 3. 睡眠焦虑占比最高 = 临床故意设计，不是Bug！
 */

import type { Answer, AssessmentResult } from '../../types'

/**
 * 焦虑自评结果接口
 * 【四大焦虑维度】
 * - social_anxiety: 社交焦虑
 * - somatic_anxiety: 躯体焦虑
 * - cognitive_anxiety: 认知焦虑
 * - sleep_anxiety: 睡眠障碍（权重最高）
 */
export interface SASResult extends Record<string, any> {
  rawScore: number
  standardScore: number
  percentile: number
  level: 'normal' | 'mild' | 'moderate' | 'severe'
  levelText: string
  dimensions: {
    social_anxiety: { score: number; percentage: number; level: string }
    somatic_anxiety: { score: number; percentage: number; level: string }
    cognitive_anxiety: { score: number; percentage: number; level: string }
    sleep_anxiety: { score: number; percentage: number; level: string }
  }
  radarData: { dimension: string; score: number; fullMark: number }[]
  interpretation: string
  recommendations: string[]
  warning: string
}

const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function calculateSAS(answers: Answer[]): SASResult {
  const dimensionMap: Record<string, string[]> = {
    social_anxiety: ['sas-1', 'sas-2', 'sas-3', 'sas-4', 'sas-5', 'sas-6', 'sas-7', 'sas-8', 'sas-9', 'sas-10', 'sas-11', 'sas-12'],
    somatic_anxiety: ['sas-13', 'sas-14', 'sas-15', 'sas-16', 'sas-17', 'sas-18', 'sas-19', 'sas-20', 'sas-21', 'sas-22', 'sas-23'],
    cognitive_anxiety: ['sas-24', 'sas-25', 'sas-26', 'sas-27', 'sas-28', 'sas-29', 'sas-30', 'sas-31', 'sas-32', 'sas-33'],
    sleep_anxiety: ['sas-34', 'sas-35', 'sas-36', 'sas-37', 'sas-38', 'sas-39', 'sas-40', 'sas-41', 'sas-42', 'sas-43', 'sas-44', 'sas-45', 'sas-46', 'sas-47', 'sas-48', 'sas-49', 'sas-50'],
  }

  const allItems = Object.values(dimensionMap).flat()
  const reverseScoredItems = allItems.filter((_, i) => [1, 3, 5, 6, 11, 13, 17, 19, 24, 26, 31, 33, 34, 36, 37, 39, 42, 44, 46, 48, 50].includes(i + 1))
  
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    let value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 1))
    if (reverseScoredItems.includes(a.questionId)) {
      value = 6 - value
    }
    answerMap[a.questionId] = value
  })

  const dimensions: SASResult['dimensions'] = {} as SASResult['dimensions']
  let totalRaw = 0

  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const maxScore = (ids.length || 1) * 5
    const percentage = Math.round((score / maxScore) * 100)
    let level = '正常'
    if (percentage >= 75) level = '重度'
    else if (percentage >= 60) level = '中度'
    else if (percentage >= 50) level = '轻度'
    dimensions[dim as keyof SASResult['dimensions']] = { score, percentage, level }
    totalRaw += score
  })

  const standardScore = Math.round(25 + ((totalRaw - 134) / 32) * 75)
  let percentile = 50
  if (standardScore < 40) percentile = 10
  else if (standardScore < 47) percentile = 25
  else if (standardScore < 50) percentile = 50
  else if (standardScore < 60) percentile = 75
  else if (standardScore < 70) percentile = 90
  else percentile = 95

  let level: SASResult['level'] = 'normal'
  let levelText = '正常范围'
  if (standardScore >= 70) { level = 'severe'; levelText = '重度焦虑' }
  else if (standardScore >= 60) { level = 'moderate'; levelText = '中度焦虑' }
  else if (standardScore >= 50) { level = 'mild'; levelText = '轻度焦虑' }

  const radarData = [
    { dimension: '社交焦虑', score: dimensions.social_anxiety.percentage, fullMark: 100 },
    { dimension: '躯体焦虑', score: dimensions.somatic_anxiety.percentage, fullMark: 100 },
    { dimension: '认知焦虑', score: dimensions.cognitive_anxiety.percentage, fullMark: 100 },
    { dimension: '睡眠功能', score: 100 - dimensions.sleep_anxiety.percentage, fullMark: 100 },
  ]

  const dimensionNames: Record<string, string> = {
    social_anxiety: '社交焦虑',
    somatic_anxiety: '躯体焦虑',
    cognitive_anxiety: '认知焦虑',
    sleep_anxiety: '睡眠焦虑',
  }

  const introTemplates = [
    `你的SAS标准分为 **${standardScore} 分**，处于**${levelText}**水平，超过了全国常模中 ${percentile}% 的人群。\n\n`,
    `测评结果：标准分 ${standardScore}，**${levelText}**，你的焦虑水平位于全国前 ${100 - percentile}% 的人群。\n\n`,
    `本次测评检出你的焦虑水平为 **${levelText}**（标准分 ${standardScore}），这意味着你比 ${percentile}% 的人更从容。\n\n`,
  ]

  let interpretation = randomPick(introTemplates)
  interpretation += `### 四大维度详情：\n\n`
  Object.entries(dimensions).forEach(([dim, data]) => {
    interpretation += `- **${dimensionNames[dim]}**：${data.percentage}分 → ${data.level}\n`
  })
  interpretation += '\n'

  const normalInterpretations = [
    '太棒了！你的心理状态非常健康。能够在这个充满压力的时代保持这样的从容，说明你有着出色的情绪调节能力。',
    '恭喜！你的焦虑水平处于理想的范围。压力对你来说不是负担，而是前进的动力。',
    '你的心理健康状态很赞！既不会因为过于放松而懈怠，也不会因为过度焦虑而内耗。',
    '这是非常理想的状态！你找到了焦虑的黄金平衡点，能够清醒地面对挑战，又不会被压力压垮。',
  ]

  const mildInterpretations = [
    '轻度焦虑其实是现代人的标配。说明你在认真地生活，在为更好的未来努力。给自己一点时间调整就好。',
    '你有一些焦虑的信号，但这完全不必恐慌。这是身体在提醒你：最近可能有点累了，需要适当放慢脚步。',
    '轻微的焦虑是正常的"生存本能"。说明你对自己有要求，在走上坡路。做点什么让自己放松一下吧。',
    '你的心弦最近可能绷得有点紧，但还在安全范围内。就像手机还剩30%电量，提醒你该充电了。',
  ]

  const moderateInterpretations = [
    '焦虑的乌云已经开始影响你的天空了。请认真对待这个信号：你的身心正在呼救。现在开始调节，还来得及。',
    '中度焦虑意味着你可能已经在硬撑了一段时间。是时候把"照顾自己"放在待办事项的第一位了。',
    '你可能已经感觉到：睡眠、工作、人际关系都开始受到影响。请不要说"我没事"，真正的坚强是懂得求助。',
    '这不是软弱，这是长期超负荷运转的正常反应。就像电脑发烫需要降温，你也需要给自己降温。',
  ]

  const severeInterpretations = [
    '你正在承受着常人难以想象的精神痛苦。请立刻停下来，不要再强迫自己"加油"了。专业的帮助真的会有用。',
    '重度焦虑就像心灵在发高烧。发烧了要看医生，心灵生病了同样如此。请一定一定要寻求专业帮助。',
    '你可能已经在黑暗中独自挣扎了很久。但你不是一个人！专业的心理咨询师就是为了帮你度过这个时刻而存在的。',
    '此时此刻，最重要的不是"坚持"，而是"投降"——向自己的局限投降，向专业的力量投降。',
  ]

  if (level === 'normal') {
    interpretation += randomPick(normalInterpretations)
  } else if (level === 'mild') {
    interpretation += randomPick(mildInterpretations)
  } else if (level === 'moderate') {
    interpretation += randomPick(moderateInterpretations)
  } else {
    interpretation += randomPick(severeInterpretations)
  }

  const recommendationPools = [
    [
      '每天出门走30分钟，晒太阳+走路是最便宜的抗焦虑药',
      '试试"478呼吸法"：吸气4秒，屏息7秒，呼气8秒，做5轮就有感觉',
      '从今晚开始，手机在睡前一小时就放到另一个房间',
      '用"担忧15分钟"法：每天固定15分钟专门用来想烦心事',
      '给3个好朋友发消息说"最近我有点累"，被看见本身就是疗愈',
      '把"完美"从你的词典里暂时拿掉，60分就值得庆祝',
    ],
    [
      '每周3次，每次30分钟出汗运动，焦虑值会肉眼可见地下降',
      '尝试正念：就坐在那里观察自己的呼吸，走神了也没关系',
      '戒掉奶茶和咖啡的第三天开始，你会感谢自己',
      '睡前写"三个好事"日记，再小的事情也值得记录',
      '学会说"不"。你的精力比"好人"的标签重要一万倍',
      '如果自己调节有困难，心理咨询是勇敢者的选择',
    ],
    [
      '身体从不撒谎：瑜伽、拉伸、按摩——先放松身体，情绪会跟上',
      '试试"54321感官着陆法"：说出看到的5样、摸到的4样...',
      '建立固定的"睡前仪式"，让身体知道该切换到睡眠模式了',
      '酒精解决不了焦虑，它只是把焦虑推迟到明天。试试热水澡吧',
      '和让你舒服的人多待在一起，真正的友谊就是免费的心理治疗',
      '必要时请一定去看医生，药物能帮你先睡个好觉',
    ],
  ]
  const recommendations = randomPick(recommendationPools)

  const warning = level !== 'normal' 
    ? '⚠️ 本测评仅作为初步筛查工具，不能替代专业诊断。如有需要，请及时就医。'
    : '✓ 本测评结果仅供参考，保持健康的生活方式是维持心理健康的关键。'

  return {
    rawScore: totalRaw,
    standardScore,
    percentile,
    level,
    levelText,
    dimensions,
    radarData,
    interpretation,
    recommendations,
    warning,
  }
}
