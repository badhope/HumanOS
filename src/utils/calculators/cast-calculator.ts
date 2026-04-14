/**
 * ==============================================
 * 👨‍👩‍👧‍👦 C.A.S.T 中国式家长教养方式测评 - 核心计算器 V2.0
 * ==============================================
 * 【测评定位】当代家长育儿焦虑程度鉴定 + 教养风格画像
 * 
 * 【维度系统】4大主维度 × 4个子维度/维度 = 16个分析视角
 * 
 * 【⚠️  超级重要警告】
 * 1. 按dimensionMap累加计分！
 * 2. 题目ID必须与question文件严格对应
 * 3. 4维度 × 10题/维度 = 40题全覆盖
 */

import type { Answer, AssessmentResult } from '../../types'

/**
 * 【四大主维度 × 四子维度】多视角分析系统
 * 
 * RA: 报班焦虑
 *   ├─ 起跑恐慌: 害怕输在起跑线上的程度
 *   ├─ 补习狂热: 补习班数量和强度
 *   ├─ 时间压榨: 对孩子自由时间的剥夺程度
 *   └─ 金钱投射: 教育支出占收入比例
 * 
 * CM: 攀比狂热
 *   ├─ 横向比较: 与其他家长的比较频率
 *   ├─ 面子执念: 孩子的表现=家长的面子
 *   ├─ 标准异化: 别人家的孩子标准
 *   └─ 价值外化: 通过孩子证明自我价值
 * 
 * CO: 阶层执念
 *   ├─ 学历崇拜: 名校情结严重程度
 *   ├─ 就业焦虑: 对未来阶层滑落的恐惧
 *   ├─ 城市执念: 对一线户口学区房的执念
 *   └─ 职业鄙视链: 体制内>大厂>普通>灵活就业
 * 
 * MK: 道德绑架
 *   ├─ 牺牲叙事: "我都是为了你"频率
 *   ├─ 愧疚操纵: 用付出感绑架孩子
 *   ├─ 人生补偿: 把未完成梦想强加给孩子
 *   └─ 边界消融: 你的人生就是我的人生
 */
export interface CASTResult extends Record<string, any> {
  rawScore: number
  castIndex: number
  percentile: number
  classification: 'godlike' | 'tiger' | 'chicken' | 'moderate' | 'buddha' | 'absent'
  classificationEmoji: string
  dimensions: {
    reportAnxiety: number
    comparisonMania: number
    classObsession: number
    moralityKidnapping: number
  }
  subDimensions: Record<string, { name: string; score: number }[]>
  radarData: { dimension: string; score: number; fullMark: number }[]
  typeDescription: string
  famousParents: string[]
  childFutureProjection: string
  classicQuotes: string[]
  redemptionGuide: string[]
  parentingMatrix: {
    controlLevel: '高控' | '适中' | '放养'
    anxietyLevel: '焦虑型' | '平稳型' | '佛性'
    warmthLevel: '温暖型' | '中立型' | '疏离型'
  }
  parentingStyleArchetype: {
    name: string
    emoji: string
    description: string
  }
  interpretiveNotes: string[]
}

const CLASSIFICATION_NAMES: Record<CASTResult['classification'], string> = {
  godlike: '🏆 玉皇大帝型',
  tiger: '🐯 虎爸虎妈型',
  chicken: '🐔 鸡血型',
  moderate: '🐣 理性平衡型',
  buddha: '🧘 佛性养娃型',
  absent: '👻 甩手掌柜型',
}

const CLASSIFICATION_DESCRIPTIONS: Record<CASTResult['classification'], string> = {
  godlike: '您已达到育儿界的最高境界——全知全能全控。孩子的每一分钟都在您的规划之中，连呼吸的频率都要符合衡水中学标准。您不是在养孩子，您是在运营一家千亿市值IPO公司。',
  tiger: '标准虎爸虎妈。小学就要学微积分，幼儿园就要过PET。别家孩子已经开始背道德经了，我们的孩子怎么能输在起跑线上？',
  chicken: '间歇性鸡血，持续性焦虑。报了20个兴趣班，买了500本育儿书，虽然不知道有没有用，但不报就是对不起孩子。',
  moderate: '大多数中国家长的常态。鸡血和佛性反复横跳，时而焦虑时而淡定。既要孩子成绩好，又要孩子快乐成长。',
  buddha: '儿孙自有儿孙福，考0分也没关系，健康快乐就好。在这个人人打鸡血的时代，您的淡定是一股清流。',
  absent: '父爱如山...体滑坡，母爱如放...风筝。孩子的班主任姓什么？好像有点印象又好像没有。',
}

const DIMENSION_NAMES = {
  reportAnxiety: '报班焦虑',
  comparisonMania: '攀比狂热',
  classObsession: '阶层执念',
  moralityKidnapping: '道德绑架',
}

const SUB_DIMENSION_NAMES: Record<keyof CASTResult['dimensions'], string[]> = {
  reportAnxiety: ['起跑恐慌', '补习狂热', '时间压榨', '金钱投射'],
  comparisonMania: ['横向比较', '面子执念', '标准异化', '价值外化'],
  classObsession: ['学历崇拜', '就业焦虑', '城市执念', '职业鄙视链'],
  moralityKidnapping: ['牺牲叙事', '愧疚操纵', '人生补偿', '边界消融'],
}

const PARENTING_ARCHETYPES = [
  {
    id: 'gladiator',
    name: '竞技场斗士',
    emoji: '⚔️',
    condition: (d: CASTResult['dimensions']) => d.comparisonMania >= 60,
    description: '育儿对您来说就是一场没有硝烟的战争。每一次考试都是战役，每一个别人家的孩子都是假想敌。',
  },
  {
    id: 'engineer',
    name: '育儿工程师',
    emoji: '�',
    condition: (d: CASTResult['dimensions']) => d.reportAnxiety >= 60,
    description: '您把育儿当作一个工程项目来优化。目标清晰，执行到位，数据驱动。虽然鸡血，但鸡得有章法、有逻辑。',
  },
  {
    id: 'martyrs',
    name: '牺牲型家长',
    emoji: '🕯️',
    condition: (d: CASTResult['dimensions']) => d.moralityKidnapping >= 60,
    description: '您为孩子付出了一切，甚至牺牲了自己的人生。这份爱很沉重，但真实而磅礴。',
  },
  {
    id: 'investment',
    name: '天使投资人',
    emoji: '💰',
    condition: (d: CASTResult['dimensions']) => d.classObsession >= 60,
    description: '您的每一分投入都在计算回报率。教育是您这辈子最大的一笔风险投资。虽然焦虑，但眼光长远。',
  },
  {
    id: 'gardener',
    name: '园丁型家长',
    emoji: '🌱',
    condition: (d: CASTResult['dimensions']) => d.reportAnxiety <= 50 && d.moralityKidnapping <= 50,
    description: '您相信孩子有自己的生长节奏。浇水施肥，阳光雨露，然后静待花开。不催不赶，尊重规律。',
  },
  {
    id: 'friend',
    name: '朋友型家长',
    emoji: '🤝',
    condition: (d: CASTResult['dimensions']) => d.classObsession <= 50 && d.comparisonMania <= 50,
    description: '您和孩子更像是平等的朋友。不控制，不绑架，不焦虑。是这个时代稀有的松弛感。',
  },
  {
    id: 'normal',
    name: '标准中国式家长',
    emoji: '🏠',
    condition: () => true,
    description: '大多数中国家长的真实写照。在鸡血和佛性之间反复横跳，一边焦虑一边自愈。',
  },
]

const CLASSIC_QUOTES = [
  '"我都是为了你好"',
  '"你看别人家的孩子"',
  '"我砸锅卖铁也要供你读书"',
  '"现在辛苦点，以后就幸福了"',
  '"不要让孩子输在起跑线上"',
  '"妈妈当年没条件，现在全给你补上"',
  '"考不上好大学，这辈子就完了"',
  '"别人都报了，我们怎么能不报"',
]

const FAMOUS_PARENTS = [
  '朗朗爸爸', '莫扎特父亲', '虎妈蔡美儿', '任正非', '杨绛钱钟书',
  '傅雷', '梁启超', '曾国藩', '苏洵', '藤校妈'
]

const FUTURE_PROJECTIONS = [
  { threshold: 85, text: '🚀 常春藤保底，清北随意。目标是诺贝尔奖，实在不行就当个院士凑活' },
  { threshold: 70, text: '🎯 985/211是底线，藤校看发挥。毕业后年薪百万是预期，低于50万就是教育失败' },
  { threshold: 50, text: '📚 一本是底线，二本能接受，三本要偷偷哭。有个稳定工作，能养活自己就行' },
  { threshold: 30, text: '🌱 能顺利毕业就行，能找到什么工作看造化。最重要的是开心，以及别啃老' },
  { threshold: 0, text: '🌈 平安健康就好，其他都是浮云。大不了养一辈子，家里又不是没条件' },
]

function calculateSubDimensionScores(mainScore: number, subDimensionNames: string[]): CASTResult['subDimensions'][''] {
  return subDimensionNames.map((name, i) => ({
    name,
    score: Math.max(0, Math.min(100, mainScore + Math.round((Math.random() - 0.5) * 25))),
  }))
}

function determineParentingStyle(dimensions: CASTResult['dimensions']): CASTResult['parentingStyleArchetype'] {
  const matched = PARENTING_ARCHETYPES.find(arch => arch.condition(dimensions))
  if (matched) {
    return { name: matched.name, emoji: matched.emoji, description: matched.description }
  }
  
  const avg = Object.values(dimensions).reduce((a, b) => a + b, 0) / 4
  if (avg >= 60) return {
    name: '标准中国式家长',
    emoji: '🏠',
    description: '集合了当代中国家长的所有典型特质。在鸡血与佛性之间反复横跳，在焦虑与坦然之间艰难平衡。这就是我们大多数人的样子——平凡而真实。',
  }
  return {
    name: '松弛感家长',
    emoji: '🍃',
    description: '您是这个焦虑时代的珍稀物种。不鸡娃，不攀比，不绑架。这种松弛感，是给孩子最好的礼物。',
  }
}

function calculateParentingMatrix(dimensions: CASTResult['dimensions']): CASTResult['parentingMatrix'] {
  const controlScore = (dimensions.reportAnxiety + dimensions.classObsession) / 2
  const anxietyScore = (dimensions.reportAnxiety + dimensions.comparisonMania) / 2
  const warmthScore = 100 - dimensions.moralityKidnapping

  let controlLevel: CASTResult['parentingMatrix']['controlLevel'] = '适中'
  if (controlScore >= 65) controlLevel = '高控'
  else if (controlScore <= 35) controlLevel = '放养'

  let anxietyLevel: CASTResult['parentingMatrix']['anxietyLevel'] = '平稳型'
  if (anxietyScore >= 65) anxietyLevel = '焦虑型'
  else if (anxietyScore <= 35) anxietyLevel = '佛性'

  let warmthLevel: CASTResult['parentingMatrix']['warmthLevel'] = '中立型'
  if (warmthScore >= 65) warmthLevel = '温暖型'
  else if (warmthScore <= 35) warmthLevel = '疏离型'

  return { controlLevel, anxietyLevel, warmthLevel }
}

export function calculateCAST(answers: Answer[]): CASTResult {
  const dimensionMap: Record<keyof CASTResult['dimensions'], string[]> = {
    reportAnxiety: ['cast-1', 'cast-2', 'cast-3', 'cast-4', 'cast-5', 'cast-6', 'cast-7', 'cast-8', 'cast-9', 'cast-10'],
    comparisonMania: ['cast-11', 'cast-12', 'cast-13', 'cast-14', 'cast-15', 'cast-16', 'cast-17', 'cast-18', 'cast-19', 'cast-20'],
    classObsession: ['cast-21', 'cast-22', 'cast-23', 'cast-24', 'cast-25', 'cast-26', 'cast-27', 'cast-28', 'cast-29', 'cast-30'],
    moralityKidnapping: ['cast-31', 'cast-32', 'cast-33', 'cast-34', 'cast-35', 'cast-36', 'cast-37', 'cast-38', 'cast-39', 'cast-40'],
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
  })

  const dimensions: CASTResult['dimensions'] = {} as CASTResult['dimensions']
  let totalRaw = 0

  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const maxScore = ids.length * 5
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 50
    dimensions[dim as keyof CASTResult['dimensions']] = percentage
    totalRaw += score
  })

  const subDimensions: CASTResult['subDimensions'] = {}
  Object.entries(dimensions).forEach(([dim, score]) => {
    const names = SUB_DIMENSION_NAMES[dim as keyof CASTResult['dimensions']]
    subDimensions[dim] = calculateSubDimensionScores(score, names)
  })

  const castIndex = Math.round(50 + ((totalRaw - 84) / 56) * 50)
  let percentile = 50
  if (castIndex >= 90) percentile = 99
  else if (castIndex >= 80) percentile = 95
  else if (castIndex >= 70) percentile = 85
  else if (castIndex >= 60) percentile = 60
  else if (castIndex >= 40) percentile = 40
  else if (castIndex >= 30) percentile = 20
  else percentile = 5

  let classification: CASTResult['classification'] = 'moderate'
  let classificationEmoji = '�'

  if (castIndex >= 90) { classification = 'godlike'; classificationEmoji = '🏆' }
  else if (castIndex >= 78) { classification = 'tiger'; classificationEmoji = '🐯' }
  else if (castIndex >= 62) { classification = 'chicken'; classificationEmoji = '🐔' }
  else if (castIndex >= 46) { classification = 'moderate'; classificationEmoji = '🐣' }
  else if (castIndex >= 28) { classification = 'buddha'; classificationEmoji = '🧘' }
  else { classification = 'absent'; classificationEmoji = '👻' }

  const radarData = [
    { dimension: '报班焦虑', score: dimensions.reportAnxiety, fullMark: 100 },
    { dimension: '攀比狂热', score: dimensions.comparisonMania, fullMark: 100 },
    { dimension: '阶级执念', score: dimensions.classObsession, fullMark: 100 },
    { dimension: '道德绑架', score: dimensions.moralityKidnapping, fullMark: 100 },
  ]

  const parentingMatrix = calculateParentingMatrix(dimensions)
  const parentingStyleArchetype = determineParentingStyle(dimensions)
  const childFutureProjection = FUTURE_PROJECTIONS.find(p => castIndex >= p.threshold)?.text || FUTURE_PROJECTIONS[4].text

  const getRedemptionGuide = () => {
    const guide: string[] = []
    
    if (dimensions.reportAnxiety >= 80) guide.push('⚠️ 一年报超过5个兴趣班 = 花钱买心理安慰。孩子真正学到的还不如家长的焦虑多')
    else if (dimensions.reportAnxiety >= 60) guide.push('📝 报班前先问孩子："你想去吗？"而不是"妈妈都是为了你好"')
    
    if (dimensions.comparisonMania >= 80) guide.push('⚠️ 别人家的孩子=永远追不上的海市蜃楼。你羡慕的只是人家妈妈发的朋友圈')
    else if (dimensions.comparisonMania >= 60) guide.push('🙏 戒掉"你看人家谁谁谁"这句话。每说一次，亲子关系就多一道裂痕')
    
    if (dimensions.classObsession >= 80) guide.push('⚠️ 学区房≠成功人生。很多人终其一生都没发现：自己才是孩子的天花板')
    else if (dimensions.classObsession >= 60) guide.push('💡 考上清北也不等于阶层跃迁。你的认知，才是孩子真正的起跑线')
    
    if (dimensions.moralityKidnapping >= 80) guide.push('⚠️ "我都是为了你好"是最残忍的一句话。孩子不欠你什么，是你选择生下TA')
    else if (dimensions.moralityKidnapping >= 60) guide.push('💔 愧疚感不是爱。真正的爱不需要用牺牲和付出来绑架')
    
    if (castIndex >= 85) guide.push('🚨 放过孩子，也放过自己。你养的是孩子，不是IPO项目')
    if (castIndex <= 20) guide.push('💖 佛系是珍贵的品质，但也别忘了偶尔陪陪孩子。童年很短的')
    
    guide.push('孩子的人生是他们自己的，你只是陪他们走一程的人')
    return guide.slice(0, 6)
  }

  const famousParents = FAMOUS_PARENTS
    .sort(() => Math.random() - 0.5)
    .slice(0, 2 + Math.floor(castIndex / 30))

  const classicQuotes = CLASSIC_QUOTES
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(CLASSIC_QUOTES.length, 3 + Math.floor(castIndex / 25)))

  const typeDescription = CLASSIFICATION_DESCRIPTIONS[classification] +
    `\n\n您的 **CAST育儿焦虑指数为 ${castIndex} 分**，超过了全国 ${percentile}% 的家长。` +
    (castIndex >= 80 ? '\n\n💡 温馨提示：孩子不是你的风险投资，TA不需要向你证明什么。' : '') +
    (castIndex <= 20 ? '\n\n💡 您的淡定在这个时代堪称一股清流。但也别忘了，佛性不等于放养。' : '')

  return {
    rawScore: totalRaw,
    castIndex,
    percentile,
    classification,
    classificationEmoji,
    dimensions,
    subDimensions,
    radarData,
    typeDescription,
    famousParents,
    childFutureProjection,
    classicQuotes,
    redemptionGuide: getRedemptionGuide(),
    parentingMatrix,
    parentingStyleArchetype,
    interpretiveNotes: [
      castIndex >= 85 ? '🏆 育儿界的卷王之王，您就是那个"别人家的家长"' : '',
      castIndex <= 15 ? '🧘 稀有物种！在这个焦虑的时代还能保持平常心实属不易' : '',
      parentingStyleArchetype.name !== '标准中国式家长' ? `${parentingStyleArchetype.emoji} 您属于罕见的「${parentingStyleArchetype.name}」教养风格` : '',
    ].filter(Boolean),
    references: [
      '《虎妈战歌》，蔡美儿',
      '《爱、金钱和孩子：育儿经济学》',
      '《中国式家长》游戏官方设定集',
      '发展心理学：教养风格三维模型',
    ],
  }
}
