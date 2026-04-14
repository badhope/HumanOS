import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般符合', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const nindoNormalQuestions: Question[] = [
  { id: 'nindo_n01', text: '我永远不会放弃自己的承诺', type: 'scale', options: opts, meta: { nindo: 'perseverance', weight: 1.0 } },
  { id: 'nindo_n02', text: '保护同伴是最重要的事情', type: 'scale', options: opts, meta: { nindo: 'friendship', weight: 1.0 } },
  { id: 'nindo_n03', text: '我要成为最强的人证明自己', type: 'scale', options: opts, meta: { nindo: 'strength', weight: 1.0 } },
  { id: 'nindo_n04', text: '为了和平可以牺牲一切', type: 'scale', options: opts, meta: { nindo: 'peace', weight: 1.0 } },
  { id: 'nindo_n05', text: '我要改变这个腐朽的世界', type: 'scale', options: opts, meta: { nindo: 'revolution', weight: 1.0 } },
  { id: 'nindo_n06', text: '说到做到就是我的忍道', type: 'scale', options: opts, meta: { nindo: 'honor', weight: 1.0 } },
  { id: 'nindo_n07', text: '我要复兴我的家族', type: 'scale', options: opts, meta: { nindo: 'family', weight: 1.0 } },
  { id: 'nindo_n08', text: '力量就是正义', type: 'scale', options: opts, meta: { nindo: 'power', weight: 1.0 } },
  { id: 'nindo_n09', text: '我要成为村子的守护者', type: 'scale', options: opts, meta: { nindo: 'duty', weight: 1.0 } },
  { id: 'nindo_n10', text: '我要为亲人报仇', type: 'scale', options: opts, meta: { nindo: 'vengeance', weight: 1.0 } },
  { id: 'nindo_n11', text: '我相信努力能超越天才', type: 'scale', options: opts, meta: { nindo: 'hardwork', weight: 1.0 } },
  { id: 'nindo_n12', text: '在战场上活下去最重要', type: 'scale', options: opts, meta: { nindo: 'survival', weight: 1.0 } },
  { id: 'nindo_n13', text: '我追求终极的艺术', type: 'scale', options: opts, meta: { nindo: 'art', weight: 1.0 } },
  { id: 'nindo_n14', text: '金钱和财富就是一切', type: 'scale', options: opts, meta: { nindo: 'wealth', weight: 1.0 } },
  { id: 'nindo_n15', text: '我要找到真正的自我', type: 'scale', options: opts, meta: { nindo: 'identity', weight: 1.0 } },
  { id: 'nindo_n16', text: '爱能拯救世界', type: 'scale', options: opts, meta: { nindo: 'love', weight: 1.0 } },
  { id: 'nindo_n17', text: '规则是用来打破的', type: 'scale', options: opts, meta: { nindo: 'freedom', weight: 1.0 } },
  { id: 'nindo_n18', text: '我要创造一个没有谎言的世界', type: 'scale', options: opts, meta: { nindo: 'truth', weight: 1.0 } },
  { id: 'nindo_n19', text: '能超越火影的人才是真正的忍者', type: 'scale', options: opts, meta: { nindo: 'ambition', weight: 1.0 } },
  { id: 'nindo_n20', text: '我要让全世界都记住我的名字', type: 'scale', options: opts, meta: { nindo: 'fame', weight: 1.0 } },
]
