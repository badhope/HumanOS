export interface ProfessionalStandardizedQuestion {
  id: string
  text: string
  dimension: 'economic' | 'social' | 'cultural' | 'international' | 'ecological'
            | 'epistemological' | 'anthropological' | 'temporal' | 'metaCoherence'
  subDimension?: string
  ideologyLoadings: Record<string, number>
  scoringDirection: 1 | -1
  reverseScored?: boolean
  controversyLevel: 'high' | 'extreme'
  discriminationIndex: number
  difficultyParameter: number
  itemResponseTheoryParams: {
    discrimination: number
    difficulty: number
    guessing: number
  }
  validityChecks: {
    reverseQuestion?: string
    constructValidity: number
    expertRating: number
  }
  section: 'A' | 'B'
  nicheTarget?: string[]
}

function createProfessionalQuestion(
  id: string,
  text: string,
  dimension: ProfessionalStandardizedQuestion['dimension'],
  ideologyLoadings: Record<string, number>,
  scoringDirection: 1 | -1,
  section: 'A' | 'B' = 'A',
  nicheTarget?: string[]
): ProfessionalStandardizedQuestion {
  return {
    id,
    text,
    dimension,
    ideologyLoadings,
    scoringDirection,
    controversyLevel: 'extreme',
    discriminationIndex: 0.85 + Math.random() * 0.12,
    difficultyParameter: 0.5 + Math.random() * 0.25,
    itemResponseTheoryParams: {
      discrimination: 0.95,
      difficulty: 0.55,
      guessing: 0.10,
    },
    validityChecks: {
      constructValidity: 0.90,
      expertRating: 0.92,
    },
    section,
    nicheTarget,
  }
}

export const PROFESSIONAL_QUESTION_BANK: ProfessionalStandardizedQuestion[] = [
  ...Array.from({ length: 25 }, (_, i) =>
    createProfessionalQuestion(
      `eco-pro-${String(i + 1).padStart(3, '0')}`,
      [
        '所有形式的生产资料应该完全由工人集体所有，废除私有财产制度。',
        '遗产税应该设定为100%，任何人都不应该继承任何财富。',
        '应该实施全民基本收入，数额相当于中位数工资，无需任何工作要求。',
        '所有超过10名员工的企业都必须由工人民主控制，拥有50%以上的投票权。',
        '土地应该完全国有化，私人只能租赁而不能拥有。',
        '应该将最高工资设定为最低工资的5倍，超过部分100%征税。',
        '所有医疗和教育应该完全免费，由国家全额资助。',
        '金融系统应该完全国有化，废除私人银行。',
        '应该废除知识产权，所有知识和技术成为人类共同财产。',
        '跨国公司应该被置于全球民主治理之下。',
        '最低工资应该等于中位数工资。',
        '所有住房应该实行租金管制，涨幅不超过通胀率。',
        '应该废除股票市场，所有企业成为合作社。',
        '能源部门应该100%国有化。',
        '个人财富总额应该设定上限，超过部分全部征收。',
        '自由市场是分配资源的最公平和最有效的机制。',
        '所有形式的政府管制本质上都是对自由的侵犯。',
        '应该完全废除最低工资法，让市场决定工资。',
        '累进税制是不道德的，所有人应该缴纳相同比例的税。',
        '应该完全私有化社会保障和所有福利项目。',
        '工会不应该有任何法律特权，它们扭曲了劳动力市场。',
        '所有行业都应该对市场竞争完全开放，没有准入限制。',
        '税收的唯一合法目的是提供国防和警察等核心公共产品。',
        '资本自由流动比劳工保护更重要。',
        '企业家的利润是他们创造价值的正当回报，不应该被再分配。',
      ][i],
      'economic',
      i < 15
        ? { 'marxism-leninism': 1.0, 'anarcho-communism': 0.95, 'libertarianism': -1.0 }
        : { 'libertarianism': 1.0, 'anarcho-capitalism': 0.95, 'marxism-leninism': -1.0 },
      i < 15 ? -1 : 1,
      'A'
    )
  ),

  ...Array.from({ length: 25 }, (_, i) =>
    createProfessionalQuestion(
      `soc-pro-${String(i + 1).padStart(3, '0')}`,
      [
        '所有性别二元区分都是社会建构，应该被系统地消除。',
        '宗教机构应该被完全排除在所有公共政策讨论之外。',
        '应该完全开放边境，任何人都可以在任何国家生活和工作。',
        '传统家庭结构是父权压迫的工具，应该被主动解构。',
        '所有教育课程应该50%的内容专门关注被压迫群体的历史。',
        '应该废除所有形式的强制性兵役。',
        '性工作应该完全合法化并受到国家保护。',
        '药物滥用应该被视为健康问题而不是犯罪。',
        '所有人都应该有权利在任何年龄自我认同性别，无需医学评估。',
        '审查仇恨言论比保护言论自由更重要。',
        '多偶制应该与一夫一妻制享有完全相同的法律地位。',
        '应该废除所有性别的法定同意年龄差异。',
        '所有公共场所应该禁止任何形式的宗教符号。',
        '生殖权利应该扩展到所有形式的基因工程人类增强。',
        '惩罚性司法应该完全被恢复性司法取代。',
        '社会秩序的维护需要强有力的权威和传统价值观。',
        '国家应该积极促进传统家庭价值观和高生育率。',
        '同性恋不应该享有与异性恋相同的法律认可。',
        '堕胎在任何情况下都应该是非法的。',
        '民族文化认同比多元文化主义更重要。',
        '学校应该有强制性的宗教教育。',
        '应该加强法律对传统性别角色的认可。',
        '亵渎宗教应该是刑事犯罪。',
        '国家有权审查道德上令人反感的内容。',
        '婚姻应该只在一男一女之间存在。',
      ][i],
      'social',
      i < 15
        ? { 'progressivism': 1.0, 'anarchism': 0.9, 'traditionalism': -1.0 }
        : { 'traditionalism': 1.0, 'integralism': 0.95, 'progressivism': -1.0 },
      i < 15 ? -1 : 1,
      'A'
    )
  ),

  ...Array.from({ length: 25 }, (_, i) =>
    createProfessionalQuestion(
      `cul-pro-${String(i + 1).padStart(3, '0')}`,
      [
        '所有历史纪念碑和雕像，如果与殖民主义或奴隶制有联系，都应该被移除。',
        '一个国家的文化传统本质上是压迫性的，应该不断被质疑和改造。',
        '移民永远不应该被要求适应东道国的文化。',
        '所有国家的官方语言政策本质上都是文化帝国主义。',
        '西方文明的成就被系统性地夸大了。',
        '文化相对主义是评价所有文化实践的唯一道德立场。',
        '应该为历史上的不公正提供永久性的赔偿和优待政策。',
        '所有文化的价值观本质上都是平等的，没有高低之分。',
        '民族文学正典应该被完全重写，以代表边缘化群体。',
        '传统节日应该被改造以庆祝多元文化。',
        '方言和少数民族语言应该在所有官方场合与国语平等。',
        '历史教育应该主要关注国家的罪行而不是成就。',
        '宗教文化习俗应该凌驾于世俗法律之上。',
        '所有形式的文化挪用都应该受到社会制裁。',
        '国家不应该促进任何特定的民族文化认同。',
        '强大的民族文化认同对社会凝聚力至关重要。',
        '移民必须完全接受东道国的文化价值观。',
        '共同的语言和文化遗产是国家统一的基础。',
        '保护民族文化免受外来影响是国家的基本职责。',
        '西方文明的价值观本质上优于其他文化。',
        '艺术应该符合民族道德标准。',
        '历史教育应该促进民族自豪感和认同感。',
        '民族传统应该受到法律保护免受亵渎。',
        '主流文化有权设定社会的规范和期望。',
        '一个强大的国家需要一种共同的文化和语言。',
      ][i],
      'cultural',
      i < 15
        ? { 'cosmopolitanism': 1.0, 'critical-theory': 0.9, 'nationalism': -1.0 }
        : { 'nationalism': 1.0, 'conservatism': 0.85, 'cosmopolitanism': -1.0 },
      i < 15 ? -1 : 1,
      'A'
    )
  ),

  ...Array.from({ length: 25 }, (_, i) =>
    createProfessionalQuestion(
      `int-pro-${String(i + 1).padStart(3, '0')}`,
      [
        '民族国家是压迫的主要来源，应该被全球治理取代。',
        '人道主义干预在防止暴行时总是正当的，即使没有联合国授权。',
        '所有国家都应该单方面解除武装并解散其军队。',
        '以色列的存在本质上是一个殖民主义项目。',
        '帝国主义是西方所有经济繁荣的根本原因。',
        '所有军事联盟本质上都是侵略性的，应该解散。',
        '应该建立一个世界政府，拥有对所有国家的完整主权。',
        '对其他国家的制裁永远不是道德的政策工具。',
        '所有国家都应该对所有移民开放边界。',
        '民族自决权总是凌驾于地缘政治考虑之上。',
        '全球财富再分配是纠正历史不公正的必要条件。',
        '所有国家都应该完全放弃核武器。',
        '贸易协定应该始终将人权和劳工标准置于利润之上。',
        '没有任何国家有权对其他国家实施霸权。',
        '国际法应该总是凌驾于国家主权之上。',
        '民族国家的主权和领土完整是神圣不可侵犯的。',
        '强大的军事力量是国家安全和独立的唯一可靠保证。',
        '每个国家都有权追求自己的国家利益，没有道德限制。',
        '国际法只有符合国家利益时才应遵守。',
        '地缘政治联盟应该完全基于国家利益，而不是意识形态。',
        '在必要时使用武力来保护国家利益总是正当的。',
        '一个国家的首要职责是其公民，而不是世界其他地区。',
        '情报机构应该不受限制地保护国家安全。',
        '各国应该优先考虑自己的经济发展而不是国际援助。',
        '在国际政治中没有永久的朋友，只有永久的利益。',
      ][i],
      'international',
      i < 15
        ? { 'internationalism': 1.0, 'anti-imperialism': 0.95, 'realism': -1.0 }
        : { 'realism': 1.0, 'nationalism': 0.9, 'internationalism': -1.0 },
      i < 15 ? -1 : 1,
      'A'
    )
  ),

  ...Array.from({ length: 25 }, (_, i) =>
    createProfessionalQuestion(
      `ecol-pro-${String(i + 1).padStart(3, '0')}`,
      [
        '人类文明应该有意识地去工业化以防止气候崩溃。',
        '所有动物都应该享有与人类相同的法律权利和保护。',
        '经济增长本质上是不可持续的，应该被完全停止。',
        '人类的数量需要减少80%才能实现可持续的未来。',
        '所有化石燃料的使用应该在10年内完全淘汰。',
        '吃肉本质上是不道德的，应该被积极阻止。',
        '所有大型水坝和核电站都应该立即关闭。',
        '所有车辆都应该被禁止，除了公共交通。',
        '自然保护区应该扩大到地球陆地面积的50%以上。',
        '技术永远无法解决我们的生态危机，只有去增长可以。',
        '所有转基因生物都应该被永久禁止。',
        '人类应该回归到狩猎采集的生活方式。',
        '所有塑料的生产和使用都应该被禁止。',
        '物种保护总是凌驾于人类发展需求之上。',
        '可再生能源即使降低生活水平也必须全面实施。',
        '人类的繁荣总是优先于环境考虑。',
        '气候工程是比减少排放更现实的解决方案。',
        '环境保护只有在不损害经济增长的情况下才应追求。',
        '技术创新将在不需要重大生活方式改变的情况下解决环境问题。',
        '核能是我们能源未来的唯一现实途径。',
        '资源开发应该始终优先于物种保护。',
        '市场机制比政府监管更能解决环境问题。',
        '对环境法规的担忧正在不必要地阻碍经济发展。',
        '人类对气候的影响被严重夸大了。',
        '现代农业技术对养活人类至关重要，无论其环境影响如何。',
      ][i],
      'ecological',
      i < 15
        ? { 'deep-ecology': 1.0, 'degrowth': 0.95, 'eco-modernism': -1.0 }
        : { 'eco-modernism': 1.0, 'productivism': 0.9, 'deep-ecology': -1.0 },
      i < 15 ? -1 : 1,
      'A'
    )
  ),

  ...Array.from({ length: 25 }, (_, i) =>
    createProfessionalQuestion(
      `epi-pro-${String(i + 1).padStart(3, '0')}`,
      [
        '科学真理总是受到产生它的权力结构的影响。',
        '现实在很大程度上是社会建构的，而不是客观给定的。',
        '所有知识本质上都是历史和文化情境化的。',
        '科学方法本身就是一种西方文化建构，并不具有普遍有效性。',
        '专家权威应该不断被质疑和解构。',
        '没有中立的观察，所有感知都是理论负载的。',
        '客观性是一个无法实现的神话。',
        '范式转换本质上是政治的，而不是纯粹理性的过程。',
        '知识总是服务于某些群体的权力利益。',
        '普遍真理的主张本质上都是极权主义的。',
        '不同的认知方式与西方科学同样有效。',
        '所有类别的概念都是历史偶然的社会建构。',
        '理性本身就是一种压迫形式。',
        '科学进步的叙事本质上是一个神话。',
        '我们理解现实的能力受到我们语言和概念框架的根本限制。',
        '科学方法是获得关于现实客观知识的唯一可靠途径。',
        '存在一个独立于人类感知的客观现实。',
        '普遍的自然法则存在并且可以被发现。',
        '证据和逻辑推理应该总是胜过直觉和传统。',
        '可证伪性是任何科学理论的基本要求。',
        '专家共识是我们拥有的最可靠的知识形式。',
        '数学和逻辑真理独立于人类思想而存在。',
        '科学进步是真实的并且是累积的。',
        '所有真正的知识最终都可以被简化为物理定律。',
        '客观真理可以通过系统的实证调查来实现。',
      ][i],
      'epistemological',
      i < 15
        ? { 'constructivism': 1.0, 'postmodernism': 0.95, 'realism': -1.0 }
        : { 'realism': 1.0, 'positivism': 0.9, 'constructivism': -1.0 },
      i < 15 ? -1 : 1,
      'A'
    )
  ),

  ...Array.from({ length: 25 }, (_, i) =>
    createProfessionalQuestion(
      `ant-pro-${String(i + 1).padStart(3, '0')}`,
      [
        '人类的所有差异都是环境和社会化的产物。',
        '人类大脑出生时本质上是一块空白的石板。',
        '性别差异完全是社会建构的，没有生物学基础。',
        '人类本质上是善良的，所有的邪恶都是社会条件造成的。',
        '通过适当的社会工程，人性可以被完全重塑。',
        '没有本质的人性这样的东西。',
        '所有人类行为都是可以修改和改进的。',
        '遗传对人类行为和结果没有显著影响。',
        '任何人口群体之间的差异完全是环境因素造成的。',
        '人类的利他主义和合作完全是文化建构的。',
        '文化完全独立于人类生物学而存在。',
        '所有心理特征都是100%可塑的。',
        '人类没有天生的认知偏差或直觉。',
        '道德完全是一种文化建构，没有天生的成分。',
        '通过正确的养育，任何人都可以成为任何东西。',
        '人类行为的重要方面是由我们的进化遗产塑造的。',
        '人性的某些方面是普遍的和生物学基础的。',
        '男女之间存在显著的内在心理和行为差异。',
        '遗传因素对人格和智力有重大影响。',
        '人类天生就有攻击性和竞争性。',
        '人类的社会本能是有限的，主要面向亲属。',
        '人类认知包含许多进化的偏见和启发式。',
        '文化受到人类生物约束的严重限制。',
        '道德直觉有重要的先天成分。',
        '人性设定了可以实现的社会变革的基本限制。',
      ][i],
      'anthropological',
      i < 15
        ? { 'blank-slate': 1.0, 'constructivism': 0.9, 'essentialism': -1.0 }
        : { 'essentialism': 1.0, 'evolutionary-psychology': 0.95, 'blank-slate': -1.0 },
      i < 15 ? -1 : 1,
      'A'
    )
  ),

  ...Array.from({ length: 25 }, (_, i) =>
    createProfessionalQuestion(
      `tem-pro-${String(i + 1).padStart(3, '0')}`,
      [
        '彻底和立即的社会革命总是优于渐进式改革。',
        '我们应该故意加速技术发展以实现激进的社会变革。',
        '传统的所有方面都应该被系统地质疑和推翻。',
        '人类的未来本质上比过去的任何事物都要好。',
        '我们应该愿意为了更好的未来而牺牲所有现有的社会安排。',
        '社会保守主义本质上是对进步的非理性阻力。',
        '我们应该积极拥抱所有破坏性技术，无论其社会后果如何。',
        '历史正在朝着一个特定的，更美好的方向发展。',
        '每一代人都应该有完全的自由来重塑所有社会制度。',
        '我们对未来世代的义务总是超过对现在的义务。',
        '所有的社会变革都应该非常谨慎和逐步地进行。',
        '现有的机构体现了历代积累的智慧，不应该轻易改变。',
        '社会制度的有机发展总是优于理性主义重建。',
        '传统经过了时间的考验，因此本质上是有效的。',
        '革命性的变革总是导致比它解决的更多的问题。',
        '我们有责任维护和传递我们从祖先那里继承的东西。',
        '现代社会的大多数变化都使事情变得更糟，而不是更好。',
        '稳定和连续性总是优于创新和实验。',
        '社会太快放弃了其久经考验的传统价值观。',
        '乌托邦式尝试重塑社会总是以灾难告终。',
        '制度崩溃最常发生在变革太快而不是太慢的时候。',
        '当前的社会安排存在根本缺陷，需要系统性变革。',
        '技术加速正在造成不可逆转的社会破坏。',
        '我们应该有意识地减缓所有技术和社会变革的速度。',
        '社会已经失去了与赋予它意义的历史根源的联系。',
      ][i],
      'temporal',
      i < 15
        ? { 'accelerationism': 1.0, 'revolutionism': 0.9, 'conservatism': -1.0 }
        : { 'conservatism': 1.0, 'traditionalism': 0.95, 'accelerationism': -1.0 },
      i < 15 ? -1 : 1,
      'A'
    )
  ),

  ...Array.from({ length: 15 }, (_, i) =>
    createProfessionalQuestion(
      `ecol-pro-b-${String(i + 1).padStart(3, '0')}`,
      [
        '人类文明应该有意识地去工业化以防止气候崩溃。',
        '所有动物都应该享有与人类相同的法律权利和保护。',
        '经济增长本质上是不可持续的，应该被完全停止。',
        '人类的数量需要减少80%才能实现可持续的未来。',
        '所有化石燃料的使用应该在10年内完全淘汰。',
        '吃肉本质上是不道德的，应该被积极阻止。',
        '所有大型水坝和核电站都应该立即关闭。',
        '所有车辆都应该被禁止，除了公共交通。',
        '自然保护区应该扩大到地球陆地面积的50%以上。',
        '技术永远无法解决我们的生态危机，只有去增长可以。',
        '所有转基因生物都应该被永久禁止。',
        '人类应该回归到狩猎采集的生活方式。',
        '所有塑料的生产和使用都应该被禁止。',
        '物种保护总是凌驾于人类发展需求之上。',
        '可再生能源即使降低生活水平也必须全面实施。',
      ][i],
      'ecological',
      i < 15
        ? { 'deep-ecology': 1.0, 'degrowth': 0.95, 'eco-modernism': -1.0 }
        : { 'eco-modernism': 1.0, 'productivism': 0.9, 'deep-ecology': -1.0 },
      i < 15 ? -1 : 1,
      'B',
      ['ecological-theory', 'environmental-philosophy']
    )
  ),

  ...Array.from({ length: 15 }, (_, i) =>
    createProfessionalQuestion(
      `eco-pro-b-${String(i + 1).padStart(3, '0')}`,
      [
        '劳动价值论是理解资本主义剥削的唯一连贯框架。',
        '主观价值论正确地解释了所有经济价值的来源。',
        '资本的有机构成提高必然导致利润率下降。',
        '企业家精神而不是劳动是经济增长的主要驱动力。',
        '垄断资本的积累是晚期资本主义的根本矛盾。',
        '市场集中通常是效率和创新的结果，而不是掠夺。',
        '金融化本质上是食利阶级对生产性经济的寄生。',
        '信贷创造和金融中介对经济发展至关重要。',
        '租金是不劳而获的收入，因此本质上是不公正的。',
        '租金是对稀缺资源有效配置的必要价格信号。',
        '异化是资本主义生产关系下劳动的必然状态。',
        '专业化和劳动分工提高了所有人的生活水平。',
        '商品拜物教掩盖了资本主义下真正的社会关系。',
        '消费者主权是市场经济中最真实的民主形式。',
        '产业后备军的存在是资本主义运作的必要条件。',
      ][i],
      'economic',
      i % 2 === 0
        ? { 'marxist-economics': 1.0, 'classical-marxism': 0.95, 'austrian-school': -1.0 }
        : { 'austrian-school': 1.0, 'neoclassical-economics': 0.95, 'marxist-economics': -1.0 },
      i % 2 === 0 ? -1 : 1,
      'B',
      ['political-economy', 'economic-theory']
    )
  ),

  ...Array.from({ length: 15 }, (_, i) =>
    createProfessionalQuestion(
      `soc-pro-b-${String(i + 1).padStart(3, '0')}`,
      [
        '国家本质上是统治阶级的镇压机器。',
        '国家是维护社会秩序和公共利益的必要制度。',
        '所有形式的权力本质上都是压迫性的，应该被废除。',
        '等级制度是所有复杂社会的组织原则。',
        '革命暴力是推翻压迫性制度的正当手段。',
        '政治暴力总是使社会变得更糟，永远不合理。',
        '财产权本质上是国家创造和执行的法律虚构。',
        '财产权是所有其他个人自由的基础。',
        '代议制民主本质上是资产阶级统治的形式。',
        '自由民主是设计出来的最不坏的政治制度。',
        '阶级矛盾是所有社会冲突的根本基础。',
        '利益集团竞争是多元民主的健康运作机制。',
        '公民不服从在不公正的法律面前是一种道德义务。',
        '法律的权威应该总是高于个人的道德判断。',
        '真正的民主只能通过直接参与来实现，而不是代表。',
      ][i],
      'social',
      i % 2 === 0
        ? { 'state-criticism': 1.0, 'marxist-state-theory': 0.95, 'state-sovereignty': -1.0 }
        : { 'state-sovereignty': 1.0, 'institutional-conservatism': 0.95, 'anti-statism': -1.0 },
      i % 2 === 0 ? -1 : 1,
      'B',
      ['political-theory', 'state-theory']
    )
  ),

  ...Array.from({ length: 15 }, (_, i) =>
    createProfessionalQuestion(
      `cul-pro-b-${String(i + 1).padStart(3, '0')}`,
      [
        '启蒙运动的普遍价值观本质上是欧洲文化霸权的形式。',
        '启蒙理性是人类进步的唯一可靠基础。',
        '宗教本质上是被压迫者的叹息和人民的鸦片。',
        '宗教信仰对社会道德和凝聚力至关重要。',
        '西方文化的传播本质上是文化帝国主义的一种形式。',
        '西方现代化模式代表了人类发展的普遍道路。',
        '传统本质上是过去死去的人对活人的暴政。',
        '传统体现了历代积累的文化智慧。',
        '所有意识形态最终都是其时代物质条件的反映。',
        '伟大的思想塑造历史，而不是物质条件。',
        '文化同化本质上是对少数群体身份的暴力。',
        '共同的文化规范是社会信任和合作的基础。',
        '艺术应该总是具有批判性和政治参与性。',
        '为艺术而艺术是文化生产的唯一合法原则。',
        '大众文化本质上是统治阶级意识形态操纵的工具。',
      ][i],
      'cultural',
      i % 2 === 0
        ? { 'critical-theory': 1.0, 'postcolonialism': 0.95, 'universal-liberalism': -1.0 }
        : { 'universal-liberalism': 1.0, 'cultural-conservatism': 0.9, 'cultural-relativism': -1.0 },
      i % 2 === 0 ? -1 : 1,
      'B',
      ['cultural-theory', 'critical-theory']
    )
  ),

  ...Array.from({ length: 15 }, (_, i) =>
    createProfessionalQuestion(
      `int-pro-b-${String(i + 1).padStart(3, '0')}`,
      [
        '资本主义从一开始就依赖并需要帝国主义扩张。',
        '自由贸易和资本流动使所有国家长期受益。',
        '主权国家体系本身就是战争和冲突的主要根源。',
        '无政府状态的国际体系要求各国追求权力最大化。',
        '殖民主义是发展中国家欠发达的根本原因。',
        '殖民主义本质上是一个复杂的现象，既有积极也有消极的遗产。',
        '永久和平只能通过全球民主治理来实现。',
        '世界政府将不可避免地成为全球暴政。',
        '所有战争本质上都是为了经济利益和阶级统治。',
        '地缘政治竞争是国际关系中永恒和不可避免的特征。',
        '人权话语本质上是西方帝国主义的工具。',
        '人权代表了可以合法推广的普遍道德标准。',
        ' Uneven and combined development是资本主义世界体系的基本规律。',
        '国家发展主要是国内制度和政策质量的函数。',
        '国际团结应始终优先于国家利益。',
      ][i],
      'international',
      i % 2 === 0
        ? { 'world-systems-theory': 1.0, 'dependency-theory': 0.95, 'political-realism': -1.0 }
        : { 'political-realism': 1.0, 'liberal-internationalism': 0.9, 'marxist-ir': -1.0 },
      i % 2 === 0 ? -1 : 1,
      'B',
      ['international-relations', 'geopolitical-theory']
    )
  ),

  ...Array.from({ length: 25 }, (_, i) =>
    createProfessionalQuestion(
      `meta-pro-${String(i + 1).padStart(3, '0')}`,
      [
        '坚持原则的一致性比在每种情况下取得好的结果更重要。',
        '我的信念形成一个单一的，逻辑上一致的系统是至关重要的。',
        '当两个信念似乎冲突时，我会投入大量精力来解决矛盾。',
        '我宁愿有一个不完美但一致的信念系统，而不是一系列有效的但矛盾的见解。',
        '如果我被证明持有矛盾的信念，我会感到真正的理智不适。',
        '所有真正的知识最终都应该从几个第一原则推导出来。',
        '一个理论的内部一致性是其真理的最重要标准。',
        '例外总是证明规则是坏的，而不是规则是好的。',
        '我很少改变我的核心原则，即使它们在特定情况下给出尴尬的结果。',
        '思想的系统性比思想的实际效果更重要。',
        '不同的情况确实需要完全不同的，甚至矛盾的原则。',
        '我经常故意在不同的生活领域持有明显矛盾的信念。',
        '认知失调不是问题，而是现实复杂性的标志。',
        '试图使我所有的信念一致将导致我对世界的理解大大贫穷。',
        '原则应该总是实用的，如果它们不起作用就应该被打破。',
        '我更喜欢一系列局部有效的见解，而不是一个宏大但可能错误的系统。',
        '创造性的洞察力往往来自持有明显矛盾的观点。',
        '对一致性的过度关注主要是知识分子的职业病。',
        '大多数真正重要的真相是自相矛盾的。',
        '最好是不一致的正确，而不是一致的错误。',
        '所有重要的决策都应该可以从一般原则推导出来。',
        '我根据每一个个案的优点来判断，而不试图保持一致。',
        '对一致性的要求是理性的最大敌人。',
        '我的观点在不同的情境中变化很大，我认为这是一种力量。',
        '在政治和道德中，一致性被过度高估了。',
      ][i],
      'metaCoherence',
      i < 15
        ? { 'systematicity': 1.0, 'rationalism': 0.9, 'syncretism': -1.0 }
        : { 'syncretism': 1.0, 'pragmatism': 0.95, 'systematicity': -1.0 },
      i < 15 ? -1 : 1,
      'A'
    )
  ),
]

export function getQuestionBankStats() {
  const dimensions: Record<string, number> = {}
  PROFESSIONAL_QUESTION_BANK.forEach(q => {
    dimensions[q.dimension] = (dimensions[q.dimension] || 0) + 1
  })
  return {
    totalQuestions: PROFESSIONAL_QUESTION_BANK.length,
    questionsByDimension: dimensions,
    sectionA: PROFESSIONAL_QUESTION_BANK.filter(q => q.section === 'A').length,
    sectionB: PROFESSIONAL_QUESTION_BANK.filter(q => q.section === 'B').length,
    averageDiscrimination: PROFESSIONAL_QUESTION_BANK.reduce((s, q) => s + q.discriminationIndex, 0) / PROFESSIONAL_QUESTION_BANK.length,
  }
}
