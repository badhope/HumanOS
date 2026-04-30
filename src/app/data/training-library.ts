import type { TrainingProgram } from '../components/training/TrainingEngine'
import COGNITION_TRAININGS from './training-cognition'
import EMOTION_TRAININGS from './training-emotion'
import ATTACHMENT_TRAININGS from './training-attachment'
import { SOCIAL_TRAININGS, FUN_EXTENDED_TRAININGS } from './training-social-fun'

// ============================================
// 📚 完整8大轨道训练体系
// ============================================

export const FOUNDATION_TRAININGS: TrainingProgram[] = [
  {
    id: 'emotion-anchoring',
    title: '情绪锚定训练',
    subtitle: '建立你的情绪稳定开关',
    icon: '🧘',
    duration: '5分钟',
    level: 1,
    levelLabel: '入门觉醒',
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
    level: 1,
    levelLabel: '入门觉醒',
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
    level: 2,
    levelLabel: '刻意练习',
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
    level: 1,
    levelLabel: '入门觉醒',
    category: 'career',
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
    level: 2,
    levelLabel: '刻意练习',
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
// 🎮 经典趣味训练（已移至 training-social-fun.ts 扩展）
// ============================================

export const FUN_TRAININGS: TrainingProgram[] = []

// ============================================
// 🚀 八轨道训练体系导出
// ============================================

export const EMOTION_TRAININGS_FULL = [...EMOTION_TRAININGS]
export const COGNITION_TRAININGS_FULL = [...COGNITION_TRAININGS]
export const ATTACHMENT_TRAININGS_FULL = [...ATTACHMENT_TRAININGS]
export const SOCIAL_TRAININGS_FULL = [...SOCIAL_TRAININGS]
export const FUN_TRAININGS_FULL = [...FUN_TRAININGS, ...FUN_EXTENDED_TRAININGS]

// 暂时开放：职业、价值观、正念轨道为占位
export const CAREER_TRAININGS: TrainingProgram[] = []
export const VALUES_TRAININGS: TrainingProgram[] = []
export const MINDFULNESS_TRAININGS: TrainingProgram[] = []

// ============================================
// 📊 训练总库 - 目前共 41+ 个训练项目
// ============================================

export const ALL_TRAININGS = [
  ...FOUNDATION_TRAININGS,
  ...EMOTION_TRAININGS_FULL,
  ...COGNITION_TRAININGS_FULL,
  ...ATTACHMENT_TRAININGS_FULL,
  ...SOCIAL_TRAININGS_FULL,
  ...FUN_TRAININGS_FULL,
  ...CAREER_TRAININGS,
  ...VALUES_TRAININGS,
  ...MINDFULNESS_TRAININGS,
]

export const getTrainingById = (id: string) => ALL_TRAININGS.find(t => t.id === id)

export const getTrainingsByCategory = (category: string) => 
  ALL_TRAININGS.filter(t => t.category === category)

export const getTrainingsForDimension = (dimension: string, score: number) => {
  return ALL_TRAININGS.filter(t => {
    if (t.targetDimension !== dimension) return false
    if (!t.targetScoreRange) return true
    const [min, max] = t.targetScoreRange
    return score >= min && score <= max
  })
}

export const getRecommendedTrainings = (moodLevel?: number, dimensions?: Record<string, number>) => {
  let trainings = [...ALL_TRAININGS].filter(t => t.level === 1)
  
  if (dimensions) {
    const dimensionRecommendations: TrainingProgram[] = []
    Object.entries(dimensions).forEach(([dim, score]) => {
      const matched = getTrainingsForDimension(dim, score)
      dimensionRecommendations.push(...matched)
    })
    if (dimensionRecommendations.length > 0) {
      return dimensionRecommendations.slice(0, 5)
    }
  }
  
  if (moodLevel !== undefined && moodLevel <= 1) {
    trainings = trainings.filter(t => ['emotion', 'attachment'].includes(t.category))
  } else if (moodLevel !== undefined && moodLevel >= 3) {
    trainings = trainings.filter(t => ['cognition', 'social', 'career'].includes(t.category))
  }
  
  return trainings.slice(0, 5)
}
