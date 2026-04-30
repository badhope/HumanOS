import type { TrainingProgram } from '../components/training/TrainingEngine'

// ============================================
// 🎭 人际社交轨道 - DISC/黑暗三角对应训练
// ============================================

export const SOCIAL_TRAININGS: TrainingProgram[] = [
  // ==========================================
  // DISC - D型 支配型
  // ==========================================
  {
    id: 'd-type-softening',
    title: 'D型权力柔化训练',
    subtitle: '赢了争论输了人',
    icon: '👑',
    duration: '10分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'social',
    targetDimension: 'disc_dominance',
    targetScoreRange: [75, 100],
    relatedAssessments: ['disc'],
    benefits: [
      '不是所有事都要赢',
      '正确比赢了更重要',
      '示弱是更强的力量',
    ],
    exercises: [
      { id: 'd1', title: '回忆', instruction: '上次你明知道自己错了但还在硬辩是什么时候？', duration: 60, type: 'reflection' },
      { id: 'd2', title: '代价', instruction: '为了"赢"那场争论，你失去了什么？', duration: 60, type: 'reflection' },
      { id: 'd3', title: '转念', instruction: '"我错了"是世界上最有力量的三个字', duration: 45, type: 'affirmation' },
      { id: 'd4', title: '休息', instruction: '深呼吸，肩膀放软，下巴放松', duration: 30, type: 'rest' },
      { id: 'd5', title: '练习', instruction: '本周故意"输"一次不重要的争论', duration: 60, type: 'guided' },
    ],
  },

  // ==========================================
  // DISC - I型 影响型
  // ==========================================
  {
    id: 'i-type-listening',
    title: 'I型深度倾听训练',
    subtitle: '忍住表达的冲动',
    icon: '🎤',
    duration: '8分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'social',
    targetDimension: 'disc_influence',
    targetScoreRange: [75, 100],
    relatedAssessments: ['disc'],
    benefits: [
      '真的在听，而不是在准备下一句',
      '被听见比被喜欢更重要',
      '沉默也很有魅力',
    ],
    exercises: [
      { id: 'i1', title: '诚实', instruction: '我承认，我说话时经常在想下一句说什么', duration: 30, type: 'guided' },
      { id: 'i2', title: '冲动', instruction: '别人说话时，你忍几秒才插话？', duration: 45, type: 'reflection' },
      { id: 'i3', title: '练习', instruction: '下次说话前，先等对方说完3秒再开口', duration: 60, type: 'guided' },
      { id: 'i4', title: '休息', instruction: '深呼吸，享受当听众的宁静', duration: 30, type: 'rest' },
      { id: 'i5', title: '承诺', instruction: '今天有一次对话，全程只听不说', duration: 45, type: 'guided' },
    ],
  },

  // ==========================================
  // DISC - S型 稳健型
  // ==========================================
  {
    id: 's-type-assertiveness',
    title: 'S型主张表达训练',
    subtitle: '温和但坚定地说不',
    icon: '🐢',
    duration: '10分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'social',
    targetDimension: 'disc_steadiness',
    targetScoreRange: [75, 100],
    relatedAssessments: ['disc'],
    benefits: [
      '你的感受和别人的一样重要',
      '说不不会破坏关系',
      '温柔不等于软弱',
    ],
    exercises: [
      { id: 's1', title: '回忆', instruction: '上次心里想说"不"但说"好"是什么时候？', duration: 60, type: 'reflection' },
      { id: 's2', title: '感受', instruction: '事后你心里是什么感觉？', duration: 45, type: 'reflection' },
      { id: 's3', title: '练习拒绝', instruction: '"谢谢你想到我，但这次我不方便"', duration: 60, type: 'guided' },
      { id: 's4', title: '休息', instruction: '深呼吸，感受自己的力量', duration: 30, type: 'rest' },
      { id: 's5', title: '承诺', instruction: '本周说一次"不"，不需要解释太多', duration: 60, type: 'guided' },
    ],
  },

  // ==========================================
  // 黑暗三角 - 自恋 / 马基雅维利
  // ==========================================
  {
    id: 'narcissism-empathy',
    title: '自恋者共情启动',
    subtitle: '别人也是人',
    icon: '🪞',
    duration: '12分钟',
    level: 3,
    levelLabel: '深度整合',
    category: 'social',
    targetDimension: 'dark_narcissism',
    targetScoreRange: [70, 100],
    relatedAssessments: ['dark'],
    benefits: [
      '不是所有人都围着你转',
      '真正的伟大是看见别人',
      '深度连接比崇拜更长久',
    ],
    exercises: [
      { id: 'n1', title: '诚实', instruction: '我承认，有时我觉得别人都没我厉害', duration: 45, type: 'guided' },
      { id: 'n2', title: '平凡练习', instruction: '列出3个你不如别人的地方', duration: 90, type: 'reflection' },
      { id: 'n3', title: '转念', instruction: '我们都是平凡又特别的人类', duration: 60, type: 'guided' },
      { id: 'n4', title: '休息', instruction: '深呼吸，做一个普通人没什么不好', duration: 30, type: 'rest' },
      { id: 'n5', title: '行动', instruction: '本周真诚赞美一个你之前看不起的人', duration: 60, type: 'guided' },
    ],
  },
]

// ============================================
// 🎮 趣味娱乐轨道 - ACG主题特色训练
// ============================================

export const FUN_EXTENDED_TRAININGS: TrainingProgram[] = [
  // ==========================================
  // 经典趣味
  // ==========================================
  {
    id: 'onepiece-challenge',
    title: '海贼王意志力挑战',
    subtitle: '像草帽海贼团一样战斗！',
    icon: '🏴‍☠️',
    duration: '5分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'fun',
    benefits: [
      '我是要成为海贼王的男人！',
      '路飞的三档爆发训练',
      '索隆的三千世界专注力',
    ],
    exercises: [
      { id: 'op1', title: '准备', instruction: '戴上你的草帽！', duration: 10, type: 'guided' },
      { id: 'op2', title: '梅利号出航', instruction: '伙伴就在身边！我们不是孤单一人！', duration: 30, type: 'guided' },
      { id: 'op3', title: '二档！', instruction: '橡胶橡胶的... 喷气手枪！', duration: 60, type: 'countdown' },
      { id: 'op4', title: '休息', instruction: '吃肉！大口吃肉补充体力！', duration: 20, type: 'rest' },
      { id: 'op5', title: '三档！骨气球！', instruction: '为了伙伴，我要变得更强！', duration: 60, type: 'guided' },
      { id: 'op6', title: '胜利！', instruction: '海贼王，我当定了！', duration: 15, type: 'guided' },
    ],
  },
  {
    id: 'anime-character-immersive',
    title: '角色代入沉浸体验',
    subtitle: '今天你是谁？',
    icon: '🎭',
    duration: '8分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'fun',
    benefits: [
      '体验你推的人生5分钟',
      '沉浸式角色信念注入',
      '今天也要像TA一样活着！',
    ],
    exercises: [
      { id: 'a1', title: '选择角色', instruction: '今天你想成为谁？', duration: 15, type: 'guided' },
      { id: 'a2', title: '注入', instruction: '闭上眼，感受TA的灵魂与你同在', duration: 60, type: 'guided' },
      { id: 'a3', title: '名台词', instruction: '说出TA最经典的那句台词！', duration: 30, type: 'guided' },
      { id: 'a4', title: '战斗曲', instruction: 'BGM响起！', duration: 60, type: 'guided' },
      { id: 'a5', title: '升华', instruction: '带着TA的力量，去过今天！', duration: 30, type: 'guided' },
    ],
  },
  {
    id: 'meme-meditation',
    title: '梗图冥想',
    subtitle: '用互联网梗图净化心灵',
    icon: '😂',
    duration: '4分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'fun',
    benefits: [
      '众生皆苦，不如哈哈哈哈',
      '没什么事是一张梗图解不开的',
      '当代年轻人的正念修行',
    ],
    exercises: [
      { id: 'm1', title: '准备', instruction: '回想今天看到的最好笑的梗', duration: 10, type: 'guided' },
      { id: 'm2', title: '哈哈哈', instruction: '现在在心里把它笑出来', duration: 45, type: 'guided' },
      { id: 'm3', title: '人类的悲欢并不相通', instruction: '但我们可以一起沙雕', duration: 30, type: 'guided' },
      { id: 'm4', title: '虚无主义解毒', instruction: '反正百年之后都是尘埃', duration: 60, type: 'guided' },
      { id: 'm5', title: '完成', instruction: '有什么大不了的呢？开心最重要', duration: 15, type: 'guided' },
    ],
  },

  // ==========================================
  // 火影忍者 Naruto
  // ==========================================
  {
    id: 'naruto-chakra-control',
    title: '查克拉控制训练',
    subtitle: '忍者的呼吸集中法',
    icon: '🍥',
    duration: '6分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'fun',
    benefits: [
      '凝聚查克拉到脚底',
      '忍者的集中力',
      '火之意志传承',
    ],
    exercises: [
      { id: 'na1', title: '结印·子', instruction: '忍者的准备姿势', duration: 10, type: 'guided' },
      { id: 'na2', title: '凝聚查克拉', instruction: '感受体内流动的能量', duration: 60, type: 'breathing' },
      { id: 'na3', title: '影分身之术！', instruction: '用你的查克拉创造分身！', duration: 30, type: 'guided' },
      { id: 'na4', title: '休息', instruction: '吃一乐拉面补充查克拉', duration: 20, type: 'rest' },
      { id: 'na5', title: '螺旋丸！', instruction: '把所有查克拉凝聚在手心！', duration: 60, type: 'countdown' },
      { id: 'na6', title: '这就是...', instruction: '我的忍道！', duration: 15, type: 'guided' },
    ],
  },

  // ==========================================
  // 咒术回战 Jujutsu Kaisen
  // ==========================================
  {
    id: 'jujutsu-domain-expansion',
    title: '领域展开训练',
    subtitle: '五条悟的无敌心态',
    icon: '👁️',
    duration: '8分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'fun',
    benefits: [
      '无量空处心态',
      '天上天下，唯我独尊',
      '咒力就是想象力',
    ],
    exercises: [
      { id: 'j1', title: '摘下眼罩', instruction: '准备好见识真正的力量了吗', duration: 15, type: 'guided' },
      { id: 'j2', title: '反转术式', instruction: '把负面情绪变成咒力', duration: 60, type: 'guided' },
      { id: 'j3', title: '黑闪！', instruction: '0.000001秒的冲击！', duration: 30, type: 'countdown' },
      { id: 'j4', title: '休息', instruction: '吃喜久福补充能量', duration: 20, type: 'rest' },
      { id: 'j5', title: '领域展开', instruction: '🌀 无量空处 🌀', duration: 90, type: 'visualization' },
      { id: 'j6', title: '无敌宣言', instruction: '抱歉，你赢不了我', duration: 15, type: 'affirmation' },
    ],
  },

  // ==========================================
  // JOJO的奇妙冒险
  // ==========================================
  {
    id: 'jojo-golden-spirit',
    title: '黄金精神训练',
    subtitle: '人类的赞歌是勇气的赞歌',
    icon: '⭐',
    duration: '7分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'fun',
    benefits: [
      'JOJO的奇妙勇气',
      '白金之星世界！',
      '我不做人了！JOJO！',
    ],
    exercises: [
      { id: 'jo1', title: 'JOJO立！', instruction: '摆出你最帅的JOJO姿势！', duration: 30, type: 'guided' },
      { id: 'jo2', title: '波纹呼吸', instruction: 'SUNLIGHT YELLOW OVERDRIVE！', duration: 60, type: 'breathing' },
      { id: 'jo3', title: '召唤替身', instruction: '出吧！我的替身！', duration: 30, type: 'guided' },
      { id: 'jo4', title: '休息', instruction: '喝阿帕茶...还是算了', duration: 20, type: 'rest' },
      { id: 'jo5', title: '王道征途', instruction: '这是我最后的波纹了！收下吧！', duration: 60, type: 'guided' },
      { id: 'jo6', title: '完成', instruction: '真是HIGH到不行啊！', duration: 15, type: 'guided' },
    ],
  },

  // ==========================================
  // 进击的巨人
  // ==========================================
  {
    id: 'aot-wings-of-freedom',
    title: '自由之翼',
    subtitle: '走出墙壁的勇气',
    icon: '⚔️',
    duration: '8分钟',
    level: 2,
    levelLabel: '刻意练习',
    category: 'fun',
    benefits: [
      '献出你的心脏！',
      '墙壁的外面是自由',
      '战斗啊！战斗啊！',
    ],
    exercises: [
      { id: 'a1', title: '调查兵团集合', instruction: '调查兵团第104期，准备出发！', duration: 15, type: 'guided' },
      { id: 'a2', title: '立体机动启动', instruction: '气体最大喷射！', duration: 45, type: 'countdown' },
      { id: 'a3', title: '刀锋向巨人', instruction: '为了人类的胜利！', duration: 60, type: 'guided' },
      { id: 'a4', title: '休息', instruction: '记住那些献出心脏的战友们', duration: 30, type: 'rest' },
      { id: 'a5', title: '海的那边', instruction: '相信自己的选择，继续前进', duration: 60, type: 'visualization' },
      { id: 'a6', title: '宣誓', instruction: '献出心脏！❤️', duration: 15, type: 'affirmation' },
    ],
  },

  // ==========================================
  // 原神
  // ==========================================
  {
    id: 'genshin-element-meditation',
    title: '七元素冥想',
    subtitle: '感受提瓦特的元素力',
    icon: '💎',
    duration: '8分钟',
    level: 1,
    levelLabel: '入门觉醒',
    category: 'fun',
    benefits: [
      '风的自由',
      '岩的坚定',
      '雷的永恒',
    ],
    exercises: [
      { id: 'g1', title: '旅行者', instruction: '欢迎来到提瓦特大陆', duration: 15, type: 'guided' },
      { id: 'g2', title: '风元素', instruction: '感受风在指尖流动', duration: 45, type: 'visualization' },
      { id: 'g3', title: '岩元素', instruction: '感受大地的坚实与力量', duration: 45, type: 'guided' },
      { id: 'g4', title: '休息', instruction: '在七天神像下休息', duration: 30, type: 'rest' },
      { id: 'g5', title: '雷元素', instruction: '感受闪电在血管中奔腾', duration: 45, type: 'guided' },
      { id: 'g6', title: '出发吧', instruction: '前面的区域以后再来探索吧？', duration: 60, type: 'guided' },
    ],
  },
]


