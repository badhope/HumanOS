import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 几乎从不这样', value: 1 },
  { id: '2', text: '⚪️ 偶尔会这样', value: 2 },
  { id: '3', text: '🔵 一半时间会这样', value: 3 },
  { id: '4', text: '🟢 经常会这样', value: 4 },
  { id: '5', text: '✅ 几乎总是这样', value: 5 },
]

export const attachmentAdvancedQuestions: Question[] = [
  { id: 'att_a01', text: '伴侣几小时不回消息，我会脑补很多坏结果', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_a02', text: '我总是担心对方迟早会离开我', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_a03', text: '我经常怀疑自己配不上喜欢的人', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_a04', text: '被忽视让我感到强烈的不安', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_a05', text: '我需要反复确认对方是爱我的', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_a06', text: '我很容易因为小事感到被抛弃', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_a07', text: '过度亲密让我感到想要逃跑', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_a08', text: '我从不主动表达脆弱的一面', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_a09', text: '靠别人不如靠自己', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_a10', text: '我很少真正信任任何人', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_a11', text: '太喜欢一个人让我感到害怕', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_a12', text: '我故意和对方保持距离', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_a13', text: '冷战是我处理冲突的常用方式', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_a14', text: '伴侣的情绪变化我能敏锐察觉', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_a15', text: '我经常在关系中过度付出', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_a16', text: '我害怕成为别人的负担', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_a17', text: '对方太黏人让我感到窒息', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_a18', text: '我憧憬长久稳定的亲密关系', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'att_a19', text: '我能够自然地寻求伴侣的帮助', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'att_a20', text: '冲突后我愿意主动修复关系', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'att_a21', text: '我相信自己值得被好好爱着', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'att_a22', text: '分开时我不会过度胡思乱想', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'att_a23', text: '我能够接受伴侣有自己的空间', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'att_a24', text: '在亲密关系中我感到踏实安全', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
]
