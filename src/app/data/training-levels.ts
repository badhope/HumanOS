import type { TrainingProgram } from '../components/training/TrainingEngine'

// ============================================
// 🎯 训练等级配置
// ============================================

export type TrainingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface LevelRequirement {
  type: 'level' | 'assessment' | 'training'
  id: string
  level?: TrainingLevel
}

export interface TrainingTrack {
  id: string
  name: string
  icon: string
  description: string
  levels: TrackLevel[]
}

export interface TrackLevel {
  level: TrainingLevel
  label: string
  title: string
  description: string
  requiredPrerequisites: LevelRequirement[]
  recommendedAssessments: string[]
  trainings: TrainingProgram[]
  rewards: string[]
  unlocked: boolean
}

// ============================================
// 等级标签定义
// ============================================

export const LEVEL_LABELS: Record<TrainingLevel, '入门觉醒' | '刻意练习' | '深度内化' | '融会贯通' | '自成一派' | '大师之路' | '宗师境界' | '超凡入圣' | '返璞归真' | '天人合一'> = {
  1: '入门觉醒',
  2: '刻意练习',
  3: '深度内化',
  4: '融会贯通',
  5: '自成一派',
  6: '大师之路',
  7: '宗师境界',
  8: '超凡入圣',
  9: '返璞归真',
  10: '天人合一',
}

// ============================================
// 情绪管理训练轨道
// ============================================

export const EMOTION_TRACK: TrainingTrack = {
  id: 'emotion',
  name: '情绪管理',
  icon: '💗',
  description: '学会理解和调节自己的情绪，成为情绪的主人',
  levels: [
    {
      level: 1,
      label: LEVEL_LABELS[1],
      title: '情绪觉察之旅',
      description: '开始认识自己的情绪，学习基本的情绪识别技巧',
      requiredPrerequisites: [],
      recommendedAssessments: ['eq', 'sas'],
      rewards: ['情绪觉察者徽章'],
      unlocked: true,
      trainings: [
        {
          id: 'emotion-awareness',
          title: '情绪识别基础',
          subtitle: '学会识别和命名你的情绪',
          icon: '👁️',
          duration: '5分钟',
          level: 1,
          levelLabel: LEVEL_LABELS[1],
          category: 'emotion',
          benefits: [
            '识别常见的情绪类型',
            '学习情绪的身体信号',
            '建立情绪词汇表'
          ],
          exercises: [
            { id: 'ea1', title: '准备', instruction: '找一个安静的地方坐下', duration: 10, type: 'guided' },
            { id: 'ea2', title: '情绪扫描', instruction: '从头部到脚部扫描身体感受', duration: 60, type: 'guided' },
            { id: 'ea3', title: '情绪命名', instruction: '用一个词描述你现在的情绪', duration: 30, type: 'reflection' },
            { id: 'ea4', title: '结束', instruction: '记录今天的情绪发现', duration: 20, type: 'guided' },
          ],
        },
        {
          id: 'breathing-basics',
          title: '基础呼吸练习',
          subtitle: '用呼吸调节情绪',
          icon: '🌬️',
          duration: '4分钟',
          level: 1,
          levelLabel: LEVEL_LABELS[1],
          category: 'emotion',
          benefits: [
            '快速平复激动情绪',
            '建立身体与情绪的连接',
            '培养当下觉察'
          ],
          exercises: [
            { id: 'bb1', title: '准备', instruction: '舒适地坐好，放松肩膀', duration: 10, type: 'guided' },
            { id: 'bb2', title: '腹式呼吸', instruction: '吸气4秒，呼气6秒', duration: 60, type: 'breathing' },
            { id: 'bb3', title: '加深呼吸', instruction: '吸气时腹部鼓起，呼气时收紧', duration: 90, type: 'guided' },
            { id: 'bb4', title: '结束', instruction: '感受呼吸后的平静', duration: 20, type: 'rest' },
          ],
        },
      ],
    },
    {
      level: 2,
      label: LEVEL_LABELS[2],
      title: '情绪调节进阶',
      description: '学习更高级的情绪调节技巧，建立情绪工具箱',
      requiredPrerequisites: [{ type: 'level', id: 'emotion', level: 1 }],
      recommendedAssessments: ['eq'],
      rewards: ['情绪调节师徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'emotion-regulation',
          title: '情绪调节技巧',
          subtitle: '掌握多种情绪调节方法',
          icon: '🎚️',
          duration: '8分钟',
          level: 2,
          levelLabel: LEVEL_LABELS[2],
          category: 'emotion',
          benefits: [
            '掌握5种情绪调节技巧',
            '学会在不同情境下选择合适的方法',
            '建立个性化的情绪调节策略'
          ],
          exercises: [
            { id: 'er1', title: '准备', instruction: '回想最近一次情绪波动', duration: 15, type: 'guided' },
            { id: 'er2', title: '情绪日记', instruction: '记录情绪发生的时间、情境和感受', duration: 60, type: 'guided' },
            { id: 'er3', title: '调节技巧', instruction: '尝试不同的调节方法：呼吸、运动、倾诉', duration: 90, type: 'guided' },
            { id: 'er4', title: '评估效果', instruction: '哪种方法最有效？', duration: 30, type: 'reflection' },
          ],
        },
        {
          id: 'stress-inoculation',
          title: '压力接种训练',
          subtitle: '提前准备应对压力',
          icon: '🛡️',
          duration: '10分钟',
          level: 2,
          levelLabel: LEVEL_LABELS[2],
          category: 'emotion',
          benefits: [
            '建立压力预警系统',
            '提前制定应对策略',
            '增强心理韧性'
          ],
          exercises: [
            { id: 'si1', title: '准备', instruction: '列出常见的压力源', duration: 30, type: 'guided' },
            { id: 'si2', title: '情景模拟', instruction: '想象一个压力场景', duration: 45, type: 'guided' },
            { id: 'si3', title: '应对计划', instruction: '制定具体的应对步骤', duration: 60, type: 'guided' },
            { id: 'si4', title: '心理演练', instruction: '在脑海中演练应对过程', duration: 60, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 3,
      label: LEVEL_LABELS[3],
      title: '情绪智慧深化',
      description: '深入理解情绪的深层原因，实现情绪自由',
      requiredPrerequisites: [{ type: 'level', id: 'emotion', level: 2 }],
      recommendedAssessments: ['eq', 'bigfive'],
      rewards: ['情绪智慧大师徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'emotion-whispering',
          title: '情绪低语',
          subtitle: '倾听情绪背后的声音',
          icon: '🎧',
          duration: '12分钟',
          level: 3,
          levelLabel: LEVEL_LABELS[3],
          category: 'emotion',
          benefits: [
            '理解情绪的深层需求',
            '与情绪建立对话',
            '实现情绪的自我转化'
          ],
          exercises: [
            { id: 'ew1', title: '准备', instruction: '安静地坐着，感受当下的情绪', duration: 20, type: 'guided' },
            { id: 'ew2', title: '情绪对话', instruction: '"你想要告诉我什么？"', duration: 90, type: 'guided' },
            { id: 'ew3', title: '需求识别', instruction: '这个情绪背后的需求是什么？', duration: 60, type: 'reflection' },
            { id: 'ew4', title: '满足需求', instruction: '如何满足这个需求？', duration: 60, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 4,
      label: LEVEL_LABELS[4],
      title: '情绪整合',
      description: '整合所有情绪，实现情绪的和谐统一',
      requiredPrerequisites: [{ type: 'level', id: 'emotion', level: 3 }],
      recommendedAssessments: ['eq', 'attachment'],
      rewards: ['情绪整合者徽章', '解锁高级冥想课程'],
      unlocked: false,
      trainings: [
        {
          id: 'emotion-integration',
          title: '情绪整合练习',
          subtitle: '让所有情绪和谐共处',
          icon: '🌈',
          duration: '15分钟',
          level: 4,
          levelLabel: LEVEL_LABELS[4],
          category: 'emotion',
          benefits: [
            '整合积极和消极情绪',
            '实现情绪的动态平衡',
            '成为情绪的主人'
          ],
          exercises: [
            { id: 'ei1', title: '准备', instruction: '回顾过去一周的情绪变化', duration: 30, type: 'guided' },
            { id: 'ei2', title: '情绪映射', instruction: '在纸上画出情绪的起伏', duration: 90, type: 'guided' },
            { id: 'ei3', title: '整合冥想', instruction: '接纳所有情绪的存在', duration: 120, type: 'guided' },
            { id: 'ei4', title: '整合宣言', instruction: '"所有情绪都是我的一部分"', duration: 30, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 5,
      label: LEVEL_LABELS[5],
      title: '情绪导师',
      description: '掌握情绪指导能力，可以帮助他人',
      requiredPrerequisites: [
        { type: 'level', id: 'emotion', level: 4 },
        { type: 'level', id: 'social', level: 2 }
      ],
      recommendedAssessments: ['eq', 'bigfive', 'attachment'],
      rewards: ['情绪导师徽章', '解锁指导他人权限'],
      unlocked: false,
      trainings: [
        {
          id: 'emotion-coaching',
          title: '情绪指导技巧',
          subtitle: '学习如何帮助他人处理情绪',
          icon: '👩‍🏫',
          duration: '15分钟',
          level: 5,
          levelLabel: LEVEL_LABELS[5],
          category: 'emotion',
          benefits: [
            '学会倾听和共情',
            '掌握提问技巧',
            '成为有效的情绪支持者'
          ],
          exercises: [
            { id: 'ec1', title: '准备', instruction: '回忆一次帮助他人的经历', duration: 30, type: 'guided' },
            { id: 'ec2', title: '倾听练习', instruction: '练习深度倾听技巧', duration: 60, type: 'guided' },
            { id: 'ec3', title: '提问技巧', instruction: '学习开放式提问', duration: 60, type: 'guided' },
            { id: 'ec4', title: '角色扮演', instruction: '模拟情绪支持场景', duration: 90, type: 'guided' },
          ],
        },
      ],
    },
  ],
}

// ============================================
// 思维认知训练轨道
// ============================================

export const COGNITION_TRACK: TrainingTrack = {
  id: 'cognition',
  name: '思维认知',
  icon: '🧠',
  description: '提升思维能力，优化认知模式',
  levels: [
    {
      level: 1,
      label: LEVEL_LABELS[1],
      title: '思维启蒙',
      description: '开始认识自己的思维模式',
      requiredPrerequisites: [],
      recommendedAssessments: ['iq', 'mindset'],
      rewards: ['思维探索者徽章'],
      unlocked: true,
      trainings: [
        {
          id: 'thinking-awareness',
          title: '思维觉察',
          subtitle: '认识你的思维习惯',
          icon: '🔍',
          duration: '6分钟',
          level: 1,
          levelLabel: LEVEL_LABELS[1],
          category: 'cognition',
          benefits: [
            '识别自动思维',
            '发现思维习惯',
            '建立思维日志'
          ],
          exercises: [
            { id: 'ta1', title: '准备', instruction: '找一个安静的地方', duration: 10, type: 'guided' },
            { id: 'ta2', title: '思维捕捉', instruction: '注意脑海中出现的想法', duration: 60, type: 'guided' },
            { id: 'ta3', title: '思维记录', instruction: '记录三个最常见的自动思维', duration: 60, type: 'guided' },
            { id: 'ta4', title: '结束', instruction: '观察这些思维的模式', duration: 20, type: 'reflection' },
          ],
        },
      ],
    },
    {
      level: 2,
      label: LEVEL_LABELS[2],
      title: '认知重构',
      description: '学习挑战和改变负面思维',
      requiredPrerequisites: [{ type: 'level', id: 'cognition', level: 1 }],
      recommendedAssessments: ['mindset'],
      rewards: ['认知重构师徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'cognitive-reframe',
          title: '认知重构',
          subtitle: '改变负面思维模式',
          icon: '🔄',
          duration: '10分钟',
          level: 2,
          levelLabel: LEVEL_LABELS[2],
          category: 'cognition',
          benefits: [
            '识别认知扭曲',
            '挑战不合理信念',
            '建立理性思维'
          ],
          exercises: [
            { id: 'cr1', title: '准备', instruction: '回想一个负面思维', duration: 15, type: 'guided' },
            { id: 'cr2', title: '识别扭曲', instruction: '这是什么类型的认知扭曲？', duration: 60, type: 'guided' },
            { id: 'cr3', title: '证据检验', instruction: '支持和反对这个想法的证据', duration: 90, type: 'reflection' },
            { id: 'cr4', title: '重构', instruction: '用更理性的方式重新表述', duration: 60, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 3,
      label: LEVEL_LABELS[3],
      title: '深度思考',
      description: '培养深度思考和批判性思维能力',
      requiredPrerequisites: [{ type: 'level', id: 'cognition', level: 2 }],
      recommendedAssessments: ['iq', 'mindset'],
      rewards: ['深度思考者徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'critical-thinking',
          title: '批判性思维训练',
          subtitle: '培养独立思考能力',
          icon: '⚖️',
          duration: '12分钟',
          level: 3,
          levelLabel: LEVEL_LABELS[3],
          category: 'cognition',
          benefits: [
            '学会提问和质疑',
            '评估信息的可靠性',
            '做出理性决策'
          ],
          exercises: [
            { id: 'ct1', title: '准备', instruction: '选择一个你关心的话题', duration: 15, type: 'guided' },
            { id: 'ct2', title: '信息收集', instruction: '收集不同来源的信息', duration: 60, type: 'guided' },
            { id: 'ct3', title: '评估信息', instruction: '评估信息的可信度和偏见', duration: 90, type: 'reflection' },
            { id: 'ct4', title: '综合分析', instruction: '整合信息，形成自己的观点', duration: 60, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 4,
      label: LEVEL_LABELS[4],
      title: '系统思维',
      description: '学会从系统角度看待问题',
      requiredPrerequisites: [{ type: 'level', id: 'cognition', level: 3 }],
      recommendedAssessments: ['iq'],
      rewards: ['系统思考者徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'systems-thinking',
          title: '系统思维训练',
          subtitle: '理解事物的相互联系',
          icon: '🕸️',
          duration: '15分钟',
          level: 4,
          levelLabel: LEVEL_LABELS[4],
          category: 'cognition',
          benefits: [
            '理解复杂系统',
            '识别因果关系',
            '预测系统行为'
          ],
          exercises: [
            { id: 'st1', title: '准备', instruction: '选择一个复杂问题', duration: 20, type: 'guided' },
            { id: 'st2', title: '要素分析', instruction: '列出相关的要素', duration: 60, type: 'guided' },
            { id: 'st3', title: '关系映射', instruction: '绘制要素之间的关系', duration: 90, type: 'guided' },
            { id: 'st4', title: '系统洞察', instruction: '发现系统的杠杆点', duration: 60, type: 'reflection' },
          ],
        },
      ],
    },
  ],
}

// ============================================
// 人际关系训练轨道
// ============================================

export const SOCIAL_TRACK: TrainingTrack = {
  id: 'social',
  name: '人际社交',
  icon: '👥',
  description: '提升人际交往能力，建立健康关系',
  levels: [
    {
      level: 1,
      label: LEVEL_LABELS[1],
      title: '社交基础',
      description: '建立基本的社交技能',
      requiredPrerequisites: [],
      recommendedAssessments: ['attachment', 'eq'],
      rewards: ['社交新手徽章'],
      unlocked: true,
      trainings: [
        {
          id: 'social-basics',
          title: '社交基础',
          subtitle: '学习基本的社交技巧',
          icon: '👋',
          duration: '6分钟',
          level: 1,
          levelLabel: LEVEL_LABELS[1],
          category: 'social',
          benefits: [
            '建立良好的第一印象',
            '掌握基本的问候技巧',
            '学会主动与人交流'
          ],
          exercises: [
            { id: 'sb1', title: '准备', instruction: '想象一个社交场景', duration: 10, type: 'guided' },
            { id: 'sb2', title: '自我介绍', instruction: '练习简洁的自我介绍', duration: 60, type: 'guided' },
            { id: 'sb3', title: '积极倾听', instruction: '练习专注倾听', duration: 60, type: 'guided' },
            { id: 'sb4', title: '结束', instruction: '总结今天的学习', duration: 20, type: 'rest' },
          ],
        },
      ],
    },
    {
      level: 2,
      label: LEVEL_LABELS[2],
      title: '深度连接',
      description: '建立更深层次的人际关系',
      requiredPrerequisites: [{ type: 'level', id: 'social', level: 1 }],
      recommendedAssessments: ['attachment', 'eq'],
      rewards: ['深度连接者徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'deep-connection',
          title: '深度连接',
          subtitle: '建立有意义的人际关系',
          icon: '💞',
          duration: '10分钟',
          level: 2,
          levelLabel: LEVEL_LABELS[2],
          category: 'social',
          benefits: [
            '建立信任和亲密感',
            '学会深度倾听',
            '培养同理心'
          ],
          exercises: [
            { id: 'dc1', title: '准备', instruction: '回想一个重要的人际关系', duration: 15, type: 'guided' },
            { id: 'dc2', title: '深度倾听', instruction: '练习不带评判地倾听', duration: 90, type: 'guided' },
            { id: 'dc3', title: '表达理解', instruction: '"我理解你的感受是..."', duration: 60, type: 'guided' },
            { id: 'dc4', title: '分享自己', instruction: '适当分享自己的感受', duration: 60, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 3,
      label: LEVEL_LABELS[3],
      title: '冲突解决',
      description: '学会处理人际关系中的冲突',
      requiredPrerequisites: [{ type: 'level', id: 'social', level: 2 }],
      recommendedAssessments: ['eq', 'attachment'],
      rewards: ['冲突解决者徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'conflict-resolution',
          title: '冲突解决',
          subtitle: '建设性地处理冲突',
          icon: '🤝',
          duration: '12分钟',
          level: 3,
          levelLabel: LEVEL_LABELS[3],
          category: 'social',
          benefits: [
            '保持冷静和理智',
            '理解对方的立场',
            '找到双赢解决方案'
          ],
          exercises: [
            { id: 'cr1', title: '准备', instruction: '回想一次冲突经历', duration: 20, type: 'guided' },
            { id: 'cr2', title: '情绪管理', instruction: '在冲突中保持冷静', duration: 60, type: 'guided' },
            { id: 'cr3', title: '换位思考', instruction: '理解对方的观点', duration: 90, type: 'guided' },
            { id: 'cr4', title: '共同寻找解决方案', instruction: '寻找双方都能接受的方案', duration: 60, type: 'guided' },
          ],
        },
      ],
    },
  ],
}

// ============================================
// 亲密关系训练轨道
// ============================================

export const ATTACHMENT_TRACK: TrainingTrack = {
  id: 'attachment',
  name: '亲密关系',
  icon: '❤️',
  description: '理解依恋模式，建立健康的亲密关系',
  levels: [
    {
      level: 1,
      label: LEVEL_LABELS[1],
      title: '依恋探索',
      description: '了解自己的依恋类型',
      requiredPrerequisites: [],
      recommendedAssessments: ['attachment'],
      rewards: ['依恋探索者徽章'],
      unlocked: true,
      trainings: [
        {
          id: 'attachment-awareness',
          title: '依恋觉察',
          subtitle: '了解你的依恋模式',
          icon: '🔗',
          duration: '8分钟',
          level: 1,
          levelLabel: LEVEL_LABELS[1],
          category: 'attachment',
          benefits: [
            '了解依恋理论',
            '识别自己的依恋类型',
            '理解依恋对关系的影响'
          ],
          exercises: [
            { id: 'aa1', title: '准备', instruction: '放松身心，深呼吸', duration: 15, type: 'guided' },
            { id: 'aa2', title: '回忆童年', instruction: '回想童年与照顾者的关系', duration: 60, type: 'guided' },
            { id: 'aa3', title: '识别模式', instruction: '你的依恋模式是什么？', duration: 60, type: 'reflection' },
            { id: 'aa4', title: '结束', instruction: '接纳自己的依恋模式', duration: 30, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 2,
      label: LEVEL_LABELS[2],
      title: '安全基地',
      description: '在关系中建立安全感',
      requiredPrerequisites: [{ type: 'level', id: 'attachment', level: 1 }],
      recommendedAssessments: ['attachment', 'eq'],
      rewards: ['安全基地徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'secure-base',
          title: '建立安全基地',
          subtitle: '在关系中创造安全感',
          icon: '🏠',
          duration: '10分钟',
          level: 2,
          levelLabel: LEVEL_LABELS[2],
          category: 'attachment',
          benefits: [
            '学会表达需求',
            '建立信任',
            '创造安全的沟通环境'
          ],
          exercises: [
            { id: 'sb1', title: '准备', instruction: '回想一段重要的关系', duration: 15, type: 'guided' },
            { id: 'sb2', title: '需求表达', instruction: '练习表达自己的需求', duration: 60, type: 'guided' },
            { id: 'sb3', title: '信任建立', instruction: '承诺和兑现的重要性', duration: 60, type: 'guided' },
            { id: 'sb4', title: '安全沟通', instruction: '建立非暴力沟通习惯', duration: 60, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 3,
      label: LEVEL_LABELS[3],
      title: '依恋修复',
      description: '修复不安全依恋模式',
      requiredPrerequisites: [{ type: 'level', id: 'attachment', level: 2 }],
      recommendedAssessments: ['attachment'],
      rewards: ['依恋修复师徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'attachment-healing',
          title: '依恋修复',
          subtitle: '疗愈不安全依恋',
          icon: '💚',
          duration: '15分钟',
          level: 3,
          levelLabel: LEVEL_LABELS[3],
          category: 'attachment',
          benefits: [
            '理解童年经历的影响',
            '修复内在安全感',
            '建立更健康的关系模式'
          ],
          exercises: [
            { id: 'ah1', title: '准备', instruction: '找一个安静安全的空间', duration: 20, type: 'guided' },
            { id: 'ah2', title: '内在小孩', instruction: '与内在小孩建立连接', duration: 90, type: 'guided' },
            { id: 'ah3', title: '疗愈对话', instruction: '给予内在小孩需要的安慰', duration: 120, type: 'guided' },
            { id: 'ah4', title: '整合', instruction: '带着新的理解回到现在', duration: 30, type: 'guided' },
          ],
        },
      ],
    },
  ],
}

// ============================================
// 职业发展训练轨道
// ============================================

export const CAREER_TRACK: TrainingTrack = {
  id: 'career',
  name: '职业发展',
  icon: '💼',
  description: '规划职业路径，实现职业目标',
  levels: [
    {
      level: 1,
      label: LEVEL_LABELS[1],
      title: '职业探索',
      description: '了解自己的职业兴趣和价值观',
      requiredPrerequisites: [],
      recommendedAssessments: ['holland', 'mbti'],
      rewards: ['职业探索者徽章'],
      unlocked: true,
      trainings: [
        {
          id: 'career-discovery',
          title: '职业探索',
          subtitle: '发现你的职业方向',
          icon: '🧭',
          duration: '10分钟',
          level: 1,
          levelLabel: LEVEL_LABELS[1],
          category: 'career',
          benefits: [
            '了解职业兴趣',
            '识别职业价值观',
            '探索职业可能性'
          ],
          exercises: [
            { id: 'cd1', title: '准备', instruction: '回想工作中的高光时刻', duration: 20, type: 'guided' },
            { id: 'cd2', title: '兴趣探索', instruction: '你喜欢做什么类型的工作？', duration: 60, type: 'reflection' },
            { id: 'cd3', title: '价值观澄清', instruction: '工作中什么对你最重要？', duration: 60, type: 'guided' },
            { id: 'cd4', title: '可能性清单', instruction: '列出感兴趣的职业方向', duration: 60, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 2,
      label: LEVEL_LABELS[2],
      title: '目标设定',
      description: '制定清晰的职业目标',
      requiredPrerequisites: [{ type: 'level', id: 'career', level: 1 }],
      recommendedAssessments: ['holland'],
      rewards: ['目标设定师徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'goal-setting',
          title: '职业目标设定',
          subtitle: '制定有效的职业目标',
          icon: '🎯',
          duration: '10分钟',
          level: 2,
          levelLabel: LEVEL_LABELS[2],
          category: 'career',
          benefits: [
            '设定SMART目标',
            '制定行动计划',
            '建立目标追踪系统'
          ],
          exercises: [
            { id: 'gs1', title: '准备', instruction: '明确长期职业愿景', duration: 20, type: 'guided' },
            { id: 'gs2', title: 'SMART目标', instruction: '将愿景转化为SMART目标', duration: 90, type: 'guided' },
            { id: 'gs3', title: '行动计划', instruction: '制定具体的行动计划', duration: 60, type: 'guided' },
            { id: 'gs4', title: '追踪系统', instruction: '建立目标追踪方法', duration: 30, type: 'guided' },
          ],
        },
      ],
    },
    {
      level: 3,
      label: LEVEL_LABELS[3],
      title: '能力提升',
      description: '系统提升职业技能',
      requiredPrerequisites: [{ type: 'level', id: 'career', level: 2 }],
      recommendedAssessments: ['holland', 'iq'],
      rewards: ['能力提升者徽章'],
      unlocked: false,
      trainings: [
        {
          id: 'skill-development',
          title: '技能发展规划',
          subtitle: '系统提升职业技能',
          icon: '📈',
          duration: '12分钟',
          level: 3,
          levelLabel: LEVEL_LABELS[3],
          category: 'career',
          benefits: [
            '技能差距分析',
            '学习路径规划',
            '持续学习习惯'
          ],
          exercises: [
            { id: 'sd1', title: '准备', instruction: '列出当前职位所需技能', duration: 30, type: 'guided' },
            { id: 'sd2', title: '差距分析', instruction: '评估当前技能水平', duration: 60, type: 'reflection' },
            { id: 'sd3', title: '学习路径', instruction: '制定学习计划', duration: 90, type: 'guided' },
            { id: 'sd4', title: '习惯养成', instruction: '建立每日学习习惯', duration: 30, type: 'guided' },
          ],
        },
      ],
    },
  ],
}

// ============================================
// 所有训练轨道
// ============================================

export const ALL_TRAINING_TRACKS: TrainingTrack[] = [
  EMOTION_TRACK,
  COGNITION_TRACK,
  SOCIAL_TRACK,
  ATTACHMENT_TRACK,
  CAREER_TRACK,
]

// ============================================
// 等级解锁检查函数
// ============================================

export interface UserProgress {
  completedLevels: Record<string, TrainingLevel[]>
  completedTrainings: string[]
  completedAssessments: string[]
}

export function checkLevelUnlocked(
  trackId: string,
  level: TrainingLevel,
  userProgress: UserProgress
): boolean {
  const track = ALL_TRAINING_TRACKS.find(t => t.id === trackId)
  if (!track) return false

  const trackLevel = track.levels.find(l => l.level === level)
  if (!trackLevel) return false

  // 检查所有前置条件
  for (const req of trackLevel.requiredPrerequisites) {
    switch (req.type) {
      case 'level': {
        const completedLevels = userProgress.completedLevels[req.id] || []
        if (!completedLevels.includes(req.level!)) {
          return false
        }
        break
      }
      case 'assessment': {
        if (!userProgress.completedAssessments.includes(req.id)) {
          return false
        }
        break
      }
      case 'training': {
        if (!userProgress.completedTrainings.includes(req.id)) {
          return false
        }
        break
      }
    }
  }

  return true
}

export function unlockLevel(
  trackId: string,
  level: TrainingLevel,
  userProgress: UserProgress
): UserProgress {
  if (!checkLevelUnlocked(trackId, level, userProgress)) {
    return userProgress
  }

  const completedLevels = userProgress.completedLevels[trackId] || []
  if (completedLevels.includes(level)) {
    return userProgress
  }

  return {
    ...userProgress,
    completedLevels: {
      ...userProgress.completedLevels,
      [trackId]: [...completedLevels, level]
    }
  }
}

export function getUnlockedTrainings(userProgress: UserProgress): TrainingProgram[] {
  const unlocked: TrainingProgram[] = []

  for (const track of ALL_TRAINING_TRACKS) {
    for (const level of track.levels) {
      if (checkLevelUnlocked(track.id, level.level, userProgress)) {
        unlocked.push(...level.trainings)
      }
    }
  }

  return unlocked
}

export function getRecommendedTrainings(): TrainingProgram[] {
  const unlockedTrainings = getUnlockedTrainings({
    completedLevels: {},
    completedTrainings: [],
    completedAssessments: []
  })

  return unlockedTrainings.slice(0, 5)
}
