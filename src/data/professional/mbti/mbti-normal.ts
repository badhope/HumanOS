import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 几乎从不这样', value: 1 },
  { id: '2', text: '⚪️ 偶尔会这样', value: 2 },
  { id: '3', text: '🔵 一半时间会这样', value: 3 },
  { id: '4', text: '🟢 经常会这样', value: 4 },
  { id: '5', text: '✅ 几乎总是这样', value: 5 },
]

export const mbtiNormalQuestions: Question[] = [
  { id: 'mbti_n01', text: '聚会后我需要独处恢复精力', type: 'scale', options: opts, meta: { dimension: 'EI', pole: 'I', reverseScored: true, factorLoading: 0.86, discrimination: 0.82, socialDesirability: 0.45, facet: 'social-energy', ipsativeWeight: 1.0 } },
  { id: 'mbti_n02', text: '我主动和陌生人搭话', type: 'scale', options: opts, meta: { dimension: 'EI', pole: 'E', reverseScored: false, factorLoading: 0.83, discrimination: 0.79, socialDesirability: 0.55, facet: 'initiating', ipsativeWeight: 1.0 } },
  { id: 'mbti_n03', text: '我喜欢一两个人的深度交流', type: 'scale', options: opts, meta: { dimension: 'EI', pole: 'I', reverseScored: true, factorLoading: 0.80, discrimination: 0.75, socialDesirability: 0.65, facet: 'intimacy', ipsativeWeight: 1.0 } },
  { id: 'mbti_n04', text: '我更关注细节而不是整体想法', type: 'scale', options: opts, meta: { dimension: 'SN', pole: 'S', reverseScored: false, factorLoading: 0.84, discrimination: 0.78, socialDesirability: 0.50, facet: 'pragmatism', ipsativeWeight: 1.0 } },
  { id: 'mbti_n05', text: '我经常联想出各种可能性', type: 'scale', options: opts, meta: { dimension: 'SN', pole: 'N', reverseScored: true, factorLoading: 0.87, discrimination: 0.81, socialDesirability: 0.60, facet: 'imagination', ipsativeWeight: 1.0 } },
  { id: 'mbti_n06', text: '我相信经验胜过理论', type: 'scale', options: opts, meta: { dimension: 'SN', pole: 'S', reverseScored: false, factorLoading: 0.78, discrimination: 0.72, socialDesirability: 0.55, facet: 'realism', ipsativeWeight: 1.0 } },
  { id: 'mbti_n07', text: '做决定我优先考虑逻辑', type: 'scale', options: opts, meta: { dimension: 'TF', pole: 'T', reverseScored: false, factorLoading: 0.85, discrimination: 0.80, socialDesirability: 0.60, facet: 'objectivity', ipsativeWeight: 1.0 } },
  { id: 'mbti_n08', text: '我很容易感受到别人的情绪', type: 'scale', options: opts, meta: { dimension: 'TF', pole: 'F', reverseScored: true, factorLoading: 0.88, discrimination: 0.83, socialDesirability: 0.75, facet: 'empathy', ipsativeWeight: 1.0 } },
  { id: 'mbti_n09', text: '我追求公平胜过和谐', type: 'scale', options: opts, meta: { dimension: 'TF', pole: 'T', reverseScored: false, factorLoading: 0.81, discrimination: 0.76, socialDesirability: 0.50, facet: 'justice', ipsativeWeight: 1.0 } },
  { id: 'mbti_n10', text: '我喜欢提前做好计划', type: 'scale', options: opts, meta: { dimension: 'JP', pole: 'J', reverseScored: false, factorLoading: 0.84, discrimination: 0.79, socialDesirability: 0.70, facet: 'planning', ipsativeWeight: 1.0 } },
  { id: 'mbti_n11', text: '我喜欢顺其自然而不是定死计划', type: 'scale', options: opts, meta: { dimension: 'JP', pole: 'P', reverseScored: true, factorLoading: 0.82, discrimination: 0.77, socialDesirability: 0.55, facet: 'spontaneity', ipsativeWeight: 1.0 } },
  { id: 'mbti_n12', text: '我总是准时甚至提前', type: 'scale', options: opts, meta: { dimension: 'JP', pole: 'J', reverseScored: false, factorLoading: 0.79, discrimination: 0.74, socialDesirability: 0.80, facet: 'punctuality', ipsativeWeight: 1.0 } },
  { id: 'mbti_n13', text: '人多的场合我更愿意做倾听者', type: 'scale', options: opts, meta: { dimension: 'EI', pole: 'I', reverseScored: true, factorLoading: 0.81, discrimination: 0.76, socialDesirability: 0.65, facet: 'listening', ipsativeWeight: 1.0 } },
  { id: 'mbti_n14', text: '我更喜欢实用的解决方案而不是新奇的想法', type: 'scale', options: opts, meta: { dimension: 'SN', pole: 'S', reverseScored: false, factorLoading: 0.77, discrimination: 0.71, socialDesirability: 0.50, facet: 'practicality', ipsativeWeight: 1.0 } },
  { id: 'mbti_n15', text: '看到别人哭我也会感到难过', type: 'scale', options: opts, meta: { dimension: 'TF', pole: 'F', reverseScored: true, factorLoading: 0.85, discrimination: 0.80, socialDesirability: 0.85, facet: 'compassion', ipsativeWeight: 1.0 } },
  { id: 'mbti_n16', text: '截止日期临近我才开始行动', type: 'scale', options: opts, meta: { dimension: 'JP', pole: 'P', reverseScored: true, factorLoading: 0.80, discrimination: 0.75, socialDesirability: 0.40, facet: 'deadline', ipsativeWeight: 1.0 } },
  { id: 'mbti_n17', text: '长时间社交后我感到精力充沛', type: 'scale', options: opts, meta: { dimension: 'EI', pole: 'E', reverseScored: false, factorLoading: 0.83, discrimination: 0.78, socialDesirability: 0.60, facet: 'energizing', ipsativeWeight: 1.0 } },
  { id: 'mbti_n18', text: '我常常跳出框框思考问题', type: 'scale', options: opts, meta: { dimension: 'SN', pole: 'N', reverseScored: true, factorLoading: 0.84, discrimination: 0.79, socialDesirability: 0.65, facet: 'creativity', ipsativeWeight: 1.0 } },
  { id: 'mbti_n19', text: '我认为真诚比委婉更重要', type: 'scale', options: opts, meta: { dimension: 'TF', pole: 'T', reverseScored: false, factorLoading: 0.79, discrimination: 0.74, socialDesirability: 0.45, facet: 'honesty', ipsativeWeight: 1.0 } },
  { id: 'mbti_n20', text: '我的物品摆放整齐有序', type: 'scale', options: opts, meta: { dimension: 'JP', pole: 'J', reverseScored: false, factorLoading: 0.82, discrimination: 0.77, socialDesirability: 0.75, facet: 'organization', ipsativeWeight: 1.0 } },
]
