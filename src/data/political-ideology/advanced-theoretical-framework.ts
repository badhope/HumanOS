import { IDEOLOGY_DIMENSIONS } from './ideology-theoretical-framework'

export interface AdvancedIdeologicalDimension {
  id: string
  name: string
  canonicalName: string
  axis: {
    left: { id: string; name: string; coreValues: string[] }
    right: { id: string; name: string; coreValues: string[] }
  }
  weight: number
  questionDistribution: number
  theoreticalFoundation: string
  assessmentCriteria: string[]
}

export interface CognitiveDimension {
  id: string
  name: string
  description: string
  weight: number
  questionCount: number
  scoringRubric: {
    criteria: string
    weight: number
    anchors: { score: number; description: string }[]
  }[]
}

export interface MetaDimension {
  id: string
  name: string
  description: string
  indicators: string[]
  calculationMethod: string
  validationCriteria: string[]
}

export const ADVANCED_IDEOLOGY_DIMENSIONS: AdvancedIdeologicalDimension[] = [
  {
    id: 'economic',
    name: '经济维度',
    canonicalName: 'Economic Axis',
    axis: {
      left: {
        id: 'collectivism',
        name: '集体主义',
        coreValues: ['平等', '再分配', '公有制', '社会福利', '劳工权利']
      },
      right: {
        id: 'individualism',
        name: '个人主义',
        coreValues: ['自由市场', '私有财产', '减税', '企业家精神', '小政府']
      }
    },
    weight: 0.15,
    questionDistribution: 15,
    theoreticalFoundation: '斯密、马克思、哈耶克、凯恩斯的古典政治经济学传统',
    assessmentCriteria: [
      '对政府干预经济的态度',
      '对财富再分配的支持程度',
      '对工会力量的立场',
      '对自由贸易的信念'
    ]
  },
  {
    id: 'social',
    name: '社会维度',
    canonicalName: 'Social Axis',
    axis: {
      left: {
        id: 'progressivism',
        name: '进步主义',
        coreValues: ['个人自由', '社会正义', '身份平等', '多元文化', '批判理论']
      },
      right: {
        id: 'traditionalism',
        name: '传统主义',
        coreValues: ['秩序', '权威', '家庭价值', '宗教', '民族认同']
      }
    },
    weight: 0.15,
    questionDistribution: 15,
    theoreticalFoundation: '启蒙理性主义与保守主义的对垒，法兰克福学派批判理论',
    assessmentCriteria: [
      '对性别平等的态度',
      '对LGBTQ权利的立场',
      '对宗教在公共生活中的角色',
      '对家庭价值的理解'
    ]
  },
  {
    id: 'cultural',
    name: '文化维度',
    canonicalName: 'Cultural Axis',
    axis: {
      left: {
        id: 'cosmopolitanism',
        name: '世界主义',
        coreValues: ['文化多元', '开放边界', '普世价值', '文化融合', '全球公民']
      },
      right: {
        id: 'nationalism',
        name: '民族主义',
        coreValues: ['文化认同', '主权', '语言保护', '文化传承', '社群价值']
      }
    },
    weight: 0.15,
    questionDistribution: 15,
    theoreticalFoundation: '赫尔德文化民族主义、罗尔斯世界主义、社群主义论战',
    assessmentCriteria: [
      '对移民政策的态度',
      '对文化同化的立场',
      '对普世价值的信念',
      '对民族认同的重视程度'
    ]
  },
  {
    id: 'international',
    name: '国际维度',
    canonicalName: 'International Axis',
    axis: {
      left: {
        id: 'multilateralism',
        name: '多边主义',
        coreValues: ['国际合作', '国际法', '人道主义干预', '裁军', '全球治理']
      },
      right: {
        id: 'realpolitik',
        name: '现实主义',
        coreValues: ['国家利益', '军事力量', '主权至上', '单边主义', '均势政治']
      }
    },
    weight: 0.12,
    questionDistribution: 15,
    theoreticalFoundation: '摩根索、沃尔兹、康德和平论、建构主义国际关系理论',
    assessmentCriteria: [
      '对军事干预的态度',
      '对国际组织的信任程度',
      '对国家安全优先的立场',
      '对人道主义干预的看法'
    ]
  },
  {
    id: 'ecological',
    name: '生态维度',
    canonicalName: 'Ecological Axis',
    axis: {
      left: {
        id: 'environmentalism',
        name: '生态中心主义',
        coreValues: ['可持续发展', '气候变化行动', '生物多样性', '去增长', '生态正义']
      },
      right: {
        id: 'industrialism',
        name: '人类中心主义',
        coreValues: ['经济增长优先', '技术解决方案', '资源开发', '工业化', '人类福祉优先']
      }
    },
    weight: 0.12,
    questionDistribution: 15,
    theoreticalFoundation: '深层生态学、生态马克思主义、技术乐观主义、可持续发展论争',
    assessmentCriteria: [
      '对经济增长与环境保护平衡的看法',
      '对气候行动紧迫性的认识',
      '对核能的立场',
      '对动物权利的态度'
    ]
  },
  {
    id: 'epistemological',
    name: '认识论维度',
    canonicalName: 'Epistemological Axis',
    axis: {
      left: {
        id: 'constructivism',
        name: '社会建构主义',
        coreValues: [
          '真理的社会建构属性',
          '知识的历史性与情境性',
          '范式不可通约性',
          '权力与知识的共生关系',
          '视角主义认识论'
        ]
      },
      right: {
        id: 'realism',
        name: '科学实在论',
        coreValues: [
          '客观真理的可及性',
          '科学方法的普适性',
          '实证主义验证标准',
          '价值中立的可能性',
          '进步的累积性'
        ]
      }
    },
    weight: 0.12,
    questionDistribution: 15,
    theoreticalFoundation: '波普尔、库恩、福柯、哈贝马斯的知识社会学与科学哲学传统',
    assessmentCriteria: [
      '对科学方法局限性的认识程度',
      '对真理客观性的信念强度',
      '对社会建构知识的接受度',
      '对专家权威的信任水平'
    ]
  },
  {
    id: 'anthropological',
    name: '人性论维度',
    canonicalName: 'Anthropological Axis',
    axis: {
      left: {
        id: 'constructivist-anthro',
        name: '社会建构人性观',
        coreValues: [
          '人性的无限可塑性',
          '环境决定论',
          '白板说',
          '文化相对主义',
          '去本质化'
        ]
      },
      right: {
        id: 'essentialist',
        name: '本质主义人性观',
        coreValues: [
          '人性的生物基础',
          '行为遗传学',
          '演化心理学',
          '普遍人性',
          '性别二态性'
        ]
      }
    },
    weight: 0.12,
    questionDistribution: 15,
    theoreticalFoundation: '启蒙哲学以来的人性论争，结合当代演化生物学与社会生物学',
    assessmentCriteria: [
      '对生物决定论的接受程度',
      '对文化建构论的认同程度',
      '对人类行为可塑性的信念',
      '对群体差异的解释框架'
    ]
  },
  {
    id: 'temporal',
    name: '时间观维度',
    canonicalName: 'Temporal Orientation Axis',
    axis: {
      left: {
        id: 'accelerationist',
        name: '加速主义',
        coreValues: [
          '技术决定论',
          '历史的方向性',
          '断裂优于延续',
          '未来优于传统',
          '创造性毁灭'
        ]
      },
      right: {
        id: 'conservationist',
        name: '保守主义',
        coreValues: [
          '审慎的社会变迁',
          '世代间契约',
          '传统智慧的价值',
          '有机社会的延续性',
          '制度演化的渐进性'
        ]
      }
    },
    weight: 0.11,
    questionDistribution: 12,
    theoreticalFoundation: '柏克的保守主义、马克思的历史决定论、兰德、技术哲学传统',
    assessmentCriteria: [
      '对社会变革速度的偏好',
      '对传统制度的尊重程度',
      '对技术进步的态度',
      '未来导向与过去导向的平衡'
    ]
  },
  {
    id: 'metaCoherence',
    name: '元一致性维度',
    canonicalName: 'Meta-Coherence Axis',
    axis: {
      left: {
        id: 'syncretism',
        name: '融合折中主义',
        coreValues: [
          '信念的情境依赖性',
          '理论的实用主义选择',
          '跨范式的创造性综合',
          '接受认知失调的存在',
          '对体系化的怀疑'
        ]
      },
      right: {
        id: 'systematicity',
        name: '体系一致性',
        coreValues: [
          '信念的逻辑一致性',
          '第一原理的演绎推理',
          '公理体系的完备性',
          '消除认知失调的驱力',
          '对体系化的追求'
        ]
      }
    },
    weight: 0.11,
    questionDistribution: 25,
    theoreticalFoundation: '心理测量学、认知失调理论（费斯廷格）、融贯论认识论、信念网络动力学',
    assessmentCriteria: [
      '回答反向题的一致性程度',
      '跨维度信念的逻辑兼容性',
      '对原则例外情况的容忍度',
      '理论偏好的内部一致性'
    ]
  }
]

export const COGNITIVE_DIMENSIONS: CognitiveDimension[] = [
  {
    id: 'cognitive-complexity',
    name: '认知复杂度',
    description: '评估处理矛盾信息、容忍模糊性和进行多维度思考的能力',
    weight: 0.25,
    questionCount: 18,
    scoringRubric: [
      {
        criteria: '模糊容忍度',
        weight: 0.35,
        anchors: [
          { score: 0, description: '非黑即白思维，拒绝中间地带' },
          { score: 50, description: '接受有限的灰色地带，但寻求确定性' },
          { score: 100, description: '主动拥抱模糊性，容忍悖论存在' }
        ]
      },
      {
        criteria: '反事实推理能力',
        weight: 0.35,
        anchors: [
          { score: 0, description: '无法设想与现有信念相反的情境' },
          { score: 50, description: '能够进行有限的假设推理' },
          { score: 100, description: '系统性地进行多情景模拟与验证' }
        ]
      },
      {
        criteria: '元认知能力',
        weight: 0.30,
        anchors: [
          { score: 0, description: '对自身认知偏差毫无觉知' },
          { score: 50, description: '能够识别部分认知偏差' },
          { score: 100, description: '持续监控并校准自身认知过程' }
        ]
      }
    ]
  },
  {
    id: 'logical-consistency',
    name: '逻辑一致性检验',
    description: '检测信念体系中的内部矛盾与认知失调',
    weight: 0.25,
    questionCount: 18,
    scoringRubric: [
      {
        criteria: '跨情境一致性',
        weight: 0.40,
        anchors: [
          { score: 0, description: '原则适用高度情境化且双重标准' },
          { score: 50, description: '主要原则基本一致，次要原则有弹性' },
          { score: 100, description: '普遍原则在所有情境下严格一致适用' }
        ]
      },
      {
        criteria: '手段-目的连贯性',
        weight: 0.30,
        anchors: [
          { score: 0, description: '手段与目的完全脱节甚至相反' },
          { score: 50, description: '手段与目的部分关联但非最优' },
          { score: 100, description: '手段与目的形成闭环且经过有效性验证' }
        ]
      },
      {
        criteria: '概率推理质量',
        weight: 0.30,
        anchors: [
          { score: 0, description: '全有或全无的确定性判断' },
          { score: 50, description: '基本的概率意识但校准不足' },
          { score: 100, description: '贝叶斯式的概率更新与置信度校准' }
        ]
      }
    ]
  },
  {
    id: 'value-hierarchy',
    name: '价值层级结构',
    description: '分析价值排序的清晰性、稳定性与可辩护性',
    weight: 0.25,
    questionCount: 18,
    scoringRubric: [
      {
        criteria: '价值优先级清晰度',
        weight: 0.35,
        anchors: [
          { score: 0, description: '价值排序完全随机且随情境摇摆' },
          { score: 50, description: '核心价值稳定，边缘价值灵活' },
          { score: 100, description: '完整的价值词典序排列与权衡规则' }
        ]
      },
      {
        criteria: '道德基础分化度',
        weight: 0.35,
        anchors: [
          { score: 0, description: '单一道德基础主导，排斥其他' },
          { score: 50, description: '多道德基础共存但未整合' },
          { score: 100, description: '多道德基础的系统整合与权重分配' }
        ]
      },
      {
        criteria: '牺牲承受意愿',
        weight: 0.30,
        anchors: [
          { score: 0, description: '所有价值都不可牺牲，无法权衡' },
          { score: 50, description: '边际权衡下的有限牺牲' },
          { score: 100, description: '明确的取舍边界与交换比率' }
        ]
      }
    ]
  },
  {
    id: 'social-perception',
    name: '社会认知深度',
    description: '评估对社会系统复杂性的理解与行动者意图的归因质量',
    weight: 0.25,
    questionCount: 18,
    scoringRubric: [
      {
        criteria: '系统思维水平',
        weight: 0.40,
        anchors: [
          { score: 0, description: '线性因果，单一解释变量' },
          { score: 50, description: '多因素互动但未形成系统模型' },
          { score: 100, description: '反馈环路、涌现性与路径依赖的系统分析' }
        ]
      },
      {
        criteria: '意图归因复杂度',
        weight: 0.30,
        anchors: [
          { score: 0, description: '善恶二元论，恶意意图推定' },
          { score: 50, description: '接受动机的多元性与有限理性' },
          { score: 100, description: '意向立场与物理立场的恰当运用' }
        ]
      },
      {
        criteria: '政治犬儒程度',
        weight: 0.30,
        anchors: [
          { score: 0, description: '完全的理想主义或完全的犬儒主义' },
          { score: 50, description: '混合动机归因但偏向一端' },
          { score: 100, description: '对动机光谱的均衡理解与校准' }
        ]
      }
    ]
  }
]

export const META_DIMENSIONS: MetaDimension[] = [
  {
    id: 'ideological-coherence',
    name: '意识形态融贯性',
    description: '测量信念系统的内部一致性与逻辑紧密度',
    indicators: [
      '跨维度回答的相关性矩阵',
      '量表信度系数（Cronbach α）',
      '维度间冲突的数量与强度',
      '反转题目的一致性得分',
      '逻辑矛盾的检测次数'
    ],
    calculationMethod: '验证性因子分析 + 贝叶斯网络一致性检验',
    validationCriteria: [
      'α > 0.80 为高融贯',
      '维度间相关在 0.2-0.6 区间',
      '矛盾检测率低于 5%',
      '反转题一致性 > 90%'
    ]
  },
  {
    id: 'extremism-index',
    name: '极端化指数',
    description: '多维测量意识形态极端化的程度与极化倾向',
    indicators: [
      '选项端点选择率',
      '中间选项回避率',
      '跨维度极端值聚合度',
      '确定性表述比例',
      '对立立场的妖魔化程度'
    ],
    calculationMethod: '端点选择率 (50%) + 极化距离 (30%) + 确定性指标 (20%)',
    validationCriteria: [
      '< 30% 温和',
      '30-60% 中度',
      '> 60% 高度极端化',
      '与对照组分布比较'
    ]
  },
  {
    id: 'thinker-alignment',
    name: '思想家契合度',
    description: '将答题模式与经典思想家的立场进行细粒度匹配',
    indicators: [
      '问题-思想家映射矩阵',
      '文本语义相似度',
      '论证结构匹配度',
      '核心前提接受率',
      '推论模式相似度'
    ],
    calculationMethod: '多维标度 + 余弦相似度 + 层级聚类',
    validationCriteria: [
      '匹配区分度 > 0.3 SD',
      '前三位思想家相似度显著',
      '维度载荷与理论预期一致',
      '重测信度 > 0.85'
    ]
  },
  {
    id: 'predictive-validity',
    name: '预测效标效度',
    description: '评估问卷得分与实际政治行为的关联强度',
    indicators: [
      '投票行为预测准确率',
      '政治参与程度相关',
      '政策立场一致性',
      '社交媒体政治行为',
      '行动意愿与实际行动关联'
    ],
    calculationMethod: 'Logistic回归 + ROC曲线 + 混淆矩阵分析',
    validationCriteria: [
      'AUC > 0.75',
      'p < 0.001 统计显著',
      '样本外验证',
      '多人群交叉验证'
    ]
  }
]

export interface CalculationLayer {
  id: string
  name: string
  description: string
  dependencies: string[]
  algorithm: string
  validationCheck: string
}

export const CALCULATION_PIPELINE: CalculationLayer[] = [
  {
    id: 'raw-scoring',
    name: '原始题项计分',
    description: '标准化原始答案并应用反向计分',
    dependencies: [],
    algorithm: '标准化 = (原始分 - 3) / 2 × 计分方向 × 题项质量权重',
    validationCheck: '所有得分在 [-1, 1] 区间内'
  },
  {
    id: 'quality-control',
    name: '答题质量控制',
    description: '检测疏忽作答、反应定势与无效答题模式',
    dependencies: ['raw-scoring'],
    algorithm: '反应时异常检测 + 同义反复题一致性 + 极端值检验',
    validationCheck: '质量分数 > 0.70 否则标记警告'
  },
  {
    id: 'dimension-reduction',
    name: '维度因子分析',
    description: '探索性因子分析提取潜在结构并与理论维度比较',
    dependencies: ['quality-control'],
    algorithm: '主成分分析 + 最大方差旋转 + Kaiser标准化',
    validationCheck: '因子载荷 > 0.40 的题目比例 > 85%'
  },
  {
    id: 'weight-optimization',
    name: '动态权重优化',
    description: 'IRT项目反应理论计算题目区分度并动态分配权重',
    dependencies: ['dimension-reduction'],
    algorithm: '3参数逻辑斯蒂模型 + 信息函数加权',
    validationCheck: '题目区分度参数 a > 0.8'
  },
  {
    id: 'similarity-calculation',
    name: '多维相似度计算',
    description: '8维度空间中的意识形态向量投影与匹配',
    dependencies: ['weight-optimization'],
    algorithm: '加权马氏距离 + 核平滑 + 集成相似度',
    validationCheck: '意识形态区分度检验 p < 0.001'
  },
  {
    id: 'conflict-resolution',
    name: '冲突分析与调和',
    description: '识别并量化信念系统中的内在张力与矛盾',
    dependencies: ['similarity-calculation'],
    algorithm: '信念网络不一致循环检测 + 最小割集分析',
    validationCheck: '矛盾解释方差 < 15%'
  },
  {
    id: 'meta-analysis',
    name: '元分析指标计算',
    description: '计算认知复杂度、一致性、极端化等元指标',
    dependencies: ['conflict-resolution'],
    algorithm: '元维度标准化 + 常模比较 + 百分等级转换',
    validationCheck: '所有元指标呈正态分布'
  },
  {
    id: 'report-generation',
    name: '报告生成与验证',
    description: '最终结果整合与交叉验证',
    dependencies: ['meta-analysis'],
    algorithm: '专家系统规则引擎 + 模板实例化 + 一致性校验',
    validationCheck: '结果可复现性哈希验证通过'
  }
]
