export interface TypeProfile {
  code: string
  name: string
  nickname: string
  population: string
  temperaments: string[]
  dominant: string
  auxiliary: string
  tertiary: string
  inferior: string
  coreDescription: string
  coreMotivation: string
  coreFear: string
  strengths: string[]
  growthAreas: string[]
  blindSpots: string[]
  stressResponse: string
  underStress: string[]
  healthyState: string[]
  relationshipStyle: {
    loveLanguage: string[]
    attachmentStyle: string
    communication: string
    conflict: string
  }
  careerInsights: {
    idealEnvironments: string[]
    naturalStrengths: string[]
    commonRoles: string[]
    toWatch: string[]
  }
  developmentPaths: {
    focus: string
    practices: string[]
  }[]
  famousPeople: string[]
  cognitiveStack: {
    function: string
    attitude: string
    description: string
    manifestation: string
  }[]
}

export const MBTI_TYPE_THEORY: Record<string, TypeProfile> = {
  INTJ: {
    code: 'INTJ',
    name: '建筑师',
    nickname: '战略军师',
    population: '2.1%',
    temperaments: ['理性主义者', 'NT'],
    dominant: 'Ni - 内倾直觉',
    auxiliary: 'Te - 外倾思维',
    tertiary: 'Fi - 内倾情感',
    inferior: 'Se - 外倾感觉',
    coreDescription: 'INTJ是独立的战略思考者，具有非凡的洞察力和长远规划能力。他们能够看到事物背后的深层规律和未来的可能性，并用严谨的逻辑体系将愿景转化为可执行的计划。INTJ对知识有近乎贪婪的渴求，不断追求理解事物的本质。他们独立自主，对自己的判断有着近乎固执的信心。',
    coreMotivation: '实现自己的愿景，建立秩序，达成卓越，不断改进系统和自身',
    coreFear: '无能为力，无法掌控，被他人操纵，自己的能力被浪费',
    strengths: [
      '卓越的战略思维和长远规划能力',
      '独立思考，不盲从权威',
      '高度的知识整合和系统化能力',
      '坚定的意志力和决心',
      '精益求精，追求卓越',
      '诚实直接，不虚伪客套',
      '强大的逻辑分析和批判思维'
    ],
    growthAreas: [
      '表达情感和建立情感连接',
      '欣赏他人的不同思维方式',
      '接受不完美和适当妥协',
      '更加开放地分享思考过程',
      '活在当下，享受感官体验'
    ],
    blindSpots: [
      '过度自信，忽视他人意见',
      '对低效率的容忍度极低',
      '不擅长处理琐碎的细节事务',
      '难以表达温情和赞许',
      '容易过度复杂化简单问题'
    ],
    stressResponse: '当INTJ处于长期压力下时，会陷入"INTJ失控回路"：突然变得过度放纵感官享乐（Se爆发），或陷入极端的自我怀疑和情绪化（Fi爆发）。平时极度自律的他们可能会突然暴饮暴食、刷剧通宵或无目的购物。',
    underStress: [
      '变得异常暴躁和不耐烦',
      '对愚蠢的容忍度降到零',
      '陷入细节强迫和完美主义瘫痪',
      '突然放纵感官欲望',
      '闭门不出，断绝社交',
      '过度怀疑自己的判断'
    ],
    healthyState: [
      '开放地分享知识和见解',
      '接受建设性的批评',
      '灵活调整计划',
      '真诚地欣赏他人',
      '平衡工作与生活',
      '享受当下的美好'
    ],
    relationshipStyle: {
      loveLanguage: ['高质量陪伴', '服务的行动', '礼物的实用性'],
      attachmentStyle: '疏离型/安全型',
      communication: '直接、逻辑、不绕弯，讨厌情绪化对话',
      conflict: '指出问题，分析原因，提出解决方案，拒绝翻旧账'
    },
    careerInsights: {
      idealEnvironments: ['高自主性', '复杂挑战', '少官僚主义', '聪明的同事', '结果导向'],
      naturalStrengths: ['战略规划', '系统架构', '风险预测', '复杂问题解决', '质量把控'],
      commonRoles: ['架构师', '战略顾问', '科学家', '投资分析师', '产品经理', '创业者'],
      toWatch: ['避免微观管理', '多给下属成长空间', '多认可团队贡献']
    },
    developmentPaths: [
      {
        focus: '发展Se功能',
        practices: [
          '每天10分钟冥想，专注于呼吸和身体感受',
          '学习一项需要身体协调的运动',
          '烹饪并认真品尝每一口食物',
          '在自然中散步，留意周围的细节',
          '拥抱即兴，尝试一次不做计划的旅行'
        ]
      },
      {
        focus: '发展Fi功能',
        practices: [
          '每天记录情绪日记',
          '主动向亲近的人表达感谢',
          '在讨论中先肯定再指出问题',
          '学会说"这伤害了我的感受"',
          '培养一项纯粹为了快乐的爱好'
        ]
      }
    ],
    famousPeople: ['埃隆·马斯克', '尼古拉·特斯拉', '艾萨克·牛顿', '弗里德里希·尼采', '玛丽·居里', '克里斯托弗·诺兰', '甘道夫 - 指环王'],
    cognitiveStack: [
      {
        function: '直觉 N',
        attitude: '内倾 i',
        description: '主导功能 - 洞察未来',
        manifestation: '潜意识中处理海量信息，产生关于未来的洞见和预测'
      },
      {
        function: '思维 T',
        attitude: '外倾 e',
        description: '辅助功能 - 执行落地',
        manifestation: '建立系统和秩序，将愿景转化为可执行的逻辑框架'
      },
      {
        function: '情感 F',
        attitude: '内倾 i',
        description: '第三功能 - 价值判断',
        manifestation: '内在的价值观和正义感，通常只在亲密关系中显现'
      },
      {
        function: '感觉 S',
        attitude: '外倾 e',
        description: '劣势功能 - 阿喀琉斯之踵',
        manifestation: '活在当下的困难，对细节的不耐烦，压力下的失控点'
      }
    ]
  },
  INTP: {
    code: 'INTP',
    name: '逻辑学家',
    nickname: '沉思者',
    population: '3.3%',
    temperaments: ['理性主义者', 'NT'],
    dominant: 'Ti - 内倾思维',
    auxiliary: 'Ne - 外倾直觉',
    tertiary: 'Si - 内倾感觉',
    inferior: 'Fe - 外倾情感',
    coreDescription: 'INTP是永无止境的思考者，他们对知识的追求本身就是目的。INTP痴迷于理论、逻辑和系统的底层规律，他们质疑一切，包括"质疑"本身。大多数人对INTP的印象是"那个看起来在发呆，但实际上在思考宇宙本质的人"。他们是16型中最接近"纯粹理性"的存在。',
    coreMotivation: '理解宇宙万物的运行规律，建立逻辑自洽的知识体系',
    coreFear: '逻辑上的自相矛盾，无知，认知局限，被自己的情绪愚弄',
    strengths: [
      '超凡的逻辑分析和系统建模能力',
      '深度的智力好奇心',
      '怀疑精神，不接受简单答案',
      '思维灵活，能容纳矛盾的观点',
      '极端的知识诚实',
      '跳出框架的创造力',
      '几乎无限的专注力'
    ],
    growthAreas: [
      '完成已经开始的项目',
      '处理实用的日常事务',
      '情感表达和社交礼仪',
      '接受足够好而非完美',
      '执行力和交付能力'
    ],
    blindSpots: [
      '分析瘫痪 - 永远在收集信息永远不行动',
      '对效率低的人极度不耐心',
      '社交钝感，无意中伤害他人',
      '对世俗成功的蔑视导致自我埋没',
      '难以完成无聊的收尾工作'
    ],
    stressResponse: 'INTP在压力下会陷入"Ti-Fe循环"：一边极度怀疑自己的能力，一边又因为别人的不认可而愤怒。他们可能会退缩到自己的思维世界中，断绝一切联系，或者相反 - 突然爆发愤怒的批评，攻击他人的逻辑漏洞。',
    underStress: [
      '变得更加孤僻和沉默',
      '陷入无穷尽的分析却不行动',
      '对愚蠢的容忍度为负数',
      '情绪爆发然后立刻后悔',
      '放弃所有日常作息',
      '偏执地寻找逻辑漏洞'
    ],
    healthyState: [
      '将思想转化为行动',
      '耐心地向他人解释',
      '接受"足够好就可以"',
      '真诚地关心他人感受',
      '享受社交互动',
      '完成有趣的项目'
    ],
    relationshipStyle: {
      loveLanguage: ['高质量陪伴（一起发呆）', '智识交流', '私人空间'],
      attachmentStyle: '疏离型',
      communication: '精确、严密、爱抠定义，讨厌泛泛而谈',
      conflict: '指出对方的57个逻辑错误，忘记最初在吵什么'
    },
    careerInsights: {
      idealEnvironments: ['最少的规则', '智力挑战', '自主节奏', '最小化社交', '纯粹的问题解决'],
      naturalStrengths: ['架构设计', '根因分析', '理论构建', '疑难问题排查', '创新思维'],
      commonRoles: ['研究员', '软件架构师', '数据科学家', '哲学家', '数学家', '独立顾问'],
      toWatch: ['避免只做有趣的部分', '项目完成度', '文档和沟通']
    },
    developmentPaths: [
      {
        focus: '发展Fe功能',
        practices: [
          '每天真心赞美一个人',
          '学习识别面部表情和语气',
          '在纠正之前先说"这是个好观点"',
          '练习主动关心朋友的生活',
          '参加一次团体活动'
        ]
      },
      {
        focus: '发展J属性 - 交付能力',
        practices: [
          '设定明确的截止日期并强制执行',
          '每周完成一个小项目',
          '学习区分"完美"和"交付"',
          '建立简单的日常流程',
          '先完成再优化'
        ]
      }
    ],
    famousPeople: ['阿尔伯特·爱因斯坦', '查尔斯·达尔文', '艾伦·图灵', '比尔·盖茨', '亚伯拉罕·林肯', '瑞克 - 瑞克和莫蒂', '苏格拉底'],
    cognitiveStack: [
      {
        function: '思维 T',
        attitude: '内倾 i',
        description: '主导功能 - 逻辑框架',
        manifestation: '构建内部自洽的逻辑系统，分析一切的底层规则'
      },
      {
        function: '直觉 N',
        attitude: '外倾 e',
        description: '辅助功能 - 连接发散',
        manifestation: '在不同领域之间发现隐藏的联系，产生新奇的想法'
      },
      {
        function: '感觉 S',
        attitude: '内倾 i',
        description: '第三功能 - 数据存储',
        manifestation: '存储大量的理论和数据，作为逻辑分析的素材'
      },
      {
        function: '情感 F',
        attitude: '外倾 e',
        description: '劣势功能 - 阿喀琉斯之踵',
        manifestation: '社交和谐的困难，情绪表达的笨拙，压力下的爆发点'
      }
    ]
  },
  ENTJ: {
    code: 'ENTJ',
    name: '指挥官',
    nickname: '天生领袖',
    population: '1.8%',
    temperaments: ['理性主义者', 'NT'],
    dominant: 'Te - 外倾思维',
    auxiliary: 'Ni - 内倾直觉',
    tertiary: 'Se - 外倾感觉',
    inferior: 'Fi - 内倾情感',
    coreDescription: 'ENTJ是天生的领导者和组织者，他们的使命是将愿景变为现实。他们具有强大的意志力和驱动力，能够看到什么是可能的，然后召集资源去实现。ENTJ绝不接受"不可能"作为答案 - 他们只把这当作需要解决的另一个问题。他们是高效的系统建造者和变革推动者。',
    coreMotivation: '达成目标，建立帝国，实现大规模的愿景，留下遗产',
    coreFear: '失去控制，被超越，效率低下，软弱，自己的潜力被浪费',
    strengths: [
      '强大的领导力和组织能力',
      '高效的决策和执行',
      '战略眼光和大局观',
      '直面冲突和困难的勇气',
      '永无止境的改进驱动力',
      '压力下的冷静和专注',
      '发现和培养人才的眼光'
    ],
    growthAreas: [
      '耐心和倾听的艺术',
      '同理心和情感感知',
      '欣赏过程而非只看结果',
      '承认自己也会犯错',
      '工作与生活的平衡'
    ],
    blindSpots: [
      '过度强硬和专横',
      '对情感的价值认识不足',
      '把人和人都当资源来配置',
      '工作狂倾向',
      '无法容忍无能'
    ],
    stressResponse: 'ENTJ在巨大压力下会爆发Fi的阴暗面：突然变得极度敏感和情绪化，感到自己不被欣赏不被爱。他们可能会愤怒地指责他人忘恩负义，或者相反 - 陷入深深的自我怀疑，质疑自己所有的成就是否值得。',
    underStress: [
      '变得更加控制狂',
      '容忍度零，脾气暴躁',
      '工作时间无限延长',
      '怀疑身边人的能力',
      '孤独感和被误解感',
      '过度的愤怒然后内疚'
    ],
    healthyState: [
      '导师型领导者，培养他人',
      '耐心地解释为什么',
      '真诚地认可和赞美',
      '允许其他人用他们的方式做事',
      '享受生活而非只工作',
      '承认自己的弱点'
    ],
    relationshipStyle: {
      loveLanguage: ['共同成就', '质量时间', '实际支持'],
      attachmentStyle: '安全型/控制型',
      communication: '直接、有力、目标导向，讨厌浪费时间',
      conflict: '面对问题，解决问题，然后翻篇，不记仇'
    },
    careerInsights: {
      idealEnvironments: ['快节奏', '高挑战', '高自主权', '结果导向', '增长型行业'],
      naturalStrengths: ['战略执行', '团队建设', '危机管理', '谈判', '变革推动'],
      commonRoles: ['CEO', '执行董事', '创业创始人', '管理咨询', '投资银行家', '军队指挥官'],
      toWatch: ['避免烧人', '培养耐心', '情感连接']
    },
    developmentPaths: [
      {
        focus: '发展Fi功能',
        practices: [
          '每天花5分钟感受自己的情绪',
          '做一件不求回报帮助他人的事',
          '学会说"我需要你"',
          '欣赏艺术和音乐的情感力量',
          '和自己的孩子玩一个小时不看手机'
        ]
      },
      {
        focus: '培养耐心',
        practices: [
          '在打断之前先数到3',
          '让团队自己解决问题而不插手',
          '每周冥想3次',
          '练习说"让我们听听其他人怎么想"',
          '接受有些人确实需要更多时间'
        ]
      }
    ],
    famousPeople: ['拿破仑·波拿巴', '史蒂夫·乔布斯', '富兰克林·罗斯福', '朱利叶斯·凯撒', '戈登·盖柯 - 华尔街', '玛格丽特·撒切尔'],
    cognitiveStack: [
      {
        function: '思维 T',
        attitude: '外倾 e',
        description: '主导功能 - 执行落地',
        manifestation: '建立秩序，组织资源，驱动结果，消灭低效'
      },
      {
        function: '直觉 N',
        attitude: '内倾 i',
        description: '辅助功能 - 战略洞察',
        manifestation: '看到未来的方向，识别机会和风险'
      },
      {
        function: '感觉 S',
        attitude: '外倾 e',
        description: '第三功能 - 行动落地',
        manifestation: '关注现实的资源和环境，快速采取行动'
      },
      {
        function: '情感 F',
        attitude: '内倾 i',
        description: '劣势功能 - 阿喀琉斯之踵',
        manifestation: '深层情感的盲区，不被欣赏的痛苦，压力下的爆发点'
      }
    ]
  },
  ENTP: {
    code: 'ENTP',
    name: '辩论家',
    nickname: '创新者',
    population: '3.2%',
    temperaments: ['理性主义者', 'NT'],
    dominant: 'Ne - 外倾直觉',
    auxiliary: 'Ti - 内倾思维',
    tertiary: 'Fe - 外倾情感',
    inferior: 'Si - 内倾感觉',
    coreDescription: 'ENTP是创意无限的创新者和辩论家，他们热爱思想的碰撞和智力的较量。ENTP能立刻看到任何系统中的漏洞和矛盾，并乐此不疲地指出来。他们是天生的魔鬼代言人，享受智力上的交锋和挑战。ENTP对新鲜和刺激有无限的渴望，永远在寻找下一个大想法。',
    coreMotivation: '智力刺激，创新突破，打破常规，辩论和思想交锋',
    coreFear: '无聊，被束缚，重复，智力上被超越',
    strengths: [
      '快速的思维和雄辩的口才',
      '创新思维和打破常规',
      '适应性极强，临机应变',
      '知识面广，充满好奇',
      '精力充沛，魅力十足',
      '轻松的自信和幽默感',
      '识别机会的天赋'
    ],
    growthAreas: [
      '跟进并完成项目',
      '关注细节和后续执行',
      '发展专注力',
      '并非所有事情都需要辩论',
      '信守承诺和可靠性'
    ],
    blindSpots: [
      '辩论赢了，人心输了',
      '三分钟热度，喜新厌旧',
      '容易感到无聊',
      '过度承诺，交付不足',
      '对例行公事的容忍度极低'
    ],
    stressResponse: 'ENTP在压力下会陷入Si grip：变得异常偏执于细节和程序，这是他们平时最讨厌的东西。他们可能会突然纠缠于某个微不足道的规则或者过去的错误，或者陷入深深的倦怠，对一切都感到无聊，甚至愤世嫉俗。',
    underStress: [
      '变得更加争论不休',
      '讽刺和挖苦升级',
      '注意力分散，无法专注',
      '开始很多项目一个都不完成',
      '陷入存在主义无聊',
      '偏执于细节'
    ],
    healthyState: [
      '可靠地交付创意成果',
      '做专注的聆听者',
      '将创新转化为实际价值',
      '成为有魅力的导师',
      '深度而非广度地发展',
      '建立长期有意义的关系'
    ],
    relationshipStyle: {
      loveLanguage: ['智识交流', '冒险和新鲜体验', '幽默'],
      attachmentStyle: '回避型',
      communication: '机智、好辩、充满双关和比喻',
      conflict: '把一切都变成辩论，包括吵架'
    },
    careerInsights: {
      idealEnvironments: ['快节奏', '创意自由', '最小化繁文缛节', '智力挑战', '不断变化'],
      naturalStrengths: ['头脑风暴', '机会识别', '问题重构', '说服演讲', '危机创意'],
      commonRoles: ['创业者', '产品创新', '律师', '管理咨询', '营销策划', '脱口秀演员'],
      toWatch: ['完成度', '跟进', '不要为了辩论而辩论']
    },
    developmentPaths: [
      {
        focus: '发展Si功能',
        practices: [
          '建立并坚持一个简单的日常习惯',
          '每周回顾和总结',
          '完成一个开始了超过30天的项目',
          '学习一门需要耐心的技艺',
          '记录并信守承诺'
        ]
      },
      {
        focus: '发展深度',
        practices: [
          '不抬杠练习：听到不同意见先点头不反驳',
          '一周内不主动开启辩论',
          '一个项目至少跟进到完成',
          '倾听而不只是等着轮到自己说话',
          '专注深度而非广度'
        ]
      }
    ],
    famousPeople: ['托马斯·爱迪生', '马克·吐温', '本杰明·富兰克林', '小罗伯特·唐尼', '杰克船长', '死侍', '苏格拉底'],
    cognitiveStack: [
      {
        function: '直觉 N',
        attitude: '外倾 e',
        description: '主导功能 - 创意连接',
        manifestation: '疯狂连接看似无关的事物，产生新奇的想法'
      },
      {
        function: '思维 T',
        attitude: '内倾 i',
        description: '辅助功能 - 逻辑分析',
        manifestation: '快速分析漏洞，构建辩论和反驳的逻辑'
      },
      {
        function: '情感 F',
        attitude: '外倾 e',
        description: '第三功能 - 魅力社交',
        manifestation: '机智和魅力，轻松赢得他人的好感'
      },
      {
        function: '感觉 S',
        attitude: '内倾 i',
        description: '劣势功能 - 阿喀琉斯之踵',
        manifestation: '细节和日常琐事的痛苦，压力下的偏执和无聊'
      }
    ]
  },
  INFJ: {
    code: 'INFJ',
    name: '提倡者',
    nickname: '神秘的理想主义者',
    population: '1.5%',
    temperaments: ['理想主义者', 'NF'],
    dominant: 'Ni - 内倾直觉',
    auxiliary: 'Fe - 外倾情感',
    tertiary: 'Ti - 内倾思维',
    inferior: 'Se - 外倾感觉',
    coreDescription: 'INFJ是最稀有的类型，同时也是最深刻的灵魂。他们具有与生俱来的洞察力和使命感，似乎能看透人心的本质。INFJ被成为"行走的矛盾体"：极度理想主义却又无比务实，情感丰富却又深藏不露，温柔却又无比坚定。他们毕生的追求是帮助他人成长和推动世界变好。',
    coreMotivation: '追寻意义，帮助他人成长，留下积极的影响，实现理想',
    coreFear: '意义的缺失，价值观的妥协，被误解，无力改变',
    strengths: [
      '深刻的洞察力和直觉',
      '强烈的道德感和原则性',
      '创造力和深度思考',
      '鼓舞他人的能力',
      '惊人的毅力和决心',
      '共情和理解他人',
      '长远的视野和预判'
    ],
    growthAreas: [
      '不要过度承担他人的痛苦',
      '面对冲突而非回避',
      '接受不完美的现实',
      '对自己更仁慈',
      '活在当下而非未来'
    ],
    blindSpots: [
      '过度完美主义',
      '不切实际的理想',
      '容易 burnout  burnout',
      '难以原谅自己',
      '过度解读他人动机'
    ],
    stressResponse: 'INFJ在压力下会进入"Ni-Ti循环"：从世界中彻底退缩，陷入无穷尽的黑暗思考和自我怀疑。他们可能会变得异常冷酷和批判，或者陷入存在主义的绝望。他们会关闭Fe，对所有人都冷漠疏离，这在外人看来非常不像平时的INFJ。',
    underStress: [
      '从所有人际中撤退',
      '陷入黑暗的存在主义思考',
      '过度解读和偏执',
      '异常的冷酷和疏离',
      '身心俱疲 burnout',
      '强烈的无意义感'
    ],
    healthyState: [
      '深刻而温暖的连接',
      '用自己的天赋帮助他人',
      '接受现实和不完美',
      '平衡理想与现实',
      '自我慈悲',
      '强大的边界和温柔的心'
    ],
    relationshipStyle: {
      loveLanguage: ['深度灵魂交流', '理解和看见', '忠诚和承诺'],
      attachmentStyle: '焦虑型/安全型',
      communication: '深刻、隐喻、多义，追求灵魂的共鸣',
      conflict: '表面和谐，内心积累，然后彻底断绝'
    },
    careerInsights: {
      idealEnvironments: ['有意义的使命', '和谐的人际', '创造性', '自主性', '成长导向'],
      naturalStrengths: ['洞察人心', '愿景沟通', '价值观引导', '创造性问题解决', '辅导和培养'],
      commonRoles: ['心理咨询师', '教师/导师', '作家', '非营利组织', '人力资源', '精神导师'],
      toWatch: ['避免过度承担', '设立边界', '自我照顾']
    },
    developmentPaths: [
      {
        focus: '发展Se功能',
        practices: [
          '身体扫描冥想',
          '从事园艺或手工活动',
          '每天运动30分钟',
          '不拍照，只用眼睛欣赏美景',
          '拥抱阳光、风和雨'
        ]
      },
      {
        focus: '设立健康边界',
        practices: [
          '每周说"不"至少一次',
          '删除消耗你的人',
          '你的需求和别人的一样重要',
          '定期独处充电',
          '接受"让别人失望也没关系"'
        ]
      }
    ],
    famousPeople: ['卡尔·荣格', '马丁·路德·金', '纳尔逊·曼德拉', '特蕾莎修女', '摩根·弗里曼', '甘地', 'Lady Gaga'],
    cognitiveStack: [
      {
        function: '直觉 N',
        attitude: '内倾 i',
        description: '主导功能 - 深度洞察',
        manifestation: '对人心和意义的深层感知，预见未来的可能性'
      },
      {
        function: '情感 F',
        attitude: '外倾 e',
        description: '辅助功能 - 连接滋养',
        manifestation: '和谐的连接，理解和支持他人的成长'
      },
      {
        function: '思维 T',
        attitude: '内倾 i',
        description: '第三功能 - 系统构建',
        manifestation: '将洞察系统化，构建框架和理论'
      },
      {
        function: '感觉 S',
        attitude: '外倾 e',
        description: '劣势功能 - 阿喀琉斯之踵',
        manifestation: '与当下脱节，身体感知迟钝，压力下的崩溃点'
      }
    ]
  },
  INFP: {
    code: 'INFP',
    name: '调停者',
    nickname: '诗意的梦想家',
    population: '4.4%',
    temperaments: ['理想主义者', 'NF'],
    dominant: 'Fi - 内倾情感',
    auxiliary: 'Ne - 外倾直觉',
    tertiary: 'Si - 内倾感觉',
    inferior: 'Te - 外倾思维',
    coreDescription: 'INFP是诗意的灵魂和永恒的理想主义者。他们的内心世界远比外在丰富 - 一个充满了幻想、理想和深刻情感的宇宙。INFP毕生都在追寻真实、意义和 Authenticity。他们对人性抱有最温柔也最坚定的信念，即使见过世界的黑暗，依然选择相信善良。',
    coreMotivation: '忠于自我，追寻意义，做真实的自己，治愈世界的伤痛',
    coreFear: '背叛自我，价值观的妥协，虚伪，存在的无意义',
    strengths: [
      '深厚的共情和理解',
      '诗意的创造力和想象力',
      '坚定的价值观和正直',
      '开放和包容',
      '对人性的深刻洞察',
      '理想主义和热情',
      '忠于所爱之人'
    ],
    growthAreas: [
      '实际行动和执行力',
      '面对冲突而非逃避',
      '处理现实和日常事务',
      '不要过度个人化',
      '自我慈悲而非自我批评'
    ],
    blindSpots: [
      '过度理想化',
      '逃避冲突和批评',
      '拖延和执行力弱',
      '容易感到被攻击',
      '不切实际的完美主义'
    ],
    stressResponse: 'INFP在压力下会爆发Te grip：变得异常暴躁、控制和批判，这与他们平时的形象天差地别。他们可能会突然苛刻地指责周围所有人的无能和低效，或者陷入强迫性的整理和组织。或者他们会彻底关闭，进入漫长的冬眠期。',
    underStress: [
      '漫长的情绪内耗',
      '逃离到幻想世界',
      '突然爆发愤怒然后崩溃',
      '强迫性自我批判',
      '完全失去执行力',
      '感到被所有人误解'
    ],
    healthyState: [
      '将理想转化为实际行动',
      '深刻的自我接纳',
      '创造性地表达自己',
      '温暖地支持他人',
      '平衡梦想与现实',
      '柔软但有边界'
    ],
    relationshipStyle: {
      loveLanguage: ['深度理解', '真诚连接', '一起做无意义但美好的事'],
      attachmentStyle: '焦虑型/恐惧型',
      communication: '诗意、隐喻、情绪化，追求心与心的触碰',
      conflict: '逃跑，然后在心里翻来覆去想三年'
    },
    careerInsights: {
      idealEnvironments: ['创意自由', '价值一致', '和谐人际', '自主性', '自我表达'],
      naturalStrengths: ['创意写作', '辅导支持', '价值观对齐', '创新解决', '共情沟通'],
      commonRoles: ['作家/诗人', '艺术/设计', '心理咨询', '教师', '非营利', '研究员'],
      toWatch: ['执行力', '截止日期', '不要只做热爱的部分']
    },
    developmentPaths: [
      {
        focus: '发展Te功能',
        practices: [
          '每天做一件你一直拖延的事',
          '建立微小的日常结构',
          '设定SMART目标并执行',
          '接受"完成比完美更重要"',
          '学习理财和实用技能'
        ]
      },
      {
        focus: '自我慈悲',
        practices: [
          '像对待最好的朋友那样对待自己',
          '允许自己不完美',
          '停止内耗的正念练习',
          '每周一天完全不评判自己',
          '庆祝小的胜利'
        ]
      }
    ],
    famousPeople: ['威廉·莎士比亚', 'J.R.R.托尔金', '弗吉尼亚·伍尔夫', '小王子', '约翰·列侬', '科特·柯本', '梵高'],
    cognitiveStack: [
      {
        function: '情感 F',
        attitude: '内倾 i',
        description: '主导功能 - 价值判断',
        manifestation: '深刻的内在价值体系，对真实和意义的永恒追求'
      },
      {
        function: '直觉 N',
        attitude: '外倾 e',
        description: '辅助功能 - 想象连接',
        manifestation: '诗意的连接，隐喻和象征，无限的可能性'
      },
      {
        function: '感觉 S',
        attitude: '内倾 i',
        description: '第三功能 - 深度记忆',
        manifestation: '存储深刻的情感记忆和价值体验'
      },
      {
        function: '思维 T',
        attitude: '外倾 e',
        description: '劣势功能 - 阿喀琉斯之踵',
        manifestation: '执行和现实事务的痛苦，压力下的爆发点'
      }
    ]
  },
  ENFJ: {
    code: 'ENFJ',
    name: '主人公',
    nickname: '魅力领袖',
    population: '2.5%',
    temperaments: ['理想主义者', 'NF'],
    dominant: 'Fe - 外倾情感',
    auxiliary: 'Ni - 内倾直觉',
    tertiary: 'Se - 外倾感觉',
    inferior: 'Ti - 内倾思维',
    coreDescription: 'ENFJ是天生的导师和魅力领袖，他们似乎能读懂每一个人的潜能，并激励他们达成它。ENFJ有着磁石般的人格魅力，能够团结不同的人朝向共同的愿景前进。他们真诚地关心他人的成长和福祉，并愿意为此投入大量的时间和精力。他们是世界的催化剂和赋能者。',
    coreMotivation: '帮助他人实现潜能，建立连接，创造积极的改变',
    coreFear: '辜负他人的信任，不被需要，无法产生影响',
    strengths: [
      '超凡的魅力和感染力',
      '识别和培养人才的天赋',
      '卓越的沟通和激励能力',
      '强大的组织和协调能力',
      '真诚的关心和利他精神',
      '责任感和可靠性',
      '团结和凝聚团队'
    ],
    growthAreas: [
      '照顾自己的需求',
      '不要过度承担他人情绪',
      '接受无法帮助所有人',
      '发展批判性思维',
      '面对而非回避冲突'
    ],
    blindSpots: [
      '过度承担和讨好',
      '容易 burnout',
      '操纵他人的无意识倾向',
      '回避不愉快的真相',
      '对忘恩负义感到痛苦'
    ],
    stressResponse: 'ENFJ在压力下会爆发Ti grip：突然变得异常冷静、批判和疏离。他们会从情感模式切换到过度分析，并且可能会用刻薄的逻辑指出所有人的虚伪。或者他们会彻底崩溃，感到自己所有的付出都不被珍惜，所有人都忘恩负义。',
    underStress: [
      '承担越来越多然后崩溃',
      '过度干涉他人的问题',
      '压抑怨恨然后爆发',
      '怀疑自己不够好',
      '失眠和健康问题',
      '突然的冷漠和抽离'
    ],
    healthyState: [
      '赋能型领导者和导师',
      '真诚地创造积极影响',
      '平衡付出和自我照顾',
      '健康的边界',
      '面对并处理冲突',
      '接受帮助的同时给予帮助'
    ],
    relationshipStyle: {
      loveLanguage: ['深度连接', '支持和鼓励', '共同成长'],
      attachmentStyle: '焦虑型/安全型',
      communication: '温暖、激励、有感染力，让每个人感到被看见',
      conflict: '先维护和谐，然后解决问题，避免伤害感情'
    },
    careerInsights: {
      idealEnvironments: ['人际导向', '成长使命', '合作', '积极的文化', '多元化'],
      naturalStrengths: ['团队建设', '人才发展', '愿景沟通', '培训教练', '变革领导'],
      commonRoles: ['教师/教授', '人力资源', '组织发展', '销售领导', '非营利管理', '政治家'],
      toWatch: ['避免过度付出', '边界', '自我照顾']
    },
    developmentPaths: [
      {
        focus: '发展Ti功能',
        practices: [
          '每周一小时完全独处不社交',
          '学习客观批判思维',
          '接受有些人你就是帮不了',
          '学习逻辑和系统思维',
          '练习说"这不关我的事"'
        ]
      },
      {
        focus: '自我照顾',
        practices: [
          '每天至少做一件只为自己的事',
          '说"不"而不解释',
          '把自己排在优先级的前三位',
          '定期从"照顾者"角色中休息',
          '接受你不需要让所有人满意'
        ]
      }
    ],
    famousPeople: ['巴拉克·奥巴马', '奥普拉·温弗瑞', '马丁·路德·金', '教宗方济各', '珍妮弗·劳伦斯', '神奇女侠', '梅西'],
    cognitiveStack: [
      {
        function: '情感 F',
        attitude: '外倾 e',
        description: '主导功能 - 连接和谐',
        manifestation: '创造人际和谐，理解并激励他人，凝聚群体的力量'
      },
      {
        function: '直觉 N',
        attitude: '内倾 i',
        description: '辅助功能 - 愿景洞察',
        manifestation: '看到人的潜能和成长的可能性'
      },
      {
        function: '感觉 S',
        attitude: '外倾 e',
        description: '第三功能 - 务实行动',
        manifestation: '采取实际行动帮助他人，关注当下的需求'
      },
      {
        function: '思维 T',
        attitude: '内倾 i',
        description: '劣势功能 - 阿喀琉斯之踵',
        manifestation: '客观批判的困难，付出不被认可的痛苦，压力下的爆发点'
      }
    ]
  },
  ENFP: {
    code: 'ENFP',
    name: '竞选者',
    nickname: '活力四射的梦想家',
    population: '8.1%',
    temperaments: ['理想主义者', 'NF'],
    dominant: 'Ne - 外倾直觉',
    auxiliary: 'Fi - 内倾情感',
    tertiary: 'Te - 外倾思维',
    inferior: 'Si - 内倾感觉',
    coreDescription: 'ENFP是充满活力的梦想家和社交蝴蝶，他们对生活充满热情和好奇。ENFP能在任何地方发现联系和可能性，他们的热情极具感染力，能够激发周围所有人的正能量。ENFP的核心是自由和真实 - 他们拒绝被定义，拒绝无聊，拒绝虚伪。他们是永远的乐观主义者，相信一切皆有可能。',
    coreMotivation: '自由，连接，可能性，自我表达，创造快乐和意义',
    coreFear: '被束缚，失去自由，无聊，重复，存在的无意义',
    strengths: [
      '热情和感染力',
      '创意和想象力',
      '出色的沟通和社交能力',
      '激励和鼓舞他人',
      '适应性强，拥抱变化',
      '精力充沛，好奇心强',
      '开放和包容'
    ],
    growthAreas: [
      '专注力和完成度',
      '跟进和细节',
      '处理日常例行公事',
      '情绪稳定性',
      '深度而非广度'
    ],
    blindSpots: [
      '三分钟热度，跳来跳去',
      '容易分心',
      '过度承诺',
      '逃避不愉快的细节',
      '情绪过山车'
    ],
    stressResponse: 'ENFP在压力下会进入Si grip：变得异常执着于过去和细节，这是他们平时最不在乎的东西。他们可能会陷入对某个微小冒犯的反复回想，或者过度关注健康和日常程序。更常见的是，他们会开始一个又一个新项目，试图逃避正在面对的问题。',
    underStress: [
      '注意力极度分散',
      '情绪波动剧烈',
      '开始N个项目一个都不完成',
      '深夜崩溃大哭然后第二天没事人',
      '社交过度然后彻底社恐',
      '存在主义无聊发作'
    ],
    healthyState: [
      '创造性地实现自己的愿景',
      '深度而有趣的连接',
      '可靠地交付成果',
      '平衡自由和责任',
      '带来快乐和正能量',
      '自由但扎根'
    ],
    relationshipStyle: {
      loveLanguage: ['冒险和新鲜体验', '深度连接', '大量赞美'],
      attachmentStyle: '焦虑型/痴迷型',
      communication: '热情、跳跃、充满比喻和emoji，话题随时漂移',
      conflict: '情绪化爆炸然后立刻道歉和抱抱'
    },
    careerInsights: {
      idealEnvironments: ['创意自由', '社交互动', '不断变化', '有趣的人', '最小化规则'],
      naturalStrengths: ['头脑风暴', '激励团队', '创意营销', '关系建立', '机会识别'],
      commonRoles: ['市场营销', '记者', '演员', '创业者', '销售', '培训师'],
      toWatch: ['完成度', '专注度', '细节跟进']
    },
    developmentPaths: [
      {
        focus: '发展Si功能',
        practices: [
          '建立晨间例行程序并坚持30天',
          '每周日晚做周回顾和计划',
          '坚持一个爱好超过3个月',
          '学习财务管理',
          '创建并使用检查清单'
        ]
      },
      {
        focus: '专注力训练',
        practices: [
          '番茄工作法：25分钟专注5分钟休息',
          '一次只做一个项目',
          '手机放另一个房间',
          '练习深度工作',
          '说"不"给90%的好机会，留给真正伟大的'
        ]
      }
    ],
    famousPeople: ['罗宾·威廉姆斯', '威尔·史密斯', '艾伦·德杰尼勒斯', 'RM 防弹少年团', '金·凯瑞', '赫敏·格兰杰', '安徒生'],
    cognitiveStack: [
      {
        function: '直觉 N',
        attitude: '外倾 e',
        description: '主导功能 - 可能性探索',
        manifestation: '疯狂的连接，无限的可能性，永远的新鲜感'
      },
      {
        function: '情感 F',
        attitude: '内倾 i',
        description: '辅助功能 - 价值驱动',
        manifestation: '由个人价值和真实性引导，拒绝虚伪'
      },
      {
        function: '思维 T',
        attitude: '外倾 e',
        description: '第三功能 - 行动落地',
        manifestation: '驱动想法向前，动员资源和人'
      },
      {
        function: '感觉 S',
        attitude: '内倾 i',
        description: '劣势功能 - 阿喀琉斯之踵',
        manifestation: '细节和日常的痛苦，无聊是最大的敌人'
      }
    ]
  }
}

export function getMBTITheory(code: string): TypeProfile {
  return MBTI_TYPE_THEORY[code.toUpperCase()] || MBTI_TYPE_THEORY['INTJ']
}

export default MBTI_TYPE_THEORY
