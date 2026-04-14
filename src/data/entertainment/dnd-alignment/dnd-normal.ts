import type { Question } from '../../../types'
import type { DndQuestionMeta } from './dnd-common'

const opts = [
  { id: '1', text: '❌ 完全不符合我', value: 1 },
  { id: '2', text: '⚪️ 不太符合我', value: 2 },
  { id: '3', text: '🔵 一般符合我', value: 3 },
  { id: '4', text: '🟢 比较符合我', value: 4 },
  { id: '5', text: '✅ 完全就是我', value: 5 },
]

export const dndNormalQuestions: Question[] = [
  { id: 'dnd_n01', text: '遵守规则对我来说非常重要', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 1.2 } },
  { id: 'dnd_n02', text: '看到别人遇到困难我会主动伸出援手', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'good', weight: 1.1 } },
  { id: 'dnd_n03', text: '为了达到目的可以不择手段', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'evil', weight: 1.2 } },
  { id: 'dnd_n04', text: '我喜欢打破常规和传统', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd_n05', text: '即使不公平我也要遵守规则', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd_n06', text: '个人自由比社会秩序更重要', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.2 } },
  { id: 'dnd_n07', text: '牺牲小我成就大我是值得的', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'good', weight: 1.0 } },
  { id: 'dnd_n08', text: '人不为己天诛地灭', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'evil', weight: 1.1 } },
  { id: 'dnd_n09', text: '权威通常是正确的', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 0.9 } },
  { id: 'dnd_n10', text: '我会告发朋友的违法行为', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd_n11', text: '我相信人性本善', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'good', weight: 1.0 } },
  { id: 'dnd_n12', text: '我讨厌被束缚的感觉', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd_n13', text: '我会优先照顾自己的利益', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'evil', weight: 1.0 } },
  { id: 'dnd_n14', text: '我相信制度和秩序的力量', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd_n15', text: '我会不计代价帮助需要帮助的人', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'good', weight: 1.1 } },
  { id: 'dnd_n16', text: '随机应变比按计划行事更好', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd_n17', text: '我不会为了成功而欺骗别人', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'good', weight: 1.2 } },
  { id: 'dnd_n18', text: '弱者应该被强者支配', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'evil', weight: 1.1 } },
  { id: 'dnd_n19', text: '我做事只遵循自己的原则', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd_n20', text: '信守承诺对我来说至关重要', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 1.2 } },
]
