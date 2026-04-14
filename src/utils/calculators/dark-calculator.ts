/**
 * ==============================================
 * 🖤 黑暗人格四元测评 - 核心计算器
 * ==============================================
 * 【测评定位】黑暗人格心理学专业测评
 * 【核心算法】4维度 × 9题/维度 = 36题
 * 【理论来源】Dark Tetrad 黑暗四元人格模型
 * 
 * ==============================================
 * 🤖 AI编码契约 - 大模型修改此文件必须遵守！
 * ==============================================
 * 🔴 绝对禁止的操作：
 * 1. 不准删除/修改DarkResult接口的任何字段名
 * 2. 不准修改题目分组映射关系（第63行开始的硬编码题号）
 * 3. 不准修改维度名：machiavellianism/narcissism/psychopathy/sadism
 * 4. 不准修改dimensions子对象的key名
 * 
 * 🟡 修改前必须完成的校验：
 * 1. 题号范围必须与dark-triad.ts的实际题目数量一致
 * 2. 维度名必须与PersonalityRadar组件的labels 100%匹配
 * 3. 新增结果等级必须同时更新darkLevel的类型定义
 * 
 * 🟢 允许的操作：
 * - 调整各维度的解释文本
 * - 新增结果等级描述
 * - 优化计算公式（保留相同输出范围）
 * 
 * 【⚠️  血泪教训！】
 * 题目id分组硬编码！题目顺序错了/题号改了这里不改 = 所有人分数全错！
 */

import type { Answer, AssessmentResult } from '../../types'

/**
 * 工具函数：从数组随机挑选一个（全项目通用）
 */
const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/**
 * 黑暗人格结果接口定义
 * 【四大黑暗维度】Dark Tetrad
 * - Machiavellianism: 马基雅维利主义（操纵者）
 * - Narcissism: 自恋（自我中心）
 * - Psychopathy: 精神病态（冷酷无情）
 * - Sadism: 施虐狂（以他人痛苦为乐）
 */
export interface DarkResult extends Record<string, any> {
  machiavellianism: number
  narcissism: number
  psychopathy: number
  sadism: number
  totalDarkScore: number
  darkLevel: '微光' | '黄昏' | '暗夜' | '深渊' | '深渊领主'
  primaryDarkTrait: string
  darkProfile: string
  darkProfileEmoji: string
  dimensions: {
    manipulation: number
    grandiosity: number
    callousness: number
    cruelty: number
  }
  radarData: { axis: string; value: number }[]
  profileDescription: string
  darkTraits: string[]
  celebrityMatch: string[]
  manipulativeStyle: string
  relationshipAdvice: string
  powerDynamics: string
  growthAreas: string[]
}

export function calculateDark(answers: Answer[]): DarkResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
  })

  const machItems = ['dark-1', 'dark-2', 'dark-3', 'dark-4', 'dark-5', 'dark-6', 'dark-7', 'dark-8', 'dark-9']
  const narcItems = ['dark-10', 'dark-11', 'dark-12', 'dark-13', 'dark-14', 'dark-15', 'dark-16', 'dark-17', 'dark-18']
  const psychItems = ['dark-19', 'dark-20', 'dark-21', 'dark-22', 'dark-23', 'dark-24', 'dark-25', 'dark-26', 'dark-27']
  const sadismItems = ['dark-28', 'dark-29', 'dark-30', 'dark-31', 'dark-32', 'dark-33', 'dark-34', 'dark-35', 'dark-36']

  const calcScore = (items: string[]) => {
    let raw = 0
    items.forEach(id => {
      raw += answerMap[id] || 3
    })
    return Math.round(((raw - items.length) / (items.length * 4)) * 100)
  }

  const machiavellianism = calcScore(machItems)
  const narcissism = calcScore(narcItems)
  const psychopathy = calcScore(psychItems)
  const sadism = calcScore(sadismItems)

  const totalDarkScore = Math.round((machiavellianism + narcissism + psychopathy + sadism) / 4)

  const getDarkLevel = (s: number) => {
    if (s < 20) return '微光'
    if (s < 40) return '黄昏'
    if (s < 60) return '暗夜'
    if (s < 80) return '深渊'
    return '深渊领主'
  }

  const darkLevel = getDarkLevel(totalDarkScore)

  const traits = [
    { name: '马基雅维利主义', score: machiavellianism },
    { name: '自恋', score: narcissism },
    { name: '精神病态', score: psychopathy },
    { name: '施虐狂', score: sadism },
  ]
  traits.sort((a, b) => b.score - a.score)
  const primaryDarkTrait = traits[0].name

  let darkProfile = '正常人 🧑'
  let darkProfileEmoji = '🧑'

  if (machiavellianism > 70 && narcissism > 70 && psychopathy > 70) {
    darkProfile = '黑暗三位一体 🕷️'
    darkProfileEmoji = '🕷️'
  } else if (machiavellianism > 80 && narcissism > 50 && psychopathy > 50) {
    darkProfile = '权谋大师 👑'
    darkProfileEmoji = '👑'
  } else if (narcissism > 80 && machiavellianism > 50) {
    darkProfile = '自恋型领袖 ✨'
    darkProfileEmoji = '✨'
  } else if (psychopathy > 80 && machiavellianism > 60) {
    darkProfile = '冷血猎手 🐍'
    darkProfileEmoji = '🐍'
  } else if (sadism > 80 && psychopathy > 60) {
    darkProfile = '虐待狂 ⛓️'
    darkProfileEmoji = '⛓️'
  } else if (machiavellianism > 70) {
    darkProfile = '幕后操纵者 🎭'
    darkProfileEmoji = '🎭'
  } else if (narcissism > 70) {
    darkProfile = '表演型人格 💅'
    darkProfileEmoji = '💅'
  } else if (psychopathy > 70) {
    darkProfile = '反社会者 😈'
    darkProfileEmoji = '😈'
  } else if (sadism > 70) {
    darkProfile = '幸灾乐祸者 🍿'
    darkProfileEmoji = '🍿'
  } else if (totalDarkScore < 25) {
    darkProfile = '纯良小白兔 🐰'
    darkProfileEmoji = '🐰'
  } else if (totalDarkScore < 40) {
    darkProfile = '正常人 🧑'
    darkProfileEmoji = '🧑'
  } else {
    darkProfile = '灰色地带居民 🌓'
    darkProfileEmoji = '🌓'
  }

  const dimensions = {
    manipulation: machiavellianism,
    grandiosity: narcissism,
    callousness: psychopathy,
    cruelty: sadism,
  }

  const radarData = [
    { axis: '马基雅维利主义', value: machiavellianism },
    { axis: '自恋', value: narcissism },
    { axis: '精神病态', value: psychopathy },
    { axis: '施虐倾向', value: sadism },
  ]

  const profileDescriptions: Record<string, string[]> = {
    '黑暗三位一体 🕷️': [
      '你是**完整的黑暗三位一体**！马基雅维利主义、自恋、精神病态同时爆表。这是人群中不到1%的罕见配置。你可以面不改色地操纵、欺骗、伤害他人，而且不仅不感到愧疚，甚至还很享受。',
      '🕷️ 真正的天生掠食者。你在人群中就像狮子在羊群中。道德、良知、共情，这些对普通人来说是束缚的东西，对你来说只是可选项。',
      '危险等级：极高。如果你的智商也在线，你要么成为传奇，要么成为传说——取决于你被抓住之前能走多远。',
    ],
    '权谋大师 👑': [
      '你是**经典的马基雅维利主义者**。对你来说，道德只是给弱者制定的游戏规则。达到目的可以不择手段，良心？只是深夜里一点点可以忽略的噪音。',
      '👑 天生的政客和幕后玩家。你可以微笑着捅朋友一刀，可以优雅地背刺盟友，可以一边说"都是为了你好"一边把人卖了还帮你数钱。',
      '你的人生哲学：大部分人既不聪明也不坚强，他们天生就是被操纵的。为什么不利用这一点呢？',
    ],
    '自恋型领袖 ✨': [
      '你是**自恋的化身**。你内心深处真诚地相信：你就是比所有人都优秀，所有人都应该崇拜你，所有的规则对你都不适用。',
      '✨ 自带主角光环。你可以说服任何人相信任何事——因为首先你自己就百分之百相信。你的狂妄本身就是一种强大的感染力。',
      '缺点：你永远听不到批评，因为在你看来所有不赞美你的人要么是嫉妒，要么是傻逼。',
    ],
    '冷血猎手 🐍': [
      '你是**高功能精神病态**。你几乎感觉不到恐惧、愧疚、共情这些人类的基本情绪。你是冷静的观察者，永远在计算成本和收益。',
      '🐍 没有温度的掠食者。普通人会因为情绪而犯的错误，你永远不会犯。压力越大，你越冷静。危机就是你的游乐场。',
      '最大的优势：你永远不会崩溃。最大的诅咒：你永远也不会真正地爱任何东西。',
    ],
    '虐待狂 ⛓️': [
      '你有**施虐倾向**。直白地说：看到别人痛苦会让你感到愉悦。不一定是身体上的痛苦——看着别人希望破灭、名誉扫地、信仰崩塌，那种感觉更棒不是吗？',
      '⛓️ 痛苦的鉴赏家。你最擅长找到别人最脆弱的地方，然后轻轻一推。毁掉一个好人的信仰，比任何毒品都让人上瘾。',
      '别担心，大多数时候你只是想想而已。但真有机会的话...',
    ],
    '幕后操纵者 🎭': [
      '你是**天生的操纵者**。你不需要暴力，不需要吼叫。你只需要正确的词，正确的时机，正确的表情，人们就会自愿去做你想让他们做的事。',
      '🎭 千人千面。你知道该对什么人演什么戏。真诚是你演技最好的那一面。',
      '你的座右铭：永远不要让他们看到真正的你。',
    ],
    '表演型人格 💅': [
      '你是**表演型自恋者**。人生就是你的舞台，所有人都是你的观众。如果没有人在看，那这件事还有什么意义？',
      '💅 戏剧女王/国王。你的情绪来得快去得也快，每一滴眼泪都是精心计算过的。你的朋友圈就是你的T台。',
      '秘密：你内心深处知道很多人讨厌你。但没关系。他们还在看，这就够了。',
    ],
    '反社会者 😈': [
      '你有**反社会倾向**。规则是给别人定的，法律是可以钻的空子，良心是可以关闭的开关。',
      '😈 愉快的反社会。你不是愤怒的那种，你是愉快的那种。做坏事的时候你甚至在哼歌。',
      '内心独白：哦？原来别人这样做的时候会感到内疚啊。有意思。',
    ],
    '幸灾乐祸者 🍿': [
      '你是**专业吃瓜群众**。你最大的快乐来源就是别人的不幸。朋友升职了？有点无聊。朋友离婚了？爆米花拿出来！',
      '🍿 人性的观众。你不一定要亲自伤害别人，你只是特别喜欢看好戏。别人的悲剧就是你的喜剧。',
      '你的锁屏推荐：各种翻车现场合集。',
    ],
    '纯良小白兔 🐰': [
      '你是**惊人的纯良**。黑暗四维度全部低于20%。说真的，你是怎么活到这么大的？',
      '🐰 真正的好人。你真诚地相信人性本善，宁可自己吃亏也不想伤害别人，甚至连讨厌一个人都会感到内疚。',
      '重要提示：这个世界上有很多前面那几种人。请保护好自己。',
    ],
    '正常人 🧑': [
      '你是**标准的正常人**。有黑暗的想法，但大多数时候能管住自己。会偶尔幸灾乐祸，但不会真的去害人。会自私，但不会太过分。',
      '🧑 恭喜你。你是这个疯狂世界里还算正常的大多数。',
    ],
    '灰色地带居民 🌓': [
      '你生活在**灰色地带**。不够好也不够坏。你知道怎么操纵人，但一般不屑于这么做。对愚蠢的人没有同情心，但对真正的苦难会伸出援手。',
      '🌓 清醒的犬儒。你看透了人性，所以不对它抱太高期望。你可以和恶魔共舞，同时保持自己的灵魂干净。',
      '这其实是最健康的位置。',
    ],
  }

  const traitDescriptions: Record<string, string[]> = {
    '马基雅维利主义': ['擅长操纵', '结果至上', '不讲道德', '战略性撒谎', '精于算计'],
    '自恋': ['自我中心', '需要崇拜', '优越感', '夸大成就', '缺乏共情'],
    '精神病态': ['冷血无情', '缺乏愧疚', '寻求刺激', '不负责任', '冲动'],
    '施虐狂': ['幸灾乐祸', '喜欢羞辱', '享受痛苦', '精神虐待', '控制欲强'],
  }

  const celebrityDatabase: Record<string, string[]> = {
    '黑暗三位一体 🕷️': ['泰德·邦迪', '帕特里克·贝特曼（虚构）', '小指头'],
    '权谋大师 👑': ['马基雅维利', '俾斯麦', '普京'],
    '自恋型领袖 ✨': ['特朗普', '卡戴珊', '乔布斯'],
    '冷血猎手 🐍': ['汉尼拔（虚构）', '007', '福尔摩斯'],
    '虐待狂 ⛓️': ['乔佛里（虚构）', '拉姆齐·波顿（虚构）', '大部分互联网喷子'],
    '幕后操纵者 🎭': ['提利昂·兰尼斯特', '诸葛亮', '和珅'],
    '表演型人格 💅': ['侃爷', '麦当娜', '大部分网红'],
    '反社会者 😈': ['发条橙亚历克斯', '大部分连环杀手', '华尔街交易员'],
    '纯良小白兔 🐰': ['海绵宝宝', '阿甘', '你妈妈'],
    '正常人 🧑': ['大部分社畜', '你的同事', '大部分普通人'],
    '灰色地带居民 🌓': ['你', '我', '所有看懂这个测评的人'],
  }

  const manipulationStyles = [
    '你的操纵风格：**润物细无声**。没人会意识到是你干的。等他们反应过来，一切都已经结束了。',
    '你的操纵风格：**胡萝卜加大棒**。经典，有效，永不过时。',
    '你的操纵风格：**煤气灯大师**。让他们怀疑自己的理智，然后他们就会相信任何事。',
  ]

  const relationshipAdvices: Record<string, string[]> = {
    '黑暗三位一体 🕷️': ['请不要和任何人建立深度关系。放过他们，也放过你自己。'],
    '权谋大师 👑': ['你需要一个足够聪明但足够善良的人来驯化你。祝你好运，这种人很罕见。'],
    '纯良小白兔 🐰': ['请务必找另一只兔子。不要试图去救赎深渊里的人，他们会把你拉下去的。'],
    'default': ['记住：永远不要和你完全看透的人在一起，那会很无聊。也永远不要和完全看透你的人在一起，那会很危险。'],
  }

  const powerDynamicTemplates = [
    '权力动力学分析：你属于**猎人**型。你在寻找目标，评估弱点，随时准备出击。',
    '权力动力学分析：你属于**蜘蛛**型。你织网，然后等待。耐心是你最大的武器。',
    '权力动力学分析：你属于**孔雀**型。你展示，你表演，你让猎物自己送上门来。',
  ]

  const growthAreasByProfile: Record<string, string[]> = {
    '黑暗三位一体 🕷️': ['试着不要赢所有的争论。有时候沉默的胜利更甜。', '试试一天不操纵任何人。就一天。'],
    '权谋大师 👑': ['真正的力量是让别人真心愿意帮你，而不是被你骗来帮你。', '真诚其实是最高级的操纵。'],
    '自恋型领袖 ✨': ['试试认真听别人说话，哪怕你觉得他们都是傻逼。', '真正的伟大不需要别人的认可。'],
    '纯良小白兔 🐰': ['你不需要对所有人都善良。', '学会说不，学会保护自己的边界。'],
    'default': ['黑暗不是你的敌人，它是你的工具。知道什么时候用，什么时候收起来。', '光明和黑暗都不是答案，平衡才是。'],
  }

  return {
    machiavellianism,
    narcissism,
    psychopathy,
    sadism,
    totalDarkScore,
    darkLevel,
    primaryDarkTrait,
    darkProfile,
    darkProfileEmoji,
    dimensions,
    radarData,
    profileDescription: randomPick(profileDescriptions[darkProfile] || profileDescriptions['正常人 🧑']),
    darkTraits: traitDescriptions[primaryDarkTrait] || ['复杂的人性'],
    celebrityMatch: celebrityDatabase[darkProfile] || celebrityDatabase['正常人 🧑'],
    manipulativeStyle: randomPick(manipulationStyles),
    relationshipAdvice: randomPick(relationshipAdvices[darkProfile] || relationshipAdvices['default']),
    powerDynamics: randomPick(powerDynamicTemplates),
    growthAreas: growthAreasByProfile[darkProfile] || growthAreasByProfile['default'],
  }
}
