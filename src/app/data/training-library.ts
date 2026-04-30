import type { TrainingProgram } from '../components/training/TrainingEngine'

// ============================================
// 🧠 第一轨道：专业成长类训练
// ============================================

export const GROWTH_TRAININGS: TrainingProgram[] = [
  {
    id: 'emotion-anchoring',
    title: '情绪锚定训练',
    subtitle: '建立你的情绪稳定开关',
    icon: '🧘',
    duration: '5分钟',
    level: '入门',
    category: 'emotion',
    benefits: [
      '478呼吸法 - 60秒快速平复焦虑',
      '身体扫描 - 觉察情绪的身体信号',
      '5-4-3-2-1技术 - 惊恐发作急救',
    ],
    exercises: [
      { id: 'b1', title: '准备', instruction: '找一个舒服的姿势坐好', duration: 10, type: 'guided' },
      { id: 'b2', title: '478呼吸法', instruction: '跟随节奏：吸气4秒 → 屏气7秒 → 呼气8秒', duration: 60, type: 'breathing' },
      { id: 'b3', title: '休息', instruction: '自然呼吸，感受身体的变化', duration: 15, type: 'rest' },
      { id: 'b4', title: '身体扫描', instruction: '把注意力从头顶逐步移到脚底', duration: 90, type: 'guided' },
      { id: 'b5', title: '5-4-3-2-1着陆', instruction: '说出5看4听3摸2闻1尝', duration: 60, type: 'guided' },
    ],
  },
  {
    id: 'self-compassion',
    title: '自我同情练习',
    subtitle: '停止自我攻击，与自己和解',
    icon: '💗',
    duration: '8分钟',
    level: '入门',
    category: 'emotion',
    benefits: [
      '学会像对待朋友一样对待自己',
      '停止内心的批评和指责',
      '在痛苦中给自己拥抱',
    ],
    exercises: [
      { id: 's1', title: '准备', instruction: '回想一件最近让你自责的事情', duration: 15, type: 'guided' },
      { id: 's2', title: '第一步', instruction: '如果好朋友遇到这件事，你会怎么说？', duration: 60, type: 'reflection' },
      { id: 's3', title: '休息', instruction: '深呼吸3次', duration: 20, type: 'rest' },
      { id: 's4', title: '第二步', instruction: '现在把同样的话对自己说一遍', duration: 120, type: 'guided' },
      { id: 's5', title: '第三步', instruction: '所有人都会犯错，这就是做人的一部分', duration: 60, type: 'guided' },
      { id: 's6', title: '整合', instruction: '把手放在心上，感受来自自己的善意', duration: 45, type: 'guided' },
    ],
  },
  {
    id: 'boundary-setting',
    title: '边界建立训练',
    subtitle: '学会说不，不做老好人',
    icon: '🛡️',
    duration: '10分钟',
    level: '进阶',
    category: 'social',
    benefits: [
      '识别自己的边界在哪里',
      '学会温和而坚定地拒绝',
      '不再为别人的情绪负责',
    ],
    exercises: [
      { id: 'bo1', title: '准备', instruction: '回想一个让你不舒服的请求', duration: 15, type: 'guided' },
      { id: 'bo2', title: '红线识别', instruction: '哪一点让你不舒服？时间？精力？还是价值观？', duration: 60, type: 'reflection' },
      { id: 'bo3', title: '拒绝句式', instruction: '"感谢你的邀请，但我这次不方便。"', duration: 45, type: 'guided' },
      { id: 'bo4', title: '练习', instruction: '不需要解释太多，不需要道歉', duration: 60, type: 'guided' },
      { id: 'bo5', title: '休息', instruction: '为自己勇敢而骄傲', duration: 20, type: 'rest' },
      { id: 'bo6', title: '内化', instruction: '我的感受和别人的感受一样重要', duration: 60, type: 'guided' },
    ],
  },
  {
    id: 'micro-habit',
    title: '微习惯启动',
    subtitle: '用最小行动打破拖延',
    icon: '🌱',
    duration: '3分钟',
    level: '入门',
    category: 'behavior',
    benefits: [
      '永远从"小到不可能失败"开始',
      '不需要意志力，也能坚持',
      '建立正向飞轮效应',
    ],
    exercises: [
      { id: 'm1', title: '准备', instruction: '选一件你一直在拖延的事', duration: 10, type: 'guided' },
      { id: 'm2', title: '缩小', instruction: '把它缩小到30秒就能做完的版本', duration: 60, type: 'reflection' },
      { id: 'm3', title: '倒数', instruction: '5 - 4 - 3 - 2 - 1', duration: 5, type: 'countdown' },
      { id: 'm4', title: '立刻做！', instruction: '现在就去做那30秒的版本！', duration: 60, type: 'guided' },
      { id: 'm5', title: '庆祝', instruction: '你做到了！为自己鼓掌', duration: 15, type: 'guided' },
    ],
  },
  {
    id: 'cognitive-restructuring',
    title: '认知重构训练',
    subtitle: '打破负面思维的死循环',
    icon: '🔄',
    duration: '12分钟',
    level: '进阶',
    category: 'cognition',
    benefits: [
      '识别认知扭曲的10种模式',
      '把灾难化思维拉回现实',
      '建立客观中立的思维习惯',
    ],
    exercises: [
      { id: 'c1', title: '准备', instruction: '想一个最近让你焦虑的念头', duration: 15, type: 'guided' },
      { id: 'c2', title: '第一步', instruction: '支持这个想法的证据有哪些？', duration: 90, type: 'reflection' },
      { id: 'c3', title: '第二步', instruction: '反对这个想法的证据有哪些？', duration: 90, type: 'reflection' },
      { id: 'c4', title: '休息', instruction: '深呼吸，让思绪清空', duration: 20, type: 'rest' },
      { id: 'c5', title: '第三步', instruction: '最符合现实的情况是什么？', duration: 60, type: 'guided' },
      { id: 'c6', title: '第四步', instruction: '即使最坏情况发生了，我能应对吗？', duration: 60, type: 'guided' },
      { id: 'c7', title: '整合', instruction: '现在你对这件事的感觉是？', duration: 45, type: 'reflection' },
    ],
  },
]

// ============================================
// 🎮 第二轨道：趣味娱乐类项目
// ============================================

export const FUN_TRAININGS: TrainingProgram[] = [
  {
    id: 'onepiece-challenge',
    title: '海贼王意志力挑战',
    subtitle: '像草帽海贼团一样战斗！',
    icon: '🏴‍☠️',
    duration: '5分钟',
    level: '入门',
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
    level: '入门',
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
    level: '入门',
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
]

export const ALL_TRAININGS = [...GROWTH_TRAININGS, ...FUN_TRAININGS]

export const getTrainingById = (id: string) => ALL_TRAININGS.find(t => t.id === id)

export const getTrainingsByCategory = (category: string) => 
  ALL_TRAININGS.filter(t => t.category === category)

export const getRecommendedTrainings = (moodLevel?: number, dimensions?: Record<string, any>) => {
  let trainings = [...GROWTH_TRAININGS]
  
  if (moodLevel !== undefined && moodLevel <= 1) {
    trainings = trainings.filter(t => ['emotion'].includes(t.category))
  } else if (moodLevel !== undefined && moodLevel >= 3) {
    trainings = trainings.filter(t => ['behavior', 'social', 'cognition'].includes(t.category))
  }
  
  return trainings.slice(0, 3)
}
