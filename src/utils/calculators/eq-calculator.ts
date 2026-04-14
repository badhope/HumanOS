/**
 * ==============================================
 * 💖 戈尔曼情商测评 - 核心计算器
 * ==============================================
 * 【测评定位】Daniel Goleman 专业情商模型
 * 【核心算法】5维度 × 6题/维度 = 30题
 * 【理论来源】Goleman 情绪智力五因素模型
 * 
 * 【⚠️  超级重要警告】
 * 1. 直接按题号 eq-1~30 硬编码分组！
 * 2. 题号改了这里一定改！题目顺序错了分数全错！
 */

import type { Answer, AssessmentResult } from '../../types'

/**
 * 工具函数：从数组随机挑选一个（全项目通用）
 */
const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/**
 * 情商结果接口定义
 * 【戈尔曼情商五维度】
 * - Self-Awareness: 自我觉察
 * - Self-Management: 自我管理
 * - Self-Motivation: 自我激励
 * - Empathy: 共情能力
 * - Social Skills: 社交技能
 */
export interface EQResult extends Record<string, any> {
  totalEQ: number
  percentile: number
  classification: string
  classificationEmoji: string
  dimensions: {
    selfAwareness: number
    selfManagement: number
    selfMotivation: number
    empathy: number
    socialSkills: number
  }
  radarData: { dimension: string; score: number; fullMark: number }[]
  strongest: { key: string; name: string; value: number }
  weakest: { key: string; name: string; value: number }
  emotionalPortrait: {
    type: string
    description: string
    emoji: string
    superpower: string
    kryptonite: string
  }
  communicationStyle: string
  stressResponseGuide: {
    triggerPoints: string[]
    emergencyKit: string[]
    recoveryRitual: string[]
  }
  relationshipMatches: {
    best: string[]
    watchOut: string[]
    attractionPattern: string
  }
  workplaceScenarios: {
    conflictResolution: string
    receivingFeedback: string
    givingFeedback: string
    teamDynamics: string
  }
  emotionalGrowthRoadmap: {
    month1: string[]
    month3: string[]
    month6: string[]
  }
  emotionalDebtChecklist: string[]
  difficultConversationScript: string[]
  typeDescription: string
  famousExamples: string[]
  famousEQMaster: { name: string; quote: string; lesson: string }
  workplaceAdvice: string[]
  relationshipTips: string[]
  growthPlan: string[]
}

export function calculateEQ(answers: Answer[]): EQResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
  })

  const dimensionMap: Record<string, string[]> = {
    selfAwareness: ['eq-1', 'eq-2', 'eq-3', 'eq-4', 'eq-5', 'eq-6', 'eq-31', 'eq-32'],
    selfManagement: ['eq-7', 'eq-8', 'eq-9', 'eq-10', 'eq-11', 'eq-12', 'eq-33', 'eq-34'],
    selfMotivation: ['eq-13', 'eq-14', 'eq-15', 'eq-16', 'eq-17', 'eq-18', 'eq-35', 'eq-36'],
    empathy: ['eq-19', 'eq-20', 'eq-21', 'eq-22', 'eq-23', 'eq-24', 'eq-37', 'eq-38'],
    socialSkills: ['eq-25', 'eq-26', 'eq-27', 'eq-28', 'eq-29', 'eq-30', 'eq-39', 'eq-40'],
  }

  const reverseItems = ['eq-3', 'eq-8', 'eq-13', 'eq-20', 'eq-26']

  const calcDimension = (items: string[]) => {
    let sum = 0
    const itemCount = items.length || 1
    const maxScore = itemCount * 5
    items.forEach(id => {
      let val = answerMap[id] || 3
      if (reverseItems.includes(id)) val = 6 - val
      sum += val
    })
    return Math.round((sum / maxScore) * 100)
  }

  const dimensions = {
    selfAwareness: calcDimension(dimensionMap.selfAwareness),
    selfManagement: calcDimension(dimensionMap.selfManagement),
    selfMotivation: calcDimension(dimensionMap.selfMotivation),
    empathy: calcDimension(dimensionMap.empathy),
    socialSkills: calcDimension(dimensionMap.socialSkills),
  }

  const dimensionNames: Record<string, string> = {
    selfAwareness: '自我觉察',
    selfManagement: '自我管理',
    selfMotivation: '自我激励',
    empathy: '共情能力',
    socialSkills: '社交技巧',
  }

  const radarData = [
    { dimension: '自我觉察', score: Math.round(dimensions.selfAwareness / 16.7), fullMark: 6 },
    { dimension: '自我管理', score: Math.round(dimensions.selfManagement / 16.7), fullMark: 6 },
    { dimension: '自我激励', score: Math.round(dimensions.selfMotivation / 16.7), fullMark: 6 },
    { dimension: '共情能力', score: Math.round(dimensions.empathy / 16.7), fullMark: 6 },
    { dimension: '社交技巧', score: Math.round(dimensions.socialSkills / 16.7), fullMark: 6 },
  ]

  const dimensionCount = Object.values(dimensions).length || 1
  const totalEQ = Math.round(Object.values(dimensions).reduce((a, b) => a + b, 0) / dimensionCount)
  const percentile = Math.round(Math.min(99, 50 + ((totalEQ - 50) / 15) * 34))

  let classification: string
  let classificationEmoji: string

  if (totalEQ >= 85) { classification = '卓越'; classificationEmoji = '💎' }
  else if (totalEQ >= 70) { classification = '优秀'; classificationEmoji = '🌟' }
  else if (totalEQ >= 55) { classification = '良好'; classificationEmoji = '✨' }
  else if (totalEQ >= 40) { classification = '中等'; classificationEmoji = '🌱' }
  else { classification = '发展中'; classificationEmoji = '🌱' }

  const scoresWithNames = Object.entries(dimensions).map(([key, value]) => ({ key, name: dimensionNames[key], value }))
  const strongest = scoresWithNames.sort((a, b) => b.value - a.value)[0]
  const weakest = scoresWithNames.sort((a, b) => a.value - b.value)[0]

  const getPortraitType = () => {
    if (dimensions.empathy >= 75 && dimensions.selfManagement >= 75) {
      return {
        type: '情绪治愈者',
        description: '你是人群中的情绪避雷针。别人的风暴到你这里就化为平静。你天生懂得如何抱持他人的情绪，而不会被它们卷走。',
        emoji: '🪽',
        superpower: '在别人崩溃时保持冷静，把冲突转化为对话',
        kryptonite: '下意识地吸收别人的痛苦，忘了自己也需要释放'
      }
    }
    if (dimensions.selfAwareness >= 75 && dimensions.empathy >= 75) {
      return {
        type: '人性洞察者',
        description: '你能看穿语言的表层，直接触达对方真正的需求。大多数人说"我没事"的时候，你听到的是"请来关心我"。',
        emoji: '🔮',
        superpower: '不用说话就能理解对方的真实感受',
        kryptonite: '因为看得太透，有时会对人性感到幻灭'
      }
    }
    if (dimensions.selfManagement >= 75 && dimensions.socialSkills >= 75) {
      return {
        type: '天生领导者',
        description: '人们会不自觉地向你靠拢，因为你能带来情绪上的安全感。你知道如何把不同的人凝聚在一起，朝着共同的目标前进。',
        emoji: '👑',
        superpower: '在高压场景下反而更加冷静，成为团队的定海神针',
        kryptonite: '习惯了照顾所有人，唯独忘了照顾自己'
      }
    }
    if (dimensions.selfMotivation >= 75 && dimensions.selfManagement >= 75) {
      return {
        type: '内驱成就者',
        description: '你不需要外界的认可来驱动自己。你的内心有一团永不熄灭的火，它比任何外部奖励都更加强大。',
        emoji: '🔥',
        superpower: '在所有人都放弃的时候，你还能再坚持100天',
        kryptonite: '对自己太苛刻，把自我价值等同于成就'
      }
    }
    if (dimensions.empathy >= 75 && dimensions.socialSkills >= 75) {
      return {
        type: '人际连接器',
        description: '你是社交网络的集线器。你认识A也认识B，而且你知道他们应该认识对方。连接人与人就是你的天职。',
        emoji: '🤝',
        superpower: '三分钟内和任何人找到共同话题',
        kryptonite: '太需要被喜欢了，以至于不敢拒绝任何人'
      }
    }
    if (dimensions.selfAwareness >= 75) {
      return {
        type: '内在探索者',
        description: '你是自己内心世界的制图师。你了解自己每一个情绪的来龙去脉，知道哪根弦被拨动了会发出什么声音。',
        emoji: '🗺️',
        superpower: '极度清晰的自我认知，很少内耗',
        kryptonite: '对他人的情绪钝感，有时会无意中伤害别人'
      }
    }
    if (dimensions.empathy >= 70 && dimensions.socialSkills < 60) {
      return {
        type: '内向共情者',
        description: '你能敏锐感知到房间里每个人的情绪，却选择安静地坐在角落。你的共情不需要通过语言表达。',
        emoji: '🌙',
        superpower: '不用说任何话，就能让别人感到被理解',
        kryptonite: '社交结束后需要独处充电三天'
      }
    }
    if (dimensions.empathy >= 70) {
      return {
        type: '温柔守护者',
        description: '你是朋友遇到困难时第一个想到的人。你的存在本身就是一种安慰。',
        emoji: '🤍',
        superpower: '让最内向的人也愿意对你敞开心扉',
        kryptonite: '情绪海绵，吸收了太多不属于自己的情绪'
      }
    }
    if (dimensions.selfMotivation >= 70 && dimensions.empathy < 60) {
      return {
        type: '理性攀登者',
        description: '你是自己人生的CEO。情绪对你来说只是数据，不是指令。目标清晰，执行有力。',
        emoji: '🏔️',
        superpower: '越挫越勇，压力越大状态越好',
        kryptonite: '对情绪脆弱的人缺乏耐心，会不自觉地说教'
      }
    }
    if (dimensions.socialSkills >= 70 && dimensions.selfManagement >= 70) {
      return {
        type: '群体粘合剂',
        description: '有你在的团队永远不会散。你知道怎么让每个人都舒服，怎么把不同的人拧成一股绳。',
        emoji: '🔗',
        superpower: '再尴尬的场面你都能救回来',
        kryptonite: '有时为了和谐会牺牲自己的真实需求'
      }
    }
    if (dimensions.selfManagement < 60 && dimensions.selfAwareness >= 60) {
      return {
        type: '情绪艺术家',
        description: '你的情绪体验比大多数人都要浓烈丰富。你开心时像烟花，难过时像暴雨——但这就是你的生命力。',
        emoji: '🎨',
        superpower: '极强的感染力，能带动整个房间的气氛',
        kryptonite: '情绪过山车，上一秒还在笑下一秒突然就emo了'
      }
    }
    const avg = (dimensions.selfManagement + dimensions.socialSkills) / 2
    if (avg >= 60) {
      return {
        type: '稳健实践者',
        description: '你不一定是情商最高的，但一定是最稳定可靠的。情绪波动小，待人接物始终如一。',
        emoji: '🌳',
        superpower: '情绪抗造，抗压能力max',
        kryptonite: '有时会显得有点平淡缺乏激情'
      }
    }
    return {
      type: '成长中的平衡者',
      description: '你正在建立自己的情绪操作系统。有些模块已经成熟，有些还在迭代中。这是绝大多数人的真实状态。',
      emoji: '⚖️',
      superpower: '因为经历过混乱，所以对他人更有耐心和同理心',
      kryptonite: '有时会退回到旧模式，但你已经能更快地觉察到了'
    }
  }

  const emotionalPortrait = getPortraitType()

  const getCommunicationStyle = () => {
    if (dimensions.empathy >= 70 && dimensions.selfManagement >= 70) {
      return '🎯 **直接同理型**：你天生擅长先接住对方的情绪，再清晰表达立场。共情+边界感是你的标志性能力'
    }
    if (dimensions.socialSkills >= 70 && dimensions.empathy >= 70) {
      return '🎭 **情境切换型**：你是天生的社交变色龙。见人说人话，见鬼说鬼话——这不是虚伪，是对他人的尊重'
    }
    if (dimensions.selfManagement >= 70 && dimensions.empathy < 60) {
      return '📊 **事实优先型**：你习惯先解决问题再处理情绪。对事不对人是你的座右铭，但有时会让人觉得太硬'
    }
    if (dimensions.empathy >= 70 && dimensions.selfManagement < 60) {
      return '🌊 **间接和谐型**：你太在乎别人的感受了，以至于宁愿委屈自己也不愿制造冲突'
    }
    if (dimensions.selfAwareness >= 70) {
      return '💎 **真实透明型**：你不演戏不装，你相信真诚是最高级的情商。时间会证明你是对的'
    }
    return '⚖️ **平衡务实型**：不极端，不演戏，在真诚和策略之间找平衡点——这才是最适合真实世界的风格'
  }

  const communicationStyle = getCommunicationStyle()

  const triggerPointMatrix = {
    selfAwarenessLow: ['被忽视的感受——没人问"你还好吗"，你就真的假装自己还好', '习惯性的自我攻击——事情不完美就等于"我整个人都很糟糕"'],
    selfManagementLow: ['被打断节奏——计划被打乱时，烦躁会超出比例地爆发', '积累到临界点的突然爆炸——平时都忍着，然后一次全部还回去'],
    selfMotivationLow: ['看不到终点的努力——你需要即时反馈，不然就会慢慢熄火', '和负能量的人待太久——他们会吸走你好不容易积攒的动力'],
    empathyLow: ['别人的情绪绑架——"如果你真的爱我"这句话会让你立刻进入防御模式', '假装共情的社交压力——明明没感觉，却还要表演"我懂你的感受"'],
    socialSkillsLow: ['不得不进行的虚假社交——寒暄三分钟对你来说像三小时', '公众场合被突然点名——你的大脑会瞬间一片空白'],
  }

  const stressResponseGuide = {
    triggerPoints: [
      weakest.key === 'selfAwareness' ? triggerPointMatrix.selfAwarenessLow[0] : 
      weakest.key === 'selfManagement' ? triggerPointMatrix.selfManagementLow[0] :
      weakest.key === 'selfMotivation' ? triggerPointMatrix.selfMotivationLow[0] :
      weakest.key === 'empathy' ? triggerPointMatrix.empathyLow[0] :
      triggerPointMatrix.socialSkillsLow[0],
      '当你睡眠不足6小时——所有EQ技能都会降低30%',
      '当你连续工作超过3小时没休息——你的情绪刹车会失灵',
    ],
    emergencyKit: [
      '🧊 生理降温：喝冰水/洗脸——情绪和体温高度相关',
      '🧘 478呼吸法：4秒吸气，7秒屏息，8秒呼气——立刻激活副交感神经',
      '🚪 物理离开：只要允许，离开那个环境5分钟——空间改变一切',
      '✍️ 写下来：把情绪变成文字就是在把它从杏仁核转移到前额叶',
    ],
    recoveryRitual: [
      '高强度社交后，给自己至少30分钟的"情绪独处时间"充电',
      '每周一个"无义务夜晚"——不回复消息，不扮演任何社会角色',
      '建立你的"情绪安全对象"名单——他们不需要解决问题，只需要倾听',
    ],
  }

  const relationshipMatches = {
    best: [
      dimensions.empathy > 60 ? '情绪稳定的务实主义者——TA接地，你飞，完美互补' : '高共情的治愈者——会温柔地教你什么是情绪',
      dimensions.selfManagement > 60 ? '偶尔情绪化的艺术家——TA的风暴有你这个避风港' : '边界清晰的自我管理者——TA的冷静会感染你',
      dimensions.socialSkills > 60 ? '安静的深度思考者——你负责连接世界，TA负责深度对话' : '外向的能量源——把你从壳里轻轻拉出来',
    ],
    watchOut: [
      '极端戏剧型人格——他们永远需要观众，而你耗尽电量也满足不了',
      '情绪勒索大师——"都是因为你"是他们的口头禅',
      '永远的受害者——他们不是来找解决方案的，是来找垃圾桶的',
    ],
    attractionPattern: dimensions.empathy > 60 
      ? '你容易被"有故事的受伤者"吸引——小心你的拯救者情结'
      : '你容易被"情绪成熟的人"吸引——因为这正是你想要成为的样子',
  }

  const workplaceScenarios = {
    conflictResolution: dimensions.selfManagement > 60
      ? '你是办公室的 Switzerland——冲突发生时大家都会看向你，因为你从不选边站'
      : '你需要在情绪起来之前按下暂停键——"我们先冷静10分钟再聊"是你的万能句子',
    receivingFeedback: dimensions.selfAwareness > 60
      ? '你能把反馈和自我价值分开——这是职业发展最稀缺的能力之一'
      : '收到负面反馈时你第一反应是防御。记住：听到后先深呼吸，数到三再开口',
    givingFeedback: dimensions.empathy > 60
      ? '你的反馈别人永远不会抗拒——因为你先说"我相信你可以更好"，再谈问题'
      : '你的直接有时会伤人。在"事实"前面加一句观察，效果会完全不同',
    teamDynamics: dimensions.socialSkills > 60
      ? '你是团队的粘合剂——有你在的地方就不会有冷场和尴尬'
      : '你是默默做事的可靠者。不必强迫自己成为社交中心，你的价值大家都看得到',
  }

  const emotionalGrowthRoadmap = {
    month1: [
      '🚀 安装"情绪命名器"：每次有强烈感受时，说出它的名字——愤怒/委屈/嫉妒/羞耻——仅仅命名就会减少30%的强度',
      '🚀 建立"预警系统"：识别你情绪失控的身体信号——咬紧牙关/心跳加速/声音变高——在爆炸前抓住它',
      '🚀 停止"应该思维"：把"我不应该生气"改成"我注意到我生气了"——评判只会加强情绪',
    ],
    month3: [
      '🌱 练习"非反应式回应"：别人的情绪不是你的紧急事件——不必立刻回应，你有权说"我稍后回复你"',
      '🌱 学习"共情但不吸收"：看见别人在淋雨，不代表你也要跳进去——你可以为TA撑伞',
      '🌱 建立"情绪账户"：每次照顾好自己的情绪就是存款，每次压抑就是取款',
    ],
    month6: [
      '🌟 发展"元情绪能力"：你不仅有情绪，你还能观察自己有情绪——这就是情绪自由的开始',
      '🌟 灵活切换情绪档位：情绪没有对错，只有合适不合适——该愤怒时愤怒，该柔软时柔软',
      '🌟 成为别人的情绪容器：你自己稳定了，自然就能承载别人的波动——这就是领导力的本质',
    ],
  }

  const emotionalDebtChecklist = [
    '🔍 你是否还欠自己一句"没关系"——为了某个很久以前的"错误"？',
    '🔍 你是否一直在替别人的情绪负责任——把TA的不开心变成了你的KPI？',
    '🔍 你是否说了太多"好的"而没说出口的"不"还在那里堆积如山？',
    '🔍 你是否还在为某个本该翻脸却选择了"算了"的时刻耿耿于怀？',
    '🔍 你是否在用"我没事"这句话，一遍又一遍地背叛真实的自己？',
  ]

  const difficultConversationScript = [
    '📝 开场："我想和你聊聊一件事，我不是想指责你，我只是想说出我的感受"',
    '📝 表达："当X发生时，我感受到了Y，因为对我来说Z很重要"',
    '📝 邀请："我想听听你的角度，这件事对你来说是什么样的？"',
    '📝 提议："有没有一种方式，我们可以同时满足双方的需求？"',
    '📝 底线："这是我可以妥协的部分，这是我不能让步的部分"',
  ]

  const getFamousEQMaster = () => {
    if (totalEQ >= 85) return famousEQMasters[0]
    if (totalEQ >= 70) return famousEQMasters[1]
    if (totalEQ >= 55) return famousEQMasters[2]
    return famousEQMasters[3]
  }

  const getWorkplaceAdvice = () => {
    const advice: string[] = []
    if (dimensions.selfManagement < 60) advice.push('愤怒的邮件先存草稿箱过夜——第二天你一定会感谢我')
    if (dimensions.empathy < 60) advice.push('同事犯错时，先处理情绪再处理问题——没人在羞愧时能真正听进去批评')
    if (dimensions.socialSkills < 60) advice.push('开会前先"扫描"房间里的情绪温度，这是会议成功的一半')
    advice.push('永远不要在群里公开批评任何人——公开表扬，私下反馈')
    advice.push('升职不是看你做了什么，而是看你让别人有什么感觉')
    return advice
  }

  const getRelationshipTips = () => {
    const tips: string[] = []
    if (dimensions.selfAwareness < 60) tips.push('下次说"我没事"之前，深呼吸，问问自己：这是真的吗？')
    if (dimensions.empathy < 60) tips.push('当伴侣吐槽时，别急着给解决方案——90%的时候TA只是想要被听见')
    if (dimensions.selfManagement < 60) tips.push('吵架时记得：你们是一起对抗问题，不是互相对抗')
    tips.push('"我感受到了你的情绪"是化解90%争吵的咒语')
    tips.push('亲密关系中，感受永远比"正确"更重要')
    return tips
  }

  const famousEQMasters = [
    { name: '曼德拉', quote: '怨恨就像自己喝毒药，却指望别人会死。', lesson: '真正的高情商不是不生气，而是不被愤怒囚禁' },
    { name: '奥普拉', quote: '转折点是当你说"我再也不要这样活下去了"的那一刻。', lesson: '情绪觉察是改变的第一步' },
    { name: '林肯', quote: '我不喜欢那个人，所以我必须更好地了解他。', lesson: '情商是把对手变成朋友的能力' },
    { name: '比尔盖茨', quote: '庆祝成功是应该的，但更重要的是从失败中吸取教训。', lesson: '面对挫折的情绪韧性比成功更重要' },
  ]

  const typeDescriptions: Record<string, string[]> = {
    '卓越': [
      `你的总EQ为 **${totalEQ}**，超过了 **${percentile}%** 的人群。你拥有真正的情绪智力天赋——这恰恰是决定人生成功和幸福的关键因素。`,
      `💎 EQ ${totalEQ}分，情绪智力大师！你不仅了解自己的情绪，更能娴熟地驾驭和引导它。这正是领导力和魅力的真正来源。`,
      `情绪自由已经是你的标配。你既能深刻共情他人，又能守住自己的边界。这种平衡是大多数人终其一生都在追寻的境界。`,
    ],
    '优秀': [
      `你的总EQ为 **${totalEQ}**，超过了 **${percentile}%** 的人。优秀的情绪智力是你人际关系和职业发展的隐形加速器。`,
      `🌟 EQ ${totalEQ}分——情绪世界的优等生。大多数人还在被情绪牵着走，而你已经学会了如何与情绪共舞。`,
      `出色的情绪感知和管理能力。你知道什么时候该倾听，什么时候该行动，什么时候该把自己的情绪放在一边。`,
    ],
    '良好': [
      `你的总EQ为 **${totalEQ}**，超过了 **${percentile}%** 的人。你的情绪智力基础相当不错，稍加打磨就会大放异彩。`,
      `✨ EQ ${totalEQ}分——大多数人都在这个区间。你在熟悉的环境中情绪管理出色，挑战场景下还可以更加从容。`,
      `你已经具备了情绪智力的核心要素：共情和自我觉察。剩下的就是在压力场景下刻意练习稳定性。`,
    ],
    '中等': [
      `你的总EQ为 **${totalEQ}**，情绪智力还有很大提升空间。好消息是：与IQ不同，EQ是可以通过训练大幅提升的。`,
      `🌱 EQ ${totalEQ}分。你可能经常觉得"为什么我总是事后诸葛亮"——其实不是你的错，只是你还没学会情绪的操作系统。`,
      `情绪智力不是天生的，是肌肉。你的起点并不差，只是需要一套系统的训练方法而已。`,
    ],
    '发展中': [
      `你的总EQ为 **${totalEQ}**，情绪觉察和管理是你接下来最重要的成长课题。记住：90%的沟通问题，本质上都是情绪问题。`,
      `🌱 情商这门课，大多数人从学校根本学不到。恭喜你这么早就意识到了它的存在——这本身就是觉醒的开始。`,
      `你可能经常觉得"明明我是对的，为什么没人听"。答案不在于道理，而在于情绪这个底层操作系统。`,
    ],
  }

  const famousByClassification: Record<string, string[]> = {
    '卓越': ['曼德拉', '奥普拉', '甘地', '特蕾莎修女'],
    '优秀': ['比尔盖茨', '巴菲特', '奥巴马', '米歇尔奥巴马'],
    '良好': ['大多数成功的团队领导者和管理者'],
    '中等': ['绝大多数普通人——好在EQ可以训练，而且人人都能学会'],
    '发展中': ['每个人都从这里开始——情商是技能，不是天赋'],
  }

  const getGrowthPlan = () => [
    `你的最强项是**${strongest.name}**——把它打造成你的标志性能力，成为你不可替代的标签`,
    `重点提升**${weakest.name}**——这是你的EQ杠杆点，提升10%胜过全面提升50%`,
    '每天花5分钟做情绪日记：今天我感受到了什么？是什么触发了它？',
    '冥想不是玄学，是情绪的健身房。从每天3分钟开始',
  ]

  return {
    totalEQ,
    percentile,
    classification,
    classificationEmoji,
    dimensions,
    radarData,
    strongest,
    weakest,
    emotionalPortrait,
    communicationStyle,
    stressResponseGuide,
    relationshipMatches,
    workplaceScenarios,
    emotionalGrowthRoadmap,
    emotionalDebtChecklist,
    difficultConversationScript,
    typeDescription: typeDescriptions[classification][totalEQ % typeDescriptions[classification].length],
    famousExamples: famousByClassification[classification],
    famousEQMaster: getFamousEQMaster(),
    workplaceAdvice: getWorkplaceAdvice(),
    relationshipTips: getRelationshipTips(),
    growthPlan: getGrowthPlan(),
  }
}
