import type { TrainingProgram } from '../components/training/TrainingEngine'

// ============================================
// ❤️ 亲密关系轨道 - ECR依恋类型对应训练
// ============================================

export const ATTACHMENT_TRAININGS: TrainingProgram[] = [
  // ==========================================
  // 焦虑型依恋 Anxious Preoccupied
  // ==========================================
  {
    id: 'anxious-self-reassurance',
    title: '焦虑型安全感自给',
    subtitle: '不用向对方确认爱',
    icon: '💗',
    duration: '10分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'attachment',
    targetDimension: 'attachment_anxiety',
    targetScoreRange: [60, 100],
    relatedAssessments: ['ecr'],
    benefits: [
      '他不回消息≠他不爱我',
      '安全感是自己给自己的礼物',
      '从"怕被抛弃"到"我值得被爱"',
    ],
    exercises: [
      { id: 'ax1', title: '觉察', instruction: '上次他没回消息时，你心里想的是什么？', duration: 60, type: 'reflection' },
      { id: 'ax2', title: '分离', instruction: '我的焦虑 ≠ 事实，那只是我的旧模式', duration: 60, type: 'guided' },
      { id: 'ax3', title: '呼吸', instruction: '把手放在心上，深呼吸5次', duration: 45, type: 'breathing' },
      { id: 'ax4', title: '自我对话', instruction: '"他现在可能在忙。就算他不爱我了，我也能活下去"', duration: 90, type: 'affirmation' },
      { id: 'ax5', title: '证据', instruction: '列出3个他爱你的具体证据', duration: 60, type: 'reflection' },
      { id: 'ax6', title: '承诺', instruction: '下次焦虑时，先等1小时再发消息', duration: 45, type: 'guided' },
    ],
  },
  {
    id: 'anxious-boundary-setting',
    title: '焦虑型边界建立',
    subtitle: '爱不是失去自己',
    icon: '🌸',
    duration: '12分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'attachment',
    targetDimension: 'attachment_anxiety',
    targetScoreRange: [60, 100],
    relatedAssessments: ['ecr'],
    benefits: [
      '我值得被认真对待',
      '爱我的人不会让我一直猜',
      '失去自己的爱不是真爱',
    ],
    exercises: [
      { id: 'axb1', title: '诚实', instruction: '在关系里，哪件事让你觉得"自己太卑微了"？', duration: 60, type: 'reflection' },
      { id: 'axb2', title: '红线', instruction: '你的底线是什么？越过了就要走的那种', duration: 90, type: 'reflection' },
      { id: 'axb3', title: '自我价值', instruction: '列出3个不依赖任何人的，你的闪光点', duration: 90, type: 'reflection' },
      { id: 'axb4', title: '休息', instruction: '深呼吸，感受自己的珍贵', duration: 30, type: 'rest' },
      { id: 'axb5', title: '誓言', instruction: '"我永远不会为了任何人，抛弃我自己"', duration: 60, type: 'affirmation' },
    ],
  },

  // ==========================================
  // 回避型依恋 Dismissive Avoidant
  // ==========================================
  {
    id: 'avoidant-opening',
    title: '回避型情感打开练习',
    subtitle: '脆弱不是软弱',
    icon: '💎',
    duration: '10分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'attachment',
    targetDimension: 'attachment_avoidance',
    targetScoreRange: [60, 100],
    relatedAssessments: ['ecr'],
    benefits: [
      '亲密不是吞噬',
      '说出感受，天不会塌',
      '有人可以接住你的脆弱',
    ],
    exercises: [
      { id: 'av1', title: '承认', instruction: '我承认，我习惯了什么都自己扛', duration: 30, type: 'guided' },
      { id: 'av2', title: '记忆', instruction: '上次说出真实感受被拒绝是什么时候？', duration: 60, type: 'reflection' },
      { id: 'av3', title: '感谢', instruction: '谢谢那个保护了我的"关闭"开关', duration: 45, type: 'guided' },
      { id: 'av4', title: '休息', instruction: '深呼吸，现在你是安全的', duration: 30, type: 'rest' },
      { id: 'av5', title: '小冒险', instruction: '本周可以对TA说一句小真话是什么？', duration: 90, type: 'reflection' },
      { id: 'av6', title: '承诺', instruction: '我愿意试着打开1%', duration: 30, type: 'guided' },
    ],
  },
  {
    id: 'avoidant-empathy',
    title: '回避型共情练习',
    subtitle: '原来TA要的只是被看见',
    icon: '🤍',
    duration: '12分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'attachment',
    targetDimension: 'attachment_avoidance',
    targetScoreRange: [60, 100],
    relatedAssessments: ['ecr'],
    benefits: [
      '解决问题之前先共情',
      '拥抱比讲道理有用',
      '爱不是效率，是浪费时间',
    ],
    exercises: [
      { id: 'ave1', title: '回忆', instruction: 'TA说"你根本不懂我"是什么时候？', duration: 45, type: 'reflection' },
      { id: 'ave2', title: '换位思考', instruction: '如果我是TA，那一刻我需要的是什么？', duration: 90, type: 'reflection' },
      { id: 'ave3', title: '转念', instruction: 'TA要的不是解决方案，是我的看见', duration: 60, type: 'guided' },
      { id: 'ave4', title: '休息', instruction: '深呼吸，柔软下来', duration: 30, type: 'rest' },
      { id: 'ave5', title: '练习', instruction: '"我看到你很难过" - 把这句话说3遍', duration: 60, type: 'affirmation' },
      { id: 'ave6', title: '行动', instruction: '下次TA难过时，先抱一分钟再说别的', duration: 45, type: 'guided' },
    ],
  },

  // ==========================================
  // 恐惧型依恋 Fearful Disorganized
  // ==========================================
  {
    id: 'fearful-trust-building',
    title: '恐惧型信任重建',
    subtitle: '靠近而不逃跑',
    icon: '🕊️',
    duration: '15分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'attachment',
    targetDimension: 'attachment_fearful',
    targetScoreRange: [60, 100],
    relatedAssessments: ['ecr'],
    benefits: [
      '不是每个人都会伤害你',
      '在"推远"和"黏住"之间找到中间地带',
      '我值得被好好对待',
    ],
    exercises: [
      { id: 'f1', title: '看见模式', instruction: '是不是每次心动之后，就开始想逃跑？', duration: 45, type: 'reflection' },
      { id: 'f2', title: '原点', instruction: '第一个让你失望的人是谁？', duration: 60, type: 'reflection' },
      { id: 'f3', title: '分离', instruction: 'TA ≠ 当年那个伤害我的人', duration: 60, type: 'guided' },
      { id: 'f4', title: '休息', instruction: '深呼吸，对那个受伤的小孩说"我在这里"', duration: 60, type: 'rest' },
      { id: 'f5', title: '小步子', instruction: '这次我可以多停留10分钟再推远', duration: 60, type: 'guided' },
      { id: 'f6', title: '承诺', instruction: '我愿意再相信一次，不是相信你，是相信我自己', duration: 45, type: 'affirmation' },
    ],
  },

  // ==========================================
  // 安全型强化 Secure
  // ==========================================
  {
    id: 'secure-base-strengthening',
    title: '安全基地强化训练',
    subtitle: '成为别人的安全港湾',
    icon: '🏠',
    duration: '10分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'attachment',
    targetDimension: 'attachment_secure',
    targetScoreRange: [70, 100],
    relatedAssessments: ['ecr'],
    benefits: [
      '做关系中的容器',
      '接住别人的情绪风暴',
      '用你的安全治愈别人',
    ],
    exercises: [
      { id: 's1', title: '感恩', instruction: '感谢那些给过我安全感的人', duration: 60, type: 'guided' },
      { id: 's2', title: '回忆', instruction: '被稳稳接住是什么感觉？', duration: 60, type: 'reflection' },
      { id: 's3', title: '休息', instruction: '深呼吸，把那种感觉带到现在', duration: 30, type: 'rest' },
      { id: 's4', title: '承诺', instruction: '我愿意成为别人的那个安全的人', duration: 45, type: 'guided' },
      { id: 's5', title: '行动', instruction: '本周给一个需要的人，稳稳的支持', duration: 60, type: 'guided' },
    ],
  },
]

export default ATTACHMENT_TRAININGS
