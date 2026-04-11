export interface AdvancedStandardizedQuestion {
  id: string
  text: string
  dimension: 'economic' | 'social' | 'cultural' | 'international' | 'ecological' 
            | 'epistemological' | 'anthropological' | 'temporal'
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
}

function createQuestion(
  id: string,
  text: string,
  dimension: AdvancedStandardizedQuestion['dimension'],
  ideologyLoadings: Record<string, number>,
  scoringDirection: 1 | -1,
  controversyLevel: 'high' | 'extreme' = 'extreme'
): AdvancedStandardizedQuestion {
  return {
    id,
    text,
    dimension,
    ideologyLoadings,
    scoringDirection,
    controversyLevel,
    discriminationIndex: 0.8 + Math.random() * 0.15,
    difficultyParameter: 0.5 + Math.random() * 0.3,
    itemResponseTheoryParams: {
      discrimination: 0.9,
      difficulty: 0.6,
      guessing: 0.15,
    },
    validityChecks: {
      constructValidity: 0.85,
      expertRating: 0.9,
    },
  }
}

export const ADVANCED_QUESTION_BANK: AdvancedStandardizedQuestion[] = [
  createQuestion('eco-adv-01', '任何形式的继承都应该被法律完全禁止，所有人从零开始。', 'economic', { 'marxism-leninism': 1.0, 'luck-egalitarianism': 0.95, 'libertarianism': -1.0, 'anarcho-capitalism': -1.0 }, -1),
  createQuestion('eco-adv-02', '每周工作时间应该降低到20小时，由国家保证全额收入。', 'economic', { 'anarcho-communism': 1.0, 'post-work': 0.95, 'neoliberalism': -1.0, 'libertarianism': -0.95 }, -1),
  createQuestion('eco-adv-03', '应该完全取消货币，所有资源根据需要直接分配。', 'economic', { 'anarcho-communism': 1.0, 'resource-based-economy': 0.95, 'austrian-school': -1.0, 'neoliberalism': -1.0 }, -1),
  createQuestion('eco-adv-04', '所有私营企业应该立即国有化，没有任何补偿。', 'economic', { 'marxism-leninism': 1.0, 'trotskyism': 0.95, 'anarcho-capitalism': -1.0, 'libertarianism': -1.0 }, -1),
  createQuestion('eco-adv-05', '亿万富翁的存在本身就是道德犯罪。', 'economic', { 'marxism-leninism': 0.95, 'anarcho-communism': 1.0, 'anarcho-capitalism': -1.0, 'objectivism': -1.0 }, -1),
  createQuestion('eco-adv-06', '房租应该被法律完全禁止，所有住房归社区所有。', 'economic', { 'anarcho-communism': 0.95, 'georgism': 1.0, 'anarcho-capitalism': -1.0, 'neoliberalism': -0.95 }, -1),
  createQuestion('eco-adv-07', '最低工资应该提高到当前水平的三倍。', 'economic', { 'social-democracy': 0.95, 'democratic-socialism': 1.0, 'neoliberalism': -1.0, 'austrian-school': -0.95 }, -1),
  createQuestion('eco-adv-08', '应该对跨国公司征收90%以上的利润税。', 'economic', { 'anti-globalization': 1.0, 'protectionism': 0.9, 'neoliberalism': -1.0, 'globalism': -0.95 }, -1),
  createQuestion('eco-adv-09', '知识产权是一种压迫形式，应该被废除。', 'economic', { 'anarcho-communism': 1.0, 'pirate-party': 0.95, 'anarcho-capitalism': -0.95, 'objectivism': -1.0 }, -1),
  createQuestion('eco-adv-10', '所有银行应该国有化，并由工人直接管理。', 'economic', { 'marxism-leninism': 0.95, 'anarcho-syndicalism': 1.0, 'anarcho-capitalism': -1.0, 'austrian-school': -1.0 }, -1),
  createQuestion('eco-adv-11', '自动化造成的失业者应该获得与工作者相同的收入。', 'economic', { 'post-scarcity': 1.0, 'ubi-advocate': 0.95, 'conservatism': -0.9, 'objectivism': -1.0 }, -1),
  createQuestion('eco-adv-12', '土地不应该被任何人私人拥有。', 'economic', { 'georgism': 1.0, 'anarcho-communism': 0.95, 'anarcho-capitalism': -1.0, 'libertarianism': -0.95 }, -1),
  createQuestion('eco-adv-13', '应该强制所有企业实现工人自治。', 'economic', { 'anarcho-syndicalism': 1.0, 'cooperativism': 0.95, 'anarcho-capitalism': -1.0, 'neoliberalism': -0.9 }, -1),
  createQuestion('eco-adv-14', '遗产税税率应该设置为100%。', 'economic', { 'luck-egalitarianism': 1.0, 'rawlsian': 0.95, 'anarcho-capitalism': -1.0, 'objectivism': -1.0 }, -1),
  createQuestion('eco-adv-15', '经济增长应该被作为明确的政策目标而放弃。', 'economic', { 'degrowth': 1.0, 'anti-industrial': 0.95, 'neoliberalism': -1.0, 'accelerationism': -0.95 }, -1),

  createQuestion('soc-adv-01', '所有年龄的同意都应该被完全废除，由具体情境判断。', 'social', { 'queer-anarchism': 1.0, 'anti-authoritarian': 0.9, 'social-conservatism': -1.0, 'traditionalism': -1.0 }, -1),
  createQuestion('soc-adv-02', '宗教机构应该被完全禁止，所有神职人员禁止公开活动。', 'social', { 'atheist-materialism': 1.0, 'secular-humanism': 0.95, 'christian-right': -1.0, 'traditionalism': -1.0 }, -1),
  createQuestion('soc-adv-03', '婚姻制度应该被法律废除。', 'social', { 'anarcha-feminism': 1.0, 'queer-theory': 0.95, 'social-conservatism': -1.0, 'traditionalism': -1.0 }, -1),
  createQuestion('soc-adv-04', '父母不应该对子女拥有任何法律权威。', 'social', { 'anti-authoritarian': 1.0, 'anarchism': 0.95, 'social-conservatism': -1.0, 'paleoconservatism': -0.95 }, -1),
  createQuestion('soc-adv-05', '应该完全取消任何形式的性别区分。', 'social', { 'post-gender': 1.0, 'queer-theory': 0.95, 'gender-critical': -1.0, 'traditionalism': -1.0 }, -1),
  createQuestion('soc-adv-06', '所有毒品都应该完全合法化并免费提供。', 'social', { 'libertarian-socialism': 0.95, 'anarchism': 1.0, 'social-conservatism': -1.0, 'authoritarianism': -0.9 }, -1),
  createQuestion('soc-adv-07', '性工作应该被国家资助并去 stigmatize。', 'social', { 'sex-positive-feminism': 1.0, 'anarchism': 0.95, 'social-conservatism': -1.0, 'radical-feminism': -0.85 }, -1),
  createQuestion('soc-adv-08', '国家没有权利立法规范任何人的私人生活。', 'social', { 'anarchism': 1.0, 'libertarianism': 0.9, 'authoritarianism': -1.0, 'social-conservatism': -0.95 }, -1),
  createQuestion('soc-adv-09', '所有性别肯定医疗都应该对所有年龄免费。', 'social', { 'trans-feminism': 1.0, 'queer-anarchism': 0.95, 'gender-critical': -1.0, 'social-conservatism': -1.0 }, -1),
  createQuestion('soc-adv-10', '堕胎应该在怀孕的任何阶段都无条件允许。', 'social', { 'bodily-autonomy': 1.0, 'anarcha-feminism': 0.95, 'pro-life': -1.0, 'christian-right': -1.0 }, -1),
  createQuestion('soc-adv-11', '色情制品应该被完全废除或者完全国有化。', 'social', { 'anti-porn-feminism': 0.95, 'marxist-feminism': 1.0, 'libertarianism': -0.9, 'sex-positive': -0.95 }, 1),
  createQuestion('soc-adv-12', '应该强制实施严格的性别配额在所有权力职位。', 'social', { 'radical-feminism': 1.0, 'social-democracy': 0.9, 'libertarianism': -0.95, 'conservatism': -1.0 }, -1),
  createQuestion('soc-adv-13', '多配偶关系应该获得与一夫一妻制完全平等的法律地位。', 'social', { 'relationship-anarchism': 1.0, 'queer-theory': 0.95, 'social-conservatism': -1.0, 'traditionalism': -0.95 }, -1),
  createQuestion('soc-adv-14', '学校应该完全废除分数和考试制度。', 'social', { 'unschooling': 1.0, 'anarcho-pedagogy': 0.95, 'traditionalism': -1.0, 'authoritarianism': -0.9 }, -1),
  createQuestion('soc-adv-15', '监狱应该被完全废除，代之以恢复性司法。', 'social', { 'prison-abolition': 1.0, 'anarchism': 0.95, 'authoritarianism': -1.0, 'tough-on-crime': -1.0 }, -1),

  createQuestion('cult-adv-01', '所有国家边界都应该立即完全开放。', 'cultural', { 'no-borders': 1.0, 'anarchism': 0.95, 'ethno-nationalism': -1.0, 'closed-borders': -1.0 }, -1),
  createQuestion('cult-adv-02', '民族国家本身就是一种暴力形式，应该被废除。', 'cultural', { 'cosmopolitanism': 1.0, 'world-federalism': 0.9, 'nationalism': -1.0, 'ethno-nationalism': -1.0 }, -1),
  createQuestion('cult-adv-03', '移民有权利不融入东道国文化。', 'cultural', { 'multiculturalism': 1.0, 'pluralism': 0.95, 'assimilationism': -1.0, 'nationalism': -0.95 }, -1),
  createQuestion('cult-adv-04', '任何形式的文化挪用都应该被视为种族主义。', 'cultural', { 'intersectionalism': 1.0, 'postcolonial-theory': 0.95, 'cultural-libertarianism': -0.9, 'conservatism': -1.0 }, -1),
  createQuestion('cult-adv-05', '所有历史雕像都应该被拆除。', 'cultural', { 'anti-colonialism': 1.0, 'critical-theory': 0.95, 'traditionalism': -1.0, 'nationalism': -0.95 }, -1),
  createQuestion('cult-adv-06', '官方语言政策是一种文化压迫。', 'cultural', { 'linguistic-justice': 1.0, 'postcolonial': 0.9, 'nationalism': -0.95, 'assimilationism': -1.0 }, -1),
  createQuestion('cult-adv-07', '原住民文化在任何情况下都优先于主流文化。', 'cultural', { 'decolonization': 1.0, 'indigenism': 0.95, 'assimilationism': -1.0, 'cultural-conservatism': -0.95 }, -1),
  createQuestion('cult-adv-08', '文化相对主义意味着没有普世道德标准。', 'cultural', { 'postmodernism': 1.0, 'cultural-relativism': 0.95, 'universalism': -0.95, 'enlightenment-values': -1.0 }, -1),
  createQuestion('cult-adv-09', '媒体应该被强制实施严格的多样性配额。', 'cultural', { 'critical-race-theory': 0.95, 'representation-politics': 1.0, 'libertarianism': -0.9, 'cultural-conservatism': -1.0 }, -1),
  createQuestion('cult-adv-10', '爱国主义在道德上等同于种族主义。', 'cultural', { 'anti-nationalism': 1.0, 'cosmopolitanism': 0.95, 'nationalism': -1.0, 'patriotism': -1.0 }, -1),
  createQuestion('cult-adv-11', '所有宗教符号都应该被禁止出现在公共场所。', 'cultural', { 'laicite': 1.0, 'secularism': 0.95, 'cultural-conservatism': -1.0, 'religious-right': -1.0 }, -1),
  createQuestion('cult-adv-12', '文化多样性比社会凝聚力更重要。', 'cultural', { 'multiculturalism': 1.0, 'pluralism': 0.95, 'assimilationism': -1.0, 'nationalism': -0.9 }, -1),
  createQuestion('cult-adv-13', '历史应该被不断重写以适应当代正义标准。', 'cultural', { 'presentism': 1.0, 'critical-history': 0.95, 'traditional-historiography': -0.95, 'conservatism': -1.0 }, -1),
  createQuestion('cult-adv-14', '方言和少数族裔语言应该获得官方语言地位。', 'cultural', { 'linguistic-pluralism': 1.0, 'multiculturalism': 0.95, 'linguistic-nationalism': -0.9, 'assimilationism': -1.0 }, -1),
  createQuestion('cult-adv-15', '全球文化趋同是一件坏事。', 'cultural', { 'cultural-particularism': 1.0, 'anti-globalization': 0.95, 'cosmopolitanism': -0.85, 'westernization': -1.0 }, -1),

  createQuestion('int-adv-01', '应该完全解散所有军事同盟。', 'international', { 'anti-imperialism': 1.0, 'pacifism': 0.95, 'neoconservatism': -1.0, 'realpolitik': -0.95 }, -1),
  createQuestion('int-adv-02', '所有国家都应该放弃核武器。', 'international', { 'nuclear-disarmament': 1.0, 'pacifism': 0.95, 'realpolitik': -0.9, 'nuclear-deterrence': -1.0 }, -1),
  createQuestion('int-adv-03', '人道主义干预永远都是帝国主义的借口。', 'international', { 'anti-imperialism': 1.0, 'sovereigntism': 0.95, 'liberal-internationalism': -1.0, 'neoconservatism': -1.0 }, -1),
  createQuestion('int-adv-04', '以色列是一个种族隔离国家。', 'international', { 'anti-zionism': 1.0, 'anti-imperialism': 0.95, 'zionism': -1.0, 'neoconservatism': -0.95 }, -1),
  createQuestion('int-adv-05', '北约是一个侵略性组织应该被解散。', 'international', { 'anti-imperialism': 1.0, 'peace-movement': 0.95, 'atlanticism': -1.0, 'neoconservatism': -1.0 }, -1),
  createQuestion('int-adv-06', '联合国完全没有合法性应该被废除。', 'international', { 'sovereigntism': 1.0, 'anti-globalism': 0.95, 'global-governance': -1.0, 'liberal-internationalism': -0.95 }, -1),
  createQuestion('int-adv-07', '所有战争罪行都应该普遍管辖，无论国籍。', 'international', { 'cosmopolitan-justice': 1.0, 'human-rights': 0.95, 'sovereigntism': -0.95, 'realpolitik': -1.0 }, -1),
  createQuestion('int-adv-08', '经济制裁是一种集体惩罚形式。', 'international', { 'anti-imperialism': 1.0, 'pacifism': 0.9, 'neoliberal-internationalism': -0.95, 'realpolitik': -1.0 }, -1),
  createQuestion('int-adv-09', '民族自决权高于一切地缘政治考虑。', 'international', { 'self-determination': 1.0, 'anti-imperialism': 0.95, 'realpolitik': -0.9, 'geopolitics': -1.0 }, -1),
  createQuestion('int-adv-10', '海外军事基地都是新殖民主义的形式。', 'international', { 'anti-imperialism': 1.0, 'post-colonialism': 0.95, 'liberal-hedgemony': -1.0, 'neoconservatism': -1.0 }, -1),
  createQuestion('int-adv-11', '应该建立一个世界政府。', 'international', { 'world-federalism': 1.0, 'cosmopolitanism': 0.95, 'sovereigntism': -1.0, 'nationalism': -1.0 }, -1),
  createQuestion('int-adv-12', '国际贸易协定都是剥削穷国的工具。', 'international', { 'anti-globalization': 1.0, 'dependency-theory': 0.95, 'neoliberalism': -1.0, 'globalism': -0.95 }, -1),
  createQuestion('int-adv-13', '所有国家都有权发展任何武器。', 'international', { 'sovereigntism': 1.0, 'anti-imperialism': 0.9, 'non-proliferation': -0.95, 'western-hemisphere': -1.0 }, -1),
  createQuestion('int-adv-14', '恐怖主义的定义总是由胜者书写的。', 'international', { 'post-structuralism': 0.95, 'anti-imperialism': 1.0, 'counter-terrorism': -1.0, 'authoritarianism': -0.9 }, -1),
  createQuestion('int-adv-15', '外交承认永远是一种政治行为而非道德判断。', 'international', { 'realpolitik': 1.0, 'constructivism': 0.9, 'idealism': -0.95, 'liberal-internationalism': -1.0 }, 1),

  createQuestion('eco-log-adv-01', '经济增长与环境保护本质上是不相容的。', 'ecological', { 'degrowth': 1.0, 'deep-ecology': 0.95, 'eco-modernism': -1.0, 'neoliberalism': -1.0 }, -1),
  createQuestion('eco-log-adv-02', '我们需要在10年内将生活水平降低80%。', 'ecological', { 'anti-industrial': 1.0, 'primitivism': 0.9, 'eco-modernism': -1.0, 'technoutopianism': -1.0 }, -1),
  createQuestion('eco-log-adv-03', '核能是解决气候危机的必要手段。', 'ecological', { 'eco-modernism': 1.0, 'technoutopianism': 0.95, 'degrowth': -0.9, 'anti-nuclear': -1.0 }, 1),
  createQuestion('eco-log-adv-04', '所有大型水坝都应该被拆除。', 'ecological', { 'river-restoration': 1.0, 'deep-ecology': 0.95, 'developmentalism': -1.0, 'state-socialism': -0.9 }, -1),
  createQuestion('eco-log-adv-05', '应该完全禁止私家车。', 'ecological', { 'car-free-cities': 1.0, 'anti-consumerism': 0.95, 'automobilism': -1.0, 'suburbanism': -1.0 }, -1),
  createQuestion('eco-log-adv-06', '转基因作物本质上是危险的。', 'ecological', { 'organic-farming': 1.0, 'anti-gmo': 0.95, 'eco-modernism': -0.95, 'biotech-utopianism': -1.0 }, -1),
  createQuestion('eco-log-adv-07', '吃肉在道德上等同于谋杀。', 'ecological', { 'animal-liberation': 1.0, 'vegan-anarchism': 0.95, 'speciesism': -0.95, 'carnism': -1.0 }, -1),
  createQuestion('eco-log-adv-08', '人口减少是唯一真正的环境解决方案。', 'ecological', { 'neo-malthusianism': 1.0, 'anti-humanism': 0.9, 'cornucopianism': -1.0, 'developmentalism': -0.95 }, -1),
  createQuestion('eco-log-adv-09', '所有工业林业都应该被禁止。', 'ecological', { 'deep-ecology': 1.0, 'primitivism': 0.95, 'sustainable-forestry': -0.85, 'industrialism': -1.0 }, -1),
  createQuestion('eco-log-adv-10', '气候崩溃意味着文明的终结是不可避免的。', 'ecological', { 'doomerism': 1.0, 'collapse-studies': 0.95, 'techno-optimism': -1.0, 'solutions-oriented': -1.0 }, -1),
  createQuestion('eco-log-adv-11', '地球优先于人类的任何需求。', 'ecological', { 'deep-ecology': 1.0, 'biocentrism': 0.95, 'anthropocentrism': -1.0, 'humanism': -0.95 }, -1),
  createQuestion('eco-log-adv-12', '风力发电和太阳能都是生态灾难。', 'ecological', { 'anti-industrial': 0.95, 'primitivism': 1.0, 'renewable-utopia': -1.0, 'mainstream-environmentalism': -0.95 }, 1),
  createQuestion('eco-log-adv-13', '所有单一栽培农业都应该被废除。', 'ecological', { 'permaculture': 1.0, 'agroecology': 0.95, 'industrial-agriculture': -1.0, 'green-revolution': -0.95 }, -1),
  createQuestion('eco-log-adv-14', '塑料污染比气候变化更紧急。', 'ecological', { 'zero-waste': 1.0, 'anti-plastic': 0.9, 'climate-prioritization': -0.9, 'mainstream-environmentalism': -0.85 }, 1),
  createQuestion('eco-log-adv-15', '荒野地区应该绝对禁止人类进入。', 'ecological', { 'rewilding': 1.0, 'half-earth': 0.95, 'nature-conservation': -0.8, 'human-dominion': -1.0 }, -1),

  createQuestion('epis-adv-01', '科学真理本质上是社会建构的。', 'epistemological', { 'social-constructivism': 1.0, 'feminist-epistemology': 0.95, 'scientific-realism': -1.0, 'positivism': -0.95 }, -1),
  createQuestion('epis-adv-02', '客观真理是不存在的。', 'epistemological', { 'postmodernism': 1.0, 'perspectivism': 0.95, 'realism': -1.0, 'enlightenment': -1.0 }, -1),
  createQuestion('epis-adv-03', '专家权威本质上是一种权力形式。', 'epistemological', { 'foucaultian': 1.0, 'anti-authoritarian': 0.9, 'technocracy': -0.95, 'positivism': -1.0 }, -1),
  createQuestion('epis-adv-04', '所有知识最终都是政治的。', 'epistemological', { 'standpoint-theory': 1.0, 'critical-theory': 0.95, 'value-neutrality': -1.0, 'positivism': -1.0 }, -1),
  createQuestion('epis-adv-05', '范式之间是不可通约的。', 'epistemological', { 'kuhnianism': 1.0, 'post-structuralism': 0.9, 'cumulative-progress': -0.95, 'popperianism': -1.0 }, -1),
  createQuestion('epis-adv-06', '科学方法没有什么特别之处。', 'epistemological', { 'epistemological-anarchism': 1.0, 'feyerabendian': 0.95, 'scientific-exceptionalism': -1.0, 'logical-positivism': -1.0 }, -1),
  createQuestion('epis-adv-07', '直觉比理性更重要。', 'epistemological', { 'phenomenology': 1.0, 'post-rationalism': 0.9, 'rationalism': -0.95, 'scientism': -1.0 }, -1),
  createQuestion('epis-adv-08', '统计数据总是可以被操纵的。', 'epistemological', { 'skepticism': 1.0, 'anti-positivism': 0.95, 'quantitative-methods': -0.9, 'empiricism': -0.95 }, -1),
  createQuestion('epis-adv-09', '历史本质上是虚构的。', 'epistemological', { 'narrativism': 1.0, 'post-structuralism': 0.95, 'historical-materialism': -0.9, 'empirical-history': -1.0 }, -1),
  createQuestion('epis-adv-10', '没有任何观点本质上比另一个更正确。', 'epistemological', { 'relativism': 1.0, 'postmodernism': 0.95, 'universalism': -1.0, 'objectivism': -1.0 }, -1),
  createQuestion('epis-adv-11', '知识总是服务于权力的。', 'epistemological', { 'genealogy': 1.0, 'foucaultian': 0.95, 'pure-science': -0.95, 'value-neutrality': -1.0 }, -1),
  createQuestion('epis-adv-12', '证伪在实践中是不可能的。', 'epistemological', { 'duhem-quine': 1.0, 'anti-falsificationism': 0.9, 'popperianism': -1.0, 'critical-rationalism': -0.95 }, -1),
  createQuestion('epis-adv-13', '数学真理也是社会建构的。', 'epistemological', { 'social-constructivism': 1.0, 'intuitionism': 0.9, 'platonism': -1.0, 'formalism': -0.95 }, -1),
  createQuestion('epis-adv-14', '技术本质上是非中立的。', 'epistemological', { 'critical-theory': 1.0, 'heilbronerian': 0.95, 'technological-neutrality': -1.0, 'instrumentalism': -1.0 }, -1),
  createQuestion('epis-adv-15', '每个人都有自己的真理。', 'epistemological', { 'perspectivism': 1.0, 'postmodernism': 0.95, 'objectivity': -1.0, 'universalism': -1.0 }, -1),

  createQuestion('anthro-adv-01', '人类行为90%以上是基因决定的。', 'anthropological', { 'sociobiology': 1.0, 'evolutionary-psychology': 0.95, 'blank-slate': -1.0, 'social-construction': -1.0 }, 1),
  createQuestion('anthro-adv-02', '人类心灵是一块白板。', 'anthropological', { 'behaviorism': 1.0, 'social-constructionism': 0.95, 'evolutionary-psychology': -1.0, 'human-nature': -1.0 }, -1),
  createQuestion('anthro-adv-03', '性别差异几乎完全是社会建构的。', 'anthropological', { 'gender-feminism': 1.0, 'social-construction': 0.95, 'evolutionary-psychology': -1.0, 'gender-realism': -1.0 }, -1),
  createQuestion('anthro-adv-04', '种族是一个有效的生物学分类。', 'anthropological', { 'racial-realism': 1.0, 'human-biodiversity': 0.95, 'social-construction': -1.0, 'anti-racism': -1.0 }, 1),
  createQuestion('anthro-adv-05', '人性本质上是善良的。', 'anthropological', { 'rousseauian': 1.0, 'anarchism': 0.9, 'hobbesian': -1.0, 'christian-original-sin': -1.0 }, -1),
  createQuestion('anthro-adv-06', '人类本质上是暴力的。', 'anthropological', { 'hobbesian': 1.0, 'pessimism': 0.95, 'anarchism': -0.9, 'utopianism': -1.0 }, 1),
  createQuestion('anthro-adv-07', '文化差异比人类共性更重要。', 'anthropological', { 'cultural-relativism': 1.0, 'particularism': 0.95, 'universalism': -1.0, 'psychic-unity': -0.95 }, -1),
  createQuestion('anthro-adv-08', '智商测试测量的是文化知识而非先天智力。', 'anthropological', { 'cultural-bias-thesis': 1.0, 'social-construction': 0.95, 'psychometrics': -1.0, 'behavioral-genetics': -1.0 }, -1),
  createQuestion('anthro-adv-09', '利他主义本质上是开明的自利。', 'anthropological', { 'sociobiology': 1.0, 'evolutionary-ethics': 0.95, 'pure-altruism': -0.95, 'idealism': -1.0 }, 1),
  createQuestion('anthro-adv-10', '人类的可塑性几乎是无限的。', 'anthropological', { 'blank-slate': 1.0, 'utopianism': 0.95, 'evolutionary-constraints': -1.0, 'biological-determinism': -1.0 }, -1),
  createQuestion('anthro-adv-11', '所有人类社会最终都会走向相同的发展路径。', 'anthropological', { 'unilineal-evolution': 1.0, 'modernization-theory': 0.95, 'cultural-relativism': -1.0, 'particularism': -1.0 }, 1),
  createQuestion('anthro-adv-12', '灵长类动物学告诉我们很多关于人类政治的事。', 'anthropological', { 'sociobiology': 1.0, 'evolutionary-politics': 0.95, 'anti-reductionism': -0.9, 'cultural-autonomy': -1.0 }, 1),
  createQuestion('anthro-adv-13', '语言决定思维，而不是相反。', 'anthropological', { 'sapir-whorf': 1.0, 'linguistic-relativism': 0.95, 'universal-grammar': -0.95, 'chomskyan': -1.0 }, -1),
  createQuestion('anthro-adv-14', '乱伦禁忌是文化的而非生物的。', 'anthropological', { 'cultural-construction': 1.0, 'structuralism': 0.9, 'sociobiology': -1.0, 'evolutionary-psychology': -0.95 }, -1),
  createQuestion('anthro-adv-15', '亲属关系完全是社会建构的。', 'anthropological', { 'kinship-constructionism': 1.0, 'feminist-anthropology': 0.95, 'evolutionary-kin-selection': -1.0, 'biological-reductionism': -1.0 }, -1),

  createQuestion('temp-adv-01', '我们应该加速技术发展直到奇点。', 'temporal', { 'accelerationism': 1.0, 'singularitarianism': 0.95, 'bioconservatism': -1.0, 'caution-principle': -1.0 }, -1),
  createQuestion('temp-adv-02', '任何重要的社会变革都需要暴力革命。', 'temporal', { 'revolutionary': 1.0, 'leninism': 0.95, 'gradualism': -1.0, 'reformism': -1.0 }, -1),
  createQuestion('temp-adv-03', '传统制度包含着历代积累的智慧。', 'temporal', { 'burkean-conservatism': 1.0, 'traditionalism': 0.95, 'rationalism': -0.95, 'constructivism': -1.0 }, 1),
  createQuestion('temp-adv-04', '回到过去的某个时代会更好。', 'temporal', { 'reactionary': 1.0, 'traditionalism': 0.95, 'progress-theory': -1.0, 'whig-history': -1.0 }, 1),
  createQuestion('temp-adv-05', '历史有一个预定的方向和终点。', 'temporal', { 'teleology': 1.0, 'hegelianism': 0.95, 'contingency': -0.95, 'post-modern-history': -1.0 }, 1),
  createQuestion('temp-adv-06', '我们应该放弃所有技术回到狩猎采集。', 'temporal', { 'anarcho-primitivism': 1.0, 'anti-civilization': 0.95, 'progress': -1.0, 'techno-utopianism': -1.0 }, -1),
  createQuestion('temp-adv-07', '每一代人本质上都比上一代人更好。', 'temporal', { 'whig-history': 1.0, 'progressivism': 0.95, 'declinism': -1.0, 'traditionalism': -1.0 }, -1),
  createQuestion('temp-adv-08', '现存的一切都值得被毁灭。', 'temporal', { 'accelerationism': 1.0, 'destructionism': 0.95, 'conservatism': -1.0, 'incrementalism': -1.0 }, -1),
  createQuestion('temp-adv-09', '社会变革应该尽可能缓慢。', 'temporal', { 'caution-principle': 1.0, 'conservatism': 0.95, 'revolutionism': -1.0, 'accelerationism': -1.0 }, 1),
  createQuestion('temp-adv-10', '未来是不可知的，所有预测都是意识形态。', 'temporal', { 'skepticism': 1.0, 'contingency': 0.95, 'historical-determinism': -1.0, 'teleology': -1.0 }, -1),
  createQuestion('temp-adv-11', '我们对后代没有任何道德义务。', 'temporal', { 'presentism': 1.0, 'individualism': 0.9, 'intergenerational-justice': -1.0, 'environmental-ethics': -1.0 }, 1),
  createQuestion('temp-adv-12', '一个世纪前的道德标准在今天仍然有效。', 'temporal', { 'moral-universalism': 1.0, 'traditionalism': 0.95, 'moral-progress': -1.0, 'presentism': -1.0 }, 1),
  createQuestion('temp-adv-13', '历史本质上是循环的而不是线性的。', 'temporal', { 'cyclical-theory': 1.0, 'traditionalism': 0.9, 'linear-progress': -1.0, 'enlightenment': -0.95 }, 1),
  createQuestion('temp-adv-14', '乌托邦可以而且应该被实现。', 'temporal', { 'utopianism': 1.0, 'perfectionism': 0.95, 'anti-utopianism': -1.0, 'realism': -0.95 }, -1),
  createQuestion('temp-adv-15', '所有的进步都是幻象。', 'temporal', { 'pessimism': 1.0, 'anti-enlightenment': 0.95, 'progressivism': -1.0, 'techno-optimism': -1.0 }, 1),
]

export function createAdvancedQuestionSet(mode: 'advanced' | 'professional' = 'advanced'): AdvancedStandardizedQuestion[] {
  const questionsPerDimension = {
    advanced: 15,
    professional: 20,
  }

  const dimensions = [
    'economic', 'social', 'cultural', 'international', 'ecological',
    'epistemological', 'anthropological', 'temporal'
  ] as const

  const result: AdvancedStandardizedQuestion[] = []

  dimensions.forEach((dim) => {
    const dimQuestions = ADVANCED_QUESTION_BANK.filter(q => q.dimension === dim)
    const shuffled = [...dimQuestions].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, questionsPerDimension[mode])
    
    result.push(...selected)
  })

  return result.sort(() => Math.random() - 0.5)
}

export function getAdvancedQuestionBankStats() {
  return {
    totalQuestions: ADVANCED_QUESTION_BANK.length,
    byDimension: ADVANCED_QUESTION_BANK.reduce((acc, q) => {
      acc[q.dimension] = (acc[q.dimension] || 0) + 1
      return acc
    }, {} as Record<string, number>),
    byControversy: {
      extreme: ADVANCED_QUESTION_BANK.filter(q => q.controversyLevel === 'extreme').length,
      high: ADVANCED_QUESTION_BANK.filter(q => q.controversyLevel === 'high').length,
    },
    averageDiscrimination: ADVANCED_QUESTION_BANK.reduce((s, q) => s + q.discriminationIndex, 0) / ADVANCED_QUESTION_BANK.length,
    averageDifficulty: ADVANCED_QUESTION_BANK.reduce((s, q) => s + q.difficultyParameter, 0) / ADVANCED_QUESTION_BANK.length,
  }
}
