export interface RandomEvent {
  id: string
  name: string
  description: string
  icon: string
  category: 'economic' | 'political' | 'social' | 'international' | 'disaster'
  mtth: number
  minDay: number
  maxDay?: number
  oneShot?: boolean
  fireOnlyOnce?: boolean
  conditions?: {
    minStability?: number
    maxStability?: number
    minApproval?: number
    maxApproval?: number
    minInflation?: number
    maxInflation?: number
    minUnemployment?: number
    maxUnemployment?: number
    requiresFocus?: string[]
    excludesFocus?: string[]
  }
  options: Array<{
    id: string
    name: string
    description: string
    effects: Record<string, number>
    groupOpinion?: Record<string, number>
    aiWeight?: number
  }>
}

export const USA_RANDOM_EVENTS: RandomEvent[] = [
  {
    id: 'market_crash_minor',
    name: '股市小幅下跌',
    description: '道琼斯指数今日下跌2%，投资者对通胀数据感到担忧。分析师称这只是技术性调整。',
    icon: '📉',
    category: 'economic',
    mtth: 60,
    minDay: 0,
    conditions: {},
    options: [
      {
        id: 'a',
        name: '发表安抚讲话',
        description: '总统发表电视讲话，对经济表示信心。',
        effects: { approval: 2, stability: 1 },
        groupOpinion: { industrialists: 5, media_establishment: 3 },
      },
      {
        id: 'b',
        name: '置之不理',
        description: '市场会自行调整，不需要政治介入。',
        effects: { gdpGrowth: -0.1 },
        groupOpinion: { industrialists: -3, silicon_valley: -2 },
      },
      {
        id: 'c',
        name: '批评美联储',
        description: '指责美联储加息过快。',
        effects: { approval: 1, stability: -2 },
        groupOpinion: { nationalist_populists: 5, military_industrial: -3 },
      },
    ],
  },
  {
    id: 'mass_shooting',
    name: '大规模枪击事件',
    description: '又一起大规模枪击事件震惊全国。媒体24小时滚动报道。枪支管制辩论再次升温。',
    icon: '💔',
    category: 'social',
    mtth: 90,
    minDay: 0,
    conditions: {},
    options: [
      {
        id: 'a',
        name: '呼吁控枪',
        description: '再次呼吁常识性枪支立法。',
        effects: { approval: -3, stability: -5 },
        groupOpinion: { media_establishment: 10, nationalist_populists: -15, labor_unions: 5 },
      },
      {
        id: 'b',
        name: '表示哀悼',
        description: '这是一个心理健康问题，向遇难者表示哀悼。',
        effects: { approval: 1 },
        groupOpinion: { nationalist_populists: 5, media_establishment: -5 },
      },
      {
        id: 'c',
        name: '建议武装教师',
        description: '唯一能阻止坏人持枪的是好人持枪。',
        effects: { approval: -5, stability: -8 },
        groupOpinion: { nationalist_populists: 15, media_establishment: -10 },
      },
    ],
  },
  {
    id: 'fed_hikes_rates',
    name: '美联储加息',
    description: '美联储宣布加息25个基点以对抗通胀。市场反应剧烈。',
    icon: '🏦',
    category: 'economic',
    mtth: 75,
    minDay: 60,
    conditions: { minInflation: 0.03 },
    options: [
      {
        id: 'a',
        name: '支持美联储',
        description: '支持美联储抗击通胀的决心。',
        effects: { approval: -2, inflation: -0.5, gdpGrowth: -0.3 },
        groupOpinion: { industrialists: 5, labor_unions: -5 },
      },
      {
        id: 'b',
        name: '批评美联储',
        description: '美联储正在将经济推入衰退。',
        effects: { approval: 3, inflation: 0.3, stability: -3 },
        groupOpinion: { labor_unions: 8, industrialists: -8 },
      },
      {
        id: 'c',
        name: '保持沉默',
        description: '美联储是独立的。',
        effects: { approval: -1 },
        groupOpinion: {},
      },
    ],
  },
  {
    id: 'hurricane_disaster',
    name: '飓风袭击海岸',
    description: '四级飓风袭击墨西哥湾沿岸，造成数十亿美元损失。需要联邦紧急援助。',
    icon: '🌀',
    category: 'disaster',
    mtth: 180,
    minDay: 120,
    conditions: {},
    options: [
      {
        id: 'a',
        name: '宣布紧急状态',
        description: '立即部署联邦紧急事务管理局。',
        effects: { approval: 8, treasury: -500, stability: 5 },
        groupOpinion: { media_establishment: 10 },
      },
      {
        id: 'b',
        name: '大手笔救灾资金',
        description: '批准2000亿美元救灾一揽子计划。',
        effects: { approval: 12, treasury: -2000, stability: 8, inflation: 0.5 },
        groupOpinion: { media_establishment: 15, industrialists: 5 },
      },
      {
        id: 'c',
        name: '让各州负责',
        description: '联邦政府不应该插手地方事务。',
        effects: { approval: -15, stability: -10 },
        groupOpinion: { nationalist_populists: 10, media_establishment: -15, labor_unions: -10 },
      },
    ],
  },
  {
    id: 'twitter_controversy',
    name: '推特争议',
    description: '总统一条深夜推特引发媒体风暴。#辞职开始 trending。',
    icon: '🐦',
    category: 'political',
    mtth: 45,
    minDay: 0,
    conditions: { maxStability: 65 },
    options: [
      {
        id: 'a',
        name: '删帖道歉',
        description: '删除推文并道歉。',
        effects: { approval: -2, stability: 1 },
        groupOpinion: { media_establishment: 5, nationalist_populists: -8 },
      },
      {
        id: 'b',
        name: '加倍坚持',
        description: '发更多推特捍卫立场。',
        effects: { approval: 3, stability: -8 },
        groupOpinion: { nationalist_populists: 12, media_establishment: -10 },
      },
      {
        id: 'c',
        name: '发言人澄清',
        description: '让新闻秘书解释总统的真实意思。',
        effects: { approval: -1, stability: -2 },
        groupOpinion: { media_establishment: 2 },
      },
    ],
  },
  {
    id: 'oil_spike',
    name: '油价暴涨',
    description: 'OPEC宣布减产，汽油价格飙升到每加仑4美元以上。选民愤怒。',
    icon: '⛽',
    category: 'economic',
    mtth: 100,
    minDay: 30,
    conditions: {},
    options: [
      {
        id: 'a',
        name: '释放战略石油储备',
        description: '从战略石油储备中释放100万桶/日。',
        effects: { approval: 6, inflation: -0.5, politicalCapital: 10 },
        groupOpinion: { labor_unions: 5, nationalist_populists: 8 },
      },
      {
        id: 'b',
        name: '推动绿色能源',
        description: '这正是我们需要能源转型的原因。',
        effects: { approval: -8, stability: -5, gdpGrowth: 0.5 },
        groupOpinion: { silicon_valley: 10, nationalist_populists: -15 },
      },
      {
        id: 'c',
        name: '指责石油公司',
        description: '石油公司正在贪婪地牟取暴利。',
        effects: { approval: 5, stability: -3 },
        groupOpinion: { labor_unions: 10, industrialists: -12 },
      },
    ],
  },
  {
    id: 'congress_hearing',
    name: '国会听证会丑闻',
    description: '一位高级官员在国会听证会上爆出惊人证词。水门事件级别的丑闻正在发酵。',
    icon: '⚖️',
    category: 'political',
    mtth: 150,
    minDay: 100,
    conditions: { maxStability: 50 },
    options: [
      {
        id: 'a',
        name: '解雇相关人员',
        description: '立即解雇所有相关人员，划清界限。',
        effects: { approval: 5, stability: -10, politicalCapital: -20 },
        groupOpinion: { media_establishment: 10 },
      },
      {
        id: 'b',
        name: '坚决否认',
        description: '这是猎巫！彻头彻尾的政治迫害！',
        effects: { approval: 8, stability: -20 },
        groupOpinion: { nationalist_populists: 15, media_establishment: -20 },
      },
      {
        id: 'c',
        name: '成立特别检察官',
        description: '我们需要对真相进行全面独立的调查。',
        effects: { approval: 2, stability: -15, politicalCapital: -30 },
        groupOpinion: { media_establishment: 15, industrialists: 5 },
      },
    ],
  },
  {
    id: 'tech_layoffs',
    name: '科技大裁员',
    description: '硅谷大型科技公司宣布集体裁员数万人。整个行业陷入恐慌。',
    icon: '💼',
    category: 'economic',
    mtth: 120,
    minDay: 200,
    conditions: { minUnemployment: 0.045 },
    options: [
      {
        id: 'a',
        name: '批评CEO',
        description: 'CEO们应该感到羞耻。',
        effects: { approval: 5, unemployment: 0.3 },
        groupOpinion: { labor_unions: 15, silicon_valley: -20 },
      },
      {
        id: 'b',
        name: '提供失业救济',
        description: '扩大失业救济金覆盖范围。',
        effects: { approval: 8, treasury: -800, unemployment: 0.1 },
        groupOpinion: { labor_unions: 10, industrialists: -5 },
      },
      {
        id: 'c',
        name: '这是市场调整',
        description: '裁员对长期健康是必要的。',
        effects: { approval: -10, stability: -5 },
        groupOpinion: { silicon_valley: 10, labor_unions: -15 },
      },
    ],
  },
  {
    id: 'supreme_court_shocker',
    name: '最高法院震惊裁决',
    description: '最高法院5-4裁决推翻了几十年的先例。全国爆发抗议。',
    icon: '🏛️',
    category: 'political',
    mtth: 200,
    minDay: 150,
    conditions: {},
    options: [
      {
        id: 'a',
        name: '谴责裁决',
        description: '这是对司法的嘲弄。国会必须行动！',
        effects: { approval: -3, stability: -15 },
        groupOpinion: { labor_unions: 15, nationalist_populists: -15 },
      },
      {
        id: 'b',
        name: '赞扬裁决',
        description: '宪法得到了维护！',
        effects: { approval: -5, stability: -10 },
        groupOpinion: { nationalist_populists: 20, labor_unions: -15 },
      },
      {
        id: 'c',
        name: '尊重法院',
        description: '我们尊重最高法院的独立性。',
        effects: { approval: -8, stability: -8 },
        groupOpinion: { industrialists: 5, media_establishment: -5 },
      },
    ],
  },
  {
    id: 'bank_failure',
    name: '地区银行倒闭',
    description: '一家中型地区银行因挤兑宣布倒闭。FDIC介入，但金融恐慌正在蔓延。',
    icon: '💥',
    category: 'economic',
    mtth: 180,
    minDay: 250,
    conditions: { maxStability: 55, minInflation: 0.04 },
    options: [
      {
        id: 'a',
        name: '全面救助',
        description: '政府兜底所有存款，阻止传染。',
        effects: { approval: 3, stability: 10, treasury: -1500 },
        groupOpinion: { industrialists: 20, labor_unions: -10 },
      },
      {
        id: 'b',
        name: '只保储户',
        description: '保护储户，但让投资者和管理层承担后果。',
        effects: { approval: 10, stability: 5, treasury: -800 },
        groupOpinion: { labor_unions: 10, industrialists: 5 },
      },
      {
        id: 'c',
        name: '让市场教训他们',
        description: '这是道德风险。让他们破产！',
        effects: { approval: 2, stability: -20, gdpGrowth: -1.0 },
        groupOpinion: { nationalist_populists: 15, industrialists: -25, silicon_valley: -20 },
      },
    ],
  },
  {
    id: 'ufo_sighting',
    name: 'UFO目击轰动',
    description: '多名军方飞行员目击UFO的高清视频被泄露。#Aliens正在疯传。',
    icon: '🛸',
    category: 'social',
    mtth: 250,
    minDay: 300,
    conditions: {},
    fireOnlyOnce: true,
    options: [
      {
        id: 'a',
        name: '成立UFO办公室',
        description: '成立国防部UFO识别办公室。',
        effects: { approval: 8, politicalCapital: 15 },
        groupOpinion: { military_industrial: 5, silicon_valley: 10 },
      },
      {
        id: 'b',
        name: '淡化处理',
        description: '这可能是无人机或者天气现象。',
        effects: { approval: -2, stability: -2 },
        groupOpinion: { media_establishment: 5, nationalist_populists: -5 },
      },
      {
        id: 'c',
        name: '全面公开',
        description: '美国人民有权知道真相。立即解密一切！',
        effects: { approval: 20, stability: -30, politicalCapital: 50 },
        groupOpinion: { nationalist_populists: 25, military_industrial: -25 },
      },
    ],
  },
  {
    id: 'rail_strike',
    name: '全国铁路大罢工',
    description: '铁路工人投票决定全国大罢工。整个国家的供应链即将停止运转。',
    icon: '🚂',
    category: 'social',
    mtth: 220,
    minDay: 180,
    conditions: { maxStability: 50 },
    options: [
      {
        id: 'a',
        name: '支持工人',
        description: '工人应该有体面的工资和休假！',
        effects: { approval: 5, stability: -15, inflation: 2.0, gdpGrowth: -1.0 },
        groupOpinion: { labor_unions: 25, industrialists: -20 },
      },
      {
        id: 'b',
        name: '强制调解',
        description: '召集劳资双方到白宫谈判。',
        effects: { approval: 2, stability: -5, inflation: 0.5 },
        groupOpinion: { labor_unions: 5, industrialists: 5 },
      },
      {
        id: 'c',
        name: '援引铁路劳工法',
        description: '强制工人复工。经济不能停。',
        effects: { approval: -10, stability: 5 },
        groupOpinion: { industrialists: 20, labor_unions: -30 },
      },
    ],
  },
  {
    id: 'celebrity_endorsement',
    name: '名人背书',
    description: '一位好莱坞一线明星公开表示支持你的政策。粉丝们沸腾了！',
    icon: '⭐',
    category: 'social',
    mtth: 35,
    minDay: 0,
    options: [
      {
        id: 'a',
        name: '转发感谢',
        description: '发推表示感谢。',
        effects: { approval: 3 },
        groupOpinion: { media_establishment: 5 },
      },
      {
        id: 'b',
        name: '邀请来白宫',
        description: '邀请他来白宫拍照。',
        effects: { approval: 5, politicalCapital: 5 },
        groupOpinion: { media_establishment: 10, nationalist_populists: -5 },
      },
      {
        id: 'c',
        name: '关我屁事',
        description: '我是总统，不是应援团团长。',
        effects: { approval: -2 },
        groupOpinion: { nationalist_populists: 5, media_establishment: -10 },
      },
    ],
  },
  {
    id: 'fox_news_interview',
    name: '福克斯专访',
    description: '福克斯新闻邀请你接受黄金时段专访。这是讨好基本盘的好机会。',
    icon: '📺',
    category: 'political',
    mtth: 40,
    minDay: 0,
    options: [
      {
        id: 'a',
        name: '去！重拳出击！',
        description: '在镜头前痛斥假新闻。',
        effects: { approval: 4, stability: -2 },
        groupOpinion: { nationalist_populists: 10, media_establishment: -5 },
      },
      {
        id: 'b',
        name: '保持总统风范',
        description: '表现得庄严而有分寸。',
        effects: { approval: 2 },
        groupOpinion: { industrialists: 3 },
      },
      {
        id: 'c',
        name: '不去，太偏向了',
        description: '总统不应该只接受一家媒体的采访。',
        effects: { approval: -3 },
        groupOpinion: { nationalist_populists: -10, media_establishment: 5 },
      },
    ],
  },
  {
    id: 'congressman_scandal',
    name: '议员丑闻',
    description: '你党内一位重要议员被爆出入室盗窃。媒体在问你的立场。',
    icon: '😱',
    category: 'political',
    mtth: 50,
    minDay: 50,
    options: [
      {
        id: 'a',
        name: '切割！立即切割！',
        description: '发表声明强烈谴责。',
        effects: { approval: 1, stability: 2 },
        groupOpinion: { media_establishment: 5 },
      },
      {
        id: 'b',
        name: '表示支持',
        description: '他是个好人，只是犯了个错。',
        effects: { approval: -4 },
        groupOpinion: {},
      },
      {
        id: 'c',
        name: '无可奉告',
        description: '这是正在进行的法律事务。',
        effects: { approval: -1 },
        groupOpinion: {},
      },
    ],
  },
  {
    id: 'burger_photo_op',
    name: '汉堡照片门',
    description: '你在麦当劳点汉堡的照片被拍了。社交媒体正在热议你点了什么。',
    icon: '🍔',
    category: 'social',
    mtth: 30,
    minDay: 0,
    options: [
      {
        id: 'a',
        name: '发推：巨无霸真棒！',
        description: '与民同乐！',
        effects: { approval: 4 },
        groupOpinion: { nationalist_populists: 5 },
      },
      {
        id: 'b',
        name: '批评媒体无聊',
        description: '我们有更重要的国家大事要讨论。',
        effects: { approval: 1 },
        groupOpinion: { media_establishment: -5 },
      },
      {
        id: 'c',
        name: '宣布这是假照片',
        description: '这是AI生成的假新闻！',
        effects: { approval: 2, stability: -3 },
        groupOpinion: { nationalist_populists: 8, media_establishment: -10 },
      },
    ],
  },
  {
    id: 'weather_report',
    name: '历史性暴风雪',
    description: '历史性暴风雪袭击东海岸。国家气象局建议人们待在家里。',
    icon: '❄️',
    category: 'disaster',
    mtth: 60,
    minDay: 0,
    options: [
      {
        id: 'a',
        name: '宣布联邦紧急状态',
        description: '立即部署联邦资源。',
        effects: { approval: 3, treasury: -100 },
        groupOpinion: {},
      },
      {
        id: 'b',
        name: '让各州自己处理',
        description: '他们最了解当地情况。',
        effects: { approval: -2 },
        groupOpinion: { nationalist_populists: 3 },
      },
      {
        id: 'c',
        name: '发推：注意安全！',
        description: '大家都注意安全！',
        effects: { approval: 1 },
        groupOpinion: {},
      },
    ],
  },
  {
    id: 'stock_all_time_high',
    name: '股市历史新高',
    description: '标普500创历史新高！CNBC全天在放你的功绩。',
    icon: '📈',
    category: 'economic',
    mtth: 45,
    minDay: 0,
    options: [
      {
        id: 'a',
        name: '发推庆祝！',
        description: '都是我的功劳！',
        effects: { approval: 3 },
        groupOpinion: { industrialists: 8, silicon_valley: 5 },
      },
      {
        id: 'b',
        name: '提醒泡沫风险',
        description: '不要被虚假繁荣冲昏头脑。',
        effects: { approval: -2 },
        groupOpinion: { labor_unions: 5 },
      },
      {
        id: 'c',
        name: '保持沉默',
        description: '市场有涨就有跌。',
        effects: {},
        groupOpinion: {},
      },
    ],
  },
  {
    id: 'snl_sketch',
    name: '周六夜现场恶搞',
    description: 'SNL恶搞了你的演讲。演员模仿得惟妙惟肖。全网都在笑。',
    icon: '🎭',
    category: 'social',
    mtth: 55,
    minDay: 30,
    options: [
      {
        id: 'a',
        name: '邀请他们来白宫',
        description: '幽默是最好的回应。',
        effects: { approval: 5 },
        groupOpinion: { media_establishment: 10 },
      },
      {
        id: 'b',
        name: '公开表示被冒犯',
        description: '这是对总统职位的不尊重！',
        effects: { approval: -4, stability: -2 },
        groupOpinion: { nationalist_populists: 5, media_establishment: -10 },
      },
      {
        id: 'c',
        name: '说自己还没看',
        description: '我太忙了没时间看电视。',
        effects: { approval: -1 },
        groupOpinion: {},
      },
    ],
  },
  {
    id: 'gas_price_tweet',
    name: '油价推文大战',
    description: '一个普通美国人发推特抱怨油价。几百万人在艾特你。',
    icon: '⛽',
    category: 'economic',
    mtth: 35,
    minDay: 0,
    options: [
      {
        id: 'a',
        name: '骂石油公司贪婪',
        description: '大型石油公司正在掠夺你们！',
        effects: { approval: 5 },
        groupOpinion: { labor_unions: 5, industrialists: -10 },
      },
      {
        id: 'b',
        name: '怪拜登/奥巴马',
        description: '这是上届政府留下的烂摊子！',
        effects: { approval: 4 },
        groupOpinion: { nationalist_populists: 10 },
      },
      {
        id: 'c',
        name: '承诺立即调查',
        description: '我已经指示司法部调查价格欺诈。',
        effects: { approval: 3, politicalCapital: 5 },
        groupOpinion: {},
      },
    ],
  },
  {
    id: 'whitehouse_intruder',
    name: '白宫入侵者',
    description: '一个翻过白宫围栏的人在草坪上跑了15分钟才被抓住。特勤局脸都丢光了。',
    icon: '🏃',
    category: 'political',
    mtth: 80,
    minDay: 100,
    options: [
      {
        id: 'a',
        name: '解雇特勤局局长',
        description: ' Heads must roll!',
        effects: { politicalCapital: 10, stability: -2 },
        groupOpinion: { military_industrial: -5 },
      },
      {
        id: 'b',
        name: '加强安保',
        description: '立即升级白宫安全系统。',
        effects: { treasury: -50, stability: 2 },
        groupOpinion: { military_industrial: 5 },
      },
      {
        id: 'c',
        name: '开玩笑化解',
        description: '看来我们需要更好的田径运动员。',
        effects: { approval: 2, stability: -1 },
        groupOpinion: {},
      },
    ],
  },
  {
    id: 'vice_president_gaffe',
    name: '副总统失言',
    description: '副总统在直播采访中说了一句种族主义言论。整个白宫都在救火。',
    icon: '🤦',
    category: 'political',
    mtth: 70,
    minDay: 60,
    options: [
      {
        id: 'a',
        name: '替他道歉',
        description: '他不是那个意思。',
        effects: { approval: -3 },
        groupOpinion: {},
      },
      {
        id: 'b',
        name: '让他自己处理',
        description: '他是个大人了。',
        effects: { approval: -1, stability: -2 },
        groupOpinion: {},
      },
      {
        id: 'c',
        name: '私下警告他',
        description: '没有公开评论，但所有人都知道你很生气。',
        effects: { approval: -1 },
        groupOpinion: {},
      },
    ],
  },
]

export function shouldEventFireToday(
  event: RandomEvent,
  day: number,
  state: any,
  firedEvents: string[]): boolean {
  if (event.fireOnlyOnce && firedEvents.includes(event.id)) return false
  if (day < event.minDay) return false
  if (event.maxDay && day > event.maxDay) return false
  
  const cooldownPeriod = 21
  const recentFired = firedEvents.slice(-5)
  if (recentFired.includes(event.id)) return false
  
  const c = event.conditions || {}
  const stab = state?.political?.stability || 50
  const appr = state?.political?.approval || 45
  const infl = state?.economy?.inflation || 0.02
  const unemp = state?.economy?.unemployment || 0.04
  
  if (c.minStability && stab < c.minStability) return false
  if (c.maxStability && stab > c.maxStability) return false
  if (c.minApproval && appr < c.minApproval) return false
  if (c.maxApproval && appr > c.maxApproval) return false
  if (c.minInflation && infl < c.minInflation) return false
  if (c.maxInflation && infl > c.maxInflation) return false
  if (c.minUnemployment && unemp < c.minUnemployment) return false
  if (c.maxUnemployment && unemp > c.maxUnemployment) return false
  
  if (c.requiresFocus && !c.requiresFocus.every(f => state?.focus?.completed?.includes(f))) {
    return false
  }
  if (c.excludesFocus && c.excludesFocus.some(f => state?.focus?.completed?.includes(f))) {
    return false
  }
  
  const earlyGameBonus = day < 100 ? 1.0 : day < 200 ? 1.0 : day < 365 ? 1.1 : 1.2
  const dailyChance = (1 / event.mtth) * earlyGameBonus
  return Math.random() < dailyChance
}
