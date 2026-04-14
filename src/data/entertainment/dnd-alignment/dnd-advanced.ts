import type { Question } from '../../../types'
import type { DndQuestionMeta } from './dnd-common'

const opts = [
  { id: '1', text: '❌ 完全不符合我', value: 1 },
  { id: '2', text: '⚪️ 不太符合我', value: 2 },
  { id: '3', text: '🔵 一般符合我', value: 3 },
  { id: '4', text: '🟢 比较符合我', value: 4 },
  { id: '5', text: '✅ 完全就是我', value: 5 },
]

export const dndAdvancedQuestions: Question[] = [
  { id: 'dnd_a01', text: '我会严格按照既定流程办事，即使有更快捷的方法', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 1.2 } },
  { id: 'dnd_a02', text: '我会主动帮助陌生人而不求任何回报', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'good', weight: 1.1 } },
  { id: 'dnd_a03', text: '弱者被淘汰是自然法则', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'evil', weight: 1.2 } },
  { id: 'dnd_a04', text: '我喜欢即兴发挥而不是按计划行事', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd_a05', text: '对上级的命令我会无条件执行', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd_a06', text: '我认为任何规则都可以被打破', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.2 } },
  { id: 'dnd_a07', text: '我会为了集体利益放弃个人利益', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'good', weight: 1.0 } },
  { id: 'dnd_a08', text: '欺骗别人只要不被发现就没问题', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'evil', weight: 1.1 } },
  { id: 'dnd_a09', text: '我相信法律和秩序是社会的基石', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 0.9 } },
  { id: 'dnd_a10', text: '我对不合理的规定会公然反抗', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd_a11', text: '我会主动关心身边人的情绪状态', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'good', weight: 1.0 } },
  { id: 'dnd_a12', text: '利用别人的弱点来获得优势是明智的', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'evil', weight: 1.1 } },
  { id: 'dnd_a13', text: '信守承诺比什么都重要', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'good', weight: 1.2 } },
  { id: 'dnd_a14', text: '我会按照自己的道德准则行事，即使违反法律', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'good', weight: 1.1 } },
  { id: 'dnd_a15', text: '有秩序的恶好过无秩序的善', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'evil', weight: 1.2 } },
  { id: 'dnd_a16', text: '只要能脱身，做什么坏事都无所谓', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'evil', weight: 1.3 } },
  { id: 'dnd_a17', text: '我会先考虑对自己最有利的选择', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd_a18', text: '我相信善有善报恶有恶报', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'good', weight: 1.1 } },
  { id: 'dnd_a19', text: '大部分人都是可以被利用的棋子', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'evil', weight: 1.2 } },
  { id: 'dnd_a20', text: '我喜欢挑战现有的制度和权威', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.1 } },
  { id: 'dnd_a21', text: '做错事就应该受到相应的惩罚', type: 'scale', options: opts, meta: { ethics: 'lawful', morals: 'neutral', weight: 1.0 } },
  { id: 'dnd_a22', text: '我会尽我所能让世界变得更好', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'good', weight: 1.1 } },
  { id: 'dnd_a23', text: '感情用事是弱者的表现', type: 'scale', options: opts, meta: { ethics: 'neutral', morals: 'evil', weight: 1.0 } },
  { id: 'dnd_a24', text: '我做事只凭心情不看规则', type: 'scale', options: opts, meta: { ethics: 'chaotic', morals: 'neutral', weight: 1.2 } },
]
