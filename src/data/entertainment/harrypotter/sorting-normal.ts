import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般符合', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const sortingNormalQuestions: Question[] = [
  { id: 'sort_n01', text: '我喜欢成为团队的领导者', type: 'scale', options: opts, meta: { house: 'gryffindor', weight: 1.0 } },
  { id: 'sort_n02', text: '遇到危险我会勇敢面对而不是逃避', type: 'scale', options: opts, meta: { house: 'gryffindor', weight: 1.0 } },
  { id: 'sort_n03', text: '我非常重视忠诚和友谊', type: 'scale', options: opts, meta: { house: 'hufflepuff', weight: 1.0 } },
  { id: 'sort_n04', text: '我喜欢努力工作而不是走捷径', type: 'scale', options: opts, meta: { house: 'hufflepuff', weight: 1.0 } },
  { id: 'sort_n05', text: '我总是渴望学习新知识', type: 'scale', options: opts, meta: { house: 'ravenclaw', weight: 1.0 } },
  { id: 'sort_n06', text: '我喜欢用智慧解决问题而不是蛮力', type: 'scale', options: opts, meta: { house: 'ravenclaw', weight: 1.0 } },
  { id: 'sort_n07', text: '为了成功我可以不惜一切代价', type: 'scale', options: opts, meta: { house: 'slytherin', weight: 1.0 } },
  { id: 'sort_n08', text: '我喜欢结交有地位和影响力的朋友', type: 'scale', options: opts, meta: { house: 'slytherin', weight: 1.0 } },
  { id: 'sort_n09', text: '我愿意为了保护弱者挺身而出', type: 'scale', options: opts, meta: { house: 'gryffindor', weight: 1.0 } },
  { id: 'sort_n10', text: '我认为每个人都应该被公平对待', type: 'scale', options: opts, meta: { house: 'hufflepuff', weight: 1.0 } },
  { id: 'sort_n11', text: '我喜欢思考抽象的想法和理论', type: 'scale', options: opts, meta: { house: 'ravenclaw', weight: 1.0 } },
  { id: 'sort_n12', text: '我天生就有优越感', type: 'scale', options: opts, meta: { house: 'slytherin', weight: 1.0 } },
  { id: 'sort_n13', text: '我喜欢冒险和尝试新事物', type: 'scale', options: opts, meta: { house: 'gryffindor', weight: 1.0 } },
  { id: 'sort_n14', text: '帮助别人让我感到快乐', type: 'scale', options: opts, meta: { house: 'hufflepuff', weight: 1.0 } },
  { id: 'sort_n15', text: '我对很多事情都充满好奇心', type: 'scale', options: opts, meta: { house: 'ravenclaw', weight: 1.0 } },
  { id: 'sort_n16', text: '我非常有野心和抱负', type: 'scale', options: opts, meta: { house: 'slytherin', weight: 1.0 } },
  { id: 'sort_n17', text: '我不惧怕权威敢于说真话', type: 'scale', options: opts, meta: { house: 'gryffindor', weight: 1.0 } },
  { id: 'sort_n18', text: '我做事很有耐心从不急躁', type: 'scale', options: opts, meta: { house: 'hufflepuff', weight: 1.0 } },
  { id: 'sort_n19', text: '我喜欢和别人进行智慧的辩论', type: 'scale', options: opts, meta: { house: 'ravenclaw', weight: 1.0 } },
  { id: 'sort_n20', text: '我认为目标比手段更重要', type: 'scale', options: opts, meta: { house: 'slytherin', weight: 1.0 } },
]
