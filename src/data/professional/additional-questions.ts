import type { ProfessionalQuestionSet } from '../../types'

/**
 * 额外的高争议性题目
 * 用于补充各维度题目数量
 */

interface WeightedQuestion {
  id: string
  text: string
  dimension: string
  subDimension?: string
  difficulty: number
  discrimination: number
  importance: number
  options: Array<{
    id: string
    text: string
    value: number
    pole?: string
    subType?: string
  }>
}

const createWeightedQuestion = (
  id: string,
  text: string,
  dimension: string,
  difficulty: number,
  discrimination: number,
  importance: number,
  options: WeightedQuestion['options'],
  subDimension?: string
): WeightedQuestion => ({
  id,
  text,
  dimension,
  subDimension,
  difficulty,
  discrimination,
  importance,
  options
})

// ==================== 经济维度额外题目 ====================
export const additionalEconomicQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'eco-extra-1',
    '某国政府计划实施"全民基本收入"政策，每月向所有公民发放基本生活费。支持者认为这能消除贫困、减少不平等；反对者认为这会削弱工作动力、增加税收负担。作为政策顾问，你会如何建议？',
    'economic',
    0.85,
    0.9,
    1.3,
    [
      { id: '1', text: '强烈支持，这是实现社会公平的必由之路', value: 10, pole: 'planned-economy', subType: 'market-socialism' },
      { id: '2', text: '支持，但需要配套措施防止懒惰', value: 30, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '3', text: '中立，需要更多试点数据', value: 50, pole: 'mixed-economy', subType: 'undefined' },
      { id: '4', text: '反对，应该鼓励工作而非发钱', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '5', text: '强烈反对，这会摧毁经济动力', value: 90, pole: 'free-market', subType: 'laissez-faire' }
    ]
  ),
  createWeightedQuestion(
    'eco-extra-2',
    '某国发现大规模石油资源，但开采将导致"资源诅咒"——货币升值、制造业萎缩、腐败增加。挪威成功避免了这个问题，但许多国家失败了。作为经济部长，你会如何开发这些资源？',
    'economic',
    0.8,
    0.88,
    1.2,
    [
      { id: '1', text: '全力开采，经济增长优先', value: 90, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '逐步开采，建立主权财富基金', value: 65, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '适度开采，多元化发展经济', value: 45, pole: 'mixed-economy', subType: 'undefined' },
      { id: '4', text: '限制开采，保护其他产业', value: 25, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '保留资源，留给后代', value: 10, pole: 'planned-economy', subType: 'market-socialism' }
    ]
  )
]

// ==================== 政治维度额外题目 ====================
export const additionalPoliticalQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'pol-extra-1',
    '某国考虑降低投票年龄至16岁，支持者认为年轻人应该有发言权，反对者认为16岁不够成熟。作为立法者，你会如何投票？',
    'political',
    0.75,
    0.82,
    1,
    [
      { id: '1', text: '支持降低，民主应该包容所有群体', value: 80, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '2', text: '支持降低至18岁，16岁太小', value: 60, pole: 'democratic', subType: 'social-democracy' },
      { id: '3', text: '维持现状，18岁合适', value: 45, pole: 'democratic', subType: 'undefined' },
      { id: '4', text: '提高投票年龄，需要更多经验', value: 25, pole: 'authoritarian', subType: 'undefined' },
      { id: '5', text: '取消普选，改为精英投票', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-extra-2',
    '某国考虑实施"电子投票"系统，可以提高投票率和便利性，但也存在被黑客攻击和操纵的风险。作为选举委员会主席，你会如何决定？',
    'political',
    0.8,
    0.85,
    1.1,
    [
      { id: '1', text: '全面实施电子投票，便利性优先', value: 80, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '2', text: '试点实施，逐步推广', value: 60, pole: 'democratic', subType: 'social-democracy' },
      { id: '3', text: '混合模式，纸质和电子并存', value: 45, pole: 'democratic', subType: 'undefined' },
      { id: '4', text: '仅用于辅助，主要还是纸质投票', value: 25, pole: 'authoritarian', subType: 'undefined' },
      { id: '5', text: '拒绝电子投票，传统方式最安全', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  )
]

// ==================== 社会维度额外题目 ====================
export const additionalSocialQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'soc-extra-1',
    '某公司实施"弹性工作制"，员工可以自由选择工作时间。这提高了员工满意度，但也导致团队协作困难、项目延期。作为CEO，你会如何调整？',
    'social',
    0.7,
    0.8,
    1,
    [
      { id: '1', text: '完全弹性，员工自主权优先', value: 10, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '部分弹性，保留核心工作时间', value: 30, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '平衡弹性与团队需求', value: 50, pole: 'communitarian', subType: 'undefined' },
      { id: '4', text: '限制弹性，强调团队协作', value: 70, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '取消弹性，恢复固定工作时间', value: 90, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  ),
  createWeightedQuestion(
    'soc-extra-2',
    '某社区计划建设"无车社区"，禁止私家车进入，只允许公共交通和步行。这能改善环境和健康，但也给居民带来不便。作为城市规划师，你会如何设计？',
    'social',
    0.75,
    0.82,
    1,
    [
      { id: '1', text: '完全无车，环境优先', value: 10, pole: 'collectivism', subType: 'radical-collectivism' },
      { id: '2', text: '限制车辆，提供替代方案', value: 30, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '3', text: '部分限制，平衡便利与环境', value: 50, pole: 'communitarian', subType: 'undefined' },
      { id: '4', text: '允许车辆，但鼓励绿色出行', value: 70, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '5', text: '不限制，居民自由选择', value: 90, pole: 'individualism', subType: 'egoism' }
    ]
  )
]

// ==================== 文化维度额外题目 ====================
export const additionalCulturalQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'cul-extra-1',
    '某学校决定取消历史考试中的年代记忆题，改为分析题。传统派认为这会让学生忘记历史，进步派认为这能培养批判思维。作为教育局长，你会如何决定？',
    'cultural',
    0.75,
    0.82,
    1,
    [
      { id: '1', text: '支持改革，批判思维更重要', value: 85, pole: 'progressivism', subType: 'radical-progressivism' },
      { id: '2', text: '支持改革，但保留部分记忆题', value: 65, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '3', text: '平衡两者，记忆与分析并重', value: 45, pole: 'modernism', subType: 'undefined' },
      { id: '4', text: '保留记忆题，历史需要基础', value: 25, pole: 'traditionalism', subType: 'conservatism' },
      { id: '5', text: '恢复传统考试，记忆是基础', value: 10, pole: 'traditionalism', subType: 'reactionism' }
    ]
  ),
  createWeightedQuestion(
    'cul-extra-2',
    '某国考虑立法保护"非物质文化遗产"，包括传统手工艺、民俗活动等。支持者认为这是文化传承，反对者认为这是浪费资源。作为文化部长，你会如何决定？',
    'cultural',
    0.7,
    0.8,
    1,
    [
      { id: '1', text: '大力保护，文化传承重要', value: 10, pole: 'traditionalism', subType: 'reactionism' },
      { id: '2', text: '适度保护，重点项目优先', value: 30, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '选择性保护，有价值的项目', value: 50, pole: 'modernism', subType: 'undefined' },
      { id: '4', text: '鼓励市场保护，政府少干预', value: 70, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '不保护，让文化自然发展', value: 90, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  )
]

// ==================== 国际维度额外题目 ====================
export const additionalInternationalQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'int-extra-1',
    '某国考虑加入"国际刑事法院"，但这意味着本国公民可能被外国法院审判。支持者认为这是国际正义，反对者认为这侵犯主权。作为外交部长，你会如何建议？',
    'international',
    0.85,
    0.9,
    1.2,
    [
      { id: '1', text: '强烈支持加入，国际正义优先', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '支持加入，但需要保障条款', value: 65, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '观望，看其他国家经验', value: 45, pole: 'internationalism', subType: 'undefined' },
      { id: '4', text: '反对加入，保护司法主权', value: 25, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '强烈反对，拒绝外国干涉', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-extra-2',
    '某国考虑向发展中国家提供"债务减免"，帮助其发展经济。但这笔债务是合法的，减免会损害债权人利益。作为财政部长，你会如何决定？',
    'international',
    0.8,
    0.85,
    1.1,
    [
      { id: '1', text: '全面减免，帮助发展中国家', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '部分减免，平衡各方利益', value: 65, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '延期还款，给予缓冲期', value: 45, pole: 'internationalism', subType: 'undefined' },
      { id: '4', text: '按合同执行，保护债权人', value: 25, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '拒绝减免，债务必须偿还', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  )
]

// ==================== 技术维度额外题目 ====================
export const additionalTechnologyQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'tech-extra-1',
    '某公司开发出可以"读取思维"的脑机接口技术，可以帮助瘫痪患者恢复行动，但也可能被用于监控思想。作为科技伦理委员会主席，你会如何规范这项技术？',
    'technology',
    0.9,
    0.92,
    1.4,
    [
      { id: '1', text: '全面推广，技术进步不可阻挡', value: 90, pole: 'tech-optimism', subType: 'transhumanism' },
      { id: '2', text: '医疗用途开放，其他用途禁止', value: 65, pole: 'tech-optimism', subType: 'tech-liberalism' },
      { id: '3', text: '严格监管，仅限医疗研究', value: 45, pole: 'tech-pragmatism', subType: 'undefined' },
      { id: '4', text: '暂停开发，先解决伦理问题', value: 25, pole: 'tech-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '禁止所有脑机接口技术', value: 10, pole: 'tech-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-extra-2',
    '某公司开发出可以"预测犯罪"的AI系统，准确率达90%。但使用该系统需要收集大量个人数据，且可能存在算法偏见。作为立法者，你会如何规范？',
    'technology',
    0.85,
    0.88,
    1.2,
    [
      { id: '1', text: '全面推广，预防犯罪最重要', value: 90, pole: 'tech-optimism', subType: 'transhumanism' },
      { id: '2', text: '有限使用，仅限严重犯罪', value: 65, pole: 'tech-optimism', subType: 'tech-liberalism' },
      { id: '3', text: '严格限制，需要司法授权', value: 45, pole: 'tech-pragmatism', subType: 'undefined' },
      { id: '4', text: '谨慎使用，保护隐私优先', value: 25, pole: 'tech-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '禁止使用，这是监控社会', value: 10, pole: 'tech-skepticism', subType: 'luddism' }
    ]
  )
]

// ==================== 导出所有额外题目 ====================
export const allAdditionalQuestions: WeightedQuestion[] = [
  ...additionalEconomicQuestions,
  ...additionalPoliticalQuestions,
  ...additionalSocialQuestions,
  ...additionalCulturalQuestions,
  ...additionalInternationalQuestions,
  ...additionalTechnologyQuestions
]

export const additionalQuestionsByDimension = {
  economic: additionalEconomicQuestions,
  political: additionalPoliticalQuestions,
  social: additionalSocialQuestions,
  cultural: additionalCulturalQuestions,
  international: additionalInternationalQuestions,
  technology: additionalTechnologyQuestions
}
