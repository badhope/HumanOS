import type { Question } from '../../../types'
import type { LoveStyleQuestionMeta } from './love-common'

export const loveStyleQuestions: Question[] = [
  { id: 'love1', text: '我相信一见钟情。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'eros', reverse: false, weight: 1.2 } },
  { id: 'love2', text: '我享受和不同的人玩爱情游戏。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'ludus', reverse: false, weight: 1.1 } },
  { id: 'love3', text: '真正的爱情是从深厚的友谊开始的。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love4', text: '在选择伴侣前我会仔细考察对方的条件。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'pragma', reverse: false, weight: 1.2 } },
  { id: 'love5', text: '恋爱中我经常会嫉妒不安。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'mania', reverse: false, weight: 1.0 } },
  { id: 'love6', text: '我愿意为了爱人牺牲自己的利益。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'agape', reverse: false, weight: 1.1 } },
  { id: 'love7', text: '和喜欢的人身体接触会有触电的感觉。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'eros', reverse: false, weight: 1.0 } },
  { id: 'love8', text: '我很擅长撩别人。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'ludus', reverse: false, weight: 1.0 } },
  { id: 'love9', text: '陪伴比激情更重要。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love10', text: '门当户对是很重要的。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'pragma', reverse: false, weight: 1.2 } },
  { id: 'love11', text: '我总是担心对方不够爱我。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'mania', reverse: false, weight: 1.1 } },
  { id: 'love12', text: '即使爱人伤害了我我也会原谅TA。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'agape', reverse: false, weight: 1.0 } },
  { id: 'love13', text: '颜值对我来说非常重要。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'eros', reverse: false, weight: 1.1 } },
  { id: 'love14', text: '我不想对任何人做出承诺。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'ludus', reverse: false, weight: 1.2 } },
  { id: 'love15', text: '我喜欢青梅竹马的感情。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'storge', reverse: false, weight: 1.0 } },
  { id: 'love16', text: '爱情不能当饭吃。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'pragma', reverse: false, weight: 1.1 } },
  { id: 'love17', text: '我会反复看对方的聊天记录。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'mania', reverse: false, weight: 0.9 } },
  { id: 'love18', text: '我希望爱人过得比我好。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'agape', reverse: false, weight: 1.0 } },
  { id: 'love19', text: '我追求灵魂伴侣。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'eros', reverse: false, weight: 1.2 } },
  { id: 'love20', text: '暧昧期比正式交往更有趣。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'ludus', reverse: false, weight: 1.0 } },
  { id: 'love21', text: '习惯一个人就是爱。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'storge', reverse: false, weight: 1.0 } },
  { id: 'love22', text: '我会考虑结婚后的实际问题。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'pragma', reverse: false, weight: 1.0 } },
  { id: 'love23', text: '对方和异性说话我会吃醋。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'mania', reverse: false, weight: 1.0 } },
  { id: 'love24', text: '我支持爱人去追求TA的梦想。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'agape', reverse: false, weight: 1.0 } },
  { id: 'love25', text: '我喜欢浪漫的惊喜。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'eros', reverse: false, weight: 1.0 } },
  { id: 'love26', text: '认真你就输了。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'ludus', reverse: false, weight: 1.2 } },
  { id: 'love27', text: '平平淡淡才是真。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love28', text: '家人的意见非常重要。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'pragma', reverse: false, weight: 1.0 } },
  { id: 'love29', text: '恋爱会让我失眠。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'mania', reverse: false, weight: 0.9 } },
  { id: 'love30', text: '爱是给予不是索取。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'agape', reverse: false, weight: 1.1 } },
  { id: 'love31', text: '没有化学吸引的爱情我无法接受。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'eros', reverse: false, weight: 1.0 } },
  { id: 'love32', text: '同时和几个人保持暧昧很正常。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'ludus', reverse: false, weight: 1.1 } },
  { id: 'love33', text: '最好的朋友就是最好的爱人。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'storge', reverse: false, weight: 1.0 } },
  { id: 'love34', text: '两个差距太大的人不会幸福。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'pragma', reverse: false, weight: 1.0 } },
  { id: 'love35', text: '我会因为爱变得情绪化。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'mania', reverse: false, weight: 0.9 } },
  { id: 'love36', text: '只要TA幸福，我退出也没关系。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 完全不符合我', value: 1 },
    { id: '2', text: '⚪️ 不太符合我', value: 2 },
    { id: '3', text: '🔵 一般符合我', value: 3 },
    { id: '4', text: '🟢 比较符合我', value: 4 },
    { id: '5', text: '✅ 完全就是我', value: 5 },
  ],

  meta: { dimension: 'agape', reverse: false, weight: 1.2 } },
]
