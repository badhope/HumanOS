import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般符合', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const wandNormalQuestions: Question[] = [
  { id: 'wand_n01', text: '我做事情很灵活懂得变通', type: 'scale', options: opts, meta: { wood: 'flexible', weight: 1.0 } },
  { id: 'wand_n02', text: '我意志坚定从不轻易动摇', type: 'scale', options: opts, meta: { wood: 'unyielding', weight: 1.0 } },
  { id: 'wand_n03', text: '我对魔法有天生的领悟力', type: 'scale', options: opts, meta: { core: 'powerful', weight: 1.0 } },
  { id: 'wand_n04', text: '我很忠诚一旦选定主人就不会改变', type: 'scale', options: opts, meta: { loyalty: 'high', weight: 1.0 } },
  { id: 'wand_n05', text: '我喜欢追求强大的力量', type: 'scale', options: opts, meta: { power: 'ambitious', weight: 1.0 } },
  { id: 'wand_n06', text: '我善于治愈和帮助别人', type: 'scale', options: opts, meta: { magic: 'healing', weight: 1.0 } },
  { id: 'wand_n07', text: '我喜欢变形和改变事物', type: 'scale', options: opts, meta: { magic: 'transfiguration', weight: 1.0 } },
  { id: 'wand_n08', text: '我擅长战斗和防御', type: 'scale', options: opts, meta: { magic: 'combat', weight: 1.0 } },
  { id: 'wand_n09', text: '我的性格很稳重可靠', type: 'scale', options: opts, meta: { wood: 'oak', weight: 1.0 } },
  { id: 'wand_n10', text: '我内心充满智慧', type: 'scale', options: opts, meta: { wood: 'elder', weight: 1.0 } },
  { id: 'wand_n11', text: '我很优雅有艺术气质', type: 'scale', options: opts, meta: { wood: 'vine', weight: 1.0 } },
  { id: 'wand_n12', text: '我勇敢又有冒险精神', type: 'scale', options: opts, meta: { wood: 'mahogany', weight: 1.0 } },
  { id: 'wand_n13', text: '我的直觉非常敏锐', type: 'scale', options: opts, meta: { core: 'unicorn', weight: 1.0 } },
  { id: 'wand_n14', text: '我有很强的领导能力', type: 'scale', options: opts, meta: { core: 'phoenix', weight: 1.0 } },
  { id: 'wand_n15', text: '我擅长施展黑魔法', type: 'scale', options: opts, meta: { core: 'dragon', weight: 1.0 } },
  { id: 'wand_n16', text: '我喜欢发明新的咒语', type: 'scale', options: opts, meta: { magic: 'innovation', weight: 1.0 } },
  { id: 'wand_n17', text: '我做事很有决心', type: 'scale', options: opts, meta: { wood: 'hawthorn', weight: 1.0 } },
  { id: 'wand_n18', text: '我好奇心很强喜欢探索', type: 'scale', options: opts, meta: { wood: 'maple', weight: 1.0 } },
  { id: 'wand_n19', text: '我有神秘的第六感', type: 'scale', options: opts, meta: { wood: 'willow', weight: 1.0 } },
  { id: 'wand_n20', text: '我追求荣誉和尊严', type: 'scale', options: opts, meta: { wood: 'laurel', weight: 1.0 } },
]
