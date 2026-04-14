import type { ProfessionalQuestionSet } from '../../types'

/**
 * 高质量争议性题目集
 * 
 * 特点：
 * 1. 每道题目都包含复杂的情境描述
 * 2. 涉及价值观念冲突和道德困境
 * 3. 选项之间具有明显的质的差异
 * 4. 没有标准答案，只有不同立场
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

// ==================== 经济维度题目 ====================
export const highControversyEconomicQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'eco-adv-1',
    '某跨国公司在一个发展中国家开设工厂，为当地创造了5000个就业岗位，但工作环境恶劣、工资极低。该公司辩称这是当地标准，且比失业好。作为政府监管者，你会如何处理？',
    'economic',
    0.8,
    0.9,
    1.2,
    [
      { id: '1', text: '完全放任，市场会自我调节，就业比失业好', value: 95, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '制定基本标准，但不过度干预', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '要求改善条件，否则罚款', value: 50, pole: 'mixed-economy', subType: 'undefined' },
      { id: '4', text: '强制执行高标准，即使公司可能撤离', value: 30, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '国有化该工厂，由国家运营', value: 10, pole: 'planned-economy', subType: 'command-economy' }
    ]
  ),
  createWeightedQuestion(
    'eco-adv-2',
    '某科技公司通过创新获得垄断地位，但其产品确实优于竞争对手。该公司利用垄断地位抬高价格，但同时也投入大量资金进行研发。作为反垄断机构，你会如何决策？',
    'economic',
    0.75,
    0.85,
    1.1,
    [
      { id: '1', text: '不干预，垄断是创新的合理回报', value: 90, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '要求降低价格，但不拆分公司', value: 65, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '强制开放技术标准，促进竞争', value: 45, pole: 'mixed-economy', subType: 'undefined' },
      { id: '4', text: '拆分公司，恢复市场竞争', value: 25, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '将关键技术国有化，全民共享', value: 10, pole: 'planned-economy', subType: 'command-economy' }
    ]
  ),
  createWeightedQuestion(
    'eco-adv-3',
    '某国发现大规模稀土矿藏，开采将带来巨大经济利益，但会严重破坏当地生态环境，影响10万居民的生活。当地居民多数贫困，希望获得就业机会。作为决策者，你会如何选择？',
    'economic',
    0.85,
    0.9,
    1.3,
    [
      { id: '1', text: '全力开采，经济发展优先，环境问题可以后续治理', value: 90, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '允许开采，但要求严格环保措施和居民补偿', value: 65, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '限制开采规模，平衡经济与环境', value: 45, pole: 'mixed-economy', subType: 'undefined' },
      { id: '4', text: '仅允许小规模开采，重点保护环境', value: 25, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '禁止开采，保护生态环境优先', value: 10, pole: 'planned-economy', subType: 'market-socialism' }
    ]
  ),
  createWeightedQuestion(
    'eco-adv-4',
    '某富豪通过合法手段积累了相当于全国GDP 5%的财富。他声称这是他创新和努力的回报，但批评者认为如此财富集中危害社会公平。作为政策制定者，你会如何处理？',
    'economic',
    0.8,
    0.88,
    1.2,
    [
      { id: '1', text: '不干预，财富是他的合法财产', value: 95, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '征收适度的财富税，但保护其基本财产权', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '征收高额财富税，用于社会福利', value: 45, pole: 'mixed-economy', subType: 'undefined' },
      { id: '4', text: '征收大部分财富，重新分配给社会', value: 25, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '没收其财富，归国家所有', value: 10, pole: 'planned-economy', subType: 'command-economy' }
    ]
  ),
  createWeightedQuestion(
    'eco-adv-5',
    '某国面临严重的经济危机，失业率达到25%。有两种方案：方案A是大规模减税和放松监管，刺激企业投资；方案B是政府大规模支出，创造就业岗位。两种方案都有成功和失败的案例。作为经济顾问，你会推荐哪个方案？',
    'economic',
    0.7,
    0.85,
    1.1,
    [
      { id: '1', text: '强烈推荐方案A，市场机制最有效', value: 90, pole: 'free-market', subType: 'laissez-faire' },
      { id: '2', text: '倾向方案A，但保留部分政府干预', value: 70, pole: 'free-market', subType: 'social-market' },
      { id: '3', text: '结合两者，平衡市场与政府作用', value: 50, pole: 'mixed-economy', subType: 'undefined' },
      { id: '4', text: '倾向方案B，政府应该积极干预', value: 30, pole: 'mixed-economy', subType: 'state-capitalism' },
      { id: '5', text: '强烈推荐方案B，市场已经失灵', value: 15, pole: 'planned-economy', subType: 'command-economy' }
    ]
  )
]

// ==================== 政治维度题目 ====================
export const highControversyPoliticalQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'pol-adv-1',
    '某国发生恐怖袭击，造成重大伤亡。政府提出加强监控措施，包括监控所有公民的通信记录、安装更多摄像头、限制部分言论自由。这些措施可能有效预防未来袭击，但也严重侵犯隐私。作为公民代表，你会如何投票？',
    'political',
    0.85,
    0.9,
    1.3,
    [
      { id: '1', text: '强烈反对，自由比安全更重要', value: 95, pole: 'libertarian', subType: 'anarchism' },
      { id: '2', text: '反对，但可以接受有限度的措施', value: 70, pole: 'libertarian', subType: 'minarchism' },
      { id: '3', text: '中立，需要平衡安全与自由', value: 50, pole: 'democratic', subType: 'undefined' },
      { id: '4', text: '支持，安全是首要考虑', value: 30, pole: 'authoritarian', subType: 'undefined' },
      { id: '5', text: '强烈支持，国家安全高于一切', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-adv-2',
    '某国选举中，一位民粹主义候选人获得多数选票。他承诺解决社会问题，但也表现出威权主义倾向，威胁要限制媒体自由和司法独立。作为宪法法院法官，你会如何裁决其当选的合法性？',
    'political',
    0.9,
    0.92,
    1.4,
    [
      { id: '1', text: '完全尊重选举结果，民主就是多数决定', value: 75, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '2', text: '承认当选，但设置明确的权力限制', value: 60, pole: 'democratic', subType: 'social-democracy' },
      { id: '3', text: '要求候选人公开承诺维护民主制度', value: 45, pole: 'democratic', subType: 'undefined' },
      { id: '4', text: '宣布选举无效，防止民主倒退', value: 25, pole: 'authoritarian', subType: 'undefined' },
      { id: '5', text: '支持当选，强人政治能解决社会问题', value: 15, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-adv-3',
    '某国面临严重的分裂主义运动，一个地区要求独立公投。该地区有独特的历史文化，但独立可能导致国家分裂和地区冲突。作为中央政府，你会如何应对？',
    'political',
    0.8,
    0.88,
    1.2,
    [
      { id: '1', text: '允许公投，尊重人民自决权', value: 85, pole: 'libertarian', subType: 'anarchism' },
      { id: '2', text: '允许公投，但需要全国同意', value: 65, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '3', text: '提供更多自治权，但禁止独立', value: 45, pole: 'democratic', subType: 'social-democracy' },
      { id: '4', text: '坚决反对，维护国家统一', value: 25, pole: 'authoritarian', subType: 'undefined' },
      { id: '5', text: '武力镇压，消灭分裂主义', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-adv-4',
    '某国媒体揭露了政府的腐败丑闻，但政府以"国家安全"为由要求媒体撤回报道并惩罚记者。作为司法部长，你会如何处理？',
    'political',
    0.85,
    0.9,
    1.3,
    [
      { id: '1', text: '坚决保护媒体，言论自由不可侵犯', value: 90, pole: 'libertarian', subType: 'anarchism' },
      { id: '2', text: '保护媒体，但要求其核实信息', value: 70, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '3', text: '调查报道真实性，依法处理', value: 50, pole: 'democratic', subType: 'social-democracy' },
      { id: '4', text: '支持政府，国家安全优先', value: 30, pole: 'authoritarian', subType: 'undefined' },
      { id: '5', text: '惩罚媒体，维护政府权威', value: 15, pole: 'totalitarian', subType: 'fascism' }
    ]
  ),
  createWeightedQuestion(
    'pol-adv-5',
    '某国发生大规模抗议活动，要求政府下台。抗议者声称政府腐败且不民主，但政府声称这是合法选举产生的，且抗议者中有暴力分子。作为国际观察员，你会如何评估？',
    'political',
    0.75,
    0.85,
    1.1,
    [
      { id: '1', text: '支持抗议者，人民有权推翻不合法政府', value: 85, pole: 'libertarian', subType: 'anarchism' },
      { id: '2', text: '支持和平抗议，要求政府改革', value: 65, pole: 'democratic', subType: 'liberal-democracy' },
      { id: '3', text: '呼吁对话，通过协商解决', value: 45, pole: 'democratic', subType: 'social-democracy' },
      { id: '4', text: '支持政府，维护法律和秩序', value: 25, pole: 'authoritarian', subType: 'undefined' },
      { id: '5', text: '谴责抗议，支持政府镇压', value: 10, pole: 'totalitarian', subType: 'fascism' }
    ]
  )
]

// ==================== 社会维度题目 ====================
export const highControversySocialQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'soc-adv-1',
    '某社区计划建设一个流浪者收容所，但周边居民强烈反对，担心影响房价和安全。流浪者无处可去，冬天即将来临。作为社区委员会主席，你会如何决策？',
    'social',
    0.8,
    0.88,
    1.2,
    [
      { id: '1', text: '取消计划，居民利益优先', value: 85, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '建设，但选择影响最小的地点', value: 65, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '建设，同时加强管理和安全保障', value: 45, pole: 'communitarian', subType: 'undefined' },
      { id: '4', text: '建设，并提供就业培训等支持', value: 25, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '建设多个收容所，这是社会责任', value: 10, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  ),
  createWeightedQuestion(
    'soc-adv-2',
    '某公司要求员工签署"不婚不育承诺书"，声称这样可以提高工作效率。部分员工为了保住工作而签署，但感到被侵犯权利。作为劳动监察部门，你会如何处理？',
    'social',
    0.85,
    0.9,
    1.3,
    [
      { id: '1', text: '不干预，这是公司的自主权', value: 90, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '允许签署，但必须是自愿的', value: 70, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '禁止强制签署，保护员工选择权', value: 45, pole: 'communitarian', subType: 'undefined' },
      { id: '4', text: '完全禁止此类条款，侵犯基本权利', value: 25, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '惩罚公司，并要求赔偿员工', value: 10, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  ),
  createWeightedQuestion(
    'soc-adv-3',
    '某家庭的孩子成绩优异，但父母要求他放弃艺术梦想，学习金融以便将来赚大钱。孩子非常痛苦，但父母声称这是为他好。作为家庭咨询师，你会如何建议？',
    'social',
    0.75,
    0.82,
    1,
    [
      { id: '1', text: '支持父母，他们更有经验', value: 80, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '2', text: '建议折中，艺术可以作为爱好', value: 60, pole: 'communitarian', subType: 'undefined' },
      { id: '3', text: '建议家庭协商，尊重孩子的选择', value: 45, pole: 'communitarian', subType: 'undefined' },
      { id: '4', text: '支持孩子，个人梦想更重要', value: 25, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '5', text: '强烈支持孩子，父母不应控制孩子的人生', value: 10, pole: 'individualism', subType: 'egoism' }
    ]
  ),
  createWeightedQuestion(
    'soc-adv-4',
    '某小区业主委员会决定禁止出租房屋给外来务工人员，声称这会影响小区环境和安全。部分业主反对这一歧视性规定，但多数业主支持。作为政府监管部门，你会如何处理？',
    'social',
    0.8,
    0.88,
    1.2,
    [
      { id: '1', text: '不干预，业主有权决定', value: 85, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '允许限制，但需要合理理由', value: 65, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '禁止歧视性规定，但允许合理管理', value: 45, pole: 'communitarian', subType: 'undefined' },
      { id: '4', text: '完全禁止此类规定，保护平等权利', value: 25, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '惩罚业主委员会，并要求公开道歉', value: 10, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  ),
  createWeightedQuestion(
    'soc-adv-5',
    '某公司实施"末位淘汰制"，每年解雇绩效最差的10%员工。这提高了公司效率，但也导致员工压力巨大、互相竞争。作为劳动权益倡导者，你会如何评价？',
    'social',
    0.7,
    0.8,
    1,
    [
      { id: '1', text: '支持，竞争促进进步', value: 85, pole: 'individualism', subType: 'egoism' },
      { id: '2', text: '支持，但需要完善补偿机制', value: 65, pole: 'individualism', subType: 'liberal-individualism' },
      { id: '3', text: '中立，有利有弊', value: 50, pole: 'communitarian', subType: 'undefined' },
      { id: '4', text: '反对，应该强调团队合作', value: 30, pole: 'collectivism', subType: 'organic-collectivism' },
      { id: '5', text: '强烈反对，应该禁止这种制度', value: 15, pole: 'collectivism', subType: 'radical-collectivism' }
    ]
  )
]

// ==================== 文化维度题目 ====================
export const highControversyCulturalQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'cul-adv-1',
    '某大学决定取消传统文学课程，增加编程和数据分析课程，声称这更符合就业市场需求。人文教授抗议这是文化自杀，但校方坚持改革。作为教育部长，你会如何决策？',
    'cultural',
    0.8,
    0.85,
    1.1,
    [
      { id: '1', text: '支持改革，就业是首要考虑', value: 85, pole: 'progressivism', subType: 'radical-progressivism' },
      { id: '2', text: '支持改革，但保留部分人文课程', value: 65, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '3', text: '平衡两者，传统与现代并重', value: 45, pole: 'modernism', subType: 'undefined' },
      { id: '4', text: '保留传统课程，文化传承重要', value: 25, pole: 'traditionalism', subType: 'conservatism' },
      { id: '5', text: '恢复传统课程，抵制功利主义教育', value: 10, pole: 'traditionalism', subType: 'reactionism' }
    ]
  ),
  createWeightedQuestion(
    'cul-adv-2',
    '某博物馆计划展出具有争议性的艺术作品，部分作品涉及宗教敏感话题和性暗示。宗教团体要求禁止展出，艺术家声称这是言论自由。作为文化局长，你会如何决定？',
    'cultural',
    0.85,
    0.9,
    1.2,
    [
      { id: '1', text: '完全支持展出，艺术自由至上', value: 90, pole: 'progressivism', subType: 'radical-progressivism' },
      { id: '2', text: '支持展出，但设置年龄限制', value: 70, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '3', text: '部分展出，移除最敏感作品', value: 45, pole: 'modernism', subType: 'undefined' },
      { id: '4', text: '取消展出，尊重宗教感情', value: 25, pole: 'traditionalism', subType: 'conservatism' },
      { id: '5', text: '禁止展出，保护社会道德', value: 10, pole: 'traditionalism', subType: 'reactionism' }
    ]
  ),
  createWeightedQuestion(
    'cul-adv-3',
    '某国考虑立法禁止女性在公共场所佩戴面纱，声称这是性别平等的体现。但穆斯林女性表示这是她们的宗教自由和身份认同。作为立法者，你会如何投票？',
    'cultural',
    0.9,
    0.92,
    1.3,
    [
      { id: '1', text: '支持禁令，解放女性', value: 85, pole: 'progressivism', subType: 'radical-progressivism' },
      { id: '2', text: '支持禁令，但仅限公共场所', value: 65, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '3', text: '反对禁令，尊重个人选择', value: 45, pole: 'modernism', subType: 'undefined' },
      { id: '4', text: '反对禁令，保护宗教自由', value: 25, pole: 'traditionalism', subType: 'conservatism' },
      { id: '5', text: '强烈反对，这是对穆斯林的歧视', value: 10, pole: 'traditionalism', subType: 'reactionism' }
    ]
  ),
  createWeightedQuestion(
    'cul-adv-4',
    '某学校决定取消男女分校，实行男女同校。传统派认为这会破坏教育传统，进步派认为这能促进性别平等。作为教育局长，你会如何决定？',
    'cultural',
    0.7,
    0.8,
    1,
    [
      { id: '1', text: '支持男女同校，促进性别平等', value: 85, pole: 'progressivism', subType: 'radical-progressivism' },
      { id: '2', text: '支持男女同校，但允许部分学校保留传统', value: 65, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '3', text: '允许学校自主选择', value: 45, pole: 'modernism', subType: 'undefined' },
      { id: '4', text: '保留男女分校，各有优势', value: 25, pole: 'traditionalism', subType: 'conservatism' },
      { id: '5', text: '坚持男女分校，保护教育传统', value: 10, pole: 'traditionalism', subType: 'reactionism' }
    ]
  ),
  createWeightedQuestion(
    'cul-adv-5',
    '某公司要求员工使用性别中立语言（如用"他们"代替"他/她"），声称这能促进包容性。部分员工认为这是政治正确过度，侵犯了语言习惯。作为人力资源总监，你会如何执行？',
    'cultural',
    0.75,
    0.82,
    1,
    [
      { id: '1', text: '强制执行，这是进步的体现', value: 85, pole: 'progressivism', subType: 'radical-progressivism' },
      { id: '2', text: '鼓励使用，但不强制', value: 65, pole: 'progressivism', subType: 'social-progressivism' },
      { id: '3', text: '提供培训，让员工自主选择', value: 45, pole: 'modernism', subType: 'undefined' },
      { id: '4', text: '不强制，尊重传统语言习惯', value: 25, pole: 'traditionalism', subType: 'conservatism' },
      { id: '5', text: '反对这种做法，这是语言污染', value: 10, pole: 'traditionalism', subType: 'reactionism' }
    ]
  )
]

// ==================== 国际维度题目 ====================
export const highControversyInternationalQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'int-adv-1',
    '某国发生严重的人道主义危机，政府屠杀本国平民。联合国考虑军事干预，但该国声称这是内政，外国无权干涉。作为安理会成员国代表，你会如何投票？',
    'international',
    0.9,
    0.92,
    1.4,
    [
      { id: '1', text: '支持干预，人权高于主权', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '支持有限干预，保护平民', value: 70, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '支持外交解决，避免军事行动', value: 45, pole: 'internationalism', subType: 'undefined' },
      { id: '4', text: '反对干预，尊重国家主权', value: 25, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '强烈反对，这是帝国主义借口', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-adv-2',
    '某跨国公司在一个发展中国家造成严重环境污染后撤离，留下有毒废料和健康问题。该国要求母国公司赔偿，但公司声称已遵守当地法律。作为国际仲裁员，你会如何裁决？',
    'international',
    0.85,
    0.88,
    1.2,
    [
      { id: '1', text: '要求公司全额赔偿，跨国公司应承担全球责任', value: 85, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '要求公司部分赔偿，建立国际标准', value: 65, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '调解双方，寻求妥协方案', value: 45, pole: 'internationalism', subType: 'undefined' },
      { id: '4', text: '支持公司，遵守当地法律即可', value: 25, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '驳回诉求，保护本国企业利益', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-adv-3',
    '某国面临大规模难民涌入，但本国经济困难、社会矛盾加剧。接纳难民符合人道主义，但可能加剧国内问题。作为政府首脑，你会如何决策？',
    'international',
    0.85,
    0.9,
    1.3,
    [
      { id: '1', text: '全面接纳，人道主义优先', value: 90, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '有条件接纳，设置配额', value: 65, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '有限接纳，优先本国利益', value: 45, pole: 'internationalism', subType: 'undefined' },
      { id: '4', text: '严格限制，保护本国公民', value: 25, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '拒绝接纳，本国优先', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-adv-4',
    '某国考虑退出重要的国际气候协议，声称这损害本国经济利益。但科学家警告这将加速全球气候危机。作为外交部长，你会如何建议？',
    'international',
    0.8,
    0.85,
    1.1,
    [
      { id: '1', text: '坚持留在协议，全球责任优先', value: 85, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '留在协议，但争取更有利条款', value: 65, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '重新谈判，平衡国际责任与国内利益', value: 45, pole: 'internationalism', subType: 'undefined' },
      { id: '4', text: '退出协议，保护本国经济', value: 25, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '立即退出，拒绝国际束缚', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  ),
  createWeightedQuestion(
    'int-adv-5',
    '某国计划向另一个国家出售先进武器，声称这是合法贸易。但购买国人权记录恶劣，可能用这些武器镇压平民。作为出口管制部门负责人，你会如何决定？',
    'international',
    0.8,
    0.88,
    1.2,
    [
      { id: '1', text: '禁止出售，人权优先于贸易', value: 85, pole: 'globalism', subType: 'cosmopolitanism' },
      { id: '2', text: '限制出售，附加人权条件', value: 65, pole: 'globalism', subType: 'liberal-globalism' },
      { id: '3', text: '允许出售，但加强监督', value: 45, pole: 'internationalism', subType: 'undefined' },
      { id: '4', text: '允许出售，这是合法贸易', value: 25, pole: 'nationalism', subType: 'civic-nationalism' },
      { id: '5', text: '积极推动，促进本国军工产业', value: 10, pole: 'nationalism', subType: 'ethnic-nationalism' }
    ]
  )
]

// ==================== 技术维度题目 ====================
export const highControversyTechnologyQuestions: WeightedQuestion[] = [
  createWeightedQuestion(
    'tech-adv-1',
    '某公司开发出可以完美预测犯罪行为的AI系统，准确率达95%。但使用该系统需要大规模监控公民行为。作为立法者，你会如何规范这项技术？',
    'technology',
    0.9,
    0.92,
    1.4,
    [
      { id: '1', text: '全面推广，预防犯罪最重要', value: 90, pole: 'tech-optimism', subType: 'transhumanism' },
      { id: '2', text: '有限使用，仅用于严重犯罪', value: 65, pole: 'tech-optimism', subType: 'tech-liberalism' },
      { id: '3', text: '严格限制，需要司法授权', value: 45, pole: 'tech-pragmatism', subType: 'undefined' },
      { id: '4', text: '谨慎使用，保护隐私优先', value: 25, pole: 'tech-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '禁止使用，这是监控社会', value: 10, pole: 'tech-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-adv-2',
    '科学家开发出可以编辑人类胚胎基因的技术，可以消除遗传疾病，但也可能被用于"设计婴儿"。作为生物伦理委员会主席，你会如何建议？',
    'technology',
    0.85,
    0.9,
    1.3,
    [
      { id: '1', text: '全面开放，技术进步不可阻挡', value: 90, pole: 'tech-optimism', subType: 'transhumanism' },
      { id: '2', text: '允许治疗用途，禁止增强用途', value: 65, pole: 'tech-optimism', subType: 'tech-liberalism' },
      { id: '3', text: '严格监管，仅限严重疾病', value: 45, pole: 'tech-pragmatism', subType: 'undefined' },
      { id: '4', text: '暂停研究，先解决伦理问题', value: 25, pole: 'tech-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '禁止所有基因编辑，保护人类自然性', value: 10, pole: 'tech-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-adv-3',
    'AI系统已经能够创作出与人类艺术家无法区分的音乐、绘画和文学作品。是否应该给予AI作品版权保护？作为知识产权局长，你会如何决定？',
    'technology',
    0.8,
    0.85,
    1.1,
    [
      { id: '1', text: '给予完整版权保护，AI也是创作者', value: 85, pole: 'tech-optimism', subType: 'transhumanism' },
      { id: '2', text: '给予有限保护，保护投资者利益', value: 65, pole: 'tech-optimism', subType: 'tech-liberalism' },
      { id: '3', text: '不给予版权，但保护AI开发者', value: 45, pole: 'tech-pragmatism', subType: 'undefined' },
      { id: '4', text: '不给予版权，保护人类创作者', value: 25, pole: 'tech-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '禁止AI创作，保护人类文化', value: 10, pole: 'tech-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-adv-4',
    '某公司开发出可以完全替代人类工人的机器人，成本仅为人工的1/10。这将导致大规模失业，但也会大幅降低产品成本。作为政府顾问，你会如何建议？',
    'technology',
    0.85,
    0.88,
    1.2,
    [
      { id: '1', text: '鼓励推广，技术进步不可避免', value: 85, pole: 'tech-optimism', subType: 'transhumanism' },
      { id: '2', text: '允许推广，但征收机器人税', value: 65, pole: 'tech-optimism', subType: 'tech-liberalism' },
      { id: '3', text: '逐步推广，同时培训工人', value: 45, pole: 'tech-pragmatism', subType: 'undefined' },
      { id: '4', text: '限制推广，保护就业', value: 25, pole: 'tech-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '禁止推广，保护人类工作权', value: 10, pole: 'tech-skepticism', subType: 'luddism' }
    ]
  ),
  createWeightedQuestion(
    'tech-adv-5',
    '社交媒体算法被发现会推送极端内容以增加用户停留时间，导致社会极化和青少年心理健康问题。但限制算法可能损害平台商业模式。作为监管者，你会如何处理？',
    'technology',
    0.8,
    0.85,
    1.1,
    [
      { id: '1', text: '不干预，平台有运营自由', value: 85, pole: 'tech-optimism', subType: 'tech-liberalism' },
      { id: '2', text: '要求透明化，让用户了解算法', value: 65, pole: 'tech-optimism', subType: 'tech-liberalism' },
      { id: '3', text: '制定内容标准，要求平台自律', value: 45, pole: 'tech-pragmatism', subType: 'undefined' },
      { id: '4', text: '严格监管，限制算法使用', value: 25, pole: 'tech-skepticism', subType: 'eco-criticism' },
      { id: '5', text: '拆分平台，防止信息垄断', value: 10, pole: 'tech-skepticism', subType: 'luddism' }
    ]
  )
]

// ==================== 导出所有题目 ====================
export const allHighControversyQuestions: WeightedQuestion[] = [
  ...highControversyEconomicQuestions,
  ...highControversyPoliticalQuestions,
  ...highControversySocialQuestions,
  ...highControversyCulturalQuestions,
  ...highControversyInternationalQuestions,
  ...highControversyTechnologyQuestions
]

export const highControversyQuestionsByDimension = {
  economic: highControversyEconomicQuestions,
  political: highControversyPoliticalQuestions,
  social: highControversySocialQuestions,
  cultural: highControversyCulturalQuestions,
  international: highControversyInternationalQuestions,
  technology: highControversyTechnologyQuestions
}
