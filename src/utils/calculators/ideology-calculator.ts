/**
 * ==============================================
 * 🧭 意识形态九宫格 - 核心计算器
 * ==============================================
 * 【测评定位】政治坐标测试（改进版）
 * 【核心算法】4轴 × 10题/轴 = 40题
 * 【理论来源】Political Compass 升级版
 * 
 * ==============================================
 * 🤖 AI编码契约 - 大模型修改此文件必须遵守！
 * ==============================================
 * 🔴 绝对禁止的操作：
 * 1. 不准修改任何维度字段名
 * 2. 不准修改ideo-xxx的硬编码题号映射
 * 3. 不准修改坐标轴的映射阈值（第75行开始）
 * 4. 不准修改19种意识形态类型的分类名称
 * 
 * 🟡 修改前必须完成的校验：
 * 1. 所有题号必须是 ideo-前缀（不是ideology!）
 * 2. 每个轴的最终分数范围必须是0-100
 * 3. 九宫格映射阈值必须对称分布
 * 
 * 🟢 允许的操作：
 * - 调整意识形态类型的描述文本
 * - 新增更多边缘情况的类型描述
 * - 优化解释性文本
 * 
 * 【⚠️  血泪教训！】
 * 用了ideology-1前缀，这里写的ideo-1 = 所有分数=0，所有人都在中间！
 */

import type { Answer, AssessmentResult } from '../../types'
import { diversityEngine, isomericEngine } from '../../data/assessments/diversity-enhancement-engine'
import { ideologyAssessment } from '../../data/assessments/ideology-9square'

/**
 * 工具函数：从数组随机挑选一个（全项目通用）
 */
const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const IDEOLOGY_NORMS = {
  economicScore: { mean: 52, sd: 22 },
  socialScore: { mean: 48, sd: 24 },
  diplomaticScore: { mean: 55, sd: 21 },
  culturalScore: { mean: 53, sd: 23 },
}

/**
 * 意识形态九宫格结果接口
 * 【四大坐标轴】
 * - 经济轴：平等 ↔ 市场
 * - 社会轴：威权 ↔ 自由
 * - 外交轴：国际主义 ↔ 民族主义
 * - 文化轴：传统 ↔ 进步
 */
export interface IdeologyResult extends Record<string, any> {
  economicScore: number
  socialScore: number
  diplomaticScore: number
  culturalScore: number
  economicAxis: 'far-left' | 'left' | 'center' | 'right' | 'far-right'
  socialAxis: 'authoritarian' | 'moderate' | 'centrist' | 'liberal' | 'libertarian'
  diplomaticAxis: 'internationalist' | 'neutral' | 'nationalist'
  culturalAxis: 'traditionalist' | 'conservative' | 'neutral' | 'progressive' | 'radical'
  ideologyType: string
  ideologyEmoji: string
  specificIdeology: string
  gridPosition: { row: number; col: number }
  dimensions: {
    equality: number
    market: number
    authority: number
    liberty: number
    nation: number
    international: number
    tradition: number
    progress: number
  }
  compassData: { axis: string; value: number; position: string }[]
  typeDescription: string
  famousPeople: string[]
  typicalTraits: string[]
  internetPersona: string
  classicTake: string
  whatMakesYouMad: string
  debateTactics: string[]
  famousQuote: string
  historicalEventTake: string
  compatibility: { best: string[]; worst: string[] }
  enemiesList: string[]
  readingList: string[]
  memeLevel: string
  purityScore: number
  culturalPosition: string
}

export function calculateIdeology(answers: Answer[]): IdeologyResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
  })

  const economicItems = ['ideo-1', 'ideo-2', 'ideo-3', 'ideo-4', 'ideo-5', 'ideo-6', 'ideo-7', 'ideo-8', 'ideo-9', 'ideo-10']
  const socialItems = ['ideo-11', 'ideo-12', 'ideo-13', 'ideo-14', 'ideo-15', 'ideo-16', 'ideo-17', 'ideo-18', 'ideo-19', 'ideo-20']
  const diplomaticItems = ['ideo-21', 'ideo-22', 'ideo-23', 'ideo-24', 'ideo-25', 'ideo-26', 'ideo-27', 'ideo-28', 'ideo-29', 'ideo-30']
  const culturalItems = ['ideo-31', 'ideo-32', 'ideo-33', 'ideo-34', 'ideo-35', 'ideo-36', 'ideo-37', 'ideo-38', 'ideo-39', 'ideo-40', 'ideo-41', 'ideo-42', 'ideo-43', 'ideo-44', 'ideo-45', 'ideo-46', 'ideo-47', 'ideo-48', 'ideo-49', 'ideo-50']
  
  const reverseEconomic = ['ideo-3', 'ideo-6', 'ideo-7', 'ideo-9']
  const reverseSocial = ['ideo-13', 'ideo-16', 'ideo-18', 'ideo-23']
  const reverseDiplomatic = ['ideo-22', 'ideo-25', 'ideo-29']
  const reverseCultural = ['ideo-33', 'ideo-37', 'ideo-42', 'ideo-47']

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
    economicScore: calcScore(economicItems, reverseEconomic),
    socialScore: calcScore(socialItems, reverseSocial),
    diplomaticScore: calcScore(diplomaticItems, reverseDiplomatic),
    culturalScore: calcScore(culturalItems, reverseCultural),
  }

  const responseValues = Object.fromEntries(
    Object.entries(answerMap).map(([k, v]) => [k, typeof v === 'number' ? v : Number(v) || 3])
  )
  const responseStyle = diversityEngine.calculateResponseStyle(responseValues, 5)
  const correctedScores = diversityEngine.applyResponseStyleCorrection(rawScores, responseStyle)
  const enhanced = diversityEngine.enhanceResultDiversity(correctedScores, {
    responseId: 'ideology-' + Date.now(),
    rawScores,
    responseStyle,
    diversityMetrics: {
      scoreEntropy: diversityEngine.calculateShannonEntropy(Object.values(rawScores)),
      dimensionSpread: Math.max(...Object.values(rawScores)) - Math.min(...Object.values(rawScores)),
      resultUniqueness: diversityEngine.calculateUniquenessScore(rawScores, IDEOLOGY_NORMS),
    },
  }) as typeof rawScores

  const { economicScore, socialScore, diplomaticScore, culturalScore } = enhanced

  const allScoresInMidrange = Object.values(enhanced).every(s => s >= 42 && s <= 58)
  const fingerprint = isomericEngine.generateResponseFingerprint(responseValues, ideologyAssessment.questions)
  const midrangeSubtype = isomericEngine.classifyMidrangeSubtype(fingerprint, enhanced)

  const getEconomicAxis = (s: number) => {
    if (s < 15) return 'far-left'
    if (s < 35) return 'left'
    if (s < 55) return 'center'
    if (s < 75) return 'right'
    return 'far-right'
  }

  const getSocialAxis = (s: number) => {
    if (s < 15) return 'libertarian'
    if (s < 30) return 'liberal'
    if (s < 45) return 'centrist'
    if (s < 70) return 'moderate'
    return 'authoritarian'
  }

  const economicAxis = getEconomicAxis(economicScore)
  const socialAxis = getSocialAxis(socialScore)

  let specificIdeology = '中间派'

  if (economicAxis === 'far-left' && socialAxis === 'authoritarian') specificIdeology = '斯大林主义 🚩'
  else if (economicAxis === 'far-left' && socialAxis === 'moderate') specificIdeology = '毛主义 ☭'
  else if (economicAxis === 'far-left' && socialAxis === 'centrist') specificIdeology = '托洛茨基主义 🌐'
  else if (economicAxis === 'far-left' && (socialAxis === 'liberal' || socialAxis === 'libertarian')) specificIdeology = '无政府共产主义 ⚫'
  
  else if (economicAxis === 'left' && socialAxis === 'authoritarian') specificIdeology = '国家社会主义 ⚒️'
  else if (economicAxis === 'left' && socialAxis === 'moderate') specificIdeology = '社会民主主义 🕊️'
  else if (economicAxis === 'left' && socialAxis === 'centrist') specificIdeology = '民主社会主义 ✊'
  else if (economicAxis === 'left' && (socialAxis === 'liberal' || socialAxis === 'libertarian')) specificIdeology = '自由意志社会主义 🔴'
  
  else if (economicAxis === 'center' && socialAxis === 'authoritarian') specificIdeology = '国家威权主义 ⚔️'
  else if (economicAxis === 'center' && socialAxis === 'moderate') specificIdeology = '第三条道路 🤝'
  else if (economicAxis === 'center' && socialAxis === 'centrist') specificIdeology = '实用主义 🤷'
  else if (economicAxis === 'center' && (socialAxis === 'liberal' || socialAxis === 'libertarian')) specificIdeology = '社会自由主义 🗽'
  
  else if (economicAxis === 'right' && socialAxis === 'authoritarian') specificIdeology = '国家资本主义 🦅'
  else if (economicAxis === 'right' && socialAxis === 'moderate') specificIdeology = '保守主义 🎩'
  else if (economicAxis === 'right' && socialAxis === 'centrist') specificIdeology = '古典自由主义 📜'
  else if (economicAxis === 'right' && (socialAxis === 'liberal' || socialAxis === 'libertarian')) specificIdeology = '新自由主义 💹'
  
  else if (economicAxis === 'far-right' && socialAxis === 'authoritarian') specificIdeology = '法西斯主义 🟨'
  else if (economicAxis === 'far-right' && socialAxis === 'moderate') specificIdeology = '民族保守主义 🦅'
  else if (economicAxis === 'far-right' && (socialAxis === 'liberal' || socialAxis === 'libertarian')) specificIdeology = '安那其资本主义 💵'

  const ideologyEmoji = specificIdeology.split(' ')[1] || '🤷'

  const col = economicScore < 20 ? 0 : economicScore < 40 ? 1 : economicScore < 60 ? 2 : economicScore < 80 ? 3 : 4
  const row = socialScore < 20 ? 0 : socialScore < 40 ? 1 : socialScore < 60 ? 2 : socialScore < 80 ? 3 : 4

  const dimensions = {
    equality: Math.max(0, 100 - economicScore),
    market: economicScore,
    authority: socialScore,
    liberty: Math.max(0, 100 - socialScore),
    nation: diplomaticScore,
    international: Math.max(0, 100 - diplomaticScore),
    tradition: culturalScore,
    progress: Math.max(0, 100 - culturalScore),
  }

  const compassData = [
    { axis: '经济平等', value: dimensions.equality, position: '左翼' },
    { axis: '自由市场', value: dimensions.market, position: '右翼' },
    { axis: '国家权威', value: dimensions.authority, position: '威权' },
    { axis: '个人自由', value: dimensions.liberty, position: '自由' },
  ]

  const typeDescriptions: Record<string, string[]> = {
    '斯大林主义 🚩': [
      '你是**斯大林主义者**。你相信只有高度集权的计划经济和无产阶级专政才能真正实现社会主义。高速工业化、集体化、铁的纪律——这是通往共产主义的必经之路。',
      '🚩 一国社会主义信徒。你不相信什么"世界革命"的空谈。社会主义必须先在一个国家扎稳脚跟，用钢铁和工业来捍卫它。',
      '你的立场：革命不是请客吃饭。为了大多数人的长远利益，短暂的阵痛和必要的强制是完全值得的。',
    ],
    '毛主义 ☭': [
      '你是**毛主义者**。你相信农民才是真正的革命主体，枪杆子里出政权，不断革命是防止资本主义复辟的唯一保证。',
      '☭ 人民战争思想。你相信群众路线，相信造反有理，相信6亿人民皆舜尧。右派的纸老虎没什么可怕的。',
      '你的哲学：斗争是永恒的。与天斗，与地斗，与人斗，其乐无穷。',
    ],
    '托洛茨基主义 🌐': [
      '你是**托洛茨基主义者**。你相信不断革命和世界革命，官僚化的工人国家也需要政治革命来清洗。斯大林是革命的叛徒。',
      '🌐 国际主义者。社会主义不可能在一国建成，除非先进国家的无产阶级同时取得胜利。这才是真正的马克思主义。',
      '不革命就是反革命。没有世界革命的胜利，任何一国的社会主义都注定要堕落和失败。',
    ],
    '无政府共产主义 ⚫': [
      '你是**无政府共产主义者**。国家和资本是一枚硬币的两面，必须同时废除。真正的自由只能在自由联合的公社中实现。',
      '⚫ 不要老板，不要老板。既不要党也不要公司，既不要警察也不要资本家。所有的统治者本质上都是一样的。',
      '人类不需要任何人来统治。自由联合不是乌托邦，这是我们本来该有的样子。',
    ],
    '国家社会主义 ⚒️': [
      '你是**国家社会主义者**。你相信强大的国家力量是实现社会正义的唯一保障，既反对财阀统治也反对自由放任。',
      '⚒️ 民族即一切，个人即虚无。只有在有机的民族共同体中，个人才能获得真正的解放和尊严。',
      '第三条道路——既反对华尔街的贪婪，也反对莫斯科的独裁。民族和社会主义可以而且必须结合。',
    ],
    '社会民主主义 🕊️': [
      '你是**社会民主主义者**——当代西方的主流左翼。高税收、高福利、强大的工会，资本主义加安全网，这就是你的理想社会。',
      '🕊️ 温和而坚定的改良派。你不想要革命，你想要的是北欧模式。体面的工作，体面的医疗，体面的退休——这就够了。',
      '既有市场经济的活力，又有社会主义的公平。这才是真正成熟的政治。',
    ],
    '民主社会主义 ✊': [
      '你是**民主社会主义者**。资本主义制度本身就是问题的根源。我们需要通过民主的方式，逐步而坚定地改造整个体系。',
      '✊ 不要斯大林的古拉格，也不要撒切尔的失业大军。经济民主、工业民主、社会民主——一个都不能少。',
      '社会主义不仅是公平的，更应该是自由的。威权和革命都不是答案，民主才是。',
    ],
    '自由意志社会主义 🔴': [
      '你是**自由意志社会主义者**。你既要个人自由也要社会平等——谁说鱼和熊掌不能兼得？国家和资本都是自由的敌人。',
      '🔴 既不要独裁也不要剥削。每个人都应该自由，但这自由不能建立在他人受奴役的基础上。',
      '你讨厌两种人：告诉你该怎么活的卫道士，和把你当工具用的资本家。自由和平等，一个都不能少。',
    ],
    '国家威权主义 ⚔️': [
      '你是**国家威权主义**者。国家利益高于一切——既高于市场的贪婪，也高于个人的任性。强大的中央政府是秩序和稳定的唯一保障。',
      '⚔️ 国家至上主义。你既不信任左翼的"平等乌托邦"，也不信任右翼的"市场神话"。你只相信一个东西：强大而有执行力的政府。',
      '秩序大于一切。意识形态争论都是空谈，国家能否有效运转才是真正重要的。',
    ],
    '第三条道路 🤝': [
      '你是**第三条道路**的信奉者。老左派和新右派都过时了，我们需要超越左右的务实主义。',
      '🤝 布莱尔和克林顿的信徒。既拥抱市场活力，也保留社会正义。意识形态已经死了，行得通的才是好政策。',
      '你觉得左右两边都是极端分子。现实世界的答案永远在那个不酷也不炫的中间地带。',
    ],
    '实用主义 🤷': [
      '恭喜你是稀有的**政治实用主义者**！你觉得所有意识形态信徒都是神经病。什么有效就用什么，不行就换。',
      '🤷 哪有什么放之四海而皆准的真理？所有宏大叙事都是骗局。就事论事，见招拆招，这才是真正的成熟。',
      '两边的极端分子都很可笑。政治不是宗教，不需要什么信仰，只需要常识和执行力。',
    ],
    '社会自由主义 🗽': [
      '你是**社会自由主义者**——当代西方的主流价值观。你相信个人自由、宽容、多元、人权，以及适度的社会福利。',
      '🗽 启蒙价值的继承者。你想要的是：自由的市场，自由的人，自由的思想。政府是必要的恶，但必须被关在笼子里。',
      '只要不伤害别人，每个人都应该可以过自己想要的生活。这是文明社会的底线。',
    ],
    '国家资本主义 🦅': [
      '你是**国家资本主义**的支持者。你相信强大的国家机器与自由市场的完美结合——民族荣耀、工业实力和经济增长三位一体。',
      '🦅 发展才是硬道理。你不关心什么意识形态，只要能让国家强大、人民富裕。新加坡模式就是你的理想。',
      '威权的政府 + 自由的市场 = 成功的公式。这就是东亚奇迹真正的秘密。',
    ],
    '保守主义 🎩': [
      '你是**传统保守主义**者。小政府、低税收、自由市场、家庭价值、宗教传统——这是文明繁荣的根基。',
      '🎩 伯克的信徒。激进的社会工程只会带来灾难。传统不是因为它老，而是因为它经过了时间的检验。',
      '不是所有新东西都是好的。先辈留下来的制度、道德和习俗，自有它们存在的道理。',
    ],
    '古典自由主义 📜': [
      '你是**古典自由主义**者。你是洛克、斯密、密尔的继承人。有限政府、自然权利、自由放任——这才是美国国父们真正的愿景。',
      '📜 光荣的19世纪传统。政府唯一合法的功能就是保护生命、自由和财产。除此之外的一切都是越权。',
      '人类的进步不是来自政府的计划，而是来自千百万个体自由的互动。',
    ],
    '新自由主义 💹': [
      '你是**新自由主义**者。你相信全球自由贸易、放松管制、私有化、央行独立——这是人类走向普遍繁荣的必由之路。',
      '💹 华盛顿共识信徒。没有哪个国家因为自由贸易而变穷，也没有哪个国家因为闭关锁国而富裕。',
      '世界是平的。民族国家是过时的概念，资本、货物、人才的自由流动才是未来。',
    ],
    '法西斯主义 🟨': [
      '你是**法西斯主义**者。你相信：民族的重生、领袖的魅力、帝国的荣耀、一切阶级的有机统一。自由主义和马克思主义都是腐朽的。',
      '🟨 力量、意志、行动。民主是软弱的，和平是谎言，战争是男人最高贵的事业。软弱的民族不配生存。',
      '一个民族，一个领袖，一个帝国。多元是癌症，平等是骗局，强者统治才是自然法则。',
    ],
    '民族保守主义 🦅': [
      '你是**民族保守主义**者。你相信：民族认同、文化传统、家庭价值、宗教信仰，是一个国家的灵魂所在。',
      '🦅 血与土。你不相信什么普世价值。所有的权利都是民族的权利，所有的自由都是传统的馈赠。',
      '一个没有边界和认同的国家，根本就不是国家。全球化是富人的阴谋，民族国家才是永恒的。',
    ],
    '安那其资本主义 💵': [
      '你是**安那其资本主义**者。你相信国家是最大的犯罪集团。税收就是盗窃，法律就是暴力，警察就是打手。',
      '💵 不自由，毋宁死。你有权利保留你赚的每一分钱，你有权利处置你的身体和你的财产。',
      '强者成功，弱者失败。这就是公平。任何人和任何国家都无权干涉。',
    ],
    '中间派 🤷': [
      '你是真正的中间派。你完美地平衡了各个维度，不极端于任何一个方向。这是非常罕见也非常智慧的立场。',
    ],
  }

  const famousPeopleDatabase: Record<string, string[]> = {
    '斯大林主义 🚩': ['约瑟夫·斯大林', '金日成', '恩维尔·霍查', '勃列日涅夫'],
    '毛主义 ☭': ['毛泽东', '胡志明', '波尔布特', '切·格瓦拉'],
    '托洛茨基主义 🌐': ['列夫·托洛茨基', '埃内斯托·曼德尔', '詹姆斯·P·坎农'],
    '无政府共产主义 ⚫': ['巴枯宁', '克鲁泡特金', '内斯特·马赫诺', '蒲鲁东'],
    '国家社会主义 ⚒️': ['格奥尔格·施特拉塞', '托马斯·桑卡拉', '乌戈·查韦斯'],
    '社会民主主义 🕊️': ['伯恩斯坦', '奥拉夫·帕尔梅', '托尼·布莱尔', '北欧各国首相'],
    '民主社会主义 ✊': ['伯尼·桑德斯', '杰里米·柯宾', '迈克尔·哈灵顿'],
    '自由意志社会主义 🔴': ['伯特兰·罗素', '诺姆·乔姆斯基', '斯拉沃热·齐泽克'],
    '国家威权主义 ⚔️': ['普京', '戴高乐', '李光耀', '皮诺切特'],
    '第三条道路 🤝': ['布莱尔', '克林顿', '马克龙', '施罗德'],
    '实用主义 🤷': ['默克尔', '大多数技术官僚', '绝大多数沉默的选民'],
    '社会自由主义 🗽': ['富兰克林·罗斯福', '肯尼迪', '奥巴马', '希拉里'],
    '国家资本主义 🦅': ['俾斯麦', '朴正熙', '邓小平', '蒋经国'],
    '保守主义 🎩': ['撒切尔夫人', '罗纳德·里根', '温斯顿·丘吉尔'],
    '古典自由主义 📜': ['哈耶克', '米尔顿·弗里德曼', '托马斯·索维尔'],
    '新自由主义 💹': ['撒切尔', '里根', '格林斯潘', '世界银行'],
    '法西斯主义 🟨': ['墨索里尼', '希特勒', '佛朗哥', '莫斯利'],
    '民族保守主义 🦅': ['欧尔班', '勒庞', '特朗普', '纳瓦尔尼'],
    '安那其资本主义 💵': ['安·兰德', '穆瑞·罗斯巴德', '汉斯-赫尔曼·霍普'],
    '中间派 🤷': ['地球上绝大多数正常人类'],
  }

  const traitDatabase: Record<string, string[]> = {
    '斯大林主义 🚩': ['计划经济', '高速工业化', '农业集体化', '无产阶级专政', '一国建成社会主义'],
    '毛主义 ☭': ['群众路线', '农民革命', '不断革命论', '人民战争', '文化大革命'],
    '托洛茨基主义 🌐': ['世界革命', '不断革命', '反对官僚化', '国际主义', '左翼反对派'],
    '无政府共产主义 ⚫': ['反国家主义', '反资本主义', '自由公社', '直接行动', '反权威'],
    '国家社会主义 ⚒️': ['民族主义', '社会主义', '反财阀', '反自由主义', '阶级合作'],
    '社会民主主义 🕊️': ['福利国家', '议会道路', '阶级妥协', '分配正义', '改良主义'],
    '民主社会主义 ✊': ['经济民主', '工业民主', '市场社会主义', '民主化', '反新自由主义'],
    '自由意志社会主义 🔴': ['个人自主', '社会平等', '反威权', '反资本', '生态社会主义'],
    '国家威权主义 ⚔️': ['国家至上', '秩序优先', '技术治国', '民族主义', '强政府'],
    '第三条道路 🤝': ['超越左右', '务实主义', '混合经济', '中间路线', '现代化'],
    '实用主义 🤷': ['就事论事', '意识形态怀疑论', '见招拆招', '反极端', '常识政治'],
    '社会自由主义 🗽': ['公民自由', '人权', '文化多元', '规制资本主义', '福利国家'],
    '国家资本主义 🦅': ['威权治理', '市场效率', '国家主导', '发展主义', '产业政策'],
    '保守主义 🎩': ['传统价值', '小政府', '减税', '家庭至上', '怀疑社会工程'],
    '古典自由主义 📜': ['自然权利', '有限政府', '自由放任', '法治', '产权神圣'],
    '新自由主义 💹': ['自由贸易', '放松管制', '私有化', '全球化', '中央银行独立性'],
    '法西斯主义 🟨': ['超民族主义', '强人崇拜', '军国主义', '反多元', '反左右'],
    '民族保守主义 🦅': ['民族认同', '文化传统', '本土优先', '主权国家', '反全球主义'],
    '安那其资本主义 💵': ['绝对自由', '私有财产', '反税收', '反国家', '市场无政府'],
    '中间派 🤷': ['平衡', '理性', '温和', '稳健', '政治成熟'],
  }

  const internetPersonaDatabase: Record<string, string> = {
    '斯大林主义 🚩': 'B站苏联军乐爱好者，键政左壬，每日背诵《钢铁是怎样炼成的》语录',
    '毛主义 ☭': '小红书革命美学博主，微博左派意见领袖，手机壳是为人民服务',
    '托洛茨基主义 🌐': '知乎考据党，热衷于在每个斯大林相关帖子下面刷屏"修正主义"',
    '无政府共产主义 ⚫': '朋克青年，素食主义者，住在公社，所有东西都是共享的',
    '社会民主主义 🕊️': '豆瓣鹅组老组员，温和理中客，每天骂完资本家就去喝星巴克',
    '民主社会主义 ✊': '美国留学生桑德斯粉，每周参加集会，头像永远是伯尼桑德斯',
    '国家威权主义 ⚔️': '知乎入关学元老，知乎键政大V，粉丝群名字叫"我们的事业"',
    '实用主义 🤷': '大多数中国人，不参与任何争论，默默赚钱然后买房',
    '社会自由主义 🗽': '一线城市白领，LGBTQ+支持者，每年骄傲月必换彩虹头像',
    '国家资本主义 🦅': '工业党，观察者网铁粉，每天必刷督工睡前消息',
    '保守主义 🎩': '中年男性企业家，每天在朋友圈转发卢克文和占豪',
    '新自由主义 💹': '商学院教授，投行VP，朋友圈永远在达沃斯或者博鳌',
    '法西斯主义 🟨': '贴吧恶俗维基元老，匿名论坛用户，头像永远是黑色太阳',
    '民族保守主义 🦅': '微博爱国大V，观察者网评论区常客，头像总是带国旗边框',
    '安那其资本主义 💵': '比特币巨鲸，永远在推特骂美联储，坚信法币都是垃圾',
    '中间派 🤷': '看完所有阵营吵架然后默默关上手机去做饭的沉默大多数',
  }

  const classicTakeDatabase: Record<string, string> = {
    '斯大林主义 🚩': '其实苏联的粮食产量在赫鲁晓夫上台后才开始下降的...',
    '毛主义 ☭': '教员的战略眼光超越时代50年，你们这些人根本不懂',
    '托洛茨基主义 🌐': '斯大林背叛了革命，否则世界革命早就成功了',
    '无政府共产主义 ⚫': '国家和资本家本质上都是一样的暴力机器',
    '社会民主主义 🕊️': '北欧模式是人类目前为止最好的社会制度',
    '民主社会主义 ✊': '奥巴马的医改就是个笑话，桑德斯才是真正的改变',
    '国家威权主义 ⚔️': '民主不能当饭吃，秩序和发展才是硬道理',
    '实用主义 🤷': '你们吵来吵去的这些东西，跟我下个月还房贷有半毛钱关系吗？',
    '社会自由主义 🗽': '只要不伤害别人，每个人都有权利做任何他们想做的事',
    '国家资本主义 🦅': '中国的制度优势就是我们可以集中力量办大事',
    '保守主义 🎩': '传统不是因为它老旧，而是因为它经过了几千年的检验',
    '新自由主义 💹': '长远来看，所有的管制最后都会伤害消费者',
    '法西斯主义 🟨': '民主制度的最终结果就是犹太人控制全世界',
    '民族保守主义 🦅': '这个国家已经不是我们父辈的那个国家了',
    '安那其资本主义 💵': '税收就是合法的抢劫，美联储就是最大的骗局',
  }

  const whatMakesYouMadDatabase: Record<string, string> = {
    '斯大林主义 🚩': '有人说"斯大林饿死了乌克兰人"的时候你会连夜写三千字反驳',
    '毛主义 ☭': '看到公知抹黑新中国前三十年的成就你会气得睡不着觉',
    '托洛茨基主义 🌐': '有人把托洛茨基叫做"失败的反对派"的时候',
    '无政府共产主义 ⚫': '警察给你开了一张200块的停车罚单',
    '社会民主主义 🕊️': '看到有人说"福利国家养懒人"的时候',
    '民主社会主义 ✊': 'CNN又在抹黑伯尼·桑德斯的时候',
    '国家威权主义 ⚔️': '有人说"民主是普世价值"的时候你会冷笑一声',
    '实用主义 🤷': '看到任何一方极端分子跳出来你都觉得他们是傻逼',
    '社会自由主义 🗽': '看到有人歧视少数群体你会立刻上去对线',
    '国家资本主义 🦅': '公知说"中国举国体制就是作弊"的时候',
    '保守主义 🎩': '看到 woke 文化进校园你会气得摔手机',
    '新自由主义 💹': '看到民粹主义政客承诺全民发钱的时候',
    '法西斯主义 🟨': '看到任何多元文化主义的宣传你都会破防',
    '民族保守主义 🦅': '看到外国人在本国享受超国民待遇的时候',
    '安那其资本主义 💵': '4月15号报税日就是你一年中最痛苦的一天',
  }

  const debateTacticsDatabase: Record<string, string[]> = {
    '斯大林主义 🚩': ['给对方扣托派帽子', '引用斯大林全集第13卷第278页原文', '质疑对方的阶级成分'],
    '毛主义 ☭': ['引用教员语录', '质问对方"到底站在人民一边还是站在敌人一边"'],
    '托洛茨基主义 🌐': ['指出对方是"斯大林主义官僚"', '开始讨论1923年联共布中央全会的具体细节'],
    '无政府共产主义 ⚫': ['"你这个国家主义者！"', '然后引用巴枯宁骂马克思的话'],
    '社会民主主义 🕊️': ['给对方扣极端分子帽子', '然后开始列举北欧的各项统计数据'],
    '国家威权主义 ⚔️': ['"民主在阿富汗也行不通啊？"', '"你这么喜欢民主为什么不去印度？"'],
    '实用主义 🤷': ['"你们说的都对，但是到底能不能落地？"', '然后默默退出群聊'],
    '社会自由主义 🗽': ['立刻开始检查对方发言中的政治正确问题', '找出对方哪里歧视了'],
    '国家资本主义 🦅': ['"中国过去40年让8亿人脱贫，你们的制度做到了吗？"'],
    '保守主义 🎩': ['"1950年代的社会比现在好100倍"', '然后开始怀念美好的旧时光'],
    '新自由主义 💹': ['引用经济学人杂志的数据', '然后问对方"你有没有读过哈耶克？"'],
    '民族保守主义 🦅': ['"你这么喜欢移民，为什么不把难民接到你自己家里住？"'],
    '安那其资本主义 💵': ['"税收就是盗窃！"', '然后对方不回复了'],
  }

  const famousQuotesDatabase: Record<string, string[]> = {
    '斯大林主义 🚩': ['"教皇有几个师？"', '死亡一个人是悲剧，死亡一百万人是统计数字'],
    '毛主义 ☭': ['造反有理', '革命不是请客吃饭', '帝国主义和一切反动派都是纸老虎'],
    '托洛茨基主义 🌐': ['"不断革命！"', '革命是历史的火车头'],
    '社会民主主义 🕊️': ['"民主社会主义是最不坏的制度"'],
    '实用主义 🤷': ['不管黑猫白猫，抓到老鼠就是好猫'],
    '社会自由主义 🗽': ['我不同意你说的话，但我誓死捍卫你说话的权利'],
    '保守主义 🎩': ['传统是死者的民主', '那些不了解历史的人注定要重蹈覆辙'],
    '古典自由主义 📜': ['财产权是一切自由的基础', '管的最少的政府就是最好的政府'],
    '新自由主义 💹': ['"天下没有免费的午餐"'],
    '法西斯主义 🟨': ['"相信，服从，战斗！"', '要么战争，要么革命'],
    '民族保守主义 🦅': ['没有民族的国家，就像没有灵魂的躯体'],
    '安那其资本主义 💵': ['政府就是暴力，税收就是盗窃', '不自由毋宁死'],
  }

  const historicalEventDatabase: Record<string, string> = {
    '斯大林主义 🚩': '1956年匈牙利事件：那就是西方策动的反革命暴乱，镇压是完全正确的',
    '毛主义 ☭': '文化大革命：是防止资本主义复辟的伟大尝试，方向是对的，方法有些问题',
    '托洛茨基主义 🌐': '1939年苏德互不侵犯条约：这就是斯大林背叛革命的铁证',
    '无政府共产主义 ⚫': '西班牙内战：斯大林派出来的格鲁乌刺杀了真正的革命者',
    '社会民主主义 🕊️': '1991年苏联解体：计划经济终于证明了它不可行',
    '国家威权主义 ⚔️': '1989年：证明了没有强有力的国家，什么秩序都会崩溃',
    '实用主义 🤷': '所有历史事件都是复杂的，简单的标签化都是傻逼',
    '国家资本主义 🦅': '改革开放：人类历史上最伟大的经济奇迹，没有之一',
    '保守主义 🎩': '1960年代：西方文明开始走向堕落的转折点',
    '新自由主义 💹': '柏林墙倒塌：这就是历史的终结，自由主义最终胜利了',
    '法西斯主义 🟨': '第二次世界大战：犹太人赢了，德国输了，欧洲死了',
    '民族保守主义 🦅': '2015年难民危机：欧洲的自杀开始了',
    '安那其资本主义 💵': '1913年美联储成立：人类自由开始终结的那一年',
  }

  const compatibilityMap: Record<string, { best: string[]; worst: string[] }> = {
    '斯大林主义 🚩': { best: ['毛主义 ☭', '国家社会主义 ⚒️'], worst: ['托洛茨基主义 🌐', '安那其资本主义 💵'] },
    '毛主义 ☭': { best: ['斯大林主义 🚩', '国家社会主义 ⚒️'], worst: ['新自由主义 💹', '法西斯主义 🟨'] },
    '托洛茨基主义 🌐': { best: ['自由意志社会主义 🔴'], worst: ['所有其他左翼意识形态'] },
    '社会民主主义 🕊️': { best: ['民主社会主义 ✊', '第三条道路 🤝'], worst: ['所有极端分子'] },
    '民主社会主义 ✊': { best: ['社会民主主义 🕊️', '自由意志社会主义 🔴'], worst: ['法西斯主义 🟨'] },
    '国家威权主义 ⚔️': { best: ['国家资本主义 🦅', '民族保守主义 🦅'], worst: ['所有无政府主义者'] },
    '实用主义 🤷': { best: ['其他实用主义者'], worst: ['所有意识形态狂热分子'] },
    '社会自由主义 🗽': { best: ['社会民主主义 🕊️'], worst: ['所有威权主义者'] },
    '国家资本主义 🦅': { best: ['国家威权主义 ⚔️', '实用主义 🤷'], worst: ['所有反发展主义者'] },
    '保守主义 🎩': { best: ['民族保守主义 🦅', '新自由主义 💹'], worst: ['无政府共产主义 ⚫'] },
    '新自由主义 💹': { best: ['古典自由主义 📜', '保守主义 🎩'], worst: ['所有反资本主义意识形态'] },
    '法西斯主义 🟨': { best: ['民族保守主义 🦅'], worst: ['所有左翼意识形态'] },
    '民族保守主义 🦅': { best: ['保守主义 🎩', '国家威权主义 ⚔️'], worst: ['社会自由主义 🗽'] },
    '安那其资本主义 💵': { best: ['其他无政府主义者'], worst: ['所有相信国家的人'] },
  }

  const purityScore = Math.abs(economicScore - 50) + Math.abs(socialScore - 50)
  const memeLevel = purityScore > 80 ? '💀 纯度魔王 互联网键政满级' 
    : purityScore > 60 ? '🔥 纯度战士 知名键政人' 
    : purityScore > 40 ? '⚡ 普通网民 对线常客' 
    : purityScore > 20 ? '🌱 温和派 潜水为主' 
    : '🧘 贤者模式 不参与任何争论'

  const culturalPosition = culturalScore < 25 ? '🚀 激进进步派 冲在最前线'
    : culturalScore < 40 ? '🌱 温和进步派'
    : culturalScore < 60 ? '⚖️ 文化中立'
    : culturalScore < 80 ? '🏛️ 文化保守派'
    : '⚔️ 传统卫士 古老价值的守护者'

  const defaultPersona = '看完所有争论然后默默去做饭的地球公民'
  const defaultTake = '你们说的都对，但是今晚吃什么？'
  const defaultMad = '任何争论影响你干饭的时候'
  const defaultTactics = ['默默退出群聊', '然后点个外卖']
  const defaultQuote = ['生活还要继续']
  const defaultHistory = '历史就是历史，争论毫无意义'

  const finalIdeology = allScoresInMidrange ? `${midrangeSubtype.name}` : specificIdeology
  const finalEmoji = allScoresInMidrange ? '🎯' : ideologyEmoji

  return {
    economicScore,
    socialScore,
    diplomaticScore,
    culturalScore,
    economicAxis,
    socialAxis,
    diplomaticAxis: diplomaticScore < 33 ? 'internationalist' : diplomaticScore < 66 ? 'neutral' : 'nationalist',
    culturalAxis: culturalScore < 20 ? 'radical' : culturalScore < 40 ? 'progressive' : culturalScore < 60 ? 'neutral' : culturalScore < 80 ? 'conservative' : 'traditionalist',
    ideologyType: allScoresInMidrange ? midrangeSubtype.name : specificIdeology.split(' ')[0],
    ideologyEmoji: finalEmoji,
    specificIdeology: finalIdeology,
    gridPosition: { row, col },
    dimensions,
    compassData,
    typeDescription: allScoresInMidrange ? midrangeSubtype.description : randomPick(typeDescriptions[specificIdeology] || typeDescriptions['中间派 🤷']),
    famousPeople: famousPeopleDatabase[specificIdeology] || famousPeopleDatabase['中间派 🤷'],
    typicalTraits: traitDatabase[specificIdeology] || traitDatabase['中间派 🤷'],
    internetPersona: internetPersonaDatabase[specificIdeology] || defaultPersona,
    classicTake: classicTakeDatabase[specificIdeology] || defaultTake,
    whatMakesYouMad: whatMakesYouMadDatabase[specificIdeology] || defaultMad,
    debateTactics: debateTacticsDatabase[specificIdeology] || defaultTactics,
    famousQuote: randomPick(famousQuotesDatabase[specificIdeology] || defaultQuote),
    historicalEventTake: historicalEventDatabase[specificIdeology] || defaultHistory,
    compatibility: compatibilityMap[specificIdeology] || { best: ['中间派 🤷'], worst: ['所有极端分子'] },
    enemiesList: compatibilityMap[specificIdeology]?.worst || ['所有极端分子'],
    readingList: readingListDatabase[specificIdeology] || ['好好生活，少看网'],
    memeLevel,
    purityScore,
    culturalPosition,
    diversityAnalysis: {
      uniquenessScore: Math.round(diversityEngine.calculateUniquenessScore(rawScores, IDEOLOGY_NORMS)),
      extremityScore: Math.round(responseStyle.extremityScore * 100),
      midpointAvoidance: Math.round((1 - responseStyle.midpointRatio) * 100),
    },
    isomericAnalysis: allScoresInMidrange ? {
      enabled: true,
      subtype: midrangeSubtype.name,
      characteristicItems: midrangeSubtype.characteristicItems,
    } : null,
  }
}

const readingListDatabase: Record<string, string[]> = {
  '斯大林主义 🚩': ['斯大林《论列宁主义基础》', '《联共布党史简明教程》', '托洛茨基《被背叛的革命》（批判性阅读）'],
  '毛主义 ☭': ['毛泽东《湖南农民运动考察报告》', '毛主席语录', '《毛泽东选集》全五卷'],
  '托洛茨基主义 🌐': ['托洛茨基《不断革命》', '托洛茨基《俄国革命史》', '托洛茨基《斯大林评传》'],
  '无政府共产主义 ⚫': ['克鲁泡特金《面包与自由》', '巴枯宁《上帝与国家》', '马赫诺回忆录'],
  '社会民主主义 🕊️': ['伯恩斯坦《进化的社会主义》', '吉登斯《第三条道路》', '《北欧模式》'],
  '民主社会主义 ✊': ['伯尼·桑德斯《我们的革命》', '迈克尔·哈灵顿《另一个美国》'],
  '国家威权主义 ⚔️': ['亨廷顿《变化社会中的政治秩序》', '施密特《政治的概念》', '李光耀论中国与世界'],
  '实用主义 🤷': ['就别读书了，好好挣钱比什么都强', '《潜规则》吴思'],
  '社会自由主义 🗽': ['罗尔斯《正义论》', '德沃金《认真对待权利》'],
  '国家资本主义 🦅': ['查默斯·约翰逊《通产省与日本奇迹》', '李光耀回忆录'],
  '保守主义 🎩': ['埃德蒙·伯克《法国革命沉思录》', '拉塞尔·柯克《保守主义思想》', '斯科塞隆《右派国家》'],
  '古典自由主义 📜': ['亚当·斯密《国富论》', '洛克《政府论》', '密尔《论自由》'],
  '新自由主义 💹': ['哈耶克《通往奴役之路》', '米尔顿·弗里德曼《资本主义与自由》'],
  '法西斯主义 🟨': ['墨索里尼《法西斯主义教义》', '施密特《政治的概念》', '海德格尔《存在与时间》'],
  '民族保守主义 🦅': ['亨廷顿《文明的冲突》', '彼得·泰尔《从0到1》'],
  '安那其资本主义 💵': ['安兰德《阿特拉斯耸耸肩》', '罗斯巴德《人、经济与国家》', '霍普《私有财产的经济学与伦理学》'],
}
