import type { Question } from '../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般符合', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const elsNormalQuestions: Question[] = [
  { id: 'els_n01', text: '我工作时需要伪装自己的真实情绪', type: 'scale', options: opts, meta: { dimension: 'surface_acting', weight: 1.0 } },
  { id: 'els_n02', text: '我会努力调整内心真实的感受', type: 'scale', options: opts, meta: { dimension: 'deep_acting', weight: 1.0 } },
  { id: 'els_n03', text: '我表达的情绪是真实自然的', type: 'scale', options: opts, meta: { dimension: 'genuine', weight: 1.0 } },
  { id: 'els_n04', text: '我戴"职业面具"来和客户打交道', type: 'scale', options: opts, meta: { dimension: 'surface_acting', weight: 1.0 } },
  { id: 'els_n05', text: '我会尝试从对方角度看问题来产生合适情绪', type: 'scale', options: opts, meta: { dimension: 'deep_acting', weight: 1.0 } },
  { id: 'els_n06', text: '工作中的情绪表达和真实的我是一致的', type: 'scale', options: opts, meta: { dimension: 'genuine', weight: 1.0 } },
  { id: 'els_n07', text: '压抑真实情绪让我感到疲惫', type: 'scale', options: opts, meta: { dimension: 'surface_acting', weight: 1.0 } },
  { id: 'els_n08', text: '我能真正感受到我应该表现出的情绪', type: 'scale', options: opts, meta: { dimension: 'deep_acting', weight: 1.0 } },
  { id: 'els_n09', text: '我不需要刻意表现就能展示专业的情绪', type: 'scale', options: opts, meta: { dimension: 'genuine', weight: 1.0 } },
  { id: 'els_n10', text: '我只是表面上表现出合适的情绪', type: 'scale', options: opts, meta: { dimension: 'surface_acting', weight: 1.0 } },
  { id: 'els_n11', text: '我会主动调整心态来匹配工作要求', type: 'scale', options: opts, meta: { dimension: 'deep_acting', weight: 1.0 } },
  { id: 'els_n12', text: '我的工作热情是发自内心的', type: 'scale', options: opts, meta: { dimension: 'genuine', weight: 1.0 } },
  { id: 'els_n13', text: '客户永远看不到我真实的负面情绪', type: 'scale', options: opts, meta: { dimension: 'surface_acting', weight: 1.0 } },
  { id: 'els_n14', text: '我能通过自我暗示产生需要的情绪', type: 'scale', options: opts, meta: { dimension: 'deep_acting', weight: 1.0 } },
  { id: 'els_n15', text: '情绪劳动对我来说毫不费力', type: 'scale', options: opts, meta: { dimension: 'genuine', weight: 1.0 } },
  { id: 'els_n16', text: '伪装情绪让我有心理消耗', type: 'scale', options: opts, meta: { dimension: 'emotional_dissonance', weight: 1.0 } },
  { id: 'els_n17', text: '频繁的情绪互动让我感到 burnout', type: 'scale', options: opts, meta: { dimension: 'burnout', weight: 1.0 } },
  { id: 'els_n18', text: '我感觉自己变得越来越冷漠', type: 'scale', options: opts, meta: { dimension: 'depersonalization', weight: 1.0 } },
  { id: 'els_n19', text: '工作中我学会了情绪分离技术', type: 'scale', options: opts, meta: { dimension: 'emotional_regulation', weight: 1.0 } },
  { id: 'els_n20', text: '情绪管理已经成为我的职业技能', type: 'scale', options: opts, meta: { dimension: 'professional', weight: 1.0 } },
]
