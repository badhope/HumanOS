/**
 * ==============================================
 * 🧠 瑞文标准推理测验 - 核心计算器
 * ==============================================
 * 【测评定位】图形推理智商测试，无文化偏差
 * 【核心算法】5维度 × 7题/维度 = 35题矩阵推理
 * 【理论来源】Raven's Standard Progressive Matrices
 * 
 * 【⚠️  超级重要警告】
 * 1. 直接按题号 iq-a1, iq-b1... 硬编码分组！！！（不是iq-1纯数字！）
 * 2. 【血泪教训】题号系统错了 = 所有人所有题全错=所有人智商永远一样！
 * 3. 改了题号这里一定改！题目顺序错了智商全错！
 * 4. 这是唯一的客观测试，有标准答案！
 */

import type { Answer, AssessmentResult } from '../../types'

/**
 * 工具函数：从数组随机挑选一个（全项目通用）
 */
const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

/**
 * 瑞文智商测试结果接口
 * 【五大推理维度】难度递增
 * - PatternCompletion: 图案补全（最简单）
 * - AnalogicalReasoning: 类比推理
 * - SerialReasoning: 系列推理
 * - LogicalReasoning: 逻辑推理
 * - AdvancedReasoning: 高级推理（最难）
 */
export interface IQResult extends Record<string, any> {
  rawScore: number
  iqScore: number
  percentile: number
  classification: string
  classificationEmoji: string
  dimensions: {
    patternCompletion: number
    analogicalReasoning: number
    serialReasoning: number
    logicalReasoning: number
    advancedReasoning: number
  }
  radarData: { dimension: string; score: number; fullMark: number }[]
  typeDescription: string
  cognitiveStyle: {
    name: string
    description: string
    emoji: string
  }
  thinkingPattern: string
  learningStrategy: string[]
  careerMatches: { name: string; reason: string; match: number }[]
  famousPeer: { name: string; quote: string; similarity: number }
  blindSpots: string[]
  brainTrainingPlan: { daily: string[]; weekly: string[]; monthly: string[] }
  speedVsDepth: { preference: string; balance: string }
  informationProcessing: string
  problemSolvingTactic: string
  cognitiveProfile: string[]
  famousPeople: string[]
  strengthAreas: string[]
  improvementTips: string[]
}

export function calculateIQ(answers: Answer[]): IQResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 0))
  })

  const correctAnswers: Record<string, number> = {
    'iq-a1': 4, 'iq-a2': 2, 'iq-a3': 1, 'iq-a4': 5, 'iq-a5': 3, 'iq-a6': 6,
    'iq-b1': 2, 'iq-b2': 6, 'iq-b3': 1, 'iq-b4': 4, 'iq-b5': 3, 'iq-b6': 5,
    'iq-c1': 4, 'iq-c2': 2, 'iq-c3': 2, 'iq-c4': 2, 'iq-c5': 3, 'iq-c6': 2,
    'iq-d1': 3, 'iq-d2': 4, 'iq-d3': 2, 'iq-d4': 2, 'iq-d5': 4, 'iq-d6': 3,
    'iq-e1': 4, 'iq-e2': 5, 'iq-e3': 1, 'iq-e4': 1, 'iq-e5': 1, 'iq-e6': 6,
    'iq-f1': 3, 'iq-f2': 3, 'iq-f3': 3, 'iq-f4': 1, 'iq-f5': 3, 'iq-f6': 3,
    'iq-g1': 2, 'iq-g2': 3, 'iq-g3': 1, 'iq-g4': 3, 'iq-g5': 3, 'iq-g6': 3,
    'iq-h1': 3, 'iq-h2': 1, 'iq-h3': 5, 'iq-h4': 3, 'iq-h5': 3, 'iq-h6': 3,
    'iq-i1': 1, 'iq-i2': 2, 'iq-i3': 2, 'iq-i4': 1, 'iq-i5': 1, 'iq-i6': 2,
    'iq-j1': 2, 'iq-j2': 2, 'iq-j3': 3, 'iq-j4': 2, 'iq-j5': 2, 'iq-j6': 3,
  }

  let rawScore = 0
  Object.keys(correctAnswers).forEach(id => {
    if (answerMap[id] === correctAnswers[id]) rawScore++
  })

  const aItems = ['iq-a1', 'iq-a2', 'iq-a3', 'iq-a4', 'iq-a5', 'iq-a6']
  const bItems = ['iq-b1', 'iq-b2', 'iq-b3', 'iq-b4', 'iq-b5', 'iq-b6']
  const cItems = ['iq-c1', 'iq-c2', 'iq-c3', 'iq-c4', 'iq-c5', 'iq-c6']
  const dItems = ['iq-d1', 'iq-d2', 'iq-d3', 'iq-d4', 'iq-d5', 'iq-d6']
  const eItems = ['iq-e1', 'iq-e2', 'iq-e3', 'iq-e4', 'iq-e5', 'iq-e6']
  const fItems = ['iq-f1', 'iq-f2', 'iq-f3', 'iq-f4', 'iq-f5', 'iq-f6']
  const gItems = ['iq-g1', 'iq-g2', 'iq-g3', 'iq-g4', 'iq-g5', 'iq-g6']
  const hItems = ['iq-h1', 'iq-h2', 'iq-h3', 'iq-h4', 'iq-h5', 'iq-h6']
  const iItems = ['iq-i1', 'iq-i2', 'iq-i3', 'iq-i4', 'iq-i5', 'iq-i6']
  const jItems = ['iq-j1', 'iq-j2', 'iq-j3', 'iq-j4', 'iq-j5', 'iq-j6']

  const calcSubscore = (items: string[]) => items.reduce((sum, id) => 
    sum + (answerMap[id] === correctAnswers[id] ? 1 : 0), 0)

  const dimensions = {
    patternCompletion: Math.round((calcSubscore(aItems) / 6) * 100),
    analogicalReasoning: Math.round((calcSubscore(bItems) / 6) * 100),
    serialReasoning: Math.round((calcSubscore(cItems) + calcSubscore(fItems)) / 12 * 100),
    logicalReasoning: Math.round((calcSubscore(dItems) + calcSubscore(hItems)) / 12 * 100),
    advancedReasoning: Math.round((calcSubscore(eItems) + calcSubscore(gItems) + calcSubscore(iItems) + calcSubscore(jItems)) / 24 * 100),
  }

  const radarData = [
    { dimension: '图形补全', score: calcSubscore(aItems), fullMark: 6 },
    { dimension: '类比推理', score: calcSubscore(bItems), fullMark: 6 },
    { dimension: '数字序列', score: calcSubscore(cItems) + calcSubscore(fItems), fullMark: 12 },
    { dimension: '逻辑推理', score: calcSubscore(dItems) + calcSubscore(hItems), fullMark: 12 },
    { dimension: '高级思维', score: calcSubscore(eItems) + calcSubscore(gItems) + calcSubscore(iItems) + calcSubscore(jItems), fullMark: 24 },
  ]

  const iqConversion = [
    { raw: 0, iq: 55 }, { raw: 6, iq: 70 }, { raw: 12, iq: 80 },
    { raw: 20, iq: 90 }, { raw: 30, iq: 100 }, { raw: 40, iq: 110 },
    { raw: 48, iq: 120 }, { raw: 54, iq: 130 }, { raw: 58, iq: 140 }, { raw: 60, iq: 150 },
  ]

  let iqScore = 70
  for (let i = iqConversion.length - 1; i >= 0; i--) {
    if (rawScore >= iqConversion[i].raw) {
      iqScore = iqConversion[i].iq
      break
    }
  }

  const percentile = Math.round(Math.min(99.9, 50 + ((iqScore - 100) / 15) * 34))

  let classification: string
  let classificationEmoji: string

  if (iqScore >= 130) { classification = '非常优秀'; classificationEmoji = '🧠' }
  else if (iqScore >= 120) { classification = '优秀'; classificationEmoji = '⭐' }
  else if (iqScore >= 110) { classification = '中上'; classificationEmoji = '✨' }
  else if (iqScore >= 90) { classification = '平均'; classificationEmoji = '📊' }
  else if (iqScore >= 80) { classification = '中下'; classificationEmoji = '📚' }
  else { classification = '需要训练'; classificationEmoji = '💪' }

  const scores = Object.values(dimensions)
  const maxDim = Object.entries(dimensions).sort((a, b) => b[1] - a[1])[0][0]

  const cognitiveStyles: Record<string, { name: string; description: string; emoji: string }> = {
    patternCompletion: {
      name: '格式塔型思考者',
      description: '你倾向于从整体上把握事物，擅长在混乱中发现隐藏的规律。别人看到的是碎片，你看到的是完整的图景。',
      emoji: '🔲'
    },
    analogicalReasoning: {
      name: '跨界联想者',
      description: '你的大脑天然擅长建立看似不相关领域之间的联系。迁移学习是你的超能力，一个领域的洞见能照亮另一个领域。',
      emoji: '🔗'
    },
    serialReasoning: {
      name: '逻辑演绎大师',
      description: '你擅长一步一步地推理，每个环节都严丝合缝。链式思维是你的标配，线性逻辑没人比你更清晰。',
      emoji: '⛓️'
    },
    spatialVisualization: {
      name: '空间建筑师',
      description: '你拥有非凡的心理旋转和空间操作能力。你能在脑海中搭建整个世界，旋转它、拆解它、重组它。',
      emoji: '🧊'
    },
    matrixReasoning: {
      name: '多维矩阵思考者',
      description: '你擅长同时处理多维度信息，在复杂矩阵中发现深层规则。这正是抽象思维的最高形式。',
      emoji: '🔢'
    },
  }

  const cognitiveStyle = cognitiveStyles[maxDim]

  const thinkingPatterns: Record<string, string[]> = {
    '非常优秀': [
      '你属于**闪电式顿悟型**思考者——答案经常"跳出来"而不是推出来。这是真正天才的标志。',
      '**并行处理**是你的默认模式——大脑后台同时运行多个思考线程。',
      '你天然会进行**信息压缩**——把复杂概念转化成极简模型。',
    ],
    '优秀': [
      '你是**系统构建者**——喜欢从头搭建完整的思维框架。',
      '**第一性原理**思考对你来说几乎是本能——从不满足于表面答案。',
      '你擅长**模式移植**——把A领域的解法优雅地应用到B领域。',
    ],
    '中上': [
      '你是**快速学习者**——接触新领域时曲线异常陡峭。',
      '**类比思维**是你的秘密武器——用已知理解未知的效率极高。',
      '你懂得适时切换**思维粒度**——该宏观时宏观，该微观时微观。',
    ],
    '平均': [
      '你是**实用主义思考者**——够用就好，不钻不必要的牛角尖。',
      '**经验+逻辑**混合决策模式——这恰恰是最适合现实世界的策略。',
      '你思维的最大优点是**稳定性**——不会因为想太多而陷入瘫痪。',
    ],
    '中下': [
      '你是**脚踏实地型**思考者——具象思维比抽象思维更发达。',
      '**试错迭代**是你的最优路径——在实践中学习比纸上谈兵高效得多。',
      '你拥有大多数聪明人求而不得的特质：**思维简洁性**。',
    ],
    '需要训练': [
      '你是**大器晚成型**思考者——厚积薄发比早熟更珍贵。',
      '你的大脑正处在**神经可塑性峰值**——现在开始训练，进步会指数级增长。',
      '**刻意练习**对你的效果会比其他人更显著——因为你没有固化的思维定势。',
    ],
  }

  const learningStrategies = [
    '📚 **费曼技巧**：把复杂概念讲给小学生听——这是验证你是否真懂的黄金标准。',
    '🗺️ **间隔重复**：同样的时间，分散在7天内学习的效果是集中学习的300%。',
    '🔄 **交错练习**：不要一次只练一种题，混合题型能激活大脑的对比学习机制。',
    '🧘 **双任务范式**：简单任务配背景音乐，复杂任务配绝对安静。',
    '✍️ **手写笔记**：手写时大脑的编码深度是打字的2.5倍——好记性不如烂笔头。',
    '🎯 **生成效应**：先自己想答案再看解释，学习效果翻三倍。',
  ]

  const careerPools: Record<string, { name: string; reason: string; match: number }[]> = {
    '非常优秀': [
      { name: '理论物理研究', reason: '只有前1%的大脑能真正理解量子力学和相对论', match: 95 },
      { name: '高级算法工程师', reason: '你就是那种能发明新算法的人，而不只是调用API', match: 92 },
      { name: '量化交易研究员', reason: '在市场噪声中发现信号的能力价值连城', match: 90 },
    ],
    '优秀': [
      { name: '全栈架构师', reason: '你能同时hold住技术细节和整体架构', match: 88 },
      { name: '产品经理', reason: '把技术可能性翻译成用户需求的能力是你的天赋', match: 85 },
      { name: '数据科学家', reason: '从数据中讲故事的能力是21世纪的炼金术', match: 85 },
    ],
    '中上': [
      { name: '后端开发工程师', reason: '严谨的逻辑思维是高质量代码的保证', match: 82 },
      { name: '管理咨询顾问', reason: '快速理解陌生行业并给出方案——这就是咨询的本质', match: 80 },
      { name: 'UX设计师', reason: '理解用户思维模型的能力是好设计的起点', match: 78 },
    ],
    '平均': [
      { name: '项目经理', reason: '把事情做成比智商更重要，但智商够用是基础', match: 80 },
      { name: '运营专家', reason: '数据驱动+用户敏感度=优秀运营', match: 78 },
      { name: '销售工程师', reason: '懂技术又懂人的人才是真正稀缺的', match: 75 },
    ],
    '中下': [
      { name: '客户成功经理', reason: '同理心比智商重要10倍', match: 85 },
      { name: '执行型管理者', reason: '把战略落地比想出战略更难也更重要', match: 80 },
      { name: '匠人型岗位', reason: '刻意练习能把任何技能练到出神入化', match: 78 },
    ],
    '需要训练': [
      { name: '所有需要厚积薄发的领域', reason: '成长空间就是最大的优势', match: 90 },
      { name: '经验驱动型岗位', reason: '时间是你最好的朋友', match: 85 },
      { name: '人际密集型工作', reason: '这个领域的天花板是情商，不是智商', match: 80 },
    ],
  }

  const famousPeers = [
    { name: '理查德·费曼', quote: '如果你不能简单地解释它，你就没有真正理解它。', similarity: 85 + Math.floor(Math.random() * 15) },
    { name: '爱因斯坦', quote: '想象力比知识更重要，因为知识是有限的。', similarity: 80 + Math.floor(Math.random() * 20) },
    { name: '冯·诺依曼', quote: '如果人们不相信数学简单，那是因为他们没有意识到人生有多复杂。', similarity: 75 + Math.floor(Math.random() * 20) },
    { name: '图灵', quote: '有时候，正是那些无人看好之人，成就了无人能及之事。', similarity: 78 + Math.floor(Math.random() * 17) },
  ]

  const blindSpotsByLevel: Record<string, string[]> = {
    '非常优秀': [
      '⚠️ **过度复杂性偏好**：你倾向于把简单问题复杂化，因为你的大脑能处理。但大多数时候，简单的解决方案才是最好的。',
      '⚠️ **耐心阈值太低**：你理解只需要0.1秒，但别人可能需要10秒。这种差距会让你容易不耐烦。',
      '⚠️ **高智商孤独**：能跟上你思维节奏的人很少，这可能让你习惯性地觉得"别人都太笨了"。',
    ],
    '优秀': [
      '⚠️ **半成品陷阱**：你理解得太快，以至于经常跳过关键细节，然后在阴沟里翻船。',
      '⚠️ **三心二意**：你能同时思考很多事，但这意味着你很少能把任何一件事做到极致。',
      '⚠️ **真理上瘾**：你太喜欢正确了，以至于会在不重要的事情上也要辩赢对方。',
    ],
    '中上': [
      '⚠️ **聪明反被聪明误**：你知道的足够多，让你总能为自己的错误找到合理的解释。',
      '⚠️ **捷径依赖**：你太擅长找捷径了，以至于不愿意走那条虽然慢但真正重要的路。',
      '⚠️ **中途放弃**：你学习曲线太陡，以至于很难真正在一个领域深耕10000小时。',
    ],
    '平均': [
      '⚠️ **权威依赖**：你太容易相信"专家说的"，而忘了专家也经常错。',
      '⚠️ **从众思维**：你会不自觉地向大多数人看齐，哪怕他们是错的。',
      '⚠️ **分析瘫痪**：信息太多时，你会陷入"再等等"的陷阱而迟迟不行动。',
    ],
    '中下': [
      '⚠️ **自我设限**：最大的障碍不是智商，而是你潜意识里认为"聪明人才能做的事我不行"。',
      '⚠️ **害怕犯傻**：你太怕问"蠢问题"了，以至于很多可以搞懂的事情一直搞不懂。',
      '⚠️ **迷信天赋**：你看到别人学得快，就归因于"他聪明"，而忘了他偷偷练了多久。',
    ],
    '需要训练': [
      '⚠️ **过早放弃**：还没等到大脑神经突触真正建立连接，你就先放弃了。',
      '⚠️ **比较陷阱**：总是和最聪明的人比，而忘了大多数人都和你在同一起跑线。',
      '⚠️ **方法错误**：用错了学习方法，却误以为是智商问题。',
    ],
  }

  const brainTrainingPlan = {
    daily: [
      '🧩 10分钟数独或KenKen谜题——激活工作记忆网络',
      '🔄 1分钟心理旋转练习——想象一个立方体在各个角度的样子',
      '🧘 5分钟专注呼吸——工作记忆容量和专注力高度相关',
    ],
    weekly: [
      '🎮 玩一局Portal或The Witness——空间推理和逻辑训练两不误',
      '📐 尝试证明一个你已经知道的数学定理——理解比记住重要',
      '🗣️ 把你最近学到的一个概念讲给一个完全不懂的人听',
    ],
    monthly: [
      '📚 学习一个你完全不了解的领域的基础概念——拓展认知边界',
      '🧩 尝试解决一个已经被解决的经典问题——不要看答案',
      '🔄 彻底改变一次你的日常路线——给大脑新奇刺激',
    ],
  }

  const calcSpeedVsDepth = () => {
    const patternBias = dimensions.patternCompletion + dimensions.analogicalReasoning
    const depthBias = dimensions.advancedReasoning + dimensions.logicalReasoning
    if (patternBias > depthBias) {
      return { preference: '广度优先型', balance: '你喜欢先建立全貌，扫描所有可能性再深入——B组类比推理得分验证了这一点' }
    }
    if (depthBias > patternBias) {
      return { preference: '深度优先型', balance: '你宁愿彻底搞懂核心问题，也不愿浅尝辄止——高级思维组表现证明了这一点' }
    }
    return { preference: '平衡扫描型', balance: '你能灵活在广度和深度之间切换，这是非常稀缺的元认知能力' }
  }

  const calcInformationProcessing = () => {
    if (dimensions.advancedReasoning >= Math.max(dimensions.patternCompletion, dimensions.analogicalReasoning, dimensions.serialReasoning, dimensions.logicalReasoning)) {
      return '🔀 **螺旋演绎型**：高级思维最强——你喜欢在整体和部分之间来回跳跃，直到问题突然清晰'
    }
    if (dimensions.serialReasoning >= 80) {
      return '📤 **自顶向下型**：序列推理满分——你从第一原理出发，一步一步严谨推导，绝不出错'
    }
    if (dimensions.analogicalReasoning >= 80) {
      return '🔗 **跨界联类型**：类比推理超群——你总能在看似无关的领域之间找到隐藏的连接'
    }
    if (dimensions.patternCompletion >= 80) {
      return '📥 **归纳完型者**：图形补全天分——你从具体事实中直觉地发现普遍规律'
    }
    return '⚡ **实用主义者**：你根据问题类型灵活切换信息处理策略，没有思维定势'
  }

  const calcProblemSolvingTactic = () => {
    if (dimensions.serialReasoning >= 80) return '✂️ **分治法大师**：你擅长把大问题拆成更小的可解部分，然后各个击破'
    if (dimensions.logicalReasoning >= 80) return '🔄 **逆向思考者**：逻辑能力让你天然擅长从终点倒推起点'
    if (dimensions.analogicalReasoning >= 80) return '🔗 **迁移学习者**：你解决新问题的方式是找一个已经解决的类似问题，然后移植'
    if (dimensions.advancedReasoning >= 80) return '🎯 **系统穷举者**：你在多维空间中系统地排除所有不可能，剩下的就是真相'
    return '🧩 **暴力破解者**：你不迷信什么优雅方法，最直接的方法就是最好的方法'
  }

  const getFamousPeer = () => {
    if (iqScore >= 135) return famousPeers[Math.floor(Math.random() * 2)]
    if (iqScore >= 120) return famousPeers[2]
    if (iqScore >= 110) return famousPeers[3]
    return famousPeers[Math.floor(Math.random() * famousPeers.length)]
  }

  const speedVsDepth = calcSpeedVsDepth()
  const informationProcessing = calcInformationProcessing()
  const problemSolvingTactic = calcProblemSolvingTactic()

  const typeDescriptions: Record<string, string[]> = {
    '非常优秀': [
      `你的IQ得分为 **${iqScore}**，超过了 **${percentile}%** 的人群。恭喜你进入了人类认知能力的前2%！你拥有真正的流体智力优势。`,
      `🧠 标准分 ${iqScore}——真正的高智商。只有2%的人能达到这个水平。你发现模式的能力远超常人，复杂问题在你眼中只是简单的组合。`,
      `天才阈值已解锁！你的抽象推理能力是真正的稀缺资源。记住：高智商不是终点，而是更广阔的起点。`,
    ],
    '优秀': [
      `你的IQ为 **${iqScore}**，超过了 **${percentile}%** 的人。优秀的流体智力——这是科研、编程、复杂问题解决的天然优势。`,
      `⭐ ${iqScore} 分意味着你在人群中属于前15%。发现规律对你来说几乎是本能。这就是所谓的"聪明人"的基础。`,
      `认知能力处于优秀区间。大多数人需要反复试错才能发现的模式，你一眼就能看穿。`,
    ],
    '中上': [
      `你的IQ为 **${iqScore}**，超过了 **${percentile}%** 的人。良好的流体智力是大多数人可望不可及的优势。`,
      `✨ ${iqScore} 分——人群中前25%的认知能力。学习新技能、理解新概念对你来说比大多数人更容易。`,
      `聪明而不张扬。你的认知能力已经足以应付这个世界上99%的复杂局面。`,
    ],
    '平均': [
      `你的IQ为 **${iqScore}**，与全国人口平均水平基本一致。记住：IQ测试的是特定的推理能力，不是人生的全部。`,
      `📊 ${iqScore} 分——黄金平均值。这恰恰是大多数成功人士的智商区间。真正决定成就的，往往是专注和坚持。`,
      `最正常也最幸运的区间。流体智力够用，也不会因为想太多而痛苦。这其实是很多人求之不得的状态。`,
    ],
    '中下': [
      `你的IQ为 **${percentile}**，流体智力还有很大的提升空间。好消息是：瑞文测试测的是可以训练的技能，不是一成不变的宿命。`,
      `📚 你的分数说明抽象推理不是你的直觉优势。但正是因为知道哪里可以提升，才是真正的智慧的开始。`,
      `记住：这个世界上绝大多数有价值的事情，不需要超高智商。需要的是方法、坚持和重复。`,
    ],
    '需要训练': [
      `你的IQ为 **${iqScore}**，抽象推理能力需要系统性的训练。不要气馁——智力不是固定的特质，它是可以锻炼的肌肉。`,
      `💪 这恰恰是成长空间最大的信号。从今天开始，每天做一道逻辑题，六个月后你会惊叹于自己的变化。`,
      `大多数人终其一生都没有正式测量过自己的认知能力。你已经迈出了最勇敢的第一步：看见真实的自己。`,
    ],
  }

  const famousPeopleByLevel: Record<string, string[]> = {
    '非常优秀': ['爱因斯坦', '霍金', '冯·诺依曼', '陶哲轩'],
    '优秀': ['马斯克', '乔布斯', '费曼', '图灵'],
    '中上': ['比尔盖茨', '巴菲特', '乔丹', '贝佐斯'],
    '平均': ['大多数成功人士都在这个区间——智商是入场券，不是门票'],
    '中下': ['阿甘——有时候笨方法才是真捷径'],
    '需要训练': ['每个人都是从这里开始的——神经可塑性永远存在'],
  }

  const cognitiveProfiles = {
    '非常优秀': ['直觉式发现模式', '跨领域关联能力', '压缩信息能力', '元认知觉醒'],
    '优秀': ['快速抓住本质', '举一反三能力', '系统性思维', '抽象建模'],
    '中上': ['逻辑严谨', '学习速度快', '善于总结', '框架思维'],
    '平均': ['线性思维可靠', '执行力强', '经验主义有效', '实用导向'],
    '中下': ['脚踏实地', '不钻牛角尖', '具象思维', '厚积薄发'],
    '需要训练': ['成长型思维', '潜力巨大', '可塑性强', '无思维定势'],
  }

  const strengthPools = [
    ['你的A组得分很高：简单图形中发现规律的直觉非常出色', '模式识别是你的强项——这正是编程和设计的基础能力', '你天然擅长完形填空——大脑会自动补全缺失的信息'],
    ['类比推理是你的优势——理解新事物并建立关联的速度很快', 'B组正确率说明你有迁移学习的天赋', '跨界思维对你来说是本能而不是技巧'],
    ['序列推理是你的王牌——逻辑链条的完整性和一致性极佳', 'C组表现说明你有程序员的天然潜质', '因果关系是你的思维坐标系'],
  ]

  const improvementTipsPools = [
    ['每天10分钟数独：锻炼你的工作记忆和模式识别', '玩玩Factorio游戏：在玩乐中提升系统思维', '遇到问题先画思维导图——视觉化能激活一半的大脑神经元'],
    ['学习编程的基础概念——这是最好的逻辑健身房', '遇到问题时，先画出来再思考——可视化能激活你的空间智力', '学学范畴论——这是抽象思维的奥林匹克'],
    ['下次做决定时，问自己"这背后的模式是什么"——养成元认知习惯', '智力不是肌肉，是使用方式——刻意练习才是关键', '每天花10分钟证明你是错的——这是最高效的思维训练'],
  ]

  const getStrengthAreas = () => {
    const areas: string[] = []
    if (dimensions.patternCompletion >= 80) areas.push('图形规律直觉出色——模式识别是编程和设计的基础')
    if (dimensions.analogicalReasoning >= 80) areas.push('类比推理天赋——迁移学习能力远超常人')
    if (dimensions.serialReasoning >= 80) areas.push('数字序列极佳——程序员的天然特质')
    if (dimensions.logicalReasoning >= 80) areas.push('逻辑推理严谨——律师和科学家的思维方式')
    if (dimensions.advancedReasoning >= 80) areas.push('高级思维突出——这正是高智商的核心标志')
    if (areas.length === 0) areas.push('各项认知能力均衡发展——木桶效应在你身上不成立')
    return areas
  }

  const getImprovementTips = () => {
    const weakest = Object.entries(dimensions).sort((a, b) => a[1] - b[1])[0][0]
    const tips: string[] = []
    if (weakest === 'advancedReasoning') tips.push('每天一道数独高级题——专门训练多维度关联能力')
    if (weakest === 'logicalReasoning') tips.push('试试编程算法题——在玩乐中锻炼逻辑推理能力')
    if (weakest === 'serialReasoning') tips.push('学习编程基础——强迫大脑进行严谨的链式推理')
    if (weakest === 'analogicalReasoning') tips.push('遇到新概念时，强迫自己找3个类似的事物')
    if (weakest === 'patternCompletion') tips.push('玩找茬或图片复原游戏——激活完形识别神经网络')
    tips.push('智力不是肌肉是技能——方法对了，每个人都能提升至少15分')
    return tips
  }

  return {
    rawScore,
    iqScore,
    percentile,
    classification,
    classificationEmoji,
    dimensions,
    radarData,
    typeDescription: randomPick(typeDescriptions[classification]),
    cognitiveStyle,
    thinkingPattern: thinkingPatterns[classification][rawScore % thinkingPatterns[classification].length],
    learningStrategy: learningStrategies,
    careerMatches: careerPools[classification],
    famousPeer: getFamousPeer(),
    blindSpots: blindSpotsByLevel[classification],
    brainTrainingPlan,
    speedVsDepth,
    informationProcessing,
    problemSolvingTactic,
    cognitiveProfile: cognitiveProfiles[classification],
    famousPeople: famousPeopleByLevel[classification],
    strengthAreas: getStrengthAreas(),
    improvementTips: getImprovementTips(),
  }
}
