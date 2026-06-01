import { Question, Assessment } from '../types';

// GAD-7+扩展版 量表选项
export const GAD7_RESPONSE_OPTIONS = [
  { value: 0, label: '完全不会', color: 'bg-green-100 text-green-800' },
  { value: 1, label: '好几天', color: 'bg-yellow-100 text-yellow-800' },
  { value: 2, label: '超过一半的天数', color: 'bg-orange-100 text-orange-800' },
  { value: 3, label: '几乎每天', color: 'bg-red-100 text-red-800' }
];

// GAD-7+扩展版 测评信息
export const GAD7_ASSESSMENT: Assessment = {
  id: 'anxiety-gad7',
  title: '全面焦虑水平测试',
  description: '基于GAD-7等多个专业量表的综合焦虑评估，帮助您深入了解过去2周内的焦虑状况。',
  category: '心理健康',
  totalQuestions: 28,
  icon: '🧠',
  difficulty: '中等',
  estimatedTime: '8分钟'
};

// GAD-7+扩展版题目 - 共28题
// 分为7个维度，每个维度4题
export const GAD7_QUESTIONS: Question[] = [
  // ========== 维度1: 过度担忧 (Original GAD-7) ==========
  {
    id: 'gad7_q1',
    text: '即使在没有任何明确威胁的情况下，我也会感到一种说不清的不安，仿佛有什么不好的事即将发生',
    trait: 'worries',
    reverse: false
  },
  {
    id: 'gad7_q2',
    text: '我明明知道某件事不值得担心，但大脑就是自动开始反复推演各种可能的坏结果',
    trait: 'worries',
    reverse: false
  },
  {
    id: 'gad7_q3',
    text: '我会为一些别人觉得微不足道的事情提前做最坏的打算，比如出门前反复确认门窗是否锁好',
    trait: 'worries',
    reverse: false
  },
  {
    id: 'ext_worry_1',
    text: '当一件事情还没有确定结果时，我会忍不住在脑海中预演所有可能的糟糕结局，即使大多数都不会发生',
    trait: 'worries',
    reverse: false
  },

  // ========== 维度2: 运动性紧张 ==========
  {
    id: 'gad7_q4',
    text: '即使是在周末或假期，我的大脑也像一台关不掉的机器，不停地运转，无法真正享受休息',
    trait: 'tension',
    reverse: false
  },
  {
    id: 'gad7_q5',
    text: '在需要安静坐着的场合（如开会、看电影），我会不自觉地抖腿、搓手或频繁变换姿势',
    trait: 'tension',
    reverse: false
  },
  {
    id: 'ext_tension_1',
    text: '到了晚上才发现自己肩膀一直紧绷着，或者下颌因为长时间咬紧而酸痛',
    trait: 'tension',
    reverse: false
  },
  {
    id: 'ext_tension_2',
    text: '等待结果或消息时，我会反复查看手机、来回踱步，或者不自觉地咬嘴唇、抠手指',
    trait: 'tension',
    reverse: false
  },

  // ========== 维度3: 易激惹 ==========
  {
    id: 'gad7_q6',
    text: '当事情没有按预期发展时，我需要比以前更长的时间才能恢复平静',
    trait: 'irritability',
    reverse: false
  },
  {
    id: 'ext_irritability_1',
    text: '别人一句无心的话或一个小小的延误，就能让我瞬间爆发强烈的烦躁感',
    trait: 'irritability',
    reverse: false
  },
  {
    id: 'ext_irritability_2',
    text: '排队等待、交通堵塞或网速变慢这些日常小事，现在会让我感到难以忍受',
    trait: 'irritability',
    reverse: false
  },
  {
    id: 'ext_irritability_3',
    text: '事后回想起来，我发现自己对亲近的人说了过分的话，但当时就是控制不住语气',
    trait: 'irritability',
    reverse: false
  },

  // ========== 维度4: 恐惧/焦虑感受 ==========
  {
    id: 'gad7_q7',
    text: '有时候会突然涌上一股莫名的恐惧感，心跳加速，但完全说不清在怕什么',
    trait: 'fear',
    reverse: false
  },
  {
    id: 'ext_fear_1',
    text: '在某些安全的环境里（如家中、办公室），我也会突然感到一种不真实的威胁感，好像周围的一切随时会崩塌',
    trait: 'fear',
    reverse: false
  },
  {
    id: 'ext_fear_2',
    text: '我担心自己会在公共场合突然失控——比如晕倒、崩溃或做出丢脸的事',
    trait: 'fear',
    reverse: false
  },
  {
    id: 'ext_fear_3',
    text: '我会刻意回避某些特定的场景（如密闭空间、高处、人多的地方），因为一想到要去就感到窒息般的恐惧',
    trait: 'fear',
    reverse: false
  },

  // ========== 维度5: 躯体症状 ==========
  {
    id: 'ext_physical_1',
    text: '在没有进行体力活动的情况下，我会突然感到心脏砰砰跳，甚至能感觉到脉搏在脖子上跳动',
    trait: 'physical',
    reverse: false
  },
  {
    id: 'ext_physical_2',
    text: '有时候会觉得空气不够用，需要深吸一口气才能缓解胸口那种被压住的感觉',
    trait: 'physical',
    reverse: false
  },
  {
    id: 'ext_physical_3',
    text: '在并不热的房间里，我的手心却不断冒汗，或者手指冰凉到握不住笔',
    trait: 'physical',
    reverse: false
  },
  {
    id: 'ext_physical_4',
    text: '一遇到紧张的事情，我的胃就会先有反应——要么翻江倒海，要么完全吃不下东西',
    trait: 'physical',
    reverse: false
  },

  // ========== 维度6: 认知症状 ==========
  {
    id: 'ext_cognitive_1',
    text: '阅读同一段文字需要反复看好几遍，因为思绪总是飘到别的事情上',
    trait: 'cognitive',
    reverse: false
  },
  {
    id: 'ext_cognitive_2',
    text: '面对需要做决定的时候，脑子里同时涌出太多想法，反而什么都想不清楚',
    trait: 'cognitive',
    reverse: false
  },
  {
    id: 'ext_cognitive_3',
    text: '某件已经过去的事会在脑海中反复回放，我告诉自己别想了，但过一会儿它又冒出来',
    trait: 'cognitive',
    reverse: false
  },
  {
    id: 'ext_cognitive_4',
    text: '即使一切顺利，我也会忍不住想"万一出了问题怎么办"，这种念头像背景噪音一样挥之不去',
    trait: 'cognitive',
    reverse: false
  },

  // ========== 维度7: 社会功能影响 ==========
  {
    id: 'ext_social_1',
    text: '收到聚会邀请时，我的第一反应是找理由推掉，即使去了也一直在想什么时候能离开',
    trait: 'social',
    reverse: false
  },
  {
    id: 'ext_social_2',
    text: '因为焦虑的干扰，完成同样的任务需要比以前花更多时间，而且经常出错',
    trait: 'social',
    reverse: false
  },
  {
    id: 'ext_social_3',
    text: '以前喜欢的事情（如运动、画画、旅行），现在提不起劲去做，总觉得"算了，太麻烦"',
    trait: 'social',
    reverse: false
  },
  {
    id: 'ext_social_4',
    text: '我会绕远路避开某些地方，或者提前规划好逃跑路线，只为了不去面对那种被围困的感觉',
    trait: 'social',
    reverse: false
  }
];

// GAD-7 焦虑水平解释
export const ANXIETY_LEVELS = {
  minimal: {
    name: '正常水平',
    range: [0, 16],
    color: 'green',
    description: '您目前的焦虑水平在正常范围内。',
    detailed: {
      physicalSigns: ['情绪平静', '睡眠良好', '身体放松', '食欲正常'],
      emotionalSigns: ['心态稳定', '能够积极应对挑战', '对未来保持乐观'],
      cognitiveSigns: ['思维清晰', '注意力集中', '决策能力正常']
    },
    recommendations: {
      continue: ['继续保持健康的生活作息', '维持规律的运动习惯', '保持积极的社交联系'],
      enhance: ['定期进行放松练习', '关注自己的情绪状态'],
      watch: ['不过度思虑未来的不确定性', '合理安排工作与休息时间']
    },
    dailyPractices: [
      '每天记录3件感恩的事情',
      '保持7-8小时的规律睡眠',
      '每周3-4次有氧运动',
      '与家人朋友保持良好沟通'
    ]
  },
  mild: {
    name: '轻度焦虑',
    range: [17, 33],
    color: 'yellow',
    description: '您可能有一些轻微的焦虑症状，但整体可控。',
    detailed: {
      physicalSigns: ['偶尔感到肌肉紧张', '睡眠质量略有下降', '有时感到疲劳'],
      emotionalSigns: ['偶尔感到烦躁', '对某些事情过度担忧', '难以快速放松'],
      cognitiveSigns: ['注意力偶尔分散', '会反复思考某些问题']
    },
    recommendations: {
      immediate: ['开始规律的放松练习', '增加户外活动时间'],
      medium: ['学习认知调节技巧', '建立健康的生活习惯'],
      longTerm: ['培养应对压力的策略', '了解焦虑的心理机制']
    },
    dailyPractices: [
      '每天进行10分钟的深呼吸练习',
      '记录焦虑触发因素',
      '保持规律的作息时间',
      '尝试冥想或正念练习'
    ]
  },
  moderate: {
    name: '中度焦虑',
    range: [34, 50],
    color: 'orange',
    description: '您目前有较为明显的焦虑症状，建议寻求专业帮助。',
    detailed: {
      physicalSigns: ['经常感到肌肉紧张', '睡眠问题明显', '容易感到疲惫', '可能有心悸症状'],
      emotionalSigns: ['经常感到烦躁不安', '持续的过度担忧', '容易被小事激怒'],
      cognitiveSigns: ['注意力难以集中', '总是往坏处想', '决策困难']
    },
    recommendations: {
      urgent: ['考虑咨询心理健康专业人士', '与信任的人分享您的困扰'],
      medical: ['如果症状持续超过2周，建议就医'],
      lifestyle: ['减少咖啡因摄入', '保证充足睡眠', '避免酒精和尼古丁'],
      selfCare: ['每天坚持放松练习', '减少不必要的压力源']
    },
    dailyPractices: [
      '每天进行20分钟的渐进式肌肉放松',
      '记录焦虑日记，识别触发模式',
      '进行规律的轻度运动',
      '练习专注当下的正念技巧'
    ]
  },
  severe: {
    name: '重度焦虑',
    range: [51, 84],
    color: 'red',
    description: '您目前的焦虑症状较为严重，强烈建议尽快寻求专业帮助。',
    detailed: {
      physicalSigns: ['持续的肌肉紧张', '严重睡眠问题', '频繁的头痛或身体不适', '明显的心悸或呼吸急促'],
      emotionalSigns: ['持续的恐慌感', '难以控制的烦躁', '感到无法应对', '可能有抑郁情绪'],
      cognitiveSigns: ['难以正常思考', '总是担心最坏的结果', '回避正常活动', '感觉生活失控']
    },
    recommendations: {
      urgent: ['立即寻求专业心理咨询或治疗', '请身边人陪同就医'],
      medical: ['请尽快就诊精神科或心理科', '考虑专业评估和治疗'],
      lifestyle: ['避免酒精和刺激性物质', '保证基本的休息和营养', '不要独处太久'],
      professional: ['考虑认知行为疗法(CBT)', '在医生指导下考虑药物治疗']
    },
    dailyPractices: [
      '每2小时做一次简单的呼吸练习',
      '让信任的人陪伴在身边',
      '尝试做一些简单而有成就感的小事',
      '遵循专业医生或治疗师的建议'
    ],
    professionalResources: [
      '全国心理援助热线：400-161-9995',
      '北京心理危机研究与干预中心：010-82951332',
      '紧急情况请拨打120或当地急救电话',
      '寻找正规医院心理科或精神科就诊'
    ]
  }
};

// GAD-7 应对策略
export const GAD7_COPING_STRATEGIES = {
  immediate: [
    '4-7-8呼吸法：吸气4秒，屏息7秒，呼气8秒',
    '5-4-3-2-1感官接地技术：说出5个你看见的，4个你触摸的，3个你听到的，2个你闻到的，1个你尝到的',
    '快速散步，释放紧张能量',
    '用冷水洗脸，刺激感官以冷静下来'
  ],
  cognitive: [
    '质疑灾难化思维：这真的有那么可怕吗？最可能的结果是什么？',
    '使用概率思考：这个担忧成真的概率有多高？',
    '区分事实和想法：我想的是事实还是假设？',
    '使用积极自我对话："我能应对这个困难"',
    '把担忧写下来，然后放到一边以后再说'
  ],
  lifestyle: [
    '每天30分钟以上的有氧运动',
    '减少或避免咖啡因和糖的摄入',
    '保持7-9小时的规律睡眠',
    '建立规律的饮食和作息时间',
    '每天花时间在自然环境中',
    '练习瑜伽或太极'
  ],
  social: [
    '与信任的朋友或家人分享您的感受',
    '不要孤立自己，保持社交联系',
    '加入支持小组或团体',
    '如果需要，向同事或上级说明您需要一些支持'
  ],
  professional: [
    '考虑认知行为疗法(CBT)',
    '咨询精神科医生或心理师',
    '了解专业的治疗选择',
    '如果情况严重，不要犹豫立即就医'
  ]
};

// GAD-7 放松技巧
export const GAD7_RELAXATION_TECHNIQUES = {
  breathing: {
    name: '4-7-8呼吸法',
    description: '吸气4秒，屏住呼吸7秒，呼气8秒。重复4-7次。'
  },
  muscle: {
    name: '渐进式肌肉放松',
    description: '从脚开始，依次紧张再放松每组肌肉群，注意区别紧张和放松的感觉。'
  },
  visualization: {
    name: '安全场景想象',
    description: '想象一个让你感到完全安全和平静的地方，调动所有感官来体验。'
  },
  mindfulness: {
    name: '正念练习',
    description: '专注于当下，不带评判地观察自己的想法和感受，像云朵一样飘走。'
  },
  grounding: {
    name: '5-4-3-2-1接地技术',
    description: '说出5个你看见的，4个你触摸的，3个你听到的，2个你闻到的，1个你尝到的事物。'
  }
};

// GAD-7 健康习惯
export const GAD7_HEALTHY_HABITS = {
  sleep: [
    '保持规律的睡眠作息，每天同一时间上床和起床',
    '睡前30分钟远离屏幕',
    '创造黑暗、凉爽、安静的睡眠环境',
    '避免午后摄入咖啡因',
    '如果无法入睡，起床做一些安静的活动'
  ],
  nutrition: [
    '保持规律的饮食时间',
    '减少精制糖和咖啡因的摄入',
    '增加全谷物、蔬菜和水果的摄入',
    '保持充足的水分摄入',
    '考虑镁、B族维生素等营养素补充'
  ],
  movement: [
    '每天30分钟的轻度到中度运动',
    '如果焦虑感强，尝试快走或慢跑',
    '尝试瑜伽或太极',
    '找到你喜欢的活动并坚持下去'
  ],
  boundaries: [
    '学习说"不"，不要过度承担',
    '设置工作和生活的边界',
    '给自己留出放松和恢复的时间',
    '减少信息过载，限制社交媒体时间'
  ],
  connection: [
    '与支持您的人保持联系',
    '不要孤立自己',
    '分享您的感受和经历',
    '如果需要，寻求专业支持'
  ]
};

export const ANXIETY_DIMENSIONS = {
  worries: {
    name: '过度担忧',
    description: '过度和不可控的担忧是焦虑的核心特征',
    recommendations: [
      '学习担忧时间管理',
      '练习正念觉察',
      '使用认知重构技术'
    ]
  },
  tension: {
    name: '运动性紧张',
    description: '身体表现出的紧张感和不安定',
    recommendations: [
      '渐进式肌肉放松',
      '规律的轻度运动',
      '深呼吸练习'
    ]
  },
  irritability: {
    name: '易激惹',
    description: '情绪容易被触发，耐心下降',
    recommendations: [
      '暂停技巧（3秒规则）',
      '情绪日记记录',
      '沟通技巧训练'
    ]
  },
  fear: {
    name: '恐惧/焦虑感受',
    description: '内心的恐惧和对未知的担忧',
    recommendations: [
      '暴露疗法（渐进式）',
      '安全行为分析',
      '不确定性容忍度训练'
    ]
  },
  physical: {
    name: '躯体症状',
    description: '焦虑在身体层面的表现',
    recommendations: [
      '身心放松训练',
      '有氧运动',
      '健康生活作息'
    ]
  },
  cognitive: {
    name: '认知症状',
    description: '焦虑对思维和专注力的影响',
    recommendations: [
      '认知重构练习',
      '专注力训练',
      '大脑休息（如冥想）'
    ]
  },
  social: {
    name: '社会功能影响',
    description: '焦虑对日常社交和功能的影响程度',
    recommendations: [
      '渐进式社交暴露',
      '社交技巧训练',
      '支持系统建立'
    ]
  }
};

export const EXTENDED_ANXIETY_LEVELS = {
  minimal: {
    name: '正常范围',
    range: [0, 16],
    color: 'green',
    description: '您目前的焦虑水平很低，这是很好的状态！'
  },
  mild: {
    name: '轻度焦虑',
    range: [17, 33],
    color: 'yellow',
    description: '您有一些轻微的焦虑症状，但总体可控。'
  },
  moderate: {
    name: '中度焦虑',
    range: [34, 50],
    color: 'orange',
    description: '您的焦虑症状较为明显，建议关注。'
  },
  severe: {
    name: '重度焦虑',
    range: [51, 84],
    color: 'red',
    description: '您的焦虑症状较重，建议寻求专业帮助。'
  }
};
