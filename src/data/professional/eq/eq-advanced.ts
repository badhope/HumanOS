import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 几乎从不', value: 1 },
  { id: '2', text: '⚪️ 偶尔这样', value: 2 },
  { id: '3', text: '🔵 有时这样', value: 3 },
  { id: '4', text: '🟢 经常这样', value: 4 },
  { id: '5', text: '✅ 总是这样', value: 5 },
]

export const eqAdvancedQuestions: Question[] = [
  { id: 'eq_a01', text: '我能准确识别自己情绪的细微差别', type: 'scale', options: opts, meta: { dimension: 'self_awareness', reverse: false } },
  { id: 'eq_a02', text: '我的情绪会影响我的决策质量', type: 'scale', options: opts, meta: { dimension: 'self_awareness', reverse: false } },
  { id: 'eq_a03', text: '我能在压力下保持镇定', type: 'scale', options: opts, meta: { dimension: 'self_regulation', reverse: false } },
  { id: 'eq_a04', text: '我能有效管理负面情绪', type: 'scale', options: opts, meta: { dimension: 'self_regulation', reverse: false } },
  { id: 'eq_a05', text: '延迟满足对我来说不难', type: 'scale', options: opts, meta: { dimension: 'motivation', reverse: false } },
  { id: 'eq_a06', text: '我有很强的成就驱动力', type: 'scale', options: opts, meta: { dimension: 'motivation', reverse: false } },
  { id: 'eq_a07', text: '我能站在别人的角度思考问题', type: 'scale', options: opts, meta: { dimension: 'empathy', reverse: false } },
  { id: 'eq_a08', text: '我能敏锐察觉他人的情绪变化', type: 'scale', options: opts, meta: { dimension: 'empathy', reverse: false } },
  { id: 'eq_a09', text: '我善于说服别人', type: 'scale', options: opts, meta: { dimension: 'social_skills', reverse: false } },
  { id: 'eq_a10', text: '我能有效处理人际冲突', type: 'scale', options: opts, meta: { dimension: 'social_skills', reverse: false } },
  { id: 'eq_a11', text: '我对自己的感受很诚实', type: 'scale', options: opts, meta: { dimension: 'self_awareness', reverse: false } },
  { id: 'eq_a12', text: '我三思而后行', type: 'scale', options: opts, meta: { dimension: 'self_regulation', reverse: false } },
  { id: 'eq_a13', text: '我对自己有高标准', type: 'scale', options: opts, meta: { dimension: 'motivation', reverse: false } },
  { id: 'eq_a14', text: '我关心别人的感受胜过自己', type: 'scale', options: opts, meta: { dimension: 'empathy', reverse: false } },
  { id: 'eq_a15', text: '我能建立并维持良好的人际关系', type: 'scale', options: opts, meta: { dimension: 'social_skills', reverse: false } },
  { id: 'eq_a16', text: '我能接受自己的负面情绪', type: 'scale', options: opts, meta: { dimension: 'self_awareness', reverse: false } },
  { id: 'eq_a17', text: '我能适应环境的变化', type: 'scale', options: opts, meta: { dimension: 'self_regulation', reverse: false } },
  { id: 'eq_a18', text: '我总是保持积极乐观的态度', type: 'scale', options: opts, meta: { dimension: 'motivation', reverse: false } },
  { id: 'eq_a19', text: '我能理解别人没说出口的感受', type: 'scale', options: opts, meta: { dimension: 'empathy', reverse: false } },
  { id: 'eq_a20', text: '我擅长激励团队成员', type: 'scale', options: opts, meta: { dimension: 'social_skills', reverse: false } },
  { id: 'eq_a21', text: '我能用恰当的方式表达情绪', type: 'scale', options: opts, meta: { dimension: 'self_awareness', reverse: false } },
  { id: 'eq_a22', text: '我能控制住自己的冲动', type: 'scale', options: opts, meta: { dimension: 'self_regulation', reverse: false } },
  { id: 'eq_a23', text: '面对困难我从不放弃', type: 'scale', options: opts, meta: { dimension: 'motivation', reverse: false } },
  { id: 'eq_a24', text: '我善于调解矛盾', type: 'scale', options: opts, meta: { dimension: 'social_skills', reverse: false } },
]
