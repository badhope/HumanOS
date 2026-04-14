/**
 * 多维度交叉意识形态分析框架
 * 
 * 核心理念：
 * 1. 意识形态不是简单的二元对立，而是多维度的复杂组合
 * 2. 同一条轴线上可能存在多种主义倾向
 * 3. 不同维度的交叉组合产生独特的意识形态类型
 * 4. 历史上的意识形态（如斯大林主义、纳粹主义）都是多维度组合的产物
 */

// ==================== 维度定义 ====================

export interface IdeologyDimension {
  id: string
  name: string
  description: string
  poles: IdeologyPole[]
  subTypes: IdeologySubType[]
}

export interface IdeologyPole {
  id: string
  name: string
  description: string
  scoreRange: [number, number]
  characteristics: string[]
}

export interface IdeologySubType {
  id: string
  name: string
  description: string
  scoreRange: [number, number]
  parentPole: string
  characteristics: string[]
}

// ==================== 六大核心维度 ====================

export const ideologyDimensions: IdeologyDimension[] = [
  // 维度1：经济制度轴
  {
    id: 'economic',
    name: '经济制度',
    description: '关于生产资料所有制、经济运行机制和分配方式的立场',
    poles: [
      {
        id: 'free-market',
        name: '自由市场',
        description: '主张最小化政府干预，依靠市场机制配置资源',
        scoreRange: [80, 100],
        characteristics: ['私有制优先', '市场竞争', '最小政府', '自由贸易']
      },
      {
        id: 'mixed-economy',
        name: '混合经济',
        description: '市场与政府调控相结合，追求效率与公平的平衡',
        scoreRange: [40, 60],
        characteristics: ['公私并存', '政府调控', '社会福利', '监管市场']
      },
      {
        id: 'planned-economy',
        name: '计划经济',
        description: '主张国家对经济进行统一规划和调控',
        scoreRange: [0, 20],
        characteristics: ['公有制为主', '国家计划', '分配公平', '经济调控']
      }
    ],
    subTypes: [
      {
        id: 'laissez-faire',
        name: '自由放任主义',
        description: '完全拒绝政府干预经济',
        scoreRange: [90, 100],
        parentPole: 'free-market',
        characteristics: ['零干预', '完全私有化', '取消管制']
      },
      {
        id: 'social-market',
        name: '社会市场经济',
        description: '市场经济与社会福利相结合',
        scoreRange: [60, 80],
        parentPole: 'free-market',
        characteristics: ['市场机制', '社会保障', '劳资协商']
      },
      {
        id: 'state-capitalism',
        name: '国家资本主义',
        description: '国家主导的资本主义发展模式',
        scoreRange: [30, 45],
        parentPole: 'mixed-economy',
        characteristics: ['国家控股', '产业政策', '战略规划']
      },
      {
        id: 'market-socialism',
        name: '市场社会主义',
        description: '公有制基础上的市场机制',
        scoreRange: [20, 40],
        parentPole: 'planned-economy',
        characteristics: ['公有制', '市场调节', '民主管理']
      },
      {
        id: 'command-economy',
        name: '指令经济',
        description: '中央集权的经济计划',
        scoreRange: [0, 15],
        parentPole: 'planned-economy',
        characteristics: ['中央计划', '行政指令', '配额分配']
      }
    ]
  },

  // 维度2：政治权力轴
  {
    id: 'political',
    name: '政治权力',
    description: '关于政治权力来源、分配和行使方式的立场',
    poles: [
      {
        id: 'libertarian',
        name: '自由意志',
        description: '最小化政府权力，最大化个人自由',
        scoreRange: [80, 100],
        characteristics: ['最小国家', '个人主权', '自愿结社', '分权制衡']
      },
      {
        id: 'democratic',
        name: '民主制度',
        description: '通过民主程序实现权力的合法性和制衡',
        scoreRange: [50, 70],
        characteristics: ['选举制度', '多党竞争', '权力制衡', '法治']
      },
      {
        id: 'authoritarian',
        name: '威权主义',
        description: '集中权力于少数人或机构，限制政治参与',
        scoreRange: [20, 40],
        characteristics: ['强人政治', '限制反对', '控制媒体', '秩序优先']
      },
      {
        id: 'totalitarian',
        name: '极权主义',
        description: '国家对社会的全面控制和意识形态垄断',
        scoreRange: [0, 15],
        characteristics: ['一党专政', '意识形态垄断', '全面监控', '个人崇拜']
      }
    ],
    subTypes: [
      {
        id: 'anarchism',
        name: '无政府主义',
        description: '废除一切强制性的政治权力',
        scoreRange: [95, 100],
        parentPole: 'libertarian',
        characteristics: ['无国家', '自愿合作', '直接民主']
      },
      {
        id: 'minarchism',
        name: '最小国家主义',
        description: '政府仅负责国防、司法等基本职能',
        scoreRange: [80, 90],
        parentPole: 'libertarian',
        characteristics: ['守夜人国家', '有限政府', '契约社会']
      },
      {
        id: 'social-democracy',
        name: '社会民主主义',
        description: '民主制度与社会福利相结合',
        scoreRange: [55, 70],
        parentPole: 'democratic',
        characteristics: ['议会民主', '福利国家', '渐进改革']
      },
      {
        id: 'liberal-democracy',
        name: '自由民主主义',
        description: '强调个人权利和宪政制度',
        scoreRange: [65, 80],
        parentPole: 'democratic',
        characteristics: ['宪政', '人权保障', '司法独立']
      },
      {
        id: 'bonapartism',
        name: '波拿巴主义',
        description: '强人统治下的形式民主',
        scoreRange: [30, 45],
        parentPole: 'authoritarian',
        characteristics: ['强人领袖', '全民公决', '军事支持']
      },
      {
        id: 'fascism',
        name: '法西斯主义',
        description: '极端民族主义与极权统治的结合',
        scoreRange: [5, 20],
        parentPole: 'totalitarian',
        characteristics: ['民族至上', '领袖原则', '暴力政治']
      }
    ]
  },

  // 维度3：社会结构轴
  {
    id: 'social',
    name: '社会结构',
    description: '关于个人与集体关系的立场',
    poles: [
      {
        id: 'individualism',
        name: '个人主义',
        description: '个人利益和权利优先于集体',
        scoreRange: [70, 100],
        characteristics: ['个人权利', '自我实现', '竞争机制', '私人领域']
      },
      {
        id: 'communitarian',
        name: '社群主义',
        description: '强调社区和共同体的价值',
        scoreRange: [40, 60],
        characteristics: ['社区归属', '共同责任', '传统价值', '公民美德']
      },
      {
        id: 'collectivism',
        name: '集体主义',
        description: '集体利益高于个人利益',
        scoreRange: [0, 30],
        characteristics: ['集体优先', '统一意志', '牺牲精神', '组织纪律']
      }
    ],
    subTypes: [
      {
        id: 'egoism',
        name: '利己主义',
        description: '极端强调个人利益',
        scoreRange: [90, 100],
        parentPole: 'individualism',
        characteristics: ['自我中心', '理性选择', '契约关系']
      },
      {
        id: 'liberal-individualism',
        name: '自由个人主义',
        description: '强调个人自由和权利',
        scoreRange: [70, 85],
        parentPole: 'individualism',
        characteristics: ['个人自由', '权利本位', '机会平等']
      },
      {
        id: 'social-cohesion',
        name: '社会凝聚主义',
        description: '强调社会团结和共同价值',
        scoreRange: [45, 60],
        parentPole: 'communitarian',
        characteristics: ['社会团结', '共同价值', '公民义务']
      },
      {
        id: 'organic-collectivism',
        name: '有机集体主义',
        description: '强调社会有机体的整体性',
        scoreRange: [20, 40],
        parentPole: 'collectivism',
        characteristics: ['有机整体', '等级秩序', '功能分工']
      },
      {
        id: 'radical-collectivism',
        name: '激进集体主义',
        description: '完全否定个人利益',
        scoreRange: [0, 20],
        parentPole: 'collectivism',
        characteristics: ['集体至上', '消灭私利', '统一行动']
      }
    ]
  },

  // 维度4：文化价值轴
  {
    id: 'cultural',
    name: '文化价值',
    description: '关于传统文化、社会变革和价值观念的立场',
    poles: [
      {
        id: 'traditionalism',
        name: '传统主义',
        description: '维护传统文化和价值观念',
        scoreRange: [70, 100],
        characteristics: ['文化传承', '宗教价值', '家庭观念', '渐进改良']
      },
      {
        id: 'modernism',
        name: '现代主义',
        description: '追求理性和进步，支持社会变革',
        scoreRange: [40, 60],
        characteristics: ['理性启蒙', '科技进步', '世俗化', '社会改革']
      },
      {
        id: 'progressivism',
        name: '进步主义',
        description: '激进推动社会变革和进步',
        scoreRange: [0, 30],
        characteristics: ['社会正义', '平等权利', '多元文化', '激进变革']
      }
    ],
    subTypes: [
      {
        id: 'reactionary',
        name: '反动主义',
        description: '主张恢复传统社会秩序',
        scoreRange: [85, 100],
        parentPole: 'traditionalism',
        characteristics: ['复古', '反现代化', '宗教权威']
      },
      {
        id: 'conservatism',
        name: '保守主义',
        description: '渐进维护传统价值',
        scoreRange: [65, 85],
        parentPole: 'traditionalism',
        characteristics: ['传统价值', '渐进改良', '社会稳定']
      },
      {
        id: 'liberal-modernism',
        name: '自由现代主义',
        description: '理性与个人自由相结合',
        scoreRange: [50, 70],
        parentPole: 'modernism',
        characteristics: ['理性', '自由', '科学精神']
      },
      {
        id: 'social-progressivism',
        name: '社会进步主义',
        description: '追求社会正义和平等',
        scoreRange: [20, 40],
        parentPole: 'progressivism',
        characteristics: ['社会正义', '平等权利', '多元包容']
      },
      {
        id: 'radical-progressivism',
        name: '激进进步主义',
        description: '彻底推翻传统价值体系',
        scoreRange: [0, 20],
        parentPole: 'progressivism',
        characteristics: ['文化革命', '价值重构', '身份政治']
      }
    ]
  },

  // 维度5：国际关系轴
  {
    id: 'international',
    name: '国际关系',
    description: '关于民族国家与世界秩序关系的立场',
    poles: [
      {
        id: 'globalism',
        name: '全球主义',
        description: '支持全球化、国际合作和超国家机构',
        scoreRange: [70, 100],
        characteristics: ['自由贸易', '开放边境', '国际组织', '普世价值']
      },
      {
        id: 'internationalism',
        name: '国际主义',
        description: '支持国际合作但维护国家主权',
        scoreRange: [40, 60],
        characteristics: ['国际合作', '主权平等', '多边主义', '互利共赢']
      },
      {
        id: 'nationalism',
        name: '民族主义',
        description: '强调民族利益和国家主权',
        scoreRange: [0, 30],
        characteristics: ['民族优先', '主权至上', '保护主义', '文化认同']
      }
    ],
    subTypes: [
      {
        id: 'cosmopolitanism',
        name: '世界主义',
        description: '超越民族国家的全球公民意识',
        scoreRange: [85, 100],
        parentPole: 'globalism',
        characteristics: ['世界公民', '全球治理', '人权普世']
      },
      {
        id: 'liberal-globalism',
        name: '自由全球主义',
        description: '全球化与自由民主的结合',
        scoreRange: [65, 85],
        parentPole: 'globalism',
        characteristics: ['自由贸易', '民主推广', '国际法']
      },
      {
        id: 'pragmatic-internationalism',
        name: '务实国际主义',
        description: '基于国家利益的国际合作',
        scoreRange: [40, 60],
        parentPole: 'internationalism',
        characteristics: ['利益导向', '务实合作', '战略伙伴']
      },
      {
        id: 'civic-nationalism',
        name: '公民民族主义',
        description: '基于公民身份的民族认同',
        scoreRange: [25, 40],
        parentPole: 'nationalism',
        characteristics: ['公民认同', '宪法爱国', '包容性']
      },
      {
        id: 'ethnic-nationalism',
        name: '族群民族主义',
        description: '基于种族或文化的民族认同',
        scoreRange: [0, 25],
        parentPole: 'nationalism',
        characteristics: ['种族认同', '文化纯粹', '排他性']
      }
    ]
  },

  // 维度6：技术态度轴
  {
    id: 'technology',
    name: '技术态度',
    description: '关于科技发展、技术伦理和社会变革的立场',
    poles: [
      {
        id: 'techno-optimism',
        name: '技术乐观',
        description: '相信技术进步能解决人类问题',
        scoreRange: [70, 100],
        characteristics: ['技术进步', '创新驱动', '自动化', '人工智能']
      },
      {
        id: 'techno-pragmatism',
        name: '技术实用主义',
        description: '理性看待技术，平衡发展与风险',
        scoreRange: [40, 60],
        characteristics: ['技术评估', '风险管理', '伦理框架', '监管']
      },
      {
        id: 'techno-skepticism',
        name: '技术怀疑',
        description: '警惕技术的负面影响',
        scoreRange: [0, 30],
        characteristics: ['技术批判', '环境关注', '人文价值', '限制发展']
      }
    ],
    subTypes: [
      {
        id: 'transhumanism',
        name: '超人类主义',
        description: '利用技术超越人类局限',
        scoreRange: [85, 100],
        parentPole: 'techno-optimism',
        characteristics: ['人类增强', '生命延长', '人工智能融合']
      },
      {
        id: 'techno-liberalism',
        name: '技术自由主义',
        description: '技术发展与个人自由的结合',
        scoreRange: [65, 85],
        parentPole: 'techno-optimism',
        characteristics: ['技术自由', '创新优先', '去监管']
      },
      {
        id: 'responsible-innovation',
        name: '负责任创新',
        description: '技术创新与社会责任并重',
        scoreRange: [45, 65],
        parentPole: 'techno-pragmatism',
        characteristics: ['伦理审查', '社会影响评估', '公众参与']
      },
      {
        id: 'eco-criticism',
        name: '生态批判主义',
        description: '从生态角度批判技术发展',
        scoreRange: [15, 35],
        parentPole: 'techno-skepticism',
        characteristics: ['生态优先', '可持续', '技术限制']
      },
      {
        id: 'luddism',
        name: '卢德主义',
        description: '反对破坏传统生活方式的技术',
        scoreRange: [0, 15],
        parentPole: 'techno-skepticism',
        characteristics: ['反技术', '传统生活', '自然主义']
      }
    ]
  }
]

// ==================== 复合意识形态类型库 ====================

export interface CompositeIdeology {
  id: string
  name: string
  description: string
  historicalExamples: string[]
  dimensionRequirements: DimensionRequirement[]
  characteristics: string[]
  strengths: string[]
  weaknesses: string[]
  relatedIdeologies: string[]
  historicalFigures: string[]
  foundingYear?: string
  keyTexts?: string[]
}

export interface DimensionRequirement {
  dimensionId: string
  requiredRanges: Array<{
    poleId?: string
    subTypeId?: string
    scoreRange: [number, number]
    weight: number
  }>
}

export const compositeIdeologies: CompositeIdeology[] = [
  // ===== 斯大林主义 =====
  {
    id: 'stalinism',
    name: '斯大林主义',
    description: '斯大林主义是苏联领导人斯大林发展的一种政治理论和实践，结合了极权政治、计划经济、民族主义和个人崇拜。它强调党的绝对领导、快速工业化、农业集体化，以及对"敌人"的残酷清洗。',
    historicalExamples: ['苏联(1924-1953)', '东欧卫星国', '朝鲜', '阿尔巴尼亚'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'command-economy', scoreRange: [0, 20], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { subTypeId: 'totalitarian', scoreRange: [0, 20], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { subTypeId: 'radical-collectivism', scoreRange: [0, 25], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { poleId: 'modernism', scoreRange: [30, 50], weight: 0.6 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'ethnic-nationalism', scoreRange: [10, 35], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { poleId: 'techno-optimism', scoreRange: [60, 85], weight: 0.5 }
        ]
      }
    ],
    characteristics: [
      '一党专政与个人崇拜',
      '中央计划经济',
      '快速工业化',
      '农业集体化',
      '大清洗与恐怖统治',
      '社会主义现实主义',
      '一国建成社会主义'
    ],
    strengths: ['快速工业化', '动员能力', '社会稳定'],
    weaknesses: ['人权侵犯', '经济效率低下', '创新抑制', '政治迫害'],
    relatedIdeologies: ['马克思列宁主义', '毛泽东思想', '主体思想'],
    historicalFigures: ['约瑟夫·斯大林', '拉夫连季·贝利亚', '格奥尔基·马林科夫'],
    foundingYear: '1924',
    keyTexts: ['《列宁主义问题》', '《苏联社会主义经济问题》']
  },

  // ===== 纳粹主义 =====
  {
    id: 'nazism',
    name: '纳粹主义（国家社会主义）',
    description: '纳粹主义是希特勒创立的极端意识形态，结合了极端民族主义、种族主义、反犹主义、极权统治和所谓的"国家社会主义"。它强调雅利安种族优越论、生存空间论和领袖原则。',
    historicalExamples: ['纳粹德国(1933-1945)'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'state-capitalism', scoreRange: [25, 45], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { subTypeId: 'fascism', scoreRange: [0, 20], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { subTypeId: 'organic-collectivism', scoreRange: [15, 35], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { subTypeId: 'reactionary', scoreRange: [80, 100], weight: 0.9 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'ethnic-nationalism', scoreRange: [0, 20], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { poleId: 'techno-optimism', scoreRange: [65, 90], weight: 0.6 }
        ]
      }
    ],
    characteristics: [
      '种族优越论',
      '反犹主义',
      '领袖原则(Führerprinzip)',
      '生存空间论',
      '军事扩张',
      '宣传机器',
      '集中营系统'
    ],
    strengths: ['动员能力', '技术发展', '基础设施建设'],
    weaknesses: ['种族灭绝', '战争罪行', '道德沦丧', '最终失败'],
    relatedIdeologies: ['法西斯主义', '种族主义', '社会达尔文主义'],
    historicalFigures: ['阿道夫·希特勒', '海因里希·希姆莱', '约瑟夫·戈培尔', '赫尔曼·戈林'],
    foundingYear: '1920',
    keyTexts: ['《我的奋斗》', '《纳粹党纲领》']
  },

  // ===== 自由意志社会主义 =====
  {
    id: 'libertarian-socialism',
    name: '自由意志社会主义',
    description: '自由意志社会主义结合了社会主义的经济平等理想和自由意志主义的政治自由理念。它反对国家权力，主张通过工人自治、直接民主和去中心化实现社会主义。',
    historicalExamples: ['西班牙内战中的无政府主义地区(1936-1939)', '萨帕塔运动'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'market-socialism', scoreRange: [20, 45], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { subTypeId: 'anarchism', scoreRange: [85, 100], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { poleId: 'communitarian', scoreRange: [40, 65], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { poleId: 'progressivism', scoreRange: [15, 40], weight: 0.6 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'cosmopolitanism', scoreRange: [80, 100], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { poleId: 'techno-pragmatism', scoreRange: [40, 65], weight: 0.5 }
        ]
      }
    ],
    characteristics: [
      '工人自治',
      '直接民主',
      '反国家主义',
      '去中心化',
      '经济平等',
      '个人自由',
      '互助合作'
    ],
    strengths: ['民主参与', '个人自由', '社会平等'],
    weaknesses: ['实施困难', '缺乏效率', '协调问题'],
    relatedIdeologies: ['无政府主义', '民主社会主义', '工团主义'],
    historicalFigures: ['米哈伊尔·巴枯宁', '彼得·克鲁泡特金', '诺姆·乔姆斯基', '默里·布克钦'],
    keyTexts: ['《互助论》', '《自由意志社会主义导论》']
  },

  // ===== 社会民主主义 =====
  {
    id: 'social-democracy',
    name: '社会民主主义',
    description: '社会民主主义主张在资本主义框架内通过民主改革实现社会公正、经济平等和福利国家。它平衡市场经济与政府干预，强调社会保障和劳工权利。',
    historicalExamples: ['北欧国家', '德国', '英国工党执政时期'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'social-market', scoreRange: [55, 80], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { subTypeId: 'social-democracy', scoreRange: [55, 75], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { poleId: 'communitarian', scoreRange: [45, 65], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { poleId: 'progressivism', scoreRange: [20, 50], weight: 0.6 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'liberal-globalism', scoreRange: [60, 85], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { subTypeId: 'responsible-innovation', scoreRange: [45, 70], weight: 0.5 }
        ]
      }
    ],
    characteristics: [
      '福利国家',
      '混合经济',
      '劳工权利',
      '渐进改革',
      '议会民主',
      '社会保障',
      '财富再分配'
    ],
    strengths: ['社会稳定', '经济平等', '民主参与'],
    weaknesses: ['高税收', '效率问题', '福利依赖'],
    relatedIdeologies: ['民主社会主义', '进步主义', '凯恩斯主义'],
    historicalFigures: ['爱德华·伯恩施坦', '克莱门特·艾德礼', '奥洛夫·帕尔梅', '格哈德·施罗德'],
    foundingYear: '1890年代',
    keyTexts: ['《进化社会主义》', '《哥德斯堡纲领》']
  },

  // ===== 新自由主义 =====
  {
    id: 'neoliberalism',
    name: '新自由主义',
    description: '新自由主义主张市场自由化、私有化、去监管和自由贸易，强调个人责任和企业家精神。它认为市场机制是最有效的资源配置方式。',
    historicalExamples: ['里根时期的美国', '撒切尔时期的英国', '智利皮诺切特时期'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'laissez-faire', scoreRange: [85, 100], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { subTypeId: 'liberal-democracy', scoreRange: [60, 80], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { subTypeId: 'liberal-individualism', scoreRange: [65, 90], weight: 0.9 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { poleId: 'modernism', scoreRange: [45, 70], weight: 0.5 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'liberal-globalism', scoreRange: [65, 90], weight: 0.9 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { subTypeId: 'techno-liberalism', scoreRange: [65, 90], weight: 0.7 }
        ]
      }
    ],
    characteristics: [
      '市场自由化',
      '私有化',
      '去监管',
      '自由贸易',
      '财政紧缩',
      '个人责任',
      '企业家精神'
    ],
    strengths: ['经济效率', '创新激励', '消费者选择'],
    weaknesses: ['不平等加剧', '公共服务削弱', '市场失灵'],
    relatedIdeologies: ['古典自由主义', '自由意志主义', '保守主义'],
    historicalFigures: ['弗里德里希·哈耶克', '米尔顿·弗里德曼', '罗纳德·里根', '玛格丽特·撒切尔'],
    foundingYear: '1947(朝圣山学会)',
    keyTexts: ['《通往奴役之路》', '《资本主义与自由》']
  },

  // ===== 毛泽东思想 =====
  {
    id: 'maoism',
    name: '毛泽东思想',
    description: '毛泽东思想是毛泽东发展的一种马克思主义理论，强调农民革命、群众路线、继续革命理论和人民战争。它结合了中国传统思想和马克思列宁主义。',
    historicalExamples: ['中国(1949-1976)', '柬埔寨红色高棉', '尼泊尔毛主义'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'command-economy', scoreRange: [5, 25], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { poleId: 'totalitarian', scoreRange: [5, 25], weight: 0.9 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { subTypeId: 'radical-collectivism', scoreRange: [0, 20], weight: 0.9 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { subTypeId: 'radical-progressivism', scoreRange: [0, 25], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'civic-nationalism', scoreRange: [25, 50], weight: 0.6 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { poleId: 'techno-optimism', scoreRange: [55, 80], weight: 0.5 }
        ]
      }
    ],
    characteristics: [
      '群众路线',
      '继续革命理论',
      '人民公社',
      '文化大革命',
      '反官僚主义',
      '自力更生',
      '农村包围城市'
    ],
    strengths: ['群众动员', '反帝反封建', '社会平等'],
    weaknesses: ['经济破坏', '政治迫害', '文化浩劫'],
    relatedIdeologies: ['马克思列宁主义', '斯大林主义', '新民主主义'],
    historicalFigures: ['毛泽东', '周恩来', '林彪', '江青'],
    foundingYear: '1930年代',
    keyTexts: ['《论持久战》', '《实践论》', '《矛盾论》', '《毛主席语录》']
  },

  // ===== 保守民族主义 =====
  {
    id: 'conservative-nationalism',
    name: '保守民族主义',
    description: '保守民族主义结合了传统保守主义和民族主义，强调民族文化认同、传统价值和国家主权。它反对全球化带来的文化同质化和主权侵蚀。',
    historicalExamples: ['匈牙利欧尔班政府', '波兰法律与公正党', '土耳其埃尔多安政府'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'state-capitalism', scoreRange: [30, 55], weight: 0.6 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { poleId: 'authoritarian', scoreRange: [25, 50], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { subTypeId: 'organic-collectivism', scoreRange: [20, 45], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { subTypeId: 'conservatism', scoreRange: [65, 90], weight: 0.9 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'ethnic-nationalism', scoreRange: [5, 30], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { poleId: 'techno-pragmatism', scoreRange: [35, 60], weight: 0.4 }
        ]
      }
    ],
    characteristics: [
      '民族文化认同',
      '传统价值',
      '主权至上',
      '反移民',
      '保护主义',
      '强人政治',
      '反全球化'
    ],
    strengths: ['文化保护', '社会凝聚', '国家认同'],
    weaknesses: ['排外倾向', '民主倒退', '国际孤立'],
    relatedIdeologies: ['传统保守主义', '民族主义', '民粹主义'],
    historicalFigures: ['维克多·欧尔班', '雅罗斯瓦夫·卡钦斯基', '雷杰普·埃尔多安'],
    keyTexts: ['《民族主义与文化》', '《非自由民主》']
  },

  // ===== 技术官僚主义 =====
  {
    id: 'technocracy',
    name: '技术官僚主义',
    description: '技术官僚主义主张由技术专家治理社会，强调科学决策、数据驱动和技术解决方案。它认为技术理性优于政治民主。',
    historicalExamples: ['新加坡', '中国改革开放后', '欧盟委员会'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'state-capitalism', scoreRange: [30, 50], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { poleId: 'authoritarian', scoreRange: [30, 55], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { poleId: 'communitarian', scoreRange: [40, 65], weight: 0.6 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { poleId: 'modernism', scoreRange: [50, 75], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'pragmatic-internationalism', scoreRange: [40, 65], weight: 0.6 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { subTypeId: 'transhumanism', scoreRange: [80, 100], weight: 0.9 }
        ]
      }
    ],
    characteristics: [
      '专家治国',
      '数据驱动决策',
      '技术理性',
      '效率优先',
      '精英管理',
      '科学规划',
      '智能治理'
    ],
    strengths: ['决策效率', '技术进步', '科学管理'],
    weaknesses: ['民主缺失', '技术决定论', '人文关怀不足'],
    relatedIdeologies: ['精英主义', '实证主义', '现代主义'],
    historicalFigures: ['李光耀', '邓小平', '让-克洛德·容克'],
    keyTexts: ['《技术统治论》', '《专家治国》']
  },

  // ===== 生态社会主义 =====
  {
    id: 'eco-socialism',
    name: '生态社会主义',
    description: '生态社会主义结合了社会主义的经济平等理想和生态主义的环境保护理念。它认为资本主义是环境危机的根源，主张通过社会主义改造实现生态可持续。',
    historicalExamples: ['德国绿党左翼', '玻利维亚莫拉莱斯政府'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'market-socialism', scoreRange: [25, 50], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { subTypeId: 'social-democracy', scoreRange: [50, 75], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { poleId: 'communitarian', scoreRange: [45, 70], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { poleId: 'progressivism', scoreRange: [15, 45], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'cosmopolitanism', scoreRange: [75, 100], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { subTypeId: 'eco-criticism', scoreRange: [10, 35], weight: 0.9 }
        ]
      }
    ],
    characteristics: [
      '生态可持续',
      '经济民主',
      '反资本主义',
      '气候正义',
      '去增长',
      '社区自治',
      '可再生能源'
    ],
    strengths: ['环境保护', '社会公正', '可持续性'],
    weaknesses: ['经济增长限制', '实施困难', '政治阻力'],
    relatedIdeologies: ['社会主义', '生态主义', '去增长运动'],
    historicalFigures: ['约翰·贝拉米·福斯特', '迈克尔·洛维', '伊万·伊利奇'],
    keyTexts: ['《生态社会主义》', '《马克思的生态学》']
  },

  // ===== 自由意志资本主义 =====
  {
    id: 'libertarian-capitalism',
    name: '自由意志资本主义',
    description: '自由意志资本主义主张最小化政府干预，最大化个人自由和市场自由。它认为个人自由和财产权是最重要的价值。',
    historicalExamples: ['美国自由意志党', '智利皮诺切特时期早期'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'laissez-faire', scoreRange: [90, 100], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { subTypeId: 'minarchism', scoreRange: [80, 95], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { subTypeId: 'egoism', scoreRange: [85, 100], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { poleId: 'modernism', scoreRange: [50, 75], weight: 0.5 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'cosmopolitanism', scoreRange: [80, 100], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { subTypeId: 'techno-liberalism', scoreRange: [70, 95], weight: 0.7 }
        ]
      }
    ],
    characteristics: [
      '最小政府',
      '自由市场',
      '财产权绝对',
      '个人主权',
      '自愿交易',
      '契约社会',
      '去监管'
    ],
    strengths: ['个人自由', '经济效率', '创新激励'],
    weaknesses: ['社会不平等', '公共服务缺失', '市场失灵'],
    relatedIdeologies: ['古典自由主义', '无政府资本主义', '客观主义'],
    historicalFigures: ['路德维希·冯·米塞斯', '穆瑞·罗斯巴德', '安·兰德'],
    keyTexts: ['《人的行为》', '《自由伦理》', '《阿特拉斯耸耸肩》']
  },

  // ===== 伊斯兰主义 =====
  {
    id: 'islamism',
    name: '伊斯兰主义',
    description: '伊斯兰主义主张将伊斯兰教法作为政治和社会生活的基础，建立伊斯兰国家。它结合了宗教传统和现代政治运动。',
    historicalExamples: ['伊朗伊斯兰共和国', '沙特阿拉伯', '穆斯林兄弟会的政治主张'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { poleId: 'mixed-economy', scoreRange: [35, 55], weight: 0.5 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { poleId: 'authoritarian', scoreRange: [20, 45], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { subTypeId: 'organic-collectivism', scoreRange: [15, 40], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { subTypeId: 'reactionary', scoreRange: [85, 100], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'ethnic-nationalism', scoreRange: [10, 35], weight: 0.7 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { poleId: 'techno-pragmatism', scoreRange: [35, 60], weight: 0.4 }
        ]
      }
    ],
    characteristics: [
      '伊斯兰教法',
      '宗教政治',
      '传统价值',
      '反西方',
      '乌玛概念',
      '宗教领袖',
      '道德监管'
    ],
    strengths: ['文化认同', '社会凝聚', '道德秩序'],
    weaknesses: ['宗教压迫', '性别不平等', '思想控制'],
    relatedIdeologies: ['政治伊斯兰', '伊斯兰复兴运动', '原教旨主义'],
    historicalFigures: ['赛义德·库特布', '鲁霍拉·霍梅尼', '哈桑·班纳'],
    keyTexts: ['《路标》', '《伊斯兰政府》']
  },

  // ===== 法西斯主义 =====
  {
    id: 'fascism',
    name: '法西斯主义',
    description: '法西斯主义是一种极端民族主义的极权意识形态，强调国家至上、领袖崇拜、军事扩张和反民主。它反对自由主义、社会主义和共产主义。',
    historicalExamples: ['意大利墨索里尼时期(1922-1943)', '西班牙佛朗哥时期'],
    dimensionRequirements: [
      {
        dimensionId: 'economic',
        requiredRanges: [
          { subTypeId: 'state-capitalism', scoreRange: [25, 50], weight: 0.6 }
        ]
      },
      {
        dimensionId: 'political',
        requiredRanges: [
          { subTypeId: 'fascism', scoreRange: [0, 25], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'social',
        requiredRanges: [
          { subTypeId: 'organic-collectivism', scoreRange: [15, 40], weight: 0.9 }
        ]
      },
      {
        dimensionId: 'cultural',
        requiredRanges: [
          { subTypeId: 'reactionary', scoreRange: [75, 95], weight: 0.8 }
        ]
      },
      {
        dimensionId: 'international',
        requiredRanges: [
          { subTypeId: 'ethnic-nationalism', scoreRange: [0, 25], weight: 1.0 }
        ]
      },
      {
        dimensionId: 'technology',
        requiredRanges: [
          { poleId: 'techno-optimism', scoreRange: [60, 85], weight: 0.5 }
        ]
      }
    ],
    characteristics: [
      '国家至上',
      '领袖崇拜',
      '军事扩张',
      '反民主',
      '反自由主义',
      '社团主义',
      '暴力政治'
    ],
    strengths: ['国家统一', '动员能力', '秩序维护'],
    weaknesses: ['人权侵犯', '战争倾向', '民主破坏'],
    relatedIdeologies: ['纳粹主义', '极权主义', '民族主义'],
    historicalFigures: ['贝尼托·墨索里尼', '弗朗西斯科·佛朗哥', '加布里埃尔·邓南遮'],
    foundingYear: '1919',
    keyTexts: ['《法西斯主义宣言》', '《我的奋斗》']
  }
]

// ==================== 权重计算系统 ====================

export interface IdeologyScoreResult {
  dimensionScores: Map<string, number>
  poleMatches: Map<string, number>
  subTypeMatches: Map<string, number>
  compositeMatches: Array<{
    ideology: CompositeIdeology
    matchScore: number
    dimensionBreakdown: Map<string, number>
  }>
  primaryIdeology: CompositeIdeology | null
  secondaryIdeologies: CompositeIdeology[]
  analysis: string
}

export function calculateIdeologyScores(
  answers: Array<{ questionId: string; value: number; dimension?: string; trait?: string }>
): IdeologyScoreResult {
  const dimensionScores = new Map<string, number>()
  const dimensionCounts = new Map<string, number>()

  answers.forEach((answer) => {
    const dimension = answer.dimension || answer.trait || 'general'
    const currentScore = dimensionScores.get(dimension) || 0
    const currentCount = dimensionCounts.get(dimension) || 0
    
    dimensionScores.set(dimension, currentScore + answer.value)
    dimensionCounts.set(dimension, currentCount + 5)
  })

  dimensionScores.forEach((score, dimension) => {
    const count = dimensionCounts.get(dimension) || 1
    dimensionScores.set(dimension, Math.round((score / count) * 100))
  })

  const poleMatches = new Map<string, number>()
  const subTypeMatches = new Map<string, number>()

  ideologyDimensions.forEach((dim) => {
    const score = dimensionScores.get(dim.id) || 50
    
    dim.poles.forEach((pole) => {
      if (score >= pole.scoreRange[0] && score <= pole.scoreRange[1]) {
        poleMatches.set(pole.id, calculateMatchScore(score, pole.scoreRange))
      }
    })

    dim.subTypes.forEach((subType) => {
      if (score >= subType.scoreRange[0] && score <= subType.scoreRange[1]) {
        subTypeMatches.set(subType.id, calculateMatchScore(score, subType.scoreRange))
      }
    })
  })

  const compositeMatches = compositeIdeologies.map((ideology) => {
    const dimensionBreakdown = new Map<string, number>()
    let totalScore = 0
    let totalWeight = 0

    ideology.dimensionRequirements.forEach((req) => {
      const dimensionScore = dimensionScores.get(req.dimensionId) || 50
      
      req.requiredRanges.forEach((range) => {
        const matchScore = calculateMatchScore(dimensionScore, range.scoreRange)
        const weightedScore = matchScore * range.weight
        
        dimensionBreakdown.set(req.dimensionId, matchScore)
        totalScore += weightedScore
        totalWeight += range.weight
      })
    })

    const matchScore = totalWeight > 0 ? totalScore / totalWeight : 0

    return {
      ideology,
      matchScore,
      dimensionBreakdown
    }
  })

  compositeMatches.sort((a, b) => b.matchScore - a.matchScore)

  const primaryIdeology = compositeMatches[0]?.matchScore >= 60 
    ? compositeMatches[0].ideology 
    : null

  const secondaryIdeologies = compositeMatches
    .slice(1, 4)
    .filter((m) => m.matchScore >= 40)
    .map((m) => m.ideology)

  const analysis = generateAnalysis(
    dimensionScores,
    poleMatches,
    subTypeMatches,
    primaryIdeology,
    secondaryIdeologies
  )

  return {
    dimensionScores,
    poleMatches,
    subTypeMatches,
    compositeMatches: compositeMatches.slice(0, 10),
    primaryIdeology,
    secondaryIdeologies,
    analysis
  }
}

function calculateMatchScore(score: number, range: [number, number]): number {
  if (score < range[0] || score > range[1]) {
    const distance = Math.min(
      Math.abs(score - range[0]),
      Math.abs(score - range[1])
    )
    return Math.max(0, 100 - distance * 2)
  }

  const midPoint = (range[0] + range[1]) / 2
  const distance = Math.abs(score - midPoint)
  const maxDistance = (range[1] - range[0]) / 2
  
  return 100 - (distance / maxDistance) * 20
}

function generateAnalysis(
  dimensionScores: Map<string, number>,
  poleMatches: Map<string, number>,
  subTypeMatches: Map<string, number>,
  primaryIdeology: CompositeIdeology | null,
  secondaryIdeologies: CompositeIdeology[]
): string {
  const parts: string[] = []

  if (primaryIdeology) {
    parts.push(`您的意识形态倾向最接近**${primaryIdeology.name}**，匹配度为${Math.round(poleMatches.get(primaryIdeology.id) || 0)}%。`)
    parts.push(primaryIdeology.description)
  }

  if (secondaryIdeologies.length > 0) {
    parts.push(`\n\n您也受到以下意识形态的影响：`)
    secondaryIdeologies.forEach((ideology) => {
      parts.push(`- **${ideology.name}**`)
    })
  }

  const strongPoles = Array.from(poleMatches.entries())
    .filter(([_, score]) => score >= 70)
    .map(([id, _]) => {
      for (const dim of ideologyDimensions) {
        const pole = dim.poles.find(p => p.id === id)
        if (pole) return pole.name
      }
      return null
    })
    .filter(Boolean)

  if (strongPoles.length > 0) {
    parts.push(`\n\n您的主要倾向包括：${strongPoles.join('、')}。`)
  }

  return parts.join('\n')
}
