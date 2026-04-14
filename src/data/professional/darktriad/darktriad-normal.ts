import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合我', value: 1 },
  { id: '2', text: '⚪️ 不太符合我', value: 2 },
  { id: '3', text: '🔵 不好说', value: 3 },
  { id: '4', text: '🟢 比较符合我', value: 4 },
  { id: '5', text: '✅ 完全符合我', value: 5 },
]

export const darktriadNormalQuestions: Question[] = [
  { id: 'dt_n01', text: '不管别人怎么说，都不会让我感到惭愧', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', facet: 'amorality', reverseScored: false, factorLoading: 0.88, discrimination: 0.82, socialDesirability: 0.15, itemDifficulty: 0.65 } },
  { id: 'dt_n02', text: '我喜欢巧妙地操控别人达到目的', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', facet: 'manipulation', reverseScored: false, factorLoading: 0.91, discrimination: 0.85, socialDesirability: 0.10, itemDifficulty: 0.60 } },
  { id: 'dt_n03', text: '我很少真心为别人的成功感到高兴', type: 'scale', options: opts, meta: { dimension: 'narcissism', facet: 'entitlement', reverseScored: false, factorLoading: 0.82, discrimination: 0.76, socialDesirability: 0.20, itemDifficulty: 0.55 } },
  { id: 'dt_n04', text: '看到别人遭受痛苦我不会感到不安', type: 'scale', options: opts, meta: { dimension: 'psychopathy', facet: 'callousness', reverseScored: false, factorLoading: 0.90, discrimination: 0.84, socialDesirability: 0.08, itemDifficulty: 0.70 } },
  { id: 'dt_n05', text: '我应该得到特殊的优待', type: 'scale', options: opts, meta: { dimension: 'narcissism', facet: 'grandiosity', reverseScored: false, factorLoading: 0.87, discrimination: 0.80, socialDesirability: 0.12, itemDifficulty: 0.50 } },
  { id: 'dt_n06', text: '为了成功我可以不择手段', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', facet: 'strategic', reverseScored: false, factorLoading: 0.85, discrimination: 0.78, socialDesirability: 0.18, itemDifficulty: 0.62 } },
  { id: 'dt_n07', text: '我做事从来不考虑后果', type: 'scale', options: opts, meta: { dimension: 'psychopathy', facet: 'impulsivity', reverseScored: false, factorLoading: 0.84, discrimination: 0.77, socialDesirability: 0.22, itemDifficulty: 0.48 } },
  { id: 'dt_n08', text: '我比大多数人都更有天赋', type: 'scale', options: opts, meta: { dimension: 'narcissism', facet: 'superiority', reverseScored: false, factorLoading: 0.80, discrimination: 0.74, socialDesirability: 0.35, itemDifficulty: 0.45 } },
  { id: 'dt_n09', text: '利用别人我不会感到内疚', type: 'scale', options: opts, meta: { dimension: 'psychopathy', facet: 'remorselessness', reverseScored: false, factorLoading: 0.92, discrimination: 0.86, socialDesirability: 0.05, itemDifficulty: 0.75 } },
  { id: 'dt_n10', text: '保守秘密对我来说很容易', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', facet: 'tactical', reverseScored: false, factorLoading: 0.78, discrimination: 0.72, socialDesirability: 0.40, itemDifficulty: 0.40 } },
  { id: 'dt_n11', text: '我喜欢寻求刺激和冒险', type: 'scale', options: opts, meta: { dimension: 'psychopathy', facet: 'thrillSeeking', reverseScored: false, factorLoading: 0.76, discrimination: 0.70, socialDesirability: 0.45, itemDifficulty: 0.38 } },
  { id: 'dt_n12', text: '我喜欢成为别人关注的焦点', type: 'scale', options: opts, meta: { dimension: 'narcissism', facet: 'attentionSeeking', reverseScored: false, factorLoading: 0.79, discrimination: 0.73, socialDesirability: 0.30, itemDifficulty: 0.42 } },
  { id: 'dt_n13', text: '我常常说别人想听的话来达到目的', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', facet: 'manipulation', reverseScored: false, factorLoading: 0.86, discrimination: 0.79, socialDesirability: 0.15, itemDifficulty: 0.55 } },
  { id: 'dt_n14', text: '报复那些伤害我的人是理所当然的', type: 'scale', options: opts, meta: { dimension: 'sadism', facet: 'revengefulness', reverseScored: false, factorLoading: 0.82, discrimination: 0.75, socialDesirability: 0.10, itemDifficulty: 0.65 } },
  { id: 'dt_n15', text: '我认为大多数人都是可以被利用的', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', facet: 'cynicism', reverseScored: false, factorLoading: 0.81, discrimination: 0.74, socialDesirability: 0.12, itemDifficulty: 0.58 } },
  { id: 'dt_n16', text: '我不关心我的行为对他人的影响', type: 'scale', options: opts, meta: { dimension: 'psychopathy', facet: 'callousness', reverseScored: false, factorLoading: 0.88, discrimination: 0.82, socialDesirability: 0.06, itemDifficulty: 0.72 } },
  { id: 'dt_n17', text: '我认为规则是用来打破的', type: 'scale', options: opts, meta: { dimension: 'psychopathy', facet: 'nonconformity', reverseScored: false, factorLoading: 0.75, discrimination: 0.69, socialDesirability: 0.20, itemDifficulty: 0.45 } },
  { id: 'dt_n18', text: '我觉得有资格享受更好的待遇', type: 'scale', options: opts, meta: { dimension: 'narcissism', facet: 'entitlement', reverseScored: false, factorLoading: 0.83, discrimination: 0.76, socialDesirability: 0.18, itemDifficulty: 0.50 } },
  { id: 'dt_n19', text: '我喜欢看别人受到惩罚', type: 'scale', options: opts, meta: { dimension: 'sadism', facet: 'maliciousness', reverseScored: false, factorLoading: 0.84, discrimination: 0.77, socialDesirability: 0.08, itemDifficulty: 0.68 } },
  { id: 'dt_n20', text: '我擅长让别人为我做事', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', facet: 'influence', reverseScored: false, factorLoading: 0.77, discrimination: 0.71, socialDesirability: 0.25, itemDifficulty: 0.40 } },
]