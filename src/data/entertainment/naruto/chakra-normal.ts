import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般符合', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const chakraNormalQuestions: Question[] = [
  { id: 'chakra_n01', text: '我做事充满热情和活力', type: 'scale', options: opts, meta: { chakra: 'fire', weight: 1.0 } },
  { id: 'chakra_n02', text: '我性格冷静沉稳', type: 'scale', options: opts, meta: { chakra: 'water', weight: 1.0 } },
  { id: 'chakra_n03', text: '我适应能力很强', type: 'scale', options: opts, meta: { chakra: 'wind', weight: 1.0 } },
  { id: 'chakra_n04', text: '我非常务实和稳重', type: 'scale', options: opts, meta: { chakra: 'earth', weight: 1.0 } },
  { id: 'chakra_n05', text: '我思维敏捷反应快', type: 'scale', options: opts, meta: { chakra: 'lightning', weight: 1.0 } },
  { id: 'chakra_n06', text: '我有很强的攻击性', type: 'scale', options: opts, meta: { chakra: 'fire', weight: 1.0 } },
  { id: 'chakra_n07', text: '我善于治愈和安慰他人', type: 'scale', options: opts, meta: { chakra: 'water', weight: 1.0 } },
  { id: 'chakra_n08', text: '我喜欢自由自在不受约束', type: 'scale', options: opts, meta: { chakra: 'wind', weight: 1.0 } },
  { id: 'chakra_n09', text: '我防守能力很强', type: 'scale', options: opts, meta: { chakra: 'earth', weight: 1.0 } },
  { id: 'chakra_n10', text: '我爆发力很强', type: 'scale', options: opts, meta: { chakra: 'lightning', weight: 1.0 } },
  { id: 'chakra_n11', text: '我从不畏惧挑战', type: 'scale', options: opts, meta: { chakra: 'fire', weight: 1.0 } },
  { id: 'chakra_n12', text: '我情绪很稳定不易失控', type: 'scale', options: opts, meta: { chakra: 'water', weight: 1.0 } },
  { id: 'chakra_n13', text: '我说话直来直去不绕弯', type: 'scale', options: opts, meta: { chakra: 'wind', weight: 1.0 } },
  { id: 'chakra_n14', text: '我的意志力非常坚定', type: 'scale', options: opts, meta: { chakra: 'earth', weight: 1.0 } },
  { id: 'chakra_n15', text: '我善于随机应变', type: 'scale', options: opts, meta: { chakra: 'lightning', weight: 1.0 } },
  { id: 'chakra_n16', text: '我是个急性子', type: 'scale', options: opts, meta: { chakra: 'fire', weight: 1.0 } },
  { id: 'chakra_n17', text: '我很温柔有同情心', type: 'scale', options: opts, meta: { chakra: 'water', weight: 1.0 } },
  { id: 'chakra_n18', text: '我善于沟通和说服', type: 'scale', options: opts, meta: { chakra: 'wind', weight: 1.0 } },
  { id: 'chakra_n19', text: '我做事脚踏实地', type: 'scale', options: opts, meta: { chakra: 'earth', weight: 1.0 } },
  { id: 'chakra_n20', text: '我学习能力很强', type: 'scale', options: opts, meta: { chakra: 'lightning', weight: 1.0 } },
]
