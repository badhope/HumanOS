import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般符合', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const patronusNormalQuestions: Question[] = [
  { id: 'pat_n01', text: '遇到恐惧时我能保持冷静', type: 'scale', options: opts, meta: { trait: 'courage', weight: 1.0 } },
  { id: 'pat_n02', text: '我有很多快乐的回忆', type: 'scale', options: opts, meta: { trait: 'joy', weight: 1.0 } },
  { id: 'pat_n03', text: '我相信爱能战胜一切', type: 'scale', options: opts, meta: { trait: 'love', weight: 1.0 } },
  { id: 'pat_n04', text: '我总是保护我在乎的人', type: 'scale', options: opts, meta: { trait: 'protect', weight: 1.0 } },
  { id: 'pat_n05', text: '我喜欢大自然和动物', type: 'scale', options: opts, meta: { trait: 'nature', weight: 1.0 } },
  { id: 'pat_n06', text: '我从不轻易放弃希望', type: 'scale', options: opts, meta: { trait: 'hope', weight: 1.0 } },
  { id: 'pat_n07', text: '我的直觉通常很准确', type: 'scale', options: opts, meta: { trait: 'intuition', weight: 1.0 } },
  { id: 'pat_n08', text: '我有强烈的正义感', type: 'scale', options: opts, meta: { trait: 'justice', weight: 1.0 } },
  { id: 'pat_n09', text: '我喜欢自由自在的生活', type: 'scale', options: opts, meta: { trait: 'freedom', weight: 1.0 } },
  { id: 'pat_n10', text: '我对朋友非常忠诚', type: 'scale', options: opts, meta: { trait: 'loyalty', weight: 1.0 } },
  { id: 'pat_n11', text: '我善于在黑暗中寻找光明', type: 'scale', options: opts, meta: { trait: 'hope', weight: 1.0 } },
  { id: 'pat_n12', text: '我的内心很强大', type: 'scale', options: opts, meta: { trait: 'strength', weight: 1.0 } },
  { id: 'pat_n13', text: '我喜欢帮助别人', type: 'scale', options: opts, meta: { trait: 'kindness', weight: 1.0 } },
  { id: 'pat_n14', text: '我是个值得信赖的人', type: 'scale', options: opts, meta: { trait: 'trust', weight: 1.0 } },
  { id: 'pat_n15', text: '我能记住很多美好的瞬间', type: 'scale', options: opts, meta: { trait: 'memory', weight: 1.0 } },
  { id: 'pat_n16', text: '面对压力我能从容应对', type: 'scale', options: opts, meta: { trait: 'calm', weight: 1.0 } },
  { id: 'pat_n17', text: '我相信美好的事物终将到来', type: 'scale', options: opts, meta: { trait: 'optimism', weight: 1.0 } },
  { id: 'pat_n18', text: '我愿意为了正义挺身而出', type: 'scale', options: opts, meta: { trait: 'bravery', weight: 1.0 } },
  { id: 'pat_n19', text: '我的想象力很丰富', type: 'scale', options: opts, meta: { trait: 'imagination', weight: 1.0 } },
  { id: 'pat_n20', text: '我永远不会向邪恶低头', type: 'scale', options: opts, meta: { trait: 'defiance', weight: 1.0 } },
]
