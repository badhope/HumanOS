/**
 * ==============================================
 * 🧠 大五人格 OCEAN 测评 - 核心计算器
 * ==============================================
 * 【测评定位】心理学界黄金标准，最权威的人格模型
 * 【核心算法】5维度 × 10题/维度 = 50题，含反向计分题
 * 【理论来源】McCrae & Costa 五因素模型
 * 
 * ==============================================
 * 🤖 AI编码契约 - 大模型修改此文件必须遵守！
 * ==============================================
 * 🔴 绝对禁止的操作：
 * 1. 不准删除/修改OceanResult接口的任何字段名
 * 2. 不准修改5维度的题号分组映射（第55行开始）
 * 3. 不准修改维度名：openness/conscientiousness/extraversion/agreeableness/neuroticism
 * 4. 不准删除任何reverse计分逻辑
 * 
 * 🟡 修改前必须完成的校验：
 * 1. 题号范围必须与ocean-bigfive.ts的实际题目数量一致
 * 2. 维度名必须与Report组件的雷达图labels 100%匹配
 * 3. 反向计分题必须与题目文件中的reverseScored=true对应
 * 
 * 🟢 允许的操作：
 * - 调整各维度的解释文本
 * - 优化反向计分公式
 * - 新增人格类型组合描述
 * 
 * 【⚠️  血泪教训！】
 * 题号对应关系错1题 = 所有人格维度都偏移了！
 */

import type { Answer, AssessmentResult } from '../../types'
import { diversityEngine, isomericEngine } from '../../data/assessments/diversity-enhancement-engine'
import { oceanAssessment } from '../../data/assessments/ocean-bigfive'

/**
 * 工具函数：从数组随机挑选一个（全项目通用）
 */
const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/**
 * 大五人格人群常模 - 基于McRae标准化数据
 */
const OCEAN_NORMS = {
  openness: { mean: 54, sd: 18 },
  conscientiousness: { mean: 58, sd: 19 },
  extraversion: { mean: 51, sd: 22 },
  agreeableness: { mean: 56, sd: 17 },
  neuroticism: { mean: 49, sd: 21 },
}

/**
 * 大五人格结果接口定义
 * 【五大维度】OCEAN 心理学标准缩写
 * - O: Openness 开放性
 * - C: Conscientiousness 尽责性
 * - E: Extraversion 外向性
 * - A: Agreeableness 宜人性
 * - N: Neuroticism 神经质
 */
export interface OceanResult extends Record<string, any> {
  openness: number
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
  primaryTrait: string
  oceanProfile: string
  profileEmoji: string
  dimensions: {
    O: number
    C: number
    E: number
    A: number
    N: number
  }
  radarData: { axis: string; value: number }[]
  profileDescription: string
  traitBreakdown: {
    openness: { label: string; traits: string[] }
    conscientiousness: { label: string; traits: string[] }
    extraversion: { label: string; traits: string[] }
    agreeableness: { label: string; traits: string[] }
    neuroticism: { label: string; traits: string[] }
  }
  famousMatch: string[]
  careerSuggestions: string[]
  relationshipInsight: string
  growthAreas: string[]
}

export function calculateOcean(answers: Answer[]): OceanResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
  })

  const oItems = ['ocean-1', 'ocean-2', 'ocean-3', 'ocean-4', 'ocean-5', 'ocean-6', 'ocean-7', 'ocean-8', 'ocean-9', 'ocean-10']
  const cItems = ['ocean-11', 'ocean-12', 'ocean-13', 'ocean-14', 'ocean-15', 'ocean-16', 'ocean-17', 'ocean-18', 'ocean-19', 'ocean-20']
  const eItems = ['ocean-21', 'ocean-22', 'ocean-23', 'ocean-24', 'ocean-25', 'ocean-26', 'ocean-27', 'ocean-28', 'ocean-29', 'ocean-30']
  const aItems = ['ocean-31', 'ocean-32', 'ocean-33', 'ocean-34', 'ocean-35', 'ocean-36', 'ocean-37', 'ocean-38', 'ocean-39', 'ocean-40']
  const nItems = ['ocean-41', 'ocean-42', 'ocean-43', 'ocean-44', 'ocean-45', 'ocean-46', 'ocean-47', 'ocean-48', 'ocean-49', 'ocean-50']

  const reverseO = ['ocean-5']
  const reverseC = ['ocean-15', 'ocean-18']
  const reverseE = ['ocean-25']
  const reverseA = ['ocean-33', 'ocean-38']
  const reverseN = ['ocean-45']

  const calcScore = (items: string[], reverse: string[]) => {
    let raw = 0
    items.forEach(id => {
      let val = answerMap[id] || 3
      if (reverse.includes(id)) val = 6 - val
      raw += val
    })
    return Math.round(((raw - items.length) / (items.length * 4)) * 100)
  }

  const rawScores = {
    openness: calcScore(oItems, reverseO),
    conscientiousness: calcScore(cItems, reverseC),
    extraversion: calcScore(eItems, reverseE),
    agreeableness: calcScore(aItems, reverseA),
    neuroticism: calcScore(nItems, reverseN),
  }

  const responseValues = Object.fromEntries(
    Object.entries(answerMap).map(([k, v]) => [k, typeof v === 'number' ? v : Number(v) || 3])
  )
  const responseStyle = diversityEngine.calculateResponseStyle(responseValues, 5)
  const correctedScores = diversityEngine.applyResponseStyleCorrection(rawScores, responseStyle)
  const enhanced = diversityEngine.enhanceResultDiversity(correctedScores, {
    responseId: 'ocean-' + Date.now(),
    rawScores,
    responseStyle,
    diversityMetrics: {
      scoreEntropy: diversityEngine.calculateShannonEntropy(Object.values(rawScores)),
      dimensionSpread: Math.max(...Object.values(rawScores)) - Math.min(...Object.values(rawScores)),
      resultUniqueness: diversityEngine.calculateUniquenessScore(rawScores, OCEAN_NORMS),
    },
  })

  const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = enhanced as typeof rawScores

  const fingerprint = isomericEngine.generateResponseFingerprint(responseValues, oceanAssessment.questions)
  const contrastItems = isomericEngine.extractContrastItems(responseValues, rawScores)
  const midrangeSubtype = isomericEngine.classifyMidrangeSubtype(fingerprint, enhanced)
  const allScoresInMidrange = Object.values(enhanced).every(s => s >= 42 && s <= 58)

  const traits = [
    { name: '开放性', score: openness, letter: 'O' },
    { name: '尽责性', score: conscientiousness, letter: 'C' },
    { name: '外向性', score: extraversion, letter: 'E' },
    { name: '宜人性', score: agreeableness, letter: 'A' },
    { name: '神经质', score: neuroticism, letter: 'N' },
  ]
  traits.sort((a, b) => b.score - a.score)
  const primaryTrait = traits[0].name

  const getLevel = (s: number) => {
    if (s < 20) return '极低'
    if (s < 40) return '较低'
    if (s < 60) return '中等'
    if (s < 80) return '较高'
    return '极高'
  }

  let oceanProfile = '平衡型人格 ⚖️'
  let profileEmoji = '⚖️'

  if (openness > 80 && conscientiousness < 30 && extraversion > 70) {
    oceanProfile = '波西米亚人 🎨'
    profileEmoji = '🎨'
  } else if (conscientiousness > 80 && extraversion > 70 && agreeableness > 70) {
    oceanProfile = '天生领袖 🦁'
    profileEmoji = '🦁'
  } else if (openness > 80 && extraversion < 30) {
    oceanProfile = '沉思者 🌌'
    profileEmoji = '🌌'
  } else if (conscientiousness > 85) {
    oceanProfile = '完美主义者 📋'
    profileEmoji = '📋'
  } else if (extraversion > 85) {
    oceanProfile = '派对动物 🎉'
    profileEmoji = '🎉'
  } else if (extraversion < 15) {
    oceanProfile = '隐士 🧘'
    profileEmoji = '🧘'
  } else if (agreeableness > 85) {
    oceanProfile = '圣人 ☀️'
    profileEmoji = '☀️'
  } else if (agreeableness < 20) {
    oceanProfile = '竞争机器 ⚔️'
    profileEmoji = '⚔️'
  } else if (neuroticism > 85) {
    oceanProfile = '焦虑诗人 🖤'
    profileEmoji = '🖤'
  } else if (neuroticism < 15) {
    oceanProfile = '禅宗大师 🪷'
    profileEmoji = '🪷'
  } else if (openness > 75 && conscientiousness > 75 && extraversion > 75 && agreeableness > 75 && neuroticism < 30) {
    oceanProfile = '黄金人格 🌟'
    profileEmoji = '🌟'
  }

  const dimensions = {
    O: openness,
    C: conscientiousness,
    E: extraversion,
    A: agreeableness,
    N: neuroticism,
  }

  const radarData = [
    { axis: '开放性', value: openness },
    { axis: '尽责性', value: conscientiousness },
    { axis: '外向性', value: extraversion },
    { axis: '宜人性', value: agreeableness },
    { axis: '情绪稳定性', value: Math.max(0, 100 - neuroticism) },
  ]

  const profileDescriptions: Record<string, string[]> = {
    '波西米亚人 🎨': [
      '你是**波西米亚型人格**！你思想开放、创意无限、讨厌规则。结构化的环境让你窒息，例行公事对你来说是酷刑。你活在当下，追随灵感。',
      '🎨 真正的艺术家灵魂。对你来说，体验比什么都重要。朝九晚五的工作会把你慢慢杀死。',
      '你的座右铭：规矩是给没有想象力的人定的。',
    ],
    '天生领袖 🦁': [
      '你是**天生的领袖**！你高度尽责、外向随和、意志坚定。人们不由自主地就会相信你、跟随你。',
      '🦁 人群中的自然Alpha。你不需要刻意争夺权力，权力会自然地流向你。组织混乱的时候，所有人都会看向你。',
      '这是人群中最罕见也最有价值的人格类型之一。善待你的天赋。',
    ],
    '沉思者 🌌': [
      '你是**深沉的思考者**。你的内心世界比外部世界丰富一万倍。你读书、你思考、你想象、你构建整个宇宙。',
      '🌌 思想的巨人。大部分社交对你来说都是消耗，而不是滋养。你最深的快乐来自理解世界的本质。',
      '你可能朋友很少，但你和自己的对话比一百场派对都要有意思。',
    ],
    '完美主义者 📋': [
      '你是**极致的完美主义者**。细节决定成败，而你决定细节。没有什么事情能够逃过你的眼睛，没有什么标准是你觉得太高的。',
      '📋 秩序的化身。混乱让你焦虑，计划给你安全感。你可能有点强迫症，但这个世界就是靠你这种人才正常运转的。',
      '小建议：偶尔放过自己。80分有时候就足够了。',
    ],
    '派对动物 🎉': [
      '你是**派对的灵魂**！你在哪里，能量就在哪里，快乐就在哪里。你认识所有人，所有人也都认识你。',
      '🎉 人形社交电池。独处对你来说才是真正的累。你的最佳状态永远是在人群中。',
      '你不需要充电，你本身就是发电机。',
    ],
    '隐士 🧘': [
      '你是**真正的内向者**。社交是沉重的负担，人群是能量的黑洞。你最好的朋友就是你自己。',
      '🧘 深度独处爱好者。一周不出门对你来说不是惩罚，是奖励。你可能不常说话，但你说的每一句都是经过深思熟虑的。',
      '这个世界误解了你。他们觉得你孤单，但其实你正在享受人类最顶级的自由。',
    ],
    '圣人 ☀️': [
      '你是**行走的太阳**。你的宜人性爆表了。你真诚、善良、信任、乐于助人、总是看到别人最好的一面。',
      '☀️ 所有人的安全港湾。你是那种哪怕全世界都背弃他，你还是会伸出援手的人。',
      '重要提醒：不是所有人都像你这么善良。请保护好自己。',
    ],
    '竞争机器 ⚔️': [
      '你是**冷酷的竞争者**。友善是弱者的游戏。对你来说，胜利就是一切，第二名就是最大的输家。',
      '⚔️ 零和博弈大师。你不相信双赢，你只相信你赢。你可能朋友不多，但你赢的次数比谁都多。',
      '你的人生哲学：如果有人说这不是比赛，那他们肯定是输了的那个。',
    ],
    '焦虑诗人 🖤': [
      '你是**焦虑的艺术家**。你的情绪深度是常人无法想象的。你敏感、你痛苦、你感受一切的一切。',
      '🖤 黑暗缪斯。你的痛苦就是你的创造力。大多数人感受不到的细微差别，对你来说是震耳欲聋的交响乐。',
      '不要试图"治愈"你的敏感。试着把它变成艺术。',
    ],
    '禅宗大师 🪷': [
      '你是**情绪的主人**。泰山崩于前而色不变，麋鹿兴于左而目不瞬。没什么事能让你焦虑，没什么人能让你生气。',
      '🪷 活着的开悟者。大多数人被情绪牵着鼻子走，而你站在岸边平静地看着。这份平静是你最大的超能力。',
      '你可能没有最高的 highs，但你永远也不会有最低的 lows。',
    ],
    '黄金人格 🌟': [
      '🌟 恭喜你是极其罕见的**黄金人格**！五大维度全部在最优区间。你开放但不幼稚，尽责但不刻板，外向但不过分，友善但不软弱，情绪极其稳定。',
      '这是心理学定义中最健康也最成功的人格构型。大概每500个人里才有一个。',
      '说真的，你就是传说中那种"别人家的孩子"，长大了就是"别人家的大人"。世界需要更多像你这样的人。',
    ],
    '平衡型人格 ⚖️': [
      '你是**平衡型人格**。没有哪一个维度特别极端，这其实是巨大的优势。你可以适应几乎所有的环境，和几乎所有类型的人相处。',
      '⚖️ 中庸的智慧。大多数人被自己的极端特质困住，而你是自由的。你可以成为你想成为的任何人。',
      '这其实是最成熟的人格类型。',
    ],
  }

  const getTraits = (score: number, high: string[], low: string[]) => {
    const level = getLevel(score)
    const traits = score > 50 ? high : low
    return { label: level, traits: traits.slice(0, 4) }
  }

  const traitBreakdown = {
    openness: getTraits(openness,
      ['想象力丰富', '审美敏感', '思想开放', '喜欢新奇', '挑战传统', '抽象思维'],
      ['务实', '传统', '保守', '脚踏实地', '不喜变化', '具体思维']),
    conscientiousness: getTraits(conscientiousness,
      ['可靠', '有条理', '自律', '追求卓越', '有计划', '意志力强'],
      ['灵活', '随性', '活在当下', '讨厌规则', '容易分心', '即兴发挥']),
    extraversion: getTraits(extraversion,
      ['社交', '精力充沛', '热情', '喜欢关注', '乐观', '行动导向'],
      ['内省', '独处', '安静', '深度', '独立', '思考导向']),
    agreeableness: getTraits(agreeableness,
      ['友善', '信任', '乐于助人', '合作', '同情', '避免冲突'],
      ['竞争', '怀疑', '直接', '挑衅', '强硬', '实用主义']),
    neuroticism: getTraits(neuroticism,
      ['情绪稳定', '冷静', '抗压', '放松', '乐观', '复原力强'],
      ['敏感', '焦虑', '完美主义', '情绪深度', '自我意识', '感受强烈']),
  }

  const celebrityDatabase: Record<string, string[]> = {
    '波西米亚人 🎨': ['鲍勃·迪伦', '大卫·鲍伊', '梵高'],
    '天生领袖 🦁': ['曼德拉', '罗斯福', '伊丽莎白二世'],
    '沉思者 🌌': ['康德', '卡夫卡', '维特根斯坦'],
    '完美主义者 📋': ['史蒂夫·乔布斯', '福尔摩斯', '赫敏'],
    '派对动物 🎉': ['巨石强森', '奥普拉', '特朗普'],
    '隐士 🧘': ['维特根斯坦', '卡夫卡', '比尔·盖茨（年轻）'],
    '圣人 ☀️': ['特雷莎修女', '罗杰斯', '阿甘'],
    '竞争机器 ⚔️': ['迈克尔·乔丹', '玛格丽特·撒切尔', '普京'],
    '焦虑诗人 🖤': ['伍尔夫', '尼采', '科特·柯本'],
    '禅宗大师 🪷': ['村上春树', '老子', '甘地'],
    '黄金人格 🌟': ['汤姆·汉克斯', '罗杰斯先生', ' Oprah（没错她两次）'],
    '平衡型人格 ⚖️': ['大部分优秀的成年人', '你的心理咨询师', '理想的你自己'],
  }

  const careerDatabase: Record<string, string[]> = {
    '波西米亚人 🎨': ['艺术家', '设计师', '作家', '自由职业者', '绝对不要当会计'],
    '天生领袖 🦁': ['CEO', '政治家', '将军', '任何需要负责人的位置'],
    '沉思者 🌌': ['研究员', '哲学家', '作家', '程序员', '任何可以独处思考的工作'],
    '完美主义者 📋': ['项目经理', '外科医生', '审计师', '律师', '质量控制'],
    '派对动物 🎉': ['销售', '公关', '演员', '老师', '任何和人打交道的工作'],
    '隐士 🧘': ['图书馆员', '数据科学家', '档案管理员', '远程工作者'],
    '圣人 ☀️': ['心理咨询师', '教师', '护士', '社工', 'HR'],
    '竞争机器 ⚔️': ['投资银行', '诉讼律师', '销售冠军', '创业者', '运动员'],
    '焦虑诗人 🖤': ['艺术家', '诗人', '音乐人', '评论家', '所有创造性行业'],
    '禅宗大师 🪷': ['冥想导师', '按摩师', '瑜伽教练', '图书馆管理员', '退休'],
    '黄金人格 🌟': ['你可以做任何事，而且都会做得很好'],
    '平衡型人格 ⚖️': ['你没有明显的职业限制，可以尝试任何感兴趣的领域'],
  }

  const relationshipTemplates = [
    '恋爱建议：最完美的伴侣不是和你一模一样的人，是和你互补的那个人。',
    '关系洞察：记住，你的特质是你的优势，也是你的盲点。爱你的人爱你的全部，包括那些黑暗的角落。',
    '亲密关系：不要试图改变自己去适应别人。找到那个本来就喜欢你这个样子的人。',
  ]

  const growthTemplates = [
    '成长方向：你的最高特质是你的天赋，但它也可能成为你的牢笼。试着发展你分数最低的那个维度，那才是真正的成长。',
    '发展建议：人格不是命运。特质是工具，不是监狱。你可以在任何时候调用任何一个维度。',
    '自我提升：接受自己本来的样子。然后在此基础上，成为更好的版本。',
  ]

  const finalProfile = allScoresInMidrange ? midrangeSubtype.name : oceanProfile
  const finalEmoji = allScoresInMidrange ? '🎯' : profileEmoji

  return {
    openness,
    conscientiousness,
    extraversion,
    agreeableness,
    neuroticism,
    primaryTrait,
    oceanProfile: finalProfile,
    profileEmoji: finalEmoji,
    dimensions,
    radarData,
    profileDescription: allScoresInMidrange 
      ? midrangeSubtype.description 
      : randomPick(profileDescriptions[oceanProfile] || profileDescriptions['平衡型人格 ⚖️']),
    traitBreakdown,
    famousMatch: celebrityDatabase[oceanProfile] || celebrityDatabase['平衡型人格 ⚖️'],
    careerSuggestions: careerDatabase[oceanProfile] || careerDatabase['平衡型人格 ⚖️'],
    relationshipInsight: randomPick(relationshipTemplates),
    growthAreas: growthTemplates,
    diversityAnalysis: {
      uniquenessScore: Math.round(diversityEngine.calculateUniquenessScore(rawScores, OCEAN_NORMS)),
      extremityScore: Math.round(responseStyle.extremityScore * 100),
      midpointAvoidance: Math.round((1 - responseStyle.midpointRatio) * 100),
    },
    isomericAnalysis: allScoresInMidrange ? {
      enabled: true,
      subtype: midrangeSubtype.name,
      subtypeDescription: midrangeSubtype.description,
      characteristicItems: midrangeSubtype.characteristicItems,
    } : null,
  }
}
