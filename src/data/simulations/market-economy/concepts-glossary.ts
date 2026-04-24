export interface Concept {
  id: string
  term: string
  category: 'economics' | 'game-mechanic' | 'strategy' | 'interface'
  icon: string
  definition: string
  formula?: string
  mechanic?: string
  strategy?: string
  examples?: string[]
  related?: string[]
}

export const CONCEPTS_GLOSSARY: Concept[] = [
  {
    id: 'gdp',
    term: 'GDP 国内生产总值',
    category: 'economics',
    icon: '📈',
    definition: '国内生产总值是衡量国家经济规模的核心指标，指一年内生产的所有最终商品和服务的总价值。',
    formula: 'GDP = 消费 + 投资 + 政府支出 + 净出口',
    mechanic: '游戏中GDP每天根据生产、消费和贸易自动计算。工业产出、居民消费、政府开支都会直接影响GDP。',
    strategy: 'GDP增长是核心目标之一。通过投资工业扩大产能、刺激居民消费、增加政府基建支出都可以拉动GDP增长。',
    examples: ['中国2023年GDP约126万亿人民币', '美国GDP约27万亿美元'],
    related: ['gdp-growth', 'inflation', 'unemployment'],
  },
  {
    id: 'gdp-growth',
    term: 'GDP增长率',
    category: 'economics',
    icon: '📊',
    definition: 'GDP较上一期的变化百分比，衡量经济增长速度。',
    formula: '增长率 = (本期GDP - 上期GDP) / 上期GDP × 100%',
    mechanic: '游戏中GDP增长受总需求影响。经济过热会伴随高通胀，衰退会导致失业增加。',
    strategy: '目标是保持2-4%的稳健增长。增长过快可能引发过热，负增长意味着经济衰退。',
    examples: ['中国改革开放后年均增长约9.5%', '发达国家通常增长1-2%'],
    related: ['gdp', 'business-cycle', 'inflation'],
  },
  {
    id: 'inflation',
    term: '通货膨胀',
    category: 'economics',
    icon: '💸',
    definition: '物价总水平持续上涨的现象，意味着货币购买力下降。',
    formula: '通胀率 = (本期CPI - 上期CPI) / 上期CPI × 100%',
    mechanic: '游戏中通胀主要由货币供应量和总需求决定。印钞、需求过热都会推高通胀。',
    strategy: '目标通胀率1-3%。超过5%需要加息收紧货币，低于0%的通缩需要降息刺激。',
    examples: ['津巴布韦恶性通胀率达百分之数百万', '日本曾长期陷入通缩'],
    related: ['cpi', 'interest-rate', 'money-supply'],
  },
  {
    id: 'deflation',
    term: '通货紧缩',
    category: 'economics',
    icon: '📉',
    definition: '物价总水平持续下跌，通常伴随经济衰退。',
    formula: '通胀率 < 0% 即为通缩',
    mechanic: '通缩时消费者推迟消费等待更低价格，企业减少投资，形成恶性循环。',
    strategy: '通缩比通胀更危险！立即大幅降息，增加政府支出，必要时开动印钞机。',
    examples: ['1929年大萧条', '日本失去的二十年'],
    related: ['inflation', 'interest-rate', 'recession'],
  },
  {
    id: 'unemployment',
    term: '失业率',
    category: 'economics',
    icon: '👥',
    definition: '劳动人口中正在寻找工作但未能就业的比例。',
    formula: '失业率 = 失业人数 / 劳动力总数 × 100%',
    mechanic: '游戏中失业主要来自工厂倒闭和产能过剩。补贴劳动密集型产业可以直接创造就业。',
    strategy: '自然失业率约3-5%。超过10%会引发社会动荡，超过15%随时可能爆发革命。',
    examples: ['大萧条时美国失业率达25%', '欧债危机时希腊失业率27%'],
    related: ['stability', 'okun-law', 'phillips-curve'],
  },
  {
    id: 'interest-rate',
    term: '基准利率',
    category: 'economics',
    icon: '🏦',
    definition: '中央银行设定的商业银行拆借利率，是货币政策的核心工具。',
    formula: '央行通过调节利率影响整个经济的资金成本',
    mechanic: '加息→借贷成本上升→投资消费减少→通胀下降但增长放缓。降息则相反。',
    strategy: '通胀高就加息，经济差就降息。利率也是调节汇率的重要工具。',
    examples: ['美联储2024年利率维持在5.25-5.5%', '零利率甚至负利率政策'],
    related: ['inflation', 'money-supply', 'exchange-rate'],
  },
  {
    id: 'national-debt',
    term: '国债',
    category: 'economics',
    icon: '💳',
    definition: '中央政府的未偿还债务总额。',
    formula: '债务率 = 国债余额 / GDP × 100%',
    mechanic: '发行国债获得即时资金，但每年要支付利息。债务过高会导致主权信用评级下降。',
    strategy: '债务率60%以下安全，100%以上进入警戒区，150%以上随时可能违约。借新还旧终有尽头。',
    examples: ['日本债务率超过260%', '欧债危机时希腊债务率180%'],
    related: ['debt-default', 'treasury', 'interest-rate'],
  },
  {
    id: 'debt-default',
    term: '主权违约',
    category: 'game-mechanic',
    icon: '💀',
    definition: '政府无法偿还到期国债本息，导致国家信用破产。',
    formula: '债务率 > 200% 且无法支付利息 = 违约GAME OVER',
    mechanic: '违约后资本外逃，货币剧烈贬值，国际融资渠道完全切断。',
    strategy: '发现苗头果断减支增税，不要等到债务雪球滚到无法收拾。',
    examples: ['2001年阿根廷违约', '2015年希腊债务违约'],
    related: ['national-debt', 'gameover-conditions', 'capital-flight'],
  },
  {
    id: 'stability',
    term: '社会稳定度',
    category: 'game-mechanic',
    icon: '⚖️',
    definition: '民众对政府的满意程度和社会整体安定程度。',
    formula: '稳定度 = f(失业, 通胀, 收入增长, 政府支持)',
    mechanic: '高失业、高通胀、生活水平下降都会降低稳定度。低于30%会有大规模抗议，低于15%政权崩溃。',
    strategy: '稳定压倒一切！控制失业和通胀是维持稳定的关键。适当增加福利可以收买人心。',
    examples: ['阿拉伯之春导火索是物价飞涨', '颜色革命通常伴随经济危机'],
    related: ['unemployment', 'inflation', 'approval-rating'],
  },
  {
    id: 'political-capital',
    term: '政治点数',
    category: 'game-mechanic',
    icon: '🎖️',
    definition: '推行改革所需的政治资本，代表政府的执政能力和威信。',
    formula: '每天自动恢复，稳定度越高恢复越快。每项政策改革都要消耗点数。',
    mechanic: '没有政治点数什么改革都推不动。重大改革需要大量点数。',
    strategy: '先攒够点数再动大手术，不要想着同时推十项改革。稳定了点数自然来。',
    examples: ['邓小平改革开放需要巨大政治勇气', '王安石变法阻力重重'],
    related: ['stability', 'reforms', 'policy'],
  },
  {
    id: 'treasury-balance',
    term: '财政收支',
    category: 'game-mechanic',
    icon: '💰',
    definition: '政府每天的收入减去支出。正数为盈余，负数为赤字。',
    formula: '收支余额 = 税收收入 + 国企利润 - 各项支出 - 债务利息',
    mechanic: '持续赤字会消耗国库并增加债务。持续盈余可以还债或投资。',
    strategy: '新手建议初期保持财政平衡，不要搞大规模赤字财政。',
    examples: ['北欧国家高税收高福利实现平衡', '美国长期双赤字'],
    related: ['taxes', 'national-debt', 'austerity'],
  },
  {
    id: 'taxes',
    term: '税收',
    category: 'game-mechanic',
    icon: '📊',
    definition: '政府的主要收入来源，包括所得税、关税、奢侈品税等。',
    formula: '税收 = 税基 × 税率',
    mechanic: '税率过低导致财政入不敷出，税率过高打击生产积极性并引发逃税。',
    strategy: '拉弗曲线存在！不是税率越高收入越多。建议所得税20-30%，关税适度保护。',
    examples: ['北欧税率达50%以上', '避税天堂税率接近0'],
    related: ['treasury-balance', 'laffer-curve', 'tax-evasion'],
  },
  {
    id: 'phillips-curve',
    term: '菲利普斯曲线',
    category: 'economics',
    icon: '📉',
    definition: '通胀与失业之间短期存在替代关系的经典经济学理论。',
    formula: '通胀↑ → 企业利润↑ → 扩大生产→ 失业↓（短期）',
    mechanic: '游戏中可以在短期内用较高通胀换取较低失业，但长期无效。',
    strategy: '可以短期用一下，但长期还是要回到均衡点。民众的通胀预期会调整。',
    examples: ['70年代滞胀打破了这一关系', '沃尔克用衰退根治通胀'],
    related: ['inflation', 'unemployment', 'stagflation'],
  },
  {
    id: 'okun-law',
    term: '奥肯定律',
    category: 'economics',
    icon: '🔗',
    definition: 'GDP增长率与失业率变化的经验关系。',
    formula: 'GDP每增长2%，失业率大约下降1个百分点。',
    mechanic: '游戏中严格遵循这一定律。保增长就是保就业。',
    strategy: '想要降低失业？最简单的办法就是把GDP增速拉上去。',
    examples: ['中国保八就是为了保就业', '08年四万亿计划'],
    related: ['gdp', 'unemployment', 'stimulus'],
  },
  {
    id: 'laffer-curve',
    term: '拉弗曲线',
    category: 'economics',
    icon: '⎍',
    definition: '税率与税收收入的倒U型关系。',
    formula: '税率0%和100%税收都是0，中间存在最优税率。',
    mechanic: '游戏中税率超过一定程度后税收反而开始下降。',
    strategy: '不要杀鸡取卵！找到你的最优税率点。供给学派减税可能反而增加税收。',
    examples: ['里根减税', '撒切尔主义'],
    related: ['taxes', 'supply-side', 'treasury-balance'],
  },
  {
    id: 'quantitative-easing',
    term: '量化宽松',
    category: 'economics',
    icon: '🖨️',
    definition: '中央银行在零利率下限后通过购买资产直接注入流动性。',
    formula: '简单说就是央行直接印钱买国债',
    mechanic: '游戏中可以随时印钞，但通胀后果立即显现。',
    strategy: '不到万不得已不要印！魏玛共和国、津巴布韦、委内瑞拉都是前车之鉴。',
    examples: ['美联储QE1-QE4', '日本QQE'],
    related: ['money-supply', 'inflation', 'interest-rate'],
  },
  {
    id: 'austerity',
    term: '财政紧缩',
    category: 'strategy',
    icon: '📉',
    definition: '通过削减支出和增加税收减少财政赤字。',
    formula: '增收减支 = 赤字下降 = 债务减速',
    mechanic: '紧缩可以恢复财政平衡，但短期会导致衰退和失业上升。',
    strategy: '债务危机时没有更好选择。长痛不如短痛，但注意稳定度不要崩了。',
    examples: ['欧债危机时希腊紧缩政策', 'IMF救助条件'],
    related: ['treasury-balance', 'national-debt', 'imf'],
  },
  {
    id: 'stimulus',
    term: '刺激政策',
    category: 'strategy',
    icon: '🚀',
    definition: '通过财政货币扩张拉动经济走出衰退。',
    formula: '政府支出↑ + 利率↓ = 总需求↑ = GDP↑',
    mechanic: '刺激可以立竿见影拉动增长，但代价是债务增加和未来的通胀。',
    strategy: '衰退时果断刺激，复苏后及时退出。不要一直打兴奋剂。',
    examples: ['罗斯福新政', '中国四万亿', '拜登通胀削减法案'],
    related: ['gdp-growth', 'interest-rate', 'keynesian'],
  },
  {
    id: 'supply-side',
    term: '供给侧改革',
    category: 'strategy',
    icon: '🏭',
    definition: '通过减税、放松管制、私有化提高经济体供给能力。',
    formula: '减税 + 放松监管 = 企业活力↑ = 产能↑ = 长期增长↑',
    mechanic: '供给侧改革效果需要时间才能显现，但可以从根本上改善经济结构。',
    strategy: '不要指望立竿见影。坚持几年，你会看到质的变化。',
    examples: ['里根经济学', '中国供给侧改革', '撒切尔私有化'],
    related: ['taxes', 'industry', 'productivity'],
  },
  {
    id: 'keynesian',
    term: '凯恩斯主义',
    category: 'strategy',
    icon: '📚',
    definition: '主张政府在衰退时主动干预，通过需求管理熨平经济周期。',
    formula: '衰退时政府花钱刺激，过热时紧缩降温。',
    mechanic: '游戏中这是最直观的操作方式，也是新手最容易上手的玩法。',
    strategy: '反周期操作！经济差的时候放水，经济热的时候收水。',
    examples: ['大萧条后凯恩斯主义成为主流', '08年危机各国救市'],
    related: ['stimulus', 'business-cycle', 'gdp-growth'],
  },
  {
    id: 'imported-inflation',
    term: '输入性通胀',
    category: 'economics',
    icon: '🌍',
    definition: '国际大宗商品价格上涨带来的国内通胀压力。',
    formula: '国际油价粮价↑ → 进口成本↑ → 国内物价↑',
    mechanic: '游戏中会通过随机事件触发。小国和资源匮乏国家更容易受冲击。',
    strategy: '建立战略储备，必要时实行价格管制，或者让本币升值。',
    examples: ['70年代石油危机', '2022年欧洲能源危机'],
    related: ['inflation', 'oil-shock', 'exchange-rate'],
  },
  {
    id: 'capital-flight',
    term: '资本外逃',
    category: 'game-mechanic',
    icon: '💸',
    definition: '经济不稳定时外资和本国资本快速流出国外。',
    formula: '风险↑ → 汇率贬值预期↑ → 资本外流 → 外储减少 → 货币危机',
    mechanic: '资本外逃会快速消耗外汇储备，引发本币贬值，进一步加剧通胀。',
    strategy: '可以实行资本管制，但会打击外资信心。最好的办法是从源头恢复信心。',
    examples: ['97年亚洲金融危机', '阿根廷资本管制'],
    related: ['exchange-rate', 'currency-crisis', 'speculation'],
  },
  {
    id: 'currency-crisis',
    term: '货币危机',
    category: 'game-mechanic',
    icon: '💱',
    definition: '固定汇率制下投机攻击导致外汇储备耗尽，被迫贬值。',
    formula: '外储耗尽 = 无法维持汇率 = 货币大幅贬值 = GAME OVER',
    mechanic: '游戏中高通胀、高外债、低外储会触发货币危机。',
    strategy: '要么趁早主动贬值，要么大幅加息保卫汇率。犹豫就会败北。',
    examples: ['92年英镑危机', '97泰铢崩盘'],
    related: ['capital-flight', 'exchange-rate', 'speculation'],
  },
  {
    id: 'business-cycle',
    term: '经济周期',
    category: 'economics',
    icon: '♻️',
    definition: '经济扩张与收缩交替出现的周期性波动。',
    formula: '繁荣 → 过热 → 衰退 → 复苏 → 繁荣...',
    mechanic: '游戏中经济会自然产生周期。你的政策可以放大或缩小波动，但无法完全消除。',
    strategy: '不要追涨杀跌！在别人贪婪时恐惧，在别人恐惧时贪婪。反周期操作是王道。',
    examples: ['十年一次的金融危机似乎成为规律', '康德拉季耶夫长波'],
    related: ['gdp-growth', 'recession', 'overheating'],
  },
  {
    id: 'stagflation',
    term: '滞胀',
    category: 'economics',
    icon: '😵',
    definition: '经济停滞+高通胀+高失业同时出现的最糟糕局面。',
    formula: '低增长 + 高通胀 + 高失业 = 经济学家噩梦',
    mechanic: '游戏中错误的政策组合（如供给冲击下继续放水）会导致滞胀。',
    strategy: '长痛不如短痛！沃尔克法则：大幅加息根治通胀，哪怕引发衰退。',
    examples: ['1970年代美国大滞胀', '英国病'],
    related: ['inflation', 'unemployment', 'recession'],
  },
  {
    id: 'overheating',
    term: '经济过热',
    category: 'economics',
    icon: '🔥',
    definition: '总需求超过总供给能力，表现为高增长伴随高通胀。',
    formula: 'GDP超潜力增长 = 产能瓶颈 = 物价普涨',
    mechanic: '游戏中过度刺激、增长过快会导致过热。',
    strategy: '及时踩刹车！适度降温可以避免硬着陆。',
    examples: ['日本泡沫经济', '2007年中国经济过热'],
    related: ['inflation', 'gdp-growth', 'hard-landing'],
  },
  {
    id: 'recession',
    term: '经济衰退',
    category: 'economics',
    icon: '📉',
    definition: 'GDP连续两个季度负增长。',
    formula: '连续两个季度GDP环比负增长 = 技术性衰退',
    mechanic: '游戏中衰退时失业上升，税收减少，社会矛盾加剧。',
    strategy: '果断刺激！不要让衰退演变成萧条。',
    examples: ['2008年全球金融危机', '2020年新冠衰退'],
    related: ['gdp-growth', 'unemployment', 'stimulus'],
  },
  {
    id: 'hard-landing',
    term: '硬着陆',
    category: 'strategy',
    icon: '💥',
    definition: '经济降温过快导致急剧衰退。',
    formula: '紧缩过猛 = 泡沫破裂 = 银行危机 = 大衰退',
    mechanic: '游戏中骤然大幅紧缩可能引发硬着陆。',
    strategy: '软着陆需要精准调控，宁可慢一点也不要急刹车。',
    examples: ['90年日本房地产泡沫破裂', '美国次贷危机'],
    related: ['overheating', 'recession', 'bubbles'],
  },
  {
    id: 'bubbles',
    term: '资产泡沫',
    category: 'economics',
    icon: '🫧',
    definition: '资产价格严重脱离基本面的非理性上涨。',
    formula: '流动性过剩 + 乐观情绪 = 价格脱离基本面 = 泡沫',
    mechanic: '游戏中长期低利率会催生泡沫。泡沫总有破灭的一天。',
    strategy: '与其事后救市不如事前防泡沫。但刺破泡沫需要勇气。',
    examples: ['郁金香狂热', '南海泡沫', '互联网泡沫', '房地产泡沫'],
    related: ['interest-rate', 'hard-landing', 'financial-crisis'],
  },
  {
    id: 'nations-system',
    term: '七大可玩国家',
    category: 'game-mechanic',
    icon: '🌍',
    definition: '选择你的国家，改写1836-1936百年历史。',
    mechanic: `🇩🇪 普鲁士【教程推荐】
  目标：统一德意志，建立第二帝国
  难度：★★☆☆☆

🇬🇧 大英帝国
  目标：维持日不落帝国霸权
  难度：★☆☆☆☆

🇫🇷 法兰西
  目标：经历革命与帝国的轮回
  难度：★★★☆☆

🇷🇺 俄罗斯
  目标：农奴制改革or十月革命？
  难度：★★★★☆

🇨🇳 大清帝国
  目标：洋务运动vs明治维新
  难度：★★★★★【地狱】

🇺🇸 美利坚
  目标：内战统一，山巅之城
  难度：★★★☆☆

🇯🇵 德川幕府
  目标：明治维新，脱亚入欧
  难度：★★★★☆`,
    strategy: '新手推荐普鲁士。三次王朝战争，统一德意志，铁血宰相的剧本已经写好了。',
    related: ['historic-phases', 'victory-conditions'],
  },
  {
    id: 'historic-phases',
    term: '五大历史阶段',
    category: 'game-mechanic',
    icon: '📅',
    definition: '1836-1936，人类最激动人心的一百年。',
    mechanic: `【1836-1848】工业黎明
  蒸汽机的浓烟升起，旧制度苟延残喘
  关键事件：鸦片战争、宪章运动

【1848-1871】革命之年
  民族之春席卷欧洲
  关键事件：1848革命、巴黎公社

【1871-1890】统一时代
  铁血宰相统一德意志
  关键事件：第二次工业革命、大萧条

【1890-1914】帝国主义
  瓜分世界的狂潮
  关键事件：布尔战争、日俄战争

【1914-1936】大战与革命
  终结一切战争的战争
  关键事件：一战、十月革命、大萧条`,
    strategy: '每个阶段都会触发强制历史事件。历史的车轮是挡不住的。',
    related: ['historic-events', 'nations-system'],
  },
  {
    id: 'ideology-system',
    term: '五大意识形态路线',
    category: 'game-mechanic',
    icon: '⚖️',
    definition: '你走哪条路？',
    mechanic: `👑 保守主义
  王座与祭坛
  支持者：地主、教士、军队

🎩 自由主义
  自由市场、宪政民主
  支持者：实业家、知识分子

☭ 社会主义
  全世界无产者联合起来
  支持者：工会、农民

⚔️ 民族主义
  血与铁，国家统一
  支持者：军队、小资产阶级

🖤 反动主义
  不仅拒绝进步，还要倒退
  支持者：极端分子、秘密警察`,
    strategy: '没有最好的意识形态，只有最适合国情的。记住：同时得罪所有人的政府撑不过三个月。',
    related: ['interest-groups', 'laws'],
  },
  {
    id: 'victory-conditions',
    term: '十二种结局',
    category: 'game-mechanic',
    icon: '🏆',
    definition: '每一种选择，都会导向不同的结局。',
    mechanic: `【完美结局】
🌅 日不落帝国 - 英国统治世界
⚔️ 德意志统一 - 铁血帝国
🔴 十月革命 - 苏维埃俄国
☀️ 明治维新 - 脱亚入欧
🦅 天定命运 - 美国横跨两洋

【隐藏结局】
🔴 巴黎公社胜利 - 人类历史从此改变
👑 反动派的胜利 - 1900年还有农奴制
🐉 同治中兴 - 大清洋务运动成功

【失败结局】
⚔️ 国家内战 - 兄弟阋墙
🔥 革命爆发 - 旧秩序崩溃
💸 国家破产 - 金融崩溃
📉 大萧条 - 无尽的失业`,
    strategy: '不一定要建立完美的国家。维持农奴制到1900年也是一种成就。',
    related: ['nations-system', 'ideology-system'],
  },
  {
    id: 'tutorial-summary',
    term: '新手完整攻略',
    category: 'strategy',
    icon: '📖',
    definition: '从零开始的治国完整路线图。',
    strategy: `【第1-30天】观察期：什么都不要改！先按空格暂停，熟悉各个面板。
【第31-100天】稳定期：保持1倍速，不要乱动。目标：不破产、不崩溃。
【第101-365天】微调期：可以开始小幅调整税率和政策。每次只改一项。
【第366天+】改革期：你已经是合格的执政者了，开始你的强国之路吧！

⚠️ 新手十大戒律：
1. 不要一上来就改所有税率
2. 不要开局就印钱
3. 不要把利率调到0或20%
4. 不要同时推5项以上改革
5. 通胀超过5%就要警惕了
6. 稳定度掉到50以下先什么都别干
7. 国库见底前就要开源节流
8. 债务率超过100%就要开始还债
9. 失业率超过10%必须想办法
10. 输了没关系，再来一局！`,
    related: ['stability', 'treasury-balance', 'political-capital'],
  },
  {
    id: 'keyboard-shortcuts',
    term: '快捷键大全',
    category: 'interface',
    icon: '⌨️',
    definition: '提高操作效率的键盘快捷键。',
    examples: [
      '空格 - 暂停/继续',
      'F1 - 打开帮助中心',
      'ESC - 关闭面板/暂停',
      '1/2/3/4 - 切换游戏速度',
      'Ctrl+S - 快速存档',
      'Ctrl+L - 快速读档',
      'Ctrl+M - 打开存档菜单',
    ],
    related: ['game-ui', 'settings'],
  },
  {
    id: 'interest-groups',
    term: '利益集团',
    category: 'game-mechanic',
    icon: '🏛️',
    definition: '国家内部拥有共同利益和政治主张的人群。他们会支持或反对你的政策。',
    mechanic: '8大利益集团：地主、实业家、工会、教士、军队、知识分子、小资产阶级、农民。\n每个集团拥有权力值，决定他们对政局的影响力。\n支持度决定他们是效忠者还是激进分子。',
    strategy: '不要同时得罪所有集团！军方支持你发动政变，工会支持你搞社会主义，地主支持君主专制。',
    examples: ['P社维多利亚3经典系统', '没有任何改革能让所有人满意'],
    related: ['laws', 'approval', 'radicals'],
  },
  {
    id: 'laws',
    term: '法律系统',
    category: 'game-mechanic',
    icon: '📜',
    definition: '国家的根本制度，决定了权力的分配方式。',
    mechanic: `四大法律维度：
  • 政府形式：专制→立宪→共和
  • 经济制度：自由放任→国家干预→福利国家
  • 社会制度：农奴制→世俗化→普选权
  • 军事制度：征兵制→职业化`,
    strategy: '改革需要时间！一项法律可能需要数年才能通过。强行改革会触发内战。',
    examples: ['解放农奴是你要做的第一个重大抉择'],
    related: ['interest-groups', 'reform', 'legitimacy'],
  },
  {
    id: 'population-strata',
    term: '人口阶层',
    category: 'game-mechanic',
    icon: '👥',
    definition: '每个人口都属于特定的社会阶层，有自己的需求和政治倾向。',
    mechanic: `十大社会阶层：
  贵族 → 资本家 → 官僚 → 军官 → 知识分子
  店主 → 工人 → 仆役 → 农民
  
  每个阶层有：识字率、生活水平、收入、消费结构`,
    strategy: '工业化会让农民变成工人。工人政治觉悟更高，也更容易成为激进分子。',
    examples: ['60%以上的人口是农民是所有前现代国家的标配'],
    related: ['standard-of-living', 'militancy', 'industrialization'],
  },
  {
    id: 'technology-tree',
    term: '科技树',
    category: 'game-mechanic',
    icon: '🔬',
    definition: '从蒸汽机到内燃机，人类的每一次技术突破都在重塑世界格局。',
    mechanic: `三大科技线：
  • 生产：蒸汽机→铁路→电力→内燃机
  • 军事：后装枪→无畏舰→机关枪
  • 社会：公共卫生→普选权→科学管理`,
    strategy: '合成氨是最重要的技术！没有之一。哈伯法让农业产出翻倍。',
    examples: ['铁路是国家的血管', '电力是第二次工业革命的核心'],
    related: ['industrialization', 'military-power', 'modernization'],
  },
  {
    id: 'historic-events',
    term: '历史事件',
    category: 'game-mechanic',
    icon: '📅',
    definition: '真实历史上的重大事件会按时间线触发，让你亲身经历那段波澜壮阔的岁月。',
    mechanic: `已实装的历史事件：
  • 1845 马铃薯大饥荒
  • 1848 民族之春大革命
  • 1871 巴黎公社
  • 1873 维也纳股灾
  • 1840 鸦片战争`,
    strategy: '历史的洪流不可逆转，但你可以选择游泳的姿势。',
    examples: ['每一次危机都是改革的契机'],
    related: ['crisis', 'reform', 'alternate-history'],
  },
  {
    id: 'militancy',
    term: '斗争性',
    category: 'game-mechanic',
    icon: '✊',
    definition: '民众的不满程度，过高会导致罢工、暴动、甚至革命。',
    mechanic: '斗争性来源于：饥饿、失业、赋税、政治压迫。\n革命需要：足够多的激进分子 + 政府合法性崩溃 + 军队动摇。',
    strategy: '面包加马戏团是维持统治的千古真理。或者，你也可以选择刺刀。',
    related: ['radicals', 'revolution', 'standard-of-living'],
  },
  {
    id: 'legitimacy',
    term: '统治合法性',
    category: 'game-mechanic',
    icon: '👑',
    definition: '人民为什么愿意服从你的统治？',
    formula: '合法性 = 传统 + 政绩 + 武力威慑 - 腐败',
    mechanic: '民主制合法性最高，但你需要讨好选民。\n专制合法性来源于传统和军队。\n合法性归零=政府倒台。',
    strategy: '打一场对外战争是转移国内矛盾的千古妙计。',
    examples: ['水能载舟，亦能覆舟'],
    related: ['interest-groups', 'revolution', 'approval'],
  },
  {
    id: 'achievements',
    term: '成就系统',
    category: 'interface',
    icon: '🏆',
    definition: '完成各种挑战，解锁隐藏成就。',
    strategy: '有些成就互相冲突。想当"民主灯塔"就拿不到"反动的胜利"。',
    examples: ['全世界无产者联合起来：建立社会主义政权', '铁血宰相：统一德意志', '反动的胜利：1900年还在搞农奴制'],
    related: ['historic-events', 'alternate-history'],
  },
]

export function searchConcepts(term: string): Concept[] {
  const searchTerm = term.toLowerCase()
  return CONCEPTS_GLOSSARY.filter(c => 
    c.term.toLowerCase().includes(searchTerm) ||
    c.definition.toLowerCase().includes(searchTerm) ||
    c.category.toLowerCase().includes(searchTerm)
  )
}

export function getConceptsByCategory(category: Concept['category']): Concept[] {
  return CONCEPTS_GLOSSARY.filter(c => c.category === category)
}

export function getConcept(id: string): Concept | undefined {
  return CONCEPTS_GLOSSARY.find(c => c.id === id)
}
