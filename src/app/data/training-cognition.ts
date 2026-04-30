import type { TrainingProgram } from '../components/training/TrainingEngine'

// ============================================
// 🧠 思维认知轨道 - BigFive五大人格对应训练
// ============================================

export const COGNITION_TRAININGS: TrainingProgram[] = [
  // ==========================================
  // O: 开放性 Openness - 封闭 vs 幻想
  // ==========================================
  {
    id: 'cognitive-flexibility-o-low',
    title: '认知弹性入门',
    subtitle: '打开思维的百叶窗',
    icon: '🪟',
    duration: '8分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'cognition',
    targetDimension: 'openness',
    targetScoreRange: [0, 40],
    relatedAssessments: ['bigfive'],
    benefits: [
      '每天一个新视角看世界',
      '打破"一直都是这样"的思维定式',
      '好奇心上瘾患者养成指南',
    ],
    exercises: [
      { id: 'o1', title: '准备', instruction: '回想一件你最近觉得"没意思"的事情', duration: 15, type: 'guided' },
      { id: 'o2', title: '第一步', instruction: '列出3个这件事"有意思"的角度', duration: 90, type: 'reflection' },
      { id: 'o3', title: '休息', instruction: '深呼吸，让思绪飘一会儿', duration: 20, type: 'rest' },
      { id: 'o4', title: '反常识', instruction: '如果常识是错的呢？举一个例子', duration: 60, type: 'reflection' },
      { id: 'o5', title: '行动承诺', instruction: '今天尝试一件从来没做过的小事', duration: 45, type: 'guided' },
    ],
  },
  {
    id: 'openness-grounding-o-high',
    title: '空想家落地训练',
    subtitle: '从云端回到地面',
    icon: '🌱',
    duration: '10分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'cognition',
    targetDimension: 'openness',
    targetScoreRange: [75, 100],
    relatedAssessments: ['bigfive'],
    benefits: [
      '识别"只是想想"和"可以做"的边界',
      '把100个想法变成1个行动',
      '不做思想上的巨人，行动上的矮子',
    ],
    exercises: [
      { id: 'oh1', title: '清单', instruction: '列出你脑子里正在转的5个想法', duration: 60, type: 'reflection' },
      { id: 'oh2', title: '筛选', instruction: '圈出其中1个，今天就能开始做的', duration: 45, type: 'reflection' },
      { id: 'oh3', title: '缩小', instruction: '把它缩小到30秒就能完成的版本', duration: 60, type: 'reflection' },
      { id: 'oh4', title: '休息', instruction: '深呼吸3次', duration: 20, type: 'rest' },
      { id: 'oh5', title: '倒数', instruction: '5 - 4 - 3 - 2 - 1', duration: 5, type: 'countdown' },
      { id: 'oh6', title: '行动！', instruction: '现在就去做那30秒！', duration: 60, type: 'guided' },
      { id: 'oh7', title: '庆祝', instruction: '你完成了从0到1！', duration: 15, type: 'guided' },
    ],
  },

  // ==========================================
  // C: 尽责性 Conscientiousness - 混乱 vs 完美主义
  // ==========================================
  {
    id: 'conscientiousness-structure-c-low',
    title: '混乱者的秩序入门',
    subtitle: '从一地鸡毛到井井有条',
    icon: '📦',
    duration: '8分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'cognition',
    targetDimension: 'conscientiousness',
    targetScoreRange: [0, 40],
    relatedAssessments: ['bigfive'],
    benefits: [
      '2分钟桌面整理法',
      '三件事工作法：永远只做最重要的事',
      '拖延不是懒，是启动困难',
    ],
    exercises: [
      { id: 'c1', title: '诚实面对', instruction: '环视你的周围，哪里最乱？', duration: 15, type: 'guided' },
      { id: 'c2', title: '2分钟魔法', instruction: '现在用2分钟整理那个地方的1/10', duration: 120, type: 'countdown' },
      { id: 'c3', title: '休息', instruction: '看着变整齐的角落，深呼吸', duration: 20, type: 'rest' },
      { id: 'c4', title: '三件事', instruction: '写下明天必须完成的3件事', duration: 60, type: 'reflection' },
      { id: 'c5', title: '承诺', instruction: '明天第一件事就做最难的那件', duration: 30, type: 'guided' },
    ],
  },
  {
    id: 'perfectionism-detox-c-high',
    title: '完美主义排毒',
    subtitle: '80分就够好了',
    icon: '⚖️',
    duration: '10分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'cognition',
    targetDimension: 'conscientiousness',
    targetScoreRange: [75, 100],
    relatedAssessments: ['bigfive'],
    benefits: [
      '识别"足够好"的标准',
      '学会在80分时按下停止键',
      '把精力用在真正重要的地方',
    ],
    exercises: [
      { id: 'p1', title: '列出', instruction: '写下你正在"追求完美"的三件事', duration: 90, type: 'reflection' },
      { id: 'p2', title: '成本计算', instruction: '为了最后的20%，你多花了多少时间？', duration: 120, type: 'reflection' },
      { id: 'p3', title: '转念', instruction: '"完成比完美更重要" - 默念3遍', duration: 30, type: 'affirmation' },
      { id: 'p4', title: '休息', instruction: '深呼吸，肩膀放松下来', duration: 20, type: 'rest' },
      { id: 'p5', title: '行动', instruction: '现在就把其中一件事标记为"完成"', duration: 60, type: 'guided' },
      { id: 'p6', title: '庆祝', instruction: '为"不完美的完成"鼓掌！', duration: 30, type: 'guided' },
    ],
  },

  // ==========================================
  // E: 外向性 Extraversion - 孤独 vs 过度表演
  // ==========================================
  {
    id: 'introvert-confidence-e-low',
    title: '内向者社交充电',
    subtitle: '不变成话痨也能自信社交',
    icon: '🔋',
    duration: '8分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'cognition',
    targetDimension: 'extraversion',
    targetScoreRange: [0, 40],
    relatedAssessments: ['bigfive'],
    benefits: [
      '内向不是缺陷，是超能力',
      '高质量深度连接 > 低质量社交',
      '社交电池科学管理法',
    ],
    exercises: [
      { id: 'i1', title: '承认', instruction: '我是内向者，社交会消耗我的能量', duration: 15, type: 'affirmation' },
      { id: 'i2', title: '盘点', instruction: '哪3个人最能给你充电？', duration: 60, type: 'reflection' },
      { id: 'i3', title: '划边界', instruction: '哪种社交让你最累？可以拒绝吗？', duration: 90, type: 'reflection' },
      { id: 'i4', title: '休息', instruction: '深呼吸，享受独处的宁静', duration: 30, type: 'rest' },
      { id: 'i5', title: '小目标', instruction: '本周主动联系一个给你充电的朋友', duration: 45, type: 'guided' },
    ],
  },
  {
    id: 'performer-grounding-e-high',
    title: '表演者静心训练',
    subtitle: '不用一直发光',
    icon: '🌙',
    duration: '10分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'cognition',
    targetDimension: 'extraversion',
    targetScoreRange: [75, 100],
    relatedAssessments: ['bigfive'],
    benefits: [
      '忍住插话和表演的冲动',
      '真正地倾听，而不是准备下一句',
      '安静的力量：沉默也很有魅力',
    ],
    exercises: [
      { id: 'eh1', title: '觉察', instruction: '上次你忍不住插话是什么时候？', duration: 30, type: 'reflection' },
      { id: 'eh2', title: '呼吸锚点', instruction: '想说话时，先深呼吸一次', duration: 60, type: 'breathing' },
      { id: 'eh3', title: '倾听练习', instruction: '下次说话前，先数到3', duration: 45, type: 'guided' },
      { id: 'eh4', title: '休息', instruction: '享受10秒钟的沉默', duration: 30, type: 'rest' },
      { id: 'eh5', title: '转念', instruction: '不用我来活跃气氛也没关系', duration: 60, type: 'affirmation' },
      { id: 'eh6', title: '承诺', instruction: '今天少说3句话，多听3分钟', duration: 30, type: 'guided' },
    ],
  },

  // ==========================================
  // A: 宜人性 Agreeableness - 冷漠 vs 讨好
  // ==========================================
  {
    id: 'agreeableness-warmth-a-low',
    title: '冷漠者解冻训练',
    subtitle: '冰山也能被温暖融化',
    icon: '🔥',
    duration: '8分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'cognition',
    targetDimension: 'agreeableness',
    targetScoreRange: [0, 40],
    relatedAssessments: ['bigfive'],
    benefits: [
      '信任不是脆弱，是选择',
      '别人没有你想的那么蠢',
      '合作比单打独斗走得更远',
    ],
    exercises: [
      { id: 'a1', title: '承认', instruction: '我承认，我有时觉得别人靠不住', duration: 15, type: 'guided' },
      { id: 'a2', title: '反例', instruction: '举出3个别人靠谱的例子', duration: 90, type: 'reflection' },
      { id: 'a3', title: '休息', instruction: '深呼吸，让心柔软下来', duration: 20, type: 'rest' },
      { id: 'a4', title: '小信任', instruction: '今天可以信任别人什么小事？', duration: 60, type: 'reflection' },
      { id: 'a5', title: '善意', instruction: '今天对一个人表达真诚的赞美', duration: 45, type: 'guided' },
    ],
  },
  {
    id: 'people-pleaser-detox-a-high',
    title: '讨好者边界建立',
    subtitle: '不用所有人都喜欢你',
    icon: '🛡️',
    duration: '12分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'cognition',
    targetDimension: 'agreeableness',
    targetScoreRange: [75, 100],
    relatedAssessments: ['bigfive'],
    benefits: [
      '拒绝不是伤害，是尊重',
      '我的感受和别人的一样重要',
      '喜欢你的人，不需要你讨好',
    ],
    exercises: [
      { id: 'ah1', title: '回忆', instruction: '最近一次答应别人但心里不舒服是？', duration: 30, type: 'reflection' },
      { id: 'ah2', title: '代价', instruction: '为了讨好，你付出了什么代价？', duration: 90, type: 'reflection' },
      { id: 'ah3', title: '休息', instruction: '深呼吸，把手放在心上', duration: 30, type: 'rest' },
      { id: 'ah4', title: '转念', instruction: '他们失望，不是我的责任', duration: 60, type: 'affirmation' },
      { id: 'ah5', title: '练习拒绝', instruction: '"谢谢你想到我，但这次我不方便"', duration: 60, type: 'guided' },
      { id: 'ah6', title: '承诺', instruction: '本周至少说一次"不"', duration: 30, type: 'guided' },
    ],
  },

  // ==========================================
  // N: 神经质 Neuroticism - 焦虑内耗
  // ==========================================
  {
    id: 'neuroticism-calming-n-high',
    title: '情绪风暴平息术',
    subtitle: '从惊涛骇浪到平湖',
    icon: '🌊',
    duration: '12分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'emotion',
    targetDimension: 'neuroticism',
    targetScoreRange: [75, 100],
    relatedAssessments: ['bigfive', 'sas'],
    benefits: [
      '情绪来临时，60秒按下暂停键',
      '我不是我的想法，我是观察想法的人',
      '情绪是信使，不是狱警',
    ],
    exercises: [
      { id: 'n1', title: '命名', instruction: '现在心里搅动的情绪是什么？给它起个名字', duration: 45, type: 'reflection' },
      { id: 'n2', title: '478呼吸', instruction: '吸气4秒 → 屏气7秒 → 呼气8秒', duration: 60, type: 'breathing' },
      { id: 'n3', title: '身体扫描', instruction: '这个情绪在身体的哪个位置？', duration: 60, type: 'guided' },
      { id: 'n4', title: '休息', instruction: '继续呼吸，与它共处', duration: 30, type: 'rest' },
      { id: 'n5', title: '分离', instruction: '"我感到焦虑" ≠ "我是焦虑的人"', duration: 60, type: 'guided' },
      { id: 'n6', title: '感谢', instruction: '谢谢这个情绪提醒我在意什么', duration: 45, type: 'guided' },
    ],
  },
  {
    id: 'emotional-range-expansion',
    title: '情绪广度拓展',
    subtitle: '从湖面到大海',
    icon: '🎨',
    duration: '10分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'emotion',
    targetDimension: 'neuroticism',
    targetScoreRange: [0, 25],
    relatedAssessments: ['bigfive'],
    benefits: [
      '情绪不是只有0和100',
      '平静≠麻木，允许自己流动',
      '做情绪的调色盘，而不是开关',
    ],
    exercises: [
      { id: 'er1', title: '诚实', instruction: '我承认，我经常关闭自己的感受', duration: 15, type: 'guided' },
      { id: 'er2', title: '探索', instruction: '如果1是无感，10是崩溃，现在是几分？', duration: 45, type: 'reflection' },
      { id: 'er3', title: '允许', instruction: '允许自己停在5分，不用推到0', duration: 60, type: 'guided' },
      { id: 'er4', title: '休息', instruction: '深呼吸，感受情绪的流动', duration: 30, type: 'rest' },
      { id: 'er5', title: '练习', instruction: '今天刻意感受一个"中等强度"的情绪', duration: 60, type: 'guided' },
    ],
  },
]

export default COGNITION_TRAININGS
