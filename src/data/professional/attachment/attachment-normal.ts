import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 几乎从不这样', value: 1 },
  { id: '2', text: '⚪️ 偶尔会这样', value: 2 },
  { id: '3', text: '🔵 一半时间会这样', value: 3 },
  { id: '4', text: '🟢 经常会这样', value: 4 },
  { id: '5', text: '✅ 几乎总是这样', value: 5 },
]

export const attachmentNormalQuestions: Question[] = [
  { id: 'att_n01', text: '我害怕被人抛弃', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_n02', text: '我觉得自己不值得被爱', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_n03', text: '亲密关系让我感到安心', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'att_n04', text: '我不想让别人太了解我', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_n05', text: '我担心对方不够爱我', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_n06', text: '我很容易依赖别人', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_n07', text: '保持独立对我来说很重要', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_n08', text: '我不喜欢向别人倾诉心事', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_n09', text: '对方不回消息让我很焦虑', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_n10', text: '我相信真爱能够长久', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'att_n11', text: '我能自然地向对方表达需求', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'att_n12', text: '我享受和对方亲密无间', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'att_n13', text: '我害怕被别人抛弃', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_n14', text: '我需要很多的个人空间', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_n15', text: '我担心自己不够好', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_n16', text: '我觉得自己一个人也挺好', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_n17', text: '我担心亲密关系会结束', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'att_n18', text: '我相信别人是值得信任的', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'att_n19', text: '和人太亲近让我感到不舒服', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'att_n20', text: '我觉得自己值得被爱', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
]