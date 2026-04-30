import type { TrainingProgram } from '../components/training/TrainingEngine'

// ============================================
// 😌 情绪管理轨道 - SAS/PSS/Burnout对应训练
// ============================================

export const EMOTION_TRAININGS: TrainingProgram[] = [
  // ==========================================
  // SAS 焦虑专项训练
  // ==========================================
  {
    id: 'anxiety-first-aid',
    title: '焦虑急救箱',
    subtitle: '惊恐发作时的60秒救命术',
    icon: '🩹',
    duration: '5分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'emotion',
    targetDimension: 'sas_anxiety',
    targetScoreRange: [50, 100],
    relatedAssessments: ['sas'],
    benefits: [
      '5-4-3-2-1感官着陆技术',
      '60秒从10分焦虑降到3分',
      '随身携带的心灵急救包',
    ],
    exercises: [
      { id: 'a1', title: '暂停', instruction: '停下来，不管你在做什么', duration: 10, type: 'guided' },
      { id: 'a2', title: '5看', instruction: '说出你现在能看到的5样东西', duration: 30, type: 'guided' },
      { id: 'a3', title: '4听', instruction: '说出你现在能听到的4种声音', duration: 30, type: 'guided' },
      { id: 'a4', title: '3摸', instruction: '说出你现在能摸到的3样东西', duration: 30, type: 'guided' },
      { id: 'a5', title: '2闻', instruction: '说出你现在能闻到的2种气味', duration: 20, type: 'guided' },
      { id: 'a6', title: '1尝', instruction: '说出你现在嘴里的1种味道', duration: 15, type: 'guided' },
      { id: 'a7', title: '完成', instruction: '你回到了当下，你是安全的', duration: 15, type: 'guided' },
    ],
  },
  {
    id: 'what-if-technique',
    title: '灾难化思维拦截',
    subtitle: '拆掉大脑里的恐怖片放映机',
    icon: '🎬',
    duration: '12分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'emotion',
    targetDimension: 'sas_anxiety',
    targetScoreRange: [60, 100],
    relatedAssessments: ['sas'],
    benefits: [
      '识别大脑的"最坏可能性"骗局',
      '概率思维：95%担心的事不会发生',
      '即使最坏发生，我也能应对',
    ],
    exercises: [
      { id: 'w1', title: '写下', instruction: '你脑子里最担心的那个"万一"是什么？', duration: 60, type: 'reflection' },
      { id: 'w2', title: '概率', instruction: '客观来说，这件事发生概率有百分之多少？', duration: 60, type: 'reflection' },
      { id: 'w3', title: '证据', instruction: '支持这个担心的证据有几个？反对的呢？', duration: 90, type: 'reflection' },
      { id: 'w4', title: '休息', instruction: '深呼吸，让大脑从警报模式切换', duration: 30, type: 'rest' },
      { id: 'w5', title: '应对', instruction: '就算真的发生了，你第一步会怎么做？', duration: 90, type: 'reflection' },
      { id: 'w6', title: '接纳', instruction: '我不需要100%的控制感也能活着', duration: 45, type: 'affirmation' },
    ],
  },
  
  // ==========================================
  // PSS 压力管理训练
  // ==========================================
  {
    id: 'pressure-valve',
    title: '压力阀门调节术',
    subtitle: '高压锅也需要放气',
    icon: '🌡️',
    duration: '8分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'emotion',
    targetDimension: 'pss_stress',
    targetScoreRange: [60, 100],
    relatedAssessments: ['pss'],
    benefits: [
      '生理减压：肌肉放松法',
      '心理减压：把重担放下10分钟',
      '压力不是你的敌人',
    ],
    exercises: [
      { id: 'pv1', title: '身体扫描', instruction: '哪里的肌肉绷得最紧？', duration: 30, type: 'guided' },
      { id: 'pv2', title: '握紧', instruction: '把拳头握到最紧，坚持10秒钟', duration: 15, type: 'countdown' },
      { id: 'pv3', title: '松开', instruction: '突然松开，感受放松的暖流', duration: 30, type: 'guided' },
      { id: 'pv4', title: '肩膀', instruction: '肩膀耸到耳朵，坚持，然后放下', duration: 30, type: 'guided' },
      { id: 'pv5', title: '休息', instruction: '感受全身放松的感觉', duration: 30, type: 'rest' },
      { id: 'pv6', title: '转念', instruction: '我可以等10分钟再解决那个问题', duration: 45, type: 'guided' },
    ],
  },

  // ==========================================
  // Burnout 职业倦怠专项
  // ==========================================
  {
    id: 'burnout-reset',
    title: '倦怠重启程序',
    subtitle: '电池电量0%时的急救',
    icon: '🔋',
    duration: '15分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'emotion',
    targetDimension: 'burnout',
    targetScoreRange: [60, 100],
    relatedAssessments: ['burnout'],
    benefits: [
      '承认"我累了"不是软弱',
      '意义重构：找回最初的热情',
      '能量管理而非时间管理',
    ],
    exercises: [
      { id: 'br1', title: '诚实', instruction: '如果用0-10分给现在的能量打分，是几分？', duration: 30, type: 'reflection' },
      { id: 'br2', title: '哀悼', instruction: '我允许自己休息，不需要"有用"', duration: 60, type: 'affirmation' },
      { id: 'br3', title: '盘点', instruction: '哪3件事在吸走你的能量？', duration: 60, type: 'reflection' },
      { id: 'br4', title: '休息', instruction: '深呼吸，什么都不用做', duration: 60, type: 'rest' },
      { id: 'br5', title: '初心', instruction: '最开始做这件事时，你喜欢它什么？', duration: 90, type: 'reflection' },
      { id: 'br6', title: '边界', instruction: '下周可以拒绝哪一件耗竭你的事？', duration: 60, type: 'reflection' },
      { id: 'br7', title: '承诺', instruction: '今天下午给自己30分钟纯粹的休息', duration: 45, type: 'guided' },
    ],
  },
  {
    id: 'meaning-reconstruction',
    title: '意义重建疗法',
    subtitle: '当一切都觉得没意思时',
    icon: '🔥',
    duration: '12分钟',
    level: 3,
    levelLabel: '深度整合',
    category: 'mindfulness',
    targetDimension: 'burnout_cynicism',
    targetScoreRange: [70, 100],
    relatedAssessments: ['burnout'],
    benefits: [
      '在无意义中找到小意义',
      '不是工作才有意义，是你给工作意义',
      '活着本身就是意义',
    ],
    exercises: [
      { id: 'm1', title: '承认', instruction: '是的，最近一切都很没意思', duration: 45, type: 'guided' },
      { id: 'm2', title: '童年', instruction: '小时候，做什么事会让你忘记时间？', duration: 90, type: 'reflection' },
      { id: 'm3', title: '休息', instruction: '深呼吸，连接那个时候的自己', duration: 45, type: 'rest' },
      { id: 'm4', title: '微小意义', instruction: '今天能做哪一件"没用但开心"的事？', duration: 60, type: 'reflection' },
      { id: 'm5', title: '承诺', instruction: '每周留2小时，做那件"没用"的事', duration: 45, type: 'guided' },
    ],
  },
]

export default EMOTION_TRAININGS
