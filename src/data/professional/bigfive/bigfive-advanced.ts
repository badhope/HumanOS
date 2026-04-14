import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const bigfiveAdvancedQuestions: Question[] = [
  { id: 'bf_a01', text: '我是派对上活跃气氛的人', type: 'scale', options: opts, meta: { dimension: 'extraversion', reverse: false } },
  { id: 'bf_a02', text: '我对他人的痛苦感同身受', type: 'scale', options: opts, meta: { dimension: 'agreeableness', reverse: false } },
  { id: 'bf_a03', text: '我坚持直到事情完美完成', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'bf_a04', text: '我很少对自己感到不满意', type: 'scale', options: opts, meta: { dimension: 'neuroticism', reverse: true } },
  { id: 'bf_a05', text: '我喜欢思考抽象的哲学问题', type: 'scale', options: opts, meta: { dimension: 'openness', reverse: false } },
  { id: 'bf_a06', text: '我喜欢成为关注的焦点', type: 'scale', options: opts, meta: { dimension: 'extraversion', reverse: false } },
  { id: 'bf_a07', text: '我尽量不与任何人发生冲突', type: 'scale', options: opts, meta: { dimension: 'agreeableness', reverse: false } },
  { id: 'bf_a08', text: '我总是提前做好规划', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'bf_a09', text: '我不容易感到紧张', type: 'scale', options: opts, meta: { dimension: 'neuroticism', reverse: true } },
  { id: 'bf_a10', text: '我对艺术有很高的鉴赏力', type: 'scale', options: opts, meta: { dimension: 'openness', reverse: false } },
  { id: 'bf_a11', text: '我喜欢和朋友一起玩而不是独处', type: 'scale', options: opts, meta: { dimension: 'extraversion', reverse: false } },
  { id: 'bf_a12', text: '别人说我心肠太软', type: 'scale', options: opts, meta: { dimension: 'agreeableness', reverse: false } },
  { id: 'bf_a13', text: '别人认为我非常可靠', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'bf_a14', text: '我很少情绪波动', type: 'scale', options: opts, meta: { dimension: 'neuroticism', reverse: true } },
  { id: 'bf_a15', text: '我喜欢与众不同的想法', type: 'scale', options: opts, meta: { dimension: 'openness', reverse: false } },
  { id: 'bf_a16', text: '我说话热情洋溢', type: 'scale', options: opts, meta: { dimension: 'extraversion', reverse: false } },
  { id: 'bf_a17', text: '我愿意为别人妥协', type: 'scale', options: opts, meta: { dimension: 'agreeableness', reverse: false } },
  { id: 'bf_a18', text: '我做事追求精益求精', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'bf_a19', text: '我很少抱怨什么', type: 'scale', options: opts, meta: { dimension: 'neuroticism', reverse: true } },
  { id: 'bf_a20', text: '我喜欢了解不同的文化习俗', type: 'scale', options: opts, meta: { dimension: 'openness', reverse: false } },
  { id: 'bf_a21', text: '在人群中我感到自在', type: 'scale', options: opts, meta: { dimension: 'extraversion', reverse: false } },
  { id: 'bf_a22', text: '我对所有人都一视同仁', type: 'scale', options: opts, meta: { dimension: 'agreeableness', reverse: false } },
  { id: 'bf_a23', text: '浪费时间让我感到不安', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'bf_a24', text: '我能很好地处理压力', type: 'scale', options: opts, meta: { dimension: 'neuroticism', reverse: true } },
]
