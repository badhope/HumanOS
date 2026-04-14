import type { Question } from '../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般符合', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const tkiNormalQuestions: Question[] = [
  { id: 'tki_n01', text: '我会据理力争证明自己的观点是对的', type: 'scale', options: opts, meta: { style: 'competing', weight: 1.0 } },
  { id: 'tki_n02', text: '我更愿意满足对方的需求', type: 'scale', options: opts, meta: { style: 'accommodating', weight: 1.0 } },
  { id: 'tki_n03', text: '我会寻求双方都能接受的折中方案', type: 'scale', options: opts, meta: { style: 'compromising', weight: 1.0 } },
  { id: 'tki_n04', text: '我喜欢直接面对并解决冲突', type: 'scale', options: opts, meta: { style: 'collaborating', weight: 1.0 } },
  { id: 'tki_n05', text: '我宁愿回避也不想产生矛盾', type: 'scale', options: opts, meta: { style: 'avoiding', weight: 1.0 } },
  { id: 'tki_n06', text: '我坚持自己的立场不妥协', type: 'scale', options: opts, meta: { style: 'competing', weight: 1.0 } },
  { id: 'tki_n07', text: '我重视维持和谐的人际关系', type: 'scale', options: opts, meta: { style: 'accommodating', weight: 1.0 } },
  { id: 'tki_n08', text: '我建议双方都做出一些让步', type: 'scale', options: opts, meta: { style: 'compromising', weight: 1.0 } },
  { id: 'tki_n09', text: '我会和对方一起分析问题找到双赢方案', type: 'scale', options: opts, meta: { style: 'collaborating', weight: 1.0 } },
  { id: 'tki_n10', text: '我尽量避开有争议的话题', type: 'scale', options: opts, meta: { style: 'avoiding', weight: 1.0 } },
  { id: 'tki_n11', text: '我喜欢用数据和事实说服对方', type: 'scale', options: opts, meta: { style: 'competing', weight: 1.0 } },
  { id: 'tki_n12', text: '我常常同意别人的建议', type: 'scale', options: opts, meta: { style: 'accommodating', weight: 1.0 } },
  { id: 'tki_n13', text: '谈判时我追求公平的结果', type: 'scale', options: opts, meta: { style: 'compromising', weight: 1.0 } },
  { id: 'tki_n14', text: '我相信坦诚沟通能解决大部分问题', type: 'scale', options: opts, meta: { style: 'collaborating', weight: 1.0 } },
  { id: 'tki_n15', text: '我宁愿保持沉默也不愿引发争论', type: 'scale', options: opts, meta: { style: 'avoiding', weight: 1.0 } },
  { id: 'tki_n16', text: '遇到分歧时我会主动争取', type: 'scale', options: opts, meta: { style: 'competing', weight: 1.0 } },
  { id: 'tki_n17', text: '别人的感受对我很重要', type: 'scale', options: opts, meta: { style: 'accommodating', weight: 1.0 } },
  { id: 'tki_n18', text: '我相信退一步海阔天空', type: 'scale', options: opts, meta: { style: 'compromising', weight: 1.0 } },
  { id: 'tki_n19', text: '我会分享我的想法也倾听对方的想法', type: 'scale', options: opts, meta: { style: 'collaborating', weight: 1.0 } },
  { id: 'tki_n20', text: '我等事情冷静下来再处理', type: 'scale', options: opts, meta: { style: 'avoiding', weight: 1.0 } },
]
