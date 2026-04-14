import type { ProfessionalQuestionSet } from '../../types'
import {
  highControversyEconomicQuestions,
  highControversyPoliticalQuestions,
  highControversySocialQuestions,
  highControversyCulturalQuestions,
  highControversyInternationalQuestions,
  highControversyTechnologyQuestions
} from './high-controversy-questions'
import {
  additionalEconomicQuestions,
  additionalPoliticalQuestions,
  additionalSocialQuestions,
  additionalCulturalQuestions,
  additionalInternationalQuestions,
  additionalTechnologyQuestions
} from './additional-questions'

/**
 * 意识形态专业测评 - 完整版（100+题）
 * 
 * 包含：
 * - 基础题目（60题）
 * - 高争议性题目（30题）
 * - 额外题目（12题）
 * 
 * 总计：102题
 * 基于多维度交叉意识形态分析框架
 * 每道题目都包含详细的权重参数配置
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

// ==================== 经济制度轴（10题）====================

const economicQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'eco-1',
    '政府应该对大型企业进行拆分以防止垄断吗？',
    'economic',
    0.6,
    0.8,
    1.0,
    [
      { id: '1', text: '强烈支持，垄断损害市场竞争', value: 90, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '支持，但需要具体分析', value: 75, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '中立，视情况而定', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '反对，大企业有利于经济发展', value: 30, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '强烈反对，应该国有化而非拆分', value: 10, pole: 'planned-economy', subType: 'command-economy' }
    ]
  ),
  createWeightedQuestion(
    'eco-2',
    '对于全民基本收入(UBI)，你的看法是？',
    'economic',
    0.7,
    0.9,
    1.2,
    [
      { id: '1', text: '强烈支持，这是未来的必然趋势', value: 20, pole: 'planned-economy', subType: 'market-socialism' },
      { id: '2', text: '支持，但需要谨慎实施', value: 40, pole: 'mixed-economy' },
      { id: '3', text: '中立，需要更多研究', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '反对，会削弱工作动力', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '5', text: '强烈反对，这是社会主义幻想', value: 95, pole: 'free-market', subType: 'laissez-faire' }
    ]
  ),
  createWeightedQuestion(
    'eco-3',
    '国有企业应该在经济中扮演什么角色？',
    'economic',
    0.5,
    0.85,
    1.1,
    [
      { id: '1', text: '应该全面私有化，退出市场', value: 95, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '仅保留少数关键领域', value: 75, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '与私营企业平等竞争', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '在重要领域发挥主导作用', value: 25, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '应该主导所有关键产业', value: 10, pole: 'planned-economy', subType: 'command-economy' }
    ]
  ),
  createWeightedQuestion(
    'eco-4',
    '对于累进税制（收入越高税率越高），你的立场是？',
    'economic',
    0.4,
    0.75,
    0.9,
    [
      { id: '1', text: '强烈支持，促进财富公平分配', value: 15, pole: 'planned-economy', subType: 'market-socialism' },
      { id: '2', text: '支持，但税率不应过高', value: 35, pole: 'mixed-economy' },
      { id: '3', text: '中立，保持现状即可', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '反对，应该降低最高税率', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '5', text: '强烈反对，应该实行单一税率', value: 90, pole: 'free-market', subType: 'laissez-faire' }
    ]
  ),
  createWeightedQuestion(
    'eco-5',
    '工会应该拥有多大的权力？',
    'economic',
    0.65,
    0.8,
    1.0,
    [
      { id: '1', text: '应该大幅限制，工会阻碍经济发展', value: 90, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '应该适度限制，平衡劳资关系', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '保持现有权力水平', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '应该加强工会权利', value: 30, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '工会应该参与企业管理', value: 15, pole: 'planned-economy', subType: 'market-socialism' }
    ]
  ),
  createWeightedQuestion(
    'eco-6',
    '医疗保健应该主要由市场还是政府提供？',
    'economic',
    0.55,
    0.85,
    1.1,
    [
      { id: '1', text: '完全市场化，由个人选择', value: 95, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '以市场为主，政府提供基本保障', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '市场与政府共同提供', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '以政府为主，市场作为补充', value: 30, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '完全由政府提供全民医疗', value: 10, pole: 'planned-economy', subType: 'command-economy' }
    ]
  ),
  createWeightedQuestion(
    'eco-7',
    '对于经济危机，政府应该如何应对？',
    'economic',
    0.7,
    0.9,
    1.2,
    [
      { id: '1', text: '不干预，让市场自我调节', value: 95, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '有限干预，防止系统性风险', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '适度干预，稳定经济', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '积极干预，保护就业和产业', value: 30, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '全面接管，实施国家计划', value: 10, pole: 'planned-economy', subType: 'command-economy' }
    ]
  ),
  createWeightedQuestion(
    'eco-8',
    '知识产权保护应该达到什么程度？',
    'economic',
    0.75,
    0.7,
    0.85,
    [
      { id: '1', text: '应该大幅削弱，促进知识共享', value: 15, pole: 'planned-economy', subType: 'market-socialism' },
      { id: '2', text: '应该适度限制，平衡创新与共享', value: 35, pole: 'mixed-economy' },
      { id: '3', text: '保持现有保护水平', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '应该加强保护，激励创新', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '5', text: '应该大幅加强，保护创作者权益', value: 90, pole: 'free-market', subType: 'laissez-faire' }
    ]
  ),
  createWeightedQuestion(
    'eco-9',
    '对于财富不平等问题，你的看法是？',
    'economic',
    0.6,
    0.85,
    1.0,
    [
      { id: '1', text: '不平等是市场经济的自然结果', value: 90, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '适度不平等有利于激励创新', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '需要关注，但不应过度干预', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '应该通过政策缩小差距', value: 30, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '必须大幅缩小，实现经济平等', value: 10, pole: 'planned-economy', subType: 'command-economy' }
    ]
  ),
  createWeightedQuestion(
    'eco-10',
    '政府应该对金融市场进行多大程度的监管？',
    'economic',
    0.65,
    0.8,
    1.1,
    [
      { id: '1', text: '最小化监管，让市场自由运作', value: 95, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '适度监管，防范系统性风险', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '中等程度监管，平衡效率与稳定', value: 50, pole: 'mixed-economy' },
      { id: '4', text: '严格监管，保护投资者利益', value: 30, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '全面管控，金融为国家服务', value: 10, pole: 'planned-economy', subType: 'command-economy' }
    ]
  )
]

// ==================== 政治权力轴（10题）====================

const politicalQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'pol-1',
    '政府权力应该受到多大程度的限制？',
    'political',
    0.5,
    0.9,
    1.2,
    [
      { id: '1', text: '政府权力应该最小化，甚至取消', value: 95, pole: 'libertarian', subType: 'anarchism' },
      { id: '2', text: '严格限制，仅保留基本职能', value: 80, pole: 'libertarian', subType: 'minarchism' },
      { id: '3', text: '适度限制，通过民主程序制衡', value: 60, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '4', text: '政府需要足够权力维护秩序', value: 35, pole: 'authoritarian', subType: 'bonapartism' },
      { id: '5', text: '政府应该拥有广泛权力', value: 15, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-2',
    '对于多党制和选举制度，你的看法是？',
    'political',
    0.45,
    0.85,
    1.0,
    [
      { id: '1', text: '完全支持，这是民主的基础', value: 70, pole: 'democratic', subType: 'social-democracy' },
      { id: '2', text: '支持，但需要改革', value: 60, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '3', text: '中立，各有利弊', value: 45, pole: 'authoritarian' },
      { id: '4', text: '反对，会导致政治混乱', value: 25, pole: 'authoritarian', subType: 'bonapartism' },
      { id: '5', text: '强烈反对，一党制更高效', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-3',
    '个人自由与国家安全发生冲突时，应该优先考虑？',
    'political',
    0.7,
    0.9,
    1.1,
    [
      { id: '1', text: '个人自由绝对优先', value: 95, pole: 'libertarian', subType: 'anarchism' },
      { id: '2', text: '个人自由为主，必要时让步', value: 75, pole: 'libertarian', subType: 'minarchism' },
      { id: '3', text: '根据具体情况平衡', value: 55, pole: 'democratic' },
      { id: '4', text: '国家安全为主，限制部分自由', value: 30, pole: 'authoritarian' },
      { id: '5', text: '国家安全绝对优先', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-4',
    '对于言论自由，你的立场是？',
    'political',
    0.55,
    0.85,
    1.0,
    [
      { id: '1', text: '言论自由不应受到任何限制', value: 95, pole: 'libertarian', subType: 'anarchism' },
      { id: '2', text: '最大程度保护，极少数例外', value: 75, pole: 'libertarian', subType: 'minarchism' },
      { id: '3', text: '保护言论自由，但禁止仇恨言论', value: 55, pole: 'democratic', subType: 'social-democracy' },
      { id: '4', text: '言论自由需要合理限制', value: 30, pole: 'authoritarian' },
      { id: '5', text: '言论必须符合国家利益', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-5',
    '对于"强人政治"，你的看法是？',
    'political',
    0.65,
    0.9,
    1.2,
    [
      { id: '1', text: '强烈反对，权力必须分散', value: 90, pole: 'libertarian', subType: 'anarchism' },
      { id: '2', text: '反对，民主制度更可靠', value: 70, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '3', text: '中立，视具体情况而定', value: 50, pole: 'democratic', subType: 'social-democracy' },
      { id: '4', text: '支持，强人能带来稳定', value: 30, pole: 'authoritarian', subType: 'bonapartism' },
      { id: '5', text: '强烈支持，领袖是国家的灵魂', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-6',
    '司法独立有多重要？',
    'political',
    0.5,
    0.8,
    1.0,
    [
      { id: '1', text: '绝对重要，司法必须完全独立', value: 85, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '2', text: '非常重要，需要制度保障', value: 70, pole: 'democratic', subType: 'social-democracy' },
      { id: '3', text: '重要，但也需要监督', value: 50, pole: 'democratic' },
      { id: '4', text: '相对重要，但不能脱离政治', value: 30, pole: 'authoritarian' },
      { id: '5', text: '司法应服务于国家目标', value: 15, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-7',
    '对于政府监控公民（如监控通信、摄像头等），你的态度是？',
    'political',
    0.7,
    0.85,
    1.1,
    [
      { id: '1', text: '强烈反对，这是侵犯隐私', value: 90, pole: 'libertarian', subType: 'anarchism' },
      { id: '2', text: '反对，监控应该受到严格限制', value: 70, pole: 'libertarian', subType: 'minarchism' },
      { id: '3', text: '中立，需要平衡安全与隐私', value: 50, pole: 'democratic' },
      { id: '4', text: '支持，为了国家安全', value: 30, pole: 'authoritarian' },
      { id: '5', text: '强烈支持，全面监控维护秩序', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-8',
    '对于政治反对派，应该采取什么态度？',
    'political',
    0.6,
    0.9,
    1.0,
    [
      { id: '1', text: '完全自由，反对派是民主的必要部分', value: 80, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '2', text: '保护反对派权利，但需要规范', value: 65, pole: 'democratic', subType: 'social-democracy' },
      { id: '3', text: '允许存在，但限制其影响力', value: 40, pole: 'authoritarian' },
      { id: '4', text: '严格限制，防止破坏稳定', value: 25, pole: 'authoritarian', subType: 'bonapartism' },
      { id: '5', text: '禁止反对派，维护国家统一', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-9',
    '军队应该扮演什么角色？',
    'political',
    0.65,
    0.8,
    0.9,
    [
      { id: '1', text: '仅负责国防，不参与政治', value: 75, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '2', text: '国防为主，紧急时可协助', value: 60, pole: 'democratic', subType: 'social-democracy' },
      { id: '3', text: '国防和国内安全', value: 45, pole: 'authoritarian' },
      { id: '4', text: '维护国家稳定的重要力量', value: 30, pole: 'authoritarian', subType: 'bonapartism' },
      { id: '5', text: '国家的核心支柱，参与治理', value: 15, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-10',
    '对于"人民民主专政"或"无产阶级专政"这类概念，你的看法是？',
    'political',
    0.75,
    0.85,
    1.1,
    [
      { id: '1', text: '强烈反对，这是专制借口', value: 85, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '2', text: '反对，民主应该包容所有人', value: 70, pole: 'democratic', subType: 'social-democracy' },
      { id: '3', text: '中立，理解其历史背景', value: 50, pole: 'authoritarian' },
      { id: '4', text: '支持，特定阶段需要', value: 30, pole: 'authoritarian' },
      { id: '5', text: '强烈支持，这是真正的民主', value: 15, pole: 'totalitarian' }
    ]
  )
]

// ==================== 社会结构轴（10题）====================

const socialQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'soc-1',
    '个人利益与集体利益发生冲突时，应该优先考虑？',
    'social',
    0.5,
    0.9,
    1.2,
    [
      { id: '1', text: '个人利益绝对优先', value: 95, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '个人利益为主，适当考虑集体', value: 75, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '根据具体情况平衡', value: 50, pole: 'communitarian' },
      { id: '4', text: '集体利益为主，保护个人基本权利', value: 30, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '集体利益绝对优先', value: 10, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  ),
  createWeightedQuestion(
    'soc-2',
    '对于"个人责任"与"社会责任"，你的看法是？',
    'social',
    0.55,
    0.85,
    1.0,
    [
      { id: '1', text: '强调个人责任，成功取决于自己', value: 90, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '个人责任为主，社会提供机会', value: 70, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '两者并重', value: 50, pole: 'communitarian' },
      { id: '4', text: '社会责任为主，个人融入集体', value: 30, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '强调社会责任，个人服从集体', value: 15, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  ),
  createWeightedQuestion(
    'soc-3',
    '对于社会福利制度，你的立场是？',
    'social',
    0.6,
    0.8,
    1.1,
    [
      { id: '1', text: '应该大幅削减，鼓励自立', value: 90, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '适度削减，强调个人责任', value: 70, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '保持现状，平衡各方需求', value: 50, pole: 'communitarian' },
      { id: '4', text: '应该扩大，保障基本生活', value: 35, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '大幅扩大，实现共同富裕', value: 15, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  ),
  createWeightedQuestion(
    'soc-4',
    '对于"躺平"现象，你的看法是？',
    'social',
    0.65,
    0.75,
    0.9,
    [
      { id: '1', text: '强烈反对，这是逃避责任', value: 85, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '2', text: '反对，但理解社会压力', value: 65, pole: 'communitarian' },
      { id: '3', text: '中立，个人选择自由', value: 50, pole: 'communitarian' },
      { id: '4', text: '理解，是对过度竞争的反应', value: 35, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '5', text: '支持，追求内心平静更重要', value: 20, pole: 'individualism', subType: 'egoism' }
    ]
  ),
  createWeightedQuestion(
    'soc-5',
    '对于加班文化，你的立场是？',
    'social',
    0.5,
    0.8,
    1.0,
    [
      { id: '1', text: '支持，奋斗创造价值', value: 85, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '2', text: '可以理解，但要有补偿', value: 65, pole: 'communitarian' },
      { id: '3', text: '视情况而定', value: 50, pole: 'communitarian' },
      { id: '4', text: '反对，影响生活质量', value: 35, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '5', text: '强烈反对，侵犯休息权', value: 15, pole: 'individualism', subType: 'egoism' }
    ]
  ),
  createWeightedQuestion(
    'soc-6',
    '对于"工作即生活"这个理念，你的看法是？',
    'social',
    0.55,
    0.75,
    0.85,
    [
      { id: '1', text: '完全认同，工作赋予生命意义', value: 90, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '2', text: '基本认同，工作是重要部分', value: 70, pole: 'communitarian' },
      { id: '3', text: '工作只是生活的一部分', value: 50, pole: 'communitarian' },
      { id: '4', text: '工作和生活应明确分开', value: 30, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '5', text: '反对，生活不应被工作定义', value: 15, pole: 'individualism', subType: 'egoism' }
    ]
  ),
  createWeightedQuestion(
    'soc-7',
    '对于社区和邻里关系，你认为？',
    'social',
    0.45,
    0.7,
    0.8,
    [
      { id: '1', text: '不重要，保持距离更好', value: 85, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '适度交往，不过度介入', value: 65, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '重要，应该积极参与', value: 45, pole: 'communitarian' },
      { id: '4', text: '非常重要，社区是生活基础', value: 30, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '核心重要，集体高于个人', value: 15, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  ),
  createWeightedQuestion(
    'soc-8',
    '对于"996"工作制，你的态度是？',
    'social',
    0.6,
    0.85,
    1.0,
    [
      { id: '1', text: '支持，这是奋斗的体现', value: 85, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '2', text: '可以理解，但需要补偿', value: 65, pole: 'communitarian' },
      { id: '3', text: '中立，视个人选择', value: 50, pole: 'communitarian' },
      { id: '4', text: '反对，侵犯劳动者权益', value: 30, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '5', text: '强烈反对，应该禁止', value: 15, pole: 'individualism', subType: 'egoism' }
    ]
  ),
  createWeightedQuestion(
    'soc-9',
    '对于"先富带动后富"，你的看法是？',
    'social',
    0.7,
    0.8,
    1.0,
    [
      { id: '1', text: '反对，每个人应该自己努力', value: 85, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '理解，但不应强制', value: 65, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '中立，需要平衡', value: 50, pole: 'communitarian' },
      { id: '4', text: '支持，共同富裕是目标', value: 30, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '强烈支持，必须实现共同富裕', value: 15, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  ),
  createWeightedQuestion(
    'soc-10',
    '对于"牺牲小我，成就大我"，你的态度是？',
    'social',
    0.65,
    0.85,
    1.1,
    [
      { id: '1', text: '强烈反对，个人不应被牺牲', value: 90, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '反对，除非自愿', value: 70, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '中立，视具体情况', value: 50, pole: 'communitarian' },
      { id: '4', text: '支持，集体利益高于个人', value: 30, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '强烈支持，个人应服从集体', value: 10, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  )
]

// ==================== 文化价值轴（10题）====================

const culturalQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'cul-1',
    '对于传统文化和价值观念，你的态度是？',
    'cultural',
    0.5,
    0.85,
    1.0,
    [
      { id: '1', text: '必须严格传承和保护', value: 95, pole: 'traditionalism', subType: 'reactionary' },
      { id: '2', text: '尊重传统，谨慎改革', value: 75, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '取其精华去其糟粕', value: 50, pole: 'modernism' },
      { id: '4', text: '与时俱进，大胆创新', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '打破束缚，拥抱变革', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  ),
  createWeightedQuestion(
    'cul-2',
    '对于同性婚姻，你的立场是？',
    'cultural',
    0.6,
    0.9,
    1.1,
    [
      { id: '1', text: '强烈反对，违背传统', value: 95, pole: 'traditionalism', subType: 'reactionary' },
      { id: '2', text: '反对，但尊重个人选择', value: 70, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '中立，不干预他人', value: 50, pole: 'modernism' },
      { id: '4', text: '支持，保障平等权利', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '强烈支持，推动社会进步', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  ),
  createWeightedQuestion(
    'cul-3',
    '对于性别角色，你的看法是？',
    'cultural',
    0.55,
    0.85,
    1.0,
    [
      { id: '1', text: '男女性别有明确分工', value: 95, pole: 'traditionalism', subType: 'reactionary' },
      { id: '2', text: '保留一些传统分工', value: 70, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '根据个人能力自主选择', value: 50, pole: 'modernism' },
      { id: '4', text: '打破刻板印象', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '彻底消除性别差异观念', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  ),
  createWeightedQuestion(
    'cul-4',
    '对于宗教在社会中的角色，你的看法是？',
    'cultural',
    0.65,
    0.8,
    0.9,
    [
      { id: '1', text: '社会道德的基础，应大力弘扬', value: 95, pole: 'traditionalism', subType: 'reactionary' },
      { id: '2', text: '重要的文化和精神资源', value: 70, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '信仰自由，政教分离', value: 50, pole: 'modernism' },
      { id: '4', text: '私人领域事务', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '过时的迷信，应逐渐淡化', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  ),
  createWeightedQuestion(
    'cul-5',
    '对于社会变革的速度，你倾向于？',
    'cultural',
    0.5,
    0.75,
    0.85,
    [
      { id: '1', text: '渐进式改良，稳扎稳打', value: 90, pole: 'traditionalism', subType: 'conservatism' },
      { id: '2', text: '缓慢而持续的改进', value: 70, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '根据实际情况灵活调整', value: 50, pole: 'modernism' },
      { id: '4', text: '必要时可快速推进', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '大胆改革，快速转型', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  ),
  createWeightedQuestion(
    'cul-6',
    '对于多元文化主义，你的态度是？',
    'cultural',
    0.6,
    0.85,
    1.0,
    [
      { id: '1', text: '反对，应该维护主流文化', value: 90, pole: 'traditionalism', subType: 'reactionary' },
      { id: '2', text: '谨慎，避免文化冲突', value: 65, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '中立，尊重差异', value: 50, pole: 'modernism' },
      { id: '4', text: '支持，文化多样性是财富', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '强烈支持，消除文化霸权', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  ),
  createWeightedQuestion(
    'cul-7',
    '对于家庭结构的变化（如单亲家庭、丁克等），你的看法是？',
    'cultural',
    0.55,
    0.8,
    0.9,
    [
      { id: '1', text: '反对，传统家庭最稳定', value: 90, pole: 'traditionalism', subType: 'reactionary' },
      { id: '2', text: '担忧，但尊重选择', value: 65, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '中立，个人自由', value: 50, pole: 'modernism' },
      { id: '4', text: '支持，家庭形式多样化', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '强烈支持，打破家庭束缚', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  ),
  createWeightedQuestion(
    'cul-8',
    '对于教育中的传统经典，应该？',
    'cultural',
    0.45,
    0.75,
    0.8,
    [
      { id: '1', text: '大力推广，传承文化', value: 90, pole: 'traditionalism', subType: 'reactionary' },
      { id: '2', text: '保留，但需现代化解读', value: 70, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '与其他内容平衡', value: 50, pole: 'modernism' },
      { id: '4', text: '减少比重，增加现代内容', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '大幅削减，批判性学习', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  ),
  createWeightedQuestion(
    'cul-9',
    '对于"政治正确"，你的态度是？',
    'cultural',
    0.7,
    0.9,
    1.1,
    [
      { id: '1', text: '强烈反对，这是思想控制', value: 90, pole: 'traditionalism', subType: 'reactionary' },
      { id: '2', text: '反对，过度了', value: 70, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '中立，有利有弊', value: 50, pole: 'modernism' },
      { id: '4', text: '支持，保护弱势群体', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '强烈支持，必须严格执行', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  ),
  createWeightedQuestion(
    'cul-10',
    '对于"取消文化"（Cancel Culture），你的看法是？',
    'cultural',
    0.65,
    0.85,
    1.0,
    [
      { id: '1', text: '强烈反对，这是言论审查', value: 90, pole: 'traditionalism', subType: 'reactionary' },
      { id: '2', text: '反对，应该宽容不同观点', value: 70, pole: 'traditionalism', subType: 'conservatism' },
      { id: '3', text: '中立，视具体情况', value: 50, pole: 'modernism' },
      { id: '4', text: '理解，这是社会监督', value: 30, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '5', text: '支持，必须追究责任', value: 10, pole: 'progressivism', subType: 'radical-progressivism' }
    ]
  )
]

// ==================== 国际关系轴（10题）====================

const internationalQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'int-1',
    '对于全球化，你的态度是？',
    'international',
    0.5,
    0.85,
    1.0,
    [
      { id: '1', text: '强烈支持，全球化造福人类', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '支持，但需要监管', value: 70, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '中立，有利有弊', value: 50, pole: 'internationalism' },
      { id: '4', text: '谨慎，保护本国利益', value: 30, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '反对，优先本国发展', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-2',
    '对于移民政策，你的立场是？',
    'international',
    0.6,
    0.9,
    1.1,
    [
      { id: '1', text: '应该大幅开放', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '应该适度开放', value: 70, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '保持现状，有控制地开放', value: 50, pole: 'internationalism' },
      { id: '4', text: '应该适度收紧', value: 30, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '应该严格限制', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-3',
    '对于国际贸易壁垒，你的看法是？',
    'international',
    0.55,
    0.8,
    1.0,
    [
      { id: '1', text: '应该大幅降低', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '应该适度降低', value: 70, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '保持现状', value: 50, pole: 'internationalism' },
      { id: '4', text: '应该适度提高', value: 30, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '应该大幅提高', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-4',
    '对于国际组织（如联合国、WTO），你的态度是？',
    'international',
    0.5,
    0.85,
    1.0,
    [
      { id: '1', text: '加强权威，推动全球治理', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '发挥更大协调作用', value: 70, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '维持现状即可', value: 50, pole: 'internationalism' },
      { id: '4', text: '减少对主权的限制', value: 30, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '各国主权高于国际组织', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-5',
    '对于"国家主权"与"人权干预"，你的立场是？',
    'international',
    0.7,
    0.9,
    1.2,
    [
      { id: '1', text: '人权高于主权，应该干预', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '严重侵犯人权时可干预', value: 70, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '需要平衡，具体情况具体分析', value: 50, pole: 'internationalism' },
      { id: '4', text: '主权优先，减少干预', value: 30, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '主权绝对，反对任何干预', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-6',
    '对于"民族复兴"或"国家崛起"这类口号，你的态度是？',
    'international',
    0.65,
    0.85,
    1.0,
    [
      { id: '1', text: '反对，这是民族主义', value: 85, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '谨慎，可能导致冲突', value: 65, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '中立，理解其意义', value: 50, pole: 'internationalism' },
      { id: '4', text: '支持，国家应该强大', value: 30, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '强烈支持，民族至上', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-7',
    '对于外国文化的影响，你的看法是？',
    'international',
    0.5,
    0.75,
    0.85,
    [
      { id: '1', text: '欢迎，文化交流丰富生活', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '开放，但保持本国特色', value: 70, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '中立，自然发展', value: 50, pole: 'internationalism' },
      { id: '4', text: '谨慎，防止文化入侵', value: 30, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '反对，保护民族文化', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-8',
    '对于"一带一路"这类国际合作倡议，你的态度是？',
    'international',
    0.6,
    0.8,
    0.9,
    [
      { id: '1', text: '支持，促进全球合作', value: 80, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '2', text: '支持，但需要透明', value: 65, pole: 'internationalism' },
      { id: '3', text: '中立，观察效果', value: 50, pole: 'internationalism' },
      { id: '4', text: '谨慎，可能带来依赖', value: 35, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '反对，这是扩张主义', value: 15, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-9',
    '对于"世界公民"这个概念，你的看法是？',
    'international',
    0.55,
    0.8,
    0.9,
    [
      { id: '1', text: '认同，我是世界公民', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '部分认同，但也重视国家', value: 70, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '中立，概念模糊', value: 50, pole: 'internationalism' },
      { id: '4', text: '不认同，国家认同更重要', value: 30, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '反对，这是背叛国家', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-10',
    '对于难民问题，你的立场是？',
    'international',
    0.65,
    0.85,
    1.0,
    [
      { id: '1', text: '应该大幅接收', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '应该适度接收', value: 70, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '有条件接收', value: 50, pole: 'internationalism' },
      { id: '4', text: '应该严格限制', value: 30, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '应该拒绝接收', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  )
]

// ==================== 技术态度轴（10题）====================

const technologyQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'tech-1',
    '对于人工智能快速发展，你的态度是？',
    'technology',
    0.5,
    0.85,
    1.0,
    [
      { id: '1', text: '乐观期待，拥抱变革', value: 90, pole: 'techno-optimism', subType: 'transhumanism' },
      { id: '2', text: '谨慎乐观', value: 70, pole: 'techno-optimism', subType: 'techno-liberalism' },
      { id: '3', text: '中立，等待观察', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '谨慎担忧', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '强烈担忧，需要限制', value: 10, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-2',
    '对于基因编辑技术（如CRISPR），你的立场是？',
    'technology',
    0.65,
    0.9,
    1.1,
    [
      { id: '1', text: '应该大力推广', value: 90, pole: 'techno-optimism', subType: 'transhumanism' },
      { id: '2', text: '可以适度应用', value: 70, pole: 'techno-optimism', subType: 'techno-liberalism' },
      { id: '3', text: '需要严格监管', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '应该限制应用', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '应该禁止应用', value: 10, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-3',
    '对于自动化和AI导致的失业问题，你的看法是？',
    'technology',
    0.6,
    0.85,
    1.0,
    [
      { id: '1', text: '不会，会创造更多新岗位', value: 90, pole: 'techno-optimism', subType: 'transhumanism' },
      { id: '2', text: '短期阵痛，长期利好', value: 70, pole: 'techno-optimism', subType: 'techno-liberalism' },
      { id: '3', text: '结构性调整不可避免', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '可能导致严重失业问题', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '必然导致社会危机', value: 10, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-4',
    '对于科技巨头的垄断，你的态度是？',
    'technology',
    0.55,
    0.8,
    0.9,
    [
      { id: '1', text: '不干预，市场会自我调节', value: 85, pole: 'techno-optimism', subType: 'techno-liberalism' },
      { id: '2', text: '适度监管，防止滥用', value: 65, pole: 'techno-pragmatism' },
      { id: '3', text: '需要平衡创新与监管', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '应该严格监管', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '应该拆分科技巨头', value: 15, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-5',
    '对于人类增强技术（如脑机接口、基因改造），你的看法是？',
    'technology',
    0.7,
    0.9,
    1.1,
    [
      { id: '1', text: '强烈支持，这是人类进化方向', value: 90, pole: 'techno-optimism', subType: 'transhumanism' },
      { id: '2', text: '支持，但需要伦理框架', value: 70, pole: 'techno-optimism', subType: 'techno-liberalism' },
      { id: '3', text: '谨慎，需要更多研究', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '担忧，可能加剧不平等', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '反对，这是违背自然', value: 10, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-6',
    '对于数据隐私，你的态度是？',
    'technology',
    0.5,
    0.8,
    0.9,
    [
      { id: '1', text: '不担心，便利更重要', value: 85, pole: 'techno-optimism', subType: 'techno-liberalism' },
      { id: '2', text: '适度关注，但接受便利', value: 65, pole: 'techno-pragmatism' },
      { id: '3', text: '需要平衡隐私与便利', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '担忧，应该加强保护', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '强烈担忧，拒绝数据收集', value: 10, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-7',
    '对于自动驾驶技术，你的态度是？',
    'technology',
    0.45,
    0.75,
    0.8,
    [
      { id: '1', text: '强烈支持，这是未来趋势', value: 90, pole: 'techno-optimism', subType: 'transhumanism' },
      { id: '2', text: '支持，但需要完善', value: 70, pole: 'techno-optimism', subType: 'techno-liberalism' },
      { id: '3', text: '中立，等待成熟', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '担忧，安全问题', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '反对，应该限制', value: 10, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-8',
    '对于社交媒体的影响，你的看法是？',
    'technology',
    0.55,
    0.8,
    0.85,
    [
      { id: '1', text: '积极，连接了世界', value: 85, pole: 'techno-optimism', subType: 'techno-liberalism' },
      { id: '2', text: '利大于弊', value: 65, pole: 'techno-pragmatism' },
      { id: '3', text: '有利有弊', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '弊大于利，需要监管', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '负面影响严重，应该限制', value: 10, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-9',
    '对于技术发展与环境的关系，你的看法是？',
    'technology',
    0.6,
    0.85,
    1.0,
    [
      { id: '1', text: '技术可以解决环境问题', value: 85, pole: 'techno-optimism', subType: 'transhumanism' },
      { id: '2', text: '技术发展与环境保护可以兼顾', value: 65, pole: 'techno-pragmatism' },
      { id: '3', text: '需要平衡技术与环境', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '技术发展加剧环境问题', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '技术是环境危机的根源', value: 10, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-10',
    '对于"技术决定论"（技术决定社会发展方向），你的看法是？',
    'technology',
    0.7,
    0.85,
    1.0,
    [
      { id: '1', text: '认同，技术是社会发展的驱动力', value: 85, pole: 'techno-optimism', subType: 'transhumanism' },
      { id: '2', text: '部分认同，技术影响很大', value: 65, pole: 'techno-optimism', subType: 'techno-liberalism' },
      { id: '3', text: '中立，技术与社会相互影响', value: 50, pole: 'techno-pragmatism' },
      { id: '4', text: '不认同，社会应该引导技术', value: 30, pole: 'techno-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '反对，技术应该服务人类', value: 10, pole: 'techno-skepticism', subType: 'luddism' }
    ]
  )
]

// ==================== 导出所有题目 ====================

export const ideologyProfessionalQuestions: ProfessionalQuestionSet = {
  normal: [],
  advanced: [],
  professional: [
    ...economicQuestions,
    ...politicalQuestions,
    ...socialQuestions,
    ...culturalQuestions,
    ...internationalQuestions,
    ...technologyQuestions,
    ...highControversyEconomicQuestions,
    ...highControversyPoliticalQuestions,
    ...highControversySocialQuestions,
    ...highControversyCulturalQuestions,
    ...highControversyInternationalQuestions,
    ...highControversyTechnologyQuestions,
    ...additionalEconomicQuestions,
    ...additionalPoliticalQuestions,
    ...additionalSocialQuestions,
    ...additionalCulturalQuestions,
    ...additionalInternationalQuestions,
    ...additionalTechnologyQuestions
  ].map((q) => ({
    id: q.id,
    text: q.text,
    type: 'single' as const,
    subscale: q.dimension,
    options: q.options.map((opt) => ({
      id: opt.id,
      text: opt.text,
      value: opt.value,
      trait: opt.pole
    }))
  }))
}

// ==================== 权重配置 ====================

export const ideologyWeightConfig = {
  dimensions: {
    economic: {
      baseWeight: 1.0,
      questionCount: 10,
      importance: 1.0
    },
    political: {
      baseWeight: 1.2,
      questionCount: 10,
      importance: 1.2
    },
    social: {
      baseWeight: 1.0,
      questionCount: 10,
      importance: 1.0
    },
    cultural: {
      baseWeight: 0.9,
      questionCount: 10,
      importance: 0.9
    },
    international: {
      baseWeight: 0.85,
      questionCount: 10,
      importance: 0.85
    },
    technology: {
      baseWeight: 0.8,
      questionCount: 10,
      importance: 0.8
    }
  },
  globalMultiplier: 1.0,
  adaptiveFactors: {
    responseTimeWeight: 0.1,
    consistencyWeight: 0.15,
    difficultyProgressionWeight: 0.1,
    crossValidationWeight: 0.1
  }
}

// ==================== 题目权重映射 ====================

export const questionWeightMap = new Map(
  [
    ...economicQuestions,
    ...politicalQuestions,
    ...socialQuestions,
    ...culturalQuestions,
    ...internationalQuestions,
    ...technologyQuestions
  ].map((q) => [
    q.id,
    {
      baseWeight: ideologyWeightConfig.dimensions[q.dimension as keyof typeof ideologyWeightConfig.dimensions].baseWeight,
      difficultyWeight: q.difficulty,
      discriminationWeight: q.discrimination,
      importanceWeight: q.importance,
      finalWeight: calculateFinalWeight(q)
    }
  ])
)

function calculateFinalWeight(question: WeightedQuestion): number {
  const dimConfig = ideologyWeightConfig.dimensions[question.dimension as keyof typeof ideologyWeightConfig.dimensions]
  
  let weight = dimConfig.baseWeight
  
  weight *= (1 + question.difficulty * 0.3)
  
  weight *= (1 + question.discrimination * 0.2)
  
  weight *= question.importance
  
  weight *= ideologyWeightConfig.globalMultiplier
  
  return Math.round(weight * 100) / 100
}

// ==================== 导出题目详情 ====================

export const allIdeologyQuestions = [
  ...economicQuestions,
  ...politicalQuestions,
  ...socialQuestions,
  ...culturalQuestions,
  ...internationalQuestions,
  ...technologyQuestions
]
