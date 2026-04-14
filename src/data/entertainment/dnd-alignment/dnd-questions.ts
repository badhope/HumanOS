import type { Question } from '../../../types'
import type { DndQuestionMeta } from './dnd-common'

export const dndAlignmentQuestions: Question[] = [
  { id: 'dnd1', text: '遵守规则对我来说非常重要。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'neutral', weight: 1.2 } },
  { id: 'dnd2', text: '看到别人遇到困难我会主动伸出援手。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'good', weight: 1.1 } },
  { id: 'dnd3', text: '为了达到目的可以不择手段。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'evil', weight: 1.2 } },
  { id: 'dnd4', text: '我喜欢打破常规和传统。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd5', text: '即使不公平我也要遵守规则。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd6', text: '个人自由比社会秩序更重要。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.2 } },
  { id: 'dnd7', text: '牺牲小我成就大我是值得的。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'good', weight: 1.0 } },
  { id: 'dnd8', text: '人不为己天诛地灭。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'evil', weight: 1.1 } },
  { id: 'dnd9', text: '权威通常是正确的。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'neutral', weight: 0.9 } },
  { id: 'dnd10', text: '我会告发朋友的违法行为。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'neutral', weight: 1.3 } },
  { id: 'dnd11', text: '帮助别人就是帮助自己。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'good', weight: 1.0 } },
  { id: 'dnd12', text: '利用别人的天真来获利是可以接受的。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'evil', weight: 1.2 } },
  { id: 'dnd13', text: '我讨厌被命令做事。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd14', text: '不公正的法律应该被违反。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'good', weight: 1.3 } },
  { id: 'dnd15', text: '尊重契约精神是做人的基本。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd16', text: '大多数人本质上是善良的。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'good', weight: 0.9 } },
  { id: 'dnd17', text: '同情弱者是浪费时间。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'evil', weight: 1.0 } },
  { id: 'dnd18', text: '我经常凭冲动做事。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'neutral', weight: 0.9 } },
  { id: 'dnd19', text: '有权力的人应该被服从。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd20', text: '我会偷富人的钱给穷人。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'good', weight: 1.2 } },
  { id: 'dnd21', text: '我相信因果报应。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'good', weight: 0.8 } },
  { id: 'dnd22', text: '受伤的动物应该直接了结。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'evil', weight: 0.9 } },
  { id: 'dnd23', text: '我喜欢出乎意料的惊喜。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'neutral', weight: 0.8 } },
  { id: 'dnd24', text: '我严格按照计划行事。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'neutral', weight: 0.9 } },
  { id: 'dnd25', text: '成功必须不择手段。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'evil', weight: 1.1 } },
  { id: 'dnd26', text: '说谎总是不对的。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'good', weight: 1.0 } },
  { id: 'dnd27', text: '制度是用来打破的。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd28', text: '我会为了保护家人而违法。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.2 } },
  { id: 'dnd29', text: '每个人都应该得到平等的机会。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'good', weight: 1.0 } },
  { id: 'dnd30', text: '这个世界就是弱肉强食。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'evil', weight: 1.1 } },
  { id: 'dnd31', text: '我相信凡事都有对错之分。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'neutral', weight: 0.9 } },
  { id: 'dnd32', text: '随心所欲地生活才是真正的活着。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd33', text: '荣誉比生命更重要。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'lawful', morals: 'good', weight: 1.0 } },
  { id: 'dnd34', text: '别人的痛苦与我无关。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'evil', weight: 1.0 } },
  { id: 'dnd35', text: '我质疑一切形式的权威。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd36', text: '善有善报恶有恶报。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { ethics: 'neutral', morals: 'good', weight: 0.9 } },
]
