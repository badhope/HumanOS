import type { Question } from '../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般符合', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const schwartzNormalQuestions: Question[] = [
  { id: 'schwartz_n01', text: '思考和创造新想法对我很重要', type: 'scale', options: opts, meta: { value: 'self_direction', weight: 1.0 } },
  { id: 'schwartz_n02', text: '我渴望生活中充满刺激和兴奋', type: 'scale', options: opts, meta: { value: 'stimulation', weight: 1.0 } },
  { id: 'schwartz_n03', text: '获得成功和他人认可是我的动力', type: 'scale', options: opts, meta: { value: 'achievement', weight: 1.0 } },
  { id: 'schwartz_n04', text: '积累财富和物质资源对我很重要', type: 'scale', options: opts, meta: { value: 'power', weight: 1.0 } },
  { id: 'schwartz_n05', text: '遵守社会规则对我很重要', type: 'scale', options: opts, meta: { value: 'conformity', weight: 1.0 } },
  { id: 'schwartz_n06', text: '我重视传统和文化习俗', type: 'scale', options: opts, meta: { value: 'tradition', weight: 1.0 } },
  { id: 'schwartz_n07', text: '我愿意为了别人的福祉做出牺牲', type: 'scale', options: opts, meta: { value: 'benevolence', weight: 1.0 } },
  { id: 'schwartz_n08', text: '我相信所有人都应该被公正对待', type: 'scale', options: opts, meta: { value: 'universalism', weight: 1.0 } },
  { id: 'schwartz_n09', text: '安全稳定的环境对我很重要', type: 'scale', options: opts, meta: { value: 'security', weight: 1.0 } },
  { id: 'schwartz_n10', text: '我喜欢按照自己的方式做事', type: 'scale', options: opts, meta: { value: 'self_direction', weight: 1.0 } },
  { id: 'schwartz_n11', text: '我喜欢尝试新事物和冒险', type: 'scale', options: opts, meta: { value: 'stimulation', weight: 1.0 } },
  { id: 'schwartz_n12', text: '在竞争中获胜对我很重要', type: 'scale', options: opts, meta: { value: 'achievement', weight: 1.0 } },
  { id: 'schwartz_n13', text: '我希望能够影响和领导他人', type: 'scale', options: opts, meta: { value: 'power', weight: 1.0 } },
  { id: 'schwartz_n14', text: '我尽量避免让别人不高兴', type: 'scale', options: opts, meta: { value: 'conformity', weight: 1.0 } },
  { id: 'schwartz_n15', text: '我重视家族和宗教的传承', type: 'scale', options: opts, meta: { value: 'tradition', weight: 1.0 } },
  { id: 'schwartz_n16', text: '我总是尽力帮助身边的人', type: 'scale', options: opts, meta: { value: 'benevolence', weight: 1.0 } },
  { id: 'schwartz_n17', text: '保护环境对我非常重要', type: 'scale', options: opts, meta: { value: 'universalism', weight: 1.0 } },
  { id: 'schwartz_n18', text: '我希望未来没有任何风险', type: 'scale', options: opts, meta: { value: 'security', weight: 1.0 } },
  { id: 'schwartz_n19', text: '追求知识和智慧对我很重要', type: 'scale', options: opts, meta: { value: 'self_direction', weight: 1.0 } },
  { id: 'schwartz_n20', text: '生活有乐趣对我非常重要', type: 'scale', options: opts, meta: { value: 'hedonism', weight: 1.0 } },
]
