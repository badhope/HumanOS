import type { Assessment } from '../../types'

export type QuestionType = 'core-principle' | 'policy-stand' | 'value-question' | 'trade-off'

export interface EnhancedQuestion {
  id: string
  type: QuestionType
  text: string
  dimension: 'economic' | 'social' | 'cultural' | 'diplomatic' | 'ecological'
  weight: number
  discrimination: number
  difficulty: number
  reverseScored?: boolean
  options: { id: string; text: string; value: number }[]
}

/**
 * 增强版意识形态题库
 * 
 * 题目分类：
 * - core-principle: 核心原则题（权重1.5）- 最能定义意识形态的问题
 * - policy-stand: 政策立场题（权重1.0）- 关于具体政策的看法
 * - value-question: 价值观问题（权重1.0）- 个人价值观
 * - trade-off: 权衡抉择题（权重1.2）- 两个价值间的选择，区分能力强
 */
export const enhancedIdeologyQuestions: EnhancedQuestion[] = [
  // 经济维度 - 12题
  {
    id: 'ideo-eco-1',
    type: 'core-principle',
    text: '💰 经济原则：财富分配应该以什么为导向？',
    dimension: 'economic',
    weight: 1.5,
    discrimination: 0.9,
    difficulty: 1,
    options: [
      { id: '1', text: '绝对平等，按需分配', value: 1 },
      { id: '2', text: '相对平等，政府调节', value: 2 },
      { id: '3', text: '机会平等，市场决定', value: 3 },
      { id: '4', text: '结果不重要，自由至上', value: 4 },
      { id: '5', text: '物竞天择，适者生存', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-2',
    type: 'policy-stand',
    text: '🏭 生产资料：应该如何对待私有制？',
    dimension: 'economic',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    options: [
      { id: '1', text: '全面公有制，消灭私有制', value: 1 },
      { id: '2', text: '关键行业国有，其他私有', value: 2 },
      { id: '3', text: '公私并存，各有优势', value: 3 },
      { id: '4', text: '尽量私有，市场主导', value: 4 },
      { id: '5', text: '完全私有，包括公共服务', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-3',
    type: 'value-question',
    text: '💸 税收：对富人征收重税来缩小贫富差距？',
    dimension: 'economic',
    weight: 1.0,
    discrimination: 0.8,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '强烈支持，大幅累进税', value: 1 },
      { id: '2', text: '支持，但税率不宜过高', value: 2 },
      { id: '3', text: '中立，看情况', value: 3 },
      { id: '4', text: '反对，会打击创富积极性', value: 4 },
      { id: '5', text: '强烈反对，所有税收都是盗窃', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-4',
    type: 'trade-off',
    text: '⚖️ 经济权衡：公平和效率哪个更重要？',
    dimension: 'economic',
    weight: 1.2,
    discrimination: 0.85,
    difficulty: 2,
    options: [
      { id: '1', text: '公平绝对优先', value: 1 },
      { id: '2', text: '公平为主，兼顾效率', value: 2 },
      { id: '3', text: '两者同样重要', value: 3 },
      { id: '4', text: '效率为主，兼顾公平', value: 4 },
      { id: '5', text: '效率绝对优先', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-5',
    type: 'policy-stand',
    text: '🏥 社会福利：医疗和教育应该如何提供？',
    dimension: 'economic',
    weight: 1.0,
    discrimination: 0.75,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '完全公立，全民免费', value: 1 },
      { id: '2', text: '公立为主，私立补充', value: 2 },
      { id: '3', text: '双轨并行，公私平等', value: 3 },
      { id: '4', text: '私立为主，公立兜底', value: 4 },
      { id: '5', text: '完全私有化，政府不管', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-6',
    type: 'value-question',
    text: '📈 经济思想：你更认同哪句话？',
    dimension: 'economic',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    options: [
      { id: '1', text: '各尽所能，各取所需', value: 1 },
      { id: '2', text: '从摇篮到坟墓的福利国家', value: 2 },
      { id: '3', text: '适度福利加自由市场', value: 3 },
      { id: '4', text: '小政府，低税收，大市场', value: 4 },
      { id: '5', text: '不劳动者不得食，优胜劣汰', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-7',
    type: 'policy-stand',
    text: '💹 全球化：如何看待经济全球化？',
    dimension: 'economic',
    weight: 1.0,
    discrimination: 0.65,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '资本家的阴谋，坚决抵制', value: 1 },
      { id: '2', text: '伤害工人，需要保护主义', value: 2 },
      { id: '3', text: '有利有弊，看如何应对', value: 3 },
      { id: '4', text: '总体利大于弊', value: 4 },
      { id: '5', text: '人类的未来，国界应该消除', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-8',
    type: 'core-principle',
    text: '💰 财富道德：亿万富翁的存在意味着什么？',
    dimension: 'economic',
    weight: 1.5,
    discrimination: 0.85,
    difficulty: 2,
    options: [
      { id: '1', text: '制度性犯罪，必须消灭', value: 1 },
      { id: '2', text: '不公平，但可以接受', value: 2 },
      { id: '3', text: '无所谓，不关心', value: 3 },
      { id: '4', text: '能力的证明，值得尊重', value: 4 },
      { id: '5', text: '人类文明的发动机', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-9',
    type: 'trade-off',
    text: '⚖️ 劳资权衡：你更同情哪一方？',
    dimension: 'economic',
    weight: 1.2,
    discrimination: 0.75,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '罢工的工人', value: 1 },
      { id: '2', text: '基层员工', value: 2 },
      { id: '3', text: '都不同情，都一样', value: 3 },
      { id: '4', text: '创业的企业家', value: 4 },
      { id: '5', text: '白手起家的亿万富翁', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-10',
    type: 'policy-stand',
    text: '💸 最低工资：应该有最低工资法吗？',
    dimension: 'economic',
    weight: 1.0,
    discrimination: 0.6,
    difficulty: 1,
    options: [
      { id: '1', text: '大幅提高，保障体面生活', value: 1 },
      { id: '2', text: '适度提高，逐步调整', value: 2 },
      { id: '3', text: '维持现状', value: 3 },
      { id: '4', text: '应该取消，让市场决定', value: 4 },
      { id: '5', text: '不仅取消，还要废除所有劳动保护', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-11',
    type: 'value-question',
    text: '🧰 工会地位：工会应该扮演什么角色？',
    dimension: 'economic',
    weight: 1.0,
    discrimination: 0.65,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '法律强制所有企业必须有工会', value: 1 },
      { id: '2', text: '支持工会，劳动法偏向劳动者', value: 2 },
      { id: '3', text: '中立，存在即可', value: 3 },
      { id: '4', text: '限制工会权力，平衡劳资关系', value: 4 },
      { id: '5', text: '工会就是敲诈勒索，应该取缔', value: 5 },
    ],
  },
  {
    id: 'ideo-eco-12',
    type: 'core-principle',
    text: '🎯 经济目标：经济发展的最终目的是什么？',
    dimension: 'economic',
    weight: 1.5,
    discrimination: 0.8,
    difficulty: 2,
    options: [
      { id: '1', text: '人类解放和全面发展', value: 1 },
      { id: '2', text: '共同富裕，公平正义', value: 2 },
      { id: '3', text: '国家强盛，人民幸福', value: 3 },
      { id: '4', text: '经济增长，财富积累', value: 4 },
      { id: '5', text: '个人自由，追求卓越', value: 5 },
    ],
  },

  // 社会/威权维度 - 12题
  {
    id: 'ideo-soc-1',
    type: 'core-principle',
    text: '🚔 政府权力：为了安全可以监控公民吗？',
    dimension: 'social',
    weight: 1.5,
    discrimination: 0.9,
    difficulty: 1,
    options: [
      { id: '1', text: '必须的，安全绝对优先', value: 1 },
      { id: '2', text: '可以接受，但要有监督', value: 2 },
      { id: '3', text: '中立，看具体情况', value: 3 },
      { id: '4', text: '这是侵犯隐私，不能接受', value: 4 },
      { id: '5', text: '政府根本就不该存在', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-2',
    type: 'trade-off',
    text: '⚖️ 安全与自由：哪个更重要？',
    dimension: 'social',
    weight: 1.2,
    discrimination: 0.85,
    difficulty: 2,
    options: [
      { id: '1', text: '安全绝对优先', value: 1 },
      { id: '2', text: '安全为主，兼顾自由', value: 2 },
      { id: '3', text: '两者同等重要', value: 3 },
      { id: '4', text: '自由为主，兼顾安全', value: 4 },
      { id: '5', text: '自由绝对优先', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-3',
    type: 'policy-stand',
    text: '👮 警察暴力：你如何看待警察执法？',
    dimension: 'social',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    options: [
      { id: '1', text: '乱世用重典，警察越狠越好', value: 1 },
      { id: '2', text: '总体支持，偶尔过度可以理解', value: 2 },
      { id: '3', text: '中立，不了解', value: 3 },
      { id: '4', text: '警察系统性滥用权力', value: 4 },
      { id: '5', text: '警察就是有执照的暴力团伙', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-4',
    type: 'value-question',
    text: '🗳️ 民主价值：民主制度是最好的吗？',
    dimension: 'social',
    weight: 1.0,
    discrimination: 0.75,
    difficulty: 1,
    options: [
      { id: '1', text: '民主就是笑话，开明专制最好', value: 1 },
      { id: '2', text: '民主需要强人来领导', value: 2 },
      { id: '3', text: '是最不坏的制度', value: 3 },
      { id: '4', text: '代议民主不够，需要更多直接民主', value: 4 },
      { id: '5', text: '所有政府都是暴政，民主也一样', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-5',
    type: 'policy-stand',
    text: '⚡ 紧急状态：国家紧急时可以暂停人权吗？',
    dimension: 'social',
    weight: 1.0,
    discrimination: 0.65,
    difficulty: 1,
    options: [
      { id: '1', text: '当然可以，生存才是第一位', value: 1 },
      { id: '2', text: '短时间可以，不能太久', value: 2 },
      { id: '3', text: '看具体情况', value: 3 },
      { id: '4', text: '绝对不行，这是暴政的开始', value: 4 },
      { id: '5', text: '国家本身就没有存在的资格', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-6',
    type: 'core-principle',
    text: '🔫 持枪权：人民应该有持枪权吗？',
    dimension: 'social',
    weight: 1.5,
    discrimination: 0.85,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '全面禁枪，民间有枪就是灾难', value: 1 },
      { id: '2', text: '严格控枪，普通人没必要', value: 2 },
      { id: '3', text: '中立，无所谓', value: 3 },
      { id: '4', text: '当然应该有，这是权利', value: 4 },
      { id: '5', text: '不仅应该有，坦克火箭筒都应该有', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-7',
    type: 'value-question',
    text: '🏛️ 治理理念：哪个词让你更舒服？',
    dimension: 'social',
    weight: 1.0,
    discrimination: 0.6,
    difficulty: 1,
    options: [
      { id: '1', text: '秩序', value: 1 },
      { id: '2', text: '稳定', value: 2 },
      { id: '3', text: '平衡', value: 3 },
      { id: '4', text: '正义', value: 4 },
      { id: '5', text: '自由', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-8',
    type: 'trade-off',
    text: '🤝 秩序与变革：你更看重哪个？',
    dimension: 'social',
    weight: 1.2,
    discrimination: 0.7,
    difficulty: 2,
    options: [
      { id: '1', text: '维护现有秩序最重要', value: 1 },
      { id: '2', text: '渐进改良比较好', value: 2 },
      { id: '3', text: '看情况而定', value: 3 },
      { id: '4', text: '需要改革，但不能太急', value: 4 },
      { id: '5', text: '彻底变革是必要的', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-9',
    type: 'policy-stand',
    text: '🚫 言论自由：应该有边界吗？',
    dimension: 'social',
    weight: 1.0,
    discrimination: 0.8,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '有害思想必须消灭在萌芽状态', value: 1 },
      { id: '2', text: '仇恨言论和假新闻应该被审查', value: 2 },
      { id: '3', text: '适度边界即可', value: 3 },
      { id: '4', text: '几乎没有边界，除非直接煽动暴力', value: 4 },
      { id: '5', text: '没有任何边界', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-10',
    type: 'value-question',
    text: '👪 家庭干预：国家应该干涉家庭内部事务吗？',
    dimension: 'social',
    weight: 1.0,
    discrimination: 0.6,
    difficulty: 1,
    options: [
      { id: '1', text: '应该，保护弱者是国家的责任', value: 1 },
      { id: '2', text: '适度干预', value: 2 },
      { id: '3', text: '看具体情况', value: 3 },
      { id: '4', text: '尽量不要，家庭是私人领域', value: 4 },
      { id: '5', text: '绝对不能，我的家事我说了算', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-11',
    type: 'core-principle',
    text: '💊 毒品政策：毒品应该合法化吗？',
    dimension: 'social',
    weight: 1.5,
    discrimination: 0.75,
    difficulty: 2,
    reverseScored: true,
    options: [
      { id: '1', text: '严刑峻法，贩毒一律死刑', value: 1 },
      { id: '2', text: '毒品战争效果不好，但还要打', value: 2 },
      { id: '3', text: '不知道，不关心', value: 3 },
      { id: '4', text: '大麻合法化，硬毒不行', value: 4 },
      { id: '5', text: '全部合法化，哪怕是海洛因', value: 5 },
    ],
  },
  {
    id: 'ideo-soc-12',
    type: 'value-question',
    text: '📜 恐惧来源：你更害怕什么？',
    dimension: 'social',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    options: [
      { id: '1', text: '混乱和无政府状态', value: 1 },
      { id: '2', text: '犯罪率上升', value: 2 },
      { id: '3', text: '都害怕，一样可怕', value: 3 },
      { id: '4', text: '政府权力太大', value: 4 },
      { id: '5', text: '我自己变成顺民', value: 5 },
    ],
  },

  // 外交维度 - 10题
  {
    id: 'ideo-dip-1',
    type: 'core-principle',
    text: '🌍 外交原则：国家应该干涉他国内政吗？',
    dimension: 'diplomatic',
    weight: 1.5,
    discrimination: 0.85,
    difficulty: 1,
    options: [
      { id: '1', text: '当然，输出价值是我们的使命', value: 1 },
      { id: '2', text: '符合我们利益就可以介入', value: 2 },
      { id: '3', text: '尽量不要', value: 3 },
      { id: '4', text: '绝对不应该，互不干涉内政', value: 4 },
      { id: '5', text: '根本就不该有国家', value: 5 },
    ],
  },
  {
    id: 'ideo-dip-2',
    type: 'value-question',
    text: '🏳️‍🌈 身份认同：你更认同什么？',
    dimension: 'diplomatic',
    weight: 1.0,
    discrimination: 0.8,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '我的民族高于一切', value: 1 },
      { id: '2', text: '首先是我的国家的公民', value: 2 },
      { id: '3', text: '都是人，分什么彼此', value: 3 },
      { id: '4', text: '我是世界公民', value: 4 },
      { id: '5', text: '全世界无产者联合起来', value: 5 },
    ],
  },
  {
    id: 'ideo-dip-3',
    type: 'policy-stand',
    text: '🛡️ 军费开支：应该投入多少军费？',
    dimension: 'diplomatic',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '大幅增加，我们需要更强大的军队', value: 1 },
      { id: '2', text: '增加一些，国防是头等大事', value: 2 },
      { id: '3', text: '维持现状', value: 3 },
      { id: '4', text: '大幅削减，军费太浪费了', value: 4 },
      { id: '5', text: '裁掉90%，军队根本不该有', value: 5 },
    ],
  },
  {
    id: 'ideo-dip-4',
    type: 'trade-off',
    text: '⚖️ 民族与人类：哪个更重要？',
    dimension: 'diplomatic',
    weight: 1.2,
    discrimination: 0.8,
    difficulty: 2,
    options: [
      { id: '1', text: '民族利益绝对优先', value: 1 },
      { id: '2', text: '民族为主，兼顾人类', value: 2 },
      { id: '3', text: '两者同样重要', value: 3 },
      { id: '4', text: '人类为主，兼顾民族', value: 4 },
      { id: '5', text: '人类命运绝对优先', value: 5 },
    ],
  },
  {
    id: 'ideo-dip-5',
    type: 'policy-stand',
    text: '🧳 移民政策：应该如何对待移民？',
    dimension: 'diplomatic',
    weight: 1.0,
    discrimination: 0.75,
    difficulty: 1,
    options: [
      { id: '1', text: '开放边界，想来就来', value: 1 },
      { id: '2', text: '欢迎移民，多元文化好', value: 2 },
      { id: '3', text: '适度移民即可', value: 3 },
      { id: '4', text: '严格限制，保护我们的文化', value: 4 },
      { id: '5', text: '零移民，已经来的遣返', value: 5 },
    ],
  },
  {
    id: 'ideo-dip-6',
    type: 'value-question',
    text: '⚔️ 战争态度：为了盟友应该开战吗？',
    dimension: 'diplomatic',
    weight: 1.0,
    discrimination: 0.65,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '不仅为了盟友，为了荣誉也应该战', value: 1 },
      { id: '2', text: '盟友有难必须帮助', value: 2 },
      { id: '3', text: '看具体情况', value: 3 },
      { id: '4', text: '除非本土被攻击，否则绝不参战', value: 4 },
      { id: '5', text: '永远不战，和平主义者', value: 5 },
    ],
  },
  {
    id: 'ideo-dip-7',
    type: 'policy-stand',
    text: '🇺🇳 国际组织：联合国等国际组织有用吗？',
    dimension: 'diplomatic',
    weight: 1.0,
    discrimination: 0.6,
    difficulty: 1,
    options: [
      { id: '1', text: '人类未来的政府，应该加强', value: 1 },
      { id: '2', text: '总体是好的，应该支持', value: 2 },
      { id: '3', text: '有利有弊', value: 3 },
      { id: '4', text: '没用的官僚机构', value: 4 },
      { id: '5', text: '主权的出卖者，应该退出', value: 5 },
    ],
  },
  {
    id: 'ideo-dip-8',
    type: 'core-principle',
    text: '💱 国际贸易：应该自由还是保护？',
    dimension: 'diplomatic',
    weight: 1.5,
    discrimination: 0.8,
    difficulty: 1,
    options: [
      { id: '1', text: '完全自由，零关税', value: 1 },
      { id: '2', text: '尽量自由', value: 2 },
      { id: '3', text: '适度保护', value: 3 },
      { id: '4', text: '保护民族工业', value: 4 },
      { id: '5', text: '闭关锁国，自给自足', value: 5 },
    ],
  },
  {
    id: 'ideo-dip-9',
    type: 'value-question',
    text: '🎌 民族主义：你如何看待民族主义？',
    dimension: 'diplomatic',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    options: [
      { id: '1', text: '人类历史上最伟大的力量', value: 1 },
      { id: '2', text: '总体是好的，有凝聚力', value: 2 },
      { id: '3', text: '双刃剑', value: 3 },
      { id: '4', text: '危险的意识形态', value: 4 },
      { id: '5', text: '世界大战的罪魁祸首', value: 5 },
    ],
  },
  {
    id: 'ideo-dip-10',
    type: 'value-question',
    text: '🤝 外交优先：哪个更重要？',
    dimension: 'diplomatic',
    weight: 1.0,
    discrimination: 0.65,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '国家利益', value: 1 },
      { id: '2', text: '国家安全', value: 2 },
      { id: '3', text: '同样重要', value: 3 },
      { id: '4', text: '国际正义', value: 4 },
      { id: '5', text: '人类团结', value: 5 },
    ],
  },

  // 文化维度 - 16题
  {
    id: 'ideo-cul-1',
    type: 'core-principle',
    text: '👶 堕胎权利：堕胎应该合法化吗？',
    dimension: 'cultural',
    weight: 1.5,
    discrimination: 0.9,
    difficulty: 1,
    options: [
      { id: '1', text: '绝对不行，生命从受孕开始', value: 1 },
      { id: '2', text: '只能在怀孕早期合法', value: 2 },
      { id: '3', text: '中立，不关心', value: 3 },
      { id: '4', text: '当然，我的身体我做主', value: 4 },
      { id: '5', text: '不仅堕胎，安乐死也应该合法', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-2',
    type: 'policy-stand',
    text: '🏳️‍🌈 同性婚姻：应该合法化吗？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.85,
    difficulty: 1,
    options: [
      { id: '1', text: '这是文明的癌症，应该入刑', value: 1 },
      { id: '2', text: '民事伴侣可以，但不能叫婚姻', value: 2 },
      { id: '3', text: '无所谓', value: 3 },
      { id: '4', text: '完全可以，和异性婚姻平等', value: 4 },
      { id: '5', text: '不止同性，多元家庭也应该承认', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-3',
    type: 'value-question',
    text: '📿 宗教角色：宗教在社会中应该扮演什么角色？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '宗教是人民的鸦片，应该被消灭', value: 1 },
      { id: '2', text: '宗教是迷信，应该淡出公共生活', value: 2 },
      { id: '3', text: '信仰自由，政教分离', value: 3 },
      { id: '4', text: '宗教是道德的基础，应该有重要地位', value: 4 },
      { id: '5', text: '国教，政教合一是最好的', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-4',
    type: 'trade-off',
    text: '⚖️ 传统与变革：你更看重哪个？',
    dimension: 'cultural',
    weight: 1.2,
    discrimination: 0.8,
    difficulty: 2,
    options: [
      { id: '1', text: '传统绝对重要', value: 1 },
      { id: '2', text: '传统为主，适度变革', value: 2 },
      { id: '3', text: '两者同样重要', value: 3 },
      { id: '4', text: '变革为主，保留好的传统', value: 4 },
      { id: '5', text: '传统就是束缚，全部抛弃', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-5',
    type: 'value-question',
    text: '👨‍👩‍👧 家庭结构：传统家庭应该维护吗？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    options: [
      { id: '1', text: '必须维护，这是社会的基石', value: 1 },
      { id: '2', text: '总体是好的，应该提倡', value: 2 },
      { id: '3', text: '什么样的家庭都可以', value: 3 },
      { id: '4', text: '传统家庭有很多问题，应该反思', value: 4 },
      { id: '5', text: '家庭本身就是压迫性的制度', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-6',
    type: 'core-principle',
    text: '🎭 性别认同：有多少种性别？',
    dimension: 'cultural',
    weight: 1.5,
    discrimination: 0.85,
    difficulty: 1,
    options: [
      { id: '1', text: '只有两种，男和女', value: 1 },
      { id: '2', text: '主要两种，有少数例外', value: 2 },
      { id: '3', text: '我不知道也不在乎', value: 3 },
      { id: '4', text: '一个光谱', value: 4 },
      { id: '5', text: '无数种，性别是社会建构', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-7',
    type: 'policy-stand',
    text: '📚 教育内容：学校应该教孩子们什么？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.75,
    difficulty: 1,
    options: [
      { id: '1', text: '爱国、纪律、传统价值观', value: 1 },
      { id: '2', text: '基础知识加道德教育', value: 2 },
      { id: '3', text: '知识就行', value: 3 },
      { id: '4', text: '批判性思维和多元文化', value: 4 },
      { id: '5', text: '反对父权制、反资本主义、解殖民', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-8',
    type: 'value-question',
    text: '🗺️ 历史观点：我们国家的历史是怎样的？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    reverseScored: true,
    options: [
      { id: '1', text: '建立在屠杀和压迫之上的谎言', value: 1 },
      { id: '2', text: '有很多黑暗面需要反省', value: 2 },
      { id: '3', text: '就是历史而已', value: 3 },
      { id: '4', text: '有好有坏，但光荣为主', value: 4 },
      { id: '5', text: '光荣而伟大的，值得骄傲', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-9',
    type: 'trade-off',
    text: '🎨 艺术自由：冒犯性的艺术应该被禁止吗？',
    dimension: 'cultural',
    weight: 1.2,
    discrimination: 0.75,
    difficulty: 2,
    options: [
      { id: '1', text: '是的，亵渎神灵和民族象征必须禁止', value: 1 },
      { id: '2', text: '是的，伤害人民感情的就不该有', value: 2 },
      { id: '3', text: '看情况而定', value: 3 },
      { id: '4', text: '哪怕冒犯也要允许艺术自由', value: 4 },
      { id: '5', text: '越冒犯越伟大，震惊就是艺术的目的', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-10',
    type: 'policy-stand',
    text: '🚻 性别厕所：跨性别者应该用什么厕所？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    options: [
      { id: '1', text: '绝对不行，这是对女性权利的侵犯', value: 1 },
      { id: '2', text: '第三性别厕所可以，男女厕所不行', value: 2 },
      { id: '3', text: '我不知道', value: 3 },
      { id: '4', text: '心理性别是什么就用什么厕所', value: 4 },
      { id: '5', text: '所有性别隔离的厕所都应该废除', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-11',
    type: 'value-question',
    text: '🧬 先天后天：人类的差异主要是先天还是后天？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.65,
    difficulty: 1,
    options: [
      { id: '1', text: '当然，生物学决定一切', value: 1 },
      { id: '2', text: '很大程度上是先天的', value: 2 },
      { id: '3', text: '先天后天都有', value: 3 },
      { id: '4', text: '主要是社会建构的', value: 4 },
      { id: '5', text: '完全是社会建构，生物学不重要', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-12',
    type: 'policy-stand',
    text: '👨‍🏫 政治正确：你如何看待政治正确？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.75,
    difficulty: 1,
    options: [
      { id: '1', text: '西方文明的癌症', value: 1 },
      { id: '2', text: '太过火了，需要矫枉过正', value: 2 },
      { id: '3', text: '有好有坏', value: 3 },
      { id: '4', text: '总体是好的，让社会更礼貌', value: 4 },
      { id: '5', text: '还远远不够，系统性歧视依然存在', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-13',
    type: 'core-principle',
    text: '🌱 环保优先：环保和经济发展哪个更重要？',
    dimension: 'cultural',
    weight: 1.5,
    discrimination: 0.8,
    difficulty: 2,
    options: [
      { id: '1', text: '人类是地球的癌症，自愿灭绝是唯一答案', value: 1 },
      { id: '2', text: '环保优先，哪怕影响经济', value: 2 },
      { id: '3', text: '平衡发展', value: 3 },
      { id: '4', text: '经济发展永远是第一位的', value: 4 },
      { id: '5', text: '环保就是邪教，人类优先', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-14',
    type: 'value-question',
    text: '🚺 女权主义：你如何看待女权主义？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.7,
    difficulty: 1,
    options: [
      { id: '1', text: '仇恨男性的邪教', value: 1 },
      { id: '2', text: '走得太远了，已经过了头', value: 2 },
      { id: '3', text: '中性词', value: 3 },
      { id: '4', text: '还没完成，依然需要继续', value: 4 },
      { id: '5', text: '父权制依然根深蒂固，需要激进女权', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-15',
    type: 'trade-off',
    text: '🍖 饮食道德：吃肉是道德的吗？',
    dimension: 'cultural',
    weight: 1.2,
    discrimination: 0.6,
    difficulty: 2,
    options: [
      { id: '1', text: '天经地义，人类就是要吃肉', value: 1 },
      { id: '2', text: '当然道德，不然长牙齿干嘛', value: 2 },
      { id: '3', text: '我没想过这个问题', value: 3 },
      { id: '4', text: '素食是更好的选择，但不强迫别人', value: 4 },
      { id: '5', text: '肉食就是物种主义的大屠杀', value: 5 },
    ],
  },
  {
    id: 'ideo-cul-16',
    type: 'value-question',
    text: '🎎 传统习俗：你对传统习俗的态度？',
    dimension: 'cultural',
    weight: 1.0,
    discrimination: 0.65,
    difficulty: 1,
    options: [
      { id: '1', text: '必须严格遵守，这是我们的根', value: 1 },
      { id: '2', text: '应该尊重和保留', value: 2 },
      { id: '3', text: '无所谓', value: 3 },
      { id: '4', text: '不好的就该改革', value: 4 },
      { id: '5', text: '所有传统都是压迫，全部抛弃', value: 5 },
    ],
  },
]

export const ideologyEnhancedAssessment: Assessment = {
  id: 'ideology-enhanced',
  title: '意识形态罗盘（增强版）',
  description: '更全面、更精准的意识形态测试',
  category: '意识形态',
  subcategory: '政治坐标',
  difficulty: 'standard',
  duration: 15,
  quality: '专业',
  resultCalculator: () => {},
  questions: enhancedIdeologyQuestions.map(q => ({
    id: q.id,
    type: 'single',
    text: q.text,
    dimension: q.dimension,
    options: q.options,
  })),
}

export function getQuestionsForVersion(version: 'normal' | 'professional'): EnhancedQuestion[] {
  const questions = [...enhancedIdeologyQuestions]
  
  if (version === 'normal') {
    // 普通版：35题，每个维度适当抽取
    const selected: EnhancedQuestion[] = []
    
    // 按维度和类型分组
    const grouped: Record<string, Record<QuestionType, EnhancedQuestion[]>> = {
      economic: {},
      social: {},
      cultural: {},
      diplomatic: {},
      ecological: {},
    }
    
    questions.forEach(q => {
      if (!grouped[q.dimension]) grouped[q.dimension] = {} as any
      if (!grouped[q.dimension][q.type]) grouped[q.dimension][q.type] = []
      grouped[q.dimension][q.type].push(q)
    })
    
    // 每个维度抽取核心题目
    const normalDistribution = {
      economic: 9,
      social: 9,
      diplomatic: 7,
      cultural: 10,
    }
    
    Object.entries(normalDistribution).forEach(([dimension, count]) => {
      const dimQuestions = questions.filter(q => q.dimension === dimension)
      // 优先选择核心原则和权衡抉择题
      const sorted = [...dimQuestions].sort((a, b) => {
        const scoreA = a.type === 'core-principle' ? 3 : a.type === 'trade-off' ? 2 : 1
        const scoreB = b.type === 'core-principle' ? 3 : b.type === 'trade-off' ? 2 : 1
        return scoreB - scoreA
      })
      selected.push(...sorted.slice(0, count))
    })
    
    return shuffleArray(selected)
  } else {
    // 专业版：所有题目（12+12+10+16=50题，我们可以保留全部）
    return shuffleArray([...questions])
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
